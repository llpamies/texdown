/*\
title: $:/plugins/tiddlywiki/texdown/wrapper.js
type: application/javascript
module-type: parser

Wraps up markdown parser with TeX support for use in TiddlyWiki5

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

// Load main libraries
var Marked = require("$:/plugins/tiddlywiki/texdown/marked.min.js");
var TeXZilla = require("$:/plugins/tiddlywiki/texdown/TeXZilla.js");

var TexdownParser = function(type, text, options) {
    var lex = Marked.lexer(text);
    for(var i = 0; i < lex.length; i++) {
        switch(lex[i].type) {
        case "paragraph":
            lex[i].text = TeXZilla.filterString(lex[i].text);
            break;
        }
    }
    var htmlText = Marked.parser(lex);
	this.tree = [{type: "raw", html: htmlText}];
};

exports["text/x-texdown"] = TexdownParser;

})();
