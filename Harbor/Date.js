/* Date.js, erh, 01 August 2006                                              */
/******************************************************************************
@NAME
	Date -- Date namespace and simple library.

@SYNOPSIS
		Pirate.Captain('Date');

		var epoch_time = time();
		var date_obj   = date();	
		

@DESCRIPTION
	This is a very lightweight wrapper for the Date namespace
	with additional export of two functions to (hopefully) make
	date manipulation slightly easier.

	= time()  
		This function returns a Unix (epoch) timestamp
		of milliseconds since Unix epoch time.

	= date( [Date] ) 
		This function returns a new Date() object for 
		general use each time it is called. It has an
		optional Date argument to return a new Date()
		object set to a specific time.

@COPYRIGHT
	Copyright (c) 2006 Eric Ryan Harrison. All rights reserved. This 
	program is free software; you can redistribute it and/or modify
	it under the same terms as pirate! itself.
******************************************************************************/

Pirate.Ship('Date',function() {
	this.Version = 'Alabama.Matthew.Sun["morning"]';

	if ( ! Pirate.$sea.Date || typeof Pirate.$sea.Date != 'function' ) {
		throw(
			"Fatal: No compatable Date method located " + 
			"in the global scope. [" + Pirate.$sea.Date + "]"
		);
	}

	// do we want to allow multiple arguments to return an
	// array of Date() objects?
	this.date = function() {
		return new Date(arguments[0] || new Date()); 
	};

	this.time = function() {
		return (this.date()).getTime();
	};

	this.Export = {
		date: this.date,
		time: this.time
	};
});
