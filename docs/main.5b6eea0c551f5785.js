"use strict";
(self.webpackChunkportfolio_website =
  self.webpackChunkportfolio_website || []).push([
  [179],
  {
    738: () => {
      function ee(e) {
        return "function" == typeof e;
      }
      function jr(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Xo = jr(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function Vr(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class ot {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (ee(r))
              try {
                r();
              } catch (i) {
                t = i instanceof Xo ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  Yc(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof Xo ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Xo(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Yc(t);
            else {
              if (t instanceof ot) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Vr(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && Vr(n, t), t instanceof ot && t._removeParent(this);
        }
      }
      ot.EMPTY = (() => {
        const e = new ot();
        return (e.closed = !0), e;
      })();
      const Wc = ot.EMPTY;
      function qc(e) {
        return (
          e instanceof ot ||
          (e && "closed" in e && ee(e.remove) && ee(e.add) && ee(e.unsubscribe))
        );
      }
      function Yc(e) {
        ee(e) ? e() : e.unsubscribe();
      }
      const Dn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Jo = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Jo;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = Jo;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Qc(e) {
        Jo.setTimeout(() => {
          const { onUnhandledError: t } = Dn;
          if (!t) throw e;
          t(e);
        });
      }
      function Zc() {}
      const gD = ea("C", void 0, void 0);
      function ea(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let wn = null;
      function ei(e) {
        if (Dn.useDeprecatedSynchronousErrorHandling) {
          const t = !wn;
          if ((t && (wn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = wn;
            if (((wn = null), n)) throw r;
          }
        } else e();
      }
      class ta extends ot {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), qc(t) && t.add(this))
              : (this.destination = _D);
        }
        static create(t, n, r) {
          return new Ur(t, n, r);
        }
        next(t) {
          this.isStopped
            ? ra(
                (function yD(e) {
                  return ea("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? ra(
                (function mD(e) {
                  return ea("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? ra(gD, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const DD = Function.prototype.bind;
      function na(e, t) {
        return DD.call(e, t);
      }
      class wD {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              ti(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              ti(r);
            }
          else ti(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              ti(n);
            }
        }
      }
      class Ur extends ta {
        constructor(t, n, r) {
          let o;
          if ((super(), ee(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && Dn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && na(t.next, i),
                  error: t.error && na(t.error, i),
                  complete: t.complete && na(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new wD(o);
        }
      }
      function ti(e) {
        Dn.useDeprecatedSynchronousErrorHandling
          ? (function vD(e) {
              Dn.useDeprecatedSynchronousErrorHandling &&
                wn &&
                ((wn.errorThrown = !0), (wn.error = e));
            })(e)
          : Qc(e);
      }
      function ra(e, t) {
        const { onStoppedNotification: n } = Dn;
        n && Jo.setTimeout(() => n(e, t));
      }
      const _D = {
          closed: !0,
          next: Zc,
          error: function CD(e) {
            throw e;
          },
          complete: Zc,
        },
        oa =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Cn(e) {
        return e;
      }
      function Kc(e) {
        return 0 === e.length
          ? Cn
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let De = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function SD(e) {
              return (
                (e && e instanceof ta) ||
                ((function bD(e) {
                  return e && ee(e.next) && ee(e.error) && ee(e.complete);
                })(e) &&
                  qc(e))
              );
            })(n)
              ? n
              : new Ur(n, r, o);
            return (
              ei(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = Xc(r))((o, i) => {
              const s = new Ur({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [oa]() {
            return this;
          }
          pipe(...n) {
            return Kc(n)(this);
          }
          toPromise(n) {
            return new (n = Xc(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Xc(e) {
        var t;
        return null !== (t = e ?? Dn.Promise) && void 0 !== t ? t : Promise;
      }
      const ID = jr(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let $t = (() => {
        class e extends De {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Jc(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new ID();
          }
          next(n) {
            ei(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            ei(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            ei(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? Wc
              : ((this.currentObservers = null),
                i.push(n),
                new ot(() => {
                  (this.currentObservers = null), Vr(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new De();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Jc(t, n)), e;
      })();
      class Jc extends $t {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : Wc;
        }
      }
      function ed(e) {
        return ee(e?.lift);
      }
      function be(e) {
        return (t) => {
          if (ed(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Se(e, t, n, r, o) {
        return new MD(e, t, n, r, o);
      }
      class MD extends ta {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function H(e, t) {
        return be((n, r) => {
          let o = 0;
          n.subscribe(
            Se(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function rn(e) {
        return this instanceof rn ? ((this.v = e), this) : new rn(e);
      }
      function od(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function ua(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const id = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function sd(e) {
        return ee(e?.then);
      }
      function ad(e) {
        return ee(e[oa]);
      }
      function ud(e) {
        return Symbol.asyncIterator && ee(e?.[Symbol.asyncIterator]);
      }
      function ld(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const cd = (function QD() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function dd(e) {
        return ee(e?.[cd]);
      }
      function fd(e) {
        return (function rd(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  i.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function u(f) {
                f.value instanceof rn
                  ? Promise.resolve(f.value.v).then(l, c)
                  : d(i[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(i[0][3], p);
            }
          }
          function l(f) {
            a("next", f);
          }
          function c(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield rn(n.read());
              if (o) return yield rn(void 0);
              yield yield rn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function hd(e) {
        return ee(e?.getReader);
      }
      function bt(e) {
        if (e instanceof De) return e;
        if (null != e) {
          if (ad(e))
            return (function ZD(e) {
              return new De((t) => {
                const n = e[oa]();
                if (ee(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (id(e))
            return (function KD(e) {
              return new De((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (sd(e))
            return (function XD(e) {
              return new De((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, Qc);
              });
            })(e);
          if (ud(e)) return pd(e);
          if (dd(e))
            return (function JD(e) {
              return new De((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (hd(e))
            return (function ew(e) {
              return pd(fd(e));
            })(e);
        }
        throw ld(e);
      }
      function pd(e) {
        return new De((t) => {
          (function tw(e, t) {
            var n, r, o, i;
            return (function td(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = od(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function jt(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Ie(e, t, n = 1 / 0) {
        return ee(t)
          ? Ie((r, o) => H((i, s) => t(r, i, o, s))(bt(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            be((r, o) =>
              (function nw(e, t, n, r, o, i, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  h = (g) => (l < r ? p(g) : u.push(g)),
                  p = (g) => {
                    i && t.next(g), l++;
                    let y = !1;
                    bt(n(g, c++)).subscribe(
                      Se(
                        t,
                        (D) => {
                          o?.(D), i ? h(D) : t.next(D);
                        },
                        () => {
                          y = !0;
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (l--; u.length && l < r; ) {
                                const D = u.shift();
                                s ? jt(t, s, () => p(D)) : p(D);
                              }
                              f();
                            } catch (D) {
                              t.error(D);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Se(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function Bn(e = 1 / 0) {
        return Ie(Cn, e);
      }
      const St = new De((e) => e.complete());
      function la(e) {
        return e[e.length - 1];
      }
      function Br(e) {
        return (function ow(e) {
          return e && ee(e.schedule);
        })(la(e))
          ? e.pop()
          : void 0;
      }
      function gd(e, t = 0) {
        return be((n, r) => {
          n.subscribe(
            Se(
              r,
              (o) => jt(r, e, () => r.next(o), t),
              () => jt(r, e, () => r.complete(), t),
              (o) => jt(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function md(e, t = 0) {
        return be((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function yd(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new De((n) => {
          jt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            jt(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function we(e, t) {
        return t
          ? (function fw(e, t) {
              if (null != e) {
                if (ad(e))
                  return (function aw(e, t) {
                    return bt(e).pipe(md(t), gd(t));
                  })(e, t);
                if (id(e))
                  return (function lw(e, t) {
                    return new De((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (sd(e))
                  return (function uw(e, t) {
                    return bt(e).pipe(md(t), gd(t));
                  })(e, t);
                if (ud(e)) return yd(e, t);
                if (dd(e))
                  return (function cw(e, t) {
                    return new De((n) => {
                      let r;
                      return (
                        jt(n, t, () => {
                          (r = e[cd]()),
                            jt(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => ee(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (hd(e))
                  return (function dw(e, t) {
                    return yd(fd(e), t);
                  })(e, t);
              }
              throw ld(e);
            })(e, t)
          : bt(e);
      }
      function ca(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new Ur({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return t(...n).subscribe(r);
      }
      function J(e) {
        for (let t in e) if (e[t] === J) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function te(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(te).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function fa(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const gw = J({ __forward_ref__: J });
      function ha(e) {
        return (
          (e.__forward_ref__ = ha),
          (e.toString = function () {
            return te(this());
          }),
          e
        );
      }
      function T(e) {
        return pa(e) ? e() : e;
      }
      function pa(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(gw) &&
          e.__forward_ref__ === ha
        );
      }
      function ga(e) {
        return e && !!e.ɵproviders;
      }
      const vd = "https://g.co/ng/security#xss";
      class w extends Error {
        constructor(t, n) {
          super(ni(t, n)), (this.code = t);
        }
      }
      function ni(e, t) {
        return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
      }
      function N(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function ri(e, t) {
        throw new w(-201, !1);
      }
      function it(e, t) {
        null == e &&
          (function K(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function x(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function sn(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function oi(e) {
        return Dd(e, ii) || Dd(e, Cd);
      }
      function Dd(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function wd(e) {
        return e && (e.hasOwnProperty(ma) || e.hasOwnProperty(Ew))
          ? e[ma]
          : null;
      }
      const ii = J({ ɵprov: J }),
        ma = J({ ɵinj: J }),
        Cd = J({ ngInjectableDef: J }),
        Ew = J({ ngInjectorDef: J });
      var A = (() => (
        ((A = A || {})[(A.Default = 0)] = "Default"),
        (A[(A.Host = 1)] = "Host"),
        (A[(A.Self = 2)] = "Self"),
        (A[(A.SkipSelf = 4)] = "SkipSelf"),
        (A[(A.Optional = 8)] = "Optional"),
        A
      ))();
      let ya;
      function st(e) {
        const t = ya;
        return (ya = e), t;
      }
      function _d(e, t, n) {
        const r = oi(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & A.Optional
          ? null
          : void 0 !== t
          ? t
          : void ri(te(e));
      }
      const re = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Hr = {},
        va = "__NG_DI_FLAG__",
        si = "ngTempTokenPath",
        Sw = "ngTokenPath",
        Iw = /\n/gm,
        Mw = "\u0275",
        Ed = "__source";
      let zr;
      function Hn(e) {
        const t = zr;
        return (zr = e), t;
      }
      function Tw(e, t = A.Default) {
        if (void 0 === zr) throw new w(-203, !1);
        return null === zr
          ? _d(e, void 0, t)
          : zr.get(e, t & A.Optional ? null : void 0, t);
      }
      function R(e, t = A.Default) {
        return (
          (function bw() {
            return ya;
          })() || Tw
        )(T(e), t);
      }
      function z(e, t = A.Default) {
        return R(e, ai(t));
      }
      function ai(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function Da(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = T(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new w(900, !1);
            let o,
              i = A.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = Aw(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(R(o, i));
          } else t.push(R(r));
        }
        return t;
      }
      function Gr(e, t) {
        return (e[va] = t), (e.prototype[va] = t), e;
      }
      function Aw(e) {
        return e[va];
      }
      function Vt(e) {
        return { toString: e }.toString();
      }
      var It = (() => (
          ((It = It || {})[(It.OnPush = 0)] = "OnPush"),
          (It[(It.Default = 1)] = "Default"),
          It
        ))(),
        Mt = (() => {
          return (
            ((e = Mt || (Mt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            Mt
          );
          var e;
        })();
      const Ut = {},
        Y = [],
        ui = J({ ɵcmp: J }),
        wa = J({ ɵdir: J }),
        Ca = J({ ɵpipe: J }),
        Sd = J({ ɵmod: J }),
        Bt = J({ ɵfac: J }),
        Wr = J({ __NG_ELEMENT_ID__: J });
      let Pw = 0;
      function _n(e) {
        return Vt(() => {
          const t = Md(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === It.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              data: e.data || {},
              encapsulation: e.encapsulation || Mt.Emulated,
              id: "c" + Pw++,
              styles: e.styles || Y,
              _: null,
              schemas: e.schemas || null,
              tView: null,
            };
          Td(n);
          const r = e.dependencies;
          return (n.directiveDefs = li(r, !1)), (n.pipeDefs = li(r, !0)), n;
        });
      }
      function Nw(e) {
        return X(e) || Re(e);
      }
      function Fw(e) {
        return null !== e;
      }
      function En(e) {
        return Vt(() => ({
          type: e.type,
          bootstrap: e.bootstrap || Y,
          declarations: e.declarations || Y,
          imports: e.imports || Y,
          exports: e.exports || Y,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Id(e, t) {
        if (null == e) return Ut;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function ke(e) {
        return Vt(() => {
          const t = Md(e);
          return Td(t), t;
        });
      }
      function X(e) {
        return e[ui] || null;
      }
      function Re(e) {
        return e[wa] || null;
      }
      function ze(e) {
        return e[Ca] || null;
      }
      function Ke(e, t) {
        const n = e[Sd] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${te(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function Md(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          selectors: e.selectors || Y,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Id(e.inputs, t),
          outputs: Id(e.outputs),
        };
      }
      function Td(e) {
        e.features?.forEach((t) => t(e));
      }
      function li(e, t) {
        if (!e) return null;
        const n = t ? ze : Nw;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(Fw);
      }
      const Ht = 0,
        E = 1,
        $ = 2,
        ue = 3,
        ht = 4,
        bn = 5,
        xe = 6,
        Gn = 7,
        ce = 8,
        ci = 9,
        di = 10,
        V = 11,
        _a = 12,
        qr = 13,
        Ad = 14,
        Wn = 15,
        Pe = 16,
        Yr = 17,
        qn = 18,
        Tt = 19,
        Qr = 20,
        Rd = 21,
        oe = 22,
        Ea = 1,
        xd = 2,
        fi = 7,
        hi = 8,
        Yn = 9,
        Le = 10;
      function Xe(e) {
        return Array.isArray(e) && "object" == typeof e[Ea];
      }
      function pt(e) {
        return Array.isArray(e) && !0 === e[Ea];
      }
      function ba(e) {
        return 0 != (4 & e.flags);
      }
      function Zr(e) {
        return e.componentOffset > -1;
      }
      function pi(e) {
        return 1 == (1 & e.flags);
      }
      function gt(e) {
        return !!e.template;
      }
      function Lw(e) {
        return 0 != (256 & e[$]);
      }
      function Sn(e, t) {
        return e.hasOwnProperty(Bt) ? e[Bt] : null;
      }
      class Vw {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function In() {
        return Nd;
      }
      function Nd(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = Bw), Uw;
      }
      function Uw() {
        const e = kd(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === Ut) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function Bw(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            kd(e) ||
            (function Hw(e, t) {
              return (e[Fd] = t);
            })(e, { previous: Ut, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o];
        (s[o] = new Vw(u && u.currentValue, t, a === Ut)), (e[r] = t);
      }
      In.ngInherit = !0;
      const Fd = "__ngSimpleChanges__";
      function kd(e) {
        return e[Fd] || null;
      }
      const at = function (e, t, n) {};
      function Me(e) {
        for (; Array.isArray(e); ) e = e[Ht];
        return e;
      }
      function Je(e, t) {
        return Me(t[e.index]);
      }
      function jd(e, t) {
        return e.data[t];
      }
      function Ge(e, t) {
        const n = t[e];
        return Xe(n) ? n : n[Ht];
      }
      function mi(e) {
        return 64 == (64 & e[$]);
      }
      function an(e, t) {
        return null == t ? null : e[t];
      }
      function Vd(e) {
        e[qn] = 0;
      }
      function Ia(e, t) {
        e[bn] += t;
        let n = e,
          r = e[ue];
        for (
          ;
          null !== r && ((1 === t && 1 === n[bn]) || (-1 === t && 0 === n[bn]));

        )
          (r[bn] += t), (n = r), (r = r[ue]);
      }
      const F = { lFrame: Zd(null), bindingsEnabled: !0 };
      function Bd() {
        return F.bindingsEnabled;
      }
      function v() {
        return F.lFrame.lView;
      }
      function G() {
        return F.lFrame.tView;
      }
      function Te() {
        let e = Hd();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function Hd() {
        return F.lFrame.currentTNode;
      }
      function At(e, t) {
        const n = F.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Ma() {
        return F.lFrame.isParent;
      }
      function oC(e, t) {
        const n = F.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Aa(t);
      }
      function Aa(e) {
        F.lFrame.currentDirectiveIndex = e;
      }
      function qd() {
        return F.lFrame.currentQueryIndex;
      }
      function xa(e) {
        F.lFrame.currentQueryIndex = e;
      }
      function sC(e) {
        const t = e[E];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[xe] : null;
      }
      function Yd(e, t, n) {
        if (n & A.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & A.Host ||
              ((o = sC(i)), null === o || ((i = i[Wn]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (F.lFrame = Qd());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Pa(e) {
        const t = Qd(),
          n = e[E];
        (F.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Qd() {
        const e = F.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Zd(e) : t;
      }
      function Zd(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Kd() {
        const e = F.lFrame;
        return (
          (F.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Xd = Kd;
      function Oa() {
        const e = Kd();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function je() {
        return F.lFrame.selectedIndex;
      }
      function Mn(e) {
        F.lFrame.selectedIndex = e;
      }
      function yi(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks ?? (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks ?? (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks ?? (e.contentCheckHooks = [])).push(n, a)),
            u && (e.viewHooks ?? (e.viewHooks = [])).push(-n, u),
            l &&
              ((e.viewHooks ?? (e.viewHooks = [])).push(n, l),
              (e.viewCheckHooks ?? (e.viewCheckHooks = [])).push(n, l)),
            null != c && (e.destroyHooks ?? (e.destroyHooks = [])).push(n, c);
        }
      }
      function vi(e, t, n) {
        Jd(e, t, 3, n);
      }
      function Di(e, t, n, r) {
        (3 & e[$]) === n && Jd(e, t, n, r);
      }
      function Na(e, t) {
        let n = e[$];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[$] = n));
      }
      function Jd(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[qn] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[qn] += 65536),
              (a < i || -1 == i) &&
                (gC(e, n, t, u), (e[qn] = (4294901760 & e[qn]) + u + 2)),
              u++;
      }
      function gC(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[$] >> 11 < e[qn] >> 16 && (3 & e[$]) === t) {
            (e[$] += 2048), at(4, a, i);
            try {
              i.call(a);
            } finally {
              at(5, a, i);
            }
          }
        } else {
          at(4, a, i);
          try {
            i.call(a);
          } finally {
            at(5, a, i);
          }
        }
      }
      const Kn = -1;
      class Xr {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function ka(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            tf(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function ef(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function tf(e) {
        return 64 === e.charCodeAt(0);
      }
      function Jr(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  nf(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function nf(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function rf(e) {
        return e !== Kn;
      }
      function wi(e) {
        return 32767 & e;
      }
      function Ci(e, t) {
        let n = (function DC(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[Wn]), n--;
        return r;
      }
      let La = !0;
      function _i(e) {
        const t = La;
        return (La = e), t;
      }
      const sf = 255,
        af = 5;
      let wC = 0;
      const Rt = {};
      function Ei(e, t) {
        const n = uf(e, t);
        if (-1 !== n) return n;
        const r = t[E];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          $a(r.data, e),
          $a(t, null),
          $a(r.blueprint, null));
        const o = ja(e, t),
          i = e.injectorIndex;
        if (rf(o)) {
          const s = wi(o),
            a = Ci(o, t),
            u = a[E].data;
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l];
        }
        return (t[i + 8] = o), i;
      }
      function $a(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function uf(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function ja(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = mf(o)), null === r)) return Kn;
          if ((n++, (o = o[Wn]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return Kn;
      }
      function Va(e, t, n) {
        !(function CC(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Wr) && (r = n[Wr]),
            null == r && (r = n[Wr] = wC++);
          const o = r & sf;
          t.data[e + (o >> af)] |= 1 << o;
        })(e, t, n);
      }
      function lf(e, t, n) {
        if (n & A.Optional || void 0 !== e) return e;
        ri();
      }
      function cf(e, t, n, r) {
        if (
          (n & A.Optional && void 0 === r && (r = null),
          !(n & (A.Self | A.Host)))
        ) {
          const o = e[ci],
            i = st(void 0);
          try {
            return o ? o.get(t, r, n & A.Optional) : _d(t, r, n & A.Optional);
          } finally {
            st(i);
          }
        }
        return lf(r, 0, n);
      }
      function df(e, t, n, r = A.Default, o) {
        if (null !== e) {
          if (1024 & t[$]) {
            const s = (function IC(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 1024 & s[$] && !(256 & s[$]);

              ) {
                const a = ff(i, s, n, r | A.Self, Rt);
                if (a !== Rt) return a;
                let u = i.parent;
                if (!u) {
                  const l = s[Rd];
                  if (l) {
                    const c = l.get(n, Rt, r);
                    if (c !== Rt) return c;
                  }
                  (u = mf(s)), (s = s[Wn]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, Rt);
            if (s !== Rt) return s;
          }
          const i = ff(e, t, n, r, Rt);
          if (i !== Rt) return i;
        }
        return cf(t, n, r, o);
      }
      function ff(e, t, n, r, o) {
        const i = (function bC(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(Wr) ? e[Wr] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & sf : SC) : t;
        })(n);
        if ("function" == typeof i) {
          if (!Yd(t, e, r)) return r & A.Host ? lf(o, 0, r) : cf(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & A.Optional) return s;
            ri();
          } finally {
            Xd();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = uf(e, t),
            u = Kn,
            l = r & A.Host ? t[Pe][xe] : null;
          for (
            (-1 === a || r & A.SkipSelf) &&
            ((u = -1 === a ? ja(e, t) : t[a + 8]),
            u !== Kn && pf(r, !1)
              ? ((s = t[E]), (a = wi(u)), (t = Ci(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[E];
            if (hf(i, a, c.data)) {
              const d = EC(a, t, n, s, r, l);
              if (d !== Rt) return d;
            }
            (u = t[a + 8]),
              u !== Kn && pf(r, t[E].data[a + 8] === l) && hf(i, a, t)
                ? ((s = c), (a = wi(u)), (t = Ci(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function EC(e, t, n, r, o, i) {
        const s = t[E],
          a = s.data[e + 8],
          c = bi(
            a,
            s,
            n,
            null == r ? Zr(a) && La : r != s && 0 != (3 & a.type),
            o & A.Host && i === a
          );
        return null !== c ? Tn(t, s, c, a) : Rt;
      }
      function bi(e, t, n, r, o) {
        const i = e.providerIndexes,
          s = t.data,
          a = 1048575 & i,
          u = e.directiveStart,
          c = i >> 20,
          f = o ? a + c : e.directiveEnd;
        for (let h = r ? a : a + c; h < f; h++) {
          const p = s[h];
          if ((h < u && n === p) || (h >= u && p.type === n)) return h;
        }
        if (o) {
          const h = s[u];
          if (h && gt(h) && h.type === n) return u;
        }
        return null;
      }
      function Tn(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function mC(e) {
            return e instanceof Xr;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function mw(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new w(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function Z(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : N(e);
              })(i[n])
            );
          const a = _i(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? st(s.injectImpl) : null;
          Yd(e, r, A.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function pC(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = Nd(t);
                    (n.preOrderHooks ?? (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks ?? (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ?? (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== u && st(u), _i(a), (s.resolving = !1), Xd();
          }
        }
        return o;
      }
      function hf(e, t, n) {
        return !!(n[t + (e >> af)] & (1 << e));
      }
      function pf(e, t) {
        return !(e & A.Self || (e & A.Host && t));
      }
      class Xn {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return df(this._tNode, this._lView, t, ai(r), n);
        }
      }
      function SC() {
        return new Xn(Te(), v());
      }
      function Ua(e) {
        return pa(e)
          ? () => {
              const t = Ua(T(e));
              return t && t();
            }
          : Sn(e);
      }
      function mf(e) {
        const t = e[E],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[xe] : null;
      }
      const er = "__parameters__";
      function nr(e, t, n) {
        return Vt(() => {
          const r = (function Ba(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(er)
                ? u[er]
                : Object.defineProperty(u, er, { value: [] })[er];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class P {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = x({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function An(e, t) {
        e.forEach((n) => (Array.isArray(n) ? An(n, t) : t(n)));
      }
      function vf(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Ii(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function et(e, t, n) {
        let r = rr(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function RC(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function za(e, t) {
        const n = rr(e, t);
        if (n >= 0) return e[1 | n];
      }
      function rr(e, t) {
        return (function Df(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const ro = Gr(nr("Optional"), 8),
        oo = Gr(nr("SkipSelf"), 4);
      var We = (() => (
        ((We = We || {})[(We.Important = 1)] = "Important"),
        (We[(We.DashCase = 2)] = "DashCase"),
        We
      ))();
      const Za = new Map();
      let XC = 0;
      const Xa = "__ngContext__";
      function Oe(e, t) {
        Xe(t)
          ? ((e[Xa] = t[Qr]),
            (function e_(e) {
              Za.set(e[Qr], e);
            })(t))
          : (e[Xa] = t);
      }
      let Ja;
      function eu(e, t) {
        return Ja(e, t);
      }
      function uo(e) {
        const t = e[ue];
        return pt(t) ? t[ue] : t;
      }
      function tu(e) {
        return jf(e[qr]);
      }
      function nu(e) {
        return jf(e[ht]);
      }
      function jf(e) {
        for (; null !== e && !pt(e); ) e = e[ht];
        return e;
      }
      function ir(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          pt(r) ? (i = r) : Xe(r) && ((s = !0), (r = r[Ht]));
          const a = Me(r);
          0 === e && null !== n
            ? null == o
              ? Gf(t, n, a)
              : Rn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Rn(t, n, a, o || null, !0)
            : 2 === e
            ? (function lu(e, t, n) {
                const r = Ri(e, t);
                r &&
                  (function w_(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function E_(e, t, n, r, o) {
                const i = n[fi];
                i !== Me(n) && ir(t, e, r, i, o);
                for (let a = Le; a < n.length; a++) {
                  const u = n[a];
                  lo(u[E], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function ou(e, t, n) {
        return e.createElement(t, n);
      }
      function Uf(e, t) {
        const n = e[Yn],
          r = n.indexOf(t),
          o = t[ue];
        512 & t[$] && ((t[$] &= -513), Ia(o, -1)), n.splice(r, 1);
      }
      function iu(e, t) {
        if (e.length <= Le) return;
        const n = Le + t,
          r = e[n];
        if (r) {
          const o = r[Yr];
          null !== o && o !== e && Uf(o, r), t > 0 && (e[n - 1][ht] = r[ht]);
          const i = Ii(e, Le + t);
          !(function f_(e, t) {
            lo(e, t, t[V], 2, null, null), (t[Ht] = null), (t[xe] = null);
          })(r[E], r);
          const s = i[Tt];
          null !== s && s.detachView(i[E]),
            (r[ue] = null),
            (r[ht] = null),
            (r[$] &= -65);
        }
        return r;
      }
      function Bf(e, t) {
        if (!(128 & t[$])) {
          const n = t[V];
          n.destroyNode && lo(e, t, n, 3, null, null),
            (function g_(e) {
              let t = e[qr];
              if (!t) return su(e[E], e);
              for (; t; ) {
                let n = null;
                if (Xe(t)) n = t[qr];
                else {
                  const r = t[Le];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[ht] && t !== e; )
                    Xe(t) && su(t[E], t), (t = t[ue]);
                  null === t && (t = e), Xe(t) && su(t[E], t), (n = t && t[ht]);
                }
                t = n;
              }
            })(t);
        }
      }
      function su(e, t) {
        if (!(128 & t[$])) {
          (t[$] &= -65),
            (t[$] |= 128),
            (function D_(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof Xr)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        at(4, a, u);
                        try {
                          u.call(a);
                        } finally {
                          at(5, a, u);
                        }
                      }
                    else {
                      at(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        at(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function v_(e, t) {
              const n = e.cleanup,
                r = t[Gn];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[(o = s)]() : r[(o = -s)].unsubscribe(), (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                t[Gn] = null;
              }
            })(e, t),
            1 === t[E].type && t[V].destroy();
          const n = t[Yr];
          if (null !== n && pt(t[ue])) {
            n !== t[ue] && Uf(n, t);
            const r = t[Tt];
            null !== r && r.detachView(e);
          }
          !(function t_(e) {
            Za.delete(e[Qr]);
          })(t);
        }
      }
      function Hf(e, t, n) {
        return (function zf(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[Ht];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === Mt.None || i === Mt.Emulated) return null;
            }
            return Je(r, n);
          }
        })(e, t.parent, n);
      }
      function Rn(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function Gf(e, t, n) {
        e.appendChild(t, n);
      }
      function Wf(e, t, n, r, o) {
        null !== r ? Rn(e, t, n, r, o) : Gf(e, t, n);
      }
      function Ri(e, t) {
        return e.parentNode(t);
      }
      let au,
        fu,
        Ni,
        Qf = function Yf(e, t, n) {
          return 40 & e.type ? Je(e, n) : null;
        };
      function xi(e, t, n, r) {
        const o = Hf(e, r, t),
          i = t[V],
          a = (function qf(e, t, n) {
            return Qf(e, t, n);
          })(r.parent || t[xe], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) Wf(i, o, n[u], a, !1);
          else Wf(i, o, n, a, !1);
        void 0 !== au && au(i, r, t, n, o);
      }
      function Pi(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return Je(t, e);
          if (4 & n) return uu(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Pi(e, r);
            {
              const o = e[t.index];
              return pt(o) ? uu(-1, o) : Me(o);
            }
          }
          if (32 & n) return eu(t, e)() || Me(e[t.index]);
          {
            const r = Kf(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Pi(uo(e[Pe]), r)
              : Pi(e, t.next);
          }
        }
        return null;
      }
      function Kf(e, t) {
        return null !== t ? e[Pe][xe].projection[t.projection] : null;
      }
      function uu(e, t) {
        const n = Le + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[E].firstChild;
          if (null !== o) return Pi(r, o);
        }
        return t[fi];
      }
      function cu(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && Oe(Me(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & u) cu(e, t, n.child, r, o, i, !1), ir(t, e, o, a, i);
            else if (32 & u) {
              const l = eu(n, r);
              let c;
              for (; (c = l()); ) ir(t, e, o, c, i);
              ir(t, e, o, a, i);
            } else 16 & u ? Xf(e, t, r, n, o, i) : ir(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function lo(e, t, n, r, o, i) {
        cu(n, r, e.firstChild, t, o, i, !1);
      }
      function Xf(e, t, n, r, o, i) {
        const s = n[Pe],
          u = s[xe].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) ir(t, e, o, u[l], i);
        else cu(e, t, u, s[ue], o, i, !0);
      }
      function Jf(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function eh(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && ka(e, t, r),
          null !== o && Jf(e, t, o),
          null !== i &&
            (function S_(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      function oh(e) {
        return (
          (function hu() {
            if (void 0 === Ni && ((Ni = null), re.trustedTypes))
              try {
                Ni = re.trustedTypes.createPolicy("angular#unsafe-bypass", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return Ni;
          })()?.createScriptURL(e) || e
        );
      }
      class ih {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${vd})`;
        }
      }
      function un(e) {
        return e instanceof ih ? e.changingThisBreaksApplicationSecurity : e;
      }
      function co(e, t) {
        const n = (function F_(e) {
          return (e instanceof ih && e.getTypeName()) || null;
        })(e);
        if (null != n && n !== t) {
          if ("ResourceURL" === n && "URL" === t) return !0;
          throw new Error(`Required a safe ${t}, got a ${n} (see ${vd})`);
        }
        return n === t;
      }
      const j_ = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      var me = (() => (
        ((me = me || {})[(me.NONE = 0)] = "NONE"),
        (me[(me.HTML = 1)] = "HTML"),
        (me[(me.STYLE = 2)] = "STYLE"),
        (me[(me.SCRIPT = 3)] = "SCRIPT"),
        (me[(me.URL = 4)] = "URL"),
        (me[(me.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        me
      ))();
      function fh(e) {
        const t = ho();
        return t
          ? t.sanitize(me.URL, e) || ""
          : co(e, "URL")
          ? un(e)
          : (function pu(e) {
              return (e = String(e)).match(j_) ? e : "unsafe:" + e;
            })(N(e));
      }
      function hh(e) {
        const t = ho();
        if (t) return oh(t.sanitize(me.RESOURCE_URL, e) || "");
        if (co(e, "ResourceURL")) return oh(un(e));
        throw new w(904, !1);
      }
      function ho() {
        const e = v();
        return e && e[_a];
      }
      const ki = new P("ENVIRONMENT_INITIALIZER"),
        gh = new P("INJECTOR", -1),
        mh = new P("INJECTOR_DEF_TYPES");
      class yh {
        get(t, n = Hr) {
          if (n === Hr) {
            const r = new Error(`NullInjectorError: No provider for ${te(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function X_(...e) {
        return { ɵproviders: vh(0, e), ɵfromNgModule: !0 };
      }
      function vh(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          An(t, (i) => {
            const s = i;
            vu(s, n, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && Dh(o, n),
          n
        );
      }
      function Dh(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          Du(o, (i) => {
            t.push(i);
          });
        }
      }
      function vu(e, t, n, r) {
        if (!(e = T(e))) return !1;
        let o = null,
          i = wd(e);
        const s = !i && X(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = wd(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const l of u) vu(l, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let l;
              r.add(o);
              try {
                An(i.imports, (c) => {
                  vu(c, t, n, r) && (l || (l = []), l.push(c));
                });
              } finally {
              }
              void 0 !== l && Dh(l, t);
            }
            if (!a) {
              const l = Sn(o) || (() => new o());
              t.push(
                { provide: o, useFactory: l, deps: Y },
                { provide: mh, useValue: o, multi: !0 },
                { provide: ki, useValue: () => R(o), multi: !0 }
              );
            }
            const u = i.providers;
            null == u ||
              a ||
              Du(u, (c) => {
                t.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function Du(e, t) {
        for (let n of e)
          ga(n) && (n = n.ɵproviders), Array.isArray(n) ? Du(n, t) : t(n);
      }
      const J_ = J({ provide: String, useValue: J });
      function wu(e) {
        return null !== e && "object" == typeof e && J_ in e;
      }
      function xn(e) {
        return "function" == typeof e;
      }
      const Cu = new P("Set Injector scope."),
        Li = {},
        t0 = {};
      let _u;
      function $i() {
        return void 0 === _u && (_u = new yh()), _u;
      }
      class qt {}
      class _h extends qt {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            bu(t, (s) => this.processProvider(s)),
            this.records.set(gh, ar(void 0, this)),
            o.has("environment") && this.records.set(qt, ar(void 0, this));
          const i = this.records.get(Cu);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(mh.multi, Y, A.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = Hn(this),
            r = st(void 0);
          try {
            return t();
          } finally {
            Hn(n), st(r);
          }
        }
        get(t, n = Hr, r = A.Default) {
          this.assertNotDestroyed(), (r = ai(r));
          const o = Hn(this),
            i = st(void 0);
          try {
            if (!(r & A.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function a0(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof P)
                    );
                  })(t) && oi(t);
                (a = u && this.injectableDefInScope(u) ? ar(Eu(t), Li) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & A.Self ? $i() : this.parent).get(
              t,
              (n = r & A.Optional && n === Hr ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[si] = s[si] || []).unshift(te(t)), o)) throw s;
              return (function Rw(e, t, n, r) {
                const o = e[si];
                throw (
                  (t[Ed] && o.unshift(t[Ed]),
                  (e.message = (function xw(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && e.charAt(1) == Mw
                        ? e.slice(2)
                        : e;
                    let o = te(t);
                    if (Array.isArray(t)) o = t.map(te).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : te(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      Iw,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e[Sw] = o),
                  (e[si] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            st(i), Hn(o);
          }
        }
        resolveInjectorInitializers() {
          const t = Hn(this),
            n = st(void 0);
          try {
            const r = this.get(ki.multi, Y, A.Self);
            for (const o of r) o();
          } finally {
            Hn(t), st(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(te(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new w(205, !1);
        }
        processProvider(t) {
          let n = xn((t = T(t))) ? t : T(t && t.provide);
          const r = (function r0(e) {
            return wu(e)
              ? ar(void 0, e.useValue)
              : ar(
                  (function Eh(e, t, n) {
                    let r;
                    if (xn(e)) {
                      const o = T(e);
                      return Sn(o) || Eu(o);
                    }
                    if (wu(e)) r = () => T(e.useValue);
                    else if (
                      (function Ch(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...Da(e.deps || []));
                    else if (
                      (function wh(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => R(T(e.useExisting));
                    else {
                      const o = T(e && (e.useClass || e.provide));
                      if (
                        !(function o0(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return Sn(o) || Eu(o);
                      r = () => new o(...Da(e.deps));
                    }
                    return r;
                  })(e),
                  Li
                );
          })(t);
          if (xn(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = ar(void 0, Li, !0)),
              (o.factory = () => Da(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Li && ((n.value = t0), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function s0(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = T(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function Eu(e) {
        const t = oi(e),
          n = null !== t ? t.factory : Sn(e);
        if (null !== n) return n;
        if (e instanceof P) throw new w(204, !1);
        if (e instanceof Function)
          return (function n0(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function no(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new w(204, !1))
              );
            const n = (function _w(e) {
              return (e && (e[ii] || e[Cd])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new w(204, !1);
      }
      function ar(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function bu(e, t) {
        for (const n of e)
          Array.isArray(n) ? bu(n, t) : n && ga(n) ? bu(n.ɵproviders, t) : t(n);
      }
      class u0 {}
      class bh {}
      class c0 {
        resolveComponentFactory(t) {
          throw (function l0(e) {
            const t = Error(
              `No component factory found for ${te(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let po = (() => {
        class e {}
        return (e.NULL = new c0()), e;
      })();
      function d0() {
        return ur(Te(), v());
      }
      function ur(e, t) {
        return new ln(Je(e, t));
      }
      let ln = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = d0), e;
      })();
      function f0(e) {
        return e instanceof ln ? e.nativeElement : e;
      }
      class Ih {}
      let go = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function h0() {
                const e = v(),
                  n = Ge(Te().index, e);
                return (Xe(n) ? n : e)[V];
              })()),
            e
          );
        })(),
        p0 = (() => {
          class e {}
          return (
            (e.ɵprov = x({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class ji {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const g0 = new ji("15.2.10"),
        Su = {},
        Iu = "ngOriginalError";
      function Mu(e) {
        return e[Iu];
      }
      class lr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Mu(t);
          for (; n && Mu(n); ) n = Mu(n);
          return n || null;
        }
      }
      function Yt(e) {
        return e instanceof Function ? e() : e;
      }
      function Th(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const Ah = "ng-template";
      function I0(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (n && "class" === i && -1 !== Th(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function Rh(e) {
        return 4 === e.type && e.value !== Ah;
      }
      function M0(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Ah);
      }
      function T0(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function x0(e) {
            for (let t = 0; t < e.length; t++) if (ef(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !M0(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (mt(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!I0(e.attrs, l, n)) {
                    if (mt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = A0(8 & r ? "class" : u, o, Rh(e), n);
                if (-1 === d) {
                  if (mt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Th(h, l, 0)) || (2 & r && l !== f)) {
                    if (mt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !mt(r) && !mt(u)) return !1;
            if (s && mt(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return mt(r) || s;
      }
      function mt(e) {
        return 0 == (1 & e);
      }
      function A0(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function P0(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function xh(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (T0(e, t[r], n)) return !0;
        return !1;
      }
      function Ph(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function N0(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !mt(s) && ((t += Ph(i, o)), (o = "")),
              (r = s),
              (i = i || !mt(r));
          n++;
        }
        return "" !== o && (t += Ph(i, o)), t;
      }
      const k = {};
      function Nh(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[$])) {
            const i = e.preOrderCheckHooks;
            null !== i && vi(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && Di(t, i, 0, n);
          }
        Mn(n);
      }
      function $h(e, t = null, n = null, r) {
        const o = jh(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function jh(e, t = null, n = null, r, o = new Set()) {
        const i = [n || Y, X_(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : te(e))),
          new _h(i, t || $i(), r || null, o)
        );
      }
      let Qt = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return $h({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return $h({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Hr),
          (e.NULL = new yh()),
          (e.ɵprov = x({ token: e, providedIn: "any", factory: () => R(gh) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function S(e, t = A.Default) {
        const n = v();
        return null === n ? R(e, t) : df(Te(), n, T(e), t);
      }
      function qh(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              xa(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Ui(e, t, n, r, o, i, s, a, u, l, c) {
        const d = t.blueprint.slice();
        return (
          (d[Ht] = o),
          (d[$] = 76 | r),
          (null !== c || (e && 1024 & e[$])) && (d[$] |= 1024),
          Vd(d),
          (d[ue] = d[Wn] = e),
          (d[ce] = n),
          (d[di] = s || (e && e[di])),
          (d[V] = a || (e && e[V])),
          (d[_a] = u || (e && e[_a]) || null),
          (d[ci] = l || (e && e[ci]) || null),
          (d[xe] = i),
          (d[Qr] = (function JC() {
            return XC++;
          })()),
          (d[Rd] = c),
          (d[Pe] = 2 == t.type ? e[Pe] : d),
          d
        );
      }
      function fr(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Pu(e, t, n, r, o) {
            const i = Hd(),
              s = Ma(),
              u = (e.data[t] = (function sE(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  componentOffset: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tView: null,
                  next: null,
                  prev: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            );
          })(e, t, n, r, o)),
            (function rC() {
              return F.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function Kr() {
            const e = F.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return At(i, !0), i;
      }
      function mo(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Ou(e, t, n) {
        Pa(t);
        try {
          const r = e.viewQuery;
          null !== r && Bu(1, r, n);
          const o = e.template;
          null !== o && Yh(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && qh(e, t),
            e.staticViewQueries && Bu(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function rE(e, t) {
              for (let n = 0; n < t.length; n++) IE(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[$] &= -5), Oa();
        }
      }
      function Bi(e, t, n, r) {
        const o = t[$];
        if (128 != (128 & o)) {
          Pa(t);
          try {
            Vd(t),
              (function Gd(e) {
                return (F.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && Yh(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && vi(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && Di(t, l, 0, null), Na(t, 0);
            }
            if (
              ((function bE(e) {
                for (let t = tu(e); null !== t; t = nu(t)) {
                  if (!t[xd]) continue;
                  const n = t[Yn];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    512 & o[$] || Ia(o[ue], 1), (o[$] |= 512);
                  }
                }
              })(t),
              (function EE(e) {
                for (let t = tu(e); null !== t; t = nu(t))
                  for (let n = Le; n < t.length; n++) {
                    const r = t[n],
                      o = r[E];
                    mi(r) && Bi(o, r, o.template, r[ce]);
                  }
              })(t),
              null !== e.contentQueries && qh(e, t),
              s)
            ) {
              const l = e.contentCheckHooks;
              null !== l && vi(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && Di(t, l, 1), Na(t, 1);
            }
            !(function tE(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) Mn(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r];
                      oC(s, i), a(2, t[i]);
                    }
                  }
                } finally {
                  Mn(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function nE(e, t) {
                for (let n = 0; n < t.length; n++) SE(e, t[n]);
              })(t, a);
            const u = e.viewQuery;
            if ((null !== u && Bu(2, u, r), s)) {
              const l = e.viewCheckHooks;
              null !== l && vi(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && Di(t, l, 2), Na(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[$] &= -41),
              512 & t[$] && ((t[$] &= -513), Ia(t[ue], -1));
          } finally {
            Oa();
          }
        }
      }
      function Yh(e, t, n, r, o) {
        const i = je(),
          s = 2 & r;
        try {
          Mn(-1),
            s && t.length > oe && Nh(e, t, oe, !1),
            at(s ? 2 : 0, o),
            n(r, o);
        } finally {
          Mn(i), at(s ? 3 : 1, o);
        }
      }
      function Nu(e, t, n) {
        if (ba(t)) {
          const o = t.directiveEnd;
          for (let i = t.directiveStart; i < o; i++) {
            const s = e.data[i];
            s.contentQueries && s.contentQueries(1, n[i], i);
          }
        }
      }
      function Qh(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Lu(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function Lu(e, t, n, r, o, i, s, a, u, l) {
        const c = oe + r,
          d = c + o,
          f = (function oE(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : k);
            return n;
          })(c, d),
          h = "function" == typeof l ? l() : l;
        return (f[E] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function Zh(e, t, n, r) {
        const o = np(t);
        null === n
          ? o.push(r)
          : (o.push(n), e.firstCreatePass && rp(e).push(r, o.length - 1));
      }
      function Kh(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? Xh(n, t, o, i)
              : r.hasOwnProperty(o) && Xh(n, t, r[o], i);
          }
        return n;
      }
      function Xh(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function Jh(e, t, n, r, o, i) {
        for (let l = 0; l < r.length; l++) Va(Ei(n, t), e, r[l].type);
        !(function vE(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          u = mo(e, t, r.length, null);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          (n.mergedAttrs = Jr(n.mergedAttrs, c.hostAttrs)),
            DE(e, n, t, u, c),
            yE(u, c, o),
            null !== c.contentQueries && (n.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (n.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ?? (e.preOrderHooks = [])).push(n.index),
            (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ?? (e.preOrderCheckHooks = [])).push(
                n.index
              ),
              (a = !0)),
            u++;
        }
        !(function aE(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let u = null,
            l = null;
          for (let c = t.directiveStart; c < o; c++) {
            const d = i[c],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (u = Kh(d.inputs, c, u, f ? f.inputs : null)),
              (l = Kh(d.outputs, c, l, p));
            const g = null === u || null === s || Rh(t) ? null : _E(u, c, s);
            a.push(g);
          }
          null !== u &&
            (u.hasOwnProperty("class") && (t.flags |= 8),
            u.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = u),
            (t.outputs = l);
        })(e, n, i);
      }
      function ep(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function iC() {
            return F.lFrame.currentDirectiveIndex;
          })();
        try {
          Mn(i);
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              l = t[a];
            Aa(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                pE(u, l);
          }
        } finally {
          Mn(-1), Aa(s);
        }
      }
      function pE(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function ju(e, t, n) {
        (t.componentOffset = n),
          (e.components ?? (e.components = [])).push(t.index);
      }
      function yE(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          gt(t) && (n[""] = e);
        }
      }
      function DE(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = Sn(o.type)),
          s = new Xr(i, gt(o), S);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function dE(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function fE(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, mo(e, n, o.hostVars, k), o);
      }
      function xt(e, t, n, r, o, i) {
        const s = Je(e, t);
        !(function Vu(e, t, n, r, o, i, s) {
          if (null == i) e.removeAttribute(t, o, n);
          else {
            const a = null == s ? N(i) : s(i, r || "", o);
            e.setAttribute(t, o, a, n);
          }
        })(t[V], s, i, e.value, n, r, o);
      }
      function CE(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let u = 0; u < s.length; ) {
            const l = s[u++],
              c = s[u++],
              d = s[u++];
            null !== a ? r.setInput(n, d, l, c) : (n[c] = d);
          }
        }
      }
      function _E(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function SE(e, t) {
        const n = Ge(t, e);
        if (mi(n)) {
          const r = n[E];
          48 & n[$] ? Bi(r, n, r.template, n[ce]) : n[bn] > 0 && Uu(n);
        }
      }
      function Uu(e) {
        for (let r = tu(e); null !== r; r = nu(r))
          for (let o = Le; o < r.length; o++) {
            const i = r[o];
            if (mi(i))
              if (512 & i[$]) {
                const s = i[E];
                Bi(s, i, s.template, i[ce]);
              } else i[bn] > 0 && Uu(i);
          }
        const n = e[E].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = Ge(n[r], e);
            mi(o) && o[bn] > 0 && Uu(o);
          }
      }
      function IE(e, t) {
        const n = Ge(t, e),
          r = n[E];
        (function ME(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          Ou(r, n, n[ce]);
      }
      function Hi(e, t) {
        return e[qr] ? (e[Ad][ht] = t) : (e[qr] = t), (e[Ad] = t), t;
      }
      function zi(e) {
        for (; e; ) {
          e[$] |= 32;
          const t = uo(e);
          if (Lw(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Gi(e, t, n, r = !0) {
        const o = t[di];
        o.begin && o.begin();
        try {
          Bi(e, t, e.template, n);
        } catch (s) {
          throw (r && ip(t, s), s);
        } finally {
          o.end && o.end();
        }
      }
      function Bu(e, t, n) {
        xa(0), t(e, n);
      }
      function np(e) {
        return e[Gn] || (e[Gn] = []);
      }
      function rp(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function ip(e, t) {
        const n = e[ci],
          r = n ? n.get(lr, null) : null;
        r && r.handleError(t);
      }
      function Hu(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            u = t[s],
            l = e.data[s];
          null !== l.setInput ? l.setInput(u, o, r, a) : (u[a] = o);
        }
      }
      function Wi(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = fa(o, a))
              : 2 == i && (r = fa(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function qi(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(Me(i)), pt(i)))
            for (let a = Le; a < i.length; a++) {
              const u = i[a],
                l = u[E].firstChild;
              null !== l && qi(u[E], u, l, r);
            }
          const s = n.type;
          if (8 & s) qi(e, t, n.child, r);
          else if (32 & s) {
            const a = eu(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = Kf(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = uo(t[Pe]);
              qi(u[E], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class yo {
        get rootNodes() {
          const t = this._lView,
            n = t[E];
          return qi(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[ce];
        }
        set context(t) {
          this._lView[ce] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[$]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[ue];
            if (pt(t)) {
              const n = t[hi],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (iu(t, r), Ii(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Bf(this._lView[E], this._lView);
        }
        onDestroy(t) {
          Zh(this._lView[E], this._lView, null, t);
        }
        markForCheck() {
          zi(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[$] &= -65;
        }
        reattach() {
          this._lView[$] |= 64;
        }
        detectChanges() {
          Gi(this._lView[E], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new w(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function p_(e, t) {
              lo(e, t, t[V], 2, null, null);
            })(this._lView[E], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new w(902, !1);
          this._appRef = t;
        }
      }
      class TE extends yo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Gi(t[E], t, t[ce], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class sp extends po {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = X(t);
          return new vo(n, this.ngModule);
        }
      }
      function ap(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class RE {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = ai(r);
          const o = this.injector.get(t, Su, r);
          return o !== Su || n === Su ? o : this.parentInjector.get(t, n, r);
        }
      }
      class vo extends bh {
        get inputs() {
          return ap(this.componentDef.inputs);
        }
        get outputs() {
          return ap(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function F0(e) {
              return e.map(N0).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof qt ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new RE(t, i) : t,
            a = s.get(Ih, null);
          if (null === a) throw new w(407, !1);
          const u = s.get(p0, null),
            l = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function iE(e, t, n) {
                  return e.selectRootElement(t, n === Mt.ShadowDom);
                })(l, r, this.componentDef.encapsulation)
              : ou(
                  l,
                  c,
                  (function AE(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = Lu(0, null, null, 1, 0, null, null, null, null, null),
            p = Ui(null, h, null, f, null, null, a, l, u, s, null);
          let g, y;
          Pa(p);
          try {
            const D = this.componentDef;
            let _,
              m = null;
            D.findHostDirectiveDefs
              ? ((_ = []),
                (m = new Map()),
                D.findHostDirectiveDefs(D, _, m),
                _.push(D))
              : (_ = [D]);
            const b = (function PE(e, t) {
                const n = e[E],
                  r = oe;
                return (e[r] = t), fr(n, r, 2, "#host", null);
              })(p, d),
              Q = (function OE(e, t, n, r, o, i, s, a) {
                const u = o[E];
                !(function NE(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = Jr(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Wi(t, t.mergedAttrs, !0), null !== n && eh(r, n, t));
                })(r, e, t, s);
                const l = i.createRenderer(t, n),
                  c = Ui(
                    o,
                    Qh(n),
                    null,
                    n.onPush ? 32 : 16,
                    o[e.index],
                    e,
                    i,
                    l,
                    a || null,
                    null,
                    null
                  );
                return (
                  u.firstCreatePass && ju(u, e, r.length - 1),
                  Hi(o, c),
                  (o[e.index] = c)
                );
              })(b, d, D, _, p, a, l);
            (y = jd(h, oe)),
              d &&
                (function kE(e, t, n, r) {
                  if (r) ka(e, n, ["ng-version", g0.full]);
                  else {
                    const { attrs: o, classes: i } = (function k0(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!mt(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && ka(e, n, o),
                      i && i.length > 0 && Jf(e, n, i.join(" "));
                  }
                })(l, D, d, r),
              void 0 !== n &&
                (function LE(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(y, this.ngContentSelectors, n),
              (g = (function FE(e, t, n, r, o, i) {
                const s = Te(),
                  a = o[E],
                  u = Je(s, o);
                Jh(a, o, s, n, null, r);
                for (let c = 0; c < n.length; c++)
                  Oe(Tn(o, a, s.directiveStart + c, s), o);
                ep(a, o, s), u && Oe(u, o);
                const l = Tn(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[ce] = o[ce] = l), null !== i))
                  for (const c of i) c(l, t);
                return Nu(a, s, e), l;
              })(Q, D, _, m, p, [$E])),
              Ou(h, p, null);
          } finally {
            Oa();
          }
          return new xE(this.componentType, g, ur(y, p), p, y);
        }
      }
      class xE extends u0 {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new TE(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            const i = this._rootLView;
            Hu(i[E], i, o, t, n), zi(Ge(this._tNode.index, i));
          }
        }
        get injector() {
          return new Xn(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function $E() {
        const e = Te();
        yi(v()[E], e);
      }
      function Ne(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function Wu(e, t, n, r) {
        const o = v();
        return (
          Ne(
            o,
            (function Zn() {
              return F.lFrame.bindingIndex++;
            })(),
            t
          ) &&
            (G(),
            xt(
              (function se() {
                const e = F.lFrame;
                return jd(e.tView, e.selectedIndex);
              })(),
              o,
              e,
              t,
              n,
              r
            )),
          Wu
        );
      }
      function qu(e, t, n, r, o) {
        const s = o ? "class" : "style";
        Hu(e, n, t.inputs[s], s, r);
      }
      function W(e, t, n, r) {
        const o = v(),
          i = G(),
          s = oe + e,
          a = o[V],
          u = i.firstCreatePass
            ? (function nb(e, t, n, r, o, i) {
                const s = t.consts,
                  u = fr(t, e, 2, r, an(s, o));
                return (
                  (function $u(e, t, n, r) {
                    if (Bd()) {
                      const o = null === r ? null : { "": -1 },
                        i = (function gE(e, t) {
                          const n = e.directiveRegistry;
                          let r = null,
                            o = null;
                          if (n)
                            for (let i = 0; i < n.length; i++) {
                              const s = n[i];
                              if (xh(t, s.selectors, !1))
                                if ((r || (r = []), gt(s)))
                                  if (null !== s.findHostDirectiveDefs) {
                                    const a = [];
                                    (o = o || new Map()),
                                      s.findHostDirectiveDefs(s, a, o),
                                      r.unshift(...a, s),
                                      ju(e, t, a.length);
                                  } else r.unshift(s), ju(e, t, 0);
                                else
                                  (o = o || new Map()),
                                    s.findHostDirectiveDefs?.(s, r, o),
                                    r.push(s);
                            }
                          return null === r ? null : [r, o];
                        })(e, n);
                      let s, a;
                      null === i ? (s = a = null) : ([s, a] = i),
                        null !== s && Jh(e, t, n, s, o, a),
                        o &&
                          (function mE(e, t, n) {
                            if (t) {
                              const r = (e.localNames = []);
                              for (let o = 0; o < t.length; o += 2) {
                                const i = n[t[o + 1]];
                                if (null == i) throw new w(-301, !1);
                                r.push(t[o], i);
                              }
                            }
                          })(n, r, o);
                    }
                    n.mergedAttrs = Jr(n.mergedAttrs, n.attrs);
                  })(t, n, u, an(s, i)),
                  null !== u.attrs && Wi(u, u.attrs, !1),
                  null !== u.mergedAttrs && Wi(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          l = (o[s] = ou(
            a,
            t,
            (function hC() {
              return F.lFrame.currentNamespace;
            })()
          )),
          c = pi(u);
        return (
          At(u, !0),
          eh(a, l, u),
          32 != (32 & u.flags) && xi(i, o, l, u),
          0 ===
            (function Qw() {
              return F.lFrame.elementDepthCount;
            })() && Oe(l, o),
          (function Zw() {
            F.lFrame.elementDepthCount++;
          })(),
          c &&
            ((function Fu(e, t, n) {
              Bd() &&
                ((function hE(e, t, n, r) {
                  const o = n.directiveStart,
                    i = n.directiveEnd;
                  Zr(n) &&
                    (function wE(e, t, n) {
                      const r = Je(t, e),
                        o = Qh(n),
                        i = e[di],
                        s = Hi(
                          e,
                          Ui(
                            e,
                            o,
                            null,
                            n.onPush ? 32 : 16,
                            r,
                            t,
                            i,
                            i.createRenderer(r, n),
                            null,
                            null,
                            null
                          )
                        );
                      e[t.index] = s;
                    })(t, n, e.data[o + n.componentOffset]),
                    e.firstCreatePass || Ei(n, t),
                    Oe(r, t);
                  const s = n.initialInputs;
                  for (let a = o; a < i; a++) {
                    const u = e.data[a],
                      l = Tn(t, e, a, n);
                    Oe(l, t),
                      null !== s && CE(0, a - o, l, u, 0, s),
                      gt(u) && (Ge(n.index, t)[ce] = Tn(t, e, a, n));
                  }
                })(e, t, n, Je(n, t)),
                64 == (64 & n.flags) && ep(e, t, n));
            })(i, o, u),
            Nu(i, u, o)),
          null !== r &&
            (function ku(e, t, n = Je) {
              const r = t.localNames;
              if (null !== r) {
                let o = t.index + 1;
                for (let i = 0; i < r.length; i += 2) {
                  const s = r[i + 1],
                    a = -1 === s ? n(t, e) : e[s];
                  e[o++] = a;
                }
              }
            })(o, u),
          W
        );
      }
      function q() {
        let e = Te();
        Ma()
          ? (function Ta() {
              F.lFrame.isParent = !1;
            })()
          : ((e = e.parent), At(e, !1));
        const t = e;
        !(function Kw() {
          F.lFrame.elementDepthCount--;
        })();
        const n = G();
        return (
          n.firstCreatePass && (yi(n, e), ba(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function yC(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            qu(n, t, v(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function vC(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            qu(n, t, v(), t.stylesWithoutHost, !1),
          q
        );
      }
      function de(e, t, n, r) {
        return W(e, t, n, r), q(), de;
      }
      function Zi(e) {
        return !!e && "function" == typeof e.then;
      }
      const Sp = function bp(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function Zu(e, t, n, r) {
        const o = v(),
          i = G(),
          s = Te();
        return (
          (function Mp(e, t, n, r, o, i, s) {
            const a = pi(r),
              l = e.firstCreatePass && rp(e),
              c = t[ce],
              d = np(t);
            let f = !0;
            if (3 & r.type || s) {
              const g = Je(r, t),
                y = s ? s(g) : g,
                D = d.length,
                _ = s ? (b) => s(Me(b[r.index])) : r.index;
              let m = null;
              if (
                (!s &&
                  a &&
                  (m = (function ib(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[Gn],
                            u = o[i + 2];
                          return a.length > u ? a[u] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== m)
              )
                ((m.__ngLastListenerFn__ || m).__ngNextListenerFn__ = i),
                  (m.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = Ap(r, t, c, i, !1);
                const b = n.listen(y, o, i);
                d.push(i, b), l && l.push(o, _, D, D + 1);
              }
            } else i = Ap(r, t, c, i, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const g = p.length;
              if (g)
                for (let y = 0; y < g; y += 2) {
                  const Q = t[p[y]][p[y + 1]].subscribe(i),
                    ge = d.length;
                  d.push(i, Q), l && l.push(o, r.index, ge, -(ge + 1));
                }
            }
          })(i, o, o[V], s, e, t, r),
          Zu
        );
      }
      function Tp(e, t, n, r) {
        try {
          return at(6, t, n), !1 !== n(r);
        } catch (o) {
          return ip(e, o), !1;
        } finally {
          at(7, t, n);
        }
      }
      function Ap(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          zi(e.componentOffset > -1 ? Ge(e.index, t) : t);
          let u = Tp(t, n, r, s),
            l = i.__ngNextListenerFn__;
          for (; l; ) (u = Tp(t, n, l, s) && u), (l = l.__ngNextListenerFn__);
          return o && !1 === u && (s.preventDefault(), (s.returnValue = !1)), u;
        };
      }
      function Ki(e, t) {
        return (e << 17) | (t << 2);
      }
      function cn(e) {
        return (e >> 17) & 32767;
      }
      function Xu(e) {
        return 2 | e;
      }
      function On(e) {
        return (131068 & e) >> 2;
      }
      function Ju(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function el(e) {
        return 1 | e;
      }
      function jp(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t;
        let a = r ? cn(i) : On(i),
          u = !1;
        for (; 0 !== a && (!1 === u || s); ) {
          const c = e[a + 1];
          gb(e[a], t) && ((u = !0), (e[a + 1] = r ? el(c) : Xu(c))),
            (a = r ? cn(c) : On(c));
        }
        u && (e[n + 1] = r ? Xu(i) : el(i));
      }
      function gb(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && rr(e, t) >= 0)
        );
      }
      function tl(e, t, n) {
        return (
          (function yt(e, t, n, r) {
            const o = v(),
              i = G(),
              s = (function Gt(e) {
                const t = F.lFrame,
                  n = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + e), n;
              })(2);
            i.firstUpdatePass &&
              (function Yp(e, t, n, r) {
                const o = e.data;
                if (null === o[n + 1]) {
                  const i = o[je()],
                    s = (function qp(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function Xp(e, t) {
                    return 0 != (e.flags & (t ? 8 : 16));
                  })(i, r) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function bb(e, t, n, r) {
                      const o = (function Ra(e) {
                        const t = F.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let i = r ? t.residualClasses : t.residualStyles;
                      if (null === o)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = wo((n = nl(null, e, t, n, r)), t.attrs, r)),
                          (i = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || e[s] !== o)
                          if (((n = nl(o, e, t, n, r)), null === i)) {
                            let u = (function Sb(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== On(r)) return e[cn(r)];
                            })(e, t, r);
                            void 0 !== u &&
                              Array.isArray(u) &&
                              ((u = nl(null, e, t, u[1], r)),
                              (u = wo(u, t.attrs, r)),
                              (function Ib(e, t, n, r) {
                                e[cn(n ? t.classBindings : t.styleBindings)] =
                                  r;
                              })(e, t, r, u));
                          } else
                            i = (function Mb(e, t, n) {
                              let r;
                              const o = t.directiveEnd;
                              for (
                                let i = 1 + t.directiveStylingLast;
                                i < o;
                                i++
                              )
                                r = wo(r, e[i].hostAttrs, n);
                              return wo(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (t.residualClasses = i)
                            : (t.residualStyles = i)),
                        n
                      );
                    })(o, i, t, r)),
                    (function hb(e, t, n, r, o, i) {
                      let s = i ? t.classBindings : t.styleBindings,
                        a = cn(s),
                        u = On(s);
                      e[r] = n;
                      let c,
                        l = !1;
                      if (
                        (Array.isArray(n)
                          ? ((c = n[1]),
                            (null === c || rr(n, c) > 0) && (l = !0))
                          : (c = n),
                        o)
                      )
                        if (0 !== u) {
                          const f = cn(e[a + 1]);
                          (e[r + 1] = Ki(f, a)),
                            0 !== f && (e[f + 1] = Ju(e[f + 1], r)),
                            (e[a + 1] = (function db(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[a + 1], r));
                        } else
                          (e[r + 1] = Ki(a, 0)),
                            0 !== a && (e[a + 1] = Ju(e[a + 1], r)),
                            (a = r);
                      else
                        (e[r + 1] = Ki(u, 0)),
                          0 === a ? (a = r) : (e[u + 1] = Ju(e[u + 1], r)),
                          (u = r);
                      l && (e[r + 1] = Xu(e[r + 1])),
                        jp(e, c, r, !0),
                        jp(e, c, r, !1),
                        (function pb(e, t, n, r, o) {
                          const i = o ? e.residualClasses : e.residualStyles;
                          null != i &&
                            "string" == typeof t &&
                            rr(i, t) >= 0 &&
                            (n[r + 1] = el(n[r + 1]));
                        })(t, c, e, r, i),
                        (s = Ki(a, u)),
                        i ? (t.classBindings = s) : (t.styleBindings = s);
                    })(o, i, t, n, s, r);
                }
              })(i, e, s, r),
              t !== k &&
                Ne(o, s, t) &&
                (function Zp(e, t, n, r, o, i, s, a) {
                  if (!(3 & t.type)) return;
                  const u = e.data,
                    l = u[a + 1],
                    c = (function fb(e) {
                      return 1 == (1 & e);
                    })(l)
                      ? Kp(u, t, n, o, On(l), s)
                      : void 0;
                  Xi(c) ||
                    (Xi(i) ||
                      ((function cb(e) {
                        return 2 == (2 & e);
                      })(l) &&
                        (i = Kp(u, null, n, o, a, s))),
                    (function b_(e, t, n, r, o) {
                      if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
                      else {
                        let i = -1 === r.indexOf("-") ? void 0 : We.DashCase;
                        null == o
                          ? e.removeStyle(n, r, i)
                          : ("string" == typeof o &&
                              o.endsWith("!important") &&
                              ((o = o.slice(0, -10)), (i |= We.Important)),
                            e.setStyle(n, r, o, i));
                      }
                    })(
                      r,
                      s,
                      (function gi(e, t) {
                        return Me(t[e]);
                      })(je(), n),
                      o,
                      i
                    ));
                })(
                  i,
                  i.data[je()],
                  o,
                  o[V],
                  e,
                  (o[s + 1] = (function xb(e, t) {
                    return (
                      null == e ||
                        "" === e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = te(un(e)))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, n, !1),
          tl
        );
      }
      function nl(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = wo(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function wo(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                et(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function Kp(e, t, n, r, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const u = e[o],
            l = Array.isArray(u),
            c = l ? u[1] : u,
            d = null === c;
          let f = n[o + 1];
          f === k && (f = d ? Y : void 0);
          let h = d ? za(f, r) : c === r ? f : void 0;
          if ((l && !Xi(h) && (h = za(u, r)), Xi(h) && ((a = h), s))) return a;
          const p = e[o + 1];
          o = s ? cn(p) : On(p);
        }
        if (null !== t) {
          let u = i ? t.residualClasses : t.residualStyles;
          null != u && (a = za(u, r));
        }
        return a;
      }
      function Xi(e) {
        return void 0 !== e;
      }
      function ie(e, t = "") {
        const n = v(),
          r = G(),
          o = e + oe,
          i = r.firstCreatePass ? fr(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function ru(e, t) {
            return e.createText(t);
          })(n[V], t));
        xi(r, n, s, i), At(i, !1);
      }
      const br = "en-US";
      let Cg = br;
      class Sr {}
      class qg {}
      class Yg extends Sr {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new sp(this));
          const r = Ke(t);
          (this._bootstrapComponents = Yt(r.bootstrap)),
            (this._r3Injector = jh(
              t,
              n,
              [
                { provide: Sr, useValue: this },
                { provide: po, useValue: this.componentFactoryResolver },
              ],
              te(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class cl extends qg {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Yg(this.moduleType, t);
        }
      }
      class XS extends Sr {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new sp(this)),
            (this.instance = null);
          const o = new _h(
            [
              ...t,
              { provide: Sr, useValue: this },
              { provide: po, useValue: this.componentFactoryResolver },
            ],
            n || $i(),
            r,
            new Set(["environment"])
          );
          (this.injector = o), o.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function rs(e, t, n = null) {
        return new XS(e, t, n).injector;
      }
      let JS = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = vh(0, n.type),
                o =
                  r.length > 0
                    ? rs([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, o);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = x({
            token: e,
            providedIn: "environment",
            factory: () => new e(R(qt)),
          })),
          e
        );
      })();
      function Qg(e) {
        e.getStandaloneInjector = (t) =>
          t.get(JS).getOrCreateStandaloneInjector(e);
      }
      function fl(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const Ue = class SI extends $t {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = fl(i)), o && (o = fl(o)), s && (s = fl(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof ot && t.add(a), a;
        }
      };
      function II() {
        return this._results[Symbol.iterator]();
      }
      class hl {
        get changes() {
          return this._changes || (this._changes = new Ue());
        }
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const n = hl.prototype;
          n[Symbol.iterator] || (n[Symbol.iterator] = II);
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, n) {
          return this._results.reduce(t, n);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, n) {
          const r = this;
          r.dirty = !1;
          const o = (function ut(e) {
            return e.flat(Number.POSITIVE_INFINITY);
          })(t);
          (this._changesDetected = !(function TC(e, t, n) {
            if (e.length !== t.length) return !1;
            for (let r = 0; r < e.length; r++) {
              let o = e[r],
                i = t[r];
              if ((n && ((o = n(o)), (i = n(i))), i !== o)) return !1;
            }
            return !0;
          })(r._results, o, n)) &&
            ((r._results = o),
            (r.length = o.length),
            (r.last = o[this.length - 1]),
            (r.first = o[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      let Kt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = AI), e;
      })();
      const MI = Kt,
        TI = class extends MI {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tView,
              o = Ui(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            o[Yr] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[Tt];
            return (
              null !== s && (o[Tt] = s.createEmbeddedView(r)),
              Ou(r, o, t),
              new yo(o)
            );
          }
        };
      function AI() {
        return os(Te(), v());
      }
      function os(e, t) {
        return 4 & e.type ? new TI(t, e, ur(e, t)) : null;
      }
      let Dt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = RI), e;
      })();
      function RI() {
        return lm(Te(), v());
      }
      const xI = Dt,
        am = class extends xI {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return ur(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Xn(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = ja(this._hostTNode, this._hostLView);
            if (rf(t)) {
              const n = Ci(t, this._hostLView),
                r = wi(t);
              return new Xn(n[E].data[r + 8], n);
            }
            return new Xn(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = um(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - Le;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = t.createEmbeddedView(n || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function to(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const u = s ? t : new vo(X(t)),
              l = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const f = (s ? l : this.parentInjector).get(qt, null);
              f && (i = f);
            }
            const c = u.create(l, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[E];
            if (
              (function Yw(e) {
                return pt(e[ue]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[ue],
                  f = new am(d, d[xe], d[ue]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function m_(e, t, n, r) {
              const o = Le + r,
                i = n.length;
              r > 0 && (n[o - 1][ht] = t),
                r < i - Le
                  ? ((t[ht] = n[o]), vf(n, Le + r, t))
                  : (n.push(t), (t[ht] = null)),
                (t[ue] = n);
              const s = t[Yr];
              null !== s &&
                n !== s &&
                (function y_(e, t) {
                  const n = e[Yn];
                  t[Pe] !== t[ue][ue][Pe] && (e[xd] = !0),
                    null === n ? (e[Yn] = [t]) : n.push(t);
                })(s, t);
              const a = t[Tt];
              null !== a && a.insertView(e), (t[$] |= 64);
            })(o, r, s, i);
            const a = uu(i, s),
              u = r[V],
              l = Ri(u, s[fi]);
            return (
              null !== l &&
                (function h_(e, t, n, r, o, i) {
                  (r[Ht] = o), (r[xe] = t), lo(e, r, n, 1, o, i);
                })(o, s[xe], u, r, l, a),
              t.attachToViewContainerRef(),
              vf(pl(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = um(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = iu(this._lContainer, n);
            r && (Ii(pl(this._lContainer), n), Bf(r[E], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = iu(this._lContainer, n);
            return r && null != Ii(pl(this._lContainer), n) ? new yo(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function um(e) {
        return e[hi];
      }
      function pl(e) {
        return e[hi] || (e[hi] = []);
      }
      function lm(e, t) {
        let n;
        const r = t[e.index];
        if (pt(r)) n = r;
        else {
          let o;
          if (8 & e.type) o = Me(r);
          else {
            const i = t[V];
            o = i.createComment("");
            const s = Je(e, t);
            Rn(
              i,
              Ri(i, s),
              o,
              (function C_(e, t) {
                return e.nextSibling(t);
              })(i, s),
              !1
            );
          }
          (t[e.index] = n =
            (function tp(e, t, n, r) {
              return [e, !0, !1, t, null, 0, r, n, null, null];
            })(r, t, o, e)),
            Hi(t, n);
        }
        return new am(n, e, t);
      }
      class gl {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new gl(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class ml {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const n = t.queries;
          if (null !== n) {
            const r =
                null !== t.contentQueries ? t.contentQueries[0] : n.length,
              o = [];
            for (let i = 0; i < r; i++) {
              const s = n.getByIndex(i);
              o.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new ml(o);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let n = 0; n < this.queries.length; n++)
            null !== gm(t, n).matches && this.queries[n].setDirty();
        }
      }
      class cm {
        constructor(t, n, r = null) {
          (this.predicate = t), (this.flags = n), (this.read = r);
        }
      }
      class yl {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(t, n);
        }
        elementEnd(t) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementEnd(t);
        }
        embeddedTView(t) {
          let n = null;
          for (let r = 0; r < this.length; r++) {
            const o = null !== n ? n.length : 0,
              i = this.getByIndex(r).embeddedTView(t, o);
            i &&
              ((i.indexInDeclarationView = r),
              null !== n ? n.push(i) : (n = [i]));
          }
          return null !== n ? new yl(n) : null;
        }
        template(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(t, n);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class vl {
        constructor(t, n = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = n);
        }
        elementStart(t, n) {
          this.isApplyingToNode(n) && this.matchTNode(t, n);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, n) {
          this.elementStart(t, n);
        }
        embeddedTView(t, n) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, n),
              new vl(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const n = this._declarationNodeIndex;
            let r = t.parent;
            for (; null !== r && 8 & r.type && r.index !== n; ) r = r.parent;
            return n === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, n) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let o = 0; o < r.length; o++) {
              const i = r[o];
              this.matchTNodeWithReadOption(t, n, PI(n, i)),
                this.matchTNodeWithReadOption(t, n, bi(n, t, i, !1, !1));
            }
          else
            r === Kt
              ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
              : this.matchTNodeWithReadOption(t, n, bi(n, t, r, !1, !1));
        }
        matchTNodeWithReadOption(t, n, r) {
          if (null !== r) {
            const o = this.metadata.read;
            if (null !== o)
              if (o === ln || o === Dt || (o === Kt && 4 & n.type))
                this.addMatch(n.index, -2);
              else {
                const i = bi(n, t, o, !1, !1);
                null !== i && this.addMatch(n.index, i);
              }
            else this.addMatch(n.index, r);
          }
        }
        addMatch(t, n) {
          null === this.matches
            ? (this.matches = [t, n])
            : this.matches.push(t, n);
        }
      }
      function PI(e, t) {
        const n = e.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
        return null;
      }
      function NI(e, t, n, r) {
        return -1 === n
          ? (function OI(e, t) {
              return 11 & e.type ? ur(e, t) : 4 & e.type ? os(e, t) : null;
            })(t, e)
          : -2 === n
          ? (function FI(e, t, n) {
              return n === ln
                ? ur(t, e)
                : n === Kt
                ? os(t, e)
                : n === Dt
                ? lm(t, e)
                : void 0;
            })(e, t, r)
          : Tn(e, e[E], n, t);
      }
      function dm(e, t, n, r) {
        const o = t[Tt].queries[r];
        if (null === o.matches) {
          const i = e.data,
            s = n.matches,
            a = [];
          for (let u = 0; u < s.length; u += 2) {
            const l = s[u];
            a.push(l < 0 ? null : NI(t, i[l], s[u + 1], n.metadata.read));
          }
          o.matches = a;
        }
        return o.matches;
      }
      function Dl(e, t, n, r) {
        const o = e.queries.getByIndex(n),
          i = o.matches;
        if (null !== i) {
          const s = dm(e, t, o, n);
          for (let a = 0; a < i.length; a += 2) {
            const u = i[a];
            if (u > 0) r.push(s[a / 2]);
            else {
              const l = i[a + 1],
                c = t[-u];
              for (let d = Le; d < c.length; d++) {
                const f = c[d];
                f[Yr] === f[ue] && Dl(f[E], f, l, r);
              }
              if (null !== c[Yn]) {
                const d = c[Yn];
                for (let f = 0; f < d.length; f++) {
                  const h = d[f];
                  Dl(h[E], h, l, r);
                }
              }
            }
          }
        }
        return r;
      }
      function is(e) {
        const t = v(),
          n = G(),
          r = qd();
        xa(r + 1);
        const o = gm(n, r);
        if (
          e.dirty &&
          (function qw(e) {
            return 4 == (4 & e[$]);
          })(t) ===
            (2 == (2 & o.metadata.flags))
        ) {
          if (null === o.matches) e.reset([]);
          else {
            const i = o.crossesNgTemplate ? Dl(n, t, r, []) : dm(n, t, o, r);
            e.reset(i, f0), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function wl(e, t, n) {
        const r = G();
        r.firstCreatePass &&
          (pm(r, new cm(e, t, n), -1),
          2 == (2 & t) && (r.staticViewQueries = !0)),
          hm(r, v(), t);
      }
      function ss() {
        return (function kI(e, t) {
          return e[Tt].queries[t].queryList;
        })(v(), qd());
      }
      function hm(e, t, n) {
        const r = new hl(4 == (4 & n));
        Zh(e, t, r, r.destroy),
          null === t[Tt] && (t[Tt] = new ml()),
          t[Tt].queries.push(new gl(r));
      }
      function pm(e, t, n) {
        null === e.queries && (e.queries = new yl()),
          e.queries.track(new vl(t, n));
      }
      function gm(e, t) {
        return e.queries.getByIndex(t);
      }
      function us(...e) {}
      const ls = new P("Application Initializer");
      let cs = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = us),
              (this.reject = us),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (Zi(i)) n.push(i);
                else if (Sp(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(ls, 8));
          }),
          (e.ɵprov = x({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Ao = new P("AppId", {
        providedIn: "root",
        factory: function Om() {
          return `${Il()}${Il()}${Il()}`;
        },
      });
      function Il() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Nm = new P("Platform Initializer"),
        Fm = new P("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        });
      let oM = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = x({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const Xt = new P("LocaleId", {
        providedIn: "root",
        factory: () =>
          z(Xt, A.Optional | A.SkipSelf) ||
          (function iM() {
            return (typeof $localize < "u" && $localize.locale) || br;
          })(),
      });
      class aM {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let km = (() => {
        class e {
          compileModuleSync(n) {
            return new cl(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = Yt(Ke(n).declarations).reduce((s, a) => {
                const u = X(a);
                return u && s.push(new vo(u)), s;
              }, []);
            return new aM(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = x({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const cM = (() => Promise.resolve(0))();
      function Ml(e) {
        typeof Zone > "u"
          ? cM.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class fe {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Ue(!1)),
            (this.onMicrotaskEmpty = new Ue(!1)),
            (this.onStable = new Ue(!1)),
            (this.onError = new Ue(!1)),
            typeof Zone > "u")
          )
            throw new w(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function dM() {
              let e = re.requestAnimationFrame,
                t = re.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function pM(e) {
              const t = () => {
                !(function hM(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(re, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Al(e),
                                (e.isCheckStableRunning = !0),
                                Tl(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Al(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return jm(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      Vm(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return jm(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), Vm(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Al(e),
                          Tl(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!fe.isInAngularZone()) throw new w(909, !1);
        }
        static assertNotInAngularZone() {
          if (fe.isInAngularZone()) throw new w(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, fM, us, us);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const fM = {};
      function Tl(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Al(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function jm(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Vm(e) {
        e._nesting--, Tl(e);
      }
      class gM {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Ue()),
            (this.onMicrotaskEmpty = new Ue()),
            (this.onStable = new Ue()),
            (this.onError = new Ue());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const Um = new P(""),
        ds = new P("");
      let Pl,
        Rl = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Pl ||
                  ((function mM(e) {
                    Pl = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      fe.assertNotInAngularZone(),
                        Ml(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Ml(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(fe), R(xl), R(ds));
            }),
            (e.ɵprov = x({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        xl = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Pl?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = x({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })();
      const Jt = !1;
      let dn = null;
      const Bm = new P("AllowMultipleToken"),
        Ol = new P("PlatformDestroyListeners"),
        Hm = new P("appBootstrapListener");
      class zm {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function Wm(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new P(r);
        return (i = []) => {
          let s = Nl();
          if (!s || s.injector.get(Bm, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function DM(e) {
                  if (dn && !dn.get(Bm, !1)) throw new w(400, !1);
                  dn = e;
                  const t = e.get(Ym);
                  (function Gm(e) {
                    const t = e.get(Nm, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function qm(e = [], t) {
                    return Qt.create({
                      name: t,
                      providers: [
                        { provide: Cu, useValue: "platform" },
                        { provide: Ol, useValue: new Set([() => (dn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function CM(e) {
            const t = Nl();
            if (!t) throw new w(401, !1);
            return t;
          })();
        };
      }
      function Nl() {
        return dn?.get(Ym) ?? null;
      }
      let Ym = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function Zm(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new gM()
                      : ("zone.js" === e ? void 0 : e) || new fe(t)),
                  n
                );
              })(
                r?.ngZone,
                (function Qm(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: fe, useValue: o }];
            return o.run(() => {
              const s = Qt.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(s),
                u = a.injector.get(lr, null);
              if (!u) throw new w(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const l = o.onError.subscribe({
                    next: (c) => {
                      u.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    hs(this._modules, a), l.unsubscribe();
                  });
                }),
                (function Km(e, t, n) {
                  try {
                    const r = n();
                    return Zi(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(u, o, () => {
                  const l = a.injector.get(cs);
                  return (
                    l.runInitializers(),
                    l.donePromise.then(
                      () => (
                        (function _g(e) {
                          it(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Cg = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(Xt, br) || br),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = Xm({}, r);
            return (function yM(e, t, n) {
              const r = new cl(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(fs);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new w(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new w(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(Ol, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(Qt));
          }),
          (e.ɵprov = x({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function Xm(e, t) {
        return Array.isArray(t) ? t.reduce(Xm, e) : { ...e, ...t };
      }
      let fs = (() => {
        class e {
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          constructor(n, r, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new De((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new De((a) => {
                let u;
                this._zone.runOutsideAngular(() => {
                  u = this._zone.onStable.subscribe(() => {
                    fe.assertNotInAngularZone(),
                      Ml(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const l = this._zone.onUnstable.subscribe(() => {
                  fe.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  u.unsubscribe(), l.unsubscribe();
                };
              });
            this.isStable = (function hw(...e) {
              const t = Br(e),
                n = (function sw(e, t) {
                  return "number" == typeof la(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? bt(r[0])
                  : Bn(n)(we(r, t))
                : St;
            })(
              i,
              s.pipe(
                (function pw(e = {}) {
                  const {
                    connector: t = () => new $t(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s,
                      a,
                      u,
                      l = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      h = () => {
                        f(), (s = u = void 0), (c = d = !1);
                      },
                      p = () => {
                        const g = s;
                        h(), g?.unsubscribe();
                      };
                    return be((g, y) => {
                      l++, !d && !c && f();
                      const D = (u = u ?? t());
                      y.add(() => {
                        l--, 0 === l && !d && !c && (a = ca(p, o));
                      }),
                        D.subscribe(y),
                        !s &&
                          l > 0 &&
                          ((s = new Ur({
                            next: (_) => D.next(_),
                            error: (_) => {
                              (d = !0), f(), (a = ca(h, n, _)), D.error(_);
                            },
                            complete: () => {
                              (c = !0), f(), (a = ca(h, r)), D.complete();
                            },
                          })),
                          bt(g).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          bootstrap(n, r) {
            const o = n instanceof bh;
            if (!this._injector.get(cs).done) {
              !o &&
                (function zn(e) {
                  const t = X(e) || Re(e) || ze(e);
                  return null !== t && t.standalone;
                })(n);
              throw new w(405, Jt);
            }
            let s;
            (s = o ? n : this._injector.get(po).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function vM(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Sr),
              l = s.create(Qt.NULL, [], r || s.selector, a),
              c = l.location.nativeElement,
              d = l.injector.get(Um, null);
            return (
              d?.registerApplication(c),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  hs(this.components, l),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new w(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            hs(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(Hm, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => hs(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new w(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(fe), R(qt), R(lr));
          }),
          (e.ɵprov = x({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function hs(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let Fl = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = EM), e;
      })();
      function EM(e) {
        return (function bM(e, t, n) {
          if (Zr(e) && !n) {
            const r = Ge(e.index, t);
            return new yo(r, r);
          }
          return 47 & e.type ? new yo(t[Pe], t) : null;
        })(Te(), v(), 16 == (16 & e));
      }
      const LM = Wm(null, "core", []);
      let $M = (() => {
        class e {
          constructor(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(fs));
          }),
          (e.ɵmod = En({ type: e })),
          (e.ɵinj = sn({})),
          e
        );
      })();
      function Vl(e) {
        return "boolean" == typeof e ? e : null != e && "false" !== e;
      }
      let Ul = null;
      function kn() {
        return Ul;
      }
      class UM {}
      const Ye = new P("DocumentToken");
      let Bl = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = x({
            token: e,
            factory: function () {
              return (function BM() {
                return R(ly);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const HM = new P("Location Initialized");
      let ly = (() => {
        class e extends Bl {
          constructor(n) {
            super(),
              (this._doc = n),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return kn().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = kn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = kn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, r, o) {
            cy() ? this._history.pushState(n, r, o) : (this._location.hash = o);
          }
          replaceState(n, r, o) {
            cy()
              ? this._history.replaceState(n, r, o)
              : (this._location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(Ye));
          }),
          (e.ɵprov = x({
            token: e,
            factory: function () {
              return (function zM() {
                return new ly(R(Ye));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function cy() {
        return !!window.history.pushState;
      }
      function Hl(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function dy(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function en(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Ln = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = x({
            token: e,
            factory: function () {
              return z(hy);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const fy = new P("appBaseHref");
      let hy = (() => {
          class e extends Ln {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  z(Ye).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Hl(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  en(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + en(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + en(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(Bl), R(fy, 8));
            }),
            (e.ɵprov = x({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        GM = (() => {
          class e extends Ln {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = Hl(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + en(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + en(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(Bl), R(fy, 8));
            }),
            (e.ɵprov = x({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        zl = (() => {
          class e {
            constructor(n) {
              (this._subject = new Ue()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function YM(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(dy(py(r)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + en(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function qM(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const n = t.substring(e.length);
                  return "" === n || ["/", ";", "?", "#"].includes(n[0])
                    ? n
                    : t;
                })(this._basePath, py(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._locationStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + en(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + en(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = en),
            (e.joinWithSlash = Hl),
            (e.stripTrailingSlash = dy),
            (e.ɵfac = function (n) {
              return new (n || e)(R(Ln));
            }),
            (e.ɵprov = x({
              token: e,
              factory: function () {
                return (function WM() {
                  return new zl(R(Ln));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function py(e) {
        return e.replace(/\/index.html$/, "");
      }
      let lA = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = En({ type: e })),
          (e.ɵinj = sn({})),
          e
        );
      })();
      let hA = (() => {
        class e {}
        return (
          (e.ɵprov = x({
            token: e,
            providedIn: "root",
            factory: () => new pA(R(Ye), window),
          })),
          e
        );
      })();
      class pA {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function gA(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              xy(this.window.history) ||
              xy(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function xy(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class HA extends UM {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class ac extends HA {
        static makeCurrent() {
          !(function VM(e) {
            Ul || (Ul = e);
          })(new ac());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function zA() {
            return (
              (No = No || document.querySelector("base")),
              No ? No.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function GA(e) {
                (Ts = Ts || document.createElement("a")),
                  Ts.setAttribute("href", e);
                const t = Ts.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          No = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function xT(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let Ts,
        No = null;
      const ky = new P("TRANSITION_ID"),
        qA = [
          {
            provide: ls,
            useFactory: function WA(e, t, n) {
              return () => {
                n.get(cs).donePromise.then(() => {
                  const r = kn(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [ky, Ye, Qt],
            multi: !0,
          },
        ];
      let QA = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = x({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const As = new P("EventManagerPlugins");
      let Rs = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(As), R(fe));
          }),
          (e.ɵprov = x({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Ly {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = kn().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let $y = (() => {
          class e {
            constructor() {
              this.usageCount = new Map();
            }
            addStyles(n) {
              for (const r of n)
                1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
            }
            removeStyles(n) {
              for (const r of n)
                0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r);
            }
            onStyleRemoved(n) {}
            onStyleAdded(n) {}
            getAllStyles() {
              return this.usageCount.keys();
            }
            changeUsageCount(n, r) {
              const o = this.usageCount;
              let i = o.get(n) ?? 0;
              return (i += r), i > 0 ? o.set(n, i) : o.delete(n), i;
            }
            ngOnDestroy() {
              for (const n of this.getAllStyles()) this.onStyleRemoved(n);
              this.usageCount.clear();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = x({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Fo = (() => {
          class e extends $y {
            constructor(n) {
              super(),
                (this.doc = n),
                (this.styleRef = new Map()),
                (this.hostNodes = new Set()),
                this.resetHostNodes();
            }
            onStyleAdded(n) {
              for (const r of this.hostNodes) this.addStyleToHost(r, n);
            }
            onStyleRemoved(n) {
              const r = this.styleRef;
              r.get(n)?.forEach((i) => i.remove()), r.delete(n);
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this.styleRef.clear(), this.resetHostNodes();
            }
            addHost(n) {
              this.hostNodes.add(n);
              for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
            }
            removeHost(n) {
              this.hostNodes.delete(n);
            }
            addStyleToHost(n, r) {
              const o = this.doc.createElement("style");
              (o.textContent = r), n.appendChild(o);
              const i = this.styleRef.get(r);
              i ? i.push(o) : this.styleRef.set(r, [o]);
            }
            resetHostNodes() {
              const n = this.hostNodes;
              n.clear(), n.add(this.doc.head);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(Ye));
            }),
            (e.ɵprov = x({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const uc = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        lc = /%COMP%/g,
        Uy = new P("RemoveStylesOnCompDestory", {
          providedIn: "root",
          factory: () => !1,
        });
      function By(e, t) {
        return t.flat(100).map((n) => n.replace(lc, e));
      }
      function Hy(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let cc = (() => {
        class e {
          constructor(n, r, o, i) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestory = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new dc(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            const o = this.getOrCreateRenderer(n, r);
            return (
              o instanceof Wy
                ? o.applyToHost(n)
                : o instanceof fc && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.eventManager,
                a = this.sharedStylesHost,
                u = this.removeStylesOnCompDestory;
              switch (r.encapsulation) {
                case Mt.Emulated:
                  i = new Wy(s, a, r, this.appId, u);
                  break;
                case Mt.ShadowDom:
                  return new nR(s, a, n, r);
                default:
                  i = new fc(s, a, r, u);
              }
              (i.onDestroy = () => o.delete(r.id)), o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(Rs), R(Fo), R(Ao), R(Uy));
          }),
          (e.ɵprov = x({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class dc {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(uc[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (Gy(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (Gy(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = uc[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = uc[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (We.DashCase | We.Important)
            ? t.style.setProperty(n, r, o & We.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & We.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, Hy(r))
            : this.eventManager.addEventListener(t, n, Hy(r));
        }
      }
      function Gy(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class nR extends dc {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = By(o.id, o.styles);
          for (const s of i) {
            const a = document.createElement("style");
            (a.textContent = s), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class fc extends dc {
        constructor(t, n, r, o, i = r.id) {
          super(t),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestory = o),
            (this.rendererUsageCount = 0),
            (this.styles = By(i, r.styles));
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles),
            this.rendererUsageCount++;
        }
        destroy() {
          this.removeStylesOnCompDestory &&
            (this.sharedStylesHost.removeStyles(this.styles),
            this.rendererUsageCount--,
            0 === this.rendererUsageCount && this.onDestroy?.());
        }
      }
      class Wy extends fc {
        constructor(t, n, r, o, i) {
          const s = o + "-" + r.id;
          super(t, n, r, i, s),
            (this.contentAttr = (function JA(e) {
              return "_ngcontent-%COMP%".replace(lc, e);
            })(s)),
            (this.hostAttr = (function eR(e) {
              return "_nghost-%COMP%".replace(lc, e);
            })(s));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let rR = (() => {
        class e extends Ly {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(Ye));
          }),
          (e.ɵprov = x({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const qy = ["alt", "control", "meta", "shift"],
        oR = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        iR = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let sR = (() => {
        class e extends Ly {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => kn().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              qy.forEach((l) => {
                const c = r.indexOf(l);
                c > -1 && (r.splice(c, 1), (s += l + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const u = {};
            return (u.domEventName = o), (u.fullKey = s), u;
          }
          static matchEventFullKeyCode(n, r) {
            let o = oR[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                qy.forEach((s) => {
                  s !== o && (0, iR[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(Ye));
          }),
          (e.ɵprov = x({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const cR = Wm(LM, "browser", [
          { provide: Fm, useValue: "browser" },
          {
            provide: Nm,
            useValue: function aR() {
              ac.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: Ye,
            useFactory: function lR() {
              return (
                (function A_(e) {
                  fu = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        Zy = new P(""),
        Ky = [
          {
            provide: ds,
            useClass: class YA {
              addToWindow(t) {
                (re.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (re.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (re.getAllAngularRootElements = () => t.getAllRootElements()),
                  re.frameworkStabilizers || (re.frameworkStabilizers = []),
                  re.frameworkStabilizers.push((r) => {
                    const o = re.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach(function (u) {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? kn().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: Um, useClass: Rl, deps: [fe, xl, ds] },
          { provide: Rl, useClass: Rl, deps: [fe, xl, ds] },
        ],
        Xy = [
          { provide: Cu, useValue: "root" },
          {
            provide: lr,
            useFactory: function uR() {
              return new lr();
            },
            deps: [],
          },
          { provide: As, useClass: rR, multi: !0, deps: [Ye, fe, Fm] },
          { provide: As, useClass: sR, multi: !0, deps: [Ye] },
          { provide: cc, useClass: cc, deps: [Rs, Fo, Ao, Uy] },
          { provide: Ih, useExisting: cc },
          { provide: $y, useExisting: Fo },
          { provide: Fo, useClass: Fo, deps: [Ye] },
          { provide: Rs, useClass: Rs, deps: [As, fe] },
          { provide: class mA {}, useClass: QA, deps: [] },
          [],
        ];
      let dR = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: Ao, useValue: n.appId },
                  { provide: ky, useExisting: Ao },
                  qA,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(Zy, 12));
            }),
            (e.ɵmod = En({ type: e })),
            (e.ɵinj = sn({ providers: [...Xy, ...Ky], imports: [lA, $M] })),
            e
          );
        })(),
        Jy = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(Ye));
            }),
            (e.ɵprov = x({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function hR() {
                        return new Jy(R(Ye));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function M(...e) {
        return we(e, Br(e));
      }
      typeof window < "u" && window;
      class Et extends $t {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const xs = jr(
          (e) =>
            function () {
              e(this),
                (this.name = "EmptyError"),
                (this.message = "no elements in sequence");
            }
        ),
        { isArray: DR } = Array,
        { getPrototypeOf: wR, prototype: CR, keys: _R } = Object;
      const { isArray: SR } = Array;
      function nv(...e) {
        const t = Br(e),
          n = (function iw(e) {
            return ee(la(e)) ? e.pop() : void 0;
          })(e),
          { args: r, keys: o } = (function ER(e) {
            if (1 === e.length) {
              const t = e[0];
              if (DR(t)) return { args: t, keys: null };
              if (
                (function bR(e) {
                  return e && "object" == typeof e && wR(e) === CR;
                })(t)
              ) {
                const n = _R(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e);
        if (0 === r.length) return we([], t);
        const i = new De(
          (function AR(e, t, n = Cn) {
            return (r) => {
              rv(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let u = 0; u < o; u++)
                    rv(
                      t,
                      () => {
                        const l = we(e[u], t);
                        let c = !1;
                        l.subscribe(
                          Se(
                            r,
                            (d) => {
                              (i[u] = d),
                                c || ((c = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(
            r,
            t,
            o
              ? (s) =>
                  (function TR(e, t) {
                    return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
                  })(o, s)
              : Cn
          )
        );
        return n
          ? i.pipe(
              (function MR(e) {
                return H((t) =>
                  (function IR(e, t) {
                    return SR(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(n)
            )
          : i;
      }
      function rv(e, t, n) {
        e ? jt(n, e, t) : t();
      }
      function gc(...e) {
        return (function RR() {
          return Bn(1);
        })()(we(e, Br(e)));
      }
      function ov(e) {
        return new De((t) => {
          bt(e()).subscribe(t);
        });
      }
      function ko(e, t) {
        const n = ee(e) ? e : () => e,
          r = (o) => o.error(n());
        return new De(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function mc() {
        return be((e, t) => {
          let n = null;
          e._refCount++;
          const r = Se(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class iv extends De {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            ed(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new ot();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                Se(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = ot.EMPTY));
          }
          return t;
        }
        refCount() {
          return mc()(this);
        }
      }
      function Ft(e, t) {
        return be((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            Se(
              r,
              (u) => {
                o?.unsubscribe();
                let l = 0;
                const c = i++;
                bt(e(u, c)).subscribe(
                  (o = Se(
                    r,
                    (d) => r.next(t ? t(u, d, c, l++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Tr(e) {
        return e <= 0
          ? () => St
          : be((t, n) => {
              let r = 0;
              t.subscribe(
                Se(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function hn(e, t) {
        return be((n, r) => {
          let o = 0;
          n.subscribe(Se(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function Ps(e) {
        return be((t, n) => {
          let r = !1;
          t.subscribe(
            Se(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function sv(e = PR) {
        return be((t, n) => {
          let r = !1;
          t.subscribe(
            Se(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function PR() {
        return new xs();
      }
      function pn(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? hn((o, i) => e(o, i, r)) : Cn,
            Tr(1),
            n ? Ps(t) : sv(() => new xs())
          );
      }
      function $n(e, t) {
        return ee(t) ? Ie(e, t, 1) : Ie(e, 1);
      }
      function Fe(e, t, n) {
        const r = ee(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? be((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                Se(
                  i,
                  (u) => {
                    var l;
                    null === (l = r.next) || void 0 === l || l.call(r, u),
                      i.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      i.complete();
                  },
                  (u) => {
                    var l;
                    (a = !1),
                      null === (l = r.error) || void 0 === l || l.call(r, u),
                      i.error(u);
                  },
                  () => {
                    var u, l;
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (l = r.finalize) || void 0 === l || l.call(r);
                  }
                )
              );
            })
          : Cn;
      }
      function gn(e) {
        return be((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            Se(n, void 0, void 0, (s) => {
              (i = bt(e(s, gn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function av(e, t) {
        return be(
          (function OR(e, t, n, r, o) {
            return (i, s) => {
              let a = n,
                u = t,
                l = 0;
              i.subscribe(
                Se(
                  s,
                  (c) => {
                    const d = l++;
                    (u = a ? e(u, c, d) : ((a = !0), c)), r && s.next(u);
                  },
                  o &&
                    (() => {
                      a && s.next(u), s.complete();
                    })
                )
              );
            };
          })(e, t, arguments.length >= 2, !0)
        );
      }
      function yc(e) {
        return e <= 0
          ? () => St
          : be((t, n) => {
              let r = [];
              t.subscribe(
                Se(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function uv(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? hn((o, i) => e(o, i, r)) : Cn,
            yc(1),
            n ? Ps(t) : sv(() => new xs())
          );
      }
      function vc(e) {
        return be((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const L = "primary",
        Lo = Symbol("RouteTitle");
      class kR {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Ar(e) {
        return new kR(e);
      }
      function LR(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function kt(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !lv(e[o], t[o]))) return !1;
        return !0;
      }
      function lv(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function cv(e) {
        return Array.prototype.concat.apply([], e);
      }
      function dv(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Ae(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function mn(e) {
        return Sp(e) ? e : Zi(e) ? we(Promise.resolve(e)) : M(e);
      }
      const Os = !1,
        jR = {
          exact: function pv(e, t, n) {
            if (
              !jn(e.segments, t.segments) ||
              !Ns(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !pv(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: gv,
        },
        fv = {
          exact: function VR(e, t) {
            return kt(e, t);
          },
          subset: function UR(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => lv(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function hv(e, t, n) {
        return (
          jR[n.paths](e.root, t.root, n.matrixParams) &&
          fv[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function gv(e, t, n) {
        return mv(e, t, t.segments, n);
      }
      function mv(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!jn(o, n) || t.hasChildren() || !Ns(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!jn(e.segments, n) || !Ns(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !gv(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(jn(e.segments, o) && Ns(e.segments, o, r) && e.children[L]) &&
            mv(e.children[L], t, i, r)
          );
        }
      }
      function Ns(e, t, n) {
        return t.every((r, o) => fv[n](e[o].parameters, r.parameters));
      }
      class yn {
        constructor(t = new U([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Ar(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return zR.serialize(this);
        }
      }
      class U {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Ae(n, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Fs(this);
        }
      }
      class $o {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Ar(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return Dv(this);
        }
      }
      function jn(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let jo = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = x({
            token: e,
            factory: function () {
              return new Dc();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class Dc {
        parse(t) {
          const n = new JR(t);
          return new yn(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${Vo(t.root, !0)}`,
            r = (function qR(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${ks(n)}=${ks(o)}`).join("&")
                    : `${ks(n)}=${ks(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function GR(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const zR = new Dc();
      function Fs(e) {
        return e.segments.map((t) => Dv(t)).join("/");
      }
      function Vo(e, t) {
        if (!e.hasChildren()) return Fs(e);
        if (t) {
          const n = e.children[L] ? Vo(e.children[L], !1) : "",
            r = [];
          return (
            Ae(e.children, (o, i) => {
              i !== L && r.push(`${i}:${Vo(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function HR(e, t) {
            let n = [];
            return (
              Ae(e.children, (r, o) => {
                o === L && (n = n.concat(t(r, o)));
              }),
              Ae(e.children, (r, o) => {
                o !== L && (n = n.concat(t(r, o)));
              }),
              n
            );
          })(e, (r, o) =>
            o === L ? [Vo(e.children[L], !1)] : [`${o}:${Vo(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[L]
            ? `${Fs(e)}/${n[0]}`
            : `${Fs(e)}/(${n.join("//")})`;
        }
      }
      function yv(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function ks(e) {
        return yv(e).replace(/%3B/gi, ";");
      }
      function wc(e) {
        return yv(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Ls(e) {
        return decodeURIComponent(e);
      }
      function vv(e) {
        return Ls(e.replace(/\+/g, "%20"));
      }
      function Dv(e) {
        return `${wc(e.path)}${(function WR(e) {
          return Object.keys(e)
            .map((t) => `;${wc(t)}=${wc(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const YR = /^[^\/()?;=#]+/;
      function $s(e) {
        const t = e.match(YR);
        return t ? t[0] : "";
      }
      const QR = /^[^=?&#]+/,
        KR = /^[^&#]+/;
      class JR {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new U([], {})
              : new U([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[L] = new U(t, n)),
            r
          );
        }
        parseSegment() {
          const t = $s(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new w(4009, Os);
          return this.capture(t), new $o(Ls(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = $s(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = $s(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[Ls(n)] = Ls(r);
        }
        parseQueryParam(t) {
          const n = (function ZR(e) {
            const t = e.match(QR);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function XR(e) {
              const t = e.match(KR);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = vv(n),
            i = vv(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = $s(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new w(4010, Os);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = L);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[L] : new U([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new w(4011, Os);
        }
      }
      function Cc(e) {
        return e.segments.length > 0 ? new U([], { [L]: e }) : e;
      }
      function js(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = js(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function ex(e) {
          if (1 === e.numberOfChildren && e.children[L]) {
            const t = e.children[L];
            return new U(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new U(e.segments, t));
      }
      function Vn(e) {
        return e instanceof yn;
      }
      const _c = !1;
      function tx(e, t, n, r, o) {
        if (0 === n.length) return Rr(t.root, t.root, t.root, r, o);
        const i = (function bv(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new Ev(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Ae(i.outlets, (u, l) => {
                    a[l] = "string" == typeof u ? u.split("/") : u;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, u) => {
                  (0 == u && "." === a) ||
                    (0 == u && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new Ev(n, t, r);
        })(n);
        return i.toRoot()
          ? Rr(t.root, t.root, new U([], {}), r, o)
          : (function s(u) {
              const l = (function rx(e, t, n, r) {
                  if (e.isAbsolute) return new xr(t.root, !0, 0);
                  if (-1 === r) return new xr(n, n === t.root, 0);
                  return (function Sv(e, t, n) {
                    let r = e,
                      o = t,
                      i = n;
                    for (; i > o; ) {
                      if (((i -= o), (r = r.parent), !r))
                        throw new w(4005, _c && "Invalid number of '../'");
                      o = r.segments.length;
                    }
                    return new xr(r, !1, o - i);
                  })(n, r + (Uo(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(i, t, e.snapshot?._urlSegment, u),
                c = l.processChildren
                  ? Pr(l.segmentGroup, l.index, i.commands)
                  : Ec(l.segmentGroup, l.index, i.commands);
              return Rr(t.root, l.segmentGroup, c, r, o);
            })(e.snapshot?._lastPathIndex);
      }
      function Uo(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Bo(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Rr(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          Ae(r, (u, l) => {
            i[l] = Array.isArray(u) ? u.map((c) => `${c}`) : `${u}`;
          }),
          (s = e === t ? n : _v(e, t, n));
        const a = Cc(js(s));
        return new yn(a, i, o);
      }
      function _v(e, t, n) {
        const r = {};
        return (
          Ae(e.children, (o, i) => {
            r[i] = o === t ? n : _v(o, t, n);
          }),
          new U(e.segments, r)
        );
      }
      class Ev {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Uo(r[0]))
          )
            throw new w(
              4003,
              _c && "Root segment cannot have matrix parameters"
            );
          const o = r.find(Bo);
          if (o && o !== dv(r))
            throw new w(4004, _c && "{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class xr {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function Ec(e, t, n) {
        if (
          (e || (e = new U([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return Pr(e, t, n);
        const r = (function ix(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (Bo(a)) break;
              const u = `${a}`,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === u) break;
              if (u && l && "object" == typeof l && void 0 === l.outlets) {
                if (!Mv(u, l, s)) return i;
                r += 2;
              } else {
                if (!Mv(u, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new U(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[L] = new U(e.segments.slice(r.pathIndex), e.children)),
            Pr(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new U(e.segments, {})
          : r.match && !e.hasChildren()
          ? bc(e, t, n)
          : r.match
          ? Pr(e, 0, o)
          : bc(e, t, n);
      }
      function Pr(e, t, n) {
        if (0 === n.length) return new U(e.segments, {});
        {
          const r = (function ox(e) {
              return Bo(e[0]) ? e[0].outlets : { [L]: e };
            })(n),
            o = {};
          if (
            !r[L] &&
            e.children[L] &&
            1 === e.numberOfChildren &&
            0 === e.children[L].segments.length
          ) {
            const i = Pr(e.children[L], t, n);
            return new U(e.segments, i.children);
          }
          return (
            Ae(r, (i, s) => {
              "string" == typeof i && (i = [i]),
                null !== i && (o[s] = Ec(e.children[s], t, i));
            }),
            Ae(e.children, (i, s) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new U(e.segments, o)
          );
        }
      }
      function bc(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (Bo(i)) {
            const u = sx(i.outlets);
            return new U(r, u);
          }
          if (0 === o && Uo(n[0])) {
            r.push(new $o(e.segments[t].path, Iv(n[0]))), o++;
            continue;
          }
          const s = Bo(i) ? i.outlets[L] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && Uo(a)
            ? (r.push(new $o(s, Iv(a))), (o += 2))
            : (r.push(new $o(s, {})), o++);
        }
        return new U(r, {});
      }
      function sx(e) {
        const t = {};
        return (
          Ae(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = bc(new U([], {}), 0, n));
          }),
          t
        );
      }
      function Iv(e) {
        const t = {};
        return Ae(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function Mv(e, t, n) {
        return e == n.path && kt(t, n.parameters);
      }
      const Ho = "imperative";
      class Lt {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class Sc extends Lt {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Un extends Lt {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Vs extends Lt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Us extends Lt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class Ic extends Lt {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class ax extends Lt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class ux extends Lt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class lx extends Lt {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class cx extends Lt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class dx extends Lt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class fx {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class hx {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class px {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class gx {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class mx {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class yx {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Tv {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let wx = (() => {
          class e {
            createUrlTree(n, r, o, i, s, a) {
              return tx(n || r.root, o, i, s, a);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = x({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        _x = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = x({
              token: e,
              factory: function (t) {
                return wx.ɵfac(t);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class Av {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = Mc(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = Mc(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = Tc(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return Tc(t, this._root).map((n) => n.value);
        }
      }
      function Mc(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = Mc(e, n);
          if (r) return r;
        }
        return null;
      }
      function Tc(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = Tc(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class nn {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Or(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class Rv extends Av {
        constructor(t, n) {
          super(t), (this.snapshot = n), Ac(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function xv(e, t) {
        const n = (function Ex(e, t) {
            const s = new Bs([], {}, {}, "", {}, L, t, null, e.root, -1, {});
            return new Ov("", new nn(s, []));
          })(e, t),
          r = new Et([new $o("", {})]),
          o = new Et({}),
          i = new Et({}),
          s = new Et({}),
          a = new Et(""),
          u = new Nr(r, o, s, a, i, L, t, n.root);
        return (u.snapshot = n.root), new Rv(new nn(u, []), n);
      }
      class Nr {
        constructor(t, n, r, o, i, s, a, u) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(H((l) => l[Lo])) ?? M(void 0)),
            (this._futureSnapshot = u);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(H((t) => Ar(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(H((t) => Ar(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Pv(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function bx(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Bs {
        get title() {
          return this.data?.[Lo];
        }
        constructor(t, n, r, o, i, s, a, u, l, c, d) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = u),
            (this._urlSegment = l),
            (this._lastPathIndex = c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Ar(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Ar(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class Ov extends Av {
        constructor(t, n) {
          super(n), (this.url = t), Ac(this, n);
        }
        toString() {
          return Nv(this._root);
        }
      }
      function Ac(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => Ac(e, n));
      }
      function Nv(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(Nv).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Rc(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            kt(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            kt(t.params, n.params) || e.params.next(n.params),
            (function $R(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!kt(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            kt(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function xc(e, t) {
        const n =
          kt(e.params, t.params) &&
          (function BR(e, t) {
            return (
              jn(e, t) && e.every((n, r) => kt(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || xc(e.parent, t.parent))
        );
      }
      function zo(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function Ix(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return zo(e, r, o);
              return zo(e, r);
            });
          })(e, t, n);
          return new nn(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => zo(e, a))),
                s
              );
            }
          }
          const r = (function Mx(e) {
              return new Nr(
                new Et(e.url),
                new Et(e.params),
                new Et(e.queryParams),
                new Et(e.fragment),
                new Et(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => zo(e, i));
          return new nn(r, o);
        }
      }
      const Pc = "ngNavigationCancelingError";
      function Fv(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = Vn(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = kv(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function kv(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[Pc] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function Lv(e) {
        return $v(e) && Vn(e.url);
      }
      function $v(e) {
        return e && e[Pc];
      }
      class Tx {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new Go()),
            (this.attachRef = null);
        }
      }
      let Go = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const o = this.getOrCreateContext(n);
            (o.outlet = r), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new Tx()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = x({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Hs = !1;
      let Oc = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = L),
              (this.activateEvents = new Ue()),
              (this.deactivateEvents = new Ue()),
              (this.attachEvents = new Ue()),
              (this.detachEvents = new Ue()),
              (this.parentContexts = z(Go)),
              (this.location = z(Dt)),
              (this.changeDetector = z(Fl)),
              (this.environmentInjector = z(qt));
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: r, previousValue: o } = n.name;
              if (r) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new w(4012, Hs);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new w(4012, Hs);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new w(4012, Hs);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new w(4013, Hs);
            this._activatedRoute = n;
            const o = this.location,
              s = n.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              u = new Ax(n, a, o.injector);
            if (
              r &&
              (function Rx(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const l = r.resolveComponentFactory(s);
              this.activated = o.createComponent(l, o.length, u);
            } else
              this.activated = o.createComponent(s, {
                index: o.length,
                injector: u,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵdir = ke({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [In],
          })),
          e
        );
      })();
      class Ax {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === Nr
            ? this.route
            : t === Go
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let Nc = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = _n({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [Qg],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && de(0, "router-outlet");
            },
            dependencies: [Oc],
            encapsulation: 2,
          })),
          e
        );
      })();
      function jv(e, t) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = rs(e.providers, t, `Route: ${e.path}`)),
          e._injector ?? t
        );
      }
      function kc(e) {
        const t = e.children && e.children.map(kc),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== L &&
            (n.component = Nc),
          n
        );
      }
      function ft(e) {
        return e.outlet || L;
      }
      function Vv(e, t) {
        const n = e.filter((r) => ft(r) === t);
        return n.push(...e.filter((r) => ft(r) !== t)), n;
      }
      function Wo(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class Fx {
        constructor(t, n, r, o) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Rc(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = Or(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Ae(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Or(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Or(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = Or(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new yx(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new gx(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((Rc(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Rc(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = Wo(o.snapshot),
                u = a?.get(po) ?? null;
              (s.attachRef = null),
                (s.route = o),
                (s.resolver = u),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class Uv {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class zs {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function kx(e, t, n) {
        const r = e._root;
        return qo(r, t ? t._root : null, n, [r.value]);
      }
      function Fr(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function Cw(e) {
              return null !== oi(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function qo(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = Or(t);
        return (
          e.children.forEach((s) => {
            (function $x(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const u = (function jx(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !jn(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !jn(e.url, t.url) || !kt(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !xc(e, t) || !kt(e.queryParams, t.queryParams);
                    default:
                      return !xc(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new Uv(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  qo(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new zs(a.outlet.component, s));
              } else
                s && Yo(t, a, o),
                  o.canActivateChecks.push(new Uv(r)),
                  qo(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Ae(i, (s, a) => Yo(s, n.getContext(a), o)),
          o
        );
      }
      function Yo(e, t, n) {
        const r = Or(e),
          o = e.value;
        Ae(r, (i, s) => {
          Yo(i, o.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new zs(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function Qo(e) {
        return "function" == typeof e;
      }
      function Lc(e) {
        return e instanceof xs || "EmptyError" === e?.name;
      }
      const Gs = Symbol("INITIAL_VALUE");
      function kr() {
        return Ft((e) =>
          nv(
            e.map((t) =>
              t.pipe(
                Tr(1),
                (function xR(...e) {
                  const t = Br(e);
                  return be((n, r) => {
                    (t ? gc(e, n, t) : gc(e, n)).subscribe(r);
                  });
                })(Gs)
              )
            )
          ).pipe(
            H((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === Gs) return Gs;
                  if (!1 === n || n instanceof yn) return n;
                }
              return !0;
            }),
            hn((t) => t !== Gs),
            Tr(1)
          )
        );
      }
      function Bv(e) {
        return (function ED(...e) {
          return Kc(e);
        })(
          Fe((t) => {
            if (Vn(t)) throw Fv(0, t);
          }),
          H((t) => !0 === t)
        );
      }
      const $c = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function Hv(e, t, n, r, o) {
        const i = jc(e, t, n);
        return i.matched
          ? (function n1(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? M(
                    o.map((s) => {
                      const a = Fr(s, e);
                      return mn(
                        (function Gx(e) {
                          return e && Qo(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(kr(), Bv())
                : M(!0);
            })((r = jv(t, r)), t, n).pipe(H((s) => (!0 === s ? i : { ...$c })))
          : M(i);
      }
      function jc(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...$c }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || LR)(n, e, t);
        if (!o) return { ...$c };
        const i = {};
        Ae(o.posParams, (a, u) => {
          i[u] = a.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function Ws(e, t, n, r) {
        if (
          n.length > 0 &&
          (function i1(e, t, n) {
            return n.some((r) => qs(e, t, r) && ft(r) !== L);
          })(e, n, r)
        ) {
          const i = new U(
            t,
            (function o1(e, t, n, r) {
              const o = {};
              (o[L] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && ft(i) !== L) {
                  const s = new U([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (o[ft(i)] = s);
                }
              return o;
            })(e, t, r, new U(n, e.children))
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function s1(e, t, n) {
            return n.some((r) => qs(e, t, r));
          })(e, n, r)
        ) {
          const i = new U(
            e.segments,
            (function r1(e, t, n, r, o) {
              const i = {};
              for (const s of r)
                if (qs(e, n, s) && !o[ft(s)]) {
                  const a = new U([], {});
                  (a._sourceSegment = e),
                    (a._segmentIndexShift = t.length),
                    (i[ft(s)] = a);
                }
              return { ...o, ...i };
            })(e, t, n, r, e.children)
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const o = new U(e.segments, e.children);
        return (
          (o._sourceSegment = e),
          (o._segmentIndexShift = t.length),
          { segmentGroup: o, slicedSegments: n }
        );
      }
      function qs(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function zv(e, t, n, r) {
        return (
          !!(ft(e) === r || (r !== L && qs(t, n, e))) &&
          ("**" === e.path || jc(t, e, n).matched)
        );
      }
      function Gv(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      const Ys = !1;
      class Qs {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class Wv {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Zo(e) {
        return ko(new Qs(e));
      }
      function qv(e) {
        return ko(new Wv(e));
      }
      class c1 {
        constructor(t, n, r, o, i) {
          (this.injector = t),
            (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = Ws(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new U(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, n, L)
            .pipe(
              H((i) =>
                this.createUrlTree(
                  js(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              gn((i) => {
                if (i instanceof Wv)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof Qs ? this.noMatchError(i) : i;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, L)
            .pipe(
              H((o) => this.createUrlTree(js(o), t.queryParams, t.fragment))
            )
            .pipe(
              gn((o) => {
                throw o instanceof Qs ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(t) {
          return new w(4002, Ys);
        }
        createUrlTree(t, n, r) {
          const o = Cc(t);
          return new yn(o, n, r);
        }
        expandSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(H((i) => new U([], i)))
            : this.expandSegment(t, r, n, r.segments, o, !0);
        }
        expandChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return we(o).pipe(
            $n((i) => {
              const s = r.children[i],
                a = Vv(n, i);
              return this.expandSegmentGroup(t, a, s, i).pipe(
                H((u) => ({ segment: u, outlet: i }))
              );
            }),
            av((i, s) => ((i[s.outlet] = s.segment), i), {}),
            uv()
          );
        }
        expandSegment(t, n, r, o, i, s) {
          return we(r).pipe(
            $n((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, o, i, s).pipe(
                gn((l) => {
                  if (l instanceof Qs) return M(null);
                  throw l;
                })
              )
            ),
            pn((a) => !!a),
            gn((a, u) => {
              if (Lc(a)) return Gv(n, o, i) ? M(new U([], {})) : Zo(n);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return zv(o, n, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
              : Zo(n)
            : Zo(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? qv(i)
            : this.lineralizeSegments(r, i).pipe(
                Ie((s) => {
                  const a = new U(s, {});
                  return this.expandSegment(t, a, n, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: u,
            remainingSegments: l,
            positionalParamSegments: c,
          } = jc(n, o, i);
          if (!a) return Zo(n);
          const d = this.applyRedirectCommands(u, o.redirectTo, c);
          return o.redirectTo.startsWith("/")
            ? qv(d)
            : this.lineralizeSegments(o, d).pipe(
                Ie((f) => this.expandSegment(t, n, r, f.concat(l), s, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, o, i) {
          return "**" === r.path
            ? ((t = jv(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? M({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(
                    H(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new U(o, {})
                      )
                    )
                  )
                : M(new U(o, {})))
            : Hv(n, r, o, t).pipe(
                Ft(
                  ({ matched: s, consumedSegments: a, remainingSegments: u }) =>
                    s
                      ? this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                          Ie((c) => {
                            const d = c.injector ?? t,
                              f = c.routes,
                              { segmentGroup: h, slicedSegments: p } = Ws(
                                n,
                                a,
                                u,
                                f
                              ),
                              g = new U(h.segments, h.children);
                            if (0 === p.length && g.hasChildren())
                              return this.expandChildren(d, f, g).pipe(
                                H((m) => new U(a, m))
                              );
                            if (0 === f.length && 0 === p.length)
                              return M(new U(a, {}));
                            const y = ft(r) === i;
                            return this.expandSegment(
                              d,
                              g,
                              f,
                              p,
                              y ? L : i,
                              !0
                            ).pipe(
                              H((_) => new U(a.concat(_.segments), _.children))
                            );
                          })
                        )
                      : Zo(n)
                )
              );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? M({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? M({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function t1(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? M(!0)
                    : M(
                        o.map((s) => {
                          const a = Fr(s, e);
                          return mn(
                            (function Ux(e) {
                              return e && Qo(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(kr(), Bv());
                })(t, n, r).pipe(
                  Ie((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          Fe((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          })
                        )
                      : (function u1(e) {
                          return ko(kv(Ys, 3));
                        })()
                  )
                )
            : M({ routes: [], injector: t });
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return M(r);
            if (o.numberOfChildren > 1 || !o.children[L])
              return t.redirectTo, ko(new w(4e3, Ys));
            o = o.children[L];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new yn(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Ae(t, (o, i) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = n[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            Ae(n.children, (a, u) => {
              s[u] = this.createSegmentGroup(t, a, r, o);
            }),
            new U(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new w(4001, Ys);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      class f1 {}
      class g1 {
        constructor(t, n, r, o, i, s, a) {
          (this.injector = t),
            (this.rootComponentType = n),
            (this.config = r),
            (this.urlTree = o),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a);
        }
        recognize() {
          const t = Ws(
            this.urlTree.root,
            [],
            [],
            this.config.filter((n) => void 0 === n.redirectTo)
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            L
          ).pipe(
            H((n) => {
              if (null === n) return null;
              const r = new Bs(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  L,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                o = new nn(r, n),
                i = new Ov(this.url, o);
              return this.inheritParamsAndData(i._root), i;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = Pv(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o);
        }
        processChildren(t, n, r) {
          return we(Object.keys(r.children)).pipe(
            $n((o) => {
              const i = r.children[o],
                s = Vv(n, o);
              return this.processSegmentGroup(t, s, i, o);
            }),
            av((o, i) => (o && i ? (o.push(...i), o) : null)),
            (function NR(e, t = !1) {
              return be((n, r) => {
                let o = 0;
                n.subscribe(
                  Se(r, (i) => {
                    const s = e(i, o++);
                    (s || t) && r.next(i), !s && r.complete();
                  })
                );
              });
            })((o) => null !== o),
            Ps(null),
            uv(),
            H((o) => {
              if (null === o) return null;
              const i = Qv(o);
              return (
                (function m1(e) {
                  e.sort((t, n) =>
                    t.value.outlet === L
                      ? -1
                      : n.value.outlet === L
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(i),
                i
              );
            })
          );
        }
        processSegment(t, n, r, o, i) {
          return we(n).pipe(
            $n((s) =>
              this.processSegmentAgainstRoute(s._injector ?? t, s, r, o, i)
            ),
            pn((s) => !!s),
            gn((s) => {
              if (Lc(s)) return Gv(r, o, i) ? M([]) : M(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i) {
          if (n.redirectTo || !zv(n, r, o, i)) return M(null);
          let s;
          if ("**" === n.path) {
            const a = o.length > 0 ? dv(o).parameters : {},
              u = Kv(r) + o.length;
            s = M({
              snapshot: new Bs(
                o,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                Xv(n),
                ft(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                Zv(r),
                u,
                Jv(n)
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = Hv(r, n, o, t).pipe(
              H(
                ({
                  matched: a,
                  consumedSegments: u,
                  remainingSegments: l,
                  parameters: c,
                }) => {
                  if (!a) return null;
                  const d = Kv(r) + u.length;
                  return {
                    snapshot: new Bs(
                      u,
                      c,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      Xv(n),
                      ft(n),
                      n.component ?? n._loadedComponent ?? null,
                      n,
                      Zv(r),
                      d,
                      Jv(n)
                    ),
                    consumedSegments: u,
                    remainingSegments: l,
                  };
                }
              )
            );
          return s.pipe(
            Ft((a) => {
              if (null === a) return M(null);
              const {
                snapshot: u,
                consumedSegments: l,
                remainingSegments: c,
              } = a;
              t = n._injector ?? t;
              const d = n._loadedInjector ?? t,
                f = (function y1(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                    ? e._loadedRoutes
                    : [];
                })(n),
                { segmentGroup: h, slicedSegments: p } = Ws(
                  r,
                  l,
                  c,
                  f.filter((y) => void 0 === y.redirectTo)
                );
              if (0 === p.length && h.hasChildren())
                return this.processChildren(d, f, h).pipe(
                  H((y) => (null === y ? null : [new nn(u, y)]))
                );
              if (0 === f.length && 0 === p.length) return M([new nn(u, [])]);
              const g = ft(n) === i;
              return this.processSegment(d, f, h, p, g ? L : i).pipe(
                H((y) => (null === y ? null : [new nn(u, y)]))
              );
            })
          );
        }
      }
      function v1(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function Qv(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!v1(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = Qv(r.children);
          t.push(new nn(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function Zv(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function Kv(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function Xv(e) {
        return e.data || {};
      }
      function Jv(e) {
        return e.resolve || {};
      }
      function eD(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function Vc(e) {
        return Ft((t) => {
          const n = e(t);
          return n ? we(n).pipe(H(() => t)) : M(t);
        });
      }
      const Lr = new P("ROUTES");
      let Uc = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = z(km));
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return M(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = mn(n.loadComponent()).pipe(
                H(nD),
                Fe((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                vc(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              o = new iv(r, () => new $t()).pipe(mc());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return M({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                H((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let u,
                    l,
                    c = !1;
                  Array.isArray(a)
                    ? (l = a)
                    : ((u = a.create(n).injector),
                      (l = cv(u.get(Lr, [], A.Self | A.Optional))));
                  return { routes: l.map(kc), injector: u };
                }),
                vc(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new iv(i, () => new $t()).pipe(mc());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(n) {
            return mn(n()).pipe(
              H(nD),
              Ie((r) =>
                r instanceof qg || Array.isArray(r)
                  ? M(r)
                  : we(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = x({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function nD(e) {
        return (function I1(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let Ks = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new $t()),
              (this.configLoader = z(Uc)),
              (this.environmentInjector = z(qt)),
              (this.urlSerializer = z(jo)),
              (this.rootContexts = z(Go)),
              (this.navigationId = 0),
              (this.afterPreactivation = () => M(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new hx(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new fx(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: r });
          }
          setupNavigations(n) {
            return (
              (this.transitions = new Et({
                id: 0,
                targetPageId: 0,
                currentUrlTree: n.currentUrlTree,
                currentRawUrl: n.currentUrlTree,
                extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
                urlAfterRedirects: n.urlHandlingStrategy.extract(
                  n.currentUrlTree
                ),
                rawUrl: n.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Ho,
                restoredState: null,
                currentSnapshot: n.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: n.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                hn((r) => 0 !== r.id),
                H((r) => ({
                  ...r,
                  extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl),
                })),
                Ft((r) => {
                  let o = !1,
                    i = !1;
                  return M(r).pipe(
                    Fe((s) => {
                      this.currentNavigation = {
                        id: s.id,
                        initialUrl: s.rawUrl,
                        extractedUrl: s.extractedUrl,
                        trigger: s.source,
                        extras: s.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Ft((s) => {
                      const a = n.browserUrlTree.toString(),
                        u =
                          !n.navigated ||
                          s.extractedUrl.toString() !== a ||
                          a !== n.currentUrlTree.toString();
                      if (
                        !u &&
                        "reload" !==
                          (s.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const c = "";
                        return (
                          this.events.next(
                            new Us(s.id, n.serializeUrl(r.rawUrl), c, 0)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          St
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                        return (
                          rD(s.source) && (n.browserUrlTree = s.extractedUrl),
                          M(s).pipe(
                            Ft((c) => {
                              const d = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new Sc(
                                    c.id,
                                    this.urlSerializer.serialize(
                                      c.extractedUrl
                                    ),
                                    c.source,
                                    c.restoredState
                                  )
                                ),
                                d !== this.transitions?.getValue()
                                  ? St
                                  : Promise.resolve(c)
                              );
                            }),
                            (function d1(e, t, n, r) {
                              return Ft((o) =>
                                (function l1(e, t, n, r, o) {
                                  return new c1(e, t, n, r, o).apply();
                                })(e, t, n, o.extractedUrl, r).pipe(
                                  H((i) => ({ ...o, urlAfterRedirects: i }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.urlSerializer,
                              n.config
                            ),
                            Fe((c) => {
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: c.urlAfterRedirects,
                              }),
                                (r.urlAfterRedirects = c.urlAfterRedirects);
                            }),
                            (function w1(e, t, n, r, o) {
                              return Ie((i) =>
                                (function p1(
                                  e,
                                  t,
                                  n,
                                  r,
                                  o,
                                  i,
                                  s = "emptyOnly"
                                ) {
                                  return new g1(e, t, n, r, o, s, i)
                                    .recognize()
                                    .pipe(
                                      Ft((a) =>
                                        null === a
                                          ? (function h1(e) {
                                              return new De((t) => t.error(e));
                                            })(new f1())
                                          : M(a)
                                      )
                                    );
                                })(
                                  e,
                                  t,
                                  n,
                                  i.urlAfterRedirects,
                                  r.serialize(i.urlAfterRedirects),
                                  r,
                                  o
                                ).pipe(H((s) => ({ ...i, targetSnapshot: s })))
                              );
                            })(
                              this.environmentInjector,
                              this.rootComponentType,
                              n.config,
                              this.urlSerializer,
                              n.paramsInheritanceStrategy
                            ),
                            Fe((c) => {
                              if (
                                ((r.targetSnapshot = c.targetSnapshot),
                                "eager" === n.urlUpdateStrategy)
                              ) {
                                if (!c.extras.skipLocationChange) {
                                  const f = n.urlHandlingStrategy.merge(
                                    c.urlAfterRedirects,
                                    c.rawUrl
                                  );
                                  n.setBrowserUrl(f, c);
                                }
                                n.browserUrlTree = c.urlAfterRedirects;
                              }
                              const d = new ax(
                                c.id,
                                this.urlSerializer.serialize(c.extractedUrl),
                                this.urlSerializer.serialize(
                                  c.urlAfterRedirects
                                ),
                                c.targetSnapshot
                              );
                              this.events.next(d);
                            })
                          )
                        );
                      if (
                        u &&
                        n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)
                      ) {
                        const {
                            id: c,
                            extractedUrl: d,
                            source: f,
                            restoredState: h,
                            extras: p,
                          } = s,
                          g = new Sc(c, this.urlSerializer.serialize(d), f, h);
                        this.events.next(g);
                        const y = xv(d, this.rootComponentType).snapshot;
                        return M(
                          (r = {
                            ...s,
                            targetSnapshot: y,
                            urlAfterRedirects: d,
                            extras: {
                              ...p,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          })
                        );
                      }
                      {
                        const c = "";
                        return (
                          this.events.next(
                            new Us(s.id, n.serializeUrl(r.extractedUrl), c, 1)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          St
                        );
                      }
                    }),
                    Fe((s) => {
                      const a = new ux(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot
                      );
                      this.events.next(a);
                    }),
                    H(
                      (s) =>
                        (r = {
                          ...s,
                          guards: kx(
                            s.targetSnapshot,
                            s.currentSnapshot,
                            this.rootContexts
                          ),
                        })
                    ),
                    (function qx(e, t) {
                      return Ie((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = n;
                        return 0 === s.length && 0 === i.length
                          ? M({ ...n, guardsResult: !0 })
                          : (function Yx(e, t, n, r) {
                              return we(e).pipe(
                                Ie((o) =>
                                  (function e1(e, t, n, r, o) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? M(
                                          i.map((a) => {
                                            const u = Wo(t) ?? o,
                                              l = Fr(a, u);
                                            return mn(
                                              (function zx(e) {
                                                return e && Qo(e.canDeactivate);
                                              })(l)
                                                ? l.canDeactivate(e, t, n, r)
                                                : u.runInContext(() =>
                                                    l(e, t, n, r)
                                                  )
                                            ).pipe(pn());
                                          })
                                        ).pipe(kr())
                                      : M(!0);
                                  })(o.component, o.route, n, t, r)
                                ),
                                pn((o) => !0 !== o, !0)
                              );
                            })(s, r, o, e).pipe(
                              Ie((a) =>
                                a &&
                                (function Vx(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function Qx(e, t, n, r) {
                                      return we(t).pipe(
                                        $n((o) =>
                                          gc(
                                            (function Kx(e, t) {
                                              return (
                                                null !== e && t && t(new px(e)),
                                                M(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function Zx(e, t) {
                                              return (
                                                null !== e && t && t(new mx(e)),
                                                M(!0)
                                              );
                                            })(o.route, r),
                                            (function Jx(e, t, n) {
                                              const r = t[t.length - 1],
                                                i = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function Lx(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    ov(() =>
                                                      M(
                                                        s.guards.map((u) => {
                                                          const l =
                                                              Wo(s.node) ?? n,
                                                            c = Fr(u, l);
                                                          return mn(
                                                            (function Hx(e) {
                                                              return (
                                                                e &&
                                                                Qo(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(c)
                                                              ? c.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : l.runInContext(
                                                                  () => c(r, e)
                                                                )
                                                          ).pipe(pn());
                                                        })
                                                      ).pipe(kr())
                                                    )
                                                  );
                                              return M(i).pipe(kr());
                                            })(e, o.path, n),
                                            (function Xx(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return M(!0);
                                              const o = r.map((i) =>
                                                ov(() => {
                                                  const s = Wo(t) ?? n,
                                                    a = Fr(i, s);
                                                  return mn(
                                                    (function Bx(e) {
                                                      return (
                                                        e && Qo(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe(pn());
                                                })
                                              );
                                              return M(o).pipe(kr());
                                            })(e, o.route, n)
                                          )
                                        ),
                                        pn((o) => !0 !== o, !0)
                                      );
                                    })(r, i, e, t)
                                  : M(a)
                              ),
                              H((a) => ({ ...n, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (s) => this.events.next(s)),
                    Fe((s) => {
                      if (
                        ((r.guardsResult = s.guardsResult), Vn(s.guardsResult))
                      )
                        throw Fv(0, s.guardsResult);
                      const a = new lx(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot,
                        !!s.guardsResult
                      );
                      this.events.next(a);
                    }),
                    hn(
                      (s) =>
                        !!s.guardsResult ||
                        (n.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1)
                    ),
                    Vc((s) => {
                      if (s.guards.canActivateChecks.length)
                        return M(s).pipe(
                          Fe((a) => {
                            const u = new cx(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(u);
                          }),
                          Ft((a) => {
                            let u = !1;
                            return M(a).pipe(
                              (function C1(e, t) {
                                return Ie((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = n;
                                  if (!o.length) return M(n);
                                  let i = 0;
                                  return we(o).pipe(
                                    $n((s) =>
                                      (function _1(e, t, n, r) {
                                        const o = e.routeConfig,
                                          i = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !eD(o) &&
                                            (i[Lo] = o.title),
                                          (function E1(e, t, n, r) {
                                            const o = (function b1(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return M({});
                                            const i = {};
                                            return we(o).pipe(
                                              Ie((s) =>
                                                (function S1(e, t, n, r) {
                                                  const o = Wo(t) ?? r,
                                                    i = Fr(e, o);
                                                  return mn(
                                                    i.resolve
                                                      ? i.resolve(t, n)
                                                      : o.runInContext(() =>
                                                          i(t, n)
                                                        )
                                                  );
                                                })(e[s], t, n, r).pipe(
                                                  pn(),
                                                  Fe((a) => {
                                                    i[s] = a;
                                                  })
                                                )
                                              ),
                                              yc(1),
                                              (function FR(e) {
                                                return H(() => e);
                                              })(i),
                                              gn((s) => (Lc(s) ? St : ko(s)))
                                            );
                                          })(i, e, t, r).pipe(
                                            H(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = Pv(e, n).resolve),
                                                o &&
                                                  eD(o) &&
                                                  (e.data[Lo] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, r, e, t)
                                    ),
                                    Fe(() => i++),
                                    yc(1),
                                    Ie((s) => (i === o.length ? M(n) : St))
                                  );
                                });
                              })(
                                n.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              Fe({
                                next: () => (u = !0),
                                complete: () => {
                                  u ||
                                    (n.restoreHistory(a),
                                    this.cancelNavigationTransition(a, "", 2));
                                },
                              })
                            );
                          }),
                          Fe((a) => {
                            const u = new dx(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(u);
                          })
                        );
                    }),
                    Vc((s) => {
                      const a = (u) => {
                        const l = [];
                        u.routeConfig?.loadComponent &&
                          !u.routeConfig._loadedComponent &&
                          l.push(
                            this.configLoader.loadComponent(u.routeConfig).pipe(
                              Fe((c) => {
                                u.component = c;
                              }),
                              H(() => {})
                            )
                          );
                        for (const c of u.children) l.push(...a(c));
                        return l;
                      };
                      return nv(a(s.targetSnapshot.root)).pipe(Ps(), Tr(1));
                    }),
                    Vc(() => this.afterPreactivation()),
                    H((s) => {
                      const a = (function Sx(e, t, n) {
                        const r = zo(e, t._root, n ? n._root : void 0);
                        return new Rv(r, t);
                      })(
                        n.routeReuseStrategy,
                        s.targetSnapshot,
                        s.currentRouterState
                      );
                      return (r = { ...s, targetRouterState: a });
                    }),
                    Fe((s) => {
                      (n.currentUrlTree = s.urlAfterRedirects),
                        (n.rawUrlTree = n.urlHandlingStrategy.merge(
                          s.urlAfterRedirects,
                          s.rawUrl
                        )),
                        (n.routerState = s.targetRouterState),
                        "deferred" === n.urlUpdateStrategy &&
                          (s.extras.skipLocationChange ||
                            n.setBrowserUrl(n.rawUrlTree, s),
                          (n.browserUrlTree = s.urlAfterRedirects));
                    }),
                    ((e, t, n) =>
                      H(
                        (r) => (
                          new Fx(
                            t,
                            r.targetRouterState,
                            r.currentRouterState,
                            n
                          ).activate(e),
                          r
                        )
                      ))(this.rootContexts, n.routeReuseStrategy, (s) =>
                      this.events.next(s)
                    ),
                    Tr(1),
                    Fe({
                      next: (s) => {
                        (o = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (n.navigated = !0),
                          this.events.next(
                            new Un(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(n.currentUrlTree)
                            )
                          ),
                          n.titleStrategy?.updateTitle(
                            s.targetRouterState.snapshot
                          ),
                          s.resolve(!0);
                      },
                      complete: () => {
                        o = !0;
                      },
                    }),
                    vc(() => {
                      o || i || this.cancelNavigationTransition(r, "", 1),
                        this.currentNavigation?.id === r.id &&
                          (this.currentNavigation = null);
                    }),
                    gn((s) => {
                      if (((i = !0), $v(s))) {
                        Lv(s) || ((n.navigated = !0), n.restoreHistory(r, !0));
                        const a = new Vs(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s.message,
                          s.cancellationCode
                        );
                        if ((this.events.next(a), Lv(s))) {
                          const u = n.urlHandlingStrategy.merge(
                              s.url,
                              n.rawUrlTree
                            ),
                            l = {
                              skipLocationChange: r.extras.skipLocationChange,
                              replaceUrl:
                                "eager" === n.urlUpdateStrategy || rD(r.source),
                            };
                          n.scheduleNavigation(u, Ho, null, l, {
                            resolve: r.resolve,
                            reject: r.reject,
                            promise: r.promise,
                          });
                        } else r.resolve(!1);
                      } else {
                        n.restoreHistory(r, !0);
                        const a = new Ic(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s,
                          r.targetSnapshot ?? void 0
                        );
                        this.events.next(a);
                        try {
                          r.resolve(n.errorHandler(s));
                        } catch (u) {
                          r.reject(u);
                        }
                      }
                      return St;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(n, r, o) {
            const i = new Vs(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              r,
              o
            );
            this.events.next(i), n.resolve(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = x({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function rD(e) {
        return e !== Ho;
      }
      let oD = (() => {
          class e {
            buildTitle(n) {
              let r,
                o = n.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === L));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[Lo];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = x({
              token: e,
              factory: function () {
                return z(M1);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        M1 = (() => {
          class e extends oD {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(Jy));
            }),
            (e.ɵprov = x({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        T1 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = x({
              token: e,
              factory: function () {
                return z(R1);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class A1 {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let R1 = (() => {
        class e extends A1 {}
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (
                t ||
                (t = (function gf(e) {
                  return Vt(() => {
                    const t = e.prototype.constructor,
                      n = t[Bt] || Ua(t),
                      r = Object.prototype;
                    let o = Object.getPrototypeOf(e.prototype).constructor;
                    for (; o && o !== r; ) {
                      const i = o[Bt] || Ua(o);
                      if (i && i !== n) return i;
                      o = Object.getPrototypeOf(o);
                    }
                    return (i) => new i();
                  });
                })(e))
              )(r || e);
            };
          })()),
          (e.ɵprov = x({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Xs = new P("", { providedIn: "root", factory: () => ({}) });
      let P1 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = x({
              token: e,
              factory: function () {
                return z(O1);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        O1 = (() => {
          class e {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, r) {
              return n;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = x({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function N1(e) {
        throw e;
      }
      function F1(e, t, n) {
        return t.parse("/");
      }
      const k1 = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        L1 = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let nt = (() => {
          class e {
            get navigationId() {
              return this.navigationTransitions.navigationId;
            }
            get browserPageId() {
              if ("computed" === this.canceledNavigationResolution)
                return this.location.getState()?.ɵrouterPageId;
            }
            get events() {
              return this.navigationTransitions.events;
            }
            constructor() {
              (this.disposed = !1),
                (this.currentPageId = 0),
                (this.console = z(oM)),
                (this.isNgZoneEnabled = !1),
                (this.options = z(Xs, { optional: !0 }) || {}),
                (this.errorHandler = this.options.errorHandler || N1),
                (this.malformedUriErrorHandler =
                  this.options.malformedUriErrorHandler || F1),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.urlHandlingStrategy = z(P1)),
                (this.routeReuseStrategy = z(T1)),
                (this.urlCreationStrategy = z(_x)),
                (this.titleStrategy = z(oD)),
                (this.onSameUrlNavigation =
                  this.options.onSameUrlNavigation || "ignore"),
                (this.paramsInheritanceStrategy =
                  this.options.paramsInheritanceStrategy || "emptyOnly"),
                (this.urlUpdateStrategy =
                  this.options.urlUpdateStrategy || "deferred"),
                (this.canceledNavigationResolution =
                  this.options.canceledNavigationResolution || "replace"),
                (this.config = cv(z(Lr, { optional: !0 }) ?? [])),
                (this.navigationTransitions = z(Ks)),
                (this.urlSerializer = z(jo)),
                (this.location = z(zl)),
                (this.isNgZoneEnabled =
                  z(fe) instanceof fe && fe.isInAngularZone()),
                this.resetConfig(this.config),
                (this.currentUrlTree = new yn()),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.routerState = xv(this.currentUrlTree, null)),
                this.navigationTransitions.setupNavigations(this).subscribe(
                  (n) => {
                    (this.lastSuccessfulId = n.id),
                      (this.currentPageId = this.browserPageId ?? 0);
                  },
                  (n) => {
                    this.console.warn(`Unhandled Navigation Error: ${n}`);
                  }
                );
            }
            resetRootComponentType(n) {
              (this.routerState.root.component = n),
                (this.navigationTransitions.rootComponentType = n);
            }
            initialNavigation() {
              if (
                (this.setUpLocationChangeListener(),
                !this.navigationTransitions.hasRequestedNavigation)
              ) {
                const n = this.location.getState();
                this.navigateToSyncWithBrowser(this.location.path(!0), Ho, n);
              }
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((n) => {
                  const r = "popstate" === n.type ? "popstate" : "hashchange";
                  "popstate" === r &&
                    setTimeout(() => {
                      this.navigateToSyncWithBrowser(n.url, r, n.state);
                    }, 0);
                }));
            }
            navigateToSyncWithBrowser(n, r, o) {
              const i = { replaceUrl: !0 },
                s = o?.navigationId ? o : null;
              if (o) {
                const u = { ...o };
                delete u.navigationId,
                  delete u.ɵrouterPageId,
                  0 !== Object.keys(u).length && (i.state = u);
              }
              const a = this.parseUrl(n);
              this.scheduleNavigation(a, r, s, i);
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.navigationTransitions.currentNavigation;
            }
            resetConfig(n) {
              (this.config = n.map(kc)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.navigationTransitions.complete(),
                this.locationSubscription &&
                  (this.locationSubscription.unsubscribe(),
                  (this.locationSubscription = void 0)),
                (this.disposed = !0);
            }
            createUrlTree(n, r = {}) {
              const {
                  relativeTo: o,
                  queryParams: i,
                  fragment: s,
                  queryParamsHandling: a,
                  preserveFragment: u,
                } = r,
                l = u ? this.currentUrlTree.fragment : s;
              let c = null;
              switch (a) {
                case "merge":
                  c = { ...this.currentUrlTree.queryParams, ...i };
                  break;
                case "preserve":
                  c = this.currentUrlTree.queryParams;
                  break;
                default:
                  c = i || null;
              }
              return (
                null !== c && (c = this.removeEmptyProps(c)),
                this.urlCreationStrategy.createUrlTree(
                  o,
                  this.routerState,
                  this.currentUrlTree,
                  n,
                  c,
                  l ?? null
                )
              );
            }
            navigateByUrl(n, r = { skipLocationChange: !1 }) {
              const o = Vn(n) ? n : this.parseUrl(n),
                i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
              return this.scheduleNavigation(i, Ho, null, r);
            }
            navigate(n, r = { skipLocationChange: !1 }) {
              return (
                (function $1(e) {
                  for (let t = 0; t < e.length; t++) {
                    const n = e[t];
                    if (null == n) throw new w(4008, false);
                  }
                })(n),
                this.navigateByUrl(this.createUrlTree(n, r), r)
              );
            }
            serializeUrl(n) {
              return this.urlSerializer.serialize(n);
            }
            parseUrl(n) {
              let r;
              try {
                r = this.urlSerializer.parse(n);
              } catch (o) {
                r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
              }
              return r;
            }
            isActive(n, r) {
              let o;
              if (
                ((o = !0 === r ? { ...k1 } : !1 === r ? { ...L1 } : r), Vn(n))
              )
                return hv(this.currentUrlTree, n, o);
              const i = this.parseUrl(n);
              return hv(this.currentUrlTree, i, o);
            }
            removeEmptyProps(n) {
              return Object.keys(n).reduce((r, o) => {
                const i = n[o];
                return null != i && (r[o] = i), r;
              }, {});
            }
            scheduleNavigation(n, r, o, i, s) {
              if (this.disposed) return Promise.resolve(!1);
              let a, u, l, c;
              return (
                s
                  ? ((a = s.resolve), (u = s.reject), (l = s.promise))
                  : (l = new Promise((d, f) => {
                      (a = d), (u = f);
                    })),
                (c =
                  "computed" === this.canceledNavigationResolution
                    ? o && o.ɵrouterPageId
                      ? o.ɵrouterPageId
                      : (this.browserPageId ?? 0) + 1
                    : 0),
                this.navigationTransitions.handleNavigationRequest({
                  targetPageId: c,
                  source: r,
                  restoredState: o,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  rawUrl: n,
                  extras: i,
                  resolve: a,
                  reject: u,
                  promise: l,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                l.catch((d) => Promise.reject(d))
              );
            }
            setBrowserUrl(n, r) {
              const o = this.urlSerializer.serialize(n);
              if (
                this.location.isCurrentPathEqualTo(o) ||
                r.extras.replaceUrl
              ) {
                const s = {
                  ...r.extras.state,
                  ...this.generateNgRouterState(r.id, this.browserPageId),
                };
                this.location.replaceState(o, "", s);
              } else {
                const i = {
                  ...r.extras.state,
                  ...this.generateNgRouterState(r.id, r.targetPageId),
                };
                this.location.go(o, "", i);
              }
            }
            restoreHistory(n, r = !1) {
              if ("computed" === this.canceledNavigationResolution) {
                const i =
                  this.currentPageId -
                  (this.browserPageId ?? this.currentPageId);
                0 !== i
                  ? this.location.historyGo(i)
                  : this.currentUrlTree ===
                      this.getCurrentNavigation()?.finalUrl &&
                    0 === i &&
                    (this.resetState(n),
                    (this.browserUrlTree = n.currentUrlTree),
                    this.resetUrlToCurrentUrlTree());
              } else
                "replace" === this.canceledNavigationResolution &&
                  (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
            }
            resetState(n) {
              (this.routerState = n.currentRouterState),
                (this.currentUrlTree = n.currentUrlTree),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  n.rawUrl
                ));
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                this.generateNgRouterState(
                  this.lastSuccessfulId,
                  this.currentPageId
                )
              );
            }
            generateNgRouterState(n, r) {
              return "computed" === this.canceledNavigationResolution
                ? { navigationId: n, ɵrouterPageId: r }
                : { navigationId: n };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = x({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        Js = (() => {
          class e {
            constructor(n, r, o, i, s, a) {
              (this.router = n),
                (this.route = r),
                (this.tabIndexAttribute = o),
                (this.renderer = i),
                (this.el = s),
                (this.locationStrategy = a),
                (this._preserveFragment = !1),
                (this._skipLocationChange = !1),
                (this._replaceUrl = !1),
                (this.href = null),
                (this.commands = null),
                (this.onChanges = new $t());
              const u = s.nativeElement.tagName?.toLowerCase();
              (this.isAnchorElement = "a" === u || "area" === u),
                this.isAnchorElement
                  ? (this.subscription = n.events.subscribe((l) => {
                      l instanceof Un && this.updateHref();
                    }))
                  : this.setTabIndexIfNotOnNativeEl("0");
            }
            set preserveFragment(n) {
              this._preserveFragment = Vl(n);
            }
            get preserveFragment() {
              return this._preserveFragment;
            }
            set skipLocationChange(n) {
              this._skipLocationChange = Vl(n);
            }
            get skipLocationChange() {
              return this._skipLocationChange;
            }
            set replaceUrl(n) {
              this._replaceUrl = Vl(n);
            }
            get replaceUrl() {
              return this._replaceUrl;
            }
            setTabIndexIfNotOnNativeEl(n) {
              null != this.tabIndexAttribute ||
                this.isAnchorElement ||
                this.applyAttributeValue("tabindex", n);
            }
            ngOnChanges(n) {
              this.isAnchorElement && this.updateHref(),
                this.onChanges.next(this);
            }
            set routerLink(n) {
              null != n
                ? ((this.commands = Array.isArray(n) ? n : [n]),
                  this.setTabIndexIfNotOnNativeEl("0"))
                : ((this.commands = null),
                  this.setTabIndexIfNotOnNativeEl(null));
            }
            onClick(n, r, o, i, s) {
              return (
                !!(
                  null === this.urlTree ||
                  (this.isAnchorElement &&
                    (0 !== n ||
                      r ||
                      o ||
                      i ||
                      s ||
                      ("string" == typeof this.target &&
                        "_self" != this.target)))
                ) ||
                (this.router.navigateByUrl(this.urlTree, {
                  skipLocationChange: this.skipLocationChange,
                  replaceUrl: this.replaceUrl,
                  state: this.state,
                }),
                !this.isAnchorElement)
              );
            }
            ngOnDestroy() {
              this.subscription?.unsubscribe();
            }
            updateHref() {
              this.href =
                null !== this.urlTree && this.locationStrategy
                  ? this.locationStrategy?.prepareExternalUrl(
                      this.router.serializeUrl(this.urlTree)
                    )
                  : null;
              const n =
                null === this.href
                  ? null
                  : (function ph(e, t, n) {
                      return (function K_(e, t) {
                        return ("src" === t &&
                          ("embed" === e ||
                            "frame" === e ||
                            "iframe" === e ||
                            "media" === e ||
                            "script" === e)) ||
                          ("href" === t && ("base" === e || "link" === e))
                          ? hh
                          : fh;
                      })(
                        t,
                        n
                      )(e);
                    })(
                      this.href,
                      this.el.nativeElement.tagName.toLowerCase(),
                      "href"
                    );
              this.applyAttributeValue("href", n);
            }
            applyAttributeValue(n, r) {
              const o = this.renderer,
                i = this.el.nativeElement;
              null !== r ? o.setAttribute(i, n, r) : o.removeAttribute(i, n);
            }
            get urlTree() {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo:
                      void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(
                S(nt),
                S(Nr),
                (function Si(e) {
                  return (function _C(e, t) {
                    if ("class" === t) return e.classes;
                    if ("style" === t) return e.styles;
                    const n = e.attrs;
                    if (n) {
                      const r = n.length;
                      let o = 0;
                      for (; o < r; ) {
                        const i = n[o];
                        if (ef(i)) break;
                        if (0 === i) o += 2;
                        else if ("number" == typeof i)
                          for (o++; o < r && "string" == typeof n[o]; ) o++;
                        else {
                          if (i === t) return n[o + 1];
                          o += 2;
                        }
                      }
                    }
                    return null;
                  })(Te(), e);
                })("tabindex"),
                S(go),
                S(ln),
                S(Ln)
              );
            }),
            (e.ɵdir = ke({
              type: e,
              selectors: [["", "routerLink", ""]],
              hostVars: 1,
              hostBindings: function (n, r) {
                1 & n &&
                  Zu("click", function (i) {
                    return r.onClick(
                      i.button,
                      i.ctrlKey,
                      i.shiftKey,
                      i.altKey,
                      i.metaKey
                    );
                  }),
                  2 & n && Wu("target", r.target);
              },
              inputs: {
                target: "target",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                state: "state",
                relativeTo: "relativeTo",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                routerLink: "routerLink",
              },
              standalone: !0,
              features: [In],
            })),
            e
          );
        })(),
        iD = (() => {
          class e {
            get isActive() {
              return this._isActive;
            }
            constructor(n, r, o, i, s) {
              (this.router = n),
                (this.element = r),
                (this.renderer = o),
                (this.cdr = i),
                (this.link = s),
                (this.classes = []),
                (this._isActive = !1),
                (this.routerLinkActiveOptions = { exact: !1 }),
                (this.isActiveChange = new Ue()),
                (this.routerEventsSubscription = n.events.subscribe((a) => {
                  a instanceof Un && this.update();
                }));
            }
            ngAfterContentInit() {
              M(this.links.changes, M(null))
                .pipe(Bn())
                .subscribe((n) => {
                  this.update(), this.subscribeToEachLinkOnChanges();
                });
            }
            subscribeToEachLinkOnChanges() {
              this.linkInputChangesSubscription?.unsubscribe();
              const n = [...this.links.toArray(), this.link]
                .filter((r) => !!r)
                .map((r) => r.onChanges);
              this.linkInputChangesSubscription = we(n)
                .pipe(Bn())
                .subscribe((r) => {
                  this._isActive !== this.isLinkActive(this.router)(r) &&
                    this.update();
                });
            }
            set routerLinkActive(n) {
              const r = Array.isArray(n) ? n : n.split(" ");
              this.classes = r.filter((o) => !!o);
            }
            ngOnChanges(n) {
              this.update();
            }
            ngOnDestroy() {
              this.routerEventsSubscription.unsubscribe(),
                this.linkInputChangesSubscription?.unsubscribe();
            }
            update() {
              !this.links ||
                !this.router.navigated ||
                Promise.resolve().then(() => {
                  const n = this.hasActiveLinks();
                  this._isActive !== n &&
                    ((this._isActive = n),
                    this.cdr.markForCheck(),
                    this.classes.forEach((r) => {
                      n
                        ? this.renderer.addClass(this.element.nativeElement, r)
                        : this.renderer.removeClass(
                            this.element.nativeElement,
                            r
                          );
                    }),
                    n && void 0 !== this.ariaCurrentWhenActive
                      ? this.renderer.setAttribute(
                          this.element.nativeElement,
                          "aria-current",
                          this.ariaCurrentWhenActive.toString()
                        )
                      : this.renderer.removeAttribute(
                          this.element.nativeElement,
                          "aria-current"
                        ),
                    this.isActiveChange.emit(n));
                });
            }
            isLinkActive(n) {
              const r = (function j1(e) {
                return !!e.paths;
              })(this.routerLinkActiveOptions)
                ? this.routerLinkActiveOptions
                : this.routerLinkActiveOptions.exact || !1;
              return (o) => !!o.urlTree && n.isActive(o.urlTree, r);
            }
            hasActiveLinks() {
              const n = this.isLinkActive(this.router);
              return (this.link && n(this.link)) || this.links.some(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(S(nt), S(ln), S(go), S(Fl), S(Js, 8));
            }),
            (e.ɵdir = ke({
              type: e,
              selectors: [["", "routerLinkActive", ""]],
              contentQueries: function (n, r, o) {
                if (
                  (1 & n &&
                    (function fm(e, t, n, r) {
                      const o = G();
                      if (o.firstCreatePass) {
                        const i = Te();
                        pm(o, new cm(t, n, r), i.index),
                          (function LI(e, t) {
                            const n =
                              e.contentQueries || (e.contentQueries = []);
                            t !== (n.length ? n[n.length - 1] : -1) &&
                              n.push(e.queries.length - 1, t);
                          })(o, e),
                          2 == (2 & n) && (o.staticContentQueries = !0);
                      }
                      hm(o, v(), n);
                    })(o, Js, 5),
                  2 & n)
                ) {
                  let i;
                  is((i = ss())) && (r.links = i);
                }
              },
              inputs: {
                routerLinkActiveOptions: "routerLinkActiveOptions",
                ariaCurrentWhenActive: "ariaCurrentWhenActive",
                routerLinkActive: "routerLinkActive",
              },
              outputs: { isActiveChange: "isActiveChange" },
              exportAs: ["routerLinkActive"],
              standalone: !0,
              features: [In],
            })),
            e
          );
        })();
      class sD {}
      let V1 = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                hn((n) => n instanceof Un),
                $n(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = rs(i.providers, n, `Route: ${i.path}`));
              const s = i._injector ?? n,
                a = i._loadedInjector ?? s;
              ((i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
                (i.loadComponent && !i._loadedComponent)) &&
                o.push(this.preloadConfig(s, i)),
                (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return we(o).pipe(Bn());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : M(null);
              const i = o.pipe(
                Ie((s) =>
                  null === s
                    ? M(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? we([i, this.loader.loadComponent(r)]).pipe(Bn())
                : i;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(nt), R(km), R(qt), R(sD), R(Uc));
          }),
          (e.ɵprov = x({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Hc = new P("");
      let aD = (() => {
        class e {
          constructor(n, r, o, i, s = {}) {
            (this.urlSerializer = n),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = i),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof Sc
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof Un &&
                  ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof Tv &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new Tv(
                      n,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            !(function Wh() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = x({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      var rt = (() => (
        ((rt = rt || {})[(rt.COMPLETE = 0)] = "COMPLETE"),
        (rt[(rt.FAILED = 1)] = "FAILED"),
        (rt[(rt.REDIRECTING = 2)] = "REDIRECTING"),
        rt
      ))();
      const $r = !1;
      function vn(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      const zc = new P("", { providedIn: "root", factory: () => !1 });
      function lD() {
        const e = z(Qt);
        return (t) => {
          const n = e.get(fs);
          if (t !== n.components[0]) return;
          const r = e.get(nt),
            o = e.get(cD);
          1 === e.get(Gc) && r.initialNavigation(),
            e.get(dD, null, A.Optional)?.setUpPreloading(),
            e.get(Hc, null, A.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.closed || (o.next(), o.complete(), o.unsubscribe());
        };
      }
      const cD = new P($r ? "bootstrap done indicator" : "", {
          factory: () => new $t(),
        }),
        Gc = new P($r ? "initial navigation" : "", {
          providedIn: "root",
          factory: () => 1,
        });
      function G1() {
        let e = [];
        return (
          (e = $r
            ? [
                {
                  provide: ki,
                  multi: !0,
                  useFactory: () => {
                    const t = z(nt);
                    return () =>
                      t.events.subscribe((n) => {
                        console.group?.(`Router Event: ${n.constructor.name}`),
                          console.log(
                            (function vx(e) {
                              if (!("type" in e))
                                return `Unknown Router Event: ${e.constructor.name}`;
                              switch (e.type) {
                                case 14:
                                  return `ActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 13:
                                  return `ActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 12:
                                  return `ChildActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 11:
                                  return `ChildActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 8:
                                  return `GuardsCheckEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state}, shouldActivate: ${e.shouldActivate})`;
                                case 7:
                                  return `GuardsCheckStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 2:
                                  return `NavigationCancel(id: ${e.id}, url: '${e.url}')`;
                                case 16:
                                  return `NavigationSkipped(id: ${e.id}, url: '${e.url}')`;
                                case 1:
                                  return `NavigationEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}')`;
                                case 3:
                                  return `NavigationError(id: ${e.id}, url: '${e.url}', error: ${e.error})`;
                                case 0:
                                  return `NavigationStart(id: ${e.id}, url: '${e.url}')`;
                                case 6:
                                  return `ResolveEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 5:
                                  return `ResolveStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 10:
                                  return `RouteConfigLoadEnd(path: ${e.route.path})`;
                                case 9:
                                  return `RouteConfigLoadStart(path: ${e.route.path})`;
                                case 4:
                                  return `RoutesRecognized(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 15:
                                  return `Scroll(anchor: '${
                                    e.anchor
                                  }', position: '${
                                    e.position
                                      ? `${e.position[0]}, ${e.position[1]}`
                                      : null
                                  }')`;
                              }
                            })(n)
                          ),
                          console.log(n),
                          console.groupEnd?.();
                      });
                  },
                },
              ]
            : []),
          vn(1, e)
        );
      }
      const dD = new P($r ? "router preloader" : "");
      function W1(e) {
        return vn(0, [
          { provide: dD, useExisting: V1 },
          { provide: sD, useExisting: e },
        ]);
      }
      const Ko = !1,
        fD = new P(
          Ko ? "router duplicate forRoot guard" : "ROUTER_FORROOT_GUARD"
        ),
        q1 = [
          zl,
          { provide: jo, useClass: Dc },
          nt,
          Go,
          {
            provide: Nr,
            useFactory: function uD(e) {
              return e.routerState.root;
            },
            deps: [nt],
          },
          Uc,
          Ko ? { provide: zc, useValue: !0 } : [],
        ];
      function Y1() {
        return new zm("Router", nt);
      }
      let hD = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                q1,
                Ko && r?.enableTracing ? G1().ɵproviders : [],
                { provide: Lr, multi: !0, useValue: n },
                {
                  provide: fD,
                  useFactory: X1,
                  deps: [[nt, new ro(), new oo()]],
                },
                { provide: Xs, useValue: r || {} },
                r?.useHash
                  ? { provide: Ln, useClass: GM }
                  : { provide: Ln, useClass: hy },
                {
                  provide: Hc,
                  useFactory: () => {
                    const e = z(hA),
                      t = z(fe),
                      n = z(Xs),
                      r = z(Ks),
                      o = z(jo);
                    return (
                      n.scrollOffset && e.setOffset(n.scrollOffset),
                      new aD(o, r, e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? W1(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: zm, multi: !0, useFactory: Y1 },
                r?.initialNavigation ? J1(r) : [],
                [
                  { provide: pD, useFactory: lD },
                  { provide: Hm, multi: !0, useExisting: pD },
                ],
              ],
            };
          }
          static forChild(n) {
            return {
              ngModule: e,
              providers: [{ provide: Lr, multi: !0, useValue: n }],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(fD, 8));
          }),
          (e.ɵmod = En({ type: e })),
          (e.ɵinj = sn({ imports: [Nc] })),
          e
        );
      })();
      function X1(e) {
        if (Ko && e)
          throw new w(
            4007,
            "The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function J1(e) {
        return [
          "disabled" === e.initialNavigation
            ? vn(3, [
                {
                  provide: ls,
                  multi: !0,
                  useFactory: () => {
                    const t = z(nt);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Gc, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? vn(2, [
                { provide: Gc, useValue: 0 },
                {
                  provide: ls,
                  multi: !0,
                  deps: [Qt],
                  useFactory: (t) => {
                    const n = t.get(HM, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((r) => {
                            const o = t.get(nt),
                              i = t.get(cD);
                            (function U1(e, t) {
                              e.events
                                .pipe(
                                  hn(
                                    (n) =>
                                      n instanceof Un ||
                                      n instanceof Vs ||
                                      n instanceof Ic ||
                                      n instanceof Us
                                  ),
                                  H((n) =>
                                    n instanceof Un || n instanceof Us
                                      ? rt.COMPLETE
                                      : n instanceof Vs &&
                                        (0 === n.code || 1 === n.code)
                                      ? rt.REDIRECTING
                                      : rt.FAILED
                                  ),
                                  hn((n) => n !== rt.REDIRECTING),
                                  Tr(1)
                                )
                                .subscribe(() => {
                                  t();
                                });
                            })(o, () => {
                              r(!0);
                            }),
                              (t.get(Ks).afterPreactivation = () => (
                                r(!0), i.closed ? M(void 0) : i
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const pD = new P(Ko ? "Router Initializer" : "");
      let tP = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = _n({
              type: e,
              selectors: [["app-contact"]],
              decls: 29,
              vars: 0,
              consts: [
                [1, "wrapper"],
                [1, "background"],
                [1, "column-one"],
                ["href", "mailto:lobhasap@gmail.com", 1, "email-a"],
                [1, "email"],
                [1, "hero"],
                [1, "social-links"],
                ["href", "https://github.com/lobhasap", "target", "_blank"],
                [1, "fab", "fa-github"],
                [
                  "href",
                  "https://www.linkedin.com/in/lobhas-paithankar-45440b276/",
                  "target",
                  "_blank",
                ],
                [1, "fab", "fa-linkedin-in"],
                [
                  "href",
                  "https://www.instagram.com/operacion_famosa/",
                  "target",
                  "_blank",
                ],
                [1, "fab", "fa-instagram"],
                [
                  "href",
                  "https://twitter.com/blackshawled",
                  "target",
                  "_blank",
                ],
                [1, "fab", "fa-twitter"],
                [
                  "href",
                  "https://www.youtube.com/channel/UCkbcMPLhS4wBkoBxenFYtzw",
                  "target",
                  "_blank",
                ],
                [1, "fab", "fa-youtube"],
              ],
              template: function (r, o) {
                1 & r &&
                  (W(0, "div", 0),
                  de(1, "div", 1),
                  W(2, "div", 2)(3, "p"),
                  ie(4, "reach me via email : "),
                  q(),
                  W(5, "a", 3)(6, "p", 4),
                  ie(7, "lobhasap@gmail.com"),
                  q()(),
                  de(8, "br"),
                  W(9, "p"),
                  ie(10, "also available here :"),
                  q(),
                  W(11, "div", 5)(12, "ul", 6)(13, "li")(14, "a", 7),
                  de(15, "i", 8),
                  q()(),
                  W(16, "li")(17, "a", 9),
                  de(18, "i", 10),
                  q()(),
                  W(19, "li")(20, "a", 11),
                  de(21, "i", 12),
                  q()(),
                  W(22, "li")(23, "a", 13),
                  de(24, "i", 14),
                  q()(),
                  W(25, "li")(26, "a", 15),
                  de(27, "i", 16),
                  q()()()(),
                  de(28, "div"),
                  q()());
              },
              styles: [
                ".top[_ngcontent-%COMP%]{position:relative;align-items:center;justify-content:center;text-align:center;font-size:20px;font-family:MyFont;color:#ddd;margin:32px;padding:0}.column-one[_ngcontent-%COMP%]{padding:15vh clamp(50px,8%,200px) 0 clamp(50px,8%,200px);height:100%;align-items:center;justify-content:flex;text-align:center}.column-one[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{position:relative;word-wrap:break-word;white-space:-moz-pre-wrap;white-space:pre-wrap}p[_ngcontent-%COMP%]{font-size:1.5em;color:#ddd;align-items:center;justify-content:center;text-align:center}a[_ngcontent-%COMP%]{color:#ddd}.email-a[_ngcontent-%COMP%]{text-decoration-color:#ddd;text-decoration-line:underline}.email[_ngcontent-%COMP%]:hover{transform:translateY(-1px)}.email[_ngcontent-%COMP%]{text-decoration:none;color:#ddd}.email[_ngcontent-%COMP%]{font-size:5vw}ul[_ngcontent-%COMP%]{padding:0}.social-links[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;text-align:center}.social-links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:inline-block}.social-linkks[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{width:100px;height:100px;text-align:center;text-decoration:none;color:#fff;vertical-align:middle;font-size:1rem;padding:20px;border-radius:50%;border:#dddddd 2px solid;transition:transform .5s}.social-links[_ngcontent-%COMP%]{display:flex}.social-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:flex;background:transparent;height:45px;width:45px;margin:0 10px 10px;border-radius:50%;align-items:center;justify-content:center;text-decoration:none;border:#dddddd 2px solid;transition:transform .5s}a[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{transition:transform .5s}a[_ngcontent-%COMP%]:hover{transform:translateY(2px)}a[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%]{transform:scale(1.2)}a[_ngcontent-%COMP%]:hover   .fa-facebook[_ngcontent-%COMP%]{color:#3b5998}a[_ngcontent-%COMP%]:hover   .fa-twitter[_ngcontent-%COMP%]{color:#00acee}a[_ngcontent-%COMP%]:hover   .fa-whatsapp[_ngcontent-%COMP%]{color:#4fce5d}a[_ngcontent-%COMP%]:hover   .fa-instagram[_ngcontent-%COMP%]{color:#f14843}a[_ngcontent-%COMP%]:hover   .fa-youtube[_ngcontent-%COMP%]{color:red}a[_ngcontent-%COMP%]:hover   .fa-dribbble[_ngcontent-%COMP%]{color:#ff69b4}a[_ngcontent-%COMP%]:hover   .fa-linkedin-in[_ngcontent-%COMP%]{color:#3646f8}a[_ngcontent-%COMP%]:hover   .fa-github[_ngcontent-%COMP%]{color:#999}",
              ],
            }));
          }
          return e;
        })(),
        nP = (() => {
          class e {
            constructor() {}
            applyParallax(n) {
              window.addEventListener("mousemove", function r(o) {
                const i = window.innerWidth / 2,
                  s = window.innerHeight / 2,
                  a = o.clientX,
                  u = o.clientY;
                n.style.backgroundPosition = `${70 - (0.01 * (a - i)) / 2}% ${
                  30 - (0.04 * (u - s)) / 2
                }%, ${80 - 0.002 * (a - i)}% ${30 - 0.002 * (u - s)}%, ${
                  80 - 0.006 * (a - i)
                }% ${30 - 0.006 * (u - s)}%`;
              });
            }
            applyParallax1(n) {
              window.addEventListener("mousemove", function r(o) {
                const i = window.innerWidth / 2,
                  s = window.innerHeight / 2,
                  u = o.clientY;
                (n.style.left = 90 + (0.006 * (o.clientX - i)) / 2 + "%"),
                  (n.style.top = 90 + (0.006 * (u - s)) / 2 + "%");
              });
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = x({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })();
      const rP = ["elem"],
        oP = ["elem1"],
        iP = [
          {
            component: (() => {
              class e {
                constructor(n, r) {
                  (this.parallaxService = n),
                    (this.renderer = r),
                    (this.elem = {}),
                    (this.elem1 = {}),
                    (this.mouseX = 0),
                    (this.mouseY = 0),
                    (this.top = 60),
                    (this.left = 60);
                }
                ngAfterViewInit() {
                  this.parallaxService.applyParallax(this.elem.nativeElement),
                    this.renderer.listen("document", "mousemove", (n) => {
                      (this.mouseX = n.clientX),
                        (this.mouseY = n.clientY),
                        this.updatePosition();
                    });
                }
                updatePosition() {
                  (this.elem1.nativeElement.style.top = this.mouseY + "px"),
                    (this.elem1.nativeElement.style.left = this.mouseX + "px");
                }
                static #e = (this.ɵfac = function (r) {
                  return new (r || e)(S(nP), S(go));
                });
                static #t = (this.ɵcmp = _n({
                  type: e,
                  selectors: [["app-home"]],
                  viewQuery: function (r, o) {
                    if ((1 & r && (wl(rP, 5), wl(oP, 5)), 2 & r)) {
                      let i;
                      is((i = ss())) && (o.elem = i.first),
                        is((i = ss())) && (o.elem1 = i.first);
                    }
                  },
                  decls: 34,
                  vars: 4,
                  consts: [
                    [1, "row", "wrapper"],
                    [1, "background"],
                    [1, "pulsate"],
                    [1, "parallax"],
                    ["elem", ""],
                    [1, "circle", "shadow"],
                    ["elem1", ""],
                    [1, "column-one"],
                    [1, "pre-name"],
                    ["role", "img", "aria-label", "wave"],
                    [1, "name"],
                    [1, "p-name"],
                    [1, "p-name2"],
                    [1, "p-first"],
                    [1, "p-second"],
                    ["href", "https://www.vupune.ac.in/"],
                    ["href", "https://www.youtube.com/watch?v=dQw4w9WgXcQ"],
                    [1, "p-third"],
                    [
                      "href",
                      "hhttps://twitter.com/blackshawled",
                      "rel",
                      "nofollow",
                    ],
                    [1, "column-two"],
                  ],
                  template: function (r, o) {
                    1 & r &&
                      (W(0, "div", 0),
                      de(1, "div", 1),
                      W(2, "div", 2),
                      de(3, "div", 3, 4),
                      q(),
                      de(5, "div", 5, 6),
                      W(7, "div", 7)(8, "p", 8)(9, "span", 9),
                      ie(10, "\u{1f44b}"),
                      q(),
                      ie(11, " Hey! my name is"),
                      q(),
                      W(12, "div", 10)(13, "p", 11),
                      ie(14, "Lobhas Paithankar"),
                      W(15, "span", 12),
                      ie(16, "."),
                      q()()(),
                      W(17, "div", 10)(18, "p", 13),
                      ie(
                        19,
                        "I'm a [fairly decent] human from Pune, India who loves problem solving."
                      ),
                      q(),
                      W(20, "p", 14),
                      ie(21, "I'm currently building awesome stuff at "),
                      W(22, "a", 15),
                      ie(23, "Vishwakarma University"),
                      q(),
                      ie(24, ". you can find my "),
                      W(25, "a", 16),
                      ie(26, "resume here"),
                      q(),
                      ie(27, "."),
                      q(),
                      W(28, "p", 17),
                      ie(29, "I go by "),
                      W(30, "a", 18),
                      ie(31, "@blackshawled"),
                      q(),
                      ie(32, " on the interwebs."),
                      q()()(),
                      de(33, "div", 19),
                      q()),
                      2 & r &&
                        ((function Oh(e) {
                          Nh(G(), v(), je() + e, !1);
                        })(5),
                        tl("top", o.top)("left", o.left));
                  },
                  styles: [
                    ".parallax[_ngcontent-%COMP%]{position:absolute;width:100%;height:100vh;background-image:url(background_illus1.18863e9dbd424894.svg);background-size:40vh auto;animation:_ngcontent-%COMP%_shake-lr 17s cubic-bezier(.455,.03,.515,.955) infinite both;background-repeat:no-repeat;background-position:75% 30%}.circle[_ngcontent-%COMP%]{position:absolute;background-color:radial-gradient(111.63% 111.63% at 42.64% -5.82%,#ffa800 33.65%,#ff0000 44.58%,#ff47d6 100%);border-radius:50%;--colors-dreamy-gradients-red: radial-gradient( 111.63% 111.63% at 42.64% -5.82%, #ff0000 33.65%, #ff47d6 44.58%, #ffa800 100% );--colors-dreamy-gradients-purple: linear-gradient( 141.55deg, #575eff -3.79%, #e478ff 82.82% );--colors-dreamy-gradients-blue: radial-gradient( 111.63% 111.63% at 42.64% -5.82%, #00aaff 33.65%, #00aaff 44.58%, #00aaff 100% );--colors-dreamy-gradients-green: linear-gradient( 180deg, #00ff85 0%, rgba(0, 255, 71, 0) 100% );--colors-dreamy-gradients-orange: radial-gradient( 111.63% 111.63% at 42.64% -5.82%, #ffa800 33.65%, #ff0000 44.58%, #ff47d6 100% );text-rendering:optimizelegibility;margin:0;padding:0;box-sizing:border-box;width:10rem;height:10rem;filter:blur(4rem);opacity:.3;background:var(--colors-dreamy-gradients-red)}.shadow[_ngcontent-%COMP%]{position:absolute}@keyframes _ngcontent-%COMP%_scale-in-center{0%{transform:scale(.9)}to{transform:scale(1.2)}}.pulsate[_ngcontent-%COMP%]{position:absolute;width:100%;height:100vh;animation:_ngcontent-%COMP%_heartbeat 8s ease infinite both}@keyframes _ngcontent-%COMP%_heartbeat{0%{transform:scale(1)}50%{transform:scale(.95)}to{transform:scale(1)}}@keyframes _ngcontent-%COMP%_shake-lr{0%,to{transform:rotate(0);transform-origin:100% 100%}10%{transform:rotate(1deg)}20%,40%,60%{transform:rotate(-0deg)}30%,50%,70%{transform:rotate(2deg)}80%{transform:rotate(-1deg)}90%{transform:rotate(1deg)}}.row[_ngcontent-%COMP%]{display:flex}.column-one[_ngcontent-%COMP%]{flex:55%;padding:25vh 10px 0 clamp(50px,8%,200px)}.column-two[_ngcontent-%COMP%]{flex:45%;padding:0 clamp(50px,8%,200px) 0 10px}.column-one[_ngcontent-%COMP%]   *[_ngcontent-%COMP%], .column-two[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{position:relative;word-wrap:break-word;white-space:-moz-pre-wrap;white-space:pre-wrap}p[_ngcontent-%COMP%]{font-size:1rem;line-height:1.3;box-sizing:border-box}.pre-name[_ngcontent-%COMP%]{margin:0;opacity:.7;font-size:1rem}.p-name[_ngcontent-%COMP%]{font-size:4rem;margin:.2em 0 .5em;font-weight:700;color:#ddd}.p-name2[_ngcontent-%COMP%]{font-size:4rem;margin-left:3px;font-weight:700;color:#fff;opacity:.9;background:linear-gradient(-45deg,#02dbeb,#a10ff6,#ffc70d,#fb3232);background-size:300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:_ngcontent-%COMP%_animated_text 3s ease-in-out infinite;-moz-animation:animated_text 3s ease-in-out infinite;-webkit-animation:_ngcontent-%COMP%_animated_text 3s ease-in-out infinite}a[_ngcontent-%COMP%]:link{color:#6b96c3;font-weight:700;text-decoration:none}a[_ngcontent-%COMP%]:visited{color:#6b96c3}a[_ngcontent-%COMP%]:hover{color:#ff69b4}a[_ngcontent-%COMP%]:active{color:#00f}@keyframes _ngcontent-%COMP%_animated_text{0%{background-position:0px 50%}50%{background-position:100% 50%}to{background-position:0px 50%}}",
                  ],
                }));
              }
              return e;
            })(),
            path: "",
          },
          {
            component: (() => {
              class e {
                constructor() {}
                ngOnInit() {
                  new createTree();
                }
                static #e = (this.ɵfac = function (r) {
                  return new (r || e)();
                });
                static #t = (this.ɵcmp = _n({
                  type: e,
                  selectors: [["app-tree"]],
                  decls: 14,
                  vars: 0,
                  consts: [
                    [1, "wrapper"],
                    [1, "background"],
                    [1, "italics", "top"],
                    [
                      "href",
                      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                      "target",
                      "_blank",
                      1,
                      "em",
                    ],
                    ["id", "tree-container"],
                    [1, "instructions"],
                    [1, "bottom-right"],
                    [1, "bottom-center"],
                    [1, "bottom-left"],
                  ],
                  template: function (r, o) {
                    1 & r &&
                      (W(0, "div", 0),
                      de(1, "div", 1),
                      ie(2, " about me "),
                      W(3, "p", 2)(4, "a", 3),
                      ie(5, " about me"),
                      q()(),
                      de(6, "div", 4),
                      W(7, "div", 5)(8, "p", 6),
                      ie(9, " [ click node to expand/collapse ] "),
                      q(),
                      W(10, "p", 7),
                      ie(11, " [ scroll/double click to zoom ] "),
                      q(),
                      W(12, "p", 8),
                      ie(13, " [ click and drag to pan ] "),
                      q()()());
                  },
                  styles: [
                    ".top[_ngcontent-%COMP%]{position:relative;align-items:center;justify-content:center;text-align:center;font-size:20px;font-family:MyFont;color:#ddd;margin:32px;padding:0}.em[_ngcontent-%COMP%]{position:relative;color:#ddd;z-index:999}.instructions[_ngcontent-%COMP%]{position:absolute;bottom:0;display:flex;width:100%;box-sizing:border-box;justify-content:space-between;padding:10px clamp(50px,8%,200px);font-size:10px}.overlay[_ngcontent-%COMP%]{height:100%;width:100%}#tree-container[_ngcontent-%COMP%]{position:absolute;align-items:center;justify-content:center;text-align:center;font-size:20px;font-family:MyFont;color:#ddd;margin:0;padding:0;height:100%;width:100%;top:50%;left:50%;transform:translate(-50%,-50%)}.italics[_ngcontent-%COMP%]{font-family:MyFontItalics}.content[_ngcontent-%COMP%]{flex:1}.container[_ngcontent-%COMP%]{width:100%;height:100vh;display:flex;flex-direction:column}",
                  ],
                }));
              }
              return e;
            })(),
            path: "about",
          },
          { component: tP, path: "contact" },
        ];
      let sP = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = En({ type: e }));
            static #n = (this.ɵinj = sn({ imports: [hD.forRoot(iP), hD] }));
          }
          return e;
        })(),
        aP = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = _n({
              type: e,
              selectors: [["app-header"]],
              decls: 14,
              vars: 0,
              consts: [
                [1, "header", "wrapper"],
                [1, "background"],
                ["routerLink", "", "routerLinkActive", "active"],
                ["routerLink", "about", "routerLinkActive", "active"],
                ["routerLink", "contact", "routerLinkActive", "active"],
                [1, "hr-animate"],
              ],
              template: function (r, o) {
                1 & r &&
                  (W(0, "div", 0),
                  de(1, "div", 1),
                  W(2, "nav")(3, "ul")(4, "li")(5, "a", 2),
                  ie(6, "Home"),
                  q()(),
                  W(7, "li")(8, "a", 3),
                  ie(9, "Projects"),
                  q()(),
                  W(10, "li")(11, "a", 4),
                  ie(12, "Contact"),
                  q()()()(),
                  de(13, "hr", 5),
                  q());
              },
              dependencies: [Js, iD],
              styles: [
                ".header[_ngcontent-%COMP%]{background:#039be5}nav[_ngcontent-%COMP%]{position:relative}.hr-animate[_ngcontent-%COMP%]{position:relative;background:linear-gradient(-45deg,#ee7752,#e73c7e,#23a6d5,#23d5ab);background-size:400% 400%;animation:_ngcontent-%COMP%_gradient 5s ease infinite;height:1px;margin-left:clamp(3.125rem,8%,200px);margin-right:clamp(3.125rem,8%,200px);opacity:.5;border:0}@keyframes _ngcontent-%COMP%_gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}to{background-position:0% 50%}}ul[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:0 clamp(3.125rem,8%,200px) 0 clamp(3.125rem,8%,200px)}li[_ngcontent-%COMP%]{padding:.625vw 3.125vw}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:block}ul[_ngcontent-%COMP%]:hover   li[_ngcontent-%COMP%]{opacity:.2;filter:blur(2px)}a[_ngcontent-%COMP%]{text-decoration:none;color:#ddd}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{opacity:1;filter:blur(0px)}",
              ],
            }));
          }
          return e;
        })(),
        uP = (() => {
          class e {
            constructor() {
              this.title = "portfolio-website";
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = _n({
              type: e,
              selectors: [["app-root"]],
              decls: 4,
              vars: 0,
              consts: [
                [1, "container"],
                [1, "content"],
              ],
              template: function (r, o) {
                1 & r &&
                  (W(0, "div", 0),
                  de(1, "app-header"),
                  W(2, "div", 1),
                  de(3, "router-outlet"),
                  q()());
              },
              dependencies: [Oc, aP],
              styles: [
                '.content[_ngcontent-%COMP%]{flex:1}.container[_ngcontent-%COMP%]{width:100%;height:100vh;display:flex;flex-direction:column}.footer[_ngcontent-%COMP%]{height:20px;background:blue;padding:3px 5px;background-image:url(background.d05b8d5c9a52ce70.png);content:"ssss";background-color:#101010}',
              ],
            }));
          }
          return e;
        })(),
        lP = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = En({ type: e, bootstrap: [uP] }));
            static #n = (this.ɵinj = sn({ imports: [dR, sP] }));
          }
          return e;
        })();
      cR()
        .bootstrapModule(lP)
        .catch((e) => console.error(e));
    },
  },
  (ee) => {
    ee((ee.s = 738));
  },
]);
