var ht = Object.defineProperty;
var wt = (n, e, t) => e in n ? ht(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var p = (n, e, t) => (wt(n, typeof e != "symbol" ? e + "" : e, t), t);
var c = /* @__PURE__ */ ((n) => (n[n.PromiseToArray = 0] = "PromiseToArray", n[n.ArrayOfPromises = 1] = "ArrayOfPromises", n[n.PromiseOfPromises = 2] = "PromiseOfPromises", n))(c || {});
const u = Object.freeze({
  MoreThanOneElement: "Sequence contains more than one element",
  MoreThanOneMatchingElement: "Sequence contains more than one matching element",
  NoElements: "Sequence contains no elements",
  NoMatch: "Sequence contains no matching element"
}), oc = (n, e) => n - e, d = (n, e) => n === e;
class j extends Array {
}
class h {
  constructor(e) {
    this.iterator = e;
  }
  [Symbol.asyncIterator]() {
    return this.iterator();
  }
}
class w {
  constructor(e) {
    p(this, "dataFunc");
    this.dataFunc = e;
  }
  [Symbol.asyncIterator]() {
    const { dataFunc: e } = this;
    async function* t() {
      switch (e.type) {
        case c.ArrayOfPromises:
          for (const r of e.generator())
            yield r;
          break;
        case c.PromiseOfPromises:
          for (const r of await e.generator())
            yield r;
          break;
        case c.PromiseToArray:
        default:
          for (const r of await e.generator())
            yield r;
          break;
      }
    }
    return t();
  }
}
class g {
  constructor(e) {
    this.iterator = e;
  }
  [Symbol.iterator]() {
    return this.iterator();
  }
}
const S = (n) => {
  const e = j.prototype, t = n.prototype, r = Object.getOwnPropertyNames(e);
  for (const s of r)
    t[s] = t[s] ?? e[s];
};
class B extends Error {
  constructor(e) {
    super(e);
  }
  get Message() {
    return this.message;
  }
}
class H extends B {
  constructor(e) {
    super(e), this.name = "ArgumentException", this.stack = this.stack || new Error().stack;
  }
}
class ac extends B {
  constructor(e) {
    super(e), this.name = "ArgumentException", this.stack = this.stack || new Error().stack;
  }
}
class E extends B {
  constructor(e, t) {
    super(`${e} was out of range.` + t), this.paramName = e, this.msg = t, this.name = "ArgumentOutOfRangeException", this.stack = this.stack || new Error().stack;
  }
}
class ic extends B {
  constructor(e) {
    super(`${e} was out of range. Must be non-negative and less than the size of the collection.`), this.paramName = e, this.name = "IndexOutOfRangeException", this.stack = this.stack || new Error().stack;
  }
}
class cc extends B {
}
class f extends B {
  constructor(e) {
    super(e), this.name = "InvalidOperationException", this.stack = this.stack || new Error().stack;
  }
}
class lc extends B {
  constructor(e) {
    super(e), this.name = "NotImplementedException", this.stack = this.stack || new Error().stack;
  }
}
const gt = () => {
  const { prototype: n } = j, e = Object.getOwnPropertyNames(g.prototype);
  for (const t of e)
    n[t] = n[t] ?? g.prototype[t];
  n.All = function(t) {
    return this.every(t);
  }, n.Any = function(t) {
    return t ? this.some(t) : this.length !== 0;
  }, n.Count = function(t) {
    if (t) {
      let r = 0;
      for (let s = 0; s < this.length; s++)
        t(this[s]) === !0 && r++;
      return r;
    } else
      return this.length;
  }, n.ElementAt = function(t) {
    if (t < 0 || t >= this.length)
      throw new E("index");
    return this[t];
  }, n.ElementAtOrDefault = function(t) {
    return this[t] || null;
  }, n.First = function(t) {
    if (t) {
      const r = this.find(t);
      if (r === void 0)
        throw new f(u.NoMatch);
      return r;
    } else {
      if (this.length === 0)
        throw new f(u.NoElements);
      return this[0];
    }
  }, n.FirstOrDefault = function(t) {
    if (t) {
      const r = this.find(t);
      return r === void 0 ? null : r;
    } else
      return this.length === 0 ? null : this[0];
  }, n.Last = function(t) {
    if (t) {
      for (let r = this.length - 1; r >= 0; r--) {
        const s = this[r];
        if (t(s) === !0)
          return s;
      }
      throw new f(u.NoMatch);
    } else {
      if (this.length === 0)
        throw new f(u.NoElements);
      return this[this.length - 1];
    }
  }, n.LastOrDefault = function(t) {
    if (t) {
      for (let r = this.length - 1; r >= 0; r--) {
        const s = this[r];
        if (t(s) === !0)
          return s;
      }
      return null;
    } else
      return this.length === 0 ? null : this[this.length - 1];
  }, n.Max = function(t) {
    if (this.length === 0)
      throw new f(u.NoElements);
    if (t) {
      let r = Number.NEGATIVE_INFINITY;
      for (let s = 0; s < this.length; s++)
        r = Math.max(t(this[s]), r);
      return r;
    } else
      return Math.max.apply(null, this);
  }, n.Min = function(t) {
    if (this.length === 0)
      throw new f(u.NoElements);
    if (t) {
      let r = Number.POSITIVE_INFINITY;
      for (let s = 0; s < this.length; s++)
        r = Math.min(t(this[s]), r);
      return r;
    } else
      return Math.min.apply(null, this);
  }, n.Reverse = function() {
    return Array.prototype.reverse.apply(this), this;
  };
}, mt = (n, e, t, r) => {
  if (r) {
    if (!t)
      throw new ReferenceError("TAccumulate function is undefined");
    return dt(n, e, t, r);
  } else
    return t ? At(n, e, t) : pt(n, e);
}, pt = (n, e) => {
  let t;
  for (const r of n)
    t ? t = e(t, r) : t = r;
  if (t === void 0)
    throw new f(u.NoElements);
  return t;
}, At = (n, e, t) => {
  let r = e;
  for (const s of n)
    r = t(r, s);
  return r;
}, dt = (n, e, t, r) => {
  let s = e;
  for (const o of n)
    s = t(s, o);
  return r(s);
}, vt = (n, e) => {
  for (const t of n)
    if (e(t) === !1)
      return !1;
  return !0;
}, Pt = async (n, e) => {
  for (const t of n)
    if (await e(t) === !1)
      return !1;
  return !0;
}, kt = (n, e) => e ? Tt(n, e) : $t(n), $t = (n) => {
  for (const e of n)
    return !0;
  return !1;
}, Tt = (n, e) => {
  for (const t of n)
    if (e(t) === !0)
      return !0;
  return !1;
}, Ot = async (n, e) => {
  for (const t of n)
    if (await e(t) === !0)
      return !0;
  return !1;
}, A = (n) => {
  if (Array.isArray(n)) {
    if (n.length === 0)
      throw new f(u.NoElements);
    return new h(async function* () {
      for await (const e of n)
        yield e;
    });
  } else
    return new h(n);
}, It = (n) => {
  async function* e() {
    for (const t of n)
      yield t;
  }
  return A(e);
}, it = (n, e) => new w({
  generator: e,
  type: n
}), Mt = (n) => {
  const e = async () => {
    const t = [];
    for (const r of n)
      t.push(r);
    return t;
  };
  return it(c.PromiseToArray, e);
}, Et = (n, e) => e ? xt(n, e) : bt(n), bt = (n) => {
  let e, t;
  for (const r of n)
    e = (e || 0) + r, t = (t || 0) + 1;
  if (e === void 0)
    throw new f(u.NoElements);
  return e / t;
}, xt = (n, e) => {
  let t, r;
  for (const s of n)
    t = (t || 0) + e(s), r = (r || 0) + 1;
  if (t === void 0)
    throw new f(u.NoElements);
  return t / r;
}, St = async (n, e) => {
  let t, r;
  for (const s of n)
    t = (t || 0) + await e(s), r = (r || 0) + 1;
  if (t === void 0)
    throw new f(u.NoElements);
  return t / r;
}, Nt = (n, e) => {
  function* t() {
    yield* n, yield* e;
  }
  return new g(t);
}, Vt = (n, e, t = d) => {
  for (const r of n)
    if (t(e, r))
      return !0;
  return !1;
}, Dt = async (n, e, t) => {
  for (const r of n)
    if (await t(e, r))
      return !0;
  return !1;
}, Ft = (n, e) => e ? Bt(n, e) : _t(n), _t = (n) => {
  let e = 0;
  for (const t of n)
    e++;
  return e;
}, Bt = (n, e) => {
  let t = 0;
  for (const r of n)
    e(r) === !0 && t++;
  return t;
}, Rt = async (n, e) => {
  let t = 0;
  for (const r of n)
    await e(r) === !0 && t++;
  return t;
}, Wt = (n, e = d) => {
  function* t() {
    const r = [];
    for (const s of n)
      r.find((a) => e(a, s)) || (r.push(s), yield s);
  }
  return new g(t);
}, Kt = (n, e) => {
  async function* t() {
    const r = [];
    t:
      for (const s of n) {
        for (const o of r)
          if (await e(o, s))
            continue t;
        r.push(s), yield s;
      }
  }
  return A(t);
}, jt = (n, e) => {
  function* t() {
    for (const r of n)
      e(r), yield r;
  }
  return new g(t);
}, qt = (n, e) => {
  async function* t() {
    for (const r of n)
      await e(r), yield r;
  }
  return A(t);
}, Lt = (n, e) => {
  if (e < 0)
    throw new E("index");
  let t = 0;
  for (const r of n)
    if (e === t++)
      return r;
  throw new E("index");
}, Ct = (n, e) => {
  let t = 0;
  for (const r of n)
    if (e === t++)
      return r;
  return null;
}, zt = (n, e, t = d) => {
  function* r() {
    const s = [...e];
    for (const o of n) {
      let a = !1;
      for (let i = 0; i < s.length; i++) {
        const l = s[i];
        if (t(o, l) === !0) {
          a = !0;
          break;
        }
      }
      a === !1 && (yield o);
    }
  }
  return new g(r);
}, Ut = (n, e, t) => {
  async function* r() {
    const s = [...e];
    for (const o of n) {
      let a = !1;
      for (let i = 0; i < s.length; i++) {
        const l = s[i];
        if (await t(o, l) === !0) {
          a = !0;
          break;
        }
      }
      a === !1 && (yield o);
    }
  }
  return A(r);
}, Gt = (n, e) => e ? Zt(n, e) : Yt(n), Yt = (n) => {
  const e = n[Symbol.iterator]().next();
  if (e.done === !0)
    throw new f(u.NoElements);
  return e.value;
}, Zt = (n, e) => {
  for (const t of n)
    if (e(t) === !0)
      return t;
  throw new f(u.NoMatch);
}, Jt = async (n, e) => {
  for (const t of n)
    if (await e(t) === !0)
      return t;
  throw new f(u.NoMatch);
}, Ht = (n, e) => e ? Qt(n, e) : Xt(n), Xt = (n) => n[Symbol.iterator]().next().value || null, Qt = (n, e) => {
  for (const t of n)
    if (e(t) === !0)
      return t;
  return null;
}, te = async (n, e) => {
  for (const t of n)
    if (await e(t) === !0)
      return t;
  return null;
};
class v extends j {
  constructor(t, r) {
    super(1);
    p(this, "key");
    this.key = t, this[0] = r;
  }
}
const ee = (n, e, t) => function* () {
  const s = new Array();
  for (const o of n) {
    const a = e(o);
    let i = !1;
    for (let l = 0; l < s.length; l++) {
      const y = s[l];
      if (t(y.key, a)) {
        y.push(o), i = !0;
        break;
      }
    }
    i === !1 && s.push(new v(a, o));
  }
  for (const o of s)
    yield o;
}, ne = (n, e) => function* () {
  const r = {};
  for (const s of n) {
    const o = e(s), a = r[o];
    a ? a.push(s) : r[o] = new v(o, s);
  }
  for (const s in r)
    yield r[s];
}, re = (n, e, t) => {
  function* r() {
    const s = {};
    for (const o of n) {
      const a = e(o), i = s[a], l = t(o);
      i ? i.push(l) : s[a] = new v(a, l);
    }
    for (const o in s)
      yield s[o];
  }
  return new g(r);
}, se = (n, e, t, r) => {
  function* s() {
    const o = new Array();
    for (const a of n) {
      const i = e(a);
      let l = !1;
      for (let y = 0; y < o.length; y++) {
        const m = o[y];
        if (r(m.key, i)) {
          m.push(t(a)), l = !0;
          break;
        }
      }
      if (l === !1) {
        const y = t(a);
        o.push(new v(i, y));
      }
    }
    for (const a of o)
      yield a;
  }
  return new g(s);
}, oe = (n, e, t) => {
  let r;
  return t ? r = ee(
    n,
    e,
    t
  ) : r = ne(
    n,
    e
  ), new g(r);
}, ae = (n, e, t) => t ? ce(n, e, t) : ie(
  n,
  e
), ie = (n, e) => {
  async function* t() {
    const r = {};
    for (const s of n) {
      const o = await e(s), a = r[o];
      a ? a.push(s) : r[o] = new v(o, s);
    }
    for (const s in r)
      yield r[s];
  }
  return A(t);
}, ce = (n, e, t) => {
  async function* r() {
    const s = new Array();
    for (const o of n) {
      const a = await e(o);
      let i = !1;
      for (let l = 0; l < s.length; l++) {
        const y = s[l];
        if (await t(y.key, a) === !0) {
          y.push(o), i = !0;
          break;
        }
      }
      i === !1 && s.push(new v(a, o));
    }
    for (const o of s)
      yield o;
  }
  return A(r);
}, le = (n, e, t, r) => r ? se(
  n,
  e,
  t,
  r
) : re(
  n,
  e,
  t
), ue = (n, e, t = d) => {
  function* r() {
    const s = [...n.Distinct(t)];
    if (s.length === 0)
      return;
    const o = [...e];
    for (let a = 0; a < s.length; a++) {
      const i = s[a];
      for (let l = 0; l < o.length; l++) {
        const y = o[l];
        if (t(i, y) === !0) {
          yield i;
          break;
        }
      }
    }
  }
  return new g(r);
}, fe = (n, e, t) => {
  async function* r() {
    const s = [];
    for await (const a of n.DistinctAsync(t))
      s.push(a);
    if (s.length === 0)
      return;
    const o = [...e];
    for (let a = 0; a < s.length; a++) {
      const i = s[a];
      for (let l = 0; l < o.length; l++) {
        const y = o[l];
        if (await t(i, y) === !0) {
          yield i;
          break;
        }
      }
    }
  }
  return A(r);
}, ye = (n, e, t, r, s, o = d) => {
  function* a() {
    const i = [...e];
    for (const l of n) {
      const y = t(l);
      for (const m of i) {
        const T = r(m);
        o(y, T) === !0 && (yield s(l, m));
      }
    }
  }
  return new g(a);
}, he = (n, e) => e ? ge(n, e) : we(n), we = (n) => {
  let e;
  for (const t of n)
    e = t;
  if (!e)
    throw new f(u.NoElements);
  return e;
}, ge = (n, e) => {
  let t;
  for (const r of n)
    e(r) === !0 && (t = r);
  if (!t)
    throw new f(u.NoMatch);
  return t;
}, me = async (n, e) => {
  let t;
  for (const r of n)
    await e(r) === !0 && (t = r);
  if (!t)
    throw new f(u.NoMatch);
  return t;
}, pe = (n, e) => e ? de(n, e) : Ae(n), Ae = (n) => {
  let e = null;
  for (const t of n)
    e = t;
  return e;
}, de = (n, e) => {
  let t = null;
  for (const r of n)
    e(r) === !0 && (t = r);
  return t;
}, ve = async (n, e) => {
  let t = null;
  for (const r of n)
    await e(r) === !0 && (t = r);
  return t;
}, Pe = (n, e) => e ? $e(n, e) : ke(n), ke = (n) => {
  let e = null;
  for (const t of n)
    e = Math.max(e || Number.NEGATIVE_INFINITY, t);
  if (e === null)
    throw new f(u.NoElements);
  return e;
}, $e = (n, e) => {
  let t = null;
  for (const r of n)
    t = Math.max(t || Number.NEGATIVE_INFINITY, e(r));
  if (t === null)
    throw new f(u.NoElements);
  return t;
}, Te = async (n, e) => {
  let t = null;
  for (const r of n)
    t = Math.max(t || Number.NEGATIVE_INFINITY, await e(r));
  if (t === null)
    throw new f(u.NoElements);
  return t;
}, Oe = (n, e) => e ? Me(n, e) : Ie(n), Ie = (n) => {
  let e = null;
  for (const t of n)
    e = Math.min(e || Number.POSITIVE_INFINITY, t);
  if (e === null)
    throw new f(u.NoElements);
  return e;
}, Me = (n, e) => {
  let t = null;
  for (const r of n)
    t = Math.min(t || Number.POSITIVE_INFINITY, e(r));
  if (t === null)
    throw new f(u.NoElements);
  return t;
}, Ee = async (n, e) => {
  let t = null;
  for (const r of n)
    t = Math.min(t || Number.POSITIVE_INFINITY, await e(r));
  if (t === null)
    throw new f(u.NoElements);
  return t;
}, be = (n, e) => {
  const t = typeof e == "string" ? (s) => typeof s === e : (s) => s instanceof e;
  function* r() {
    for (const s of n)
      t(s) && (yield s);
  }
  return new g(r);
}, xe = async (n, e) => {
  const t = /* @__PURE__ */ new Map();
  for await (const r of n) {
    const s = await e(r), o = t.get(s);
    o ? o.push(r) : t.set(s, [r]);
  }
  return t;
};
async function* Se(n, e, t, r) {
  const s = await xe(n, e), o = [...s.keys()].sort(r || void 0);
  if (t)
    for (let a = 0; a < o.length; a++)
      yield s.get(o[a]);
  else
    for (let a = o.length - 1; a >= 0; a--)
      yield s.get(o[a]);
}
const Ne = async (n, e) => {
  const t = /* @__PURE__ */ new Map();
  for (const r of n) {
    const s = await e(r), o = t.get(s);
    o ? o.push(r) : t.set(s, [r]);
  }
  return t;
};
async function* Ve(n, e, t, r) {
  const s = await Ne(n, e), o = [...s.keys()].sort(r || void 0);
  if (t)
    for (let a = 0; a < o.length; a++)
      yield s.get(o[a]);
  else
    for (let a = o.length - 1; a >= 0; a--)
      yield s.get(o[a]);
}
const De = async (n, e) => {
  const t = /* @__PURE__ */ new Map();
  for await (const r of n) {
    const s = e(r), o = t.get(s);
    o ? o.push(r) : t.set(s, [r]);
  }
  return t;
};
async function* Fe(n, e, t, r) {
  const s = await De(n, e), o = [...s.keys()].sort(r || void 0);
  if (t)
    for (let a = 0; a < o.length; a++)
      yield s.get(o[a]);
  else
    for (let a = o.length - 1; a >= 0; a--)
      yield s.get(o[a]);
}
const _e = (n, e) => {
  const t = /* @__PURE__ */ new Map();
  for (const r of n) {
    const s = e(r), o = t.get(s);
    o ? o.push(r) : t.set(s, [r]);
  }
  return t;
};
function* Be(n, e, t, r) {
  const s = _e(n, e), o = [...s.keys()].sort(r || void 0);
  if (t)
    for (let a = 0; a < o.length; a++)
      yield s.get(o[a]);
  else
    for (let a = o.length - 1; a >= 0; a--)
      yield s.get(o[a]);
}
class O extends h {
  constructor(e) {
    super(async function* () {
      for await (const t of e())
        yield* t;
    }), this.orderedPairs = e;
  }
  static generateAsync(e, t, r, s) {
    let o;
    return e instanceof O ? o = async function* () {
      for await (const a of e.orderedPairs())
        yield* Ve(a, t, r, s);
    } : o = () => Se(e, t, r, s), new O(o);
  }
  static generate(e, t, r, s) {
    let o;
    return e instanceof O ? o = async function* () {
      for await (const a of e.orderedPairs())
        yield* Be(a, t, r, s);
    } : o = () => Fe(e, t, r, s), new O(o);
  }
  ThenBy(e, t) {
    return O.generate(this, e, !0, t);
  }
  ThenByAsync(e, t) {
    return O.generateAsync(this, e, !0, t);
  }
  ThenByDescending(e, t) {
    return O.generate(this, e, !1, t);
  }
  ThenByDescendingAsync(e, t) {
    return O.generateAsync(this, e, !1, t);
  }
}
const Re = (n, e) => {
  const t = /* @__PURE__ */ new Map();
  for (const r of n) {
    const s = e(r), o = t.get(s);
    o ? o.push(r) : t.set(s, [r]);
  }
  return t;
};
function* X(n, e, t, r) {
  const s = Re(n, e), o = [...s.keys()].sort(r || void 0);
  if (t)
    for (let a = 0; a < o.length; a++)
      yield s.get(o[a]);
  else
    for (let a = o.length - 1; a >= 0; a--)
      yield s.get(o[a]);
}
const We = async (n, e) => {
  const t = /* @__PURE__ */ new Map();
  for (const r of n) {
    const s = await e(r), o = t.get(s);
    o ? o.push(r) : t.set(s, [r]);
  }
  return t;
};
async function* Q(n, e, t, r) {
  const s = await We(n, e), o = [...s.keys()].sort(r || void 0);
  if (t)
    for (let a = 0; a < o.length; a++)
      yield s.get(o[a]);
  else
    for (let a = o.length - 1; a >= 0; a--)
      yield s.get(o[a]);
}
class M extends g {
  constructor(e) {
    super(function* () {
      for (const t of e())
        yield* t;
    }), this.orderedPairs = e;
  }
  static generate(e, t, r, s) {
    let o;
    return e instanceof M ? o = function* () {
      for (const a of e.orderedPairs())
        yield* X(a, t, r, s);
    } : o = () => X(e, t, r, s), new M(o);
  }
  static generateAsync(e, t, r, s) {
    let o;
    return e instanceof M ? o = async function* () {
      for (const a of e.orderedPairs())
        yield* Q(a, t, r, s);
    } : o = () => Q(e, t, r, s), new O(o);
  }
  ThenBy(e, t) {
    return M.generate(this, e, !0, t);
  }
  ThenByAsync(e, t) {
    return M.generateAsync(this, e, !0, t);
  }
  ThenByDescending(e, t) {
    return M.generate(this, e, !1, t);
  }
  ThenByDescendingAsync(e, t) {
    return M.generateAsync(this, e, !1, t);
  }
}
const Ke = (n, e, t) => M.generate(n, e, !0, t), je = (n, e, t) => M.generateAsync(n, e, !0, t), qe = (n, e, t) => M.generate(n, e, !1, t), Le = (n, e, t) => M.generateAsync(n, e, !1, t), Ce = (n, e) => {
  const t = [], r = [];
  for (const s of n)
    e(s) === !0 ? r.push(s) : t.push(s);
  return [r, t];
}, ze = async (n, e) => {
  const t = [], r = [];
  for (const s of n)
    await e(s) === !0 ? r.push(s) : t.push(s);
  return [r, t];
}, Ue = (n) => {
  function* e() {
    const t = [...n];
    for (let r = t.length - 1; r >= 0; r--)
      yield t[r];
  }
  return new g(e);
}, Ge = (n, e) => {
  if (typeof e == "function") {
    const { length: t } = e;
    return t === 1 ? Ye(n, e) : Ze(n, e);
  } else
    return Je(n, e);
}, Ye = (n, e) => {
  function* t() {
    for (const r of n)
      yield e(r);
  }
  return new g(t);
}, Ze = (n, e) => {
  function* t() {
    let r = 0;
    for (const s of n)
      yield e(s, r), r++;
  }
  return new g(t);
}, Je = (n, e) => {
  function* t() {
    for (const r of n)
      yield r[e];
  }
  return new g(t);
}, He = (n) => n, Xe = (n, e) => typeof e == "function" ? e.length === 1 ? Qe(n, e) : tn(n, e) : en(n, e), Qe = (n, e) => {
  async function* t() {
    for (const r of n)
      yield e(r);
  }
  return A(t);
}, tn = (n, e) => {
  async function* t() {
    let r = 0;
    for (const s of n)
      yield e(s, r), r++;
  }
  return A(t);
}, en = (n, e) => {
  async function* t() {
    for (const r of n)
      yield r[e];
  }
  return A(t);
}, nn = (n, e) => typeof e == "function" ? e.length === 1 ? rn(n, e) : sn(n, e) : on(n, e), rn = (n, e) => {
  function* t() {
    for (const r of n)
      for (const s of e(r))
        yield s;
  }
  return new g(t);
}, sn = (n, e) => {
  function* t() {
    let r = 0;
    for (const s of n) {
      for (const o of e(s, r))
        yield o;
      r++;
    }
  }
  return new g(t);
}, on = (n, e) => {
  function* t() {
    for (const r of n)
      for (const s of r[e])
        yield s;
  }
  return new g(t);
}, an = (n, e) => e.length === 1 ? cn(n, e) : ln(n, e), cn = (n, e) => {
  async function* t() {
    for (const r of n) {
      const s = await e(r);
      for (const o of s)
        yield o;
    }
  }
  return A(t);
}, ln = (n, e) => {
  async function* t() {
    let r = 0;
    for (const s of n) {
      const o = await e(s, r);
      for (const a of o)
        yield a;
      r++;
    }
  }
  return A(t);
}, un = (n, e, t = d) => {
  const r = n[Symbol.iterator](), s = e[Symbol.iterator]();
  let o = r.next(), a = s.next();
  for (; !o.done && !a.done; ) {
    if (!t(o.value, a.value))
      return !1;
    o = r.next(), a = s.next();
  }
  return o.done === !0 && a.done === !0;
}, fn = async (n, e, t) => {
  const r = n[Symbol.iterator](), s = e[Symbol.iterator]();
  let o = r.next(), a = s.next();
  for (; !o.done && !a.done; ) {
    if (await t(o.value, a.value) === !1)
      return !1;
    o = r.next(), a = s.next();
  }
  return o.done === !0 && a.done === !0;
}, yn = (n, e) => e ? wn(n, e) : hn(n), hn = (n) => {
  let e = !1, t = null;
  for (const r of n) {
    if (e === !0)
      throw new f(u.MoreThanOneElement);
    e = !0, t = r;
  }
  if (e === !1)
    throw new f(u.NoElements);
  return t;
}, wn = (n, e) => {
  let t = !1, r = null;
  for (const s of n)
    if (e(s)) {
      if (t === !0)
        throw new f(u.MoreThanOneMatchingElement);
      t = !0, r = s;
    }
  if (t === !1)
    throw new f(u.NoMatch);
  return r;
}, gn = async (n, e) => {
  let t = !1, r = null;
  for (const s of n)
    if (await e(s)) {
      if (t === !0)
        throw new f(u.MoreThanOneMatchingElement);
      t = !0, r = s;
    }
  if (t === !1)
    throw new f(u.NoMatch);
  return r;
}, mn = (n, e) => e ? An(n, e) : pn(n), pn = (n) => {
  let e = !1, t = null;
  for (const r of n) {
    if (e === !0)
      throw new f(u.MoreThanOneElement);
    e = !0, t = r;
  }
  return t;
}, An = (n, e) => {
  let t = !1, r = null;
  for (const s of n)
    if (e(s)) {
      if (t === !0)
        throw new f(u.MoreThanOneMatchingElement);
      t = !0, r = s;
    }
  return r;
}, dn = async (n, e) => {
  let t = !1, r = null;
  for (const s of n)
    if (await e(s)) {
      if (t === !0)
        throw new f(u.MoreThanOneElement);
      t = !0, r = s;
    }
  return r;
}, vn = (n, e) => {
  function* t() {
    let r = 0;
    for (const s of n)
      r++ >= e && (yield s);
  }
  return new g(t);
}, Pn = (n, e) => e.length === 1 ? kn(n, e) : $n(n, e), kn = (n, e) => {
  function* t() {
    let r = !0;
    for (const s of n)
      r === !1 ? yield s : e(s) === !1 && (r = !1, yield s);
  }
  return new g(t);
}, $n = (n, e) => {
  function* t() {
    let r = 0, s = !0;
    for (const o of n)
      s === !1 ? yield o : e(o, r) === !1 && (s = !1, yield o), r++;
  }
  return new g(t);
}, Tn = (n, e) => e.length === 1 ? On(n, e) : In(n, e), On = (n, e) => {
  async function* t() {
    let r = !0;
    for (const s of n)
      r === !1 ? yield s : await e(s) === !1 && (r = !1, yield s);
  }
  return A(t);
}, In = (n, e) => {
  async function* t() {
    let r = 0, s = !0;
    for (const o of n)
      s === !1 ? yield o : await e(o, r) === !1 && (s = !1, yield o), r++;
  }
  return A(t);
}, Mn = (n, e) => e ? bn(n, e) : En(n), En = (n) => {
  let e = 0;
  for (const t of n)
    e += t;
  return e;
}, bn = (n, e) => {
  let t = 0;
  for (const r of n)
    t += e(r);
  return t;
}, xn = async (n, e) => {
  let t = 0;
  for (const r of n)
    t += await e(r);
  return t;
}, Sn = (n, e) => {
  function* t() {
    let r = e > 0 ? e : 0;
    for (const s of n) {
      if (r-- === 0)
        break;
      yield s;
    }
  }
  return new g(t);
}, Nn = (n, e) => e.length === 1 ? Vn(n, e) : Dn(n, e), Vn = (n, e) => {
  function* t() {
    for (const r of n)
      if (e(r))
        yield r;
      else
        break;
  }
  return new g(t);
}, Dn = (n, e) => {
  function* t() {
    let r = 0;
    for (const s of n)
      if (e(s, r++))
        yield s;
      else
        break;
  }
  return new g(t);
}, Fn = (n, e) => e.length === 1 ? _n(n, e) : Bn(n, e), _n = (n, e) => {
  async function* t() {
    for (const r of n)
      if (await e(r))
        yield r;
      else
        break;
  }
  return A(t);
}, Bn = (n, e) => {
  async function* t() {
    let r = 0;
    for (const s of n)
      if (await e(s, r++))
        yield s;
      else
        break;
  }
  return A(t);
}, Rn = (n) => [...n], Wn = (n, e) => {
  const t = /* @__PURE__ */ new Map();
  for (const r of n) {
    const s = e(r), o = t.get(s);
    o === void 0 ? t.set(s, [r]) : o.push(r);
  }
  return t;
}, Kn = async (n, e) => {
  const t = /* @__PURE__ */ new Map();
  for (const r of n) {
    const s = await e(r), o = t.get(s);
    o === void 0 ? t.set(s, [r]) : o.push(r);
  }
  return t;
}, jn = (n, e) => {
  const t = {};
  for (const r of n)
    t[e(r)] = r;
  return t;
}, qn = async (n, e) => {
  const t = {};
  for (const r of n)
    t[await e(r)] = r;
  return t;
}, Ln = (n) => new Set(n), Cn = (n, e, t) => t ? Un(n, e, t) : zn(n, e), zn = (n, e) => {
  function* t() {
    const r = /* @__PURE__ */ new Set();
    for (const s of n)
      r.has(s) === !1 && (yield s, r.add(s));
    for (const s of e)
      r.has(s) === !1 && (yield s, r.add(s));
  }
  return new g(t);
}, Un = (n, e, t) => {
  function* r() {
    const s = [];
    for (const o of [n, e])
      for (const a of o) {
        let i = !1;
        for (const l of s)
          if (t(a, l) === !0) {
            i = !0;
            break;
          }
        i === !1 && (yield a, s.push(a));
      }
  }
  return new g(r);
}, Gn = (n, e, t) => {
  async function* r() {
    const s = [];
    for (const o of [n, e])
      for (const a of o) {
        let i = !1;
        for (const l of s)
          if (await t(a, l) === !0) {
            i = !0;
            break;
          }
        i === !1 && (yield a, s.push(a));
      }
  }
  return A(r);
}, Yn = (n, e) => e.length === 1 ? Zn(n, e) : Jn(n, e), Zn = (n, e) => {
  function* t() {
    for (const r of n)
      e(r) === !0 && (yield r);
  }
  return new g(t);
}, Jn = (n, e) => {
  function* t() {
    let r = 0;
    for (const s of n)
      e(s, r++) === !0 && (yield s);
  }
  return new g(t);
}, Hn = (n, e) => e.length === 1 ? Xn(n, e) : Qn(n, e), Xn = (n, e) => {
  async function* t() {
    for (const r of n)
      await e(r) === !0 && (yield r);
  }
  return A(t);
}, Qn = (n, e) => {
  async function* t() {
    let r = 0;
    for (const s of n)
      await e(s, r++) === !0 && (yield s);
  }
  return A(t);
}, tr = (n, e, t) => t ? nr(n, e, t) : er(n, e), er = (n, e) => {
  function* t() {
    const r = n[Symbol.iterator](), s = e[Symbol.iterator]();
    for (; ; ) {
      const o = r.next(), a = s.next();
      if (o.done && a.done)
        break;
      yield [o.value, a.value];
    }
  }
  return new g(t);
}, nr = (n, e, t) => {
  function* r() {
    const s = n[Symbol.iterator](), o = e[Symbol.iterator]();
    for (; ; ) {
      const a = s.next(), i = o.next();
      if (a.done && i.done)
        break;
      yield t(a.value, i.value);
    }
  }
  return new g(r);
}, rr = (n, e, t) => {
  async function* r() {
    const s = n[Symbol.iterator](), o = e[Symbol.iterator]();
    for (; ; ) {
      const a = s.next(), i = o.next();
      if (a.done && i.done)
        break;
      yield t(a.value, i.value);
    }
  }
  return A(r);
}, uc = function(n) {
  return n == null || n.length === 0;
}, fc = function(n) {
  return n == null || n.length == 0 ? !0 : n.trim() == "";
}, yc = function(n, e) {
  return n == null && e == null ? !0 : n == null || e == null ? !1 : typeof n == "object" && n.constructor.op_Equality ? n.constructor.op_Equality(n, e) : n == e;
}, sr = function(n, e) {
  return n == null && e == null ? !0 : n == null || e == null ? !1 : n.constructor.op_Equality(n, e);
}, hc = function(n, e) {
  return !sr(n, e);
}, wc = function(n) {
  let e = new Uint16Array(n.length);
  for (let t = 0; t < n.length; t++)
    e[t] = n.charCodeAt(t);
  return e;
}, or = function(n, e, t, r, s) {
  let o = e, a = e + t - 1;
  for (; o <= a; ) {
    let i = o + (a - o >> 1), l = s.Compare(n[i], r);
    if (l == 0)
      return i;
    l < 0 ? o = i + 1 : a = i - 1;
  }
  return ~o;
};
class z extends j {
  constructor(e) {
    if (super(), e && typeof e != "number")
      for (let t of e)
        this.push(t);
  }
  Init(e) {
    for (const t of e)
      this.push(t);
    return this;
  }
  Add(e) {
    this.push(e);
  }
  AddRange(e) {
    for (const t of e)
      this.push(t);
  }
  Remove(e) {
    let t = this.indexOf(e);
    return t >= 0 && this.splice(t, 1), t >= 0;
  }
  RemoveAll(e) {
    for (let t = this.length - 1; t >= 0; t--)
      e(this[t]) && this.splice(t, 1);
  }
  IndexOf(e) {
    return this.indexOf(e);
  }
  Insert(e, t) {
    this.splice(e, 0, t);
  }
  RemoveAt(e) {
    this.splice(e, 1);
  }
  RemoveRange(e, t) {
    this.splice(e, t);
  }
  Clear() {
    this.splice(0);
  }
  Find(e) {
    for (let t = 0; t < this.length; t++)
      if (e(this[t]))
        return this[t];
    return null;
  }
  Sort(e) {
    this.sort(e);
  }
  BinarySearch(e, t) {
    return or(this, 0, this.length, e, t);
  }
}
const Y = (n) => {
  const e = n.prototype, t = (r, s) => {
    const o = function(...a) {
      return r(this, ...a);
    };
    Object.defineProperty(o, "length", { value: r.length - 1 }), e[s] = o;
  };
  t(mt, "Aggregate"), t(vt, "All"), t(Pt, "AllAsync"), t(kt, "Any"), t(Ot, "AnyAsync"), t(It, "AsAsync"), t(Mt, "AsParallel"), t(Et, "Average"), t(St, "AverageAsync"), t(Nt, "Concat"), t(Vt, "Contains"), t(Dt, "ContainsAsync"), t(Ft, "Count"), t(Rt, "CountAsync"), t(Wt, "Distinct"), t(Kt, "DistinctAsync"), t(jt, "Each"), t(qt, "EachAsync"), t(Lt, "ElementAt"), t(Ct, "ElementAtOrDefault"), t(zt, "Except"), t(Ut, "ExceptAsync"), t(Gt, "First"), t(Jt, "FirstAsync"), t(Ht, "FirstOrDefault"), t(te, "FirstOrDefaultAsync"), t(oe, "GroupBy"), t(ae, "GroupByAsync"), t(le, "GroupByWithSel"), t(ue, "Intersect"), t(fe, "IntersectAsync"), t(ye, "JoinByKey"), t(he, "Last"), t(me, "LastAsync"), t(pe, "LastOrDefault"), t(ve, "LastOrDefaultAsync"), t(Pe, "Max"), t(Te, "MaxAsync"), t(Oe, "Min"), t(Ee, "MinAsync"), t(be, "OfType"), t(Ke, "OrderBy"), t(je, "OrderByAsync"), t(qe, "OrderByDescending"), t(Le, "OrderByDescendingAsync"), t(Ue, "Reverse"), t(Ge, "Select"), t(Xe, "SelectAsync"), t(nn, "SelectMany"), t(an, "SelectManyAsync"), t(un, "SequenceEquals"), t(fn, "SequenceEqualsAsync"), t(yn, "Single"), t(gn, "SingleAsync"), t(mn, "SingleOrDefault"), t(dn, "SingleOrDefaultAsync"), t(vn, "Skip"), t(Pn, "SkipWhile"), t(Tn, "SkipWhileAsync"), t(Mn, "Sum"), t(xn, "SumAsync"), t(Sn, "Take"), t(Nn, "TakeWhile"), t(Fn, "TakeWhileAsync"), t(Rn, "ToArray"), t(Wn, "ToMap"), t(Kn, "ToMapAsync"), t(jn, "ToObject"), t(qn, "ToObjectAsync"), t(Ce, "Partition"), t(ze, "PartitionAsync"), t(Ln, "ToSet"), t(Cn, "Union"), t(Gn, "UnionAsync"), t(Yn, "Where"), t(Hn, "WhereAsync"), t(tr, "Zip"), t(rr, "ZipAsync"), t(He, "Cast"), t((r) => r instanceof z ? r : new z([...r]), "ToList"), t((r) => new zi(r), "GetEnumerator");
}, ar = (n, e, t, r) => {
  if (r) {
    if (!t)
      throw new ReferenceError("TAccumulate function is undefined");
    return lr(n, e, t, r);
  } else
    return t ? cr(n, e, t) : ir(n, e);
}, ir = async (n, e) => {
  let t;
  for await (const r of n)
    t ? t = e(t, r) : t = r;
  if (t === void 0)
    throw new f(u.NoElements);
  return t;
}, cr = async (n, e, t) => {
  let r = e;
  for await (const s of n)
    r = t(r, s);
  return r;
}, lr = async (n, e, t, r) => {
  let s = e;
  for await (const o of n)
    s = t(s, o);
  return r(s);
}, ur = async (n, e) => {
  for await (const t of n)
    if (e(t) === !1)
      return !1;
  return !0;
}, fr = async (n, e) => {
  for await (const t of n)
    if (await e(t) === !1)
      return !1;
  return !0;
}, yr = (n, e) => e ? wr(n, e) : hr(n), hr = async (n) => {
  for await (const e of n)
    return !0;
  return !1;
}, wr = async (n, e) => {
  for await (const t of n)
    if (e(t) === !0)
      return !0;
  return !1;
}, gr = async (n, e) => {
  for await (const t of n)
    if (await e(t) === !0)
      return !0;
  return !1;
}, mr = (n) => {
  const e = async () => {
    const t = [];
    for await (const r of n)
      t.push(r);
    return t;
  };
  return it(c.PromiseToArray, e);
}, pr = (n, e) => e ? dr(n, e) : Ar(n), Ar = async (n) => {
  let e, t;
  for await (const r of n)
    e = (e || 0) + r, t = (t || 0) + 1;
  if (e === void 0)
    throw new f(u.NoElements);
  return e / t;
}, dr = async (n, e) => {
  let t, r;
  for await (const s of n)
    t = (t || 0) + e(s), r = (r || 0) + 1;
  if (t === void 0)
    throw new f(u.NoElements);
  return t / r;
}, vr = async (n, e) => {
  let t, r;
  for await (const s of n)
    t = (t || 0) + await e(s), r = (r || 0) + 1;
  if (t === void 0)
    throw new f(u.NoElements);
  return t / r;
}, Pr = (n, e) => {
  async function* t() {
    yield* n, yield* e;
  }
  return new h(t);
}, kr = async (n, e, t = d) => {
  for await (const r of n)
    if (t(e, r))
      return !0;
  return !1;
}, $r = async (n, e, t) => {
  for await (const r of n)
    if (await t(e, r))
      return !0;
  return !1;
}, Tr = (n, e) => e ? Ir(n, e) : Or(n), Or = async (n) => {
  let e = 0;
  for await (const t of n)
    e++;
  return e;
}, Ir = async (n, e) => {
  let t = 0;
  for await (const r of n)
    e(r) === !0 && t++;
  return t;
}, Mr = async (n, e) => {
  let t = 0;
  for await (const r of n)
    await e(r) === !0 && t++;
  return t;
}, Er = (n, e = d) => {
  async function* t() {
    const r = [];
    for await (const s of n)
      r.find((a) => e(a, s)) || (r.push(s), yield s);
  }
  return new h(t);
}, br = (n, e) => {
  async function* t() {
    const r = [];
    t:
      for await (const s of n) {
        for (const o of r)
          if (await e(o, s))
            continue t;
        r.push(s), yield s;
      }
  }
  return new h(t);
}, xr = (n, e) => {
  async function* t() {
    for await (const r of n)
      e(r), yield r;
  }
  return new h(t);
}, Sr = (n, e) => {
  async function* t() {
    for await (const r of n)
      await e(r), yield r;
  }
  return new h(t);
}, Nr = async (n, e) => {
  if (e < 0)
    throw new E("index");
  let t = 0;
  for await (const r of n)
    if (e === t++)
      return r;
  throw new E("index");
}, Vr = async (n, e) => {
  let t = 0;
  for await (const r of n)
    if (e === t++)
      return r;
  return null;
}, Dr = (n, e, t = d) => {
  async function* r() {
    const s = [];
    for await (const o of e)
      s.push(o);
    for await (const o of n) {
      let a = !1;
      for (let i = 0; i < s.length; i++) {
        const l = s[i];
        if (t(o, l) === !0) {
          a = !0;
          break;
        }
      }
      a === !1 && (yield o);
    }
  }
  return new h(r);
}, Fr = (n, e, t) => {
  async function* r() {
    const s = [];
    for await (const o of e)
      s.push(o);
    for await (const o of n) {
      let a = !1;
      for (let i = 0; i < s.length; i++) {
        const l = s[i];
        if (await t(o, l) === !0) {
          a = !0;
          break;
        }
      }
      a === !1 && (yield o);
    }
  }
  return new h(r);
}, _r = (n, e) => e ? Rr(n, e) : Br(n), Br = async (n) => {
  const e = await n[Symbol.asyncIterator]().next();
  if (e.done === !0)
    throw new f(u.NoElements);
  return e.value;
}, Rr = async (n, e) => {
  for await (const t of n)
    if (e(t) === !0)
      return t;
  throw new f(u.NoMatch);
}, Wr = async (n, e) => {
  for await (const t of n)
    if (await e(t) === !0)
      return t;
  throw new f(u.NoMatch);
}, Kr = (n, e) => e ? qr(n, e) : jr(n), jr = async (n) => (await n[Symbol.asyncIterator]().next()).value || null, qr = async (n, e) => {
  for await (const t of n)
    if (e(t) === !0)
      return t;
  return null;
}, Lr = async (n, e) => {
  for await (const t of n)
    if (await e(t) === !0)
      return t;
  return null;
}, Cr = (n, e, t) => t ? zr(
  n,
  e,
  t
) : Ur(
  n,
  e
), zr = (n, e, t) => {
  async function* r() {
    const s = new Array();
    for await (const o of n) {
      const a = e(o);
      let i = !1;
      for (let l = 0; l < s.length; l++) {
        const y = s[l];
        if (t(y.key, a)) {
          y.push(o), i = !0;
          break;
        }
      }
      i === !1 && s.push(new v(a, o));
    }
    for (const o of s)
      yield o;
  }
  return new h(r);
}, Ur = (n, e) => {
  async function* t() {
    const r = {};
    for await (const s of n) {
      const o = e(s), a = r[o];
      a ? a.push(s) : r[o] = new v(o, s);
    }
    for (const s in r)
      yield r[s];
  }
  return new h(t);
}, Gr = (n, e, t) => t ? Zr(n, e, t) : Yr(
  n,
  e
), Yr = (n, e) => {
  async function* t() {
    const r = {};
    for await (const s of n) {
      const o = await e(s), a = r[o];
      a ? a.push(s) : r[o] = new v(o, s);
    }
    for (const s in r)
      yield r[s];
  }
  return new h(t);
}, Zr = (n, e, t) => {
  async function* r() {
    const s = new Array();
    for await (const o of n) {
      const a = await e(o);
      let i = !1;
      for (let l = 0; l < s.length; l++) {
        const y = s[l];
        if (await t(y.key, a) === !0) {
          y.push(o), i = !0;
          break;
        }
      }
      i === !1 && s.push(new v(a, o));
    }
    for (const o of s)
      yield o;
  }
  return new h(r);
}, Jr = (n, e, t, r) => r ? Xr(
  n,
  e,
  t,
  r
) : Hr(
  n,
  e,
  t
), Hr = (n, e, t) => {
  async function* r() {
    const s = {};
    for await (const o of n) {
      const a = e(o), i = s[a], l = t(o);
      i ? i.push(l) : s[a] = new v(a, l);
    }
    for (const o in s)
      yield s[o];
  }
  return new h(r);
}, Xr = (n, e, t, r) => {
  async function* s() {
    const o = new Array();
    for await (const a of n) {
      const i = e(a);
      let l = !1;
      for (let y = 0; y < o.length; y++) {
        const m = o[y];
        if (r(m.key, i)) {
          m.push(t(a)), l = !0;
          break;
        }
      }
      if (l === !1) {
        const y = t(a);
        o.push(new v(i, y));
      }
    }
    for (const a of o)
      yield a;
  }
  return new h(s);
}, Qr = (n, e, t = d) => {
  async function* r() {
    const s = await n.Distinct(t).ToArray();
    if (s.length === 0)
      return;
    const o = await e.ToArray();
    for (let a = 0; a < s.length; a++) {
      const i = s[a];
      for (let l = 0; l < o.length; l++) {
        const y = o[l];
        if (t(i, y) === !0) {
          yield i;
          break;
        }
      }
    }
  }
  return new h(r);
}, ts = (n, e, t) => {
  async function* r() {
    const s = await n.DistinctAsync(t).ToArray();
    if (s.length === 0)
      return;
    const o = await e.ToArray();
    for (let a = 0; a < s.length; a++) {
      const i = s[a];
      for (let l = 0; l < o.length; l++) {
        const y = o[l];
        if (await t(i, y) === !0) {
          yield i;
          break;
        }
      }
    }
  }
  return new h(r);
}, es = (n, e, t, r, s, o = d) => {
  async function* a() {
    const i = [];
    for await (const l of e)
      i.push(l);
    for await (const l of n) {
      const y = t(l);
      for (const m of i) {
        const T = r(m);
        o(y, T) === !0 && (yield s(l, m));
      }
    }
  }
  return new h(a);
}, ns = (n, e) => e ? ss(n, e) : rs(n), rs = async (n) => {
  let e = null;
  for await (const t of n)
    e = t;
  if (!e)
    throw new f(u.NoElements);
  return e;
}, ss = async (n, e) => {
  let t = null;
  for await (const r of n)
    e(r) === !0 && (t = r);
  if (!t)
    throw new f(u.NoMatch);
  return t;
}, os = async (n, e) => {
  let t = null;
  for await (const r of n)
    await e(r) === !0 && (t = r);
  if (!t)
    throw new f(u.NoMatch);
  return t;
}, as = (n, e) => e ? cs(n, e) : is(n), is = async (n) => {
  let e = null;
  for await (const t of n)
    e = t;
  return e;
}, cs = async (n, e) => {
  let t = null;
  for await (const r of n)
    e(r) === !0 && (t = r);
  return t;
}, ls = async (n, e) => {
  let t = null;
  for await (const r of n)
    await e(r) === !0 && (t = r);
  return t;
}, us = (n, e) => e ? ys(n, e) : fs(n), fs = async (n) => {
  let e = null;
  for await (const t of n)
    e = Math.max(e || Number.NEGATIVE_INFINITY, t);
  if (e === null)
    throw new f(u.NoElements);
  return e;
}, ys = async (n, e) => {
  let t = null;
  for await (const r of n)
    t = Math.max(t || Number.NEGATIVE_INFINITY, e(r));
  if (t === null)
    throw new f(u.NoElements);
  return t;
}, hs = async (n, e) => {
  let t = null;
  for await (const r of n)
    t = Math.max(t || Number.NEGATIVE_INFINITY, await e(r));
  if (t === null)
    throw new f(u.NoElements);
  return t;
}, ws = (n, e) => e ? ms(n, e) : gs(n), gs = async (n) => {
  let e = null;
  for await (const t of n)
    e = Math.min(e || Number.POSITIVE_INFINITY, t);
  if (e === null)
    throw new f(u.NoElements);
  return e;
}, ms = async (n, e) => {
  let t = null;
  for await (const r of n)
    t = Math.min(t || Number.POSITIVE_INFINITY, e(r));
  if (t === null)
    throw new f(u.NoElements);
  return t;
}, ps = async (n, e) => {
  let t = null;
  for await (const r of n)
    t = Math.min(t || Number.POSITIVE_INFINITY, await e(r));
  if (t === null)
    throw new f(u.NoElements);
  return t;
}, As = (n, e) => {
  const t = typeof e == "string" ? (s) => typeof s === e : (s) => s instanceof e;
  async function* r() {
    for await (const s of n)
      t(s) && (yield s);
  }
  return new h(r);
}, ds = (n, e, t) => O.generate(n, e, !0, t), vs = (n, e, t) => O.generateAsync(n, e, !0, t), Ps = (n, e, t) => O.generate(n, e, !1, t), ks = (n, e, t) => O.generateAsync(n, e, !1, t), $s = async (n, e) => {
  const t = [], r = [];
  for await (const s of n)
    e(s) === !0 ? r.push(s) : t.push(s);
  return [r, t];
}, Ts = async (n, e) => {
  const t = [], r = [];
  for await (const s of n)
    await e(s) === !0 ? r.push(s) : t.push(s);
  return [r, t];
}, Os = (n) => {
  async function* e() {
    const t = [];
    for await (const r of n)
      t.push(r);
    for (let r = t.length - 1; r >= 0; r--)
      yield t[r];
  }
  return new h(e);
}, Is = (n, e) => typeof e == "function" ? e.length === 1 ? Ms(n, e) : Es(n, e) : bs(n, e), Ms = (n, e) => {
  async function* t() {
    for await (const r of n)
      yield e(r);
  }
  return new h(t);
}, Es = (n, e) => {
  async function* t() {
    let r = 0;
    for await (const s of n)
      yield e(s, r), r++;
  }
  return new h(t);
}, bs = (n, e) => {
  async function* t() {
    for await (const r of n)
      yield r[e];
  }
  return new h(t);
}, xs = (n, e) => typeof e == "string" ? Ns(n, e) : Ss(n, e), Ss = (n, e) => {
  async function* t() {
    for await (const r of n)
      yield e(r);
  }
  return new h(t);
}, Ns = (n, e) => {
  async function* t() {
    for await (const r of n)
      yield r[e];
  }
  return new h(t);
}, Vs = (n, e) => typeof e == "function" ? e.length === 1 ? Ds(n, e) : Fs(n, e) : _s(n, e), Ds = (n, e) => {
  async function* t() {
    for await (const r of n)
      for (const s of e(r))
        yield s;
  }
  return new h(t);
}, Fs = (n, e) => {
  async function* t() {
    let r = 0;
    for await (const s of n) {
      for (const o of e(s, r))
        yield o;
      r++;
    }
  }
  return new h(t);
}, _s = (n, e) => {
  async function* t() {
    for await (const r of n)
      for (const s of r[e])
        yield s;
  }
  return new h(t);
}, Bs = (n, e) => {
  if (e.length === 1) {
    const t = async function* () {
      for await (const r of n) {
        const s = await e(r);
        for (const o of s)
          yield o;
      }
    };
    return new h(t);
  } else {
    const t = async function* () {
      let r = 0;
      for await (const s of n) {
        const o = await e(s, r);
        for (const a of o)
          yield a;
        r++;
      }
    };
    return new h(t);
  }
}, Rs = async (n, e, t = d) => {
  const r = n[Symbol.asyncIterator](), s = e[Symbol.asyncIterator]();
  let o = await Promise.all([r.next(), s.next()]), a = o[0], i = o[1];
  for (; !a.done && !i.done; ) {
    if (!t(a.value, i.value))
      return !1;
    o = await Promise.all([r.next(), s.next()]), a = o[0], i = o[1];
  }
  return a.done === !0 && i.done === !0;
}, Ws = async (n, e, t) => {
  const r = n[Symbol.asyncIterator](), s = e[Symbol.asyncIterator]();
  let o = await Promise.all([r.next(), s.next()]), a = o[0], i = o[1];
  for (; !a.done && !i.done; ) {
    if (await t(a.value, i.value) === !1)
      return !1;
    o = await Promise.all([r.next(), s.next()]), a = o[0], i = o[1];
  }
  return a.done === !0 && i.done === !0;
}, Ks = (n, e) => e ? qs(n, e) : js(n), js = async (n) => {
  let e = !1, t = null;
  for await (const r of n) {
    if (e === !0)
      throw new f(u.MoreThanOneElement);
    e = !0, t = r;
  }
  if (e === !1)
    throw new f(u.NoElements);
  return t;
}, qs = async (n, e) => {
  let t = !1, r = null;
  for await (const s of n)
    if (e(s)) {
      if (t === !0)
        throw new f(u.MoreThanOneMatchingElement);
      t = !0, r = s;
    }
  if (t === !1)
    throw new f(u.NoMatch);
  return r;
}, Ls = async (n, e) => {
  let t = !1, r = null;
  for await (const s of n)
    if (await e(s)) {
      if (t === !0)
        throw new f(u.MoreThanOneMatchingElement);
      t = !0, r = s;
    }
  if (t === !1)
    throw new f(u.NoMatch);
  return r;
}, Cs = (n, e) => e ? Us(n, e) : zs(n), zs = async (n) => {
  let e = !1, t = null;
  for await (const r of n) {
    if (e === !0)
      throw new f(u.MoreThanOneElement);
    e = !0, t = r;
  }
  return t;
}, Us = async (n, e) => {
  let t = !1, r = null;
  for await (const s of n)
    if (e(s)) {
      if (t === !0)
        throw new f(u.MoreThanOneMatchingElement);
      t = !0, r = s;
    }
  return r;
}, Gs = async (n, e) => {
  let t = !1, r = null;
  for await (const s of n)
    if (await e(s)) {
      if (t === !0)
        throw new f(u.MoreThanOneMatchingElement);
      t = !0, r = s;
    }
  return r;
}, Ys = (n, e) => {
  async function* t() {
    let r = 0;
    for await (const s of n)
      r++ >= e && (yield s);
  }
  return new h(t);
}, Zs = (n, e) => e.length === 1 ? Js(n, e) : Hs(n, e), Js = (n, e) => {
  async function* t() {
    let r = !0;
    for await (const s of n)
      r === !1 ? yield s : e(s) === !1 && (r = !1, yield s);
  }
  return new h(t);
}, Hs = (n, e) => {
  async function* t() {
    let r = 0, s = !0;
    for await (const o of n)
      s === !1 ? yield o : e(o, r) === !1 && (s = !1, yield o), r++;
  }
  return new h(t);
}, Xs = (n, e) => e.length === 1 ? Qs(n, e) : to(n, e), Qs = (n, e) => {
  async function* t() {
    let r = !0;
    for await (const s of n)
      r === !1 ? yield s : await e(s) === !1 && (r = !1, yield s);
  }
  return new h(t);
}, to = (n, e) => {
  async function* t() {
    let r = 0, s = !0;
    for await (const o of n)
      s === !1 ? yield o : await e(o, r) === !1 && (s = !1, yield o), r++;
  }
  return new h(t);
}, eo = (n, e) => e ? ro(n, e) : no(n), no = async (n) => {
  let e = 0;
  for await (const t of n)
    e += t;
  return e;
}, ro = async (n, e) => {
  let t = 0;
  for await (const r of n)
    t += e(r);
  return t;
}, so = async (n, e) => {
  let t = 0;
  for await (const r of n)
    t += await e(r);
  return t;
}, oo = (n, e) => {
  async function* t() {
    let r = e > 0 ? e : 0;
    for await (const s of n) {
      if (r-- === 0)
        break;
      yield s;
    }
  }
  return new h(t);
}, ao = (n, e) => e.length === 1 ? io(n, e) : co(n, e), io = (n, e) => {
  async function* t() {
    for await (const r of n)
      if (e(r))
        yield r;
      else
        break;
  }
  return new h(t);
}, co = (n, e) => {
  async function* t() {
    let r = 0;
    for await (const s of n)
      if (e(s, r++))
        yield s;
      else
        break;
  }
  return new h(t);
}, lo = (n, e) => e.length === 1 ? uo(n, e) : fo(n, e), uo = (n, e) => {
  async function* t() {
    for await (const r of n)
      if (await e(r))
        yield r;
      else
        break;
  }
  return new h(t);
}, fo = (n, e) => {
  async function* t() {
    let r = 0;
    for await (const s of n)
      if (await e(s, r++))
        yield s;
      else
        break;
  }
  return new h(t);
}, yo = async (n) => {
  const e = [];
  for await (const t of n)
    e.push(t);
  return e;
}, ho = async (n, e) => {
  const t = /* @__PURE__ */ new Map();
  for await (const r of n) {
    const s = e(r), o = t.get(s);
    o === void 0 ? t.set(s, [r]) : o.push(r);
  }
  return t;
}, wo = async (n, e) => {
  const t = /* @__PURE__ */ new Map();
  for await (const r of n) {
    const s = await e(r), o = t.get(s);
    o === void 0 ? t.set(s, [r]) : o.push(r);
  }
  return t;
}, go = async (n, e) => {
  const t = {};
  for await (const r of n)
    t[e(r)] = r;
  return t;
}, mo = async (n, e) => {
  const t = {};
  for await (const r of n)
    t[await e(r)] = r;
  return t;
}, po = async (n) => {
  const e = /* @__PURE__ */ new Set();
  for await (const t of n)
    e.add(t);
  return e;
}, Ao = (n, e, t) => t ? Po(n, e, t) : vo(n, e), vo = (n, e) => {
  async function* t() {
    const r = /* @__PURE__ */ new Set();
    for await (const s of n)
      r.has(s) === !1 && (yield s, r.add(s));
    for await (const s of e)
      r.has(s) === !1 && (yield s, r.add(s));
  }
  return new h(t);
}, Po = (n, e, t) => {
  async function* r() {
    const s = [];
    for (const o of [n, e])
      for await (const a of o) {
        let i = !1;
        for (const l of s)
          if (t(a, l) === !0) {
            i = !0;
            break;
          }
        i === !1 && (yield a, s.push(a));
      }
  }
  return new h(r);
}, ko = (n, e, t) => {
  async function* r() {
    const s = [];
    for (const o of [n, e])
      for await (const a of o) {
        let i = !1;
        for (const l of s)
          if (await t(a, l) === !0) {
            i = !0;
            break;
          }
        i === !1 && (yield a, s.push(a));
      }
  }
  return new h(r);
}, $o = (n, e) => e.length === 1 ? To(n, e) : Oo(n, e), To = (n, e) => {
  async function* t() {
    for await (const r of n)
      e(r) === !0 && (yield r);
  }
  return new h(t);
}, Oo = (n, e) => {
  async function* t() {
    let r = 0;
    for await (const s of n)
      e(s, r++) === !0 && (yield s);
  }
  return new h(t);
}, Io = (n, e) => e.length === 1 ? Mo(n, e) : Eo(n, e), Mo = (n, e) => {
  async function* t() {
    for await (const r of n)
      await e(r) === !0 && (yield r);
  }
  return new h(t);
}, Eo = (n, e) => {
  async function* t() {
    let r = 0;
    for await (const s of n)
      await e(s, r++) === !0 && (yield s);
  }
  return new h(t);
}, bo = (n, e, t) => t ? So(n, e, t) : xo(n, e), xo = (n, e) => {
  async function* t() {
    const r = n[Symbol.asyncIterator](), s = e[Symbol.asyncIterator]();
    for (; ; ) {
      const o = await Promise.all([r.next(), s.next()]), a = o[0], i = o[1];
      if (a.done && i.done)
        break;
      yield [a.value, i.value];
    }
  }
  return new h(t);
}, So = (n, e, t) => {
  async function* r() {
    const s = n[Symbol.asyncIterator](), o = e[Symbol.asyncIterator]();
    for (; ; ) {
      const a = await Promise.all([s.next(), o.next()]), i = a[0], l = a[1];
      if (i.done && l.done)
        break;
      yield t(i.value, l.value);
    }
  }
  return new h(r);
}, No = (n, e, t) => {
  async function* r() {
    const s = n[Symbol.asyncIterator](), o = e[Symbol.asyncIterator]();
    for (; ; ) {
      const a = await Promise.all([s.next(), o.next()]), i = a[0], l = a[1];
      if (i.done || l.done)
        break;
      yield t(i.value, l.value);
    }
  }
  return new h(r);
}, Vo = (n) => {
  const e = n.prototype, t = (r, s) => {
    const o = function(...a) {
      return r(this, ...a);
    };
    Object.defineProperty(o, "length", { value: r.length - 1 }), e[s] = o;
  };
  t(ar, "Aggregate"), t(ur, "All"), t(fr, "AllAsync"), t(yr, "Any"), t(gr, "AnyAsync"), t(mr, "AsParallel"), t(pr, "Average"), t(vr, "AverageAsync"), t(Pr, "Concatenate"), t(kr, "Contains"), t($r, "ContainsAsync"), t(Tr, "Count"), t(Mr, "CountAsync"), t(Er, "Distinct"), t(br, "DistinctAsync"), t(xr, "Each"), t(Sr, "EachAsync"), t(Nr, "ElementAt"), t(Vr, "ElementAtOrDefault"), t(Dr, "Except"), t(Fr, "ExceptAsync"), t(_r, "First"), t(Wr, "FirstAsync"), t(Kr, "FirstOrDefault"), t(Lr, "FirstOrDefaultAsync"), t(Cr, "GroupBy"), t(Gr, "GroupByAsync"), t(Jr, "GroupByWithSel"), t(Qr, "Intersect"), t(ts, "IntersectAsync"), t(es, "JoinByKey"), t(ns, "Last"), t(os, "LastAsync"), t(as, "LastOrDefault"), t(ls, "LastOrDefaultAsync"), t(us, "Max"), t(hs, "MaxAsync"), t(ws, "Min"), t(ps, "MinAsync"), t(As, "OfType"), t(ds, "OrderBy"), t(vs, "OrderByAsync"), t(Ps, "OrderByDescending"), t(ks, "OrderByDescendingAsync"), t($s, "Partition"), t(Ts, "PartitionAsync"), t(Os, "Reverse"), t(Is, "Select"), t(xs, "SelectAsync"), t(Vs, "SelectMany"), t(Bs, "SelectManyAsync"), t(Rs, "SequenceEquals"), t(Ws, "SequenceEqualsAsync"), t(Ks, "Single"), t(Ls, "SingleAsync"), t(Cs, "SingleOrDefault"), t(Gs, "SingleOrDefaultAsync"), t(Ys, "Skip"), t(Zs, "SkipWhile"), t(Xs, "SkipWhileAsync"), t(eo, "Sum"), t(so, "SumAsync"), t(oo, "Take"), t(ao, "TakeWhile"), t(lo, "TakeWhileAsync"), t(yo, "ToArray"), t(ho, "ToMap"), t(wo, "ToMapAsync"), t(go, "ToObject"), t(mo, "ToObjectAsync"), t(po, "ToSet"), t(Ao, "Union"), t(ko, "UnionAsync"), t($o, "Where"), t(Io, "WhereAsync"), t(bo, "Zip"), t(No, "ZipAsync");
}, Do = (n, e, t, r) => {
  if (r) {
    if (!t)
      throw new ReferenceError("TAccumulate function is undefined");
    return Bo(n, e, t, r);
  } else
    return t ? _o(n, e, t) : Fo(n, e);
}, Fo = async (n, e) => {
  let t;
  for await (const r of n)
    t ? t = e(t, r) : t = r;
  if (t === void 0)
    throw new f(u.NoElements);
  return t;
}, _o = async (n, e, t) => {
  let r = e;
  for await (const s of n)
    r = t(r, s);
  return r;
}, Bo = async (n, e, t, r) => {
  let s = e;
  for await (const o of n)
    s = t(s, o);
  return r(s);
}, $ = (n, e) => {
  const t = n.dataFunc;
  switch (t.type) {
    case c.PromiseToArray:
      return {
        generator: () => t.generator().then((s) => {
          const o = new Array(s.length);
          for (let a = 0; a < s.length; a++)
            o[a] = e(s[a]);
          return o;
        }),
        type: c.PromiseToArray
      };
    case c.ArrayOfPromises:
      return {
        generator: () => {
          const s = t.generator(), o = new Array(s.length);
          for (let a = 0; a < s.length; a++)
            o[a] = s[a].then(e);
          return o;
        },
        type: c.ArrayOfPromises
      };
    case c.PromiseOfPromises:
      return {
        generator: async () => {
          const s = await t.generator(), o = new Array(s.length);
          for (let a = 0; a < s.length; a++)
            o[a] = s[a].then(e);
          return o;
        },
        type: c.PromiseOfPromises
      };
  }
}, Ro = (n, e) => {
  const t = $(n, (r) => {
    if (!e(r))
      throw new Error(String(!1));
    return !0;
  });
  switch (t.type) {
    case c.PromiseToArray:
      return t.generator().then(() => !0, () => !1);
    case c.ArrayOfPromises:
      return Promise.all(t.generator()).then(() => !0, () => !1);
    case c.PromiseOfPromises:
      return t.generator().then(Promise.all.bind(Promise)).then(() => !0, () => !1);
  }
}, P = (n, e) => {
  const t = n.dataFunc;
  switch (t.type) {
    case c.PromiseToArray:
      return {
        generator: async () => {
          const s = await t.generator(), o = new Array(s.length);
          for (let a = 0; a < s.length; a++)
            o[a] = e(s[a]);
          return o;
        },
        type: c.PromiseOfPromises
      };
    case c.ArrayOfPromises:
      return {
        generator: () => t.generator().map(async (o) => {
          const a = await o;
          return await e(a);
        }),
        type: c.ArrayOfPromises
      };
    case c.PromiseOfPromises:
      return {
        generator: async () => (await t.generator()).map((o) => o.then(e)),
        type: c.PromiseOfPromises
      };
  }
}, Wo = (n, e) => {
  const t = P(n, async (r) => {
    if (await e(r) === !1)
      throw new Error(String(!1));
    return !0;
  });
  switch (t.type) {
    case c.ArrayOfPromises:
      return Promise.all(t.generator()).then(() => !0, () => !1);
    case c.PromiseOfPromises:
      return t.generator().then(Promise.all.bind(Promise)).then(() => !0, () => !1);
  }
}, Ko = (n, e) => e ? qo(n, e) : jo(n), jo = async (n) => {
  const e = n.dataFunc;
  let t;
  switch (e.type) {
    case c.ArrayOfPromises:
      return t = e.generator(), t.length !== 0;
    case c.PromiseToArray:
    case c.PromiseOfPromises:
      return t = await e.generator(), t.length !== 0;
  }
}, qo = async (n, e) => {
  const t = $(n, e);
  let r;
  switch (t.type) {
    case c.PromiseToArray:
      return r = await t.generator(), r.includes(!0);
    case c.ArrayOfPromises:
      return r = await Promise.all(t.generator()), r.includes(!0);
    case c.PromiseOfPromises:
      return r = await Promise.all(await t.generator()), r.includes(!0);
  }
}, Lo = async (n, e) => {
  const t = P(n, e);
  let r;
  switch (t.type) {
    case c.ArrayOfPromises:
      return r = t.generator(), r.length === 0 ? !1 : new Promise((o, a) => {
        let i = 0;
        for (const l of r)
          l.then((y) => {
            i++, y ? o(!0) : i === r.length && o(!1);
          }, a);
      });
    case c.PromiseOfPromises:
      return r = await t.generator(), Promise.length === 0 ? !1 : (await Promise.all(r)).includes(!0);
  }
}, Co = (n) => {
  async function* e() {
    for await (const t of n)
      yield t;
  }
  return A(e);
}, k = async (n) => {
  switch (n.type) {
    case c.PromiseToArray:
      return await n.generator();
    case c.ArrayOfPromises:
      return await Promise.all(n.generator());
    case c.PromiseOfPromises:
      const e = await n.generator();
      return await Promise.all(e);
  }
}, zo = async (n, e) => {
  let t;
  e ? t = $(n, e) : t = n.dataFunc;
  const r = await k(t);
  if (r.length === 0)
    throw new f(u.NoElements);
  let s = 0;
  for (const o of r)
    s += o;
  return s / r.length;
}, Uo = async (n, e) => {
  const t = P(n, e), r = await k(t);
  if (r.length === 0)
    throw new f(u.NoElements);
  let s = 0;
  for (const o of r)
    s += o;
  return s / r.length;
}, Go = (n, e) => {
  const t = async () => {
    const [r, s] = await Promise.all([n.ToArray(), e.ToArray()]);
    return [...r, ...s];
  };
  return new w({
    generator: t,
    type: c.PromiseToArray
  });
}, Yo = async (n, e, t = d) => {
  let r;
  switch (t ? r = $(n, (s) => t(e, s)) : r = $(n, (s) => s === e), r.type) {
    case c.PromiseToArray:
      return (await r.generator()).some((o) => o);
    case c.ArrayOfPromises:
      return (await Promise.all(r.generator())).some((o) => o);
    case c.PromiseOfPromises:
      return (await Promise.all(await r.generator())).some((o) => o);
  }
}, Zo = async (n, e, t) => {
  const r = P(n, (s) => t(e, s));
  switch (r.type) {
    case c.ArrayOfPromises:
      return (await Promise.all(r.generator())).some((o) => o);
    case c.PromiseOfPromises:
      return (await Promise.all(await r.generator())).some((o) => o);
  }
}, Jo = (n, e) => e ? Xo(n, e) : Ho(n), Ho = async (n) => {
  const e = n.dataFunc;
  switch (e.type) {
    case c.PromiseToArray:
    case c.PromiseOfPromises:
      return (await n.ToArray()).length;
    case c.ArrayOfPromises:
      return e.generator().length;
  }
}, Xo = async (n, e) => {
  const t = await n.ToArray();
  let r = 0;
  for (let s = 0; s < t.length; s++)
    e(t[s]) === !0 && r++;
  return r;
}, Qo = async (n, e) => {
  const t = P(n, e);
  let r;
  switch (t.type) {
    case c.ArrayOfPromises:
      r = Promise.all(t.generator());
      break;
    case c.PromiseOfPromises:
      r = Promise.all(await t.generator());
      break;
  }
  let s = 0;
  for (const o of await r)
    o && s++;
  return s;
}, ta = (n, e = d) => {
  const t = async () => {
    const r = [];
    for (const s of await n.ToArray())
      r.find((a) => e(a, s)) || r.push(s);
    return r;
  };
  return new w({
    generator: t,
    type: c.PromiseToArray
  });
}, ea = (n, e) => {
  const t = async () => {
    const r = [];
    t:
      for (const s of await n.ToArray()) {
        for (const o of r)
          if (await e(o, s))
            continue t;
        r.push(s);
      }
    return r;
  };
  return new w({
    generator: t,
    type: c.PromiseToArray
  });
}, na = (n, e) => new w($(n, (t) => (e(t), t))), ra = (n, e) => {
  const t = P(n, async (r) => (await e(r), r));
  return new w(t);
}, sa = async (n, e) => {
  if (e < 0)
    throw new E("index");
  const t = n.dataFunc;
  switch (t.type) {
    case c.PromiseToArray: {
      const r = await t.generator();
      if (e >= r.length)
        throw new E("index");
      return r[e];
    }
    case c.ArrayOfPromises: {
      const r = t.generator();
      if (e >= r.length)
        throw new E("index");
      return await r[e];
    }
    case c.PromiseOfPromises: {
      const r = await t.generator();
      if (e >= r.length)
        throw new E("index");
      return await r[e];
    }
  }
}, oa = async (n, e) => {
  const t = n.dataFunc;
  switch (t.type) {
    case c.PromiseToArray: {
      const r = await t.generator();
      return e >= r.length ? null : r[e];
    }
    case c.ArrayOfPromises: {
      const r = t.generator();
      return e >= r.length ? null : await r[e];
    }
    case c.PromiseOfPromises: {
      const r = await t.generator();
      return e >= r.length ? null : await r[e];
    }
  }
}, aa = (n, e, t = d) => {
  const r = async () => {
    const [s, o] = await Promise.all([n.ToArray(), e.ToArray()]), a = [];
    for (const i of s) {
      let l = !1;
      for (let y = 0; y < o.length; y++) {
        const m = o[y];
        if (t(i, m) === !0) {
          l = !0;
          break;
        }
      }
      l === !1 && a.push(i);
    }
    return a;
  };
  return new w({
    generator: r,
    type: c.PromiseToArray
  });
}, ia = (n, e, t) => {
  const r = async () => {
    const [s, o] = await Promise.all([n.ToArray(), e.ToArray()]), a = [];
    for (const i of s) {
      let l = !1;
      for (let y = 0; y < o.length; y++) {
        const m = o[y];
        if (await t(i, m) === !0) {
          l = !0;
          break;
        }
      }
      l === !1 && a.push(i);
    }
    return a;
  };
  return new w({
    generator: r,
    type: c.PromiseToArray
  });
}, D = (n) => k(n.dataFunc), ca = (n, e) => e ? ua(n, e) : la(n), la = async (n) => {
  const e = n.dataFunc;
  switch (e.type) {
    case c.PromiseToArray: {
      const t = await e.generator();
      if (t.length === 0)
        throw new f(u.NoElements);
      return t[0];
    }
    case c.ArrayOfPromises: {
      const t = e.generator();
      if (t.length === 0)
        throw new f(u.NoElements);
      return await t[0];
    }
    case c.PromiseOfPromises: {
      const t = await e.generator();
      if (t.length === 0)
        throw new f(u.NoElements);
      return await t[0];
    }
  }
}, ua = async (n, e) => {
  const t = await D(n);
  for (const r of t)
    if (e(r) === !0)
      return r;
  throw new f(u.NoMatch);
}, fa = async (n, e) => {
  const t = await D(n);
  for (const r of t)
    if (await e(r) === !0)
      return r;
  throw new f(u.NoMatch);
}, ya = (n, e) => e ? wa(n, e) : ha(n), ha = async (n) => {
  const e = n.dataFunc;
  switch (e.type) {
    case c.PromiseToArray: {
      const t = await e.generator();
      return t.length === 0 ? null : t[0];
    }
    case c.ArrayOfPromises: {
      const t = e.generator();
      return t.length === 0 ? null : await t[0];
    }
    case c.PromiseOfPromises: {
      const t = await e.generator();
      return t.length === 0 ? null : await t[0];
    }
  }
}, wa = async (n, e) => {
  const t = await D(n);
  for (const r of t)
    if (e(r) === !0)
      return r;
  return null;
}, ga = async (n, e) => {
  const t = await D(n);
  for (const r of t)
    if (await e(r) === !0)
      return r;
  return null;
}, ma = (n, e, t) => t ? Aa(
  n,
  e,
  t
) : pa(
  n,
  e
), pa = (n, e) => {
  const t = async () => {
    const r = {};
    for (const o of await n.ToArray()) {
      const a = e(o), i = r[a];
      i ? i.push(o) : r[a] = new v(a, o);
    }
    const s = new Array();
    for (const o in r)
      s.push(r[o]);
    return s;
  };
  return new w({
    generator: t,
    type: c.PromiseToArray
  });
}, Aa = (n, e, t) => {
  const r = async () => {
    const s = new Array();
    for (const a of await n.ToArray()) {
      const i = e(a);
      let l = !1;
      for (let y = 0; y < s.length; y++) {
        const m = s[y];
        if (t(m.key, i)) {
          m.push(a), l = !0;
          break;
        }
      }
      l === !1 && s.push(new v(i, a));
    }
    const o = new Array();
    for (const a of s)
      o.push(a);
    return o;
  };
  return new w({
    generator: r,
    type: c.PromiseToArray
  });
}, da = (n, e, t) => t ? va(
  n,
  e,
  t
) : Pa(
  n,
  e
), va = (n, e, t) => {
  const r = async () => {
    const s = P(n, async (l) => [await e(l), l]);
    let o;
    switch (s.type) {
      case c.ArrayOfPromises:
        o = await Promise.all(s.generator());
        break;
      case c.PromiseOfPromises:
        o = await Promise.all(await s.generator());
        break;
    }
    const a = new Array();
    for (const [l, y] of o) {
      let m = !1;
      for (let T = 0; T < a.length; T++) {
        const W = a[T];
        if (await t(W.key, l) === !0) {
          W.push(y), m = !0;
          break;
        }
      }
      m === !1 && a.push(new v(l, y));
    }
    const i = new Array();
    for (const l of a)
      i.push(l);
    return i;
  };
  return new w({
    generator: r,
    type: c.PromiseToArray
  });
}, Pa = (n, e) => {
  const t = async () => {
    const r = P(n, async (i) => [await e(i), i]);
    let s;
    switch (r.type) {
      case c.ArrayOfPromises:
        s = await Promise.all(r.generator());
        break;
      case c.PromiseOfPromises:
        s = await Promise.all(await r.generator());
        break;
    }
    const o = {};
    for (const [i, l] of s) {
      const y = o[i];
      y ? y.push(l) : o[i] = new v(i, l);
    }
    const a = new Array();
    for (const i in o)
      a.push(o[i]);
    return a;
  };
  return new w({
    generator: t,
    type: c.PromiseToArray
  });
}, ka = (n, e, t, r) => r ? $a(
  n,
  e,
  t,
  r
) : Ta(
  n,
  e,
  t
), $a = (n, e, t, r) => {
  const s = async () => {
    const o = new Array();
    for await (const i of n) {
      const l = e(i);
      let y = !1;
      for (let m = 0; m < o.length; m++) {
        const T = o[m];
        if (r(T.key, l)) {
          T.push(t(i)), y = !0;
          break;
        }
      }
      if (y === !1) {
        const m = t(i);
        o.push(new v(l, m));
      }
    }
    const a = new Array();
    for (const i of o)
      a.push(i);
    return a;
  };
  return new w({
    generator: s,
    type: c.PromiseToArray
  });
}, Ta = (n, e, t) => {
  const r = async () => {
    const s = {};
    for (const a of await n.ToArray()) {
      const i = e(a), l = s[i], y = t(a);
      l ? l.push(y) : s[i] = new v(i, y);
    }
    const o = new Array();
    for (const a in s)
      o.push(s[a]);
    return o;
  };
  return new w({
    generator: r,
    type: c.PromiseToArray
  });
}, Oa = (n, e, t = d) => {
  const r = async () => {
    const s = await n.Distinct(t).ToArray();
    if (s.length === 0)
      return [];
    const o = await e.ToArray(), a = new Array();
    for (let i = 0; i < s.length; i++) {
      const l = s[i];
      for (let y = 0; y < o.length; y++) {
        const m = o[y];
        if (t(l, m) === !0) {
          a.push(l);
          break;
        }
      }
    }
    return a;
  };
  return new w({
    generator: r,
    type: c.PromiseToArray
  });
}, Ia = (n, e, t) => {
  const r = async () => {
    const s = await n.DistinctAsync(t).ToArray();
    if (s.length === 0)
      return [];
    const o = await e.ToArray(), a = new Array();
    for (let i = 0; i < s.length; i++) {
      const l = s[i];
      for (let y = 0; y < o.length; y++) {
        const m = o[y];
        if (await t(l, m) === !0) {
          a.push(l);
          break;
        }
      }
    }
    return a;
  };
  return new w({
    generator: r,
    type: c.PromiseToArray
  });
}, Ma = (n, e, t, r, s, o = d) => {
  const a = async () => {
    const [i, l] = await Promise.all([e.ToArray(), n.ToArray()]), y = new Array();
    for (const m of l) {
      const T = t(m);
      for (const W of i) {
        const yt = r(W);
        o(T, yt) === !0 && y.push(s(m, W));
      }
    }
    return y;
  };
  return new w({
    generator: a,
    type: c.PromiseToArray
  });
}, Ea = (n, e) => e ? xa(n, e) : ba(n), ba = async (n) => {
  const e = n.dataFunc;
  switch (e.type) {
    case c.PromiseToArray: {
      const t = await e.generator();
      if (t.length === 0)
        throw new f(u.NoElements);
      return t[t.length - 1];
    }
    case c.ArrayOfPromises: {
      const t = e.generator();
      if (t.length === 0)
        throw new f(u.NoElements);
      return await t[t.length - 1];
    }
    case c.PromiseOfPromises: {
      const t = await e.generator();
      if (t.length === 0)
        throw new f(u.NoElements);
      return await t[t.length - 1];
    }
  }
}, xa = async (n, e) => {
  const t = n.dataFunc;
  switch (t.type) {
    case c.PromiseToArray: {
      const r = await t.generator();
      for (let s = r.length - 1; s >= 0; s--) {
        const o = r[s];
        if (e(o))
          return o;
      }
      break;
    }
    case c.ArrayOfPromises: {
      const r = t.generator();
      for (let s = r.length - 1; s >= 0; s--) {
        const o = await r[s];
        if (e(o))
          return o;
      }
      break;
    }
    case c.PromiseOfPromises: {
      const r = await t.generator();
      for (let s = r.length - 1; s >= 0; s--) {
        const o = await r[s];
        if (e(o))
          return o;
      }
      break;
    }
  }
  throw new f(u.NoMatch);
}, Sa = async (n, e) => {
  const t = n.dataFunc;
  switch (t.type) {
    case c.PromiseToArray: {
      const r = await t.generator();
      for (let s = r.length - 1; s >= 0; s--) {
        const o = r[s];
        if (await e(o) === !0)
          return o;
      }
      break;
    }
    case c.ArrayOfPromises: {
      const r = t.generator();
      for (let s = r.length - 1; s >= 0; s--) {
        const o = await r[s];
        if (await e(o) === !0)
          return o;
      }
      break;
    }
    case c.PromiseOfPromises: {
      const r = await t.generator();
      for (let s = r.length - 1; s >= 0; s--) {
        const o = await r[s];
        if (await e(o) === !0)
          return o;
      }
      break;
    }
  }
  throw new f(u.NoMatch);
}, Na = (n, e) => e ? Da(n, e) : Va(n), Va = async (n) => {
  const e = n.dataFunc;
  switch (e.type) {
    case c.PromiseToArray: {
      const t = await e.generator();
      return t.length === 0 ? null : t[t.length - 1];
    }
    case c.ArrayOfPromises: {
      const t = e.generator();
      return t.length === 0 ? null : await t[t.length - 1];
    }
    case c.PromiseOfPromises: {
      const t = await e.generator();
      return t.length === 0 ? null : await t[t.length - 1];
    }
  }
}, Da = async (n, e) => {
  const t = n.dataFunc;
  switch (t.type) {
    case c.PromiseToArray: {
      const r = await t.generator();
      for (let s = r.length - 1; s >= 0; s--) {
        const o = r[s];
        if (e(o))
          return o;
      }
      break;
    }
    case c.ArrayOfPromises: {
      const r = t.generator();
      for (let s = r.length - 1; s >= 0; s--) {
        const o = await r[s];
        if (e(o))
          return o;
      }
      break;
    }
    case c.PromiseOfPromises: {
      const r = await t.generator();
      for (let s = r.length - 1; s >= 0; s--) {
        const o = await r[s];
        if (e(o))
          return o;
      }
      break;
    }
  }
  return null;
}, Fa = async (n, e) => {
  const t = n.dataFunc;
  switch (t.type) {
    case c.PromiseToArray: {
      const r = await t.generator();
      for (let s = r.length - 1; s >= 0; s--) {
        const o = r[s];
        if (await e(o) === !0)
          return o;
      }
      break;
    }
    case c.ArrayOfPromises: {
      const r = t.generator();
      for (let s = r.length - 1; s >= 0; s--) {
        const o = await r[s];
        if (await e(o) === !0)
          return o;
      }
      break;
    }
    case c.PromiseOfPromises: {
      const r = await t.generator();
      for (let s = r.length - 1; s >= 0; s--) {
        const o = await r[s];
        if (await e(o) === !0)
          return o;
      }
      break;
    }
  }
  return null;
}, _a = async (n, e) => {
  let t;
  e ? t = $(n, e) : t = n.dataFunc;
  const r = await k(t);
  if (r.length === 0)
    throw new f(u.NoElements);
  return Math.max.apply(null, r);
}, Ba = async (n, e) => {
  const t = P(n, e), r = await k(t);
  if (r.length === 0)
    throw new f(u.NoElements);
  return Math.max.apply(null, r);
}, Ra = async (n, e) => {
  let t;
  e ? t = $(n, e) : t = n.dataFunc;
  const r = await k(t);
  if (r.length === 0)
    throw new f(u.NoElements);
  return Math.min.apply(null, r);
}, Wa = async (n, e) => {
  const t = P(n, e), r = await k(t);
  if (r.length === 0)
    throw new f(u.NoElements);
  return Math.min.apply(null, r);
}, Ka = (n, e) => {
  const t = typeof e == "string" ? (s) => [typeof s === e, s] : (s) => [s instanceof e, s], r = async () => {
    const s = $(n, t), o = await k(s), a = [];
    for (const [i, l] of o)
      i && a.push(l);
    return a;
  };
  return new w({
    generator: r,
    type: c.PromiseToArray
  });
}, ja = async (n, e) => {
  const t = /* @__PURE__ */ new Map();
  for await (const r of n) {
    const s = await e(r), o = t.get(s);
    o ? o.push(r) : t.set(s, [r]);
  }
  return t;
};
async function* qa(n, e, t, r) {
  const s = await ja(n, e), o = [...s.keys()].sort(r || void 0);
  if (t)
    for (let a = 0; a < o.length; a++)
      yield s.get(o[a]);
  else
    for (let a = o.length - 1; a >= 0; a--)
      yield s.get(o[a]);
}
const La = async (n, e) => {
  const t = /* @__PURE__ */ new Map();
  for (const r of n) {
    const s = await e(r), o = t.get(s);
    o ? o.push(r) : t.set(s, [r]);
  }
  return t;
};
async function* Ca(n, e, t, r) {
  const s = await La(n, e), o = [...s.keys()].sort(r || void 0);
  if (t)
    for (let a = 0; a < o.length; a++)
      yield s.get(o[a]);
  else
    for (let a = o.length - 1; a >= 0; a--)
      yield s.get(o[a]);
}
const za = async (n, e) => {
  const t = /* @__PURE__ */ new Map();
  for await (const r of n) {
    const s = e(r), o = t.get(s);
    o ? o.push(r) : t.set(s, [r]);
  }
  return t;
};
async function* Ua(n, e, t, r) {
  const s = await za(n, e), o = [...s.keys()].sort(r || void 0);
  if (t)
    for (let a = 0; a < o.length; a++)
      yield s.get(o[a]);
  else
    for (let a = o.length - 1; a >= 0; a--)
      yield s.get(o[a]);
}
const Ga = (n, e) => {
  const t = /* @__PURE__ */ new Map();
  for (const r of n) {
    const s = e(r), o = t.get(s);
    o ? o.push(r) : t.set(s, [r]);
  }
  return t;
};
async function* Ya(n, e, t, r) {
  const s = Ga(n, e), o = [...s.keys()].sort(r || void 0);
  if (t)
    for (let a = 0; a < o.length; a++)
      yield s.get(o[a]);
  else
    for (let a = o.length - 1; a >= 0; a--)
      yield s.get(o[a]);
}
class I extends w {
  constructor(e) {
    super({
      generator: async () => {
        const t = e(), r = [];
        for await (const s of t)
          r.push(...s);
        return r;
      },
      type: c.PromiseToArray
    }), this.orderedPairs = e;
  }
  static generateAsync(e, t, r, s) {
    let o;
    return e instanceof I ? o = async function* () {
      for await (const a of e.orderedPairs())
        yield* Ca(a, t, r, s);
    } : o = () => qa(e, t, r, s), new I(o);
  }
  static generate(e, t, r, s) {
    let o;
    return e instanceof I ? o = async function* () {
      for await (const a of e.orderedPairs())
        yield* Ya(a, t, r, s);
    } : o = () => Ua(e, t, r, s), new I(o);
  }
  ThenBy(e, t) {
    return I.generate(this, e, !0, t);
  }
  ThenByAsync(e, t) {
    return I.generateAsync(this, e, !0, t);
  }
  ThenByDescending(e, t) {
    return I.generate(this, e, !1, t);
  }
  ThenByDescendingAsync(e, t) {
    return I.generateAsync(this, e, !1, t);
  }
}
const Za = (n, e, t) => I.generate(n, e, !0, t), Ja = (n, e, t) => I.generateAsync(n, e, !0, t), Ha = (n, e, t) => I.generate(n, e, !1, t), Xa = (n, e, t) => I.generateAsync(n, e, !1, t), Qa = async (n, e) => {
  const t = $(n, (a) => [e(a), a]), r = await k(t), s = [], o = [];
  for (const [a, i] of r)
    a ? o.push(i) : s.push(i);
  return [o, s];
}, ti = async (n, e) => {
  const t = P(n, async (a) => [await e(a), a]), r = await k(t), s = [], o = [];
  for (const [a, i] of r)
    a ? o.push(i) : s.push(i);
  return [o, s];
}, ei = (n) => {
  const e = n.dataFunc;
  switch (e.type) {
    case c.ArrayOfPromises: {
      const t = () => e.generator().reverse();
      return new w({
        generator: t,
        type: e.type
      });
    }
    case c.PromiseOfPromises: {
      const t = async () => (await e.generator()).reverse();
      return new w({
        generator: t,
        type: e.type
      });
    }
    case c.PromiseToArray: {
      const t = async () => (await e.generator()).reverse();
      return new w({
        generator: t,
        type: e.type
      });
    }
  }
}, ct = (n, e) => {
  const t = n.dataFunc;
  switch (t.type) {
    case c.PromiseToArray:
      return {
        generator: () => t.generator().then((s) => {
          const o = new Array(s.length);
          for (let a = 0; a < s.length; a++)
            o[a] = e(s[a], a);
          return o;
        }),
        type: c.PromiseToArray
      };
    case c.ArrayOfPromises:
      return {
        generator: () => {
          const s = t.generator(), o = new Array(s.length);
          for (let a = 0; a < s.length; a++)
            o[a] = s[a].then((i) => e(i, a));
          return o;
        },
        type: c.ArrayOfPromises
      };
    case c.PromiseOfPromises:
      return {
        generator: async () => {
          const s = await t.generator(), o = new Array(s.length);
          for (let a = 0; a < s.length; a++)
            o[a] = s[a].then((i) => e(i, a));
          return o;
        },
        type: c.PromiseOfPromises
      };
  }
}, ni = (n, e) => typeof e == "function" ? e.length === 1 ? new w($(n, e)) : new w(ct(n, e)) : new w($(n, (t) => t[e])), J = (n, e) => {
  const t = n.dataFunc;
  switch (t.type) {
    case c.PromiseToArray:
      return {
        generator: async () => {
          const s = await t.generator(), o = new Array(s.length);
          for (let a = 0; a < s.length; a++)
            o[a] = e(s[a], a);
          return o;
        },
        type: c.PromiseOfPromises
      };
    case c.ArrayOfPromises:
      return {
        generator: () => t.generator().map((s, o) => s.then((a) => e(a, o))),
        type: c.ArrayOfPromises
      };
    case c.PromiseOfPromises:
      return {
        generator: async () => (await t.generator()).map((o, a) => o.then((i) => e(i, a))),
        type: c.PromiseOfPromises
      };
  }
}, ri = (n, e) => {
  let t;
  return typeof e == "function" ? e.length === 1 ? t = P(n, e) : t = J(n, e) : t = P(n, (r) => r[e]), new w(t);
}, si = (n, e) => {
  const t = async () => {
    let r;
    typeof e == "function" ? e.length === 1 ? r = $(n, e) : r = ct(n, e) : r = $(n, (o) => o[e]);
    const s = [];
    switch (r.type) {
      case c.PromiseToArray: {
        for (const o of await r.generator())
          for (const a of o)
            s.push(a);
        break;
      }
      case c.ArrayOfPromises: {
        for (const o of r.generator())
          for (const a of await o)
            s.push(a);
        break;
      }
      case c.PromiseOfPromises: {
        for (const o of await r.generator())
          for (const a of await o)
            s.push(a);
        break;
      }
    }
    return s;
  };
  return new w({
    generator: t,
    type: c.PromiseToArray
  });
}, oi = (n, e) => {
  const t = async () => {
    let r;
    e.length === 1 ? r = P(n, e) : r = J(n, e);
    const s = [];
    switch (r.type) {
      case c.ArrayOfPromises: {
        for (const o of r.generator())
          for (const a of await o)
            s.push(a);
        break;
      }
      case c.PromiseOfPromises: {
        for (const o of await r.generator())
          for (const a of await o)
            s.push(a);
        break;
      }
    }
    return s;
  };
  return new w({
    generator: t,
    type: c.PromiseToArray
  });
}, ai = async (n, e, t = d) => {
  const r = await n.ToArray(), s = await e.ToArray();
  if (r.length !== s.length)
    return !1;
  for (let o = 0; o < r.length; o++) {
    const a = r[o], i = s[o];
    if (t(a, i) === !1)
      return !1;
  }
  return !0;
}, ii = async (n, e, t) => {
  const r = await n.ToArray(), s = await e.ToArray();
  if (r.length !== s.length)
    return !1;
  for (let o = 0; o < r.length; o++) {
    const a = r[o], i = s[o];
    if (await t(a, i) === !1)
      return !1;
  }
  return !0;
}, ci = (n, e) => e ? ui(n, e) : li(n), li = async (n) => {
  const e = n.dataFunc;
  switch (e.type) {
    case c.PromiseToArray: {
      const t = await e.generator();
      if (t.length > 1)
        throw new f(u.MoreThanOneElement);
      if (t.length === 0)
        throw new f(u.NoElements);
      return t[0];
    }
    case c.ArrayOfPromises: {
      const t = e.generator();
      if (t.length > 1)
        throw new f(u.MoreThanOneElement);
      if (t.length === 0)
        throw new f(u.NoElements);
      return t[0];
    }
    case c.PromiseOfPromises: {
      const t = await e.generator();
      if (t.length > 1)
        throw new f(u.MoreThanOneElement);
      if (t.length === 0)
        throw new f(u.NoElements);
      return await t[0];
    }
  }
}, ui = async (n, e) => {
  const t = await D(n);
  let r = !1, s = null;
  for (const o of t)
    if (e(o)) {
      if (r === !0)
        throw new f(u.MoreThanOneMatchingElement);
      r = !0, s = o;
    }
  if (r === !1)
    throw new f(u.NoMatch);
  return s;
}, fi = async (n, e) => {
  const t = await D(n);
  let r = !1, s = null;
  for (const o of t)
    if (await e(o) === !0) {
      if (r === !0)
        throw new f(u.MoreThanOneMatchingElement);
      r = !0, s = o;
    }
  if (r === !1)
    throw new f(u.NoMatch);
  return s;
}, yi = (n, e) => e ? wi(n, e) : hi(n), hi = async (n) => {
  const e = n.dataFunc;
  switch (e.type) {
    case c.PromiseToArray: {
      const t = await e.generator();
      if (t.length > 1)
        throw new f(u.MoreThanOneElement);
      return t.length === 0 ? null : t[0];
    }
    case c.ArrayOfPromises: {
      const t = e.generator();
      if (t.length > 1)
        throw new f(u.MoreThanOneElement);
      return t.length === 0 ? null : t[0];
    }
    case c.PromiseOfPromises: {
      const t = await e.generator();
      if (t.length > 1)
        throw new f(u.MoreThanOneElement);
      return t.length === 0 ? null : await t[0];
    }
  }
}, wi = async (n, e) => {
  const t = await D(n);
  let r = !1, s = null;
  for (const o of t)
    if (e(o)) {
      if (r === !0)
        throw new f(u.MoreThanOneElement);
      r = !0, s = o;
    }
  return s;
}, gi = async (n, e) => {
  const t = await D(n);
  let r = !1, s = null;
  for (const o of t)
    if (await e(o) === !0) {
      if (r === !0)
        throw new f(u.MoreThanOneElement);
      r = !0, s = o;
    }
  return s;
}, mi = (n, e) => {
  const t = n.dataFunc;
  switch (t.type) {
    case c.PromiseToArray: {
      const r = async () => (await t.generator()).slice(e);
      return new w({
        generator: r,
        type: c.PromiseToArray
      });
    }
    case c.ArrayOfPromises: {
      const r = () => t.generator().slice(e);
      return new w({
        generator: r,
        type: c.ArrayOfPromises
      });
    }
    case c.PromiseOfPromises: {
      const s = {
        generator: async () => (await t.generator()).slice(e),
        type: c.PromiseOfPromises
      };
      return new w(s);
    }
  }
}, pi = (n, e) => {
  const t = async () => {
    const r = await n.ToArray();
    let s = 0;
    for (; s < r.length; s++) {
      const a = r[s];
      if (e(a, s) === !1)
        break;
    }
    const o = [];
    for (; s < r.length; s++)
      o.push(r[s]);
    return o;
  };
  return new w({
    generator: t,
    type: c.PromiseToArray
  });
}, Ai = (n, e) => {
  const t = async () => {
    const r = await n.ToArray();
    let s = 0;
    for (; s < r.length; s++) {
      const a = r[s];
      if (await e(a, s) === !1)
        break;
    }
    const o = [];
    for (; s < r.length; s++)
      o.push(r[s]);
    return o;
  };
  return new w({
    generator: t,
    type: c.PromiseToArray
  });
}, di = (n, e) => e ? Pi(n, e) : vi(n), vi = async (n) => {
  let e = 0;
  for (const t of await n.ToArray())
    e += t;
  return e;
}, Pi = async (n, e) => {
  let t = 0;
  for (const r of await n.ToArray())
    t += e(r);
  return t;
}, ki = async (n, e) => {
  const t = P(n, e), r = await k(t);
  let s = 0;
  for (const o of r)
    s += o;
  return s;
}, $i = (n, e) => {
  const t = e > 0 ? e : 0, r = n.dataFunc;
  switch (r.type) {
    case c.ArrayOfPromises:
      const s = () => r.generator().splice(0, t);
      return new w({
        generator: s,
        type: c.ArrayOfPromises
      });
    case c.PromiseOfPromises:
      const o = () => r.generator().then((i) => i.splice(0, t));
      return new w({
        generator: o,
        type: c.PromiseOfPromises
      });
    case c.PromiseToArray:
    default:
      const a = () => r.generator().then((i) => i.splice(0, t));
      return new w({
        generator: a,
        type: c.PromiseToArray
      });
  }
}, Ti = (n, e) => {
  const t = async () => {
    const r = await n.ToArray(), s = new Array();
    if (e.length === 1)
      for (const o of r)
        if (e(o) === !0)
          s.push(o);
        else
          break;
    else
      for (let o = 0; o < r.length; o++) {
        const a = r[o];
        if (e(a, o) === !0)
          s.push(a);
        else
          break;
      }
    return s;
  };
  return new w({
    generator: t,
    type: c.PromiseToArray
  });
}, Oi = (n, e) => {
  const t = async () => {
    const r = await n.ToArray(), s = new Array();
    if (e.length === 1) {
      const o = e;
      for (const a of r)
        if (await o(a) === !0)
          s.push(a);
        else
          break;
    } else
      for (let o = 0; o < r.length; o++) {
        const a = r[o];
        if (await e(a, o) === !0)
          s.push(a);
        else
          break;
      }
    return s;
  };
  return new w({
    generator: t,
    type: c.PromiseToArray
  });
}, Ii = async (n, e) => {
  const t = /* @__PURE__ */ new Map(), r = $(n, (o) => [e(o), o]), s = await k(r);
  for (const [o, a] of s) {
    const i = t.get(o);
    i === void 0 ? t.set(o, [a]) : i.push(a);
  }
  return t;
}, Mi = async (n, e) => {
  const t = /* @__PURE__ */ new Map(), r = P(n, async (o) => [await e(o), o]), s = await k(r);
  for (const [o, a] of s) {
    const i = t.get(o);
    i === void 0 ? t.set(o, [a]) : i.push(a);
  }
  return t;
}, Ei = async (n, e) => {
  const t = n.dataFunc, r = await k(t), s = {};
  for (const o of r)
    s[e(o)] = o;
  return s;
}, bi = async (n, e) => {
  const t = P(n, async (o) => [await e(o), o]), r = await k(t), s = {};
  for (const [o, a] of r)
    s[o] = a;
  return s;
}, xi = async (n) => {
  const e = n.dataFunc, t = await k(e);
  return new Set(t);
}, Si = (n, e, t) => t ? Vi(n, e, t) : Ni(n, e), Ni = (n, e) => {
  const t = async () => {
    const r = /* @__PURE__ */ new Set(), s = e.ToArray();
    for await (const a of n)
      r.has(a) === !1 && r.add(a);
    const o = await s;
    for (const a of o)
      r.has(a) === !1 && r.add(a);
    return [...r.keys()];
  };
  return new w({
    generator: t,
    type: c.PromiseToArray
  });
}, Vi = (n, e, t) => {
  const r = async () => {
    const s = [], o = await Promise.all([n.ToArray(), e.ToArray()]);
    for (const a of o)
      for (const i of a) {
        let l = !1;
        for (const y of s)
          if (t(i, y) === !0) {
            l = !0;
            break;
          }
        l === !1 && s.push(i);
      }
    return s;
  };
  return new w({
    generator: r,
    type: c.PromiseToArray
  });
}, Di = (n, e, t) => {
  const r = async () => {
    const s = [], o = await Promise.all([n.ToArray(), e.ToArray()]);
    for (const a of o)
      for (const i of a) {
        let l = !1;
        for (const y of s)
          if (await t(i, y) === !0) {
            l = !0;
            break;
          }
        l === !1 && s.push(i);
      }
    return s;
  };
  return new w({
    generator: r,
    type: c.PromiseToArray
  });
}, Fi = (n, e) => {
  const t = async () => (await n.ToArray()).filter(e);
  return new w({
    generator: t,
    type: c.PromiseToArray
  });
}, _i = (n, e) => {
  const t = async () => {
    const r = J(n, async (a, i) => [await e(a, i), a]), s = await k(r), o = [];
    for (const [a, i] of s)
      a && o.push(i);
    return o;
  };
  return new w({
    generator: t,
    type: c.PromiseToArray
  });
}, Bi = (n, e, t) => t ? Wi(n, e, t) : Ri(n, e), Ri = (n, e) => {
  const t = async () => {
    const [r, s] = await Promise.all([n.ToArray(), e.ToArray()]), o = r.length > s.length ? r.length : s.length, a = new Array(o);
    for (let i = 0; i < o; i++) {
      const l = r[i], y = s[i];
      a[i] = [l, y];
    }
    return a;
  };
  return new w({
    generator: t,
    type: c.PromiseToArray
  });
}, Wi = (n, e, t) => {
  const r = async () => {
    const [s, o] = await Promise.all([n.ToArray(), e.ToArray()]), a = s.length > o.length ? s.length : o.length, i = new Array(a);
    for (let l = 0; l < a; l++) {
      const y = s[l], m = o[l];
      i[l] = t(y, m);
    }
    return i;
  };
  return new w({
    generator: r,
    type: c.PromiseToArray
  });
}, Ki = (n, e, t) => {
  const r = async () => {
    const [s, o] = await Promise.all([n.ToArray(), e.ToArray()]), a = s.length > o.length ? s.length : o.length, i = new Array(a);
    for (let l = 0; l < a; l++) {
      const y = s[l], m = o[l];
      i[l] = t(y, m);
    }
    return Promise.all(i);
  };
  return new w({
    generator: r,
    type: c.PromiseToArray
  });
}, ji = (n) => {
  const e = n.prototype, t = (r, s) => {
    const o = function(...a) {
      return r(this, ...a);
    };
    Object.defineProperty(o, "length", { value: r.length - 1 }), e[s] = o;
  };
  t(Do, "Aggregate"), t(Ro, "All"), t(Wo, "AllAsync"), t(Ko, "Any"), t(Lo, "AnyAsync"), t(Co, "AsAsync"), t(zo, "Average"), t(Uo, "AverageAsync"), t(Go, "Concatenate"), t(Yo, "Contains"), t(Zo, "ContainsAsync"), t(Jo, "Count"), t(Qo, "CountAsync"), t(ta, "Distinct"), t(ea, "DistinctAsync"), t(na, "Each"), t(ra, "EachAsync"), t(sa, "ElementAt"), t(oa, "ElementAtOrDefault"), t(aa, "Except"), t(ia, "ExceptAsync"), t(ca, "First"), t(fa, "FirstAsync"), t(ya, "FirstOrDefault"), t(ga, "FirstOrDefaultAsync"), t(ma, "GroupBy"), t(da, "GroupByAsync"), t(ka, "GroupByWithSel"), t(Oa, "Intersect"), t(Ia, "IntersectAsync"), t(Ma, "JoinByKey"), t(Ea, "Last"), t(Sa, "LastAsync"), t(Na, "LastOrDefault"), t(Fa, "LastOrDefaultAsync"), t(_a, "Max"), t(Ba, "MaxAsync"), t(Ra, "Min"), t(Wa, "MinAsync"), t(Ka, "OfType"), t(Za, "OrderBy"), t(Ja, "OrderByAsync"), t(Ha, "OrderByDescending"), t(Xa, "OrderByDescendingAsync"), t(Qa, "Partition"), t(ti, "PartitionAsync"), t(ei, "Reverse"), t(ni, "Select"), t(ri, "SelectAsync"), t(si, "SelectMany"), t(oi, "SelectManyAsync"), t(ai, "SequenceEquals"), t(ii, "SequenceEqualsAsync"), t(ci, "Single"), t(fi, "SingleAsync"), t(yi, "SingleOrDefault"), t(gi, "SingleOrDefaultAsync"), t(mi, "Skip"), t(pi, "SkipWhile"), t(Ai, "SkipWhileAsync"), t(di, "Sum"), t(ki, "SumAsync"), t($i, "Take"), t(Ti, "TakeWhile"), t(Oi, "TakeWhileAsync"), t(D, "ToArray"), t(Ii, "ToMap"), t(Mi, "ToMapAsync"), t(Ei, "ToObject"), t(bi, "ToObjectAsync"), t(xi, "ToSet"), t(Si, "Union"), t(Di, "UnionAsync"), t(Fi, "Where"), t(_i, "WhereAsync"), t(Bi, "Zip"), t(Ki, "ZipAsync");
}, qi = () => {
  const n = String.prototype, e = Object.getOwnPropertyNames(g.prototype);
  for (const t of e)
    n[t] = n[t] ?? g.prototype[t];
  n.First = function(t) {
    if (t) {
      for (let r = 0; r < this.length; r++) {
        const s = this[r];
        if (t(s) === !0)
          return s;
      }
      throw new f(u.NoMatch);
    }
    if (this.length === 0)
      throw new f(u.NoElements);
    return this[0];
  }, n.FirstOrDefault = function(t) {
    if (t) {
      for (let r = 0; r < this.length; r++) {
        const s = this[r];
        if (t(s) === !0)
          return s;
      }
      return null;
    }
    return this.length === 0 ? null : this[0];
  }, n.Count = function(t) {
    if (t) {
      let r = 0;
      for (let s = 0; s < this.length; s++)
        t(this[s]) === !0 && r++;
      return r;
    } else
      return this.length;
  }, n.ElementAt = function(t) {
    if (t < 0 || t >= this.length)
      throw new E("index");
    return this[t];
  }, n.ElementAtOrDefault = function(t) {
    return this[t] || null;
  }, n.Last = function(t) {
    if (t) {
      for (let r = this.length - 1; r >= 0; r--) {
        const s = this[r];
        if (t(s) === !0)
          return s;
      }
      throw new f(u.NoMatch);
    } else {
      if (this.length === 0)
        throw new f(u.NoElements);
      return this[this.length - 1];
    }
  }, n.LastOrDefault = function(t) {
    if (t) {
      for (let r = this.length - 1; r >= 0; r--) {
        const s = this[r];
        if (t(s) === !0)
          return s;
      }
      return null;
    } else
      return this.length === 0 ? null : this[this.length - 1];
  }, n.Reverse = function() {
    const t = this;
    function* r() {
      for (let s = t.length - 1; s >= 0; s--)
        yield t[s];
    }
    return new g(r);
  };
}, Li = () => {
  Y(Map), Y(Set), qi(), S(Array), S(Int8Array), S(Int16Array), S(Int32Array), S(Uint8Array), S(Uint8ClampedArray), S(Uint16Array), S(Uint32Array), S(Float32Array), S(Float64Array);
};
Y(g);
Vo(h);
ji(w);
gt();
const tt = (n) => {
  const e = (r) => Array.isArray(r) || typeof r == "object" && typeof r.length == "number" && (r.length === 0 || 0 in r), t = (r) => typeof r == "function";
  if (e(n)) {
    const r = function* () {
      for (let s = 0; s < n.length; s++)
        yield n[s];
    };
    return new g(r);
  }
  return t(n) ? new g(n) : new g(function* () {
    for (const r of n)
      yield r;
  });
}, Ci = (n) => {
  if (!n)
    return !1;
  if (n instanceof g || n instanceof j)
    return !0;
  if (typeof n[Symbol.iterator] != "function")
    return !1;
  const e = Object.getOwnPropertyNames(g.prototype).filter((r) => r !== "constructor"), t = n.prototype || n;
  for (const r of e)
    if (typeof t[r] != "function")
      return !1;
  return !0;
};
function gc(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n) && "$meta_System_IDisposable" in n.constructor;
}
class zi {
  constructor(e) {
    p(this, "_it");
    p(this, "_current");
    this._it = e[Symbol.iterator]();
  }
  get Current() {
    return this._current;
  }
  MoveNext() {
    let e = this._it.next();
    return this._current = e.value, e.done === !1;
  }
  Dispose() {
  }
}
class mc {
  constructor(e) {
    p(this, "PropertyName");
    this.PropertyName = e;
  }
}
function pc(n) {
  return Ci(n);
}
function Ac(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n) && "$meta_System_INotifyPropertyChanged" in n.constructor;
}
var Ui = /* @__PURE__ */ ((n) => (n[n.Add = 0] = "Add", n[n.Remove = 1] = "Remove", n[n.Replace = 2] = "Replace", n[n.Move = 3] = "Move", n[n.Reset = 4] = "Reset", n))(Ui || {});
class dc {
  constructor() {
    p(this, "Action");
    p(this, "NewItems");
    p(this, "OldItems");
  }
}
function vc(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n) && "$meta_System_INotifyCollectionChanged" in n.constructor;
}
class Pc {
  constructor() {
    p(this, "_listeners");
    p(this, "_it", -1);
  }
  Add(e, t) {
    this._listeners || (this._listeners = []);
    let r = { callback: e };
    t && (r.target = new WeakRef(t)), this._listeners.push(r);
  }
  Remove(e, t) {
    if (!!this._listeners) {
      for (let r = 0; r < this._listeners.length; r++) {
        const s = this._listeners[r];
        if (s.target?.deref() === t && s.callback === e) {
          this._listeners.splice(r, 1);
          break;
        }
      }
      this._it >= 0 && this._it--;
    }
  }
  Invoke(e, t) {
    if (!!this._listeners) {
      for (this._it = 0; this._it < this._listeners.length; ) {
        const r = this._listeners[this._it], s = r.target?.deref();
        r.target !== void 0 && s === void 0 ? this._listeners.splice(this._it, 1) : (r.callback.call(s, e, t), this._it++);
      }
      this._it = -1;
    }
  }
}
class kc {
  Next(e, t) {
    return Math.random() * (t - e) | 0;
  }
}
const G = 1e3, _ = class {
  constructor(e, t, r) {
    p(this, "_ticks");
    t == null ? this._ticks = e : this._ticks = _.TimeToTicks(e, t, r);
  }
  get Ticks() {
    return this._ticks;
  }
  get TotalMilliseconds() {
    return this._ticks;
  }
  get TotalSeconds() {
    return this._ticks / G;
  }
  static FromSeconds(e) {
    return new _(e * G);
  }
  static FromMilliseconds(e) {
    return new _(e);
  }
  Clone() {
    return new _(this._ticks);
  }
  static TimeToTicks(e, t, r) {
    let s = (e * 3600 + t * 60 + r) * G;
    if (s > Number.MAX_SAFE_INTEGER)
      throw new E("all");
    return s;
  }
};
let q = _;
p(q, "Empty", new _(0));
const F = class {
  constructor(e, t, r, s, o, a) {
    p(this, "_date");
    e instanceof Date ? this._date = e : s === void 0 ? this._date = new Date(e, t, r) : this._date = new Date(e, t, r, s, o, a);
  }
  static get UtcNow() {
    return new F(new Date());
  }
  get Ticks() {
    return BigInt(this._date.getTime()) * 10000n + 621355968000000000n;
  }
  Subtract(e) {
    if (e instanceof F)
      return new q(this._date.getTime() - e._date.getTime());
    {
      let t = this._date.getTime(), r = e.TotalMilliseconds;
      if (t < r)
        throw new E("other");
      let s = t - r, o = new Date();
      return o.setTime(s), new F(o);
    }
  }
  static op_Subtraction(e, t) {
    return t instanceof F, e.Subtract(t);
  }
  Clone() {
    return new F(this._date);
  }
  toString() {
    return this._date.toString();
  }
};
let R = F;
p(R, "Empty", new F(0, 0, 0));
class lt {
  constructor(e) {
    p(this, "_data");
    if (e instanceof Uint8Array)
      this._data = e;
    else
      throw new Error("\u672A\u5B9E\u73B0");
  }
  get Value() {
    return this._data;
  }
  static op_Equality(e, t) {
    for (let r = 0; r < 16; r++)
      if (e._data[r] != t._data[r])
        return !1;
    return !0;
  }
  Clone() {
    return new lt(this._data);
  }
}
class $c {
  constructor() {
    p(this, "_promise");
    p(this, "_resolve");
    p(this, "_reject");
    this._promise = new Promise((e, t) => {
      this._resolve = e, this._reject = t;
    });
  }
  get Task() {
    return this._promise;
  }
  SetResult(e) {
    this._resolve(e);
  }
  SetException(e) {
    this._reject(e);
  }
}
class Tc {
  constructor(e, t) {
    p(this, "Item1");
    p(this, "Item2");
    this.Item1 = e, this.Item2 = t;
  }
}
class Oc {
  constructor(e, t, r, s) {
    p(this, "Item1");
    p(this, "Item2");
    p(this, "Item3");
    p(this, "Item4");
    this.Item1 = e, this.Item2 = t, this.Item3 = r, this.Item4 = s;
  }
}
class Ic {
  constructor() {
    p(this, "_startTime");
    p(this, "_stopTime");
  }
  Start() {
    this._startTime = R.UtcNow;
  }
  Stop() {
    this._stopTime = R.UtcNow;
  }
  get ElapsedMilliseconds() {
    return this._stopTime == null ? BigInt(R.UtcNow.Subtract(this._startTime).TotalMilliseconds) : BigInt(this._stopTime.Subtract(this._startTime).TotalMilliseconds);
  }
}
class Gi {
  constructor(e, t) {
    p(this, "Key");
    p(this, "Value");
    this.Key = e, this.Value = t;
  }
}
class Mc {
  constructor(e) {
    p(this, "map", /* @__PURE__ */ new Map());
  }
  Init(e) {
    for (const t of e)
      this.map.set(t[0], t[1]);
    return this;
  }
  get length() {
    return this.map.size;
  }
  get Keys() {
    return tt(this.map.keys());
  }
  get Values() {
    return tt(this.map.values());
  }
  ContainsKey(e) {
    return this.map.has(e);
  }
  GetAt(e) {
    if (!this.map.has(e))
      throw new H("Key not exists");
    return this.map.get(e);
  }
  SetAt(e, t) {
    this.map.set(e, t);
  }
  TryGetValue(e, t) {
    let r = this.map.get(e);
    return r !== void 0 ? (t.Value = r, !0) : !1;
  }
  Add(e, t) {
    if (this.map.has(e))
      throw new H("Key already exists");
    this.map.set(e, t);
  }
  Remove(e) {
    return this.map.has(e) ? (this.map.delete(e), !0) : !1;
  }
  Clear() {
    this.map.clear();
  }
  *[Symbol.iterator]() {
    for (const e of this.map.entries())
      yield new Gi(e[0], e[1]);
  }
}
class Ec extends z {
  Push(e) {
    this.Add(e);
  }
  Pop() {
    if (this.length === 0)
      throw new Error("Stack is empty");
    return this.splice(this.length - 1, 1)[0];
  }
}
class bc extends Set {
  Clear() {
    this.clear();
  }
  Add(e) {
    this.add(e);
  }
  Remove(e) {
    this.delete(e);
  }
  get length() {
    return this.size;
  }
}
class Yi {
  constructor(e, t = null) {
    p(this, "prev");
    p(this, "next");
    p(this, "list");
    p(this, "item");
    this.item = e, this.list = t;
  }
  get Value() {
    return this.item;
  }
  set Value(e) {
    this.item = e;
  }
  get Next() {
    return this.next == null || this.next === this.list.head ? null : this.next;
  }
  get Previous() {
    return this.prev == null || this === this.list.head ? null : this.prev;
  }
  Invalidate() {
    this.list = null, this.next = null, this.prev = null;
  }
}
class xc {
  constructor() {
    p(this, "head");
    p(this, "count", 0);
  }
  get length() {
    return this.count;
  }
  get First() {
    return this.head;
  }
  get Last() {
    return this.head.prev;
  }
  Contains(e) {
    throw new Error();
  }
  AddLast(e) {
    let t = new Yi(e, this);
    return this.head == null ? this.InternalInsertNodeToEmptyList(t) : this.InternalInsertNodeBefore(this.head, t), t;
  }
  AddFirst(e) {
    throw new Error();
  }
  AddAfter(e, t) {
    throw new Error();
  }
  AddBefore(e, t) {
    throw new Error();
  }
  InternalInsertNodeBefore(e, t) {
    t.next = e, t.prev = e.prev, e.prev.next = t, e.prev = t, this.count++;
  }
  InternalInsertNodeToEmptyList(e) {
    e.next = e, e.prev = e, this.head = e, this.count++;
  }
  Remove(e) {
    throw new Error();
  }
  Clear() {
    throw new Error();
  }
  *[Symbol.iterator]() {
    if (this.head == null)
      return;
    let e = this.head;
    for (; ; )
      if (yield e.Value, e = e.next, e == null || e === this.head)
        return;
  }
}
class Sc extends z {
}
const x = Symbol("@ts-pattern/matcher"), U = "@ts-pattern/anonymous-select-key", Z = (n) => Boolean(n && typeof n == "object"), L = (n) => n && !!n[x], b = (n, e, t) => {
  if (Z(n)) {
    if (L(n)) {
      const r = n[x](), { matched: s, selections: o = {} } = r.match(e);
      return s && Object.keys(o).forEach((a) => t(a, o[a])), s;
    }
    if (!Z(e))
      return !1;
    if (Array.isArray(n))
      return !!Array.isArray(e) && n.length === e.length && n.every((r, s) => b(r, e[s], t));
    if (n instanceof Map)
      return e instanceof Map && Array.from(n.keys()).every((r) => b(n.get(r), e.get(r), t));
    if (n instanceof Set) {
      if (!(e instanceof Set))
        return !1;
      if (n.size === 0)
        return e.size === 0;
      if (n.size === 1) {
        const [r] = Array.from(n.values());
        return L(r) ? Array.from(e.values()).every((s) => b(r, s, t)) : e.has(r);
      }
      return Array.from(n.values()).every((r) => e.has(r));
    }
    return Object.keys(n).every((r) => {
      const s = n[r];
      return (r in e || L(o = s) && o[x]().matcherType === "optional") && b(s, e[r], t);
      var o;
    });
  }
  return Object.is(e, n);
}, V = (n) => {
  var e, t, r;
  return Z(n) ? L(n) ? (e = (t = (r = n[x]()).getSelectionKeys) == null ? void 0 : t.call(r)) != null ? e : [] : Array.isArray(n) ? K(n, V) : K(Object.values(n), V) : [];
}, K = (n, e) => n.reduce((t, r) => t.concat(e(r)), []);
function et(n) {
  return { [x]: () => ({ match: (e) => {
    let t = {};
    const r = (s, o) => {
      t[s] = o;
    };
    return e === void 0 ? (V(n).forEach((s) => r(s, void 0)), { matched: !0, selections: t }) : { matched: b(n, e, r), selections: t };
  }, getSelectionKeys: () => V(n), matcherType: "optional" }) };
}
function nt(n) {
  return { [x]: () => ({ match: (e) => {
    if (!Array.isArray(e))
      return { matched: !1 };
    let t = {};
    const r = (s, o) => {
      t[s] = (t[s] || []).concat([o]);
    };
    return { matched: e.every((s) => b(n, s, r)), selections: t };
  }, getSelectionKeys: () => V(n) }) };
}
function rt(...n) {
  return { [x]: () => ({ match: (e) => {
    let t = {};
    const r = (s, o) => {
      t[s] = o;
    };
    return { matched: n.every((s) => b(s, e, r)), selections: t };
  }, getSelectionKeys: () => K(n, V), matcherType: "and" }) };
}
function st(...n) {
  return { [x]: () => ({ match: (e) => {
    let t = {};
    const r = (s, o) => {
      t[s] = o;
    };
    return K(n, V).forEach((s) => r(s, void 0)), { matched: n.some((s) => b(s, e, r)), selections: t };
  }, getSelectionKeys: () => K(n, V), matcherType: "or" }) };
}
function ot(n) {
  return { [x]: () => ({ match: (e) => ({ matched: !b(n, e, () => {
  }) }), getSelectionKeys: () => [], matcherType: "not" }) };
}
function N(n) {
  return { [x]: () => ({ match: (e) => ({ matched: Boolean(n(e)) }) }) };
}
function at(...n) {
  const e = typeof n[0] == "string" ? n[0] : void 0, t = n.length === 2 ? n[1] : typeof n[0] == "string" ? void 0 : n[0];
  return { [x]: () => ({ match: (r) => {
    let s = { [e ?? U]: r };
    return { matched: t === void 0 || b(t, r, (o, a) => {
      s[o] = a;
    }), selections: s };
  }, getSelectionKeys: () => [e ?? U].concat(t === void 0 ? [] : V(t)) }) };
}
const ut = N(function(n) {
  return !0;
}), Zi = ut, Ji = N(function(n) {
  return typeof n == "string";
}), Hi = N(function(n) {
  return typeof n == "number";
}), Xi = N(function(n) {
  return typeof n == "boolean";
}), Qi = N(function(n) {
  return typeof n == "bigint";
}), tc = N(function(n) {
  return typeof n == "symbol";
}), ec = N(function(n) {
  return n == null;
});
var nc = { __proto__: null, optional: et, array: nt, intersection: rt, union: st, not: ot, when: N, select: at, any: ut, _: Zi, string: Ji, number: Hi, boolean: Xi, bigint: Qi, symbol: tc, nullish: ec, instanceOf: function(n) {
  return N(function(e) {
    return (t) => t instanceof e;
  }(n));
}, typed: function() {
  return { array: nt, optional: et, intersection: rt, union: st, not: ot, select: at, when: N };
} };
const rc = (n) => C(n, []), C = (n, e) => {
  const t = () => {
    const r = e.find(({ test: s }) => s(n));
    if (!r) {
      let s;
      try {
        s = JSON.stringify(n);
      } catch {
        s = n;
      }
      throw new Error(`Pattern matching error: no pattern matches value ${s}`);
    }
    return r.handler(r.select(n), n);
  };
  return { with(...r) {
    const s = r[r.length - 1], o = [], a = [];
    r.length === 3 && typeof r[1] == "function" ? (o.push(r[0]), a.push(r[1])) : o.push(...r.slice(0, r.length - 1));
    let i = {};
    return C(n, e.concat([{ test: (l) => Boolean(o.some((y) => b(y, l, (m, T) => {
      i[m] = T;
    })) && a.every((y) => y(l))), handler: s, select: (l) => Object.keys(i).length ? U in i ? i[U] : i : l }]));
  }, when: (r, s) => C(n, e.concat([{ test: r, handler: s, select: (o) => o }])), otherwise: (r) => C(n, e.concat([{ test: () => !0, handler: r, select: (s) => s }])).run(), exhaustive: () => t(), run: t };
}, Nc = () => {
  Li();
  let n = window;
  n.match = rc, n.when = nc.when, n.clamp = function(e, t, r) {
    return Math.min(Math.max(e, t), r);
  }, Object.defineProperty(String.prototype, "Insert", {
    value: function(e, t) {
      return this.slice(0, e) + t + this.slice(e);
    }
  }), Object.defineProperty(String.prototype, "Remove", {
    value: function(e, t) {
      return this.substring(0, e) + this.substring(e + t);
    }
  }), Object.defineProperty(Number.prototype, "CompareTo", {
    value: function(e) {
      return this < e ? -1 : this > e ? 1 : 0;
    }
  }), Object.defineProperty(Object.prototype, "Init", {
    value: function(e) {
      return Object.assign(this, e), this;
    },
    configurable: !0,
    writable: !0
  });
};
class ft {
  constructor(e, t) {
    p(this, "_getter");
    p(this, "_setter");
    this._getter = e, this._setter = t;
  }
  get Value() {
    return this._getter();
  }
  set Value(e) {
    this._setter(e);
  }
}
class Vc extends ft {
}
class Dc extends ft {
}
export {
  H as ArgumentException,
  ac as ArgumentNullException,
  E as ArgumentOutOfRangeException,
  or as BinarySearch,
  R as DateTime,
  zi as DefaultEnumerator,
  Mc as Dictionary,
  tt as EnumerableFrom,
  yc as Equals,
  Pc as Event,
  B as Exception,
  lt as Guid,
  bc as HashSet,
  ic as IndexOutOfRangeException,
  f as InvalidOperationException,
  gc as IsInterfaceOfIDisposable,
  pc as IsInterfaceOfIEnumerable,
  vc as IsInterfaceOfINotifyCollectionChanged,
  Ac as IsInterfaceOfINotifyPropertyChanged,
  uc as IsNullOrEmpty,
  fc as IsNullOrWhiteSpace,
  Gi as KeyValuePair,
  xc as LinkedList,
  Yi as LinkedListNode,
  z as List,
  lc as NotImplementedException,
  cc as NotSupportedException,
  Ui as NotifyCollectionChangedAction,
  dc as NotifyCollectionChangedEventArgs,
  oc as NumberComparer,
  Sc as ObservableCollection,
  sr as OpEquality,
  hc as OpInequality,
  Dc as Out,
  mc as PropertyChangedEventArgs,
  kc as Random,
  Vc as Ref,
  Ec as Stack,
  Ic as Stopwatch,
  wc as StringToUint16Array,
  $c as TaskCompletionSource,
  q as TimeSpan,
  Tc as Tuple2,
  Oc as Tuple4,
  Nc as initializeSystem
};
