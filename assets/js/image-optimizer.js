var imageOptimizer = function(galleryContainer, masonryInstance) {
    if (typeof galleryContainer === undefined || galleryContainer === null) {
        galleryContainer = '.grid';
    }
    var container = document.querySelector(galleryContainer);
    var lazyImages = [].slice.call(container.querySelectorAll('img.lazy'));

    var observeImages = function() {
        config = {
            // If the image gets within 250px of the browser's viewport,
            // start the download:
            rootMargin: '250px 0px',
        };
        var lazyImageObserver = new IntersectionObserver(
            function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting && entry.intersectionRatio > 0) {
                        var lazyImage = entry.target;
                        var downloadingImage = new Image();
                        downloadingImage.onload = function () {
                            lazyImage.src = this.src;
                            $lazyImage = $(lazyImage);
                            // $lazyImage.parent().addClass('unblur');
                            $lazyImage.removeClass('blur');
                            lazyImage.classList.add('unblur');
                            if (masonryInstance !== null && typeof masonryInstance !== undefined) {
                                $(galleryContainer).masonry('layout');
                            }
                        }
                        downloadingImage.src = lazyImage.dataset.src;

                        lazyImageObserver.unobserve(lazyImage);
                    } else {
                    }
                });
            }, config);
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
    if ('IntersectionObserver' in window) {
        observeImages();
    } else {
        function loadScript(url, callback) {
            // Adding the script tag to the head as suggested before
            var head = document.head;
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            script.onreadystatechange = callback;
            script.onload = callback;

            // Fire the loading
            head.appendChild(script);
        }
        // If I wanted to load from the polyfill server instead
        // loadScript("https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver%2CIntersectionObserverEntry", observeImages);
        loadScript("/assets/compiled/js/intersectionObserverPolyfill.js", observeImages);

        // Old approach, which forced a download of all images up-front
        // For browsers that don't support IntersectionObserver yet,
        // load all the images now:
        // lazyImages.forEach(function(lazyImage) {
        //     lazyImage.src = lazyImage.dataset.src;
        //     lazyImage.classList.remove('blur');
        //     lazyImage.classList.add('unblur');
        // });
    }
}

// imageOptimizer();