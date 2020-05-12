{
	"translatorID": "19afa3fd-1c7f-4eb8-a37e-8d07768493e8",
	"label": "Citation graph",
	"description": "exports a citation graph in graphml format. Use gephi or yEd to clean up and visualize",
	"creator": "Emiliano heyns",
	"target": "dot",
	"minVersion": "4.0.27",
	"maxVersion": "",
	"translatorType": 2,
	"browserSupport": "gcsv",
	"inRepository": false,
	"displayOptions": {
		"Title": false,
		"Authors": false,
		"Year": false
	},
	"priority": 100,
	"configOptions": {
		"hash": "ee616b9e70a39b566ee8fad6e563ee8f71d265fb2cc55477d8c729163f2bedbd"
	},
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./Citation graph.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../gen/preferences/defaults.json":
/*!****************************************!*\
  !*** ../gen/preferences/defaults.json ***!
  \****************************************/
/*! exports provided: DOIandURL, automaticTags, asciiBibLaTeX, ascii, asciiBibTeX, autoExport, quickCopyMode, citeCommand, quickCopyPandocBrackets, citekeyFormat, citekeyFold, keyConflictPolicy, auxImport, keyScope, exportBibTeXStrings, importBibTeXStrings, bibtexParticleNoOp, skipFields, bibtexURL, warnBulkModify, postscript, strings, autoAbbrev, autoAbbrevStyle, autoExportIdleWait, cacheFlushInterval, csquotes, rawLaTag, rawImports, skipWords, verbatimFields, jabrefFormat, qualityReport, biblatexExtendedDateFormat, biblatexExtendedNameFormat, exportTitleCase, exportBraceProtection, retainCache, importSentenceCase, importCaseProtection, autoExportDelay, itemObserverDelay, parseParticles, citeprocNoteCitekey, extraMergeTeX, extraMergeCSL, extraMergeCitekeys, importJabRefStrings, importJabRefAbbreviations, postscriptOverride, scrubDatabase, removeStock, ignorePostscriptErrors, debugLogDir, testing, autoPin, kuroshiro, relativeFilePaths, git, mapUnicode, mapText, mapMath, newTranslatorsAskRestart, workers, platform, client, default */
/*! all exports used */
/***/ (function(module) {

module.exports = JSON.parse("{\"DOIandURL\":\"both\",\"automaticTags\":true,\"asciiBibLaTeX\":false,\"ascii\":\"\",\"asciiBibTeX\":true,\"autoExport\":\"immediate\",\"quickCopyMode\":\"latex\",\"citeCommand\":\"cite\",\"quickCopyPandocBrackets\":false,\"citekeyFormat\":\"​[auth:lower][shorttitle3_3][year]\",\"citekeyFold\":true,\"keyConflictPolicy\":\"keep\",\"auxImport\":false,\"keyScope\":\"library\",\"exportBibTeXStrings\":\"off\",\"importBibTeXStrings\":true,\"bibtexParticleNoOp\":false,\"skipFields\":\"\",\"bibtexURL\":\"off\",\"warnBulkModify\":10,\"postscript\":\"\",\"strings\":\"\",\"autoAbbrev\":false,\"autoAbbrevStyle\":\"\",\"autoExportIdleWait\":10,\"cacheFlushInterval\":5,\"csquotes\":\"\",\"rawLaTag\":\"#LaTeX\",\"rawImports\":false,\"skipWords\":\"a,ab,aboard,about,above,across,after,against,al,along,amid,among,an,and,anti,around,as,at,before,behind,below,beneath,beside,besides,between,beyond,but,by,d,da,das,de,del,dell,dello,dei,degli,della,dell,delle,dem,den,der,des,despite,die,do,down,du,during,ein,eine,einem,einen,einer,eines,el,en,et,except,for,from,gli,i,il,in,inside,into,is,l,la,las,le,les,like,lo,los,near,nor,of,off,on,onto,or,over,past,per,plus,round,save,since,so,some,sur,than,the,through,to,toward,towards,un,una,unas,under,underneath,une,unlike,uno,unos,until,up,upon,versus,via,von,while,with,within,without,yet,zu,zum\",\"verbatimFields\":\"url,doi,file,eprint,verba,verbb,verbc\",\"jabrefFormat\":0,\"qualityReport\":false,\"biblatexExtendedDateFormat\":true,\"biblatexExtendedNameFormat\":false,\"exportTitleCase\":true,\"exportBraceProtection\":true,\"retainCache\":false,\"importSentenceCase\":\"on+guess\",\"importCaseProtection\":\"as-needed\",\"autoExportDelay\":1,\"itemObserverDelay\":5,\"parseParticles\":true,\"citeprocNoteCitekey\":false,\"extraMergeTeX\":true,\"extraMergeCSL\":true,\"extraMergeCitekeys\":true,\"importJabRefStrings\":true,\"importJabRefAbbreviations\":true,\"postscriptOverride\":\"\",\"scrubDatabase\":false,\"removeStock\":false,\"ignorePostscriptErrors\":true,\"debugLogDir\":\"\",\"testing\":false,\"autoPin\":false,\"kuroshiro\":false,\"relativeFilePaths\":false,\"git\":\"config\",\"mapUnicode\":\"conservative\",\"mapText\":\"\",\"mapMath\":\"\",\"newTranslatorsAskRestart\":true,\"workers\":1,\"platform\":\"\",\"client\":\"\"}");

/***/ }),

/***/ "./Citation graph.ts":
/*!***************************!*\
  !*** ./Citation graph.ts ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const translator_1 = __webpack_require__(/*! ./lib/translator */ "./lib/translator.ts");
exports.Translator = translator_1.Translator;
function node(id, attributes = {}) {
    let _node = JSON.stringify(id);
    const attrs = Object.entries(attributes).map(([key, value]) => `${key}=${JSON.stringify(value)}`).join(', ');
    if (attrs)
        _node += ` [${attrs}]`;
    Zotero.write(`  ${_node};\n`);
}
function edge(source, target, attributes = {}) {
    let _edge = `${JSON.stringify(source)} -> ${JSON.stringify(target)}`;
    const attrs = Object.entries(attributes).map(([key, value]) => `${key}=${JSON.stringify(value)}`).join(', ');
    if (attrs)
        _edge += ` [${attrs}]`;
    Zotero.write(`  ${_edge};\n`);
}
function doExport() {
    var _a, _b;
    translator_1.Translator.init('export');
    Zotero.write('digraph CitationGraph {\n');
    Zotero.write('  concentrate=true;\n');
    const add = {
        title: Zotero.getOption('Title'),
        authors: Zotero.getOption('Authors'),
        year: Zotero.getOption('Year'),
    };
    const items = [];
    for (const item of translator_1.Translator.items()) {
        if (['note', 'attachment'].includes(item.itemType))
            continue;
        const label = [item.citationKey];
        if (add.title && item.title) {
            label.push(`\u201C${item.title.replace(/"/g, "'")}\u201D`);
        }
        const author = [];
        if (add.authors && item.creators && item.creators.length) {
            const name = (_a = item.creators) === null || _a === void 0 ? void 0 : _a.map(creator => (creator.name || creator.lastName || '').replace(/"/g, "'")).filter(creator => creator).join(', ');
            if (name)
                author.push(name);
        }
        if (add.year && item.date) {
            let date = Zotero.BetterBibTeX.parseDate(item.date);
            if (date.from)
                date = date.from;
            if (date.year)
                author.push(`(${date.year})`);
        }
        if (author.length)
            label.push(author.join(' '));
        items.push({
            id: 'node-' + item.uri.replace(/.*\//, ''),
            label: label.join('\n'),
            relations: (((_b = item.relations) === null || _b === void 0 ? void 0 : _b['dc:relation']) || []),
            cites: [].concat.apply([], (item.extra || '')
                .split('\n')
                .filter(line => line.startsWith('cites:'))
                .map(line => line.replace(/^cites:/, '').trim())
                .filter(keys => keys)
                .map(keys => keys.split(/\s*,\s*/))),
            citationKey: item.citationKey,
            uri: item.uri,
        });
    }
    for (const item of items) {
        node(item.id, { label: item.label });
        for (const uri of item.relations) {
            const other = items.find(o => o.uri === uri);
            if (other) {
                edge(item.id, other.id);
            }
            else {
                edge(item.id, uri.replace(/.*\//, ''), { style: 'dashed', dir: 'both' });
            }
        }
        for (const citationKey of item.cites) {
            const other = items.find(o => o.citationKey === citationKey);
            if (other) {
                edge(item.id, other.id);
            }
            else {
                edge(item.id, citationKey, { style: 'dashed' });
            }
        }
    }
    Zotero.write('}');
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
        this.header = {"browserSupport":"gcsv","creator":"Emiliano heyns","description":"exports a citation graph in graphml format. Use gephi or yEd to clean up and visualize","displayOptions":{"Authors":false,"Title":false,"Year":false},"inRepository":false,"label":"Citation graph","maxVersion":"","minVersion":"4.0.27","priority":100,"target":"dot","translatorID":"19afa3fd-1c7f-4eb8-a37e-8d07768493e8","translatorType":2};
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
