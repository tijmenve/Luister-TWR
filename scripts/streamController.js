(function ($) {

  $.fn.currentStream = null;
  $.fn.currentStreamIndex = null;

  $.fn.twrCallFunctions.setActiveStream = function (index, noPlay) {
    // Let's check if possible to slide to.

    if (!$.fn.twrCallFunctions.data.streams[index]) {
      return false;
    }

    $("#pager li.on").removeClass("on");
    $("#pager li:eq(" + index + ")").addClass("on");

    if ($.fn.currentStreamIndex !== null) {
      $.fn.twrCallFunctions.stopActiveStream();
    }

    $('#slides').transition({
      x: - parseInt(100 / $('#slides .slide').length * index) + "%"
    });

    $.fn.currentStream = $.fn.twrCallFunctions.data.streams[index];
    $.fn.currentStreamIndex = index;

    if(!$.fn.player){
      $.fn.player = document.createElement('audio');
    }

    switch($.fn.twrCallFunctions.devicePlatform)
    {
      case 'iOS':
      $.fn.currentStream.streamUrl = $.fn.currentStream.streamUrlAac;
      break;

      case 'Android':
      $.fn.currentStream.streamUrl = $.fn.currentStream.streamUrlMp3;
      break;

      default:
      $.fn.currentStream.streamUrl = $.fn.currentStream.streamUrlMp3;
    }

    $.fn.player.setAttribute('src', $.fn.currentStream.streamUrl);

    if (noPlay == null) {
      $.fn.twrCallFunctions.playActiveStream();
    }

    $.fn.twrCallFunctions.setStreamInfo($.fn.currentStream);
  }

  $.fn.twrCallFunctions.playActiveStream = function () {
    $.fn.player.play();

    $('#stopStream').removeClass('hidden');
    $('#playStream').addClass('hidden');

    // Set interval for the metadata
    $.fn.twrCallFunctions.setMetadataInterval();

  }

  $.fn.twrCallFunctions.stopActiveStream = function () {
    $.fn.player.pause();

    $('#playStream').removeClass('hidden');
    $('#stopStream').addClass('hidden');

    // Stop interval for refreshing metadata.
    $.fn.twrCallFunctions.stopMetadataInterval();
  }

  $.fn.twrCallFunctions.setStreamInfo = function(stream) {
    $('#streamLogo div').html('<img src="images/streams/' + stream.streamLogo + '-110.png">');
    $('#streamName').html(stream.streamName);
  }

  $.fn.twrCallFunctions.setSlideHeight = function() {
    var slideHeight = $(window).height() - (101 + 144);
    var bannerWidth = $(window).width();

    $.each($('.slide'), function(){
      $(this).css("height", slideHeight + 'px');
    });
    $.each($('.streamBanner'), function(){
      $(this).css("width", bannerWidth + 'px')
    })
  }

  $.fn.twrFunctions.slideHeightInit = {
    attach: function () {
      $.fn.twrCallFunctions.setSlideHeight();

      $(window).resize(function() {
        $.fn.twrCallFunctions.setSlideHeight();
      });
    }
  };

})(jQuery);
