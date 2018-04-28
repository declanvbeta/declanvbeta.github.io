$( document ).ready(function() {
    console.log( "something!" );
    // Barba.Pjax.Dom.containerClass = 'body';

      // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport (el) 
  {
      //special bonus for those using jQuery
      if (typeof jQuery !== 'undefined' && el instanceof jQuery) el = el[0];

      var rect = el.getBoundingClientRect();
      var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
      var windowWidth = (window.innerWidth || document.documentElement.clientWidth);

      return (
             (rect.left >= 0)
          && (rect.top >= 0)
          && ((rect.left + rect.width/2) <= windowWidth)
          && ((rect.top + rect.height/2) <= windowHeight)
      );

  }

  var scroll = window.requestAnimationFrame ||
            function(callback){window.setTimeout(callback, 1000/60)};

  // seenYet = false;

    function scrollToShow() {

    var elementsToShow = document.querySelectorAll('.show-on-scroll');

    elementsToShow.forEach(function (element) {
      // console.log('seenYet: ', seenYet);

      // elementSeenYet  = $(element).data('seen-yet');
      // console.log('elementSeenYet: ', elementSeenYet);
      if (isElementInViewport(element)) {
        // console.log('visible')

        element.classList.add('visible');
        element.classList.add('play');

        // if ($(element).data('seen-yet') == false) {
        //  console.log("hey, this thing hasn't been seen yet")
        //  element.classList.add('play');
        //  seenYet = true;
        //  $(element).data('seen-yet', true);

        // } else {
        //  element.classList.remove('play');
        // }
      } else {
        // console.log('invisible')
        // element.classList.remove('visible');
        // element.classList.remove('play');
        // seenYet = true;
      }
    });

    scroll(scrollToShow);

  }

  scrollToShow();

  function fadeHeader() {
    if ($(window).scrollTop() >= $('.site-header').outerHeight() * 2) {
        $('header').addClass('scroll-away');
        $('header').removeClass('scroll-in');
        $('header').removeClass('initial');
        // console.log('we are scrolling out');

      } else if ($(window).scrollTop() <= $('.site-header').outerHeight() * 2 && !$('.siteheader').hasClass('initial')) {

        // console.log('we are scrolling in');
        $('header').removeClass('scroll-away');
        $('header').addClass('scroll-in');
      };

      scroll(fadeHeader);
  }

  fadeHeader();


  var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            console.log('here is the figureEl', figureEl);

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            console.log('here is the linkEl: ', linkEl);

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
  };


  var FadeTransition = Barba.BaseTransition.extend({
    start: function() {
      /**
       * This function is automatically called as soon the Transition starts
       * this.newContainerLoading is a Promise for the loading of the new container
       * (Barba.js also comes with an handy Promise polyfill!)
       */

      // As soon the loading is finished and the old page is faded out, let's fade the new page
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function() {
      /**
       * this.oldContainer is the HTMLElement of the old Container
       */
      // $('body').removeClass('transition');

      return $(this.oldContainer).animate({ opacity: 0 }).promise();
    },

    fadeIn: function() {
      /**
       * this.newContainer is the HTMLElement of the new Container
       * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
       * Please note, newContainer is available just after newContainerLoading is resolved!
       */

      var _this = this;
      var $el = $(this.newContainer);

      $(this.oldContainer).hide();

      // $('body').addClass('transition');


      $el.css({
        visibility : 'visible',
        opacity : 0
      });

      $el.animate({ opacity: 1 }, 400, function() {
        /**
         * Do not forget to call .done() as soon your transition is finished!
         * .done() will automatically remove from the DOM the old Container
         */

        _this.done(function() {
        });
      });
    }
  });

  /**
   * Next step, you have to tell Barba to use the new Transition
   */

  Barba.Pjax.getTransition = function() {
    /**
     * Here you can use your own logic!
     * For example you can use different Transition based on the current page or link...
     */

    console.log('in transition');

    return FadeTransition;

  };

  Barba.Dispatcher.on('linkClicked', function() {

    console.log('link clicked: ', this);

  });

  Barba.Dispatcher.on('newPageReady', function() {
    scrollToShow();
    fadeHeader();

    updateBodyLink(this.namespace);
    // $('.grid').masonry({
    //   // itemSelector: '.grid-item',
    //   // columnWidth: '.grid-sizer',
    //   // columnWidth: 300,
    //   percentPosition: true,
    //   // fitWidth: true,
    //   gutter: 30
    // });
    // initPhotoSwipeFromDOM('.projects-container');
  })


  var updateBodyLink = function (name) {

    $('body').removeClass();
    $('body').addClass(name);

  }

  var Homepage = Barba.BaseView.extend({
    namespace: 'home',
    onEnter: function() {

      console.log("alright, the homepage view is ready")
      updateBodyLink(this.namespace);

        // The new Container is ready and attached to the DOM.
    },
    onEnterCompleted: function(namespace) {
        // The Transition has just finished.
      console.log("alright, the homepage view enter has completed. here is the namespace: ", this.namespace);


    },
    onLeave: function() {

      console.log("alright, we are leaving the homepage view")

        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted: function() {
        // The Container has just been removed from the DOM.
    }
  });

  var About = Barba.BaseView.extend({
    namespace: 'about',
    onEnter: function() {

      console.log("alright, the about view is ready")
      updateBodyLink(this.namespace);

        // The new Container is ready and attached to the DOM.
    },
    onEnterCompleted: function() {
        // The Transition has just finished.
      console.log("alright, the about view enter has completed")
    },
    onLeave: function() {

      console.log("alright, we are leaving the about view")

        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted: function() {
        // The Container has just been removed from the DOM.
    }
  });

  var Web = Barba.BaseView.extend({
    namespace: 'web',
    onEnter: function() {

      console.log("alright, the web view is ready")
      updateBodyLink(this.namespace);

        // The new Container is ready and attached to the DOM.
    },
    onEnterCompleted: function() {
        // The Transition has just finished.
      console.log("alright, the web view enter has completed")
    },
    onLeave: function() {

      console.log("alright, we are leaving the web view")

        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted: function() {
        // The Container has just been removed from the DOM.
    }
  });

  var Photo = Barba.BaseView.extend({
    namespace: 'photo',
    onEnter: function() {

      console.log("alright, the photo view is ready")
      updateBodyLink(this.namespace);

        // The new Container is ready and attached to the DOM.
    },
    onEnterCompleted: function() {
        // The Transition has just finished.
      console.log("alright, the photo view enter has completed")
    },
    onLeave: function() {

      console.log("alright, we are leaving the photo view")

        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted: function() {
        // The Container has just been removed from the DOM.
    }
  });

  var Art = Barba.BaseView.extend({
    namespace: 'art',
    onEnter: function() {



      console.log("alright, the art view is ready")
      // updateBodyLink(this.namespace);
      // $('.grid').masonry({
      //   // itemSelector: '.grid-item',
      //   // columnWidth: '.grid-sizer',
      //   // columnWidth: 300,
      //   percentPosition: true,
      //   // fitWidth: true,
      //   gutter: 30
      // });

        // The new Container is ready and attached to the DOM.
    },
    onEnterCompleted: function() {
        // The Transition has just finished.
      console.log("alright, the art view enter has completed")
      console.log("here is the namespace", this.namespace);

      // initPhotoSwipeFromDOM('.projects-container');

      // For some reason, just the art namespace needs to be added in onEnterCompleted 
      updateBodyLink(this.namespace);

      $('.grid').masonry({
        // itemSelector: '.grid-item',
        // columnWidth: '.grid-sizer',
        // columnWidth: 300,
        percentPosition: true,
        // fitWidth: true,
        gutter: 30
      });
      initPhotoSwipeFromDOM('.projects-container');

    },
    onLeave: function() {

      console.log("alright, we are leaving the art view")

        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted: function() {
        // The Container has just been removed from the DOM.
    }
  });

Homepage.init();
Art.init();
Web.init();
Photo.init();
About.init();

Barba.Pjax.start();


});