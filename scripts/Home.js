(self.webpackChunk = self.webpackChunk || []).push([
  ["175"],
  {
    5897: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        cleanupElement: function () {
          return E;
        },
        createInstance: function () {
          return I;
        },
        destroy: function () {
          return y;
        },
        init: function () {
          return T;
        },
        ready: function () {
          return b;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let o = a(7933),
        d = (e, t) => e.Webflow.require("lottie")?.lottie.loadAnimation(t),
        c = (e) => !!(e.Webflow.env("design") || e.Webflow.env("preview")),
        r = { Playing: "playing", Stopped: "stopped" },
        l = new (class {
          _cache = [];
          set(e, t) {
            let a = this._cache.findIndex(({ wrapper: t }) => t === e);
            (-1 !== a && this._cache.splice(a, 1),
              this._cache.push({ wrapper: e, instance: t }));
          }
          delete(e) {
            let t = this._cache.findIndex(({ wrapper: t }) => t === e);
            -1 !== t && this._cache.splice(t, 1);
          }
          get(e) {
            let t = this._cache.findIndex(({ wrapper: t }) => t === e);
            return -1 === t ? null : (this._cache[t]?.instance ?? null);
          }
        })(),
        s = {},
        u = (e) => {
          if ("string" != typeof e) return NaN;
          let t = parseFloat(e);
          return Number.isNaN(t) ? NaN : t;
        };
      class f {
        config = null;
        currentState = r.Stopped;
        animationItem = null;
        _gsapFrame = null;
        handlers = {
          enterFrame: [],
          complete: [],
          loop: [],
          dataReady: [],
          destroy: [],
          error: [],
        };
        load(e) {
          let t = (e.dataset || s).src || "";
          (t.endsWith(".lottie")
            ? (0, o.fetchLottie)(t).then((t) => {
              this._loadAnimation(e, t);
            })
            : this._loadAnimation(e, void 0),
            l.set(e, this),
            (this.container = e));
        }
        _loadAnimation(e, t) {
          let a = e.dataset || s,
            n = a.src || "",
            i = a.preserveAspectRatio || "xMidYMid meet",
            o = a.renderer || "svg",
            l = 1 === u(a.loop),
            f = -1 === u(a.direction) ? -1 : 1,
            g = !!a.wfTarget,
            p = !g && 1 === u(a.autoplay),
            I = u(a.duration),
            E = Number.isNaN(I) ? 0 : I,
            T = g || 1 === u(a.isIx2Target),
            y = u(a.ix2InitialState),
            b = Number.isNaN(y) ? null : y,
            m = {
              src: n,
              loop: l,
              autoplay: p,
              renderer: o,
              direction: f,
              duration: E,
              hasIx2: T,
              ix2InitialValue: b,
              preserveAspectRatio: i,
            };
          if (
            this.animationItem &&
            this.config &&
            this.config.src === n &&
            o === this.config.renderer &&
            i === this.config.preserveAspectRatio
          ) {
            if (
              (l !== this.config.loop && this.setLooping(l),
                !T &&
                (f !== this.config.direction && this.setDirection(f),
                  E !== this.config.duration))
            ) {
              let e = this.duration;
              E > 0 && E !== e ? this.setSpeed(e / E) : this.setSpeed(1);
            }
            (p && this.play(),
              null != b &&
              b !== this.config.ix2InitialValue &&
              this.goToFrame(this.frames * (b / 100)),
              (this.config = m));
            return;
          }
          let _ = e.ownerDocument.defaultView;
          try {
            (this.animationItem && this.destroy(),
              (this.animationItem = d(_, {
                container: e,
                loop: l,
                autoplay: p,
                renderer: o,
                rendererSettings: {
                  preserveAspectRatio: i,
                  progressiveLoad: !0,
                  hideOnTransparent: !0,
                },
                ...(t ? { animationData: t } : { path: n }),
              })));
          } catch (e) {
            this.handlers.error.forEach((e) => e());
            return;
          }
          this.animationItem &&
            (c(_) &&
              (this.animationItem.addEventListener("enterFrame", () => {
                if (!this.animationItem || !this.isPlaying) return;
                let {
                  currentFrame: e,
                  totalFrames: t,
                  playDirection: a,
                } = this.animationItem,
                  n = (e / t) * 100,
                  i = Math.round(1 === a ? n : 100 - n);
                this.handlers.enterFrame.forEach((t) => t(i, e));
              }),
                this.animationItem.addEventListener("complete", () => {
                  if (this.animationItem) {
                    if (
                      this.currentState !== r.Playing ||
                      !this.animationItem.loop
                    )
                      return void this.handlers.complete.forEach((e) => e());
                    this.currentState = r.Stopped;
                  }
                }),
                this.animationItem.addEventListener("loopComplete", (e) => {
                  this.handlers.loop.forEach((t) => t(e));
                }),
                this.animationItem.addEventListener("data_failed", () => {
                  this.handlers.error.forEach((e) => e());
                }),
                this.animationItem.addEventListener("error", () => {
                  this.handlers.error.forEach((e) => e());
                })),
              this.isLoaded
                ? (this.handlers.dataReady.forEach((e) => e()), p && this.play())
                : this.animationItem.addEventListener("data_ready", () => {
                  if ((this.handlers.dataReady.forEach((e) => e()), !T)) {
                    this.setDirection(f);
                    let e = this.duration;
                    (E > 0 && E !== e && this.setSpeed(e / E),
                      p && this.play());
                  }
                  null != b && this.goToFrame(this.frames * (b / 100));
                }),
              (this.config = m));
        }
        onFrameChange(e) {
          -1 === this.handlers.enterFrame.indexOf(e) &&
            this.handlers.enterFrame.push(e);
        }
        onPlaybackComplete(e) {
          -1 === this.handlers.complete.indexOf(e) &&
            this.handlers.complete.push(e);
        }
        onLoopComplete(e) {
          -1 === this.handlers.loop.indexOf(e) && this.handlers.loop.push(e);
        }
        onDestroy(e) {
          -1 === this.handlers.destroy.indexOf(e) &&
            this.handlers.destroy.push(e);
        }
        onDataReady(e) {
          -1 === this.handlers.dataReady.indexOf(e) &&
            this.handlers.dataReady.push(e);
        }
        onError(e) {
          -1 === this.handlers.error.indexOf(e) && this.handlers.error.push(e);
        }
        play() {
          if (!this.animationItem) return;
          let e = 1 === this.animationItem.playDirection ? 0 : this.frames;
          (this.animationItem.goToAndPlay(e, !0),
            (this.currentState = r.Playing));
        }
        stop() {
          if (this.animationItem) {
            if (this.isPlaying) {
              let { playDirection: e } = this.animationItem,
                t = 1 === e ? 0 : this.frames;
              this.animationItem.goToAndStop(t, !0);
            }
            this.currentState = r.Stopped;
          }
        }
        destroy() {
          this.animationItem &&
            (this.isPlaying && this.stop(),
              this.handlers.destroy.forEach((e) => e()),
              this.container && l.delete(this.container),
              this.animationItem.destroy(),
              Object.values(this.handlers).forEach((e) => {
                e.length = 0;
              }),
              (this.animationItem = null),
              (this.container = null),
              (this.config = null));
        }
        get gsapFrame() {
          return this._gsapFrame;
        }
        set gsapFrame(e) {
          ((this._gsapFrame = e), null != e && this.goToFrameAndStop(e));
        }
        get isPlaying() {
          return !!this.animationItem && !this.animationItem.isPaused;
        }
        get isPaused() {
          return !!this.animationItem && this.animationItem.isPaused;
        }
        get duration() {
          return this.animationItem ? this.animationItem.getDuration() : 0;
        }
        get frames() {
          return this.animationItem ? this.animationItem.totalFrames : 0;
        }
        get direction() {
          return this.animationItem
            ? 1 === this.animationItem.playDirection
              ? 1
              : -1
            : 1;
        }
        get isLoaded() {
          return !!this.animationItem && this.animationItem.isLoaded;
        }
        get ix2InitialValue() {
          return this.config ? this.config.ix2InitialValue : null;
        }
        goToFrame(e) {
          this.animationItem && this.animationItem.setCurrentRawFrameValue(e);
        }
        goToFrameAndStop(e) {
          this.animationItem && this.animationItem.goToAndStop(e, !0);
        }
        setSubframe(e) {
          this.animationItem && this.animationItem.setSubframe(e);
        }
        setSpeed(e = 1) {
          this.animationItem &&
            (this.isPlaying && this.stop(), this.animationItem.setSpeed(e));
        }
        setLooping(e) {
          this.animationItem &&
            (this.isPlaying && this.stop(), (this.animationItem.loop = e));
        }
        setDirection(e) {
          this.animationItem &&
            (this.isPlaying && this.stop(),
              this.animationItem.setDirection(e),
              this.goToFrame(1 === e ? 0 : this.frames));
        }
      }
      let g = () =>
        Array.from(
          document.querySelectorAll('[data-animation-type="lottie"]'),
        ),
        p = (e) => {
          let t = e.dataset,
            a = !!t.wfTarget,
            n = 1 === u(t.isIx2Target);
          return a || n;
        },
        I = (e) => {
          let t = l.get(e);
          return (null == t && (t = new f()), t.load(e), t);
        },
        E = (e) => {
          let t = l.get(e);
          t && t.destroy();
        },
        T = () => {
          g().forEach((e) => {
            (p(e) || E(e), I(e));
          });
        },
        y = () => {
          g().forEach(E);
        },
        b = T;
    },
    2444: function (e, t, a) {
      "use strict";
      var n = a(3949),
        i = a(5897),
        o = a(8724);
      n.define(
        "lottie",
        (e.exports = function () {
          return {
            lottie: o,
            createInstance: i.createInstance,
            cleanupElement: i.cleanupElement,
            init: i.init,
            destroy: i.destroy,
            ready: i.ready,
          };
        }),
      );
    },
    5487: function () {
      "use strict";
      window.tram = (function (e) {
        function t(e, t) {
          return new w.Bare().init(e, t);
        }
        function a(e) {
          var t = parseInt(e.slice(1), 16);
          return [(t >> 16) & 255, (t >> 8) & 255, 255 & t];
        }
        function n(e, t, a) {
          return (
            "#" + (0x1000000 | (e << 16) | (t << 8) | a).toString(16).slice(1)
          );
        }
        function i() { }
        function o(e, t, a) {
          if ((void 0 !== t && (a = t), void 0 === e)) return a;
          var n = a;
          return (
            Z.test(e) || !$.test(e)
              ? (n = parseInt(e, 10))
              : $.test(e) && (n = 1e3 * parseFloat(e)),
            0 > n && (n = 0),
            n == n ? n : a
          );
        }
        function d(e) {
          B.debug && window && window.console.warn(e);
        }
        var c,
          r,
          l,
          s = (function (e, t, a) {
            function n(e) {
              return "object" == typeof e;
            }
            function i(e) {
              return "function" == typeof e;
            }
            function o() { }
            return function d(c, r) {
              function l() {
                var e = new s();
                return (i(e.init) && e.init.apply(e, arguments), e);
              }
              function s() { }
              (r === a && ((r = c), (c = Object)), (l.Bare = s));
              var u,
                f = (o[e] = c[e]),
                g = (s[e] = l[e] = new o());
              return (
                (g.constructor = l),
                (l.mixin = function (t) {
                  return ((s[e] = l[e] = d(l, t)[e]), l);
                }),
                (l.open = function (e) {
                  if (
                    ((u = {}),
                      i(e) ? (u = e.call(l, g, f, l, c)) : n(e) && (u = e),
                      n(u))
                  )
                    for (var a in u) t.call(u, a) && (g[a] = u[a]);
                  return (i(g.init) || (g.init = c), l);
                }),
                l.open(r)
              );
            };
          })("prototype", {}.hasOwnProperty),
          u = {
            ease: [
              "ease",
              function (e, t, a, n) {
                var i = (e /= n) * e,
                  o = i * e;
                return (
                  t +
                  a *
                  (-2.75 * o * i + 11 * i * i + -15.5 * o + 8 * i + 0.25 * e)
                );
              },
            ],
            "ease-in": [
              "ease-in",
              function (e, t, a, n) {
                var i = (e /= n) * e,
                  o = i * e;
                return t + a * (-1 * o * i + 3 * i * i + -3 * o + 2 * i);
              },
            ],
            "ease-out": [
              "ease-out",
              function (e, t, a, n) {
                var i = (e /= n) * e,
                  o = i * e;
                return (
                  t +
                  a *
                  (0.3 * o * i + -1.6 * i * i + 2.2 * o + -1.8 * i + 1.9 * e)
                );
              },
            ],
            "ease-in-out": [
              "ease-in-out",
              function (e, t, a, n) {
                var i = (e /= n) * e,
                  o = i * e;
                return t + a * (2 * o * i + -5 * i * i + 2 * o + 2 * i);
              },
            ],
            linear: [
              "linear",
              function (e, t, a, n) {
                return (a * e) / n + t;
              },
            ],
            "ease-in-quad": [
              "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
              function (e, t, a, n) {
                return a * (e /= n) * e + t;
              },
            ],
            "ease-out-quad": [
              "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
              function (e, t, a, n) {
                return -a * (e /= n) * (e - 2) + t;
              },
            ],
            "ease-in-out-quad": [
              "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
              function (e, t, a, n) {
                return (e /= n / 2) < 1
                  ? (a / 2) * e * e + t
                  : (-a / 2) * (--e * (e - 2) - 1) + t;
              },
            ],
            "ease-in-cubic": [
              "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
              function (e, t, a, n) {
                return a * (e /= n) * e * e + t;
              },
            ],
            "ease-out-cubic": [
              "cubic-bezier(0.215, 0.610, 0.355, 1)",
              function (e, t, a, n) {
                return a * ((e = e / n - 1) * e * e + 1) + t;
              },
            ],
            "ease-in-out-cubic": [
              "cubic-bezier(0.645, 0.045, 0.355, 1)",
              function (e, t, a, n) {
                return (e /= n / 2) < 1
                  ? (a / 2) * e * e * e + t
                  : (a / 2) * ((e -= 2) * e * e + 2) + t;
              },
            ],
            "ease-in-quart": [
              "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
              function (e, t, a, n) {
                return a * (e /= n) * e * e * e + t;
              },
            ],
            "ease-out-quart": [
              "cubic-bezier(0.165, 0.840, 0.440, 1)",
              function (e, t, a, n) {
                return -a * ((e = e / n - 1) * e * e * e - 1) + t;
              },
            ],
            "ease-in-out-quart": [
              "cubic-bezier(0.770, 0, 0.175, 1)",
              function (e, t, a, n) {
                return (e /= n / 2) < 1
                  ? (a / 2) * e * e * e * e + t
                  : (-a / 2) * ((e -= 2) * e * e * e - 2) + t;
              },
            ],
            "ease-in-quint": [
              "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
              function (e, t, a, n) {
                return a * (e /= n) * e * e * e * e + t;
              },
            ],
            "ease-out-quint": [
              "cubic-bezier(0.230, 1, 0.320, 1)",
              function (e, t, a, n) {
                return a * ((e = e / n - 1) * e * e * e * e + 1) + t;
              },
            ],
            "ease-in-out-quint": [
              "cubic-bezier(0.860, 0, 0.070, 1)",
              function (e, t, a, n) {
                return (e /= n / 2) < 1
                  ? (a / 2) * e * e * e * e * e + t
                  : (a / 2) * ((e -= 2) * e * e * e * e + 2) + t;
              },
            ],
            "ease-in-sine": [
              "cubic-bezier(0.470, 0, 0.745, 0.715)",
              function (e, t, a, n) {
                return -a * Math.cos((e / n) * (Math.PI / 2)) + a + t;
              },
            ],
            "ease-out-sine": [
              "cubic-bezier(0.390, 0.575, 0.565, 1)",
              function (e, t, a, n) {
                return a * Math.sin((e / n) * (Math.PI / 2)) + t;
              },
            ],
            "ease-in-out-sine": [
              "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
              function (e, t, a, n) {
                return (-a / 2) * (Math.cos((Math.PI * e) / n) - 1) + t;
              },
            ],
            "ease-in-expo": [
              "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
              function (e, t, a, n) {
                return 0 === e ? t : a * Math.pow(2, 10 * (e / n - 1)) + t;
              },
            ],
            "ease-out-expo": [
              "cubic-bezier(0.190, 1, 0.220, 1)",
              function (e, t, a, n) {
                return e === n
                  ? t + a
                  : a * (-Math.pow(2, (-10 * e) / n) + 1) + t;
              },
            ],
            "ease-in-out-expo": [
              "cubic-bezier(1, 0, 0, 1)",
              function (e, t, a, n) {
                return 0 === e
                  ? t
                  : e === n
                    ? t + a
                    : (e /= n / 2) < 1
                      ? (a / 2) * Math.pow(2, 10 * (e - 1)) + t
                      : (a / 2) * (-Math.pow(2, -10 * --e) + 2) + t;
              },
            ],
            "ease-in-circ": [
              "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
              function (e, t, a, n) {
                return -a * (Math.sqrt(1 - (e /= n) * e) - 1) + t;
              },
            ],
            "ease-out-circ": [
              "cubic-bezier(0.075, 0.820, 0.165, 1)",
              function (e, t, a, n) {
                return a * Math.sqrt(1 - (e = e / n - 1) * e) + t;
              },
            ],
            "ease-in-out-circ": [
              "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
              function (e, t, a, n) {
                return (e /= n / 2) < 1
                  ? (-a / 2) * (Math.sqrt(1 - e * e) - 1) + t
                  : (a / 2) * (Math.sqrt(1 - (e -= 2) * e) + 1) + t;
              },
            ],
            "ease-in-back": [
              "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
              function (e, t, a, n, i) {
                return (
                  void 0 === i && (i = 1.70158),
                  a * (e /= n) * e * ((i + 1) * e - i) + t
                );
              },
            ],
            "ease-out-back": [
              "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
              function (e, t, a, n, i) {
                return (
                  void 0 === i && (i = 1.70158),
                  a * ((e = e / n - 1) * e * ((i + 1) * e + i) + 1) + t
                );
              },
            ],
            "ease-in-out-back": [
              "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
              function (e, t, a, n, i) {
                return (
                  void 0 === i && (i = 1.70158),
                  (e /= n / 2) < 1
                    ? (a / 2) * e * e * (((i *= 1.525) + 1) * e - i) + t
                    : (a / 2) *
                    ((e -= 2) * e * (((i *= 1.525) + 1) * e + i) + 2) +
                    t
                );
              },
            ],
          },
          f = {
            "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
            "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
            "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
          },
          g = window,
          p = "bkwld-tram",
          I = /[\-\.0-9]/g,
          E = /[A-Z]/,
          T = "number",
          y = /^(rgb|#)/,
          b = /(em|cm|mm|in|pt|pc|px)$/,
          m = /(em|cm|mm|in|pt|pc|px|%)$/,
          _ = /(deg|rad|turn)$/,
          O = "unitless",
          v = /(all|none) 0s ease 0s/,
          L = /^(width|height)$/,
          h = document.createElement("a"),
          R = ["Webkit", "Moz", "O", "ms"],
          S = ["-webkit-", "-moz-", "-o-", "-ms-"],
          A = function (e) {
            if (e in h.style) return { dom: e, css: e };
            var t,
              a,
              n = "",
              i = e.split("-");
            for (t = 0; t < i.length; t++)
              n += i[t].charAt(0).toUpperCase() + i[t].slice(1);
            for (t = 0; t < R.length; t++)
              if ((a = R[t] + n) in h.style) return { dom: a, css: S[t] + e };
          },
          N = (t.support = {
            bind: Function.prototype.bind,
            transform: A("transform"),
            transition: A("transition"),
            backface: A("backface-visibility"),
            timing: A("transition-timing-function"),
          });
        if (N.transition) {
          var C = N.timing.dom;
          if (((h.style[C] = u["ease-in-back"][0]), !h.style[C]))
            for (var G in f) u[G][0] = f[G];
        }
        var U = (t.frame =
          (c =
            g.requestAnimationFrame ||
            g.webkitRequestAnimationFrame ||
            g.mozRequestAnimationFrame ||
            g.oRequestAnimationFrame ||
            g.msRequestAnimationFrame) && N.bind
            ? c.bind(g)
            : function (e) {
              g.setTimeout(e, 16);
            }),
          P = (t.now =
            (l =
              (r = g.performance) &&
              (r.now || r.webkitNow || r.msNow || r.mozNow)) && N.bind
              ? l.bind(r)
              : Date.now ||
              function () {
                return +new Date();
              }),
          M = s(function (t) {
            function a(e, t) {
              var a = (function (e) {
                for (var t = -1, a = e ? e.length : 0, n = []; ++t < a;) {
                  var i = e[t];
                  i && n.push(i);
                }
                return n;
              })(("" + e).split(" ")),
                n = a[0];
              t = t || {};
              var i = j[n];
              if (!i) return d("Unsupported property: " + n);
              if (!t.weak || !this.props[n]) {
                var o = i[0],
                  c = this.props[n];
                return (
                  c || (c = this.props[n] = new o.Bare()),
                  c.init(this.$el, a, i, t),
                  c
                );
              }
            }
            function n(e, t, n) {
              if (e) {
                var d = typeof e;
                if (
                  (t ||
                    (this.timer && this.timer.destroy(),
                      (this.queue = []),
                      (this.active = !1)),
                    "number" == d && t)
                )
                  return (
                    (this.timer = new Y({
                      duration: e,
                      context: this,
                      complete: i,
                    })),
                    void (this.active = !0)
                  );
                if ("string" == d && t) {
                  switch (e) {
                    case "hide":
                      r.call(this);
                      break;
                    case "stop":
                      c.call(this);
                      break;
                    case "redraw":
                      l.call(this);
                      break;
                    default:
                      a.call(this, e, n && n[1]);
                  }
                  return i.call(this);
                }
                if ("function" == d) return void e.call(this, this);
                if ("object" == d) {
                  var f = 0;
                  (u.call(
                    this,
                    e,
                    function (e, t) {
                      (e.span > f && (f = e.span), e.stop(), e.animate(t));
                    },
                    function (e) {
                      "wait" in e && (f = o(e.wait, 0));
                    },
                  ),
                    s.call(this),
                    f > 0 &&
                    ((this.timer = new Y({ duration: f, context: this })),
                      (this.active = !0),
                      t && (this.timer.complete = i)));
                  var g = this,
                    p = !1,
                    I = {};
                  U(function () {
                    (u.call(g, e, function (e) {
                      e.active && ((p = !0), (I[e.name] = e.nextStyle));
                    }),
                      p && g.$el.css(I));
                  });
                }
              }
            }
            function i() {
              if (
                (this.timer && this.timer.destroy(),
                  (this.active = !1),
                  this.queue.length)
              ) {
                var e = this.queue.shift();
                n.call(this, e.options, !0, e.args);
              }
            }
            function c(e) {
              var t;
              (this.timer && this.timer.destroy(),
                (this.queue = []),
                (this.active = !1),
                "string" == typeof e
                  ? ((t = {})[e] = 1)
                  : (t = "object" == typeof e && null != e ? e : this.props),
                u.call(this, t, f),
                s.call(this));
            }
            function r() {
              (c.call(this), (this.el.style.display = "none"));
            }
            function l() {
              this.el.offsetHeight;
            }
            function s() {
              var e,
                t,
                a = [];
              for (e in (this.upstream && a.push(this.upstream), this.props))
                (t = this.props[e]).active && a.push(t.string);
              ((a = a.join(",")),
                this.style !== a &&
                ((this.style = a), (this.el.style[N.transition.dom] = a)));
            }
            function u(e, t, n) {
              var i,
                o,
                d,
                c,
                r = t !== f,
                l = {};
              for (i in e)
                ((d = e[i]),
                  i in W
                    ? (l.transform || (l.transform = {}), (l.transform[i] = d))
                    : (E.test(i) &&
                      (i = i.replace(/[A-Z]/g, function (e) {
                        return "-" + e.toLowerCase();
                      })),
                      i in j ? (l[i] = d) : (c || (c = {}), (c[i] = d))));
              for (i in l) {
                if (((d = l[i]), !(o = this.props[i]))) {
                  if (!r) continue;
                  o = a.call(this, i);
                }
                t.call(this, o, d);
              }
              n && c && n.call(this, c);
            }
            function f(e) {
              e.stop();
            }
            function g(e, t) {
              e.set(t);
            }
            function I(e) {
              this.$el.css(e);
            }
            function T(e, a) {
              t[e] = function () {
                return this.children
                  ? y.call(this, a, arguments)
                  : (this.el && a.apply(this, arguments), this);
              };
            }
            function y(e, t) {
              var a,
                n = this.children.length;
              for (a = 0; n > a; a++) e.apply(this.children[a], t);
              return this;
            }
            ((t.init = function (t) {
              if (
                ((this.$el = e(t)),
                  (this.el = this.$el[0]),
                  (this.props = {}),
                  (this.queue = []),
                  (this.style = ""),
                  (this.active = !1),
                  B.keepInherited && !B.fallback)
              ) {
                var a = H(this.el, "transition");
                a && !v.test(a) && (this.upstream = a);
              }
              N.backface &&
                B.hideBackface &&
                Q(this.el, N.backface.css, "hidden");
            }),
              T("add", a),
              T("start", n),
              T("wait", function (e) {
                ((e = o(e, 0)),
                  this.active
                    ? this.queue.push({ options: e })
                    : ((this.timer = new Y({
                      duration: e,
                      context: this,
                      complete: i,
                    })),
                      (this.active = !0)));
              }),
              T("then", function (e) {
                return this.active
                  ? (this.queue.push({ options: e, args: arguments }),
                    void (this.timer.complete = i))
                  : d(
                    "No active transition timer. Use start() or wait() before then().",
                  );
              }),
              T("next", i),
              T("stop", c),
              T("set", function (e) {
                (c.call(this, e), u.call(this, e, g, I));
              }),
              T("show", function (e) {
                ("string" != typeof e && (e = "block"),
                  (this.el.style.display = e));
              }),
              T("hide", r),
              T("redraw", l),
              T("destroy", function () {
                (c.call(this),
                  e.removeData(this.el, p),
                  (this.$el = this.el = null));
              }));
          }),
          w = s(M, function (t) {
            function a(t, a) {
              var n = e.data(t, p) || e.data(t, p, new M.Bare());
              return (n.el || n.init(t), a ? n.start(a) : n);
            }
            t.init = function (t, n) {
              var i = e(t);
              if (!i.length) return this;
              if (1 === i.length) return a(i[0], n);
              var o = [];
              return (
                i.each(function (e, t) {
                  o.push(a(t, n));
                }),
                (this.children = o),
                this
              );
            };
          }),
          V = s(function (e) {
            function t() {
              var e = this.get();
              this.update("auto");
              var t = this.get();
              return (this.update(e), t);
            }
            ((e.init = function (e, t, a, n) {
              ((this.$el = e), (this.el = e[0]));
              var i,
                d,
                c,
                r = t[0];
              (a[2] && (r = a[2]),
                z[r] && (r = z[r]),
                (this.name = r),
                (this.type = a[1]),
                (this.duration = o(t[1], this.duration, 500)),
                (this.ease =
                  ((i = t[2]),
                    (d = this.ease),
                    (c = "ease"),
                    void 0 !== d && (c = d),
                    i in u ? i : c)),
                (this.delay = o(t[3], this.delay, 0)),
                (this.span = this.duration + this.delay),
                (this.active = !1),
                (this.nextStyle = null),
                (this.auto = L.test(this.name)),
                (this.unit = n.unit || this.unit || B.defaultUnit),
                (this.angle = n.angle || this.angle || B.defaultAngle),
                B.fallback || n.fallback
                  ? (this.animate = this.fallback)
                  : ((this.animate = this.transition),
                    (this.string =
                      this.name +
                      " " +
                      this.duration +
                      "ms" +
                      ("ease" != this.ease ? " " + u[this.ease][0] : "") +
                      (this.delay ? " " + this.delay + "ms" : ""))));
            }),
              (e.set = function (e) {
                ((e = this.convert(e, this.type)),
                  this.update(e),
                  this.redraw());
              }),
              (e.transition = function (e) {
                ((this.active = !0),
                  (e = this.convert(e, this.type)),
                  this.auto &&
                  ("auto" == this.el.style[this.name] &&
                    (this.update(this.get()), this.redraw()),
                    "auto" == e && (e = t.call(this))),
                  (this.nextStyle = e));
              }),
              (e.fallback = function (e) {
                var a =
                  this.el.style[this.name] ||
                  this.convert(this.get(), this.type);
                ((e = this.convert(e, this.type)),
                  this.auto &&
                  ("auto" == a && (a = this.convert(this.get(), this.type)),
                    "auto" == e && (e = t.call(this))),
                  (this.tween = new D({
                    from: a,
                    to: e,
                    duration: this.duration,
                    delay: this.delay,
                    ease: this.ease,
                    update: this.update,
                    context: this,
                  })));
              }),
              (e.get = function () {
                return H(this.el, this.name);
              }),
              (e.update = function (e) {
                Q(this.el, this.name, e);
              }),
              (e.stop = function () {
                (this.active || this.nextStyle) &&
                  ((this.active = !1),
                    (this.nextStyle = null),
                    Q(this.el, this.name, this.get()));
                var e = this.tween;
                e && e.context && e.destroy();
              }),
              (e.convert = function (e, t) {
                if ("auto" == e && this.auto) return e;
                var a,
                  i,
                  o = "number" == typeof e,
                  c = "string" == typeof e;
                switch (t) {
                  case T:
                    if (o) return e;
                    if (c && "" === e.replace(I, "")) return +e;
                    i = "number(unitless)";
                    break;
                  case y:
                    if (c) {
                      if ("" === e && this.original) return this.original;
                      if (t.test(e))
                        return "#" == e.charAt(0) && 7 == e.length
                          ? e
                          : ((a = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(e))
                            ? n(a[1], a[2], a[3])
                            : e
                          ).replace(/#(\w)(\w)(\w)$/, "#$1$1$2$2$3$3");
                    }
                    i = "hex or rgb string";
                    break;
                  case b:
                    if (o) return e + this.unit;
                    if (c && t.test(e)) return e;
                    i = "number(px) or string(unit)";
                    break;
                  case m:
                    if (o) return e + this.unit;
                    if (c && t.test(e)) return e;
                    i = "number(px) or string(unit or %)";
                    break;
                  case _:
                    if (o) return e + this.angle;
                    if (c && t.test(e)) return e;
                    i = "number(deg) or string(angle)";
                    break;
                  case O:
                    if (o || (c && m.test(e))) return e;
                    i = "number(unitless) or string(unit or %)";
                }
                return (
                  d(
                    "Type warning: Expected: [" +
                    i +
                    "] Got: [" +
                    typeof e +
                    "] " +
                    e,
                  ),
                  e
                );
              }),
              (e.redraw = function () {
                this.el.offsetHeight;
              }));
          }),
          x = s(V, function (e, t) {
            e.init = function () {
              (t.init.apply(this, arguments),
                this.original || (this.original = this.convert(this.get(), y)));
            };
          }),
          k = s(V, function (e, t) {
            ((e.init = function () {
              (t.init.apply(this, arguments), (this.animate = this.fallback));
            }),
              (e.get = function () {
                return this.$el[this.name]();
              }),
              (e.update = function (e) {
                this.$el[this.name](e);
              }));
          }),
          F = s(V, function (e, t) {
            function a(e, t) {
              var a, n, i, o, d;
              for (a in e)
                ((i = (o = W[a])[0]),
                  (n = o[1] || a),
                  (d = this.convert(e[a], i)),
                  t.call(this, n, d, i));
            }
            ((e.init = function () {
              (t.init.apply(this, arguments),
                this.current ||
                ((this.current = {}),
                  W.perspective &&
                  B.perspective &&
                  ((this.current.perspective = B.perspective),
                    Q(this.el, this.name, this.style(this.current)),
                    this.redraw())));
            }),
              (e.set = function (e) {
                (a.call(this, e, function (e, t) {
                  this.current[e] = t;
                }),
                  Q(this.el, this.name, this.style(this.current)),
                  this.redraw());
              }),
              (e.transition = function (e) {
                var t = this.values(e);
                this.tween = new X({
                  current: this.current,
                  values: t,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                });
                var a,
                  n = {};
                for (a in this.current) n[a] = a in t ? t[a] : this.current[a];
                ((this.active = !0), (this.nextStyle = this.style(n)));
              }),
              (e.fallback = function (e) {
                var t = this.values(e);
                this.tween = new X({
                  current: this.current,
                  values: t,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                });
              }),
              (e.update = function () {
                Q(this.el, this.name, this.style(this.current));
              }),
              (e.style = function (e) {
                var t,
                  a = "";
                for (t in e) a += t + "(" + e[t] + ") ";
                return a;
              }),
              (e.values = function (e) {
                var t,
                  n = {};
                return (
                  a.call(this, e, function (e, a, i) {
                    ((n[e] = a),
                      void 0 === this.current[e] &&
                      ((t = 0),
                        ~e.indexOf("scale") && (t = 1),
                        (this.current[e] = this.convert(t, i))));
                  }),
                  n
                );
              }));
          }),
          D = s(function (t) {
            function o() {
              var e,
                t,
                a,
                n = r.length;
              if (n)
                for (U(o), t = P(), e = n; e--;) (a = r[e]) && a.render(t);
            }
            var c = { ease: u.ease[1], from: 0, to: 1 };
            ((t.init = function (e) {
              ((this.duration = e.duration || 0), (this.delay = e.delay || 0));
              var t = e.ease || c.ease;
              (u[t] && (t = u[t][1]),
                "function" != typeof t && (t = c.ease),
                (this.ease = t),
                (this.update = e.update || i),
                (this.complete = e.complete || i),
                (this.context = e.context || this),
                (this.name = e.name));
              var a = e.from,
                n = e.to;
              (void 0 === a && (a = c.from),
                void 0 === n && (n = c.to),
                (this.unit = e.unit || ""),
                "number" == typeof a && "number" == typeof n
                  ? ((this.begin = a), (this.change = n - a))
                  : this.format(n, a),
                (this.value = this.begin + this.unit),
                (this.start = P()),
                !1 !== e.autoplay && this.play());
            }),
              (t.play = function () {
                this.active ||
                  (this.start || (this.start = P()),
                    (this.active = !0),
                    1 === r.push(this) && U(o));
              }),
              (t.stop = function () {
                var t, a;
                this.active &&
                  ((this.active = !1),
                    (a = e.inArray(this, r)) >= 0 &&
                    ((t = r.slice(a + 1)),
                      (r.length = a),
                      t.length && (r = r.concat(t))));
              }),
              (t.render = function (e) {
                var t,
                  a = e - this.start;
                if (this.delay) {
                  if (a <= this.delay) return;
                  a -= this.delay;
                }
                if (a < this.duration) {
                  var i,
                    o,
                    d = this.ease(a, 0, 1, this.duration);
                  return (
                    (t = this.startRGB
                      ? ((i = this.startRGB),
                        (o = this.endRGB),
                        n(
                          i[0] + d * (o[0] - i[0]),
                          i[1] + d * (o[1] - i[1]),
                          i[2] + d * (o[2] - i[2]),
                        ))
                      : Math.round((this.begin + d * this.change) * l) / l),
                    (this.value = t + this.unit),
                    void this.update.call(this.context, this.value)
                  );
                }
                ((t = this.endHex || this.begin + this.change),
                  (this.value = t + this.unit),
                  this.update.call(this.context, this.value),
                  this.complete.call(this.context),
                  this.destroy());
              }),
              (t.format = function (e, t) {
                if (((t += ""), "#" == (e += "").charAt(0)))
                  return (
                    (this.startRGB = a(t)),
                    (this.endRGB = a(e)),
                    (this.endHex = e),
                    (this.begin = 0),
                    void (this.change = 1)
                  );
                if (!this.unit) {
                  var n = t.replace(I, "");
                  (n !== e.replace(I, "") &&
                    d("Units do not match [tween]: " + t + ", " + e),
                    (this.unit = n));
                }
                ((t = parseFloat(t)),
                  (e = parseFloat(e)),
                  (this.begin = this.value = t),
                  (this.change = e - t));
              }),
              (t.destroy = function () {
                (this.stop(),
                  (this.context = null),
                  (this.ease = this.update = this.complete = i));
              }));
            var r = [],
              l = 1e3;
          }),
          Y = s(D, function (e) {
            ((e.init = function (e) {
              ((this.duration = e.duration || 0),
                (this.complete = e.complete || i),
                (this.context = e.context),
                this.play());
            }),
              (e.render = function (e) {
                e - this.start < this.duration ||
                  (this.complete.call(this.context), this.destroy());
              }));
          }),
          X = s(D, function (e, t) {
            ((e.init = function (e) {
              var t, a;
              for (t in ((this.context = e.context),
                (this.update = e.update),
                (this.tweens = []),
                (this.current = e.current),
                e.values))
                ((a = e.values[t]),
                  this.current[t] !== a &&
                  this.tweens.push(
                    new D({
                      name: t,
                      from: this.current[t],
                      to: a,
                      duration: e.duration,
                      delay: e.delay,
                      ease: e.ease,
                      autoplay: !1,
                    }),
                  ));
              this.play();
            }),
              (e.render = function (e) {
                var t,
                  a,
                  n = this.tweens.length,
                  i = !1;
                for (t = n; t--;)
                  (a = this.tweens[t]).context &&
                    (a.render(e), (this.current[a.name] = a.value), (i = !0));
                return i
                  ? void (this.update && this.update.call(this.context))
                  : this.destroy();
              }),
              (e.destroy = function () {
                if ((t.destroy.call(this), this.tweens)) {
                  var e;
                  for (e = this.tweens.length; e--;) this.tweens[e].destroy();
                  ((this.tweens = null), (this.current = null));
                }
              }));
          }),
          B = (t.config = {
            debug: !1,
            defaultUnit: "px",
            defaultAngle: "deg",
            keepInherited: !1,
            hideBackface: !1,
            perspective: "",
            fallback: !N.transition,
            agentTests: [],
          });
        ((t.fallback = function (e) {
          if (!N.transition) return (B.fallback = !0);
          B.agentTests.push("(" + e + ")");
          var t = RegExp(B.agentTests.join("|"), "i");
          B.fallback = t.test(navigator.userAgent);
        }),
          t.fallback("6.0.[2-5] Safari"),
          (t.tween = function (e) {
            return new D(e);
          }),
          (t.delay = function (e, t, a) {
            return new Y({ complete: t, duration: e, context: a });
          }),
          (e.fn.tram = function (e) {
            return t.call(null, this, e);
          }));
        var Q = e.style,
          H = e.css,
          z = { transform: N.transform && N.transform.css },
          j = {
            color: [x, y],
            background: [x, y, "background-color"],
            "outline-color": [x, y],
            "border-color": [x, y],
            "border-top-color": [x, y],
            "border-right-color": [x, y],
            "border-bottom-color": [x, y],
            "border-left-color": [x, y],
            "border-width": [V, b],
            "border-top-width": [V, b],
            "border-right-width": [V, b],
            "border-bottom-width": [V, b],
            "border-left-width": [V, b],
            "border-spacing": [V, b],
            "letter-spacing": [V, b],
            margin: [V, b],
            "margin-top": [V, b],
            "margin-right": [V, b],
            "margin-bottom": [V, b],
            "margin-left": [V, b],
            padding: [V, b],
            "padding-top": [V, b],
            "padding-right": [V, b],
            "padding-bottom": [V, b],
            "padding-left": [V, b],
            "outline-width": [V, b],
            opacity: [V, T],
            top: [V, m],
            right: [V, m],
            bottom: [V, m],
            left: [V, m],
            "font-size": [V, m],
            "text-indent": [V, m],
            "word-spacing": [V, m],
            width: [V, m],
            "min-width": [V, m],
            "max-width": [V, m],
            height: [V, m],
            "min-height": [V, m],
            "max-height": [V, m],
            "line-height": [V, O],
            "scroll-top": [k, T, "scrollTop"],
            "scroll-left": [k, T, "scrollLeft"],
          },
          W = {};
        (N.transform &&
          ((j.transform = [F]),
            (W = {
              x: [m, "translateX"],
              y: [m, "translateY"],
              rotate: [_],
              rotateX: [_],
              rotateY: [_],
              scale: [T],
              scaleX: [T],
              scaleY: [T],
              skew: [_],
              skewX: [_],
              skewY: [_],
            })),
          N.transform &&
          N.backface &&
          ((W.z = [m, "translateZ"]),
            (W.rotateZ = [_]),
            (W.scaleZ = [T]),
            (W.perspective = [b])));
        var Z = /ms/,
          $ = /s|\./;
        return (e.tram = t);
      })(window.jQuery);
    },
    5756: function (e, t, a) {
      "use strict";
      var n,
        i,
        o,
        d,
        c,
        r,
        l,
        s,
        u,
        f,
        g,
        p,
        I,
        E,
        T,
        y,
        b,
        m,
        _,
        O,
        v = window.$,
        L = a(5487) && v.tram;
      (((n = {}).VERSION = "1.6.0-Webflow"),
        (i = {}),
        (o = Array.prototype),
        (d = Object.prototype),
        (c = Function.prototype),
        o.push,
        (r = o.slice),
        o.concat,
        d.toString,
        (l = d.hasOwnProperty),
        (s = o.forEach),
        (u = o.map),
        o.reduce,
        o.reduceRight,
        (f = o.filter),
        o.every,
        (g = o.some),
        (p = o.indexOf),
        o.lastIndexOf,
        (I = Object.keys),
        c.bind,
        (E =
          n.each =
          n.forEach =
          function (e, t, a) {
            if (null == e) return e;
            if (s && e.forEach === s) e.forEach(t, a);
            else if (e.length === +e.length) {
              for (var o = 0, d = e.length; o < d; o++)
                if (t.call(a, e[o], o, e) === i) return;
            } else
              for (var c = n.keys(e), o = 0, d = c.length; o < d; o++)
                if (t.call(a, e[c[o]], c[o], e) === i) return;
            return e;
          }),
        (n.map = n.collect =
          function (e, t, a) {
            var n = [];
            return null == e
              ? n
              : u && e.map === u
                ? e.map(t, a)
                : (E(e, function (e, i, o) {
                  n.push(t.call(a, e, i, o));
                }),
                  n);
          }),
        (n.find = n.detect =
          function (e, t, a) {
            var n;
            return (
              T(e, function (e, i, o) {
                if (t.call(a, e, i, o)) return ((n = e), !0);
              }),
              n
            );
          }),
        (n.filter = n.select =
          function (e, t, a) {
            var n = [];
            return null == e
              ? n
              : f && e.filter === f
                ? e.filter(t, a)
                : (E(e, function (e, i, o) {
                  t.call(a, e, i, o) && n.push(e);
                }),
                  n);
          }),
        (T =
          n.some =
          n.any =
          function (e, t, a) {
            t || (t = n.identity);
            var o = !1;
            return null == e
              ? o
              : g && e.some === g
                ? e.some(t, a)
                : (E(e, function (e, n, d) {
                  if (o || (o = t.call(a, e, n, d))) return i;
                }),
                  !!o);
          }),
        (n.contains = n.include =
          function (e, t) {
            return (
              null != e &&
              (p && e.indexOf === p
                ? -1 != e.indexOf(t)
                : T(e, function (e) {
                  return e === t;
                }))
            );
          }),
        (n.delay = function (e, t) {
          var a = r.call(arguments, 2);
          return setTimeout(function () {
            return e.apply(null, a);
          }, t);
        }),
        (n.defer = function (e) {
          return n.delay.apply(n, [e, 1].concat(r.call(arguments, 1)));
        }),
        (n.throttle = function (e) {
          var t, a, n;
          return function () {
            t ||
              ((t = !0),
                (a = arguments),
                (n = this),
                L.frame(function () {
                  ((t = !1), e.apply(n, a));
                }));
          };
        }),
        (n.debounce = function (e, t, a) {
          var i,
            o,
            d,
            c,
            r,
            l = function () {
              var s = n.now() - c;
              s < t
                ? (i = setTimeout(l, t - s))
                : ((i = null), a || ((r = e.apply(d, o)), (d = o = null)));
            };
          return function () {
            ((d = this), (o = arguments), (c = n.now()));
            var s = a && !i;
            return (
              i || (i = setTimeout(l, t)),
              s && ((r = e.apply(d, o)), (d = o = null)),
              r
            );
          };
        }),
        (n.defaults = function (e) {
          if (!n.isObject(e)) return e;
          for (var t = 1, a = arguments.length; t < a; t++) {
            var i = arguments[t];
            for (var o in i) void 0 === e[o] && (e[o] = i[o]);
          }
          return e;
        }),
        (n.keys = function (e) {
          if (!n.isObject(e)) return [];
          if (I) return I(e);
          var t = [];
          for (var a in e) n.has(e, a) && t.push(a);
          return t;
        }),
        (n.has = function (e, t) {
          return l.call(e, t);
        }),
        (n.isObject = function (e) {
          return e === Object(e);
        }),
        (n.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (n.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        }),
        (y = /(.)^/),
        (b = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        }),
        (m = /\\|'|\r|\n|\u2028|\u2029/g),
        (_ = function (e) {
          return "\\" + b[e];
        }),
        (O = /^\s*(\w|\$)+\s*$/),
        (n.template = function (e, t, a) {
          !t && a && (t = a);
          var i,
            o = RegExp(
              [
                ((t = n.defaults({}, t, n.templateSettings)).escape || y)
                  .source,
                (t.interpolate || y).source,
                (t.evaluate || y).source,
              ].join("|") + "|$",
              "g",
            ),
            d = 0,
            c = "__p+='";
          (e.replace(o, function (t, a, n, i, o) {
            return (
              (c += e.slice(d, o).replace(m, _)),
              (d = o + t.length),
              a
                ? (c += "'+\n((__t=(" + a + "))==null?'':_.escape(__t))+\n'")
                : n
                  ? (c += "'+\n((__t=(" + n + "))==null?'':__t)+\n'")
                  : i && (c += "';\n" + i + "\n__p+='"),
              t
            );
          }),
            (c += "';\n"));
          var r = t.variable;
          if (r) {
            if (!O.test(r))
              throw Error("variable is not a bare identifier: " + r);
          } else ((c = "with(obj||{}){\n" + c + "}\n"), (r = "obj"));
          c =
            "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" +
            c +
            "return __p;\n";
          try {
            i = Function(t.variable || "obj", "_", c);
          } catch (e) {
            throw ((e.source = c), e);
          }
          var l = function (e) {
            return i.call(this, e, n);
          };
          return ((l.source = "function(" + r + "){\n" + c + "}"), l);
        }),
        (e.exports = n));
    },
    9461: function (e, t, a) {
      "use strict";
      var n = a(3949);
      n.define(
        "brand",
        (e.exports = function (e) {
          var t,
            a = {},
            i = document,
            o = e("html"),
            d = e("body"),
            c = window.location,
            r = /PhantomJS/i.test(navigator.userAgent),
            l =
              "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange";
          function s() {
            var a =
              i.fullScreen ||
              i.mozFullScreen ||
              i.webkitIsFullScreen ||
              i.msFullscreenElement ||
              !!i.webkitFullscreenElement;
            e(t).attr("style", a ? "display: none !important;" : "");
          }
          function u() {
            var e = d.children(".w-webflow-badge"),
              a = e.length && e.get(0) === t,
              i = n.env("editor");
            if (a) {
              i && e.remove();
              return;
            }
            (e.length && e.remove(), i || d.append(t));
          }
          return (
            (a.ready = function () {
              var a,
                n,
                d,
                f = o.attr("data-wf-status"),
                g = o.attr("data-wf-domain") || "";
              (/\.webflow\.io$/i.test(g) && c.hostname !== g && (f = !0),
                f &&
                !r &&
                ((t =
                  t ||
                  ((a = e('<a class="w-webflow-badge"></a>').attr(
                    "href",
                    "https://webflow.com?utm_campaign=brandjs",
                  )),
                    (n = e("<img>")
                      .attr(
                        "src",
                        "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon-d2.89e12c322e.svg",
                      )
                      .attr("alt", "")
                      .css({ marginRight: "4px", width: "26px" })),
                    (d = e("<img>")
                      .attr(
                        "src",
                        "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-text-d2.c82cec3b78.svg",
                      )
                      .attr("alt", "Made in Webflow")),
                    a.append(n, d),
                    a[0])),
                  u(),
                  setTimeout(u, 500),
                  e(i).off(l, s).on(l, s)));
            }),
            a
          );
        }),
      );
    },
    322: function (e, t, a) {
      "use strict";
      var n = a(3949);
      n.define(
        "edit",
        (e.exports = function (e, t, a) {
          if (
            ((a = a || {}),
              (n.env("principale") || n.env("frame")) &&
              !a.fixture &&
              !(function () {
                try {
                  return !!(window.top.__Cypress__ || window.PLAYWRIGHT_TEST);
                } catch (e) {
                  return !1;
                }
              })())
          )
            return { exit: 1 };
        }),
      );
    },
    2338: function (e, t, a) {
      "use strict";
      a(3949).define(
        "focus-visible",
        (e.exports = function () {
          return {
            ready: function () {
              if ("undefined" != typeof document)
                try {
                  document.querySelector(":focus-visible");
                } catch (e) {
                  !(function (e) {
                    var t = !0,
                      a = !1,
                      n = null,
                      i = {
                        text: !0,
                        search: !0,
                        url: !0,
                        tel: !0,
                        email: !0,
                        password: !0,
                        number: !0,
                        date: !0,
                        month: !0,
                        week: !0,
                        time: !0,
                        datetime: !0,
                        "datetime-local": !0,
                      };
                    function o(e) {
                      return (
                        !!e &&
                        e !== document &&
                        "HTML" !== e.nodeName &&
                        "BODY" !== e.nodeName &&
                        "classList" in e &&
                        "contains" in e.classList
                      );
                    }
                    function d(e) {
                      e.getAttribute("data-wf-focus-visible") ||
                        e.setAttribute("data-wf-focus-visible", "true");
                    }
                    function c() {
                      t = !1;
                    }
                    function r() {
                      (document.addEventListener("mousemove", l),
                        document.addEventListener("mousedown", l),
                        document.addEventListener("mouseup", l),
                        document.addEventListener("pointermove", l),
                        document.addEventListener("pointerdown", l),
                        document.addEventListener("pointerup", l),
                        document.addEventListener("touchmove", l),
                        document.addEventListener("touchstart", l),
                        document.addEventListener("touchend", l));
                    }
                    function l(e) {
                      (e.target.nodeName &&
                        "html" === e.target.nodeName.toLowerCase()) ||
                        ((t = !1),
                          document.removeEventListener("mousemove", l),
                          document.removeEventListener("mousedown", l),
                          document.removeEventListener("mouseup", l),
                          document.removeEventListener("pointermove", l),
                          document.removeEventListener("pointerdown", l),
                          document.removeEventListener("pointerup", l),
                          document.removeEventListener("touchmove", l),
                          document.removeEventListener("touchstart", l),
                          document.removeEventListener("touchend", l));
                    }
                    (document.addEventListener(
                      "keydown",
                      function (a) {
                        a.metaKey ||
                          a.altKey ||
                          a.ctrlKey ||
                          (o(e.activeElement) && d(e.activeElement), (t = !0));
                      },
                      !0,
                    ),
                      document.addEventListener("mousedown", c, !0),
                      document.addEventListener("pointerdown", c, !0),
                      document.addEventListener("touchstart", c, !0),
                      document.addEventListener(
                        "visibilitychange",
                        function () {
                          "hidden" === document.visibilityState &&
                            (a && (t = !0), r());
                        },
                        !0,
                      ),
                      r(),
                      e.addEventListener(
                        "focus",
                        function (e) {
                          if (o(e.target)) {
                            var a, n, c;
                            (t ||
                              ((n = (a = e.target).type),
                                ("INPUT" === (c = a.tagName) &&
                                  i[n] &&
                                  !a.readOnly) ||
                                ("TEXTAREA" === c && !a.readOnly) ||
                                a.isContentEditable ||
                                0)) &&
                              d(e.target);
                          }
                        },
                        !0,
                      ),
                      e.addEventListener(
                        "blur",
                        function (e) {
                          if (
                            o(e.target) &&
                            e.target.hasAttribute("data-wf-focus-visible")
                          ) {
                            var t;
                            ((a = !0),
                              window.clearTimeout(n),
                              (n = window.setTimeout(function () {
                                a = !1;
                              }, 100)),
                              (t = e.target).getAttribute(
                                "data-wf-focus-visible",
                              ) && t.removeAttribute("data-wf-focus-visible"));
                          }
                        },
                        !0,
                      ));
                  })(document);
                }
            },
          };
        }),
      );
    },
    8334: function (e, t, a) {
      "use strict";
      var n = a(3949);
      n.define(
        "focus",
        (e.exports = function () {
          var e = [],
            t = !1;
          function a(a) {
            t &&
              (a.preventDefault(),
                a.stopPropagation(),
                a.stopImmediatePropagation(),
                e.unshift(a));
          }
          function i(a) {
            var n, i;
            ((i = (n = a.target).tagName),
              ((/^a$/i.test(i) && null != n.href) ||
                (/^(button|textarea)$/i.test(i) && !0 !== n.disabled) ||
                (/^input$/i.test(i) &&
                  /^(button|reset|submit|radio|checkbox)$/i.test(n.type) &&
                  !n.disabled) ||
                (!/^(button|input|textarea|select|a)$/i.test(i) &&
                  !Number.isNaN(Number.parseFloat(n.tabIndex))) ||
                /^audio$/i.test(i) ||
                (/^video$/i.test(i) && !0 === n.controls)) &&
              ((t = !0),
                setTimeout(() => {
                  for (t = !1, a.target.focus(); e.length > 0;) {
                    var n = e.pop();
                    n.target.dispatchEvent(new MouseEvent(n.type, n));
                  }
                }, 0)));
          }
          return {
            ready: function () {
              "undefined" != typeof document &&
                document.body.hasAttribute("data-wf-focus-within") &&
                n.env.safari &&
                (document.addEventListener("mousedown", i, !0),
                  document.addEventListener("mouseup", a, !0),
                  document.addEventListener("click", a, !0));
            },
          };
        }),
      );
    },
    7199: function (e) {
      "use strict";
      var t = window.jQuery,
        a = {},
        n = [],
        i = ".w-ix",
        o = {
          reset: function (e, t) {
            t.__wf_intro = null;
          },
          intro: function (e, n) {
            n.__wf_intro ||
              ((n.__wf_intro = !0), t(n).triggerHandler(a.types.INTRO));
          },
          outro: function (e, n) {
            n.__wf_intro &&
              ((n.__wf_intro = null), t(n).triggerHandler(a.types.OUTRO));
          },
        };
      ((a.triggers = {}),
        (a.types = { INTRO: "w-ix-intro" + i, OUTRO: "w-ix-outro" + i }),
        (a.init = function () {
          for (var e = n.length, i = 0; i < e; i++) {
            var d = n[i];
            d[0](0, d[1]);
          }
          ((n = []), t.extend(a.triggers, o));
        }),
        (a.async = function () {
          for (var e in o) {
            var t = o[e];
            o.hasOwnProperty(e) &&
              (a.triggers[e] = function (e, a) {
                n.push([t, a]);
              });
          }
        }),
        a.async(),
        (e.exports = a));
    },
    5134: function (e, t, a) {
      "use strict";
      var n = a(7199);
      function i(e, t, a) {
        var n = document.createEvent("CustomEvent");
        (n.initCustomEvent(t, !0, !0, a || null), e.dispatchEvent(n));
      }
      var o = window.jQuery,
        d = {},
        c = ".w-ix";
      ((d.triggers = {}),
        (d.types = { INTRO: "w-ix-intro" + c, OUTRO: "w-ix-outro" + c }),
        o.extend(d.triggers, {
          reset: function (e, t) {
            n.triggers.reset(e, t);
          },
          intro: function (e, t) {
            (n.triggers.intro(e, t), i(t, "COMPONENT_ACTIVE"));
          },
          outro: function (e, t) {
            (n.triggers.outro(e, t), i(t, "COMPONENT_INACTIVE"));
          },
        }),
        (d.dispatchCustomEvent = i),
        (e.exports = d));
    },
    941: function (e, t, a) {
      "use strict";
      var n = a(3949),
        i = a(6011);
      (i.setEnv(n.env),
        n.define(
          "ix2",
          (e.exports = function () {
            return i;
          }),
        ));
    },
    3949: function (e, t, a) {
      "use strict";
      var n,
        i,
        o = {},
        d = {},
        c = [],
        r = window.Webflow || [],
        l = window.jQuery,
        s = l(window),
        u = l(document),
        f = l.isFunction,
        g = (o._ = a(5756)),
        p = (o.tram = a(5487) && l.tram),
        I = !1,
        E = !1;
      function T(e) {
        (o.env() &&
          (f(e.design) && s.on("__wf_design", e.design),
            f(e.preview) && s.on("__wf_preview", e.preview)),
          f(e.destroy) && s.on("__wf_destroy", e.destroy),
          e.ready &&
          f(e.ready) &&
          (function (e) {
            if (I) return e.ready();
            g.contains(c, e.ready) || c.push(e.ready);
          })(e));
      }
      function y(e) {
        var t;
        (f(e.design) && s.off("__wf_design", e.design),
          f(e.preview) && s.off("__wf_preview", e.preview),
          f(e.destroy) && s.off("__wf_destroy", e.destroy),
          e.ready &&
          f(e.ready) &&
          ((t = e),
            (c = g.filter(c, function (e) {
              return e !== t.ready;
            }))));
      }
      ((p.config.hideBackface = !1),
        (p.config.keepInherited = !0),
        (o.define = function (e, t, a) {
          d[e] && y(d[e]);
          var n = (d[e] = t(l, g, a) || {});
          return (T(n), n);
        }),
        (o.require = function (e) {
          return d[e];
        }),
        (o.push = function (e) {
          if (I) {
            f(e) && e();
            return;
          }
          r.push(e);
        }),
        (o.env = function (e) {
          var t = window.__wf_design,
            a = void 0 !== t;
          return e
            ? "design" === e
              ? a && t
              : "preview" === e
                ? a && !t
                : "slug" === e
                  ? a && window.__wf_slug
                  : "editor" === e
                    ? window.WebflowEditor
                    : "principale" === e
                      ? window.__wf_test
                      : "frame" === e
                        ? window !== window.top
                        : void 0
            : a;
        }));
      var b = navigator.userAgent.toLowerCase(),
        m = (o.env.touch =
          "ontouchstart" in window ||
          (window.DocumentTouch && document instanceof window.DocumentTouch)),
        _ = (o.env.chrome =
          /chrome/.test(b) &&
          /Google/.test(navigator.vendor) &&
          parseInt(b.match(/chrome\/(\d+)\./)[1], 10)),
        O = (o.env.ios = /(ipod|iphone|ipad)/.test(b));
      ((o.env.safari = /safari/.test(b) && !_ && !O),
        m &&
        u.on("touchstart mousedown", function (e) {
          n = e.target;
        }),
        (o.validClick = m
          ? function (e) {
            return e === n || l.contains(e, n);
          }
          : function () {
            return !0;
          }));
      var v = "resize.webflow orientationchange.webflow load.webflow",
        L = "scroll.webflow " + v;
      function h(e, t) {
        var a = [],
          n = {};
        return (
          (n.up = g.throttle(function (e) {
            g.each(a, function (t) {
              t(e);
            });
          })),
          e && t && e.on(t, n.up),
          (n.on = function (e) {
            "function" == typeof e && (g.contains(a, e) || a.push(e));
          }),
          (n.off = function (e) {
            if (!arguments.length) {
              a = [];
              return;
            }
            a = g.filter(a, function (t) {
              return t !== e;
            });
          }),
          n
        );
      }
      function R(e) {
        f(e) && e();
      }
      function S() {
        (i && (i.reject(), s.off("load", i.resolve)),
          (i = new l.Deferred()),
          s.on("load", i.resolve));
      }
      ((o.resize = h(s, v)),
        (o.scroll = h(s, L)),
        (o.redraw = h()),
        (o.location = function (e) {
          window.location = e;
        }),
        o.env() && (o.location = function () { }),
        (o.ready = function () {
          ((I = !0),
            E ? ((E = !1), g.each(d, T)) : g.each(c, R),
            g.each(r, R),
            o.resize.up());
        }),
        (o.load = function (e) {
          i.then(e);
        }),
        (o.destroy = function (e) {
          ((e = e || {}),
            (E = !0),
            s.triggerHandler("__wf_destroy"),
            null != e.domready && (I = e.domready),
            g.each(d, y),
            o.resize.off(),
            o.scroll.off(),
            o.redraw.off(),
            (c = []),
            (r = []),
            "pending" === i.state() && S());
        }),
        l(o.ready),
        S(),
        (e.exports = window.Webflow = o));
    },
    7624: function (e, t, a) {
      "use strict";
      var n = a(3949);
      n.define(
        "links",
        (e.exports = function (e, t) {
          var a,
            i,
            o,
            d = {},
            c = e(window),
            r = n.env(),
            l = window.location,
            s = document.createElement("a"),
            u = "w--current",
            f = /index\.(html|php)$/,
            g = /\/$/;
          function p() {
            var e = c.scrollTop(),
              a = c.height();
            t.each(i, function (t) {
              if (!t.link.attr("hreflang")) {
                var n = t.link,
                  i = t.sec,
                  o = i.offset().top,
                  d = i.outerHeight(),
                  c = 0.5 * a,
                  r = i.is(":visible") && o + d - c >= e && o + c <= e + a;
                t.active !== r && ((t.active = r), I(n, u, r));
              }
            });
          }
          function I(e, t, a) {
            var n = e.hasClass(t);
            (!a || !n) && (a || n) && (a ? e.addClass(t) : e.removeClass(t));
          }
          return (
            (d.ready =
              d.design =
              d.preview =
              function () {
                ((a = r && n.env("design")),
                  (o = n.env("slug") || l.pathname || ""),
                  n.scroll.off(p),
                  (i = []));
                for (var t = document.links, d = 0; d < t.length; ++d)
                  !(function (t) {
                    if (!t.getAttribute("hreflang")) {
                      var n =
                        (a && t.getAttribute("href-disabled")) ||
                        t.getAttribute("href");
                      if (((s.href = n), !(n.indexOf(":") >= 0))) {
                        var d = e(t);
                        if (
                          s.hash.length > 1 &&
                          s.host + s.pathname === l.host + l.pathname
                        ) {
                          if (!/^#[a-zA-Z0-9\-\_]+$/.test(s.hash)) return;
                          var c = e(s.hash);
                          c.length && i.push({ link: d, sec: c, active: !1 });
                          return;
                        }
                        "#" !== n &&
                          "" !== n &&
                          I(
                            d,
                            u,
                            (!r && s.href === l.href) ||
                            n === o ||
                            (f.test(n) && g.test(o)),
                          );
                      }
                    }
                  })(t[d]);
                i.length && (n.scroll.on(p), p());
              }),
            d
          );
        }),
      );
    },
    286: function (e, t, a) {
      "use strict";
      var n = a(3949);
      n.define(
        "scroll",
        (e.exports = function (e) {
          var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
            a = window.location,
            i = !(function () {
              try {
                return !!window.frameElement;
              } catch (e) {
                return !0;
              }
            })()
              ? window.history
              : null,
            o = e(window),
            d = e(document),
            c = e(document.body),
            r =
              window.requestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              function (e) {
                window.setTimeout(e, 15);
              },
            l = n.env("editor") ? ".w-editor-body" : "body",
            s =
              "header, " +
              l +
              " > .header, " +
              l +
              " > .w-nav:not([data-no-scroll])",
            u = 'a[href="#"]',
            f = 'a[href*="#"]:not(.w-tab-link):not(' + u + ")",
            g = document.createElement("style");
          g.appendChild(
            document.createTextNode(
              '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
            ),
          );
          var p = /^#[a-zA-Z0-9][\w:.-]*$/;
          let I =
            "function" == typeof window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)");
          function E(e, t) {
            var a;
            switch (t) {
              case "add":
                (a = e.attr("tabindex"))
                  ? e.attr("data-wf-tabindex-swap", a)
                  : e.attr("tabindex", "-1");
                break;
              case "remove":
                (a = e.attr("data-wf-tabindex-swap"))
                  ? (e.attr("tabindex", a),
                    e.removeAttr("data-wf-tabindex-swap"))
                  : e.removeAttr("tabindex");
            }
            e.toggleClass("wf-force-outline-none", "add" === t);
          }
          function T(t) {
            var d = t.currentTarget;
            if (
              !(
                n.env("design") ||
                (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(d.className))
              )
            ) {
              var l =
                p.test(d.hash) && d.host + d.pathname === a.host + a.pathname
                  ? d.hash
                  : "";
              if ("" !== l) {
                var u,
                  f = e(l);
                f.length &&
                  (t && (t.preventDefault(), t.stopPropagation()),
                    (u = l),
                    a.hash !== u &&
                    i &&
                    i.pushState &&
                    !(n.env.chrome && "file:" === a.protocol) &&
                    (i.state && i.state.hash) !== u &&
                    i.pushState({ hash: u }, "", u),
                    window.setTimeout(function () {
                      !(function (t, a) {
                        var n = o.scrollTop(),
                          i = (function (t) {
                            var a = e(s),
                              n =
                                "fixed" === a.css("position")
                                  ? a.outerHeight()
                                  : 0,
                              i = t.offset().top - n;
                            if ("mid" === t.data("scroll")) {
                              var d = o.height() - n,
                                c = t.outerHeight();
                              c < d && (i -= Math.round((d - c) / 2));
                            }
                            return i;
                          })(t);
                        if (n !== i) {
                          var d = (function (e, t, a) {
                            if (
                              "none" ===
                              document.body.getAttribute(
                                "data-wf-scroll-motion",
                              ) ||
                              I.matches
                            )
                              return 0;
                            var n = 1;
                            return (
                              c.add(e).each(function (e, t) {
                                var a = parseFloat(
                                  t.getAttribute("data-scroll-time"),
                                );
                                !isNaN(a) && a >= 0 && (n = a);
                              }),
                              (472.143 * Math.log(Math.abs(t - a) + 125) -
                                2e3) *
                              n
                            );
                          })(t, n, i),
                            l = Date.now(),
                            u = function () {
                              var e,
                                t,
                                o,
                                c,
                                s,
                                f = Date.now() - l;
                              (window.scroll(
                                0,
                                ((e = n),
                                  (t = i),
                                  (o = f) > (c = d)
                                    ? t
                                    : e +
                                    (t - e) *
                                    ((s = o / c) < 0.5
                                      ? 4 * s * s * s
                                      : (s - 1) * (2 * s - 2) * (2 * s - 2) +
                                      1)),
                              ),
                                f <= d ? r(u) : "function" == typeof a && a());
                            };
                          r(u);
                        }
                      })(f, function () {
                        (E(f, "add"),
                          f.get(0).focus({ preventScroll: !0 }),
                          E(f, "remove"));
                      });
                    }, 300 * !t));
              }
            }
          }
          return {
            ready: function () {
              var { WF_CLICK_EMPTY: e, WF_CLICK_SCROLL: a } = t;
              (d.on(a, f, T),
                d.on(e, u, function (e) {
                  e.preventDefault();
                }),
                document.head.insertBefore(g, document.head.firstChild));
            },
          };
        }),
      );
    },
    3695: function (e, t, a) {
      "use strict";
      a(3949).define(
        "touch",
        (e.exports = function (e) {
          var t = {},
            a = window.getSelection;
          function n(t) {
            var n,
              i,
              o = !1,
              d = !1,
              c = Math.min(Math.round(0.04 * window.innerWidth), 40);
            function r(e) {
              var t = e.touches;
              (t && t.length > 1) ||
                ((o = !0),
                  t ? ((d = !0), (n = t[0].clientX)) : (n = e.clientX),
                  (i = n));
            }
            function l(t) {
              if (o) {
                if (d && "mousemove" === t.type) {
                  (t.preventDefault(), t.stopPropagation());
                  return;
                }
                var n,
                  r,
                  l,
                  s,
                  f = t.touches,
                  g = f ? f[0].clientX : t.clientX,
                  p = g - i;
                ((i = g),
                  Math.abs(p) > c &&
                  a &&
                  "" === String(a()) &&
                  ((n = "swipe"),
                    (r = t),
                    (l = { direction: p > 0 ? "right" : "left" }),
                    (s = e.Event(n, { originalEvent: r })),
                    e(r.target).trigger(s, l),
                    u()));
              }
            }
            function s(e) {
              if (o && ((o = !1), d && "mouseup" === e.type)) {
                (e.preventDefault(), e.stopPropagation(), (d = !1));
                return;
              }
            }
            function u() {
              o = !1;
            }
            (t.addEventListener("touchstart", r, !1),
              t.addEventListener("touchmove", l, !1),
              t.addEventListener("touchend", s, !1),
              t.addEventListener("touchcancel", u, !1),
              t.addEventListener("mousedown", r, !1),
              t.addEventListener("mousemove", l, !1),
              t.addEventListener("mouseup", s, !1),
              t.addEventListener("mouseout", u, !1),
              (this.destroy = function () {
                (t.removeEventListener("touchstart", r, !1),
                  t.removeEventListener("touchmove", l, !1),
                  t.removeEventListener("touchend", s, !1),
                  t.removeEventListener("touchcancel", u, !1),
                  t.removeEventListener("mousedown", r, !1),
                  t.removeEventListener("mousemove", l, !1),
                  t.removeEventListener("mouseup", s, !1),
                  t.removeEventListener("mouseout", u, !1),
                  (t = null));
              }));
          }
          return (
            (e.event.special.tap = {
              bindType: "click",
              delegateType: "click",
            }),
            (t.init = function (t) {
              return (t = "string" == typeof t ? e(t).get(0) : t)
                ? new n(t)
                : null;
            }),
            (t.instance = t.init(document)),
            t
          );
        }),
      );
    },
    3487: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        strFromU8: function () {
          return z;
        },
        unzip: function () {
          return Z;
        },
      };
      for (var n in a)
        Object.defineProperty(t, n, { enumerable: !0, get: a[n] });
      let i = {},
        o = function (e, t, a, n, o) {
          let d = new Worker(
            i[t] ||
            (i[t] = URL.createObjectURL(
              new Blob(
                [
                  e +
                  ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})',
                ],
                { type: "text/javascript" },
              ),
            )),
          );
          return (
            (d.onmessage = function (e) {
              let t = e.data,
                a = t.$e$;
              if (a) {
                let e = Error(a[0]);
                ((e.code = a[1]), (e.stack = a[2]), o(e, null));
              } else o(null, t);
            }),
            d.postMessage(a, n),
            d
          );
        },
        d = Uint8Array,
        c = Uint16Array,
        r = Uint32Array,
        l = new d([
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,
          4, 5, 5, 5, 5, 0, 0, 0, 0,
        ]),
        s = new d([
          0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
          10, 11, 11, 12, 12, 13, 13, 0, 0,
        ]),
        u = new d([
          16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
        ]),
        f = function (e, t) {
          let a = new c(31);
          for (var n = 0; n < 31; ++n) a[n] = t += 1 << e[n - 1];
          let i = new r(a[30]);
          for (n = 1; n < 30; ++n)
            for (let e = a[n]; e < a[n + 1]; ++e) i[e] = ((e - a[n]) << 5) | n;
          return [a, i];
        },
        g = f(l, 2),
        p = g[0],
        I = g[1];
      ((p[28] = 258), (I[258] = 28));
      let E = f(s, 0)[0],
        T = new c(32768);
      for (var y = 0; y < 32768; ++y) {
        let e = ((43690 & y) >>> 1) | ((21845 & y) << 1);
        ((e =
          ((61680 & (e = ((52428 & e) >>> 2) | ((13107 & e) << 2))) >>> 4) |
          ((3855 & e) << 4)),
          (T[y] = (((65280 & e) >>> 8) | ((255 & e) << 8)) >>> 1));
      }
      let b = function (e, t, a) {
        let n,
          i = e.length,
          o = 0,
          d = new c(t);
        for (; o < i; ++o) e[o] && ++d[e[o] - 1];
        let r = new c(t);
        for (o = 0; o < t; ++o) r[o] = (r[o - 1] + d[o - 1]) << 1;
        if (a) {
          n = new c(1 << t);
          let a = 15 - t;
          for (o = 0; o < i; ++o)
            if (e[o]) {
              let i = (o << 4) | e[o],
                d = t - e[o],
                c = r[e[o] - 1]++ << d;
              for (let e = c | ((1 << d) - 1); c <= e; ++c) n[T[c] >>> a] = i;
            }
        } else
          for (n = new c(i), o = 0; o < i; ++o)
            e[o] && (n[o] = T[r[e[o] - 1]++] >>> (15 - e[o]));
        return n;
      },
        m = new d(288);
      for (y = 0; y < 144; ++y) m[y] = 8;
      for (y = 144; y < 256; ++y) m[y] = 9;
      for (y = 256; y < 280; ++y) m[y] = 7;
      for (y = 280; y < 288; ++y) m[y] = 8;
      let _ = new d(32);
      for (y = 0; y < 32; ++y) _[y] = 5;
      let O = b(m, 9, 1),
        v = b(_, 5, 1),
        L = function (e) {
          let t = e[0];
          for (let a = 1; a < e.length; ++a) e[a] > t && (t = e[a]);
          return t;
        },
        h = function (e, t, a) {
          let n = (t / 8) | 0;
          return ((e[n] | (e[n + 1] << 8)) >> (7 & t)) & a;
        },
        R = function (e, t) {
          let a = (t / 8) | 0;
          return (e[a] | (e[a + 1] << 8) | (e[a + 2] << 16)) >> (7 & t);
        },
        S = function (e) {
          return ((e + 7) / 8) | 0;
        },
        A = function (e, t, a) {
          ((null == t || t < 0) && (t = 0),
            (null == a || a > e.length) && (a = e.length));
          let n = new (
            2 === e.BYTES_PER_ELEMENT ? c : 4 === e.BYTES_PER_ELEMENT ? r : d
          )(a - t);
          return (n.set(e.subarray(t, a)), n);
        },
        N = [
          "unexpected EOF",
          "invalid block type",
          "invalid length/literal",
          "invalid distance",
          "stream finished",
          "no stream handler",
          ,
          "no callback",
          "invalid UTF-8 data",
          "extra field too long",
          "date not in range 1980-2099",
          "filename too long",
          "stream finishing",
          "invalid zip data",
        ];
      var C = function (e, t, a) {
        let n = Error(t || N[e]);
        if (
          ((n.code = e),
            Error.captureStackTrace && Error.captureStackTrace(n, C),
            !a)
        )
          throw n;
        return n;
      };
      let G = function (e, t, a) {
        let n = e.length;
        if (!n || (a && a.f && !a.l)) return t || new d(0);
        let i = !t || a,
          o = !a || a.i;
        (a || (a = {}), t || (t = new d(3 * n)));
        let c = function (e) {
          let a = t.length;
          if (e > a) {
            let n = new d(Math.max(2 * a, e));
            (n.set(t), (t = n));
          }
        },
          r = a.f || 0,
          f = a.p || 0,
          g = a.b || 0,
          I = a.l,
          T = a.d,
          y = a.m,
          m = a.n,
          _ = 8 * n;
        do {
          if (!I) {
            r = h(e, f, 1);
            let l = h(e, f + 1, 3);
            if (((f += 3), !l)) {
              let d = e[(G = S(f) + 4) - 4] | (e[G - 3] << 8),
                l = G + d;
              if (l > n) {
                o && C(0);
                break;
              }
              (i && c(g + d),
                t.set(e.subarray(G, l), g),
                (a.b = g += d),
                (a.p = f = 8 * l),
                (a.f = r));
              continue;
            }
            if (1 === l) ((I = O), (T = v), (y = 9), (m = 5));
            else if (2 === l) {
              let t = h(e, f, 31) + 257,
                a = h(e, f + 10, 15) + 4,
                n = t + h(e, f + 5, 31) + 1;
              f += 14;
              let i = new d(n),
                o = new d(19);
              for (var N = 0; N < a; ++N) o[u[N]] = h(e, f + 3 * N, 7);
              f += 3 * a;
              let c = L(o),
                r = (1 << c) - 1,
                l = b(o, c, 1);
              for (N = 0; N < n;) {
                let t = l[h(e, f, r)];
                if (((f += 15 & t), (G = t >>> 4) < 16)) i[N++] = G;
                else {
                  var G,
                    U = 0;
                  let t = 0;
                  for (
                    16 === G
                      ? ((t = 3 + h(e, f, 3)), (f += 2), (U = i[N - 1]))
                      : 17 === G
                        ? ((t = 3 + h(e, f, 7)), (f += 3))
                        : 18 === G && ((t = 11 + h(e, f, 127)), (f += 7));
                    t--;
                  )
                    i[N++] = U;
                }
              }
              let s = i.subarray(0, t);
              var P = i.subarray(t);
              ((y = L(s)), (m = L(P)), (I = b(s, y, 1)), (T = b(P, m, 1)));
            } else C(1);
            if (f > _) {
              o && C(0);
              break;
            }
          }
          i && c(g + 131072);
          let A = (1 << y) - 1,
            w = (1 << m) - 1,
            V = f;
          for (; ; V = f) {
            let a = (U = I[R(e, f) & A]) >>> 4;
            if ((f += 15 & U) > _) {
              o && C(0);
              break;
            }
            if ((U || C(2), a < 256)) t[g++] = a;
            else {
              if (256 === a) {
                ((V = f), (I = null));
                break;
              }
              {
                let n = a - 254;
                if (a > 264) {
                  var M = l[(N = a - 257)];
                  ((n = h(e, f, (1 << M) - 1) + p[N]), (f += M));
                }
                let d = T[R(e, f) & w],
                  r = d >>> 4;
                if (
                  (d || C(3),
                    (f += 15 & d),
                    (P = E[r]),
                    r > 3 &&
                    ((M = s[r]), (P += R(e, f) & ((1 << M) - 1)), (f += M)),
                    f > _)
                ) {
                  o && C(0);
                  break;
                }
                i && c(g + 131072);
                let u = g + n;
                for (; g < u; g += 4)
                  ((t[g] = t[g - P]),
                    (t[g + 1] = t[g + 1 - P]),
                    (t[g + 2] = t[g + 2 - P]),
                    (t[g + 3] = t[g + 3 - P]));
                g = u;
              }
            }
          }
          ((a.l = I),
            (a.p = V),
            (a.b = g),
            (a.f = r),
            I && ((r = 1), (a.m = y), (a.d = T), (a.n = m)));
        } while (!r);
        return g === t.length ? t : A(t, 0, g);
      },
        U = function (e, t) {
          let a = {};
          for (var n in e) a[n] = e[n];
          for (var n in t) a[n] = t[n];
          return a;
        },
        P = function (e, t, a) {
          let n = e(),
            i = e.toString(),
            o = i
              .slice(i.indexOf("[") + 1, i.lastIndexOf("]"))
              .replace(/\s+/g, "")
              .split(",");
          for (let e = 0; e < n.length; ++e) {
            let i = n[e],
              d = o[e];
            if ("function" == typeof i) {
              t += ";" + d + "=";
              let e = i.toString();
              if (i.prototype)
                if (-1 !== e.indexOf("[native code]")) {
                  let a = e.indexOf(" ", 8) + 1;
                  t += e.slice(a, e.indexOf("(", a));
                } else
                  for (let a in ((t += e), i.prototype))
                    t +=
                      ";" +
                      d +
                      ".prototype." +
                      a +
                      "=" +
                      i.prototype[a].toString();
              else t += e;
            } else a[d] = i;
          }
          return [t, a];
        },
        M = [],
        w = function (e) {
          let t = [];
          for (let a in e)
            e[a].buffer && t.push((e[a] = new e[a].constructor(e[a])).buffer);
          return t;
        },
        V = function (e, t, a, n) {
          let i;
          if (!M[a]) {
            let t = "",
              n = {},
              o = e.length - 1;
            for (let a = 0; a < o; ++a)
              ((t = (i = P(e[a], t, n))[0]), (n = i[1]));
            M[a] = P(e[o], t, n);
          }
          let d = U({}, M[a][1]);
          return o(
            M[a][0] +
            ";onmessage=function(e){for(var kz in e.data)self[kz]=e.data[kz];onmessage=" +
            t.toString() +
            "}",
            a,
            d,
            w(d),
            n,
          );
        },
        x = function () {
          return [
            d,
            c,
            r,
            l,
            s,
            u,
            p,
            E,
            O,
            v,
            T,
            N,
            b,
            L,
            h,
            R,
            S,
            A,
            C,
            G,
            B,
            k,
            F,
          ];
        };
      var k = function (e) {
        return postMessage(e, [e.buffer]);
      },
        F = function (e) {
          return e && e.size && new d(e.size);
        };
      let D = function (e, t, a, n, i, o) {
        var d = V(a, n, i, function (e, t) {
          (d.terminate(), o(e, t));
        });
        return (
          d.postMessage([e, t], t.consume ? [e.buffer] : []),
          function () {
            d.terminate();
          }
        );
      },
        Y = function (e, t) {
          return e[t] | (e[t + 1] << 8);
        },
        X = function (e, t) {
          return (
            (e[t] | (e[t + 1] << 8) | (e[t + 2] << 16) | (e[t + 3] << 24)) >>> 0
          );
        };
      function B(e, t) {
        return G(e, t);
      }
      let Q = "undefined" != typeof TextDecoder && new TextDecoder(),
        H = function (e) {
          for (let t = "", a = 0; ;) {
            let n = e[a++],
              i = (n > 127) + (n > 223) + (n > 239);
            if (a + i > e.length) return [t, A(e, a - 1)];
            i
              ? 3 === i
                ? (t += String.fromCharCode(
                  55296 |
                  ((n =
                    (((15 & n) << 18) |
                      ((63 & e[a++]) << 12) |
                      ((63 & e[a++]) << 6) |
                      (63 & e[a++])) -
                    65536) >>
                    10),
                  56320 | (1023 & n),
                ))
                : (t +=
                  1 & i
                    ? String.fromCharCode(((31 & n) << 6) | (63 & e[a++]))
                    : String.fromCharCode(
                      ((15 & n) << 12) |
                      ((63 & e[a++]) << 6) |
                      (63 & e[a++]),
                    ))
              : (t += String.fromCharCode(n));
          }
        };
      function z(e, t) {
        if (t) {
          let t = "";
          for (let a = 0; a < e.length; a += 16384)
            t += String.fromCharCode.apply(null, e.subarray(a, a + 16384));
          return t;
        }
        if (Q) return Q.decode(e);
        {
          let t = H(e),
            a = t[0];
          return (t[1].length && C(8), a);
        }
      }
      let j = function (e, t, a) {
        let n = Y(e, t + 28),
          i = z(e.subarray(t + 46, t + 46 + n), !(2048 & Y(e, t + 8))),
          o = t + 46 + n,
          d = X(e, t + 20),
          c =
            a && 0xffffffff === d
              ? z64e(e, o)
              : [d, X(e, t + 24), X(e, t + 42)],
          r = c[0],
          l = c[1],
          s = c[2];
        return [Y(e, t + 10), r, l, i, o + Y(e, t + 30) + Y(e, t + 32), s];
      },
        W =
          "function" == typeof queueMicrotask
            ? queueMicrotask
            : "function" == typeof setTimeout
              ? setTimeout
              : function (e) {
                e();
              };
      function Z(e, t, a) {
        (a || ((a = t), (t = {})), "function" != typeof a && C(7));
        let n = [],
          i = function () {
            for (let e = 0; e < n.length; ++e) n[e]();
          },
          o = {},
          c = function (e, t) {
            W(function () {
              a(e, t);
            });
          };
        W(function () {
          c = a;
        });
        let r = e.length - 22;
        for (; 0x6054b50 !== X(e, r); --r)
          if (!r || e.length - r > 65558) return (c(C(13, 0, 1), null), i);
        let l = Y(e, r + 8);
        if (l) {
          let a = l,
            s = X(e, r + 16),
            u = 0xffffffff === s || 65535 === a;
          if (u) {
            let t = X(e, r - 12);
            (u = 0x6064b50 === X(e, t)) &&
              ((a = l = X(e, t + 32)), (s = X(e, t + 48)));
          }
          let f = t && t.filter;
          for (let t = 0; t < a; ++t)
            !(function () {
              var t, a, r;
              let g = j(e, s, u),
                p = g[0],
                I = g[1],
                E = g[2],
                T = g[3],
                y = g[4],
                b = g[5],
                m = b + 30 + Y(e, b + 26) + Y(e, b + 28);
              s = y;
              let _ = function (e, t) {
                e ? (i(), c(e, null)) : (t && (o[T] = t), --l || c(null, o));
              };
              if (
                !f ||
                f({ name: T, size: I, originalSize: E, compression: p })
              )
                if (p)
                  if (8 === p) {
                    let i = e.subarray(m, m + I);
                    if (I < 32e4)
                      try {
                        _(null, ((t = new d(E)), G(i, t)));
                      } catch (e) {
                        _(e, null);
                      }
                    else
                      n.push(
                        ((a = { size: E }),
                          (r = _) || ((r = a), (a = {})),
                          "function" != typeof r && C(7),
                          D(
                            i,
                            a,
                            [x],
                            function (e) {
                              var t;
                              return k(((t = e.data[0]), G(t, F(e.data[1]))));
                            },
                            1,
                            r,
                          )),
                      );
                  } else _(C(14, "unknown compression type " + p, 1), null);
                else _(null, A(e, m, m + I));
              else _(null, null);
            })(t);
        } else c(null, {});
        return i;
      }
    },
    7933: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        fetchLottie: function () {
          return u;
        },
        unZipDotLottie: function () {
          return s;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let o = a(3487);
      async function d(e) {
        return await fetch(new URL(e, window?.location?.href).href).then((e) =>
          e.arrayBuffer(),
        );
      }
      async function c(e) {
        return (
          await new Promise((t) => {
            let a = new FileReader();
            (a.readAsDataURL(new Blob([e])), (a.onload = () => t(a.result)));
          })
        ).split(",", 2)[1];
      }
      async function r(e) {
        let t = new Uint8Array(e),
          a = await new Promise((e, a) => {
            (0, o.unzip)(t, (t, n) => (t ? a(t) : e(n)));
          });
        return {
          read: (e) => (0, o.strFromU8)(a[e]),
          readB64: async (e) => await c(a[e]),
        };
      }
      async function l(e, t) {
        if (!("assets" in e)) return e;
        async function a(e) {
          let { p: a } = e;
          if (null == a || null == t.read(`images/${a}`)) return e;
          let n = a.split(".").pop(),
            i = await t.readB64(`images/${a}`);
          if (n?.startsWith("data:")) return ((e.p = n), (e.e = 1), e);
          switch (n) {
            case "svg":
            case "svg+xml":
              e.p = `data:image/svg+xml;base64,${i}`;
              break;
            case "png":
            case "jpg":
            case "jpeg":
            case "gif":
            case "webp":
              e.p = `data:image/${n};base64,${i}`;
              break;
            default:
              e.p = `data:;base64,${i}`;
          }
          return ((e.e = 1), e);
        }
        return (
          (await Promise.all(e.assets.map(a))).map((t, a) => {
            e.assets[a] = t;
          }),
          e
        );
      }
      async function s(e) {
        let t = await r(e),
          a = (function (e) {
            let t = JSON.parse(e);
            if (!("animations" in t)) throw Error("Manifest not found");
            if (0 === t.animations.length)
              throw Error("No animations listed in the manifest");
            return t;
          })(t.read("manifest.json"));
        return (
          await Promise.all(
            a.animations.map((e) =>
              l(JSON.parse(t.read(`animations/${e.id}.json`)), t),
            ),
          )
        )[0];
      }
      async function u(e) {
        let t = await d(e);
        return !(function (e) {
          let t = new Uint8Array(e, 0, 32);
          return 80 === t[0] && 75 === t[1] && 3 === t[2] && 4 === t[3];
        })(t)
          ? JSON.parse(new TextDecoder().decode(t))
          : await s(t);
      }
    },
    3946: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        actionListPlaybackChanged: function () {
          return H;
        },
        animationFrameChanged: function () {
          return F;
        },
        clearRequested: function () {
          return w;
        },
        elementStateChanged: function () {
          return Q;
        },
        eventListenerAdded: function () {
          return V;
        },
        eventStateChanged: function () {
          return k;
        },
        instanceAdded: function () {
          return Y;
        },
        instanceRemoved: function () {
          return B;
        },
        instanceStarted: function () {
          return X;
        },
        mediaQueriesDefined: function () {
          return j;
        },
        parameterChanged: function () {
          return D;
        },
        playbackRequested: function () {
          return P;
        },
        previewRequested: function () {
          return U;
        },
        rawDataImported: function () {
          return A;
        },
        sessionInitialized: function () {
          return N;
        },
        sessionStarted: function () {
          return C;
        },
        sessionStopped: function () {
          return G;
        },
        stopRequested: function () {
          return M;
        },
        testFrameRendered: function () {
          return x;
        },
        viewportWidthChanged: function () {
          return z;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let o = a(7087),
        d = a(9468),
        {
          IX2_RAW_DATA_IMPORTED: c,
          IX2_SESSION_INITIALIZED: r,
          IX2_SESSION_STARTED: l,
          IX2_SESSION_STOPPED: s,
          IX2_PREVIEW_REQUESTED: u,
          IX2_PLAYBACK_REQUESTED: f,
          IX2_STOP_REQUESTED: g,
          IX2_CLEAR_REQUESTED: p,
          IX2_EVENT_LISTENER_ADDED: I,
          IX2_TEST_FRAME_RENDERED: E,
          IX2_EVENT_STATE_CHANGED: T,
          IX2_ANIMATION_FRAME_CHANGED: y,
          IX2_PARAMETER_CHANGED: b,
          IX2_INSTANCE_ADDED: m,
          IX2_INSTANCE_STARTED: _,
          IX2_INSTANCE_REMOVED: O,
          IX2_ELEMENT_STATE_CHANGED: v,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: L,
          IX2_VIEWPORT_WIDTH_CHANGED: h,
          IX2_MEDIA_QUERIES_DEFINED: R,
        } = o.IX2EngineActionTypes,
        { reifyState: S } = d.IX2VanillaUtils,
        A = (e) => ({ type: c, payload: { ...S(e) } }),
        N = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
          type: r,
          payload: { hasBoundaryNodes: e, reducedMotion: t },
        }),
        C = () => ({ type: l }),
        G = () => ({ type: s }),
        U = ({ rawData: e, defer: t }) => ({
          type: u,
          payload: { defer: t, rawData: e },
        }),
        P = ({
          actionTypeId: e = o.ActionTypeConsts.GENERAL_START_ACTION,
          actionListId: t,
          actionItemId: a,
          eventId: n,
          allowEvents: i,
          immediate: d,
          testManual: c,
          verbose: r,
          rawData: l,
        }) => ({
          type: f,
          payload: {
            actionTypeId: e,
            actionListId: t,
            actionItemId: a,
            testManual: c,
            eventId: n,
            allowEvents: i,
            immediate: d,
            verbose: r,
            rawData: l,
          },
        }),
        M = (e) => ({ type: g, payload: { actionListId: e } }),
        w = () => ({ type: p }),
        V = (e, t) => ({ type: I, payload: { target: e, listenerParams: t } }),
        x = (e = 1) => ({ type: E, payload: { step: e } }),
        k = (e, t) => ({ type: T, payload: { stateKey: e, newState: t } }),
        F = (e, t) => ({ type: y, payload: { now: e, parameters: t } }),
        D = (e, t) => ({ type: b, payload: { key: e, value: t } }),
        Y = (e) => ({ type: m, payload: { ...e } }),
        X = (e, t) => ({ type: _, payload: { instanceId: e, time: t } }),
        B = (e) => ({ type: O, payload: { instanceId: e } }),
        Q = (e, t, a, n) => ({
          type: v,
          payload: { elementId: e, actionTypeId: t, current: a, actionItem: n },
        }),
        H = ({ actionListId: e, isPlaying: t }) => ({
          type: L,
          payload: { actionListId: e, isPlaying: t },
        }),
        z = ({ width: e, mediaQueries: t }) => ({
          type: h,
          payload: { width: e, mediaQueries: t },
        }),
        j = () => ({ type: R });
    },
    6011: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        i = {
          actions: function () {
            return l;
          },
          destroy: function () {
            return p;
          },
          init: function () {
            return g;
          },
          setEnv: function () {
            return f;
          },
          store: function () {
            return u;
          },
        };
      for (var o in i)
        Object.defineProperty(t, o, { enumerable: !0, get: i[o] });
      let d = a(9516),
        c = (n = a(7243)) && n.__esModule ? n : { default: n },
        r = a(1970),
        l = (function (e, t) {
          if (e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var a = s(t);
          if (a && a.has(e)) return a.get(e);
          var n = { __proto__: null },
            i = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var o in e)
            if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
              var d = i ? Object.getOwnPropertyDescriptor(e, o) : null;
              d && (d.get || d.set)
                ? Object.defineProperty(n, o, d)
                : (n[o] = e[o]);
            }
          return ((n.default = e), a && a.set(e, n), n);
        })(a(3946));
      function s(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          a = new WeakMap();
        return (s = function (e) {
          return e ? a : t;
        })(e);
      }
      let u = (0, d.createStore)(c.default);
      function f(e) {
        e() && (0, r.observeRequests)(u);
      }
      function g(e) {
        (p(), (0, r.startEngine)({ store: u, rawData: e, allowEvents: !0 }));
      }
      function p() {
        (0, r.stopEngine)(u);
      }
    },
    5012: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        elementContains: function () {
          return b;
        },
        getChildElements: function () {
          return _;
        },
        getClosestElement: function () {
          return v;
        },
        getProperty: function () {
          return p;
        },
        getQuerySelector: function () {
          return E;
        },
        getRefType: function () {
          return L;
        },
        getSiblingElements: function () {
          return O;
        },
        getStyle: function () {
          return g;
        },
        getValidDocument: function () {
          return T;
        },
        isSiblingNode: function () {
          return m;
        },
        matchSelector: function () {
          return I;
        },
        queryDocument: function () {
          return y;
        },
        setStyle: function () {
          return f;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let o = a(9468),
        d = a(7087),
        { ELEMENT_MATCHES: c } = o.IX2BrowserSupport,
        {
          IX2_ID_DELIMITER: r,
          HTML_ELEMENT: l,
          PLAIN_OBJECT: s,
          WF_PAGE: u,
        } = d.IX2EngineConstants;
      function f(e, t, a) {
        e.style[t] = a;
      }
      function g(e, t) {
        return t.startsWith("--")
          ? window
            .getComputedStyle(document.documentElement)
            .getPropertyValue(t)
          : e.style instanceof CSSStyleDeclaration
            ? e.style[t]
            : void 0;
      }
      function p(e, t) {
        return e[t];
      }
      function I(e) {
        return (t) => t[c](e);
      }
      function E({ id: e, selector: t }) {
        if (e) {
          let t = e;
          if (-1 !== e.indexOf(r)) {
            let a = e.split(r),
              n = a[0];
            if (((t = a[1]), n !== document.documentElement.getAttribute(u)))
              return null;
          }
          return `[data-w-id="${t}"], [data-w-id^="${t}_instance"]`;
        }
        return t;
      }
      function T(e) {
        return null == e || e === document.documentElement.getAttribute(u)
          ? document
          : null;
      }
      function y(e, t) {
        return Array.prototype.slice.call(
          document.querySelectorAll(t ? e + " " + t : e),
        );
      }
      function b(e, t) {
        return e.contains(t);
      }
      function m(e, t) {
        return e !== t && e.parentNode === t.parentNode;
      }
      function _(e) {
        let t = [];
        for (let a = 0, { length: n } = e || []; a < n; a++) {
          let { children: n } = e[a],
            { length: i } = n;
          if (i) for (let e = 0; e < i; e++) t.push(n[e]);
        }
        return t;
      }
      function O(e = []) {
        let t = [],
          a = [];
        for (let n = 0, { length: i } = e; n < i; n++) {
          let { parentNode: i } = e[n];
          if (!i || !i.children || !i.children.length || -1 !== a.indexOf(i))
            continue;
          a.push(i);
          let o = i.firstElementChild;
          for (; null != o;)
            (-1 === e.indexOf(o) && t.push(o), (o = o.nextElementSibling));
        }
        return t;
      }
      let v = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
          if (!document.documentElement.contains(e)) return null;
          let a = e;
          do {
            if (a[c] && a[c](t)) return a;
            a = a.parentNode;
          } while (null != a);
          return null;
        };
      function L(e) {
        return null != e && "object" == typeof e
          ? e instanceof Element
            ? l
            : s
          : null;
      }
    },
    1970: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        observeRequests: function () {
          return K;
        },
        startActionGroup: function () {
          return ep;
        },
        startEngine: function () {
          return en;
        },
        stopActionGroup: function () {
          return eg;
        },
        stopAllActionGroups: function () {
          return ef;
        },
        stopEngine: function () {
          return ei;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let o = y(a(9777)),
        d = y(a(4738)),
        c = y(a(4659)),
        r = y(a(3452)),
        l = y(a(6633)),
        s = y(a(3729)),
        u = y(a(2397)),
        f = y(a(5082)),
        g = a(7087),
        p = a(9468),
        I = a(3946),
        E = (function (e, t) {
          if (e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var a = b(t);
          if (a && a.has(e)) return a.get(e);
          var n = { __proto__: null },
            i = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var o in e)
            if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
              var d = i ? Object.getOwnPropertyDescriptor(e, o) : null;
              d && (d.get || d.set)
                ? Object.defineProperty(n, o, d)
                : (n[o] = e[o]);
            }
          return ((n.default = e), a && a.set(e, n), n);
        })(a(5012)),
        T = y(a(8955));
      function y(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function b(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          a = new WeakMap();
        return (b = function (e) {
          return e ? a : t;
        })(e);
      }
      let m = Object.keys(g.QuickEffectIds),
        _ = (e) => m.includes(e),
        {
          COLON_DELIMITER: O,
          BOUNDARY_SELECTOR: v,
          HTML_ELEMENT: L,
          RENDER_GENERAL: h,
          W_MOD_IX: R,
        } = g.IX2EngineConstants,
        {
          getAffectedElements: S,
          getElementId: A,
          getDestinationValues: N,
          observeStore: C,
          getInstanceId: G,
          renderHTMLElement: U,
          clearAllStyles: P,
          getMaxDurationItemIndex: M,
          getComputedStyle: w,
          getInstanceOrigin: V,
          reduceListToGroup: x,
          shouldNamespaceEventParameter: k,
          getNamespacedParameterId: F,
          shouldAllowMediaQuery: D,
          cleanupHTMLElement: Y,
          clearObjectCache: X,
          stringifyTarget: B,
          mediaQueriesEqual: Q,
          shallowEqual: H,
        } = p.IX2VanillaUtils,
        {
          isPluginType: z,
          createPluginInstance: j,
          getPluginDuration: W,
        } = p.IX2VanillaPlugins,
        Z = navigator.userAgent,
        $ = Z.match(/iPad/i) || Z.match(/iPhone/);
      function K(e) {
        (C({ store: e, select: ({ ixRequest: e }) => e.preview, onChange: q }),
          C({
            store: e,
            select: ({ ixRequest: e }) => e.playback,
            onChange: ee,
          }),
          C({ store: e, select: ({ ixRequest: e }) => e.stop, onChange: et }),
          C({ store: e, select: ({ ixRequest: e }) => e.clear, onChange: ea }));
      }
      function q({ rawData: e, defer: t }, a) {
        let n = () => {
          (en({ store: a, rawData: e, allowEvents: !0 }), J());
        };
        t ? setTimeout(n, 0) : n();
      }
      function J() {
        document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
      }
      function ee(e, t) {
        let {
          actionTypeId: a,
          actionListId: n,
          actionItemId: i,
          eventId: o,
          allowEvents: d,
          immediate: c,
          testManual: r,
          verbose: l = !0,
        } = e,
          { rawData: s } = e;
        if (n && i && s && c) {
          let e = s.actionLists[n];
          e && (s = x({ actionList: e, actionItemId: i, rawData: s }));
        }
        if (
          (en({ store: t, rawData: s, allowEvents: d, testManual: r }),
            (n && a === g.ActionTypeConsts.GENERAL_START_ACTION) || _(a))
        ) {
          (eg({ store: t, actionListId: n }),
            eu({ store: t, actionListId: n, eventId: o }));
          let e = ep({
            store: t,
            eventId: o,
            actionListId: n,
            immediate: c,
            verbose: l,
          });
          l &&
            e &&
            t.dispatch(
              (0, I.actionListPlaybackChanged)({
                actionListId: n,
                isPlaying: !c,
              }),
            );
        }
      }
      function et({ actionListId: e }, t) {
        (e ? eg({ store: t, actionListId: e }) : ef({ store: t }), ei(t));
      }
      function ea(e, t) {
        (ei(t), P({ store: t, elementApi: E }));
      }
      function en({ store: e, rawData: t, allowEvents: a, testManual: n }) {
        let { ixSession: i } = e.getState();
        if ((t && e.dispatch((0, I.rawDataImported)(t)), !i.active)) {
          (e.dispatch(
            (0, I.sessionInitialized)({
              hasBoundaryNodes: !!document.querySelector(v),
              reducedMotion:
                document.body.hasAttribute("data-wf-ix-vacation") &&
                window.matchMedia("(prefers-reduced-motion)").matches,
            }),
          ),
            a) &&
            ((function (e) {
              let { ixData: t } = e.getState(),
                { eventTypeMap: a } = t;
              (ec(e),
                (0, u.default)(a, (t, a) => {
                  let n = T.default[a];
                  if (!n)
                    return void console.warn(
                      `IX2 event type not configured: ${a}`,
                    );
                  !(function ({ logic: e, store: t, events: a }) {
                    !(function (e) {
                      if (!$) return;
                      let t = {},
                        a = "";
                      for (let n in e) {
                        let { eventTypeId: i, target: o } = e[n],
                          d = E.getQuerySelector(o);
                        t[d] ||
                          ((i === g.EventTypeConsts.MOUSE_CLICK ||
                            i === g.EventTypeConsts.MOUSE_SECOND_CLICK) &&
                            ((t[d] = !0),
                              (a +=
                                d +
                                "{cursor: pointer;touch-action: manipulation;}")));
                      }
                      if (a) {
                        let e = document.createElement("style");
                        ((e.textContent = a), document.body.appendChild(e));
                      }
                    })(a);
                    let { types: n, handler: i } = e,
                      { ixData: r } = t.getState(),
                      { actionLists: l } = r,
                      s = er(a, es);
                    if (!(0, c.default)(s)) return;
                    (0, u.default)(s, (e, n) => {
                      let i = a[n],
                        {
                          action: c,
                          id: s,
                          mediaQueries: u = r.mediaQueryKeys,
                        } = i,
                        { actionListId: f } = c.config;
                      (Q(u, r.mediaQueryKeys) ||
                        t.dispatch((0, I.mediaQueriesDefined)()),
                        c.actionTypeId ===
                        g.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION &&
                        (Array.isArray(i.config)
                          ? i.config
                          : [i.config]
                        ).forEach((a) => {
                          let { continuousParameterGroupId: n } = a,
                            i = (0, d.default)(
                              l,
                              `${f}.continuousParameterGroups`,
                              [],
                            ),
                            c = (0, o.default)(i, ({ id: e }) => e === n),
                            r = (a.smoothing || 0) / 100,
                            u = (a.restingState || 0) / 100;
                          c &&
                            e.forEach((e, n) => {
                              !(function ({
                                store: e,
                                eventStateKey: t,
                                eventTarget: a,
                                eventId: n,
                                eventConfig: i,
                                actionListId: o,
                                parameterGroup: c,
                                smoothing: r,
                                restingValue: l,
                              }) {
                                let { ixData: s, ixSession: u } =
                                  e.getState(),
                                  { events: f } = s,
                                  p = f[n],
                                  { eventTypeId: I } = p,
                                  T = {},
                                  y = {},
                                  b = [],
                                  { continuousActionGroups: m } = c,
                                  { id: _ } = c;
                                k(I, i) && (_ = F(t, _));
                                let L =
                                  u.hasBoundaryNodes && a
                                    ? E.getClosestElement(a, v)
                                    : null;
                                (m.forEach((e) => {
                                  let { keyframe: t, actionItems: n } = e;
                                  n.forEach((e) => {
                                    let { actionTypeId: n } = e,
                                      { target: i } = e.config;
                                    if (!i) return;
                                    let o = i.boundaryMode ? L : null,
                                      d = B(i) + O + n;
                                    if (
                                      ((y[d] = (function (e = [], t, a) {
                                        let n,
                                          i = [...e];
                                        return (
                                          i.some(
                                            (e, a) =>
                                              e.keyframe === t &&
                                              ((n = a), !0),
                                          ),
                                          null == n &&
                                          ((n = i.length),
                                            i.push({
                                              keyframe: t,
                                              actionItems: [],
                                            })),
                                          i[n].actionItems.push(a),
                                          i
                                        );
                                      })(y[d], t, e)),
                                        !T[d])
                                    ) {
                                      T[d] = !0;
                                      let { config: t } = e;
                                      S({
                                        config: t,
                                        event: p,
                                        eventTarget: a,
                                        elementRoot: o,
                                        elementApi: E,
                                      }).forEach((e) => {
                                        b.push({ element: e, key: d });
                                      });
                                    }
                                  });
                                }),
                                  b.forEach(({ element: t, key: a }) => {
                                    let i = y[a],
                                      c = (0, d.default)(
                                        i,
                                        "[0].actionItems[0]",
                                        {},
                                      ),
                                      { actionTypeId: s } = c,
                                      u = (
                                        s === g.ActionTypeConsts.PLUGIN_RIVE
                                          ? 0 ===
                                          (
                                            c.config?.target
                                              ?.selectorGuids || []
                                          ).length
                                          : z(s)
                                      )
                                        ? j(s)?.(t, c)
                                        : null,
                                      f = N(
                                        {
                                          element: t,
                                          actionItem: c,
                                          elementApi: E,
                                        },
                                        u,
                                      );
                                    eI({
                                      store: e,
                                      element: t,
                                      eventId: n,
                                      actionListId: o,
                                      actionItem: c,
                                      destination: f,
                                      continuous: !0,
                                      parameterId: _,
                                      actionGroups: i,
                                      smoothing: r,
                                      restingValue: l,
                                      pluginInstance: u,
                                    });
                                  }));
                              })({
                                store: t,
                                eventStateKey: s + O + n,
                                eventTarget: e,
                                eventId: s,
                                eventConfig: a,
                                actionListId: f,
                                parameterGroup: c,
                                smoothing: r,
                                restingValue: u,
                              });
                            });
                        }),
                        (c.actionTypeId ===
                          g.ActionTypeConsts.GENERAL_START_ACTION ||
                          _(c.actionTypeId)) &&
                        eu({ store: t, actionListId: f, eventId: s }));
                    });
                    let p = (e) => {
                      let { ixSession: n } = t.getState();
                      el(s, (o, d, c) => {
                        let l = a[d],
                          s = n.eventState[c],
                          { action: u, mediaQueries: f = r.mediaQueryKeys } =
                            l;
                        if (!D(f, n.mediaQueryKey)) return;
                        let p = (a = {}) => {
                          let n = i(
                            {
                              store: t,
                              element: o,
                              event: l,
                              eventConfig: a,
                              nativeEvent: e,
                              eventStateKey: c,
                            },
                            s,
                          );
                          H(n, s) ||
                            t.dispatch((0, I.eventStateChanged)(c, n));
                        };
                        u.actionTypeId ===
                          g.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION
                          ? (Array.isArray(l.config)
                            ? l.config
                            : [l.config]
                          ).forEach(p)
                          : p();
                      });
                    },
                      T = (0, f.default)(p, 12),
                      y = ({ target: e = document, types: a, throttle: n }) => {
                        a.split(" ")
                          .filter(Boolean)
                          .forEach((a) => {
                            let i = n ? T : p;
                            (e.addEventListener(a, i),
                              t.dispatch((0, I.eventListenerAdded)(e, [a, i])));
                          });
                      };
                    Array.isArray(n)
                      ? n.forEach(y)
                      : "string" == typeof n && y(e);
                  })({ logic: n, store: e, events: t });
                }));
              let { ixSession: n } = e.getState();
              n.eventListeners.length &&
                (function (e) {
                  let t = () => {
                    ec(e);
                  };
                  (ed.forEach((a) => {
                    (window.addEventListener(a, t),
                      e.dispatch((0, I.eventListenerAdded)(window, [a, t])));
                  }),
                    t());
                })(e);
            })(e),
              (function () {
                let { documentElement: e } = document;
                -1 === e.className.indexOf(R) && (e.className += ` ${R}`);
              })(),
              e.getState().ixSession.hasDefinedMediaQueries &&
              C({
                store: e,
                select: ({ ixSession: e }) => e.mediaQueryKey,
                onChange: () => {
                  (ei(e),
                    P({ store: e, elementApi: E }),
                    en({ store: e, allowEvents: !0 }),
                    J());
                },
              }));
          (e.dispatch((0, I.sessionStarted)()),
            (function (e, t) {
              let a = (n) => {
                let { ixSession: i, ixParameters: o } = e.getState();
                if (i.active)
                  if ((e.dispatch((0, I.animationFrameChanged)(n, o)), t)) {
                    let t = C({
                      store: e,
                      select: ({ ixSession: e }) => e.tick,
                      onChange: (e) => {
                        (a(e), t());
                      },
                    });
                  } else requestAnimationFrame(a);
              };
              a(window.performance.now());
            })(e, n));
        }
      }
      function ei(e) {
        let { ixSession: t } = e.getState();
        if (t.active) {
          let { eventListeners: a } = t;
          (a.forEach(eo), X(), e.dispatch((0, I.sessionStopped)()));
        }
      }
      function eo({ target: e, listenerParams: t }) {
        e.removeEventListener.apply(e, t);
      }
      let ed = ["resize", "orientationchange"];
      function ec(e) {
        let { ixSession: t, ixData: a } = e.getState(),
          n = window.innerWidth;
        if (n !== t.viewportWidth) {
          let { mediaQueries: t } = a;
          e.dispatch(
            (0, I.viewportWidthChanged)({ width: n, mediaQueries: t }),
          );
        }
      }
      let er = (e, t) => (0, r.default)((0, s.default)(e, t), l.default),
        el = (e, t) => {
          (0, u.default)(e, (e, a) => {
            e.forEach((e, n) => {
              t(e, a, a + O + n);
            });
          });
        },
        es = (e) =>
          S({
            config: { target: e.target, targets: e.targets },
            elementApi: E,
          });
      function eu({ store: e, actionListId: t, eventId: a }) {
        let { ixData: n, ixSession: i } = e.getState(),
          { actionLists: o, events: c } = n,
          r = c[a],
          l = o[t];
        if (l && l.useFirstGroupAsInitialState) {
          let o = (0, d.default)(l, "actionItemGroups[0].actionItems", []);
          if (
            !D(
              (0, d.default)(r, "mediaQueries", n.mediaQueryKeys),
              i.mediaQueryKey,
            )
          )
            return;
          o.forEach((n) => {
            let { config: i, actionTypeId: o } = n,
              d = S({
                config:
                  i?.target?.useEventTarget === !0 &&
                    i?.target?.objectId == null
                    ? { target: r.target, targets: r.targets }
                    : i,
                event: r,
                elementApi: E,
              }),
              c = z(o);
            d.forEach((i) => {
              let d = c ? j(o)?.(i, n) : null;
              eI({
                destination: N({ element: i, actionItem: n, elementApi: E }, d),
                immediate: !0,
                store: e,
                element: i,
                eventId: a,
                actionItem: n,
                actionListId: t,
                pluginInstance: d,
              });
            });
          });
        }
      }
      function ef({ store: e }) {
        let { ixInstances: t } = e.getState();
        (0, u.default)(t, (t) => {
          if (!t.continuous) {
            let { actionListId: a, verbose: n } = t;
            (eE(t, e),
              n &&
              e.dispatch(
                (0, I.actionListPlaybackChanged)({
                  actionListId: a,
                  isPlaying: !1,
                }),
              ));
          }
        });
      }
      function eg({
        store: e,
        eventId: t,
        eventTarget: a,
        eventStateKey: n,
        actionListId: i,
      }) {
        let { ixInstances: o, ixSession: c } = e.getState(),
          r = c.hasBoundaryNodes && a ? E.getClosestElement(a, v) : null;
        (0, u.default)(o, (a) => {
          let o = (0, d.default)(a, "actionItem.config.target.boundaryMode"),
            c = !n || a.eventStateKey === n;
          if (a.actionListId === i && a.eventId === t && c) {
            if (r && o && !E.elementContains(r, a.element)) return;
            (eE(a, e),
              a.verbose &&
              e.dispatch(
                (0, I.actionListPlaybackChanged)({
                  actionListId: i,
                  isPlaying: !1,
                }),
              ));
          }
        });
      }
      function ep({
        store: e,
        eventId: t,
        eventTarget: a,
        eventStateKey: n,
        actionListId: i,
        groupIndex: o = 0,
        immediate: c,
        verbose: r,
      }) {
        let { ixData: l, ixSession: s } = e.getState(),
          { events: u } = l,
          f = u[t] || {},
          { mediaQueries: g = l.mediaQueryKeys } = f,
          { actionItemGroups: p, useFirstGroupAsInitialState: I } = (0,
            d.default)(l, `actionLists.${i}`, {});
        if (!p || !p.length) return !1;
        (o >= p.length && (0, d.default)(f, "config.loop") && (o = 0),
          0 === o && I && o++);
        let T =
          (0 === o || (1 === o && I)) && _(f.action?.actionTypeId)
            ? f.config.delay
            : void 0,
          y = (0, d.default)(p, [o, "actionItems"], []);
        if (!y.length || !D(g, s.mediaQueryKey)) return !1;
        let b = s.hasBoundaryNodes && a ? E.getClosestElement(a, v) : null,
          m = M(y),
          O = !1;
        return (
          y.forEach((d, l) => {
            let { config: s, actionTypeId: u } = d,
              g = z(u),
              { target: p } = s;
            p &&
              S({
                config: s,
                event: f,
                eventTarget: a,
                elementRoot: p.boundaryMode ? b : null,
                elementApi: E,
              }).forEach((s, f) => {
                let p = g ? j(u)?.(s, d) : null,
                  I = g ? W(u)(s, d) : null;
                O = !0;
                let y = w({ element: s, actionItem: d }),
                  b = N({ element: s, actionItem: d, elementApi: E }, p);
                eI({
                  store: e,
                  element: s,
                  actionItem: d,
                  eventId: t,
                  eventTarget: a,
                  eventStateKey: n,
                  actionListId: i,
                  groupIndex: o,
                  isCarrier: m === l && 0 === f,
                  computedStyle: y,
                  destination: b,
                  immediate: c,
                  verbose: r,
                  pluginInstance: p,
                  pluginDuration: I,
                  instanceDelay: T,
                });
              });
          }),
          O
        );
      }
      function eI(e) {
        let t,
          { store: a, computedStyle: n, ...i } = e,
          {
            element: o,
            actionItem: d,
            immediate: c,
            pluginInstance: r,
            continuous: l,
            restingValue: s,
            eventId: u,
          } = i,
          f = G(),
          { ixElements: p, ixSession: T, ixData: y } = a.getState(),
          b = A(p, o),
          { refState: m } = p[b] || {},
          _ = E.getRefType(o),
          O = T.reducedMotion && g.ReducedMotionTypes[d.actionTypeId];
        if (O && l)
          switch (y.events[u]?.eventTypeId) {
            case g.EventTypeConsts.MOUSE_MOVE:
            case g.EventTypeConsts.MOUSE_MOVE_IN_VIEWPORT:
              t = s;
              break;
            default:
              t = 0.5;
          }
        let v = V(o, m, n, d, E, r);
        if (
          (a.dispatch(
            (0, I.instanceAdded)({
              instanceId: f,
              elementId: b,
              origin: v,
              refType: _,
              skipMotion: O,
              skipToValue: t,
              ...i,
            }),
          ),
            eT(document.body, "ix2-animation-started", f),
            c)
        )
          return void (function (e, t) {
            let { ixParameters: a } = e.getState();
            (e.dispatch((0, I.instanceStarted)(t, 0)),
              e.dispatch((0, I.animationFrameChanged)(performance.now(), a)));
            let { ixInstances: n } = e.getState();
            ey(n[t], e);
          })(a, f);
        (C({ store: a, select: ({ ixInstances: e }) => e[f], onChange: ey }),
          l || a.dispatch((0, I.instanceStarted)(f, T.tick)));
      }
      function eE(e, t) {
        eT(document.body, "ix2-animation-stopping", {
          instanceId: e.id,
          state: t.getState(),
        });
        let { elementId: a, actionItem: n } = e,
          { ixElements: i } = t.getState(),
          { ref: o, refType: d } = i[a] || {};
        (d === L && Y(o, n, E), t.dispatch((0, I.instanceRemoved)(e.id)));
      }
      function eT(e, t, a) {
        let n = document.createEvent("CustomEvent");
        (n.initCustomEvent(t, !0, !0, a), e.dispatchEvent(n));
      }
      function ey(e, t) {
        let {
          active: a,
          continuous: n,
          complete: i,
          elementId: o,
          actionItem: d,
          actionTypeId: c,
          renderType: r,
          current: l,
          groupIndex: s,
          eventId: u,
          eventTarget: f,
          eventStateKey: g,
          actionListId: p,
          isCarrier: T,
          styleProp: y,
          verbose: b,
          pluginInstance: m,
        } = e,
          { ixData: _, ixSession: O } = t.getState(),
          { events: v } = _,
          { mediaQueries: R = _.mediaQueryKeys } = v && v[u] ? v[u] : {};
        if (D(R, O.mediaQueryKey) && (n || a || i)) {
          if (l || (r === h && i)) {
            t.dispatch((0, I.elementStateChanged)(o, c, l, d));
            let { ixElements: e } = t.getState(),
              { ref: a, refType: n, refState: i } = e[o] || {},
              s = i && i[c];
            (n === L || z(c)) && U(a, i, s, u, d, y, E, r, m);
          }
          if (i) {
            if (T) {
              let e = ep({
                store: t,
                eventId: u,
                eventTarget: f,
                eventStateKey: g,
                actionListId: p,
                groupIndex: s + 1,
                verbose: b,
              });
              b &&
                !e &&
                t.dispatch(
                  (0, I.actionListPlaybackChanged)({
                    actionListId: p,
                    isPlaying: !1,
                  }),
                );
            }
            eE(e, t);
          }
        }
      }
    },
    8955: function (e, t, a) {
      "use strict";
      let n;
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "default", {
          enumerable: !0,
          get: function () {
            return eg;
          },
        }));
      let i = u(a(5801)),
        o = u(a(4738)),
        d = u(a(3789)),
        c = a(7087),
        r = a(1970),
        l = a(3946),
        s = a(9468);
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
      let {
        MOUSE_CLICK: f,
        MOUSE_SECOND_CLICK: g,
        MOUSE_DOWN: p,
        MOUSE_UP: I,
        MOUSE_OVER: E,
        MOUSE_OUT: T,
        DROPDOWN_CLOSE: y,
        DROPDOWN_OPEN: b,
        SLIDER_ACTIVE: m,
        SLIDER_INACTIVE: _,
        TAB_ACTIVE: O,
        TAB_INACTIVE: v,
        NAVBAR_CLOSE: L,
        NAVBAR_OPEN: h,
        MOUSE_MOVE: R,
        PAGE_SCROLL_DOWN: S,
        SCROLL_INTO_VIEW: A,
        SCROLL_OUT_OF_VIEW: N,
        PAGE_SCROLL_UP: C,
        SCROLLING_IN_VIEW: G,
        PAGE_FINISH: U,
        ECOMMERCE_CART_CLOSE: P,
        ECOMMERCE_CART_OPEN: M,
        PAGE_START: w,
        PAGE_SCROLL: V,
      } = c.EventTypeConsts,
        x = "COMPONENT_ACTIVE",
        k = "COMPONENT_INACTIVE",
        { COLON_DELIMITER: F } = c.IX2EngineConstants,
        { getNamespacedParameterId: D } = s.IX2VanillaUtils,
        Y = (e) => (t) => !!("object" == typeof t && e(t)) || t,
        X = Y(({ element: e, nativeEvent: t }) => e === t.target),
        B = Y(({ element: e, nativeEvent: t }) => e.contains(t.target)),
        Q = (0, i.default)([X, B]),
        H = (e, t) => {
          if (t) {
            let { ixData: a } = e.getState(),
              { events: n } = a,
              i = n[t];
            if (i && !ee[i.eventTypeId]) return i;
          }
          return null;
        },
        z = ({ store: e, event: t }) => {
          let { action: a } = t,
            { autoStopEventId: n } = a.config;
          return !!H(e, n);
        },
        j = ({ store: e, event: t, element: a, eventStateKey: n }, i) => {
          let { action: d, id: c } = t,
            { actionListId: l, autoStopEventId: s } = d.config,
            u = H(e, s);
          return (
            u &&
            (0, r.stopActionGroup)({
              store: e,
              eventId: s,
              eventTarget: a,
              eventStateKey: s + F + n.split(F)[1],
              actionListId: (0, o.default)(u, "action.config.actionListId"),
            }),
            (0, r.stopActionGroup)({
              store: e,
              eventId: c,
              eventTarget: a,
              eventStateKey: n,
              actionListId: l,
            }),
            (0, r.startActionGroup)({
              store: e,
              eventId: c,
              eventTarget: a,
              eventStateKey: n,
              actionListId: l,
            }),
            i
          );
        },
        W = (e, t) => (a, n) => (!0 === e(a, n) ? t(a, n) : n),
        Z = { handler: W(Q, j) },
        $ = { ...Z, types: [x, k].join(" ") },
        K = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ],
        q = "mouseover mouseout",
        J = { types: K },
        ee = { PAGE_START: w, PAGE_FINISH: U },
        et = (() => {
          let e = void 0 !== window.pageXOffset,
            t =
              "CSS1Compat" === document.compatMode
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : t.scrollLeft,
            scrollTop: e ? window.pageYOffset : t.scrollTop,
            stiffScrollTop: (0, d.default)(
              e ? window.pageYOffset : t.scrollTop,
              0,
              t.scrollHeight - window.innerHeight,
            ),
            scrollWidth: t.scrollWidth,
            scrollHeight: t.scrollHeight,
            clientWidth: t.clientWidth,
            clientHeight: t.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })(),
        ea = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          ),
        en = ({ element: e, nativeEvent: t }) => {
          let { type: a, target: n, relatedTarget: i } = t,
            o = e.contains(n);
          if ("mouseover" === a && o) return !0;
          let d = e.contains(i);
          return "mouseout" === a && !!o && !!d;
        },
        ei = (e) => {
          let {
            element: t,
            event: { config: a },
          } = e,
            { clientWidth: n, clientHeight: i } = et(),
            o = a.scrollOffsetValue,
            d = "PX" === a.scrollOffsetUnit ? o : (i * (o || 0)) / 100;
          return ea(t.getBoundingClientRect(), {
            left: 0,
            top: d,
            right: n,
            bottom: i - d,
          });
        },
        eo = (e) => (t, a) => {
          let { type: n } = t.nativeEvent,
            i = -1 !== [x, k].indexOf(n) ? n === x : a.isActive,
            o = { ...a, isActive: i };
          return ((!a || o.isActive !== a.isActive) && e(t, o)) || o;
        },
        ed = (e) => (t, a) => {
          let n = { elementHovered: en(t) };
          return (
            ((a ? n.elementHovered !== a.elementHovered : n.elementHovered) &&
              e(t, n)) ||
            n
          );
        },
        ec =
          (e) =>
            (t, a = {}) => {
              let n,
                i,
                { stiffScrollTop: o, scrollHeight: d, innerHeight: c } = et(),
                {
                  event: { config: r, eventTypeId: l },
                } = t,
                { scrollOffsetValue: s, scrollOffsetUnit: u } = r,
                f = d - c,
                g = Number((o / f).toFixed(2));
              if (a && a.percentTop === g) return a;
              let p = ("PX" === u ? s : (c * (s || 0)) / 100) / f,
                I = 0;
              a &&
                ((n = g > a.percentTop),
                  (I = (i = a.scrollingDown !== n) ? g : a.anchorTop));
              let E = l === S ? g >= I + p : g <= I - p,
                T = {
                  ...a,
                  percentTop: g,
                  inBounds: E,
                  anchorTop: I,
                  scrollingDown: n,
                };
              return (a && E && (i || T.inBounds !== a.inBounds) && e(t, T)) || T;
            },
        er = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom,
        el =
          (e) =>
            (t, a = { clickCount: 0 }) => {
              let n = { clickCount: (a.clickCount % 2) + 1 };
              return (n.clickCount !== a.clickCount && e(t, n)) || n;
            },
        es = (e = !0) => ({
          ...$,
          handler: W(
            e ? Q : X,
            eo((e, t) => (t.isActive ? Z.handler(e, t) : t)),
          ),
        }),
        eu = (e = !0) => ({
          ...$,
          handler: W(
            e ? Q : X,
            eo((e, t) => (t.isActive ? t : Z.handler(e, t))),
          ),
        }),
        ef = {
          ...J,
          handler:
            ((n = (e, t) => {
              let { elementVisible: a } = t,
                { event: n, store: i } = e,
                { ixData: o } = i.getState(),
                { events: d } = o;
              return !d[n.action.config.autoStopEventId] && t.triggered
                ? t
                : (n.eventTypeId === A) === a
                  ? (j(e), { ...t, triggered: !0 })
                  : t;
            }),
              (e, t) => {
                let a = { ...t, elementVisible: ei(e) };
                return (
                  ((t
                    ? a.elementVisible !== t.elementVisible
                    : a.elementVisible) &&
                    n(e, a)) ||
                  a
                );
              }),
        },
        eg = {
          [m]: es(),
          [_]: eu(),
          [b]: es(),
          [y]: eu(),
          [h]: es(!1),
          [L]: eu(!1),
          [O]: es(),
          [v]: eu(),
          [M]: { types: "ecommerce-cart-open", handler: W(Q, j) },
          [P]: { types: "ecommerce-cart-close", handler: W(Q, j) },
          [f]: {
            types: "click",
            handler: W(
              Q,
              el((e, { clickCount: t }) => {
                z(e) ? 1 === t && j(e) : j(e);
              }),
            ),
          },
          [g]: {
            types: "click",
            handler: W(
              Q,
              el((e, { clickCount: t }) => {
                2 === t && j(e);
              }),
            ),
          },
          [p]: { ...Z, types: "mousedown" },
          [I]: { ...Z, types: "mouseup" },
          [E]: {
            types: q,
            handler: W(
              Q,
              ed((e, t) => {
                t.elementHovered && j(e);
              }),
            ),
          },
          [T]: {
            types: q,
            handler: W(
              Q,
              ed((e, t) => {
                t.elementHovered || j(e);
              }),
            ),
          },
          [R]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: a,
                nativeEvent: n,
                eventStateKey: i,
              },
              o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 },
            ) => {
              let {
                basedOn: d,
                selectedAxis: r,
                continuousParameterGroupId: s,
                reverse: u,
                restingState: f = 0,
              } = a,
                {
                  clientX: g = o.clientX,
                  clientY: p = o.clientY,
                  pageX: I = o.pageX,
                  pageY: E = o.pageY,
                } = n,
                T = "X_AXIS" === r,
                y = "mouseout" === n.type,
                b = f / 100,
                m = s,
                _ = !1;
              switch (d) {
                case c.EventBasedOn.VIEWPORT:
                  b = T
                    ? Math.min(g, window.innerWidth) / window.innerWidth
                    : Math.min(p, window.innerHeight) / window.innerHeight;
                  break;
                case c.EventBasedOn.PAGE: {
                  let {
                    scrollLeft: e,
                    scrollTop: t,
                    scrollWidth: a,
                    scrollHeight: n,
                  } = et();
                  b = T ? Math.min(e + I, a) / a : Math.min(t + E, n) / n;
                  break;
                }
                case c.EventBasedOn.ELEMENT:
                default: {
                  m = D(i, s);
                  let e = 0 === n.type.indexOf("mouse");
                  if (e && !0 !== Q({ element: t, nativeEvent: n })) break;
                  let a = t.getBoundingClientRect(),
                    { left: o, top: d, width: c, height: r } = a;
                  if (!e && !er({ left: g, top: p }, a)) break;
                  ((_ = !0), (b = T ? (g - o) / c : (p - d) / r));
                }
              }
              return (
                y && (b > 0.95 || b < 0.05) && (b = Math.round(b)),
                (d !== c.EventBasedOn.ELEMENT || _ || _ !== o.elementHovered) &&
                ((b = u ? 1 - b : b),
                  e.dispatch((0, l.parameterChanged)(m, b))),
                {
                  elementHovered: _,
                  clientX: g,
                  clientY: p,
                  pageX: I,
                  pageY: E,
                }
              );
            },
          },
          [V]: {
            types: K,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: a, reverse: n } = t,
                { scrollTop: i, scrollHeight: o, clientHeight: d } = et(),
                c = i / (o - d);
              ((c = n ? 1 - c : c), e.dispatch((0, l.parameterChanged)(a, c)));
            },
          },
          [G]: {
            types: K,
            handler: (
              { element: e, store: t, eventConfig: a, eventStateKey: n },
              i = { scrollPercent: 0 },
            ) => {
              let {
                scrollLeft: o,
                scrollTop: d,
                scrollWidth: r,
                scrollHeight: s,
                clientHeight: u,
              } = et(),
                {
                  basedOn: f,
                  selectedAxis: g,
                  continuousParameterGroupId: p,
                  startsEntering: I,
                  startsExiting: E,
                  addEndOffset: T,
                  addStartOffset: y,
                  addOffsetValue: b = 0,
                  endOffsetValue: m = 0,
                } = a;
              if (f === c.EventBasedOn.VIEWPORT) {
                let e = "X_AXIS" === g ? o / r : d / s;
                return (
                  e !== i.scrollPercent &&
                  t.dispatch((0, l.parameterChanged)(p, e)),
                  { scrollPercent: e }
                );
              }
              {
                let a = D(n, p),
                  o = e.getBoundingClientRect(),
                  d = (y ? b : 0) / 100,
                  c = (T ? m : 0) / 100;
                ((d = I ? d : 1 - d), (c = E ? c : 1 - c));
                let r = o.top + Math.min(o.height * d, u),
                  f = Math.min(u + (o.top + o.height * c - r), s),
                  g = Math.min(Math.max(0, u - r), f) / f;
                return (
                  g !== i.scrollPercent &&
                  t.dispatch((0, l.parameterChanged)(a, g)),
                  { scrollPercent: g }
                );
              }
            },
          },
          [A]: ef,
          [N]: ef,
          [S]: {
            ...J,
            handler: ec((e, t) => {
              t.scrollingDown && j(e);
            }),
          },
          [C]: {
            ...J,
            handler: ec((e, t) => {
              t.scrollingDown || j(e);
            }),
          },
          [U]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: W(X, (e, t) => {
              let a = { finished: "complete" === document.readyState };
              return (a.finished && !(t && t.finshed) && j(e), a);
            }),
          },
          [w]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: W(X, (e, t) => (t || j(e), { started: !0 })),
          },
        };
    },
    4609: function (e, t, a) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ixData", {
          enumerable: !0,
          get: function () {
            return i;
          },
        }));
      let { IX2_RAW_DATA_IMPORTED: n } = a(7087).IX2EngineActionTypes,
        i = (e = Object.freeze({}), t) =>
          t.type === n ? t.payload.ixData || Object.freeze({}) : e;
    },
    7718: function (e, t, a) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ixInstances", {
          enumerable: !0,
          get: function () {
            return _;
          },
        }));
      let n = a(7087),
        i = a(9468),
        o = a(1185),
        {
          IX2_RAW_DATA_IMPORTED: d,
          IX2_SESSION_STOPPED: c,
          IX2_INSTANCE_ADDED: r,
          IX2_INSTANCE_STARTED: l,
          IX2_INSTANCE_REMOVED: s,
          IX2_ANIMATION_FRAME_CHANGED: u,
        } = n.IX2EngineActionTypes,
        {
          optimizeFloat: f,
          applyEasing: g,
          createBezierEasing: p,
        } = i.IX2EasingUtils,
        { RENDER_GENERAL: I } = n.IX2EngineConstants,
        {
          getItemConfigByKey: E,
          getRenderType: T,
          getStyleProp: y,
        } = i.IX2VanillaUtils,
        b = (e, t) => {
          let a,
            n,
            i,
            d,
            {
              position: c,
              parameterId: r,
              actionGroups: l,
              destinationKeys: s,
              smoothing: u,
              restingValue: p,
              actionTypeId: I,
              customEasingFn: T,
              skipMotion: y,
              skipToValue: b,
            } = e,
            { parameters: m } = t.payload,
            _ = Math.max(1 - u, 0.01),
            O = m[r];
          null == O && ((_ = 1), (O = p));
          let v = f((Math.max(O, 0) || 0) - c),
            L = y ? b : f(c + v * _),
            h = 100 * L;
          if (L === c && e.current) return e;
          for (let e = 0, { length: t } = l; e < t; e++) {
            let { keyframe: t, actionItems: o } = l[e];
            if ((0 === e && (a = o[0]), h >= t)) {
              a = o[0];
              let c = l[e + 1],
                r = c && h !== t;
              ((n = r ? c.actionItems[0] : null),
                r && ((i = t / 100), (d = (c.keyframe - t) / 100)));
            }
          }
          let R = {};
          if (a && !n)
            for (let e = 0, { length: t } = s; e < t; e++) {
              let t = s[e];
              R[t] = E(I, t, a.config);
            }
          else if (a && n && void 0 !== i && void 0 !== d) {
            let e = (L - i) / d,
              t = g(a.config.easing, e, T);
            for (let e = 0, { length: i } = s; e < i; e++) {
              let i = s[e],
                o = E(I, i, a.config),
                d = (E(I, i, n.config) - o) * t + o;
              R[i] = d;
            }
          }
          return (0, o.merge)(e, { position: L, current: R });
        },
        m = (e, t) => {
          let {
            active: a,
            origin: n,
            start: i,
            immediate: d,
            renderType: c,
            verbose: r,
            actionItem: l,
            destination: s,
            destinationKeys: u,
            pluginDuration: p,
            instanceDelay: E,
            customEasingFn: T,
            skipMotion: y,
          } = e,
            b = l.config.easing,
            { duration: m, delay: _ } = l.config;
          (null != p && (m = p),
            (_ = null != E ? E : _),
            c === I ? (m = 0) : (d || y) && (m = _ = 0));
          let { now: O } = t.payload;
          if (a && n) {
            let t = O - (i + _);
            if (r) {
              let t = m + _,
                a = f(Math.min(Math.max(0, (O - i) / t), 1));
              e = (0, o.set)(e, "verboseTimeElapsed", t * a);
            }
            if (t < 0) return e;
            let a = f(Math.min(Math.max(0, t / m), 1)),
              d = g(b, a, T),
              c = {},
              l = null;
            return (
              u.length &&
              (l = u.reduce((e, t) => {
                let a = s[t],
                  i = parseFloat(n[t]) || 0,
                  o = parseFloat(a) - i;
                return ((e[t] = o * d + i), e);
              }, {})),
              (c.current = l),
              (c.position = a),
              1 === a && ((c.active = !1), (c.complete = !0)),
              (0, o.merge)(e, c)
            );
          }
          return e;
        },
        _ = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case d:
              return t.payload.ixInstances || Object.freeze({});
            case c:
              return Object.freeze({});
            case r: {
              let {
                instanceId: a,
                elementId: n,
                actionItem: i,
                eventId: d,
                eventTarget: c,
                eventStateKey: r,
                actionListId: l,
                groupIndex: s,
                isCarrier: u,
                origin: f,
                destination: g,
                immediate: I,
                verbose: E,
                continuous: b,
                parameterId: m,
                actionGroups: _,
                smoothing: O,
                restingValue: v,
                pluginInstance: L,
                pluginDuration: h,
                instanceDelay: R,
                skipMotion: S,
                skipToValue: A,
              } = t.payload,
                { actionTypeId: N } = i,
                C = T(N),
                G = y(C, N),
                U = Object.keys(g).filter(
                  (e) => null != g[e] && "string" != typeof g[e],
                ),
                { easing: P } = i.config;
              return (0, o.set)(e, a, {
                id: a,
                elementId: n,
                active: !1,
                position: 0,
                start: 0,
                origin: f,
                destination: g,
                destinationKeys: U,
                immediate: I,
                verbose: E,
                current: null,
                actionItem: i,
                actionTypeId: N,
                eventId: d,
                eventTarget: c,
                eventStateKey: r,
                actionListId: l,
                groupIndex: s,
                renderType: C,
                isCarrier: u,
                styleProp: G,
                continuous: b,
                parameterId: m,
                actionGroups: _,
                smoothing: O,
                restingValue: v,
                pluginInstance: L,
                pluginDuration: h,
                instanceDelay: R,
                skipMotion: S,
                skipToValue: A,
                customEasingFn:
                  Array.isArray(P) && 4 === P.length ? p(P) : void 0,
              });
            }
            case l: {
              let { instanceId: a, time: n } = t.payload;
              return (0, o.mergeIn)(e, [a], {
                active: !0,
                complete: !1,
                start: n,
              });
            }
            case s: {
              let { instanceId: a } = t.payload;
              if (!e[a]) return e;
              let n = {},
                i = Object.keys(e),
                { length: o } = i;
              for (let t = 0; t < o; t++) {
                let o = i[t];
                o !== a && (n[o] = e[o]);
              }
              return n;
            }
            case u: {
              let a = e,
                n = Object.keys(e),
                { length: i } = n;
              for (let d = 0; d < i; d++) {
                let i = n[d],
                  c = e[i],
                  r = c.continuous ? b : m;
                a = (0, o.set)(a, i, r(c, t));
              }
              return a;
            }
            default:
              return e;
          }
        };
    },
    1540: function (e, t, a) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ixParameters", {
          enumerable: !0,
          get: function () {
            return d;
          },
        }));
      let {
        IX2_RAW_DATA_IMPORTED: n,
        IX2_SESSION_STOPPED: i,
        IX2_PARAMETER_CHANGED: o,
      } = a(7087).IX2EngineActionTypes,
        d = (e = {}, t) => {
          switch (t.type) {
            case n:
              return t.payload.ixParameters || {};
            case i:
              return {};
            case o: {
              let { key: a, value: n } = t.payload;
              return ((e[a] = n), e);
            }
            default:
              return e;
          }
        };
    },
    7243: function (e, t, a) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "default", {
          enumerable: !0,
          get: function () {
            return u;
          },
        }));
      let n = a(9516),
        i = a(4609),
        o = a(628),
        d = a(5862),
        c = a(9468),
        r = a(7718),
        l = a(1540),
        { ixElements: s } = c.IX2ElementsReducer,
        u = (0, n.combineReducers)({
          ixData: i.ixData,
          ixRequest: o.ixRequest,
          ixSession: d.ixSession,
          ixElements: s,
          ixInstances: r.ixInstances,
          ixParameters: l.ixParameters,
        });
    },
    628: function (e, t, a) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ixRequest", {
          enumerable: !0,
          get: function () {
            return u;
          },
        }));
      let n = a(7087),
        i = a(1185),
        {
          IX2_PREVIEW_REQUESTED: o,
          IX2_PLAYBACK_REQUESTED: d,
          IX2_STOP_REQUESTED: c,
          IX2_CLEAR_REQUESTED: r,
        } = n.IX2EngineActionTypes,
        l = { preview: {}, playback: {}, stop: {}, clear: {} },
        s = Object.create(null, {
          [o]: { value: "preview" },
          [d]: { value: "playback" },
          [c]: { value: "stop" },
          [r]: { value: "clear" },
        }),
        u = (e = l, t) => {
          if (t.type in s) {
            let a = [s[t.type]];
            return (0, i.setIn)(e, [a], { ...t.payload });
          }
          return e;
        };
    },
    5862: function (e, t, a) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ixSession", {
          enumerable: !0,
          get: function () {
            return E;
          },
        }));
      let n = a(7087),
        i = a(1185),
        {
          IX2_SESSION_INITIALIZED: o,
          IX2_SESSION_STARTED: d,
          IX2_TEST_FRAME_RENDERED: c,
          IX2_SESSION_STOPPED: r,
          IX2_EVENT_LISTENER_ADDED: l,
          IX2_EVENT_STATE_CHANGED: s,
          IX2_ANIMATION_FRAME_CHANGED: u,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: f,
          IX2_VIEWPORT_WIDTH_CHANGED: g,
          IX2_MEDIA_QUERIES_DEFINED: p,
        } = n.IX2EngineActionTypes,
        I = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        },
        E = (e = I, t) => {
          switch (t.type) {
            case o: {
              let { hasBoundaryNodes: a, reducedMotion: n } = t.payload;
              return (0, i.merge)(e, { hasBoundaryNodes: a, reducedMotion: n });
            }
            case d:
              return (0, i.set)(e, "active", !0);
            case c: {
              let {
                payload: { step: a = 20 },
              } = t;
              return (0, i.set)(e, "tick", e.tick + a);
            }
            case r:
              return I;
            case u: {
              let {
                payload: { now: a },
              } = t;
              return (0, i.set)(e, "tick", a);
            }
            case l: {
              let a = (0, i.addLast)(e.eventListeners, t.payload);
              return (0, i.set)(e, "eventListeners", a);
            }
            case s: {
              let { stateKey: a, newState: n } = t.payload;
              return (0, i.setIn)(e, ["eventState", a], n);
            }
            case f: {
              let { actionListId: a, isPlaying: n } = t.payload;
              return (0, i.setIn)(e, ["playbackState", a], n);
            }
            case g: {
              let { width: a, mediaQueries: n } = t.payload,
                o = n.length,
                d = null;
              for (let e = 0; e < o; e++) {
                let { key: t, min: i, max: o } = n[e];
                if (a >= i && a <= o) {
                  d = t;
                  break;
                }
              }
              return (0, i.merge)(e, { viewportWidth: a, mediaQueryKey: d });
            }
            case p:
              return (0, i.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        };
    },
    7377: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        clearPlugin: function () {
          return s;
        },
        createPluginInstance: function () {
          return r;
        },
        getPluginConfig: function () {
          return i;
        },
        getPluginDestination: function () {
          return c;
        },
        getPluginDuration: function () {
          return o;
        },
        getPluginOrigin: function () {
          return d;
        },
        renderPlugin: function () {
          return l;
        },
      };
      for (var n in a)
        Object.defineProperty(t, n, { enumerable: !0, get: a[n] });
      let i = (e) => e.value,
        o = (e, t) => {
          if ("auto" !== t.config.duration) return null;
          let a = parseFloat(e.getAttribute("data-duration"));
          return a > 0
            ? 1e3 * a
            : 1e3 * parseFloat(e.getAttribute("data-default-duration"));
        },
        d = (e) => e || { value: 0 },
        c = (e) => ({ value: e.value }),
        r = (e) => {
          let t = window.Webflow.require("lottie");
          if (!t) return null;
          let a = t.createInstance(e);
          return (a.stop(), a.setSubframe(!0), a);
        },
        l = (e, t, a) => {
          if (!e) return;
          let n = t[a.actionTypeId].value / 100;
          e.goToFrame(e.frames * n);
        },
        s = (e) => {
          let t = window.Webflow.require("lottie");
          t && t.createInstance(e).stop();
        };
    },
    2570: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        clearPlugin: function () {
          return p;
        },
        createPluginInstance: function () {
          return f;
        },
        getPluginConfig: function () {
          return r;
        },
        getPluginDestination: function () {
          return u;
        },
        getPluginDuration: function () {
          return l;
        },
        getPluginOrigin: function () {
          return s;
        },
        renderPlugin: function () {
          return g;
        },
      };
      for (var n in a)
        Object.defineProperty(t, n, { enumerable: !0, get: a[n] });
      let i = "--wf-rive-fit",
        o = "--wf-rive-alignment",
        d = (e) => document.querySelector(`[data-w-id="${e}"]`),
        c = () => window.Webflow.require("rive"),
        r = (e, t) => e.value.inputs[t],
        l = () => null,
        s = (e, t) => {
          if (e) return e;
          let a = {},
            { inputs: n = {} } = t.config.value;
          for (let e in n) null == n[e] && (a[e] = 0);
          return a;
        },
        u = (e) => e.value.inputs ?? {},
        f = (e, t) => {
          if ((t.config?.target?.selectorGuids || []).length > 0) return e;
          let a = t?.config?.target?.pluginElement;
          return a ? d(a) : null;
        },
        g = (e, { PLUGIN_RIVE: t }, a) => {
          let n = c();
          if (!n) return;
          let d = n.getInstance(e),
            r = n.rive.StateMachineInputType,
            { name: l, inputs: s = {} } = a.config.value || {};
          function u(e) {
            if (e.loaded) a();
            else {
              let t = () => {
                (a(), e?.off("load", t));
              };
              e?.on("load", t);
            }
            function a() {
              let a = e.stateMachineInputs(l);
              if (null != a) {
                if ((e.isPlaying || e.play(l, !1), i in s || o in s)) {
                  let t = e.layout,
                    a = s[i] ?? t.fit,
                    n = s[o] ?? t.alignment;
                  (a !== t.fit || n !== t.alignment) &&
                    (e.layout = t.copyWith({ fit: a, alignment: n }));
                }
                for (let e in s) {
                  if (e === i || e === o) continue;
                  let n = a.find((t) => t.name === e);
                  if (null != n)
                    switch (n.type) {
                      case r.Boolean:
                        null != s[e] && (n.value = !!s[e]);
                        break;
                      case r.Number: {
                        let a = t[e];
                        null != a && (n.value = a);
                        break;
                      }
                      case r.Trigger:
                        s[e] && n.fire();
                    }
                }
              }
            }
          }
          d?.rive ? u(d.rive) : n.setLoadHandler(e, u);
        },
        p = (e, t) => null;
    },
    2866: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        clearPlugin: function () {
          return p;
        },
        createPluginInstance: function () {
          return f;
        },
        getPluginConfig: function () {
          return c;
        },
        getPluginDestination: function () {
          return u;
        },
        getPluginDuration: function () {
          return r;
        },
        getPluginOrigin: function () {
          return s;
        },
        renderPlugin: function () {
          return g;
        },
      };
      for (var n in a)
        Object.defineProperty(t, n, { enumerable: !0, get: a[n] });
      let i = (e) => document.querySelector(`[data-w-id="${e}"]`),
        o = () => window.Webflow.require("spline"),
        d = (e, t) => e.filter((e) => !t.includes(e)),
        c = (e, t) => e.value[t],
        r = () => null,
        l = Object.freeze({
          positionX: 0,
          positionY: 0,
          positionZ: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          scaleX: 1,
          scaleY: 1,
          scaleZ: 1,
        }),
        s = (e, t) => {
          let a = Object.keys(t.config.value);
          if (e) {
            let t = d(a, Object.keys(e));
            return t.length ? t.reduce((e, t) => ((e[t] = l[t]), e), e) : e;
          }
          return a.reduce((e, t) => ((e[t] = l[t]), e), {});
        },
        u = (e) => e.value,
        f = (e, t) => {
          let a = t?.config?.target?.pluginElement;
          return a ? i(a) : null;
        },
        g = (e, t, a) => {
          let n = o();
          if (!n) return;
          let i = n.getInstance(e),
            d = a.config.target.objectId,
            c = (e) => {
              if (!e) throw Error("Invalid spline app passed to renderSpline");
              let a = d && e.findObjectById(d);
              if (!a) return;
              let { PLUGIN_SPLINE: n } = t;
              (null != n.positionX && (a.position.x = n.positionX),
                null != n.positionY && (a.position.y = n.positionY),
                null != n.positionZ && (a.position.z = n.positionZ),
                null != n.rotationX && (a.rotation.x = n.rotationX),
                null != n.rotationY && (a.rotation.y = n.rotationY),
                null != n.rotationZ && (a.rotation.z = n.rotationZ),
                null != n.scaleX && (a.scale.x = n.scaleX),
                null != n.scaleY && (a.scale.y = n.scaleY),
                null != n.scaleZ && (a.scale.z = n.scaleZ));
            };
          i ? c(i.spline) : n.setLoadHandler(e, c);
        },
        p = () => null;
    },
    1407: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        clearPlugin: function () {
          return g;
        },
        createPluginInstance: function () {
          return s;
        },
        getPluginConfig: function () {
          return d;
        },
        getPluginDestination: function () {
          return l;
        },
        getPluginDuration: function () {
          return c;
        },
        getPluginOrigin: function () {
          return r;
        },
        renderPlugin: function () {
          return f;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let o = a(380),
        d = (e, t) => e.value[t],
        c = () => null,
        r = (e, t) => {
          if (e) return e;
          let a = t.config.value,
            n = t.config.target.objectId,
            i = getComputedStyle(document.documentElement).getPropertyValue(n);
          return null != a.size
            ? { size: parseInt(i, 10) }
            : "%" === a.unit || "-" === a.unit
              ? { size: parseFloat(i) }
              : null != a.red && null != a.green && null != a.blue
                ? (0, o.normalizeColor)(i)
                : void 0;
        },
        l = (e) => e.value,
        s = () => null,
        u = {
          color: {
            match: ({ red: e, green: t, blue: a, alpha: n }) =>
              [e, t, a, n].every((e) => null != e),
            getValue: ({ red: e, green: t, blue: a, alpha: n }) =>
              `rgba(${e}, ${t}, ${a}, ${n})`,
          },
          size: {
            match: ({ size: e }) => null != e,
            getValue: ({ size: e }, t) => ("-" === t ? e : `${e}${t}`),
          },
        },
        f = (e, t, a) => {
          let {
            target: { objectId: n },
            value: { unit: i },
          } = a.config,
            o = t.PLUGIN_VARIABLE,
            d = Object.values(u).find((e) => e.match(o, i));
          d && document.documentElement.style.setProperty(n, d.getValue(o, i));
        },
        g = (e, t) => {
          let a = t.config.target.objectId;
          document.documentElement.style.removeProperty(a);
        };
    },
    3690: function (e, t, a) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "pluginMethodMap", {
          enumerable: !0,
          get: function () {
            return s;
          },
        }));
      let n = a(7087),
        i = l(a(7377)),
        o = l(a(2866)),
        d = l(a(2570)),
        c = l(a(1407));
      function r(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          a = new WeakMap();
        return (r = function (e) {
          return e ? a : t;
        })(e);
      }
      function l(e, t) {
        if (!t && e && e.__esModule) return e;
        if (null === e || ("object" != typeof e && "function" != typeof e))
          return { default: e };
        var a = r(t);
        if (a && a.has(e)) return a.get(e);
        var n = { __proto__: null },
          i = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var o in e)
          if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
            var d = i ? Object.getOwnPropertyDescriptor(e, o) : null;
            d && (d.get || d.set)
              ? Object.defineProperty(n, o, d)
              : (n[o] = e[o]);
          }
        return ((n.default = e), a && a.set(e, n), n);
      }
      let s = new Map([
        [n.ActionTypeConsts.PLUGIN_LOTTIE, { ...i }],
        [n.ActionTypeConsts.PLUGIN_SPLINE, { ...o }],
        [n.ActionTypeConsts.PLUGIN_RIVE, { ...d }],
        [n.ActionTypeConsts.PLUGIN_VARIABLE, { ...c }],
      ]);
    },
    8023: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        IX2_ACTION_LIST_PLAYBACK_CHANGED: function () {
          return m;
        },
        IX2_ANIMATION_FRAME_CHANGED: function () {
          return p;
        },
        IX2_CLEAR_REQUESTED: function () {
          return u;
        },
        IX2_ELEMENT_STATE_CHANGED: function () {
          return b;
        },
        IX2_EVENT_LISTENER_ADDED: function () {
          return f;
        },
        IX2_EVENT_STATE_CHANGED: function () {
          return g;
        },
        IX2_INSTANCE_ADDED: function () {
          return E;
        },
        IX2_INSTANCE_REMOVED: function () {
          return y;
        },
        IX2_INSTANCE_STARTED: function () {
          return T;
        },
        IX2_MEDIA_QUERIES_DEFINED: function () {
          return O;
        },
        IX2_PARAMETER_CHANGED: function () {
          return I;
        },
        IX2_PLAYBACK_REQUESTED: function () {
          return l;
        },
        IX2_PREVIEW_REQUESTED: function () {
          return r;
        },
        IX2_RAW_DATA_IMPORTED: function () {
          return i;
        },
        IX2_SESSION_INITIALIZED: function () {
          return o;
        },
        IX2_SESSION_STARTED: function () {
          return d;
        },
        IX2_SESSION_STOPPED: function () {
          return c;
        },
        IX2_STOP_REQUESTED: function () {
          return s;
        },
        IX2_TEST_FRAME_RENDERED: function () {
          return v;
        },
        IX2_VIEWPORT_WIDTH_CHANGED: function () {
          return _;
        },
      };
      for (var n in a)
        Object.defineProperty(t, n, { enumerable: !0, get: a[n] });
      let i = "IX2_RAW_DATA_IMPORTED",
        o = "IX2_SESSION_INITIALIZED",
        d = "IX2_SESSION_STARTED",
        c = "IX2_SESSION_STOPPED",
        r = "IX2_PREVIEW_REQUESTED",
        l = "IX2_PLAYBACK_REQUESTED",
        s = "IX2_STOP_REQUESTED",
        u = "IX2_CLEAR_REQUESTED",
        f = "IX2_EVENT_LISTENER_ADDED",
        g = "IX2_EVENT_STATE_CHANGED",
        p = "IX2_ANIMATION_FRAME_CHANGED",
        I = "IX2_PARAMETER_CHANGED",
        E = "IX2_INSTANCE_ADDED",
        T = "IX2_INSTANCE_STARTED",
        y = "IX2_INSTANCE_REMOVED",
        b = "IX2_ELEMENT_STATE_CHANGED",
        m = "IX2_ACTION_LIST_PLAYBACK_CHANGED",
        _ = "IX2_VIEWPORT_WIDTH_CHANGED",
        O = "IX2_MEDIA_QUERIES_DEFINED",
        v = "IX2_TEST_FRAME_RENDERED";
    },
    2686: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        ABSTRACT_NODE: function () {
          return et;
        },
        AUTO: function () {
          return Q;
        },
        BACKGROUND: function () {
          return k;
        },
        BACKGROUND_COLOR: function () {
          return x;
        },
        BAR_DELIMITER: function () {
          return j;
        },
        BORDER_COLOR: function () {
          return F;
        },
        BOUNDARY_SELECTOR: function () {
          return r;
        },
        CHILDREN: function () {
          return W;
        },
        COLON_DELIMITER: function () {
          return z;
        },
        COLOR: function () {
          return D;
        },
        COMMA_DELIMITER: function () {
          return H;
        },
        CONFIG_UNIT: function () {
          return E;
        },
        CONFIG_VALUE: function () {
          return f;
        },
        CONFIG_X_UNIT: function () {
          return g;
        },
        CONFIG_X_VALUE: function () {
          return l;
        },
        CONFIG_Y_UNIT: function () {
          return p;
        },
        CONFIG_Y_VALUE: function () {
          return s;
        },
        CONFIG_Z_UNIT: function () {
          return I;
        },
        CONFIG_Z_VALUE: function () {
          return u;
        },
        DISPLAY: function () {
          return Y;
        },
        FILTER: function () {
          return P;
        },
        FLEX: function () {
          return X;
        },
        FONT_VARIATION_SETTINGS: function () {
          return M;
        },
        HEIGHT: function () {
          return V;
        },
        HTML_ELEMENT: function () {
          return J;
        },
        IMMEDIATE_CHILDREN: function () {
          return Z;
        },
        IX2_ID_DELIMITER: function () {
          return i;
        },
        OPACITY: function () {
          return U;
        },
        PARENT: function () {
          return K;
        },
        PLAIN_OBJECT: function () {
          return ee;
        },
        PRESERVE_3D: function () {
          return q;
        },
        RENDER_GENERAL: function () {
          return en;
        },
        RENDER_PLUGIN: function () {
          return eo;
        },
        RENDER_STYLE: function () {
          return ei;
        },
        RENDER_TRANSFORM: function () {
          return ea;
        },
        ROTATE_X: function () {
          return R;
        },
        ROTATE_Y: function () {
          return S;
        },
        ROTATE_Z: function () {
          return A;
        },
        SCALE_3D: function () {
          return h;
        },
        SCALE_X: function () {
          return O;
        },
        SCALE_Y: function () {
          return v;
        },
        SCALE_Z: function () {
          return L;
        },
        SIBLINGS: function () {
          return $;
        },
        SKEW: function () {
          return N;
        },
        SKEW_X: function () {
          return C;
        },
        SKEW_Y: function () {
          return G;
        },
        TRANSFORM: function () {
          return T;
        },
        TRANSLATE_3D: function () {
          return _;
        },
        TRANSLATE_X: function () {
          return y;
        },
        TRANSLATE_Y: function () {
          return b;
        },
        TRANSLATE_Z: function () {
          return m;
        },
        WF_PAGE: function () {
          return o;
        },
        WIDTH: function () {
          return w;
        },
        WILL_CHANGE: function () {
          return B;
        },
        W_MOD_IX: function () {
          return c;
        },
        W_MOD_JS: function () {
          return d;
        },
      };
      for (var n in a)
        Object.defineProperty(t, n, { enumerable: !0, get: a[n] });
      let i = "|",
        o = "id-page",
        d = "w-mod-js",
        c = "w-mod-ix",
        r = ".w-dyn-item",
        l = "xValue",
        s = "yValue",
        u = "zValue",
        f = "value",
        g = "xUnit",
        p = "yUnit",
        I = "zUnit",
        E = "unit",
        T = "transform",
        y = "translateX",
        b = "translateY",
        m = "translateZ",
        _ = "translate3d",
        O = "scaleX",
        v = "scaleY",
        L = "scaleZ",
        h = "scale3d",
        R = "rotateX",
        S = "rotateY",
        A = "rotateZ",
        N = "skew",
        C = "skewX",
        G = "skewY",
        U = "opacity",
        P = "filter",
        M = "font-variation-settings",
        w = "width",
        V = "height",
        x = "backgroundColor",
        k = "background",
        F = "borderColor",
        D = "color",
        Y = "display",
        X = "flex",
        B = "willChange",
        Q = "AUTO",
        H = ",",
        z = ":",
        j = "|",
        W = "CHILDREN",
        Z = "IMMEDIATE_CHILDREN",
        $ = "SIBLINGS",
        K = "PARENT",
        q = "preserve-3d",
        J = "HTML_ELEMENT",
        ee = "PLAIN_OBJECT",
        et = "ABSTRACT_NODE",
        ea = "RENDER_TRANSFORM",
        en = "RENDER_GENERAL",
        ei = "RENDER_STYLE",
        eo = "RENDER_PLUGIN";
    },
    262: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        ActionAppliesTo: function () {
          return o;
        },
        ActionTypeConsts: function () {
          return i;
        },
      };
      for (var n in a)
        Object.defineProperty(t, n, { enumerable: !0, get: a[n] });
      let i = {
        TRANSFORM_MOVE: "TRANSFORM_MOVE",
        TRANSFORM_SCALE: "TRANSFORM_SCALE",
        TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
        TRANSFORM_SKEW: "TRANSFORM_SKEW",
        STYLE_OPACITY: "STYLE_OPACITY",
        STYLE_SIZE: "STYLE_SIZE",
        STYLE_FILTER: "STYLE_FILTER",
        STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
        STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
        STYLE_BORDER: "STYLE_BORDER",
        STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
        OBJECT_VALUE: "OBJECT_VALUE",
        PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
        PLUGIN_SPLINE: "PLUGIN_SPLINE",
        PLUGIN_RIVE: "PLUGIN_RIVE",
        PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
        GENERAL_DISPLAY: "GENERAL_DISPLAY",
        GENERAL_START_ACTION: "GENERAL_START_ACTION",
        GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
        GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
        GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
        GENERAL_LOOP: "GENERAL_LOOP",
        STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
      },
        o = {
          ELEMENT: "ELEMENT",
          ELEMENT_CLASS: "ELEMENT_CLASS",
          TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
        };
    },
    7087: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        ActionTypeConsts: function () {
          return d.ActionTypeConsts;
        },
        IX2EngineActionTypes: function () {
          return c;
        },
        IX2EngineConstants: function () {
          return r;
        },
        QuickEffectIds: function () {
          return o.QuickEffectIds;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let o = l(a(1833), t),
        d = l(a(262), t);
      (l(a(8704), t), l(a(3213), t));
      let c = u(a(8023)),
        r = u(a(2686));
      function l(e, t) {
        return (
          Object.keys(e).forEach(function (a) {
            "default" === a ||
              Object.prototype.hasOwnProperty.call(t, a) ||
              Object.defineProperty(t, a, {
                enumerable: !0,
                get: function () {
                  return e[a];
                },
              });
          }),
          e
        );
      }
      function s(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          a = new WeakMap();
        return (s = function (e) {
          return e ? a : t;
        })(e);
      }
      function u(e, t) {
        if (!t && e && e.__esModule) return e;
        if (null === e || ("object" != typeof e && "function" != typeof e))
          return { default: e };
        var a = s(t);
        if (a && a.has(e)) return a.get(e);
        var n = { __proto__: null },
          i = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var o in e)
          if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
            var d = i ? Object.getOwnPropertyDescriptor(e, o) : null;
            d && (d.get || d.set)
              ? Object.defineProperty(n, o, d)
              : (n[o] = e[o]);
          }
        return ((n.default = e), a && a.set(e, n), n);
      }
    },
    3213: function (e, t, a) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ReducedMotionTypes", {
          enumerable: !0,
          get: function () {
            return s;
          },
        }));
      let {
        TRANSFORM_MOVE: n,
        TRANSFORM_SCALE: i,
        TRANSFORM_ROTATE: o,
        TRANSFORM_SKEW: d,
        STYLE_SIZE: c,
        STYLE_FILTER: r,
        STYLE_FONT_VARIATION: l,
      } = a(262).ActionTypeConsts,
        s = { [n]: !0, [i]: !0, [o]: !0, [d]: !0, [c]: !0, [r]: !0, [l]: !0 };
    },
    1833: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        EventAppliesTo: function () {
          return o;
        },
        EventBasedOn: function () {
          return d;
        },
        EventContinuousMouseAxes: function () {
          return c;
        },
        EventLimitAffectedElements: function () {
          return r;
        },
        EventTypeConsts: function () {
          return i;
        },
        QuickEffectDirectionConsts: function () {
          return s;
        },
        QuickEffectIds: function () {
          return l;
        },
      };
      for (var n in a)
        Object.defineProperty(t, n, { enumerable: !0, get: a[n] });
      let i = {
        NAVBAR_OPEN: "NAVBAR_OPEN",
        NAVBAR_CLOSE: "NAVBAR_CLOSE",
        TAB_ACTIVE: "TAB_ACTIVE",
        TAB_INACTIVE: "TAB_INACTIVE",
        SLIDER_ACTIVE: "SLIDER_ACTIVE",
        SLIDER_INACTIVE: "SLIDER_INACTIVE",
        DROPDOWN_OPEN: "DROPDOWN_OPEN",
        DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
        MOUSE_CLICK: "MOUSE_CLICK",
        MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
        MOUSE_DOWN: "MOUSE_DOWN",
        MOUSE_UP: "MOUSE_UP",
        MOUSE_OVER: "MOUSE_OVER",
        MOUSE_OUT: "MOUSE_OUT",
        MOUSE_MOVE: "MOUSE_MOVE",
        MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
        SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
        SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
        SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
        ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
        ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
        PAGE_START: "PAGE_START",
        PAGE_FINISH: "PAGE_FINISH",
        PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
        PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
        PAGE_SCROLL: "PAGE_SCROLL",
      },
        o = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" },
        d = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" },
        c = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" },
        r = {
          CHILDREN: "CHILDREN",
          SIBLINGS: "SIBLINGS",
          IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
        },
        l = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
        },
        s = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
        };
    },
    8704: function (e, t) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "InteractionTypeConsts", {
          enumerable: !0,
          get: function () {
            return a;
          },
        }));
      let a = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
          "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
    },
    380: function (e, t) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "normalizeColor", {
          enumerable: !0,
          get: function () {
            return n;
          },
        }));
      let a = {
        aliceblue: "#F0F8FF",
        antiquewhite: "#FAEBD7",
        aqua: "#00FFFF",
        aquamarine: "#7FFFD4",
        azure: "#F0FFFF",
        beige: "#F5F5DC",
        bisque: "#FFE4C4",
        black: "#000000",
        blanchedalmond: "#FFEBCD",
        blue: "#0000FF",
        blueviolet: "#8A2BE2",
        brown: "#A52A2A",
        burlywood: "#DEB887",
        cadetblue: "#5F9EA0",
        chartreuse: "#7FFF00",
        chocolate: "#D2691E",
        coral: "#FF7F50",
        cornflowerblue: "#6495ED",
        cornsilk: "#FFF8DC",
        crimson: "#DC143C",
        cyan: "#00FFFF",
        darkblue: "#00008B",
        darkcyan: "#008B8B",
        darkgoldenrod: "#B8860B",
        darkgray: "#A9A9A9",
        darkgreen: "#006400",
        darkgrey: "#A9A9A9",
        darkkhaki: "#BDB76B",
        darkmagenta: "#8B008B",
        darkolivegreen: "#556B2F",
        darkorange: "#FF8C00",
        darkorchid: "#9932CC",
        darkred: "#8B0000",
        darksalmon: "#E9967A",
        darkseagreen: "#8FBC8F",
        darkslateblue: "#483D8B",
        darkslategray: "#2F4F4F",
        darkslategrey: "#2F4F4F",
        darkturquoise: "#00CED1",
        darkviolet: "#9400D3",
        deeppink: "#FF1493",
        deepskyblue: "#00BFFF",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1E90FF",
        firebrick: "#B22222",
        floralwhite: "#FFFAF0",
        forestgreen: "#228B22",
        fuchsia: "#FF00FF",
        gainsboro: "#DCDCDC",
        ghostwhite: "#F8F8FF",
        gold: "#FFD700",
        goldenrod: "#DAA520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#ADFF2F",
        grey: "#808080",
        honeydew: "#F0FFF0",
        hotpink: "#FF69B4",
        indianred: "#CD5C5C",
        indigo: "#4B0082",
        ivory: "#FFFFF0",
        khaki: "#F0E68C",
        lavender: "#E6E6FA",
        lavenderblush: "#FFF0F5",
        lawngreen: "#7CFC00",
        lemonchiffon: "#FFFACD",
        lightblue: "#ADD8E6",
        lightcoral: "#F08080",
        lightcyan: "#E0FFFF",
        lightgoldenrodyellow: "#FAFAD2",
        lightgray: "#D3D3D3",
        lightgreen: "#90EE90",
        lightgrey: "#D3D3D3",
        lightpink: "#FFB6C1",
        lightsalmon: "#FFA07A",
        lightseagreen: "#20B2AA",
        lightskyblue: "#87CEFA",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#B0C4DE",
        lightyellow: "#FFFFE0",
        lime: "#00FF00",
        limegreen: "#32CD32",
        linen: "#FAF0E6",
        magenta: "#FF00FF",
        maroon: "#800000",
        mediumaquamarine: "#66CDAA",
        mediumblue: "#0000CD",
        mediumorchid: "#BA55D3",
        mediumpurple: "#9370DB",
        mediumseagreen: "#3CB371",
        mediumslateblue: "#7B68EE",
        mediumspringgreen: "#00FA9A",
        mediumturquoise: "#48D1CC",
        mediumvioletred: "#C71585",
        midnightblue: "#191970",
        mintcream: "#F5FFFA",
        mistyrose: "#FFE4E1",
        moccasin: "#FFE4B5",
        navajowhite: "#FFDEAD",
        navy: "#000080",
        oldlace: "#FDF5E6",
        olive: "#808000",
        olivedrab: "#6B8E23",
        orange: "#FFA500",
        orangered: "#FF4500",
        orchid: "#DA70D6",
        palegoldenrod: "#EEE8AA",
        palegreen: "#98FB98",
        paleturquoise: "#AFEEEE",
        palevioletred: "#DB7093",
        papayawhip: "#FFEFD5",
        peachpuff: "#FFDAB9",
        peru: "#CD853F",
        pink: "#FFC0CB",
        plum: "#DDA0DD",
        powderblue: "#B0E0E6",
        purple: "#800080",
        rebeccapurple: "#663399",
        red: "#FF0000",
        rosybrown: "#BC8F8F",
        royalblue: "#4169E1",
        saddlebrown: "#8B4513",
        salmon: "#FA8072",
        sandybrown: "#F4A460",
        seagreen: "#2E8B57",
        seashell: "#FFF5EE",
        sienna: "#A0522D",
        silver: "#C0C0C0",
        skyblue: "#87CEEB",
        slateblue: "#6A5ACD",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#FFFAFA",
        springgreen: "#00FF7F",
        steelblue: "#4682B4",
        tan: "#D2B48C",
        teal: "#008080",
        thistle: "#D8BFD8",
        tomato: "#FF6347",
        turquoise: "#40E0D0",
        violet: "#EE82EE",
        wheat: "#F5DEB3",
        white: "#FFFFFF",
        whitesmoke: "#F5F5F5",
        yellow: "#FFFF00",
        yellowgreen: "#9ACD32",
      };
      function n(e) {
        let t,
          n,
          i,
          o = 1,
          d = e.replace(/\s/g, "").toLowerCase(),
          c = ("string" == typeof a[d] ? a[d].toLowerCase() : null) || d;
        if (c.startsWith("#")) {
          let e = c.substring(1);
          3 === e.length || 4 === e.length
            ? ((t = parseInt(e[0] + e[0], 16)),
              (n = parseInt(e[1] + e[1], 16)),
              (i = parseInt(e[2] + e[2], 16)),
              4 === e.length && (o = parseInt(e[3] + e[3], 16) / 255))
            : (6 === e.length || 8 === e.length) &&
            ((t = parseInt(e.substring(0, 2), 16)),
              (n = parseInt(e.substring(2, 4), 16)),
              (i = parseInt(e.substring(4, 6), 16)),
              8 === e.length && (o = parseInt(e.substring(6, 8), 16) / 255));
        } else if (c.startsWith("rgba")) {
          let e = c.match(/rgba\(([^)]+)\)/)[1].split(",");
          ((t = parseInt(e[0], 10)),
            (n = parseInt(e[1], 10)),
            (i = parseInt(e[2], 10)),
            (o = parseFloat(e[3])));
        } else if (c.startsWith("rgb")) {
          let e = c.match(/rgb\(([^)]+)\)/)[1].split(",");
          ((t = parseInt(e[0], 10)),
            (n = parseInt(e[1], 10)),
            (i = parseInt(e[2], 10)));
        } else if (c.startsWith("hsla")) {
          let e,
            a,
            d,
            r = c.match(/hsla\(([^)]+)\)/)[1].split(","),
            l = parseFloat(r[0]),
            s = parseFloat(r[1].replace("%", "")) / 100,
            u = parseFloat(r[2].replace("%", "")) / 100;
          o = parseFloat(r[3]);
          let f = (1 - Math.abs(2 * u - 1)) * s,
            g = f * (1 - Math.abs(((l / 60) % 2) - 1)),
            p = u - f / 2;
          (l >= 0 && l < 60
            ? ((e = f), (a = g), (d = 0))
            : l >= 60 && l < 120
              ? ((e = g), (a = f), (d = 0))
              : l >= 120 && l < 180
                ? ((e = 0), (a = f), (d = g))
                : l >= 180 && l < 240
                  ? ((e = 0), (a = g), (d = f))
                  : l >= 240 && l < 300
                    ? ((e = g), (a = 0), (d = f))
                    : ((e = f), (a = 0), (d = g)),
            (t = Math.round((e + p) * 255)),
            (n = Math.round((a + p) * 255)),
            (i = Math.round((d + p) * 255)));
        } else if (c.startsWith("hsl")) {
          let e,
            a,
            o,
            d = c.match(/hsl\(([^)]+)\)/)[1].split(","),
            r = parseFloat(d[0]),
            l = parseFloat(d[1].replace("%", "")) / 100,
            s = parseFloat(d[2].replace("%", "")) / 100,
            u = (1 - Math.abs(2 * s - 1)) * l,
            f = u * (1 - Math.abs(((r / 60) % 2) - 1)),
            g = s - u / 2;
          (r >= 0 && r < 60
            ? ((e = u), (a = f), (o = 0))
            : r >= 60 && r < 120
              ? ((e = f), (a = u), (o = 0))
              : r >= 120 && r < 180
                ? ((e = 0), (a = u), (o = f))
                : r >= 180 && r < 240
                  ? ((e = 0), (a = f), (o = u))
                  : r >= 240 && r < 300
                    ? ((e = f), (a = 0), (o = u))
                    : ((e = u), (a = 0), (o = f)),
            (t = Math.round((e + g) * 255)),
            (n = Math.round((a + g) * 255)),
            (i = Math.round((o + g) * 255)));
        }
        if (Number.isNaN(t) || Number.isNaN(n) || Number.isNaN(i))
          throw Error(
            `Invalid color in [ix2/shared/utils/normalizeColor.js] '${e}'`,
          );
        return { red: t, green: n, blue: i, alpha: o };
      }
    },
    9468: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        IX2BrowserSupport: function () {
          return o;
        },
        IX2EasingUtils: function () {
          return c;
        },
        IX2Easings: function () {
          return d;
        },
        IX2ElementsReducer: function () {
          return r;
        },
        IX2VanillaPlugins: function () {
          return l;
        },
        IX2VanillaUtils: function () {
          return s;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let o = f(a(2662)),
        d = f(a(8686)),
        c = f(a(3767)),
        r = f(a(5861)),
        l = f(a(1799)),
        s = f(a(4124));
      function u(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          a = new WeakMap();
        return (u = function (e) {
          return e ? a : t;
        })(e);
      }
      function f(e, t) {
        if (!t && e && e.__esModule) return e;
        if (null === e || ("object" != typeof e && "function" != typeof e))
          return { default: e };
        var a = u(t);
        if (a && a.has(e)) return a.get(e);
        var n = { __proto__: null },
          i = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var o in e)
          if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
            var d = i ? Object.getOwnPropertyDescriptor(e, o) : null;
            d && (d.get || d.set)
              ? Object.defineProperty(n, o, d)
              : (n[o] = e[o]);
          }
        return ((n.default = e), a && a.set(e, n), n);
      }
    },
    2662: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        i = {
          ELEMENT_MATCHES: function () {
            return l;
          },
          FLEX_PREFIXED: function () {
            return s;
          },
          IS_BROWSER_ENV: function () {
            return c;
          },
          TRANSFORM_PREFIXED: function () {
            return u;
          },
          TRANSFORM_STYLE_PREFIXED: function () {
            return g;
          },
          withBrowser: function () {
            return r;
          },
        };
      for (var o in i)
        Object.defineProperty(t, o, { enumerable: !0, get: i[o] });
      let d = (n = a(9777)) && n.__esModule ? n : { default: n },
        c = "undefined" != typeof window,
        r = (e, t) => (c ? e() : t),
        l = r(() =>
          (0, d.default)(
            [
              "matches",
              "matchesSelector",
              "mozMatchesSelector",
              "msMatchesSelector",
              "oMatchesSelector",
              "webkitMatchesSelector",
            ],
            (e) => e in Element.prototype,
          ),
        ),
        s = r(() => {
          let e = document.createElement("i"),
            t = [
              "flex",
              "-webkit-flex",
              "-ms-flexbox",
              "-moz-box",
              "-webkit-box",
            ];
          try {
            let { length: a } = t;
            for (let n = 0; n < a; n++) {
              let a = t[n];
              if (((e.style.display = a), e.style.display === a)) return a;
            }
            return "";
          } catch (e) {
            return "";
          }
        }, "flex"),
        u = r(() => {
          let e = document.createElement("i");
          if (null == e.style.transform) {
            let t = ["Webkit", "Moz", "ms"],
              { length: a } = t;
            for (let n = 0; n < a; n++) {
              let a = t[n] + "Transform";
              if (void 0 !== e.style[a]) return a;
            }
          }
          return "transform";
        }, "transform"),
        f = u.split("transform")[0],
        g = f ? f + "TransformStyle" : "transformStyle";
    },
    3767: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        i = {
          applyEasing: function () {
            return u;
          },
          createBezierEasing: function () {
            return s;
          },
          optimizeFloat: function () {
            return l;
          },
        };
      for (var o in i)
        Object.defineProperty(t, o, { enumerable: !0, get: i[o] });
      let d = (function (e, t) {
        if (e && e.__esModule) return e;
        if (null === e || ("object" != typeof e && "function" != typeof e))
          return { default: e };
        var a = r(t);
        if (a && a.has(e)) return a.get(e);
        var n = { __proto__: null },
          i = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var o in e)
          if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
            var d = i ? Object.getOwnPropertyDescriptor(e, o) : null;
            d && (d.get || d.set)
              ? Object.defineProperty(n, o, d)
              : (n[o] = e[o]);
          }
        return ((n.default = e), a && a.set(e, n), n);
      })(a(8686)),
        c = (n = a(1361)) && n.__esModule ? n : { default: n };
      function r(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          a = new WeakMap();
        return (r = function (e) {
          return e ? a : t;
        })(e);
      }
      function l(e, t = 5, a = 10) {
        let n = Math.pow(a, t),
          i = Number(Math.round(e * n) / n);
        return Math.abs(i) > 1e-4 ? i : 0;
      }
      function s(e) {
        return (0, c.default)(...e);
      }
      function u(e, t, a) {
        return 0 === t
          ? 0
          : 1 === t
            ? 1
            : a
              ? l(t > 0 ? a(t) : t)
              : l(t > 0 && e && d[e] ? d[e](t) : t);
      }
    },
    8686: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        i = {
          bounce: function () {
            return X;
          },
          bouncePast: function () {
            return B;
          },
          ease: function () {
            return c;
          },
          easeIn: function () {
            return r;
          },
          easeInOut: function () {
            return s;
          },
          easeOut: function () {
            return l;
          },
          inBack: function () {
            return P;
          },
          inCirc: function () {
            return N;
          },
          inCubic: function () {
            return p;
          },
          inElastic: function () {
            return V;
          },
          inExpo: function () {
            return R;
          },
          inOutBack: function () {
            return w;
          },
          inOutCirc: function () {
            return G;
          },
          inOutCubic: function () {
            return E;
          },
          inOutElastic: function () {
            return k;
          },
          inOutExpo: function () {
            return A;
          },
          inOutQuad: function () {
            return g;
          },
          inOutQuart: function () {
            return b;
          },
          inOutQuint: function () {
            return O;
          },
          inOutSine: function () {
            return h;
          },
          inQuad: function () {
            return u;
          },
          inQuart: function () {
            return T;
          },
          inQuint: function () {
            return m;
          },
          inSine: function () {
            return v;
          },
          outBack: function () {
            return M;
          },
          outBounce: function () {
            return U;
          },
          outCirc: function () {
            return C;
          },
          outCubic: function () {
            return I;
          },
          outElastic: function () {
            return x;
          },
          outExpo: function () {
            return S;
          },
          outQuad: function () {
            return f;
          },
          outQuart: function () {
            return y;
          },
          outQuint: function () {
            return _;
          },
          outSine: function () {
            return L;
          },
          swingFrom: function () {
            return D;
          },
          swingFromTo: function () {
            return F;
          },
          swingTo: function () {
            return Y;
          },
        };
      for (var o in i)
        Object.defineProperty(t, o, { enumerable: !0, get: i[o] });
      let d = (n = a(1361)) && n.__esModule ? n : { default: n },
        c = (0, d.default)(0.25, 0.1, 0.25, 1),
        r = (0, d.default)(0.42, 0, 1, 1),
        l = (0, d.default)(0, 0, 0.58, 1),
        s = (0, d.default)(0.42, 0, 0.58, 1);
      function u(e) {
        return Math.pow(e, 2);
      }
      function f(e) {
        return -(Math.pow(e - 1, 2) - 1);
      }
      function g(e) {
        return (e /= 0.5) < 1
          ? 0.5 * Math.pow(e, 2)
          : -0.5 * ((e -= 2) * e - 2);
      }
      function p(e) {
        return Math.pow(e, 3);
      }
      function I(e) {
        return Math.pow(e - 1, 3) + 1;
      }
      function E(e) {
        return (e /= 0.5) < 1
          ? 0.5 * Math.pow(e, 3)
          : 0.5 * (Math.pow(e - 2, 3) + 2);
      }
      function T(e) {
        return Math.pow(e, 4);
      }
      function y(e) {
        return -(Math.pow(e - 1, 4) - 1);
      }
      function b(e) {
        return (e /= 0.5) < 1
          ? 0.5 * Math.pow(e, 4)
          : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
      }
      function m(e) {
        return Math.pow(e, 5);
      }
      function _(e) {
        return Math.pow(e - 1, 5) + 1;
      }
      function O(e) {
        return (e /= 0.5) < 1
          ? 0.5 * Math.pow(e, 5)
          : 0.5 * (Math.pow(e - 2, 5) + 2);
      }
      function v(e) {
        return -Math.cos((Math.PI / 2) * e) + 1;
      }
      function L(e) {
        return Math.sin((Math.PI / 2) * e);
      }
      function h(e) {
        return -0.5 * (Math.cos(Math.PI * e) - 1);
      }
      function R(e) {
        return 0 === e ? 0 : Math.pow(2, 10 * (e - 1));
      }
      function S(e) {
        return 1 === e ? 1 : -Math.pow(2, -10 * e) + 1;
      }
      function A(e) {
        return 0 === e
          ? 0
          : 1 === e
            ? 1
            : (e /= 0.5) < 1
              ? 0.5 * Math.pow(2, 10 * (e - 1))
              : 0.5 * (-Math.pow(2, -10 * --e) + 2);
      }
      function N(e) {
        return -(Math.sqrt(1 - e * e) - 1);
      }
      function C(e) {
        return Math.sqrt(1 - Math.pow(e - 1, 2));
      }
      function G(e) {
        return (e /= 0.5) < 1
          ? -0.5 * (Math.sqrt(1 - e * e) - 1)
          : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
      }
      function U(e) {
        return e < 1 / 2.75
          ? 7.5625 * e * e
          : e < 2 / 2.75
            ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
            : e < 2.5 / 2.75
              ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
              : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
      }
      function P(e) {
        return e * e * (2.70158 * e - 1.70158);
      }
      function M(e) {
        return (e -= 1) * e * (2.70158 * e + 1.70158) + 1;
      }
      function w(e) {
        let t = 1.70158;
        return (e /= 0.5) < 1
          ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
          : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
      }
      function V(e) {
        let t = 1.70158,
          a = 0,
          n = 1;
        return 0 === e
          ? 0
          : 1 === e
            ? 1
            : (a || (a = 0.3),
              n < 1
                ? ((n = 1), (t = a / 4))
                : (t = (a / (2 * Math.PI)) * Math.asin(1 / n)),
              -(
                n *
                Math.pow(2, 10 * (e -= 1)) *
                Math.sin((2 * Math.PI * (e - t)) / a)
              ));
      }
      function x(e) {
        let t = 1.70158,
          a = 0,
          n = 1;
        return 0 === e
          ? 0
          : 1 === e
            ? 1
            : (a || (a = 0.3),
              n < 1
                ? ((n = 1), (t = a / 4))
                : (t = (a / (2 * Math.PI)) * Math.asin(1 / n)),
              n * Math.pow(2, -10 * e) * Math.sin((2 * Math.PI * (e - t)) / a) +
              1);
      }
      function k(e) {
        let t = 1.70158,
          a = 0,
          n = 1;
        return 0 === e
          ? 0
          : 2 == (e /= 0.5)
            ? 1
            : (a || (a = 0.3 * 1.5),
              n < 1
                ? ((n = 1), (t = a / 4))
                : (t = (a / (2 * Math.PI)) * Math.asin(1 / n)),
              e < 1)
              ? -0.5 *
              (n *
                Math.pow(2, 10 * (e -= 1)) *
                Math.sin((2 * Math.PI * (e - t)) / a))
              : n *
              Math.pow(2, -10 * (e -= 1)) *
              Math.sin((2 * Math.PI * (e - t)) / a) *
              0.5 +
              1;
      }
      function F(e) {
        let t = 1.70158;
        return (e /= 0.5) < 1
          ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
          : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
      }
      function D(e) {
        return e * e * (2.70158 * e - 1.70158);
      }
      function Y(e) {
        return (e -= 1) * e * (2.70158 * e + 1.70158) + 1;
      }
      function X(e) {
        return e < 1 / 2.75
          ? 7.5625 * e * e
          : e < 2 / 2.75
            ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
            : e < 2.5 / 2.75
              ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
              : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
      }
      function B(e) {
        return e < 1 / 2.75
          ? 7.5625 * e * e
          : e < 2 / 2.75
            ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
            : e < 2.5 / 2.75
              ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
              : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
      }
    },
    1799: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        clearPlugin: function () {
          return I;
        },
        createPluginInstance: function () {
          return g;
        },
        getPluginConfig: function () {
          return l;
        },
        getPluginDestination: function () {
          return f;
        },
        getPluginDuration: function () {
          return u;
        },
        getPluginOrigin: function () {
          return s;
        },
        isPluginType: function () {
          return c;
        },
        renderPlugin: function () {
          return p;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let o = a(2662),
        d = a(3690);
      function c(e) {
        return d.pluginMethodMap.has(e);
      }
      let r = (e) => (t) => {
        if (!o.IS_BROWSER_ENV) return () => null;
        let a = d.pluginMethodMap.get(t);
        if (!a) throw Error(`IX2 no plugin configured for: ${t}`);
        let n = a[e];
        if (!n) throw Error(`IX2 invalid plugin method: ${e}`);
        return n;
      },
        l = r("getPluginConfig"),
        s = r("getPluginOrigin"),
        u = r("getPluginDuration"),
        f = r("getPluginDestination"),
        g = r("createPluginInstance"),
        p = r("renderPlugin"),
        I = r("clearPlugin");
    },
    4124: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        cleanupHTMLElement: function () {
          return eH;
        },
        clearAllStyles: function () {
          return eX;
        },
        clearObjectCache: function () {
          return eu;
        },
        getActionListProgress: function () {
          return eZ;
        },
        getAffectedElements: function () {
          return em;
        },
        getComputedStyle: function () {
          return e_;
        },
        getDestinationValues: function () {
          return eN;
        },
        getElementId: function () {
          return eI;
        },
        getInstanceId: function () {
          return eg;
        },
        getInstanceOrigin: function () {
          return eh;
        },
        getItemConfigByKey: function () {
          return eA;
        },
        getMaxDurationItemIndex: function () {
          return eW;
        },
        getNamespacedParameterId: function () {
          return eq;
        },
        getRenderType: function () {
          return eC;
        },
        getStyleProp: function () {
          return eG;
        },
        mediaQueriesEqual: function () {
          return e0;
        },
        observeStore: function () {
          return ey;
        },
        reduceListToGroup: function () {
          return e$;
        },
        reifyState: function () {
          return eE;
        },
        renderHTMLElement: function () {
          return eU;
        },
        shallowEqual: function () {
          return s.default;
        },
        shouldAllowMediaQuery: function () {
          return eJ;
        },
        shouldNamespaceEventParameter: function () {
          return eK;
        },
        stringifyTarget: function () {
          return e1;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let o = I(a(4075)),
        d = I(a(1455)),
        c = I(a(5720)),
        r = a(1185),
        l = a(7087),
        s = I(a(7164)),
        u = a(3767),
        f = a(380),
        g = a(1799),
        p = a(2662);
      function I(e) {
        return e && e.__esModule ? e : { default: e };
      }
      let {
        BACKGROUND: E,
        TRANSFORM: T,
        TRANSLATE_3D: y,
        SCALE_3D: b,
        ROTATE_X: m,
        ROTATE_Y: _,
        ROTATE_Z: O,
        SKEW: v,
        PRESERVE_3D: L,
        FLEX: h,
        OPACITY: R,
        FILTER: S,
        FONT_VARIATION_SETTINGS: A,
        WIDTH: N,
        HEIGHT: C,
        BACKGROUND_COLOR: G,
        BORDER_COLOR: U,
        COLOR: P,
        CHILDREN: M,
        IMMEDIATE_CHILDREN: w,
        SIBLINGS: V,
        PARENT: x,
        DISPLAY: k,
        WILL_CHANGE: F,
        AUTO: D,
        COMMA_DELIMITER: Y,
        COLON_DELIMITER: X,
        BAR_DELIMITER: B,
        RENDER_TRANSFORM: Q,
        RENDER_GENERAL: H,
        RENDER_STYLE: z,
        RENDER_PLUGIN: j,
      } = l.IX2EngineConstants,
        {
          TRANSFORM_MOVE: W,
          TRANSFORM_SCALE: Z,
          TRANSFORM_ROTATE: $,
          TRANSFORM_SKEW: K,
          STYLE_OPACITY: q,
          STYLE_FILTER: J,
          STYLE_FONT_VARIATION: ee,
          STYLE_SIZE: et,
          STYLE_BACKGROUND_COLOR: ea,
          STYLE_BORDER: en,
          STYLE_TEXT_COLOR: ei,
          GENERAL_DISPLAY: eo,
          OBJECT_VALUE: ed,
        } = l.ActionTypeConsts,
        ec = (e) => e.trim(),
        er = Object.freeze({ [ea]: G, [en]: U, [ei]: P }),
        el = Object.freeze({
          [p.TRANSFORM_PREFIXED]: T,
          [G]: E,
          [R]: R,
          [S]: S,
          [N]: N,
          [C]: C,
          [A]: A,
        }),
        es = new Map();
      function eu() {
        es.clear();
      }
      let ef = 1;
      function eg() {
        return "i" + ef++;
      }
      let ep = 1;
      function eI(e, t) {
        for (let a in e) {
          let n = e[a];
          if (n && n.ref === t) return n.id;
        }
        return "e" + ep++;
      }
      function eE({ events: e, actionLists: t, site: a } = {}) {
        let n = (0, d.default)(
          e,
          (e, t) => {
            let { eventTypeId: a } = t;
            return (e[a] || (e[a] = {}), (e[a][t.id] = t), e);
          },
          {},
        ),
          i = a && a.mediaQueries,
          o = [];
        return (
          i
            ? (o = i.map((e) => e.key))
            : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
          {
            ixData: {
              events: e,
              actionLists: t,
              eventTypeMap: n,
              mediaQueries: i,
              mediaQueryKeys: o,
            },
          }
        );
      }
      let eT = (e, t) => e === t;
      function ey({ store: e, select: t, onChange: a, comparator: n = eT }) {
        let { getState: i, subscribe: o } = e,
          d = o(function () {
            let o = t(i());
            if (null == o) return void d();
            n(o, c) || a((c = o), e);
          }),
          c = t(i());
        return d;
      }
      function eb(e) {
        let t = typeof e;
        if ("string" === t) return { id: e };
        if (null != e && "object" === t) {
          let {
            id: t,
            objectId: a,
            selector: n,
            selectorGuids: i,
            appliesTo: o,
            useEventTarget: d,
          } = e;
          return {
            id: t,
            objectId: a,
            selector: n,
            selectorGuids: i,
            appliesTo: o,
            useEventTarget: d,
          };
        }
        return {};
      }
      function em({
        config: e,
        event: t,
        eventTarget: a,
        elementRoot: n,
        elementApi: i,
      }) {
        let o, d, c;
        if (!i) throw Error("IX2 missing elementApi");
        let { targets: r } = e;
        if (Array.isArray(r) && r.length > 0)
          return r.reduce(
            (e, o) =>
              e.concat(
                em({
                  config: { target: o },
                  event: t,
                  eventTarget: a,
                  elementRoot: n,
                  elementApi: i,
                }),
              ),
            [],
          );
        let {
          getValidDocument: s,
          getQuerySelector: u,
          queryDocument: f,
          getChildElements: g,
          getSiblingElements: I,
          matchSelector: E,
          elementContains: T,
          isSiblingNode: y,
        } = i,
          { target: b } = e;
        if (!b) return [];
        let {
          id: m,
          objectId: _,
          selector: O,
          selectorGuids: v,
          appliesTo: L,
          useEventTarget: h,
        } = eb(b);
        if (_) return [es.has(_) ? es.get(_) : es.set(_, {}).get(_)];
        if (L === l.EventAppliesTo.PAGE) {
          let e = s(m);
          return e ? [e] : [];
        }
        let R = (t?.action?.config?.affectedElements ?? {})[m || O] || {},
          S = !!(R.id || R.selector),
          A = t && u(eb(t.target));
        if (
          (S
            ? ((o = R.limitAffectedElements), (d = A), (c = u(R)))
            : (d = c = u({ id: m, selector: O, selectorGuids: v })),
            t && h)
        ) {
          let e = a && (c || !0 === h) ? [a] : f(A);
          if (c) {
            if (h === x) return f(c).filter((t) => e.some((e) => T(t, e)));
            if (h === M) return f(c).filter((t) => e.some((e) => T(e, t)));
            if (h === V) return f(c).filter((t) => e.some((e) => y(e, t)));
          }
          return e;
        }
        return null == d || null == c
          ? []
          : p.IS_BROWSER_ENV && n
            ? f(c).filter((e) => n.contains(e))
            : o === M
              ? f(d, c)
              : o === w
                ? g(f(d)).filter(E(c))
                : o === V
                  ? I(f(d)).filter(E(c))
                  : f(c);
      }
      function e_({ element: e, actionItem: t }) {
        if (!p.IS_BROWSER_ENV) return {};
        let { actionTypeId: a } = t;
        switch (a) {
          case et:
          case ea:
          case en:
          case ei:
          case eo:
            return window.getComputedStyle(e);
          default:
            return {};
        }
      }
      let eO = /px/,
        ev = (e, t) =>
          t.reduce(
            (e, t) => (null == e[t.type] && (e[t.type] = eM[t.type]), e),
            e || {},
          ),
        eL = (e, t) =>
          t.reduce(
            (e, t) => (
              null == e[t.type] &&
              (e[t.type] = ew[t.type] || t.defaultValue || 0),
              e
            ),
            e || {},
          );
      function eh(e, t = {}, a = {}, n, i) {
        let { getStyle: d } = i,
          { actionTypeId: c } = n;
        if ((0, g.isPluginType)(c)) return (0, g.getPluginOrigin)(c)(t[c], n);
        switch (n.actionTypeId) {
          case W:
          case Z:
          case $:
          case K:
            return t[n.actionTypeId] || eP[n.actionTypeId];
          case J:
            return ev(t[n.actionTypeId], n.config.filters);
          case ee:
            return eL(t[n.actionTypeId], n.config.fontVariations);
          case q:
            return { value: (0, o.default)(parseFloat(d(e, R)), 1) };
          case et: {
            let t,
              i = d(e, N),
              c = d(e, C);
            return {
              widthValue:
                n.config.widthUnit === D
                  ? eO.test(i)
                    ? parseFloat(i)
                    : parseFloat(a.width)
                  : (0, o.default)(parseFloat(i), parseFloat(a.width)),
              heightValue:
                n.config.heightUnit === D
                  ? eO.test(c)
                    ? parseFloat(c)
                    : parseFloat(a.height)
                  : (0, o.default)(parseFloat(c), parseFloat(a.height)),
            };
          }
          case ea:
          case en:
          case ei:
            return (function ({
              element: e,
              actionTypeId: t,
              computedStyle: a,
              getStyle: n,
            }) {
              let i = er[t],
                d = n(e, i),
                c = (function (e, t) {
                  let a = e.exec(t);
                  return a ? a[1] : "";
                })(eF, ek.test(d) ? d : a[i]).split(Y);
              return {
                rValue: (0, o.default)(parseInt(c[0], 10), 255),
                gValue: (0, o.default)(parseInt(c[1], 10), 255),
                bValue: (0, o.default)(parseInt(c[2], 10), 255),
                aValue: (0, o.default)(parseFloat(c[3]), 1),
              };
            })({
              element: e,
              actionTypeId: n.actionTypeId,
              computedStyle: a,
              getStyle: d,
            });
          case eo:
            return { value: (0, o.default)(d(e, k), a.display) };
          case ed:
            return t[n.actionTypeId] || { value: 0 };
          default:
            return;
        }
      }
      let eR = (e, t) => (t && (e[t.type] = t.value || 0), e),
        eS = (e, t) => (t && (e[t.type] = t.value || 0), e),
        eA = (e, t, a) => {
          if ((0, g.isPluginType)(e)) return (0, g.getPluginConfig)(e)(a, t);
          switch (e) {
            case J: {
              let e = (0, c.default)(a.filters, ({ type: e }) => e === t);
              return e ? e.value : 0;
            }
            case ee: {
              let e = (0, c.default)(
                a.fontVariations,
                ({ type: e }) => e === t,
              );
              return e ? e.value : 0;
            }
            default:
              return a[t];
          }
        };
      function eN({ element: e, actionItem: t, elementApi: a }) {
        if ((0, g.isPluginType)(t.actionTypeId))
          return (0, g.getPluginDestination)(t.actionTypeId)(t.config);
        switch (t.actionTypeId) {
          case W:
          case Z:
          case $:
          case K: {
            let { xValue: e, yValue: a, zValue: n } = t.config;
            return { xValue: e, yValue: a, zValue: n };
          }
          case et: {
            let { getStyle: n, setStyle: i, getProperty: o } = a,
              { widthUnit: d, heightUnit: c } = t.config,
              { widthValue: r, heightValue: l } = t.config;
            if (!p.IS_BROWSER_ENV) return { widthValue: r, heightValue: l };
            if (d === D) {
              let t = n(e, N);
              (i(e, N, ""), (r = o(e, "offsetWidth")), i(e, N, t));
            }
            if (c === D) {
              let t = n(e, C);
              (i(e, C, ""), (l = o(e, "offsetHeight")), i(e, C, t));
            }
            return { widthValue: r, heightValue: l };
          }
          case ea:
          case en:
          case ei: {
            let {
              rValue: n,
              gValue: i,
              bValue: o,
              aValue: d,
              globalSwatchId: c,
            } = t.config;
            if (c && c.startsWith("--")) {
              let { getStyle: t } = a,
                n = t(e, c),
                i = (0, f.normalizeColor)(n);
              return {
                rValue: i.red,
                gValue: i.green,
                bValue: i.blue,
                aValue: i.alpha,
              };
            }
            return { rValue: n, gValue: i, bValue: o, aValue: d };
          }
          case J:
            return t.config.filters.reduce(eR, {});
          case ee:
            return t.config.fontVariations.reduce(eS, {});
          default: {
            let { value: e } = t.config;
            return { value: e };
          }
        }
      }
      function eC(e) {
        return /^TRANSFORM_/.test(e)
          ? Q
          : /^STYLE_/.test(e)
            ? z
            : /^GENERAL_/.test(e)
              ? H
              : /^PLUGIN_/.test(e)
                ? j
                : void 0;
      }
      function eG(e, t) {
        return e === z ? t.replace("STYLE_", "").toLowerCase() : null;
      }
      function eU(e, t, a, n, i, o, c, r, l) {
        switch (r) {
          case Q:
            var s = e,
              u = t,
              f = a,
              I = i,
              E = c;
            let T = ex
              .map((e) => {
                let t = eP[e],
                  {
                    xValue: a = t.xValue,
                    yValue: n = t.yValue,
                    zValue: i = t.zValue,
                    xUnit: o = "",
                    yUnit: d = "",
                    zUnit: c = "",
                  } = u[e] || {};
                switch (e) {
                  case W:
                    return `${y}(${a}${o}, ${n}${d}, ${i}${c})`;
                  case Z:
                    return `${b}(${a}${o}, ${n}${d}, ${i}${c})`;
                  case $:
                    return `${m}(${a}${o}) ${_}(${n}${d}) ${O}(${i}${c})`;
                  case K:
                    return `${v}(${a}${o}, ${n}${d})`;
                  default:
                    return "";
                }
              })
              .join(" "),
              { setStyle: R } = E;
            (eD(s, p.TRANSFORM_PREFIXED, E),
              R(s, p.TRANSFORM_PREFIXED, T),
              (function (
                { actionTypeId: e },
                { xValue: t, yValue: a, zValue: n },
              ) {
                return (
                  (e === W && void 0 !== n) ||
                  (e === Z && void 0 !== n) ||
                  (e === $ && (void 0 !== t || void 0 !== a))
                );
              })(I, f) && R(s, p.TRANSFORM_STYLE_PREFIXED, L));
            return;
          case z:
            return (function (e, t, a, n, i, o) {
              let { setStyle: c } = o;
              switch (n.actionTypeId) {
                case et: {
                  let { widthUnit: t = "", heightUnit: i = "" } = n.config,
                    { widthValue: d, heightValue: r } = a;
                  (void 0 !== d &&
                    (t === D && (t = "px"), eD(e, N, o), c(e, N, d + t)),
                    void 0 !== r &&
                    (i === D && (i = "px"), eD(e, C, o), c(e, C, r + i)));
                  break;
                }
                case J:
                  var r = n.config;
                  let l = (0, d.default)(
                    a,
                    (e, t, a) => `${e} ${a}(${t}${eV(a, r)})`,
                    "",
                  ),
                    { setStyle: s } = o;
                  (eD(e, S, o), s(e, S, l));
                  break;
                case ee:
                  n.config;
                  let u = (0, d.default)(
                    a,
                    (e, t, a) => (e.push(`"${a}" ${t}`), e),
                    [],
                  ).join(", "),
                    { setStyle: f } = o;
                  (eD(e, A, o), f(e, A, u));
                  break;
                case ea:
                case en:
                case ei: {
                  let t = er[n.actionTypeId],
                    i = Math.round(a.rValue),
                    d = Math.round(a.gValue),
                    r = Math.round(a.bValue),
                    l = a.aValue;
                  (eD(e, t, o),
                    c(
                      e,
                      t,
                      l >= 1
                        ? `rgb(${i},${d},${r})`
                        : `rgba(${i},${d},${r},${l})`,
                    ));
                  break;
                }
                default: {
                  let { unit: t = "" } = n.config;
                  (eD(e, i, o), c(e, i, a.value + t));
                }
              }
            })(e, 0, a, i, o, c);
          case H:
            var G = e,
              U = i,
              P = c;
            let { setStyle: M } = P;
            if (U.actionTypeId === eo) {
              let { value: e } = U.config;
              M(G, k, e === h && p.IS_BROWSER_ENV ? p.FLEX_PREFIXED : e);
            }
            return;
          case j: {
            let { actionTypeId: e } = i;
            if ((0, g.isPluginType)(e)) return (0, g.renderPlugin)(e)(l, t, i);
          }
        }
      }
      let eP = {
        [W]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [Z]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [$]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [K]: Object.freeze({ xValue: 0, yValue: 0 }),
      },
        eM = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        }),
        ew = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 }),
        eV = (e, t) => {
          let a = (0, c.default)(t.filters, ({ type: t }) => t === e);
          if (a && a.unit) return a.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        },
        ex = Object.keys(eP),
        ek = /^rgb/,
        eF = RegExp("rgba?\\(([^)]+)\\)");
      function eD(e, t, a) {
        if (!p.IS_BROWSER_ENV) return;
        let n = el[t];
        if (!n) return;
        let { getStyle: i, setStyle: o } = a,
          d = i(e, F);
        if (!d) return void o(e, F, n);
        let c = d.split(Y).map(ec);
        -1 === c.indexOf(n) && o(e, F, c.concat(n).join(Y));
      }
      function eY(e, t, a) {
        if (!p.IS_BROWSER_ENV) return;
        let n = el[t];
        if (!n) return;
        let { getStyle: i, setStyle: o } = a,
          d = i(e, F);
        d &&
          -1 !== d.indexOf(n) &&
          o(
            e,
            F,
            d
              .split(Y)
              .map(ec)
              .filter((e) => e !== n)
              .join(Y),
          );
      }
      function eX({ store: e, elementApi: t }) {
        let { ixData: a } = e.getState(),
          { events: n = {}, actionLists: i = {} } = a;
        (Object.keys(n).forEach((e) => {
          let a = n[e],
            { config: o } = a.action,
            { actionListId: d } = o,
            c = i[d];
          c && eB({ actionList: c, event: a, elementApi: t });
        }),
          Object.keys(i).forEach((e) => {
            eB({ actionList: i[e], elementApi: t });
          }));
      }
      function eB({ actionList: e = {}, event: t, elementApi: a }) {
        let { actionItemGroups: n, continuousParameterGroups: i } = e;
        (n &&
          n.forEach((e) => {
            eQ({ actionGroup: e, event: t, elementApi: a });
          }),
          i &&
          i.forEach((e) => {
            let { continuousActionGroups: n } = e;
            n.forEach((e) => {
              eQ({ actionGroup: e, event: t, elementApi: a });
            });
          }));
      }
      function eQ({ actionGroup: e, event: t, elementApi: a }) {
        let { actionItems: n } = e;
        n.forEach((e) => {
          let n,
            { actionTypeId: i, config: o } = e;
          ((n = (0, g.isPluginType)(i)
            ? (t) => (0, g.clearPlugin)(i)(t, e)
            : ez({ effect: ej, actionTypeId: i, elementApi: a })),
            em({ config: o, event: t, elementApi: a }).forEach(n));
        });
      }
      function eH(e, t, a) {
        let { setStyle: n, getStyle: i } = a,
          { actionTypeId: o } = t;
        if (o === et) {
          let { config: a } = t;
          (a.widthUnit === D && n(e, N, ""), a.heightUnit === D && n(e, C, ""));
        }
        i(e, F) && ez({ effect: eY, actionTypeId: o, elementApi: a })(e);
      }
      let ez =
        ({ effect: e, actionTypeId: t, elementApi: a }) =>
          (n) => {
            switch (t) {
              case W:
              case Z:
              case $:
              case K:
                e(n, p.TRANSFORM_PREFIXED, a);
                break;
              case J:
                e(n, S, a);
                break;
              case ee:
                e(n, A, a);
                break;
              case q:
                e(n, R, a);
                break;
              case et:
                (e(n, N, a), e(n, C, a));
                break;
              case ea:
              case en:
              case ei:
                e(n, er[t], a);
                break;
              case eo:
                e(n, k, a);
            }
          };
      function ej(e, t, a) {
        let { setStyle: n } = a;
        (eY(e, t, a),
          n(e, t, ""),
          t === p.TRANSFORM_PREFIXED && n(e, p.TRANSFORM_STYLE_PREFIXED, ""));
      }
      function eW(e) {
        let t = 0,
          a = 0;
        return (
          e.forEach((e, n) => {
            let { config: i } = e,
              o = i.delay + i.duration;
            o >= t && ((t = o), (a = n));
          }),
          a
        );
      }
      function eZ(e, t) {
        let { actionItemGroups: a, useFirstGroupAsInitialState: n } = e,
          { actionItem: i, verboseTimeElapsed: o = 0 } = t,
          d = 0,
          c = 0;
        return (
          a.forEach((e, t) => {
            if (n && 0 === t) return;
            let { actionItems: a } = e,
              r = a[eW(a)],
              { config: l, actionTypeId: s } = r;
            i.id === r.id && (c = d + o);
            let u = eC(s) === H ? 0 : l.duration;
            d += l.delay + u;
          }),
          d > 0 ? (0, u.optimizeFloat)(c / d) : 0
        );
      }
      function e$({ actionList: e, actionItemId: t, rawData: a }) {
        let { actionItemGroups: n, continuousParameterGroups: i } = e,
          o = [],
          d = (e) => (
            o.push((0, r.mergeIn)(e, ["config"], { delay: 0, duration: 0 })),
            e.id === t
          );
        return (
          n && n.some(({ actionItems: e }) => e.some(d)),
          i &&
          i.some((e) => {
            let { continuousActionGroups: t } = e;
            return t.some(({ actionItems: e }) => e.some(d));
          }),
          (0, r.setIn)(a, ["actionLists"], {
            [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
          })
        );
      }
      function eK(e, { basedOn: t }) {
        return (
          (e === l.EventTypeConsts.SCROLLING_IN_VIEW &&
            (t === l.EventBasedOn.ELEMENT || null == t)) ||
          (e === l.EventTypeConsts.MOUSE_MOVE && t === l.EventBasedOn.ELEMENT)
        );
      }
      function eq(e, t) {
        return e + X + t;
      }
      function eJ(e, t) {
        return null == t || -1 !== e.indexOf(t);
      }
      function e0(e, t) {
        return (0, s.default)(e && e.sort(), t && t.sort());
      }
      function e1(e) {
        if ("string" == typeof e) return e;
        if (e.pluginElement && e.objectId)
          return e.pluginElement + B + e.objectId;
        if (e.objectId) return e.objectId;
        let { id: t = "", selector: a = "", useEventTarget: n = "" } = e;
        return t + B + a + B + n;
      }
    },
    7164: function (e, t) {
      "use strict";
      function a(e, t) {
        return e === t
          ? 0 !== e || 0 !== t || 1 / e == 1 / t
          : e != e && t != t;
      }
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "default", {
          enumerable: !0,
          get: function () {
            return n;
          },
        }));
      let n = function (e, t) {
        if (a(e, t)) return !0;
        if (
          "object" != typeof e ||
          null === e ||
          "object" != typeof t ||
          null === t
        )
          return !1;
        let n = Object.keys(e),
          i = Object.keys(t);
        if (n.length !== i.length) return !1;
        for (let i = 0; i < n.length; i++)
          if (!Object.hasOwn(t, n[i]) || !a(e[n[i]], t[n[i]])) return !1;
        return !0;
      };
    },
    5861: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        createElementState: function () {
          return v;
        },
        ixElements: function () {
          return O;
        },
        mergeActionState: function () {
          return L;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let o = a(1185),
        d = a(7087),
        {
          HTML_ELEMENT: c,
          PLAIN_OBJECT: r,
          ABSTRACT_NODE: l,
          CONFIG_X_VALUE: s,
          CONFIG_Y_VALUE: u,
          CONFIG_Z_VALUE: f,
          CONFIG_VALUE: g,
          CONFIG_X_UNIT: p,
          CONFIG_Y_UNIT: I,
          CONFIG_Z_UNIT: E,
          CONFIG_UNIT: T,
        } = d.IX2EngineConstants,
        {
          IX2_SESSION_STOPPED: y,
          IX2_INSTANCE_ADDED: b,
          IX2_ELEMENT_STATE_CHANGED: m,
        } = d.IX2EngineActionTypes,
        _ = {},
        O = (e = _, t = {}) => {
          switch (t.type) {
            case y:
              return _;
            case b: {
              let {
                elementId: a,
                element: n,
                origin: i,
                actionItem: d,
                refType: c,
              } = t.payload,
                { actionTypeId: r } = d,
                l = e;
              return (
                (0, o.getIn)(l, [a, n]) !== n && (l = v(l, n, c, a, d)),
                L(l, a, r, i, d)
              );
            }
            case m: {
              let {
                elementId: a,
                actionTypeId: n,
                current: i,
                actionItem: o,
              } = t.payload;
              return L(e, a, n, i, o);
            }
            default:
              return e;
          }
        };
      function v(e, t, a, n, i) {
        let d =
          a === r ? (0, o.getIn)(i, ["config", "target", "objectId"]) : null;
        return (0, o.mergeIn)(e, [n], { id: n, ref: t, refId: d, refType: a });
      }
      function L(e, t, a, n, i) {
        let d = (function (e) {
          let { config: t } = e;
          return h.reduce((e, a) => {
            let n = a[0],
              i = a[1],
              o = t[n],
              d = t[i];
            return (null != o && null != d && (e[i] = d), e);
          }, {});
        })(i);
        return (0, o.mergeIn)(e, [t, "refState", a], n, d);
      }
      let h = [
        [s, p],
        [u, I],
        [f, E],
        [g, T],
      ];
    },
    8134: function () {
      Webflow.require("ix2").init({
        events: {
          e: {
            id: "e",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-2",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "19262a9a-f243-0a55-ab52-efed2ac18299",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "19262a9a-f243-0a55-ab52-efed2ac18299",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18b54474d07,
          },
          "e-2": {
            id: "e-2",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-3",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "19262a9a-f243-0a55-ab52-efed2ac18299",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "19262a9a-f243-0a55-ab52-efed2ac18299",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18b54474d08,
          },
          "e-6": {
            id: "e-6",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-4",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-7",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "principale|98ae38c9-0519-0866-5840-7af6faef5ac4",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale|98ae38c9-0519-0866-5840-7af6faef5ac4",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18bed548e85,
          },
          "e-7": {
            id: "e-7",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-5",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-6",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "principale|98ae38c9-0519-0866-5840-7af6faef5ac4",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale|98ae38c9-0519-0866-5840-7af6faef5ac4",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18bed548e85,
          },
          "e-8": {
            id: "e-8",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-4",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-9",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".home-hero_feed-item",
              originalId:
                "principale|58ba74e4-0d38-82b7-77de-eb06c98d961b",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".home-hero_feed-item",
                originalId:
                  "principale|58ba74e4-0d38-82b7-77de-eb06c98d961b",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18bf88eeb88,
          },
          "e-9": {
            id: "e-9",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-5",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-8",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".home-hero_feed-item",
              originalId:
                "principale|58ba74e4-0d38-82b7-77de-eb06c98d961b",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".home-hero_feed-item",
                originalId:
                  "principale|58ba74e4-0d38-82b7-77de-eb06c98d961b",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18bf88eeb89,
          },
          "e-10": {
            id: "e-10",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_START",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-104",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-11",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "principale",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18bf89d7d1f,
          },
          "e-21": {
            id: "e-21",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-7",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-20",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c03d17b5a,
          },
          "e-26": {
            id: "e-26",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-9",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-27",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|beec5df5-5c0f-a953-71fb-d30a8d30d854",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|beec5df5-5c0f-a953-71fb-d30a8d30d854",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c11024b12,
          },
          "e-27": {
            id: "e-27",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-10",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-26",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|beec5df5-5c0f-a953-71fb-d30a8d30d854",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|beec5df5-5c0f-a953-71fb-d30a8d30d854",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c11024b12,
          },
          "e-28": {
            id: "e-28",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-8",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-29",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|beec5df5-5c0f-a953-71fb-d30a8d30d854",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|beec5df5-5c0f-a953-71fb-d30a8d30d854",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c11024b12,
          },
          "e-29": {
            id: "e-29",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-11",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-28",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|beec5df5-5c0f-a953-71fb-d30a8d30d854",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|beec5df5-5c0f-a953-71fb-d30a8d30d854",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c11024b12,
          },
          "e-30": {
            id: "e-30",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-8",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-31",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|50a4a248-6d26-249d-e3a7-ce782f9fb685",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|50a4a248-6d26-249d-e3a7-ce782f9fb685",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c110481e0,
          },
          "e-31": {
            id: "e-31",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-11",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-30",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|50a4a248-6d26-249d-e3a7-ce782f9fb685",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|50a4a248-6d26-249d-e3a7-ce782f9fb685",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c110481e0,
          },
          "e-32": {
            id: "e-32",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-9",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-33",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|50a4a248-6d26-249d-e3a7-ce782f9fb685",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|50a4a248-6d26-249d-e3a7-ce782f9fb685",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c110481e0,
          },
          "e-33": {
            id: "e-33",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-10",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-32",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|50a4a248-6d26-249d-e3a7-ce782f9fb685",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|50a4a248-6d26-249d-e3a7-ce782f9fb685",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c110481e0,
          },
          "e-34": {
            id: "e-34",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-9",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-35",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|b39f1585-fc5d-00d4-e31c-a5be4508b51b",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|b39f1585-fc5d-00d4-e31c-a5be4508b51b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c1111cd19,
          },
          "e-35": {
            id: "e-35",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-10",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-34",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|b39f1585-fc5d-00d4-e31c-a5be4508b51b",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|b39f1585-fc5d-00d4-e31c-a5be4508b51b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c1111cd19,
          },
          "e-36": {
            id: "e-36",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-8",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-37",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|b39f1585-fc5d-00d4-e31c-a5be4508b51b",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|b39f1585-fc5d-00d4-e31c-a5be4508b51b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c1111cd19,
          },
          "e-37": {
            id: "e-37",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-11",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-36",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|b39f1585-fc5d-00d4-e31c-a5be4508b51b",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|b39f1585-fc5d-00d4-e31c-a5be4508b51b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c1111cd19,
          },
          "e-38": {
            id: "e-38",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-12",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-105",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".divider_horizontal",
              originalId:
                "65613221eb7a32ab6dfdd75b|a3055386-2709-8996-ed72-6b9b516a1853",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".divider_horizontal",
                originalId:
                  "65613221eb7a32ab6dfdd75b|a3055386-2709-8996-ed72-6b9b516a1853",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c117db553,
          },
          "e-39": {
            id: "e-39",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-13",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-99",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".divider_horizontal",
              originalId:
                "65613221eb7a32ab6dfdd75b|a3055386-2709-8996-ed72-6b9b516a1853",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".divider_horizontal",
                originalId:
                  "65613221eb7a32ab6dfdd75b|a3055386-2709-8996-ed72-6b9b516a1853",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c117db554,
          },
          "e-40": {
            id: "e-40",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-14",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-96",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".divider_vertical",
              originalId:
                "65613221eb7a32ab6dfdd75b|c7932df9-c27c-2558-cbca-ee1c9489598a",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".divider_vertical",
                originalId:
                  "65613221eb7a32ab6dfdd75b|c7932df9-c27c-2558-cbca-ee1c9489598a",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c11830f9d,
          },
          "e-44": {
            id: "e-44",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-16",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-45",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "e016c213-457f-1325-9b69-932eaf01efdb",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6af77186-7ad8-ce0a-0d3a-f7fa2e168913",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c20422613,
          },
          "e-45": {
            id: "e-45",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-17",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-44",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "e016c213-457f-1325-9b69-932eaf01efdb",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6af77186-7ad8-ce0a-0d3a-f7fa2e168913",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c20422613,
          },
          "e-46": {
            id: "e-46",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-17",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-47",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "e016c213-457f-1325-9b69-932eaf01efdb",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6af77186-7ad8-ce0a-0d3a-f7fa2e168913",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c2042dbf9,
          },
          "e-47": {
            id: "e-47",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-16",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-46",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "e016c213-457f-1325-9b69-932eaf01efdb",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6af77186-7ad8-ce0a-0d3a-f7fa2e168913",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c2042dbf9,
          },
          "e-56": {
            id: "e-56",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-18",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-57",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "19262a9a-f243-0a55-ab52-efed2ac18299",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "19262a9a-f243-0a55-ab52-efed2ac18299",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c20d195b1,
          },
          "e-57": {
            id: "e-57",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-22",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-56",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "19262a9a-f243-0a55-ab52-efed2ac18299",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "19262a9a-f243-0a55-ab52-efed2ac18299",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c20d195b1,
          },
          "e-60": {
            id: "e-60",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-21",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-61",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".home-work_block",
              originalId:
                "principale|87df293a-f080-52b4-e233-05ea9bdc9c1c",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".home-work_block",
                originalId:
                  "principale|87df293a-f080-52b4-e233-05ea9bdc9c1c",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !0,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c213aa50a,
          },
          "e-61": {
            id: "e-61",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-23",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-60",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".home-work_block",
              originalId:
                "principale|87df293a-f080-52b4-e233-05ea9bdc9c1c",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".home-work_block",
                originalId:
                  "principale|87df293a-f080-52b4-e233-05ea9bdc9c1c",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c213aa50a,
          },
          "e-62": {
            id: "e-62",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-19",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-63",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "19262a9a-f243-0a55-ab52-efed2ac1829a",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "19262a9a-f243-0a55-ab52-efed2ac1829a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c2146163c,
          },
          "e-63": {
            id: "e-63",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-20",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-62",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "19262a9a-f243-0a55-ab52-efed2ac1829a",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "19262a9a-f243-0a55-ab52-efed2ac1829a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c2146163d,
          },
          "e-64": {
            id: "e-64",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-24",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-65",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "a5e8abda-1645-0bfc-82f7-821692088bd2",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "a5e8abda-1645-0bfc-82f7-821692088bd2",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c24b4d530,
          },
          "e-65": {
            id: "e-65",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-25",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-64",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "a5e8abda-1645-0bfc-82f7-821692088bd2",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "a5e8abda-1645-0bfc-82f7-821692088bd2",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c24b4d531,
          },
          "e-66": {
            id: "e-66",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-26",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-67",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "a5e8abda-1645-0bfc-82f7-821692088bcd",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "a5e8abda-1645-0bfc-82f7-821692088bcd",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c24dd4392,
          },
          "e-67": {
            id: "e-67",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-27",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-66",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "a5e8abda-1645-0bfc-82f7-821692088bcd",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "a5e8abda-1645-0bfc-82f7-821692088bcd",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c24dd4393,
          },
          "e-68": {
            id: "e-68",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-28",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-69",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "a5e8abda-1645-0bfc-82f7-821692088bc8",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "a5e8abda-1645-0bfc-82f7-821692088bc8",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c24dfe11b,
          },
          "e-69": {
            id: "e-69",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-29",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-68",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "a5e8abda-1645-0bfc-82f7-821692088bc8",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "a5e8abda-1645-0bfc-82f7-821692088bc8",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c24dfe11c,
          },
          "e-70": {
            id: "e-70",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-24",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-71",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "4f21cc60-d7ec-22bb-d37e-7b8bea0cef85",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "4f21cc60-d7ec-22bb-d37e-7b8bea0cef85",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c3451fb24,
          },
          "e-71": {
            id: "e-71",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-25",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-70",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "4f21cc60-d7ec-22bb-d37e-7b8bea0cef85",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "4f21cc60-d7ec-22bb-d37e-7b8bea0cef85",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c3451fb24,
          },
          "e-72": {
            id: "e-72",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-26",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-73",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "4f21cc60-d7ec-22bb-d37e-7b8bea0cef80",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "4f21cc60-d7ec-22bb-d37e-7b8bea0cef80",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c3457383a,
          },
          "e-73": {
            id: "e-73",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-27",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-72",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "4f21cc60-d7ec-22bb-d37e-7b8bea0cef80",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "4f21cc60-d7ec-22bb-d37e-7b8bea0cef80",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c3457383b,
          },
          "e-74": {
            id: "e-74",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-28",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-75",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "4f21cc60-d7ec-22bb-d37e-7b8bea0cef7b",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "4f21cc60-d7ec-22bb-d37e-7b8bea0cef7b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c3457932e,
          },
          "e-75": {
            id: "e-75",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-29",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-74",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "4f21cc60-d7ec-22bb-d37e-7b8bea0cef7b",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "4f21cc60-d7ec-22bb-d37e-7b8bea0cef7b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c3457932e,
          },
          "e-78": {
            id: "e-78",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-32",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-209",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".home-list_wrapper",
              originalId:
                "65829fa0372420389ec285ba|641bcb17-0980-81e4-a442-5bb301fb7694",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".home-list_wrapper",
                originalId:
                  "65829fa0372420389ec285ba|641bcb17-0980-81e4-a442-5bb301fb7694",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 25,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c3e7a413a,
          },
          "e-80": {
            id: "e-80",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_MOVE",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-34",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "principale|088b7e5f-f353-4ba5-4c8e-a58cc2ace56c",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale|088b7e5f-f353-4ba5-4c8e-a58cc2ace56c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-34-p",
                selectedAxis: "X_AXIS",
                basedOn: "ELEMENT",
                reverse: !1,
                smoothing: 94,
                restingState: 50,
              },
              {
                continuousParameterGroupId: "a-34-p-2",
                selectedAxis: "Y_AXIS",
                basedOn: "ELEMENT",
                reverse: !1,
                smoothing: 94,
                restingState: 50,
              },
            ],
            createdOn: 0x18c40c90eb3,
          },
          "e-99": {
            id: "e-99",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-51",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-105",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".accordion_item",
              originalId:
                "principale|2a20835e-f879-3d23-ab80-bc876fcac25c",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".accordion_item",
                originalId:
                  "principale|2a20835e-f879-3d23-ab80-bc876fcac25c",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c41425de2,
          },
          "e-107": {
            id: "e-107",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-54",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "principale|3473e7db-88ca-1dfc-9395-2b0a917af5ab",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale|3473e7db-88ca-1dfc-9395-2b0a917af5ab",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-54-p",
                smoothing: 50,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18c45e9c49e,
          },
          "e-108": {
            id: "e-108",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-55",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-109",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".intro_text",
              originalId:
                "principale|2a20835e-f879-3d23-ab80-bc876fcac228",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".intro_text",
                originalId:
                  "principale|2a20835e-f879-3d23-ab80-bc876fcac228",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c55754629,
          },
          "e-112": {
            id: "e-112",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-30",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-156",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "principale|38c283c7-052e-7bb6-6771-aae5acc63cef",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale|38c283c7-052e-7bb6-6771-aae5acc63cef",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c592a998f,
          },
          "e-113": {
            id: "e-113",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-31",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-155",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "principale|38c283c7-052e-7bb6-6771-aae5acc63cef",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale|38c283c7-052e-7bb6-6771-aae5acc63cef",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c592a9990,
          },
          "e-114": {
            id: "e-114",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-16",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-158",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".home-work_bottom-heading",
              originalId:
                "principale|3cc2cd98-e340-ee49-f0b8-a9f829289dd2",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".home-work_bottom-heading",
                originalId:
                  "principale|3cc2cd98-e340-ee49-f0b8-a9f829289dd2",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c59358725,
          },
          "e-115": {
            id: "e-115",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-17",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-157",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".home-work_bottom-heading",
              originalId:
                "principale|3cc2cd98-e340-ee49-f0b8-a9f829289dd2",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".home-work_bottom-heading",
                originalId:
                  "principale|3cc2cd98-e340-ee49-f0b8-a9f829289dd2",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c59358726,
          },
          "e-116": {
            id: "e-116",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-17",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-117",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".home-work_bottom-heading",
              originalId:
                "principale|3cc2cd98-e340-ee49-f0b8-a9f829289dd2",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".home-work_bottom-heading",
                originalId:
                  "principale|3cc2cd98-e340-ee49-f0b8-a9f829289dd2",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c59366354,
          },
          "e-117": {
            id: "e-117",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-16",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-116",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".home-work_bottom-heading",
              originalId:
                "principale|3cc2cd98-e340-ee49-f0b8-a9f829289dd2",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".home-work_bottom-heading",
                originalId:
                  "principale|3cc2cd98-e340-ee49-f0b8-a9f829289dd2",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c59366354,
          },
          "e-118": {
            id: "e-118",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-30",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-119",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "principale|912567aa-5a0a-1e90-e1fb-94fd20a0ff66",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale|912567aa-5a0a-1e90-e1fb-94fd20a0ff66",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5955607a,
          },
          "e-119": {
            id: "e-119",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-31",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-118",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "principale|912567aa-5a0a-1e90-e1fb-94fd20a0ff66",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale|912567aa-5a0a-1e90-e1fb-94fd20a0ff66",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5955607b,
          },
          "e-120": {
            id: "e-120",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-30",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-121",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "principale|0256c1a9-cf4c-39c1-4f24-67fe6bd34291",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale|0256c1a9-cf4c-39c1-4f24-67fe6bd34291",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5955d569,
          },
          "e-121": {
            id: "e-121",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-31",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-120",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "principale|0256c1a9-cf4c-39c1-4f24-67fe6bd34291",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale|0256c1a9-cf4c-39c1-4f24-67fe6bd34291",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5955d56b,
          },
          "e-127": {
            id: "e-127",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-17",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-128",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "principale|6c080657-0eaa-6930-93ec-c34f0cc3e606",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale|6c080657-0eaa-6930-93ec-c34f0cc3e606",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c59772127,
          },
          "e-128": {
            id: "e-128",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-16",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-127",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "principale|6c080657-0eaa-6930-93ec-c34f0cc3e606",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale|6c080657-0eaa-6930-93ec-c34f0cc3e606",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c59772128,
          },
          "e-129": {
            id: "e-129",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-16",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-130",
              },
            },
            mediaQueries: ["medium", "small", "tiny"],
            target: {
              id: "principale|18220703-e51d-a63a-7b26-bb95ebbad5e0",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale|18220703-e51d-a63a-7b26-bb95ebbad5e0",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5a0af176,
          },
          "e-130": {
            id: "e-130",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-17",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-129",
              },
            },
            mediaQueries: ["medium", "small", "tiny"],
            target: {
              id: "principale|18220703-e51d-a63a-7b26-bb95ebbad5e0",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale|18220703-e51d-a63a-7b26-bb95ebbad5e0",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5a0af177,
          },
          "e-131": {
            id: "e-131",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-45",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-132",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".stats_paragraph-wrapper",
              originalId:
                "principale|847932cc-eb9a-6e9f-fbab-6fb0930a0c08",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".stats_paragraph-wrapper",
                originalId:
                  "principale|847932cc-eb9a-6e9f-fbab-6fb0930a0c08",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5a183702,
          },
          "e-133": {
            id: "e-133",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-58",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-134",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".cta_button",
              originalId: "cfe2a08b-19da-c19b-7c55-d8a482c6da2f",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".cta_button",
                originalId: "cfe2a08b-19da-c19b-7c55-d8a482c6da2f",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5aba844b,
          },
          "e-134": {
            id: "e-134",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-59",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-133",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".cta_button",
              originalId: "cfe2a08b-19da-c19b-7c55-d8a482c6da2f",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".cta_button",
                originalId: "cfe2a08b-19da-c19b-7c55-d8a482c6da2f",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5aba844d,
          },
          "e-135": {
            id: "e-135",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-38",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-136",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "cfe2a08b-19da-c19b-7c55-d8a482c6da2f",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "cfe2a08b-19da-c19b-7c55-d8a482c6da2f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5da172e4,
          },
          "e-136": {
            id: "e-136",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-39",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-135",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "cfe2a08b-19da-c19b-7c55-d8a482c6da2f",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "cfe2a08b-19da-c19b-7c55-d8a482c6da2f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5da172e5,
          },
          "e-137": {
            id: "e-137",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-38",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-138",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "cfe2a08b-19da-c19b-7c55-d8a482c6da3b",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "cfe2a08b-19da-c19b-7c55-d8a482c6da3b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5da1ded4,
          },
          "e-138": {
            id: "e-138",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-39",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-137",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "cfe2a08b-19da-c19b-7c55-d8a482c6da3b",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "cfe2a08b-19da-c19b-7c55-d8a482c6da3b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5da1ded6,
          },
          "e-139": {
            id: "e-139",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-140",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "cfe2a08b-19da-c19b-7c55-d8a482c6da34",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "cfe2a08b-19da-c19b-7c55-d8a482c6da34",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5da77639,
          },
          "e-140": {
            id: "e-140",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-36",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-139",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "cfe2a08b-19da-c19b-7c55-d8a482c6da34",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "cfe2a08b-19da-c19b-7c55-d8a482c6da34",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5da7763b,
          },
          "e-143": {
            id: "e-143",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-144",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "principale|4a125a4f-9008-aaf8-3915-badb386fc12e",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale|4a125a4f-9008-aaf8-3915-badb386fc12e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5e020faa,
          },
          "e-144": {
            id: "e-144",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-60",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-143",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "principale|4a125a4f-9008-aaf8-3915-badb386fc12e",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale|4a125a4f-9008-aaf8-3915-badb386fc12e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5e020fab,
          },
          "e-147": {
            id: "e-147",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-62",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-148",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "a8223be7-a094-3e8d-465c-d169787a454c",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "a8223be7-a094-3e8d-465c-d169787a454c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c63575a1f,
          },
          "e-148": {
            id: "e-148",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-63",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-147",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "a8223be7-a094-3e8d-465c-d169787a454c",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "a8223be7-a094-3e8d-465c-d169787a454c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c63575a21,
          },
          "e-149": {
            id: "e-149",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-73",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-150",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "77aa8990-5788-23b5-0a36-1574c0c17030",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "77aa8990-5788-23b5-0a36-1574c0c17030",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c637221d7,
          },
          "e-150": {
            id: "e-150",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-60",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-149",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "77aa8990-5788-23b5-0a36-1574c0c17030",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "77aa8990-5788-23b5-0a36-1574c0c17030",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c637221d7,
          },
          "e-153": {
            id: "e-153",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-66",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-154",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6579c06cf4af153c45a9982e|05b1fc05-072a-0c98-8b4c-e106aefc448c",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6579c06cf4af153c45a9982e|05b1fc05-072a-0c98-8b4c-e106aefc448c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5906a72a,
          },
          "e-155": {
            id: "e-155",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-67",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-156",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6579c06cf4af153c45a9982e|05b1fc05-072a-0c98-8b4c-e106aefc448d",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6579c06cf4af153c45a9982e|05b1fc05-072a-0c98-8b4c-e106aefc448d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5acb247c,
          },
          "e-157": {
            id: "e-157",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-68",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-158",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6579c06cf4af153c45a9982e|05b1fc05-072a-0c98-8b4c-e106aefc448e",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6579c06cf4af153c45a9982e|05b1fc05-072a-0c98-8b4c-e106aefc448e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c5e85fbe2,
          },
          "e-159": {
            id: "e-159",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-69",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-160",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657a0be1ed34e35d33092b42|1b09fdd9-5179-c60d-f35d-e391a3bdb56c",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657a0be1ed34e35d33092b42|1b09fdd9-5179-c60d-f35d-e391a3bdb56c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c67b1216f,
          },
          "e-163": {
            id: "e-163",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-70",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-203",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657a0be1ed34e35d33092b42|837723a6-6cbe-dbc4-ae04-b42e4a6da087",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657a0be1ed34e35d33092b42|837723a6-6cbe-dbc4-ae04-b42e4a6da087",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c67b3fa6a,
          },
          "e-165": {
            id: "e-165",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-71",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-205",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657a0be1ed34e35d33092b42|e0eb32f3-d5d0-1317-f85a-858125440013",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657a0be1ed34e35d33092b42|e0eb32f3-d5d0-1317-f85a-858125440013",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c67b652dc,
          },
          "e-167": {
            id: "e-167",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-74",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-207",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657a0be1ed34e35d33092b42|29ccb1cd-2f0f-561a-562b-854aa2989bb0",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657a0be1ed34e35d33092b42|29ccb1cd-2f0f-561a-562b-854aa2989bb0",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c6dca7395,
          },
          "e-169": {
            id: "e-169",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "FADE_EFFECT",
              instant: !1,
              config: { actionListId: "fadeIn", autoStopEventId: "e-213" },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657a0be1ed34e35d33092b42|29ccb1cd-2f0f-561a-562b-854aa2989bb0",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657a0be1ed34e35d33092b42|29ccb1cd-2f0f-561a-562b-854aa2989bb0",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: 2e3,
              direction: null,
              effectIn: !0,
            },
            createdOn: 0x18c6de7ecad,
          },
          "e-171": {
            id: "e-171",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-75",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-211",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "657c66374225afd1563b6fa7|fa9fda56-50ec-1de9-8d47-2954787c50d5",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7|fa9fda56-50ec-1de9-8d47-2954787c50d5",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c7c51bdda,
          },
          "e-172": {
            id: "e-172",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-76",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-210",
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "657c66374225afd1563b6fa7|fa9fda56-50ec-1de9-8d47-2954787c50d5",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7|fa9fda56-50ec-1de9-8d47-2954787c50d5",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c7c51bddb,
          },
          "e-173": {
            id: "e-173",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-77",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-174",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657c66374225afd1563b6fa7|fa9fda56-50ec-1de9-8d47-2954787c50d5",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7|fa9fda56-50ec-1de9-8d47-2954787c50d5",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c7c535968,
          },
          "e-175": {
            id: "e-175",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-78",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-176",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".cta_button",
              originalId:
                "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16ae5",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".cta_button",
                originalId:
                  "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16ae5",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c7d7b565b,
          },
          "e-176": {
            id: "e-176",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-79",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-175",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".cta_button",
              originalId:
                "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16ae5",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".cta_button",
                originalId:
                  "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16ae5",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c7d7b565b,
          },
          "e-177": {
            id: "e-177",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-80",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-178",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16ae5",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16ae5",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c7d7b565b,
          },
          "e-178": {
            id: "e-178",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-81",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-177",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16ae5",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16ae5",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c7d7b565b,
          },
          "e-181": {
            id: "e-181",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-82",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-182",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16aeb",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16aeb",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c7d7b565b,
          },
          "e-182": {
            id: "e-182",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-83",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-181",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16aeb",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16aeb",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c7d7b565b,
          },
          "e-183": {
            id: "e-183",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-84",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-184",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16aea",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16aea",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c7d7b565b,
          },
          "e-184": {
            id: "e-184",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-85",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-183",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16aea",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16aea",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c7d7b565b,
          },
          "e-185": {
            id: "e-185",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-86",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-186",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16aee",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16aee",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 10,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c7d7e373d,
          },
          "e-186": {
            id: "e-186",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-87",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-185",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16aee",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16aee",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c7d7e373f,
          },
          "e-189": {
            id: "e-189",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-62",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-190",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16aed",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16aed",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c7d85b5d4,
          },
          "e-190": {
            id: "e-190",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-63",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-189",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16aed",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16aed",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c7d85b5d6,
          },
          "e-191": {
            id: "e-191",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-88",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657c66374225afd1563b6fa7|94114aa6-b98c-2cdc-3a07-a372a1e575b1",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7|94114aa6-b98c-2cdc-3a07-a372a1e575b1",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-88-p",
                smoothing: 87,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18c824faf15,
          },
          "e-192": {
            id: "e-192",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_START",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-89",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-193",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657c66374225afd1563b6fa7",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c825db3b4,
          },
          "e-196": {
            id: "e-196",
            name: "",
            animationType: "preset",
            eventTypeId: "PAGE_START",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-6",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-197",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65829fa0372420389ec285ba",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65829fa0372420389ec285ba",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c863f8d9f,
          },
          "e-198": {
            id: "e-198",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-90",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-96",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".divider_vertical-2",
              originalId:
                "657abfda68f42ee1deea93e6|c7932df9-c27c-2558-cbca-ee1c9489598a",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".divider_vertical-2",
                originalId:
                  "657abfda68f42ee1deea93e6|c7932df9-c27c-2558-cbca-ee1c9489598a",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c11830f9d,
          },
          "e-200": {
            id: "e-200",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-91",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-105",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".divider_horizontal-2",
              originalId:
                "657abfda68f42ee1deea93e6|a3055386-2709-8996-ed72-6b9b516a1853",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".divider_horizontal-2",
                originalId:
                  "657abfda68f42ee1deea93e6|a3055386-2709-8996-ed72-6b9b516a1853",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c117db553,
          },
          "e-201": {
            id: "e-201",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-92",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-99",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".divider_horizontal-2",
              originalId:
                "657abfda68f42ee1deea93e6|a3055386-2709-8996-ed72-6b9b516a1853",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".divider_horizontal-2",
                originalId:
                  "657abfda68f42ee1deea93e6|a3055386-2709-8996-ed72-6b9b516a1853",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c117db554,
          },
          "e-202": {
            id: "e-202",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-93",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-203",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65829fa0372420389ec285ba|d06caa0b-0999-eb42-a705-eaddff23f07e",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65829fa0372420389ec285ba|d06caa0b-0999-eb42-a705-eaddff23f07e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c68932b45,
          },
          "e-204": {
            id: "e-204",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-94",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-205",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65829fa0372420389ec285ba|75215c7d-36c7-aa9a-0c82-d445f6218a2e",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65829fa0372420389ec285ba|75215c7d-36c7-aa9a-0c82-d445f6218a2e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c6895ff07,
          },
          "e-206": {
            id: "e-206",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-94",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-207",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65829fa0372420389ec285ba|b01185ef-b0f7-5021-92de-2e2e07aa9abc",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65829fa0372420389ec285ba|b01185ef-b0f7-5021-92de-2e2e07aa9abc",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c6f4a11ae,
          },
          "e-208": {
            id: "e-208",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-95",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-209",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".home-list_wrapper-2",
              originalId:
                "65829fa0372420389ec285ba|641bcb17-0980-81e4-a442-5bb301fb7694",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".home-list_wrapper-2",
                originalId:
                  "65829fa0372420389ec285ba|641bcb17-0980-81e4-a442-5bb301fb7694",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 25,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c3e7a413a,
          },
          "e-210": {
            id: "e-210",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-96",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-211",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".grid-insta_post",
              originalId:
                "65829fa0372420389ec285ba|4d9fd97b-fa08-cf84-12c3-908f7a762879",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".grid-insta_post",
                originalId:
                  "65829fa0372420389ec285ba|4d9fd97b-fa08-cf84-12c3-908f7a762879",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c82df2201,
          },
          "e-211": {
            id: "e-211",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-97",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-210",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".grid-insta_post",
              originalId:
                "65829fa0372420389ec285ba|4d9fd97b-fa08-cf84-12c3-908f7a762879",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".grid-insta_post",
                originalId:
                  "65829fa0372420389ec285ba|4d9fd97b-fa08-cf84-12c3-908f7a762879",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c82df2202,
          },
          "e-212": {
            id: "e-212",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-94",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-213",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65829fa0372420389ec285ba|0a18ca3b-4c06-ff57-3c4d-d9a14fb2c32c",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65829fa0372420389ec285ba|0a18ca3b-4c06-ff57-3c4d-d9a14fb2c32c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c7e41290f,
          },
          "e-218": {
            id: "e-218",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-100",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-219",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657c66374225afd1563b6fa7|94d71c7c-e7ea-c60a-b4ac-0c56d7e0eea8",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7|94d71c7c-e7ea-c60a-b4ac-0c56d7e0eea8",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: 0,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c87752d4d,
          },
          "e-219": {
            id: "e-219",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_OUT_OF_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-101",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-218",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657c66374225afd1563b6fa7|94d71c7c-e7ea-c60a-b4ac-0c56d7e0eea8",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7|94d71c7c-e7ea-c60a-b4ac-0c56d7e0eea8",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !0,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: 0,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c87752d50,
          },
          "e-220": {
            id: "e-220",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-102",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|ad488e4b-cf58-e0ba-2442-cf6c6714c40c",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|ad488e4b-cf58-e0ba-2442-cf6c6714c40c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-102-p",
                smoothing: 82,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 1704362805e3,
          },
          "e-221": {
            id: "e-221",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_START",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-109",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-222",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "principale",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18cd5224ce0,
          },
          "e-223": {
            id: "e-223",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_START",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-98",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-224",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65829fa0372420389ec285ba",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65829fa0372420389ec285ba",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18cd52ff6ab,
          },
          "e-225": {
            id: "e-225",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-103",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-226",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "2edfa3c0-a986-f394-36be-734aaf39e670",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "2edfa3c0-a986-f394-36be-734aaf39e670",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18cd53a7764,
          },
          "e-227": {
            id: "e-227",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_START",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-98",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-228",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18cd59e2a80,
          },
          "e-229": {
            id: "e-229",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_START",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-98",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-230",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657c66374225afd1563b6fa7",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18cd59e6902,
          },
          "e-231": {
            id: "e-231",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_START",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-98",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-232",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6579c06cf4af153c45a9982e",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6579c06cf4af153c45a9982e",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18cd59eb0f5,
          },
          "e-233": {
            id: "e-233",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_START",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-98",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-234",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657a0be1ed34e35d33092b42",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657a0be1ed34e35d33092b42",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18cd59ee71c,
          },
          "e-235": {
            id: "e-235",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-54",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65829fa0372420389ec285ba|bf85d387-9aa5-fa18-d3de-78702630b74e",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65829fa0372420389ec285ba|bf85d387-9aa5-fa18-d3de-78702630b74e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-54-p",
                smoothing: 50,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18ce3a9ce1d,
          },
          "e-236": {
            id: "e-236",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-54",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|ad488e4b-cf58-e0ba-2442-cf6c6714c40c",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|ad488e4b-cf58-e0ba-2442-cf6c6714c40c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-54-p",
                smoothing: 50,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18ce3ab891f,
          },
          "e-237": {
            id: "e-237",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-54",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "657c66374225afd1563b6fa7|7809c03f-64d6-7d24-5bd2-0fe60dc49643",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "657c66374225afd1563b6fa7|7809c03f-64d6-7d24-5bd2-0fe60dc49643",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-54-p",
                smoothing: 50,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18ce3ac2095,
          },
          "e-238": {
            id: "e-238",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-105",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-239",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65829fa0372420389ec285ba|0392cbcb-cdeb-b9b5-355d-0a90511a6a64",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65829fa0372420389ec285ba|0392cbcb-cdeb-b9b5-355d-0a90511a6a64",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !0,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18ce8e218bb,
          },
          "e-240": {
            id: "e-240",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-106",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["medium", "small", "tiny"],
            target: {
              id: "principale|3473e7db-88ca-1dfc-9395-2b0a917af5ab",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale|3473e7db-88ca-1dfc-9395-2b0a917af5ab",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-106-p",
                smoothing: 50,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18cedb4b1f2,
          },
          "e-241": {
            id: "e-241",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-107",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-242",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".nav-anchor-trigger",
              originalId: "fa6ebccc-b9ca-cfd6-1fb2-b8076552b8cf",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".nav-anchor-trigger",
                originalId: "fa6ebccc-b9ca-cfd6-1fb2-b8076552b8cf",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d3ac2db1f,
          },
          "e-242": {
            id: "e-242",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-108",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-241",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".nav-anchor-trigger",
              originalId: "fa6ebccc-b9ca-cfd6-1fb2-b8076552b8cf",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".nav-anchor-trigger",
                originalId: "fa6ebccc-b9ca-cfd6-1fb2-b8076552b8cf",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d3ac2db21,
          },
          "e-243": {
            id: "e-243",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_MOVE",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-57",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "principale|a6cd0a33-1218-052c-292a-1036f26a1782",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "principale|a6cd0a33-1218-052c-292a-1036f26a1782",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-57-p",
                selectedAxis: "X_AXIS",
                basedOn: "ELEMENT",
                reverse: !1,
                smoothing: 90,
                restingState: 50,
              },
              {
                continuousParameterGroupId: "a-57-p-2",
                selectedAxis: "Y_AXIS",
                basedOn: "ELEMENT",
                reverse: !1,
                smoothing: 90,
                restingState: 50,
              },
            ],
            createdOn: 0x18d3b7c4238,
          },
          "e-248": {
            id: "e-248",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-8",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-249",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6017410a-448f-c9d3-6768-b0f66294aa1a",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6017410a-448f-c9d3-6768-b0f66294aa1a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18dae389496,
          },
          "e-249": {
            id: "e-249",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-11",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-248",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6017410a-448f-c9d3-6768-b0f66294aa1a",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6017410a-448f-c9d3-6768-b0f66294aa1a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18dae389496,
          },
          "e-250": {
            id: "e-250",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-9",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-251",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6017410a-448f-c9d3-6768-b0f66294aa1a",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6017410a-448f-c9d3-6768-b0f66294aa1a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18dae389496,
          },
          "e-251": {
            id: "e-251",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-10",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-250",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6017410a-448f-c9d3-6768-b0f66294aa1a",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6017410a-448f-c9d3-6768-b0f66294aa1a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18dae389496,
          },
          "e-252": {
            id: "e-252",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-110",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-253",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|fecad30a-0406-087e-c080-6bf8f0c3d686",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|fecad30a-0406-087e-c080-6bf8f0c3d686",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18db24dd628,
          },
          "e-253": {
            id: "e-253",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-111",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-252",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|fecad30a-0406-087e-c080-6bf8f0c3d686",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|fecad30a-0406-087e-c080-6bf8f0c3d686",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18db24dd628,
          },
          "e-254": {
            id: "e-254",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-112",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-255",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|fecad30a-0406-087e-c080-6bf8f0c3d686",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|fecad30a-0406-087e-c080-6bf8f0c3d686",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18db24dd628,
          },
          "e-255": {
            id: "e-255",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-113",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-254",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|fecad30a-0406-087e-c080-6bf8f0c3d686",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|fecad30a-0406-087e-c080-6bf8f0c3d686",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18db24dd628,
          },
          "e-256": {
            id: "e-256",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-110",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-257",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|ed412e33-0dc3-8a81-06ac-4564573b7777",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|ed412e33-0dc3-8a81-06ac-4564573b7777",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18db24f801d,
          },
          "e-257": {
            id: "e-257",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-111",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-256",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|ed412e33-0dc3-8a81-06ac-4564573b7777",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|ed412e33-0dc3-8a81-06ac-4564573b7777",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18db24f801d,
          },
          "e-258": {
            id: "e-258",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-112",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-259",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|ed412e33-0dc3-8a81-06ac-4564573b7777",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|ed412e33-0dc3-8a81-06ac-4564573b7777",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18db24f801d,
          },
          "e-259": {
            id: "e-259",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-113",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-258",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|ed412e33-0dc3-8a81-06ac-4564573b7777",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65613221eb7a32ab6dfdd75b|ed412e33-0dc3-8a81-06ac-4564573b7777",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18db24f801d,
          },
          "e-260": {
            id: "e-260",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-9",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-261",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|44501708-aa44-ed88-ea60-07fb4e2a5398",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19adb426bad,
          },
          "e-261": {
            id: "e-261",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-10",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-260",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|44501708-aa44-ed88-ea60-07fb4e2a5398",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19adb426bad,
          },
          "e-262": {
            id: "e-262",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-8",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-263",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|44501708-aa44-ed88-ea60-07fb4e2a5398",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19adb426bad,
          },
          "e-263": {
            id: "e-263",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-11",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-262",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65613221eb7a32ab6dfdd75b|44501708-aa44-ed88-ea60-07fb4e2a5398",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19adb426bad,
          },
        },
        actionLists: {
          a: {
            id: "a",
            title: "nav /OPEN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-n-3",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        selector: ".main-wrapper",
                        selectorGuids: ["07815991-952a-8d98-0e00-e4c25af27150"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-n-9",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".main-wrapper",
                        selectorGuids: ["07815991-952a-8d98-0e00-e4c25af27150"],
                      },
                      globalSwatchId: "",
                      rValue: 255,
                      bValue: 255,
                      gValue: 255,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-n-10",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".nav-primary",
                        selectorGuids: ["9e6718cb-b0b3-49d8-9327-29edd019479d"],
                      },
                      yValue: -100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-n-13",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".main-wrapper_corners",
                        selectorGuids: ["81c94af8-7c63-9339-603f-13cb1fb78231"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-n-14",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".main-wrapper_outline",
                        selectorGuids: ["66f7260a-3cde-ff8e-8bca-8ef6dc2c68cb"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-n-16",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".main-wrapper_corners",
                        selectorGuids: ["81c94af8-7c63-9339-603f-13cb1fb78231"],
                      },
                      yValue: -1.2,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-n-18",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-button_logo",
                        selectorGuids: ["033eac0a-9fd1-d196-dc4e-19f977621dd5"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-n-22",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "19262a9a-f243-0a55-ab52-efed2ac1829f",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-n-23",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "19262a9a-f243-0a55-ab52-efed2ac1829e",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-n-24",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-button_logo",
                        selectorGuids: ["033eac0a-9fd1-d196-dc4e-19f977621dd5"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-n-27",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "19262a9a-f243-0a55-ab52-efed2ac1829f",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-n-28",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-button_background",
                        selectorGuids: ["707754c3-ce0e-501f-94e8-0db6a1bbc303"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-n-30",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".main-wrapper_overlay",
                        selectorGuids: ["d2dbd983-d115-f590-a843-12cfa345b04e"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-n-34",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".footer-corner",
                        selectorGuids: ["544a4bec-056a-3ff3-f23e-7c445455d270"],
                      },
                      xValue: 0,
                      yValue: 0,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-n-38",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        selector: ".main-wrapper",
                        selectorGuids: ["07815991-952a-8d98-0e00-e4c25af27150"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        selector: ".main-wrapper",
                        selectorGuids: ["07815991-952a-8d98-0e00-e4c25af27150"],
                      },
                      xValue: 0.975,
                      yValue: 0.975,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-n-5",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 0,
                      target: {
                        id: "principale|60d3f7b8b0e86c28630fc6d6",
                      },
                      globalSwatchId: "",
                      rValue: 28,
                      bValue: 28,
                      gValue: 28,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-n-8",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 0,
                      target: {
                        selector: ".main-wrapper",
                        selectorGuids: ["07815991-952a-8d98-0e00-e4c25af27150"],
                      },
                      globalSwatchId: "",
                      rValue: 255,
                      bValue: 255,
                      gValue: 255,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-n-11",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".nav-primary",
                        selectorGuids: ["9e6718cb-b0b3-49d8-9327-29edd019479d"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-n-12",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        selector: ".main-wrapper_corners",
                        selectorGuids: ["81c94af8-7c63-9339-603f-13cb1fb78231"],
                      },
                      xValue: 0.977,
                      yValue: 0.977,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-n-15",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 500,
                      target: {
                        selector: ".main-wrapper_outline",
                        selectorGuids: ["66f7260a-3cde-ff8e-8bca-8ef6dc2c68cb"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-n-17",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        selector: ".main-wrapper_corners",
                        selectorGuids: ["81c94af8-7c63-9339-603f-13cb1fb78231"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-n-19",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-button_logo",
                        selectorGuids: ["033eac0a-9fd1-d196-dc4e-19f977621dd5"],
                      },
                      yValue: 1.5,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-n-20",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "19262a9a-f243-0a55-ab52-efed2ac1829f",
                      },
                      yValue: 1.5,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-n-21",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "19262a9a-f243-0a55-ab52-efed2ac1829e",
                      },
                      yValue: -0.7,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-n-25",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-button_logo",
                        selectorGuids: ["033eac0a-9fd1-d196-dc4e-19f977621dd5"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-n-26",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "19262a9a-f243-0a55-ab52-efed2ac1829f",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-n-29",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-button_background",
                        selectorGuids: ["707754c3-ce0e-501f-94e8-0db6a1bbc303"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-n-31",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        selector: ".main-wrapper_overlay",
                        selectorGuids: ["d2dbd983-d115-f590-a843-12cfa345b04e"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-n-32",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-button_selection",
                        selectorGuids: ["540e4424-d95b-dda2-b596-96acc547e074"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-n-35",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        selector: ".footer-corner",
                        selectorGuids: ["544a4bec-056a-3ff3-f23e-7c445455d270"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-n-36",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".main-wrapper_overlay",
                        selectorGuids: ["d2dbd983-d115-f590-a843-12cfa345b04e"],
                      },
                      value: "block",
                    },
                  },
                  {
                    id: "a-n-37",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        selector: ".main-wrapper",
                        selectorGuids: ["07815991-952a-8d98-0e00-e4c25af27150"],
                      },
                      yValue: 16,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18b54475af6,
          },
          "a-3": {
            id: "a-3",
            title: "nav /CLOSE",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-3-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        selector: ".main-wrapper",
                        selectorGuids: ["07815991-952a-8d98-0e00-e4c25af27150"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-3-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        selector: ".main-wrapper",
                        selectorGuids: ["07815991-952a-8d98-0e00-e4c25af27150"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-3-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".nav-primary",
                        selectorGuids: ["9e6718cb-b0b3-49d8-9327-29edd019479d"],
                      },
                      yValue: -100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-3-n-6",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        selector: ".main-wrapper_corners",
                        selectorGuids: ["81c94af8-7c63-9339-603f-13cb1fb78231"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-3-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        selector: ".main-wrapper_outline",
                        selectorGuids: ["66f7260a-3cde-ff8e-8bca-8ef6dc2c68cb"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-3-n-8",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        selector: ".main-wrapper_corners",
                        selectorGuids: ["81c94af8-7c63-9339-603f-13cb1fb78231"],
                      },
                      yValue: -1.2,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-3-n-9",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-button_logo",
                        selectorGuids: ["033eac0a-9fd1-d196-dc4e-19f977621dd5"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-3-n-10",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "19262a9a-f243-0a55-ab52-efed2ac1829f",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-3-n-11",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "19262a9a-f243-0a55-ab52-efed2ac1829e",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-3-n-12",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-button_logo",
                        selectorGuids: ["033eac0a-9fd1-d196-dc4e-19f977621dd5"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-3-n-13",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "19262a9a-f243-0a55-ab52-efed2ac1829f",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-3-n-14",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-button_background",
                        selectorGuids: ["707754c3-ce0e-501f-94e8-0db6a1bbc303"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-3-n-15",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        selector: ".main-wrapper_overlay",
                        selectorGuids: ["d2dbd983-d115-f590-a843-12cfa345b04e"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-3-n-17",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        selector: ".footer-corner",
                        selectorGuids: ["544a4bec-056a-3ff3-f23e-7c445455d270"],
                      },
                      xValue: 0,
                      yValue: 0,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-3-n-16",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 200,
                      easing: "outQuart",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-button_selection",
                        selectorGuids: ["540e4424-d95b-dda2-b596-96acc547e074"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-3-n-4",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 750,
                      easing: "inOutQuart",
                      duration: 0,
                      target: {
                        selector: ".main-wrapper",
                        selectorGuids: ["07815991-952a-8d98-0e00-e4c25af27150"],
                      },
                      globalSwatchId: "",
                      rValue: 255,
                      bValue: 255,
                      gValue: 255,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-3-n-18",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 750,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".main-wrapper_overlay",
                        selectorGuids: ["d2dbd983-d115-f590-a843-12cfa345b04e"],
                      },
                      value: "none",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18b54475af6,
          },
          "a-4": {
            id: "a-4",
            title: "swiper hover /IN",
            actionItemGroups: [
              {
                actionItems: [
             
                  {
                    id: "a-4-n-4",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".home-hero_feed-item-arrow",
                        selectorGuids: ["5ad85838-d8ac-6d7a-1dfc-3738bcfa57c3"],
                      },
                      value: 100,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18b91b28df6,
          },
          "a-5": {
            id: "a-5",
            title: "swiper hover /OUT",
            actionItemGroups: [
              {
                actionItems: [
        
                  {
                    id: "a-5-n-4",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".home-hero_feed-item-arrow",
                        selectorGuids: ["5ad85838-d8ac-6d7a-1dfc-3738bcfa57c3"],
                      },
                      value: 0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18b91b28df6,
          },
          "a-104": {
            id: "a-104",
            title: "feed load /IN V2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-104-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "principale|cbaa3f98-e1b2-0a1f-75f9-3fa0f62cd1b5",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-104-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "principale|d69a266c-19c5-782a-21f9-8bc8e42fbb9d",
                      },
                      value: 0,
                      unit: "",
                    },
                  },

                ],
              },
              {
                actionItems: [
                  {
                    id: "a-104-n-12",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 1e3,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        selector: ".home-hero_feed",
                        selectorGuids: ["026d99ad-827f-2ef6-2b46-93d36f7b4a8d"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-104-n-16",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 2e3,
                      easing: "",
                      duration: 200,
                      target: {
                        id: "principale|cbaa3f98-e1b2-0a1f-75f9-3fa0f62cd1b5",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-104-n-17",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 2e3,
                      easing: "",
                      duration: 200,
                      target: {
                        id: "principale|d69a266c-19c5-782a-21f9-8bc8e42fbb9d",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18bf89d8e4d,
          },
          "a-7": {
            id: "a-7",
            title: "about load /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-7-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".hero-about_lottie-desktop",
                        selectorGuids: ["322a6a3c-7adb-6cf7-8fc9-643596e8d056"],
                      },
                      value: 0,
                    },
                  },
                  {
                    id: "a-7-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".hero_about-txt.is-2",
                        selectorGuids: [
                          "50c1ed42-f7ac-7be2-d350-ff40d15389ee",
                          "0bcb4301-d8af-8d82-ed64-e4d27ba11030",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-7-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 400,
                      target: {
                        selector: ".hero_about-txt.is-1",
                        selectorGuids: [
                          "50c1ed42-f7ac-7be2-d350-ff40d15389ee",
                          "7ea9b25a-f1d8-823e-620b-31b09d233461",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-7-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".hero_about-txt.is-3",
                        selectorGuids: [
                          "50c1ed42-f7ac-7be2-d350-ff40d15389ee",
                          "e74ec4e2-2277-908c-f2e8-df60e8248a41",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-7-n-10",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 400,
                      target: {
                        selector: ".hero_about-txt.is-4",
                        selectorGuids: [
                          "50c1ed42-f7ac-7be2-d350-ff40d15389ee",
                          "2fbb39db-180f-4f3c-f50a-571e821f082e",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-7-n-11",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".hero_about-txt.is-5",
                        selectorGuids: [
                          "50c1ed42-f7ac-7be2-d350-ff40d15389ee",
                          "610ad101-c6a0-b67d-d494-ed9d0c591f3b",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-7-n-13",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65613221eb7a32ab6dfdd75b|4f84d6ba-6efd-fde1-9d77-cfd78168785f",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-7-n-2",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 750,
                      easing: "inOutQuad",
                      duration: 4200,
                      target: {
                        selector: ".hero-about_lottie-desktop",
                        selectorGuids: ["322a6a3c-7adb-6cf7-8fc9-643596e8d056"],
                      },
                      value: 100,
                    },
                  },
                  {
                    id: "a-7-n-14",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 1250,
                      easing: "outQuart",
                      duration: 1e3,
                      target: {
                        id: "65613221eb7a32ab6dfdd75b|4f84d6ba-6efd-fde1-9d77-cfd78168785f",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-7-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 1300,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        selector: ".hero_about-txt.is-1",
                        selectorGuids: [
                          "50c1ed42-f7ac-7be2-d350-ff40d15389ee",
                          "7ea9b25a-f1d8-823e-620b-31b09d233461",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-7-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 1900,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        selector: ".hero_about-txt.is-2",
                        selectorGuids: [
                          "50c1ed42-f7ac-7be2-d350-ff40d15389ee",
                          "0bcb4301-d8af-8d82-ed64-e4d27ba11030",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-7-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 2200,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        selector: ".hero_about-txt.is-3",
                        selectorGuids: [
                          "50c1ed42-f7ac-7be2-d350-ff40d15389ee",
                          "e74ec4e2-2277-908c-f2e8-df60e8248a41",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-7-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 2700,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        selector: ".hero_about-txt.is-4",
                        selectorGuids: [
                          "50c1ed42-f7ac-7be2-d350-ff40d15389ee",
                          "2fbb39db-180f-4f3c-f50a-571e821f082e",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-7-n-12",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 3500,
                      easing: "easeInOut",
                      duration: 400,
                      target: {
                        selector: ".hero_about-txt.is-5",
                        selectorGuids: [
                          "50c1ed42-f7ac-7be2-d350-ff40d15389ee",
                          "610ad101-c6a0-b67d-d494-ed9d0c591f3b",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c03d18757,
          },
          "a-9": {
            id: "a-9",
            title: "about team accordion hover /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-9-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-circle",
                        selectorGuids: ["358bde5b-3521-834f-b864-2080cdbda3d8"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-9-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-circle",
                        selectorGuids: ["358bde5b-3521-834f-b864-2080cdbda3d8"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-9-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-initials",
                        selectorGuids: ["c39f7c5d-dc89-782e-4e3c-14242531d00d"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-9-n-7",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-initials",
                        selectorGuids: ["c39f7c5d-dc89-782e-4e3c-14242531d00d"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-9-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-border",
                        selectorGuids: ["c8d505b1-7380-2d76-60df-85030803e1b9"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-9-n-11",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_arrow",
                        selectorGuids: ["a9037442-9d07-1525-4359-30944845b723"],
                      },
                      yValue: -200,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-9-n-13",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_arrow",
                        selectorGuids: ["a9037442-9d07-1525-4359-30944845b723"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-9-n-2",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-circle",
                        selectorGuids: ["358bde5b-3521-834f-b864-2080cdbda3d8"],
                      },
                      xValue: 0.25,
                      yValue: 0.25,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-9-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-circle",
                        selectorGuids: ["358bde5b-3521-834f-b864-2080cdbda3d8"],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-9-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-initials",
                        selectorGuids: ["c39f7c5d-dc89-782e-4e3c-14242531d00d"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-9-n-8",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 650,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-initials",
                        selectorGuids: ["c39f7c5d-dc89-782e-4e3c-14242531d00d"],
                      },
                      yValue: 50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-9-n-10",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-border",
                        selectorGuids: ["c8d505b1-7380-2d76-60df-85030803e1b9"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-9-n-12",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutExpo",
                      duration: 900,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_arrow",
                        selectorGuids: ["a9037442-9d07-1525-4359-30944845b723"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-9-n-14",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_arrow",
                        selectorGuids: ["a9037442-9d07-1525-4359-30944845b723"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c10de9e05,
          },
          "a-10": {
            id: "a-10",
            title: "about team accordion hover /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-10-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-circle",
                        selectorGuids: ["358bde5b-3521-834f-b864-2080cdbda3d8"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-10-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-circle",
                        selectorGuids: ["358bde5b-3521-834f-b864-2080cdbda3d8"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-10-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-initials",
                        selectorGuids: ["c39f7c5d-dc89-782e-4e3c-14242531d00d"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-10-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-initials",
                        selectorGuids: ["c39f7c5d-dc89-782e-4e3c-14242531d00d"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-10-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-border",
                        selectorGuids: ["c8d505b1-7380-2d76-60df-85030803e1b9"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-10-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_arrow",
                        selectorGuids: ["a9037442-9d07-1525-4359-30944845b723"],
                      },
                      yValue: -200,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-10-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_arrow",
                        selectorGuids: ["a9037442-9d07-1525-4359-30944845b723"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c10de9e05,
          },
          "a-8": {
            id: "a-8",
            title: "about team accordion click /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-8-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".team_details",
                        selectorGuids: ["2024cd67-583c-65fb-ad62-1ffa6fcee884"],
                      },
                      heightValue: 0,
                      widthUnit: "PX",
                      heightUnit: "px",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-8-n-3",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".team_details-line",
                        selectorGuids: ["8f1bab6d-cfb7-a2cb-07e3-4e08aa344a47"],
                      },
                      widthValue: 0,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-8-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".team_details-grid",
                        selectorGuids: ["f7a1c324-3186-9b1f-8c2d-0c34a15d8aa8"],
                      },
                      yValue: 10,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-8-n-8",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_arrow",
                        selectorGuids: ["a9037442-9d07-1525-4359-30944845b723"],
                      },
                      xValue: null,
                      zValue: 0,
                      xUnit: "deg",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-8-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector:
                          ".text-size-medium.text-weight-normal.text-style-serif.text-style-italic",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af2715c",
                          "d5e9bed3-b733-2fee-df37-19f2425ba3a4",
                          "b856656a-769c-ef93-6078-b14d381af2c0",
                          "7cf29171-6279-dbed-f3de-45132c246bb2",
                        ],
                      },
                      value: 0.5,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-8-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1500,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".team_details",
                        selectorGuids: ["2024cd67-583c-65fb-ad62-1ffa6fcee884"],
                      },
                      widthUnit: "PX",
                      heightUnit: "AUTO",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-8-n-4",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 2e3,
                      target: {
                        selector: ".team_details-line",
                        selectorGuids: ["8f1bab6d-cfb7-a2cb-07e3-4e08aa344a47"],
                      },
                      widthValue: 100,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-8-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 2e3,
                      target: {
                        selector: ".team_details-grid",
                        selectorGuids: ["f7a1c324-3186-9b1f-8c2d-0c34a15d8aa8"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-8-n-7",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_arrow",
                        selectorGuids: ["a9037442-9d07-1525-4359-30944845b723"],
                      },
                      xValue: null,
                      zValue: 180,
                      xUnit: "deg",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-8-n-10",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector:
                          ".text-size-medium.text-weight-normal.text-style-serif.text-style-italic",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af2715c",
                          "d5e9bed3-b733-2fee-df37-19f2425ba3a4",
                          "b856656a-769c-ef93-6078-b14d381af2c0",
                          "7cf29171-6279-dbed-f3de-45132c246bb2",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c0dac91cd,
          },
          "a-11": {
            id: "a-11",
            title: "about team accordion click /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-11-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1500,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".team_details",
                        selectorGuids: ["2024cd67-583c-65fb-ad62-1ffa6fcee884"],
                      },
                      heightValue: 0,
                      widthUnit: "PX",
                      heightUnit: "px",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-11-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 2e3,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".team_details-line",
                        selectorGuids: ["8f1bab6d-cfb7-a2cb-07e3-4e08aa344a47"],
                      },
                      widthValue: 0,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-11-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_details-grid",
                        selectorGuids: ["f7a1c324-3186-9b1f-8c2d-0c34a15d8aa8"],
                      },
                      yValue: 10,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-11-n-4",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_arrow",
                        selectorGuids: ["a9037442-9d07-1525-4359-30944845b723"],
                      },
                      xValue: null,
                      zValue: 0,
                      xUnit: "deg",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-11-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector:
                          ".text-size-medium.text-weight-normal.text-style-serif.text-style-italic",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af2715c",
                          "d5e9bed3-b733-2fee-df37-19f2425ba3a4",
                          "b856656a-769c-ef93-6078-b14d381af2c0",
                          "7cf29171-6279-dbed-f3de-45132c246bb2",
                        ],
                      },
                      value: 0.5,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c0dac91cd,
          },
          "a-12": {
            id: "a-12",
            title: "divider-horizontal /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-12-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "65613221eb7a32ab6dfdd75b|a3055386-2709-8996-ed72-6b9b516a1853",
                      },
                      widthValue: 0,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-12-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 2e3,
                      target: {
                        useEventTarget: !0,
                        id: "65613221eb7a32ab6dfdd75b|a3055386-2709-8996-ed72-6b9b516a1853",
                      },
                      widthValue: 100,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c117dbf12,
          },
          "a-13": {
            id: "a-13",
            title: "divider-horizontal /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-13-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: !0,
                        id: "65613221eb7a32ab6dfdd75b|a3055386-2709-8996-ed72-6b9b516a1853",
                      },
                      widthValue: 0,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c117dbf12,
          },
          "a-14": {
            id: "a-14",
            title: "divider-vertical /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-14-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "65613221eb7a32ab6dfdd75b|c7932df9-c27c-2558-cbca-ee1c9489598a",
                      },
                      widthValue: 1,
                      heightValue: 0,
                      widthUnit: "px",
                      heightUnit: "%",
                      locked: !1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-14-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 2e3,
                      target: {
                        useEventTarget: !0,
                        id: "65613221eb7a32ab6dfdd75b|c7932df9-c27c-2558-cbca-ee1c9489598a",
                      },
                      widthValue: 1,
                      heightValue: 100,
                      widthUnit: "px",
                      heightUnit: "%",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c117dbf12,
          },
          "a-16": {
            id: "a-16",
            title: "button /DEFAULT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-16-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button_text-expander",
                        selectorGuids: ["cc3768c8-c9c0-c79c-ce89-de236d418716"],
                      },
                      widthValue: 1.5,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-16-n-3",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button_distancer",
                        selectorGuids: ["6b31a00a-82a7-4644-c556-d37612f9070e"],
                      },
                      widthValue: 0,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-16-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button_text-expander",
                        selectorGuids: ["cc3768c8-c9c0-c79c-ce89-de236d418716"],
                      },
                      widthValue: 0,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-16-n-4",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button_distancer",
                        selectorGuids: ["6b31a00a-82a7-4644-c556-d37612f9070e"],
                      },
                      widthValue: 2,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-16-n-5",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 250,
                      easing: "outExpo",
                      duration: 1500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button_arrow",
                        selectorGuids: ["3b5cbdcc-ec35-6795-f444-1e3d3c9fbd9b"],
                      },
                      value: 100,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c203c1ecc,
          },
          "a-17": {
            id: "a-17",
            title: "button /ACTIVE",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-17-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button_text-expander",
                        selectorGuids: ["cc3768c8-c9c0-c79c-ce89-de236d418716"],
                      },
                      widthValue: 1.5,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-17-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button_distancer",
                        selectorGuids: ["6b31a00a-82a7-4644-c556-d37612f9070e"],
                      },
                      widthValue: 0,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-17-n-3",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button_arrow",
                        selectorGuids: ["3b5cbdcc-ec35-6795-f444-1e3d3c9fbd9b"],
                      },
                      value: 0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c203c1ecc,
          },
          "a-18": {
            id: "a-18",
            title: "menu link hover /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-18-n",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".nav-button_background",
                        selectorGuids: ["707754c3-ce0e-501f-94e8-0db6a1bbc303"],
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0.7,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-18-n-2",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 350,
                      target: {
                        selector: ".nav-button_background",
                        selectorGuids: ["707754c3-ce0e-501f-94e8-0db6a1bbc303"],
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0.7,
                    },
                  },
                  {
                    id: "a-18-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-button_logo",
                        selectorGuids: ["033eac0a-9fd1-d196-dc4e-19f977621dd5"],
                      },
                      xValue: -0.1,
                      xUnit: "rem",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c20d1a324,
          },
          "a-22": {
            id: "a-22",
            title: "menu link hover /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-22-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-button_logo",
                        selectorGuids: ["033eac0a-9fd1-d196-dc4e-19f977621dd5"],
                      },
                      xValue: 0,
                      xUnit: "rem",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-22-n",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 750,
                      target: {
                        selector: ".nav-button_background",
                        selectorGuids: ["707754c3-ce0e-501f-94e8-0db6a1bbc303"],
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0.7,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c20d1a324,
          },
          "a-21": {
            id: "a-21",
            title: "home work lottie in-view /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-21-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".home-work_lottie",
                        selectorGuids: ["60b1fb43-4487-caf8-f1c8-a342ff8d88b3"],
                      },
                      value: 20,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-21-n-2",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 4e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".home-work_lottie",
                        selectorGuids: ["60b1fb43-4487-caf8-f1c8-a342ff8d88b3"],
                      },
                      value: 99,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-21-n-3",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".home-work_lottie",
                        selectorGuids: ["60b1fb43-4487-caf8-f1c8-a342ff8d88b3"],
                      },
                      value: 0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c213ab688,
          },
          "a-23": {
            id: "a-23",
            title: "home work lottie in-view /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-23-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".home-work_lottie",
                        selectorGuids: ["60b1fb43-4487-caf8-f1c8-a342ff8d88b3"],
                      },
                      value: 20,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c213ab688,
          },
          "a-19": {
            id: "a-19",
            title: "menu aker hover /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-19-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        selector: ".nav-button_selection",
                        selectorGuids: ["540e4424-d95b-dda2-b596-96acc547e074"],
                      },
                      xValue: 0,
                      xUnit: "rem",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-19-n-4",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 1e3,
                      target: {
                        selector: ".nav-button_selection",
                        selectorGuids: ["540e4424-d95b-dda2-b596-96acc547e074"],
                      },
                      widthValue: 3,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-19-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 500,
                      target: {
                        selector: ".nav-button_selection",
                        selectorGuids: ["540e4424-d95b-dda2-b596-96acc547e074"],
                      },
                      xValue: -3.05,
                      xUnit: "rem",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-19-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 500,
                      target: {
                        selector: ".nav-button_selection",
                        selectorGuids: ["540e4424-d95b-dda2-b596-96acc547e074"],
                      },
                      widthValue: 3.7,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c20dbcfdc,
          },
          "a-20": {
            id: "a-20",
            title: "menu aker hover /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-20-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        selector: ".nav-button_selection",
                        selectorGuids: ["540e4424-d95b-dda2-b596-96acc547e074"],
                      },
                      xValue: 0,
                      xUnit: "rem",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-20-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        selector: ".nav-button_selection",
                        selectorGuids: ["540e4424-d95b-dda2-b596-96acc547e074"],
                      },
                      widthValue: 3,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c20dbcfdc,
          },
          "a-24": {
            id: "a-24",
            title: "work icon collective hover /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-24-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-icon_lottie.is-collective",
                        selectorGuids: [
                          "22ce71aa-e1f7-ba4e-58e0-b138d7c9f1e6",
                          "aec32dde-a87e-3d82-bffa-4a065421ee55",
                        ],
                      },
                      value: 0,
                    },
                  },
                  {
                    id: "a-24-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".footer_link-txt",
                        selectorGuids: ["723462a4-09f4-f34a-bbff-18c418d784a0"],
                      },
                      value: 0.55,
                      unit: "",
                    },
                  },
                  {
                    id: "a-24-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-primary_link",
                        selectorGuids: ["de16848b-90a0-b977-5dac-832f8456807e"],
                      },
                      value: 0.55,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-24-n-2",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 2800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-icon_lottie.is-collective",
                        selectorGuids: [
                          "22ce71aa-e1f7-ba4e-58e0-b138d7c9f1e6",
                          "aec32dde-a87e-3d82-bffa-4a065421ee55",
                        ],
                      },
                      value: 100,
                    },
                  },
                  {
                    id: "a-24-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".footer_link-txt",
                        selectorGuids: ["723462a4-09f4-f34a-bbff-18c418d784a0"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-24-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-primary_link",
                        selectorGuids: ["de16848b-90a0-b977-5dac-832f8456807e"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c24ae13cb,
          },
          "a-25": {
            id: "a-25",
            title: "work icon collective hover /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-25-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 2700,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-icon_lottie.is-collective",
                        selectorGuids: [
                          "22ce71aa-e1f7-ba4e-58e0-b138d7c9f1e6",
                          "aec32dde-a87e-3d82-bffa-4a065421ee55",
                        ],
                      },
                      value: 0,
                    },
                  },
                  {
                    id: "a-25-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".footer_link-txt",
                        selectorGuids: ["723462a4-09f4-f34a-bbff-18c418d784a0"],
                      },
                      value: 0.55,
                      unit: "",
                    },
                  },
                  {
                    id: "a-25-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-primary_link",
                        selectorGuids: ["de16848b-90a0-b977-5dac-832f8456807e"],
                      },
                      value: 0.55,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c24ae13cb,
          },
          "a-26": {
            id: "a-26",
            title: "work icon creative hover /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-26-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-icon_lottie.is-creative",
                        selectorGuids: [
                          "22ce71aa-e1f7-ba4e-58e0-b138d7c9f1e6",
                          "012fdce0-9d21-9b03-fe24-ab1502d71aeb",
                        ],
                      },
                      value: 0,
                    },
                  },
                  {
                    id: "a-26-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 3e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-primary_link",
                        selectorGuids: ["de16848b-90a0-b977-5dac-832f8456807e"],
                      },
                      value: 0.55,
                      unit: "",
                    },
                  },
                  {
                    id: "a-26-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".footer_link-txt",
                        selectorGuids: ["723462a4-09f4-f34a-bbff-18c418d784a0"],
                      },
                      value: 0.55,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-26-n-2",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 3500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-icon_lottie.is-creative",
                        selectorGuids: [
                          "22ce71aa-e1f7-ba4e-58e0-b138d7c9f1e6",
                          "012fdce0-9d21-9b03-fe24-ab1502d71aeb",
                        ],
                      },
                      value: 100,
                    },
                  },
                  {
                    id: "a-26-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-primary_link",
                        selectorGuids: ["de16848b-90a0-b977-5dac-832f8456807e"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-26-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".footer_link-txt",
                        selectorGuids: ["723462a4-09f4-f34a-bbff-18c418d784a0"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c24ae13cb,
          },
          "a-27": {
            id: "a-27",
            title: "work icon creative hover /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-27-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 3e3,
                      target: {
                        selector: ".work-icon_lottie.is-creative",
                        selectorGuids: [
                          "22ce71aa-e1f7-ba4e-58e0-b138d7c9f1e6",
                          "012fdce0-9d21-9b03-fe24-ab1502d71aeb",
                        ],
                      },
                      value: 0,
                    },
                  },
                  {
                    id: "a-27-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".footer_link-txt",
                        selectorGuids: ["723462a4-09f4-f34a-bbff-18c418d784a0"],
                      },
                      value: 0.55,
                      unit: "",
                    },
                  },
                  {
                    id: "a-27-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-primary_link",
                        selectorGuids: ["de16848b-90a0-b977-5dac-832f8456807e"],
                      },
                      value: 0.55,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c24ae13cb,
          },
          "a-28": {
            id: "a-28",
            title: "work icon foundation hover /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-28-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-icon_lottie.is-foundation",
                        selectorGuids: [
                          "22ce71aa-e1f7-ba4e-58e0-b138d7c9f1e6",
                          "e83338b2-9fba-9e15-023f-d0b46587d67c",
                        ],
                      },
                      value: 15,
                    },
                  },
                  {
                    id: "a-28-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-primary_link",
                        selectorGuids: ["de16848b-90a0-b977-5dac-832f8456807e"],
                      },
                      value: 0.55,
                      unit: "",
                    },
                  },
                  {
                    id: "a-28-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".footer_link-txt",
                        selectorGuids: ["723462a4-09f4-f34a-bbff-18c418d784a0"],
                      },
                      value: 0.55,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-28-n-2",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 2200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-icon_lottie.is-foundation",
                        selectorGuids: [
                          "22ce71aa-e1f7-ba4e-58e0-b138d7c9f1e6",
                          "e83338b2-9fba-9e15-023f-d0b46587d67c",
                        ],
                      },
                      value: 100,
                    },
                  },
                  {
                    id: "a-28-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-primary_link",
                        selectorGuids: ["de16848b-90a0-b977-5dac-832f8456807e"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-28-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".footer_link-txt",
                        selectorGuids: ["723462a4-09f4-f34a-bbff-18c418d784a0"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c24ae13cb,
          },
          "a-29": {
            id: "a-29",
            title: "work icon foundation hover /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-29-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 4e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-icon_lottie.is-foundation",
                        selectorGuids: [
                          "22ce71aa-e1f7-ba4e-58e0-b138d7c9f1e6",
                          "e83338b2-9fba-9e15-023f-d0b46587d67c",
                        ],
                      },
                      value: 15,
                    },
                  },
                  {
                    id: "a-29-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-primary_link",
                        selectorGuids: ["de16848b-90a0-b977-5dac-832f8456807e"],
                      },
                      value: 0.55,
                      unit: "",
                    },
                  },
                  {
                    id: "a-29-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".footer_link-txt",
                        selectorGuids: ["723462a4-09f4-f34a-bbff-18c418d784a0"],
                      },
                      value: 0.55,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c24ae13cb,
          },
          "a-32": {
            id: "a-32",
            title: "home list in-view /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-32-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".home-list_image",
                        selectorGuids: ["cc254131-1484-46b5-67a6-90bdb03bde51"],
                      },
                      widthValue: 20,
                      heightValue: 20,
                      widthUnit: "vw",
                      heightUnit: "vw",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-32-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".text-size-regular.text-style-muted",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27122",
                          "0467fb2d-ba72-51a1-4a36-bdc0f9eead04",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-32-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".heading-style-h4",
                        selectorGuids: ["07815991-952a-8d98-0e00-e4c25af27133"],
                      },
                      value: 0.25,
                      unit: "",
                    },
                  },
                  {
                    id: "a-32-n-7",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".text-size-regular.text-style-muted",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27122",
                          "0467fb2d-ba72-51a1-4a36-bdc0f9eead04",
                        ],
                      },
                      yValue: 1.5,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-32-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 2e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".home-list_image",
                        selectorGuids: ["cc254131-1484-46b5-67a6-90bdb03bde51"],
                      },
                      widthValue: 30,
                      heightValue: 20,
                      widthUnit: "vw",
                      heightUnit: "vw",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-32-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 2e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".text-size-regular.text-style-muted",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27122",
                          "0467fb2d-ba72-51a1-4a36-bdc0f9eead04",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-32-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 2e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".heading-style-h4",
                        selectorGuids: ["07815991-952a-8d98-0e00-e4c25af27133"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-32-n-8",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutExpo",
                      duration: 2e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".text-size-regular.text-style-muted",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27122",
                          "0467fb2d-ba72-51a1-4a36-bdc0f9eead04",
                        ],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c3e7a4c56,
          },
          "a-34": {
            id: "a-34",
            title: "map /OVER",
            continuousParameterGroups: [
              {
                id: "a-34-p",
                type: "MOUSE_X",
                parameterLabel: "Mouse X",
                continuousActionGroups: [
                  {
                    keyframe: 0,
                    actionItems: [
                      {
                        id: "a-34-n",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".map_wrapper",
                            selectorGuids: [
                              "f02214d1-c2fe-8a50-e176-672a34debb73",
                            ],
                          },
                          xValue: 3.5,
                          xUnit: "em",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 100,
                    actionItems: [
                      {
                        id: "a-34-n-2",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".map_wrapper",
                            selectorGuids: [
                              "f02214d1-c2fe-8a50-e176-672a34debb73",
                            ],
                          },
                          xValue: -0.5,
                          xUnit: "em",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: "a-34-p-2",
                type: "MOUSE_Y",
                parameterLabel: "Mouse Y",
                continuousActionGroups: [
                  {
                    keyframe: 0,
                    actionItems: [
                      {
                        id: "a-34-n-3",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".map_wrapper",
                            selectorGuids: [
                              "f02214d1-c2fe-8a50-e176-672a34debb73",
                            ],
                          },
                          yValue: 1,
                          xUnit: "PX",
                          yUnit: "em",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 100,
                    actionItems: [
                      {
                        id: "a-34-n-4",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".map_wrapper",
                            selectorGuids: [
                              "f02214d1-c2fe-8a50-e176-672a34debb73",
                            ],
                          },
                          yValue: -1,
                          xUnit: "PX",
                          yUnit: "em",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18c24edcfb7,
          },
          "a-51": {
            id: "a-51",
            title: "accordion tab click",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-51-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".accordion_bottom",
                        selectorGuids: ["9918ee1a-f475-eecd-3b6f-5e74db1f98c8"],
                      },
                      heightValue: 0,
                      widthUnit: "PX",
                      heightUnit: "px",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-51-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {},
                      value: 0.5,
                      unit: "",
                    },
                  },
                  {
                    id: "a-51-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {},
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-51-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {},
                      yValue: 1,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-51-n-5",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".accordion_button",
                        selectorGuids: ["9918ee1a-f475-eecd-3b6f-5e74db1f98d3"],
                      },
                      value: 0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-51-n-6",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".accordion_bottom",
                        selectorGuids: ["9918ee1a-f475-eecd-3b6f-5e74db1f98c8"],
                      },
                      widthUnit: "PX",
                      heightUnit: "AUTO",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-51-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 1e3,
                      target: {},
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-51-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {},
                      value: 0.5,
                      unit: "",
                    },
                  },
                  {
                    id: "a-51-n-9",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 2e3,
                      target: {},
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-51-n-10",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 6e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".accordion_button",
                        selectorGuids: ["9918ee1a-f475-eecd-3b6f-5e74db1f98d3"],
                      },
                      value: 100,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c413548b1,
          },
          // -----------------------------------------------


          // -----------------------------------------------

          "a-54": {
            id: "a-54",
            title: "Hero Section/Paralax",
            continuousParameterGroups: [
              {
                id: "a-54-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 0,
                    actionItems: [
                      {
                        id: "a-54-n-5",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            selector: ".hero_dark-overlay",
                            selectorGuids: [
                              "491b2a5c-0bdf-3b31-5d8d-502159c74488",
                            ],
                          },
                          value: 0,
                          unit: "",
                        },
                      },
                      {
                        id: "a-54-n-8",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            selector: ".home-hero_video-element",
                            selectorGuids: [
                              "00e0c4de-b738-9724-9d93-e82af1f9fe3a",
                            ],
                          },
                          yValue: 0,
                          xUnit: "PX",
                          yUnit: "rem",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-54-n-9",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".home-intro_text.max-width",
                            selectorGuids: [
                              "f65c96ea-8d23-d6cf-458a-2c8ffd8ead27",
                              "bea37a48-e9ca-4c3e-dfa4-a09bb6b144e8",
                            ],
                          },
                          yValue: -8,
                          xUnit: "PX",
                          yUnit: "rem",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 90,
                    actionItems: [
                      {
                        id: "a-54-n-6",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            selector: ".hero_dark-overlay",
                            selectorGuids: [
                              "491b2a5c-0bdf-3b31-5d8d-502159c74488",
                            ],
                          },
                          value: 1,
                          unit: "",
                        },
                      },
                      {
                        id: "a-54-n-7",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            selector: ".home-hero_video-element",
                            selectorGuids: [
                              "00e0c4de-b738-9724-9d93-e82af1f9fe3a",
                            ],
                          },
                          yValue: -15,
                          xUnit: "PX",
                          yUnit: "rem",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-54-n-10",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".home-intro_text.max-width",
                            selectorGuids: [
                              "f65c96ea-8d23-d6cf-458a-2c8ffd8ead27",
                              "bea37a48-e9ca-4c3e-dfa4-a09bb6b144e8",
                            ],
                          },
                          yValue: 0,
                          xUnit: "PX",
                          yUnit: "rem",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18c458a8c50,
          },
          "a-55": {
            id: "a-55",
            title: "intro text /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-55-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".text-size-small",
                        selectorGuids: ["07815991-952a-8d98-0e00-e4c25af27132"],
                      },
                      yValue: -110,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-55-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 300,
                      easing: "inOutQuad",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".text-size-small",
                        selectorGuids: ["07815991-952a-8d98-0e00-e4c25af27132"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c557553d2,
          },
          "a-30": {
            id: "a-30",
            title: "home work video hover /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-30-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".home-work_background-video",
                        selectorGuids: ["1a805ab6-7f1a-d081-3018-b69260bbc1c6"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-30-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".home-work_background-video",
                        selectorGuids: ["1a805ab6-7f1a-d081-3018-b69260bbc1c6"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c351e3cd0,
          },
          "a-31": {
            id: "a-31",
            title: "home work video hover /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-31-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".home-work_background-video",
                        selectorGuids: ["1a805ab6-7f1a-d081-3018-b69260bbc1c6"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c351e3cd0,
          },
          "a-45": {
            id: "a-45",
            title: "numbers paragraph in-view /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-45-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".text-size-regular.text-style-muted",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27122",
                          "0467fb2d-ba72-51a1-4a36-bdc0f9eead04",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-45-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".text-size-regular.text-style-muted",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27122",
                          "0467fb2d-ba72-51a1-4a36-bdc0f9eead04",
                        ],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-45-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 200,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".text-size-regular.text-style-muted",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27122",
                          "0467fb2d-ba72-51a1-4a36-bdc0f9eead04",
                        ],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-45-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 200,
                      easing: "",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".text-size-regular.text-style-muted",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27122",
                          "0467fb2d-ba72-51a1-4a36-bdc0f9eead04",
                        ],
                      },
                      value: 0.6,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c447aa836,
          },
          "a-58": {
            id: "a-58",
            title: "cta button hover /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-58-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button_arrow",
                        selectorGuids: ["3b5cbdcc-ec35-6795-f444-1e3d3c9fbd9b"],
                      },
                      value: 100,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c5abaa24b,
          },
          "a-59": {
            id: "a-59",
            title: "cta button hover /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-59-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button_arrow",
                        selectorGuids: ["3b5cbdcc-ec35-6795-f444-1e3d3c9fbd9b"],
                      },
                      value: 0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c5abaa24b,
          },
          "a-38": {
            id: "a-38",
            title: "cta button /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-38-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "cfe2a08b-19da-c19b-7c55-d8a482c6da2f",
                      },
                      widthValue: 12,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-38-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 100,
                      easing: "inOutQuad",
                      duration: 1100,
                      target: {
                        useEventTarget: !0,
                        id: "cfe2a08b-19da-c19b-7c55-d8a482c6da2f",
                      },
                      widthUnit: "AUTO",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c40e95295,
          },
          "a-39": {
            id: "a-39",
            title: "cta button /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-39-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: !0,
                        id: "cfe2a08b-19da-c19b-7c55-d8a482c6da2f",
                      },
                      widthValue: 12,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c40e95295,
          },
          "a-35": {
            id: "a-35",
            title: "cta component /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-35-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".cta_right-background-image",
                        selectorGuids: ["72872a34-1ba6-6bf7-0be4-6b7f5ed69cc6"],
                      },
                      xValue: 1.1,
                      yValue: 1.1,
                      locked: !0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-35-n-2",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 100,
                      easing: "outExpo",
                      duration: 2500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".cta_right-background-image",
                        selectorGuids: ["72872a34-1ba6-6bf7-0be4-6b7f5ed69cc6"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c40d0e733,
          },
          "a-36": {
            id: "a-36",
            title: "cta component /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-36-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".cta_right-background-image",
                        selectorGuids: ["72872a34-1ba6-6bf7-0be4-6b7f5ed69cc6"],
                      },
                      xValue: 1.1,
                      yValue: 1.1,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c40d0e733,
          },
          "a-56": {
            id: "a-56",
            title: "logo load /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-56-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-a",
                        selectorGuids: ["d83612f9-e6b0-0a60-b300-c2431c7f38eb"],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-56-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-k",
                        selectorGuids: ["c082db88-1bcc-af7c-cb95-2690336ad885"],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-56-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-e",
                        selectorGuids: ["cbc2a35f-4265-789a-a529-ed06d61d123c"],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-56-n-7",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-r",
                        selectorGuids: ["0e0b3edb-a142-80ae-ec67-62560700b8b1"],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-56-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-a",
                        selectorGuids: ["d83612f9-e6b0-0a60-b300-c2431c7f38eb"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-56-n-10",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-k",
                        selectorGuids: ["c082db88-1bcc-af7c-cb95-2690336ad885"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-56-n-11",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-e",
                        selectorGuids: ["cbc2a35f-4265-789a-a529-ed06d61d123c"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-56-n-12",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-r",
                        selectorGuids: ["0e0b3edb-a142-80ae-ec67-62560700b8b1"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-56-n-18",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "principale|ed4987fb-15e6-9d49-d688-4a2400dacff5",
                      },
                      xValue: 0,
                      locked: !1,
                    },
                  },
                  {
                    id: "a-56-n-20",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "principale|d5f883b4-1834-dde6-4a90-b517ff48c0a9",
                      },
                      yValue: 3,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-56-n-22",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "principale|d5f883b4-1834-dde6-4a90-b517ff48c0a9",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-56-n-17",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-r",
                        selectorGuids: ["0e0b3edb-a142-80ae-ec67-62560700b8b1"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-56-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 2500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-a",
                        selectorGuids: ["d83612f9-e6b0-0a60-b300-c2431c7f38eb"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-56-n-13",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-a",
                        selectorGuids: ["d83612f9-e6b0-0a60-b300-c2431c7f38eb"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-56-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 50,
                      easing: "outExpo",
                      duration: 2500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-k",
                        selectorGuids: ["c082db88-1bcc-af7c-cb95-2690336ad885"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-56-n-14",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 50,
                      easing: "",
                      duration: 200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-k",
                        selectorGuids: ["c082db88-1bcc-af7c-cb95-2690336ad885"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-56-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 100,
                      easing: "outExpo",
                      duration: 2500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-e",
                        selectorGuids: ["cbc2a35f-4265-789a-a529-ed06d61d123c"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-56-n-15",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 100,
                      easing: "",
                      duration: 200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-e",
                        selectorGuids: ["cbc2a35f-4265-789a-a529-ed06d61d123c"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-56-n-8",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 150,
                      easing: "outExpo",
                      duration: 2500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-r",
                        selectorGuids: ["0e0b3edb-a142-80ae-ec67-62560700b8b1"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-56-n-16",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 150,
                      easing: "",
                      duration: 200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-r",
                        selectorGuids: ["0e0b3edb-a142-80ae-ec67-62560700b8b1"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-56-n-23",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 150,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "principale|d5f883b4-1834-dde6-4a90-b517ff48c0a9",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-56-n-21",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 150,
                      easing: "outExpo",
                      duration: 2e3,
                      target: {
                        id: "principale|d5f883b4-1834-dde6-4a90-b517ff48c0a9",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-56-n-19",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 400,
                      easing: "outExpo",
                      duration: 2500,
                      target: {
                        id: "principale|ed4987fb-15e6-9d49-d688-4a2400dacff5",
                      },
                      xValue: 1,
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c586a9494,
          },
          "a-60": {
            id: "a-60",
            title: "logo /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-60-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-a",
                        selectorGuids: ["d83612f9-e6b0-0a60-b300-c2431c7f38eb"],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-60-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-k",
                        selectorGuids: ["c082db88-1bcc-af7c-cb95-2690336ad885"],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-60-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-e",
                        selectorGuids: ["cbc2a35f-4265-789a-a529-ed06d61d123c"],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-60-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-r",
                        selectorGuids: ["0e0b3edb-a142-80ae-ec67-62560700b8b1"],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-60-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-a",
                        selectorGuids: ["d83612f9-e6b0-0a60-b300-c2431c7f38eb"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-60-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-k",
                        selectorGuids: ["c082db88-1bcc-af7c-cb95-2690336ad885"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-60-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-e",
                        selectorGuids: ["cbc2a35f-4265-789a-a529-ed06d61d123c"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-60-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-r",
                        selectorGuids: ["0e0b3edb-a142-80ae-ec67-62560700b8b1"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c586a9494,
          },
          "a-62": {
            id: "a-62",
            title: "cta logo /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-62-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 5500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".cta_symbol",
                        selectorGuids: ["7c4428ce-79dd-6e19-fe3a-da7900535291"],
                      },
                      value: 100,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c6354ad46,
          },
          "a-63": {
            id: "a-63",
            title: "cta logo /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-63-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".cta_symbol",
                        selectorGuids: ["7c4428ce-79dd-6e19-fe3a-da7900535291"],
                      },
                      value: 0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c6354ad46,
          },
          "a-73": {
            id: "a-73",
            title: "logo footer /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-73-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-a",
                        selectorGuids: ["d83612f9-e6b0-0a60-b300-c2431c7f38eb"],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-73-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-k",
                        selectorGuids: ["c082db88-1bcc-af7c-cb95-2690336ad885"],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-73-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-e",
                        selectorGuids: ["cbc2a35f-4265-789a-a529-ed06d61d123c"],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-73-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-r",
                        selectorGuids: ["0e0b3edb-a142-80ae-ec67-62560700b8b1"],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-73-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-a",
                        selectorGuids: ["d83612f9-e6b0-0a60-b300-c2431c7f38eb"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-73-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-k",
                        selectorGuids: ["c082db88-1bcc-af7c-cb95-2690336ad885"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-73-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-e",
                        selectorGuids: ["cbc2a35f-4265-789a-a529-ed06d61d123c"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-73-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-r",
                        selectorGuids: ["0e0b3edb-a142-80ae-ec67-62560700b8b1"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-73-n-9",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "principale|ed4987fb-15e6-9d49-d688-4a2400dacff5",
                      },
                      xValue: 0,
                      locked: !1,
                    },
                  },
                  {
                    id: "a-73-n-10",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "principale|d5f883b4-1834-dde6-4a90-b517ff48c0a9",
                      },
                      yValue: 3,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-73-n-11",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "principale|d5f883b4-1834-dde6-4a90-b517ff48c0a9",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-73-n-13",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 2500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-a",
                        selectorGuids: ["d83612f9-e6b0-0a60-b300-c2431c7f38eb"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-73-n-14",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-a",
                        selectorGuids: ["d83612f9-e6b0-0a60-b300-c2431c7f38eb"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-73-n-15",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 50,
                      easing: "outExpo",
                      duration: 2500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-k",
                        selectorGuids: ["c082db88-1bcc-af7c-cb95-2690336ad885"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-73-n-16",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 50,
                      easing: "",
                      duration: 200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-k",
                        selectorGuids: ["c082db88-1bcc-af7c-cb95-2690336ad885"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-73-n-17",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 100,
                      easing: "outExpo",
                      duration: 2500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-e",
                        selectorGuids: ["cbc2a35f-4265-789a-a529-ed06d61d123c"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-73-n-18",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 100,
                      easing: "",
                      duration: 200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-e",
                        selectorGuids: ["cbc2a35f-4265-789a-a529-ed06d61d123c"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-73-n-19",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 150,
                      easing: "outExpo",
                      duration: 2500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-r",
                        selectorGuids: ["0e0b3edb-a142-80ae-ec67-62560700b8b1"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-73-n-20",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 150,
                      easing: "",
                      duration: 200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".aker_logo-r",
                        selectorGuids: ["0e0b3edb-a142-80ae-ec67-62560700b8b1"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-73-n-21",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 1500,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "principale|d5f883b4-1834-dde6-4a90-b517ff48c0a9",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-73-n-22",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 1500,
                      easing: "outExpo",
                      duration: 2200,
                      target: {
                        id: "principale|ed4987fb-15e6-9d49-d688-4a2400dacff5",
                      },
                      xValue: 1,
                      locked: !1,
                    },
                  },
                  {
                    id: "a-73-n-23",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 1500,
                      easing: "outExpo",
                      duration: 1500,
                      target: {
                        id: "principale|d5f883b4-1834-dde6-4a90-b517ff48c0a9",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c586a9494,
          },
          "a-66": {
            id: "a-66",
            title: "contact click #1",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-66-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".form_field.is-name",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec19",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec29",
                        ],
                      },
                      heightValue: 0,
                      widthUnit: "PX",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-66-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".form_field.is-name",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec19",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec29",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-66-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".form_field.is-input",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec19",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec2d",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-66-n-4",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".form_field.is-name",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec19",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec29",
                        ],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-66-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".form_submit-text",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec24"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-66-n-6",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".form_submit-text",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec24"],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-66-n-7",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".form_checkbox-field",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec07"],
                      },
                      widthValue: 0,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-66-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {},
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-66-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".form_checkbox-field",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec07"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-66-n-10",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".form_field_main-wrapper",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec20"],
                      },
                      yValue: 9.3,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-66-n-11",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        selector: ".form_field.is-name",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec19",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec29",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-66-n-12",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        selector: ".form_button-placeholder.is-email",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec0a",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec38",
                        ],
                      },
                      widthValue: 5,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-66-n-13",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".form_title",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec08"],
                      },
                      heightValue: 13,
                      widthUnit: "PX",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-66-n-14",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".form_title-text",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ebf5"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-66-n-15",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector:
                          ".form_title-heading.text-size-large.text-weight-medium",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec16",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec2e",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec3e",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-66-n-16",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1200,
                      target: {
                        selector: ".form_title",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec08"],
                      },
                      heightValue: 3,
                      widthUnit: "PX",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-66-n-17",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1200,
                      target: {
                        selector: ".form_title-text",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ebf5"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-66-n-18",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1200,
                      target: {
                        selector:
                          ".form_title-heading.text-size-large.text-weight-medium",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec16",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec2e",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec3e",
                        ],
                      },
                      xValue: 0.75,
                      yValue: 0.75,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-66-n-19",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1210,
                      target: {
                        selector:
                          ".form_title-heading.text-size-large.text-weight-medium",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec16",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec2e",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec3e",
                        ],
                      },
                      xValue: -0.8,
                      yValue: -0.25,
                      xUnit: "rem",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-66-n-20",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1200,
                      target: {
                        selector: ".form_number-wrapper",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ebff"],
                      },
                      yValue: -0.25,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-66-n-21",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        selector: ".form_field_main-wrapper",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec20"],
                      },
                      yValue: 5,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-66-n-22",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 0,
                      target: {
                        selector: ".form_field.is-name",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec19",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec29",
                        ],
                      },
                      value: "block",
                    },
                  },
                  {
                    id: "a-66-n-23",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1200,
                      target: {
                        selector: ".form_field.is-name",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec19",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec29",
                        ],
                      },
                      heightValue: 3.5,
                      widthUnit: "%",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-66-n-24",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        selector: ".form_field.is-name",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec19",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec29",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-66-n-25",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1800,
                      target: {
                        selector: ".form_number.is-moving",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec02",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec37",
                        ],
                      },
                      yValue: -1.53,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-66-n-26",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 100,
                      easing: "inOutQuart",
                      duration: 1800,
                      target: {
                        selector: ".form_button-placeholder.is-email",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec0a",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec38",
                        ],
                      },
                      widthValue: 0,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c5906b507,
          },
          "a-67": {
            id: "a-67",
            title: "contact click #2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-67-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1200,
                      target: {
                        selector: ".form_field.is-input",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec19",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec2d",
                        ],
                      },
                      widthValue: 100,
                      heightValue: 0,
                      widthUnit: "%",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-67-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1800,
                      target: {
                        selector: ".form_button-placeholder.is-name",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec0a",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec27",
                        ],
                      },
                      widthValue: 5,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-67-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        selector: ".form_field.is-input",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec19",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec2d",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-67-n-4",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1800,
                      target: {
                        selector: ".form_submit-button-wrapper",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec1e"],
                      },
                      widthValue: 3.5,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-67-n-5",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".form_checkbox-field",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec07"],
                      },
                      widthValue: 0,
                      widthUnit: "px",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-67-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".checkbox-label",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ebfb"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-67-n-7",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".checkbox-label",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ebfb"],
                      },
                      yValue: 2,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-67-n-8",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1400,
                      target: {
                        selector: ".form_field.is-input",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec19",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec2d",
                        ],
                      },
                      widthValue: 100,
                      heightValue: 12,
                      widthUnit: "%",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-67-n-9",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1800,
                      target: {
                        selector: ".form_number.is-moving",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec02",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec37",
                        ],
                      },
                      yValue: -3,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-67-n-10",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".form_submit-text",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec24"],
                      },
                      value: "block",
                    },
                  },
                  {
                    id: "a-67-n-11",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1800,
                      target: {
                        selector: ".form_checkbox-field",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec07"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-67-n-12",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1600,
                      target: {
                        selector: ".form_submit-text",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec24"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-67-n-13",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1800,
                      target: {
                        selector: ".checkbox-label",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ebfb"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-67-n-14",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1400,
                      target: {
                        selector: ".form_checkbox-field",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec07"],
                      },
                      widthValue: 18,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-67-n-15",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1400,
                      target: {
                        selector: ".checkbox-label",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ebfb"],
                      },
                      yValue: 0.07,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-67-n-16",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 0,
                      target: {
                        selector: ".form_field.is-input",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec19",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec2d",
                        ],
                      },
                      value: "block",
                    },
                  },
                  {
                    id: "a-67-n-17",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1400,
                      target: {
                        selector: ".form_field_main-wrapper",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec20"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-67-n-18",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 100,
                      easing: "inOutQuart",
                      duration: 1800,
                      target: {
                        selector: ".form_button-placeholder.is-name",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec0a",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec27",
                        ],
                      },
                      widthValue: 0,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-67-n-19",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 200,
                      easing: "inOutQuart",
                      duration: 1400,
                      target: {
                        selector: ".form_submit-button-wrapper",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec1e"],
                      },
                      widthValue: 11,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-67-n-20",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 800,
                      easing: "outExpo",
                      duration: 1200,
                      target: {
                        selector: ".form_field.is-input",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec19",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec2d",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c5906b507,
          },
          "a-68": {
            id: "a-68",
            title: "contact submit",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-68-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutExpo",
                      duration: 1e3,
                      target: {
                        selector: ".contact_submit-background",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ebf6"],
                      },
                      widthValue: 100,
                      heightValue: 0,
                      widthUnit: "%",
                      heightUnit: "%",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-68-n-2",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".contact_submit-header.animate-success",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec0f",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec34",
                        ],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-68-n-3",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".contact_submit-lottie",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec03"],
                      },
                      value: 0,
                    },
                  },
                  {
                    id: "a-68-n-4",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".contact_submit-wrapper",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec01"],
                      },
                      value: "none",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-68-n-5",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".contact_submit-wrapper",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec01"],
                      },
                      value: "flex",
                    },
                  },
                  {
                    id: "a-68-n-6",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutExpo",
                      duration: 1400,
                      target: {
                        selector: ".contact_submit-background",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ebf6"],
                      },
                      widthValue: 100,
                      heightValue: 100,
                      widthUnit: "%",
                      heightUnit: "%",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-68-n-7",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 500,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".contact_submit-header.animate-success",
                        selectorGuids: [
                          "49e48807-c514-6db7-b9b8-5cd24e99ec0f",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec34",
                        ],
                      },
                      value: "block",
                    },
                  },
                  {
                    id: "a-68-n-8",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 650,
                      easing: "",
                      duration: 2e3,
                      target: {
                        selector: ".contact_submit-lottie",
                        selectorGuids: ["49e48807-c514-6db7-b9b8-5cd24e99ec03"],
                      },
                      value: 100,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c5e862634,
          },
          "a-69": {
            id: "a-69",
            title: "text page date in-view /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-69-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".text-size-small.text-color-white",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27132",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec28",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-69-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".text-size-small.text-color-white",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27132",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec28",
                        ],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-69-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 200,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".text-size-small.text-color-white",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27132",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec28",
                        ],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-69-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 200,
                      easing: "",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".text-size-small.text-color-white",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27132",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec28",
                        ],
                      },
                      value: 0.6,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c447aa836,
          },
          "a-70": {
            id: "a-70",
            title: "text page image in-view /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-70-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".t-hero_bottom-graphic",
                        selectorGuids: ["43d96951-cf0c-68cc-75ff-6bb8bbfedb7b"],
                      },
                      xValue: 75,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-70-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".t-hero_bottom-graphic",
                        selectorGuids: ["43d96951-cf0c-68cc-75ff-6bb8bbfedb7b"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-70-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".t-hero_bottom-graphic",
                        selectorGuids: ["43d96951-cf0c-68cc-75ff-6bb8bbfedb7b"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-70-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".t-hero_bottom-graphic",
                        selectorGuids: ["43d96951-cf0c-68cc-75ff-6bb8bbfedb7b"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c67b41186,
          },
          "a-71": {
            id: "a-71",
            title: "text page category tag in-view /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-71-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector:
                          ".text-size-medium.text-color-white.text-style-serif",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af2715c",
                          "be90eba9-2dcb-c8cf-8850-a619d83c48e7",
                          "04ab3802-3385-fd47-d57b-ad181fb81af9",
                        ],
                      },
                      yValue: -105,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-71-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector:
                          ".text-size-medium.text-color-white.text-style-serif",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af2715c",
                          "be90eba9-2dcb-c8cf-8850-a619d83c48e7",
                          "04ab3802-3385-fd47-d57b-ad181fb81af9",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-71-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 500,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector:
                          ".text-size-medium.text-color-white.text-style-serif",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af2715c",
                          "be90eba9-2dcb-c8cf-8850-a619d83c48e7",
                          "04ab3802-3385-fd47-d57b-ad181fb81af9",
                        ],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-71-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 500,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector:
                          ".text-size-medium.text-color-white.text-style-serif",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af2715c",
                          "be90eba9-2dcb-c8cf-8850-a619d83c48e7",
                          "04ab3802-3385-fd47-d57b-ad181fb81af9",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c67b725a7,
          },
          "a-74": {
            id: "a-74",
            title: "text pages link copy",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-74-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".text-size-small.text-color-white",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27132",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec28",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-74-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".text-size-small.text-color-white",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27132",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec28",
                        ],
                      },
                      xValue: -1,
                      xUnit: "rem",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-74-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 750,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".text-size-small.text-color-white",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27132",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec28",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-74-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 750,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".text-size-small.text-color-white",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27132",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec28",
                        ],
                      },
                      xValue: 0,
                      xUnit: "rem",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-74-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 500,
                      easing: "outExpo",
                      duration: 750,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".text-size-small.text-color-white",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27132",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec28",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-74-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 500,
                      easing: "outExpo",
                      duration: 750,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".text-size-small.text-color-white",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27132",
                          "49e48807-c514-6db7-b9b8-5cd24e99ec28",
                        ],
                      },
                      xValue: -0.5,
                      xUnit: "rem",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c6dca81d0,
          },
          "a-75": {
            id: "a-75",
            title: "career apply button hover /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-75-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".career-apply_button",
                        selectorGuids: ["ebf5d835-1e4e-2998-f83d-4dad72e6b21e"],
                      },
                      widthValue: 6,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-75-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".career-apply_button-icon",
                        selectorGuids: ["e39eaf6c-b3fe-233a-5b13-39b05ec32bf8"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-75-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".career-apply_button-text",
                        selectorGuids: ["17d1d51a-47e6-0ed8-3a7b-2d64abb6bb03"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-75-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".career-apply_button-text",
                        selectorGuids: ["17d1d51a-47e6-0ed8-3a7b-2d64abb6bb03"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-75-n-9",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".career-apply_bottom",
                        selectorGuids: ["17d2c3a6-fed1-85e1-c0e4-9041d3e3bc14"],
                      },
                      globalSwatchId: "",
                      rValue: 24,
                      bValue: 44,
                      gValue: 55,
                      aValue: 1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-75-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        selector: ".career-apply_button",
                        selectorGuids: ["ebf5d835-1e4e-2998-f83d-4dad72e6b21e"],
                      },
                      widthValue: 12,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-75-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".career-apply_button-icon",
                        selectorGuids: ["e39eaf6c-b3fe-233a-5b13-39b05ec32bf8"],
                      },
                      xValue: 100,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-75-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        selector: ".career-apply_button-text",
                        selectorGuids: ["17d1d51a-47e6-0ed8-3a7b-2d64abb6bb03"],
                      },
                      xValue: -60,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-75-n-10",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 2e3,
                      target: {
                        selector: ".career-apply_bottom",
                        selectorGuids: ["17d2c3a6-fed1-85e1-c0e4-9041d3e3bc14"],
                      },
                      globalSwatchId: "",
                      rValue: 17,
                      bValue: 34,
                      gValue: 42,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-75-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 250,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        selector: ".career-apply_button-text",
                        selectorGuids: ["17d1d51a-47e6-0ed8-3a7b-2d64abb6bb03"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c7c37e949,
          },
          "a-76": {
            id: "a-76",
            title: "career apply button hover /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-76-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".career-apply_button",
                        selectorGuids: ["ebf5d835-1e4e-2998-f83d-4dad72e6b21e"],
                      },
                      widthValue: 6,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-76-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".career-apply_button-icon",
                        selectorGuids: ["e39eaf6c-b3fe-233a-5b13-39b05ec32bf8"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-76-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".career-apply_button-text",
                        selectorGuids: ["17d1d51a-47e6-0ed8-3a7b-2d64abb6bb03"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-76-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inQuart",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".career-apply_button-text",
                        selectorGuids: ["17d1d51a-47e6-0ed8-3a7b-2d64abb6bb03"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-76-n-5",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1200,
                      target: {
                        useEventTarget: !0,
                        id: "657c66374225afd1563b6fa7|fa9fda56-50ec-1de9-8d47-2954787c50d5",
                      },
                      globalSwatchId: "",
                      rValue: 24,
                      bValue: 44,
                      gValue: 55,
                      aValue: 1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c7c37e949,
          },
          "a-77": {
            id: "a-77",
            title: "career apply click",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-77-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "657c66374225afd1563b6fa7|a2165b57-3015-e968-0bb8-8de27f830023",
                      },
                      yValue: 2.5,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-77-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "657c66374225afd1563b6fa7|8ab42bcf-766c-e62c-aafd-32243fcd8899",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-77-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "657c66374225afd1563b6fa7|8ab42bcf-766c-e62c-aafd-32243fcd8899",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-77-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "657c66374225afd1563b6fa7|a2165b57-3015-e968-0bb8-8de27f830023",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-77-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        id: "657c66374225afd1563b6fa7|a2165b57-3015-e968-0bb8-8de27f830023",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-77-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "657c66374225afd1563b6fa7|8ab42bcf-766c-e62c-aafd-32243fcd8899",
                      },
                      yValue: -2.5,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-77-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "657c66374225afd1563b6fa7|8ab42bcf-766c-e62c-aafd-32243fcd8899",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-77-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "657c66374225afd1563b6fa7|a2165b57-3015-e968-0bb8-8de27f830023",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-77-n-9",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 900,
                      easing: "outQuart",
                      duration: 1e3,
                      target: {
                        id: "657c66374225afd1563b6fa7|a2165b57-3015-e968-0bb8-8de27f830023",
                      },
                      yValue: 2.5,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-77-n-10",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 900,
                      easing: "outQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "657c66374225afd1563b6fa7|8ab42bcf-766c-e62c-aafd-32243fcd8899",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-77-n-11",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 900,
                      easing: "outQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "657c66374225afd1563b6fa7|8ab42bcf-766c-e62c-aafd-32243fcd8899",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-77-n-12",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 900,
                      easing: "outQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "657c66374225afd1563b6fa7|a2165b57-3015-e968-0bb8-8de27f830023",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c7c536e35,
          },
          "a-78": {
            id: "a-78",
            title: "cta button hover /IN 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-78-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button_arrow",
                        selectorGuids: ["3b5cbdcc-ec35-6795-f444-1e3d3c9fbd9b"],
                      },
                      value: 100,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c5abaa24b,
          },
          "a-79": {
            id: "a-79",
            title: "cta button hover /OUT 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-79-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button_arrow",
                        selectorGuids: ["3b5cbdcc-ec35-6795-f444-1e3d3c9fbd9b"],
                      },
                      value: 0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c5abaa24b,
          },
          "a-80": {
            id: "a-80",
            title: "cta button /IN 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-80-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16ae5",
                      },
                      widthValue: 12,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-80-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 100,
                      easing: "inOutQuad",
                      duration: 1100,
                      target: {
                        useEventTarget: !0,
                        id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16ae5",
                      },
                      widthUnit: "AUTO",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c40e95295,
          },
          "a-81": {
            id: "a-81",
            title: "cta button /OUT 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-81-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: !0,
                        id: "657c66374225afd1563b6fa7|0f79d874-26c3-8cb3-3fe4-b663aeb16ae5",
                      },
                      widthValue: 12,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c40e95295,
          },
          "a-82": {
            id: "a-82",
            title: "cta component /IN 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-82-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".cta_right-background-image",
                        selectorGuids: ["72872a34-1ba6-6bf7-0be4-6b7f5ed69cc6"],
                      },
                      xValue: 1.1,
                      yValue: 1.1,
                      locked: !0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-82-n-2",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 100,
                      easing: "outExpo",
                      duration: 2500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".cta_right-background-image",
                        selectorGuids: ["72872a34-1ba6-6bf7-0be4-6b7f5ed69cc6"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c40d0e733,
          },
          "a-83": {
            id: "a-83",
            title: "cta component /OUT 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-83-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".cta_right-background-image",
                        selectorGuids: ["72872a34-1ba6-6bf7-0be4-6b7f5ed69cc6"],
                      },
                      xValue: 1.1,
                      yValue: 1.1,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c40d0e733,
          },
          "a-84": {
            id: "a-84",
            title: "cta left /IN 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-84-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 5500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".cta_symbol",
                        selectorGuids: ["7c4428ce-79dd-6e19-fe3a-da7900535291"],
                      },
                      value: 100,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c6354ad46,
          },
          "a-85": {
            id: "a-85",
            title: "cta left /OUT 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-85-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".cta_symbol",
                        selectorGuids: ["7c4428ce-79dd-6e19-fe3a-da7900535291"],
                      },
                      value: 0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c6354ad46,
          },
          "a-86": {
            id: "a-86",
            title: "careers falling titles lottie",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-86-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".cta_right-fallingtitles-lottie",
                        selectorGuids: ["e00989b0-cb63-cef0-aa91-4401b4b4a8bf"],
                      },
                      value: 0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-86-n-2",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 3e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".cta_right-fallingtitles-lottie",
                        selectorGuids: ["e00989b0-cb63-cef0-aa91-4401b4b4a8bf"],
                      },
                      value: 100,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c7d7e4ff4,
          },
          "a-87": {
            id: "a-87",
            title: "careers falling titles lottie 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-87-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".cta_right-fallingtitles-lottie",
                        selectorGuids: ["e00989b0-cb63-cef0-aa91-4401b4b4a8bf"],
                      },
                      value: 0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c7d7e4ff4,
          },
          "a-88": {
            id: "a-88",
            title: "careers logo marquee",
            continuousParameterGroups: [
              {
                id: "a-88-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 0,
                    actionItems: [
                      {
                        id: "a-88-n",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".logo-marquee_image",
                            selectorGuids: [
                              "cb37fb22-e994-def0-ffb7-3362bc6b918d",
                            ],
                          },
                          xValue: 0,
                          xUnit: "%",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 100,
                    actionItems: [
                      {
                        id: "a-88-n-2",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "inOutQuart",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".logo-marquee_image",
                            selectorGuids: [
                              "cb37fb22-e994-def0-ffb7-3362bc6b918d",
                            ],
                          },
                          xValue: -14,
                          xUnit: "%",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18c824fc755,
          },
          "a-89": {
            id: "a-89",
            title: "careers hero /load",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-89-n-2",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".career-hero_image-block-1",
                        selectorGuids: ["ec36b65d-1586-c605-3380-dc11e2a6ccfb"],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-89-n-7",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".career-hero_image.is-1-1",
                        selectorGuids: [
                          "e82049d1-12f7-4c29-79d5-f38775721271",
                          "f9ce5922-bcc9-c876-cd68-9131636213a8",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-89-n-10",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".career-hero_image-wrapper.is-1-1",
                        selectorGuids: [
                          "6a2479d9-8542-f1cb-be4d-cb70718d1af1",
                          "c5749f17-fe05-5879-6eda-31efaf988e8c",
                        ],
                      },
                      xValue: 0.9,
                      yValue: 0.9,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-89-n-12",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".career-hero_image.is-2-1",
                        selectorGuids: [
                          "e82049d1-12f7-4c29-79d5-f38775721271",
                          "465e7bec-b050-6733-d68a-8026c6af45b1",
                        ],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-89-n-14",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".career-hero_image-wrapper.is-2-1",
                        selectorGuids: [
                          "6a2479d9-8542-f1cb-be4d-cb70718d1af1",
                          "e0fa57e0-906f-169c-784c-53570ac3a071",
                        ],
                      },
                      xValue: 0.9,
                      yValue: 0.9,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-89-n-13",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".career-hero_image.is-2-1",
                        selectorGuids: [
                          "e82049d1-12f7-4c29-79d5-f38775721271",
                          "465e7bec-b050-6733-d68a-8026c6af45b1",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-89-n-8",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        selector: ".career-hero_image.is-1-1",
                        selectorGuids: [
                          "e82049d1-12f7-4c29-79d5-f38775721271",
                          "f9ce5922-bcc9-c876-cd68-9131636213a8",
                        ],
                      },
                      xValue: 1.05,
                      yValue: 1.05,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-89-n-9",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".career-hero_image-block-1",
                        selectorGuids: ["ec36b65d-1586-c605-3380-dc11e2a6ccfb"],
                      },
                      value: "block",
                    },
                  },
                  {
                    id: "a-89-n-11",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "outBack",
                      duration: 1e3,
                      target: {
                        selector: ".career-hero_image-wrapper.is-1-1",
                        selectorGuids: [
                          "6a2479d9-8542-f1cb-be4d-cb70718d1af1",
                          "c5749f17-fe05-5879-6eda-31efaf988e8c",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-89-n-15",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".career-hero_image.is-2-1",
                        selectorGuids: [
                          "e82049d1-12f7-4c29-79d5-f38775721271",
                          "465e7bec-b050-6733-d68a-8026c6af45b1",
                        ],
                      },
                      value: "block",
                    },
                  },
                  {
                    id: "a-89-n-17",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        selector: ".career-hero_image.is-2-1",
                        selectorGuids: [
                          "e82049d1-12f7-4c29-79d5-f38775721271",
                          "465e7bec-b050-6733-d68a-8026c6af45b1",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-89-n-16",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "outBack",
                      duration: 1e3,
                      target: {
                        selector: ".career-hero_image-wrapper.is-2-1",
                        selectorGuids: [
                          "6a2479d9-8542-f1cb-be4d-cb70718d1af1",
                          "e0fa57e0-906f-169c-784c-53570ac3a071",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c825dd673,
          },
          "a-6": {
            id: "a-6",
            title: "feed load /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-6-n-13",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".home-hero_feed",
                        selectorGuids: ["026d99ad-827f-2ef6-2b46-93d36f7b4a8d"],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-6-n-25",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "principale|cbaa3f98-e1b2-0a1f-75f9-3fa0f62cd1b5",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-6-n-26",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "principale|d69a266c-19c5-782a-21f9-8bc8e42fbb9d",
                      },
                      value: 0,
                      unit: "",
                    },
                  },

                ],
              },
              {
                actionItems: [

                  {
                    id: "a-6-n-11",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 800,
                      target: {
                        selector: ".home-hero_feed",
                        selectorGuids: ["026d99ad-827f-2ef6-2b46-93d36f7b4a8d"],
                      },
                      yValue: 55,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-6-n-12",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 500,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        selector: ".home-hero_feed",
                        selectorGuids: ["026d99ad-827f-2ef6-2b46-93d36f7b4a8d"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-6-n-27",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 1e3,
                      easing: "",
                      duration: 200,
                      target: {
                        id: "principale|cbaa3f98-e1b2-0a1f-75f9-3fa0f62cd1b5",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-6-n-28",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 1300,
                      easing: "",
                      duration: 200,
                      target: {
                        id: "principale|d69a266c-19c5-782a-21f9-8bc8e42fbb9d",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18bf89d8e4d,
          },
          "a-90": {
            id: "a-90",
            title: "divider-vertical /IN 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-90-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "657abfda68f42ee1deea93e6|c7932df9-c27c-2558-cbca-ee1c9489598a",
                      },
                      widthValue: 1,
                      heightValue: 0,
                      widthUnit: "px",
                      heightUnit: "%",
                      locked: !1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-90-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 2e3,
                      target: {
                        useEventTarget: !0,
                        id: "657abfda68f42ee1deea93e6|c7932df9-c27c-2558-cbca-ee1c9489598a",
                      },
                      widthValue: 1,
                      heightValue: 100,
                      widthUnit: "px",
                      heightUnit: "%",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c117dbf12,
          },
          "a-91": {
            id: "a-91",
            title: "divider-horizontal /IN 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-91-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "657abfda68f42ee1deea93e6|a3055386-2709-8996-ed72-6b9b516a1853",
                      },
                      widthValue: 0,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-91-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 2e3,
                      target: {
                        useEventTarget: !0,
                        id: "657abfda68f42ee1deea93e6|a3055386-2709-8996-ed72-6b9b516a1853",
                      },
                      widthValue: 100,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c117dbf12,
          },
          "a-92": {
            id: "a-92",
            title: "divider-horizontal /OUT 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-92-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: !0,
                        id: "657abfda68f42ee1deea93e6|a3055386-2709-8996-ed72-6b9b516a1853",
                      },
                      widthValue: 0,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c117dbf12,
          },
          "a-93": {
            id: "a-93",
            title: "image juxtapose /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-93-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "65829fa0372420389ec285ba|d06caa0b-0999-eb42-a705-eaddff23f07e",
                      },
                      xValue: 0.8,
                      yValue: 0.8,
                      locked: !0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-93-n-2",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 200,
                      easing: "outExpo",
                      duration: 2e3,
                      target: {
                        useEventTarget: !0,
                        id: "65829fa0372420389ec285ba|d06caa0b-0999-eb42-a705-eaddff23f07e",
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c68933f77,
          },
          "a-94": {
            id: "a-94",
            title: "image juxtapose /IN 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-94-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "657ac4dfce42bd0bd774442c|26edb1ec-c1bb-c55e-387a-4548c8f74ffe",
                      },
                      xValue: 0.8,
                      yValue: 0.8,
                      locked: !0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-94-n-2",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 200,
                      easing: "outExpo",
                      duration: 2e3,
                      target: {
                        useEventTarget: !0,
                        id: "657ac4dfce42bd0bd774442c|26edb1ec-c1bb-c55e-387a-4548c8f74ffe",
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c68933f77,
          },
          "a-95": {
            id: "a-95",
            title: "home list in-view /IN 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-95-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".home-list_image",
                        selectorGuids: ["cc254131-1484-46b5-67a6-90bdb03bde51"],
                      },
                      widthValue: 20,
                      heightValue: 20,
                      widthUnit: "vw",
                      heightUnit: "vw",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-95-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {},
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-95-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {},
                      value: 0.25,
                      unit: "",
                    },
                  },
                  {
                    id: "a-95-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {},
                      yValue: 1.5,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-95-n-5",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 2e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".home-list_image",
                        selectorGuids: ["cc254131-1484-46b5-67a6-90bdb03bde51"],
                      },
                      widthValue: 30,
                      heightValue: 20,
                      widthUnit: "vw",
                      heightUnit: "vw",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-95-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 2e3,
                      target: {},
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-95-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 2e3,
                      target: {},
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-95-n-8",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutExpo",
                      duration: 2e3,
                      target: {},
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c3e7a4c56,
          },
          "a-96": {
            id: "a-96",
            title: "insta post /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-96-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".grid-insta_post-image",
                        selectorGuids: ["0bb7e643-31d8-4677-bdfa-85ff52397d0f"],
                      },
                      xValue: 1.1,
                      yValue: 1.1,
                      locked: !0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-96-n-2",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 2e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".grid-insta_post-image",
                        selectorGuids: ["0bb7e643-31d8-4677-bdfa-85ff52397d0f"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c82df365f,
          },
          "a-97": {
            id: "a-97",
            title: "insta post /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-97-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".grid-insta_post-image",
                        selectorGuids: ["0bb7e643-31d8-4677-bdfa-85ff52397d0f"],
                      },
                      xValue: 1.1,
                      yValue: 1.1,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c82df365f,
          },
          "a-100": {
            id: "a-100",
            title: "careers image-lottie /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-100-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 5e3,
                      target: {
                        useEventTarget: !0,
                        id: "657c66374225afd1563b6fa7|94d71c7c-e7ea-c60a-b4ac-0c56d7e0eea8",
                      },
                      value: 21,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-100-n-2",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "outQuad",
                      duration: 2e3,
                      target: {
                        useEventTarget: !0,
                        id: "657c66374225afd1563b6fa7|94d71c7c-e7ea-c60a-b4ac-0c56d7e0eea8",
                      },
                      value: 88,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c8775cbb6,
          },
          "a-101": {
            id: "a-101",
            title: "careers image-lottie /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-101-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: !0,
                        id: "657c66374225afd1563b6fa7|94d71c7c-e7ea-c60a-b4ac-0c56d7e0eea8",
                      },
                      value: 21,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c8775cbb6,
          },
          "a-102": {
            id: "a-102",
            title: "About Circle Image",
            continuousParameterGroups: [
              {
                id: "a-102-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 0,
                    actionItems: [
                      {
                        id: "a-102-n",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".grid_image-juxtapose",
                            selectorGuids: [
                              "61efbce5-244f-d90b-b8ab-b99ffcc91df7",
                            ],
                          },
                          widthValue: 10,
                          heightValue: 10,
                          widthUnit: "vw",
                          heightUnit: "vw",
                          locked: !1,
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 74,
                    actionItems: [
                      {
                        id: "a-102-n-2",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".grid_image-juxtapose",
                            selectorGuids: [
                              "61efbce5-244f-d90b-b8ab-b99ffcc91df7",
                            ],
                          },
                          widthValue: 22,
                          heightValue: 22,
                          widthUnit: "vw",
                          heightUnit: "vw",
                          locked: !1,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18cd3f098e2,
          },
          "a-109": {
            id: "a-109",
            title: "page load /IN (landingpage)",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-109-n",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".page-loader",
                        selectorGuids: ["8da9d921-6cb6-c5f0-2261-655ad4b38da8"],
                      },
                      value: "flex",
                    },
                  },
                  {
                    id: "a-109-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".page-loader_overlay-dark",
                        selectorGuids: ["4a56d684-46ea-6459-dcf3-c4609c251221"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-109-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".page-loader_overlay-color",
                        selectorGuids: ["f966527d-0e2e-abd2-c644-f1a40d67dc3a"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-109-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 200,
                      easing: "",
                      duration: 800,
                      target: {
                        selector: ".page-loader_overlay-dark",
                        selectorGuids: ["4a56d684-46ea-6459-dcf3-c4609c251221"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-109-n-5",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".page-loader",
                        selectorGuids: ["8da9d921-6cb6-c5f0-2261-655ad4b38da8"],
                      },
                      value: "none",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c866c6568,
          },
          "a-98": {
            id: "a-98",
            title: "page load /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-98-n-3",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".page-loader",
                        selectorGuids: ["8da9d921-6cb6-c5f0-2261-655ad4b38da8"],
                      },
                      value: "flex",
                    },
                  },
                  {
                    id: "a-98-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".page-loader_overlay-dark",
                        selectorGuids: ["4a56d684-46ea-6459-dcf3-c4609c251221"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-98-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".page-loader_overlay-color",
                        selectorGuids: ["f966527d-0e2e-abd2-c644-f1a40d67dc3a"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-98-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 400,
                      target: {
                        selector: ".page-loader_overlay-dark",
                        selectorGuids: ["4a56d684-46ea-6459-dcf3-c4609c251221"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-98-n-8",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".page-loader",
                        selectorGuids: ["8da9d921-6cb6-c5f0-2261-655ad4b38da8"],
                      },
                      value: "none",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c866c6568,
          },
          "a-103": {
            id: "a-103",
            title: "page load /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-103-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: { id: "0bbd9c7b-d7e6-3252-c017-adfa7f6d3a95" },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-103-n-6",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: { id: "6b07b12e-0dac-a52d-2a87-75a8bf95127b" },
                      value: "flex",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-103-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 300,
                      target: {
                        selector: ".page-loader_overlay-dark",
                        selectorGuids: ["4a56d684-46ea-6459-dcf3-c4609c251221"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-103-n-5",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 1200,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".loader_lottie",
                        selectorGuids: ["479b7219-081c-00ca-058a-153db8700ffa"],
                      },
                      value: 100,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-103-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 200,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".loader_lottie",
                        selectorGuids: ["479b7219-081c-00ca-058a-153db8700ffa"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c866c6568,
          },
          "a-105": {
            id: "a-105",
            title: "our work â€“\xa0hero",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-105-n-4",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._1",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "8252aa74-9cae-f454-6195-b8757d049d03",
                        ],
                      },
                      xValue: 0.9,
                      yValue: 0.9,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-5",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._2",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "420b35c0-3aae-98d3-55ec-cebb603cdb14",
                        ],
                      },
                      xValue: 0.9,
                      yValue: 0.9,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-6",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._2",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "420b35c0-3aae-98d3-55ec-cebb603cdb14",
                        ],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-105-n-20",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._3",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "62f29dc1-8cf0-8eff-22e1-eac2259c0142",
                        ],
                      },
                      xValue: 0.9,
                      yValue: 0.9,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-25",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._4",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "3e42423b-c62b-93db-460c-57b7812864c2",
                        ],
                      },
                      xValue: 0.9,
                      yValue: 0.9,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-29",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._5",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "6051d83f-5520-39c9-30f4-f91c5a842064",
                        ],
                      },
                      xValue: 0.9,
                      yValue: 0.9,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-7",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._1",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "8252aa74-9cae-f454-6195-b8757d049d03",
                        ],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-105-n-38",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image1",
                        selectorGuids: ["f7c7e2e9-6166-4536-b75a-b604fc965fc6"],
                      },
                      xValue: 1.2,
                      yValue: 1.2,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-47",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image2",
                        selectorGuids: ["da6b5103-79e0-a4c4-9f05-12c659e3fdc7"],
                      },
                      xValue: 1.2,
                      yValue: 1.2,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-48",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image3",
                        selectorGuids: ["59b79f13-99c8-32e3-f9f5-882962e2c80e"],
                      },
                      xValue: 1.2,
                      yValue: 1.2,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-49",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image4",
                        selectorGuids: ["11cf45e2-7848-9251-d5a3-4c7dca093f9a"],
                      },
                      xValue: 1.2,
                      yValue: 1.2,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-50",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image5",
                        selectorGuids: ["9cccc00b-5888-3b96-0f33-926c7af34e7e"],
                      },
                      xValue: 1.2,
                      yValue: 1.2,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-51",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image6",
                        selectorGuids: ["083019c8-53d4-2fc0-d206-ff33ec7504d2"],
                      },
                      xValue: 1.2,
                      yValue: 1.2,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-52",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image7",
                        selectorGuids: ["821d4730-f49c-376e-b250-6eebf07420bc"],
                      },
                      xValue: 1.2,
                      yValue: 1.2,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-63",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._6",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "e3be71fd-267f-7640-bc7f-bb663f5fac99",
                        ],
                      },
                      xValue: 0.9,
                      yValue: 0.9,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-67",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._7",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "5633e7b5-098e-b92a-b235-821590444dad",
                        ],
                      },
                      xValue: 0.9,
                      yValue: 0.9,
                      locked: !0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-105-n-77",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 500,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: !0,
                        id: "65829fa0372420389ec285ba|0392cbcb-cdeb-b9b5-355d-0a90511a6a64",
                      },
                      value: "flex",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-105-n-3",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".hero_header-work-spacer",
                        selectorGuids: ["331d7bef-685d-f843-a5fa-91a0a339ff83"],
                      },
                      widthValue: 50,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-105-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".hero_header.animate-hero.is-our",
                        selectorGuids: [
                          "8fe88d3a-352f-8873-a4f5-2e4e27b1d7b9",
                          "2e85b5c6-b45f-1a81-a77e-99e1cfaf0656",
                          "0fa1f6c7-3833-0a19-625e-560ba438b3c1",
                        ],
                      },
                      yValue: -80,
                      xUnit: "PX",
                      yUnit: "svh",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-105-n-71",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inQuad",
                      duration: 300,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image6",
                        selectorGuids: ["083019c8-53d4-2fc0-d206-ff33ec7504d2"],
                      },
                      xValue: 1.2,
                      yValue: 1.2,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-70",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inQuad",
                      duration: 300,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._6",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "e3be71fd-267f-7640-bc7f-bb663f5fac99",
                        ],
                      },
                      xValue: 0.9,
                      yValue: 0.9,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-72",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 300,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._6",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "e3be71fd-267f-7640-bc7f-bb663f5fac99",
                        ],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-105-n-9",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 400,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._1",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "8252aa74-9cae-f454-6195-b8757d049d03",
                        ],
                      },
                      value: "block",
                    },
                  },
                  {
                    id: "a-105-n-10",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 400,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._1",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "8252aa74-9cae-f454-6195-b8757d049d03",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-46",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 400,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image1",
                        selectorGuids: ["f7c7e2e9-6166-4536-b75a-b604fc965fc6"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-73",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 400,
                      easing: "inQuad",
                      duration: 300,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image7",
                        selectorGuids: ["821d4730-f49c-376e-b250-6eebf07420bc"],
                      },
                      xValue: 1.2,
                      yValue: 1.2,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-75",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 400,
                      easing: "inQuad",
                      duration: 300,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._7",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "5633e7b5-098e-b92a-b235-821590444dad",
                        ],
                      },
                      xValue: 0.9,
                      yValue: 0.9,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-8",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 600,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._2",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "420b35c0-3aae-98d3-55ec-cebb603cdb14",
                        ],
                      },
                      value: "block",
                    },
                  },
                  {
                    id: "a-105-n-11",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 600,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._2",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "420b35c0-3aae-98d3-55ec-cebb603cdb14",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-54",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 600,
                      easing: "outExpo",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image2",
                        selectorGuids: ["da6b5103-79e0-a4c4-9f05-12c659e3fdc7"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-74",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 600,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._7",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "5633e7b5-098e-b92a-b235-821590444dad",
                        ],
                      },
                      value: "none",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-105-n-41",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 500,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: !0,
                        id: "65829fa0372420389ec285ba|0392cbcb-cdeb-b9b5-355d-0a90511a6a64",
                      },
                      value: "flex",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-105-n-12",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutExpo",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".hero_header.animate-hero.is-our",
                        selectorGuids: [
                          "8fe88d3a-352f-8873-a4f5-2e4e27b1d7b9",
                          "2e85b5c6-b45f-1a81-a77e-99e1cfaf0656",
                          "0fa1f6c7-3833-0a19-625e-560ba438b3c1",
                        ],
                      },
                      yValue: -40,
                      xUnit: "PX",
                      yUnit: "svh",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-105-n-14",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inQuad",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._1",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "8252aa74-9cae-f454-6195-b8757d049d03",
                        ],
                      },
                      xValue: 0.8,
                      yValue: 0.8,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-13",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutExpo",
                      duration: 1200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".hero_header.animate-hero.is-work",
                        selectorGuids: [
                          "8fe88d3a-352f-8873-a4f5-2e4e27b1d7b9",
                          "2e85b5c6-b45f-1a81-a77e-99e1cfaf0656",
                          "59fc063b-8abe-1ec8-a42a-862e7765e0ec",
                        ],
                      },
                      yValue: -40,
                      xUnit: "PX",
                      yUnit: "svh",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-105-n-53",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inQuad",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image1",
                        selectorGuids: ["f7c7e2e9-6166-4536-b75a-b604fc965fc6"],
                      },
                      xValue: 1.2,
                      yValue: 1.2,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-15",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 200,
                      easing: "inQuad",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._2",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "420b35c0-3aae-98d3-55ec-cebb603cdb14",
                        ],
                      },
                      xValue: 0.8,
                      yValue: 0.8,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-55",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 200,
                      easing: "inQuad",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image2",
                        selectorGuids: ["da6b5103-79e0-a4c4-9f05-12c659e3fdc7"],
                      },
                      xValue: 1.2,
                      yValue: 1.2,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-17",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 300,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._1",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "8252aa74-9cae-f454-6195-b8757d049d03",
                        ],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-105-n-16",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 500,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._2",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "420b35c0-3aae-98d3-55ec-cebb603cdb14",
                        ],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-105-n-19",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 600,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._3",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "62f29dc1-8cf0-8eff-22e1-eac2259c0142",
                        ],
                      },
                      value: "block",
                    },
                  },
                  {
                    id: "a-105-n-21",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 600,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._3",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "62f29dc1-8cf0-8eff-22e1-eac2259c0142",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-56",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 600,
                      easing: "outExpo",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image3",
                        selectorGuids: ["59b79f13-99c8-32e3-f9f5-882962e2c80e"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-105-n-42",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 500,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: !0,
                        id: "65829fa0372420389ec285ba|0392cbcb-cdeb-b9b5-355d-0a90511a6a64",
                      },
                      value: "flex",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-105-n-24",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inQuad",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._3",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "62f29dc1-8cf0-8eff-22e1-eac2259c0142",
                        ],
                      },
                      xValue: 0.7,
                      yValue: 0.7,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-22",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutExpo",
                      duration: 1200,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".hero_header-work-spacer",
                        selectorGuids: ["331d7bef-685d-f843-a5fa-91a0a339ff83"],
                      },
                      widthValue: 0,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-105-n-57",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inQuad",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image3",
                        selectorGuids: ["59b79f13-99c8-32e3-f9f5-882962e2c80e"],
                      },
                      xValue: 1.2,
                      yValue: 1.2,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-23",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 300,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._3",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "62f29dc1-8cf0-8eff-22e1-eac2259c0142",
                        ],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-105-n-26",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 300,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._4",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "3e42423b-c62b-93db-460c-57b7812864c2",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-27",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 300,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._4",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "3e42423b-c62b-93db-460c-57b7812864c2",
                        ],
                      },
                      value: "block",
                    },
                  },
                  {
                    id: "a-105-n-58",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 300,
                      easing: "outExpo",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image4",
                        selectorGuids: ["11cf45e2-7848-9251-d5a3-4c7dca093f9a"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-30",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 500,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._5",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "6051d83f-5520-39c9-30f4-f91c5a842064",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-28",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 500,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._5",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "6051d83f-5520-39c9-30f4-f91c5a842064",
                        ],
                      },
                      value: "block",
                    },
                  },
                  {
                    id: "a-105-n-59",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 500,
                      easing: "outExpo",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image5",
                        selectorGuids: ["9cccc00b-5888-3b96-0f33-926c7af34e7e"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-105-n-43",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 500,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: !0,
                        id: "65829fa0372420389ec285ba|0392cbcb-cdeb-b9b5-355d-0a90511a6a64",
                      },
                      value: "flex",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-105-n-31",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".hero_header.animate-hero.is-our",
                        selectorGuids: [
                          "8fe88d3a-352f-8873-a4f5-2e4e27b1d7b9",
                          "2e85b5c6-b45f-1a81-a77e-99e1cfaf0656",
                          "0fa1f6c7-3833-0a19-625e-560ba438b3c1",
                        ],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "svh",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-105-n-33",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inQuad",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._4",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "3e42423b-c62b-93db-460c-57b7812864c2",
                        ],
                      },
                      xValue: 0.7,
                      yValue: 0.7,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-32",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".hero_header.animate-hero.is-work",
                        selectorGuids: [
                          "8fe88d3a-352f-8873-a4f5-2e4e27b1d7b9",
                          "2e85b5c6-b45f-1a81-a77e-99e1cfaf0656",
                          "59fc063b-8abe-1ec8-a42a-862e7765e0ec",
                        ],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "svh",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-105-n-60",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inQuad",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image4",
                        selectorGuids: ["11cf45e2-7848-9251-d5a3-4c7dca093f9a"],
                      },
                      xValue: 1.2,
                      yValue: 1.2,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-35",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 200,
                      easing: "inQuad",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._5",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "6051d83f-5520-39c9-30f4-f91c5a842064",
                        ],
                      },
                      xValue: 0.7,
                      yValue: 0.7,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-61",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 200,
                      easing: "inQuad",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image5",
                        selectorGuids: ["9cccc00b-5888-3b96-0f33-926c7af34e7e"],
                      },
                      xValue: 1.2,
                      yValue: 1.2,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-34",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 500,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._4",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "3e42423b-c62b-93db-460c-57b7812864c2",
                        ],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-105-n-36",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 600,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._5",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "6051d83f-5520-39c9-30f4-f91c5a842064",
                        ],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-105-n-62",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 700,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._6",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "e3be71fd-267f-7640-bc7f-bb663f5fac99",
                        ],
                      },
                      value: "block",
                    },
                  },
                  {
                    id: "a-105-n-64",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 700,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._6",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "e3be71fd-267f-7640-bc7f-bb663f5fac99",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-65",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 700,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image6",
                        selectorGuids: ["083019c8-53d4-2fc0-d206-ff33ec7504d2"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-68",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 900,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._7",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "5633e7b5-098e-b92a-b235-821590444dad",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-69",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 900,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image7",
                        selectorGuids: ["821d4730-f49c-376e-b250-6eebf07420bc"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-105-n-66",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 900,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".work-hero_image-wrapper._7",
                        selectorGuids: [
                          "21cbab62-f40e-66e4-c786-64ae065e0901",
                          "5633e7b5-098e-b92a-b235-821590444dad",
                        ],
                      },
                      value: "block",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-105-n-76",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 500,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: !0,
                        id: "65829fa0372420389ec285ba|0392cbcb-cdeb-b9b5-355d-0a90511a6a64",
                      },
                      value: "flex",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18ce8e22f9d,
          },
          "a-106": {
            id: "a-106",
            title: "Hero Section/Paralax (Tablet)",
            continuousParameterGroups: [
              {
                id: "a-106-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 0,
                    actionItems: [
                      {
                        id: "a-106-n",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            selector: ".hero_dark-overlay",
                            selectorGuids: [
                              "491b2a5c-0bdf-3b31-5d8d-502159c74488",
                            ],
                          },
                          value: 0,
                          unit: "",
                        },
                      },
                      {
                        id: "a-106-n-2",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            selector: ".home-hero_video-element",
                            selectorGuids: [
                              "00e0c4de-b738-9724-9d93-e82af1f9fe3a",
                            ],
                          },
                          yValue: 0,
                          xUnit: "PX",
                          yUnit: "rem",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-106-n-3",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".home-intro_text.max-width",
                            selectorGuids: [
                              "f65c96ea-8d23-d6cf-458a-2c8ffd8ead27",
                              "bea37a48-e9ca-4c3e-dfa4-a09bb6b144e8",
                            ],
                          },
                          yValue: -5,
                          xUnit: "PX",
                          yUnit: "rem",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 90,
                    actionItems: [
                      {
                        id: "a-106-n-4",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            selector: ".hero_dark-overlay",
                            selectorGuids: [
                              "491b2a5c-0bdf-3b31-5d8d-502159c74488",
                            ],
                          },
                          value: 0.5,
                          unit: "",
                        },
                      },
                      {
                        id: "a-106-n-5",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            selector: ".home-hero_video-element",
                            selectorGuids: [
                              "00e0c4de-b738-9724-9d93-e82af1f9fe3a",
                            ],
                          },
                          yValue: 15,
                          xUnit: "PX",
                          yUnit: "rem",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-106-n-6",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".home-intro_text.max-width",
                            selectorGuids: [
                              "f65c96ea-8d23-d6cf-458a-2c8ffd8ead27",
                              "bea37a48-e9ca-4c3e-dfa4-a09bb6b144e8",
                            ],
                          },
                          yValue: 0,
                          xUnit: "PX",
                          yUnit: "rem",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18c458a8c50,
          },
          "a-107": {
            id: "a-107",
            title: "nav-anchor hover /IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-107-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 350,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".nav-primary_link",
                        selectorGuids: ["de16848b-90a0-b977-5dac-832f8456807e"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18d3ac1604a,
          },
          "a-108": {
            id: "a-108",
            title: "nav-anchor hover /OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-108-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 350,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".nav-primary_link",
                        selectorGuids: ["de16848b-90a0-b977-5dac-832f8456807e"],
                      },
                      value: 0.5,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18d3ac1604a,
          },
          "a-57": {
            id: "a-57",
            title: "team /OVER",
            continuousParameterGroups: [
              {
                id: "a-57-p",
                type: "MOUSE_X",
                parameterLabel: "Mouse X",
                continuousActionGroups: [
                  {
                    keyframe: 0,
                    actionItems: [
                      {
                        id: "a-57-n",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            selector: ".home-team_circle",
                            selectorGuids: [
                              "dbd0d337-6cf7-87ad-1b22-0568fabf8136",
                            ],
                          },
                          widthValue: 25,
                          heightValue: 25,
                          widthUnit: "vw",
                          heightUnit: "vw",
                          locked: !1,
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 50,
                    actionItems: [
                      {
                        id: "a-57-n-2",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            selector: ".home-team_circle",
                            selectorGuids: [
                              "dbd0d337-6cf7-87ad-1b22-0568fabf8136",
                            ],
                          },
                          widthValue: 28,
                          heightValue: 28,
                          widthUnit: "vw",
                          heightUnit: "vw",
                          locked: !1,
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 100,
                    actionItems: [
                      {
                        id: "a-57-n-3",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            selector: ".home-team_circle",
                            selectorGuids: [
                              "dbd0d337-6cf7-87ad-1b22-0568fabf8136",
                            ],
                          },
                          widthValue: 25,
                          heightValue: 25,
                          widthUnit: "vw",
                          heightUnit: "vw",
                          locked: !1,
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: "a-57-p-2",
                type: "MOUSE_Y",
                parameterLabel: "Mouse Y",
                continuousActionGroups: [],
              },
            ],
            createdOn: 0x18c59703fc1,
          },
          "a-110": {
            id: "a-110",
            title: "about team accordion click /IN 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-110-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".team_details",
                        selectorGuids: ["2024cd67-583c-65fb-ad62-1ffa6fcee884"],
                      },
                      heightValue: 0,
                      widthUnit: "PX",
                      heightUnit: "px",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-110-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".team_details-line",
                        selectorGuids: ["8f1bab6d-cfb7-a2cb-07e3-4e08aa344a47"],
                      },
                      widthValue: 0,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-110-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".team_details-grid",
                        selectorGuids: ["f7a1c324-3186-9b1f-8c2d-0c34a15d8aa8"],
                      },
                      yValue: 10,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-110-n-4",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_arrow",
                        selectorGuids: ["a9037442-9d07-1525-4359-30944845b723"],
                      },
                      xValue: null,
                      zValue: 0,
                      xUnit: "deg",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-110-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector:
                          ".text-size-medium.text-weight-normal.text-style-serif.text-style-italic",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af2715c",
                          "d5e9bed3-b733-2fee-df37-19f2425ba3a4",
                          "b856656a-769c-ef93-6078-b14d381af2c0",
                          "7cf29171-6279-dbed-f3de-45132c246bb2",
                        ],
                      },
                      value: 0.5,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-110-n-6",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1500,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".team_details",
                        selectorGuids: ["2024cd67-583c-65fb-ad62-1ffa6fcee884"],
                      },
                      widthUnit: "PX",
                      heightUnit: "AUTO",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-110-n-7",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 2e3,
                      target: {
                        selector: ".team_details-line",
                        selectorGuids: ["8f1bab6d-cfb7-a2cb-07e3-4e08aa344a47"],
                      },
                      widthValue: 100,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-110-n-8",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 2e3,
                      target: {
                        selector: ".team_details-grid",
                        selectorGuids: ["f7a1c324-3186-9b1f-8c2d-0c34a15d8aa8"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-110-n-9",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_arrow",
                        selectorGuids: ["a9037442-9d07-1525-4359-30944845b723"],
                      },
                      xValue: null,
                      zValue: 180,
                      xUnit: "deg",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-110-n-10",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector:
                          ".text-size-medium.text-weight-normal.text-style-serif.text-style-italic",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af2715c",
                          "d5e9bed3-b733-2fee-df37-19f2425ba3a4",
                          "b856656a-769c-ef93-6078-b14d381af2c0",
                          "7cf29171-6279-dbed-f3de-45132c246bb2",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c0dac91cd,
          },
          "a-111": {
            id: "a-111",
            title: "about team accordion click /OUT 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-111-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1500,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".team_details",
                        selectorGuids: ["2024cd67-583c-65fb-ad62-1ffa6fcee884"],
                      },
                      heightValue: 0,
                      widthUnit: "PX",
                      heightUnit: "px",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-111-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 2e3,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".team_details-line",
                        selectorGuids: ["8f1bab6d-cfb7-a2cb-07e3-4e08aa344a47"],
                      },
                      widthValue: 0,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-111-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_details-grid",
                        selectorGuids: ["f7a1c324-3186-9b1f-8c2d-0c34a15d8aa8"],
                      },
                      yValue: 10,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-111-n-4",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_arrow",
                        selectorGuids: ["a9037442-9d07-1525-4359-30944845b723"],
                      },
                      xValue: null,
                      zValue: 0,
                      xUnit: "deg",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-111-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector:
                          ".text-size-medium.text-weight-normal.text-style-serif.text-style-italic",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af2715c",
                          "d5e9bed3-b733-2fee-df37-19f2425ba3a4",
                          "b856656a-769c-ef93-6078-b14d381af2c0",
                          "7cf29171-6279-dbed-f3de-45132c246bb2",
                        ],
                      },
                      value: 0.5,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c0dac91cd,
          },
          "a-112": {
            id: "a-112",
            title: "about team accordion hover /IN 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-112-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-circle",
                        selectorGuids: ["358bde5b-3521-834f-b864-2080cdbda3d8"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-112-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-circle",
                        selectorGuids: ["358bde5b-3521-834f-b864-2080cdbda3d8"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-112-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-initials",
                        selectorGuids: ["c39f7c5d-dc89-782e-4e3c-14242531d00d"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-112-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-initials",
                        selectorGuids: ["c39f7c5d-dc89-782e-4e3c-14242531d00d"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-112-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-border",
                        selectorGuids: ["c8d505b1-7380-2d76-60df-85030803e1b9"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-112-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_arrow",
                        selectorGuids: ["a9037442-9d07-1525-4359-30944845b723"],
                      },
                      yValue: -200,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-112-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_arrow",
                        selectorGuids: ["a9037442-9d07-1525-4359-30944845b723"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-112-n-8",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-circle",
                        selectorGuids: ["358bde5b-3521-834f-b864-2080cdbda3d8"],
                      },
                      xValue: 0.25,
                      yValue: 0.25,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-112-n-9",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-circle",
                        selectorGuids: ["358bde5b-3521-834f-b864-2080cdbda3d8"],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-112-n-10",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-initials",
                        selectorGuids: ["c39f7c5d-dc89-782e-4e3c-14242531d00d"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-112-n-11",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 650,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-initials",
                        selectorGuids: ["c39f7c5d-dc89-782e-4e3c-14242531d00d"],
                      },
                      yValue: 50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-112-n-12",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-border",
                        selectorGuids: ["c8d505b1-7380-2d76-60df-85030803e1b9"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-112-n-13",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutExpo",
                      duration: 900,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_arrow",
                        selectorGuids: ["a9037442-9d07-1525-4359-30944845b723"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-112-n-14",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_arrow",
                        selectorGuids: ["a9037442-9d07-1525-4359-30944845b723"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c10de9e05,
          },
          "a-113": {
            id: "a-113",
            title: "about team accordion hover /OUT 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-113-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-circle",
                        selectorGuids: ["358bde5b-3521-834f-b864-2080cdbda3d8"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-113-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-circle",
                        selectorGuids: ["358bde5b-3521-834f-b864-2080cdbda3d8"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-113-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-initials",
                        selectorGuids: ["c39f7c5d-dc89-782e-4e3c-14242531d00d"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-113-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-initials",
                        selectorGuids: ["c39f7c5d-dc89-782e-4e3c-14242531d00d"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-113-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_avatar-border",
                        selectorGuids: ["c8d505b1-7380-2d76-60df-85030803e1b9"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-113-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_arrow",
                        selectorGuids: ["a9037442-9d07-1525-4359-30944845b723"],
                      },
                      yValue: -200,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-113-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 750,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team_arrow",
                        selectorGuids: ["a9037442-9d07-1525-4359-30944845b723"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18c10de9e05,
          },
          fadeIn: {
            id: "fadeIn",
            useFirstGroupAsInitialState: !0,
            actionItemGroups: [
              {
                actionItems: [
                  {
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      duration: 0,
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      value: 0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 1e3,
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      value: 1,
                    },
                  },
                ],
              },
            ],
          },
        },
        site: {
          mediaQueries: [
            { key: "main", min: 992, max: 1e4 },
            { key: "medium", min: 768, max: 991 },
            { key: "small", min: 480, max: 767 },
            { key: "tiny", min: 0, max: 479 },
          ],
        },
      });
    },
  },
]);
