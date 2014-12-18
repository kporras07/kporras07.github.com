/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post-content").fitVids();

        // Calculates Reading Time
        $('.post-content').readingTime({
            readingTimeTarget: '.post-reading-time',
            wordCountTarget: '.post-word-count',
        });

        // Creates Captions from Alt tags
        $(".post-content img").each(function() {
            // Let's put a caption if there is one
            if($(this).attr("alt"))
              $(this).wrap('<figure class="image"></figure>')
              .after('<figcaption>'+$(this).attr("alt")+'</figcaption>');
        });

    });

}(jQuery));

(function(d, s) {
    var js, fjs = d.getElementsByTagName(s)[0], load = function(url, id) {
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.src = url; js.id = id;
        fjs.parentNode.insertBefore(js, fjs);
    };
    load('//platform.twitter.com/widgets.js', 'tweetjs');
    load('//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=1560868307491624&version=v2.0', 'fbjssdk');
    load('https://apis.google.com/js/plusone.js', 'gplus1js');
}(document, 'script'));
