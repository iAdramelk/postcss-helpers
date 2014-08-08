'use strict';

// using URLjs because I don't want to think about all this:
// http://blog.lunatech.com/2009/02/03/what-every-web-developer-must-know-about-url-encoding
var regexp    = require( './regexp' );
var URI    = require( 'URIjs' );
var UrlHelper = require( './url' );

/**
 * ImportHelper constructor
 * @constructor
 * @param {String} rule @import value.
 */
var ImportHelper = function ( rule ) {
    var exports = {};

    if ( ! ( this instanceof ImportHelper ) ) {
        return new ImportHelper( rule );
    }

    this._originalURI = this._extractURI( rule );

    if ( !this._originalURI ) { return false; }

    this._originalRule = rule;

    this.URI = URI( this._originalURI );

    exports.URI             = this.URI;
    exports.getOriginalURI  = this.getOriginalURI.bind(  this );
    exports.getModifiedRule = this.getModifiedRule.bind( this );
    exports.getOriginalRule = this.getOriginalRule.bind( this );

    return exports;
};

ImportHelper.prototype = UrlHelper.prototype;

ImportHelper.prototype.constructor = ImportHelper;

/**
 * Extracts URI from rule.
 * @private
 * @param   {String} rule String to test.
 * @returns {String|undefined} Returns URI value or undefined.
 */
ImportHelper.prototype._extractURI = function( rule ) {
    if ( rule.match( regexp.URLS ) ) {
        return rule.match( regexp.URLS )[ 0 ]
            .replace( /^url\s?\(/, '' )
            .replace( /\)$/, '' )
            .trim()
            .replace( /^("|\')/, '' )
            .replace( /("|\')$/, '' );
    }

    else if ( rule.match( regexp.STRINGS ) ) {
        return rule.match( regexp.STRINGS )[ 0 ]
            .replace( /^("|\')/, '' )
            .replace( /("|\')$/, '' );
    }

};

module.exports = ImportHelper;
