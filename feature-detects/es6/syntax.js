/*!
{
  "name": "ES6 Syntax",
  "property": "es6syntax",
  "notes": [{
    "name": "original implementation of detect code",
    "href": "http://kangax.github.io/es5-compat-table/es6/"
  }, {
    "name": "unofficial ECMAScript 6 draft specification",
    "href": "http://people.mozilla.org/~jorendorff/es6-draft.html"
  }],
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "warnings": ["This detect uses `eval()`, so CSP may be a problem."],
  "tags": ["es6"]
}
!*/
/* DOC
Check if browser accepts ECMAScript 6 syntax.
*/
define(['Modernizr', 'test/es5/syntax', 'test/es6/generators'], function (Modernizr) {
  Modernizr.addTest('es6syntax', function () {
    var x;
    if (!Modernizr.es5syntax || !Modernizr.generators) {
      return false;
    }
    if (typeof navigator !== 'undefined' && /Chrom\w+\/2\d\./i.test(navigator.userAgent)) {
      // the modules test (below) crashes Chrome 21-24
      return false;
    }
    try {
      // arrow functions
      eval('var a = () => 5;');
      // const
      if (!eval('(function () { const foobarbaz = 12; return typeof foobarbaz === "number"; }())')) {
        return false;
      }
      // let
      if (!eval('(function () { let foobarbaz2 = 123; return foobarbaz2 == 123; }())')) {
        return false;
      }
      // default function params
      if (!eval('(function (a = 5) { return a === 5; }())')) {
        return false;
      }
      // rest parameters
      if (!eval('(function (...args) { return typeof args !== "undefined"; }())')) {
        return false;
      }
      // spread call (...) operator
      if (!eval('Math.max(...[1, 2, 3]) === 3')) {
        return false;
      }
      // spread array (...) operator
      if (!eval('[...[1, 2, 3]][2] === 3')) {
        return false;
      }
      // class
      if (!eval('class C{ constructor() { this.own = true; } } (new C()).own;')) {
        return false;
      }
      // computed properties
      x = 'y';
      if (!eval('({ [x]: 1 })["y"] === 1')) {
        return false;
      }
      // modules
      if (!eval('module foo { }')) {
        return false;
      }
      // for..of loops
      if (!eval('(function () { var arr = [5]; for (var item of arr) return item === 5; }())')) {
        return false;
      }
      // array comprehensions
      eval('[a * a for (a of [1, 2, 3])][0] === 1');
      // generator comprehensions
      eval('(a for (a of [1, 2, 3]))');
      // iterators
      if (!eval('(function(){ var it = Iterator({ key: "v" }); for(var pair of it){return pair[0] === "key" && pair[1] === "v"}}())')) {
        return false;
      }
      // template strings
      if (!eval('var u = function () { return true }; u`literal`')) {
        return false;
      }
      // RegExp "u" flag
      if (!eval('"𠮷".match(/./u)[0].length === 2')) {
        return false;
      }
      // block-level function declaration
      if (!eval('{function f(){}} typeof f == "undefined"')) {
        return false;
      }
      // destructuring
      eval('var [a] = [5];');
      // unicode code point escapes
      if (!eval('"\\u{1d306}" == "\\ud834\\udf06"')) {
        return false;
      }

      return true;
    } catch (ignore) {
      return false;
    }
  });
});
