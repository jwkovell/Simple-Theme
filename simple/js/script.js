var Drupal = Drupal || { 'settings': {}, 'behaviors': {}, 'themes': {}, 'locale': {} };

(function ($, Drupal) {
  Drupal.behaviors.jabberwockyThemeLoad = {
    attach: function (context, settings) {

      var slideCount = $('.slideshow .slide').length;
      var currentSlide = 0;
      var nextSlide = 1;
      var previousSlide = slideCount - 1;
      var clickedSlide = 0;
      var autoplay = true;

      function autoScroll() {

        if (autoplay) {

          // If the current slide is the last slide...
          if (currentSlide == slideCount - 1) {
            clickedSlide = 0;
          } else {
            clickedSlide = currentSlide + 1;
          }

          positionSlides();

        }

      }

      function positionSlides() {

        // Make the clicked slide the current slide.
        currentSlide = clickedSlide;

        // If the current slide is the last slide...
        if (currentSlide == slideCount - 1) {
          nextSlide = 0;
        } else {
          nextSlide = currentSlide + 1;
        }

        // If the current slide is the first slide...
        if (currentSlide == 0) {
          previousSlide = slideCount - 1;
        } else {
          previousSlide = currentSlide - 1;
        }

        // Position slides.
        $('.slideshow .slide').css({left: '-1000%'}).removeClass('current-slide');
        $('.slideshow .slide:eq(' + currentSlide + ')').css({left: 0}).addClass('current-slide');
        $('.slideshow .slide:eq(' + nextSlide + ')').css({left: '82%'});
        $('.slideshow .slide:eq(' + previousSlide + ')').css({left: '-82%'});

      }

      // When a slide is clicked...
      $('.slide').click(function(event){

        // Get the index of the clicked slide.
        clickedSlide = $('.slide').index(this);

        // If the clicked slide is not the current slide...
        if (clickedSlide !== currentSlide) {

          // Disable autoplay;
          autoplay = false;

          // Prevent the link from working.
          event.preventDefault();

          // Reposition slides.
          positionSlides();

        }

      });

      // Reposition slides.
      positionSlides();

      setInterval(function(){ autoScroll(); }, 3000);

    }
  };
})(jQuery, Drupal);