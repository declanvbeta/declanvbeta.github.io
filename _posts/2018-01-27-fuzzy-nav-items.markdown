---
layout: post
title:  "Fuzzy header items"
date:   2018-01-27 22:25:46 -0500
categories: code snippet
---

Below you'll find an approach to nav items I cooked up where they are initially blurred and come into focus on hover.
Bonus is the changing gradient border.

<style type='text/css'>
.site-header {
  background-color: white;
  border-top: 0;
  color: transparent;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  vertical-align: bottom;
  z-index: 2;
  text-shadow: 0px 0px 3px rgba(122, 95, 255, 0.75);
}
.site-header:after {
  content: "";
  height: 3px;
  left: 0;
  position: absolute;
  bottom: 0;
  width: 400%;
  will-change: transform;
  z-index: 1;
  animation: underline-gradient 6s linear infinite;
  background-image: linear-gradient(90deg, rgba(122, 95, 255, 0.8) 15%, rgba(1, 255, 137, 0.6) 35%, rgba(122, 95, 255, 0.8) 85%);
}
.site-header .site-title {
  font-size: 25px;
  font-weight: 100;
  color: #3eafc4;
  text-shadow: none;
  text-decoration: none;
}
.site-header .trigger .page-link {
  font-size: 18px;
  font-weight: 900;
  text-transform: uppercase;
  padding: 5px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
  color: transparent;
  text-decoration: none;
  z-index: 2;
  -webkit-transition: text-shadow 0.5s, color 0.5s;
  transition: text-shadow 0.5s, color 0.5s;
}
.site-header .trigger .page-link:hover, .site-header .trigger .page-link:active {
  text-shadow: none;
  color: #3eafc4;
  -webkit-transition: text-shadow 0.5s, color 0.5s;
  transition: text-shadow 0.5s, color 0.5s;
}
.site-header .trigger .page-link.active {
  text-shadow: none;
  color: #3eafc4;
}
</style>

<header class="site-header" role="banner">
  <div class="wrapper">
    <a class="site-title" href="/">Site Name</a>
      <nav class="site-nav">
        <input type="checkbox" id="nav-trigger" class="nav-trigger">
        <label for="nav-trigger">
          <span class="menu-icon">
            <svg viewBox="0 0 18 15" width="18px" height="15px">
              <path fill="#424242" d="M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.031C17.335,0,18,0.665,18,1.484L18,1.484z"></path>
              <path fill="#424242" d="M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0c0-0.82,0.665-1.484,1.484-1.484 h15.031C17.335,6.031,18,6.696,18,7.516L18,7.516z"></path>
              <path fill="#424242" d="M18,13.516C18,14.335,17.335,15,16.516,15H1.484C0.665,15,0,14.335,0,13.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.031C17.335,12.031,18,12.696,18,13.516L18,13.516z"></path>
            </svg>
          </span>
        </label>
        <div class="trigger">
              <a class="page-link" href="/item-1/">
                item 1
              </a>
              <a class="page-link" href="/item-2/">
                item 2
              </a>
              <a class="page-link" href="/item-3/">
                item 3
              </a>
        </div>
      </nav>
  </div>

</header>

Here is the HTML: 

<pre>
  <code>

	&lt;header class=&quot;site-header&quot; role=&quot;banner&quot;&gt;
	  &lt;div class=&quot;wrapper&quot;&gt;
	    &lt;a class=&quot;site-title&quot; href=&quot;/&quot;&gt;Site Name&lt;/a&gt;
	      &lt;nav class=&quot;site-nav&quot;&gt;
	        &lt;input type=&quot;checkbox&quot; id=&quot;nav-trigger&quot; class=&quot;nav-trigger&quot;&gt;
	        &lt;label for=&quot;nav-trigger&quot;&gt;
	          &lt;span class=&quot;menu-icon&quot;&gt;
	            &lt;svg viewBox=&quot;0 0 18 15&quot; width=&quot;18px&quot; height=&quot;15px&quot;&gt;
	              &lt;path fill=&quot;#424242&quot; d=&quot;M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.031C17.335,0,18,0.665,18,1.484L18,1.484z&quot;&gt;&lt;/path&gt;
	              &lt;path fill=&quot;#424242&quot; d=&quot;M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0c0-0.82,0.665-1.484,1.484-1.484 h15.031C17.335,6.031,18,6.696,18,7.516L18,7.516z&quot;&gt;&lt;/path&gt;
	              &lt;path fill=&quot;#424242&quot; d=&quot;M18,13.516C18,14.335,17.335,15,16.516,15H1.484C0.665,15,0,14.335,0,13.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.031C17.335,12.031,18,12.696,18,13.516L18,13.516z&quot;&gt;&lt;/path&gt;
	            &lt;/svg&gt;
	          &lt;/span&gt;
	        &lt;/label&gt;
	        &lt;div class=&quot;trigger&quot;&gt;
	              &lt;a class=&quot;page-link&quot; href=&quot;/item-1/&quot;&gt;
	                item 1
	              &lt;/a&gt;
	              &lt;a class=&quot;page-link&quot; href=&quot;/item-2/&quot;&gt;
	                item 2
	              &lt;/a&gt;
	              &lt;a class=&quot;page-link&quot; href=&quot;/item-3/&quot;&gt;
	                item 3
	              &lt;/a&gt;
	        &lt;/div&gt;
	      &lt;/nav&gt;
	  &lt;/div&gt;

	&lt;/header&gt;

	</code>
</pre>


And here is the CSS: 


<pre>
	<code>
		.site-header {
		  background-color: white;
		  border-top: 0;
		  color: transparent;
		  overflow: hidden;
		  position: relative;
		  text-decoration: none;
		  vertical-align: bottom;
		  z-index: 2;
		  text-shadow: 0px 0px 3px rgba(122, 95, 255, 0.75);
		}
		.site-header:after {
		  content: "";
		  height: 3px;
		  left: 0;
		  position: absolute;
		  bottom: 0;
		  width: 400%;
		  will-change: transform;
		  z-index: 1;
		  animation: underline-gradient 6s linear infinite;
		  background-image: linear-gradient(90deg, rgba(122, 95, 255, 0.8) 15%, rgba(1, 255, 137, 0.6) 35%, rgba(122, 95, 255, 0.8) 85%);
		}
		.site-header .site-title {
		  font-size: 25px;
		  font-weight: 100;
		  color: #3eafc4;
		  text-shadow: none;
		  text-decoration: none;
		}
		.site-header .trigger .page-link {
		  font-size: 18px;
		  font-weight: 900;
		  text-transform: uppercase;
		  padding: 5px;
		  -webkit-box-sizing: border-box;
		  -moz-box-sizing: border-box;
		  -ms-box-sizing: border-box;
		  box-sizing: border-box;
		  color: transparent;
		  text-decoration: none;
		  z-index: 2;
		  -webkit-transition: text-shadow 0.5s, color 0.5s;
		  transition: text-shadow 0.5s, color 0.5s;
		}
		.site-header .trigger .page-link:hover, .site-header .trigger .page-link:active {
		  text-shadow: none;
		  color: #3eafc4;
		  -webkit-transition: text-shadow 0.5s, color 0.5s;
		  transition: text-shadow 0.5s, color 0.5s;
		}
		.site-header .trigger .page-link.active {
		  text-shadow: none;
		  color: #3eafc4;
		}
	</code>
</pre>