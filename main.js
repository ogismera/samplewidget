/*! For license information please see fileUploadXLS.bundle.js.LICENSE.txt */
(() = >{
  "use strict";
  var t, e = function(t) {
    return 0 === Object.keys(t).length
  };
  function n(t) {
    return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(t) {
      return typeof t
    }: function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol": typeof t
    },
    n(t)
  }
  function r(t, e) {
    var n = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(t);
      e && (r = r.filter((function(e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      }))),
      n.push.apply(n, r)
    }
    return n
  }
  function o(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = null != arguments[e] ? arguments[e] : {};
      e % 2 ? r(Object(n), !0).forEach((function(e) {
        var r, o, i;
        r = t,
        o = e,
        i = n[e],
        (o = g(o)) in r ? Object.defineProperty(r, o, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : r[o] = i
      })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : r(Object(n)).forEach((function(e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
      }))
    }
    return t
  }
  function i(t) {
    return p(t) || u(t) || s(t) || l()
  }
  function a(t) {
    return function(t) {
      if (Array.isArray(t)) return f(t)
    } (t) || u(t) || s(t) ||
    function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    } ()
  }
  function u(t) {
    if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
  }
  function c(t, e) {
    return p(t) ||
    function(t, e) {
      var n = null == t ? null: "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
      if (null != n) {
        var r, o, i, a, u = [],
        c = !0,
        l = !1;
        try {
          if (i = (n = n.call(t)).next, 0 === e) {
            if (Object(n) !== n) return;
            c = !1
          } else for (; ! (c = (r = i.call(n)).done) && (u.push(r.value), u.length !== e); c = !0);
        } catch(t) {
          l = !0,
          o = t
        } finally {
          try {
            if (!c && null != n.
            return && (a = n.
            return (), Object(a) !== a)) return
          } finally {
            if (l) throw o
          }
        }
        return u
      }
    } (t, e) || s(t, e) || l()
  }
  function l() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
  }
  function s(t, e) {
    if (t) {
      if ("string" == typeof t) return f(t, e);
      var n = Object.prototype.toString.call(t).slice(8, -1);
      return "Object" === n && t.constructor && (n = t.constructor.name),
      "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? f(t, e) : void 0
    }
  }
  function f(t, e) { (null == e || e > t.length) && (e = t.length);
    for (var n = 0,
    r = new Array(e); n < e; n++) r[n] = t[n];
    return r
  }
  function p(t) {
    if (Array.isArray(t)) return t
  }
  function h() {
    h = function() {
      return e
    };
    var t, e = {},
    r = Object.prototype,
    o = r.hasOwnProperty,
    i = Object.defineProperty ||
    function(t, e, n) {
      t[e] = n.value
    },
    a = "function" == typeof Symbol ? Symbol: {},
    u = a.iterator || "@@iterator",
    c = a.asyncIterator || "@@asyncIterator",
    l = a.toStringTag || "@@toStringTag";
    function s(t, e, n) {
      return Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }),
      t[e]
    }
    try {
      s({},
      "")
    } catch(t) {
      s = function(t, e, n) {
        return t[e] = n
      }
    }
    function f(t, e, n, r) {
      var o = e && e.prototype instanceof g ? e: g,
      a = Object.create(o.prototype),
      u = new M(r || []);
      return i(a, "_invoke", {
        value: L(t, n, u)
      }),
      a
    }
    function p(t, e, n) {
      try {
        return {
          type: "normal",
          arg: t.call(e, n)
        }
      } catch(t) {
        return {
          type: "throw",
          arg: t
        }
      }
    }
    e.wrap = f;
    var d = "suspendedStart",
    y = "suspendedYield",
    v = "executing",
    b = "completed",
    m = {};
    function g() {}
    function w() {}
    function x() {}
    var _ = {};
    s(_, u, (function() {
      return this
    }));
    var k = Object.getPrototypeOf,
    S = k && k(k(I([])));
    S && S !== r && o.call(S, u) && (_ = S);
    var j = x.prototype = g.prototype = Object.create(_);
    function O(t) { ["next", "throw", "return"].forEach((function(e) {
        s(t, e, (function(t) {
          return this._invoke(e, t)
        }))
      }))
    }
    function E(t, e) {
      function r(i, a, u, c) {
        var l = p(t[i], t, a);
        if ("throw" !== l.type) {
          var s = l.arg,
          f = s.value;
          return f && "object" == n(f) && o.call(f, "__await") ? e.resolve(f.__await).then((function(t) {
            r("next", t, u, c)
          }), (function(t) {
            r("throw", t, u, c)
          })) : e.resolve(f).then((function(t) {
            s.value = t,
            u(s)
          }), (function(t) {
            return r("throw", t, u, c)
          }))
        }
        c(l.arg)
      }
      var a;
      i(this, "_invoke", {
        value: function(t, n) {
          function o() {
            return new e((function(e, o) {
              r(t, n, e, o)
            }))
          }
          return a = a ? a.then(o, o) : o()
        }
      })
    }
    function L(e, n, r) {
      var o = d;
      return function(i, a) {
        if (o === v) throw Error("Generator is already running");
        if (o === b) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: !0
          }
        }
        for (r.method = i, r.arg = a;;) {
          var u = r.delegate;
          if (u) {
            var c = C(u, r);
            if (c) {
              if (c === m) continue;
              return c
            }
          }
          if ("next" === r.method) r.sent = r._sent = r.arg;
          else if ("throw" === r.method) {
            if (o === d) throw o = b,
            r.arg;
            r.dispatchException(r.arg)
          } else "return" === r.method && r.abrupt("return", r.arg);
          o = v;
          var l = p(e, n, r);
          if ("normal" === l.type) {
            if (o = r.done ? b: y, l.arg === m) continue;
            return {
              value: l.arg,
              done: r.done
            }
          }
          "throw" === l.type && (o = b, r.method = "throw", r.arg = l.arg)
        }
      }
    }
    function C(e, n) {
      var r = n.method,
      o = e.iterator[r];
      if (o === t) return n.delegate = null,
      "throw" === r && e.iterator.
      return && (n.method = "return", n.arg = t, C(e, n), "throw" === n.method) || "return" !== r && (n.method = "throw", n.arg = new TypeError("The iterator does not provide a '" + r + "' method")),
      m;
      var i = p(o, e.iterator, n.arg);
      if ("throw" === i.type) return n.method = "throw",
      n.arg = i.arg,
      n.delegate = null,
      m;
      var a = i.arg;
      return a ? a.done ? (n[e.resultName] = a.value, n.next = e.nextLoc, "return" !== n.method && (n.method = "next", n.arg = t), n.delegate = null, m) : a: (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, m)
    }
    function B(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]),
      2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]),
      this.tryEntries.push(e)
    }
    function P(t) {
      var e = t.completion || {};
      e.type = "normal",
      delete e.arg,
      t.completion = e
    }
    function M(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }],
      t.forEach(B, this),
      this.reset(!0)
    }
    function I(e) {
      if (e || "" === e) {
        var r = e[u];
        if (r) return r.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var i = -1,
          a = function n() {
            for (; ++i < e.length;) if (o.call(e, i)) return n.value = e[i],
            n.done = !1,
            n;
            return n.value = t,
            n.done = !0,
            n
          };
          return a.next = a
        }
      }
      throw new TypeError(n(e) + " is not iterable")
    }
    return w.prototype = x,
    i(j, "constructor", {
      value: x,
      configurable: !0
    }),
    i(x, "constructor", {
      value: w,
      configurable: !0
    }),
    w.displayName = s(x, l, "GeneratorFunction"),
    e.isGeneratorFunction = function(t) {
      var e = "function" == typeof t && t.constructor;
      return !! e && (e === w || "GeneratorFunction" === (e.displayName || e.name))
    },
    e.mark = function(t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, x) : (t.__proto__ = x, s(t, l, "GeneratorFunction")),
      t.prototype = Object.create(j),
      t
    },
    e.awrap = function(t) {
      return {
        __await: t
      }
    },
    O(E.prototype),
    s(E.prototype, c, (function() {
      return this
    })),
    e.AsyncIterator = E,
    e.async = function(t, n, r, o, i) {
      void 0 === i && (i = Promise);
      var a = new E(f(t, n, r, o), i);
      return e.isGeneratorFunction(n) ? a: a.next().then((function(t) {
        return t.done ? t.value: a.next()
      }))
    },
    O(j),
    s(j, l, "Generator"),
    s(j, u, (function() {
      return this
    })),
    s(j, "toString", (function() {
      return "[object Generator]"
    })),
    e.keys = function(t) {
      var e = Object(t),
      n = [];
      for (var r in e) n.push(r);
      return n.reverse(),
      function t() {
        for (; n.length;) {
          var r = n.pop();
          if (r in e) return t.value = r,
          t.done = !1,
          t
        }
        return t.done = !0,
        t
      }
    },
    e.values = I,
    M.prototype = {
      constructor: M,
      reset: function(e) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(P), !e) for (var n in this)"t" === n.charAt(0) && o.call(this, n) && !isNaN( + n.slice(1)) && (this[n] = t)
      },
      stop: function() {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval
      },
      dispatchException: function(e) {
        if (this.done) throw e;
        var n = this;
        function r(r, o) {
          return u.type = "throw",
          u.arg = e,
          n.next = r,
          o && (n.method = "next", n.arg = t),
          !!o
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var a = this.tryEntries[i],
          u = a.completion;
          if ("root" === a.tryLoc) return r("end");
          if (a.tryLoc <= this.prev) {
            var c = o.call(a, "catchLoc"),
            l = o.call(a, "finallyLoc");
            if (c && l) {
              if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
              if (this.prev < a.finallyLoc) return r(a.finallyLoc)
            } else if (c) {
              if (this.prev < a.catchLoc) return r(a.catchLoc, !0)
            } else {
              if (!l) throw Error("try statement without catch or finally");
              if (this.prev < a.finallyLoc) return r(a.finallyLoc)
            }
          }
        }
      },
      abrupt: function(t, e) {
        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
          var r = this.tryEntries[n];
          if (r.tryLoc <= this.prev && o.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
            var i = r;
            break
          }
        }
        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
        var a = i ? i.completion: {};
        return a.type = t,
        a.arg = e,
        i ? (this.method = "next", this.next = i.finallyLoc, m) : this.complete(a)
      },
      complete: function(t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg: "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e),
        m
      },
      finish: function(t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];
          if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc),
          P(n),
          m
        }
      },
      catch: function(t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];
          if (n.tryLoc === t) {
            var r = n.completion;
            if ("throw" === r.type) {
              var o = r.arg;
              P(n)
            }
            return o
          }
        }
        throw Error("illegal catch attempt")
      },
      delegateYield: function(e, n, r) {
        return this.delegate = {
          iterator: I(e),
          resultName: n,
          nextLoc: r
        },
        "next" === this.method && (this.arg = t),
        m
      }
    },
    e
  }
  function d(t, e, n, r, o, i, a) {
    try {
      var u = t[i](a),
      c = u.value
    } catch(t) {
      return void n(t)
    }
    u.done ? e(c) : Promise.resolve(c).then(r, o)
  }
  function y(t) {
    return function() {
      var e = this,
      n = arguments;
      return new Promise((function(r, o) {
        var i = t.apply(e, n);
        function a(t) {
          d(i, r, o, a, u, "next", t)
        }
        function u(t) {
          d(i, r, o, a, u, "throw", t)
        }
        a(void 0)
      }))
    }
  }
  function v(t, e) {
    if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
  }
  function b(t, e) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n];
      r.enumerable = r.enumerable || !1,
      r.configurable = !0,
      "value" in r && (r.writable = !0),
      Object.defineProperty(t, g(r.key), r)
    }
  }
  function m(t, e, n) {
    return e && b(t.prototype, e),
    n && b(t, n),
    Object.defineProperty(t, "prototype", {
      writable: !1
    }),
    t
  }
  function g(t) {
    var e = function(t, e) {
      if ("object" != n(t) || !t) return t;
      var r = t[Symbol.toPrimitive];
      if (void 0 !== r) {
        var o = r.call(t, "string");
        if ("object" != n(o)) return o;
        throw new TypeError("@@toPrimitive must return a primitive value.")
      }
      return String(t)
    } (t);
    return "symbol" == n(e) ? e: e + ""
  }
  function w(t, e, r) {
    return e = j(e),
    function(t, e) {
      if (e && ("object" === n(e) || "function" == typeof e)) return e;
      if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
      return function(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
      } (t)
    } (t, k() ? Reflect.construct(e, r || [], j(t).constructor) : e.apply(t, r))
  }
  function x(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }),
    Object.defineProperty(t, "prototype", {
      writable: !1
    }),
    e && S(t, e)
  }
  function _(t) {
    var e = "function" == typeof Map ? new Map: void 0;
    return _ = function(t) {
      if (null === t || !
      function(t) {
        try {
          return - 1 !== Function.toString.call(t).indexOf("[native code]")
        } catch(e) {
          return "function" == typeof t
        }
      } (t)) return t;
      if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
      if (void 0 !== e) {
        if (e.has(t)) return e.get(t);
        e.set(t, n)
      }
      function n() {
        return function(t, e, n) {
          if (k()) return Reflect.construct.apply(null, arguments);
          var r = [null];
          r.push.apply(r, e);
          var o = new(t.bind.apply(t, r));
          return n && S(o, n.prototype),
          o
        } (t, arguments, j(this).constructor)
      }
      return n.prototype = Object.create(t.prototype, {
        constructor: {
          value: n,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }),
      S(n, t)
    },
    _(t)
  }
  function k() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
    } catch(t) {}
    return (k = function() {
      return !! t
    })()
  }
  function S(t, e) {
    return S = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
      return t.__proto__ = e,
      t
    },
    S(t, e)
  }
  function j(t) {
    return j = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
      return t.__proto__ || Object.getPrototypeOf(t)
    },
    j(t)
  } (t = document.createElement("script")).src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js",
  document.head.appendChild(t);
  var O = document.createElement("template");
  O.innerHTML = '<style>\n    #upload-container {\n        background-color: #ffffff;\n        border: 1px solid #e0e0e0;\n        padding: 20px;\n        border-radius: 12px;\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        width: 300px;\n        text-align: center;\n      }\n  \n      #file-input,\n      #upload,\n      #type-select {\n        margin: 10px 0;\n        padding: 10px;\n        width: 100%;\n        box-sizing: border-box;\n        border: 1px solid #ccc;\n        border-radius: 6px;\n        font-size: 14px;\n        outline: none;\n      }\n  \n      #file-input {\n        background: #fff;\n      }\n  \n      #file-input::file-selector-button {\n        margin-right: 10px;\n        border: none;\n        background: #0e0a77;\n        padding: 10px;\n        border-radius: 6px;\n        color: #fff;\n        cursor: pointer;\n        transition: background 0.2s ease-in-out;\n      }\n  \n      #file-input::file-selector-button:hover {\n        background: #0d45a5;\n      }\n  \n      #type-select {\n        background-color: #fff;\n        display: none;\n      }\n  \n      #uploading {\n        display: none;\n        justify-content: center;\n      }\n  \n      #uploading span {\n        font-size: 14px;\n        color: #555;\n      }\n    </style>\n    <div id="upload-container">\n        <input type="file" id="file-input" accept=".csv, .xlsx, .xls" />\n        <select id="type-select"></select>\n        <div id="uploading">\n        <span>Uploading...</span>\n        </div>\n  </div>';
  var E = function(t) {
    function n() {
      var t;
      return v(this, n),
      (t = w(this, n))._shadowRoot = t.attachShadow({
        mode: "open"
      }),
      t._shadowRoot.appendChild(O.content.cloneNode(!0)),
      t._props = {},
      t._fileInput = t._shadowRoot.querySelector("#file-input"),
      t._uploadingDiv = t._shadowRoot.querySelector("#uploading"),
      t._typeSelect = t._shadowRoot.querySelector("#type-select"),
      t._fileInput.addEventListener("click", (function() {
        return t.clearFileInput()
      })),
      t._fileInput.addEventListener("change", (function() {
        return t.handleFileSelect()
      })),
      t._typeSelect.addEventListener("change", (function() {
        return t.handleUpload()
      })),
      t._hierarchyStructure = {},
      t._rawsData = null,
      t._filterByValue = {},
      t._filterByContains = {},
      t
    }
    return x(n, t),
    m(n, [{
      key: "handleFileSelect",
      value: (_ = y(h().mark((function t() {
        var e, n, r;
        return h().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
          case 0:
            return e = this._fileInput.files[0],
            t.next = 3,
            this.readFileAsync(e);
          case 3:
            n = t.sent,
            r = XLSX.read(n, {
              type: "array"
            }),
            this.populateSheetNames(r),
            this.handleUpload();
          case 7:
          case "end":
            return t.stop()
          }
        }), t, this)
      }))),
      function() {
        return _.apply(this, arguments)
      })
    },
    {
      key: "handleUpload",
      value: (g = y(h().mark((function t() {
        var e, n, r, o, i, a, u, c;
        return h().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
          case 0:
            return n = this._fileInput.files[0],
            t.next = 3,
            this.readFileAsync(n);
          case 3:
            if (r = t.sent, o = XLSX.read(r, {
              type: "array"
            }), i = null !== (e = parseInt(this._typeSelect.value)) && void 0 !== e ? e: 0, !(isNaN(i) || i < 0 || i >= o.SheetNames.length)) {
              t.next = 9;
              break
            }
            return alert("Invalid sheet selection"),
            t.abrupt("return");
          case 9:
            a = o.SheetNames[i],
            u = o.Sheets[a],
            c = this.processSheet(u),
            this._rawsData = c;
          case 13:
          case "end":
            return t.stop()
          }
        }), t, this)
      }))),
      function() {
        return g.apply(this, arguments)
      })
    },
    {
      key: "readFileAsync",
      value: (b = y(h().mark((function t(e) {
        return h().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
          case 0:
            return t.abrupt("return", new Promise((function(t, n) {
              var r = new FileReader;
              r.onload = function(e) {
                return t(new Uint8Array(e.target.result))
              },
              r.onerror = function(t) {
                return n(t.error)
              },
              r.readAsArrayBuffer(e)
            })));
          case 1:
          case "end":
            return t.stop()
          }
        }), t)
      }))),
      function(t) {
        return b.apply(this, arguments)
      })
    },
    {
      key: "populateSheetNames",
      value: function(t) {
        if (t.SheetNames.length > 0) {
          this._typeSelect.style.display = "block";
          for (var e = 0; e < t.SheetNames.length; e++) {
            var n = document.createElement("option");
            n.value = e,
            n.textContent = t.SheetNames[e],
            this._typeSelect.appendChild(n)
          }
        }
      }
    },
    {
      key: "clearFileInput",
      value: (d = y(h().mark((function t() {
        return h().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
          case 0:
            try {
              this._fileInput.value = null
            } catch(t) {}
            this._fileInput.value && this._fileInput.parentNode.replaceChild(this._fileInput.cloneNode(!0), this._fileInput),
            this._typeSelect.innerHTML = "",
            this._typeSelect.style.display = "none";
          case 4:
          case "end":
            return t.stop()
          }
        }), t, this)
      }))),
      function() {
        return d.apply(this, arguments)
      })
    },
    {
      key: "processSheet",
      value: function(t) {
        var e = XLSX.utils.sheet_to_json(t, {
          header: 1
        }),
        n = e[0],
        r = e.slice(1);
        return "".concat(n.join(","), "\n").concat(r.map((function(t) {
          return t.join(",")
        })).join("\n"))
      }
    },
    {
      key: "connectedCallback",
      value: (p = y(h().mark((function t() {
        return h().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
          case 0:
            this.displayNormalState();
          case 1:
          case "end":
            return t.stop()
          }
        }), t, this)
      }))),
      function() {
        return p.apply(this, arguments)
      })
    },
    {
      key: "displayNormalState",
      value: function() {
        this._fileInput.files[0] && (this._fileInput.style.display = "block"),
        this._uploadingDiv.style.display = "none"
      }
    },
    {
      key: "setHierarchyStructure",
      value: function(t) {
        this._hierarchyStructure = t
      }
    },
    {
      key: "setFilterByValue",
      value: function(t) {
        this._filterByValue = t
      }
    },
    {
      key: "setFilterByContains",
      value: function(t) {
        this._filterByContains = t
      }
    },
    {
      key: "getDataAsJson",
        debugger;
      value: (f = y(h().mark((function t() {
        var n, r, o, i, a, u, c, l;
        return h().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
          case 0:
            if (n = this._rawsData, e(this._filterByValue)) {
              t.next = 5;
              break
            }
            return t.next = 4,
            this.filterByValue(n, this._filterByValue);
          case 4:
            n = t.sent;
          case 5:
            if (e(this._filterByContains)) {
              t.next = 9;
              break
            }
            return t.next = 8,
            this.filterByContains(n, this._filterByContains);
          case 8:
            n = t.sent;
          case 9:
            if (e(this._hierarchyStructure)) {
              t.next = 13;
              break
            }
            return t.next = 12,
            this.transformDataForHierarchy(n);
          case 12:
            n = t.sent;
          case 13:
            for (r = n.split("\n"), o = r[0].split(","), i = [], a = 1; a < r.length; a++) {
              for (u = {},
              c = r[a].split(","), l = 0; l < o.length; l++) u[o[l]] = c[l] || "";
              i.push(u)
            }
            return this._filterByValue = {},
            this._filterByContains = {},
            n = "",
            t.abrupt("return", i);
          case 22:
          case "end":
            return t.stop()
          }
        }), t, this)
      }))),
      function() {
        return f.apply(this, arguments)
      })
    },
    {
      key: "getDataAsRaw",
      value: (s = y(h().mark((function t() {
        var n, r;
        return h().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
          case 0:
            if (n = this._rawsData, e(this._filterByValue)) {
              t.next = 5;
              break
            }
            return t.next = 4,
            this.filterByValue(n, this._filterByValue);
          case 4:
            n = t.sent;
          case 5:
            if (e(this._filterByContains)) {
              t.next = 9;
              break
            }
            return t.next = 8,
            this.filterByContains(n, this._filterByContains);
          case 8:
            n = t.sent;
          case 9:
            if (e(this._hierarchyStructure)) {
              t.next = 13;
              break
            }
            return t.next = 12,
            this.transformDataForHierarchy(n);
          case 12:
            n = t.sent;
          case 13:
            return this._filterByValue = {},
            this._filterByContains = {},
            r = n,
            n = "",
            t.abrupt("return", r);
          case 18:
          case "end":
            return t.stop()
          }
        }), t, this)
      }))),
      function() {
        return s.apply(this, arguments)
      })
    },
    {
      key: "transformDataForHierarchy",
      value: (l = y(h().mark((function t() {
        var e, n, r, o, i = this;
        return h().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
          case 0:
            return e = this._rawsData.split("\n"),
            n = e[0].split(","),
            r = e.slice(1),
            o = r.map((function(t) {
              return t.split(",").map((function(t, e) {
                var r = n[e];
                if (i._hierarchyStructure[r]) {
                  var o = c(i._hierarchyStructure[r].split("."), 2),
                  a = o[0],
                  u = o[1];
                  return "[".concat(a, "].[").concat(u, "].&[").concat(t, "]")
                }
                return t
              })).join(",")
            })),
            t.abrupt("return", [e[0]].concat(a(o)).join("\n"));
          case 5:
          case "end":
            return t.stop()
          }
        }), t, this)
      }))),
      function() {
        return l.apply(this, arguments)
      })
    },
    {
      key: "getTotalRecordsCount",
      value: function() {
        return this._rawsData.split("\n").length - 1
      }
    },
    {
      key: "getHeaders",
      value: function() {
        return this._rawsData.split("\n")[0].split(",")
      }
    },
    {
      key: "filterByValue",
      value: (u = y(h().mark((function t(e, n) {
        var r, o, u, l, s, f, p;
        return h().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
          case 0:
            return t.prev = 0,
            r = e.split("\n"),
            o = i(r),
            u = o[0],
            l = o.slice(1),
            s = u.split(","),
            f = l.filter((function(t) {
              var e = t.split(",");
              return Object.entries(n).every((function(t) {
                var n = c(t, 2),
                r = n[0],
                o = n[1],
                i = s.indexOf(r);
                return - 1 !== i && e[i].toLowerCase() === String(o).toLowerCase()
              }))
            })),
            p = [u].concat(a(f)).join("\n"),
            t.abrupt("return", p);
          case 9:
            return t.prev = 9,
            t.t0 = t.
            catch(0),
            console.error("Error in filterByValue:", t.t0),
            t.abrupt("return", e);
          case 13:
          case "end":
            return t.stop()
          }
        }), t, null, [[0, 9]])
      }))),
      function(t, e) {
        return u.apply(this, arguments)
      })
    },
    {
      key: "filterByContains",
      value: (r = y(h().mark((function t(e, n) {
        var r, o, u, l, s, f, p;
        return h().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
          case 0:
            return t.prev = 0,
            r = e.split("\n"),
            o = i(r),
            u = o[0],
            l = o.slice(1),
            s = u.split(","),
            f = l.filter((function(t) {
              var e = t.split(",");
              return Object.entries(n).every((function(t) {
                var n = c(t, 2),
                r = n[0],
                o = n[1],
                i = s.indexOf(r);
                return - 1 !== i && e[i].toLowerCase().includes(String(o).toLowerCase())
              }))
            })),
            p = [u].concat(a(f)).join("\n"),
            t.abrupt("return", p);
          case 9:
            return t.prev = 9,
            t.t0 = t.
            catch(0),
            console.error("Error in filterByContains:", t.t0),
            t.abrupt("return", e);
          case 13:
          case "end":
            return t.stop()
          }
        }), t, null, [[0, 9]])
      }))),
      function(t, e) {
        return r.apply(this, arguments)
      })
    },
    {
      key: "onCustomWidgetBeforeUpdate",
      value: function(t) {
        this._props = o(o({},
        this._props), t)
      }
    },
    {
      key: "onCustomWidgetAfterUpdate",
      value: function(t) {}
    }]);
    var r, u, l, s, f, p, d, b, g, _
  } (_(HTMLElement));
  customElements.define("file-upload-xls", E);
  var L = function(t) {
    function e() {
      var t;
      v(this, e),
      t = w(this, e);
      var n = document.createElement("template");
      return n.innerHTML = '\n        <style>\n    body {\n        font-family: Arial, sans-serif;\n    }\n\ni {\n\tfont-size:10px;\n}\n\n.container {\n\tpadding-left:15px;\n}\n.builder-table {\nwidth:100%;\n\n}\n\n.builder-table tbody tr td {\n\tline-height:30px;\n    padding-left:10px;\n}\n</style>\n</head>\n<body>\n<div class="container">\n<table class="builder-table">\n\t<tbody>\n    <tr>\n    \t<td>Version</td>\n        <td>1.0</td>\n    </tr>\n    <tr>\n     \t<td>Developed by </td>\n        <td><a target="_blank" href="https://linkedin.com/in/itsrohitchouhan">Rohit Chouhan</a>\n        </td>\n    </tr>\n     <tr>\n     \t<td colspan="2">© <a target="_blank" href="https://rohitchouhan.com">rohitchouhan.com</a></td>\n    </tr>\n    <tr>\n     \t<td colspan="2">\n          \x3c!-- Social Media Icons by NiftyButtons https://niftybuttons.com --\x3e<div style="display: flex; flex-wrap:wrap; align-items: left; justify-content: left;"><a href="https://linkedin.com/in/rohit-chouhan" target="_blank" rel="noopener noreferrer" style="text-decoration:none;border:0;width:20px;height:20px;padding:2px;margin:5px;color:#ffffff;border-radius:35%;background-color:#0d2744;"><svg class="niftybutton-linkedin" style="display:block;fill:currentColor" data-donate="true" data-tag="lin" data-name="LinkedIn" viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet"><title>LinkedIn social icon</title>\n    <path d="M186.4 142.4c0 19-15.3 34.5-34.2 34.5 -18.9 0-34.2-15.4-34.2-34.5 0-19 15.3-34.5 34.2-34.5C171.1 107.9 186.4 123.4 186.4 142.4zM181.4 201.3h-57.8V388.1h57.8V201.3zM273.8 201.3h-55.4V388.1h55.4c0 0 0-69.3 0-98 0-26.3 12.1-41.9 35.2-41.9 21.3 0 31.5 15 31.5 41.9 0 26.9 0 98 0 98h57.5c0 0 0-68.2 0-118.3 0-50-28.3-74.2-68-74.2 -39.6 0-56.3 30.9-56.3 30.9v-25.2H273.8z"></path>\n</svg></a><a href="https://youtube.com/@chouhanacademy" target="_blank" rel="noopener noreferrer" style="text-decoration:none;border:0;width:20px;height:20px;padding:2px;margin:5px;color:#ffffff;border-radius:35%;background-color:#0d2744;"><svg class="niftybutton-youtube" style="display:block;fill:currentColor" data-donate="true" data-tag="you" data-name="YouTube" viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet"><title>YouTube social icon</title>\n    <path d="M422.6 193.6c-5.3-45.3-23.3-51.6-59-54 -50.8-3.5-164.3-3.5-215.1 0 -35.7 2.4-53.7 8.7-59 54 -4 33.6-4 91.1 0 124.8 5.3 45.3 23.3 51.6 59 54 50.9 3.5 164.3 3.5 215.1 0 35.7-2.4 53.7-8.7 59-54C426.6 284.8 426.6 227.3 422.6 193.6zM222.2 303.4v-94.6l90.7 47.3L222.2 303.4z"></path>\n</svg></a><a href="mailto:mailto:itsrohitofficial@gmail.com" target="_blank" rel="noopener noreferrer" style="text-decoration:none;border:0;width:20px;height:20px;padding:2px;margin:5px;color:#ffffff;border-radius:35%;background-color:#0d2744;"><svg class="niftybutton-email" style="display:block;fill:currentColor" data-donate="true" data-tag="ema" data-name="Email" viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet"><title>Email icon</title>\n    <path d="M101.3 141.6v228.9h0.3 308.4 0.8V141.6H101.3zM375.7 167.8l-119.7 91.5 -119.6-91.5H375.7zM127.6 194.1l64.1 49.1 -64.1 64.1V194.1zM127.8 344.2l84.9-84.9 43.2 33.1 43-32.9 84.7 84.7L127.8 344.2 127.8 344.2zM384.4 307.8l-64.4-64.4 64.4-49.3V307.8z"></path>\n</svg></a><a href="https://github.com/rohit-chouhan" target="_blank" rel="noopener noreferrer" style="text-decoration:none;border:0;width:20px;height:20px;padding:2px;margin:5px;color:#ffffff;border-radius:35%;background-color:#0d2744;"><svg class="niftybutton-github" style="display:block;fill:currentColor" data-donate="true" data-tag="git" data-name="Github" viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet"><title>Github social icon</title>\n    <path d="M256 70.7c-102.6 0-185.9 83.2-185.9 185.9 0 82.1 53.3 151.8 127.1 176.4 9.3 1.7 12.3-4 12.3-8.9V389.4c-51.7 11.3-62.5-21.9-62.5-21.9 -8.4-21.5-20.6-27.2-20.6-27.2 -16.9-11.5 1.3-11.3 1.3-11.3 18.7 1.3 28.5 19.2 28.5 19.2 16.6 28.4 43.5 20.2 54.1 15.4 1.7-12 6.5-20.2 11.8-24.9 -41.3-4.7-84.7-20.6-84.7-91.9 0-20.3 7.3-36.9 19.2-49.9 -1.9-4.7-8.3-23.6 1.8-49.2 0 0 15.6-5 51.1 19.1 14.8-4.1 30.7-6.2 46.5-6.3 15.8 0.1 31.7 2.1 46.6 6.3 35.5-24 51.1-19.1 51.1-19.1 10.1 25.6 3.8 44.5 1.8 49.2 11.9 13 19.1 29.6 19.1 49.9 0 71.4-43.5 87.1-84.9 91.7 6.7 5.8 12.8 17.1 12.8 34.4 0 24.9 0 44.9 0 51 0 4.9 3 10.7 12.4 8.9 73.8-24.6 127-94.3 127-176.4C441.9 153.9 358.6 70.7 256 70.7z"></path>\n</svg></a></div>\n        </td>\n    </tr>\n    </tbody>\n</table>\n<p><i>Feel free to reach out to me regarding any inquiries.</i></p>\n<p><i>Explore my top SAC-P related blogs <a target="_blank" href="https://community.sap.com/t5/user/viewprofilepage/user-id/782213">here</a>.</i></p>\n</div>\n</body>',
      t._shadowRoot = t.attachShadow({
        mode: "open"
      }),
      t._shadowRoot.appendChild(n.content.cloneNode(!0)),
      t
    }
    return x(e, t),
    m(e)
  } (_(HTMLElement));
  customElements.define("file-upload-xls-builder", L)
})();
