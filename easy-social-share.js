'use strict';

angular.module('td.easySocialShare', [])
  .directive('shareLinks', ['$location', function ($location) {
    return {
      link: function (scope, elem, attrs) {
        var i,
            sites = ['twitter', 'facebook', 'linkedin', 'google-plus', 'reddit', 'tumblr'],
            theLink,
            links = attrs.shareLinks.toLowerCase().split(','),
            pageLink = encodeURIComponent($location.absUrl()),
            pageTitle = attrs.shareTitle,
            pageTitleUri = encodeURIComponent(pageTitle),
            shareLinks = [],
            square = '';

        elem.addClass('td-easy-social-share');

        // check if square icon specified
        square = (attrs.shareSquare && attrs.shareSquare.toString() === 'true') ? '-square' : '';

        // assign share link for each network
        angular.forEach(links, function (key) {
          key = key.trim();

          switch (key) {
            case 'twitter':
              theLink = 'http://twitter.com/intent/tweet?text=' + pageTitleUri + '%20' + pageLink;
              break;
            case 'facebook':
              theLink = 'http://facebook.com/sharer.php?u=' + pageLink;
              break;
            case 'linkedin':
              theLink = 'http://www.linkedin.com/shareArticle?mini=true&url=' + pageLink + '&title=' + pageTitleUri;
              break;
            case 'google-plus':
              theLink = 'https://plus.google.com/share?url=' + pageLink;
              break;
            case 'reddit':
               theLink = 'http://reddit.com/submit?url=' + pageLink + '&title=' + pageTitleUri;
              break;
            case 'tumblr':
               theLink = 'http://www.tumblr.com/share/link?url=' + pageLink + '&amp;name=' + pageTitleUri;
              break;
          }

          if (sites.indexOf(key) > -1) {
            shareLinks.push({network: key, url: theLink});
          }
        });

        for (i = 0; i < shareLinks.length; i++) {
          var anchor = '';
          anchor += '<a href="'+ shareLinks[i].url + '"';
          anchor += ' class="fa fa-'+shareLinks[i].network + square + '" target="_blank"';
          anchor += '></a>';
          elem.append(anchor);
        }
      }
    };
  }]);
