/* XML.js, erh, 01 August 2006                                               */
/******************************************************************************
@NAME
	XML -- Basic XML Parsing library

@SYNOPSIS
		Pirate.Captain('XML');

		var parser = new Pirate.Charter('XML');

		var xmlStr = parser.parse(XHR.responseXML);

@DESCRIPTION
	The XML Ship is a simplistic XML parsing library capable of
	changing XML structures into string form.

	This library borrows heavily on concepts found in the 
	OpenRICO library located at:
		
		http://openrico.org

@COPYRIGHT
	Copyright (c) 2006 Eric Ryan Harrison. All rights reserved. This 
	program is free software; you can redistribute it and/or modify
	it under the same terms as pirate! itself.
******************************************************************************/
Pirate.Ship('XML',function(){
	this.Version = 'Alabama.Matthew.Sun["morning"]';

	// The _Serializer is a reference to the Mozilla
	// XMLSerializer() object. If the browser is
	// IE, this will be null.
	this._Serializer = null;

	this.parse = function(xmlNode) {
		this.Xml = xmlNode;
		if ( this.Xml.xml != undefined ) {
			this._Serializer = null;
		} else {
			this._Serializer = new XMLSerializer();
		}
		return(this._parseNode());
	};

	this._parseNode = function(xmlNode) {
		var xmlDoc     = xmlNode || this.Xml;
		var contentStr = '';
		for ( var i = 0, l = xmlDoc.childNodes.length; i < l; i++ ) {
			var n = xmlDoc.childNodes[i];
			if ( n.nodeType == 4 ) {
				contentStr = contentStr + n.nodeValue;
			} else {
				contentStr = contentStr + this.serialize(n);
			}
		}
		xmlDoc   = null;
		this.Xml = null;
		return contentStr;
	};
	
	this.serialize = function(xmlNode) {
		return this._serializer ?
			this._serializer.serializeToString(xmlNode) :
			xmlNode.xml;
	};
});
