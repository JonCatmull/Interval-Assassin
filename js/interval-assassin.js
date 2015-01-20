
/*
* jQuery.intervalAssassin
*
* Copyright (c) 2014 Jonathan Catmull
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
*
* http://catmull.uk
*/
(function($){

  $.fn.intervalAssassin = function(custom) {

    // Default plugin settings
    var defaults = {
      targetClass : '.animate-me',
      interval : 300,
      randomOrder : false,
      debug   : false
    };

    var methods = {
      getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      },
      debug: function(message) {
        if (settings.debug && typeof window.console !== 'undefined' && typeof window.console.debug !== 'undefined') {
          window.console.debug(message);
        }
      }
    };

    // Merge default and user settings
    var settings = $.extend({}, defaults, custom);
   
    this.each(function(){
      var i = 1,
        $wrapper = $(this),
        count = $wrapper.find(settings.targetClass).length,
        timer = setInterval(function() {
          if(i >= count) { clearInterval(timer); }
          methods.debug('interval triggered');
          var nextIndex = (settings.randomOrder)?methods.getRandomInt(1, (count-i))-1:0;
          var $nextElement = $wrapper.find(settings.targetClass).eq(nextIndex);
          $nextElement.attr('class',$nextElement.attr('class').replace(settings.targetClass.substr(1),''));
          i++;
        }, settings.interval);
      methods.debug('count: '+count);
    });

    return $(this);

  };

})(jQuery);
