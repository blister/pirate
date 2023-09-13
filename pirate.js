/* pirate.js, erh, 01 August 2006                                            */
/******************************************************************************
@NAME
	pirate! -- Programmable Interface Referencing Applicable Tailored Entities!

@SYNOPSIS
	<script type="text/javascript" src="/pirate/pirate.js"></script>

@DESCRIPTION
	This is the primary interface instance of the meat of pirate! logic
	code and is the only real requirement to pirate! execution. This
	system is best used through the implicit import of various other
	predefined packages called "Ships" which can be found in either your
	local repository (Harbor) or online at the pirate! project's online
	Harbor.

@COPYRIGHT
	Copyright (c) 2006 Eric Ryan Harrison. All rights reserved. This 
	program is free software; you can redistribute it and/or modify
	it under the terms of the GNU LGPL license found in the licenses
	folder of this distribution. You may also find a copy of this 
	license on the pirate! project website at:

		http://pirate-js.sourceforge.net/license/pirate.html

	Unless otherwise noted, it is a valid assumption that any Ship
	found in the Harbor included with this distribution is also
	licensed under this license or similiar free license. 
	NO WARRANTY FOR THIS SOFTWARE IS GIVEN.
******************************************************************************/

/* Pirate, default object */
var Pirate = {
	path:     '/pirate/', // CHANGE THIS LOCATION TO REFLECT YOUR INSTALLATION
	name:     'pirate!',
	full:     'Programmable Interface Referencing Applicable Tailored Entities!',
	Version:  '0.2.5',
	Harbor:   {}, // active harbor constructor
	Fleet:    {}, // fleet of Ships
	Watches:  {}, // Store all watches here.
	Loot:     {}, // Store all objects that have been exported.
	toString: function() { return this.Version.toString(); }
};

/* local harbor repository, this is probably fine */
Pirate.Harbor.path = Pirate.path + 'Harbor/';

/* window reference ( just for safety ) */
Pirate.$sea = this; // make sure we have access to global scope

/* ShipYard - Create ye some ships here matey! */
Pirate.Ship = function(shipName,ship) {
	Pirate.Notify('Pirate.Ship','Load',shipName);
	if ( typeof ship == 'function' ) {
		var hull = new ship(); // build our ship's backbone
		Pirate.Board(hull,{
			Ship: shipName,
			toString: function() { return this.Ship; },
			'_private': {
				Hull:   ship,
				Export: hull.Export // exportable methods	
			}
		});

		var __Exporter = hull['__private']['Export'];
		for ( var member in __Exporter ) {
			if ( typeof __Exporter[member] == 'string' && hull[__Exporter[member]] ) {
				__Exporter[member] = hull[__Exporter[member]];
			}
		}
		
		Pirate.Board(Pirate.Loot,__Exporter);  // store our exports as Loot
		Pirate.Board(Pirate.$sea,Pirate.Loot); // make our loot accessible to the $sea!
	
		Pirate.Harbor[pkg] = hull; // make our new Ship available to the Harbor
		
		Pirate.Notify('Pirate.Ship','Complete',shipName);

		return(Pirate.Harbor[pkg]);
	}

	if ( ship && ship['use'] && Pirate.Fleet[ship['use']] ) {
		if ( Pirate.Harbor[ship['use']]['Hull']['Export'] ) {
			Pirate.Board(
				ship,
				Pirate.Harbor[ ship['use'] ]['Hull'][ 
					Pirate.Harbor[ ship['use'] ]['Hull']['Export'] 
				]
			);
		}
		Pirate.Board(ship,Pirate.Harbor[ ship['use'] ]);
	}
	if ( ship ) {
		Pirate.Harbor[shipName] = { Ship: shipName, Hull: ship };
	}
	
	Pirate.Notify('Pirate.Ship','Complete',shipName);
	
	return(Pirate.Harbor[shipName]);
};
Pirate.Ship.prototype.toString = function() { return this.Ship; };
//var Ship = Pirate.Ship; // globalize Pirate.Ship() for ease.

/* ship constructor */
Pirate.Charter = function(ship,img) {
	Pirate.Fleet[ship] = Pirate.Harbor[ship] || ship;
	// if a launch party is defined, we'll execute it before shoving out to $sea.
	if ( Pirate.Fleet[ship].Launch && typeof Pirate.Fleet[ship].Launch == 'function' ) {
		var launch = new Pirate.Fleet[ship].Launch();
		Pirate.Board(Pirate.Fleet[ship],launch);
	}
	return(Pirate.Fleet[ship]);
};

/* pirate! Custom Event Mechanism (BETA FEATURE) */
/******************************************************************************
@NAME
	Pirate.Watch() - Create custom pirate! event

@SYNOPSIS
		Pirate.Watch( 'Pirate.Ship', 'Init', function() {}, 100);

******************************************************************************/
Pirate.Watch = function( member, wait_for, command, limit ) {
	if ( ! (member in Pirate.Watches) ) {
		Pirate.Watches[member] = {};
	}
	Pirate.Watches[member][wait_for] = {
		'command' : command,
		'limit'   : limit || null,
		'times'   : 0
	};
};

// message is basically just the arguments of the call
Pirate.Notify = function( member, wait_for, message ) {
	if ( member in Pirate.Watches && wait_for in Pirate.Watches[member] ) {
		Pirate.Attack(member, wait_for, message);
		Pirate.Watches[member][wait_for]['times']++;
		
		if ( 
			Pirate.Watches[member][wait_for]['limit'] &&
			Pirate.Watches[member][wait_for]['times'] >=
				Pirate.Watches[member][wait_for]['limit'] 
		) {
			delete Pirate.Watches[member][wait_for];
		}
	}
};

Pirate.Attack = function (member, wait_for, message ) {
	var _command = Pirate.Watches[member][wait_for]['command'];
	if ( typeof _command == 'function' ) {
		_command(message);
	} else if ( typeof _command == 'string' ) {
		setTimeout(function() { eval(_command); },10);
	}

};

// ok, this event listeners name is a bit of a stretch... but we need
// event management of some type and this is the best name I could think of 
//
// Pirates give commands... :D 
Pirate.Command = function(member, wait_for, command, watch) {
	if ( member.addEventListener ) {
		member.addEventListener(wait_for,command,watch);
		return true;
	} else if ( member.attachEvent ) {
		var r = member.attachEvent('on' + wait_for, command);
		return r;
	} else {
		member['on' + wait_for] = command;
		return true;
	}

	// if we get to here with no prior return, your browser sucks
	// and won't let us attach events.
	return false;
};

Pirate.Captain = function(ship,imp) {
	/* TODO:
	**   This isn't working quite how I'd want it to.
	**   It's continually adding scripts, even if they've
	**   already been sourced. Fix this minor bug to make
	**   yourself happy! 
	*/
	if ( ship && !Pirate.Harbor[ship] ) {
		// our ship isn't in the harbor, so let's try to 
		// add it to the $sea so we can steal it! arggg!!!
		var God = document.getElementsByTagName('head')[0];
		if ( /::/.test(ship) ) {
			var ships     = ship.split('::');
			var ship_loc  = '';
			var ship_name = '';
			for ( var i = 0, l = ships.length; i < l; i++ ) {
				// TODO: fix later!
				// these next few lines are a dirty hack, 
				ship_loc   = ship_loc  + ships[i]; // actual script
				ship_name  = ship_name + ships[i]; // Ship name
				if ( ! Pirate.Harbor[ship_name] ) {
					var script = document.createElement('script');
					script.src = Pirate.path + ship_loc + '.js';
					God.appendChild(script);
				} 
				
				ship_loc  = ship_loc  + '/';
				ship_name = ship_name + '::';
			}
		} else {
			var script = document.createElement('script');
			script.src = Pirate.path + ship + '.js';
			God.appendChild(script);
		}
	}
	
	// hopefully the sourcing will be done by now and it'll be in the harbor
	if ( ship && Pirate.Harbor[ship] ) {
		return(Pirate.Harbor[ship]);
	}

	// by now if the ship isn't available to us, it probably never will be.
	// just return something they can work with. This should be considered
	// an error condition, but until we can figure out how we're going to
	// gracefully do all of this we'll just give them a blank object.
	return(ship); 
};
//var Captain = Pirate.Captain; // again with the ease-of-use globals

/* Plundering is best, but you've got to 'board' the ship before you plunder her! */
Pirate.Board = function(target,pirates) {
	for ( var member in pirates ) {
		target[member] = pirates[member];
	}
	return target;
};

/* Graciously looted from prototype.js [Sam Stephenson: You are my hero!] */
Pirate.Try = {
	these: function() {
		var returnValue;

		for (var i = 0, l = arguments.length; i < l; i++ ) {
			var lambda = arguments[i];
			try {
				returnValue = lambda();
				break;
			} catch (e) {}	
		}		
		return returnValue;
	}
};
var Try = Pirate.Try;

/* Binder for 'this' when inside nested object structures */
Function.prototype.wrap = function() {
	var __method = this, args = arguments, object = Array.shift(args);
	return function() {
		return __method.apply(object,Array.concat(arguments));	
	}
};

/* top level library requirement imports */

// we use DOM all the time because I require $() for document.getElementById()
Pirate.Captain('DOM'); 
Pirate.Captain('Date'); 

/*** Don't get scurvy! Eat more lemons! ***/
