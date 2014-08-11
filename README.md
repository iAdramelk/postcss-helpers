## postcss-helpers

> Some general purpose helpers for PostCSS, created to make working with url() and @import values more easy. Can be used without PostCSS.

### Getting Started


```shell
npm install postcss-helpers
```


### Helpers

#### #createUrlsHelper( rule )

Returns new UrlsHelper object from the rule string with one or more url() (see description below).

#### #createImportHelper( rule )

Returns new ImportHelper object from the @import walue string (see description below).



### new UrlsHelper( rule )

Object for manipulating values of rules with one or multiple url().

#### #getOriginalRule

Returns original rule that it was created with.

#### #URIS

Array of one or more [URIjs](http://medialize.github.io/URI.js/) objects that can be used for URI manipulations.  If there is no url() in the rule returns false.

For example you can use UrlsHelper.URIS[0].href() to get value for the first url() and UrlsHelper.URIS[0].href('new_uri') to set new URI value. See [full documentation](http://medialize.github.io/URI.js/docs.html).

#### #getModifiedRule

After you finished changing values of the URIS you can get modified rule text with this command.

### Other

#### #regexp

Collection of some useful RegExps based on CSS specification grammar rules: http://www.w3.org/TR/CSS21/grammar.html

  - STRINGS – RegExp for css &lt;string&gt; with 'ig' flags.
  - URLS – RegExp for css &lt;uri&gt; with 'ig' flags.

### new ImportHelper( rule )

Object for manipulating values of @import at-rules.

#### #getOriginalRule

Returns original rule that it was created with.

#### #URI

[URIjs](http://medialize.github.io/URI.js/) objects that can be used for URI manipulations. If there is no url() in the rule returns false.

For example you can use ImportHelper.URI.href() to get import value and ImportHelper.URI.href('new_uri') to set new URI value. See [full documentation](http://medialize.github.io/URI.js/docs.html).

#### #getModifiedRule

After you finished changing values of the URI you can get modified rule text with this command.


### Known problems

UrlsHelper() and ImportHelper() will not escape quotes in the new URI values so escape them yourself.


### Release History

See [CHANGELOG](/CHANGELOG) for detailed changes.

 * 2014-08-08   0.1.0   Initial release.
 * 2014-08-11   0.1.1   Make RegExps public. Fixed ?#iefix bug.
