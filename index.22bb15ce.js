function e(e){return e&&e.__esModule?e.default:e}var t,n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o=/^\s+|\s+$/g,r=/^[-+]0x[0-9a-f]+$/i,i=/^0b[01]+$/i,u=/^0o[0-7]+$/i,f=parseInt,l="object"==typeof n&&n&&n.Object===Object&&n,a="object"==typeof self&&self&&self.Object===Object&&self,c=l||a||Function("return this")(),s=Object.prototype.toString,d=Math.max,p=Math.min,v=function(){return c.Date.now()};function y(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function m(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==s.call(e)}(e))return NaN;if(y(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=y(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(o,"");var n=i.test(e);return n||u.test(e)?f(e.slice(2),n?2:8):r.test(e)?NaN:+e}t=function(e,t,n){var o,r,i,u,f,l,a=0,c=!1,s=!1,b=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function g(t){var n=o,i=r;return o=r=void 0,a=t,u=e.apply(i,n)}function j(e){return a=e,f=setTimeout(T,t),c?g(e):u}function h(e){var n=e-l;return void 0===l||n>=t||n<0||s&&e-a>=i}function T(){var e=v();if(h(e))return w(e);f=setTimeout(T,function(e){var n=t-(e-l);return s?p(n,i-(e-a)):n}(e))}function w(e){return f=void 0,b&&o?g(e):(o=r=void 0,u)}function O(){var e=v(),n=h(e);if(o=arguments,r=this,l=e,n){if(void 0===f)return j(l);if(s)return f=setTimeout(T,t),g(l)}return void 0===f&&(f=setTimeout(T,t)),u}return t=m(t)||0,y(n)&&(c=!!n.leading,i=(s="maxWait"in n)?d(m(n.maxWait)||0,t):i,b="trailing"in n?!!n.trailing:b),O.cancel=function(){void 0!==f&&clearTimeout(f),a=0,o=l=r=f=void 0},O.flush=function(){return void 0===f?u:w(v())},O};const b={form:document.querySelector("form#search-form"),input:document.querySelector("input"),gallery:document.querySelector(".gallery")};console.log(b.gallery);let g;b.form.addEventListener("input",e(t)((function(){if(g=b.input.value,console.log(g),""===g)return void(gallery.innerHTML="")}),300)),b.form.addEventListener("submit",(function(e){if(e.preventDefault(),!b.input.value)return alert("Please fill in all fields!")}));
//# sourceMappingURL=index.22bb15ce.js.map