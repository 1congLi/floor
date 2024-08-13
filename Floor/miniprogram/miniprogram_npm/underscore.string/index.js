module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1722669706605, function(require, module, exports) {
/*
* Underscore.string
* (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
* Underscore.string is freely distributable under the terms of the MIT license.
* Documentation: https://github.com/epeli/underscore.string
* Some code is borrowed from MooTools and Alexandru Marasteanu.
* Version '3.3.6'
* @preserve
*/



function s(value) {
  /* jshint validthis: true */
  if (!(this instanceof s)) return new s(value);
  this._wrapped = value;
}

s.VERSION = '3.3.6';

s.isBlank          = require('./isBlank');
s.stripTags        = require('./stripTags');
s.capitalize       = require('./capitalize');
s.decapitalize     = require('./decapitalize');
s.chop             = require('./chop');
s.trim             = require('./trim');
s.clean            = require('./clean');
s.cleanDiacritics  = require('./cleanDiacritics');
s.count            = require('./count');
s.chars            = require('./chars');
s.swapCase         = require('./swapCase');
s.escapeHTML       = require('./escapeHTML');
s.unescapeHTML     = require('./unescapeHTML');
s.splice           = require('./splice');
s.insert           = require('./insert');
s.replaceAll       = require('./replaceAll');
s.include          = require('./include');
s.join             = require('./join');
s.lines            = require('./lines');
s.dedent           = require('./dedent');
s.reverse          = require('./reverse');
s.startsWith       = require('./startsWith');
s.endsWith         = require('./endsWith');
s.pred             = require('./pred');
s.succ             = require('./succ');
s.titleize         = require('./titleize');
s.camelize         = require('./camelize');
s.underscored      = require('./underscored');
s.dasherize        = require('./dasherize');
s.classify         = require('./classify');
s.humanize         = require('./humanize');
s.ltrim            = require('./ltrim');
s.rtrim            = require('./rtrim');
s.truncate         = require('./truncate');
s.prune            = require('./prune');
s.words            = require('./words');
s.pad              = require('./pad');
s.lpad             = require('./lpad');
s.rpad             = require('./rpad');
s.lrpad            = require('./lrpad');
s.sprintf          = require('./sprintf');
s.vsprintf         = require('./vsprintf');
s.toNumber         = require('./toNumber');
s.numberFormat     = require('./numberFormat');
s.strRight         = require('./strRight');
s.strRightBack     = require('./strRightBack');
s.strLeft          = require('./strLeft');
s.strLeftBack      = require('./strLeftBack');
s.toSentence       = require('./toSentence');
s.toSentenceSerial = require('./toSentenceSerial');
s.slugify          = require('./slugify');
s.surround         = require('./surround');
s.quote            = require('./quote');
s.unquote          = require('./unquote');
s.repeat           = require('./repeat');
s.naturalCmp       = require('./naturalCmp');
s.levenshtein      = require('./levenshtein');
s.toBoolean        = require('./toBoolean');
s.exports          = require('./exports');
s.escapeRegExp     = require('./helper/escapeRegExp');
s.wrap             = require('./wrap');
s.map              = require('./map');

// Aliases
s.strip     = s.trim;
s.lstrip    = s.ltrim;
s.rstrip    = s.rtrim;
s.center    = s.lrpad;
s.rjust     = s.lpad;
s.ljust     = s.rpad;
s.contains  = s.include;
s.q         = s.quote;
s.toBool    = s.toBoolean;
s.camelcase = s.camelize;
s.mapChars  = s.map;


// Implement chaining
s.prototype = {
  value: function value() {
    return this._wrapped;
  }
};

function fn2method(key, fn) {
  if (typeof fn !== 'function') return;
  s.prototype[key] = function() {
    var args = [this._wrapped].concat(Array.prototype.slice.call(arguments));
    var res = fn.apply(null, args);
    // if the result is non-string stop the chain and return the value
    return typeof res === 'string' ? new s(res) : res;
  };
}

// Copy functions to instance methods for chaining
for (var key in s) fn2method(key, s[key]);

fn2method('tap', function tap(string, fn) {
  return fn(string);
});

function prototype2method(methodName) {
  fn2method(methodName, function(context) {
    var args = Array.prototype.slice.call(arguments, 1);
    return String.prototype[methodName].apply(context, args);
  });
}

var prototypeMethods = [
  'toUpperCase',
  'toLowerCase',
  'split',
  'replace',
  'slice',
  'substring',
  'substr',
  'concat'
];

for (var method in prototypeMethods) prototype2method(prototypeMethods[method]);


module.exports = s;

}, function(modId) {var map = {"./isBlank":1722669706606,"./stripTags":1722669706608,"./capitalize":1722669706609,"./decapitalize":1722669706610,"./chop":1722669706611,"./trim":1722669706612,"./clean":1722669706615,"./cleanDiacritics":1722669706616,"./count":1722669706617,"./chars":1722669706618,"./swapCase":1722669706619,"./escapeHTML":1722669706620,"./unescapeHTML":1722669706622,"./splice":1722669706624,"./insert":1722669706625,"./replaceAll":1722669706626,"./include":1722669706627,"./join":1722669706628,"./lines":1722669706629,"./dedent":1722669706630,"./reverse":1722669706631,"./startsWith":1722669706632,"./endsWith":1722669706634,"./pred":1722669706635,"./succ":1722669706637,"./titleize":1722669706638,"./camelize":1722669706639,"./underscored":1722669706640,"./dasherize":1722669706641,"./classify":1722669706642,"./humanize":1722669706643,"./ltrim":1722669706644,"./rtrim":1722669706645,"./truncate":1722669706646,"./prune":1722669706647,"./words":1722669706648,"./pad":1722669706649,"./lpad":1722669706651,"./rpad":1722669706652,"./lrpad":1722669706653,"./sprintf":1722669706654,"./vsprintf":1722669706655,"./toNumber":1722669706656,"./numberFormat":1722669706657,"./strRight":1722669706658,"./strRightBack":1722669706659,"./strLeft":1722669706660,"./strLeftBack":1722669706661,"./toSentence":1722669706662,"./toSentenceSerial":1722669706663,"./slugify":1722669706664,"./surround":1722669706665,"./quote":1722669706666,"./unquote":1722669706667,"./repeat":1722669706668,"./naturalCmp":1722669706669,"./levenshtein":1722669706670,"./toBoolean":1722669706671,"./exports":1722669706672,"./helper/escapeRegExp":1722669706614,"./wrap":1722669706673,"./map":1722669706674}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706606, function(require, module, exports) {
var makeString = require('./helper/makeString');

module.exports = function isBlank(str) {
  return (/^\s*$/).test(makeString(str));
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706607, function(require, module, exports) {
/**
 * Ensure some object is a coerced to a string
 **/
module.exports = function makeString(object) {
  if (object == null) return '';
  return '' + object;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706608, function(require, module, exports) {
var makeString = require('./helper/makeString');

module.exports = function stripTags(str) {
  return makeString(str).replace(/<\/?[^>]+>/g, '');
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706609, function(require, module, exports) {
var makeString = require('./helper/makeString');

module.exports = function capitalize(str, lowercaseRest) {
  str = makeString(str);
  var remainingChars = !lowercaseRest ? str.slice(1) : str.slice(1).toLowerCase();

  return str.charAt(0).toUpperCase() + remainingChars;
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706610, function(require, module, exports) {
var makeString = require('./helper/makeString');

module.exports = function decapitalize(str) {
  str = makeString(str);
  return str.charAt(0).toLowerCase() + str.slice(1);
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706611, function(require, module, exports) {
module.exports = function chop(str, step) {
  if (str == null) return [];
  str = String(str);
  step = ~~step;
  return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706612, function(require, module, exports) {
var makeString = require('./helper/makeString');
var defaultToWhiteSpace = require('./helper/defaultToWhiteSpace');
var nativeTrim = String.prototype.trim;

module.exports = function trim(str, characters) {
  str = makeString(str);
  if (!characters && nativeTrim) return nativeTrim.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
};

}, function(modId) { var map = {"./helper/makeString":1722669706607,"./helper/defaultToWhiteSpace":1722669706613}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706613, function(require, module, exports) {
var escapeRegExp = require('./escapeRegExp');

module.exports = function defaultToWhiteSpace(characters) {
  if (characters == null)
    return '\\s';
  else if (characters.source)
    return characters.source;
  else
    return '[' + escapeRegExp(characters) + ']';
};

}, function(modId) { var map = {"./escapeRegExp":1722669706614}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706614, function(require, module, exports) {
var makeString = require('./makeString');

module.exports = function escapeRegExp(str) {
  return makeString(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};

}, function(modId) { var map = {"./makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706615, function(require, module, exports) {
var trim = require('./trim');

module.exports = function clean(str) {
  return trim(str).replace(/\s\s+/g, ' ');
};

}, function(modId) { var map = {"./trim":1722669706612}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706616, function(require, module, exports) {

var makeString = require('./helper/makeString');

var from  = 'ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșşšŝťțţŭùúüűûñÿýçżźž',
  to    = 'aaaaaaaaaccceeeeeghiiiijllnnoooooooossssstttuuuuuunyyczzz';

from += from.toUpperCase();
to += to.toUpperCase();

to = to.split('');

// for tokens requireing multitoken output
from += 'ß';
to.push('ss');


module.exports = function cleanDiacritics(str) {
  return makeString(str).replace(/.{1}/g, function(c){
    var index = from.indexOf(c);
    return index === -1 ? c : to[index];
  });
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706617, function(require, module, exports) {
var makeString = require('./helper/makeString');

module.exports = function(str, substr) {
  str = makeString(str);
  substr = makeString(substr);

  if (str.length === 0 || substr.length === 0) return 0;
  
  return str.split(substr).length - 1;
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706618, function(require, module, exports) {
var makeString = require('./helper/makeString');

module.exports = function chars(str) {
  return makeString(str).split('');
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706619, function(require, module, exports) {
var makeString = require('./helper/makeString');

module.exports = function swapCase(str) {
  return makeString(str).replace(/\S/g, function(c) {
    return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
  });
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706620, function(require, module, exports) {
var makeString = require('./helper/makeString');
var escapeChars = require('./helper/escapeChars');

var regexString = '[';
for(var key in escapeChars) {
  regexString += key;
}
regexString += ']';

var regex = new RegExp( regexString, 'g');

module.exports = function escapeHTML(str) {

  return makeString(str).replace(regex, function(m) {
    return '&' + escapeChars[m] + ';';
  });
};

}, function(modId) { var map = {"./helper/makeString":1722669706607,"./helper/escapeChars":1722669706621}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706621, function(require, module, exports) {
/* We're explicitly defining the list of entities we want to escape.
nbsp is an HTML entity, but we don't want to escape all space characters in a string, hence its omission in this map.

*/
var escapeChars = {
  '¢' : 'cent',
  '£' : 'pound',
  '¥' : 'yen',
  '€': 'euro',
  '©' :'copy',
  '®' : 'reg',
  '<' : 'lt',
  '>' : 'gt',
  '"' : 'quot',
  '&' : 'amp',
  '\'' : '#39'
};

module.exports = escapeChars;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706622, function(require, module, exports) {
var makeString = require('./helper/makeString');
var htmlEntities = require('./helper/htmlEntities');

module.exports = function unescapeHTML(str) {
  return makeString(str).replace(/\&([^;]{1,10});/g, function(entity, entityCode) {
    var match;

    if (entityCode in htmlEntities) {
      return htmlEntities[entityCode];
    /*eslint no-cond-assign: 0*/
    } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
      return String.fromCharCode(parseInt(match[1], 16));
    /*eslint no-cond-assign: 0*/
    } else if (match = entityCode.match(/^#(\d+)$/)) {
      return String.fromCharCode(~~match[1]);
    } else {
      return entity;
    }
  });
};

}, function(modId) { var map = {"./helper/makeString":1722669706607,"./helper/htmlEntities":1722669706623}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706623, function(require, module, exports) {
/*
We're explicitly defining the list of entities that might see in escape HTML strings
*/
var htmlEntities = {
  nbsp: ' ',
  cent: '¢',
  pound: '£',
  yen: '¥',
  euro: '€',
  copy: '©',
  reg: '®',
  lt: '<',
  gt: '>',
  quot: '"',
  amp: '&',
  apos: '\''
};

module.exports = htmlEntities;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706624, function(require, module, exports) {
var chars = require('./chars');

module.exports = function splice(str, i, howmany, substr) {
  var arr = chars(str);
  arr.splice(~~i, ~~howmany, substr);
  return arr.join('');
};

}, function(modId) { var map = {"./chars":1722669706618}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706625, function(require, module, exports) {
var splice = require('./splice');

module.exports = function insert(str, i, substr) {
  return splice(str, i, 0, substr);
};

}, function(modId) { var map = {"./splice":1722669706624}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706626, function(require, module, exports) {
var makeString = require('./helper/makeString');

module.exports = function replaceAll(str, find, replace, ignorecase) {
  var flags = (ignorecase === true)?'gi':'g';
  var reg = new RegExp(find, flags);

  return makeString(str).replace(reg, replace);
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706627, function(require, module, exports) {
var makeString = require('./helper/makeString');

module.exports = function include(str, needle) {
  if (needle === '') return true;
  return makeString(str).indexOf(needle) !== -1;
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706628, function(require, module, exports) {
var makeString = require('./helper/makeString');
var slice = [].slice;

module.exports = function join() {
  var args = slice.call(arguments),
    separator = args.shift();

  return args.join(makeString(separator));
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706629, function(require, module, exports) {
module.exports = function lines(str) {
  if (str == null) return [];
  return String(str).split(/\r\n?|\n/);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706630, function(require, module, exports) {
var makeString = require('./helper/makeString');

function getIndent(str) {
  var matches = str.match(/^[\s\\t]*/gm);
  var indent = matches[0].length;
  
  for (var i = 1; i < matches.length; i++) {
    indent = Math.min(matches[i].length, indent);
  }

  return indent;
}

module.exports = function dedent(str, pattern) {
  str = makeString(str);
  var indent = getIndent(str);
  var reg;

  if (indent === 0) return str;

  if (typeof pattern === 'string') {
    reg = new RegExp('^' + pattern, 'gm');
  } else {
    reg = new RegExp('^[ \\t]{' + indent + '}', 'gm');
  }

  return str.replace(reg, '');
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706631, function(require, module, exports) {
var chars = require('./chars');

module.exports = function reverse(str) {
  return chars(str).reverse().join('');
};

}, function(modId) { var map = {"./chars":1722669706618}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706632, function(require, module, exports) {
var makeString = require('./helper/makeString');
var toPositive = require('./helper/toPositive');

module.exports = function startsWith(str, starts, position) {
  str = makeString(str);
  starts = '' + starts;
  position = position == null ? 0 : Math.min(toPositive(position), str.length);
  return str.lastIndexOf(starts, position) === position;
};

}, function(modId) { var map = {"./helper/makeString":1722669706607,"./helper/toPositive":1722669706633}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706633, function(require, module, exports) {
module.exports = function toPositive(number) {
  return number < 0 ? 0 : (+number || 0);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706634, function(require, module, exports) {
var makeString = require('./helper/makeString');
var toPositive = require('./helper/toPositive');

module.exports = function endsWith(str, ends, position) {
  str = makeString(str);
  ends = '' + ends;
  if (typeof position == 'undefined') {
    position = str.length - ends.length;
  } else {
    position = Math.min(toPositive(position), str.length) - ends.length;
  }
  return position >= 0 && str.indexOf(ends, position) === position;
};

}, function(modId) { var map = {"./helper/makeString":1722669706607,"./helper/toPositive":1722669706633}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706635, function(require, module, exports) {
var adjacent = require('./helper/adjacent');

module.exports = function succ(str) {
  return adjacent(str, -1);
};

}, function(modId) { var map = {"./helper/adjacent":1722669706636}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706636, function(require, module, exports) {
var makeString = require('./makeString');

module.exports = function adjacent(str, direction) {
  str = makeString(str);
  if (str.length === 0) {
    return '';
  }
  return str.slice(0, -1) + String.fromCharCode(str.charCodeAt(str.length - 1) + direction);
};

}, function(modId) { var map = {"./makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706637, function(require, module, exports) {
var adjacent = require('./helper/adjacent');

module.exports = function succ(str) {
  return adjacent(str, 1);
};

}, function(modId) { var map = {"./helper/adjacent":1722669706636}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706638, function(require, module, exports) {
var makeString = require('./helper/makeString');

module.exports = function titleize(str) {
  return makeString(str).toLowerCase().replace(/(?:^|\s|-)\S/g, function(c) {
    return c.toUpperCase();
  });
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706639, function(require, module, exports) {
var trim = require('./trim');
var decap = require('./decapitalize');

module.exports = function camelize(str, decapitalize) {
  str = trim(str).replace(/[-_\s]+(.)?/g, function(match, c) {
    return c ? c.toUpperCase() : '';
  });

  if (decapitalize === true) {
    return decap(str);
  } else {
    return str;
  }
};

}, function(modId) { var map = {"./trim":1722669706612,"./decapitalize":1722669706610}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706640, function(require, module, exports) {
var trim = require('./trim');

module.exports = function underscored(str) {
  return trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
};

}, function(modId) { var map = {"./trim":1722669706612}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706641, function(require, module, exports) {
var trim = require('./trim');

module.exports = function dasherize(str) {
  return trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
};

}, function(modId) { var map = {"./trim":1722669706612}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706642, function(require, module, exports) {
var capitalize = require('./capitalize');
var camelize = require('./camelize');
var makeString = require('./helper/makeString');

module.exports = function classify(str) {
  str = makeString(str);
  return capitalize(camelize(str.replace(/[\W_]/g, ' ')).replace(/\s/g, ''));
};

}, function(modId) { var map = {"./capitalize":1722669706609,"./camelize":1722669706639,"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706643, function(require, module, exports) {
var capitalize = require('./capitalize');
var underscored = require('./underscored');
var trim = require('./trim');

module.exports = function humanize(str) {
  return capitalize(trim(underscored(str).replace(/_id$/, '').replace(/_/g, ' ')));
};

}, function(modId) { var map = {"./capitalize":1722669706609,"./underscored":1722669706640,"./trim":1722669706612}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706644, function(require, module, exports) {
var makeString = require('./helper/makeString');
var defaultToWhiteSpace = require('./helper/defaultToWhiteSpace');
var nativeTrimLeft = String.prototype.trimLeft;

module.exports = function ltrim(str, characters) {
  str = makeString(str);
  if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp('^' + characters + '+'), '');
};

}, function(modId) { var map = {"./helper/makeString":1722669706607,"./helper/defaultToWhiteSpace":1722669706613}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706645, function(require, module, exports) {
var makeString = require('./helper/makeString');
var defaultToWhiteSpace = require('./helper/defaultToWhiteSpace');
var nativeTrimRight = String.prototype.trimRight;

module.exports = function rtrim(str, characters) {
  str = makeString(str);
  if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp(characters + '+$'), '');
};

}, function(modId) { var map = {"./helper/makeString":1722669706607,"./helper/defaultToWhiteSpace":1722669706613}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706646, function(require, module, exports) {
var makeString = require('./helper/makeString');

module.exports = function truncate(str, length, truncateStr) {
  str = makeString(str);
  truncateStr = truncateStr || '...';
  length = ~~length;
  return str.length > length ? str.slice(0, length) + truncateStr : str;
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706647, function(require, module, exports) {
/**
 * _s.prune: a more elegant version of truncate
 * prune extra chars, never leaving a half-chopped word.
 * @author github.com/rwz
 */
var makeString = require('./helper/makeString');
var rtrim = require('./rtrim');

module.exports = function prune(str, length, pruneStr) {
  str = makeString(str);
  length = ~~length;
  pruneStr = pruneStr != null ? String(pruneStr) : '...';

  if (str.length <= length) return str;

  var tmpl = function(c) {
      return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' ';
    },
    template = str.slice(0, length + 1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

  if (template.slice(template.length - 2).match(/\w\w/))
    template = template.replace(/\s*\S+$/, '');
  else
    template = rtrim(template.slice(0, template.length - 1));

  return (template + pruneStr).length > str.length ? str : str.slice(0, template.length) + pruneStr;
};

}, function(modId) { var map = {"./helper/makeString":1722669706607,"./rtrim":1722669706645}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706648, function(require, module, exports) {
var isBlank = require('./isBlank');
var trim = require('./trim');

module.exports = function words(str, delimiter) {
  if (isBlank(str)) return [];
  return trim(str, delimiter).split(delimiter || /\s+/);
};

}, function(modId) { var map = {"./isBlank":1722669706606,"./trim":1722669706612}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706649, function(require, module, exports) {
var makeString = require('./helper/makeString');
var strRepeat = require('./helper/strRepeat');

module.exports = function pad(str, length, padStr, type) {
  str = makeString(str);
  length = ~~length;

  var padlen = 0;

  if (!padStr)
    padStr = ' ';
  else if (padStr.length > 1)
    padStr = padStr.charAt(0);

  switch (type) {
  case 'right':
    padlen = length - str.length;
    return str + strRepeat(padStr, padlen);
  case 'both':
    padlen = length - str.length;
    return strRepeat(padStr, Math.ceil(padlen / 2)) + str + strRepeat(padStr, Math.floor(padlen / 2));
  default: // 'left'
    padlen = length - str.length;
    return strRepeat(padStr, padlen) + str;
  }
};

}, function(modId) { var map = {"./helper/makeString":1722669706607,"./helper/strRepeat":1722669706650}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706650, function(require, module, exports) {
module.exports = function strRepeat(str, qty){
  if (qty < 1) return '';
  var result = '';
  while (qty > 0) {
    if (qty & 1) result += str;
    qty >>= 1, str += str;
  }
  return result;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706651, function(require, module, exports) {
var pad = require('./pad');

module.exports = function lpad(str, length, padStr) {
  return pad(str, length, padStr);
};

}, function(modId) { var map = {"./pad":1722669706649}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706652, function(require, module, exports) {
var pad = require('./pad');

module.exports = function rpad(str, length, padStr) {
  return pad(str, length, padStr, 'right');
};

}, function(modId) { var map = {"./pad":1722669706649}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706653, function(require, module, exports) {
var pad = require('./pad');

module.exports = function lrpad(str, length, padStr) {
  return pad(str, length, padStr, 'both');
};

}, function(modId) { var map = {"./pad":1722669706649}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706654, function(require, module, exports) {
var deprecate = require('util-deprecate');

module.exports = deprecate(require('sprintf-js').sprintf,
  'sprintf() will be removed in the next major release, use the sprintf-js package instead.');

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706655, function(require, module, exports) {
var deprecate = require('util-deprecate');

module.exports = deprecate(require('sprintf-js').vsprintf,
  'vsprintf() will be removed in the next major release, use the sprintf-js package instead.');

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706656, function(require, module, exports) {
module.exports = function toNumber(num, precision) {
  if (num == null) return 0;
  var factor = Math.pow(10, isFinite(precision) ? precision : 0);
  return Math.round(num * factor) / factor;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706657, function(require, module, exports) {
module.exports = function numberFormat(number, dec, dsep, tsep) {
  if (isNaN(number) || number == null) return '';

  number = number.toFixed(~~dec);
  tsep = typeof tsep == 'string' ? tsep : ',';

  var parts = number.split('.'),
    fnums = parts[0],
    decimals = parts[1] ? (dsep || '.') + parts[1] : '';

  return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706658, function(require, module, exports) {
var makeString = require('./helper/makeString');

module.exports = function strRight(str, sep) {
  str = makeString(str);
  sep = makeString(sep);
  var pos = !sep ? -1 : str.indexOf(sep);
  return~ pos ? str.slice(pos + sep.length, str.length) : str;
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706659, function(require, module, exports) {
var makeString = require('./helper/makeString');

module.exports = function strRightBack(str, sep) {
  str = makeString(str);
  sep = makeString(sep);
  var pos = !sep ? -1 : str.lastIndexOf(sep);
  return~ pos ? str.slice(pos + sep.length, str.length) : str;
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706660, function(require, module, exports) {
var makeString = require('./helper/makeString');

module.exports = function strLeft(str, sep) {
  str = makeString(str);
  sep = makeString(sep);
  var pos = !sep ? -1 : str.indexOf(sep);
  return~ pos ? str.slice(0, pos) : str;
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706661, function(require, module, exports) {
var makeString = require('./helper/makeString');

module.exports = function strLeftBack(str, sep) {
  str = makeString(str);
  sep = makeString(sep);
  var pos = str.lastIndexOf(sep);
  return~ pos ? str.slice(0, pos) : str;
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706662, function(require, module, exports) {
var rtrim = require('./rtrim');

module.exports = function toSentence(array, separator, lastSeparator, serial) {
  separator = separator || ', ';
  lastSeparator = lastSeparator || ' and ';
  var a = array.slice(),
    lastMember = a.pop();

  if (array.length > 2 && serial) lastSeparator = rtrim(separator) + lastSeparator;

  return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
};

}, function(modId) { var map = {"./rtrim":1722669706645}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706663, function(require, module, exports) {
var toSentence = require('./toSentence');

module.exports = function toSentenceSerial(array, sep, lastSep) {
  return toSentence(array, sep, lastSep, true);
};

}, function(modId) { var map = {"./toSentence":1722669706662}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706664, function(require, module, exports) {
var trim = require('./trim');
var dasherize = require('./dasherize');
var cleanDiacritics = require('./cleanDiacritics');

module.exports = function slugify(str) {
  return trim(dasherize(cleanDiacritics(str).replace(/[^\w\s-]/g, '-').toLowerCase()), '-');
};

}, function(modId) { var map = {"./trim":1722669706612,"./dasherize":1722669706641,"./cleanDiacritics":1722669706616}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706665, function(require, module, exports) {
module.exports = function surround(str, wrapper) {
  return [wrapper, str, wrapper].join('');
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706666, function(require, module, exports) {
var surround = require('./surround');

module.exports = function quote(str, quoteChar) {
  return surround(str, quoteChar || '"');
};

}, function(modId) { var map = {"./surround":1722669706665}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706667, function(require, module, exports) {
module.exports = function unquote(str, quoteChar) {
  quoteChar = quoteChar || '"';
  if (str[0] === quoteChar && str[str.length - 1] === quoteChar)
    return str.slice(1, str.length - 1);
  else return str;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706668, function(require, module, exports) {
var makeString = require('./helper/makeString');
var strRepeat = require('./helper/strRepeat');

module.exports = function repeat(str, qty, separator) {
  str = makeString(str);

  qty = ~~qty;

  // using faster implementation if separator is not needed;
  if (separator == null) return strRepeat(str, qty);

  // this one is about 300x slower in Google Chrome
  /*eslint no-empty: 0*/
  for (var repeat = []; qty > 0; repeat[--qty] = str) {}
  return repeat.join(separator);
};

}, function(modId) { var map = {"./helper/makeString":1722669706607,"./helper/strRepeat":1722669706650}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706669, function(require, module, exports) {
module.exports = function naturalCmp(str1, str2) {
  if (str1 == str2) return 0;
  if (!str1) return -1;
  if (!str2) return 1;

  var cmpRegex = /(\.\d+|\d+|\D+)/g,
    tokens1 = String(str1).match(cmpRegex),
    tokens2 = String(str2).match(cmpRegex),
    count = Math.min(tokens1.length, tokens2.length);

  for (var i = 0; i < count; i++) {
    var a = tokens1[i],
      b = tokens2[i];

    if (a !== b) {
      var num1 = +a;
      var num2 = +b;
      if (num1 === num1 && num2 === num2) {
        return num1 > num2 ? 1 : -1;
      }
      return a < b ? -1 : 1;
    }
  }

  if (tokens1.length != tokens2.length)
    return tokens1.length - tokens2.length;

  return str1 < str2 ? -1 : 1;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706670, function(require, module, exports) {
var makeString = require('./helper/makeString');

/**
 * Based on the implementation here: https://github.com/hiddentao/fast-levenshtein
 */
module.exports = function levenshtein(str1, str2) {
  
  str1 = makeString(str1);
  str2 = makeString(str2);

  // Short cut cases  
  if (str1 === str2) return 0;
  if (!str1 || !str2) return Math.max(str1.length, str2.length);

  // two rows
  var prevRow = new Array(str2.length + 1);

  // initialise previous row
  for (var i = 0; i < prevRow.length; ++i) {
    prevRow[i] = i;
  }

  // calculate current row distance from previous row
  for (i = 0; i < str1.length; ++i) {
    var nextCol = i + 1;

    for (var j = 0; j < str2.length; ++j) {
      var curCol = nextCol;

      // substution
      nextCol = prevRow[j] + ( (str1.charAt(i) === str2.charAt(j)) ? 0 : 1 );
      // insertion
      var tmp = curCol + 1;
      if (nextCol > tmp) {
        nextCol = tmp;
      }
      // deletion
      tmp = prevRow[j + 1] + 1;
      if (nextCol > tmp) {
        nextCol = tmp;
      }

      // copy current col value into previous (in preparation for next iteration)
      prevRow[j] = curCol;
    }

    // copy last col value into previous (in preparation for next iteration)
    prevRow[j] = nextCol;
  }

  return nextCol;
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706671, function(require, module, exports) {
var trim = require('./trim');

function boolMatch(s, matchers) {
  var i, matcher, down = s.toLowerCase();
  matchers = [].concat(matchers);
  for (i = 0; i < matchers.length; i += 1) {
    matcher = matchers[i];
    if (!matcher) continue;
    if (matcher.test && matcher.test(s)) return true;
    if (matcher.toLowerCase() === down) return true;
  }
}

module.exports = function toBoolean(str, trueValues, falseValues) {
  if (typeof str === 'number') str = '' + str;
  if (typeof str !== 'string') return !!str;
  str = trim(str);
  if (boolMatch(str, trueValues || ['true', '1'])) return true;
  if (boolMatch(str, falseValues || ['false', '0'])) return false;
};

}, function(modId) { var map = {"./trim":1722669706612}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706672, function(require, module, exports) {
module.exports = function() {
  var result = {};

  for (var prop in this) {
    if (!this.hasOwnProperty(prop) || prop.match(/^(?:include|contains|reverse|join|map|wrap)$/)) continue;
    result[prop] = this[prop];
  }

  return result;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706673, function(require, module, exports) {
// Wrap
// wraps a string by a certain width

var makeString = require('./helper/makeString');

module.exports = function wrap(str, options){
  str = makeString(str);
  
  options = options || {};
  
  var width = options.width || 75;
  var seperator = options.seperator || '\n';
  var cut = options.cut || false;
  var preserveSpaces = options.preserveSpaces || false;
  var trailingSpaces = options.trailingSpaces || false;
  
  var result;
  
  if(width <= 0){
    return str;
  }
  
  else if(!cut){
  
    var words = str.split(' ');
    var current_column = 0;
    result = '';
  
    while(words.length > 0){
      
      // if adding a space and the next word would cause this line to be longer than width...
      if(1 + words[0].length + current_column > width){
        //start a new line if this line is not already empty
        if(current_column > 0){
          // add a space at the end of the line is preserveSpaces is true
          if (preserveSpaces){
            result += ' ';
            current_column++;
          }
          // fill the rest of the line with spaces if trailingSpaces option is true
          else if(trailingSpaces){
            while(current_column < width){
              result += ' ';
              current_column++;
            }            
          }
          //start new line
          result += seperator;
          current_column = 0;
        }
      }
  
      // if not at the begining of the line, add a space in front of the word
      if(current_column > 0){
        result += ' ';
        current_column++;
      }
  
      // tack on the next word, update current column, a pop words array
      result += words[0];
      current_column += words[0].length;
      words.shift();
  
    }
  
    // fill the rest of the line with spaces if trailingSpaces option is true
    if(trailingSpaces){
      while(current_column < width){
        result += ' ';
        current_column++;
      }            
    }
  
    return result;
  
  }
  
  else {
  
    var index = 0;
    result = '';
  
    // walk through each character and add seperators where appropriate
    while(index < str.length){
      if(index % width == 0 && index > 0){
        result += seperator;
      }
      result += str.charAt(index);
      index++;
    }
  
    // fill the rest of the line with spaces if trailingSpaces option is true
    if(trailingSpaces){
      while(index % width > 0){
        result += ' ';
        index++;
      }            
    }
    
    return result;
  }
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706674, function(require, module, exports) {
var makeString = require('./helper/makeString');

module.exports = function(str, callback) {
  str = makeString(str);

  if (str.length === 0 || typeof callback !== 'function') return str;

  return str.replace(/./g, callback);
};

}, function(modId) { var map = {"./helper/makeString":1722669706607}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1722669706605);
})()
//miniprogram-npm-outsideDeps=["util-deprecate","sprintf-js"]
//# sourceMappingURL=index.js.map