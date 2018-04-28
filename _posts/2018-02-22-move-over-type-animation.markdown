---
layout: post
title:  "Move Over Type Animation"
date:   2018-02-22 22:52:46 -0500
categories: code snippet
---

Below you'll find a goofy type animation I discovered:
<div class="wrapper">
             

	 <h3 class="introduction">

	 	
 		<span class="letter-1">O</span>
 	
 		<span class="letter-2">h</span>
 	
 		<span class="letter-3">,</span>
 	
 		<span class="letter-4"> </span>
 	
 		<span class="letter-5">H</span>
 	
 		<span class="letter-6">e</span>
 	
 		<span class="letter-7">y</span>
 	
 		<span class="letter-8"> </span>
 	
 		<span class="letter-9">T</span>
 	
 		<span class="letter-10">h</span>
 	
 		<span class="letter-11">e</span>
 	
 		<span class="letter-12">r</span>
 	
 		<span class="letter-13">e</span>
 	
	 	
	 </h3>
</div>

Here is the HTML: 

<pre>
  <code>
	<div class="wrapper">
        <h3 class="introduction">
			<span class="letter-1">O</span>
			<span class="letter-2">h</span>
			<span class="letter-3">,</span>
			<span class="letter-4"> </span>
			<span class="letter-5">H</span>
			<span class="letter-6">e</span>
			<span class="letter-7">y</span>
			<span class="letter-8"> </span>
			<span class="letter-9">T</span>
			<span class="letter-10">h</span>
			<span class="letter-11">e</span>
			<span class="letter-12">r</span>
			<span class="letter-13">e</span>
		</h3>
      </div>
	</code>
</pre>


And here is the SCSS: 


<pre>
	<code>
		@keyframes bounceLetter {
		  
		  0% {
		    opacity: 0;
		    transform: translateY(-60%);
		  }
		  75% {
		    transform: translate(-150%, 0);
		  }
		  100% {
		    opacity: 1;
		    transform: none;
		  }
		}
		@mixin bounceLetter ($timing) {
		  @include prefix-animation(bounceLetter $timing cubic-bezier(0.21,-0.01, 0.38, 1.2) forwards);
		}
		.introduction {
			text-align: center;
			font-size: 90px;
			font-family: sans-serif;
			$letters: 30;

			@for $i from 1 through $letters {
			    $time: #{$i*.1}s;
			    .letter-#{$i} { 
			    	position: relative;
			    	display: inline-block;
			    	background-color: transparent;
			       @include bounceLetter($time);	
			    }
			}
		}
	</code>
</pre>