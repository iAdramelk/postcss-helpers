/*global describe, it */
'use strict';

var assert       = require( 'assert' );
var UrlHelper    = require( './../lib/url' );
var UrlsHelper   = require( './../lib/urls' );
var ImportHelper = require( './../lib/import' );


/**
* UrlHelper fuxtures
*/

var UrlRules = [
    {
        originalRule:   'url( \'http://google.com/logo.png\' ) no-repeat top left',
        originalSuffix: 'png',
        modifiedHref:   'logo.png',
        modifiedRule:   'url( \'logo.png\' ) no-repeat top left',
    },
    {
        originalRule:   'url( "http://google.com/logo.png" ) no-repeat top left',
        originalSuffix: 'png',
        modifiedHref:   'logo.png',
        modifiedRule:   'url( "logo.png" ) no-repeat top left',
    },
    {
        originalRule:   'url( http://google.com/logo.png ) no-repeat top left',
        originalSuffix: 'png',
        modifiedHref:   'logo.png',
        modifiedRule:   'url( logo.png ) no-repeat top left',

    }
];

/**
* UrlHelper tests
*/

UrlRules.forEach( function( v ) {
    describe( 'UrlHelper("' + v.originalRule + '")', function() {
        var h = new UrlHelper( v.originalRule );

        describe( '#getOriginalRule()', function() {
            it( 'should return "' + v.originalRule, function() {
                assert.equal( h.getOriginalRule(), v.originalRule );
            });
        });

        describe( '#URI.suffix()', function() {
            it( 'should return "' + v.originalSuffix, function() {
                assert.equal( h.URI.suffix(), v.originalSuffix );
            });
        });

        describe( '#URI.href()', function() {
            it( 'should return "' + v.modifiedHref + '" after #URI.href(' + v.modifiedHref + ')', function() {
                h.URI.href( v.modifiedHref );
                assert.equal( h.URI.href(), v.modifiedHref );
            });
        });

        describe( '#getModifiedRule()', function() {
            it( 'should return "' + v.modifiedRule + ' after #URI.href(' + v.modifiedHref + ')', function() {
                assert.equal( h.getModifiedRule(), v.modifiedRule );
            });
        });
    } );
} );

/**
* UrlsHelper fuxtures
*/

var UrlsRules = [
    {
        originalURIS:   [ '1.jpg', '2.png' ],
        originalRule:   'url( \'1.jpg\' ) no-repeat top left, url( \'2.png\' )',
        modifiedHref:   '3.svg',
        modifiedRule:   'url( \'3.svg\' ) no-repeat top left, url( \'3.svg\' )',
    },
    {
        originalURIS:   [ '1.jpg', '2.png' ],
        originalRule:   'url( "1.jpg" ) no-repeat top left, url( "2.png" )',
        modifiedHref:   '3.svg',
        modifiedRule:   'url( "3.svg" ) no-repeat top left, url( "3.svg" )',
    },
    {
        originalURIS:   [ '1.jpg', '2.png' ],
        originalRule:   'url( 1.jpg ) no-repeat top left, url( 2.png )',
        modifiedHref:   '3.svg',
        modifiedRule:   'url( 3.svg ) no-repeat top left, url( 3.svg )',
    },
];


/**
* UrlsHelper tests
*/

UrlsRules.forEach( function( v ) {
    describe( 'UrlsHelper("' + v.originalRule + '")', function() {
        var h = new UrlsHelper( v.originalRule );

        describe( '#URIS array', function() {
            it( 'should contain "' + v.originalURIS[0] + '" and "' + v.originalURIS[ 1 ] + '"' , function() {
                assert.deepEqual( [ h.URIS[ 0 ].href(), h.URIS[ 1 ].href() ], v.originalURIS );
            });
        });

        describe( '#getOriginalRule()', function() {
            it( 'should return "' + v.originalRule, function() {
                assert.equal( h.getOriginalRule(), v.originalRule );
            });
        });

        describe( '#getModifiedRule()', function() {
            it( 'should return "' + v.modifiedRule + ' after setting #URI.href(' + v.modifiedHref + ') to each object in URIS.', function() {
                h.URIS.forEach( function( uri ) { uri.href( v.modifiedHref ); } );
                assert.equal( h.getModifiedRule(), v.modifiedRule );
            });
        });
    } );
} );

/**
* ImportHelper fuxtures
*/

var ImportRules = [
    {
        originalRule:   'url("fineprint.css") print',
        modifiedHref:   'style.css',
        modifiedRule:   'url("style.css") print'
    },
    {
        originalRule:   'url( bluish.css ) projection, tv',
        modifiedHref:   'style.css',
        modifiedRule:   'url( style.css ) projection, tv',
    },
    {
        originalRule:   '\'custom.css\'',
        modifiedHref:   'style.css',
        modifiedRule:   '\'style.css\''

    },
    {
        originalRule:   'url("chrome://communicator/skin/")',
        modifiedHref:   'style.css',
        modifiedRule:   'url("style.css")'

    },
    {
        originalRule:   '"common.css" screen, projection',
        modifiedHref:   'style.css',
        modifiedRule:   '"style.css" screen, projection'
    },
    {
        originalRule:   'url(\'landscape.css\') screen and (orientation:landscape)',
        modifiedHref:   'style.css',
        modifiedRule:   'url(\'style.css\') screen and (orientation:landscape)'
    }
];

/**
* ImportHelper tests
*/

ImportRules.forEach( function( v ) {
    describe( 'ImportHelper("' + v.originalRule + '")', function() {
        var h = new ImportHelper( v.originalRule );

        describe( '#getOriginalRule()', function() {
            it( 'should return "' + v.originalRule, function() {
                assert.equal( h.getOriginalRule(), v.originalRule );
            });
        });

        describe( '#URI.href()', function() {
            it( 'should return "' + v.modifiedHref + '" after #URI.href(' + v.modifiedHref + ')', function() {
                h.URI.href( v.modifiedHref );
                assert.equal( h.URI.href(), v.modifiedHref );
            });
        });

        describe( '#getModifiedRule()', function() {
            it( 'should return "' + v.modifiedRule + ' after #URI.href(' + v.modifiedHref + ')', function() {
                assert.equal( h.getModifiedRule(), v.modifiedRule );
            });
        });
    } );
} );
