(function($) {
  'use strict';
  $('body').addClass('js');
  function convertToSlug(text) {
    // Creates 'slugs' out of text.
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g,'')
      .replace(/ +/g,'-');
    }

  function addAnchors() {
    // This adds anchors to all H2s and H3s on pages.

    $('h2, h3').each(function() {
      var text = $(this).text();
      $(this).attr('id', convertToSlug(text));
    });
  }
  function accessibilityHelpers() {
    // EventsAir doesn't do this by default.
    $('html').attr('lang','en');
    $('a.navbar-brand').text('Home').addClass('visually-hidden');
    $('button.navbar-toggler').text('Menu');
  }
  $('.is-section a')
    .not('.no-smooth-scroll')
    .on('click', function(event) {
      var speed = 500,
        path = $(this).attr("href").split('#')[0],
        $element = $('#' + $(this).attr("href").split('#')[1]);

      // Get rid of http:// or https:// from the start of the string.
      if (path.indexOf('://') > -1) {
        path = path.substring(path.indexOf('://') + 3);
      }

      // Knock off the domain.
      if (path.indexOf('/') > -1) {
        path = path.substring(path.indexOf('/'));
      }

      if ($element.length > 0 && (!path || path == window.location.pathname)) {

        event.preventDefault();

        var position = $element.offset().top;

        // Scroll the viewport to the destination.
        $('html, body').animate({
          scrollTop: position
        }, speed, "swing", function() {
          // Setting 'tabindex' to -1 takes an element out of normal tab
          // flow but allows it to be focused via JavaScript. We only do
          // this when the animation is complete.
          $element.attr('tabindex', -1).on('blur focusout', function() {

            // When focus leaves this element, remove the tabindex attribute.
            $element.removeAttr('tabindex');
          }).focus(); // Focus on the content container
        });
      }
    });
  var extensionList = ['.pdf', '.doc', '.docx', '.xls', '.xslx', '.rtf', '.mp4', '.srt', '.ppt', '.pptx'];
  $.each(extensionList, function(index, extension) {
    $('a[href$="' + extension + '"]')
      .addClass('event-tracking')
      .click(function(e) {
        var pathName = e.currentTarget.pathname;
        var eventLabel = '';
        var eventCategory = pathName.substr(pathName.lastIndexOf('.') + 1).toUpperCase();
        e.currentTarget.title ? eventLabel = e.currentTarget.title : eventLabel = decodeURI(pathName.substr(pathName.lastIndexOf('/') + 1));
        ga('send', 'event', eventCategory, 'Download', eventLabel);
      });
  });
  addAnchors();
  accessibilityHelpers();
}(jQuery));
