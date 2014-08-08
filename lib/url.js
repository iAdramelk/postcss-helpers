'use strict';

// using URLjs because I don't want to think about all this:
// http://blog.lunatech.com/2009/02/03/what-every-web-developer-must-know-about-url-encoding
var URI    = require( 'URIjs' );
var regexp = require( './regexp' );

/**
 * UrlHelper constructor
 * @constructor
 * @param {String} rule CSS rule with url().
 */
var UrlHelper = function ( rule ) {
    var exports = {};

    if ( ! ( this instanceof UrlHelper ) ) {
        return new UrlHelper( rule );
    }

    this._originalURI = this._extractURI( rule );

    if ( !this._originalURI ) { return false; }

    this._originalRule = rule;

    this.URI = URI( this._originalURI );

    exports.URI             = this.URI;
    exports.getModifiedRule = this.getModifiedRule.bind( this );
    exports.getOriginalRule = this.getOriginalRule.bind( this );

    return exports;
};

/**
 * Extracts URI from rule.
 * @private
 * @param   {String} rule String to test.
 * @returns {String|undefined} Returns URI value or undefined.
 */
UrlHelper.prototype._extractURI = function( rule ) {
    if ( rule.match( regexp.URLS ) ) {
        return rule.match( regexp.URLS )[ 0 ]
            .replace( /^url\s?\(/, '' )
            .replace( /\)$/, '' )
            .trim()
            .replace( /^("|\')/, '' )
            .replace( /("|\')$/, '' );
    }
};

/**
 * Returns original URI.
 * @returns {String} Original URI.
 */
UrlHelper.prototype.getOriginalURI = function () {
    return this._originalURI;
};

/**
 * Returns modified rule.
 * @returns {String} Modified rule.
 */
UrlHelper.prototype.getModifiedRule = function () {
    return this._originalRule.replace( this._originalURI, this.URI.toString() );
};

/**
 * Returns original rule.
 * @returns {String} Original rule.
 */
UrlHelper.prototype.getOriginalRule = function () {
    return this._originalRule;
};

module.exports = UrlHelper;
