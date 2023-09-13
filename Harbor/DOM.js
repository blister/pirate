/* DOM.js, erh, 01 August 2006                                               */
/******************************************************************************
@NAME
	DOM -- Document Object Model Primary Interface

@SYNOPSIS
		Pirate.Captain('DOM');

@DESCRIPTION
	This library is a pirate! requirement and provides methods 
	and functions to help manipulate the DOM.

	This library is based primarily on parts of prototype.js,
	written by Sam Stephenson. He does not endorse or support
	this Ship or this project. Sam Stephenson still retains
	copyright over all bits of logic from prototype.js.

@COPYRIGHT
	Copyright (c) 2006 Eric Ryan Harrison. All rights reserved. This 
	program is free software; you can redistribute it and/or modify
	it under the same terms as pirate! itself.

------------------------------------------------------------------------------

	Prototype JavaScript framework, version 1.4.0
	(c) 2005 Sam Stephenson <sam@conio.net>
 
	Prototype is freely distributable under the terms of an 
	MIT-style license. For details, see the Prototype web site:

		http://prototype.conio.net/

******************************************************************************/

/* A LOT of credit needs to go to Sam Stephenson and prototype.js. Most of this code is
heavily inspired by their work, if not blatently stolen without their knowledge. Anything
that looks like it's their work probably is and they own the copyright on. I've just tweaked
a few things and mashed it into a pirate! Ship. They deserve all the credit though. */
Pirate.Ship('DOM',function() {
	this.Version = 'Alabama.Matthew.Sun["morning"]';

	var ScriptFragment = '(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)';

	this.Methods = {

		visible: function (element) {
			return $(element).style.display != 'none';
		},

		toggle: function() {
			for ( var i = 0, l = arguments.length; i < l; i++ ) {
				var element = $(arguments[i]);
				Element[ELement.visible(element) ? 'hide' : 'show'](element);
			}	
		},

		hide: function() {
			for ( var i = 0, l = arguments.length; i < l; i++ ) {
				var element = $(arguments[i]);
				element.style.display = 'none';
			}
		},

		show: function() {
			for ( var i = 0, l = arguments.length; i < l; i++ ) {
				var element = $(arguments[i]);
				element.style.display = '';
			}
		},

		remove: function(element) {
			element = $(element);
			element.parentNode.removeChild(element);
		},

		update: function(element) {
			$(element).innerHTML = stripScripts(html);
			setTimeout(function() { evalScripts(html); }, 10);
		},

		prepend: function(element,html) {
			this.update(element,$(element).innerHTML + html);
		},

		append: function(element,html) {
			var cur_html = $(element).innerHTML;
			this.update(element,cur_html + html);
		},

		replace: function(element,html) {
			element = $(element);
			if ( element && (element.outerHTML) ) {
				element.outerHTML = stripScripts(html);			
			} else {
				var range = element.ownerDocument.createRange();
				range.selectNodeContents(element);
				element.parentNode.replaceChild(
					range.createContextualFragment(stripScripts(html)),
					element
				);		
			}	
			setTimeout(function() { evalScripts(html); }, 10);
		},

		getHeight: function(element) {
			element = $(element);
			return element.offsetHeight;
		},
		
		getWidth: function(element) {
			element = $(element);
			return element.offsetWidth;
		},

		empty: function(element) {
			return $(element).innerHTML.match(/^\s*$/);
		}
	};

	var stripScripts = function(html) {
		return html.replace(new RegExp(ScriptFragment, 'img'), '');
	};

	var evalScripts = function(html) {
		return extractScripts(html).map(function(script) { return eval(script); } );	
	};

	var extractScripts = function(html) {
		var matchAll = new RegExp(ScriptFragment, 'img');
		var matchOne = new RegExp(ScriptFragment, 'im' );
		return (html.match(matchAll) || []).map(function(scriptTag) { 
			return ( scriptTag.match(matchOne) || ['', ''])[1];
		});
	};

	/* The worlds greatest function and the reason I got back into Javascript after
	abandoning it over 6 years ago in a fit of rage. */
	var $ = function() {
		var results = [], element;
		for ( var i = 0, l = arguments.length; i < l; i++ ) {
			element = arguments[i];
			if ( typeof element == 'string' ) {
				element = document.getElementById(element);
			}
			results.push(element);
		}
		return results.length < 2 ? results[0] : results;
	};

	/* Stuff we want to share with everyone in the $sea! */
	this.Export = { $: $, Element: this.Methods };
});
