// //http://tobiasahlin.com/moving-letters/# --> Out Now animation		
// $(document).ready(function(){

// 	// http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
// 	function isElementInViewport (el) 
// 	{
// 	    //special bonus for those using jQuery
// 	    if (typeof jQuery !== 'undefined' && el instanceof jQuery) el = el[0];

// 	    var rect = el.getBoundingClientRect();
// 	    var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
// 	    var windowWidth = (window.innerWidth || document.documentElement.clientWidth);

// 	    return (
// 	           (rect.left >= 0)
// 	        && (rect.top >= 0)
// 	        && ((rect.left + rect.width/2) <= windowWidth)
// 	        && ((rect.top + rect.height/2) <= windowHeight)
// 	    );

// 	}

// 	var scroll = window.requestAnimationFrame ||
//             function(callback){window.setTimeout(callback, 1000/60)};

// 	// seenYet = false;

//     function scrollToShow() {

// 	  var elementsToShow = document.querySelectorAll('.show-on-scroll');

// 	  elementsToShow.forEach(function (element) {
// 	  	// console.log('seenYet: ', seenYet);

// 	  	// elementSeenYet  = $(element).data('seen-yet');
// 	  	// console.log('elementSeenYet: ', elementSeenYet);
// 	    if (isElementInViewport(element)) {
// 	    	console.log('visible')

// 	      element.classList.add('visible');
// 	      element.classList.add('play');

// 	      // if ($(element).data('seen-yet') == false) {
// 	      // 	console.log("hey, this thing hasn't been seen yet")
// 	      // 	element.classList.add('play');
// 	      // 	seenYet = true;
// 	      // 	$(element).data('seen-yet', true);

// 	      // } else {
// 	      // 	element.classList.remove('play');
// 	      // }
// 	    } else {
// 	    	console.log('invisible')
// 	      // element.classList.remove('visible');
//      	  // element.classList.remove('play');
//      	  // seenYet = true;
// 	    }
// 	  });

// 	  scroll(scrollToShow);

// 	}

// 	scrollToShow();

// 	function fadeHeader() {
// 		if ($(window).scrollTop() >= $('.site-header').outerHeight() * 2) {
// 	      $('header').addClass('scroll-away');
// 	      $('header').removeClass('scroll-in');
// 	      $('header').removeClass('initial');
// 	      console.log('we are scrolling out');

// 	    } else if ($(window).scrollTop() <= $('.site-header').outerHeight() * 2 && !$('.siteheader').hasClass('initial')) {

// 	    	console.log('we are scrolling in');
// 	      $('header').removeClass('scroll-away');
// 	      $('header').addClass('scroll-in');
// 	    };

// 	    scroll(fadeHeader);
// 	}

// 	fadeHeader();

// });