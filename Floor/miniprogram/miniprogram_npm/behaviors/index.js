module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1722669706591, function(require, module, exports) {
(function() {

  var Behaviors = require("./lib/Behaviors");
  Behaviors.Stylesheet = require("./lib/Stylesheet");
  Behaviors.Translator = require("./lib/Translator");
  Behaviors.Grammar = require("./lib/Grammar");
  Behaviors.Bindings = require("./lib/Bindings");
  Behaviors.Relative = require("./lib/Relative");
  Behaviors.Attributes = require("./lib/Attributes");

  // export module
  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = Behaviors;
  } else {
    window.Behaviors = Behaviors;
  }

  // register onload event
  if (typeof window !== "undefined") {
    window.addEventListener("load", Behaviors.load);
  }

})();
}, function(modId) {var map = {"./lib/Behaviors":1722669706592,"./lib/Stylesheet":1722669706593,"./lib/Translator":1722669706595,"./lib/Grammar":1722669706594,"./lib/Bindings":1722669706597,"./lib/Relative":1722669706598,"./lib/Attributes":1722669706596}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706592, function(require, module, exports) {


var _ = require("underscore");

var Stylesheet = require("./Stylesheet");

/**
 * JavaScript Behaviors Library
 *
 * @copyright 2014 Stephen Riesenberg, All Rights Reserved
 * @author Dan Yoder
 * @author Stephen Riesenberg
 * @version 0.7
 * @license MIT
 * @link http://code.google.com/p/cruiser/wiki/Behaviors
 * @link https://github.com/sjohnr/behaviors.js
 */
var Behaviors = {
  /**
   * Load and process Behaviors Stylesheets.
   */
  load: function() {
    _.chain(document.getElementsByTagName("link"))
        .filter(Stylesheet.test)
        .pluck("href")
        .each(Behaviors.process);
  },
  /**
   * Load an individual Behaviors Stylesheet file by URL.
   */
  process: function(href) {
    Stylesheet.load(href);
  }
};

console.log("Loaded Behaviors module");
module.exports = Behaviors;

}, function(modId) { var map = {"./Stylesheet":1722669706593}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706593, function(require, module, exports) {


var $ = require("jquery");
var _ = require("underscore");
var _camelize = require("underscore.string/camelize");
_.camelize = _camelize;

var Grammar = require("./Grammar");
var Attributes = require("./Attributes");

var Stylesheet = {
  /**
   * Determine if the given <link> element is a Behaviors Stylesheet.
   *
   * @param link A <link> element to test
   */
  test: function(link) {
    return link.rel == "behaviors";
  },
  /**
   * Load the contents of a Behaviors Styleseheet via Ajax
   * and process the result.
   *
   * @param url The URL to load
   */
  load: function(url) {
    $.get(url, {}, Stylesheet.process);
  },
  /**
   * Process an Ajax response as a Behaviors Stylesheet.
   *
   * @param response The Ajax response
   */
  process: function(response) {
    var rules = Stylesheet.parse(response);
    _.each(rules, function(attributes, selector) {
      var elements = $(selector);
      _.each(elements, function(e) {
        if (!e.binding) {
          e.binding = e;
        }
        _.each(attributes, function(value, name) {
          var fn = Attributes[_.camelize(name)] || Attributes[name];
          try {
            fn ? fn(e, value, name) : null;
          } catch (ex) {
            if (window.console) {
              console.log(ex);
              console.log("@ " + selector + " { " + name + ": " + value + "; }");
            }
          }
        });
      });
    });
  },
  /**
   * Parse a Behaviors Stylesheet.
   *
   * @param s The contents of the stylesheet file
   */
  parse: function(s) {
    return _.first(Grammar.parse(s));
  }
};

console.log("Loaded Stylesheet module");
module.exports = Stylesheet;

}, function(modId) { var map = {"./Grammar":1722669706594,"./Attributes":1722669706596}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706594, function(require, module, exports) {


var g = {}, o = require("parser-generator").Operators, t = require("./Translator");

// basic tokens
g.lbrace = o.token("{");
g.rbrace = o.token("}");
g.lparen = o.token(/\(/);
g.rparen = o.token(/\)/);
g.colon = o.token(":");
g.semicolon = o.token(";");
// comments
g.inlineComment = o.token(/\x2F\x2F[^\n]*\n/);
g.multilineComment = o.token(/\x2F\x2A(.|\n)*?\x2A\x2F/);
g.comments = o.ignore(o.any(g.inlineComment, g.multilineComment));
// attributes
g.attrName = o.token(/[\w\-\d]+/);
g.attrValue = o.token(/[^;}]+/);
g.attr = o.each(g.attrName, g.colon, g.attrValue, g.semicolon);
g.attrList = o.many(o.any(g.comments, g.attr));
// style rules
g.style = o.process(o.between(g.lbrace, g.attrList, g.rbrace), t.style);
g.selector = o.token(/[^\{]+/);
g.rule = o.each(g.selector, g.style);
g.rules = o.process(o.many(o.any(g.comments, g.rule)), t.rules);

var Grammar = {
  parse: g.rules
};

console.log("Loaded Grammar module");
module.exports = Grammar;

}, function(modId) { var map = {"./Translator":1722669706595}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706595, function(require, module, exports) {


var _ = require("underscore");

var Translator = {
  /**
   * Translate style attributes to an associative array.
   *
   * @param ax The attributes parse tree
   */
  style: function (ax) {
    return _.reduce(ax, function (h, a) {
      if (a) {
        h[a[0]] = a[2];
      }

      return h;
    }, {});
  },
  /**
   * Translate rules to an associative array.
   *
   * @param rx The rules parse tree
   */
  rules: function (rx) {
    return _.reduce(rx, function (h, r) {
      if (r) {
        h[r[0]] = _.extend(h[r[0]] || {}, r[1]);
      }

      return h;
    }, {});
  }
};

console.log("Loaded Translator module");
module.exports = Translator;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706596, function(require, module, exports) {


var $ = require("jquery");
var _ = require("underscore");
var Bindings = require("./Bindings");
var Relative = require("./Relative");

/**
 * Adds an event handler to the element: blur, change, click, etc.
 *
 * @param h The handler
 * @param e The element
 * @param v The function name to invoke
 */
function observe(h, e, v) {
  $(e).on(h, _.bind(e.binding[v], e.binding));
}

/**
 * Adds relative attributes: height, width, opacity...
 *
 * @param a The attribute name
 * @param e The element
 * @param v The function spec, e.g. "minimum( div.sidebar )"
 */
function relative(a, e, v) {
  var f = parseFunction(v);
  if (!f) {
    return;
  }
  var fname = f[1], s = f[2];
  var fn = Relative[fname];
  if (fn) {
    fn(a, e, s);
  }
}

function parseFunction(s) {
  return s.match(/(\w+)\s*\(\s*([^\)]+)\s*\)/);
}

var Attributes = {
  /**
   * Adds a binding to an element.
   *
   * @param e The element
   * @param v The function spec, e.g. "new( TabControl )"
   */
  binding: function(e, v) {
    var f = parseFunction(v);
    if (!f) {
      return;
    }
    var fname = f[1], x = f[2];
    var fn = Bindings[fname];
    if (fn) {
      fn(e, x);
    }
  },
  /**
   * Adds a callback when the element is loaded.
   *
   * @param e The element
   * @param v The function, e.g. "addMenuItem"
   */
  load: function(e, v) {
    if (e.binding[v]) {
      e.binding[v](e);
    }
  },
  /**
   * Give an element focus.
   *
   * @param e The element
   * @param v Dummy argument, "true" or "yes"
   */
  hasFocus: function(e, v) {
    v = v.toLowerCase();
    if (v == "true" || v == "yes") {
      e.focus();
    }
  }
};

function $w(s) {
  return _(s.split(" "));
}

//
// Meta functions for observing events
//
$w("blur change click dblclick contextmenu focus keydown keypress keyup mousedown mousemove mouseout mouseover mouseup resize").each(function(s) {
  Attributes[s] = _.partial(observe, s);
});

//
// Meta functions for maintaining relative size
//
$w("height width opacity font-size letter-spacing line-height text-indent word-spacing border-width border-top-width border-right-width border-bottom-width border-left-width outline-width padding padding-top padding-right padding-bottom padding-left margin margin-top margin-right margin-bottom margin-left top right bottom left max-height max-width min-height min-width z-index").each(function(s) {
  Attributes[s] = _.partial(relative, s);
});

console.log("Loaded Attributes module");
module.exports = Attributes;

}, function(modId) { var map = {"./Bindings":1722669706597,"./Relative":1722669706598}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706597, function(require, module, exports) {


var $ = require("jquery");
var _ = require("underscore");

/**
 * Set the binding property of an object
 *
 * @param o The object or element to bind to
 * @param t The target object or element being bound
 */
function bind(o, t) {
  o.binding = ((t instanceof Element) && t.binding) ? t.binding : t;
}

var Bindings = {
  "new":      function(e, x) { bind(e, eval("new "+x+"(e)")); },
  "object":   function(e, x) { bind(e, eval(x)); },
  "select":   function(e, x) { bind(e, _.first($(x))); },
  "up":       function(e, x) { bind(e, _.first($(e).closest(x))); },
  "down":     function(e, x) { bind(e, _.first($(e).find(x))); },
  "previous": function(e, x) { bind(e, _.first($(e).prevAll(x))); },
  "next":     function(e, x) { bind(e, _.first($(e).nextAll(x))); }
};

console.log("Loaded Bindings module");
module.exports = Bindings;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1722669706598, function(require, module, exports) {


var $ = require("jquery");
var _ = require("underscore");

/**
 * Adds relative attribute functions: minimum, maximum, equals.
 *
 * @param c The comparator function
 * @param a The attribute name
 * @param e1 The first element (the element to act upon)
 * @param s The selector to evaluate as an element to compare to
 */
function apply(c, a, e1, s) {
  var e2 = _.first($(s)); if (!e2) return;
  if (c(parseInt(e1.css(a)), parseInt(e2.css(a)))) {
    e1.css(a, e2.css(a));
  }
}

var Relative = _.reduce({
  "minimum": function(a, b) { return a < b; },
  "maximum": function(a, b) { return a > b; },
  "equals":  function(a, b) { return a == b; }
}, function(h, fn, a) {
  return h[a] = _.partial(apply, fn);
}, {});

// alias equals
Relative.equal = Relative.equals;

console.log("Loaded Relative module");
module.exports = Relative;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1722669706591);
})()
//miniprogram-npm-outsideDeps=["underscore","jquery","underscore.string/camelize","parser-generator"]
//# sourceMappingURL=index.js.map