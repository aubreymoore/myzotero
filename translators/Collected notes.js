{
	"translatorID": "e7859c61-54d4-466a-b236-aadcf1f7e83b",
	"label": "Collected notes",
	"description": "exports your notes",
	"creator": "Emiliano heyns",
	"target": "html",
	"minVersion": "4.0.27",
	"maxVersion": "",
	"translatorType": 2,
	"browserSupport": "gcsv",
	"inRepository": false,
	"configOptions": {
		"getCollections": true,
		"hash": "c9fdfbc4174cfa0a2e3268c71e2e7de1feef9dbf15be6adc9bfb37b951596816"
	},
	"priority": 100,
	"lastUpdated": "2020-05-08 18:11:42"
}

var {Translator, doExport} =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./Collected notes.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../content/escape.ts":
/*!****************************!*\
  !*** ../content/escape.ts ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function html(str) {
    const entity = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
    };
    // return str.replace(/[\u00A0-\u9999<>\&]/gim, c => entity[c] || `&#${c.charCodeAt(0)};`)
    return str.replace(/[<>\&"']/g, c => entity[c] || `&#${c.charCodeAt(0)};`);
}
exports.html = html;
function rtf(str) {
    return str
        .replace(/([{}\\])/g, '\\$1')
        .replace(/\n/g, '\\par ');
}
exports.rtf = rtf;


/***/ }),

/***/ "../content/extra.ts":
/*!***************************!*\
  !*** ../content/extra.ts ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ExtraFields = __webpack_require__(/*! ../gen/extra-fields.json */ "../gen/extra-fields.json");
const CSL = __webpack_require__(/*! ../gen/citeproc */ "../gen/citeproc.js");
function cslCreator(value) {
    const creator = value.split(/\s*\|\|\s*/);
    if (creator.length === 2) { // tslint:disable-line:no-magic-numbers
        const _creator = { family: creator[0] || '', given: creator[1] || '' };
        CSL.parseParticles(_creator);
        return _creator;
    }
    else {
        // return { literal: value, isInstitution: 1 }
        return { literal: value };
    }
}
exports.cslCreator = cslCreator;
function zoteroCreator(value) {
    const creator = value.split(/\s*\|\|\s*/);
    if (creator.length === 2) { // tslint:disable-line:no-magic-numbers
        return { lastName: creator[0] || '', firstName: creator[1] || '' };
    }
    else {
        return { name: value };
    }
}
exports.zoteroCreator = zoteroCreator;
const re = {
    // fetch fields as per https://forums.zotero.org/discussion/3673/2/original-date-of-publication/. Spurious tex. so I can do a single match
    old: /^{:((?:bib(?:la)?)?tex\.)?([^:]+)(:)\s*([^}]+)}$/,
    new: /^((?:bib(?:la)?)?tex\.)?([^:=]+)\s*([:=])\s*([\S\s]*)/,
};
const otherFields = ['lccn', 'mr', 'zbl', 'arxiv', 'jstor', 'hdl', 'googlebooksid'];
const casing = {
    arxiv: 'arXiv',
};
function get(extra, options, normalize) {
    if (!options)
        options = { citationKey: true, aliases: true, kv: true, tex: true };
    const other = normalize ? { zotero: 'csl', csl: 'zotero' }[normalize] : null;
    extra = extra || '';
    const extraFields = {
        kv: {},
        creator: {},
        tex: {},
        citationKey: '',
        aliases: [],
    };
    let ef;
    extra = extra.split('\n').filter(line => {
        const m = line.match(re.old) || line.match(re.new);
        if (!m)
            return true;
        let [, tex, name, assign, value] = m;
        const raw = (assign === '=');
        if (!tex && raw)
            return true;
        name = name.trim();
        const key = name.toLowerCase();
        value = value.trim();
        if (options.citationKey && !tex && options.citationKey && ['citation key', 'bibtex'].includes(key)) {
            extraFields.citationKey = value;
            return false;
        }
        if (options.aliases && !tex && options.aliases && key === 'citation key alias') {
            extraFields.aliases = value.split(/s*,\s*/).filter(alias => alias);
            return false;
        }
        if (options.aliases && tex && !raw && options.aliases && key === 'ids') {
            extraFields.aliases = value.split(/s*,\s*/).filter(alias => alias);
            return false;
        }
        if (options.kv && (ef = ExtraFields[name]) && !tex) { // give precedence to CSL keys, which are as-is in extra-fields.json
            const k = normalize ? (ef[normalize] || ef[other]) : name;
            if (ef.type === 'creator') {
                extraFields.creator[k] = extraFields.creator[k] || [];
                extraFields.creator[k].push(value);
            }
            else {
                extraFields.kv[k] = value;
            }
            return false;
        }
        if (options.kv && (ef = ExtraFields[name.toUpperCase()]) && !tex) { // otherwise, check for Zotero var-fields, which are uppercased in extra-fields.json
            const k = normalize ? (ef[normalize] || ef[other]) : name;
            if (ef.type === 'creator') {
                extraFields.creator[k] = extraFields.creator[k] || [];
                extraFields.creator[k].push(value);
            }
            else {
                extraFields.kv[k] = value;
            }
            return false;
        }
        if (options.tex && tex && !name.includes(' ')) {
            extraFields.tex[key] = { value, raw };
            if (tex === 'bibtex' || tex === 'biblatex')
                extraFields.tex[key].type = tex;
            return false;
        }
        if (options.tex && !tex && otherFields.includes(key.replace(/[- ]/g, ''))) {
            extraFields.tex[key.replace(/[- ]/g, '')] = { value };
            return false;
        }
        return true;
    }).join('\n').trim();
    return { extra, extraFields };
}
exports.get = get;
function set(extra, options = {}) {
    const parsed = get(extra, options);
    if (options.citationKey)
        parsed.extra += `\nCitation Key: ${options.citationKey}`;
    if (options.aliases && options.aliases.length) {
        const aliases = Array.from(new Set(options.aliases)).sort().join(', ');
        parsed.extra += `\ntex.ids: ${aliases}`;
    }
    if (options.tex) {
        for (const name of Object.keys(options.tex).sort()) {
            const value = options.tex[name];
            const prefix = otherFields.includes(name) ? '' : 'tex.';
            parsed.extra += `\n${prefix}${casing[name] || name}${value.raw ? '=' : ':'} ${value.value}`;
        }
    }
    if (options.kv) {
        for (const name of Object.keys(options.kv).sort()) {
            const value = options.kv[name];
            if (Array.isArray(value)) { // creators
                parsed.extra += value.map(creator => `\n${name}: ${value}`).join(''); // do not sort!!
            }
            else {
                parsed.extra += `\n${name}: ${value}`;
            }
        }
    }
    return parsed.extra.trim();
}
exports.set = set;


/***/ }),

/***/ "../gen/citeproc.js":
/*!**************************!*\
  !*** ../gen/citeproc.js ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2009-2019 Frank Bennett

	This program is free software: you can redistribute it and/or
	modify it under EITHER

      * the terms of the Common Public Attribution License (CPAL) as
	    published by the Open Source Initiative, either version 1 of
	    the CPAL, or (at your option) any later version; OR

      * the terms of the GNU Affero General Public License (AGPL)
        as published by the Free Software Foundation, either version
        3 of the AGPL, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
	Affero General Public License for more details.

	You should have received copies of the Common Public Attribution
    License and of the GNU Affero General Public License along with
    this program.  If not, see <https://opensource.org/licenses/> or
    <http://www.gnu.org/licenses/> respectively.
*/
/*global CSL: true */

/**
 * A Javascript implementation of the CSL citation formatting language.
 *
 * <p>A configured instance of the process is built in two stages,
 * using {@link CSL.Core.Build} and {@link CSL.Core.Configure}.
 * The former sets up hash-accessible locale data and imports the CSL format file
 * to be applied to the citations,
 * transforming it into a one-dimensional token list, and
 * registering functions and parameters on each token as appropriate.
 * The latter sets jump-point information
 * on tokens that constitute potential branch
 * points, in a single back-to-front scan of the token list.
 * This
 * yields a token list that can be executed front-to-back by
 * body methods available on the
 * {@link CSL.Engine} class.</p>
 *
 * <p>This top-level {@link CSL} object itself carries
 * constants that are needed during processing.</p>
 * @namespace A CSL citation formatter.
 */

// IE6 does not implement Array.indexOf().
// IE7 neither, according to rumour.


// Potential skip words:
// under; along; out; between; among; outside; inside; amid; amidst; against; toward; towards.
// See https://forums.zotero.org/discussion/30484/?Focus=159613#Comment_159613




var CSL = {
    PARTICLE_GIVEN_REGEXP: /^([^ ]+(?:\u02bb |\u2019 | |\' ) *)(.+)$/,
    PARTICLE_FAMILY_REGEXP: /^([^ ]+(?:\-|\u02bb|\u2019| |\') *)(.+)$/,
    SKIP_WORDS: ["about","above","across","afore","after","against","al", "along","alongside","amid","amidst","among","amongst","anenst","apropos","apud","around","as","aside","astride","at","athwart","atop","barring","before","behind","below","beneath","beside","besides","between","beyond","but","by","circa","despite","down","during","et", "except","for","forenenst","from","given","in","inside","into","lest","like","modulo","near","next","notwithstanding","of","off","on","onto","out","over","per","plus","pro","qua","sans","since","than","through"," thru","throughout","thruout","till","to","toward","towards","under","underneath","until","unto","up","upon","versus","vs.","v.","vs","v","via","vis-à-vis","with","within","without","according to","ahead of","apart from","as for","as of","as per","as regards","aside from","back to","because of","close to","due to","except for","far from","inside of","instead of","near to","next to","on to","out from","out of","outside of","prior to","pursuant to","rather than","regardless of","such as","that of","up to","where as","or", "yet", "so", "for", "and", "nor", "a", "an", "the", "de", "d'", "von", "van", "c", "ca"]
};

CSL.Doppeler = function(rexStr, stringMangler) {
    var matchRex = new RegExp("(" + rexStr + ")", "g");
    var splitRex = new RegExp(rexStr, "g");
    this.split = function (str) {
        // Normalize markup
        if (stringMangler) {
            str = stringMangler(str);
        }
        var match = str.match(matchRex);
        if (!match) {
            return {
                tags: [],
                strings: [str]
            };
        }
        var split = str.split(splitRex);
        for (var i=match.length-1; i> -1; i--) {
            if (typeof match[i] === "number") {
                match[i] = "";
            }
            var tag = match[i];
            if (tag === "\'" && split[i+1].length > 0) {
                // Fixes https://forums.zotero.org/discussion/comment/294317
                split[i+1] = match[i] + split[i+1];
                match[i] = "";
            }
        }
        return {
            tags: match,
            strings: split,
            origStrings: split.slice()
        };
    };
    this.join = function (obj) {
        var lst = obj.strings.slice(-1);
        for (var i=obj.tags.length-1; i>-1; i--) {
            lst.push(obj.tags[i]);
            lst.push(obj.strings[i]);
        }
        lst.reverse();
        return lst.join("");
    };
};

/*global CSL: true */

CSL.Output = {};

/*global CSL: true */

CSL.Output.Formatters = (function () {
    var rexStr = "(?:\u2018|\u2019|\u201C|\u201D| \"| \'|\"|\'|[-\u2013\u2014\/.,;?!:]|\\[|\\]|\\(|\\)|<span style=\"font-variant: small-caps;\">|<span class=\"no(?:case|decor)\">|<\/span>|<\/?(?:i|sc|b|sub|sup)>)";
    var tagDoppel = new CSL.Doppeler(rexStr, function(str) {
        return str.replace(/(<span)\s+(class=\"no(?:case|decor)\")[^>]*(>)/g, "$1 $2$3").replace(/(<span)\s+(style=\"font-variant:)\s*(small-caps);?(\")[^>]*(>)/g, "$1 $2 $3;$4$5");
    });
    
    var wordDoppel = new CSL.Doppeler("(?:[\u0020\u00A0\u2000-\u200B\u205F\u3000]+)");
    
    /**
     * INTERNAL
     */

    var _tagParams = {
        "<span style=\"font-variant: small-caps;\">": "</span>",
        "<span class=\"nocase\">": "</span>",
        "<span class=\"nodecor\">": "</span>",
        "<sc>": "</sc>",
        "<sub>": "</sub>",
        "<sup>": "</sup>"
    };

    function _capitalise (word) {
        // Weird stuff is (.) transpiled with regexpu
        //   https://github.com/mathiasbynens/regexpu
        var m = word.match(/(^\s*)((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))(.*)/);
        // Do not uppercase lone Greek letters
        // (No case transforms in Greek citations, but chars used in titles to science papers)
        if (m && !(m[2].match(/^[\u0370-\u03FF]$/) && !m[3])) {
            return m[1] + m[2].toUpperCase() + m[3];
        }
        return word;
    }

    function _textcaseEngine(config, string) {
        if (!string) {
            return "";
        }
        config.doppel = tagDoppel.split(string);
        var quoteParams = {
            " \"": {
                opener: " \'",
                closer: "\""
            },
            " \'": {
                opener: " \"",
                closer: "\'"
            },
            "\u2018": {
                opener: "\u2018",
                closer: "\u2019"
            },
            "\u201C": {
                opener: "\u201C",
                closer: "\u201D"
            },
        };
        function tryOpen(tag, pos) {
            if (config.quoteState.length === 0 || tag === config.quoteState[config.quoteState.length - 1].opener) {
                config.quoteState.push({
                    opener: quoteParams[tag].opener,
                    closer: quoteParams[tag].closer,
                    pos: pos
                });
                return false;
            } else {
                var prevPos = config.quoteState[config.quoteState.length-1].pos;
                config.quoteState.pop();
                config.quoteState.push({
                    opener: quoteParams[tag].opener,
                    closer: quoteParams[tag].closer,
                    positions: pos
                });
                return prevPos;
            }
        }
        function tryClose(tag, pos) {
            if (config.quoteState.length > 0 && tag === config.quoteState[config.quoteState.length - 1].closer) {
                config.quoteState.pop();
            } else {
                return pos;
            }
        }
        function pushQuoteState(tag, pos) {
            var isOpener = ["\u201C", "\u2018", " \"", " \'"].indexOf(tag) > -1 ? true : false;
            if (isOpener) {
                return tryOpen(tag, pos);
            } else {
                return tryClose(tag, pos);
            }
        }
        function quoteFix (tag, positions) {
            var m = tag.match(/(^(?:\u2018|\u2019|\u201C|\u201D|\"|\')|(?: \"| \')$)/);
            if (m) {
                return pushQuoteState(m[1], positions);
            }
        }
        // Run state machine
        if (config.doppel.strings.length && config.doppel.strings[0].trim()) {
            config.doppel.strings[0] = config.capitaliseWords(config.doppel.strings[0], 0, config.doppel.tags[0]);
        }

    	for (var i=0,ilen=config.doppel.tags.length;i<ilen;i++) {
            var tag = config.doppel.tags[i];
            var str = config.doppel.strings[i+1];

            if (config.tagState !== null) {
                // Evaluate tag state for current string
                if (_tagParams[tag]) {
                    config.tagState.push(_tagParams[tag]);
                } else if (config.tagState.length && tag === config.tagState[config.tagState.length - 1]) {
                    config.tagState.pop();
                }
            }

            if (config.afterPunct !== null) {
                // Evaluate punctuation state of current string
                if (tag.match(/[\!\?\:]$/)) {
                    config.afterPunct = true;
                }
            }

            // Process if outside tag scope, else noop for upper-casing
            if (config.tagState.length === 0) {
                config.doppel.strings[i+1] = config.capitaliseWords(str, i+1, config.doppel,config.doppel.tags[i+1]);
                
            } else if (config.doppel.strings[i+1].trim()) {
                config.lastWordPos = null;
            }
            
            if (config.quoteState !== null) {
                // Evaluate quote state of current string and fix chars that have flown
                var quotePos = quoteFix(tag, i);
                if (quotePos || quotePos === 0) {
                    var origChar = config.doppel.origStrings[quotePos+1].slice(0, 1);
                    config.doppel.strings[quotePos+1] = origChar + config.doppel.strings[quotePos+1].slice(1);
                    config.lastWordPos = null;
                }
            }

            // If there was a printable string, unset first-word and after-punctuation
            if (config.isFirst) {
                if (str.trim()) {
                    config.isFirst = false;
                }
            }
            if (config.afterPunct) {
                if (str.trim()) {
                    config.afterPunct = false;
                }
            }
        }
        if (config.quoteState) {
            for (var i=0,ilen=config.quoteState.length;i<ilen;i++) {
                var quotePos = config.quoteState[i].pos;
                // Test for quotePos avoids a crashing error:
                //   https://github.com/citation-style-language/test-suite/blob/master/processor-tests/humans/flipflop_OrphanQuote.txt
                if (typeof quotePos !== 'undefined') {
                    var origChar = config.doppel.origStrings[quotePos+1].slice(0, 1);
                    config.doppel.strings[quotePos+1] = origChar + config.doppel.strings[quotePos+1].slice(1);
                }
            }
        }
        // Specially capitalize the last word if necessary (invert stop-word list)
        if (config.lastWordPos) {
            var lastWords = wordDoppel.split(config.doppel.strings[config.lastWordPos.strings]);
            var lastWord = lastWords.strings[config.lastWordPos.words];
            if (lastWord.length > 1 && lastWord.toLowerCase().match(config.skipWordsRex)) {
                lastWord = _capitalise(lastWord);
                lastWords.strings[config.lastWordPos.words] = lastWord;
            }
            config.doppel.strings[config.lastWordPos.strings] = wordDoppel.join(lastWords);
        }

        // Recombine the string
        return tagDoppel.join(config.doppel);
    }

    /**
     * PUBLIC
     */

    /**
     * A noop that just delivers the string.
     */
    function passthrough (state, str) {
        return str;
    }

    /**
     * Force all letters in the string to lowercase, skipping nocase spans
     */
    function lowercase(state, string) {
        var config = {
            quoteState: null,
            capitaliseWords: function(str) {
                var words = str.split(" ");
                for (var i=0,ilen=words.length;i<ilen;i++) {
                    var word = words[i];
                    if (word) {
                        words[i] = word.toLowerCase();
                    }
                }
                return words.join(" ");
            },
            skipWordsRex: null,
            tagState: [],
            afterPunct: null,
            isFirst: null
        };
        return _textcaseEngine(config, string);
    }

    /**
     * Force all letters in the string to uppercase.
     */
    function uppercase(state, string) {
        var config = {
            quoteState: null,
            capitaliseWords: function(str) {
                var words = str.split(" ");
                for (var i=0,ilen=words.length;i<ilen;i++) {
                    var word = words[i];
                    if (word) {
                        words[i] = word.toUpperCase();
                    }
                }
                return words.join(" ");
            },
            skipWordsRex: null,
            tagState: [],
            afterPunct: null,
            isFirst: null
        };
        return _textcaseEngine(config, string);
    }

    /**
     * Similar to <b>capitalize_first</b>, but force the
     * subsequent characters to lowercase.
     */
    function sentence(state, string) {
        var config = {
            quoteState: [],
            capitaliseWords: function(str) {
                var words = str.split(" ");
                for (var i=0,ilen=words.length;i<ilen;i++) {
                    var word = words[i];
                    if (word) {
                        if (config.isFirst) {
                            words[i] = _capitalise(word);
                            config.isFirst = false;
                        } else {
                            words[i] = word.toLowerCase();
                        }
                    }
                }
                return words.join(" ");
            },
            skipWordsRex: null,
            tagState: [],
            afterPunct: null,
            isFirst: true
        };
        return _textcaseEngine(config, string);
    }

    function title(state, string) {
        var config = {
            quoteState: [],
            capitaliseWords: function(str, i, followingTag) {
                if (str.trim()) {
                    var words = str.split(/[ \u00A0]+/);
                    var wordle = wordDoppel.split(str);
                    var words = wordle.strings;
                    for (var j=0,jlen=words.length;j<jlen;j++) {
                        var word = words[j];
                        if (!word) {
                            continue;
                        }
                        if (word.length > 1 && !word.toLowerCase().match(config.skipWordsRex)) {
                            // Capitalize every word that is not a stop-word
                            words[j] = _capitalise(words[j]);
                        } else if (j === (words.length - 1) && followingTag === "-") {
                            words[j] = _capitalise(words[j]);
                        } else if (config.isFirst) {
                            // Capitalize first word, even if a stop-word
                            words[j] = _capitalise(words[j]);
                        } else if (config.afterPunct) {
                            // Capitalize after punctuation
                            words[j] = _capitalise(words[j]);
                        }
                        config.afterPunct = false;
                        config.isFirst = false;
                        config.lastWordPos = {
                            strings: i,
                            words: j
                        };
                    }
                    str = wordDoppel.join(wordle);
                }
                return str;
            },
            skipWordsRex: state.locale[state.opt.lang].opts["skip-words-regexp"],
            tagState: [],
            afterPunct: false,
            isFirst: true
        };
        return _textcaseEngine(config, string);
    }
    
    
    /**
     * Force capitalization of the first letter in the string, leave
     * the rest of the characters untouched.
     */
    function capitalizeFirst(state, string) {
        var config = {
            quoteState: [],
            capitaliseWords: function(str) {
                var words = str.split(" ");
                for (var i=0,ilen=words.length;i<ilen;i++) {
                    var word = words[i];
                    if (word) {
                        if (config.isFirst) {
                            words[i] = _capitalise(word);
                            config.isFirst = false;
                            break;
                        }
                    }
                }
                return words.join(" ");
            },
            skipWordsRex: null,
            tagState: [],
            afterPunct: null,
            isFirst: true
        };
        return _textcaseEngine(config, string);
    }

    /**
     * Force the first letter of each space-delimited
     * word in the string to uppercase, and leave the remainder
     * of the string untouched.  Single characters are forced
     * to uppercase.
     */
    function capitalizeAll (state, string) {
        var config = {
            quoteState: [],
            capitaliseWords: function(str) {
                var words = str.split(" ");
                for (var i=0,ilen=words.length;i<ilen;i++) {
                    var word = words[i];
                    if (word) {
                        words[i] = _capitalise(word);
                    }
                }
                return words.join(" ");
            },
            skipWordsRex: null,
            tagState: [],
            afterPunct: null,
            isFirst: null
        };
        return _textcaseEngine(config, string);
    }
    return {
        passthrough: passthrough,
        lowercase: lowercase,
        uppercase: uppercase,
        sentence: sentence,
        title: title,
        "capitalize-first": capitalizeFirst,
        "capitalize-all": capitalizeAll
    };
}());

CSL.parseParticles = (function(){
    function splitParticles(nameValue, firstNameFlag, caseOverride) {
		// Parse particles out from name fields.
		// * nameValue (string) is the field content to be parsed.
		// * firstNameFlag (boolean) parse trailing particles
		//	 (default is to parse leading particles)
		// * caseOverride (boolean) include all but one word in particle set
		//	 (default is to include only words with lowercase first char)
        //   [caseOverride is not used in this application]
		// Returns an array with:
		// * (boolean) flag indicating whether a particle was found
		// * (string) the name after removal of particles
		// * (array) the list of particles found
		var origNameValue = nameValue;
		nameValue = caseOverride ? nameValue.toLowerCase() : nameValue;
		var particleList = [];
		var rex;
        var hasParticle;
		if (firstNameFlag) {
			nameValue = nameValue.split("").reverse().join("");
			rex = CSL.PARTICLE_GIVEN_REGEXP;
		} else {
			rex = CSL.PARTICLE_FAMILY_REGEXP;
		}
		var m = nameValue.match(rex);
		while (m) {
			var m1 = firstNameFlag ? m[1].split("").reverse().join("") : m[1];
			var firstChar = m ? m1 : false;
			var firstChar = firstChar ? m1.replace(/^[-\'\u02bb\u2019\s]*(.).*$/, "$1") : false;
			hasParticle = firstChar ? firstChar.toUpperCase() !== firstChar : false;
			if (!hasParticle) {
                break;
            }
			if (firstNameFlag) {
				particleList.push(origNameValue.slice(m1.length * -1));
				origNameValue = origNameValue.slice(0,m1.length * -1);
			} else {
				particleList.push(origNameValue.slice(0,m1.length));
				origNameValue = origNameValue.slice(m1.length);
			}
			//particleList.push(m1);
			nameValue = m[2];
			m = nameValue.match(rex);
		}
		if (firstNameFlag) {
			nameValue = nameValue.split("").reverse().join("");
			particleList.reverse();
			for (var i=1,ilen=particleList.length;i<ilen;i++) {
				if (particleList[i].slice(0, 1) == " ") {
					particleList[i-1] += " ";
				}
			}
			for (var i=0,ilen=particleList.length;i<ilen;i++) {
				if (particleList[i].slice(0, 1) == " ") {
					particleList[i] = particleList[i].slice(1);
				}
			}
			nameValue = origNameValue.slice(0, nameValue.length);
		} else {
			nameValue = origNameValue.slice(nameValue.length * -1);
		}
		return [hasParticle, nameValue, particleList];
	}
    function trimLast(str) {
        var lastChar = str.slice(-1);
        str = str.trim();
        if (lastChar === " " && ["\'", "\u2019"].indexOf(str.slice(-1)) > -1) {
            str += " ";
        }
        return str;
    }
    function parseSuffix(nameObj) {
        if (!nameObj.suffix && nameObj.given) {
            var m = nameObj.given.match(/(\s*,!*\s*)/);
            if (m) {
                var idx = nameObj.given.indexOf(m[1]);
                var possible_suffix = nameObj.given.slice(idx + m[1].length);
                var possible_comma = nameObj.given.slice(idx, idx + m[1].length).replace(/\s*/g, "");
                if (possible_suffix.replace(/\./g, "") === 'et al' && !nameObj["dropping-particle"]) {
                    // This hack covers the case where "et al." is explicitly used in the
                    // authorship information of the work.
                    nameObj["dropping-particle"] = possible_suffix;
                    nameObj["comma-dropping-particle"] = ",";
                } else {
                    if (possible_comma.length === 2) {
                        nameObj["comma-suffix"] = true;
                    }
                    nameObj.suffix = possible_suffix;
                }
                nameObj.given = nameObj.given.slice(0, idx);
            }
        }
    }
    return function(nameObj) {
        // Extract and set non-dropping particle(s) from family name field
        var res = splitParticles(nameObj.family);
        var lastNameValue = res[1];
        var lastParticleList = res[2];
        nameObj.family = lastNameValue;
        var nonDroppingParticle = trimLast(lastParticleList.join(""));
        if (nonDroppingParticle) {
            nameObj['non-dropping-particle'] = nonDroppingParticle;
        }
        // Split off suffix first of all
        parseSuffix(nameObj);
        // Extract and set dropping particle(s) from given name field
        var res = splitParticles(nameObj.given, true);
        var firstNameValue = res[1];
        var firstParticleList = res[2];
        nameObj.given = firstNameValue;
        var droppingParticle = firstParticleList.join("").trim();
        if (droppingParticle) {
            nameObj['dropping-particle'] = droppingParticle;
        }
    };
}());


module.exports = CSL

/***/ }),

/***/ "../gen/extra-fields.json":
/*!********************************!*\
  !*** ../gen/extra-fields.json ***!
  \********************************/
/*! exports provided: abstract, archive, archive_location, authority, call-number, chapter-number, collection-number, collection-title, container-title, dimensions, DOI, edition, event, event-place, genre, ISBN, ISSN, issue, language, medium, note, number, number-of-pages, number-of-volumes, page, publisher, publisher-place, references, scale, section, source, status, title, title-short, URL, version, volume, document-name, gazette-flag, jurisdiction, publication-number, supplement, volume-title, accessed, issued, submitted, original-date, event-date, opening-date, publication-date, author, composer, director, editor, interviewer, recipient, translator, archive-place, collection-editor, container-author, container, container-title-short, editorial-director, illustrator, original-author, original-publisher, original-publisher-place, original-title, page-first, PMCID, PMID, reviewed-author, reviewed-title, type, x-language, x-document-name, x-gazette-flag, x-publication-number, x-supplement, x-opening-date, x-publication-date, doi, isbn, issn, url, pmcid, pmid, TITLE, ABSTRACT NOTE, abstractNote, ARTWORK MEDIUM, ARTWORK SIZE, artworkSize, WEBSITE TITLE, publicationTitle, DATE, date, LANGUAGE, SHORT TITLE, shortTitle, ARCHIVE, ARCHIVE LOCATION, archiveLocation, LIBRARY CATALOG, libraryCatalog, CALL NUMBER, callNumber, ACCESS DATE, accessDate, RIGHTS, rights, EXTRA, extra, ARTIST, artist, CONTRIBUTOR, contributor, ALBUM, AUDIO RECORDING FORMAT, SERIES TITLE, seriesTitle, VOLUME, NUMBER OF VOLUMES, numberOfVolumes, PLACE, place, LABEL, RELEASE, OPUS, opus, ORIGINAL DATE, originalDate, RUNNING TIME, runningTime, PERFORMER, performer, COMPOSER, WORDS BY, wordsBy, REPORTER, reporter, BILL NUMBER, CODE, code, CODE VOLUME, SECTION, CODE PAGES, pages, LEGISLATIVE BODY, legislativeBody, SESSION, session, HISTORY, history, JURISDICTION, RESOLUTION LABEL, resolutionLabel, ASSEMBLY NUMBER, seriesNumber, SESSION TYPE, SPONSOR, sponsor, COSPONSOR, cosponsor, TRANSLATOR, BLOG TITLE, WEBSITE TYPE, AUTHOR, COMMENTER, commenter, SERIES, series, SERIES NUMBER, VOLUME TITLE, volumeTitle, EDITION, PUBLISHER, NUM PAGES, numPages, MEDIUM, EDITOR, SERIES EDITOR, seriesEditor, RECIPIENT, BOOK TITLE, PAGES, BOOK AUTHOR, bookAuthor, CASE NAME, COURT, court, DATE DECIDED, DOCKET NUMBER, REPORTER VOLUME, FIRST PAGE, REIGN, reign, DOCUMENT NAME, documentName, YEAR AS VOLUME, yearAsVolume, FILING DATE, filingDate, PUBLICATION DATE, publicationDate, SUPPLEMENT NAME, supplementName, ISSUE, COUNSEL, counsel, MANUSCRIPT TYPE, VERSION NUMBER, versionNumber, SYSTEM, system, COMPANY, PROGRAMMING LANGUAGE, programmingLanguage, PROGRAMMER, programmer, CONFERENCE DATE, conferenceDate, PROCEEDINGS TITLE, CONFERENCE NAME, conferenceName, INSTITUTION, DICTIONARY TITLE, REVIEWED AUTHOR, reviewedAuthor, SUBJECT, ENCYCLOPEDIA TITLE, DISTRIBUTOR, GENRE, VIDEO RECORDING FORMAT, DIRECTOR, SCRIPTWRITER, scriptwriter, PRODUCER, producer, FORUM TITLE, POST TYPE, NAME OF ACT, PUBLIC LAW NUMBER, CODE NUMBER, codeNumber, DATE ENACTED, REGNAL YEAR, regnalYear, COMMITTEE, committee, DOCUMENT NUMBER, MEETING NAME, meetingName, MEETING NUMBER, meetingNumber, TESTIMONY BY, testimonyBy, INTERVIEW MEDIUM, INTERVIEWEE, interviewee, INTERVIEWER, PUBLICATION TITLE, STATUS, SERIES TEXT, seriesText, JOURNAL ABBREVIATION, journalAbbreviation, LETTER TYPE, MAP TYPE, SCALE, CARTOGRAPHER, cartographer, NEWS CASE DATE, newsCaseDate, ISSUING AUTHORITY, issuingAuthority, PATENT NUMBER, ISSUE DATE, PUBLICATION NUMBER, publicationNumber, APPLICATION NUMBER, applicationNumber, PRIORITY NUMBERS, priorityNumbers, PRIORITY DATE, priorityDate, LEGAL STATUS, legalStatus, ASSIGNEE, assignee, COUNTRY, country, REFERENCES, INVENTOR, inventor, ATTORNEY AGENT, attorneyAgent, EPISODE NUMBER, AUDIO FILE TYPE, PODCASTER, podcaster, GUEST, guest, PRESENTATION TYPE, PRESENTER, presenter, PROGRAM TITLE, NETWORK, CAST MEMBER, castMember, GAZETTE FLAG, gazetteFlag, REGULATORY BODY, REGULATION TYPE, REPORT NUMBER, REPORT TYPE, NUMBER, DATE AMENDED, dateAmended, THESIS TYPE, UNIVERSITY, TREATY NUMBER, PARENT TREATY, parentTreaty, OPENING DATE, openingDate, ADOPTION DATE, adoptionDate, SIGNING DATE, signingDate, STUDIO, abstract note, abstractnote, artwork medium, artwork size, artworksize, website title, publicationtitle, short title, shorttitle, archive location, archivelocation, library catalog, librarycatalog, call number, callnumber, access date, accessdate, album, audio recording format, series title, seriestitle, number of volumes, numberofvolumes, label, release, original date, originaldate, running time, runningtime, words by, wordsby, bill number, code volume, code pages, legislative body, legislativebody, resolution label, resolutionlabel, assembly number, seriesnumber, session type, blog title, website type, series number, volume title, volumetitle, num pages, numpages, series editor, serieseditor, book title, book author, bookauthor, case name, date decided, docket number, reporter volume, first page, document name, documentname, year as volume, yearasvolume, filing date, filingdate, publication date, publicationdate, supplement name, supplementname, manuscript type, version number, versionnumber, company, programming language, programminglanguage, conference date, conferencedate, proceedings title, conference name, conferencename, institution, dictionary title, reviewed author, reviewedauthor, subject, encyclopedia title, distributor, video recording format, forum title, post type, name of act, public law number, code number, codenumber, date enacted, regnal year, regnalyear, document number, meeting name, meetingname, meeting number, meetingnumber, testimony by, testimonyby, interview medium, publication title, series text, seriestext, journal abbreviation, journalabbreviation, letter type, map type, news case date, newscasedate, issuing authority, issuingauthority, patent number, issue date, publication number, publicationnumber, application number, applicationnumber, priority numbers, prioritynumbers, priority date, prioritydate, legal status, legalstatus, attorney agent, attorneyagent, episode number, audio file type, presentation type, program title, network, cast member, castmember, gazette flag, gazetteflag, regulatory body, regulation type, report number, report type, date amended, dateamended, thesis type, university, treaty number, parent treaty, parenttreaty, opening date, openingdate, adoption date, adoptiondate, signing date, signingdate, studio, default */
/*! all exports used */
/***/ (function(module) {

module.exports = JSON.parse("{\"abstract\":{\"csl\":\"abstract\",\"zotero\":\"abstractNote\"},\"archive\":{\"csl\":\"archive\",\"zotero\":\"archive\"},\"archive_location\":{\"csl\":\"archive_location\",\"zotero\":\"archiveLocation\"},\"authority\":{\"csl\":\"authority\",\"zotero\":\"zotero:court+issuingAuthority+legislativeBody\"},\"call-number\":{\"csl\":\"call-number\",\"zotero\":\"zotero:applicationNumber+callNumber\"},\"chapter-number\":{\"csl\":\"chapter-number\",\"zotero\":\"session\"},\"collection-number\":{\"csl\":\"collection-number\",\"zotero\":\"seriesNumber\"},\"collection-title\":{\"csl\":\"collection-title\",\"zotero\":\"zotero:series+seriesTitle\"},\"container-title\":{\"csl\":\"container-title\",\"zotero\":\"zotero:code+publicationTitle+reporter\"},\"dimensions\":{\"csl\":\"dimensions\",\"zotero\":\"zotero:artworkSize+runningTime\"},\"DOI\":{\"csl\":\"DOI\",\"zotero\":\"DOI\"},\"edition\":{\"csl\":\"edition\",\"zotero\":\"edition\"},\"event\":{\"csl\":\"event\",\"zotero\":\"zotero:conferenceName+meetingName\"},\"event-place\":{\"csl\":\"event-place\",\"zotero\":\"place\"},\"genre\":{\"csl\":\"genre\",\"zotero\":\"zotero:programmingLanguage+type\"},\"ISBN\":{\"csl\":\"ISBN\",\"zotero\":\"ISBN\"},\"ISSN\":{\"csl\":\"ISSN\",\"zotero\":\"ISSN\"},\"issue\":{\"csl\":\"issue\",\"zotero\":\"zotero:issue+priorityNumbers\"},\"language\":{\"csl\":\"language\",\"zotero\":\"language\"},\"medium\":{\"csl\":\"medium\",\"zotero\":\"zotero:medium+system\"},\"note\":{\"csl\":\"note\",\"zotero\":\"extra\"},\"number\":{\"csl\":\"number\",\"zotero\":\"number\"},\"number-of-pages\":{\"csl\":\"number-of-pages\",\"zotero\":\"numPages\"},\"number-of-volumes\":{\"csl\":\"number-of-volumes\",\"zotero\":\"numberOfVolumes\"},\"page\":{\"csl\":\"page\",\"zotero\":\"pages\"},\"publisher\":{\"csl\":\"publisher\",\"zotero\":\"publisher\"},\"publisher-place\":{\"csl\":\"publisher-place\",\"zotero\":\"place\"},\"references\":{\"csl\":\"references\",\"zotero\":\"zotero:history+references\"},\"scale\":{\"csl\":\"scale\",\"zotero\":\"scale\"},\"section\":{\"csl\":\"section\",\"zotero\":\"zotero:committee+section\"},\"source\":{\"csl\":\"source\",\"zotero\":\"libraryCatalog\"},\"status\":{\"csl\":\"status\",\"zotero\":\"status\"},\"title\":{\"csl\":\"title\",\"zotero\":\"title\"},\"title-short\":{\"csl\":\"title-short\",\"zotero\":\"shortTitle\"},\"URL\":{\"csl\":\"URL\",\"zotero\":\"url\"},\"version\":{\"csl\":\"version\",\"zotero\":\"versionNumber\"},\"volume\":{\"csl\":\"volume\",\"zotero\":\"zotero:codeNumber+volume\"},\"document-name\":{\"csl\":\"document-name\",\"zotero\":\"documentName\"},\"gazette-flag\":{\"csl\":\"gazette-flag\",\"zotero\":\"gazetteFlag\"},\"jurisdiction\":{\"csl\":\"jurisdiction\",\"zotero\":\"jurisdiction\"},\"publication-number\":{\"csl\":\"publication-number\",\"zotero\":\"publicationNumber\"},\"supplement\":{\"csl\":\"supplement\",\"zotero\":\"supplementName\"},\"volume-title\":{\"csl\":\"volume-title\",\"zotero\":\"volumeTitle\"},\"accessed\":{\"csl\":\"accessed\",\"type\":\"date\",\"zotero\":\"accessDate\"},\"issued\":{\"csl\":\"issued\",\"type\":\"date\",\"zotero\":\"date\"},\"submitted\":{\"csl\":\"submitted\",\"type\":\"date\",\"zotero\":\"filingDate\"},\"original-date\":{\"csl\":\"original-date\",\"type\":\"date\",\"zotero\":\"priorityDate\"},\"event-date\":{\"csl\":\"event-date\",\"type\":\"date\",\"zotero\":\"conferenceDate\"},\"opening-date\":{\"csl\":\"opening-date\",\"type\":\"date\",\"zotero\":\"openingDate\"},\"publication-date\":{\"csl\":\"publication-date\",\"type\":\"date\",\"zotero\":\"publicationDate\"},\"author\":{\"csl\":\"author\",\"type\":\"creator\",\"zotero\":\"author\"},\"composer\":{\"csl\":\"composer\",\"type\":\"creator\",\"zotero\":\"composer\"},\"director\":{\"csl\":\"director\",\"type\":\"creator\",\"zotero\":\"director\"},\"editor\":{\"csl\":\"editor\",\"type\":\"creator\",\"zotero\":\"editor\"},\"interviewer\":{\"csl\":\"interviewer\",\"type\":\"creator\",\"zotero\":\"interviewer\"},\"recipient\":{\"csl\":\"recipient\",\"type\":\"creator\",\"zotero\":\"recipient\"},\"translator\":{\"csl\":\"translator\",\"type\":\"creator\",\"zotero\":\"translator\"},\"archive-place\":{\"csl\":\"archive-place\"},\"collection-editor\":{\"csl\":\"collection-editor\",\"type\":\"creator\"},\"container-author\":{\"csl\":\"container-author\",\"type\":\"creator\"},\"container\":{\"csl\":\"container\",\"type\":\"date\"},\"container-title-short\":{\"csl\":\"container-title-short\"},\"editorial-director\":{\"csl\":\"editorial-director\",\"type\":\"creator\"},\"illustrator\":{\"csl\":\"illustrator\",\"type\":\"creator\"},\"original-author\":{\"csl\":\"original-author\",\"type\":\"creator\"},\"original-publisher\":{\"csl\":\"original-publisher\"},\"original-publisher-place\":{\"csl\":\"original-publisher-place\"},\"original-title\":{\"csl\":\"original-title\"},\"page-first\":{\"csl\":\"page-first\"},\"PMCID\":{\"csl\":\"PMCID\"},\"PMID\":{\"csl\":\"PMID\"},\"reviewed-author\":{\"csl\":\"reviewed-author\",\"type\":\"creator\"},\"reviewed-title\":{\"csl\":\"reviewed-title\"},\"type\":{\"zotero\":\"type\",\"csl\":\"type\"},\"x-language\":{\"csl\":\"x-language\"},\"x-document-name\":{\"csl\":\"x-document-name\"},\"x-gazette-flag\":{\"csl\":\"x-gazette-flag\"},\"x-publication-number\":{\"csl\":\"x-publication-number\"},\"x-supplement\":{\"csl\":\"x-supplement\"},\"x-opening-date\":{\"csl\":\"x-opening-date\",\"type\":\"date\"},\"x-publication-date\":{\"csl\":\"x-publication-date\",\"type\":\"date\"},\"doi\":{\"csl\":\"DOI\",\"zotero\":\"DOI\"},\"isbn\":{\"csl\":\"ISBN\",\"zotero\":\"ISBN\"},\"issn\":{\"csl\":\"ISSN\",\"zotero\":\"ISSN\"},\"url\":{\"csl\":\"URL\",\"zotero\":\"url\"},\"pmcid\":{\"csl\":\"PMCID\"},\"pmid\":{\"csl\":\"PMID\"},\"TITLE\":{\"zotero\":\"title\",\"csl\":\"title\"},\"ABSTRACT NOTE\":{\"zotero\":\"abstractNote\",\"csl\":\"abstract\"},\"abstractNote\":{\"zotero\":\"abstractNote\",\"csl\":\"abstract\"},\"ARTWORK MEDIUM\":{\"zotero\":\"medium\",\"csl\":\"medium\"},\"ARTWORK SIZE\":{\"zotero\":\"artworkSize\",\"csl\":\"dimensions\"},\"artworkSize\":{\"zotero\":\"artworkSize\",\"csl\":\"dimensions\"},\"WEBSITE TITLE\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"publicationTitle\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"DATE\":{\"zotero\":\"date\",\"type\":\"date\",\"csl\":\"issued\"},\"date\":{\"zotero\":\"date\",\"type\":\"date\",\"csl\":\"issued\"},\"LANGUAGE\":{\"zotero\":\"language\",\"csl\":\"language\"},\"SHORT TITLE\":{\"zotero\":\"shortTitle\",\"csl\":\"title-short\"},\"shortTitle\":{\"zotero\":\"shortTitle\",\"csl\":\"title-short\"},\"ARCHIVE\":{\"zotero\":\"archive\",\"csl\":\"archive\"},\"ARCHIVE LOCATION\":{\"zotero\":\"archiveLocation\",\"csl\":\"archive_location\"},\"archiveLocation\":{\"zotero\":\"archiveLocation\",\"csl\":\"archive_location\"},\"LIBRARY CATALOG\":{\"zotero\":\"libraryCatalog\",\"csl\":\"source\"},\"libraryCatalog\":{\"zotero\":\"libraryCatalog\",\"csl\":\"source\"},\"CALL NUMBER\":{\"zotero\":\"callNumber\",\"csl\":\"call-number\"},\"callNumber\":{\"zotero\":\"callNumber\",\"csl\":\"call-number\"},\"ACCESS DATE\":{\"zotero\":\"accessDate\",\"type\":\"date\",\"csl\":\"accessed\"},\"accessDate\":{\"zotero\":\"accessDate\",\"type\":\"date\",\"csl\":\"accessed\"},\"RIGHTS\":{\"zotero\":\"rights\"},\"rights\":{\"zotero\":\"rights\"},\"EXTRA\":{\"zotero\":\"extra\",\"csl\":\"note\"},\"extra\":{\"zotero\":\"extra\",\"csl\":\"note\"},\"ARTIST\":{\"zotero\":\"artist\",\"type\":\"creator\"},\"artist\":{\"zotero\":\"artist\",\"type\":\"creator\"},\"CONTRIBUTOR\":{\"zotero\":\"contributor\",\"type\":\"creator\"},\"contributor\":{\"zotero\":\"contributor\",\"type\":\"creator\"},\"ALBUM\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"AUDIO RECORDING FORMAT\":{\"zotero\":\"medium\",\"csl\":\"medium\"},\"SERIES TITLE\":{\"zotero\":\"seriesTitle\",\"csl\":\"collection-title\"},\"seriesTitle\":{\"zotero\":\"seriesTitle\",\"csl\":\"collection-title\"},\"VOLUME\":{\"zotero\":\"volume\",\"csl\":\"volume\"},\"NUMBER OF VOLUMES\":{\"zotero\":\"numberOfVolumes\",\"csl\":\"number-of-volumes\"},\"numberOfVolumes\":{\"zotero\":\"numberOfVolumes\",\"csl\":\"number-of-volumes\"},\"PLACE\":{\"zotero\":\"place\",\"csl\":\"csl:event-place+publisher-place\"},\"place\":{\"zotero\":\"place\",\"csl\":\"csl:event-place+publisher-place\"},\"LABEL\":{\"zotero\":\"publisher\",\"csl\":\"publisher\"},\"RELEASE\":{\"zotero\":\"edition\",\"csl\":\"edition\"},\"OPUS\":{\"zotero\":\"opus\"},\"opus\":{\"zotero\":\"opus\"},\"ORIGINAL DATE\":{\"zotero\":\"originalDate\",\"type\":\"date\"},\"originalDate\":{\"zotero\":\"originalDate\",\"type\":\"date\"},\"RUNNING TIME\":{\"zotero\":\"runningTime\",\"csl\":\"dimensions\"},\"runningTime\":{\"zotero\":\"runningTime\",\"csl\":\"dimensions\"},\"PERFORMER\":{\"zotero\":\"performer\",\"type\":\"creator\"},\"performer\":{\"zotero\":\"performer\",\"type\":\"creator\"},\"COMPOSER\":{\"zotero\":\"composer\",\"type\":\"creator\",\"csl\":\"composer\"},\"WORDS BY\":{\"zotero\":\"wordsBy\",\"type\":\"creator\"},\"wordsBy\":{\"zotero\":\"wordsBy\",\"type\":\"creator\"},\"REPORTER\":{\"zotero\":\"reporter\",\"csl\":\"container-title\"},\"reporter\":{\"zotero\":\"reporter\",\"csl\":\"container-title\"},\"BILL NUMBER\":{\"zotero\":\"number\",\"csl\":\"number\"},\"CODE\":{\"zotero\":\"code\",\"csl\":\"container-title\"},\"code\":{\"zotero\":\"code\",\"csl\":\"container-title\"},\"CODE VOLUME\":{\"zotero\":\"volume\",\"csl\":\"volume\"},\"SECTION\":{\"zotero\":\"section\",\"csl\":\"section\"},\"CODE PAGES\":{\"zotero\":\"pages\",\"csl\":\"page\"},\"pages\":{\"zotero\":\"pages\",\"csl\":\"page\"},\"LEGISLATIVE BODY\":{\"zotero\":\"legislativeBody\",\"csl\":\"authority\"},\"legislativeBody\":{\"zotero\":\"legislativeBody\",\"csl\":\"authority\"},\"SESSION\":{\"zotero\":\"session\",\"csl\":\"chapter-number\"},\"session\":{\"zotero\":\"session\",\"csl\":\"chapter-number\"},\"HISTORY\":{\"zotero\":\"history\",\"csl\":\"references\"},\"history\":{\"zotero\":\"history\",\"csl\":\"references\"},\"JURISDICTION\":{\"zotero\":\"jurisdiction\",\"csl\":\"jurisdiction\"},\"RESOLUTION LABEL\":{\"zotero\":\"resolutionLabel\",\"csl\":\"event\"},\"resolutionLabel\":{\"zotero\":\"resolutionLabel\",\"csl\":\"event\"},\"ASSEMBLY NUMBER\":{\"zotero\":\"seriesNumber\",\"csl\":\"collection-number\"},\"seriesNumber\":{\"zotero\":\"seriesNumber\",\"csl\":\"collection-number\"},\"SESSION TYPE\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"SPONSOR\":{\"zotero\":\"sponsor\",\"type\":\"creator\"},\"sponsor\":{\"zotero\":\"sponsor\",\"type\":\"creator\"},\"COSPONSOR\":{\"zotero\":\"cosponsor\",\"type\":\"creator\"},\"cosponsor\":{\"zotero\":\"cosponsor\",\"type\":\"creator\"},\"TRANSLATOR\":{\"zotero\":\"translator\",\"type\":\"creator\",\"csl\":\"translator\"},\"BLOG TITLE\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"WEBSITE TYPE\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"AUTHOR\":{\"zotero\":\"author\",\"type\":\"creator\",\"csl\":\"author\"},\"COMMENTER\":{\"zotero\":\"commenter\",\"type\":\"creator\"},\"commenter\":{\"zotero\":\"commenter\",\"type\":\"creator\"},\"SERIES\":{\"zotero\":\"series\",\"csl\":\"collection-title\"},\"series\":{\"zotero\":\"series\",\"csl\":\"collection-title\"},\"SERIES NUMBER\":{\"zotero\":\"seriesNumber\",\"csl\":\"collection-number\"},\"VOLUME TITLE\":{\"zotero\":\"volumeTitle\",\"csl\":\"volume-title\"},\"volumeTitle\":{\"zotero\":\"volumeTitle\",\"csl\":\"volume-title\"},\"EDITION\":{\"zotero\":\"edition\",\"csl\":\"edition\"},\"PUBLISHER\":{\"zotero\":\"publisher\",\"csl\":\"publisher\"},\"NUM PAGES\":{\"zotero\":\"numPages\",\"csl\":\"number-of-pages\"},\"numPages\":{\"zotero\":\"numPages\",\"csl\":\"number-of-pages\"},\"MEDIUM\":{\"zotero\":\"medium\",\"csl\":\"medium\"},\"EDITOR\":{\"zotero\":\"editor\",\"type\":\"creator\",\"csl\":\"editor\"},\"SERIES EDITOR\":{\"zotero\":\"seriesEditor\",\"type\":\"creator\"},\"seriesEditor\":{\"zotero\":\"seriesEditor\",\"type\":\"creator\"},\"RECIPIENT\":{\"zotero\":\"recipient\",\"type\":\"creator\",\"csl\":\"recipient\"},\"BOOK TITLE\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"PAGES\":{\"zotero\":\"pages\",\"csl\":\"page\"},\"BOOK AUTHOR\":{\"zotero\":\"bookAuthor\",\"type\":\"creator\"},\"bookAuthor\":{\"zotero\":\"bookAuthor\",\"type\":\"creator\"},\"CASE NAME\":{\"zotero\":\"title\",\"csl\":\"title\"},\"COURT\":{\"zotero\":\"court\",\"csl\":\"authority\"},\"court\":{\"zotero\":\"court\",\"csl\":\"authority\"},\"DATE DECIDED\":{\"zotero\":\"date\",\"type\":\"date\",\"csl\":\"issued\"},\"DOCKET NUMBER\":{\"zotero\":\"number\",\"csl\":\"number\"},\"REPORTER VOLUME\":{\"zotero\":\"volume\",\"csl\":\"volume\"},\"FIRST PAGE\":{\"zotero\":\"pages\",\"csl\":\"page\"},\"REIGN\":{\"zotero\":\"reign\",\"csl\":\"genre\"},\"reign\":{\"zotero\":\"reign\",\"csl\":\"genre\"},\"DOCUMENT NAME\":{\"zotero\":\"documentName\",\"csl\":\"document-name\"},\"documentName\":{\"zotero\":\"documentName\",\"csl\":\"document-name\"},\"YEAR AS VOLUME\":{\"zotero\":\"yearAsVolume\",\"csl\":\"collection-number\"},\"yearAsVolume\":{\"zotero\":\"yearAsVolume\",\"csl\":\"collection-number\"},\"FILING DATE\":{\"zotero\":\"filingDate\",\"type\":\"date\",\"csl\":\"submitted\"},\"filingDate\":{\"zotero\":\"filingDate\",\"type\":\"date\",\"csl\":\"submitted\"},\"PUBLICATION DATE\":{\"zotero\":\"publicationDate\",\"type\":\"date\",\"csl\":\"publication-date\"},\"publicationDate\":{\"zotero\":\"publicationDate\",\"type\":\"date\",\"csl\":\"publication-date\"},\"SUPPLEMENT NAME\":{\"zotero\":\"supplementName\",\"csl\":\"supplement\"},\"supplementName\":{\"zotero\":\"supplementName\",\"csl\":\"supplement\"},\"ISSUE\":{\"zotero\":\"issue\",\"csl\":\"issue\"},\"COUNSEL\":{\"zotero\":\"counsel\",\"type\":\"creator\"},\"counsel\":{\"zotero\":\"counsel\",\"type\":\"creator\"},\"MANUSCRIPT TYPE\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"VERSION NUMBER\":{\"zotero\":\"versionNumber\",\"csl\":\"version\"},\"versionNumber\":{\"zotero\":\"versionNumber\",\"csl\":\"version\"},\"SYSTEM\":{\"zotero\":\"system\",\"csl\":\"medium\"},\"system\":{\"zotero\":\"system\",\"csl\":\"medium\"},\"COMPANY\":{\"zotero\":\"publisher\",\"csl\":\"publisher\"},\"PROGRAMMING LANGUAGE\":{\"zotero\":\"programmingLanguage\",\"csl\":\"genre\"},\"programmingLanguage\":{\"zotero\":\"programmingLanguage\",\"csl\":\"genre\"},\"PROGRAMMER\":{\"zotero\":\"programmer\",\"type\":\"creator\"},\"programmer\":{\"zotero\":\"programmer\",\"type\":\"creator\"},\"CONFERENCE DATE\":{\"zotero\":\"conferenceDate\",\"type\":\"date\",\"csl\":\"event-date\"},\"conferenceDate\":{\"zotero\":\"conferenceDate\",\"type\":\"date\",\"csl\":\"event-date\"},\"PROCEEDINGS TITLE\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"CONFERENCE NAME\":{\"zotero\":\"conferenceName\",\"csl\":\"event\"},\"conferenceName\":{\"zotero\":\"conferenceName\",\"csl\":\"event\"},\"INSTITUTION\":{\"zotero\":\"publisher\",\"csl\":\"csl:authority+publisher\"},\"DICTIONARY TITLE\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"REVIEWED AUTHOR\":{\"zotero\":\"reviewedAuthor\",\"type\":\"creator\"},\"reviewedAuthor\":{\"zotero\":\"reviewedAuthor\",\"type\":\"creator\"},\"SUBJECT\":{\"zotero\":\"title\",\"csl\":\"title\"},\"ENCYCLOPEDIA TITLE\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"DISTRIBUTOR\":{\"zotero\":\"publisher\",\"csl\":\"publisher\"},\"GENRE\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"VIDEO RECORDING FORMAT\":{\"zotero\":\"medium\",\"csl\":\"medium\"},\"DIRECTOR\":{\"zotero\":\"director\",\"type\":\"creator\",\"csl\":\"director\"},\"SCRIPTWRITER\":{\"zotero\":\"scriptwriter\",\"type\":\"creator\"},\"scriptwriter\":{\"zotero\":\"scriptwriter\",\"type\":\"creator\"},\"PRODUCER\":{\"zotero\":\"producer\",\"type\":\"creator\"},\"producer\":{\"zotero\":\"producer\",\"type\":\"creator\"},\"FORUM TITLE\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"POST TYPE\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"NAME OF ACT\":{\"zotero\":\"title\",\"csl\":\"title\"},\"PUBLIC LAW NUMBER\":{\"zotero\":\"number\",\"csl\":\"number\"},\"CODE NUMBER\":{\"zotero\":\"codeNumber\",\"csl\":\"volume\"},\"codeNumber\":{\"zotero\":\"codeNumber\",\"csl\":\"volume\"},\"DATE ENACTED\":{\"zotero\":\"date\",\"type\":\"date\",\"csl\":\"issued\"},\"REGNAL YEAR\":{\"zotero\":\"regnalYear\",\"csl\":\"collection-number\"},\"regnalYear\":{\"zotero\":\"regnalYear\",\"csl\":\"collection-number\"},\"COMMITTEE\":{\"zotero\":\"committee\",\"csl\":\"section\"},\"committee\":{\"zotero\":\"committee\",\"csl\":\"section\"},\"DOCUMENT NUMBER\":{\"zotero\":\"number\",\"csl\":\"number\"},\"MEETING NAME\":{\"zotero\":\"meetingName\",\"csl\":\"event\"},\"meetingName\":{\"zotero\":\"meetingName\",\"csl\":\"event\"},\"MEETING NUMBER\":{\"zotero\":\"meetingNumber\",\"csl\":\"issue\"},\"meetingNumber\":{\"zotero\":\"meetingNumber\",\"csl\":\"issue\"},\"TESTIMONY BY\":{\"zotero\":\"testimonyBy\",\"type\":\"creator\"},\"testimonyBy\":{\"zotero\":\"testimonyBy\",\"type\":\"creator\"},\"INTERVIEW MEDIUM\":{\"zotero\":\"medium\",\"csl\":\"medium\"},\"INTERVIEWEE\":{\"zotero\":\"interviewee\",\"type\":\"creator\"},\"interviewee\":{\"zotero\":\"interviewee\",\"type\":\"creator\"},\"INTERVIEWER\":{\"zotero\":\"interviewer\",\"type\":\"creator\",\"csl\":\"interviewer\"},\"PUBLICATION TITLE\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"STATUS\":{\"zotero\":\"status\",\"csl\":\"status\"},\"SERIES TEXT\":{\"zotero\":\"seriesText\"},\"seriesText\":{\"zotero\":\"seriesText\"},\"JOURNAL ABBREVIATION\":{\"zotero\":\"journalAbbreviation\"},\"journalAbbreviation\":{\"zotero\":\"journalAbbreviation\"},\"LETTER TYPE\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"MAP TYPE\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"SCALE\":{\"zotero\":\"scale\",\"csl\":\"scale\"},\"CARTOGRAPHER\":{\"zotero\":\"cartographer\",\"type\":\"creator\"},\"cartographer\":{\"zotero\":\"cartographer\",\"type\":\"creator\"},\"NEWS CASE DATE\":{\"zotero\":\"newsCaseDate\",\"type\":\"date\"},\"newsCaseDate\":{\"zotero\":\"newsCaseDate\",\"type\":\"date\"},\"ISSUING AUTHORITY\":{\"zotero\":\"issuingAuthority\",\"csl\":\"authority\"},\"issuingAuthority\":{\"zotero\":\"issuingAuthority\",\"csl\":\"authority\"},\"PATENT NUMBER\":{\"zotero\":\"number\",\"csl\":\"number\"},\"ISSUE DATE\":{\"zotero\":\"date\",\"type\":\"date\",\"csl\":\"issued\"},\"PUBLICATION NUMBER\":{\"zotero\":\"publicationNumber\",\"csl\":\"publication-number\"},\"publicationNumber\":{\"zotero\":\"publicationNumber\",\"csl\":\"publication-number\"},\"APPLICATION NUMBER\":{\"zotero\":\"applicationNumber\",\"csl\":\"call-number\"},\"applicationNumber\":{\"zotero\":\"applicationNumber\",\"csl\":\"call-number\"},\"PRIORITY NUMBERS\":{\"zotero\":\"priorityNumbers\",\"csl\":\"issue\"},\"priorityNumbers\":{\"zotero\":\"priorityNumbers\",\"csl\":\"issue\"},\"PRIORITY DATE\":{\"zotero\":\"priorityDate\",\"type\":\"date\",\"csl\":\"original-date\"},\"priorityDate\":{\"zotero\":\"priorityDate\",\"type\":\"date\",\"csl\":\"original-date\"},\"LEGAL STATUS\":{\"zotero\":\"legalStatus\"},\"legalStatus\":{\"zotero\":\"legalStatus\"},\"ASSIGNEE\":{\"zotero\":\"assignee\"},\"assignee\":{\"zotero\":\"assignee\"},\"COUNTRY\":{\"zotero\":\"country\"},\"country\":{\"zotero\":\"country\"},\"REFERENCES\":{\"zotero\":\"references\",\"csl\":\"references\"},\"INVENTOR\":{\"zotero\":\"inventor\",\"type\":\"creator\"},\"inventor\":{\"zotero\":\"inventor\",\"type\":\"creator\"},\"ATTORNEY AGENT\":{\"zotero\":\"attorneyAgent\",\"type\":\"creator\"},\"attorneyAgent\":{\"zotero\":\"attorneyAgent\",\"type\":\"creator\"},\"EPISODE NUMBER\":{\"zotero\":\"number\",\"csl\":\"number\"},\"AUDIO FILE TYPE\":{\"zotero\":\"medium\",\"csl\":\"medium\"},\"PODCASTER\":{\"zotero\":\"podcaster\",\"type\":\"creator\"},\"podcaster\":{\"zotero\":\"podcaster\",\"type\":\"creator\"},\"GUEST\":{\"zotero\":\"guest\",\"type\":\"creator\"},\"guest\":{\"zotero\":\"guest\",\"type\":\"creator\"},\"PRESENTATION TYPE\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"PRESENTER\":{\"zotero\":\"presenter\",\"type\":\"creator\"},\"presenter\":{\"zotero\":\"presenter\",\"type\":\"creator\"},\"PROGRAM TITLE\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"NETWORK\":{\"zotero\":\"publisher\",\"csl\":\"publisher\"},\"CAST MEMBER\":{\"zotero\":\"castMember\",\"type\":\"creator\"},\"castMember\":{\"zotero\":\"castMember\",\"type\":\"creator\"},\"GAZETTE FLAG\":{\"zotero\":\"gazetteFlag\",\"csl\":\"gazette-flag\"},\"gazetteFlag\":{\"zotero\":\"gazetteFlag\",\"csl\":\"gazette-flag\"},\"REGULATORY BODY\":{\"zotero\":\"legislativeBody\",\"csl\":\"authority\"},\"REGULATION TYPE\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"REPORT NUMBER\":{\"zotero\":\"number\",\"csl\":\"number\"},\"REPORT TYPE\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"NUMBER\":{\"zotero\":\"number\",\"csl\":\"number\"},\"DATE AMENDED\":{\"zotero\":\"dateAmended\",\"type\":\"date\"},\"dateAmended\":{\"zotero\":\"dateAmended\",\"type\":\"date\"},\"THESIS TYPE\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"UNIVERSITY\":{\"zotero\":\"publisher\",\"csl\":\"publisher\"},\"TREATY NUMBER\":{\"zotero\":\"number\",\"csl\":\"number\"},\"PARENT TREATY\":{\"zotero\":\"parentTreaty\",\"csl\":\"collection-title\"},\"parentTreaty\":{\"zotero\":\"parentTreaty\",\"csl\":\"collection-title\"},\"OPENING DATE\":{\"zotero\":\"openingDate\",\"type\":\"date\",\"csl\":\"opening-date\"},\"openingDate\":{\"zotero\":\"openingDate\",\"type\":\"date\",\"csl\":\"opening-date\"},\"ADOPTION DATE\":{\"zotero\":\"adoptionDate\",\"type\":\"date\"},\"adoptionDate\":{\"zotero\":\"adoptionDate\",\"type\":\"date\"},\"SIGNING DATE\":{\"zotero\":\"signingDate\",\"type\":\"date\"},\"signingDate\":{\"zotero\":\"signingDate\",\"type\":\"date\"},\"STUDIO\":{\"zotero\":\"publisher\",\"csl\":\"publisher\"},\"abstract note\":{\"zotero\":\"abstractNote\",\"csl\":\"abstract\"},\"abstractnote\":{\"zotero\":\"abstractNote\",\"csl\":\"abstract\"},\"artwork medium\":{\"zotero\":\"medium\",\"csl\":\"medium\"},\"artwork size\":{\"zotero\":\"artworkSize\",\"csl\":\"dimensions\"},\"artworksize\":{\"zotero\":\"artworkSize\",\"csl\":\"dimensions\"},\"website title\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"publicationtitle\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"short title\":{\"zotero\":\"shortTitle\",\"csl\":\"title-short\"},\"shorttitle\":{\"zotero\":\"shortTitle\",\"csl\":\"title-short\"},\"archive location\":{\"zotero\":\"archiveLocation\",\"csl\":\"archive_location\"},\"archivelocation\":{\"zotero\":\"archiveLocation\",\"csl\":\"archive_location\"},\"library catalog\":{\"zotero\":\"libraryCatalog\",\"csl\":\"source\"},\"librarycatalog\":{\"zotero\":\"libraryCatalog\",\"csl\":\"source\"},\"call number\":{\"zotero\":\"callNumber\",\"csl\":\"call-number\"},\"callnumber\":{\"zotero\":\"callNumber\",\"csl\":\"call-number\"},\"access date\":{\"zotero\":\"accessDate\",\"type\":\"date\",\"csl\":\"accessed\"},\"accessdate\":{\"zotero\":\"accessDate\",\"type\":\"date\",\"csl\":\"accessed\"},\"album\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"audio recording format\":{\"zotero\":\"medium\",\"csl\":\"medium\"},\"series title\":{\"zotero\":\"seriesTitle\",\"csl\":\"collection-title\"},\"seriestitle\":{\"zotero\":\"seriesTitle\",\"csl\":\"collection-title\"},\"number of volumes\":{\"zotero\":\"numberOfVolumes\",\"csl\":\"number-of-volumes\"},\"numberofvolumes\":{\"zotero\":\"numberOfVolumes\",\"csl\":\"number-of-volumes\"},\"label\":{\"zotero\":\"publisher\",\"csl\":\"publisher\"},\"release\":{\"zotero\":\"edition\",\"csl\":\"edition\"},\"original date\":{\"zotero\":\"originalDate\",\"type\":\"date\"},\"originaldate\":{\"zotero\":\"originalDate\",\"type\":\"date\"},\"running time\":{\"zotero\":\"runningTime\",\"csl\":\"dimensions\"},\"runningtime\":{\"zotero\":\"runningTime\",\"csl\":\"dimensions\"},\"words by\":{\"zotero\":\"wordsBy\",\"type\":\"creator\"},\"wordsby\":{\"zotero\":\"wordsBy\",\"type\":\"creator\"},\"bill number\":{\"zotero\":\"number\",\"csl\":\"number\"},\"code volume\":{\"zotero\":\"volume\",\"csl\":\"volume\"},\"code pages\":{\"zotero\":\"pages\",\"csl\":\"page\"},\"legislative body\":{\"zotero\":\"legislativeBody\",\"csl\":\"authority\"},\"legislativebody\":{\"zotero\":\"legislativeBody\",\"csl\":\"authority\"},\"resolution label\":{\"zotero\":\"resolutionLabel\",\"csl\":\"event\"},\"resolutionlabel\":{\"zotero\":\"resolutionLabel\",\"csl\":\"event\"},\"assembly number\":{\"zotero\":\"seriesNumber\",\"csl\":\"collection-number\"},\"seriesnumber\":{\"zotero\":\"seriesNumber\",\"csl\":\"collection-number\"},\"session type\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"blog title\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"website type\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"series number\":{\"zotero\":\"seriesNumber\",\"csl\":\"collection-number\"},\"volume title\":{\"zotero\":\"volumeTitle\",\"csl\":\"volume-title\"},\"volumetitle\":{\"zotero\":\"volumeTitle\",\"csl\":\"volume-title\"},\"num pages\":{\"zotero\":\"numPages\",\"csl\":\"number-of-pages\"},\"numpages\":{\"zotero\":\"numPages\",\"csl\":\"number-of-pages\"},\"series editor\":{\"zotero\":\"seriesEditor\",\"type\":\"creator\"},\"serieseditor\":{\"zotero\":\"seriesEditor\",\"type\":\"creator\"},\"book title\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"book author\":{\"zotero\":\"bookAuthor\",\"type\":\"creator\"},\"bookauthor\":{\"zotero\":\"bookAuthor\",\"type\":\"creator\"},\"case name\":{\"zotero\":\"title\",\"csl\":\"title\"},\"date decided\":{\"zotero\":\"date\",\"type\":\"date\",\"csl\":\"issued\"},\"docket number\":{\"zotero\":\"number\",\"csl\":\"number\"},\"reporter volume\":{\"zotero\":\"volume\",\"csl\":\"volume\"},\"first page\":{\"zotero\":\"pages\",\"csl\":\"page\"},\"document name\":{\"zotero\":\"documentName\",\"csl\":\"document-name\"},\"documentname\":{\"zotero\":\"documentName\",\"csl\":\"document-name\"},\"year as volume\":{\"zotero\":\"yearAsVolume\",\"csl\":\"collection-number\"},\"yearasvolume\":{\"zotero\":\"yearAsVolume\",\"csl\":\"collection-number\"},\"filing date\":{\"zotero\":\"filingDate\",\"type\":\"date\",\"csl\":\"submitted\"},\"filingdate\":{\"zotero\":\"filingDate\",\"type\":\"date\",\"csl\":\"submitted\"},\"publication date\":{\"zotero\":\"publicationDate\",\"type\":\"date\",\"csl\":\"publication-date\"},\"publicationdate\":{\"zotero\":\"publicationDate\",\"type\":\"date\",\"csl\":\"publication-date\"},\"supplement name\":{\"zotero\":\"supplementName\",\"csl\":\"supplement\"},\"supplementname\":{\"zotero\":\"supplementName\",\"csl\":\"supplement\"},\"manuscript type\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"version number\":{\"zotero\":\"versionNumber\",\"csl\":\"version\"},\"versionnumber\":{\"zotero\":\"versionNumber\",\"csl\":\"version\"},\"company\":{\"zotero\":\"publisher\",\"csl\":\"publisher\"},\"programming language\":{\"zotero\":\"programmingLanguage\",\"csl\":\"genre\"},\"programminglanguage\":{\"zotero\":\"programmingLanguage\",\"csl\":\"genre\"},\"conference date\":{\"zotero\":\"conferenceDate\",\"type\":\"date\",\"csl\":\"event-date\"},\"conferencedate\":{\"zotero\":\"conferenceDate\",\"type\":\"date\",\"csl\":\"event-date\"},\"proceedings title\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"conference name\":{\"zotero\":\"conferenceName\",\"csl\":\"event\"},\"conferencename\":{\"zotero\":\"conferenceName\",\"csl\":\"event\"},\"institution\":{\"zotero\":\"publisher\",\"csl\":\"csl:authority+publisher\"},\"dictionary title\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"reviewed author\":{\"zotero\":\"reviewedAuthor\",\"type\":\"creator\"},\"reviewedauthor\":{\"zotero\":\"reviewedAuthor\",\"type\":\"creator\"},\"subject\":{\"zotero\":\"title\",\"csl\":\"title\"},\"encyclopedia title\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"distributor\":{\"zotero\":\"publisher\",\"csl\":\"publisher\"},\"video recording format\":{\"zotero\":\"medium\",\"csl\":\"medium\"},\"forum title\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"post type\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"name of act\":{\"zotero\":\"title\",\"csl\":\"title\"},\"public law number\":{\"zotero\":\"number\",\"csl\":\"number\"},\"code number\":{\"zotero\":\"codeNumber\",\"csl\":\"volume\"},\"codenumber\":{\"zotero\":\"codeNumber\",\"csl\":\"volume\"},\"date enacted\":{\"zotero\":\"date\",\"type\":\"date\",\"csl\":\"issued\"},\"regnal year\":{\"zotero\":\"regnalYear\",\"csl\":\"collection-number\"},\"regnalyear\":{\"zotero\":\"regnalYear\",\"csl\":\"collection-number\"},\"document number\":{\"zotero\":\"number\",\"csl\":\"number\"},\"meeting name\":{\"zotero\":\"meetingName\",\"csl\":\"event\"},\"meetingname\":{\"zotero\":\"meetingName\",\"csl\":\"event\"},\"meeting number\":{\"zotero\":\"meetingNumber\",\"csl\":\"issue\"},\"meetingnumber\":{\"zotero\":\"meetingNumber\",\"csl\":\"issue\"},\"testimony by\":{\"zotero\":\"testimonyBy\",\"type\":\"creator\"},\"testimonyby\":{\"zotero\":\"testimonyBy\",\"type\":\"creator\"},\"interview medium\":{\"zotero\":\"medium\",\"csl\":\"medium\"},\"publication title\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"series text\":{\"zotero\":\"seriesText\"},\"seriestext\":{\"zotero\":\"seriesText\"},\"journal abbreviation\":{\"zotero\":\"journalAbbreviation\"},\"journalabbreviation\":{\"zotero\":\"journalAbbreviation\"},\"letter type\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"map type\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"news case date\":{\"zotero\":\"newsCaseDate\",\"type\":\"date\"},\"newscasedate\":{\"zotero\":\"newsCaseDate\",\"type\":\"date\"},\"issuing authority\":{\"zotero\":\"issuingAuthority\",\"csl\":\"authority\"},\"issuingauthority\":{\"zotero\":\"issuingAuthority\",\"csl\":\"authority\"},\"patent number\":{\"zotero\":\"number\",\"csl\":\"number\"},\"issue date\":{\"zotero\":\"date\",\"type\":\"date\",\"csl\":\"issued\"},\"publication number\":{\"zotero\":\"publicationNumber\",\"csl\":\"publication-number\"},\"publicationnumber\":{\"zotero\":\"publicationNumber\",\"csl\":\"publication-number\"},\"application number\":{\"zotero\":\"applicationNumber\",\"csl\":\"call-number\"},\"applicationnumber\":{\"zotero\":\"applicationNumber\",\"csl\":\"call-number\"},\"priority numbers\":{\"zotero\":\"priorityNumbers\",\"csl\":\"issue\"},\"prioritynumbers\":{\"zotero\":\"priorityNumbers\",\"csl\":\"issue\"},\"priority date\":{\"zotero\":\"priorityDate\",\"type\":\"date\",\"csl\":\"original-date\"},\"prioritydate\":{\"zotero\":\"priorityDate\",\"type\":\"date\",\"csl\":\"original-date\"},\"legal status\":{\"zotero\":\"legalStatus\"},\"legalstatus\":{\"zotero\":\"legalStatus\"},\"attorney agent\":{\"zotero\":\"attorneyAgent\",\"type\":\"creator\"},\"attorneyagent\":{\"zotero\":\"attorneyAgent\",\"type\":\"creator\"},\"episode number\":{\"zotero\":\"number\",\"csl\":\"number\"},\"audio file type\":{\"zotero\":\"medium\",\"csl\":\"medium\"},\"presentation type\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"program title\":{\"zotero\":\"publicationTitle\",\"csl\":\"container-title\"},\"network\":{\"zotero\":\"publisher\",\"csl\":\"publisher\"},\"cast member\":{\"zotero\":\"castMember\",\"type\":\"creator\"},\"castmember\":{\"zotero\":\"castMember\",\"type\":\"creator\"},\"gazette flag\":{\"zotero\":\"gazetteFlag\",\"csl\":\"gazette-flag\"},\"gazetteflag\":{\"zotero\":\"gazetteFlag\",\"csl\":\"gazette-flag\"},\"regulatory body\":{\"zotero\":\"legislativeBody\",\"csl\":\"authority\"},\"regulation type\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"report number\":{\"zotero\":\"number\",\"csl\":\"number\"},\"report type\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"date amended\":{\"zotero\":\"dateAmended\",\"type\":\"date\"},\"dateamended\":{\"zotero\":\"dateAmended\",\"type\":\"date\"},\"thesis type\":{\"zotero\":\"type\",\"csl\":\"genre\"},\"university\":{\"zotero\":\"publisher\",\"csl\":\"publisher\"},\"treaty number\":{\"zotero\":\"number\",\"csl\":\"number\"},\"parent treaty\":{\"zotero\":\"parentTreaty\",\"csl\":\"collection-title\"},\"parenttreaty\":{\"zotero\":\"parentTreaty\",\"csl\":\"collection-title\"},\"opening date\":{\"zotero\":\"openingDate\",\"type\":\"date\",\"csl\":\"opening-date\"},\"openingdate\":{\"zotero\":\"openingDate\",\"type\":\"date\",\"csl\":\"opening-date\"},\"adoption date\":{\"zotero\":\"adoptionDate\",\"type\":\"date\"},\"adoptiondate\":{\"zotero\":\"adoptionDate\",\"type\":\"date\"},\"signing date\":{\"zotero\":\"signingDate\",\"type\":\"date\"},\"signingdate\":{\"zotero\":\"signingDate\",\"type\":\"date\"},\"studio\":{\"zotero\":\"publisher\",\"csl\":\"publisher\"}}");

/***/ }),

/***/ "../gen/preferences/defaults.json":
/*!****************************************!*\
  !*** ../gen/preferences/defaults.json ***!
  \****************************************/
/*! exports provided: DOIandURL, automaticTags, asciiBibLaTeX, ascii, asciiBibTeX, autoExport, quickCopyMode, citeCommand, quickCopyPandocBrackets, citekeyFormat, citekeyFold, keyConflictPolicy, auxImport, keyScope, exportBibTeXStrings, importBibTeXStrings, bibtexParticleNoOp, skipFields, bibtexURL, warnBulkModify, postscript, strings, autoAbbrev, autoAbbrevStyle, autoExportIdleWait, cacheFlushInterval, csquotes, rawLaTag, rawImports, skipWords, verbatimFields, jabrefFormat, qualityReport, biblatexExtendedDateFormat, biblatexExtendedNameFormat, exportTitleCase, exportBraceProtection, retainCache, importSentenceCase, importCaseProtection, autoExportDelay, itemObserverDelay, parseParticles, citeprocNoteCitekey, extraMergeTeX, extraMergeCSL, extraMergeCitekeys, importJabRefStrings, importJabRefAbbreviations, postscriptOverride, scrubDatabase, removeStock, ignorePostscriptErrors, debugLogDir, testing, autoPin, kuroshiro, relativeFilePaths, git, mapUnicode, mapText, mapMath, newTranslatorsAskRestart, workers, platform, client, default */
/*! all exports used */
/***/ (function(module) {

module.exports = JSON.parse("{\"DOIandURL\":\"both\",\"automaticTags\":true,\"asciiBibLaTeX\":false,\"ascii\":\"\",\"asciiBibTeX\":true,\"autoExport\":\"immediate\",\"quickCopyMode\":\"latex\",\"citeCommand\":\"cite\",\"quickCopyPandocBrackets\":false,\"citekeyFormat\":\"​[auth:lower][shorttitle3_3][year]\",\"citekeyFold\":true,\"keyConflictPolicy\":\"keep\",\"auxImport\":false,\"keyScope\":\"library\",\"exportBibTeXStrings\":\"off\",\"importBibTeXStrings\":true,\"bibtexParticleNoOp\":false,\"skipFields\":\"\",\"bibtexURL\":\"off\",\"warnBulkModify\":10,\"postscript\":\"\",\"strings\":\"\",\"autoAbbrev\":false,\"autoAbbrevStyle\":\"\",\"autoExportIdleWait\":10,\"cacheFlushInterval\":5,\"csquotes\":\"\",\"rawLaTag\":\"#LaTeX\",\"rawImports\":false,\"skipWords\":\"a,ab,aboard,about,above,across,after,against,al,along,amid,among,an,and,anti,around,as,at,before,behind,below,beneath,beside,besides,between,beyond,but,by,d,da,das,de,del,dell,dello,dei,degli,della,dell,delle,dem,den,der,des,despite,die,do,down,du,during,ein,eine,einem,einen,einer,eines,el,en,et,except,for,from,gli,i,il,in,inside,into,is,l,la,las,le,les,like,lo,los,near,nor,of,off,on,onto,or,over,past,per,plus,round,save,since,so,some,sur,than,the,through,to,toward,towards,un,una,unas,under,underneath,une,unlike,uno,unos,until,up,upon,versus,via,von,while,with,within,without,yet,zu,zum\",\"verbatimFields\":\"url,doi,file,eprint,verba,verbb,verbc\",\"jabrefFormat\":0,\"qualityReport\":false,\"biblatexExtendedDateFormat\":true,\"biblatexExtendedNameFormat\":false,\"exportTitleCase\":true,\"exportBraceProtection\":true,\"retainCache\":false,\"importSentenceCase\":\"on+guess\",\"importCaseProtection\":\"as-needed\",\"autoExportDelay\":1,\"itemObserverDelay\":5,\"parseParticles\":true,\"citeprocNoteCitekey\":false,\"extraMergeTeX\":true,\"extraMergeCSL\":true,\"extraMergeCitekeys\":true,\"importJabRefStrings\":true,\"importJabRefAbbreviations\":true,\"postscriptOverride\":\"\",\"scrubDatabase\":false,\"removeStock\":false,\"ignorePostscriptErrors\":true,\"debugLogDir\":\"\",\"testing\":false,\"autoPin\":false,\"kuroshiro\":false,\"relativeFilePaths\":false,\"git\":\"config\",\"mapUnicode\":\"conservative\",\"mapText\":\"\",\"mapMath\":\"\",\"newTranslatorsAskRestart\":true,\"workers\":1,\"platform\":\"\",\"client\":\"\"}");

/***/ }),

/***/ "./Collected notes.ts":
/*!****************************!*\
  !*** ./Collected notes.ts ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const translator_1 = __webpack_require__(/*! ./lib/translator */ "./lib/translator.ts");
exports.Translator = translator_1.Translator;
const escape = __webpack_require__(/*! ../content/escape */ "../content/escape.ts");
const Extra = __webpack_require__(/*! ../content/extra */ "../content/extra.ts");
const html = {
    levels: 0,
    body: '',
};
function _collection(collection, level = 1) {
    if (level > html.levels)
        html.levels = level;
    html.body += `<h${level}>${escape.html(collection.name)}</h${level}>\n`;
    for (const item of collection.items) {
        _item(item);
    }
    for (const subcoll of collection.collections) {
        _collection(subcoll, level + 1);
    }
}
function _item(item) {
    switch (item.itemType) {
        case 'note':
            _note(item.note, 'note');
            break;
        case 'attachment':
            _reference(item);
            break;
        default:
            _reference(item);
            break;
    }
}
function _prune(collection) {
    let keep = collection.items.length > 0;
    collection.collections = collection.collections.filter(subcoll => {
        if (_prune(subcoll)) {
            return false;
        }
        else {
            keep = true;
            return true;
        }
    });
    return !keep;
}
function _note(note, type) {
    switch (type) {
        case 'extra':
            if (!note)
                return;
            html.body += `<blockquote><pre>${escape.html(note)}</pre></blockquote>\n`;
            break;
        case 'attachment':
            if (!note.note)
                return;
            html.body += `<blockquote><div><samp>${note.title}</samp></div>${note.note}</blockquote>\n`;
            break;
        default:
            if (!note.note)
                return;
            html.body += `<blockquote>${note.note}</blockquote>\n`;
            break;
    }
}
function _creator(cr) {
    return [cr.lastName, cr.firstName, cr.name].filter(v => v).join(', ');
}
function _reference(item) {
    let notes = [];
    let title = '';
    if (item.itemType === 'attachment') {
        if (item.note)
            notes = [{ note: item.note }];
        if (item.title)
            title = `<samp>${escape.html(item.title)}</samp>`;
    }
    else {
        notes = item.notes.filter(note => note.note);
        const creators = item.creators.map(_creator).filter(v => v).join(' and ');
        let date = null;
        if (item.date) {
            date = Zotero.BetterBibTeX.parseDate(item.date);
            if (date.from)
                date = date.from;
            date = typeof date.year === 'number' ? date.year : item.date;
        }
        const author = [creators, date].filter(v => v).join(', ');
        if (item.title)
            title += `<i>${escape.html(item.title)}</i>`;
        if (author)
            title += `(${escape.html(author)})`;
        title = title.trim();
    }
    html.body += `<div>${title}</div>\n`;
    _note(item.extra, 'extra');
    for (const note of notes) {
        _note(note, 'note');
    }
    for (const att of item.attachments || []) {
        _note(att, 'attachment');
    }
}
function _reset(starting) {
    if (starting > html.levels)
        return '';
    let reset = 'counter-reset:';
    for (let level = starting; level <= html.levels; level++) {
        reset += ` h${level}counter 0`;
    }
    return reset + ';';
    // return `counter-reset: h${ starting }counter;`
}
function _keep(item) {
    if (item.extra)
        return true;
    if (item.note)
        return true;
    if (item.notes && item.notes.find(note => note.note))
        return true;
    if (item.attachments && item.attachments.find(att => att.note))
        return true;
    return false;
}
function doExport() {
    translator_1.Translator.init('export');
    // collect all notes
    const items = {};
    for (const item of translator_1.Translator.items()) {
        if (!_keep(item))
            continue;
        items[item.itemID] = Object.assign(item, Extra.get(item.extra, null, 'zotero')); // tslint:disable-line:prefer-object-spread
    }
    const filed = {};
    const collections = Object.values(translator_1.Translator.collections)
        .map(coll => (Object.assign(Object.assign({}, coll), { items: coll.items.map(id => filed[id] = items[id]).filter(v => v) }))) // expand collections
        .filter(coll => !coll.parent && !_prune(coll)); // prune empty branches
    html.body += '<html><body>';
    for (const item of Object.values(items)) {
        if (filed[item.itemID])
            continue;
        _item(item);
    }
    for (const collection of collections) {
        _collection(collection);
    }
    let style = `  body { ${_reset(1)} }\n`;
    for (let level = 1; level <= html.levels; level++) {
        style += `  h${level} { ${_reset(level + 1)} }\n`;
        const label = Array.from({ length: level }, (x, i) => `counter(h${i + 1}counter)`).join(' "." ');
        style += `  h${level}:before { counter-increment: h${level}counter; content: ${label} ".\\0000a0\\0000a0"; }\n`;
    }
    style += '  blockquote { border-left: 1px solid gray; }\n';
    Zotero.write(`<html><head><style>${style}</style></head><body>${html.body}</body></html>`);
}
exports.doExport = doExport;


/***/ }),

/***/ "./lib/translator.ts":
/*!***************************!*\
  !*** ./lib/translator.ts ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preferences = __webpack_require__(/*! ../../gen/preferences/defaults.json */ "../gen/preferences/defaults.json");
exports.Translator = new class {
    constructor() {
        this.initialized = false;
        this.header = {"browserSupport":"gcsv","configOptions":{"getCollections":true},"creator":"Emiliano heyns","description":"exports your notes","inRepository":false,"label":"Collected notes","maxVersion":"","minVersion":"4.0.27","priority":100,"target":"html","translatorID":"e7859c61-54d4-466a-b236-aadcf1f7e83b","translatorType":2};
        this[this.header.label.replace(/[^a-z]/ig, '')] = true;
        this.BetterTeX = this.BetterBibTeX || this.BetterBibLaTeX;
        this.BetterCSL = this.BetterCSLJSON || this.BetterCSLYAML;
        this.preferences = preferences;
        this.options = this.header.displayOptions || {};
        this.stringCompare = (new Intl.Collator('en')).compare;
        this.debugEnabled = Zotero.BetterBibTeX.debugEnabled();
    }
    init(mode) {
        var _a;
        this.platform = Zotero.getHiddenPref('better-bibtex.platform');
        this.isJurisM = Zotero.getHiddenPref('better-bibtex.client') === 'jurism';
        this.isZotero = !this.isJurisM;
        this.paths = {
            caseSensitive: this.platform !== 'mac' && this.platform !== 'win',
            sep: this.platform === 'win' ? '\\' : '/',
        };
        for (const key in this.options) {
            if (typeof this.options[key] === 'boolean') {
                this.options[key] = !!Zotero.getOption(key);
            }
            else {
                this.options[key] = Zotero.getOption(key);
            }
        }
        // special handling
        if (mode === 'export') {
            this.cache = {
                hits: 0,
                misses: 0,
            };
            this.exportDir = Zotero.getOption('exportDir');
            this.exportPath = Zotero.getOption('exportPath');
            if (this.exportDir && this.exportDir.endsWith(this.paths.sep))
                this.exportDir = this.exportDir.slice(0, -1);
        }
        for (const pref of Object.keys(this.preferences)) {
            let value;
            try {
                value = Zotero.getOption(`preference_${pref}`);
            }
            catch (err) {
                value = undefined;
            }
            if (typeof value === 'undefined')
                value = Zotero.getHiddenPref(`better-bibtex.${pref}`);
            this.preferences[pref] = value;
        }
        // special handling
        this.skipFields = this.preferences.skipFields.toLowerCase().trim().split(/\s*,\s*/).filter(s => s);
        this.skipField = this.skipFields.reduce((acc, field) => { acc[field] = true; return acc; }, {});
        this.verbatimFields = this.preferences.verbatimFields.toLowerCase().trim().split(/\s*,\s*/).filter(s => s);
        if (!this.verbatimFields.length)
            this.verbatimFields = null;
        this.csquotes = this.preferences.csquotes ? { open: this.preferences.csquotes[0], close: this.preferences.csquotes[1] } : null;
        this.preferences.testing = Zotero.getHiddenPref('better-bibtex.testing');
        Zotero.debug(`prefs loaded: ${JSON.stringify(this.preferences, null, 2)}`);
        Zotero.debug(`options loaded: ${JSON.stringify(this.options, null, 2)}`);
        if (mode === 'export') {
            this.unicode = (this.BetterBibTeX && !exports.Translator.preferences.asciiBibTeX) || (this.BetterBibLaTeX && !exports.Translator.preferences.asciiBibLaTeX);
            this.caching = !(
            // when exporting file data you get relative paths, when not, you get absolute paths, only one version can go into the cache
            this.options.exportFileData
                // jabref 4 stores collection info inside the reference, and collection info depends on which part of your library you're exporting
                || (this.BetterTeX && this.preferences.jabrefFormat === 4) // tslint:disable-line:no-magic-numbers
                // if you're looking at this.exportPath or this.exportDir in the postscript you're probably outputting something different based on it
                || ((this.preferences.postscript || '').indexOf('Translator.exportPath') >= 0)
                || ((this.preferences.postscript || '').indexOf('Translator.exportDir') >= 0)
                // relative file paths are going to be different based on the file being exported to
                || this.preferences.relativeFilePaths);
            Zotero.debug(`export caching: ${this.caching}`);
        }
        this.collections = {};
        if (mode === 'export' && ((_a = this.header.configOptions) === null || _a === void 0 ? void 0 : _a.getCollections) && Zotero.nextCollection) {
            Zotero.debug('getting collections');
            let collection;
            while (collection = Zotero.nextCollection()) {
                const children = collection.children || collection.descendents || [];
                const key = (collection.primary ? collection.primary : collection).key;
                this.collections[key] = {
                    // id: collection.id,
                    key,
                    parent: collection.fields.parentKey,
                    name: collection.name,
                    items: collection.childItems,
                    collections: children.filter(coll => coll.type === 'collection').map(coll => coll.key),
                };
            }
            for (collection of Object.values(this.collections)) {
                if (collection.parent && !this.collections[collection.parent]) {
                    collection.parent = false;
                    Zotero.debug(`BBT translator: collection with key ${collection.key} has non-existent parent ${collection.parent}, assuming root collection`);
                }
            }
        }
        this.initialized = true;
        Zotero.debug('Translator init ready');
    }
    items() {
        if (!this.sortedItems) {
            this.sortedItems = [];
            let item;
            while (item = Zotero.nextItem()) {
                item.journalAbbreviation = item.journalAbbreviation || item.autoJournalAbbreviation;
                this.sortedItems.push(item);
            }
            // fallback to itemType.itemID for notes and attachments. And some items may have duplicate keys
            this.sortedItems.sort((a, b) => {
                const ka = [a.citationKey || a.itemType, a.dateModified || a.dateAdded, a.itemID].join('\t');
                const kb = [b.citationKey || b.itemType, b.dateModified || b.dateAdded, b.itemID].join('\t');
                return ka.localeCompare(kb, undefined, { sensitivity: 'base' });
            });
        }
        return this.sortedItems;
    }
    nextItem() {
        return this.items().shift();
    }
};


/***/ })

/******/ });
