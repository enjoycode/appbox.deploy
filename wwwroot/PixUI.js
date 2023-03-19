var rr = Object.defineProperty;
var lr = (i, a, n) => a in i ? rr(i, a, { enumerable: !0, configurable: !0, writable: !0, value: n }) : i[a] = n;
var m = (i, a, n) => (lr(i, typeof a != "symbol" ? a + "" : a, n), n), pa = (i, a, n) => {
  if (!a.has(i))
    throw TypeError("Cannot " + n);
};
var d = (i, a, n) => (pa(i, a, "read from private field"), n ? n.call(i) : a.get(i)), b = (i, a, n) => {
  if (a.has(i))
    throw TypeError("Cannot add the same private member more than once");
  a instanceof WeakSet ? a.add(i) : a.set(i, n);
}, N = (i, a, n, r) => (pa(i, a, "write to private field"), r ? r.call(i, n) : a.set(i, n), n);
import * as g from "/System.js";
import { List as ir } from "/System.js";
const He = class extends Float32Array {
  constructor(a, n, r, l) {
    super([0, 0, 0, 0]), n !== void 0 && r !== void 0 ? (this[0] = He.clamp(a) / 255, this[1] = He.clamp(n) / 255, this[2] = He.clamp(r) / 255, this[3] = l === void 0 ? 1 : He.clamp(l) / 255) : (this[0] = (a >> 16 & 255) / 255, this[1] = (a >> 8 & 255) / 255, this[2] = (a & 255) / 255, this[3] = (a >> 24 & 255) / 255);
  }
  static clamp(a) {
    return Math.round(Math.max(0, Math.min(a || 0, 255)));
  }
  get obs() {
    return new ia(this);
  }
  get Red() {
    return this[0] * 255;
  }
  get Green() {
    return this[1] * 255;
  }
  get Blue() {
    return this[2] * 255;
  }
  get Alpha() {
    return this[3] * 255;
  }
  get IsOpaque() {
    return Math.floor(this.Alpha) == 255;
  }
  WithAlpha(a) {
    return new He(this.Red, this.Green, this.Blue, a);
  }
  Clone() {
    return new He(this.Red, this.Green, this.Blue, this.Alpha);
  }
  static op_Equality(a, n) {
    return a === n ? !0 : a[0] == n[0] && a[1] == n[1] && a[2] == n[2] && a[3] == n[3];
  }
  static Lerp(a, n, r) {
    return Ve.Lerp(a, n, r);
  }
};
let T = He;
m(T, "Empty", new He(0));
const kn = class extends Float32Array {
  constructor(a, n) {
    super([0, 0]), a !== void 0 && n !== void 0 && (this[0] = a, this[1] = n);
  }
  get X() {
    return this[0];
  }
  set X(a) {
    this[0] = a;
  }
  get Y() {
    return this[1];
  }
  set Y(a) {
    this[1] = a;
  }
  Offset(a, n) {
    this[0] += a, this[1] += n;
  }
  Clone() {
    return new kn(this.X, this.Y);
  }
  static op_Equality(a, n) {
    return a.X === n.X && a.Y === n.Y;
  }
};
let dn = kn;
m(dn, "Empty", new kn());
class Qt {
  constructor(a, n) {
    m(this, "Width");
    m(this, "Height");
    this.Width = a, this.Height = n;
  }
  Clone() {
    return new Qt(this.Width, this.Height);
  }
  static op_Equality(a, n) {
    return a === n ? !0 : a.Width == n.Width && a.Height == n.Height;
  }
}
const Ge = class extends Float32Array {
  constructor(a, n, r, l) {
    super([0, 0, 0, 0]), a !== void 0 && n !== void 0 && r !== void 0 && l !== void 0 && (this[0] = a, this[1] = n, this[2] = r, this[3] = l);
  }
  static FromLTWH(a, n, r, l) {
    return new Ge(a, n, r + a, l + n);
  }
  static FromFloat32Array(a) {
    return new Ge(a[0], a[1], a[2], a[3]);
  }
  get Left() {
    return this[0];
  }
  get Top() {
    return this[1];
  }
  get Right() {
    return this[2];
  }
  get Bottom() {
    return this[3];
  }
  get Width() {
    return this[2] - this[0];
  }
  get Height() {
    return this[3] - this[1];
  }
  get MidX() {
    return this.Left + this.Width / 2;
  }
  get MidY() {
    return this.Top + this.Height / 2;
  }
  get IsEmpty() {
    return Ge.op_Equality(this, Ge.Empty);
  }
  ContainsPoint(a, n) {
    return a >= this.Left && a < this.Right && n >= this.Top && n < this.Bottom;
  }
  Offset(a, n) {
    this[0] += a, this[1] += n, this[2] += a, this[3] += n;
  }
  IntersectTo(a) {
    if (!this.IntersectsWith(a.Left, a.Top, a.Width, a.Height)) {
      this[0] = 0, this[1] = 0, this[2] = 0, this[3] = 0;
      return;
    }
    this[0] = Math.max(this.Left, a.Left), this[1] = Math.max(this.Top, a.Top), this[2] = Math.min(this.Right, a.Right), this[3] = Math.min(this.Bottom, a.Bottom);
  }
  IntersectsWith(a, n, r, l) {
    return this.Left < a + r && this.Right > a && this.Top < n + l && this.Bottom > n;
  }
  Clone() {
    return new Ge(this.Left, this.Top, this.Right, this.Bottom);
  }
  static op_Equality(a, n) {
    return a.Left === n.Left && a.Top === n.Top && a.Right === n.Right && a.Bottom === n.Bottom;
  }
};
let f = Ge;
m(f, "Empty", new Ge());
class he extends Float32Array {
  static FromRectAndCorner(a, n = null, r = null, l = null, o = null) {
    let h = new he();
    return h[0] = a.Left, h[1] = a.Top, h[2] = a.Right, h[3] = a.Bottom, h.SetRadius(4, n), h.SetRadius(6, r), h.SetRadius(8, o), h.SetRadius(10, l), h;
  }
  static FromRectAndRadius(a, n, r) {
    let l = new he();
    return l[0] = a.Left, l[1] = a.Top, l[2] = a.Right, l[3] = a.Bottom, l[4] = n, l[5] = r, l[6] = n, l[7] = r, l[8] = n, l[9] = r, l[10] = n, l[11] = r, l;
  }
  static FromCopy(a) {
    let n = new he();
    for (let r = 0; r < 12; r++)
      n[r] = a[r];
    return n;
  }
  constructor() {
    super([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  SetRadius(a, n) {
    n != null && (this[a] = n.X, this[a + 1] = n.Y);
  }
  Inflate(a, n) {
    this[0] -= a, this[1] -= n, this[2] += a, this[3] += n, this[4] += a, this[5] += n, this[6] += a, this[7] += n, this[8] += a, this[9] += n, this[10] += a, this[11] += n;
  }
  Deflate(a, n) {
    this.Inflate(-a, -n);
  }
  Shift(a, n) {
    this[0] += a, this[1] += n, this[2] += a, this[3] += n;
  }
}
class ea extends Float32Array {
  constructor(a, n, r, l) {
    super([a, n, r, l]);
  }
  Clone() {
    return new ea(this[0], this[1], this[2], this[3]);
  }
}
const X = class extends Float32Array {
  constructor(a, n, r, l, o, h, A, y, F, u, w, P, C, R, L, v) {
    super([a, n, r, l, o, h, A, y, F, u, w, P, C, R, L, v]);
  }
  get M0() {
    return this[0];
  }
  get M1() {
    return this[1];
  }
  get M2() {
    return this[2];
  }
  get M3() {
    return this[3];
  }
  get M4() {
    return this[4];
  }
  get M5() {
    return this[5];
  }
  get M6() {
    return this[6];
  }
  get M7() {
    return this[7];
  }
  get M8() {
    return this[8];
  }
  get M9() {
    return this[9];
  }
  get M10() {
    return this[10];
  }
  get M11() {
    return this[11];
  }
  get M12() {
    return this[12];
  }
  get M13() {
    return this[13];
  }
  get M14() {
    return this[14];
  }
  get M15() {
    return this[15];
  }
  static CreateEmpty() {
    return new X(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  static CreateIdentity() {
    return new X(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
  }
  static CreateTranslation(a, n, r) {
    return new X(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      a,
      n,
      r,
      1
    );
  }
  static CreateScale(a, n, r) {
    return new X(
      a,
      0,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      0,
      r,
      0,
      0,
      0,
      0,
      1
    );
  }
  static TryInvert(a) {
    let n = X.CreateEmpty();
    return n.CopyInverse(a) == 0 ? null : n;
  }
  Translate(a, n = 0, r = 0) {
    this[12] = this[0] * a + this[4] * n + this[8] * r + this[12], this[13] = this[1] * a + this[5] * n + this[9] * r + this[13], this[14] = this[2] * a + this[6] * n + this[10] * r + this[14], this[15] = this[3] * a + this[7] * n + this[11] * r + this[15];
  }
  Scale(a, n = 1, r = 1) {
    this[0] *= a, this[1] *= a, this[2] *= a, this[3] *= a, this[4] *= n, this[5] *= n, this[6] *= n, this[7] *= n, this[8] *= r, this[9] *= r, this[10] *= r, this[11] *= r;
  }
  RotateZ(a) {
    let n = Math.cos(a), r = Math.sin(a), l = this[0] * n + this[4] * r, o = this[1] * n + this[5] * r, h = this[2] * n + this[6] * r, A = this[3] * n + this[7] * r, y = this[0] * -r + this[4] * n, F = this[1] * -r + this[5] * n, u = this[2] * -r + this[6] * n, w = this[3] * -r + this[7] * n;
    this[0] = l, this[1] = o, this[2] = h, this[3] = A, this[4] = y, this[5] = F, this[6] = u, this[7] = w;
  }
  Multiply(a) {
    let n = this[0], r = this[4], l = this[8], o = this[12], h = this[1], A = this[5], y = this[9], F = this[13], u = this[2], w = this[6], P = this[10], C = this[14], R = this[3], L = this[7], v = this[11], V = this[15], z = a[0], _ = a[4], Fe = a[8], ue = a[12], ge = a[1], we = a[5], Pe = a[9], de = a[13], be = a[2], Ne = a[6], ce = a[10], fe = a[14], Be = a[3], E = a[7], un = a[11], gn = a[15];
    this[0] = n * z + r * ge + l * be + o * Be, this[4] = n * _ + r * we + l * Ne + o * E, this[8] = n * Fe + r * Pe + l * ce + o * un, this[12] = n * ue + r * de + l * fe + o * gn, this[1] = h * z + A * ge + y * be + F * Be, this[5] = h * _ + A * we + y * Ne + F * E, this[9] = h * Fe + A * Pe + y * ce + F * un, this[13] = h * ue + A * de + y * fe + F * gn, this[2] = u * z + w * ge + P * be + C * Be, this[6] = u * _ + w * we + P * Ne + C * E, this[10] = u * Fe + w * Pe + P * ce + C * un, this[14] = u * ue + w * de + P * fe + C * gn, this[3] = R * z + L * ge + v * be + V * Be, this[7] = R * _ + L * we + v * Ne + V * E, this[11] = R * Fe + L * Pe + v * ce + V * un, this[15] = R * ue + L * de + v * fe + V * gn;
  }
  PreConcat(a) {
    let n = a.Clone();
    n.Multiply(this), this.CopyFrom(n);
  }
  CopyInverse(a) {
    let n = a[0], r = a[1], l = a[2], o = a[3], h = a[4], A = a[5], y = a[6], F = a[7], u = a[8], w = a[9], P = a[10], C = a[11], R = a[12], L = a[13], v = a[14], V = a[15], z = n * A - r * h, _ = n * y - l * h, Fe = n * F - o * h, ue = r * y - l * A, ge = r * F - o * A, we = l * F - o * y, Pe = u * L - w * R, de = u * v - P * R, be = u * V - C * R, Ne = w * v - P * L, ce = w * V - C * L, fe = P * V - C * v, Be = z * fe - _ * ce + Fe * Ne + ue * be - ge * de + we * Pe;
    if (Be == 0)
      return this.CopyFrom(a), 0;
    let E = 1 / Be;
    return this[0] = (A * fe - y * ce + F * Ne) * E, this[1] = (-r * fe + l * ce - o * Ne) * E, this[2] = (L * we - v * ge + V * ue) * E, this[3] = (-w * we + P * ge - C * ue) * E, this[4] = (-h * fe + y * be - F * de) * E, this[5] = (n * fe - l * be + o * de) * E, this[6] = (-R * we + v * Fe - V * _) * E, this[7] = (u * we - P * Fe + C * _) * E, this[8] = (h * ce - A * be + F * Pe) * E, this[9] = (-n * ce + r * be - o * Pe) * E, this[10] = (R * ge - L * Fe + V * z) * E, this[11] = (-u * ge + w * Fe - C * z) * E, this[12] = (-h * Ne + A * de - y * Pe) * E, this[13] = (n * Ne - r * de + l * Pe) * E, this[14] = (-R * ue + L * _ - v * z) * E, this[15] = (u * ue - w * _ + P * z) * E, Be;
  }
  CopyFrom(a) {
    for (let n = 0; n < 16; n++)
      this[n] = a[n];
  }
  Clone() {
    let a = X.CreateEmpty();
    return a.CopyFrom(this), a;
  }
  static GetIndex(a, n) {
    return n * 4 + a;
  }
  SetRow(a, n) {
    this[X.GetIndex(a, 0)] = n[0], this[X.GetIndex(a, 1)] = n[1], this[X.GetIndex(a, 2)] = n[2], this[X.GetIndex(a, 3)] = n[3];
  }
  SetColumn(a, n) {
    let r = a * 4;
    this[r + 3] = n[3], this[r + 2] = n[2], this[r + 1] = n[1], this[r] = n[0];
  }
  TransponseTo() {
    return new X(
      this[0],
      this[4],
      this[8],
      this[12],
      this[1],
      this[5],
      this[9],
      this[13],
      this[2],
      this[6],
      this[10],
      this[14],
      this[3],
      this[7],
      this[11],
      this[15]
    );
  }
  static op_Equality(a, n) {
    for (let r = 0; r < 16; r++)
      if (a[r] != n[r])
        return !1;
    return !0;
  }
  get IsIdentity() {
    return X.op_Equality(this, X.CreateIdentity());
  }
};
let j = X;
m(j, "Empty", X.CreateEmpty());
class Ye {
  static GetAsTranslation(a) {
    return a[0] == 1 && a[1] == 0 && a[2] == 0 && a[3] == 0 && a[4] == 0 && a[5] == 1 && a[6] == 0 && a[7] == 0 && a[8] == 0 && a[9] == 0 && a[10] == 1 && a[11] == 0 && a[14] == 0 && a[15] == 1 ? new k(a[12], a[13]) : null;
  }
  static TransformPoint(a, n, r) {
    let l = a[0] * n + a[4] * r + a[12], o = a[1] * n + a[5] * r + a[13], h = a[3] * n + a[7] * r + a[15];
    return h == 1 ? new k(l, o) : new k(l / h, o / h);
  }
}
class ta {
  constructor() {
    m(this, "Rect");
    m(this, "Direction");
  }
  Clone() {
    let a = new ta();
    return a.Rect = this.Rect, a.Direction = this.Direction, a;
  }
}
const mr = 4, or = 5, hr = 0.039, Ar = 0.25, yr = 1.1, Fr = 600, ur = 0, gr = -450;
function Ca(i, a, n, r) {
  let l = i.getRectsForRange(a, a + 1, n, r), o = new ta();
  return o.Rect = new f(l[0].rect[0], l[0].rect[1], l[0].rect[2], l[0].rect[3]), o.Direction = l[0].dir === 1 ? CanvasKit.TextDirection.LTR : CanvasKit.TextDirection.RTL, o;
}
function vn(i, a, n, r, l, o) {
  let h = l ? or : mr, A = n.WithAlpha(Math.round(n.Alpha * hr)), y = n.WithAlpha(Math.round(n.Alpha * Ar)), F = CanvasKit.computeTonalColors({ ambient: A, spot: y });
  i.drawShadow(
    a,
    [0, 0, o * r],
    [ur, gr, o * Fr],
    o * yr,
    F.ambient,
    F.spot,
    h
  );
}
function xa(i) {
  return (i.fontFamilies == null || i.fontFamilies.length === 0) && (i.fontFamilies = [oe.DefaultFontFamily]), new CanvasKit.TextStyle(i);
}
function Ba(i) {
  return i.textStyle == null && (i.textStyle = {}), new CanvasKit.ParagraphStyle(i);
}
function va(i) {
  return CanvasKit.ParagraphBuilder.MakeFromFontProvider(i, oe.Instance.FontProvider);
}
function Sa(i) {
  return i > 0 ? 0.57735 * i + 0.5 : 0;
}
class Va {
  constructor(a, n) {
    m(this, "weight");
    m(this, "slant");
    this.weight = a, this.slant = n;
  }
}
const Je = class {
  constructor(a) {
    m(this, "FontChanged", new g.Event());
    m(this, "_fontProvider");
    m(this, "_loading", /* @__PURE__ */ new Set());
    m(this, "_loaded", /* @__PURE__ */ new Map());
    this._fontProvider = a;
  }
  static get Instance() {
    return Je._instance;
  }
  static Init(a) {
    let n = CanvasKit.TypefaceFontProvider.Make();
    Je._instance = new Je(n), Je._instance.RegisterTypeface(a, Je.DefaultFontFamily);
  }
  get FontProvider() {
    return this._fontProvider;
  }
  RegisterTypeface(a, n) {
    let r = CanvasKit.Typeface.MakeFreeTypeFaceFromData(a);
    if (!r)
      return console.log("Can't decode font data"), null;
    let l = new TextEncoder().encode(n), o = CanvasKit.Malloc(Uint8Array, l.length + 1);
    o.toTypedArray().set(l), this._fontProvider._registerFont(r, o.byteOffset), CanvasKit.Free(o), this._loaded.set(n, r), this.FontChanged.Invoke();
  }
  TryMatchFamilyFromAsset(a) {
    return this._loaded.get(a);
  }
  StartLoadFontFromAsset(a, n, r) {
    this._loading.has(r) || (this._loading.add(r), console.log(`Start load font: ${a} ${n} ${r}`), a == "PixUI" && fetch("/" + n).then((l) => l.arrayBuffer()).then((l) => {
      this.RegisterTypeface(l, r), this._loading.delete(r);
    }));
  }
};
let oe = Je;
m(oe, "DefaultFontFamily", "MiSans"), m(oe, "_instance");
class sl {
  constructor(a, n) {
    m(this, "_flag", 0);
    m(this, "_millisecondsDelay", 0);
    m(this, "_action");
    this._millisecondsDelay = a, this._action = n;
  }
  Run() {
    this._flag++, this._flag === 1 && this.RunInternal();
  }
  RunInternal() {
    setTimeout(() => {
      this._flag === 1 ? (this._flag = 0, this._action()) : (this._flag = 1, this.RunInternal());
    }, this._millisecondsDelay);
  }
}
class Ea extends ir {
  constructor(n) {
    super();
    m(this, "_parent");
    this._parent = n;
  }
  Add(n) {
    n.Parent = this._parent, this.push(n);
  }
  Remove(n) {
    let r = this.indexOf(n);
    return r >= 0 && (n.Parent = null, this.splice(r, 1)), r >= 0;
  }
  RemoveAll(n) {
    for (let r = this.length - 1; r >= 0; r--)
      n(this[r]) && (this[r].Parent = null, this.splice(r, 1));
  }
  IndexOf(n) {
    return this.indexOf(n);
  }
  Insert(n, r) {
    r.Parent = this._parent, this.splice(n, 0, r);
  }
  RemoveAt(n) {
    this[n].Parent = null, this.splice(n, 1);
  }
  Clear() {
    for (const n of this)
      n.Parent = null;
    this.splice(0);
  }
}
const vt = class {
  constructor(a, n, r, l) {
    m(this, "Left");
    m(this, "Top");
    m(this, "Right");
    m(this, "Bottom");
    this.Left = Math.max(0, a), this.Top = Math.max(0, n), this.Right = Math.max(0, r), this.Bottom = Math.max(0, l);
  }
  get Horizontal() {
    return this.Left + this.Right;
  }
  get Vertical() {
    return this.Top + this.Bottom;
  }
  static All(a) {
    return new vt(a, a, a, a);
  }
  static Only(a, n, r, l) {
    return new vt(a, n, r, l);
  }
  Clone() {
    return new vt(this.Left, this.Top, this.Right, this.Bottom);
  }
  static op_Equality(a, n) {
    return a.Equals(n);
  }
  static op_Inequality(a, n) {
    return !a.Equals(n);
  }
  Equals(a) {
    return this.Left == a.Left && this.Top == a.Top && this.Right == a.Right && this.Bottom == a.Bottom;
  }
};
let Z = vt;
m(Z, "$meta_System_IEquatable", !0);
var Xn = /* @__PURE__ */ ((i) => (i[i.Horizontal = 0] = "Horizontal", i[i.Vertical = 1] = "Vertical", i))(Xn || {}), te = /* @__PURE__ */ ((i) => (i[i.Left = 0] = "Left", i[i.Center = 1] = "Center", i[i.Right = 2] = "Right", i))(te || {}), Ae = /* @__PURE__ */ ((i) => (i[i.Top = 0] = "Top", i[i.Middle = 1] = "Middle", i[i.Bottom = 2] = "Bottom", i))(Ae || {});
const gt = class {
  static Random(a = 255) {
    var r;
    (r = gt._random) != null || (gt._random = new g.Random());
    let n = Math.floor(gt._random.Next(0, 1 << 24) | a << 24) & 4294967295;
    return new T(n);
  }
};
let D = gt;
m(D, "White", new T(255, 255, 255)), m(D, "Black", new T(0, 0, 0)), m(D, "Red", new T(255, 0, 0)), m(D, "Blue", new T(0, 0, 255)), m(D, "Green", new T(0, 255, 0)), m(D, "Gray", new T(4284441448)), m(D, "_random");
var Jt, Zt;
const ga = class {
  constructor() {
    b(this, Jt, !0);
    b(this, Zt, void 0);
  }
  get Loading() {
    return d(this, Jt);
  }
  set Loading(a) {
    N(this, Jt, a);
  }
  get Image() {
    return d(this, Zt);
  }
  set Image(a) {
    N(this, Zt, a);
  }
  static FromEncodedData(a) {
    return new ga().Init(
      {
        Loading: !1,
        Image: CanvasKit.MakeImageFromEncoded(a)
      }
    );
  }
  static FromNetwork(a) {
    throw new g.NotImplementedException();
  }
};
let Ra = ga;
Jt = new WeakMap(), Zt = new WeakMap();
const Ze = class {
  constructor(a, n) {
    m(this, "Dx");
    m(this, "Dy");
    this.Dx = a, this.Dy = n;
  }
  get IsEmpty() {
    return this.Dx == 0 && this.Dy == 0;
  }
  static Lerp(a, n, r) {
    return n == null ? a == null ? null : new Ze(a.Dx * (1 - r), a.Dy * (1 - r)) : a == null ? new Ze(n.Dx * r, n.Dy * r) : new Ze(
      mt.Lerp(a.Dx, n.Dx, r),
      mt.Lerp(a.Dy, n.Dy, r)
    );
  }
  Equals(a) {
    return this.Dx == a.Dx && this.Dy == a.Dy;
  }
  static op_Equality(a, n) {
    return a.Equals(n);
  }
  static op_Inequality(a, n) {
    return !a.Equals(n);
  }
  Clone() {
    return new Ze(this.Dx, this.Dy);
  }
  toString() {
    return `{{Dx=${this.Dx}, Dy=${this.Dy}}}`;
  }
};
let k = Ze;
m(k, "$meta_System_IEquatable", !0), m(k, "Empty", new Ze(0, 0));
const ee = class {
  static Shared(a = null, n = CanvasKit.PaintStyle.Fill, r = 1) {
    var l;
    return (l = ee._shared) != null || (ee._shared = new CanvasKit.Paint()), ee._shared.setStyle(n), ee._shared.setColor(a != null ? a : D.Black), ee._shared.setStrokeWidth(r), ee._shared.setStrokeCap(CanvasKit.StrokeCap.Butt), ee._shared.setStrokeJoin(CanvasKit.StrokeJoin.Miter), ee._shared.setMaskFilter(null), ee._shared.setAntiAlias(!1), ee._shared;
  }
};
let S = ee;
m(S, "_shared");
var B = ((i) => (i[i.None = 0] = "None", i[i.LButton = 1] = "LButton", i[i.RButton = 2] = "RButton", i[i.Cancel = 3] = "Cancel", i[i.MButton = 4] = "MButton", i[i.XButton1 = 5] = "XButton1", i[i.XButton2 = 6] = "XButton2", i[i.Back = 8] = "Back", i[i.Tab = 9] = "Tab", i[i.LineFeed = 10] = "LineFeed", i[i.Clear = 12] = "Clear", i[i.Return = 13] = "Return", i[i.Enter = 13] = "Enter", i[i.ShiftKey = 16] = "ShiftKey", i[i.ControlKey = 17] = "ControlKey", i[i.Menu = 18] = "Menu", i[i.Pause = 19] = "Pause", i[i.CapsLock = 20] = "CapsLock", i[i.Capital = 20] = "Capital", i[i.KanaMode = 21] = "KanaMode", i[i.HanguelMode = 21] = "HanguelMode", i[i.HangulMode = 21] = "HangulMode", i[i.JunjaMode = 23] = "JunjaMode", i[i.FinalMode = 24] = "FinalMode", i[i.KanjiMode = 25] = "KanjiMode", i[i.HanjaMode = 25] = "HanjaMode", i[i.Escape = 27] = "Escape", i[i.IMEConvert = 28] = "IMEConvert", i[i.IMENonconvert = 29] = "IMENonconvert", i[i.IMEAceept = 30] = "IMEAceept", i[i.IMEModeChange = 31] = "IMEModeChange", i[i.Space = 32] = "Space", i[i.PageUp = 33] = "PageUp", i[i.Prior = 33] = "Prior", i[i.PageDown = 34] = "PageDown", i[i.Next = 34] = "Next", i[i.End = 35] = "End", i[i.Home = 36] = "Home", i[i.Left = 37] = "Left", i[i.Up = 38] = "Up", i[i.Right = 39] = "Right", i[i.Down = 40] = "Down", i[i.Select = 41] = "Select", i[i.Print = 42] = "Print", i[i.Execute = 43] = "Execute", i[i.PrintScreen = 44] = "PrintScreen", i[i.Snapshot = 44] = "Snapshot", i[i.Insert = 45] = "Insert", i[i.Delete = 46] = "Delete", i[i.Help = 47] = "Help", i[i.D0 = 48] = "D0", i[i.D1 = 49] = "D1", i[i.D2 = 50] = "D2", i[i.D3 = 51] = "D3", i[i.D4 = 52] = "D4", i[i.D5 = 53] = "D5", i[i.D6 = 54] = "D6", i[i.D7 = 55] = "D7", i[i.D8 = 56] = "D8", i[i.D9 = 57] = "D9", i[i.A = 65] = "A", i[i.B = 66] = "B", i[i.C = 67] = "C", i[i.D = 68] = "D", i[i.E = 69] = "E", i[i.F = 70] = "F", i[i.G = 71] = "G", i[i.H = 72] = "H", i[i.I = 73] = "I", i[i.J = 74] = "J", i[i.K = 75] = "K", i[i.L = 76] = "L", i[i.M = 77] = "M", i[i.N = 78] = "N", i[i.O = 79] = "O", i[i.P = 80] = "P", i[i.Q = 81] = "Q", i[i.R = 82] = "R", i[i.S = 83] = "S", i[i.T = 84] = "T", i[i.U = 85] = "U", i[i.V = 86] = "V", i[i.W = 87] = "W", i[i.X = 88] = "X", i[i.Y = 89] = "Y", i[i.Z = 90] = "Z", i[i.LWin = 91] = "LWin", i[i.RWin = 92] = "RWin", i[i.Apps = 93] = "Apps", i[i.NumPad0 = 96] = "NumPad0", i[i.NumPad1 = 97] = "NumPad1", i[i.NumPad2 = 98] = "NumPad2", i[i.NumPad3 = 99] = "NumPad3", i[i.NumPad4 = 100] = "NumPad4", i[i.NumPad5 = 101] = "NumPad5", i[i.NumPad6 = 102] = "NumPad6", i[i.NumPad7 = 103] = "NumPad7", i[i.NumPad8 = 104] = "NumPad8", i[i.NumPad9 = 105] = "NumPad9", i[i.Multiply = 106] = "Multiply", i[i.Add = 107] = "Add", i[i.Separator = 108] = "Separator", i[i.Subtract = 109] = "Subtract", i[i.Decimal = 110] = "Decimal", i[i.Divide = 111] = "Divide", i[i.F1 = 112] = "F1", i[i.F2 = 113] = "F2", i[i.F3 = 114] = "F3", i[i.F4 = 115] = "F4", i[i.F5 = 116] = "F5", i[i.F6 = 117] = "F6", i[i.F7 = 118] = "F7", i[i.F8 = 119] = "F8", i[i.F9 = 120] = "F9", i[i.F10 = 121] = "F10", i[i.F11 = 122] = "F11", i[i.F12 = 123] = "F12", i[i.F13 = 124] = "F13", i[i.F14 = 125] = "F14", i[i.F15 = 126] = "F15", i[i.F16 = 127] = "F16", i[i.F17 = 128] = "F17", i[i.F18 = 129] = "F18", i[i.F19 = 130] = "F19", i[i.F20 = 131] = "F20", i[i.F21 = 132] = "F21", i[i.F22 = 133] = "F22", i[i.F23 = 134] = "F23", i[i.F24 = 135] = "F24", i[i.NumLock = 144] = "NumLock", i[i.Scroll = 145] = "Scroll", i[i.LShiftKey = 160] = "LShiftKey", i[i.RShiftKey = 161] = "RShiftKey", i[i.LControlKey = 162] = "LControlKey", i[i.RControlKey = 163] = "RControlKey", i[i.LMenu = 164] = "LMenu", i[i.RMenu = 165] = "RMenu", i[i.BrowserBack = 166] = "BrowserBack", i[i.BrowserForward = 167] = "BrowserForward", i[i.BrowserRefresh = 168] = "BrowserRefresh", i[i.BrowserStop = 169] = "BrowserStop", i[i.BrowserSearch = 170] = "BrowserSearch", i[i.BrowserFavorites = 171] = "BrowserFavorites", i[i.BrowserHome = 172] = "BrowserHome", i[i.VolumeMute = 173] = "VolumeMute", i[i.VolumeDown = 174] = "VolumeDown", i[i.VolumeUp = 175] = "VolumeUp", i[i.MediaNextTrack = 176] = "MediaNextTrack", i[i.MediaPreviousTrack = 177] = "MediaPreviousTrack", i[i.MediaStop = 178] = "MediaStop", i[i.MediaPlayPause = 179] = "MediaPlayPause", i[i.LaunchMail = 180] = "LaunchMail", i[i.SelectMedia = 181] = "SelectMedia", i[i.LaunchApplication1 = 182] = "LaunchApplication1", i[i.LaunchApplication2 = 183] = "LaunchApplication2", i[i.OemSemicolon = 186] = "OemSemicolon", i[i.Oemplus = 187] = "Oemplus", i[i.Oemcomma = 188] = "Oemcomma", i[i.OemMinus = 189] = "OemMinus", i[i.OemPeriod = 190] = "OemPeriod", i[i.OemQuestion = 191] = "OemQuestion", i[i.Oemtilde = 192] = "Oemtilde", i[i.OemOpenBrackets = 219] = "OemOpenBrackets", i[i.OemPipe = 220] = "OemPipe", i[i.OemCloseBrackets = 221] = "OemCloseBrackets", i[i.OemQuotes = 222] = "OemQuotes", i[i.Oem8 = 223] = "Oem8", i[i.OemBackslash = 226] = "OemBackslash", i[i.ProcessKey = 229] = "ProcessKey", i[i.Attn = 246] = "Attn", i[i.Crsel = 247] = "Crsel", i[i.Exsel = 248] = "Exsel", i[i.EraseEof = 249] = "EraseEof", i[i.Play = 250] = "Play", i[i.Zoom = 251] = "Zoom", i[i.NoName = 252] = "NoName", i[i.Pa1 = 253] = "Pa1", i[i.OemClear = 254] = "OemClear", i[i.KeyCode = 65535] = "KeyCode", i[i.Shift = 65536] = "Shift", i[i.Control = 131072] = "Control", i[i.Alt = 262144] = "Alt", i[i.Modifiers = Math.floor(4294901760) & 4294967295] = "Modifiers", i[i.IMEAccept = 30] = "IMEAccept", i[i.Oem102 = 226] = "Oem102", i[i.Oem5 = 220] = "Oem5", i[i.Oem7 = 222] = "Oem7", i[i.Packet = 231] = "Packet", i[i.Sleep = 95] = "Sleep", i))(B || {}), Kt;
class Ga {
  constructor() {
    b(this, Kt, !1);
  }
  get IsHandled() {
    return d(this, Kt);
  }
  set IsHandled(a) {
    N(this, Kt, a);
  }
  StopPropagate() {
    this.IsHandled = !0;
  }
  ResetHandled() {
    this.IsHandled = !1;
  }
}
Kt = new WeakMap();
class wr {
  constructor() {
    m(this, "_hookRefs", new g.List());
  }
  HookEvent(a, n) {
    if (this._hookRefs.length == 0)
      return !1;
    let r = U.NotProcessed;
    for (let l = 0; l < this._hookRefs.length; l++) {
      let o = this._hookRefs[l].deref();
      if (o == null)
        this._hookRefs.RemoveAt(l), l--;
      else {
        let h = o.PreviewEvent(a, n);
        if ((h & U.Processed) == U.Processed && (r |= U.Processed), (h & U.NoDispatch) == U.NoDispatch && (r |= U.NoDispatch), (h & U.NoContinue) == U.NoContinue) {
          r |= U.NoContinue;
          break;
        }
      }
    }
    return (r & U.NoDispatch) == U.NoDispatch;
  }
  Add(a) {
    this._hookRefs.Add(new WeakRef(a));
  }
  Remove(a) {
    for (let n = 0; n < this._hookRefs.length; n++)
      if (this._hookRefs[n].deref() === a) {
        this._hookRefs.RemoveAt(n);
        break;
      }
  }
}
var $t = /* @__PURE__ */ ((i) => (i[i.PointerDown = 0] = "PointerDown", i[i.PointerUp = 1] = "PointerUp", i[i.PointerMove = 2] = "PointerMove", i[i.Scroll = 3] = "Scroll", i[i.KeyDown = 4] = "KeyDown", i[i.KeyUp = 5] = "KeyUp", i))($t || {}), _t;
const pe = class {
  constructor() {
    b(this, _t, void 0);
  }
  get FocusedWidget() {
    return d(this, _t);
  }
  set FocusedWidget(a) {
    N(this, _t, a);
  }
  Focus(a) {
    this.FocusedWidget !== a && (this.FocusedWidget != null && (this.FocusedWidget.FocusNode.RaiseFocusChanged(!1), this.FocusedWidget = null), Ft(a) && (this.FocusedWidget = a, this.FocusedWidget.FocusNode.RaiseFocusChanged(!0)));
  }
  OnKeyDown(a) {
    if (this.FocusedWidget != null && (pe.PropagateEvent(
      this.FocusedWidget,
      a,
      (n, r) => n.FocusNode.RaiseKeyDown(r)
    ), !a.IsHandled && a.KeyCode == B.Tab)) {
      let n = !a.Shift, r;
      n ? r = pe.FindFocusableForward(this.FocusedWidget.Parent, this.FocusedWidget) : r = pe.FindFocusableBackward(this.FocusedWidget.Parent, this.FocusedWidget), r != null && this.Focus(r);
    }
  }
  OnKeyUp(a) {
    this.FocusedWidget != null && pe.PropagateEvent(
      this.FocusedWidget,
      a,
      (n, r) => n.FocusNode.RaiseKeyUp(r)
    );
  }
  OnTextInput(a) {
    this.FocusedWidget.FocusNode.RaiseTextInput(a);
  }
  static PropagateEvent(a, n, r) {
    for (; ; ) {
      if (a == null || Ft(a) && (r(a, n), n.IsHandled))
        return;
      a = a.Parent;
    }
  }
  static FindFocusableForward(a, n) {
    let r = null, l = n == null;
    return a.VisitChildren((o) => {
      if (!l)
        o === n && (l = !0);
      else {
        if (Ft(o))
          return r = o, !0;
        let h = pe.FindFocusableForward(o, null);
        if (h != null)
          return r = h, !0;
      }
      return !1;
    }), r != null || n == null ? r : a.Parent != null && !In(a.Parent) ? pe.FindFocusableForward(a.Parent, a) : null;
  }
  static FindFocusableBackward(a, n) {
    let r = null;
    return a.VisitChildren((l) => {
      if (n != null && l === n)
        return !0;
      if (Ft(l))
        r = l;
      else {
        let o = pe.FindFocusableForward(l, null);
        o != null && (r = o);
      }
      return !1;
    }), r != null || n == null ? r : a.Parent != null && !In(a.Parent) ? pe.FindFocusableBackward(a.Parent, a) : null;
  }
};
let Rn = pe;
_t = new WeakMap();
class Pr {
  constructor() {
    m(this, "_stack", new g.List());
    this._stack.Add(new Rn());
  }
  Push(a) {
    this._stack.Add(a);
  }
  Remove(a) {
    if (a == this._stack[0])
      throw new g.NotSupportedException();
    this._stack.Remove(a);
  }
  Focus(a) {
    if (a == null)
      return;
    this.GetFocusManagerByWidget(a).Focus(a);
  }
  OnKeyDown(a) {
    this.GetFocusManagerWithFocused().OnKeyDown(a);
  }
  OnKeyUp(a) {
    this.GetFocusManagerWithFocused().OnKeyUp(a);
  }
  OnTextInput(a) {
    this.GetFocusManagerWithFocused().OnTextInput(a);
  }
  GetFocusManagerByWidget(a) {
    let n = a;
    for (; n.Parent != null; ) {
      if (n.Parent instanceof xe)
        return n.Parent.FocusManager;
      n = n.Parent;
    }
    return this._stack[0];
  }
  GetFocusManagerWithFocused() {
    for (let a = this._stack.length - 1; a > 0; a--)
      if (this._stack[a].FocusedWidget != null)
        return this._stack[a];
    return this._stack[0];
  }
}
class sa {
  constructor() {
    m(this, "KeyDown", new g.Event());
    m(this, "KeyUp", new g.Event());
    m(this, "FocusChanged", new g.Event());
    m(this, "TextInput", new g.Event());
  }
  RaiseKeyDown(a) {
    this.KeyDown.Invoke(a);
  }
  RaiseKeyUp(a) {
    this.KeyUp.Invoke(a);
  }
  RaiseFocusChanged(a) {
    this.FocusChanged.Invoke(a);
  }
  RaiseTextInput(a) {
    this.TextInput.Invoke(a);
  }
}
var es;
class Ta {
  constructor() {
    m(this, "_path", new g.List());
    m(this, "_transform", j.CreateIdentity());
    b(this, es, void 0);
  }
  get LastHitWidget() {
    return d(this, es);
  }
  set LastHitWidget(a) {
    N(this, es, a);
  }
  get IsHitAnyMouseRegion() {
    return this._path.length > 0;
  }
  get IsHitAnyWidget() {
    return this.LastHitWidget != null;
  }
  Add(a) {
    if (this.LastHitWidget === a)
      return !1;
    if (this.LastHitWidget = a, this._transform.Translate(-a.X, -a.Y), a.Parent != null) {
      let r = a.Parent;
      if (je(r)) {
        const l = r;
        this._transform.Translate(l.ScrollOffsetX, l.ScrollOffsetY);
      }
    }
    let n = !1;
    if (qn(a)) {
      const r = a;
      this._path.Add(new Tn(r, this._transform.Clone())), n = r.MouseRegion.Opaque;
    }
    return n;
  }
  ConcatLastTransform(a) {
    this._transform.PreConcat(a), this.LastHitWidget === this.LastWidgetWithMouseRegion && (this._path[this._path.length - 1] = new Tn(this.LastEntry.Widget, this._transform.Clone()));
  }
  TranslateOnScroll(a, n, r, l, o) {
    if (this.LastHitWidget === a)
      return !0;
    this._transform.Translate(n, r);
    let h = Ye.TransformPoint(this._transform, l, o), A = this.LastHitWidget.ContainsPoint(h.Dx, h.Dy);
    if (A)
      for (let y = this._path.length - 1; y >= 0 && a.IsAnyParentOf(this._path[y].Widget); y--)
        this._path[y].Transform.Translate(n, r);
    return A;
  }
  get LastWidgetWithMouseRegion() {
    return this._path.length == 0 ? null : this._path[this._path.length - 1].Widget;
  }
  get LastEntry() {
    return this._path.length == 0 ? null : this._path[this._path.length - 1];
  }
  StillInLastRegion(a, n) {
    var A;
    if (this.LastHitWidget == null)
      return !1;
    let r = Ye.TransformPoint(this._transform, a, n);
    if (!this.LastHitWidget.ContainsPoint(r.Dx, r.Dy))
      return !1;
    let o = (A = this.LastHitWidget.Parent) == null ? void 0 : A.FindParent((y) => je(y));
    if (o == null)
      return !0;
    let h = o.LocalToWindow(0, 0);
    return o.ContainsPoint(
      a - h.X,
      n - h.Y
    );
  }
  HitTestInLastRegion(a, n) {
    let r = Ye.TransformPoint(this._transform, a, n), l = !1;
    qn(this.LastHitWidget) && (l = this.LastHitWidget.MouseRegion.Opaque), l || this.LastHitWidget.HitTest(r.Dx, r.Dy, this);
  }
  ExitAll() {
    for (let a = this._path.length - 1; a >= 0; a--)
      this._path[a].Widget.MouseRegion.RaiseHoverChanged(!1);
  }
  ExitOldRegion(a) {
    if (!this.IsHitAnyMouseRegion)
      return;
    let n = -1;
    for (let r = 0; r < this._path.length && (n = r, !(a._path.length == r || this._path[r].Widget !== a._path[r].Widget)); r++)
      if (r == this._path.length - 1)
        return;
    for (let r = this._path.length - 1; r >= n; r--)
      this._path[r].Widget.MouseRegion.RaiseHoverChanged(!1);
    n > 0 && this._path[n - 1].Widget.MouseRegion.RestoreHoverCursor();
  }
  EnterNewRegion(a) {
    if (!this.IsHitAnyMouseRegion)
      return;
    let n = -1;
    for (let r = 0; r < this._path.length && (n = r, !(a._path.length == r || this._path[r].Widget !== a._path[r].Widget)); r++)
      if (r == this._path.length - 1)
        return;
    for (let r = n; r < this._path.length; r++)
      this._path[r].Widget.MouseRegion.RaiseHoverChanged(!0);
  }
  PropagatePointerEvent(a, n) {
    for (let r = this._path.length - 1; r >= 0; r--) {
      let l = Ye.TransformPoint(this._path[r].Transform, a.X, a.Y);
      if (a.SetPoint(l.Dx, l.Dy), n(this._path[r].Widget.MouseRegion, a), a.IsHandled)
        return;
    }
  }
  Reset() {
    this._path.Clear(), this.LastHitWidget = null, this._transform = j.CreateIdentity();
  }
  CopyFrom(a) {
    this._path.Clear(), this._path.AddRange(a._path), this.LastHitWidget = a.LastHitWidget, this._transform = a._transform.Clone();
  }
}
es = new WeakMap();
class Tn {
  constructor(a, n) {
    m(this, "Widget");
    m(this, "Transform");
    this.Widget = a, this.Transform = n.Clone();
  }
  ContainsPoint(a, n) {
    let r = Ye.TransformPoint(this.Transform, a, n);
    return this.Widget.ContainsPoint(
      r.Dx,
      r.Dy
    );
  }
  Clone() {
    return new Tn(this.Widget, this.Transform.Clone());
  }
}
var U = /* @__PURE__ */ ((i) => (i[i.NotProcessed = 0] = "NotProcessed", i[i.Processed = 1] = "Processed", i[i.NoDispatch = 2] = "NoDispatch", i[i.NoContinue = 4] = "NoContinue", i[i.ProcessedNoDispatch = 3] = "ProcessedNoDispatch", i[i.All = 7] = "All", i))(U || {});
function Ft(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i) && "$meta_PixUI_IFocusable" in i.constructor;
}
function je(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i) && "$meta_PixUI_IScrollable" in i.constructor;
}
var jt = /* @__PURE__ */ ((i) => (i[i.Horizontal = 1] = "Horizontal", i[i.Vertical = 2] = "Vertical", i[i.Both = 3] = "Both", i))(jt || {});
class na {
  constructor(a) {
    m(this, "Direction");
    m(this, "OffsetX", 0);
    m(this, "OffsetY", 0);
    this.Direction = a;
  }
  OnScroll(a, n, r, l) {
    let o = this.OffsetX, h = this.OffsetY;
    return (this.Direction == 3 || this.Direction == 1) && (this.OffsetX = clamp(this.OffsetX + a, 0, r)), (this.Direction == 3 || this.Direction == 2) && (this.OffsetY = clamp(this.OffsetY + n, 0, l)), new k(this.OffsetX - o, this.OffsetY - h);
  }
}
var ts;
const Vt = class extends Ga {
  constructor(n) {
    super();
    b(this, ts, 0);
    this.KeyData = n;
  }
  static UseDefault(n) {
    return Vt.Default.KeyData = n, Vt.Default;
  }
  get KeyData() {
    return d(this, ts);
  }
  set KeyData(n) {
    N(this, ts, n);
  }
  get KeyCode() {
    return this.KeyData & B.KeyCode;
  }
  get Control() {
    return (this.KeyData & B.Control) == B.Control;
  }
  get Shift() {
    return (this.KeyData & B.Shift) == B.Shift;
  }
  get Alt() {
    return (this.KeyData & B.Alt) == B.Alt;
  }
};
let Wt = Vt;
ts = new WeakMap(), m(Wt, "Default", new Vt(B.None));
function qn(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i) && "$meta_PixUI_IMouseRegion" in i.constructor;
}
class We {
  constructor(a = null, n = !0) {
    m(this, "Cursor");
    m(this, "Opaque");
    m(this, "PointerDown", new g.Event());
    m(this, "PointerUp", new g.Event());
    m(this, "PointerMove", new g.Event());
    m(this, "PointerTap", new g.Event());
    m(this, "HoverChanged", new g.Event());
    this.Cursor = a, this.Opaque = n;
  }
  RaisePointerMove(a) {
    this.PointerMove.Invoke(a);
  }
  RaisePointerDown(a) {
    this.PointerDown.Invoke(a);
  }
  RaisePointerUp(a) {
    this.PointerUp.Invoke(a);
  }
  RaisePointerTap(a) {
    this.PointerTap.Invoke(a);
  }
  RaiseHoverChanged(a) {
    this.Cursor != null && ($.Current = a ? this.Cursor() : Le.Arrow), this.HoverChanged.Invoke(a);
  }
  RestoreHoverCursor() {
    this.Cursor != null && ($.Current = this.Cursor());
  }
}
var tt = /* @__PURE__ */ ((i) => (i[i.None = 0] = "None", i[i.Left = 1048576] = "Left", i[i.Right = 2097152] = "Right", i[i.Middle = 4194304] = "Middle", i[i.XButton1 = 8388608] = "XButton1", i[i.XButton2 = 16777216] = "XButton2", i))(tt || {}), ss, ns, as, rs, ls;
const Ce = class extends Ga {
  constructor() {
    super();
    b(this, ss, 0);
    b(this, ns, 0);
    b(this, as, 0);
    b(this, rs, 0);
    b(this, ls, 0);
  }
  get Buttons() {
    return d(this, ss);
  }
  set Buttons(n) {
    N(this, ss, n);
  }
  get X() {
    return d(this, ns);
  }
  set X(n) {
    N(this, ns, n);
  }
  get Y() {
    return d(this, as);
  }
  set Y(n) {
    N(this, as, n);
  }
  get DeltaX() {
    return d(this, rs);
  }
  set DeltaX(n) {
    N(this, rs, n);
  }
  get DeltaY() {
    return d(this, ls);
  }
  set DeltaY(n) {
    N(this, ls, n);
  }
  static UseDefault(n, r, l, o, h) {
    return Ce.Default.Buttons = n, Ce.Default.X = r, Ce.Default.Y = l, Ce.Default.DeltaX = o, Ce.Default.DeltaY = h, Ce.Default.ResetHandled(), Ce.Default;
  }
  SetPoint(n, r) {
    this.X = n, this.Y = r;
  }
  static RemovePerspectiveTransform(n) {
    let r = new ea(0, 0, 1, 0);
    return n.SetColumn(2, r.Clone()), n.SetRow(2, r.Clone()), n;
  }
};
let st = Ce;
ss = new WeakMap(), ns = new WeakMap(), as = new WeakMap(), rs = new WeakMap(), ls = new WeakMap(), m(st, "Default", new Ce());
var is, ms, os, hs;
const ze = class {
  constructor() {
    b(this, is, 0);
    b(this, ms, 0);
    b(this, os, 0);
    b(this, hs, 0);
  }
  get X() {
    return d(this, is);
  }
  set X(a) {
    N(this, is, a);
  }
  get Y() {
    return d(this, ms);
  }
  set Y(a) {
    N(this, ms, a);
  }
  get Dx() {
    return d(this, os);
  }
  set Dx(a) {
    N(this, os, a);
  }
  get Dy() {
    return d(this, hs);
  }
  set Dy(a) {
    N(this, hs, a);
  }
  static Make(a, n, r, l) {
    return ze.Default.X = a, ze.Default.Y = n, ze.Default.Dx = r, ze.Default.Dy = l, ze.Default;
  }
};
let bn = ze;
is = new WeakMap(), ms = new WeakMap(), os = new WeakMap(), hs = new WeakMap(), m(bn, "Default", new ze());
var I = /* @__PURE__ */ ((i) => (i[i.Dismissed = 0] = "Dismissed", i[i.Forward = 1] = "Forward", i[i.Reverse = 2] = "Reverse", i[i.Completed = 3] = "Completed", i))(I || {});
class aa {
  get IsDismissed() {
    return this.Status == I.Dismissed;
  }
  get IsCompleted() {
    return this.Status == I.Completed;
  }
}
class za extends aa {
  constructor(n) {
    super();
    m(this, "Parent");
    this.Parent = n;
  }
  get Status() {
    return this.Parent.Status;
  }
  get ValueChanged() {
    return this.Parent.ValueChanged;
  }
  get StatusChanged() {
    return this.Parent.StatusChanged;
  }
}
class dr extends za {
  constructor(n, r) {
    super(n);
    m(this, "_evaluatable");
    this._evaluatable = r;
  }
  get Value() {
    return this._evaluatable.Evaluate(this.Parent);
  }
}
var As;
class Ua {
  constructor(a = null) {
    b(this, As, void 0);
    this.Tolerance = a != null ? a : Lt.Default;
  }
  get Tolerance() {
    return d(this, As);
  }
  set Tolerance(a) {
    N(this, As, a);
  }
}
As = new WeakMap();
class br extends Ua {
  constructor(n, r, l, o, h) {
    super();
    m(this, "_durationInSeconds");
    m(this, "_begin");
    m(this, "_end");
    m(this, "_curve");
    console.assert(l > 0), this._begin = n, this._end = r, this._curve = o, this._durationInSeconds = l * h / 1e3;
  }
  X(n) {
    let r = clamp(n / this._durationInSeconds, 0, 1);
    return r == 0 ? this._begin : r == 1 ? this._end : this._begin + (this._end - this._begin) * this._curve.Transform(r);
  }
  Dx(n) {
    let r = this.Tolerance.Time;
    return (this.X(n + r) - this.X(n - r)) / (2 * r);
  }
  IsDone(n) {
    return n > this._durationInSeconds;
  }
}
class Nr extends Ua {
  constructor(n, r, l, o, h, A) {
    super();
    m(this, "_min");
    m(this, "_max");
    m(this, "_reverse");
    m(this, "_directionSetter");
    m(this, "_periodInSeconds");
    m(this, "_initialT");
    this._min = r, this._max = l, this._reverse = o, this._directionSetter = A, this._periodInSeconds = h / 1e3, this._initialT = l == r ? 0 : n / (l - r) * this._periodInSeconds, console.assert(this._periodInSeconds > 0), console.assert(this._initialT >= 0);
  }
  X(n) {
    console.assert(n >= 0);
    let r = n + this._initialT, l = r / this._periodInSeconds % 1, o = (Math.floor(r / this._periodInSeconds) & 4294967295 & 1) == 1;
    return this._reverse && o ? (this._directionSetter(Qn.Reverse), Da.Lerp(this._max, this._min, l)) : (this._directionSetter(Qn.Forward), Da.Lerp(this._min, this._max, l));
  }
  Dx(n) {
    return (this._max - this._min) / this._periodInSeconds;
  }
  IsDone(n) {
    return !1;
  }
}
var Qn = /* @__PURE__ */ ((i) => (i[i.Forward = 0] = "Forward", i[i.Reverse = 1] = "Reverse", i))(Qn || {}), cr = /* @__PURE__ */ ((i) => (i[i.Normal = 0] = "Normal", i[i.Preserve = 1] = "Preserve", i))(cr || {}), ys;
class ot extends aa {
  constructor(n, r = null, l = 0) {
    super();
    m(this, "_value", 0);
    m(this, "_status", 0);
    m(this, "Duration");
    m(this, "ReverseDuration");
    m(this, "_direction", 0);
    m(this, "_animationBehavior");
    m(this, "_simulation");
    m(this, "_ticker");
    b(this, ys, void 0);
    m(this, "_lastReportedStatus", I.Dismissed);
    m(this, "LowerBound", 0);
    m(this, "UpperBound", 1);
    m(this, "ValueChanged", new g.Event());
    m(this, "StatusChanged", new g.Event());
    this.Duration = n, this._animationBehavior = l, this._direction = 0, this._ticker = new Ya(this.OnTick.bind(this)), this.SetValueInternal(r != null ? r : this.LowerBound);
  }
  get LastElapsedDuration() {
    return d(this, ys);
  }
  set LastElapsedDuration(n) {
    N(this, ys, n);
  }
  get IsAnimating() {
    return this._ticker != null && this._ticker.IsActive;
  }
  get Status() {
    return this._status;
  }
  get Value() {
    return this._value;
  }
  SetValue(n) {
    this.Stop(), this.SetValueInternal(n), this.NotifyValueChanged(), this.CheckStatusChanged();
  }
  SetValueInternal(n) {
    this._value = clamp(n, this.LowerBound, this.UpperBound), this._value == this.LowerBound ? this._status = I.Dismissed : this._value == this.UpperBound ? this._status = I.Completed : this._status = this._direction == 0 ? I.Forward : I.Reverse;
  }
  Stop(n = !0) {
    this._ticker.Stop(n), this._simulation = null, this.LastElapsedDuration = null;
  }
  OnTick(n) {
    this._simulation != null && (this.LastElapsedDuration = n, console.assert(n >= 0), this._value = clamp(this._simulation.X(n), this.LowerBound, this.UpperBound), this._simulation.IsDone(n) && (this._status = this._direction == 0 ? I.Completed : I.Dismissed, this.Stop(!1)), this.NotifyValueChanged(), this.CheckStatusChanged());
  }
  AnimateTo(n, r = null, l = null) {
    if (this.Duration == null && r == null)
      throw new g.Exception("Duration not set");
    l != null || (l = J.Linear), this._direction = 0, this.AnimateToInternal(n, r, l);
  }
  AnimateBack(n, r = null, l = null) {
    if (this.Duration == null && this.ReverseDuration == null && r == null)
      throw new g.Exception("Duration not set");
    l != null || (l = J.Linear), this._direction = 1, this.AnimateToInternal(n, r, l);
  }
  AnimateToInternal(n, r = null, l = null) {
    l != null || (l = J.Linear);
    let o = 1, h = r;
    if (h == null) {
      console.assert(!(this.Duration == null && this._direction == 0)), console.assert(!(this.Duration == null && this._direction == 1 && this.ReverseDuration == null));
      let A = this.UpperBound - this.LowerBound, y = Number.isFinite(A) ? Math.abs(n - this._value) / A : 1, F = this._direction == 1 && this.ReverseDuration != null ? this.ReverseDuration : this.Duration;
      h = Math.floor(F * y) & 4294967295;
    } else
      n == this._value && (h = 0);
    if (this.Stop(), h == 0) {
      this._value != n && (this._value = clamp(n, this.LowerBound, this.UpperBound), this.NotifyValueChanged()), this._status = this._direction == 0 ? I.Completed : I.Dismissed, this.CheckStatusChanged();
      return;
    }
    console.assert(h > 0), console.assert(!this.IsAnimating), this.StartSimulation(new br(
      this._value,
      n,
      h,
      l,
      o
    ));
  }
  StartSimulation(n) {
    console.assert(!this.IsAnimating), this._simulation = n, this.LastElapsedDuration = 0, this._value = clamp(n.X(0), this.LowerBound, this.UpperBound), this._ticker.Start(), this._status = this._direction == 0 ? I.Forward : I.Reverse, this.CheckStatusChanged();
  }
  Forward(n = null) {
    if (this.Duration == null)
      throw new g.Exception("Duration not set");
    this._direction = 0, n != null && this.SetValue(n), this.AnimateToInternal(this.UpperBound);
  }
  Reverse(n = null) {
    if (this.Duration == null && this.ReverseDuration == null)
      throw new g.Exception("Duration and ReverseDuration not set");
    this._direction = 1, n != null && this.SetValue(n), this.AnimateToInternal(this.LowerBound);
  }
  Reset() {
    this.SetValue(this.LowerBound);
  }
  Repeat(n = null, r = null, l = !1, o = null) {
    if (n != null || (n = this.LowerBound), r != null || (r = this.UpperBound), o != null || (o = this.Duration), o == null)
      throw new g.Exception("Without an explicit period and with no default Duration.");
    console.assert(r >= n), console.assert(r <= this.UpperBound && n >= this.LowerBound), this.Stop(), this.StartSimulation(new Nr(
      this._value,
      n,
      r,
      l,
      o,
      (h) => {
        this._direction = h, this._status = this._direction == 0 ? I.Forward : I.Reverse, this.CheckStatusChanged();
      }
    ));
  }
  Dispose() {
    var n;
    (n = this._ticker) == null || n.Stop(!0), this._ticker = null;
  }
  CheckStatusChanged() {
    let n = this._status;
    this._lastReportedStatus != n && (this._lastReportedStatus = n, this.StatusChanged.Invoke(n));
  }
  NotifyValueChanged() {
    this.ValueChanged.Invoke();
  }
}
ys = new WeakMap();
class fr extends aa {
  constructor() {
    super(...arguments);
    m(this, "_parent");
    m(this, "_value", 0);
    m(this, "ValueChanged", new g.Event());
    m(this, "StatusChanged", new g.Event());
  }
  get Parent() {
    return this._parent;
  }
  set Parent(n) {
    this._parent !== n && (this._parent != null && (this._parent.ValueChanged.Remove(this.OnParentValueChanged, this), this._parent.StatusChanged.Remove(this.OnParentStatusChanged, this)), this._parent = n, this._parent != null && (this._parent.ValueChanged.Add(this.OnParentValueChanged, this), this._parent.StatusChanged.Add(this.OnParentStatusChanged, this)));
  }
  Switch() {
    this._value = this._value == 0 ? 1 : 0, this.ValueChanged.Invoke(), this.StatusChanged.Invoke(this._value == 0 ? I.Dismissed : I.Completed);
  }
  OnParentValueChanged() {
    this.ValueChanged.Invoke();
  }
  OnParentStatusChanged(n) {
    this.StatusChanged.Invoke(n);
  }
  get Value() {
    return this._parent != null ? this._parent.Value : this._value;
  }
  get Status() {
    return this._parent != null ? this._parent.Status : this._value == 0 ? I.Dismissed : I.Completed;
  }
}
const wt = class {
  constructor(a = wt.EpsilonDefault, n = wt.EpsilonDefault, r = wt.EpsilonDefault) {
    m(this, "Distance");
    m(this, "Time");
    m(this, "Velocity");
    this.Distance = a, this.Time = n, this.Velocity = r;
  }
};
let Lt = wt;
m(Lt, "EpsilonDefault", 1e-3), m(Lt, "Default", new wt());
class Ya {
  constructor(a) {
    m(this, "_onTick");
    m(this, "_startTime");
    m(this, "_animationId", 0);
    m(this, "_isActive", !1);
    this._onTick = a;
  }
  get IsActive() {
    return this._isActive;
  }
  get ShouldScheduleTick() {
    return this._isActive;
  }
  Start() {
    this._startTime = g.DateTime.UtcNow, this._animationId++, this._isActive = !0, this.ShouldScheduleTick && this.ScheduleTick();
  }
  Stop(a = !1) {
    !this._isActive || (this._isActive = !1, this._startTime = null);
  }
  ScheduleTick(a = !1) {
    let n = this._animationId;
    requestAnimationFrame(() => this.Tick(g.DateTime.UtcNow, n));
  }
  Tick(a, n) {
    var r;
    n == this._animationId && ((r = this._startTime) != null || (this._startTime = a), this._onTick(g.DateTime.op_Subtraction(a, this._startTime).TotalSeconds), this.ShouldScheduleTick && this.ScheduleTick(!0));
  }
}
m(Ya, "Interval", 16);
class pr {
  Transform(a) {
    return console.assert(a >= 0 && a <= 1), this.TransformInternal(a);
  }
  TransformInternal(a) {
    throw new g.NotSupportedException();
  }
}
class St extends pr {
  get Flipped() {
    return new Rr(this);
  }
  Transform(a) {
    return a == 0 || a == 1 ? a : super.Transform(a);
  }
}
class Cr extends St {
  TransformInternal(a) {
    return a;
  }
}
class Sr extends St {
  TransformInternal(a) {
    return a < 0.5 ? (1 - J.Bounce(1 - a * 2)) * 0.5 : J.Bounce(a * 2 - 1) * 0.5 + 0.5;
  }
}
class Rr extends St {
  constructor(n) {
    super();
    m(this, "Curve");
    this.Curve = n;
  }
  TransformInternal(n) {
    return 1 - this.Curve.Transform(1 - n);
  }
}
class Ia extends St {
  constructor(n, r, l = null) {
    super();
    m(this, "_begin");
    m(this, "_end");
    m(this, "_curve");
    if (!(n >= 0 && n <= 1 && r >= 0 && r <= 1 && r >= n))
      throw new g.ArgumentOutOfRangeException();
    this._begin = n, this._end = r, this._curve = l != null ? l : J.Linear;
  }
  TransformInternal(n) {
    return n = clamp((n - this._begin) / (this._end - this._begin), 0, 1), n == 0 || n == 1 ? n : this._curve.Transform(n);
  }
}
class wn extends St {
  constructor(n) {
    super();
    m(this, "_count");
    this._count = n;
  }
  TransformInternal(n) {
    return n *= this._count, n - Math.trunc(n);
  }
}
const Et = class extends St {
  constructor(n, r, l, o) {
    super();
    m(this, "_a");
    m(this, "_b");
    m(this, "_c");
    m(this, "_d");
    this._a = n, this._b = r, this._c = l, this._d = o;
  }
  static EvaluateCubic(n, r, l) {
    return 3 * n * (1 - l) * (1 - l) * l + 3 * r * (1 - l) * l * l + l * l * l;
  }
  TransformInternal(n) {
    let r = 0, l = 1;
    for (; ; ) {
      let o = (r + l) / 2, h = Et.EvaluateCubic(this._a, this._c, o);
      if (Math.abs(n - h) < Et.CubicErrorBound)
        return Et.EvaluateCubic(this._b, this._d, o);
      h < n ? r = o : l = o;
    }
  }
};
let Ht = Et;
m(Ht, "CubicErrorBound", 1e-3);
class J {
  static Bounce(a) {
    return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? (a -= 1.5 / 2.75, 7.5625 * a * a + 0.75) : a < 2.5 / 2.75 ? (a -= 2.25 / 2.75, 7.5625 * a * a + 0.9375) : (a -= 2.625 / 2.75, 7.5625 * a * a + 0.984375);
  }
}
m(J, "Linear", new Cr()), m(J, "BounceInOut", new Sr()), m(J, "EaseInOutCubic", new Ht(0.645, 0.045, 0.355, 1)), m(J, "FastOutSlowIn", new Ht(0.4, 0, 0.2, 1));
class ra {
  Evaluate(a) {
    return this.Transform(a.Value);
  }
  Animate(a) {
    return new dr(a, this);
  }
  Chain(a) {
    return new Tr(a, this);
  }
}
class Tr extends ra {
  constructor(n, r) {
    super();
    m(this, "_parent");
    m(this, "_evaluatable");
    this._parent = n, this._evaluatable = r;
  }
  Transform(n) {
    return this._evaluatable.Transform(this._parent.Transform(n));
  }
}
class ht extends ra {
  constructor(n) {
    super();
    m(this, "_curve");
    this._curve = n;
  }
  Transform(n) {
    return n == 0 || n == 1 ? (console.assert(Math.round(this._curve.Transform(n)) == n), n) : this._curve.Transform(n);
  }
}
class la extends ra {
  constructor(n = null, r = null) {
    super();
    m(this, "Begin");
    m(this, "End");
    this.Begin = n, this.End = r;
  }
  Transform(n) {
    return n == 0 ? this.Begin : n == 1 ? this.End : this.Lerp(n);
  }
}
class Xa extends la {
  constructor(a, n) {
    super(a, n);
  }
  Lerp(a) {
    return this.Begin + (this.End - this.Begin) * a;
  }
}
class nl extends la {
  constructor(a, n) {
    super(a, n);
  }
  Lerp(a) {
    return T.Lerp(this.Begin, this.End, a);
  }
}
class qa extends la {
  constructor(a, n) {
    super(a, n);
  }
  Lerp(a) {
    return k.Lerp(this.Begin, this.End, a);
  }
}
class Qa extends za {
  constructor(n, r, l = null) {
    super(n);
    m(this, "_curve");
    m(this, "_reverseCurve");
    m(this, "_curveDirection");
    this._curve = r, this._reverseCurve = l, this.UpdateCurveDirection(n.Status), n.StatusChanged.Add(this.UpdateCurveDirection, this);
  }
  get UseForwardCurve() {
    var n;
    return this._reverseCurve == null || ((n = this._curveDirection) != null ? n : this.Parent.Status) != I.Reverse;
  }
  UpdateCurveDirection(n) {
    var r, l;
    switch (n) {
      case I.Dismissed:
      case I.Completed:
        this._curveDirection = null;
        break;
      case I.Forward:
        (r = this._curveDirection) != null || (this._curveDirection = I.Forward);
        break;
      case I.Reverse:
        (l = this._curveDirection) != null || (this._curveDirection = I.Reverse);
        break;
    }
  }
  get Value() {
    let n = this.UseForwardCurve ? this._curve : this._reverseCurve, r = this.Parent.Value;
    if (n == null)
      return r;
    if (r == 0 || r == 1) {
      let l = n.Transform(r);
      if (Math.round(l) != r)
        throw new g.Exception(`Invalid curve endpoint at ${r}`);
      return r;
    }
    return n.Transform(r);
  }
}
class Ve {
  static ScaleAlpha(a, n) {
    let r = clamp(
      Math.floor(Math.round(a.Alpha * n)) & 255,
      0,
      255
    );
    return a.WithAlpha(r);
  }
  static LerpInt(a, n, r) {
    return a + (n - a) * r;
  }
  static Lerp(a, n, r) {
    if (n == null)
      return a == null ? null : Ve.ScaleAlpha(a, 1 - r);
    if (a == null)
      return Ve.ScaleAlpha(n, r);
    let l = clamp(
      Math.floor(Ve.LerpInt(a.Red, n.Red, r)) & 255,
      0,
      255
    ), o = clamp(
      Math.floor(Ve.LerpInt(a.Green, n.Green, r)) & 255,
      0,
      255
    ), h = clamp(
      Math.floor(Ve.LerpInt(a.Blue, n.Blue, r)) & 255,
      0,
      255
    ), A = clamp(
      Math.floor(Ve.LerpInt(a.Alpha, n.Alpha, r)) & 255,
      0,
      255
    );
    return new T(l, o, h, A);
  }
}
class mt {
  static IsNear(a, n) {
    let r = a - n;
    return r >= 1e-4 && r <= 1e-4;
  }
  static Lerp(a, n, r) {
    return a * (1 - r) + n * r;
  }
}
class Da {
  static Lerp(a, n, r) {
    return a == n || Number.isNaN(a) && Number.isNaN(n) ? a : (console.assert(
      Number.isFinite(a),
      "Cannot interpolate between finite and non-finite values"
    ), console.assert(
      Number.isFinite(n),
      "Cannot interpolate between finite and non-finite values"
    ), console.assert(Number.isFinite(r), "t must be finite when interpolating between values"), a * (1 - r) + n * r);
  }
}
const Pt = class {
  static Switch() {
    Pt._enable = !Pt._enable, Pt.EnableChanged.Invoke();
  }
  static PaintWidgetBorder(a, n) {
    if (!Pt._enable)
      return;
    let r = S.Shared(D.Random(125), CanvasKit.PaintStyle.Stroke, 2);
    n.drawRect(
      f.FromLTWH(a.X + 1, a.Y + 1, a.W - 2, a.H - 2),
      r
    );
  }
};
let Xe = Pt;
m(Xe, "EnableChanged", new g.Event()), m(Xe, "_enable", !1);
const Y = class {
  constructor() {
    m(this, "_controller");
    m(this, "_strokeHeadTween", new ht(new Ia(0, 0.5, J.FastOutSlowIn)).Chain(new ht(new wn(Y._pathCount))));
    m(this, "_strokeTailTween", new ht(new Ia(0.5, 1, J.FastOutSlowIn)).Chain(new ht(new wn(Y._pathCount))));
    m(this, "_offsetTween", new ht(new wn(Y._pathCount)));
    m(this, "_rotationTween", new ht(new wn(Y._rotationCount)));
    this._controller = new ot(Y._kIndeterminateCircularDuration);
  }
  Dispose() {
    this._controller.Dispose();
  }
  Start(a) {
    this._controller.ValueChanged.Add(a, this), this._controller.Repeat();
  }
  Stop() {
    this._controller.Stop();
  }
  PaintToWidget(a, n, r = 36) {
    let l = (a.W - r) / 2, o = (a.H - r) / 2;
    n.translate(l, o), this.Paint(n, r), n.translate(-l, -o);
  }
  Paint(a, n) {
    let r = this._strokeHeadTween.Evaluate(this._controller), l = this._strokeTailTween.Evaluate(this._controller), o = this._offsetTween.Evaluate(this._controller), h = this._rotationTween.Evaluate(this._controller), A = x.FocusedColor;
    Y.PaintInternal(
      a,
      n,
      null,
      r,
      l,
      o,
      h,
      6,
      A
    );
  }
  static PaintInternal(a, n, r, l, o, h, A, y, F, u = null) {
    let w = f.FromLTWH(0, 0, n, n), P = r != null ? Y._startAngle : Y._startAngle + o * 3 / 2 * Math.PI + A * Math.PI * 2 + h * 0.5 * Math.PI, C = r != null ? clamp(r, 0, 1) * Y._sweep : Math.max(
      l * 3 / 2 * Math.PI - o * 3 / 2 * Math.PI,
      Y._epsilon
    );
    if (u != null) {
      let L = S.Shared(u, CanvasKit.PaintStyle.Stroke, y);
      L.setAntiAlias(!0), a.drawArc(w, 0 * 180 / Math.PI, Y._sweep * 180 / Math.PI, !1, L);
    }
    let R = S.Shared(F, CanvasKit.PaintStyle.Stroke, y);
    R.setAntiAlias(!0), r == null && R.setStrokeCap(CanvasKit.StrokeCap.Square), a.drawArc(w, P * 180 / Math.PI, C * 180 / Math.PI, !1, R);
  }
};
let le = Y;
m(le, "$meta_System_IDisposable", !0), m(le, "_kIndeterminateCircularDuration", 1333 * 2222), m(le, "_pathCount", Y._kIndeterminateCircularDuration / 1333), m(le, "_rotationCount", Y._kIndeterminateCircularDuration / 2222), m(le, "_twoPi", Math.PI * 2), m(le, "_epsilon", 1e-3), m(le, "_sweep", Y._twoPi - Y._epsilon), m(le, "_startAngle", -Math.PI / 2);
class $a {
  static BuildParagraph(a, n, r, l, o = null, h = 1, A = !1) {
    let y = xa({ color: l, fontSize: r });
    o != null && (y.fontStyle = o);
    let F = Ba({ maxLines: Math.floor(h) & 4294967295, textStyle: y });
    A && (y.heightMultiplier = 1, F.heightMultiplier = 1);
    let u = va(F);
    u.pushStyle(y), u.addText(a), u.pop();
    let w = u.build();
    return w.layout(n), u.delete(), w;
  }
}
var W = /* @__PURE__ */ ((i) => (i[i.None = 0] = "None", i[i.AffectsVisual = 1] = "AffectsVisual", i[i.AffectsLayout = 2] = "AffectsLayout", i))(W || {});
class La {
  constructor(a, n = 0) {
    m(this, "Target");
    m(this, "Options");
    this.Target = new WeakRef(a), this.Options = n;
  }
}
class ja {
  constructor() {
    m(this, "_bindings");
  }
  AddBinding(a, n) {
    this._bindings == null ? this._bindings = new g.List().Init([new La(a, n)]) : this._bindings.Any((r) => r.Target.deref() === a) || this._bindings.Add(new La(a, n));
  }
  RemoveBinding(a) {
    var n;
    (n = this._bindings) == null || n.RemoveAll((r) => r.Target.deref() === a);
  }
  NotifyValueChanged() {
    if (this._bindings != null)
      for (let a = 0; a < this._bindings.length; a++) {
        let n = this._bindings[a].Target.deref();
        n == null ? (this._bindings.RemoveAt(a), a--) : n.OnStateChanged(this, this._bindings[a].Options);
      }
  }
}
class p extends ja {
  toString() {
    var a, n;
    return (n = (a = this.Value) == null ? void 0 : a.toString()) != null ? n : "";
  }
  AsStateOfString(a = null, n = null) {
    return ae.MakeAsString(this, a, n);
  }
  AsStateOfBool(a) {
    return ae.Make1(this, a);
  }
  static op_Implicit_From(a) {
    return new ia(a);
  }
}
class ia extends p {
  constructor(n) {
    super();
    m(this, "_value");
    this._value = n;
  }
  get Readonly() {
    return !1;
  }
  get Value() {
    return this._value;
  }
  set Value(n) {
    g.Equals(this._value, n) || (this._value = n, this.NotifyValueChanged());
  }
}
class ae extends p {
  constructor(n, r) {
    super();
    m(this, "_getter");
    m(this, "_setter");
    this._getter = n, this._setter = r;
  }
  static MakeAsString(n, r = null, l = null) {
    let o = new ae(
      r == null ? n.toString.bind(n) : () => r(n.Value),
      l == null ? null : (h) => n.Value = l(h)
    );
    return n.AddBinding(o, W.None), o;
  }
  static Make1(n, r, l = null) {
    let o = new ae(() => r(n.Value), l);
    return n.AddBinding(o, W.None), o;
  }
  static Make2(n, r, l, o = null) {
    let h = new ae(() => l(n.Value, r.Value), o);
    return n.AddBinding(h, W.None), r.AddBinding(h, W.None), h;
  }
  get Readonly() {
    return this._setter == null;
  }
  get Value() {
    return this._getter();
  }
  set Value(n) {
    var r;
    try {
      (r = this._setter) == null || r.call(this, n);
    } catch {
    }
  }
  OnStateChanged(n, r) {
    this.NotifyValueChanged();
  }
}
var Fs;
class al extends ja {
  constructor(n) {
    super();
    b(this, Fs, !0);
    m(this, "_source");
    this._source = n;
  }
  get Readonly() {
    return d(this, Fs);
  }
  set Readonly(n) {
    N(this, Fs, n);
  }
  Add(n) {
    this._source.Add(n), this.NotifyValueChanged();
  }
  Remove(n) {
    let r = this._source.Remove(n);
    return r && this.NotifyValueChanged(), r;
  }
  Clear() {
    this._source.Clear(), this.NotifyValueChanged();
  }
  Contains(n) {
    return this._source.Contains(n);
  }
  IndexOf(n) {
    return this._source.IndexOf(n);
  }
  Insert(n, r) {
    this._source.Insert(n, r), this.NotifyValueChanged();
  }
  RemoveAt(n) {
    this._source.RemoveAt(n), this.NotifyValueChanged();
  }
}
Fs = new WeakMap();
class ma extends p {
  constructor(n, r = null, l = !0) {
    super();
    m(this, "_getter");
    m(this, "_setter");
    this._getter = n, r == null || !l ? this._setter = r : this._setter = (o) => {
      r(o), this.NotifyValueChanged();
    };
  }
  get Readonly() {
    return this._setter == null;
  }
  get Value() {
    return this._getter();
  }
  set Value(n) {
    if (this._setter == null)
      throw new g.NotSupportedException();
    this._setter(n);
  }
}
class rl {
  constructor() {
    m(this, "_target");
  }
  get Target() {
    return this._target;
  }
  set Target(a) {
    let n = this._target;
    this._target = a, this.OnTargetChanged(n);
  }
  OnTargetChanged(a) {
    const n = Object.getOwnPropertyNames(this);
    for (let r of n)
      this[r] instanceof ma && this[r].NotifyValueChanged();
  }
}
class ll {
  constructor() {
    m(this, "_changeHandler");
  }
  set OnChange(a) {
    this._changeHandler = a;
  }
  Notify(a) {
    var n;
    (n = this._changeHandler) == null || n.call(this, a);
  }
}
const Se = class {
  constructor(a, n) {
    m(this, "X");
    m(this, "Y");
    this.X = a, this.Y = n;
  }
  static Circular(a) {
    return new Se(a, a);
  }
  static Elliptical(a, n) {
    return new Se(a, n);
  }
  static Lerp(a, n, r) {
    if (n == null) {
      if (a == null)
        return null;
      let l = 1 - r;
      return Se.Elliptical(a.X * l, a.Y * l);
    }
    return a == null ? Se.Elliptical(n.X * r, n.Y * r) : Se.Elliptical(
      mt.Lerp(a.X, n.X, r),
      mt.Lerp(a.Y, n.Y, r)
    );
  }
  static op_Multiply(a, n) {
    return new Se(a.X * n, a.Y * n);
  }
  Equals(a) {
    return this.X == a.X && this.Y == a.Y;
  }
  Clone() {
    return new Se(this.X, this.Y);
  }
};
let G = Se;
m(G, "$meta_System_IEquatable", !0), m(G, "Empty", new Se(0, 0));
var Ja = /* @__PURE__ */ ((i) => (i[i.None = 0] = "None", i[i.Solid = 1] = "Solid", i))(Ja || {});
const Ke = class {
  constructor(a, n = 1, r = 1) {
    m(this, "Color");
    m(this, "Width");
    m(this, "Style");
    this.Color = a, this.Width = n, this.Style = r;
  }
  ApplyPaint(a) {
    a.setStyle(CanvasKit.PaintStyle.Stroke), a.setColor(this.Style == 1 ? this.Color : T.Empty), a.setStrokeWidth(this.Style == 1 ? this.Width : 0);
  }
  Lerp(a, n, r) {
    if (r == 0)
      return a;
    if (r == 1)
      return n;
    let l = mt.Lerp(a.Width, n.Width, r);
    if (l < 0)
      return Ke.Empty;
    if (a.Style == n.Style)
      return new Ke(T.Lerp(a.Color, n.Color, r), l, a.Style);
    let o = a.Style == 1 ? a.Color : a.Color.WithAlpha(0), h = n.Style == 1 ? n.Color : n.Color.WithAlpha(0);
    return new Ke(T.Lerp(o, h, r), l);
  }
  Clone() {
    return new Ke(this.Color, this.Width, this.Style);
  }
};
let Me = Ke;
m(Me, "Empty", new Ke(T.Empty, 0, 0));
const ne = class {
  constructor(a, n, r, l) {
    m(this, "TopLeft");
    m(this, "TopRight");
    m(this, "BottomLeft");
    m(this, "BottomRight");
    this.TopLeft = a, this.TopRight = n, this.BottomLeft = r, this.BottomRight = l;
  }
  static All(a) {
    return new ne(a, a, a, a);
  }
  static Circular(a) {
    return ne.All(G.Circular(a));
  }
  static Vertical(a, n) {
    return new ne(a, a, n, n);
  }
  static Horizontal(a, n) {
    return new ne(a, n, a, n);
  }
  static Lerp(a, n, r) {
    return a == null && n == null ? null : a == null ? ne.op_Multiply(n, r) : n == null ? ne.op_Multiply(a, 1 - r) : new ne(
      G.Lerp(a.TopLeft, n.TopLeft, r),
      G.Lerp(a.TopRight, n.TopRight, r),
      G.Lerp(a.BottomLeft, n.BottomLeft, r),
      G.Lerp(a.BottomRight, n.BottomRight, r)
    );
  }
  static op_Multiply(a, n) {
    return new ne(
      G.op_Multiply(a.TopLeft, n),
      G.op_Multiply(a.TopRight, n),
      G.op_Multiply(a.BottomLeft, n),
      G.op_Multiply(a.BottomRight, n)
    );
  }
  ToRRect(a) {
    return he.FromRectAndCorner(a.Clone(), this.TopLeft, this.TopRight, this.BottomLeft, this.BottomRight);
  }
  Clone() {
    return new ne(this.TopLeft, this.TopRight, this.BottomLeft, this.BottomRight);
  }
};
let re = ne;
m(re, "Empty", ne.All(G.Empty));
class Za {
  LerpTo(a, n, r) {
  }
}
class Ir extends Za {
  constructor(n) {
    super();
    m(this, "Side");
    this.Side = n != null ? n : Me.Empty;
  }
  get Dimensions() {
    return Z.All(this.Side.Width);
  }
}
var us;
class Dr extends Za {
  constructor(n) {
    super();
    b(this, us, Me.Empty.Clone());
    this.BorderSide = n != null ? n : Me.Empty;
  }
  get BorderSide() {
    return d(this, us);
  }
  set BorderSide(n) {
    N(this, us, n);
  }
  get Dimensions() {
    return Z.All(this.BorderSide.Width);
  }
}
us = new WeakMap();
var gs, ws;
const Mn = class extends Dr {
  constructor(n = null, r = null, l = 4) {
    super(n != null ? n : new Me(new T(4288387995)));
    b(this, gs, re.Empty.Clone());
    b(this, ws, 0);
    if (l < 0)
      throw new g.ArgumentOutOfRangeException("gapPadding");
    this.BorderRadius = r != null ? r : re.All(G.Circular(4)), this.GapPadding = l;
  }
  get BorderRadius() {
    return d(this, gs);
  }
  set BorderRadius(n) {
    N(this, gs, n);
  }
  get GapPadding() {
    return d(this, ws);
  }
  set GapPadding(n) {
    N(this, ws, n);
  }
  GetOuterPath(n) {
    throw new g.NotImplementedException();
  }
  GetInnerPath(n) {
    throw new g.NotImplementedException();
  }
  LerpTo(n, r, l) {
    if (n instanceof Mn) {
      const o = n;
      let h = r;
      h.BorderRadius = re.Lerp(this.BorderRadius, o.BorderRadius, l), h.BorderSide = this.BorderSide.Lerp(this.BorderSide, o.BorderSide, l), h.GapPadding = o.GapPadding;
    } else
      super.LerpTo(n, r, l);
  }
  Clone() {
    return new Mn(this.BorderSide, this.BorderRadius, this.GapPadding);
  }
  Paint(n, r, l = null) {
    let o = this.BorderRadius.ToRRect(r);
    o.Deflate(this.BorderSide.Width / 2, this.BorderSide.Width / 2), l != null && n.drawRRect(o, S.Shared(l));
    let h = S.Shared();
    this.BorderSide.ApplyPaint(h), h.setAntiAlias(!0), n.drawRRect(o, h);
  }
};
let kt = Mn;
gs = new WeakMap(), ws = new WeakMap();
class nt extends Ir {
  constructor(n = null, r = null) {
    super(n);
    m(this, "BorderRadius");
    this.BorderRadius = r != null ? r : re.Empty;
  }
  GetOuterPath(n) {
    let r = this.BorderRadius.ToRRect(n);
    r.Deflate(this.Side.Width, this.Side.Width);
    let l = new CanvasKit.Path();
    return l.addRRect(r), l;
  }
  GetInnerPath(n) {
    let r = this.BorderRadius.ToRRect(n), l = new CanvasKit.Path();
    return l.addRRect(r), l;
  }
  LerpTo(n, r, l) {
    throw new g.NotImplementedException();
  }
  CopyWith(n) {
    return new nt(n != null ? n : this.Side, this.BorderRadius);
  }
  Clone() {
    throw new g.NotImplementedException();
  }
  Paint(n, r, l = null) {
    if (this.Side.Style == Ja.None)
      return;
    let o = this.Side.Width;
    if (o == 0) {
      let h = S.Shared();
      this.Side.ApplyPaint(h);
      let A = this.BorderRadius.ToRRect(r);
      n.drawRRect(A, h);
    } else {
      let h = this.BorderRadius.ToRRect(r), A = he.FromCopy(h);
      A.Deflate(o, o);
      let y = S.Shared(this.Side.Color);
      n.drawDRRect(h, A, y);
    }
  }
}
class Rt {
  constructor(a, n = !1) {
    m(this, "_area", f.Empty.Clone());
    m(this, "_antiAlias");
    this._area = a.Clone(), this._antiAlias = n;
  }
  Dispose() {
  }
  ApplyToCanvas(a) {
    a.clipRect(this._area, CanvasKit.ClipOp.Intersect, this._antiAlias);
  }
  get IsEmpty() {
    return this._area.IsEmpty;
  }
  Offset(a, n) {
    this._area.Offset(a, n);
  }
  GetRect() {
    return this._area;
  }
  GetPath() {
    throw new g.NotSupportedException();
  }
  IntersectWith(a) {
    if (a instanceof Rt)
      return this._area.IntersectTo(a.GetRect()), this;
    if (a instanceof Vn)
      return a.IntersectWith(this);
    throw new g.NotSupportedException();
  }
}
class Vn {
  constructor(a, n = !0) {
    m(this, "_area");
    m(this, "_antiAlias");
    this._area = a, this._antiAlias = n;
  }
  Dispose() {
    this._area.delete();
  }
  ApplyToCanvas(a) {
    a.clipPath(this._area, CanvasKit.ClipOp.Intersect, this._antiAlias);
  }
  get IsEmpty() {
    return this._area.isEmpty();
  }
  Offset(a, n) {
    this._area.offset(a, n);
  }
  GetPath() {
    return this._area;
  }
  GetRect() {
    throw new g.NotSupportedException();
  }
  IntersectWith(a) {
    if (a instanceof Rt) {
      let n = new CanvasKit.Path();
      return n.addRect(a.GetRect()), this._area.op(n, CanvasKit.PathOp.Intersect), n.delete(), this;
    }
    if (a instanceof Vn)
      return this._area.op(a.GetPath(), CanvasKit.PathOp.Intersect), a.Dispose(), this;
    throw new g.NotSupportedException();
  }
}
class x {
}
m(x, "DefaultFontSize", 15), m(x, "FocusedColor", new T(4280391411)), m(x, "FocusedBorderWidth", 2), m(x, "CaretColor", new T(4280391411)), m(x, "AccentColor", new T(4294410779)), m(x, "DisabledBgColor", new T(4294309882));
var Ps;
class il {
  constructor() {
    b(this, Ps, void 0);
  }
  get Widget() {
    return d(this, Ps);
  }
  set Widget(a) {
    N(this, Ps, a);
  }
  SetWidget(a) {
    this.Widget = a;
  }
}
Ps = new WeakMap();
function In(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i) && "$meta_PixUI_IRootWidget" in i.constructor;
}
var ds, bs, Ns, cs;
const q = class {
  constructor() {
    m(this, "_states");
    m(this, "DebugLabel");
    m(this, "_flag", 0);
    b(this, ds, 0);
    b(this, bs, 0);
    b(this, Ns, 0);
    b(this, cs, 0);
    m(this, "CachedAvailableWidth", Number.NaN);
    m(this, "CachedAvailableHeight", Number.NaN);
    m(this, "_width");
    m(this, "_height");
    m(this, "_parent");
  }
  get IsOpaque() {
    return !1;
  }
  get Clipper() {
    return null;
  }
  set Ref(a) {
    a.SetWidget(this);
  }
  SetFlagValue(a, n) {
    a ? this._flag |= n : this._flag &= ~n;
  }
  get SuspendingMount() {
    return (this._flag & q.SuspendingMountMask) == q.SuspendingMountMask;
  }
  set SuspendingMount(a) {
    this.SetFlagValue(a, q.SuspendingMountMask);
  }
  get HasLayout() {
    return (this._flag & q.HasLayoutMask) == q.HasLayoutMask;
  }
  set HasLayout(a) {
    this.SetFlagValue(a, q.HasLayoutMask);
  }
  get IsLayoutTight() {
    return (this._flag & q.LayoutTightMask) == q.LayoutTightMask;
  }
  set IsLayoutTight(a) {
    a != this.IsLayoutTight && (this.SetFlagValue(a, q.LayoutTightMask), this.IsMounted && this.Invalidate(c.Relayout));
  }
  get IsMounted() {
    return (this._flag & q.MountedMask) == q.MountedMask;
  }
  set IsMounted(a) {
    a ? (this._flag |= q.MountedMask, this.OnMounted()) : (this._flag &= ~q.MountedMask, this.OnUnmounted());
  }
  OnMounted() {
  }
  OnUnmounted() {
  }
  get X() {
    return d(this, ds);
  }
  set X(a) {
    N(this, ds, a);
  }
  get Y() {
    return d(this, bs);
  }
  set Y(a) {
    N(this, bs, a);
  }
  get W() {
    return d(this, Ns);
  }
  set W(a) {
    N(this, Ns, a);
  }
  get H() {
    return d(this, cs);
  }
  set H(a) {
    N(this, cs, a);
  }
  get Width() {
    return this._width;
  }
  set Width(a) {
    this._width = this.Rebind(this._width, a, W.AffectsLayout);
  }
  get Height() {
    return this._height;
  }
  set Height(a) {
    this._height = this.Rebind(this._height, a, W.AffectsLayout);
  }
  get AutoSize() {
    return this._width == null || this._height == null;
  }
  SetPosition(a, n) {
    this.X = a, this.Y = n;
  }
  SetSize(a, n) {
    this.W = a, this.H = n;
  }
  get Parent() {
    return this._parent;
  }
  set Parent(a) {
    if (!(a == null && this._parent == null)) {
      if (In(this) && a != null)
        throw new g.InvalidOperationException("Can't set parent for IRootWidget");
      if (this._parent != null && a != null && !this.SuspendingMount)
        throw new g.InvalidOperationException("Widget already has parent");
      this.SuspendingMount && a == null || (this._parent = a, this._parent == null ? this.Unmount() : this._parent.IsMounted && this.Mount());
    }
  }
  get Root() {
    return this._parent != null ? this._parent.Root : In(this) ? this : null;
  }
  get CurrentNavigator() {
    let a = this.FindParent((n) => n instanceof Mr);
    return a == null ? null : a.Navigator;
  }
  VisitChildren(a) {
  }
  IndexOfChild(a) {
    let n = -1, r = -1;
    return this.VisitChildren((l) => (n++, l !== a ? !1 : (r = n, !0))), r;
  }
  FindParent(a) {
    var n;
    return a(this) ? this : (n = this._parent) == null ? void 0 : n.FindParent(a);
  }
  IsAnyParentOf(a) {
    return (a == null ? void 0 : a.Parent) == null ? !1 : a.Parent === this || this.IsAnyParentOf(a.Parent);
  }
  ContainsPoint(a, n) {
    return a >= 0 && a < this.W && n >= 0 && n < this.H;
  }
  HitTest(a, n, r) {
    return this.ContainsPoint(a, n) ? (r.Add(this) || this.VisitChildren((l) => this.HitTestChild(l, a, n, r)), !0) : !1;
  }
  HitTestChild(a, n, r, l) {
    let o = 0, h = 0;
    if (je(this)) {
      const y = this;
      o = y.ScrollOffsetX, h = y.ScrollOffsetY;
    }
    return a.HitTest(
      n - a.X + o,
      r - a.Y + h,
      l
    );
  }
  Compute1(a, n) {
    return ae.Make1(a, n);
  }
  Compute2(a, n, r, l = null) {
    return ae.Make2(a, n, r, l);
  }
  Bind(a, n = W.AffectsVisual) {
    return this.Rebind(null, a, n);
  }
  Rebind(a, n, r = W.AffectsVisual) {
    return a == null || a.RemoveBinding(this), n == null || (n.AddBinding(this, r), this._states == null ? this._states = new g.List().Init([n]) : this._states.Contains(n) || this._states.Add(n)), n;
  }
  Mount() {
    this.SuspendingMount || (this.IsMounted = !0, this.VisitChildren((a) => (a.Mount(), !1)));
  }
  Unmount() {
    this.SuspendingMount || (this.IsMounted = !1, this.VisitChildren((a) => (a.Unmount(), !1)));
  }
  Layout(a, n) {
    let r = this.CacheAndCheckAssignWidth(a), l = this.CacheAndCheckAssignHeight(n), o = !1;
    this.SetSize(0, 0), this.VisitChildren((h) => (o = !0, h.Layout(r, l), this.SetSize(Math.max(this.W, h.W), Math.max(this.H, h.H)), !1)), o || this.SetSize(r, l);
  }
  CacheAndCheckAssignWidth(a) {
    return this.CachedAvailableWidth = Math.max(0, a), this.Width == null ? this.CachedAvailableWidth : Math.min(Math.max(0, this.Width.Value), this.CachedAvailableWidth);
  }
  CacheAndCheckAssignHeight(a) {
    return this.CachedAvailableHeight = Math.max(0, a), this.Height == null ? this.CachedAvailableHeight : Math.min(Math.max(0, this.Height.Value), this.CachedAvailableHeight);
  }
  OnChildSizeChanged(a, n, r, l) {
    console.assert(this.AutoSize);
    let o = this.W, h = this.H;
    this.Layout(this.CachedAvailableWidth, this.CachedAvailableHeight), this.TryNotifyParentIfSizeChanged(o, h, l);
  }
  TryNotifyParentIfSizeChanged(a, n, r) {
    let l = this.W - a, o = this.H - n;
    (l != 0 || o != 0) && (r.Widget = this, r.OldX = this.X, r.OldY = this.Y, r.OldW = a, r.OldH = n, this.Parent != null && this.Parent.AutoSize && this.Parent.OnChildSizeChanged(this, l, o, r));
  }
  LocalToWindow(a, n) {
    let r = this;
    for (; r != null; ) {
      if (a += r.X, n += r.Y, je(r.Parent)) {
        const l = r.Parent;
        a -= l.ScrollOffsetX, n -= l.ScrollOffsetY;
      } else if (r.Parent instanceof Tt) {
        const l = r.Parent;
        let o = Ye.TransformPoint(l.EffectiveTransform, a, n);
        a = o.Dx, n = o.Dy;
      }
      r = r.Parent;
    }
    return new dn(a, n);
  }
  Paint(a, n = null) {
    this.PaintChildren(a, n);
  }
  PaintChildren(a, n = null) {
    this.VisitChildren((r) => {
      if (r.W <= 0 || r.H <= 0 || n != null && !n.IntersectsWith(r))
        return !1;
      let l = r.X != 0 || r.Y != 0;
      return l && a.translate(r.X, r.Y), r.Paint(a, n == null ? void 0 : n.ToChild(r)), l && a.translate(-r.X, -r.Y), Xe.PaintWidgetBorder(r, a), !1;
    });
  }
  Invalidate(a, n = null) {
    me.Add(this, a, n);
  }
  OnStateChanged(a, n) {
    n == W.AffectsLayout ? me.Add(this, c.Relayout, null) : n == W.AffectsVisual && me.Add(this, c.Repaint, null);
  }
  get Overlay() {
    var a;
    return (a = this.Root) == null ? void 0 : a.Window.Overlay;
  }
  ClearBindings() {
    if (this._states != null) {
      for (const a of this._states)
        a.RemoveBinding(this);
      this._states = null;
    }
  }
  Dispose() {
    this.ClearBindings(), this.Parent = null;
  }
  toString() {
    var a;
    return `${this.constructor.name}[${(a = this.DebugLabel) != null ? a : ""}]`;
  }
};
let O = q;
ds = new WeakMap(), bs = new WeakMap(), Ns = new WeakMap(), cs = new WeakMap(), m(O, "$meta_System_IDisposable", !0), m(O, "MountedMask", 1), m(O, "HasLayoutMask", 2), m(O, "LayoutTightMask", 1 << 3), m(O, "SuspendingMountMask", 1 << 20);
class Lr {
  constructor() {
    m(this, "_widget");
  }
  get Widget() {
    return this._widget;
  }
  AttachWidget(a) {
    if (this._widget != null)
      throw new g.InvalidOperationException();
    this._widget = a;
  }
}
class K extends O {
  constructor() {
    super();
    m(this, "_child");
    m(this, "_padding");
    this.IsLayoutTight = !0;
  }
  get Padding() {
    return this._padding;
  }
  set Padding(n) {
    this._padding = this.Rebind(this._padding, n, W.AffectsLayout);
  }
  get Child() {
    return this._child;
  }
  set Child(n) {
    this._child != null && (this._child.Parent = null), this._child = n, this._child != null && (this._child.Parent = this);
  }
  VisitChildren(n) {
    this._child != null && n(this._child);
  }
  Layout(n, r) {
    var A, y;
    let l = this.CacheAndCheckAssignWidth(n), o = this.CacheAndCheckAssignHeight(r), h = (y = (A = this._padding) == null ? void 0 : A.Value) != null ? y : Z.All(0);
    if (this.Child == null) {
      this.IsLayoutTight ? this.SetSize(0, 0) : this.SetSize(l, o);
      return;
    }
    this.Child.Layout(
      l - h.Left - h.Right,
      o - h.Top - h.Bottom
    ), this.Child.SetPosition(h.Left, h.Top), this.IsLayoutTight ? this.SetSize(
      this.Child.W + h.Left + h.Right,
      this.Child.H + h.Top + h.Bottom
    ) : this.SetSize(l, o);
  }
  OnChildSizeChanged(n, r, l, o) {
    if (console.assert(this.AutoSize), !this.IsLayoutTight)
      return;
    let h = this.W, A = this.H;
    this.SetSize(h + r, A + l), this.TryNotifyParentIfSizeChanged(h, A, o);
  }
}
class yn extends O {
  constructor() {
    super();
    m(this, "_children");
    this._children = new Ea(this);
  }
  set Children(n) {
    this._children.Clear();
    for (const r of n)
      this._children.Add(r);
  }
  GetChildAt(n) {
    return this._children[n];
  }
  VisitChildren(n) {
    for (const r of this._children)
      if (n(r))
        break;
  }
  IndexOfChild(n) {
    return this._children.IndexOf(n);
  }
}
var fs;
class $n extends K {
  constructor(n, r) {
    super();
    b(this, fs, void 0);
    this.Window = n, this.IsMounted = !0, this.Child = r;
  }
  get Window() {
    return d(this, fs);
  }
  set Window(n) {
    N(this, fs, n);
  }
  Layout(n, r) {
    this.CachedAvailableWidth = n, this.CachedAvailableHeight = r, this.SetPosition(0, 0), this.SetSize(n, r), this.Child.Layout(this.W, this.H);
  }
  OnChildSizeChanged(n, r, l, o) {
  }
}
fs = new WeakMap(), m($n, "$meta_PixUI_IRootWidget", !0);
class ml extends K {
  constructor() {
    super(...arguments);
    m(this, "_bgBgColor");
  }
  get BgColor() {
    return this._bgBgColor;
  }
  set BgColor(n) {
    this._bgBgColor = this.Rebind(this._bgBgColor, n, W.AffectsVisual);
  }
  get IsOpaque() {
    return this._bgBgColor != null && this._bgBgColor.Value.IsOpaque;
  }
  Paint(n, r = null) {
    this._bgBgColor != null && n.drawRect(f.FromLTWH(0, 0, this.W, this.H), S.Shared(this._bgBgColor.Value)), this.PaintChildren(n, r);
  }
}
class Tt extends K {
  constructor(n, r = null) {
    super();
    m(this, "_transform", j.Empty.Clone());
    m(this, "_origin");
    this.SetTransform(n.Clone()), this.Origin = r;
  }
  get Origin() {
    return this._origin;
  }
  set Origin(n) {
    g.OpEquality(this._origin, n) || (this._origin = n, this.NeedInvalidate());
  }
  InitTransformAndOrigin(n, r = null) {
    this._transform = n.Clone(), this._origin = r;
  }
  SetTransform(n) {
    g.OpEquality(this._transform, n) || (this._transform = n.Clone(), this.NeedInvalidate());
  }
  NeedInvalidate() {
    this.IsMounted && this.Invalidate(c.Repaint);
  }
  get EffectiveTransform() {
    if (this._origin == null)
      return this._transform;
    let n = j.CreateIdentity();
    return this._origin != null && n.Translate(this._origin.Dx, this._origin.Dy), n.Multiply(this._transform), this._origin != null && n.Translate(-this._origin.Dx, -this._origin.Dy), n;
  }
  HitTest(n, r, l) {
    if (this.Child == null)
      return !1;
    let o = this.EffectiveTransform.Clone(), h = j.TryInvert(st.RemovePerspectiveTransform(o.Clone()));
    if (h == null)
      return !1;
    let A = Ye.TransformPoint(h, n, r), y = this.Child.HitTest(A.Dx, A.Dy, l);
    return y && l.ConcatLastTransform(h), y;
  }
  Paint(n, r = null) {
    this.Child != null && (n.save(), n.concat(this.EffectiveTransform.TransponseTo()), this.PaintChildren(n, r), n.restore());
  }
}
class Wr extends K {
  Layout(a, n) {
    let r = this.CacheAndCheckAssignWidth(a), l = this.CacheAndCheckAssignHeight(n);
    this.Child != null && (this.Child.Layout(r, l), this.Child.SetPosition((r - this.Child.W) / 2, (l - this.Child.H) / 2)), this.SetSize(r, l);
  }
}
class jn extends K {
  constructor() {
    super();
    m(this, "_bgColor");
    this.IsLayoutTight = !1;
  }
  get IsOpaque() {
    return this._bgColor != null && this._bgColor.Value.IsOpaque;
  }
  get BgColor() {
    return this._bgColor;
  }
  set BgColor(n) {
    this._bgColor = this.Rebind(this._bgColor, n, W.AffectsVisual);
  }
  Paint(n, r = null) {
    this._bgColor != null && n.drawRect(f.FromLTWH(0, 0, this.W, this.H), S.Shared(this._bgColor.Value)), this.PaintChildren(n, r);
  }
}
var ps;
class $e extends K {
  constructor(n = null, r = 1) {
    super();
    b(this, ps, 1);
    this.Child = n, this.Flex = r;
  }
  get Flex() {
    return d(this, ps);
  }
  set Flex(n) {
    N(this, ps, n);
  }
  Layout(n, r) {
    var h, A, y, F;
    this.CachedAvailableWidth = n, this.CachedAvailableHeight = r, this.Child != null && (this.Child.Layout(n, r), this.Child.SetPosition(0, 0));
    let l = this.Parent instanceof Jn ? (A = (h = this.Child) == null ? void 0 : h.W) != null ? A : 0 : n, o = this.Parent instanceof Ct ? (F = (y = this.Child) == null ? void 0 : y.H) != null ? F : 0 : r;
    this.SetSize(l, o);
  }
  OnChildSizeChanged(n, r, l, o) {
    let h = this.W, A = this.H, y = this.Parent instanceof Jn ? n.W : this.CachedAvailableWidth, F = this.Parent instanceof Ct ? n.H : this.CachedAvailableHeight;
    this.SetSize(y, F), this.TryNotifyParentIfSizeChanged(h, A, o);
  }
}
ps = new WeakMap();
class Jn extends yn {
  constructor(n = te.Center, r = 0, l = null) {
    super();
    m(this, "_alignment");
    m(this, "_spacing");
    m(this, "_totalFlex", 0);
    if (r < 0)
      throw new g.ArgumentOutOfRangeException("spacing");
    this._alignment = n, this._spacing = r, this.DebugLabel = l;
  }
  Layout(n, r) {
    let l = this.CacheAndCheckAssignWidth(n), o = this.CacheAndCheckAssignHeight(r), h = o, A = 0;
    this._totalFlex = 0;
    for (let F = 0; F < this._children.length; F++) {
      F != 0 && h >= this._spacing && (h = Math.max(0, h - this._spacing));
      let u = this._children[F];
      if (u instanceof $e) {
        const w = u;
        this._totalFlex += w.Flex;
        continue;
      }
      h <= 0 ? u.Layout(0, 0) : (u.Layout(l, h), A = Math.max(A, u.W), h -= u.H);
    }
    if (this._totalFlex > 0) {
      for (const F of this._children)
        if (F instanceof $e) {
          const u = F;
          h <= 0 ? F.Layout(0, 0) : (F.Layout(l, h * (u.Flex / this._totalFlex)), A = Math.max(A, F.W));
        }
    }
    let y = 0;
    for (let F = 0; F < this._children.length && (F != 0 && (y += this._spacing), !(y >= o)); F++) {
      let u = this._children[F], w = match(this._alignment).with(te.Right, () => A - u.W).with(te.Center, () => (A - u.W) / 2).otherwise(
        () => 0
      );
      u.SetPosition(w, y), y += u.H;
    }
    this.SetSize(A, Math.min(o, y));
  }
  OnChildSizeChanged(n, r, l, o) {
    console.assert(this.AutoSize);
    let h = this.W, A = this.H, y = this.Width == null ? this.CachedAvailableWidth : Math.min(this.Width.Value, this.CachedAvailableWidth);
    if (this.Height == null ? this.CachedAvailableHeight : Math.min(this.Height.Value, this.CachedAvailableHeight), r != 0) {
      let F = 0;
      for (const u of this._children)
        F = Math.min(Math.max(u.W, F), y);
      this.SetSize(F, A);
      for (const u of this._children) {
        let w = match(this._alignment).with(te.Right, () => this.W - u.W).with(te.Center, () => (this.W - u.W) / 2).otherwise(
          () => 0
        );
        u.SetPosition(w, u.Y);
      }
    }
    if (l != 0) {
      if (this._totalFlex > 0)
        throw new g.NotImplementedException();
      {
        let F = this._children.IndexOf(n);
        for (let u = F + 1; u < this._children.length; u++)
          this._children[u].SetPosition(this._children[u].X, this._children[u].Y + l);
        this.SetSize(this.W, this.H + l);
      }
    }
    this.TryNotifyParentIfSizeChanged(h, A, o);
  }
}
class Ct extends yn {
  constructor(n = Ae.Middle, r = 0) {
    super();
    m(this, "_alignment");
    m(this, "_spacing");
    if (r < 0)
      throw new g.ArgumentOutOfRangeException("spacing");
    this._alignment = n, this._spacing = r;
  }
  Layout(n, r) {
    let l = this.CacheAndCheckAssignWidth(n), o = this.CacheAndCheckAssignHeight(r), h = l, A = 0, y = !1, F = 0;
    for (let w = 0; w < this._children.length; w++) {
      w != 0 && h >= this._spacing && (h = Math.max(0, h - this._spacing));
      let P = this._children[w];
      if (P instanceof $e) {
        const C = P;
        y = !0, F += C.Flex;
        continue;
      }
      h <= 0 ? P.Layout(0, 0) : (P.Layout(h, o), A = Math.max(A, P.H), h -= P.W);
    }
    if (y) {
      for (const w of this._children)
        if (w instanceof $e) {
          const P = w;
          h <= 0 ? w.Layout(0, 0) : (w.Layout(h * (P.Flex / F), o), A = Math.max(A, w.H));
        }
    }
    let u = 0;
    for (let w = 0; w < this._children.length && (w != 0 && (u += this._spacing), !(u >= l)); w++) {
      let P = this._children[w], C = match(this._alignment).with(Ae.Bottom, () => A - P.H).with(Ae.Middle, () => (A - P.H) / 2).otherwise(
        () => 0
      );
      P.SetPosition(u, C), u += P.W;
    }
    this.SetSize(Math.min(l, u), A);
  }
}
class Ka extends Lr {
  constructor(n = Xn.Vertical) {
    super();
    m(this, "ScrollController");
    m(this, "_dataSource");
    this.ScrollController = new na(n == Xn.Vertical ? jt.Vertical : jt.Horizontal);
  }
  get DataSource() {
    return this._dataSource;
  }
  set DataSource(n) {
    this._dataSource = n, this.Widget.OnDataSourceChanged();
  }
  ScrollTo(n) {
    let r = this.Widget.GetChildAt(n), l = this.ScrollController.OffsetY;
    if (r.Y >= l && r.Y + r.H <= this.Widget.H + l)
      return;
    let o = r.Y >= l ? r.Y + r.H - this.Widget.H - l : r.Y - l, h = this.Widget.OnScroll(0, o);
    h.IsEmpty || this.Widget.Root.Window.AfterScrollDone(this.Widget, h);
  }
}
const wa = class extends yn {
  constructor(n, r = null, l = null) {
    super();
    m(this, "_controller");
    m(this, "_itemBuilder");
    this._itemBuilder = n, this._controller = l != null ? l : new Ka(), this._controller.AttachWidget(this), r != null && (this._controller.DataSource = r);
  }
  static From(n, r = null) {
    return new wa((l, o) => l, n, r);
  }
  OnDataSourceChanged() {
    if (this._children.Clear(), this._controller.DataSource != null)
      for (let n = 0; n < this._controller.DataSource.length; n++)
        this._children.Add(this._itemBuilder(this._controller.DataSource[n], n));
    this.IsMounted && this.Invalidate(c.Relayout);
  }
  Layout(n, r) {
    let l = this.CacheAndCheckAssignWidth(n), o = this.CacheAndCheckAssignHeight(r), h = 0;
    for (const A of this._children)
      A.Layout(l, Number.POSITIVE_INFINITY), A.SetPosition(0, h), h += A.H;
    this.SetSize(l, o);
  }
  Paint(n, r = null) {
    n.save(), n.clipRect(f.FromLTWH(0, 0, this.W, this.H), CanvasKit.ClipOp.Intersect, !1);
    let l = this._controller.ScrollController.OffsetY;
    for (const o of this._children)
      o.Y + o.H <= l || (n.translate(0, o.Y - l), o.Paint(n, null), n.translate(0, l - o.Y));
    n.restore();
  }
  get ScrollOffsetX() {
    return this._controller.ScrollController.OffsetX;
  }
  get ScrollOffsetY() {
    return this._controller.ScrollController.OffsetY;
  }
  OnScroll(n, r) {
    if (this._children.length == 0)
      return k.Empty;
    let l = this._children[this._children.length - 1];
    if (l.Y + l.H <= this.H)
      return k.Empty;
    let o = 0, h = l.Y + l.H - this.H, A = this._controller.ScrollController.OnScroll(n, r, o, h);
    return A.IsEmpty || this.Invalidate(c.Repaint), A;
  }
};
let Nn = wa;
m(Nn, "$meta_PixUI_IScrollable", !0);
const dt = class extends K {
  constructor() {
    super(...arguments);
    m(this, "_margin");
    m(this, "_elevation");
    m(this, "_color");
    m(this, "_shadowColor");
    m(this, "_shape");
  }
  get Color() {
    return this._color;
  }
  set Color(n) {
    this._color = this.Rebind(this._color, n, W.AffectsVisual);
  }
  get ShadowColor() {
    return this._shadowColor;
  }
  set ShadowColor(n) {
    this._shadowColor = this.Rebind(this._shadowColor, n, W.AffectsVisual);
  }
  get Elevation() {
    return this._elevation;
  }
  set Elevation(n) {
    this._elevation = this.Rebind(this._elevation, n, W.AffectsVisual);
  }
  get Margin() {
    return this._margin;
  }
  set Margin(n) {
    this._margin = this.Rebind(this._margin, n, W.AffectsLayout);
  }
  get Shape() {
    return this._shape;
  }
  set Shape(n) {
    this._shape = this.Rebind(this._shape, n, W.AffectsLayout);
  }
  Layout(n, r) {
    var y, F, u, w;
    let l = this.CacheAndCheckAssignWidth(n), o = this.CacheAndCheckAssignHeight(r);
    if (this.Child == null) {
      this.SetSize(l, o);
      return;
    }
    let h = (F = (y = this._margin) == null ? void 0 : y.Value) != null ? F : Z.All(dt.DefaultMargin), A = (w = (u = this.Padding) == null ? void 0 : u.Value) != null ? w : Z.All(0);
    this.Child.Layout(
      l - h.Horizontal - A.Horizontal,
      o - h.Vertical - A.Vertical
    ), this.Child.SetPosition(h.Left + A.Left, h.Top + A.Top), this.SetSize(
      this.Child.W + h.Horizontal + A.Horizontal,
      this.Child.H + h.Vertical + A.Vertical
    );
  }
  get Clipper() {
    var o, h;
    let n = (h = (o = this._shape) == null ? void 0 : o.Value) != null ? h : dt.DefaultShape, r = this.GetChildRect(), l = n.GetOuterPath(r);
    return new Vn(l);
  }
  GetChildRect() {
    var r, l;
    let n = (l = (r = this._margin) == null ? void 0 : r.Value) != null ? l : Z.All(dt.DefaultMargin);
    return f.FromLTWH(
      n.Left,
      n.Top,
      this.W - n.Left - n.Right,
      this.H - n.Top - n.Bottom
    );
  }
  Paint(n, r = null) {
    var w, P, C, R, L, v, V, z;
    let l = (P = (w = this._color) == null ? void 0 : w.Value) != null ? P : D.White, o = (R = (C = this._shadowColor) == null ? void 0 : C.Value) != null ? R : D.Black, h = (v = (L = this._elevation) == null ? void 0 : L.Value) != null ? v : 2, A = this.GetChildRect(), y = (z = (V = this._shape) == null ? void 0 : V.Value) != null ? z : dt.DefaultShape, F = this.Clipper, u = F.GetPath();
    h > 0 && vn(n, u, o, h, o.Alpha != 255, this.Root.Window.ScaleFactor), n.save(), F.ApplyToCanvas(n), n.clear(l), y.Paint(n, A), this.PaintChildren(n, r), n.restore(), F.Dispose();
  }
};
let qe = dt;
m(qe, "DefaultMargin", 4), m(qe, "DefaultShape", new nt(null, re.All(G.Circular(4))));
class En extends K {
  constructor() {
    super();
    m(this, "_animationController");
    m(this, "_animationFrom");
    m(this, "_animationTo");
    m(this, "_transitionStack");
    this.IsLayoutTight = !1;
  }
  ReplaceTo(n) {
    if (!this.IsMounted) {
      this.Child = n;
      return;
    }
    this.Root.Window.BeforeDynamicViewChange(this), this.Child = n, this.Root.Window.AfterDynamicViewChange(this), this.Invalidate(c.Relayout);
  }
  AnimateTo(n, r, l, o, h, A) {
    this._animationFrom = n, this._animationTo = r, this.Root.Window.BeforeDynamicViewChange(this), this.CreateAnimationControl(l, o);
    let y = A == null ? n : A(this._animationController, n), F = h(this._animationController, r);
    this._transitionStack = new kr(y, F), this.Child = this._transitionStack, this.Layout(this.CachedAvailableWidth, this.CachedAvailableHeight), o ? this._animationController.Reverse() : this._animationController.Forward();
  }
  CreateAnimationControl(n, r) {
    let l = r ? 1 : 0;
    this._animationController = new ot(n, l), this._animationController.ValueChanged.Add(this.OnAnimationValueChanged, this), this._animationController.StatusChanged.Add(this.OnAnimationStatusChanged, this);
  }
  OnAnimationValueChanged() {
    this.Invalidate(c.Repaint);
  }
  OnAnimationStatusChanged(n) {
    (n == I.Completed || n == I.Dismissed) && (this._animationController.ValueChanged.Remove(this.OnAnimationValueChanged, this), this._animationController.StatusChanged.Remove(this.OnAnimationStatusChanged, this), this._animationController.Dispose(), this._animationController = null, this._animationFrom.SuspendingMount ? (this._animationFrom.SuspendingMount = !1, this._animationFrom.Parent = null, this._animationTo.SuspendingMount = !0) : (this._animationTo.SuspendingMount = !1, this._animationTo.Parent = null, this._animationFrom.SuspendingMount = !0), this.Child = n == I.Dismissed ? this._animationFrom : this._animationTo, this._animationTo.SuspendingMount ? this._animationTo.SuspendingMount = !1 : this._animationFrom.SuspendingMount = !1, this._transitionStack.Dispose(), this._transitionStack = null, this.Root.Window.AfterDynamicViewChange(this));
  }
  HitTest(n, r, l) {
    return this._animationController != null && this._animationController.Status != I.Dismissed && this._animationController.Status != I.Completed ? this.ContainsPoint(n, r) ? (l.Add(this), !0) : !1 : super.HitTest(n, r, l);
  }
  get Clipper() {
    return this.Parent == null ? null : new Rt(f.FromLTWH(0, 0, this.W, this.H));
  }
  Paint(n, r = null) {
    let l = this.Clipper;
    l != null && (n.save(), l.ApplyToCanvas(n)), this.PaintChildren(n, r), l != null && n.restore(), l == null || l.Dispose();
  }
}
class ol {
  constructor(a, n, r = !1, l = null, o = null, h = 200, A = 200) {
    m(this, "Name");
    m(this, "Dynamic");
    m(this, "Builder");
    m(this, "Duration");
    m(this, "ReverseDuration");
    m(this, "EnteringBuilder");
    m(this, "ExistingBuilder");
    this.Name = a.toLowerCase(), this.Dynamic = r, this.Builder = n, this.Duration = h, this.ReverseDuration = A, this.EnteringBuilder = l;
  }
  BuildWidgetAsync(a) {
    return this.Builder(a);
  }
}
class oa {
  constructor(a) {
    m(this, "Path");
    this.Path = a;
  }
}
class Hr {
  constructor() {
    m(this, "LeafDefault");
    m(this, "LeafNamed");
    this.LeafNamed = new g.Dictionary();
  }
  GetFullPath() {
    let a = this.LeafDefault.Path;
    if (this.LeafNamed.length > 0) {
      a += "?";
      let n = !0;
      for (const r of this.LeafNamed.Keys)
        n ? n = !1 : a += "&", a += r + "=" + this.LeafNamed.GetAt(r).Path;
    }
    return a;
  }
}
class ut {
  constructor() {
    m(this, "_history", new g.List());
    m(this, "_historyIndex", -1);
    m(this, "RootNavigator", new Dn([]));
    m(this, "AssignedPath");
  }
  get Count() {
    return this._history.length;
  }
  GetFullPath() {
    if (this.RootNavigator.Children == null || this.RootNavigator.Children.length == 0)
      return "";
    let a = new Hr();
    return ut.BuildFullPath(a, this.RootNavigator), a.GetFullPath();
  }
  static BuildFullPath(a, n) {
    if (n.IsNamed)
      a.LeafNamed.Add(n.NameOfRouteView, n);
    else if (n.IsInNamed) {
      let r = n.GetNamedParent();
      a.LeafNamed.Add(r.NameOfRouteView, n);
    } else
      a.LeafDefault = n;
    if (n.Children != null)
      for (const r of n.Children)
        ut.BuildFullPath(a, r);
  }
  PushEntry(a) {
    this._historyIndex != this._history.length - 1 && this._history.RemoveRange(this._historyIndex + 1, this._history.length - this._historyIndex - 1), this._history.Add(a), this._historyIndex++;
  }
  Pop() {
    if (this._historyIndex <= 0)
      return null;
    let a = this._history[this._historyIndex];
    return this.Goto(this._historyIndex - 1), a;
  }
  Goto(a) {
    if (a < 0 || a >= this._history.length)
      throw new g.Exception("index out of range");
    let n = a < this._historyIndex ? ft.GotoBack : ft.GotoForward;
    this._historyIndex = a;
    let r = this._history[this._historyIndex];
    this.AssignedPath = r.Path, this.NavigateTo(r.Path, n);
  }
  Push(a) {
    this.AssignedPath = a;
    let n = new oa(a);
    this.PushEntry(n), this.NavigateTo(a, ft.Push);
  }
  NavigateTo(a, n) {
    let o = a.split(String.fromCharCode(63))[0].split(String.fromCharCode(47)), h = ut.GetDefaultNavigator(this.RootNavigator);
    this.ComparePath(h, o, 1, n);
  }
  ComparePath(a, n, r, l) {
    if (a == null)
      return !1;
    let o = n[r];
    o == "" && (o = a.GetDefaultRoute().Name);
    let h = null;
    return a.IsDynamic(o) && (h = n[r + 1], r++), o != a.ActiveRoute.Name || h != a.ActiveArgument ? (a.Goto(o, h, l), !0) : r == n.length - 1 ? !1 : this.ComparePath(ut.GetDefaultNavigator(a), n, r + 1, l);
  }
  static GetDefaultNavigator(a) {
    if (a.Children == null || a.Children.length == 0)
      return null;
    for (let n = 0; n < a.Children.length; n++)
      if (!a.Children[n].IsNamed)
        return a.Children[n];
    return null;
  }
}
class kr extends O {
  constructor(n, r) {
    super();
    m(this, "_from");
    m(this, "_to");
    this._from = n, this._from.Parent = this, this._to = r, this._to.Parent = this;
  }
  VisitChildren(n) {
    !this.IsMounted || n(this._from) || n(this._to);
  }
  Layout(n, r) {
    this.CachedAvailableWidth = n, this.CachedAvailableHeight = r, this.SetSize(n, r), this._from.Layout(this.W, this.H), this._from.SetPosition(0, 0), this._to.Layout(this.W, this.H), this._to.SetPosition(0, 0);
  }
  OnChildSizeChanged(n, r, l, o) {
  }
  Paint(n, r = null) {
    this._from.Paint(n, r), this._to.Paint(n, r);
  }
}
var ft = /* @__PURE__ */ ((i) => (i[i.Init = 0] = "Init", i[i.Push = 1] = "Push", i[i.GotoBack = 2] = "GotoBack", i[i.GotoForward = 3] = "GotoForward", i))(ft || {}), Cs, Ss, Rs, Ts, Is;
const Pa = class {
  constructor(a) {
    m(this, "_routes", new g.List());
    m(this, "HistoryManager");
    m(this, "OnRouteChanged");
    b(this, Cs, void 0);
    b(this, Ss, void 0);
    b(this, Rs, void 0);
    b(this, Ts, void 0);
    b(this, Is, void 0);
    this._routes.AddRange(a);
  }
  get Parent() {
    return d(this, Cs);
  }
  set Parent(a) {
    N(this, Cs, a);
  }
  get Children() {
    return d(this, Ss);
  }
  set Children(a) {
    N(this, Ss, a);
  }
  get NameOfRouteView() {
    return d(this, Rs);
  }
  set NameOfRouteView(a) {
    N(this, Rs, a);
  }
  get ActiveRoute() {
    return d(this, Ts);
  }
  set ActiveRoute(a) {
    N(this, Ts, a);
  }
  get ActiveArgument() {
    return d(this, Is);
  }
  set ActiveArgument(a) {
    N(this, Is, a);
  }
  get IsNamed() {
    return this.NameOfRouteView != null;
  }
  get IsInNamed() {
    return this.GetNamedParent() != null;
  }
  GetNamedParent() {
    let a = this.Parent;
    for (; a != null; ) {
      if (a.IsNamed)
        return a;
      a = a.Parent;
    }
    return null;
  }
  get NameAndArgument() {
    return this.ActiveRoute.Dynamic ? this.ActiveRoute.Name + "/" + this.ActiveArgument : this.ActiveRoute.Name;
  }
  get ParentPath() {
    return this.Parent == null ? "" : this.Parent.IsNamed ? this.Parent.NameAndArgument + "/" : this.Parent.Parent == null ? "/" : this.Parent.ParentPath + this.Parent.NameAndArgument + "/";
  }
  get Path() {
    return this.ParentPath + this.NameAndArgument;
  }
  AttachChild(a, n) {
    var r;
    a.NameOfRouteView = n, a.Parent = this, (r = this.Children) != null || (this.Children = new g.List()), this.Children.Add(a);
  }
  DetachChild(a) {
    var n;
    a.Parent = null, (n = this.Children) == null || n.Remove(a);
  }
  GetDefaultRoute() {
    return this._routes[0];
  }
  IsDynamic(a) {
    let n = this._routes.Find((r) => r.Name == a);
    return n == null ? !1 : n.Dynamic;
  }
  InitRouteWidget() {
    var n;
    if (this._routes.length == 0)
      return;
    this.ActiveRoute = this._routes[0];
    let a = this.HistoryManager.AssignedPath;
    if (!g.IsNullOrEmpty(a) && !this.IsNamed) {
      if (!this.IsInNamed) {
        let r = this.ParentPath;
        if (a.length > r.length) {
          let o = a.substring(a.indexOf(r) + 1).split(String.fromCharCode(47)), h = this._routes.Find((A) => A.Name == o[0]);
          if (h == null)
            throw new g.Exception("Can't find route: " + o[0]);
          this.ActiveRoute = h, this.ActiveRoute.Dynamic && o.length > 1 && (this.ActiveArgument = o[1]);
        }
      }
    }
    (n = this.OnRouteChanged) == null || n.call(this, 0);
  }
  Push(a, n = null) {
    var h;
    if (a = a.toLowerCase(), n != null && (n = n.toLowerCase()), a == this.ActiveRoute.Name && n == this.ActiveArgument)
      return;
    let r = this._routes.Find((A) => A.Name == a);
    if (r == null)
      throw new g.ArgumentException(`Can't find route: ${a}`);
    this.ActiveRoute = r, this.ActiveArgument = n;
    let l = this.HistoryManager.GetFullPath();
    this.HistoryManager.AssignedPath = l;
    let o = new oa(l);
    this.HistoryManager.PushEntry(o), Pa.PushWebHistory(l, this.HistoryManager.Count - 1), (h = this.OnRouteChanged) == null || h.call(this, 1);
  }
  Pop() {
    this.HistoryManager.Pop();
  }
  Goto(a, n, r) {
    var o;
    let l = this._routes.Find((h) => h.Name == a);
    if (l == null)
      throw new g.Exception("Can't find route: " + a);
    this.ActiveRoute = l, this.ActiveArgument = n, (o = this.OnRouteChanged) == null || o.call(this, r);
  }
  static PushWebHistory(a, n) {
    let r = document.location.origin + "/#" + a;
    history.pushState(n, "", r);
  }
  static ReplaceWebHistory(a, n) {
    let r = document.location.origin;
    a != "/" && (r += "/#" + a), history.replaceState(n, "", r);
  }
};
let Dn = Pa;
Cs = new WeakMap(), Ss = new WeakMap(), Rs = new WeakMap(), Ts = new WeakMap(), Is = new WeakMap();
class Mr extends En {
  constructor(n, r = null) {
    super();
    m(this, "Navigator");
    m(this, "Name");
    this.Name = r, this.Navigator = n, this.Navigator.OnRouteChanged = this.OnRouteChanged.bind(this);
  }
  OnMounted() {
    var l, o, h;
    super.OnMounted();
    let n = this.Root.Window.RouteHistoryManager;
    if (n.Count == 0) {
      let A = (l = n.AssignedPath) != null ? l : "/", y = new oa(A);
      n.PushEntry(y), Dn.ReplaceWebHistory(A, 0);
    }
    this.Navigator.HistoryManager = n, ((h = (o = this.Parent) == null ? void 0 : o.CurrentNavigator) != null ? h : n.RootNavigator).AttachChild(this.Navigator, this.Name), this.Navigator.InitRouteWidget();
  }
  OnUnmounted() {
    super.OnUnmounted(), this.Navigator.Parent.DetachChild(this.Navigator), this.Navigator.HistoryManager = null;
  }
  async OnRouteChanged(n) {
    let r = this.Navigator.ActiveRoute, l = await r.BuildWidgetAsync(this.Navigator.ActiveArgument);
    if (n == ft.Init || r.EnteringBuilder == null)
      this.ReplaceTo(l);
    else {
      let o = this.Child;
      o.SuspendingMount = !0;
      let h, A = n == ft.GotoBack;
      A ? (h = o, o = l) : h = l, this.AnimateTo(o, h, r.Duration, A, r.EnteringBuilder, r.ExistingBuilder);
    }
  }
}
class Or {
  constructor(a, n) {
    m(this, "Match");
    m(this, "Builder");
    m(this, "_cachedWidget");
    this.Match = a, this.Builder = n;
  }
  GetWidget() {
    return this._cachedWidget == null && (this._cachedWidget = this.Builder()), this._cachedWidget;
  }
}
class xr extends En {
  constructor(n) {
    super();
    m(this, "_state");
    m(this, "_whens", new g.List());
    this.IsLayoutTight = !0, this._state = this.Bind(n, W.AffectsLayout);
  }
  MakeChildByCondition() {
    for (const n of this._whens)
      if (n.Match(this._state.Value))
        return n.GetWidget();
    return null;
  }
  When(n, r) {
    var l;
    return this._whens.Add(new Or(n, r)), (l = this.Child) != null || (this.Child = this.MakeChildByCondition()), this;
  }
  OnStateChanged(n, r) {
    if (n === this._state) {
      let l = this.MakeChildByCondition();
      this.ReplaceTo(l);
      return;
    }
    super.OnStateChanged(n, r);
  }
}
class hl extends xr {
  constructor(a, n, r = null) {
    super(a), this.When((l) => l, n), r != null && this.When((l) => !l, r);
  }
}
class Al extends En {
  constructor(n, r, l = null) {
    super();
    m(this, "_future");
    m(this, "_doneBuilder");
    this._future = n, this._doneBuilder = r, l != null && this.ReplaceTo(l());
  }
  OnMounted() {
    super.OnMounted(), this.HasLayout || this.Run();
  }
  async Run() {
    try {
      let n = await this._future;
      this.ReplaceTo(this._doneBuilder(n, null));
    } catch (n) {
      let r = null;
      this.ReplaceTo(this._doneBuilder(r, n));
    }
  }
}
var Ds, Ls;
class ha extends O {
  constructor(n) {
    super();
    b(this, Ds, void 0);
    m(this, "_fontSize");
    m(this, "_fontWeight");
    m(this, "_textColor");
    m(this, "_maxLines", 1);
    m(this, "_cachedParagraph");
    b(this, Ls, !1);
    this.Text = this.Bind(
      n,
      this instanceof rt ? W.AffectsVisual : W.AffectsLayout
    );
  }
  get Text() {
    return d(this, Ds);
  }
  set Text(n) {
    N(this, Ds, n);
  }
  get CachedParagraph() {
    return this._cachedParagraph;
  }
  get ForceHeight() {
    return d(this, Ls);
  }
  set ForceHeight(n) {
    N(this, Ls, n);
  }
  get FontSize() {
    return this._fontSize;
  }
  set FontSize(n) {
    this._fontSize = this.Rebind(this._fontSize, n, W.AffectsLayout);
  }
  get FontWeight() {
    return this._fontWeight;
  }
  set FontWeight(n) {
    this._fontWeight = this.Rebind(this._fontWeight, n, W.AffectsLayout);
  }
  get TextColor() {
    return this._textColor;
  }
  set TextColor(n) {
    this._textColor = this.Rebind(this._textColor, n, W.AffectsVisual);
  }
  set MaxLines(n) {
    var r;
    if (n <= 0)
      throw new g.ArgumentException();
    this._maxLines != n && (this._maxLines = n, this.IsMounted && ((r = this._cachedParagraph) == null || r.delete(), this._cachedParagraph = null, this.Invalidate(c.Relayout)));
  }
  OnStateChanged(n, r) {
    var l;
    (l = this._cachedParagraph) == null || l.delete(), this._cachedParagraph = null, super.OnStateChanged(n, r);
  }
  BuildParagraph(n, r) {
    var o, h, A;
    (o = this._cachedParagraph) == null || o.delete();
    let l = (A = (h = this._textColor) == null ? void 0 : h.Value) != null ? A : D.Black;
    this._cachedParagraph = this.BuildParagraphInternal(n, r, l);
  }
  BuildParagraphInternal(n, r, l) {
    var A, y;
    let o = (y = (A = this._fontSize) == null ? void 0 : A.Value) != null ? y : x.DefaultFontSize, h = this._fontWeight == null ? null : new Va(this._fontWeight.Value, CanvasKit.FontSlant.Upright);
    return $a.BuildParagraph(
      n,
      r,
      o,
      l,
      h,
      this._maxLines,
      this.ForceHeight
    );
  }
  Layout(n, r) {
    let l = this.CacheAndCheckAssignWidth(n), o = this.CacheAndCheckAssignHeight(r);
    if (this.Text.Value == null || this.Text.Value.length == 0) {
      this.SetSize(0, 0);
      return;
    }
    this.BuildParagraph(this.Text.Value, l), this.SetSize(
      Math.min(l, this._cachedParagraph.getMaxIntrinsicWidth()),
      Math.min(o, this._cachedParagraph.getHeight())
    );
  }
  Paint(n, r = null) {
    if (!(this.Text.Value == null || this.Text.Value.length == 0)) {
      if (this._cachedParagraph == null) {
        let l = this.Width == null ? this.CachedAvailableWidth : Math.min(Math.max(0, this.Width.Value), this.CachedAvailableWidth);
        this.BuildParagraph(this.Text.Value, l);
      }
      n.drawParagraph(this._cachedParagraph, 0, 0);
    }
  }
}
Ds = new WeakMap(), Ls = new WeakMap();
class at extends ha {
  constructor(a) {
    super(a);
  }
}
var Ws, Hs;
class rt extends ha {
  constructor(n) {
    super(n);
    m(this, "_caret");
    m(this, "_caretPosition", 0);
    m(this, "Focused", p.op_Implicit_From(!1));
    m(this, "_hintParagraph");
    m(this, "_readonly");
    b(this, Ws, void 0);
    b(this, Hs, void 0);
    m(this, "IsObscure", !1);
    m(this, "HintText");
    this.MouseRegion = new We(() => Le.IBeam), this.MouseRegion.PointerDown.Add(this._OnPointerDown, this), this.FocusNode = new sa(), this.FocusNode.FocusChanged.Add(this._OnFocusChanged, this), this.FocusNode.TextInput.Add(this._OnTextInput, this), this.FocusNode.KeyDown.Add(this._OnKeyDown, this), this._caret = new Br(this, this.GetCaretColor.bind(this), this.GetCaretBounds.bind(this));
  }
  get Readonly() {
    return this._readonly;
  }
  set Readonly(n) {
    this._readonly = this.Rebind(this._readonly, n, W.None);
  }
  get IsReadonly() {
    return this._readonly != null && this._readonly.Value;
  }
  get MouseRegion() {
    return d(this, Ws);
  }
  set MouseRegion(n) {
    N(this, Ws, n);
  }
  get FocusNode() {
    return d(this, Hs);
  }
  set FocusNode(n) {
    N(this, Hs, n);
  }
  get FontHeight() {
    var n, r;
    return ((r = (n = this.FontSize) == null ? void 0 : n.Value) != null ? r : x.DefaultFontSize) + 4;
  }
  get ForceHeight() {
    return !0;
  }
  _OnFocusChanged(n) {
    this.Focused.Value = n, n ? (this.IsReadonly || this.Root.Window.StartTextInput(), this._caret.Show()) : (this.IsReadonly || this.Root.Window.StopTextInput(), this._caret.Hide());
  }
  _OnTextInput(n) {
    this.IsReadonly || (this.Text.Value != null ? this.Text.Value = this.Text.Value.Insert(this._caretPosition, n) : this.Text.Value = n, this._caretPosition += n.length);
  }
  _OnPointerDown(n) {
    let r = 0;
    if (this.CachedParagraph != null) {
      let l = this.CachedParagraph.getGlyphPositionAtCoordinate(n.X, n.Y);
      console.log(`pos=${l.pos} affinity=${l.affinity}`), r = l.pos;
    }
    r != this._caretPosition && (this._caretPosition = r, this._caret.NotifyPositionChanged());
  }
  _OnKeyDown(n) {
    switch (n.KeyCode) {
      case B.Back:
        this.DeleteBack();
        break;
      case B.Left:
        this.MoveLeft();
        break;
      case B.Right:
        this.MoveRight();
        break;
    }
  }
  DeleteBack() {
    this.IsReadonly || this._caretPosition == 0 || (this.Text.Value = this.Text.Value.Remove(this._caretPosition - 1, 1), this._caretPosition--);
  }
  MoveLeft() {
    this._caretPosition != 0 && (this._caretPosition--, this._caret.NotifyPositionChanged());
  }
  MoveRight() {
    this._caretPosition != this.Text.Value.length && (this._caretPosition++, this._caret.NotifyPositionChanged());
  }
  GetCaretBounds() {
    let n = 2, r = n / 2;
    this.TryBuildParagraph();
    let l = this.LocalToWindow(0, 0);
    if (this._caretPosition != 0)
      if (this._caretPosition == this.Text.Value.length) {
        let o = Ca(this.CachedParagraph, this._caretPosition - 1, CanvasKit.RectHeightStyle.Tight, CanvasKit.RectWidthStyle.Tight);
        l.Offset(o.Rect.Left + o.Rect.Width, 0);
      } else {
        let o = Ca(this.CachedParagraph, this._caretPosition, CanvasKit.RectHeightStyle.Tight, CanvasKit.RectWidthStyle.Tight);
        l.Offset(o.Rect.Left, 0);
      }
    return f.FromLTWH(l.X - r, l.Y, n, this.H);
  }
  GetCaretColor() {
    return x.CaretColor;
  }
  TryBuildParagraph() {
    if (this.CachedParagraph != null || this.Text.Value == null || this.Text.Value.length == 0)
      return;
    let n = this.IsObscure ? "\u25CF".repeat(this.Text.Value.length) : this.Text.Value;
    this.BuildParagraph(n, Number.POSITIVE_INFINITY);
  }
  OnStateChanged(n, r) {
    var l, o;
    if (n === this._readonly) {
      this.IsReadonly ? (l = this.Root) == null || l.Window.StopTextInput() : (o = this.Root) == null || o.Window.StartTextInput();
      return;
    }
    super.OnStateChanged(n, r);
  }
  Layout(n, r) {
    let l = this.CacheAndCheckAssignWidth(n), o = this.CacheAndCheckAssignHeight(r);
    this.TryBuildParagraph(), this.SetSize(l, Math.min(o, this.FontHeight));
  }
  Paint(n, r = null) {
    var l;
    if (this.Text.Value == null || this.Text.Value.length == 0) {
      if (g.IsNullOrEmpty(this.HintText))
        return;
      (l = this._hintParagraph) != null || (this._hintParagraph = this.BuildParagraphInternal(this.HintText, Number.POSITIVE_INFINITY, D.Gray)), n.drawParagraph(this._hintParagraph, 0, 2);
    } else {
      if (this.TryBuildParagraph(), this.CachedParagraph == null)
        return;
      n.drawParagraph(this.CachedParagraph, 0, 2);
    }
  }
}
Ws = new WeakMap(), Hs = new WeakMap(), m(rt, "$meta_PixUI_IMouseRegion", !0), m(rt, "$meta_PixUI_IFocusable", !0);
const Gt = class extends O {
  constructor(n) {
    super();
    m(this, "_prefix");
    m(this, "_suffix");
    m(this, "_editor");
    m(this, "_border");
    m(this, "_padding");
    m(this, "_focusedDecoration");
    this._editor = n, this._editor.Parent = this, this._focusedDecoration = new Vr(this, this.GetFocusedBorder.bind(this), this.GetUnFocusedBorder.bind(this)), this._focusedDecoration.AttachFocusChangedEvent(this._editor);
  }
  get Padding() {
    return this._padding;
  }
  set Padding(n) {
    this._padding = this.Rebind(this._padding, n, W.AffectsLayout);
  }
  get IsReadonly() {
    return this.Readonly != null && this.Readonly.Value;
  }
  get PrefixWidget() {
    return this._prefix;
  }
  set PrefixWidget(n) {
    this._prefix != null && (this._prefix.Parent = null), this._prefix = n, this._prefix != null && (this._prefix.Parent = this, this.IsMounted && this.Invalidate(c.Relayout));
  }
  get SuffixWidget() {
    return this._suffix;
  }
  set SuffixWidget(n) {
    this._suffix != null && (this._suffix.Parent = null), this._suffix = n, this._suffix != null && (this._suffix.Parent = this, this.IsMounted && this.Invalidate(c.Relayout));
  }
  GetUnFocusedBorder() {
    var n;
    return (n = this._border) != null ? n : Gt.DefaultBorder;
  }
  GetFocusedBorder() {
    var r;
    let n = (r = this._border) != null ? r : Gt.DefaultBorder;
    if (n instanceof kt) {
      const l = n;
      return new kt(
        new Me(x.FocusedColor, x.FocusedBorderWidth),
        l.BorderRadius
      );
    }
    throw new g.NotImplementedException();
  }
  OnUnmounted() {
    this._focusedDecoration.StopAndReset(), super.OnUnmounted();
  }
  VisitChildren(n) {
    this._prefix != null && n(this._prefix) || n(this._editor) || this._suffix != null && n(this._suffix);
  }
  Layout(n, r) {
    var u, w, P, C, R, L;
    let l = this.CacheAndCheckAssignWidth(n), o = this.CacheAndCheckAssignHeight(r), h = (w = (u = this._padding) == null ? void 0 : u.Value) != null ? w : Z.All(4), A = l - h.Horizontal, y = o - h.Vertical;
    if (A <= 0 || y <= 0) {
      this.SetSize(l, o);
      return;
    }
    this._prefix != null && (this._prefix.Layout(A, y), A -= this._prefix.W), this._suffix != null && (this._suffix.Layout(A, y), A -= this._suffix.W), this._editor.Layout(A, y);
    let F = this._editor.H;
    (P = this._prefix) == null || P.SetPosition(h.Left, (F - this._prefix.H) / 2 + h.Top), (C = this._suffix) == null || C.SetPosition(
      l - h.Right - this._suffix.W,
      (F - this._suffix.H) / 2 + h.Top
    ), this._editor.SetPosition(h.Left + ((L = (R = this._prefix) == null ? void 0 : R.W) != null ? L : 0), h.Top + 1), o = Math.min(o, F + h.Vertical), this.SetSize(l, o);
  }
  Paint(n, r = null) {
    var h;
    let l = f.FromLTWH(0, 0, this.W, this.H);
    ((h = this._border) != null ? h : Gt.DefaultBorder).Paint(n, l, this.IsReadonly ? x.DisabledBgColor : D.White), this.PaintChildren(n, r);
  }
};
let Mt = Gt;
m(Mt, "DefaultBorder", new kt(null, re.All(G.Circular(4))));
class yl extends Mt {
  constructor(a) {
    super(new rt(a)), this.Readonly = p.op_Implicit_From(a.Readonly);
  }
  get FontSize() {
    return this._editor.FontSize;
  }
  set FontSize(a) {
    this._editor.FontSize = a;
  }
  set Prefix(a) {
    this.PrefixWidget = a;
  }
  set Suffix(a) {
    this.SuffixWidget = a;
  }
  get Readonly() {
    return this._editor.Readonly;
  }
  set Readonly(a) {
    this._editor.Readonly = a;
  }
  set IsObscure(a) {
    this._editor.IsObscure = a;
  }
  set HintText(a) {
    this._editor.HintText = a;
  }
}
class Fl extends Mt {
  constructor(n, r = !1) {
    super(r ? new rt(n.AsStateOfString()) : new Zn(n.AsStateOfString()));
    m(this, "_selectedValue");
    m(this, "_optionBuilder");
    m(this, "_expandAnimation", new fr());
    m(this, "_listPopup");
    m(this, "_showing", !1);
    m(this, "_labelGetter");
    m(this, "Options", []);
    this._selectedValue = n, this.SuffixWidget = new ya(new Xa(0, 0.5).Animate(this._expandAnimation)), qn(this._editor) && this._editor.MouseRegion.PointerTap.Add(this.OnEditorTap, this), Ft(this._editor) && this._editor.FocusNode.FocusChanged.Add(this.OnFocusChanged, this);
  }
  set OptionsAsyncGetter(n) {
    this.GetOptionsAsync(n);
  }
  set LabelGetter(n) {
    this._labelGetter = n;
  }
  get Readonly() {
    return this._editor instanceof rt ? this._editor.Readonly : this._editor.Readonly;
  }
  set Readonly(n) {
    if (this._editor instanceof rt) {
      const r = this._editor;
      r.Readonly = n;
    } else
      this._editor.Readonly = n;
  }
  OnFocusChanged(n) {
    n || this.HidePopup();
  }
  OnEditorTap(n) {
    this._showing ? this.HidePopup() : this.ShowPopup();
  }
  ShowPopup() {
    var r;
    if (this._showing || this.Options.length == 0)
      return;
    this._showing = !0;
    let n = (r = this._optionBuilder) != null ? r : (l, o, h, A) => {
      var F;
      let y = ae.Make1(
        A,
        (u) => u ? D.White : D.Black
      );
      return new at(p.op_Implicit_From(this._labelGetter != null ? this._labelGetter(l) : (F = l == null ? void 0 : l.toString()) != null ? F : "")).Init(
        { TextColor: y }
      );
    };
    this._listPopup = new Xr(this.Overlay, n, this.W + 8, x.DefaultFontSize + 8), this._listPopup.DataSource = new g.List(this.Options), this._selectedValue.Value != null && this._listPopup.InitSelect(this._selectedValue.Value), this._listPopup.OnSelectionChanged = this.OnSelectionChanged.bind(this), this._listPopup.Show(this, new k(-4, 0), xe.DefaultTransitionBuilder), this._expandAnimation.Parent = this._listPopup.AnimationController;
  }
  HidePopup() {
    var n;
    !this._showing || (this._showing = !1, (n = this._listPopup) == null || n.Hide(), this._listPopup = null);
  }
  async GetOptionsAsync(n) {
    this.Options = await n;
  }
  OnSelectionChanged(n) {
    this._showing = !1, this._listPopup = null, this._selectedValue.Value = n;
  }
}
var ks, Ms;
class Zn extends ha {
  constructor(n) {
    super(n);
    b(this, ks, void 0);
    b(this, Ms, void 0);
    m(this, "_readonly");
    this.MouseRegion = new We(), this.FocusNode = new sa();
  }
  get MouseRegion() {
    return d(this, ks);
  }
  set MouseRegion(n) {
    N(this, ks, n);
  }
  get FocusNode() {
    return d(this, Ms);
  }
  set FocusNode(n) {
    N(this, Ms, n);
  }
  get Readonly() {
    return this._readonly;
  }
  set Readonly(n) {
    this._readonly = this.Rebind(this._readonly, n, W.None);
  }
  get ForceHeight() {
    return !0;
  }
  Layout(n, r) {
    var A, y;
    let l = this.CacheAndCheckAssignWidth(n), o = this.CacheAndCheckAssignHeight(r);
    this.BuildParagraph(this.Text.Value, l);
    let h = ((y = (A = this.FontSize) == null ? void 0 : A.Value) != null ? y : x.DefaultFontSize) + 4;
    this.SetSize(l, Math.min(o, h));
  }
  Paint(n, r = null) {
    this.Text.Value.length != 0 && n.drawParagraph(this.CachedParagraph, 0, 2);
  }
}
ks = new WeakMap(), Ms = new WeakMap(), m(Zn, "$meta_PixUI_IMouseRegion", !0), m(Zn, "$meta_PixUI_IFocusable", !0);
var Os;
class Gn extends O {
  constructor() {
    super();
    m(this, "_value");
    m(this, "_triState", !1);
    m(this, "_positionController");
    b(this, Os, void 0);
    m(this, "ValueChanged", new g.Event());
    this.MouseRegion = new We(() => Le.Hand), this.MouseRegion.PointerTap.Add(this.OnTap, this);
  }
  get MouseRegion() {
    return d(this, Os);
  }
  set MouseRegion(n) {
    N(this, Os, n);
  }
  InitState(n, r) {
    this._triState = r, this._value = this.Bind(n, W.AffectsVisual), this._positionController = new ot(100, n.Value != null && n.Value ? 1 : 0), this._positionController.ValueChanged.Add(this.OnPositionValueChanged, this);
  }
  OnTap(n) {
    this._value.Value == null || this._value.Value == !1 ? this._value.Value = !0 : this._value.Value = !1;
  }
  AnimateToValue() {
    this._triState ? this._value.Value == null || this._value.Value == !0 ? (this._positionController.SetValue(0), this._positionController.Forward()) : this._positionController.Reverse() : this._value.Value != null && this._value.Value == !0 ? this._positionController.Forward() : this._positionController.Reverse();
  }
  OnPositionValueChanged() {
    this.Invalidate(c.Repaint);
  }
  OnStateChanged(n, r) {
    if (n === this._value) {
      this.ValueChanged.Invoke(this._value.Value), this.AnimateToValue();
      return;
    }
    super.OnStateChanged(n, r);
  }
}
Os = new WeakMap(), m(Gn, "$meta_PixUI_IMouseRegion", !0);
const M = class extends Gn {
  constructor(a) {
    super(), this.InitState(
      ae.Make1(
        a,
        (n) => n,
        (n) => a.Value = n != null ? n : !1
      ),
      !1
    );
  }
  Layout(a, n) {
    let r = this.CacheAndCheckAssignWidth(a), l = this.CacheAndCheckAssignHeight(n);
    this.SetSize(Math.min(r, M._kSwitchWidth), Math.min(l, M._kSwitchHeight));
  }
  Paint(a, n = null) {
    a.save(), a.translate(0, (M._kSwitchHeight - M._kTrackHeight) / 2);
    let r = this._positionController.Value, l = 0, o = r, h = x.AccentColor, A = new T(1375731712), y = S.Shared(T.Lerp(A, h, r));
    y.setAntiAlias(!0);
    let F = f.FromLTWH(
      (this.W - M._kTrackWidth) / 2,
      (this.H - M._kSwitchHeight) / 2,
      M._kTrackWidth,
      M._kTrackHeight
    ), u = he.FromRectAndRadius(F.Clone(), M._kTrackRadius, M._kTrackRadius);
    a.drawRRect(u, y);
    let w = M._kThumbExtension * l, P = mt.Lerp(
      F.Left + M._kTrackInnerStart - M._kThumbRadius,
      F.Left + M._kTrackInnerEnd - M._kThumbRadius - w,
      o
    ), C = mt.Lerp(
      F.Left + M._kTrackInnerStart + M._kThumbRadius + w,
      F.Left + M._kTrackInnerEnd + M._kThumbRadius,
      o
    ), R = M._kTrackHeight / 2, L = new f(
      P,
      R - M._kThumbRadius,
      C,
      R + M._kThumbRadius
    ), v = new CanvasKit.Path();
    v.addRRect(u), a.clipPath(v, CanvasKit.ClipOp.Intersect, !0), M.PaintThumb(a, L.Clone()), a.restore();
  }
  static PaintThumb(a, n) {
    let r = Math.min(n.Width, n.Height), l = he.FromRectAndRadius(n.Clone(), r / 2, r / 2), o = S.Shared(T.Empty);
    o.setAntiAlias(!0), l.Shift(0, 3);
    let h = new T(637534208), A = 8;
    o.setColor(h), o.setMaskFilter(CanvasKit.MaskFilter.MakeBlur(CanvasKit.BlurStyle.Normal, Sa(A), !1)), a.drawRRect(l, o), h = new T(251658240), A = 1, o.setColor(h), o.setMaskFilter(CanvasKit.MaskFilter.MakeBlur(CanvasKit.BlurStyle.Normal, Sa(A), !1)), a.drawRRect(l, o), l.Shift(0, -3), l.Inflate(0.5, 0.5), o.setColor(M._kThumbBorderColor), o.setMaskFilter(null), a.drawRRect(l, o), l.Deflate(0.5, 0.5), o.setColor(D.White), a.drawRRect(l, o);
  }
};
let se = M;
m(se, "_kTrackWidth", 40), m(se, "_kTrackHeight", 24), m(se, "_kTrackRadius", M._kTrackHeight / 2), m(se, "_kTrackInnerStart", M._kTrackHeight / 2), m(se, "_kTrackInnerEnd", M._kTrackWidth - M._kTrackInnerStart), m(se, "_kSwitchWidth", M._kTrackWidth + 6), m(se, "_kSwitchHeight", M._kTrackHeight + 6), m(se, "_kThumbExtension", 7), m(se, "_kThumbRadius", M._kTrackHeight / 2 - 2), m(se, "_kThumbBorderColor", new T(167772160));
const H = class extends Gn {
  constructor(n) {
    super();
    m(this, "_previousValue");
    m(this, "_shape", new nt(null, re.All(G.Circular(1))));
    this._previousValue = n.Value, this.InitState(
      ae.Make1(n, (r) => r, (r) => n.Value = r != null ? r : !1),
      !1
    ), this._positionController.StatusChanged.Add(this.OnPositionStatusChanged, this);
  }
  static Tristate(n) {
    let r = new H(H._notSetState);
    return r._previousValue = n.Value, r.InitState(n, !0), r;
  }
  OnPositionStatusChanged(n) {
    (n == I.Completed || n == I.Dismissed) && (this._previousValue = this._value.Value);
  }
  Layout(n, r) {
    let l = this.CacheAndCheckAssignWidth(n), o = this.CacheAndCheckAssignHeight(r);
    this.SetSize(Math.min(l, H._kCheckboxSize), Math.min(o, H._kCheckboxSize));
  }
  Paint(n, r = null) {
    let l = new k(this.W / 2 - H._kEdgeSize / 2, this.H / 2 - H._kEdgeSize / 2), o = D.White, h = this._positionController.Status, A = h == I.Forward || h == I.Completed ? this._positionController.Value : 1 - this._positionController.Value;
    if (this._previousValue == !1 || this._value.Value == !1) {
      let y = this._value.Value == !1 ? 1 - A : A, F = H.OuterRectAt(l, y), u = H.ColorAt(y), w = S.Shared(u);
      if (y <= 0.5) {
        let P = new Me(u, 2);
        this.DrawBox(n, F, w, P, !1);
      } else {
        this.DrawBox(n, F, w, null, !0);
        let P = S.Shared(o, CanvasKit.PaintStyle.Stroke, H._kStrokeWidth), C = (y - 0.5) * 2;
        this._previousValue == null || this._value.Value == null ? H.DrawDash(n, l, C, P) : H.DrawCheck(n, l, C, P);
      }
    } else {
      let y = H.OuterRectAt(l, 1), F = S.Shared(H.ColorAt(1));
      this.DrawBox(n, y, F, null, !0);
      let u = S.Shared(o, CanvasKit.PaintStyle.Stroke, H._kStrokeWidth);
      if (A <= 0.5) {
        let w = 1 - A * 2;
        this._previousValue && this._previousValue ? H.DrawCheck(n, l, w, u) : H.DrawDash(n, l, w, u);
      } else {
        let w = (A - 0.5) * 2;
        this._value.Value != null && this._value.Value ? H.DrawCheck(n, l, w, u) : H.DrawDash(n, l, w, u);
      }
    }
  }
  DrawBox(n, r, l, o, h) {
    h && n.drawPath(this._shape.GetOuterPath(r), l), o != null && this._shape.CopyWith(o).Paint(n, r);
  }
  static DrawCheck(n, r, l, o) {
    console.assert(l >= 0 && l <= 1);
    let h = new k(H._kEdgeSize * 0.15, H._kEdgeSize * 0.45), A = new k(H._kEdgeSize * 0.4, H._kEdgeSize * 0.7), y = new k(H._kEdgeSize * 0.85, H._kEdgeSize * 0.25);
    if (l < 0.5) {
      let F = l * 2, u = k.Lerp(h, A, F);
      n.drawLine(
        r.Dx + h.Dx,
        r.Dy + h.Dy,
        r.Dx + u.Dx,
        r.Dy + u.Dy,
        o
      );
    } else {
      let F = (l - 0.5) * 2, u = k.Lerp(A, y, F);
      n.drawLine(r.Dx + h.Dx, r.Dy + h.Dy, r.Dx + A.Dx + 0.8, r.Dy + A.Dy + 0.8, o), n.drawLine(r.Dx + A.Dx, r.Dy + A.Dy, r.Dx + u.Dx, r.Dy + u.Dy, o);
    }
  }
  static DrawDash(n, r, l, o) {
    console.assert(l >= 0 && l <= 1);
    let h = new k(H._kEdgeSize * 0.2, H._kEdgeSize * 0.5), A = new k(H._kEdgeSize * 0.5, H._kEdgeSize * 0.5), y = new k(H._kEdgeSize * 0.8, H._kEdgeSize * 0.5), F = k.Lerp(h, A, 1 - l), u = k.Lerp(A, y, l);
    n.drawLine(
      r.Dx + F.Dx,
      r.Dy + F.Dy,
      r.Dx + u.Dx,
      r.Dy + u.Dy,
      o
    );
  }
  static OuterRectAt(n, r) {
    let l = 1 - Math.abs(r - 0.5) * 2, o = H._kEdgeSize - l * H._kStrokeWidth;
    return f.FromLTWH(n.Dx + l, n.Dy + l, o, o);
  }
  static ColorAt(n) {
    let r = x.AccentColor, l = new T(1375731712);
    return n >= 0.25 ? r : T.Lerp(l, r, n * 4);
  }
};
let Ee = H;
m(Ee, "_notSetState", p.op_Implicit_From(!1)), m(Ee, "_kCheckboxSize", 30), m(Ee, "_kEdgeSize", 18), m(Ee, "_kStrokeWidth", 2);
const bt = class extends Gn {
  constructor(a) {
    super(), this.InitState(
      ae.Make1(
        a,
        (n) => n,
        (n) => a.Value = n != null ? n : !1
      ),
      !1
    );
  }
  Layout(a, n) {
    let r = this.CacheAndCheckAssignWidth(a), l = this.CacheAndCheckAssignHeight(n);
    this.SetSize(Math.min(r, bt._kRadioSize), Math.min(l, bt._kRadioSize));
  }
  Paint(a, n = null) {
    let r = new k(this.W / 2, this.H / 2), l = x.AccentColor, o = new T(1375731712), h = T.Lerp(o, l, this._positionController.Value), A = S.Shared(h, CanvasKit.PaintStyle.Stroke, 2);
    A.setAntiAlias(!0), a.drawCircle(r.Dx, r.Dy, bt._kOuterRadius, A), this._positionController.IsDismissed || (A.setStyle(CanvasKit.PaintStyle.Fill), a.drawCircle(
      r.Dx,
      r.Dy,
      bt._kInnerRadius * this._positionController.Value,
      A
    ));
  }
};
let It = bt;
m(It, "_kRadioSize", 30), m(It, "_kOuterRadius", 8), m(It, "_kInnerRadius", 4.5);
var xs;
class Aa extends O {
  constructor(n) {
    super();
    m(this, "_children");
    b(this, xs, void 0);
    this.Window = n, this.IsMounted = !0, this._children = new Ea(this);
  }
  get Window() {
    return d(this, xs);
  }
  set Window(n) {
    N(this, xs, n);
  }
  get HasEntry() {
    return this._children.length > 0;
  }
  FindEntry(n) {
    return this._children.FirstOrDefault((r) => n(r));
  }
  Show(n) {
    this._children.Contains(n) || (this._children.Add(n), n.Layout(this.Window.Width, this.Window.Height), this.Invalidate(c.Repaint));
  }
  Remove(n) {
    !this._children.Remove(n) || this.Invalidate(c.Repaint);
  }
  HitTest(n, r, l) {
    for (let o = this._children.length - 1; o >= 0 && !this.HitTestChild(this._children[o], n, r, l); o--)
      ;
    return l.IsHitAnyMouseRegion;
  }
  Layout(n, r) {
  }
  Paint(n, r = null) {
    for (const l of this._children) {
      let o = l.X != 0 || l.Y != 0;
      o && n.translate(l.X, l.Y), l.Paint(n, r), o && n.translate(-l.X, -l.Y);
    }
  }
}
xs = new WeakMap(), m(Aa, "$meta_PixUI_IRootWidget", !0);
class Br {
  constructor(a, n, r) {
    m(this, "_widget");
    m(this, "ColorBuilder");
    m(this, "BoundsBuilder");
    m(this, "_decorator");
    this._widget = a, this.ColorBuilder = n, this.BoundsBuilder = r;
  }
  Show() {
    var a;
    this._decorator = new vr(this), (a = this._widget.Overlay) == null || a.Show(this._decorator);
  }
  Hide() {
    this._decorator != null && (this._decorator.Parent.Remove(this._decorator), this._decorator = null);
  }
  NotifyPositionChanged() {
    var a;
    (a = this._decorator) == null || a.Invalidate(c.Repaint);
  }
}
class vr extends O {
  constructor(n) {
    super();
    m(this, "_owner");
    this._owner = n;
  }
  Layout(n, r) {
  }
  Paint(n, r = null) {
    let l = S.Shared(this._owner.ColorBuilder(), CanvasKit.PaintStyle.Fill), o = this._owner.BoundsBuilder();
    n.drawRect(
      f.FromLTWH(o.Left, o.Top, o.Width, o.Height),
      l
    );
  }
  OnMounted() {
  }
  OnUnmounted() {
  }
}
class Vr {
  constructor(a, n, r = null) {
    m(this, "Widget");
    m(this, "_focusedBorderBuilder");
    m(this, "_unfocusedBorderBuilder");
    m(this, "_decorator");
    this.Widget = a, this._focusedBorderBuilder = n, this._unfocusedBorderBuilder = r;
  }
  AttachFocusChangedEvent(a) {
    Ft(a) && a.FocusNode.FocusChanged.Add(this._OnFocusChanged, this);
  }
  _OnFocusChanged(a) {
    var n, r;
    a ? (this._decorator = new Er(this), (n = this.Widget.Overlay) == null || n.Show(this._decorator)) : (r = this._decorator) == null || r.Hide();
  }
  GetUnfocusedBorder() {
    var a;
    return (a = this._unfocusedBorderBuilder) == null ? void 0 : a.call(this);
  }
  GetFocusedBorder() {
    return this._focusedBorderBuilder();
  }
  StopAndReset() {
    var a;
    (a = this._decorator) == null || a.Reset();
  }
  RemoveOverlayEntry() {
    this._decorator != null && (this._decorator.Parent.Remove(this._decorator), this._decorator = null);
  }
}
class Er extends O {
  constructor(n) {
    super();
    m(this, "_owner");
    m(this, "_from");
    m(this, "_to");
    m(this, "_tween");
    m(this, "_controller");
    this._owner = n, this._from = n.GetUnfocusedBorder(), this._to = n.GetFocusedBorder(), this._from != null && (this._tween = this._from.Clone());
  }
  Hide() {
    var n;
    if (this._from == null) {
      this._owner.RemoveOverlayEntry();
      return;
    }
    (n = this._controller) == null || n.Reverse();
  }
  Reset() {
    var n;
    (n = this._controller) == null || n.Reset();
  }
  HitTest(n, r, l) {
    return !1;
  }
  Layout(n, r) {
  }
  Paint(n, r = null) {
    let l = this._owner.Widget, o = l.LocalToWindow(0, 0), h = f.FromLTWH(o.X, o.Y, l.W, l.H);
    if (this._from == null) {
      this._to.Paint(n, h);
      return;
    }
    this._tween.Paint(n, h);
  }
  OnMounted() {
    this._from != null && (this._controller == null && (this._controller = new ot(200), this._controller.ValueChanged.Add(this.OnAnimationValueChanged, this), this._controller.StatusChanged.Add(this.OnAnimationStateChanged, this)), this._controller.Forward());
  }
  OnAnimationValueChanged() {
    this._from.LerpTo(this._to, this._tween, this._controller.Value), this.Invalidate(c.Repaint);
  }
  OnAnimationStateChanged(n) {
    n == I.Dismissed && this._owner.RemoveOverlayEntry();
  }
  Dispose() {
    this._controller != null && (this._controller.ValueChanged.Remove(this.OnAnimationValueChanged, this), this._controller.StatusChanged.Remove(this.OnAnimationStateChanged, this), this._controller.Dispose()), super.Dispose();
  }
}
class Gr {
  constructor(a, n, r = null, l = 4, o = null) {
    m(this, "Widget");
    m(this, "ShapeBuilder");
    m(this, "BoundsGetter");
    m(this, "Elevation");
    m(this, "HoverColor");
    m(this, "_decorator");
    this.Widget = a, this.ShapeBuilder = n, this.BoundsGetter = r, this.Elevation = l, this.HoverColor = o;
  }
  Show() {
    var a;
    this._decorator = new zr(this), (a = this.Widget.Overlay) == null || a.Show(this._decorator);
  }
  Hide() {
    this._decorator != null && (this._decorator.Parent.Remove(this._decorator), this._decorator = null);
  }
  AttachHoverChangedEvent(a) {
    a.MouseRegion.HoverChanged.Add(this._OnHoverChanged, this);
  }
  _OnHoverChanged(a) {
    a ? this.Show() : this.Hide();
  }
}
class zr extends O {
  constructor(n) {
    super();
    m(this, "_owner");
    m(this, "_shape");
    this._owner = n, this._shape = n.ShapeBuilder();
  }
  HitTest(n, r, l) {
    return !1;
  }
  Layout(n, r) {
  }
  Paint(n, r = null) {
    let l = f.Empty.Clone();
    if (this._owner.BoundsGetter == null) {
      let h = this._owner.Widget, A = h.LocalToWindow(0, 0);
      l = f.FromLTWH(A.X, A.Y, h.W, h.H);
    } else
      l = this._owner.BoundsGetter();
    let o = this._shape.GetOuterPath(l);
    if (this._owner.Elevation > 0 && (n.save(), n.clipPath(o, CanvasKit.ClipOp.Difference, !1), vn(n, o, D.Black, this._owner.Elevation, !1, this.Root.Window.ScaleFactor), n.restore()), this._owner.HoverColor != null) {
      n.save(), n.clipPath(o, CanvasKit.ClipOp.Intersect, !1);
      let h = S.Shared(this._owner.HoverColor);
      n.drawPath(o, h), n.restore();
    }
    o.delete();
  }
}
class xe extends O {
  constructor(n) {
    super();
    m(this, "Owner");
    m(this, "FocusManager", new Rn());
    m(this, "_transition");
    m(this, "_proxy");
    this.Owner = n;
  }
  get IsDialog() {
    return !1;
  }
  get AnimationController() {
    var n;
    return (n = this._transition) == null ? void 0 : n.AnimationController;
  }
  UpdatePosition(n, r) {
    this.SetPosition(n, r), this.Invalidate(c.Repaint);
  }
  Show(n = null, r = null, l = null) {
    var F, u, w;
    let o = this, h = null, A = 0, y = 0;
    if (n != null) {
      let P = n.LocalToWindow(0, 0), C = (F = r == null ? void 0 : r.Dx) != null ? F : 0, R = (u = r == null ? void 0 : r.Dy) != null ? u : 0;
      this._proxy = new Wa(this), o = this._proxy;
      let L = this.H;
      P.Y + n.H + R + L > this.Owner.Window.Height ? (A = P.X + C, y = P.Y - R - L, h = new k(0, L)) : (A = P.X + C, y = P.Y + n.H + R);
    }
    l != null && ((w = this._proxy) != null || (this._proxy = new Wa(this)), this._transition = new Ur(this.Owner, this.IsDialog, this._proxy, h, l), this._transition.Forward(), o = this._transition), n != null ? o.SetPosition(A, y) : this.IsDialog && o.SetPosition((this.Owner.Window.Width - this.W) / 2, (this.Owner.Window.Height - this.H) / 2), this.Owner.Window.EventHookManager.Add(this), this.Owner.Window.FocusManagerStack.Push(this.FocusManager), this.Owner.Show(o);
  }
  Hide() {
    this.Owner.Window.EventHookManager.Remove(this), this.Owner.Window.FocusManagerStack.Remove(this.FocusManager), this._transition != null ? this._transition.Reverse() : this._proxy != null ? (this.Owner.Remove(this._proxy), this._proxy = null) : this.Owner.Remove(this);
  }
  PreviewEvent(n, r) {
    return U.NotProcessed;
  }
}
m(xe, "DefaultTransitionBuilder", (n, r, l) => new Yr(n, l).Init(
  {
    Child: r
  }
)), m(xe, "DialogTransitionBuilder", (n, r, l) => {
  let o = new Qa(n, J.EaseInOutCubic), h = new qa(new k(0, -0.1), new k(0, 0)).Animate(o);
  return new er(h).Init(
    {
      Child: r
    }
  );
});
class Ur extends K {
  constructor(n, r, l, o, h) {
    super();
    m(this, "AnimationController");
    m(this, "_overlay");
    m(this, "_isDialog");
    this._overlay = n, this._isDialog = r, this.AnimationController = new ot(100), this.AnimationController.StatusChanged.Add(this.OnAnimationStateChanged, this), this.Child = h(this.AnimationController, l, o);
  }
  Forward() {
    this.AnimationController.Forward();
  }
  Reverse() {
    this.AnimationController.Reverse();
  }
  OnAnimationStateChanged(n) {
    n == I.Completed ? this._overlay.Window.RunNewHitTest() : n == I.Dismissed && (this._overlay.Remove(this), this._overlay.Window.RunNewHitTest());
  }
  HitTest(n, r, l) {
    return this._isDialog ? (l.Add(this), this.HitTestChild(this.Child, n, r, l), !0) : super.HitTest(n, r, l);
  }
  Dispose() {
    this.AnimationController.Dispose(), super.Dispose();
  }
}
class Wa extends O {
  constructor(n) {
    super();
    m(this, "_popup");
    n.Layout(n.Owner.Window.Width, n.Owner.Window.Height), this._popup = n, this._popup.Parent = this;
  }
  VisitChildren(n) {
    n(this._popup);
  }
  ContainsPoint(n, r) {
    return this._popup.ContainsPoint(n, r);
  }
  HitTest(n, r, l) {
    return this._popup.HitTest(n, r, l);
  }
  Layout(n, r) {
    this.SetSize(this._popup.W, this._popup.H);
  }
  OnUnmounted() {
    this._popup.Parent = null, super.OnUnmounted();
  }
}
class Yr extends Tt {
  constructor(n, r = null) {
    super(j.CreateScale(1, n.Value, 1), r);
    m(this, "_animation");
    this._animation = n, this._animation.ValueChanged.Add(this.OnAnimationValueChanged, this);
  }
  OnAnimationValueChanged() {
    this.SetTransform(j.CreateScale(1, this._animation.Value, 1));
  }
}
const On = class {
  constructor(a, n) {
    m(this, "HoverState");
    m(this, "SelectedState");
    this.HoverState = a, this.SelectedState = n;
  }
  Clone() {
    return new On(this.HoverState, this.SelectedState);
  }
};
let Ot = On;
m(Ot, "Empty", new On(p.op_Implicit_From(!1), p.op_Implicit_From(!1)));
var Bs;
class _a extends K {
  constructor(n, r, l, o) {
    super();
    m(this, "_hoverState");
    m(this, "_selectedState");
    b(this, Bs, void 0);
    this._hoverState = this.Bind(r), this._selectedState = l, this.MouseRegion = new We(() => Le.Hand), this.MouseRegion.HoverChanged.Add((h) => r.Value = h), this.MouseRegion.PointerTap.Add((h) => o(n));
  }
  get MouseRegion() {
    return d(this, Bs);
  }
  set MouseRegion(n) {
    N(this, Bs, n);
  }
  Layout(n, r) {
    var h;
    let l = this.Width.Value, o = this.Height.Value;
    (h = this.Child) == null || h.Layout(l, o), this.SetSize(l, o);
  }
  Paint(n, r = null) {
    this._selectedState.Value ? n.drawRect(f.FromLTWH(0, 0, this.W, this.H), S.Shared(x.FocusedColor)) : this._hoverState.Value && n.drawRect(f.FromLTWH(0, 0, this.W, this.H), S.Shared(x.AccentColor)), super.Paint(n, r);
  }
}
Bs = new WeakMap(), m(_a, "$meta_PixUI_IMouseRegion", !0);
class Xr extends xe {
  constructor(n, r, l, o, h = 5) {
    super(n);
    m(this, "_listViewController");
    m(this, "_itemBuilder");
    m(this, "_child");
    m(this, "_maxShowItems");
    m(this, "_itemExtent");
    m(this, "_itemStates");
    m(this, "_selectedIndex", -1);
    m(this, "_fullDataSource");
    m(this, "OnSelectionChanged");
    this._itemExtent = o, this._maxShowItems = h, this._itemBuilder = r, this._listViewController = new Ka(), this._child = new qe().Init(
      {
        Width: p.op_Implicit_From(l),
        Elevation: p.op_Implicit_From(8),
        Child: new Nn(this.BuildItem.bind(this), null, this._listViewController)
      }
    ), this._child.Parent = this;
  }
  get DataSource() {
    return this._listViewController.DataSource;
  }
  set DataSource(n) {
    this._fullDataSource = n, this.ChangeDataSource(n);
  }
  ChangeDataSource(n) {
    if (n != null) {
      this._itemStates = new Array(n.length).fill(Ot.Empty.Clone());
      for (let r = 0; r < n.length; r++)
        this._itemStates[r] = new Ot(p.op_Implicit_From(!1), p.op_Implicit_From(!1));
    }
    this._selectedIndex = -1, this._listViewController.DataSource = n;
  }
  BuildItem(n, r) {
    let l = this._itemStates[r];
    return new _a(
      r,
      l.HoverState,
      l.SelectedState,
      this.OnSelectByTap.bind(this)
    ).Init(
      {
        Width: this._child.Width,
        Height: p.op_Implicit_From(this._itemExtent),
        Child: this._itemBuilder(n, r, l.HoverState, l.SelectedState)
      }
    );
  }
  TrySelectFirst() {
    this._listViewController.DataSource != null && this._listViewController.DataSource.length > 0 && (this.Select(0, !1), this._listViewController.ScrollController.OffsetY = 0);
  }
  InitSelect(n) {
    let r = this._listViewController.DataSource.IndexOf(n);
    r < 0 || (this._selectedIndex = r, this._itemStates[this._selectedIndex].SelectedState.Value = !0);
  }
  Select(n, r = !1) {
    var l;
    this._selectedIndex != n && (this._selectedIndex >= 0 && (this._itemStates[this._selectedIndex].SelectedState.Value = !1), this._selectedIndex = n, this._selectedIndex >= 0 && (this._itemStates[this._selectedIndex].SelectedState.Value = !0), r && ((l = this.OnSelectionChanged) == null || l.call(this, this.DataSource[n])), this.Invalidate(c.Repaint));
  }
  UpdateFilter(n) {
    var r;
    this.Invalidate(c.Relayout), this.ChangeDataSource((r = this._fullDataSource) == null ? void 0 : r.Where((l) => n(l)).ToList());
  }
  ClearFilter() {
    this.Invalidate(c.Relayout), this.ChangeDataSource(this._fullDataSource);
  }
  OnSelectByTap(n) {
    this.Select(n, !0), this.Hide();
  }
  OnKeysUp() {
    this._selectedIndex <= 0 || (this.Select(this._selectedIndex - 1, !1), this._listViewController.ScrollTo(this._selectedIndex));
  }
  OnKeysDown() {
    this._selectedIndex != this.DataSource.length - 1 && (this.Select(this._selectedIndex + 1, !1), this._listViewController.ScrollTo(this._selectedIndex));
  }
  OnKeysReturn() {
    var n;
    this._selectedIndex >= 0 && ((n = this.OnSelectionChanged) == null || n.call(this, this.DataSource[this._selectedIndex]), this.Hide());
  }
  VisitChildren(n) {
    n(this._child);
  }
  Layout(n, r) {
    if (this.DataSource == null)
      return;
    let l = Math.min(this._itemExtent * this._maxShowItems, this.DataSource.length * this._itemExtent), o = this._child.Margin == null ? qe.DefaultMargin * 2 : this._child.Margin.Value.Top + this._child.Margin.Value.Bottom;
    this._child.Layout(this._child.Width.Value, l + o), this.SetSize(this._child.W, this._child.H);
  }
  PreviewEvent(n, r) {
    if (n == $t.KeyDown) {
      let l = r;
      if (l.KeyCode == B.Up)
        return this.OnKeysUp(), U.NoDispatch;
      if (l.KeyCode == B.Down)
        return this.OnKeysDown(), U.NoDispatch;
      if (l.KeyCode == B.Return)
        return this.OnKeysReturn(), U.NoDispatch;
    }
    return super.PreviewEvent(n, r);
  }
}
class ul extends xe {
  constructor(n = null) {
    super(n != null ? n : it.Current.Overlay);
    m(this, "_child");
    m(this, "Title", p.op_Implicit_From(""));
    m(this, "_closeDone");
  }
  get IsDialog() {
    return !0;
  }
  TryBuildChild() {
    this._child == null && (this._child = new qe().Init(
      {
        Elevation: p.op_Implicit_From(20),
        Child: new Jn().Init(
          {
            Children: [
              this.BuildTitle(),
              new $e(this.BuildBody()),
              this.BuildFooter()
            ]
          }
        )
      }
    ), this._child.Parent = this);
  }
  BuildTitle() {
    return new Ct().Init(
      {
        Height: p.op_Implicit_From(25),
        Children: [
          new jn().Init({ Width: p.op_Implicit_From(35) }),
          new $e().Init(
            {
              Child: new Wr().Init({ Child: new at(this.Title) })
            }
          ),
          new Q(null, p.op_Implicit_From(ye.Filled.Close)).Init(
            {
              Style: Te.Transparent,
              OnTap: (n) => this.Close(!0)
            }
          )
        ]
      }
    );
  }
  BuildFooter() {
    return new jn().Init(
      {
        Height: p.op_Implicit_From(Q.DefaultHeight + 20 + 20),
        Padding: p.op_Implicit_From(Z.All(20)),
        Child: new Ct(Ae.Middle, 20).Init(
          {
            Children: [
              new $e(),
              new Q(p.op_Implicit_From("Cancel")).Init({
                Width: p.op_Implicit_From(80),
                OnTap: (n) => this.Close(!0)
              }),
              new Q(p.op_Implicit_From("OK")).Init({
                Width: p.op_Implicit_From(80),
                OnTap: (n) => this.Close(!1)
              })
            ]
          }
        )
      }
    );
  }
  Show() {
    super.Show(null, null, xe.DialogTransitionBuilder);
  }
  ShowAndWaitClose() {
    return this.Show(), this._closeDone = new g.TaskCompletionSource(), this._closeDone.Task;
  }
  OnClosing(n) {
    return !1;
  }
  Close(n) {
    var r;
    this.OnClosing(n) || (this.Hide(), (r = this._closeDone) == null || r.SetResult(n));
  }
  OnMounted() {
    this.TryBuildChild(), super.OnMounted();
  }
  VisitChildren(n) {
    n(this._child);
  }
  ContainsPoint(n, r) {
    return !0;
  }
  HitTest(n, r, l) {
    return l.Add(this), this.HitTestChild(this._child, n, r, l), !0;
  }
  Layout(n, r) {
    var l, o, h, A;
    this.TryBuildChild(), this._child.Layout((o = (l = this.Width) == null ? void 0 : l.Value) != null ? o : n, (A = (h = this.Height) == null ? void 0 : h.Value) != null ? A : r), this.SetSize(this._child.W, this._child.H);
  }
}
class qr extends K {
  constructor(n, r) {
    super();
    m(this, "_controller", new ot(100));
    this._controller.ValueChanged.Add(this.OnAnimationValueChanged, this), this._controller.StatusChanged.Add(this.OnAnimationStateChanged, this), this.Child = new qe().Init(
      {
        Width: p.op_Implicit_From(280),
        Child: new Ct(Ae.Middle, 5).Init(
          {
            Children: [
              n,
              new $e().Init({ Child: r }),
              new Q(null, p.op_Implicit_From(ye.Filled.Close)).Init(
                {
                  Style: Te.Transparent,
                  Shape: ie.Pills,
                  OnTap: (l) => this._controller.Reverse()
                }
              )
            ]
          }
        )
      }
    );
  }
  OnAnimationValueChanged() {
    let n = this.Overlay.Window.Width - this.W * this._controller.Value;
    this.SetPosition(n, this.Y), this.Invalidate(c.Repaint);
  }
  OnAnimationStateChanged(n) {
    n == I.Completed ? this.StartHide() : n == I.Dismissed && this.Parent.RemoveEntry(this);
  }
  async StartHide() {
    await new Promise((n) => setTimeout(() => n(), 3e3)), this._controller.Reverse();
  }
  StartShow() {
    this._controller.Forward();
  }
  Dispose() {
    this._controller.Dispose(), super.Dispose();
  }
}
const ke = class extends xe {
  constructor(n) {
    super(n);
    m(this, "_children", new g.List());
  }
  RemoveEntry(n) {
    let r = this._children.IndexOf(n), l = n.H;
    for (let o = r + 1; o < this._children.length; o++)
      this._children[o].SetPosition(this._children[o].X, this._children[o].Y - l);
    this._children.RemoveAt(r), this.Invalidate(c.Repaint);
  }
  VisitChildren(n) {
    for (const r of this._children)
      if (n(r))
        break;
  }
  HitTest(n, r, l) {
    for (const o of this._children)
      if (this.HitTestChild(o, n, r, l))
        return !0;
    return !1;
  }
  Layout(n, r) {
  }
  Paint(n, r = null) {
    for (const l of this._children)
      n.translate(l.X, l.Y), l.Paint(n, r), n.translate(-l.X, -l.Y);
  }
  static Show(n, r) {
    let l = it.Current, o = l.Overlay.FindEntry((u) => u instanceof ke), h = o == null ? new ke(l.Overlay) : o;
    o == null && h.Show();
    let A = new qr(n, r);
    A.Parent = h, A.Layout(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    let y = h._children.length, F = y == 0 ? ke._firstOffset : h._children[y - 1].Y + h._children[y - 1].H + ke._sepSpace;
    A.SetPosition(l.Width, F), h._children.Add(A), A.StartShow();
  }
  static Info(n) {
    let r = p.op_Implicit_From(D.Gray);
    ke.Show(
      new lt(p.op_Implicit_From(ye.Filled.Info)).Init({
        Size: p.op_Implicit_From(18),
        Color: r
      }),
      new at(p.op_Implicit_From(n)).Init({ TextColor: r, MaxLines: 5 })
    );
  }
  static Success(n) {
    let r = p.op_Implicit_From(D.Green);
    ke.Show(
      new lt(p.op_Implicit_From(ye.Filled.Error)).Init({
        Size: p.op_Implicit_From(18),
        Color: r
      }),
      new at(p.op_Implicit_From(n)).Init({ TextColor: r, MaxLines: 5 })
    );
  }
  static Error(n) {
    let r = p.op_Implicit_From(D.Red);
    ke.Show(
      new lt(p.op_Implicit_From(ye.Filled.Error)).Init({
        Size: p.op_Implicit_From(18),
        Color: r
      }),
      new at(p.op_Implicit_From(n)).Init({ TextColor: r, MaxLines: 5 })
    );
  }
};
let Pn = ke;
m(Pn, "_firstOffset", 10), m(Pn, "_sepSpace", 2);
class Kn extends O {
  constructor() {
    super();
    m(this, "_target");
  }
  static Show(n) {
    if (!n.IsMounted)
      return null;
    let r = n.Overlay, l = r.FindEntry((o) => o instanceof Kn);
    if (l == null) {
      let o = new Kn();
      return o._target = n, r.Show(o), o;
    } else {
      let o = l;
      return o._target = n, o.Invalidate(c.Repaint), o;
    }
  }
  Remove() {
    this.Parent.Remove(this);
  }
  HitTest(n, r, l) {
    return !1;
  }
  Layout(n, r) {
  }
  Paint(n, r = null) {
    let l = new g.List(), o = this._target;
    for (; o.Parent != null; )
      l.Add(o.Parent), o = o.Parent;
    n.save();
    for (let F = l.length - 1; F >= 0; F--)
      if (o = l[F], n.translate(o.X, o.Y), je(o)) {
        const u = o;
        n.translate(-u.ScrollOffsetX, -u.ScrollOffsetY);
      } else if (o instanceof Tt) {
        const u = o;
        n.concat(u.EffectiveTransform.TransponseTo());
      }
    let h = f.FromLTWH(
      this._target.X + 0.5,
      this._target.Y + 0.5,
      this._target.W - 1,
      this._target.H - 1
    ), A = new T(2155839166), y = new T(2159918588);
    n.drawRect(h, S.Shared(y)), n.drawRect(h, S.Shared(A, CanvasKit.PaintStyle.Stroke)), n.restore();
  }
}
class gl extends K {
  constructor(n) {
    super();
    m(this, "_opacity");
    this._opacity = n;
  }
  Paint(n, r = null) {
    if (this._opacity.Value == 0 || this.Child == null)
      return;
    let l = Math.floor(255 * this._opacity.Value) & 255, o = S.Shared(new T(0, 0, 0, l)), h = f.FromLTWH(this.Child.X, this.Child.Y, this.Child.W, this.Child.H);
    n.saveLayer(o, h), this.PaintChildren(n, r), n.restore();
  }
}
class Qr extends Tt {
  constructor(n) {
    super(j.CreateIdentity());
    m(this, "_turns");
    this._turns = n, this._turns.ValueChanged.Add(this.OnTurnChanged, this);
  }
  Layout(n, r) {
    super.Layout(n, r);
    let l = 0, o = 0;
    this.Child != null && (l = this.Child.W / 2, o = this.Child.H / 2), this.InitTransformAndOrigin(this.CalcTransform(), new k(l, o));
  }
  CalcTransform() {
    let n = j.CreateIdentity();
    return n.RotateZ(this._turns.Value * Math.PI * 2), n;
  }
  OnTurnChanged() {
    this.SetTransform(this.CalcTransform());
  }
  Dispose() {
    this._turns.ValueChanged.Remove(this.OnTurnChanged, this), super.Dispose();
  }
}
class er extends Tt {
  constructor(n) {
    super(j.CreateIdentity());
    m(this, "_position");
    m(this, "_offsetX", 0);
    m(this, "_offsetY", 0);
    this._position = n, this._position.ValueChanged.Add(this.OnPositionChanged, this);
  }
  Layout(n, r) {
    super.Layout(n, r), this.CalcOffset(), this.InitTransformAndOrigin(j.CreateTranslation(this._offsetX, this._offsetY, 0));
  }
  CalcOffset() {
    this.Child != null && (this._offsetX = this._position.Value.Dx * this.Child.W, this._offsetY = this._position.Value.Dy * this.Child.H);
  }
  OnPositionChanged() {
    this.CalcOffset(), this.SetTransform(j.CreateTranslation(this._offsetX, this._offsetY, 0));
  }
  Dispose() {
    this._position.ValueChanged.Remove(this.OnPositionChanged, this), super.Dispose();
  }
}
var $r = /* @__PURE__ */ ((i) => (i[i.Left = 0] = "Left", i[i.Top = 1] = "Top", i))($r || {}), Te = /* @__PURE__ */ ((i) => (i[i.Solid = 0] = "Solid", i[i.Outline = 1] = "Outline", i[i.Transparent = 2] = "Transparent", i))(Te || {}), ie = /* @__PURE__ */ ((i) => (i[i.Standard = 0] = "Standard", i[i.Pills = 1] = "Pills", i[i.Square = 2] = "Square", i))(ie || {}), vs, Vs;
const _e = class extends O {
  constructor(n = null, r = null) {
    super();
    m(this, "_text");
    m(this, "_icon");
    m(this, "_outlineWidth");
    m(this, "_textColor");
    m(this, "_fontSize");
    m(this, "Style", Te.Solid);
    m(this, "Shape", ie.Standard);
    m(this, "_textWidget");
    m(this, "_iconWidget");
    m(this, "_hoverDecoration");
    b(this, vs, void 0);
    b(this, Vs, void 0);
    this._text = n, this._icon = r, this.Height = p.op_Implicit_From(_e.DefaultHeight), this.MouseRegion = new We(() => Le.Hand), this.FocusNode = new sa(), this._hoverDecoration = new Gr(this, this.GetHoverShaper.bind(this), this.GetHoverBounds.bind(this)), this._hoverDecoration.AttachHoverChangedEvent(this);
  }
  get TextColor() {
    return this._textColor;
  }
  set TextColor(n) {
    this._textColor = n, this._textWidget != null && (this._textWidget.TextColor = n), this._iconWidget != null && (this._iconWidget.Color = n);
  }
  get FontSize() {
    return this._fontSize;
  }
  set FontSize(n) {
    this._fontSize = n, this._textWidget != null && (this._textWidget.FontSize = n), this._iconWidget != null && (this._iconWidget.Size = n);
  }
  get MouseRegion() {
    return d(this, vs);
  }
  set MouseRegion(n) {
    N(this, vs, n);
  }
  get FocusNode() {
    return d(this, Vs);
  }
  set FocusNode(n) {
    N(this, Vs, n);
  }
  set OnTap(n) {
    this.MouseRegion.PointerTap.Add(n, this);
  }
  GetHoverShaper() {
    switch (this.Shape) {
      case ie.Square:
        return new nt();
      case ie.Standard:
        return new nt(null, re.All(G.Circular(_e.StandardRadius)));
      case ie.Pills:
        return new nt(null, re.All(G.Circular(this.H / 2)));
      default:
        throw new g.NotImplementedException();
    }
  }
  GetHoverBounds() {
    if (this._iconWidget != null && this._textWidget == null && this.Style == Te.Transparent) {
      let n = this._iconWidget.LocalToWindow(0, 0);
      return f.FromLTWH(n.X, n.Y, this._iconWidget.W, this._iconWidget.H);
    } else {
      let n = this.LocalToWindow(0, 0);
      return f.FromLTWH(n.X, n.Y, this.W, this.H);
    }
  }
  Layout(n, r) {
    var y, F, u, w, P, C, R, L, v, V, z, _;
    let l = this.CacheAndCheckAssignWidth(n), o = this.CacheAndCheckAssignHeight(r);
    this.TryBuildContent(), (y = this._iconWidget) == null || y.Layout(l, o), (w = this._textWidget) == null || w.Layout(l - ((u = (F = this._iconWidget) == null ? void 0 : F.W) != null ? u : 0), o);
    let h = ((C = (P = this._iconWidget) == null ? void 0 : P.W) != null ? C : 0) + ((L = (R = this._textWidget) == null ? void 0 : R.W) != null ? L : 0);
    this.Width == null ? this.SetSize(Math.max(_e.DefaultHeight, h + 16), o) : this.SetSize(l, o);
    let A = (this.W - h) / 2;
    (v = this._iconWidget) == null || v.SetPosition(A, (this.H - this._iconWidget.H) / 2), (_ = this._textWidget) == null || _.SetPosition(
      A + ((z = (V = this._iconWidget) == null ? void 0 : V.W) != null ? z : 0),
      (this.H - this._textWidget.H) / 2
    );
  }
  TryBuildContent() {
    this._text == null && this._icon == null || (this._textColor == null && (this._textColor = p.op_Implicit_From(this.Style == Te.Solid ? D.White : D.Black)), this._text != null && this._textWidget == null && (this._textWidget = new at(this._text).Init({ TextColor: this._textColor, FontSize: this._fontSize }), this._textWidget.Parent = this), this._icon != null && this._iconWidget == null && (this._iconWidget = new lt(this._icon).Init({ Color: this._textColor, Size: this._fontSize }), this._iconWidget.Parent = this));
  }
  Paint(n, r = null) {
    this.PaintShape(n), this._iconWidget != null && (n.translate(this._iconWidget.X, this._iconWidget.Y), this._iconWidget.Paint(n, r), n.translate(-this._iconWidget.X, -this._iconWidget.Y)), this._textWidget != null && (n.translate(this._textWidget.X, this._textWidget.Y), this._textWidget.Paint(n, r), n.translate(-this._textWidget.X, -this._textWidget.Y));
  }
  PaintShape(n) {
    var l, o;
    if (this.Style == Te.Transparent)
      return;
    let r = S.Shared();
    switch (r.setStyle(this.Style == Te.Solid ? CanvasKit.PaintStyle.Fill : CanvasKit.PaintStyle.Stroke), r.setStrokeWidth(this.Style == Te.Outline ? (o = (l = this._outlineWidth) == null ? void 0 : l.Value) != null ? o : 2 : 0), r.setAntiAlias(this.Shape != ie.Square), r.setColor(new T(4281893119)), this.Shape) {
      case ie.Square:
        n.drawRect(f.FromLTWH(0, 0, this.W, this.H), r);
        break;
      case ie.Standard: {
        let h = he.FromRectAndRadius(
          f.FromLTWH(0, 0, this.W, this.H),
          _e.StandardRadius,
          _e.StandardRadius
        );
        n.drawRRect(h, r);
        break;
      }
      default:
        throw new g.NotImplementedException();
    }
  }
  OnUnmounted() {
    super.OnUnmounted(), this._hoverDecoration.Hide();
  }
  Dispose() {
    var n, r;
    (n = this._textWidget) == null || n.Dispose(), (r = this._iconWidget) == null || r.Dispose(), super.Dispose();
  }
};
let Q = _e;
vs = new WeakMap(), Vs = new WeakMap(), m(Q, "$meta_PixUI_IMouseRegion", !0), m(Q, "$meta_PixUI_IFocusable", !0), m(Q, "DefaultHeight", 30), m(Q, "StandardRadius", 4);
var Es;
class ya extends K {
  constructor(n, r = null, l = null) {
    super();
    b(this, Es, void 0);
    this.MouseRegion = new We(), this.Child = new Qr(n).Init(
      {
        Child: new lt(p.op_Implicit_From(ye.Filled.ExpandMore)).Init({
          Size: r,
          Color: l
        })
      }
    );
  }
  get MouseRegion() {
    return d(this, Es);
  }
  set MouseRegion(n) {
    N(this, Es, n);
  }
  set OnPointerDown(n) {
    this.MouseRegion.PointerDown.Add(n, this);
  }
}
Es = new WeakMap(), m(ya, "$meta_PixUI_IMouseRegion", !0);
class wl extends yn {
  constructor() {
    super();
  }
  Layout(a, n) {
    let r = this.CacheAndCheckAssignWidth(a), l = this.CacheAndCheckAssignHeight(n), o = 0, h = p.op_Implicit_From(Math.min(l, Q.DefaultHeight));
    for (let A = 0; A < this._children.length; A++)
      this._children[A].Height = h, this._children[A].Shape = ie.Square, this._children[A].Layout(Math.max(0, r - o), h.Value), this._children[A].SetPosition(o, 0), o += this._children[A].W;
    this.SetSize(o, h.Value);
  }
  Paint(a, n = null) {
    let r = he.FromRectAndRadius(
      f.FromLTWH(0, 0, this.W, this.H),
      Q.StandardRadius,
      Q.StandardRadius
    ), l = new CanvasKit.Path();
    l.addRRect(r), a.save(), a.clipPath(l, CanvasKit.ClipOp.Intersect, !0), super.Paint(a, n);
    let o = S.Shared(D.White, CanvasKit.PaintStyle.Stroke, 1);
    for (let h = 1; h < this._children.length; h++) {
      let A = this._children[h].X - 0.5;
      a.drawLine(A, 0, A, this.H, o);
    }
    a.restore(), l.delete();
  }
}
class s {
  constructor(a, n, r, l) {
    m(this, "CodePoint");
    m(this, "FontFamily");
    m(this, "AssemblyName");
    m(this, "AssetPath");
    this.CodePoint = a, this.FontFamily = n, this.AssemblyName = r, this.AssetPath = l;
  }
  Clone() {
    return new s(this.CodePoint, this.FontFamily, this.AssemblyName, this.AssetPath);
  }
}
const e = class {
  get N10k() {
    return new s(59729, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N10mp() {
    return new s(59730, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N11mp() {
    return new s(59731, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N123() {
    return new s(60301, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N12mp() {
    return new s(59732, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N13mp() {
    return new s(59733, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N14mp() {
    return new s(59734, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N15mp() {
    return new s(59735, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N16mp() {
    return new s(59736, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N17mp() {
    return new s(59737, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N18mp() {
    return new s(59738, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N19mp() {
    return new s(59739, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N1k() {
    return new s(59740, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N1kPlus() {
    return new s(59741, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N1xMobiledata() {
    return new s(61389, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N20mp() {
    return new s(59742, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N21mp() {
    return new s(59743, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N22mp() {
    return new s(59744, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N23mp() {
    return new s(59745, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N24mp() {
    return new s(59746, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N2k() {
    return new s(59747, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N2kPlus() {
    return new s(59748, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N2mp() {
    return new s(59749, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N30fps() {
    return new s(61390, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N30fpsSelect() {
    return new s(61391, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N360() {
    return new s(58743, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N3dRotation() {
    return new s(59469, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N3gMobiledata() {
    return new s(61392, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N3k() {
    return new s(59750, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N3kPlus() {
    return new s(59751, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N3mp() {
    return new s(59752, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N3p() {
    return new s(61393, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N4gMobiledata() {
    return new s(61394, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N4gPlusMobiledata() {
    return new s(61395, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N4k() {
    return new s(57458, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N4kPlus() {
    return new s(59753, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N4mp() {
    return new s(59754, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N5g() {
    return new s(61240, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N5k() {
    return new s(59755, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N5kPlus() {
    return new s(59756, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N5mp() {
    return new s(59757, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N60fps() {
    return new s(61396, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N60fpsSelect() {
    return new s(61397, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N6FtApart() {
    return new s(61982, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N6k() {
    return new s(59758, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N6kPlus() {
    return new s(59759, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N6mp() {
    return new s(59760, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N7k() {
    return new s(59761, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N7kPlus() {
    return new s(59762, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N7mp() {
    return new s(59763, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N8k() {
    return new s(59764, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N8kPlus() {
    return new s(59765, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N8mp() {
    return new s(59766, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N9k() {
    return new s(59767, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N9kPlus() {
    return new s(59768, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get N9mp() {
    return new s(59769, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Abc() {
    return new s(60308, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AcUnit() {
    return new s(60219, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AccessAlarm() {
    return new s(57744, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AccessAlarms() {
    return new s(57745, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AccessTime() {
    return new s(57746, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AccessTimeFilled() {
    return new s(61398, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Accessibility() {
    return new s(59470, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AccessibilityNew() {
    return new s(59692, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Accessible() {
    return new s(59668, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AccessibleForward() {
    return new s(59700, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AccountBalance() {
    return new s(59471, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AccountBalanceWallet() {
    return new s(59472, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AccountBox() {
    return new s(59473, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AccountCircle() {
    return new s(59475, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AccountTree() {
    return new s(59770, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AdUnits() {
    return new s(61241, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Adb() {
    return new s(58894, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Add() {
    return new s(57669, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddAPhoto() {
    return new s(58425, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddAlarm() {
    return new s(57747, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddAlert() {
    return new s(57347, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddBox() {
    return new s(57670, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddBusiness() {
    return new s(59177, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddCall() {
    return new s(57576, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddCard() {
    return new s(60294, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddChart() {
    return new s(59771, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddCircle() {
    return new s(57671, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddCircleOutline() {
    return new s(57672, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddComment() {
    return new s(57958, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddIcCall() {
    return new s(59772, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddLink() {
    return new s(57720, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddLocation() {
    return new s(58727, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddLocationAlt() {
    return new s(61242, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddModerator() {
    return new s(59773, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddPhotoAlternate() {
    return new s(58430, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddReaction() {
    return new s(57811, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddRoad() {
    return new s(61243, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddShoppingCart() {
    return new s(59476, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddTask() {
    return new s(62010, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddToDrive() {
    return new s(58972, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddToHomeScreen() {
    return new s(57854, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddToPhotos() {
    return new s(58269, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AddToQueue() {
    return new s(57436, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Addchart() {
    return new s(61244, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AdfScanner() {
    return new s(60122, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Adjust() {
    return new s(58270, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AdminPanelSettings() {
    return new s(61245, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Adobe() {
    return new s(60054, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AdsClick() {
    return new s(59234, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Agriculture() {
    return new s(60025, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Air() {
    return new s(61400, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AirlineSeatFlat() {
    return new s(58928, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AirlineSeatFlatAngled() {
    return new s(58929, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AirlineSeatIndividualSuite() {
    return new s(58930, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AirlineSeatLegroomExtra() {
    return new s(58931, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AirlineSeatLegroomNormal() {
    return new s(58932, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AirlineSeatLegroomReduced() {
    return new s(58933, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AirlineSeatReclineExtra() {
    return new s(58934, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AirlineSeatReclineNormal() {
    return new s(58935, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AirlineStops() {
    return new s(59344, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Airlines() {
    return new s(59338, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AirplaneTicket() {
    return new s(61401, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AirplanemodeActive() {
    return new s(57749, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AirplanemodeInactive() {
    return new s(57748, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AirplanemodeOff() {
    return new s(57748, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AirplanemodeOn() {
    return new s(57749, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Airplay() {
    return new s(57429, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AirportShuttle() {
    return new s(60220, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Alarm() {
    return new s(59477, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AlarmAdd() {
    return new s(59478, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AlarmOff() {
    return new s(59479, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AlarmOn() {
    return new s(59480, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Album() {
    return new s(57369, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AlignHorizontalCenter() {
    return new s(57359, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AlignHorizontalLeft() {
    return new s(57357, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AlignHorizontalRight() {
    return new s(57360, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AlignVerticalBottom() {
    return new s(57365, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AlignVerticalCenter() {
    return new s(57361, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AlignVerticalTop() {
    return new s(57356, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AllInbox() {
    return new s(59775, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AllInclusive() {
    return new s(60221, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AllOut() {
    return new s(59659, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AltRoute() {
    return new s(61828, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AlternateEmail() {
    return new s(57574, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AmpStories() {
    return new s(59923, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Analytics() {
    return new s(61246, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Anchor() {
    return new s(61901, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Android() {
    return new s(59481, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Animation() {
    return new s(59164, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Announcement() {
    return new s(59482, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Aod() {
    return new s(61402, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Apartment() {
    return new s(59968, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Api() {
    return new s(61879, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AppBlocking() {
    return new s(61247, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AppRegistration() {
    return new s(61248, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AppSettingsAlt() {
    return new s(61249, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AppShortcut() {
    return new s(60132, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Apple() {
    return new s(60032, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Approval() {
    return new s(59778, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Apps() {
    return new s(58819, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AppsOutage() {
    return new s(59340, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Architecture() {
    return new s(59963, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Archive() {
    return new s(57673, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AreaChart() {
    return new s(59248, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ArrowBack() {
    return new s(58820, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ArrowBackIos() {
    return new s(58848, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ArrowBackIosNew() {
    return new s(58090, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ArrowCircleDown() {
    return new s(61825, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ArrowCircleLeft() {
    return new s(60071, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ArrowCircleRight() {
    return new s(60074, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ArrowCircleUp() {
    return new s(61826, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ArrowDownward() {
    return new s(58843, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ArrowDropDown() {
    return new s(58821, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ArrowDropDownCircle() {
    return new s(58822, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ArrowDropUp() {
    return new s(58823, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ArrowForward() {
    return new s(58824, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ArrowForwardIos() {
    return new s(58849, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ArrowLeft() {
    return new s(58846, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ArrowRight() {
    return new s(58847, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ArrowRightAlt() {
    return new s(59713, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ArrowUpward() {
    return new s(58840, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ArtTrack() {
    return new s(57440, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Article() {
    return new s(61250, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AspectRatio() {
    return new s(59483, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Assessment() {
    return new s(59484, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Assignment() {
    return new s(59485, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AssignmentInd() {
    return new s(59486, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AssignmentLate() {
    return new s(59487, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AssignmentReturn() {
    return new s(59488, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AssignmentReturned() {
    return new s(59489, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AssignmentTurnedIn() {
    return new s(59490, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Assistant() {
    return new s(58271, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AssistantDirection() {
    return new s(59784, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AssistantNavigation() {
    return new s(59785, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AssistantPhoto() {
    return new s(58272, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AssuredWorkload() {
    return new s(60271, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Atm() {
    return new s(58739, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AttachEmail() {
    return new s(59998, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AttachFile() {
    return new s(57894, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AttachMoney() {
    return new s(57895, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Attachment() {
    return new s(58044, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Attractions() {
    return new s(59986, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Attribution() {
    return new s(61403, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AudioFile() {
    return new s(60290, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Audiotrack() {
    return new s(58273, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AutoAwesome() {
    return new s(58975, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AutoAwesomeMosaic() {
    return new s(58976, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AutoAwesomeMotion() {
    return new s(58977, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AutoDelete() {
    return new s(59980, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AutoFixHigh() {
    return new s(58979, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AutoFixNormal() {
    return new s(58980, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AutoFixOff() {
    return new s(58981, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AutoGraph() {
    return new s(58619, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AutoStories() {
    return new s(58982, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AutofpsSelect() {
    return new s(61404, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Autorenew() {
    return new s(59491, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get AvTimer() {
    return new s(57371, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BabyChangingStation() {
    return new s(61851, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BackHand() {
    return new s(59236, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Backpack() {
    return new s(61852, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Backspace() {
    return new s(57674, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Backup() {
    return new s(59492, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BackupTable() {
    return new s(61251, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Badge() {
    return new s(60007, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BakeryDining() {
    return new s(59987, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Balance() {
    return new s(60150, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Balcony() {
    return new s(58767, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Ballot() {
    return new s(57714, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BarChart() {
    return new s(57963, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BatchPrediction() {
    return new s(61685, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Bathroom() {
    return new s(61405, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Bathtub() {
    return new s(59969, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Battery0Bar() {
    return new s(60380, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Battery1Bar() {
    return new s(60377, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Battery2Bar() {
    return new s(60384, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Battery3Bar() {
    return new s(60381, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Battery4Bar() {
    return new s(60386, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Battery5Bar() {
    return new s(60372, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Battery6Bar() {
    return new s(60370, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BatteryAlert() {
    return new s(57756, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BatteryChargingFull() {
    return new s(57763, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BatteryFull() {
    return new s(57764, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BatterySaver() {
    return new s(61406, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BatteryStd() {
    return new s(57765, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BatteryUnknown() {
    return new s(57766, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BeachAccess() {
    return new s(60222, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Bed() {
    return new s(61407, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BedroomBaby() {
    return new s(61408, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BedroomChild() {
    return new s(61409, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BedroomParent() {
    return new s(61410, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Bedtime() {
    return new s(61252, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BedtimeOff() {
    return new s(60278, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Beenhere() {
    return new s(58669, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Bento() {
    return new s(61940, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BikeScooter() {
    return new s(61253, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Biotech() {
    return new s(59962, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Blender() {
    return new s(61411, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Block() {
    return new s(57675, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BlockFlipped() {
    return new s(61254, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Bloodtype() {
    return new s(61412, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Bluetooth() {
    return new s(57767, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BluetoothAudio() {
    return new s(58895, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BluetoothConnected() {
    return new s(57768, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BluetoothDisabled() {
    return new s(57769, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BluetoothDrive() {
    return new s(61413, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BluetoothSearching() {
    return new s(57770, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BlurCircular() {
    return new s(58274, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BlurLinear() {
    return new s(58275, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BlurOff() {
    return new s(58276, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BlurOn() {
    return new s(58277, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Bolt() {
    return new s(59915, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Book() {
    return new s(59493, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BookOnline() {
    return new s(61975, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Bookmark() {
    return new s(59494, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BookmarkAdd() {
    return new s(58776, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BookmarkAdded() {
    return new s(58777, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BookmarkBorder() {
    return new s(59495, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BookmarkOutline() {
    return new s(59495, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BookmarkRemove() {
    return new s(58778, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Bookmarks() {
    return new s(59787, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BorderAll() {
    return new s(57896, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BorderBottom() {
    return new s(57897, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BorderClear() {
    return new s(57898, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BorderColor() {
    return new s(57899, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BorderHorizontal() {
    return new s(57900, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BorderInner() {
    return new s(57901, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BorderLeft() {
    return new s(57902, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BorderOuter() {
    return new s(57903, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BorderRight() {
    return new s(57904, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BorderStyle() {
    return new s(57905, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BorderTop() {
    return new s(57906, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BorderVertical() {
    return new s(57907, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Boy() {
    return new s(60263, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BrandingWatermark() {
    return new s(57451, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BreakfastDining() {
    return new s(59988, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Brightness1() {
    return new s(58278, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Brightness2() {
    return new s(58279, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Brightness3() {
    return new s(58280, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Brightness4() {
    return new s(58281, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Brightness5() {
    return new s(58282, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Brightness6() {
    return new s(58283, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Brightness7() {
    return new s(58284, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BrightnessAuto() {
    return new s(57771, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BrightnessHigh() {
    return new s(57772, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BrightnessLow() {
    return new s(57773, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BrightnessMedium() {
    return new s(57774, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BrokenImage() {
    return new s(58285, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BrowseGallery() {
    return new s(60369, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BrowserNotSupported() {
    return new s(61255, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BrowserUpdated() {
    return new s(59343, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BrunchDining() {
    return new s(60019, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Brush() {
    return new s(58286, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BubbleChart() {
    return new s(59101, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BugReport() {
    return new s(59496, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Build() {
    return new s(59497, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BuildCircle() {
    return new s(61256, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Bungalow() {
    return new s(58769, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BurstMode() {
    return new s(58428, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BusAlert() {
    return new s(59791, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Business() {
    return new s(57519, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get BusinessCenter() {
    return new s(60223, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Cabin() {
    return new s(58761, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Cable() {
    return new s(61414, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Cached() {
    return new s(59498, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Cake() {
    return new s(59369, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Calculate() {
    return new s(59999, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CalendarMonth() {
    return new s(60364, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CalendarToday() {
    return new s(59701, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CalendarViewDay() {
    return new s(59702, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CalendarViewMonth() {
    return new s(61415, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CalendarViewWeek() {
    return new s(61416, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Call() {
    return new s(57520, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CallEnd() {
    return new s(57521, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CallMade() {
    return new s(57522, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CallMerge() {
    return new s(57523, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CallMissed() {
    return new s(57524, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CallMissedOutgoing() {
    return new s(57572, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CallReceived() {
    return new s(57525, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CallSplit() {
    return new s(57526, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CallToAction() {
    return new s(57452, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Camera() {
    return new s(58287, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CameraAlt() {
    return new s(58288, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CameraEnhance() {
    return new s(59644, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CameraFront() {
    return new s(58289, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CameraIndoor() {
    return new s(61417, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CameraOutdoor() {
    return new s(61418, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CameraRear() {
    return new s(58290, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CameraRoll() {
    return new s(58291, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Cameraswitch() {
    return new s(61419, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Campaign() {
    return new s(61257, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Cancel() {
    return new s(58825, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CancelPresentation() {
    return new s(57577, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CancelScheduleSend() {
    return new s(59961, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CandlestickChart() {
    return new s(60116, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CarCrash() {
    return new s(60402, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CarRental() {
    return new s(59989, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CarRepair() {
    return new s(59990, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CardGiftcard() {
    return new s(59638, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CardMembership() {
    return new s(59639, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CardTravel() {
    return new s(59640, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Carpenter() {
    return new s(61944, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Cases() {
    return new s(59794, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Casino() {
    return new s(60224, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Cast() {
    return new s(58119, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CastConnected() {
    return new s(58120, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CastForEducation() {
    return new s(61420, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Castle() {
    return new s(60081, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CatchingPokemon() {
    return new s(58632, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Category() {
    return new s(58740, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Celebration() {
    return new s(60005, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CellTower() {
    return new s(60346, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CellWifi() {
    return new s(57580, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CenterFocusStrong() {
    return new s(58292, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CenterFocusWeak() {
    return new s(58293, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Chair() {
    return new s(61421, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ChairAlt() {
    return new s(61422, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Chalet() {
    return new s(58757, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ChangeCircle() {
    return new s(58087, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ChangeHistory() {
    return new s(59499, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ChargingStation() {
    return new s(61853, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Chat() {
    return new s(57527, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ChatBubble() {
    return new s(57546, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ChatBubbleOutline() {
    return new s(57547, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Check() {
    return new s(58826, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CheckBox() {
    return new s(59444, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CheckBoxOutlineBlank() {
    return new s(59445, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CheckCircle() {
    return new s(59500, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CheckCircleOutline() {
    return new s(59693, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Checklist() {
    return new s(59057, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ChecklistRtl() {
    return new s(59059, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Checkroom() {
    return new s(61854, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ChevronLeft() {
    return new s(58827, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ChevronRight() {
    return new s(58828, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ChildCare() {
    return new s(60225, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ChildFriendly() {
    return new s(60226, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ChromeReaderMode() {
    return new s(59501, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Church() {
    return new s(60078, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Circle() {
    return new s(61258, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CircleNotifications() {
    return new s(59796, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Class() {
    return new s(59502, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CleanHands() {
    return new s(61983, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CleaningServices() {
    return new s(61695, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Clear() {
    return new s(57676, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ClearAll() {
    return new s(57528, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Close() {
    return new s(58829, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CloseFullscreen() {
    return new s(61903, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ClosedCaption() {
    return new s(57372, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ClosedCaptionDisabled() {
    return new s(61916, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ClosedCaptionOff() {
    return new s(59798, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Cloud() {
    return new s(58045, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CloudCircle() {
    return new s(58046, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CloudDone() {
    return new s(58047, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CloudDownload() {
    return new s(58048, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CloudOff() {
    return new s(58049, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CloudQueue() {
    return new s(58050, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CloudSync() {
    return new s(60250, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CloudUpload() {
    return new s(58051, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CloudySnowing() {
    return new s(59408, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Co2() {
    return new s(59312, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CoPresent() {
    return new s(60144, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Code() {
    return new s(59503, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CodeOff() {
    return new s(58611, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Coffee() {
    return new s(61423, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CoffeeMaker() {
    return new s(61424, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Collections() {
    return new s(58294, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CollectionsBookmark() {
    return new s(58417, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ColorLens() {
    return new s(58295, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Colorize() {
    return new s(58296, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Comment() {
    return new s(57529, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CommentBank() {
    return new s(59982, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CommentsDisabled() {
    return new s(59298, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Commit() {
    return new s(60149, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Commute() {
    return new s(59712, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Compare() {
    return new s(58297, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CompareArrows() {
    return new s(59669, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CompassCalibration() {
    return new s(58748, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Compost() {
    return new s(59233, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Compress() {
    return new s(59725, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Computer() {
    return new s(58122, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ConfirmationNum() {
    return new s(58936, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ConfirmationNumber() {
    return new s(58936, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ConnectWithoutContact() {
    return new s(61987, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ConnectedTv() {
    return new s(59800, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ConnectingAirports() {
    return new s(59337, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Construction() {
    return new s(59964, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ContactMail() {
    return new s(57552, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ContactPage() {
    return new s(61998, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ContactPhone() {
    return new s(57551, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ContactSupport() {
    return new s(59724, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Contactless() {
    return new s(60017, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Contacts() {
    return new s(57530, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ContentCopy() {
    return new s(57677, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ContentCut() {
    return new s(57678, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ContentPaste() {
    return new s(57679, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ContentPasteGo() {
    return new s(60046, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ContentPasteOff() {
    return new s(58616, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ContentPasteSearch() {
    return new s(60059, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Contrast() {
    return new s(60215, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ControlCamera() {
    return new s(57460, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ControlPoint() {
    return new s(58298, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ControlPointDuplicate() {
    return new s(58299, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Cookie() {
    return new s(60076, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CopyAll() {
    return new s(58092, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Copyright() {
    return new s(59660, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Coronavirus() {
    return new s(61985, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CorporateFare() {
    return new s(61904, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Cottage() {
    return new s(58759, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Countertops() {
    return new s(61943, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Create() {
    return new s(57680, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CreateNewFolder() {
    return new s(58060, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CreditCard() {
    return new s(59504, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CreditCardOff() {
    return new s(58612, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CreditScore() {
    return new s(61425, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Crib() {
    return new s(58760, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CrisisAlert() {
    return new s(60393, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Crop() {
    return new s(58302, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Crop169() {
    return new s(58300, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Crop32() {
    return new s(58301, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Crop54() {
    return new s(58303, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Crop75() {
    return new s(58304, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CropDin() {
    return new s(58305, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CropFree() {
    return new s(58306, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CropLandscape() {
    return new s(58307, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CropOriginal() {
    return new s(58308, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CropPortrait() {
    return new s(58309, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CropRotate() {
    return new s(58423, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CropSquare() {
    return new s(58310, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CrueltyFree() {
    return new s(59289, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Css() {
    return new s(60307, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CurrencyBitcoin() {
    return new s(60357, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CurrencyExchange() {
    return new s(60272, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CurrencyFranc() {
    return new s(60154, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CurrencyLira() {
    return new s(60143, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CurrencyPound() {
    return new s(60145, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CurrencyRuble() {
    return new s(60140, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CurrencyRupee() {
    return new s(60151, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CurrencyYen() {
    return new s(60155, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get CurrencyYuan() {
    return new s(60153, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Cyclone() {
    return new s(60373, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Dangerous() {
    return new s(59802, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DarkMode() {
    return new s(58652, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Dashboard() {
    return new s(59505, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DashboardCustomize() {
    return new s(59803, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DataArray() {
    return new s(60113, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DataExploration() {
    return new s(59247, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DataObject() {
    return new s(60115, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DataSaverOff() {
    return new s(61426, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DataSaverOn() {
    return new s(61427, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DataThresholding() {
    return new s(60319, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DataUsage() {
    return new s(57775, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DateRange() {
    return new s(59670, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Deblur() {
    return new s(60279, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Deck() {
    return new s(59970, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Dehaze() {
    return new s(58311, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Delete() {
    return new s(59506, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DeleteForever() {
    return new s(59691, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DeleteOutline() {
    return new s(59694, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DeleteSweep() {
    return new s(57708, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DeliveryDining() {
    return new s(60018, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DensityLarge() {
    return new s(60329, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DensityMedium() {
    return new s(60318, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DensitySmall() {
    return new s(60328, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DepartureBoard() {
    return new s(58742, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Description() {
    return new s(59507, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Deselect() {
    return new s(60342, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DesignServices() {
    return new s(61706, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DesktopAccessDisabled() {
    return new s(59805, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DesktopMac() {
    return new s(58123, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DesktopWindows() {
    return new s(58124, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Details() {
    return new s(58312, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DeveloperBoard() {
    return new s(58125, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DeveloperBoardOff() {
    return new s(58623, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DeveloperMode() {
    return new s(57776, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DeviceHub() {
    return new s(58165, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DeviceThermostat() {
    return new s(57855, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DeviceUnknown() {
    return new s(58169, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Devices() {
    return new s(57777, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DevicesFold() {
    return new s(60382, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DevicesOther() {
    return new s(58167, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DialerSip() {
    return new s(57531, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Dialpad() {
    return new s(57532, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Diamond() {
    return new s(60117, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Difference() {
    return new s(60285, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Dining() {
    return new s(61428, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DinnerDining() {
    return new s(59991, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Directions() {
    return new s(58670, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirectionsBike() {
    return new s(58671, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirectionsBoat() {
    return new s(58674, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirectionsBoatFilled() {
    return new s(61429, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirectionsBus() {
    return new s(58672, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirectionsBusFilled() {
    return new s(61430, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirectionsCar() {
    return new s(58673, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirectionsCarFilled() {
    return new s(61431, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirectionsFerry() {
    return new s(58674, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirectionsOff() {
    return new s(61711, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirectionsRailway() {
    return new s(58676, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirectionsRailwayFilled() {
    return new s(61432, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirectionsRun() {
    return new s(58726, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirectionsSubway() {
    return new s(58675, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirectionsSubwayFilled() {
    return new s(61433, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirectionsTrain() {
    return new s(58676, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirectionsTransit() {
    return new s(58677, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirectionsTransitFilled() {
    return new s(61434, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirectionsWalk() {
    return new s(58678, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DirtyLens() {
    return new s(61259, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DisabledByDefault() {
    return new s(62e3, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DisabledVisible() {
    return new s(59246, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DiscFull() {
    return new s(58896, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Discord() {
    return new s(60012, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Discount() {
    return new s(60361, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DisplaySettings() {
    return new s(60311, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DndForwardslash() {
    return new s(58897, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Dns() {
    return new s(59509, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DoDisturb() {
    return new s(61580, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DoDisturbAlt() {
    return new s(61581, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DoDisturbOff() {
    return new s(61582, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DoDisturbOn() {
    return new s(61583, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DoNotDisturb() {
    return new s(58898, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DoNotDisturbAlt() {
    return new s(58897, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DoNotDisturbOff() {
    return new s(58947, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DoNotDisturbOn() {
    return new s(58948, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DoNotDisturbOnTotalSilence() {
    return new s(61435, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DoNotStep() {
    return new s(61855, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DoNotTouch() {
    return new s(61872, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Dock() {
    return new s(58126, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DocumentScanner() {
    return new s(58874, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Domain() {
    return new s(59374, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DomainAdd() {
    return new s(60258, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DomainDisabled() {
    return new s(57583, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DomainVerification() {
    return new s(61260, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Done() {
    return new s(59510, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DoneAll() {
    return new s(59511, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DoneOutline() {
    return new s(59695, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DonutLarge() {
    return new s(59671, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DonutSmall() {
    return new s(59672, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DoorBack() {
    return new s(61436, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DoorFront() {
    return new s(61437, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DoorSliding() {
    return new s(61438, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Doorbell() {
    return new s(61439, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DoubleArrow() {
    return new s(59984, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DownhillSkiing() {
    return new s(58633, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Download() {
    return new s(61584, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DownloadDone() {
    return new s(61585, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DownloadForOffline() {
    return new s(61440, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Downloading() {
    return new s(61441, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Drafts() {
    return new s(57681, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DragHandle() {
    return new s(57949, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DragIndicator() {
    return new s(59717, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Draw() {
    return new s(59206, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DriveEta() {
    return new s(58899, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DriveFileMove() {
    return new s(58997, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DriveFileMoveOutline() {
    return new s(59809, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DriveFileMoveRtl() {
    return new s(59245, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DriveFileRenameOutline() {
    return new s(59810, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DriveFolderUpload() {
    return new s(59811, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Dry() {
    return new s(61875, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DryCleaning() {
    return new s(59992, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Duo() {
    return new s(59813, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Dvr() {
    return new s(57778, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DynamicFeed() {
    return new s(59924, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get DynamicForm() {
    return new s(61887, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EMobiledata() {
    return new s(61442, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Earbuds() {
    return new s(61443, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EarbudsBattery() {
    return new s(61444, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get East() {
    return new s(61919, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Eco() {
    return new s(59957, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EdgesensorHigh() {
    return new s(61445, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EdgesensorLow() {
    return new s(61446, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Edit() {
    return new s(58313, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EditAttributes() {
    return new s(58744, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EditCalendar() {
    return new s(59202, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EditLocation() {
    return new s(58728, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EditLocationAlt() {
    return new s(57797, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EditNote() {
    return new s(59205, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EditNotifications() {
    return new s(58661, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EditOff() {
    return new s(59728, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EditRoad() {
    return new s(61261, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Egg() {
    return new s(60108, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EggAlt() {
    return new s(60104, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Eject() {
    return new s(59643, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Elderly() {
    return new s(61978, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ElderlyWoman() {
    return new s(60265, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ElectricBike() {
    return new s(60187, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ElectricCar() {
    return new s(60188, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ElectricMoped() {
    return new s(60189, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ElectricRickshaw() {
    return new s(60190, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ElectricScooter() {
    return new s(60191, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ElectricalServices() {
    return new s(61698, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Elevator() {
    return new s(61856, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Email() {
    return new s(57534, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Emergency() {
    return new s(57835, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EmergencyRecording() {
    return new s(60404, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EmergencyShare() {
    return new s(60406, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EmojiEmotions() {
    return new s(59938, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EmojiEvents() {
    return new s(59939, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EmojiFlags() {
    return new s(59930, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EmojiFoodBeverage() {
    return new s(59931, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EmojiNature() {
    return new s(59932, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EmojiObjects() {
    return new s(59940, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EmojiPeople() {
    return new s(59933, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EmojiSymbols() {
    return new s(59934, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EmojiTransportation() {
    return new s(59935, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Engineering() {
    return new s(59965, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EnhancePhotoTranslate() {
    return new s(59644, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EnhancedEncryption() {
    return new s(58943, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Equalizer() {
    return new s(57373, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Error() {
    return new s(57344, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ErrorOutline() {
    return new s(57345, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Escalator() {
    return new s(61857, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EscalatorWarning() {
    return new s(61868, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Euro() {
    return new s(59925, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EuroSymbol() {
    return new s(59686, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EvStation() {
    return new s(58733, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Event() {
    return new s(59512, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EventAvailable() {
    return new s(58900, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EventBusy() {
    return new s(58901, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EventNote() {
    return new s(58902, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EventRepeat() {
    return new s(60283, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get EventSeat() {
    return new s(59651, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ExitToApp() {
    return new s(59513, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Expand() {
    return new s(59727, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ExpandCircleDown() {
    return new s(59341, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ExpandLess() {
    return new s(58830, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ExpandMore() {
    return new s(58831, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Explicit() {
    return new s(57374, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Explore() {
    return new s(59514, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ExploreOff() {
    return new s(59816, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Exposure() {
    return new s(58314, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ExposureMinus1() {
    return new s(58315, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ExposureMinus2() {
    return new s(58316, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ExposureNeg1() {
    return new s(58315, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ExposureNeg2() {
    return new s(58316, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ExposurePlus1() {
    return new s(58317, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ExposurePlus2() {
    return new s(58318, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ExposureZero() {
    return new s(58319, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Extension() {
    return new s(59515, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ExtensionOff() {
    return new s(58613, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Face() {
    return new s(59516, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FaceRetouchingNatural() {
    return new s(61262, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FaceRetouchingOff() {
    return new s(61447, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Facebook() {
    return new s(62004, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FactCheck() {
    return new s(61637, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Factory() {
    return new s(60348, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FamilyRestroom() {
    return new s(61858, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FastForward() {
    return new s(57375, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FastRewind() {
    return new s(57376, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Fastfood() {
    return new s(58746, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Favorite() {
    return new s(59517, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FavoriteBorder() {
    return new s(59518, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FavoriteOutline() {
    return new s(59518, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Fax() {
    return new s(60120, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FeaturedPlayList() {
    return new s(57453, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FeaturedVideo() {
    return new s(57454, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Feed() {
    return new s(61449, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Feedback() {
    return new s(59519, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Female() {
    return new s(58768, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Fence() {
    return new s(61942, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Festival() {
    return new s(60008, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FiberDvr() {
    return new s(57437, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FiberManualRecord() {
    return new s(57441, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FiberNew() {
    return new s(57438, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FiberPin() {
    return new s(57450, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FiberSmartRecord() {
    return new s(57442, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FileCopy() {
    return new s(57715, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FileDownload() {
    return new s(58052, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FileDownloadDone() {
    return new s(59818, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FileDownloadOff() {
    return new s(58622, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FileOpen() {
    return new s(60147, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FilePresent() {
    return new s(59918, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FileUpload() {
    return new s(58054, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Filter() {
    return new s(58323, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Filter1() {
    return new s(58320, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Filter2() {
    return new s(58321, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Filter3() {
    return new s(58322, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Filter4() {
    return new s(58324, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Filter5() {
    return new s(58325, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Filter6() {
    return new s(58326, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Filter7() {
    return new s(58327, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Filter8() {
    return new s(58328, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Filter9() {
    return new s(58329, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Filter9Plus() {
    return new s(58330, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FilterAlt() {
    return new s(61263, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FilterAltOff() {
    return new s(60210, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FilterBAndW() {
    return new s(58331, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FilterCenterFocus() {
    return new s(58332, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FilterDrama() {
    return new s(58333, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FilterFrames() {
    return new s(58334, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FilterHdr() {
    return new s(58335, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FilterList() {
    return new s(57682, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FilterListAlt() {
    return new s(59726, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FilterListOff() {
    return new s(60247, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FilterNone() {
    return new s(58336, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FilterTiltShift() {
    return new s(58338, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FilterVintage() {
    return new s(58339, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FindInPage() {
    return new s(59520, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FindReplace() {
    return new s(59521, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Fingerprint() {
    return new s(59661, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FireExtinguisher() {
    return new s(61912, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FireHydrant() {
    return new s(61859, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Fireplace() {
    return new s(59971, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FirstPage() {
    return new s(58844, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FitScreen() {
    return new s(59920, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Fitbit() {
    return new s(59435, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FitnessCenter() {
    return new s(60227, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Flag() {
    return new s(57683, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FlagCircle() {
    return new s(60152, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Flaky() {
    return new s(61264, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Flare() {
    return new s(58340, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FlashAuto() {
    return new s(58341, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FlashOff() {
    return new s(58342, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FlashOn() {
    return new s(58343, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FlashlightOff() {
    return new s(61450, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FlashlightOn() {
    return new s(61451, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Flatware() {
    return new s(61452, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Flight() {
    return new s(58681, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FlightClass() {
    return new s(59339, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FlightLand() {
    return new s(59652, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FlightTakeoff() {
    return new s(59653, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Flip() {
    return new s(58344, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FlipCameraAndroid() {
    return new s(59959, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FlipCameraIos() {
    return new s(59960, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FlipToBack() {
    return new s(59522, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FlipToFront() {
    return new s(59523, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Flood() {
    return new s(60390, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Flourescent() {
    return new s(61453, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FlutterDash() {
    return new s(57355, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FmdBad() {
    return new s(61454, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FmdGood() {
    return new s(61455, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Foggy() {
    return new s(59416, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Folder() {
    return new s(58055, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FolderCopy() {
    return new s(60349, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FolderDelete() {
    return new s(60212, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FolderOff() {
    return new s(60291, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FolderOpen() {
    return new s(58056, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FolderShared() {
    return new s(58057, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FolderSpecial() {
    return new s(58903, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FolderZip() {
    return new s(60204, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FollowTheSigns() {
    return new s(61986, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FontDownload() {
    return new s(57703, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FontDownloadOff() {
    return new s(58617, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FoodBank() {
    return new s(61938, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Forest() {
    return new s(60057, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ForkLeft() {
    return new s(60320, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ForkRight() {
    return new s(60332, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatAlignCenter() {
    return new s(57908, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatAlignJustify() {
    return new s(57909, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatAlignLeft() {
    return new s(57910, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatAlignRight() {
    return new s(57911, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatBold() {
    return new s(57912, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatClear() {
    return new s(57913, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatColorFill() {
    return new s(57914, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatColorReset() {
    return new s(57915, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatColorText() {
    return new s(57916, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatIndentDecrease() {
    return new s(57917, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatIndentIncrease() {
    return new s(57918, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatItalic() {
    return new s(57919, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatLineSpacing() {
    return new s(57920, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatListBulleted() {
    return new s(57921, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatListNumbered() {
    return new s(57922, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatListNumberedRtl() {
    return new s(57959, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatOverline() {
    return new s(60261, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatPaint() {
    return new s(57923, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatQuote() {
    return new s(57924, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatShapes() {
    return new s(57950, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatSize() {
    return new s(57925, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatStrikethrough() {
    return new s(57926, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatTextdirectionLToR() {
    return new s(57927, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatTextdirectionRToL() {
    return new s(57928, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatUnderline() {
    return new s(57929, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FormatUnderlined() {
    return new s(57929, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Fort() {
    return new s(60077, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Forum() {
    return new s(57535, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Forward() {
    return new s(57684, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Forward10() {
    return new s(57430, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Forward30() {
    return new s(57431, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Forward5() {
    return new s(57432, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ForwardToInbox() {
    return new s(61831, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Foundation() {
    return new s(61952, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FreeBreakfast() {
    return new s(60228, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FreeCancellation() {
    return new s(59208, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FrontHand() {
    return new s(59241, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Fullscreen() {
    return new s(58832, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get FullscreenExit() {
    return new s(58833, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Functions() {
    return new s(57930, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GMobiledata() {
    return new s(61456, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GTranslate() {
    return new s(59687, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Gamepad() {
    return new s(58127, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Games() {
    return new s(57377, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Garage() {
    return new s(61457, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Gavel() {
    return new s(59662, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GeneratingTokens() {
    return new s(59209, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Gesture() {
    return new s(57685, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GetApp() {
    return new s(59524, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Gif() {
    return new s(59656, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GifBox() {
    return new s(59299, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Girl() {
    return new s(60264, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Gite() {
    return new s(58763, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Goat() {
    return new s(1114109, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GolfCourse() {
    return new s(60229, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GppBad() {
    return new s(61458, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GppGood() {
    return new s(61459, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GppMaybe() {
    return new s(61460, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GpsFixed() {
    return new s(57779, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GpsNotFixed() {
    return new s(57780, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GpsOff() {
    return new s(57781, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Grade() {
    return new s(59525, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Gradient() {
    return new s(58345, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Grading() {
    return new s(59983, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Grain() {
    return new s(58346, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GraphicEq() {
    return new s(57784, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Grass() {
    return new s(61957, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Grid3x3() {
    return new s(61461, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Grid4x4() {
    return new s(61462, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GridGoldenratio() {
    return new s(61463, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GridOff() {
    return new s(58347, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GridOn() {
    return new s(58348, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GridView() {
    return new s(59824, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Group() {
    return new s(59375, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GroupAdd() {
    return new s(59376, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GroupOff() {
    return new s(59207, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GroupRemove() {
    return new s(59309, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get GroupWork() {
    return new s(59526, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Groups() {
    return new s(62003, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HMobiledata() {
    return new s(61464, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HPlusMobiledata() {
    return new s(61465, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Hail() {
    return new s(59825, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Handshake() {
    return new s(60363, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Handyman() {
    return new s(61707, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Hardware() {
    return new s(59993, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Hd() {
    return new s(57426, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HdrAuto() {
    return new s(61466, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HdrAutoSelect() {
    return new s(61467, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HdrEnhancedSelect() {
    return new s(61265, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HdrOff() {
    return new s(58349, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HdrOffSelect() {
    return new s(61468, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HdrOn() {
    return new s(58350, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HdrOnSelect() {
    return new s(61469, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HdrPlus() {
    return new s(61470, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HdrStrong() {
    return new s(58353, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HdrWeak() {
    return new s(58354, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Headphones() {
    return new s(61471, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HeadphonesBattery() {
    return new s(61472, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Headset() {
    return new s(58128, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HeadsetMic() {
    return new s(58129, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HeadsetOff() {
    return new s(58170, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Healing() {
    return new s(58355, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HealthAndSafety() {
    return new s(57813, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Hearing() {
    return new s(57379, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HearingDisabled() {
    return new s(61700, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HeartBroken() {
    return new s(60098, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Height() {
    return new s(59926, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Help() {
    return new s(59527, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HelpCenter() {
    return new s(61888, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HelpOutline() {
    return new s(59645, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Hevc() {
    return new s(61473, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Hexagon() {
    return new s(60217, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HideImage() {
    return new s(61474, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HideSource() {
    return new s(61475, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HighQuality() {
    return new s(57380, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Highlight() {
    return new s(57951, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HighlightAlt() {
    return new s(61266, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HighlightOff() {
    return new s(59528, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HighlightRemove() {
    return new s(59528, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Hiking() {
    return new s(58634, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get History() {
    return new s(59529, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HistoryEdu() {
    return new s(59966, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HistoryToggleOff() {
    return new s(61821, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Hive() {
    return new s(60070, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Hls() {
    return new s(60298, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HlsOff() {
    return new s(60300, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HolidayVillage() {
    return new s(58762, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Home() {
    return new s(59530, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HomeFilled() {
    return new s(59826, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HomeMax() {
    return new s(61476, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HomeMini() {
    return new s(61477, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HomeRepairService() {
    return new s(61696, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HomeWork() {
    return new s(59913, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HorizontalDistribute() {
    return new s(57364, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HorizontalRule() {
    return new s(61704, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HorizontalSplit() {
    return new s(59719, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HotTub() {
    return new s(60230, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Hotel() {
    return new s(58682, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HotelClass() {
    return new s(59203, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HourglassBottom() {
    return new s(59996, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HourglassDisabled() {
    return new s(61267, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HourglassEmpty() {
    return new s(59531, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HourglassFull() {
    return new s(59532, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HourglassTop() {
    return new s(59995, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get House() {
    return new s(59972, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HouseSiding() {
    return new s(61954, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Houseboat() {
    return new s(58756, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HowToReg() {
    return new s(57716, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get HowToVote() {
    return new s(57717, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Html() {
    return new s(60286, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Http() {
    return new s(59650, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Https() {
    return new s(59533, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Hub() {
    return new s(59892, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Hvac() {
    return new s(61710, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get IceSkating() {
    return new s(58635, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Icecream() {
    return new s(60009, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Image() {
    return new s(58356, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ImageAspectRatio() {
    return new s(58357, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ImageNotSupported() {
    return new s(61718, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ImageSearch() {
    return new s(58431, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ImagesearchRoller() {
    return new s(59828, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ImportContacts() {
    return new s(57568, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ImportExport() {
    return new s(57539, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ImportantDevices() {
    return new s(59666, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Inbox() {
    return new s(57686, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get IncompleteCircle() {
    return new s(59291, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get IndeterminateCheckBox() {
    return new s(59657, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Info() {
    return new s(59534, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get InfoOutline() {
    return new s(59535, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Input() {
    return new s(59536, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get InsertChart() {
    return new s(57931, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get InsertChartOutlined() {
    return new s(57962, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get InsertComment() {
    return new s(57932, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get InsertDriveFile() {
    return new s(57933, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get InsertEmoticon() {
    return new s(57934, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get InsertInvitation() {
    return new s(57935, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get InsertLink() {
    return new s(57936, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get InsertPageBreak() {
    return new s(60106, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get InsertPhoto() {
    return new s(57937, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Insights() {
    return new s(61586, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get InstallDesktop() {
    return new s(60273, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get InstallMobile() {
    return new s(60274, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get IntegrationInstructions() {
    return new s(61268, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Interests() {
    return new s(59336, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get InterpreterMode() {
    return new s(59451, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Inventory() {
    return new s(57721, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Inventory2() {
    return new s(57761, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get InvertColors() {
    return new s(59537, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get InvertColorsOff() {
    return new s(57540, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get InvertColorsOn() {
    return new s(59537, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get IosShare() {
    return new s(59064, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Iron() {
    return new s(58755, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Iso() {
    return new s(58358, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Javascript() {
    return new s(60284, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get JoinFull() {
    return new s(60139, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get JoinInner() {
    return new s(60148, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get JoinLeft() {
    return new s(60146, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get JoinRight() {
    return new s(60138, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Kayaking() {
    return new s(58636, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KebabDining() {
    return new s(59458, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Key() {
    return new s(59196, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyOff() {
    return new s(60292, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Keyboard() {
    return new s(58130, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardAlt() {
    return new s(61480, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardArrowDown() {
    return new s(58131, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardArrowLeft() {
    return new s(58132, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardArrowRight() {
    return new s(58133, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardArrowUp() {
    return new s(58134, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardBackspace() {
    return new s(58135, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardCapslock() {
    return new s(58136, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardCommand() {
    return new s(60128, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardCommandKey() {
    return new s(60135, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardControl() {
    return new s(58835, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardControlKey() {
    return new s(60134, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardDoubleArrowDown() {
    return new s(60112, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardDoubleArrowLeft() {
    return new s(60099, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardDoubleArrowRight() {
    return new s(60105, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardDoubleArrowUp() {
    return new s(60111, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardHide() {
    return new s(58138, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardOption() {
    return new s(60127, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardOptionKey() {
    return new s(60136, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardReturn() {
    return new s(58139, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardTab() {
    return new s(58140, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KeyboardVoice() {
    return new s(58141, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get KingBed() {
    return new s(59973, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Kitchen() {
    return new s(60231, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Kitesurfing() {
    return new s(58637, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Label() {
    return new s(59538, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LabelImportant() {
    return new s(59703, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LabelImportantOutline() {
    return new s(59720, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LabelOff() {
    return new s(59830, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LabelOutline() {
    return new s(59539, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Lan() {
    return new s(60207, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Landscape() {
    return new s(58359, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Landslide() {
    return new s(60375, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Language() {
    return new s(59540, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Laptop() {
    return new s(58142, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LaptopChromebook() {
    return new s(58143, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LaptopMac() {
    return new s(58144, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LaptopWindows() {
    return new s(58145, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LastPage() {
    return new s(58845, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Launch() {
    return new s(59541, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Layers() {
    return new s(58683, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LayersClear() {
    return new s(58684, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Leaderboard() {
    return new s(61964, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LeakAdd() {
    return new s(58360, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LeakRemove() {
    return new s(58361, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LeaveBagsAtHome() {
    return new s(61979, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LegendToggle() {
    return new s(61723, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Lens() {
    return new s(58362, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LensBlur() {
    return new s(61481, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LibraryAdd() {
    return new s(57390, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LibraryAddCheck() {
    return new s(59831, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LibraryBooks() {
    return new s(57391, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LibraryMusic() {
    return new s(57392, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Light() {
    return new s(61482, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LightMode() {
    return new s(58648, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Lightbulb() {
    return new s(57584, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LightbulbOutline() {
    return new s(59663, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LineAxis() {
    return new s(60058, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LineStyle() {
    return new s(59673, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LineWeight() {
    return new s(59674, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LinearScale() {
    return new s(57952, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Link() {
    return new s(57687, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LinkOff() {
    return new s(57711, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LinkedCamera() {
    return new s(58424, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Liquor() {
    return new s(6e4, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get List() {
    return new s(59542, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ListAlt() {
    return new s(57582, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LiveHelp() {
    return new s(57542, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LiveTv() {
    return new s(58937, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Living() {
    return new s(61483, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalActivity() {
    return new s(58687, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalAirport() {
    return new s(58685, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalAtm() {
    return new s(58686, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalAttraction() {
    return new s(58687, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalBar() {
    return new s(58688, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalCafe() {
    return new s(58689, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalCarWash() {
    return new s(58690, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalConvenienceStore() {
    return new s(58691, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalDining() {
    return new s(58710, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalDrink() {
    return new s(58692, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalFireDepartment() {
    return new s(61269, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalFlorist() {
    return new s(58693, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalGasStation() {
    return new s(58694, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalGroceryStore() {
    return new s(58695, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalHospital() {
    return new s(58696, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalHotel() {
    return new s(58697, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalLaundryService() {
    return new s(58698, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalLibrary() {
    return new s(58699, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalMall() {
    return new s(58700, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalMovies() {
    return new s(58701, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalOffer() {
    return new s(58702, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalParking() {
    return new s(58703, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalPharmacy() {
    return new s(58704, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalPhone() {
    return new s(58705, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalPizza() {
    return new s(58706, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalPlay() {
    return new s(58707, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalPolice() {
    return new s(61270, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalPostOffice() {
    return new s(58708, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalPrintShop() {
    return new s(58709, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalPrintshop() {
    return new s(58709, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalRestaurant() {
    return new s(58710, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalSee() {
    return new s(58711, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalShipping() {
    return new s(58712, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocalTaxi() {
    return new s(58713, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocationCity() {
    return new s(59377, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocationDisabled() {
    return new s(57782, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocationHistory() {
    return new s(58714, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocationOff() {
    return new s(57543, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocationOn() {
    return new s(57544, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocationPin() {
    return new s(61915, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LocationSearching() {
    return new s(57783, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Lock() {
    return new s(59543, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LockClock() {
    return new s(61271, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LockOpen() {
    return new s(59544, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LockOutline() {
    return new s(59545, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LockReset() {
    return new s(60126, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Login() {
    return new s(60023, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LogoDev() {
    return new s(60118, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Logout() {
    return new s(59834, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Looks() {
    return new s(58364, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Looks3() {
    return new s(58363, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Looks4() {
    return new s(58365, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Looks5() {
    return new s(58366, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Looks6() {
    return new s(58367, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LooksOne() {
    return new s(58368, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LooksTwo() {
    return new s(58369, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Loop() {
    return new s(57384, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Loupe() {
    return new s(58370, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LowPriority() {
    return new s(57709, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Loyalty() {
    return new s(59546, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LteMobiledata() {
    return new s(61484, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LtePlusMobiledata() {
    return new s(61485, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Luggage() {
    return new s(62005, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get LunchDining() {
    return new s(60001, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Mail() {
    return new s(57688, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MailOutline() {
    return new s(57569, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Male() {
    return new s(58766, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Man() {
    return new s(58603, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ManageAccounts() {
    return new s(61486, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ManageHistory() {
    return new s(60391, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ManageSearch() {
    return new s(61487, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Map() {
    return new s(58715, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MapsHomeWork() {
    return new s(61488, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MapsUgc() {
    return new s(61272, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Margin() {
    return new s(59835, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MarkAsUnread() {
    return new s(59836, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MarkChatRead() {
    return new s(61835, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MarkChatUnread() {
    return new s(61833, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MarkEmailRead() {
    return new s(61836, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MarkEmailUnread() {
    return new s(61834, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MarkUnreadChatAlt() {
    return new s(60317, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Markunread() {
    return new s(57689, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MarkunreadMailbox() {
    return new s(59547, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Masks() {
    return new s(61976, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Maximize() {
    return new s(59696, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MediaBluetoothOff() {
    return new s(61489, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MediaBluetoothOn() {
    return new s(61490, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Mediation() {
    return new s(61351, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MedicalInformation() {
    return new s(60397, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MedicalServices() {
    return new s(61705, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Medication() {
    return new s(61491, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MedicationLiquid() {
    return new s(60039, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MeetingRoom() {
    return new s(60239, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Memory() {
    return new s(58146, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Menu() {
    return new s(58834, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MenuBook() {
    return new s(59929, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MenuOpen() {
    return new s(59837, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Merge() {
    return new s(60312, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MergeType() {
    return new s(57938, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Message() {
    return new s(57545, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Messenger() {
    return new s(57546, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MessengerOutline() {
    return new s(57547, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Mic() {
    return new s(57385, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MicExternalOff() {
    return new s(61273, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MicExternalOn() {
    return new s(61274, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MicNone() {
    return new s(57386, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MicOff() {
    return new s(57387, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Microwave() {
    return new s(61956, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MilitaryTech() {
    return new s(59967, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Minimize() {
    return new s(59697, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MinorCrash() {
    return new s(60401, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MiscellaneousServices() {
    return new s(61708, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MissedVideoCall() {
    return new s(57459, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Mms() {
    return new s(58904, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MobileFriendly() {
    return new s(57856, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MobileOff() {
    return new s(57857, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MobileScreenShare() {
    return new s(57575, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MobiledataOff() {
    return new s(61492, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Mode() {
    return new s(61591, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ModeComment() {
    return new s(57939, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ModeEdit() {
    return new s(57940, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ModeEditOutline() {
    return new s(61493, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ModeNight() {
    return new s(61494, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ModeOfTravel() {
    return new s(59342, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ModeStandby() {
    return new s(61495, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ModelTraining() {
    return new s(61647, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MonetizationOn() {
    return new s(57955, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Money() {
    return new s(58749, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MoneyOff() {
    return new s(57948, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MoneyOffCsred() {
    return new s(61496, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Monitor() {
    return new s(61275, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MonitorHeart() {
    return new s(60066, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MonitorWeight() {
    return new s(61497, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MonochromePhotos() {
    return new s(58371, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Mood() {
    return new s(59378, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MoodBad() {
    return new s(59379, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Moped() {
    return new s(60200, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get More() {
    return new s(58905, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MoreHoriz() {
    return new s(58835, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MoreTime() {
    return new s(59997, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MoreVert() {
    return new s(58836, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Mosque() {
    return new s(60082, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MotionPhotosAuto() {
    return new s(61498, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MotionPhotosOff() {
    return new s(59840, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MotionPhotosOn() {
    return new s(59841, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MotionPhotosPause() {
    return new s(61991, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MotionPhotosPaused() {
    return new s(59842, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Motorcycle() {
    return new s(59675, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Mouse() {
    return new s(58147, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MoveDown() {
    return new s(60257, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MoveToInbox() {
    return new s(57704, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MoveUp() {
    return new s(60260, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Movie() {
    return new s(57388, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MovieCreation() {
    return new s(58372, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MovieFilter() {
    return new s(58426, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Moving() {
    return new s(58625, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Mp() {
    return new s(59843, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MultilineChart() {
    return new s(59103, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MultipleStop() {
    return new s(61881, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MultitrackAudio() {
    return new s(57784, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Museum() {
    return new s(59958, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MusicNote() {
    return new s(58373, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MusicOff() {
    return new s(58432, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MusicVideo() {
    return new s(57443, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MyLibraryAdd() {
    return new s(57390, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MyLibraryBooks() {
    return new s(57391, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MyLibraryMusic() {
    return new s(57392, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get MyLocation() {
    return new s(58716, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Nat() {
    return new s(61276, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Nature() {
    return new s(58374, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NaturePeople() {
    return new s(58375, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NavigateBefore() {
    return new s(58376, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NavigateNext() {
    return new s(58377, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Navigation() {
    return new s(58717, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NearMe() {
    return new s(58729, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NearMeDisabled() {
    return new s(61935, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NearbyError() {
    return new s(61499, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NearbyOff() {
    return new s(61500, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NetworkCell() {
    return new s(57785, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NetworkCheck() {
    return new s(58944, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NetworkLocked() {
    return new s(58906, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NetworkPing() {
    return new s(60362, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NetworkWifi() {
    return new s(57786, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NetworkWifi1Bar() {
    return new s(60388, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NetworkWifi2Bar() {
    return new s(60374, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NetworkWifi3Bar() {
    return new s(60385, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NewLabel() {
    return new s(58889, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NewReleases() {
    return new s(57393, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Newspaper() {
    return new s(60289, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NextPlan() {
    return new s(61277, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NextWeek() {
    return new s(57706, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Nfc() {
    return new s(57787, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NightShelter() {
    return new s(61937, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Nightlife() {
    return new s(60002, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Nightlight() {
    return new s(61501, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NightlightRound() {
    return new s(61278, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NightsStay() {
    return new s(59974, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoAccounts() {
    return new s(61502, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoBackpack() {
    return new s(62007, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoCell() {
    return new s(61860, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoCrash() {
    return new s(60400, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoDrinks() {
    return new s(61861, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoEncryption() {
    return new s(58945, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoEncryptionGmailerrorred() {
    return new s(61503, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoFlash() {
    return new s(61862, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoFood() {
    return new s(61863, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoLuggage() {
    return new s(62011, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoMeals() {
    return new s(61910, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoMealsOuline() {
    return new s(61993, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoMeetingRoom() {
    return new s(60238, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoPhotography() {
    return new s(61864, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoSim() {
    return new s(57548, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoStroller() {
    return new s(61871, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoTransfer() {
    return new s(61909, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoiseAware() {
    return new s(60396, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoiseControlOff() {
    return new s(60403, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NordicWalking() {
    return new s(58638, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get North() {
    return new s(61920, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NorthEast() {
    return new s(61921, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NorthWest() {
    return new s(61922, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NotAccessible() {
    return new s(61694, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NotInterested() {
    return new s(57395, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NotListedLocation() {
    return new s(58741, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NotStarted() {
    return new s(61649, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Note() {
    return new s(57455, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoteAdd() {
    return new s(59548, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NoteAlt() {
    return new s(61504, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Notes() {
    return new s(57964, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NotificationAdd() {
    return new s(58265, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NotificationImportant() {
    return new s(57348, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Notifications() {
    return new s(59380, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NotificationsActive() {
    return new s(59383, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NotificationsNone() {
    return new s(59381, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NotificationsOff() {
    return new s(59382, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NotificationsOn() {
    return new s(59383, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NotificationsPaused() {
    return new s(59384, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NowWallpaper() {
    return new s(57788, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get NowWidgets() {
    return new s(57789, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Numbers() {
    return new s(60103, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get OfflineBolt() {
    return new s(59698, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get OfflinePin() {
    return new s(59658, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get OfflineShare() {
    return new s(59845, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get OndemandVideo() {
    return new s(58938, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get OnlinePrediction() {
    return new s(61675, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Opacity() {
    return new s(59676, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get OpenInBrowser() {
    return new s(59549, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get OpenInFull() {
    return new s(61902, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get OpenInNew() {
    return new s(59550, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get OpenInNewOff() {
    return new s(58614, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get OpenWith() {
    return new s(59551, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get OtherHouses() {
    return new s(58764, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Outbond() {
    return new s(61992, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Outbound() {
    return new s(57802, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Outbox() {
    return new s(61279, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get OutdoorGrill() {
    return new s(59975, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get OutgoingMail() {
    return new s(61650, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Outlet() {
    return new s(61908, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get OutlinedFlag() {
    return new s(57710, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Output() {
    return new s(60350, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Padding() {
    return new s(59848, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Pages() {
    return new s(59385, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Pageview() {
    return new s(59552, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Paid() {
    return new s(61505, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Palette() {
    return new s(58378, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PanTool() {
    return new s(59685, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PanToolAlt() {
    return new s(60345, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Panorama() {
    return new s(58379, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PanoramaFishEye() {
    return new s(58380, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PanoramaFisheye() {
    return new s(58380, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PanoramaHorizontal() {
    return new s(58381, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PanoramaHorizontalSelect() {
    return new s(61280, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PanoramaPhotosphere() {
    return new s(59849, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PanoramaPhotosphereSelect() {
    return new s(59850, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PanoramaVertical() {
    return new s(58382, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PanoramaVerticalSelect() {
    return new s(61281, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PanoramaWideAngle() {
    return new s(58383, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PanoramaWideAngleSelect() {
    return new s(61282, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Paragliding() {
    return new s(58639, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Park() {
    return new s(60003, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PartyMode() {
    return new s(59386, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Password() {
    return new s(61506, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Pattern() {
    return new s(61507, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Pause() {
    return new s(57396, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PauseCircle() {
    return new s(57762, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PauseCircleFilled() {
    return new s(57397, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PauseCircleOutline() {
    return new s(57398, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PausePresentation() {
    return new s(57578, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Payment() {
    return new s(59553, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Payments() {
    return new s(61283, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Paypal() {
    return new s(60045, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PedalBike() {
    return new s(60201, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Pending() {
    return new s(61284, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PendingActions() {
    return new s(61883, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Pentagon() {
    return new s(60240, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get People() {
    return new s(59387, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PeopleAlt() {
    return new s(59937, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PeopleOutline() {
    return new s(59388, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Percent() {
    return new s(60248, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PermCameraMic() {
    return new s(59554, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PermContactCal() {
    return new s(59555, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PermContactCalendar() {
    return new s(59555, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PermDataSetting() {
    return new s(59556, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PermDeviceInfo() {
    return new s(59557, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PermDeviceInformation() {
    return new s(59557, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PermIdentity() {
    return new s(59558, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PermMedia() {
    return new s(59559, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PermPhoneMsg() {
    return new s(59560, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PermScanWifi() {
    return new s(59561, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Person() {
    return new s(59389, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PersonAdd() {
    return new s(59390, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PersonAddAlt() {
    return new s(59981, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PersonAddAlt1() {
    return new s(61285, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PersonAddDisabled() {
    return new s(59851, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PersonOff() {
    return new s(58640, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PersonOutline() {
    return new s(59391, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PersonPin() {
    return new s(58714, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PersonPinCircle() {
    return new s(58730, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PersonRemove() {
    return new s(61286, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PersonRemoveAlt1() {
    return new s(61287, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PersonSearch() {
    return new s(61702, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PersonalInjury() {
    return new s(59098, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PersonalVideo() {
    return new s(58939, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PestControl() {
    return new s(61690, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PestControlRodent() {
    return new s(61693, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Pets() {
    return new s(59677, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Phishing() {
    return new s(60119, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Phone() {
    return new s(57549, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhoneAndroid() {
    return new s(58148, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhoneBluetoothSpeaker() {
    return new s(58907, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhoneCallback() {
    return new s(58953, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhoneDisabled() {
    return new s(59852, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhoneEnabled() {
    return new s(59853, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhoneForwarded() {
    return new s(58908, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhoneInTalk() {
    return new s(58909, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhoneIphone() {
    return new s(58149, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhoneLocked() {
    return new s(58910, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhoneMissed() {
    return new s(58911, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhonePaused() {
    return new s(58912, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Phonelink() {
    return new s(58150, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhonelinkErase() {
    return new s(57563, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhonelinkLock() {
    return new s(57564, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhonelinkOff() {
    return new s(58151, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhonelinkRing() {
    return new s(57565, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhonelinkSetup() {
    return new s(57566, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Photo() {
    return new s(58384, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhotoAlbum() {
    return new s(58385, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhotoCamera() {
    return new s(58386, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhotoCameraBack() {
    return new s(61288, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhotoCameraFront() {
    return new s(61289, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhotoFilter() {
    return new s(58427, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhotoLibrary() {
    return new s(58387, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhotoSizeSelectActual() {
    return new s(58418, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhotoSizeSelectLarge() {
    return new s(58419, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PhotoSizeSelectSmall() {
    return new s(58420, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Php() {
    return new s(60303, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Piano() {
    return new s(58657, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PianoOff() {
    return new s(58656, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PictureAsPdf() {
    return new s(58389, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PictureInPicture() {
    return new s(59562, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PictureInPictureAlt() {
    return new s(59665, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PieChart() {
    return new s(59076, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PieChartOutline() {
    return new s(61508, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PieChartOutlined() {
    return new s(59077, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Pin() {
    return new s(61509, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PinDrop() {
    return new s(58718, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PinEnd() {
    return new s(59239, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PinInvoke() {
    return new s(59235, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Pinch() {
    return new s(60216, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PivotTableChart() {
    return new s(59854, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Pix() {
    return new s(60067, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Place() {
    return new s(58719, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Plagiarism() {
    return new s(59994, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PlayArrow() {
    return new s(57399, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PlayCircle() {
    return new s(57796, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PlayCircleFill() {
    return new s(57400, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PlayCircleFilled() {
    return new s(57400, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PlayCircleOutline() {
    return new s(57401, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PlayDisabled() {
    return new s(61290, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PlayForWork() {
    return new s(59654, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PlayLesson() {
    return new s(61511, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PlaylistAdd() {
    return new s(57403, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PlaylistAddCheck() {
    return new s(57445, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PlaylistAddCheckCircle() {
    return new s(59366, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PlaylistAddCircle() {
    return new s(59365, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PlaylistPlay() {
    return new s(57439, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PlaylistRemove() {
    return new s(60288, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Plumbing() {
    return new s(61703, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PlusOne() {
    return new s(59392, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Podcasts() {
    return new s(61512, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PointOfSale() {
    return new s(61822, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Policy() {
    return new s(59927, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Poll() {
    return new s(59393, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Polyline() {
    return new s(60347, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Polymer() {
    return new s(59563, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Pool() {
    return new s(60232, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PortableWifiOff() {
    return new s(57550, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Portrait() {
    return new s(58390, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PostAdd() {
    return new s(59936, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Power() {
    return new s(58940, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PowerInput() {
    return new s(58166, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PowerOff() {
    return new s(58950, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PowerSettingsNew() {
    return new s(59564, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PrecisionManufacturing() {
    return new s(61513, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PregnantWoman() {
    return new s(59678, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PresentToAll() {
    return new s(57567, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Preview() {
    return new s(61893, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PriceChange() {
    return new s(61514, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PriceCheck() {
    return new s(61515, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Print() {
    return new s(59565, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PrintDisabled() {
    return new s(59855, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PriorityHigh() {
    return new s(58949, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PrivacyTip() {
    return new s(61660, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PrivateConnectivity() {
    return new s(59204, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ProductionQuantityLimits() {
    return new s(57809, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Psychology() {
    return new s(59978, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Public() {
    return new s(59403, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PublicOff() {
    return new s(61898, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Publish() {
    return new s(57941, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PublishedWithChanges() {
    return new s(62002, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PunchClock() {
    return new s(60072, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get PushPin() {
    return new s(61709, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get QrCode() {
    return new s(61291, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get QrCode2() {
    return new s(57354, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get QrCodeScanner() {
    return new s(61958, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get QueryBuilder() {
    return new s(59566, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get QueryStats() {
    return new s(58620, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get QuestionAnswer() {
    return new s(59567, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get QuestionMark() {
    return new s(60299, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Queue() {
    return new s(57404, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get QueueMusic() {
    return new s(57405, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get QueuePlayNext() {
    return new s(57446, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get QuickContactsDialer() {
    return new s(57551, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get QuickContactsMail() {
    return new s(57552, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Quickreply() {
    return new s(61292, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Quiz() {
    return new s(61516, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Quora() {
    return new s(60056, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RMobiledata() {
    return new s(61517, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Radar() {
    return new s(61518, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Radio() {
    return new s(57406, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RadioButtonChecked() {
    return new s(59447, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RadioButtonOff() {
    return new s(59446, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RadioButtonOn() {
    return new s(59447, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RadioButtonUnchecked() {
    return new s(59446, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RailwayAlert() {
    return new s(59857, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RamenDining() {
    return new s(60004, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RampLeft() {
    return new s(60316, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RampRight() {
    return new s(60310, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RateReview() {
    return new s(58720, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RawOff() {
    return new s(61519, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RawOn() {
    return new s(61520, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ReadMore() {
    return new s(61293, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RealEstateAgent() {
    return new s(59194, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Receipt() {
    return new s(59568, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ReceiptLong() {
    return new s(61294, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RecentActors() {
    return new s(57407, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Recommend() {
    return new s(59858, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RecordVoiceOver() {
    return new s(59679, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Rectangle() {
    return new s(60244, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Recycling() {
    return new s(59232, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Reddit() {
    return new s(60064, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Redeem() {
    return new s(59569, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Redo() {
    return new s(57690, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ReduceCapacity() {
    return new s(61980, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Refresh() {
    return new s(58837, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RememberMe() {
    return new s(61521, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Remove() {
    return new s(57691, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RemoveCircle() {
    return new s(57692, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RemoveCircleOutline() {
    return new s(57693, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RemoveDone() {
    return new s(59859, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RemoveFromQueue() {
    return new s(57447, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RemoveModerator() {
    return new s(59860, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RemoveRedEye() {
    return new s(58391, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RemoveShoppingCart() {
    return new s(59688, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Reorder() {
    return new s(59646, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Repeat() {
    return new s(57408, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RepeatOn() {
    return new s(59862, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RepeatOne() {
    return new s(57409, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RepeatOneOn() {
    return new s(59863, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Replay() {
    return new s(57410, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Replay10() {
    return new s(57433, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Replay30() {
    return new s(57434, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Replay5() {
    return new s(57435, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ReplayCircleFilled() {
    return new s(59864, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Reply() {
    return new s(57694, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ReplyAll() {
    return new s(57695, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Report() {
    return new s(57696, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ReportGmailerrorred() {
    return new s(61522, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ReportOff() {
    return new s(57712, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ReportProblem() {
    return new s(59570, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RequestPage() {
    return new s(61996, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RequestQuote() {
    return new s(61878, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ResetTv() {
    return new s(59865, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RestartAlt() {
    return new s(61523, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Restaurant() {
    return new s(58732, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RestaurantMenu() {
    return new s(58721, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Restore() {
    return new s(59571, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RestoreFromTrash() {
    return new s(59704, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RestorePage() {
    return new s(59689, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Reviews() {
    return new s(61524, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RiceBowl() {
    return new s(61941, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RingVolume() {
    return new s(57553, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Rocket() {
    return new s(60325, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RocketLaunch() {
    return new s(60315, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RollerSkating() {
    return new s(60365, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Roofing() {
    return new s(61953, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Room() {
    return new s(59572, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RoomPreferences() {
    return new s(61880, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RoomService() {
    return new s(60233, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Rotate90DegreesCcw() {
    return new s(58392, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Rotate90DegreesCw() {
    return new s(60075, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RotateLeft() {
    return new s(58393, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RotateRight() {
    return new s(58394, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RoundaboutLeft() {
    return new s(60313, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RoundaboutRight() {
    return new s(60323, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RoundedCorner() {
    return new s(59680, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Route() {
    return new s(60109, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Router() {
    return new s(58152, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Rowing() {
    return new s(59681, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RssFeed() {
    return new s(57573, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Rsvp() {
    return new s(61525, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Rtt() {
    return new s(59821, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Rule() {
    return new s(61890, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RuleFolder() {
    return new s(61897, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RunCircle() {
    return new s(61295, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RunningWithErrors() {
    return new s(58653, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get RvHookup() {
    return new s(58946, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SafetyCheck() {
    return new s(60399, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SafetyDivider() {
    return new s(57804, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Sailing() {
    return new s(58626, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Sanitizer() {
    return new s(61981, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Satellite() {
    return new s(58722, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SatelliteAlt() {
    return new s(60218, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Save() {
    return new s(57697, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SaveAlt() {
    return new s(57713, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SaveAs() {
    return new s(60256, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SavedSearch() {
    return new s(59921, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Savings() {
    return new s(58091, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Scale() {
    return new s(60255, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Scanner() {
    return new s(58153, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ScatterPlot() {
    return new s(57960, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Schedule() {
    return new s(59573, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ScheduleSend() {
    return new s(59914, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Schema() {
    return new s(58621, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get School() {
    return new s(59404, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Science() {
    return new s(59979, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Score() {
    return new s(57961, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Scoreboard() {
    return new s(60368, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ScreenLockLandscape() {
    return new s(57790, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ScreenLockPortrait() {
    return new s(57791, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ScreenLockRotation() {
    return new s(57792, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ScreenRotation() {
    return new s(57793, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ScreenRotationAlt() {
    return new s(60398, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ScreenSearchDesktop() {
    return new s(61296, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ScreenShare() {
    return new s(57570, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Screenshot() {
    return new s(61526, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ScubaDiving() {
    return new s(60366, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Sd() {
    return new s(59869, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SdCard() {
    return new s(58915, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SdCardAlert() {
    return new s(61527, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SdStorage() {
    return new s(57794, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Search() {
    return new s(59574, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SearchOff() {
    return new s(60022, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Security() {
    return new s(58154, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SecurityUpdate() {
    return new s(61528, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SecurityUpdateGood() {
    return new s(61529, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SecurityUpdateWarning() {
    return new s(61530, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Segment() {
    return new s(59723, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SelectAll() {
    return new s(57698, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SelfImprovement() {
    return new s(60024, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Sell() {
    return new s(61531, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Send() {
    return new s(57699, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SendAndArchive() {
    return new s(59916, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SendTimeExtension() {
    return new s(60123, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SendToMobile() {
    return new s(61532, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SensorDoor() {
    return new s(61877, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SensorWindow() {
    return new s(61876, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Sensors() {
    return new s(58654, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SensorsOff() {
    return new s(58655, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SentimentDissatisfied() {
    return new s(59409, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SentimentNeutral() {
    return new s(59410, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SentimentSatisfied() {
    return new s(59411, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SentimentSatisfiedAlt() {
    return new s(57581, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SentimentVeryDissatisfied() {
    return new s(59412, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SentimentVerySatisfied() {
    return new s(59413, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SetMeal() {
    return new s(61930, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Settings() {
    return new s(59576, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsAccessibility() {
    return new s(61533, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsApplications() {
    return new s(59577, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsBackupRestore() {
    return new s(59578, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsBluetooth() {
    return new s(59579, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsBrightness() {
    return new s(59581, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsCell() {
    return new s(59580, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsDisplay() {
    return new s(59581, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsEthernet() {
    return new s(59582, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsInputAntenna() {
    return new s(59583, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsInputComponent() {
    return new s(59584, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsInputComposite() {
    return new s(59585, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsInputHdmi() {
    return new s(59586, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsInputSvideo() {
    return new s(59587, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsOverscan() {
    return new s(59588, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsPhone() {
    return new s(59589, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsPower() {
    return new s(59590, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsRemote() {
    return new s(59591, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsSuggest() {
    return new s(61534, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsSystemDaydream() {
    return new s(57795, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SettingsVoice() {
    return new s(59592, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SevereCold() {
    return new s(60371, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Share() {
    return new s(59405, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ShareArrivalTime() {
    return new s(58660, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ShareLocation() {
    return new s(61535, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Shield() {
    return new s(59872, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ShieldMoon() {
    return new s(60073, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Shop() {
    return new s(59593, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Shop2() {
    return new s(57758, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ShopTwo() {
    return new s(59594, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Shopify() {
    return new s(60061, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ShoppingBag() {
    return new s(61900, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ShoppingBasket() {
    return new s(59595, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ShoppingCart() {
    return new s(59596, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ShoppingCartCheckout() {
    return new s(60296, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ShortText() {
    return new s(57953, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Shortcut() {
    return new s(61536, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ShowChart() {
    return new s(59105, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Shower() {
    return new s(61537, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Shuffle() {
    return new s(57411, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ShuffleOn() {
    return new s(59873, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ShutterSpeed() {
    return new s(58429, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Sick() {
    return new s(61984, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignLanguage() {
    return new s(60389, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalCellular0Bar() {
    return new s(61608, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalCellular4Bar() {
    return new s(57800, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalCellularAlt() {
    return new s(57858, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalCellularAlt1Bar() {
    return new s(60383, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalCellularAlt2Bar() {
    return new s(60387, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalCellularConnectedNoInternet0Bar() {
    return new s(61612, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalCellularConnectedNoInternet4Bar() {
    return new s(57805, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalCellularNoSim() {
    return new s(57806, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalCellularNodata() {
    return new s(61538, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalCellularNull() {
    return new s(57807, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalCellularOff() {
    return new s(57808, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalWifi0Bar() {
    return new s(61616, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalWifi4Bar() {
    return new s(57816, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalWifi4BarLock() {
    return new s(57817, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalWifiBad() {
    return new s(61539, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalWifiConnectedNoInternet4() {
    return new s(61540, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalWifiOff() {
    return new s(57818, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalWifiStatusbar4Bar() {
    return new s(61541, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalWifiStatusbarConnectedNoInternet4() {
    return new s(61542, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SignalWifiStatusbarNull() {
    return new s(61543, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Signpost() {
    return new s(60305, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SimCard() {
    return new s(58155, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SimCardAlert() {
    return new s(58916, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SimCardDownload() {
    return new s(61544, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SingleBed() {
    return new s(59976, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Sip() {
    return new s(61545, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Skateboarding() {
    return new s(58641, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SkipNext() {
    return new s(57412, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SkipPrevious() {
    return new s(57413, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Sledding() {
    return new s(58642, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Slideshow() {
    return new s(58395, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SlowMotionVideo() {
    return new s(57448, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SmartButton() {
    return new s(61889, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SmartDisplay() {
    return new s(61546, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SmartScreen() {
    return new s(61547, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SmartToy() {
    return new s(61548, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Smartphone() {
    return new s(58156, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SmokeFree() {
    return new s(60234, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SmokingRooms() {
    return new s(60235, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Sms() {
    return new s(58917, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SmsFailed() {
    return new s(58918, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Snapchat() {
    return new s(60014, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SnippetFolder() {
    return new s(61895, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Snooze() {
    return new s(57414, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Snowboarding() {
    return new s(58643, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Snowing() {
    return new s(59407, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Snowmobile() {
    return new s(58627, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Snowshoeing() {
    return new s(58644, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Soap() {
    return new s(61874, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SocialDistance() {
    return new s(57803, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Sort() {
    return new s(57700, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SortByAlpha() {
    return new s(57427, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Sos() {
    return new s(60407, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SoupKitchen() {
    return new s(59347, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Source() {
    return new s(61892, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get South() {
    return new s(61923, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SouthAmerica() {
    return new s(59364, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SouthEast() {
    return new s(61924, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SouthWest() {
    return new s(61925, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Spa() {
    return new s(60236, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SpaceBar() {
    return new s(57942, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SpaceDashboard() {
    return new s(58987, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SpatialAudio() {
    return new s(60395, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SpatialAudioOff() {
    return new s(60392, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SpatialTracking() {
    return new s(60394, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Speaker() {
    return new s(58157, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SpeakerGroup() {
    return new s(58158, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SpeakerNotes() {
    return new s(59597, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SpeakerNotesOff() {
    return new s(59690, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SpeakerPhone() {
    return new s(57554, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Speed() {
    return new s(59876, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Spellcheck() {
    return new s(59598, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Splitscreen() {
    return new s(61549, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Spoke() {
    return new s(59815, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Sports() {
    return new s(59952, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsBar() {
    return new s(61939, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsBaseball() {
    return new s(59985, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsBasketball() {
    return new s(59942, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsCricket() {
    return new s(59943, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsEsports() {
    return new s(59944, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsFootball() {
    return new s(59945, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsGolf() {
    return new s(59946, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsGymnastics() {
    return new s(60356, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsHandball() {
    return new s(59955, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsHockey() {
    return new s(59947, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsKabaddi() {
    return new s(59956, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsMartialArts() {
    return new s(60137, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsMma() {
    return new s(59948, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsMotorsports() {
    return new s(59949, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsRugby() {
    return new s(59950, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsScore() {
    return new s(61550, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsSoccer() {
    return new s(59951, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsTennis() {
    return new s(59954, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SportsVolleyball() {
    return new s(59953, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Square() {
    return new s(60214, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SquareFoot() {
    return new s(59977, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SsidChart() {
    return new s(60262, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get StackedBarChart() {
    return new s(59878, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get StackedLineChart() {
    return new s(61995, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Stadium() {
    return new s(60304, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Stairs() {
    return new s(61865, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Star() {
    return new s(59448, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get StarBorder() {
    return new s(59450, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get StarBorderPurple500() {
    return new s(61593, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get StarHalf() {
    return new s(59449, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get StarOutline() {
    return new s(61551, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get StarPurple500() {
    return new s(61594, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get StarRate() {
    return new s(61676, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Stars() {
    return new s(59600, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Start() {
    return new s(57481, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get StayCurrentLandscape() {
    return new s(57555, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get StayCurrentPortrait() {
    return new s(57556, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get StayPrimaryLandscape() {
    return new s(57557, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get StayPrimaryPortrait() {
    return new s(57558, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get StickyNote2() {
    return new s(61948, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Stop() {
    return new s(57415, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get StopCircle() {
    return new s(61297, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get StopScreenShare() {
    return new s(57571, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Storage() {
    return new s(57819, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Store() {
    return new s(59601, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get StoreMallDirectory() {
    return new s(58723, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Storefront() {
    return new s(59922, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Storm() {
    return new s(61552, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Straight() {
    return new s(60309, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Straighten() {
    return new s(58396, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Stream() {
    return new s(59881, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Streetview() {
    return new s(58734, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get StrikethroughS() {
    return new s(57943, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Stroller() {
    return new s(61870, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Style() {
    return new s(58397, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SubdirectoryArrowLeft() {
    return new s(58841, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SubdirectoryArrowRight() {
    return new s(58842, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Subject() {
    return new s(59602, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Subscript() {
    return new s(61713, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Subscriptions() {
    return new s(57444, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Subtitles() {
    return new s(57416, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SubtitlesOff() {
    return new s(61298, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Subway() {
    return new s(58735, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Summarize() {
    return new s(61553, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Sunny() {
    return new s(59418, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SunnySnowing() {
    return new s(59417, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Superscript() {
    return new s(61714, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SupervisedUserCircle() {
    return new s(59705, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SupervisorAccount() {
    return new s(59603, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Support() {
    return new s(61299, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SupportAgent() {
    return new s(61666, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Surfing() {
    return new s(58645, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SurroundSound() {
    return new s(57417, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwapCalls() {
    return new s(57559, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwapHoriz() {
    return new s(59604, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwapHorizontalCircle() {
    return new s(59699, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwapVert() {
    return new s(59605, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwapVertCircle() {
    return new s(59606, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwapVerticalCircle() {
    return new s(59606, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Swipe() {
    return new s(59884, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwipeDown() {
    return new s(60243, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwipeDownAlt() {
    return new s(60208, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwipeLeft() {
    return new s(60249, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwipeLeftAlt() {
    return new s(60211, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwipeRight() {
    return new s(60242, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwipeRightAlt() {
    return new s(60246, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwipeUp() {
    return new s(60206, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwipeUpAlt() {
    return new s(60213, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwipeVertical() {
    return new s(60241, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwitchAccessShortcut() {
    return new s(59361, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwitchAccessShortcutAdd() {
    return new s(59362, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwitchAccount() {
    return new s(59885, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwitchCamera() {
    return new s(58398, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwitchLeft() {
    return new s(61905, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwitchRight() {
    return new s(61906, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SwitchVideo() {
    return new s(58399, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Synagogue() {
    return new s(60080, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Sync() {
    return new s(58919, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SyncAlt() {
    return new s(59928, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SyncDisabled() {
    return new s(58920, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SyncLock() {
    return new s(60142, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SyncProblem() {
    return new s(58921, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SystemSecurityUpdate() {
    return new s(61554, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SystemSecurityUpdateGood() {
    return new s(61555, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SystemSecurityUpdateWarning() {
    return new s(61556, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SystemUpdate() {
    return new s(58922, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SystemUpdateAlt() {
    return new s(59607, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get SystemUpdateTv() {
    return new s(59607, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Tab() {
    return new s(59608, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TabUnselected() {
    return new s(59609, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TableBar() {
    return new s(60114, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TableChart() {
    return new s(57957, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TableRestaurant() {
    return new s(60102, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TableRows() {
    return new s(61697, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TableView() {
    return new s(61886, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Tablet() {
    return new s(58159, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TabletAndroid() {
    return new s(58160, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TabletMac() {
    return new s(58161, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Tag() {
    return new s(59887, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TagFaces() {
    return new s(58400, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TakeoutDining() {
    return new s(60020, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TapAndPlay() {
    return new s(58923, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Tapas() {
    return new s(61929, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Task() {
    return new s(61557, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TaskAlt() {
    return new s(58086, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TaxiAlert() {
    return new s(61300, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Telegram() {
    return new s(60011, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TempleBuddhist() {
    return new s(60083, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TempleHindu() {
    return new s(60079, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Terminal() {
    return new s(60302, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Terrain() {
    return new s(58724, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TextDecrease() {
    return new s(60125, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TextFields() {
    return new s(57954, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TextFormat() {
    return new s(57701, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TextIncrease() {
    return new s(60130, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TextRotateUp() {
    return new s(59706, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TextRotateVertical() {
    return new s(59707, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TextRotationAngledown() {
    return new s(59708, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TextRotationAngleup() {
    return new s(59709, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TextRotationDown() {
    return new s(59710, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TextRotationNone() {
    return new s(59711, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TextSnippet() {
    return new s(61894, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Textsms() {
    return new s(57560, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Texture() {
    return new s(58401, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TheaterComedy() {
    return new s(60006, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Theaters() {
    return new s(59610, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Thermostat() {
    return new s(61558, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ThermostatAuto() {
    return new s(61559, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ThumbDown() {
    return new s(59611, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ThumbDownAlt() {
    return new s(59414, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ThumbDownOffAlt() {
    return new s(59890, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ThumbUp() {
    return new s(59612, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ThumbUpAlt() {
    return new s(59415, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ThumbUpOffAlt() {
    return new s(59891, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ThumbsUpDown() {
    return new s(59613, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Thunderstorm() {
    return new s(60379, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Tiktok() {
    return new s(60030, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TimeToLeave() {
    return new s(58924, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Timelapse() {
    return new s(58402, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Timeline() {
    return new s(59682, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Timer() {
    return new s(58405, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Timer10() {
    return new s(58403, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Timer10Select() {
    return new s(61562, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Timer3() {
    return new s(58404, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Timer3Select() {
    return new s(61563, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TimerOff() {
    return new s(58406, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TipsAndUpdates() {
    return new s(59290, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TireRepair() {
    return new s(60360, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Title() {
    return new s(57956, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Toc() {
    return new s(59614, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Today() {
    return new s(59615, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ToggleOff() {
    return new s(59893, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ToggleOn() {
    return new s(59894, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Token() {
    return new s(59941, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Toll() {
    return new s(59616, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Tonality() {
    return new s(58407, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Topic() {
    return new s(61896, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TouchApp() {
    return new s(59667, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Tour() {
    return new s(61301, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Toys() {
    return new s(58162, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TrackChanges() {
    return new s(59617, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Traffic() {
    return new s(58725, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Train() {
    return new s(58736, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Tram() {
    return new s(58737, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TransferWithinAStation() {
    return new s(58738, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Transform() {
    return new s(58408, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Transgender() {
    return new s(58765, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TransitEnterexit() {
    return new s(58745, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Translate() {
    return new s(59618, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TravelExplore() {
    return new s(58075, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TrendingDown() {
    return new s(59619, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TrendingFlat() {
    return new s(59620, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TrendingNeutral() {
    return new s(59620, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TrendingUp() {
    return new s(59621, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TripOrigin() {
    return new s(58747, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Try() {
    return new s(61564, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Tsunami() {
    return new s(60376, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Tty() {
    return new s(61866, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Tune() {
    return new s(58409, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Tungsten() {
    return new s(61565, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TurnLeft() {
    return new s(60326, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TurnRight() {
    return new s(60331, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TurnSharpLeft() {
    return new s(60327, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TurnSharpRight() {
    return new s(60330, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TurnSlightLeft() {
    return new s(60324, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TurnSlightRight() {
    return new s(60314, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TurnedIn() {
    return new s(59622, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TurnedInNot() {
    return new s(59623, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Tv() {
    return new s(58163, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TvOff() {
    return new s(58951, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get TwoWheeler() {
    return new s(59897, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get UTurnLeft() {
    return new s(60321, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get UTurnRight() {
    return new s(60322, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Umbrella() {
    return new s(61869, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Unarchive() {
    return new s(57705, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Undo() {
    return new s(57702, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get UnfoldLess() {
    return new s(58838, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get UnfoldMore() {
    return new s(58839, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Unpublished() {
    return new s(62006, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Unsubscribe() {
    return new s(57579, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Upcoming() {
    return new s(61566, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Update() {
    return new s(59683, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get UpdateDisabled() {
    return new s(57461, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Upgrade() {
    return new s(61691, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Upload() {
    return new s(61595, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get UploadFile() {
    return new s(59900, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Usb() {
    return new s(57824, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get UsbOff() {
    return new s(58618, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Vaccines() {
    return new s(57656, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VapeFree() {
    return new s(60358, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VapingRooms() {
    return new s(60367, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Verified() {
    return new s(61302, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VerifiedUser() {
    return new s(59624, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VerticalAlignBottom() {
    return new s(57944, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VerticalAlignCenter() {
    return new s(57945, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VerticalAlignTop() {
    return new s(57946, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VerticalDistribute() {
    return new s(57462, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VerticalSplit() {
    return new s(59721, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Vibration() {
    return new s(58925, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VideoCall() {
    return new s(57456, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VideoCameraBack() {
    return new s(61567, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VideoCameraFront() {
    return new s(61568, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VideoCollection() {
    return new s(57418, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VideoFile() {
    return new s(60295, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VideoLabel() {
    return new s(57457, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VideoLibrary() {
    return new s(57418, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VideoSettings() {
    return new s(60021, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VideoStable() {
    return new s(61569, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Videocam() {
    return new s(57419, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VideocamOff() {
    return new s(57420, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VideogameAsset() {
    return new s(58168, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VideogameAssetOff() {
    return new s(58624, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewAgenda() {
    return new s(59625, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewArray() {
    return new s(59626, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewCarousel() {
    return new s(59627, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewColumn() {
    return new s(59628, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewComfortable() {
    return new s(58410, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewComfy() {
    return new s(58410, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewComfyAlt() {
    return new s(60275, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewCompact() {
    return new s(58411, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewCompactAlt() {
    return new s(60276, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewCozy() {
    return new s(60277, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewDay() {
    return new s(59629, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewHeadline() {
    return new s(59630, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewInAr() {
    return new s(59902, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewKanban() {
    return new s(60287, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewList() {
    return new s(59631, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewModule() {
    return new s(59632, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewQuilt() {
    return new s(59633, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewSidebar() {
    return new s(61716, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewStream() {
    return new s(59634, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewTimeline() {
    return new s(60293, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ViewWeek() {
    return new s(59635, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Vignette() {
    return new s(58421, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Villa() {
    return new s(58758, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Visibility() {
    return new s(59636, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VisibilityOff() {
    return new s(59637, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VoiceChat() {
    return new s(58926, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VoiceOverOff() {
    return new s(59722, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Voicemail() {
    return new s(57561, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Volcano() {
    return new s(60378, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VolumeDown() {
    return new s(57421, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VolumeDownAlt() {
    return new s(59292, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VolumeMute() {
    return new s(57422, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VolumeOff() {
    return new s(57423, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VolumeUp() {
    return new s(57424, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VolunteerActivism() {
    return new s(60016, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VpnKey() {
    return new s(57562, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VpnKeyOff() {
    return new s(60282, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get VpnLock() {
    return new s(58927, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Vrpano() {
    return new s(61570, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WalletGiftcard() {
    return new s(59638, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WalletMembership() {
    return new s(59639, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WalletTravel() {
    return new s(59640, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Wallpaper() {
    return new s(57788, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Warehouse() {
    return new s(60344, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Warning() {
    return new s(57346, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WarningAmber() {
    return new s(61571, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Wash() {
    return new s(61873, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Watch() {
    return new s(58164, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WatchLater() {
    return new s(59684, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WatchOff() {
    return new s(60131, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Water() {
    return new s(61572, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WaterDamage() {
    return new s(61955, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WaterDrop() {
    return new s(59288, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WaterfallChart() {
    return new s(59904, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Waves() {
    return new s(57718, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WavingHand() {
    return new s(59238, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WbAuto() {
    return new s(58412, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WbCloudy() {
    return new s(58413, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WbIncandescent() {
    return new s(58414, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WbIridescent() {
    return new s(58422, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WbShade() {
    return new s(59905, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WbSunny() {
    return new s(58416, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WbTwighlight() {
    return new s(59906, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WbTwilight() {
    return new s(57798, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Wc() {
    return new s(58941, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Web() {
    return new s(57425, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WebAsset() {
    return new s(57449, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WebAssetOff() {
    return new s(58615, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WebStories() {
    return new s(58773, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Webhook() {
    return new s(60306, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Wechat() {
    return new s(60033, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Weekend() {
    return new s(57707, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get West() {
    return new s(61926, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Whatsapp() {
    return new s(60060, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Whatshot() {
    return new s(59406, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WheelchairPickup() {
    return new s(61867, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WhereToVote() {
    return new s(57719, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Widgets() {
    return new s(57789, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Wifi() {
    return new s(58942, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Wifi1Bar() {
    return new s(58570, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Wifi2Bar() {
    return new s(58585, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WifiCalling() {
    return new s(61303, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WifiCalling3() {
    return new s(61573, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WifiChannel() {
    return new s(60266, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WifiFind() {
    return new s(60209, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WifiLock() {
    return new s(57825, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WifiOff() {
    return new s(58952, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WifiPassword() {
    return new s(60267, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WifiProtectedSetup() {
    return new s(61692, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WifiTethering() {
    return new s(57826, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WifiTetheringError() {
    return new s(60121, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WifiTetheringErrorRounded() {
    return new s(61574, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WifiTetheringOff() {
    return new s(61575, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Window() {
    return new s(61576, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WineBar() {
    return new s(61928, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Woman() {
    return new s(57662, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WooCommerce() {
    return new s(60013, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Wordpress() {
    return new s(60063, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Work() {
    return new s(59641, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WorkOff() {
    return new s(59714, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WorkOutline() {
    return new s(59715, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WorkspacePremium() {
    return new s(59311, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Workspaces() {
    return new s(57760, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WorkspacesFilled() {
    return new s(59917, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WorkspacesOutline() {
    return new s(59919, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WrapText() {
    return new s(57947, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get WrongLocation() {
    return new s(61304, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Wysiwyg() {
    return new s(61891, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get Yard() {
    return new s(61577, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get YoutubeSearchedFor() {
    return new s(59642, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ZoomIn() {
    return new s(59647, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ZoomInMap() {
    return new s(60205, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ZoomOut() {
    return new s(59648, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
  get ZoomOutMap() {
    return new s(58731, e.FontFamily, e.AssemblyName, e.AssetPath);
  }
};
let At = e;
m(At, "FontFamily", "Material Icons"), m(At, "AssemblyName", "PixUI"), m(At, "AssetPath", "MaterialIcons.woff2");
const t = class {
  get N10k() {
    return new s(59729, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N10mp() {
    return new s(59730, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N11mp() {
    return new s(59731, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N123() {
    return new s(60301, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N12mp() {
    return new s(59732, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N13mp() {
    return new s(59733, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N14mp() {
    return new s(59734, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N15mp() {
    return new s(59735, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N16mp() {
    return new s(59736, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N17mp() {
    return new s(59737, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N18mp() {
    return new s(59738, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N19mp() {
    return new s(59739, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N1k() {
    return new s(59740, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N1kPlus() {
    return new s(59741, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N1xMobiledata() {
    return new s(61389, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N20mp() {
    return new s(59742, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N21mp() {
    return new s(59743, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N22mp() {
    return new s(59744, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N23mp() {
    return new s(59745, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N24mp() {
    return new s(59746, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N2k() {
    return new s(59747, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N2kPlus() {
    return new s(59748, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N2mp() {
    return new s(59749, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N30fps() {
    return new s(61390, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N30fpsSelect() {
    return new s(61391, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N360() {
    return new s(58743, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N3dRotation() {
    return new s(59469, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N3gMobiledata() {
    return new s(61392, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N3k() {
    return new s(59750, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N3kPlus() {
    return new s(59751, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N3mp() {
    return new s(59752, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N3p() {
    return new s(61393, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N4gMobiledata() {
    return new s(61394, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N4gPlusMobiledata() {
    return new s(61395, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N4k() {
    return new s(57458, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N4kPlus() {
    return new s(59753, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N4mp() {
    return new s(59754, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N5g() {
    return new s(61240, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N5k() {
    return new s(59755, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N5kPlus() {
    return new s(59756, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N5mp() {
    return new s(59757, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N60fps() {
    return new s(61396, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N60fpsSelect() {
    return new s(61397, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N6FtApart() {
    return new s(61982, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N6k() {
    return new s(59758, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N6kPlus() {
    return new s(59759, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N6mp() {
    return new s(59760, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N7k() {
    return new s(59761, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N7kPlus() {
    return new s(59762, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N7mp() {
    return new s(59763, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N8k() {
    return new s(59764, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N8kPlus() {
    return new s(59765, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N8mp() {
    return new s(59766, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N9k() {
    return new s(59767, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N9kPlus() {
    return new s(59768, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get N9mp() {
    return new s(59769, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Abc() {
    return new s(60308, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AcUnit() {
    return new s(60219, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AccessAlarm() {
    return new s(57744, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AccessAlarms() {
    return new s(57745, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AccessTime() {
    return new s(57746, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AccessTimeFilled() {
    return new s(61398, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Accessibility() {
    return new s(59470, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AccessibilityNew() {
    return new s(59692, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Accessible() {
    return new s(59668, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AccessibleForward() {
    return new s(59700, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AccountBalance() {
    return new s(59471, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AccountBalanceWallet() {
    return new s(59472, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AccountBox() {
    return new s(59473, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AccountCircle() {
    return new s(59475, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AccountTree() {
    return new s(59770, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AdUnits() {
    return new s(61241, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Adb() {
    return new s(58894, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Add() {
    return new s(57669, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddAPhoto() {
    return new s(58425, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddAlarm() {
    return new s(57747, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddAlert() {
    return new s(57347, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddBox() {
    return new s(57670, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddBusiness() {
    return new s(59177, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddCard() {
    return new s(60294, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddChart() {
    return new s(59771, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddCircle() {
    return new s(57671, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddCircleOutline() {
    return new s(57672, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddComment() {
    return new s(57958, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddIcCall() {
    return new s(59772, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddLink() {
    return new s(57720, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddLocation() {
    return new s(58727, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddLocationAlt() {
    return new s(61242, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddModerator() {
    return new s(59773, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddPhotoAlternate() {
    return new s(58430, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddReaction() {
    return new s(57811, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddRoad() {
    return new s(61243, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddShoppingCart() {
    return new s(59476, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddTask() {
    return new s(62010, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddToDrive() {
    return new s(58972, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddToHomeScreen() {
    return new s(57854, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddToPhotos() {
    return new s(58269, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AddToQueue() {
    return new s(57436, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Addchart() {
    return new s(61244, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AdfScanner() {
    return new s(60122, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Adjust() {
    return new s(58270, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AdminPanelSettings() {
    return new s(61245, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Adobe() {
    return new s(60054, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AdsClick() {
    return new s(59234, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Agriculture() {
    return new s(60025, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Air() {
    return new s(61400, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AirlineSeatFlat() {
    return new s(58928, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AirlineSeatFlatAngled() {
    return new s(58929, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AirlineSeatIndividualSuite() {
    return new s(58930, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AirlineSeatLegroomExtra() {
    return new s(58931, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AirlineSeatLegroomNormal() {
    return new s(58932, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AirlineSeatLegroomReduced() {
    return new s(58933, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AirlineSeatReclineExtra() {
    return new s(58934, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AirlineSeatReclineNormal() {
    return new s(58935, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AirlineStops() {
    return new s(59344, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Airlines() {
    return new s(59338, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AirplaneTicket() {
    return new s(61401, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AirplanemodeActive() {
    return new s(57749, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AirplanemodeInactive() {
    return new s(57748, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AirplanemodeOff() {
    return new s(57748, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AirplanemodeOn() {
    return new s(57749, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Airplay() {
    return new s(57429, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AirportShuttle() {
    return new s(60220, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Alarm() {
    return new s(59477, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AlarmAdd() {
    return new s(59478, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AlarmOff() {
    return new s(59479, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AlarmOn() {
    return new s(59480, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Album() {
    return new s(57369, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AlignHorizontalCenter() {
    return new s(57359, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AlignHorizontalLeft() {
    return new s(57357, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AlignHorizontalRight() {
    return new s(57360, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AlignVerticalBottom() {
    return new s(57365, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AlignVerticalCenter() {
    return new s(57361, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AlignVerticalTop() {
    return new s(57356, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AllInbox() {
    return new s(59775, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AllInclusive() {
    return new s(60221, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AllOut() {
    return new s(59659, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AltRoute() {
    return new s(61828, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AlternateEmail() {
    return new s(57574, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AmpStories() {
    return new s(59923, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Analytics() {
    return new s(61246, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Anchor() {
    return new s(61901, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Android() {
    return new s(59481, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Animation() {
    return new s(59164, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Announcement() {
    return new s(59482, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Aod() {
    return new s(61402, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Apartment() {
    return new s(59968, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Api() {
    return new s(61879, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AppBlocking() {
    return new s(61247, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AppRegistration() {
    return new s(61248, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AppSettingsAlt() {
    return new s(61249, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AppShortcut() {
    return new s(60132, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Apple() {
    return new s(60032, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Approval() {
    return new s(59778, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Apps() {
    return new s(58819, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AppsOutage() {
    return new s(59340, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Architecture() {
    return new s(59963, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Archive() {
    return new s(57673, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AreaChart() {
    return new s(59248, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ArrowBack() {
    return new s(58820, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ArrowBackIos() {
    return new s(58848, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ArrowBackIosNew() {
    return new s(58090, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ArrowCircleDown() {
    return new s(61825, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ArrowCircleLeft() {
    return new s(60071, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ArrowCircleRight() {
    return new s(60074, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ArrowCircleUp() {
    return new s(61826, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ArrowDownward() {
    return new s(58843, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ArrowDropDown() {
    return new s(58821, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ArrowDropDownCircle() {
    return new s(58822, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ArrowDropUp() {
    return new s(58823, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ArrowForward() {
    return new s(58824, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ArrowForwardIos() {
    return new s(58849, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ArrowLeft() {
    return new s(58846, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ArrowRight() {
    return new s(58847, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ArrowRightAlt() {
    return new s(59713, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ArrowUpward() {
    return new s(58840, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ArtTrack() {
    return new s(57440, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Article() {
    return new s(61250, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AspectRatio() {
    return new s(59483, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Assessment() {
    return new s(59484, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Assignment() {
    return new s(59485, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AssignmentInd() {
    return new s(59486, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AssignmentLate() {
    return new s(59487, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AssignmentReturn() {
    return new s(59488, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AssignmentReturned() {
    return new s(59489, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AssignmentTurnedIn() {
    return new s(59490, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Assistant() {
    return new s(58271, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AssistantDirection() {
    return new s(59784, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AssistantPhoto() {
    return new s(58272, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AssuredWorkload() {
    return new s(60271, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Atm() {
    return new s(58739, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AttachEmail() {
    return new s(59998, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AttachFile() {
    return new s(57894, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AttachMoney() {
    return new s(57895, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Attachment() {
    return new s(58044, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Attractions() {
    return new s(59986, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Attribution() {
    return new s(61403, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AudioFile() {
    return new s(60290, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Audiotrack() {
    return new s(58273, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AutoAwesome() {
    return new s(58975, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AutoAwesomeMosaic() {
    return new s(58976, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AutoAwesomeMotion() {
    return new s(58977, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AutoDelete() {
    return new s(59980, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AutoFixHigh() {
    return new s(58979, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AutoFixNormal() {
    return new s(58980, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AutoFixOff() {
    return new s(58981, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AutoGraph() {
    return new s(58619, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AutoStories() {
    return new s(58982, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AutofpsSelect() {
    return new s(61404, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Autorenew() {
    return new s(59491, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get AvTimer() {
    return new s(57371, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BabyChangingStation() {
    return new s(61851, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BackHand() {
    return new s(59236, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Backpack() {
    return new s(61852, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Backspace() {
    return new s(57674, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Backup() {
    return new s(59492, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BackupTable() {
    return new s(61251, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Badge() {
    return new s(60007, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BakeryDining() {
    return new s(59987, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Balance() {
    return new s(60150, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Balcony() {
    return new s(58767, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Ballot() {
    return new s(57714, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BarChart() {
    return new s(57963, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BatchPrediction() {
    return new s(61685, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Bathroom() {
    return new s(61405, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Bathtub() {
    return new s(59969, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Battery0Bar() {
    return new s(60380, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Battery1Bar() {
    return new s(60377, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Battery2Bar() {
    return new s(60384, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Battery3Bar() {
    return new s(60381, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Battery4Bar() {
    return new s(60386, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Battery5Bar() {
    return new s(60372, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Battery6Bar() {
    return new s(60370, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BatteryAlert() {
    return new s(57756, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BatteryChargingFull() {
    return new s(57763, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BatteryFull() {
    return new s(57764, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BatterySaver() {
    return new s(61406, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BatteryStd() {
    return new s(57765, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BatteryUnknown() {
    return new s(57766, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BeachAccess() {
    return new s(60222, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Bed() {
    return new s(61407, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BedroomBaby() {
    return new s(61408, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BedroomChild() {
    return new s(61409, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BedroomParent() {
    return new s(61410, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Bedtime() {
    return new s(61252, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BedtimeOff() {
    return new s(60278, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Beenhere() {
    return new s(58669, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Bento() {
    return new s(61940, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BikeScooter() {
    return new s(61253, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Biotech() {
    return new s(59962, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Blender() {
    return new s(61411, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Block() {
    return new s(57675, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Bloodtype() {
    return new s(61412, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Bluetooth() {
    return new s(57767, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BluetoothAudio() {
    return new s(58895, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BluetoothConnected() {
    return new s(57768, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BluetoothDisabled() {
    return new s(57769, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BluetoothDrive() {
    return new s(61413, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BluetoothSearching() {
    return new s(57770, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BlurCircular() {
    return new s(58274, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BlurLinear() {
    return new s(58275, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BlurOff() {
    return new s(58276, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BlurOn() {
    return new s(58277, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Bolt() {
    return new s(59915, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Book() {
    return new s(59493, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BookOnline() {
    return new s(61975, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Bookmark() {
    return new s(59494, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BookmarkAdd() {
    return new s(58776, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BookmarkAdded() {
    return new s(58777, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BookmarkBorder() {
    return new s(59495, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BookmarkOutline() {
    return new s(59495, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BookmarkRemove() {
    return new s(58778, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Bookmarks() {
    return new s(59787, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BorderAll() {
    return new s(57896, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BorderBottom() {
    return new s(57897, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BorderClear() {
    return new s(57898, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BorderColor() {
    return new s(57899, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BorderHorizontal() {
    return new s(57900, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BorderInner() {
    return new s(57901, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BorderLeft() {
    return new s(57902, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BorderOuter() {
    return new s(57903, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BorderRight() {
    return new s(57904, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BorderStyle() {
    return new s(57905, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BorderTop() {
    return new s(57906, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BorderVertical() {
    return new s(57907, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Boy() {
    return new s(60263, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BrandingWatermark() {
    return new s(57451, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BreakfastDining() {
    return new s(59988, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Brightness1() {
    return new s(58278, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Brightness2() {
    return new s(58279, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Brightness3() {
    return new s(58280, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Brightness4() {
    return new s(58281, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Brightness5() {
    return new s(58282, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Brightness6() {
    return new s(58283, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Brightness7() {
    return new s(58284, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BrightnessAuto() {
    return new s(57771, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BrightnessHigh() {
    return new s(57772, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BrightnessLow() {
    return new s(57773, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BrightnessMedium() {
    return new s(57774, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BrokenImage() {
    return new s(58285, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BrowseGallery() {
    return new s(60369, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BrowserNotSupported() {
    return new s(61255, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BrowserUpdated() {
    return new s(59343, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BrunchDining() {
    return new s(60019, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Brush() {
    return new s(58286, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BubbleChart() {
    return new s(59101, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BugReport() {
    return new s(59496, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Build() {
    return new s(59497, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BuildCircle() {
    return new s(61256, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Bungalow() {
    return new s(58769, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BurstMode() {
    return new s(58428, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BusAlert() {
    return new s(59791, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Business() {
    return new s(57519, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get BusinessCenter() {
    return new s(60223, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Cabin() {
    return new s(58761, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Cable() {
    return new s(61414, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Cached() {
    return new s(59498, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Cake() {
    return new s(59369, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Calculate() {
    return new s(59999, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CalendarMonth() {
    return new s(60364, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CalendarToday() {
    return new s(59701, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CalendarViewDay() {
    return new s(59702, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CalendarViewMonth() {
    return new s(61415, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CalendarViewWeek() {
    return new s(61416, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Call() {
    return new s(57520, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CallEnd() {
    return new s(57521, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CallMade() {
    return new s(57522, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CallMerge() {
    return new s(57523, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CallMissed() {
    return new s(57524, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CallMissedOutgoing() {
    return new s(57572, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CallReceived() {
    return new s(57525, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CallSplit() {
    return new s(57526, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CallToAction() {
    return new s(57452, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Camera() {
    return new s(58287, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CameraAlt() {
    return new s(58288, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CameraEnhance() {
    return new s(59644, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CameraFront() {
    return new s(58289, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CameraIndoor() {
    return new s(61417, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CameraOutdoor() {
    return new s(61418, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CameraRear() {
    return new s(58290, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CameraRoll() {
    return new s(58291, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Cameraswitch() {
    return new s(61419, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Campaign() {
    return new s(61257, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Cancel() {
    return new s(58825, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CancelPresentation() {
    return new s(57577, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CancelScheduleSend() {
    return new s(59961, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CandlestickChart() {
    return new s(60116, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CarCrash() {
    return new s(60402, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CarRental() {
    return new s(59989, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CarRepair() {
    return new s(59990, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CardGiftcard() {
    return new s(59638, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CardMembership() {
    return new s(59639, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CardTravel() {
    return new s(59640, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Carpenter() {
    return new s(61944, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Cases() {
    return new s(59794, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Casino() {
    return new s(60224, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Cast() {
    return new s(58119, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CastConnected() {
    return new s(58120, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CastForEducation() {
    return new s(61420, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Castle() {
    return new s(60081, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CatchingPokemon() {
    return new s(58632, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Category() {
    return new s(58740, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Celebration() {
    return new s(60005, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CellTower() {
    return new s(60346, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CellWifi() {
    return new s(57580, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CenterFocusStrong() {
    return new s(58292, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CenterFocusWeak() {
    return new s(58293, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Chair() {
    return new s(61421, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ChairAlt() {
    return new s(61422, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Chalet() {
    return new s(58757, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ChangeCircle() {
    return new s(58087, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ChangeHistory() {
    return new s(59499, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ChargingStation() {
    return new s(61853, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Chat() {
    return new s(57527, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ChatBubble() {
    return new s(57546, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ChatBubbleOutline() {
    return new s(57547, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Check() {
    return new s(58826, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CheckBox() {
    return new s(59444, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CheckBoxOutlineBlank() {
    return new s(59445, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CheckCircle() {
    return new s(59500, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CheckCircleOutline() {
    return new s(59693, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Checklist() {
    return new s(59057, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ChecklistRtl() {
    return new s(59059, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Checkroom() {
    return new s(61854, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ChevronLeft() {
    return new s(58827, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ChevronRight() {
    return new s(58828, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ChildCare() {
    return new s(60225, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ChildFriendly() {
    return new s(60226, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ChromeReaderMode() {
    return new s(59501, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Church() {
    return new s(60078, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Circle() {
    return new s(61258, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CircleNotifications() {
    return new s(59796, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Class() {
    return new s(59502, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CleanHands() {
    return new s(61983, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CleaningServices() {
    return new s(61695, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Clear() {
    return new s(57676, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ClearAll() {
    return new s(57528, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Close() {
    return new s(58829, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CloseFullscreen() {
    return new s(61903, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ClosedCaption() {
    return new s(57372, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ClosedCaptionDisabled() {
    return new s(61916, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ClosedCaptionOff() {
    return new s(59798, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Cloud() {
    return new s(58045, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CloudCircle() {
    return new s(58046, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CloudDone() {
    return new s(58047, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CloudDownload() {
    return new s(58048, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CloudOff() {
    return new s(58049, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CloudQueue() {
    return new s(58050, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CloudSync() {
    return new s(60250, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CloudUpload() {
    return new s(58051, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Co2() {
    return new s(59312, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CoPresent() {
    return new s(60144, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Code() {
    return new s(59503, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CodeOff() {
    return new s(58611, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Coffee() {
    return new s(61423, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CoffeeMaker() {
    return new s(61424, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Collections() {
    return new s(58294, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CollectionsBookmark() {
    return new s(58417, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ColorLens() {
    return new s(58295, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Colorize() {
    return new s(58296, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Comment() {
    return new s(57529, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CommentBank() {
    return new s(59982, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CommentsDisabled() {
    return new s(59298, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Commit() {
    return new s(60149, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Commute() {
    return new s(59712, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Compare() {
    return new s(58297, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CompareArrows() {
    return new s(59669, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CompassCalibration() {
    return new s(58748, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Compost() {
    return new s(59233, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Compress() {
    return new s(59725, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Computer() {
    return new s(58122, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ConfirmationNum() {
    return new s(58936, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ConfirmationNumber() {
    return new s(58936, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ConnectWithoutContact() {
    return new s(61987, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ConnectedTv() {
    return new s(59800, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ConnectingAirports() {
    return new s(59337, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Construction() {
    return new s(59964, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ContactMail() {
    return new s(57552, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ContactPage() {
    return new s(61998, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ContactPhone() {
    return new s(57551, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ContactSupport() {
    return new s(59724, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Contactless() {
    return new s(60017, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Contacts() {
    return new s(57530, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ContentCopy() {
    return new s(61578, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ContentCut() {
    return new s(61579, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ContentPaste() {
    return new s(61592, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ContentPasteGo() {
    return new s(60046, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ContentPasteOff() {
    return new s(58616, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ContentPasteSearch() {
    return new s(60059, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Contrast() {
    return new s(60215, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ControlCamera() {
    return new s(57460, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ControlPoint() {
    return new s(58298, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ControlPointDuplicate() {
    return new s(58299, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Cookie() {
    return new s(60076, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Copy() {
    return new s(61578, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CopyAll() {
    return new s(58092, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Copyright() {
    return new s(59660, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Coronavirus() {
    return new s(61985, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CorporateFare() {
    return new s(61904, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Cottage() {
    return new s(58759, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Countertops() {
    return new s(61943, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Create() {
    return new s(57680, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CreateNewFolder() {
    return new s(58060, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CreditCard() {
    return new s(59504, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CreditCardOff() {
    return new s(58612, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CreditScore() {
    return new s(61425, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Crib() {
    return new s(58760, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CrisisAlert() {
    return new s(60393, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Crop() {
    return new s(58302, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Crop169() {
    return new s(58300, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Crop32() {
    return new s(58301, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Crop54() {
    return new s(58303, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Crop75() {
    return new s(58304, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CropDin() {
    return new s(58305, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CropFree() {
    return new s(58306, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CropLandscape() {
    return new s(58307, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CropOriginal() {
    return new s(58308, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CropPortrait() {
    return new s(58309, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CropRotate() {
    return new s(58423, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CropSquare() {
    return new s(58310, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CrueltyFree() {
    return new s(59289, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Css() {
    return new s(60307, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CurrencyBitcoin() {
    return new s(60357, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CurrencyExchange() {
    return new s(60272, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CurrencyFranc() {
    return new s(60154, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CurrencyLira() {
    return new s(60143, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CurrencyPound() {
    return new s(60145, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CurrencyRuble() {
    return new s(60140, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CurrencyRupee() {
    return new s(60151, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CurrencyYen() {
    return new s(60155, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get CurrencyYuan() {
    return new s(60153, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Cut() {
    return new s(61579, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Cyclone() {
    return new s(60373, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Dangerous() {
    return new s(59802, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DarkMode() {
    return new s(58652, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Dashboard() {
    return new s(59505, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DashboardCustomize() {
    return new s(59803, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DataArray() {
    return new s(60113, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DataExploration() {
    return new s(59247, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DataObject() {
    return new s(60115, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DataSaverOff() {
    return new s(61426, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DataSaverOn() {
    return new s(61427, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DataThresholding() {
    return new s(60319, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DataUsage() {
    return new s(57775, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DateRange() {
    return new s(59670, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Deblur() {
    return new s(60279, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Deck() {
    return new s(59970, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Dehaze() {
    return new s(58311, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Delete() {
    return new s(59506, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DeleteForever() {
    return new s(59691, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DeleteOutline() {
    return new s(59694, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DeleteSweep() {
    return new s(57708, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DeliveryDining() {
    return new s(60018, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DensityLarge() {
    return new s(60329, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DensityMedium() {
    return new s(60318, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DensitySmall() {
    return new s(60328, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DepartureBoard() {
    return new s(58742, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Description() {
    return new s(59507, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Deselect() {
    return new s(60342, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DesignServices() {
    return new s(61706, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DesktopAccessDisabled() {
    return new s(59805, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DesktopMac() {
    return new s(58123, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DesktopWindows() {
    return new s(58124, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Details() {
    return new s(58312, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DeveloperBoard() {
    return new s(58125, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DeveloperBoardOff() {
    return new s(58623, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DeveloperMode() {
    return new s(57776, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DeviceHub() {
    return new s(58165, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DeviceThermostat() {
    return new s(57855, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DeviceUnknown() {
    return new s(58169, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Devices() {
    return new s(57777, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DevicesFold() {
    return new s(60382, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DevicesOther() {
    return new s(58167, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DialerSip() {
    return new s(57531, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Dialpad() {
    return new s(57532, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Diamond() {
    return new s(60117, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Difference() {
    return new s(60285, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Dining() {
    return new s(61428, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DinnerDining() {
    return new s(59991, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Directions() {
    return new s(58670, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirectionsBike() {
    return new s(58671, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirectionsBoat() {
    return new s(58674, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirectionsBoatFilled() {
    return new s(61429, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirectionsBus() {
    return new s(58672, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirectionsBusFilled() {
    return new s(61430, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirectionsCar() {
    return new s(58673, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirectionsCarFilled() {
    return new s(61431, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirectionsFerry() {
    return new s(58674, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirectionsOff() {
    return new s(61711, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirectionsRailway() {
    return new s(58676, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirectionsRailwayFilled() {
    return new s(61432, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirectionsRun() {
    return new s(58726, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirectionsSubway() {
    return new s(58675, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirectionsSubwayFilled() {
    return new s(61433, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirectionsTrain() {
    return new s(58676, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirectionsTransit() {
    return new s(58677, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirectionsTransitFilled() {
    return new s(61434, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirectionsWalk() {
    return new s(58678, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DirtyLens() {
    return new s(61259, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DisabledByDefault() {
    return new s(62e3, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DisabledVisible() {
    return new s(59246, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DiscFull() {
    return new s(58896, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Discord() {
    return new s(60012, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Discount() {
    return new s(60361, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DisplaySettings() {
    return new s(60311, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DndForwardslash() {
    return new s(58897, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Dns() {
    return new s(59509, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DoDisturb() {
    return new s(61580, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DoDisturbAlt() {
    return new s(61581, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DoDisturbOff() {
    return new s(61582, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DoDisturbOn() {
    return new s(61583, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DoNotDisturb() {
    return new s(58898, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DoNotDisturbAlt() {
    return new s(58897, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DoNotDisturbOff() {
    return new s(58947, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DoNotDisturbOn() {
    return new s(58948, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DoNotDisturbOnTotalSilence() {
    return new s(61435, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DoNotStep() {
    return new s(61855, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DoNotTouch() {
    return new s(61872, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Dock() {
    return new s(58126, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DocumentScanner() {
    return new s(58874, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Domain() {
    return new s(59374, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DomainAdd() {
    return new s(60258, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DomainDisabled() {
    return new s(57583, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DomainVerification() {
    return new s(61260, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Done() {
    return new s(59510, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DoneAll() {
    return new s(59511, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DoneOutline() {
    return new s(59695, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DonutLarge() {
    return new s(59671, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DonutSmall() {
    return new s(59672, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DoorBack() {
    return new s(61436, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DoorFront() {
    return new s(61437, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DoorSliding() {
    return new s(61438, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Doorbell() {
    return new s(61439, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DoubleArrow() {
    return new s(59984, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DownhillSkiing() {
    return new s(58633, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Download() {
    return new s(61584, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DownloadDone() {
    return new s(61585, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DownloadForOffline() {
    return new s(61440, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Downloading() {
    return new s(61441, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Drafts() {
    return new s(57681, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DragHandle() {
    return new s(57949, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DragIndicator() {
    return new s(59717, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Draw() {
    return new s(59206, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DriveEta() {
    return new s(58899, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DriveFileMove() {
    return new s(58997, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DriveFileMoveRtl() {
    return new s(59245, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DriveFileRenameOutline() {
    return new s(59810, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DriveFolderUpload() {
    return new s(59811, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Dry() {
    return new s(61875, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DryCleaning() {
    return new s(59992, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Duo() {
    return new s(59813, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Dvr() {
    return new s(57778, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DynamicFeed() {
    return new s(59924, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get DynamicForm() {
    return new s(61887, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EMobiledata() {
    return new s(61442, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Earbuds() {
    return new s(61443, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EarbudsBattery() {
    return new s(61444, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get East() {
    return new s(61919, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Eco() {
    return new s(59957, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EdgesensorHigh() {
    return new s(61445, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EdgesensorLow() {
    return new s(61446, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Edit() {
    return new s(58313, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EditAttributes() {
    return new s(58744, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EditCalendar() {
    return new s(59202, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EditLocation() {
    return new s(58728, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EditLocationAlt() {
    return new s(57797, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EditNote() {
    return new s(59205, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EditNotifications() {
    return new s(58661, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EditOff() {
    return new s(59728, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EditRoad() {
    return new s(61261, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Egg() {
    return new s(60108, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EggAlt() {
    return new s(60104, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Eject() {
    return new s(59643, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Elderly() {
    return new s(61978, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ElderlyWoman() {
    return new s(60265, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ElectricBike() {
    return new s(60187, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ElectricCar() {
    return new s(60188, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ElectricMoped() {
    return new s(60189, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ElectricRickshaw() {
    return new s(60190, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ElectricScooter() {
    return new s(60191, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ElectricalServices() {
    return new s(61698, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Elevator() {
    return new s(61856, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Email() {
    return new s(57534, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Emergency() {
    return new s(57835, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EmergencyRecording() {
    return new s(60404, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EmergencyShare() {
    return new s(60406, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EmojiEmotions() {
    return new s(59938, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EmojiEvents() {
    return new s(59939, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EmojiFlags() {
    return new s(59930, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EmojiFoodBeverage() {
    return new s(59931, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EmojiNature() {
    return new s(59932, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EmojiObjects() {
    return new s(59940, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EmojiPeople() {
    return new s(59933, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EmojiSymbols() {
    return new s(59934, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EmojiTransportation() {
    return new s(59935, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Engineering() {
    return new s(59965, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EnhancePhotoTranslate() {
    return new s(59644, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EnhancedEncryption() {
    return new s(58943, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Equalizer() {
    return new s(57373, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Error() {
    return new s(57344, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ErrorOutline() {
    return new s(57345, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Escalator() {
    return new s(61857, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EscalatorWarning() {
    return new s(61868, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Euro() {
    return new s(59925, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EuroSymbol() {
    return new s(59686, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EvStation() {
    return new s(58733, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Event() {
    return new s(59512, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EventAvailable() {
    return new s(58900, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EventBusy() {
    return new s(58901, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EventNote() {
    return new s(58902, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EventRepeat() {
    return new s(60283, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get EventSeat() {
    return new s(59651, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ExitToApp() {
    return new s(59513, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Expand() {
    return new s(59727, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ExpandCircleDown() {
    return new s(59341, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ExpandLess() {
    return new s(58830, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ExpandMore() {
    return new s(58831, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Explicit() {
    return new s(57374, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Explore() {
    return new s(59514, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ExploreOff() {
    return new s(59816, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Exposure() {
    return new s(58314, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ExposureMinus1() {
    return new s(58315, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ExposureMinus2() {
    return new s(58316, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ExposureNeg1() {
    return new s(58315, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ExposureNeg2() {
    return new s(58316, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ExposurePlus1() {
    return new s(58317, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ExposurePlus2() {
    return new s(58318, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ExposureZero() {
    return new s(58319, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Extension() {
    return new s(59515, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ExtensionOff() {
    return new s(58613, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Face() {
    return new s(59516, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FaceRetouchingNatural() {
    return new s(61262, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FaceRetouchingOff() {
    return new s(61447, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FaceUnlock() {
    return new s(61448, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Facebook() {
    return new s(62004, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FactCheck() {
    return new s(61637, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Factory() {
    return new s(60348, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FamilyRestroom() {
    return new s(61858, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FastForward() {
    return new s(57375, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FastRewind() {
    return new s(57376, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Fastfood() {
    return new s(58746, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Favorite() {
    return new s(59517, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FavoriteBorder() {
    return new s(59518, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FavoriteOutline() {
    return new s(59518, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Fax() {
    return new s(60120, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FeaturedPlayList() {
    return new s(57453, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FeaturedVideo() {
    return new s(57454, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Feed() {
    return new s(61449, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Feedback() {
    return new s(59519, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Female() {
    return new s(58768, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Fence() {
    return new s(61942, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Festival() {
    return new s(60008, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FiberDvr() {
    return new s(57437, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FiberManualRecord() {
    return new s(57441, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FiberNew() {
    return new s(57438, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FiberPin() {
    return new s(57450, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FiberSmartRecord() {
    return new s(57442, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FileCopy() {
    return new s(57715, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FileDownload() {
    return new s(58052, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FileDownloadDone() {
    return new s(59818, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FileDownloadOff() {
    return new s(58622, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FileOpen() {
    return new s(60147, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FilePresent() {
    return new s(59918, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FileUpload() {
    return new s(58054, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Filter() {
    return new s(58323, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Filter1() {
    return new s(58320, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Filter2() {
    return new s(58321, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Filter3() {
    return new s(58322, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Filter4() {
    return new s(58324, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Filter5() {
    return new s(58325, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Filter6() {
    return new s(58326, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Filter7() {
    return new s(58327, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Filter8() {
    return new s(58328, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Filter9() {
    return new s(58329, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Filter9Plus() {
    return new s(58330, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FilterAlt() {
    return new s(61263, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FilterAltOff() {
    return new s(60210, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FilterBAndW() {
    return new s(58331, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FilterCenterFocus() {
    return new s(58332, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FilterDrama() {
    return new s(58333, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FilterFrames() {
    return new s(58334, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FilterHdr() {
    return new s(58335, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FilterList() {
    return new s(57682, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FilterListOff() {
    return new s(60247, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FilterNone() {
    return new s(58336, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FilterTiltShift() {
    return new s(58338, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FilterVintage() {
    return new s(58339, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FindInPage() {
    return new s(59520, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FindReplace() {
    return new s(59521, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Fingerprint() {
    return new s(59661, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FireExtinguisher() {
    return new s(61912, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Fireplace() {
    return new s(59971, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FirstPage() {
    return new s(58844, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FitScreen() {
    return new s(59920, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Fitbit() {
    return new s(59435, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FitnessCenter() {
    return new s(60227, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Flag() {
    return new s(57683, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FlagCircle() {
    return new s(60152, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Flaky() {
    return new s(61264, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Flare() {
    return new s(58340, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FlashAuto() {
    return new s(58341, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FlashOff() {
    return new s(58342, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FlashOn() {
    return new s(58343, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FlashlightOff() {
    return new s(61450, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FlashlightOn() {
    return new s(61451, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Flatware() {
    return new s(61452, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Flight() {
    return new s(58681, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FlightClass() {
    return new s(59339, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FlightLand() {
    return new s(59652, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FlightTakeoff() {
    return new s(59653, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Flip() {
    return new s(58344, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FlipCameraAndroid() {
    return new s(59959, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FlipCameraIos() {
    return new s(59960, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FlipToBack() {
    return new s(59522, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FlipToFront() {
    return new s(59523, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Flood() {
    return new s(60390, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Flourescent() {
    return new s(61453, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FlutterDash() {
    return new s(57355, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FmdBad() {
    return new s(61454, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FmdGood() {
    return new s(61455, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Folder() {
    return new s(58055, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FolderCopy() {
    return new s(60349, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FolderDelete() {
    return new s(60212, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FolderOff() {
    return new s(60291, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FolderOpen() {
    return new s(58056, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FolderShared() {
    return new s(58057, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FolderSpecial() {
    return new s(58903, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FolderZip() {
    return new s(60204, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FollowTheSigns() {
    return new s(61986, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FontDownload() {
    return new s(57703, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FontDownloadOff() {
    return new s(58617, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FoodBank() {
    return new s(61938, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Forest() {
    return new s(60057, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ForkLeft() {
    return new s(60320, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ForkRight() {
    return new s(60332, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatAlignCenter() {
    return new s(57908, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatAlignJustify() {
    return new s(57909, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatAlignLeft() {
    return new s(57910, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatAlignRight() {
    return new s(57911, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatBold() {
    return new s(57912, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatClear() {
    return new s(57913, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatColorFill() {
    return new s(57914, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatColorReset() {
    return new s(57915, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatColorText() {
    return new s(57916, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatIndentDecrease() {
    return new s(57917, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatIndentIncrease() {
    return new s(57918, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatItalic() {
    return new s(57919, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatLineSpacing() {
    return new s(57920, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatListBulleted() {
    return new s(57921, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatListNumbered() {
    return new s(57922, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatListNumberedRtl() {
    return new s(57959, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatOverline() {
    return new s(60261, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatPaint() {
    return new s(57923, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatQuote() {
    return new s(57924, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatShapes() {
    return new s(57950, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatSize() {
    return new s(57925, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatStrikethrough() {
    return new s(57926, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatTextdirectionLToR() {
    return new s(57927, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatTextdirectionRToL() {
    return new s(57928, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatUnderline() {
    return new s(59237, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FormatUnderlined() {
    return new s(59237, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Fort() {
    return new s(60077, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Forum() {
    return new s(57535, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Forward() {
    return new s(57684, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Forward10() {
    return new s(57430, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Forward30() {
    return new s(57431, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Forward5() {
    return new s(57432, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ForwardToInbox() {
    return new s(61831, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Foundation() {
    return new s(61952, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FreeBreakfast() {
    return new s(60228, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FreeCancellation() {
    return new s(59208, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FrontHand() {
    return new s(59241, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Fullscreen() {
    return new s(58832, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get FullscreenExit() {
    return new s(58833, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Functions() {
    return new s(57930, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GMobiledata() {
    return new s(61456, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GTranslate() {
    return new s(59687, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Gamepad() {
    return new s(58127, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Games() {
    return new s(57377, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Garage() {
    return new s(61457, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Gavel() {
    return new s(59662, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GeneratingTokens() {
    return new s(59209, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Gesture() {
    return new s(57685, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GetApp() {
    return new s(59524, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Gif() {
    return new s(59656, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GifBox() {
    return new s(59299, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Girl() {
    return new s(60264, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Gite() {
    return new s(58763, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GolfCourse() {
    return new s(60229, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GppBad() {
    return new s(61458, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GppGood() {
    return new s(61459, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GppMaybe() {
    return new s(61460, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GpsFixed() {
    return new s(57779, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GpsNotFixed() {
    return new s(57780, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GpsOff() {
    return new s(57781, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Grade() {
    return new s(59525, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Gradient() {
    return new s(58345, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Grading() {
    return new s(59983, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Grain() {
    return new s(58346, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GraphicEq() {
    return new s(57784, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Grass() {
    return new s(61957, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Grid3x3() {
    return new s(61461, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Grid4x4() {
    return new s(61462, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GridGoldenratio() {
    return new s(61463, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GridOff() {
    return new s(58347, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GridOn() {
    return new s(58348, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GridView() {
    return new s(59824, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Group() {
    return new s(59375, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GroupAdd() {
    return new s(59376, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GroupOff() {
    return new s(59207, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GroupRemove() {
    return new s(59309, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get GroupWork() {
    return new s(59526, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Groups() {
    return new s(62003, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HMobiledata() {
    return new s(61464, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HPlusMobiledata() {
    return new s(61465, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Hail() {
    return new s(59825, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Handshake() {
    return new s(60363, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Handyman() {
    return new s(61707, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Hardware() {
    return new s(59993, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Hd() {
    return new s(57426, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HdrAuto() {
    return new s(61466, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HdrAutoSelect() {
    return new s(61467, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HdrEnhancedSelect() {
    return new s(61265, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HdrOff() {
    return new s(58349, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HdrOffSelect() {
    return new s(61468, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HdrOn() {
    return new s(58350, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HdrOnSelect() {
    return new s(61469, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HdrPlus() {
    return new s(61470, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HdrStrong() {
    return new s(58353, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HdrWeak() {
    return new s(58354, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Headphones() {
    return new s(61471, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HeadphonesBattery() {
    return new s(61472, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Headset() {
    return new s(58128, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HeadsetMic() {
    return new s(58129, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HeadsetOff() {
    return new s(58170, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Healing() {
    return new s(58355, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HealthAndSafety() {
    return new s(57813, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Hearing() {
    return new s(57379, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HearingDisabled() {
    return new s(61700, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HeartBroken() {
    return new s(60098, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Height() {
    return new s(59926, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Help() {
    return new s(59527, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HelpCenter() {
    return new s(61888, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HelpOutline() {
    return new s(59645, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Hevc() {
    return new s(61473, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Hexagon() {
    return new s(60217, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HideImage() {
    return new s(61474, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HideSource() {
    return new s(61475, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HighQuality() {
    return new s(57380, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Highlight() {
    return new s(57951, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HighlightAlt() {
    return new s(61266, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HighlightOff() {
    return new s(59528, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HighlightRemove() {
    return new s(59528, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Hiking() {
    return new s(58634, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get History() {
    return new s(59529, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HistoryEdu() {
    return new s(59966, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HistoryToggleOff() {
    return new s(61821, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Hive() {
    return new s(60070, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Hls() {
    return new s(60298, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HlsOff() {
    return new s(60300, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HolidayVillage() {
    return new s(58762, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Home() {
    return new s(59530, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HomeMax() {
    return new s(61476, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HomeMini() {
    return new s(61477, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HomeRepairService() {
    return new s(61696, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HomeWork() {
    return new s(59913, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HorizontalDistribute() {
    return new s(57364, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HorizontalRule() {
    return new s(61704, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HorizontalSplit() {
    return new s(59719, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HotTub() {
    return new s(60230, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Hotel() {
    return new s(58682, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HotelClass() {
    return new s(59203, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HourglassBottom() {
    return new s(59996, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HourglassDisabled() {
    return new s(61267, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HourglassEmpty() {
    return new s(59531, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HourglassFull() {
    return new s(59532, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HourglassTop() {
    return new s(59995, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get House() {
    return new s(59972, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HouseSiding() {
    return new s(61954, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Houseboat() {
    return new s(58756, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HowToReg() {
    return new s(57716, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get HowToVote() {
    return new s(57717, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Html() {
    return new s(60286, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Http() {
    return new s(59650, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Https() {
    return new s(59533, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Hub() {
    return new s(59892, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Hvac() {
    return new s(61710, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get IceSkating() {
    return new s(58635, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Icecream() {
    return new s(60009, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Image() {
    return new s(58356, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ImageAspectRatio() {
    return new s(58357, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ImageNotSupported() {
    return new s(61718, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ImageSearch() {
    return new s(58431, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ImagesearchRoller() {
    return new s(59828, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ImportContacts() {
    return new s(57568, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ImportExport() {
    return new s(57539, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ImportantDevices() {
    return new s(59666, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Inbox() {
    return new s(57686, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get IncompleteCircle() {
    return new s(59291, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get IndeterminateCheckBox() {
    return new s(59657, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Info() {
    return new s(59534, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Input() {
    return new s(59536, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get InsertChart() {
    return new s(57931, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get InsertChartOutlined() {
    return new s(57962, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get InsertComment() {
    return new s(57932, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get InsertDriveFile() {
    return new s(57933, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get InsertEmoticon() {
    return new s(57934, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get InsertInvitation() {
    return new s(57935, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get InsertLink() {
    return new s(57936, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get InsertPageBreak() {
    return new s(60106, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get InsertPhoto() {
    return new s(57937, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Insights() {
    return new s(61586, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get InstallDesktop() {
    return new s(60273, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get InstallMobile() {
    return new s(60274, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get IntegrationInstructions() {
    return new s(61268, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Interests() {
    return new s(59336, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get InterpreterMode() {
    return new s(59451, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Inventory() {
    return new s(57721, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Inventory2() {
    return new s(57761, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get InvertColors() {
    return new s(59537, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get InvertColorsOff() {
    return new s(57540, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get InvertColorsOn() {
    return new s(59537, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get IosShare() {
    return new s(59064, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Iron() {
    return new s(58755, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Iso() {
    return new s(58358, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Javascript() {
    return new s(60284, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get JoinFull() {
    return new s(60139, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get JoinInner() {
    return new s(60148, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get JoinLeft() {
    return new s(60146, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get JoinRight() {
    return new s(60138, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Kayaking() {
    return new s(58636, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KebabDining() {
    return new s(59458, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Key() {
    return new s(59196, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyOff() {
    return new s(60292, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Keyboard() {
    return new s(58130, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardAlt() {
    return new s(61480, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardArrowDown() {
    return new s(58131, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardArrowLeft() {
    return new s(58132, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardArrowRight() {
    return new s(58133, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardArrowUp() {
    return new s(58134, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardBackspace() {
    return new s(58135, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardCapslock() {
    return new s(58136, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardCommandKey() {
    return new s(60135, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardControl() {
    return new s(60129, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardControlKey() {
    return new s(60134, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardDoubleArrowDown() {
    return new s(60112, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardDoubleArrowLeft() {
    return new s(60099, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardDoubleArrowRight() {
    return new s(60105, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardDoubleArrowUp() {
    return new s(60111, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardHide() {
    return new s(58138, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardOptionKey() {
    return new s(60136, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardReturn() {
    return new s(58139, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardTab() {
    return new s(58140, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KeyboardVoice() {
    return new s(58141, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get KingBed() {
    return new s(59973, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Kitchen() {
    return new s(60231, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Kitesurfing() {
    return new s(58637, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Label() {
    return new s(59538, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LabelImportant() {
    return new s(59703, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LabelOff() {
    return new s(59830, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Lan() {
    return new s(60207, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Landscape() {
    return new s(58359, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Landslide() {
    return new s(60375, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Language() {
    return new s(59540, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Laptop() {
    return new s(58142, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LaptopChromebook() {
    return new s(58143, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LaptopMac() {
    return new s(58144, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LaptopWindows() {
    return new s(58145, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LastPage() {
    return new s(58845, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Launch() {
    return new s(59541, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Layers() {
    return new s(58683, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LayersClear() {
    return new s(58684, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Leaderboard() {
    return new s(61964, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LeakAdd() {
    return new s(58360, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LeakRemove() {
    return new s(58361, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LeaveBagsAtHome() {
    return new s(62011, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LegendToggle() {
    return new s(61723, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Lens() {
    return new s(58362, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LensBlur() {
    return new s(61481, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LibraryAdd() {
    return new s(57390, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LibraryAddCheck() {
    return new s(59831, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LibraryBooks() {
    return new s(57391, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LibraryMusic() {
    return new s(57392, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Light() {
    return new s(61482, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LightMode() {
    return new s(58648, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Lightbulb() {
    return new s(57584, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LineAxis() {
    return new s(60058, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LineStyle() {
    return new s(59673, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LineWeight() {
    return new s(59674, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LinearScale() {
    return new s(57952, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Link() {
    return new s(57687, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LinkOff() {
    return new s(57711, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LinkedCamera() {
    return new s(58424, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Liquor() {
    return new s(6e4, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get List() {
    return new s(59542, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ListAlt() {
    return new s(57582, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LiveHelp() {
    return new s(57542, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LiveTv() {
    return new s(58937, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Living() {
    return new s(61483, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalActivity() {
    return new s(58687, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalAirport() {
    return new s(58685, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalAtm() {
    return new s(58686, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalAttraction() {
    return new s(58687, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalBar() {
    return new s(58688, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalCafe() {
    return new s(58689, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalCarWash() {
    return new s(58690, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalConvenienceStore() {
    return new s(58691, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalDining() {
    return new s(58710, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalDrink() {
    return new s(58692, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalFireDepartment() {
    return new s(61269, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalFlorist() {
    return new s(58693, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalGasStation() {
    return new s(58694, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalGroceryStore() {
    return new s(58695, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalHospital() {
    return new s(58696, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalHotel() {
    return new s(58697, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalLaundryService() {
    return new s(58698, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalLibrary() {
    return new s(58699, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalMall() {
    return new s(58700, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalMovies() {
    return new s(58701, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalOffer() {
    return new s(58702, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalParking() {
    return new s(58703, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalPharmacy() {
    return new s(58704, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalPhone() {
    return new s(58705, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalPizza() {
    return new s(58706, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalPlay() {
    return new s(58707, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalPolice() {
    return new s(61270, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalPostOffice() {
    return new s(58708, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalPrintShop() {
    return new s(58709, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalPrintshop() {
    return new s(58709, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalRestaurant() {
    return new s(58710, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalSee() {
    return new s(58711, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalShipping() {
    return new s(58712, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocalTaxi() {
    return new s(58713, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocationCity() {
    return new s(59377, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocationDisabled() {
    return new s(57782, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocationHistory() {
    return new s(58714, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocationOff() {
    return new s(57543, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocationOn() {
    return new s(57544, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LocationSearching() {
    return new s(57783, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Lock() {
    return new s(59543, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LockClock() {
    return new s(61271, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LockOpen() {
    return new s(59544, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LockReset() {
    return new s(60126, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Login() {
    return new s(60023, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LogoDev() {
    return new s(60118, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Logout() {
    return new s(59834, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Looks() {
    return new s(58364, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Looks3() {
    return new s(58363, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Looks4() {
    return new s(58365, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Looks5() {
    return new s(58366, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Looks6() {
    return new s(58367, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LooksOne() {
    return new s(58368, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LooksTwo() {
    return new s(58369, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Loop() {
    return new s(57384, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Loupe() {
    return new s(58370, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LowPriority() {
    return new s(57709, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Loyalty() {
    return new s(59546, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LteMobiledata() {
    return new s(61484, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LtePlusMobiledata() {
    return new s(61485, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Luggage() {
    return new s(62005, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get LunchDining() {
    return new s(60001, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Mail() {
    return new s(57688, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MailOutline() {
    return new s(57569, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Male() {
    return new s(58766, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Man() {
    return new s(58603, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ManageAccounts() {
    return new s(61486, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ManageHistory() {
    return new s(60391, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ManageSearch() {
    return new s(61487, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Map() {
    return new s(58715, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MapsHomeWork() {
    return new s(61488, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MapsUgc() {
    return new s(61272, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Margin() {
    return new s(59835, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MarkAsUnread() {
    return new s(59836, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MarkChatRead() {
    return new s(61835, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MarkChatUnread() {
    return new s(61833, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MarkEmailRead() {
    return new s(61836, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MarkEmailUnread() {
    return new s(61834, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MarkUnreadChatAlt() {
    return new s(60317, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Markunread() {
    return new s(57689, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MarkunreadMailbox() {
    return new s(59547, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Masks() {
    return new s(61976, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Maximize() {
    return new s(59696, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MediaBluetoothOff() {
    return new s(61489, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MediaBluetoothOn() {
    return new s(61490, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Mediation() {
    return new s(61351, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MedicalInformation() {
    return new s(60397, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MedicalServices() {
    return new s(61705, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Medication() {
    return new s(61491, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MedicationLiquid() {
    return new s(60039, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MeetingRoom() {
    return new s(60239, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Memory() {
    return new s(58146, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Menu() {
    return new s(58834, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MenuBook() {
    return new s(59929, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MenuOpen() {
    return new s(59837, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Merge() {
    return new s(60312, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MergeType() {
    return new s(57938, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Message() {
    return new s(57545, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Messenger() {
    return new s(57546, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MessengerOutline() {
    return new s(57547, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Mic() {
    return new s(57385, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MicExternalOff() {
    return new s(61273, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MicExternalOn() {
    return new s(61274, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MicNone() {
    return new s(57386, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MicOff() {
    return new s(57387, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Microwave() {
    return new s(61956, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MilitaryTech() {
    return new s(59967, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Minimize() {
    return new s(59697, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MinorCrash() {
    return new s(60401, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MiscellaneousServices() {
    return new s(61708, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MissedVideoCall() {
    return new s(57459, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Mms() {
    return new s(58904, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MobileFriendly() {
    return new s(57856, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MobileOff() {
    return new s(57857, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MobileScreenShare() {
    return new s(57575, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MobiledataOff() {
    return new s(61492, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Mode() {
    return new s(61591, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ModeComment() {
    return new s(57939, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ModeEdit() {
    return new s(57940, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ModeEditOutline() {
    return new s(61493, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ModeNight() {
    return new s(61494, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ModeOfTravel() {
    return new s(59342, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ModeStandby() {
    return new s(61495, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ModelTraining() {
    return new s(61647, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MonetizationOn() {
    return new s(57955, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Money() {
    return new s(58749, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MoneyOff() {
    return new s(57948, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MoneyOffCsred() {
    return new s(61496, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Monitor() {
    return new s(61275, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MonitorHeart() {
    return new s(60066, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MonitorWeight() {
    return new s(61497, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MonochromePhotos() {
    return new s(58371, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Mood() {
    return new s(59378, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MoodBad() {
    return new s(59379, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Moped() {
    return new s(60200, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get More() {
    return new s(58905, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MoreHoriz() {
    return new s(60129, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MoreTime() {
    return new s(59997, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MoreVert() {
    return new s(58836, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Mosque() {
    return new s(60082, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MotionPhotosAuto() {
    return new s(61498, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MotionPhotosOff() {
    return new s(59840, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MotionPhotosOn() {
    return new s(59841, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MotionPhotosPause() {
    return new s(61991, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MotionPhotosPaused() {
    return new s(59842, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Motorcycle() {
    return new s(59675, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Mouse() {
    return new s(58147, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MoveDown() {
    return new s(60257, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MoveToInbox() {
    return new s(57704, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MoveUp() {
    return new s(60260, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Movie() {
    return new s(57388, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MovieCreation() {
    return new s(58372, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MovieFilter() {
    return new s(58426, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Moving() {
    return new s(58625, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Mp() {
    return new s(59843, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MultilineChart() {
    return new s(59103, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MultipleStop() {
    return new s(61881, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MultitrackAudio() {
    return new s(57784, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Museum() {
    return new s(59958, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MusicNote() {
    return new s(58373, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MusicOff() {
    return new s(58432, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MusicVideo() {
    return new s(57443, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MyLibraryAdd() {
    return new s(57390, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MyLibraryBooks() {
    return new s(57391, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MyLibraryMusic() {
    return new s(57392, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get MyLocation() {
    return new s(58716, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Nat() {
    return new s(61276, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Nature() {
    return new s(58374, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NaturePeople() {
    return new s(58375, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NavigateBefore() {
    return new s(58376, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NavigateNext() {
    return new s(58377, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Navigation() {
    return new s(58717, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NearMe() {
    return new s(58729, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NearMeDisabled() {
    return new s(61935, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NearbyError() {
    return new s(61499, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NearbyOff() {
    return new s(61500, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NetworkCell() {
    return new s(57785, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NetworkCheck() {
    return new s(58944, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NetworkLocked() {
    return new s(58906, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NetworkPing() {
    return new s(60362, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NetworkWifi() {
    return new s(57786, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NetworkWifi1Bar() {
    return new s(60388, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NetworkWifi2Bar() {
    return new s(60374, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NetworkWifi3Bar() {
    return new s(60385, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NewLabel() {
    return new s(58889, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NewReleases() {
    return new s(57393, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Newspaper() {
    return new s(60289, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NextPlan() {
    return new s(61277, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NextWeek() {
    return new s(57706, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Nfc() {
    return new s(57787, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NightShelter() {
    return new s(61937, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Nightlife() {
    return new s(60002, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Nightlight() {
    return new s(61501, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NightlightRound() {
    return new s(61278, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NightsStay() {
    return new s(59974, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoAccounts() {
    return new s(61502, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoBackpack() {
    return new s(62007, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoCell() {
    return new s(61860, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoCrash() {
    return new s(60400, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoDrinks() {
    return new s(61861, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoEncryption() {
    return new s(58945, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoEncryptionGmailerrorred() {
    return new s(61503, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoFlash() {
    return new s(61862, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoFood() {
    return new s(61863, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoLuggage() {
    return new s(62011, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoMeals() {
    return new s(61910, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoMeetingRoom() {
    return new s(60238, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoPhotography() {
    return new s(61864, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoSim() {
    return new s(57548, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoStroller() {
    return new s(61871, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoTransfer() {
    return new s(61909, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoiseAware() {
    return new s(60396, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoiseControlOff() {
    return new s(60403, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NordicWalking() {
    return new s(58638, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get North() {
    return new s(61920, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NorthEast() {
    return new s(61921, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NorthWest() {
    return new s(61922, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NotAccessible() {
    return new s(61694, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NotInterested() {
    return new s(57395, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NotListedLocation() {
    return new s(58741, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NotStarted() {
    return new s(61649, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Note() {
    return new s(57455, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoteAdd() {
    return new s(59548, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NoteAlt() {
    return new s(61504, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Notes() {
    return new s(57964, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NotificationAdd() {
    return new s(58265, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NotificationImportant() {
    return new s(57348, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Notifications() {
    return new s(59380, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NotificationsActive() {
    return new s(59383, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NotificationsNone() {
    return new s(59381, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NotificationsOff() {
    return new s(59382, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NotificationsOn() {
    return new s(59383, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NotificationsPaused() {
    return new s(59384, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NowWallpaper() {
    return new s(59231, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get NowWidgets() {
    return new s(59230, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Numbers() {
    return new s(60103, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get OfflineBolt() {
    return new s(59698, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get OfflinePin() {
    return new s(59658, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get OfflineShare() {
    return new s(59845, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get OndemandVideo() {
    return new s(58938, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get OnlinePrediction() {
    return new s(61675, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Opacity() {
    return new s(59676, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get OpenInBrowser() {
    return new s(59549, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get OpenInFull() {
    return new s(61902, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get OpenInNew() {
    return new s(59550, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get OpenInNewOff() {
    return new s(58614, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get OpenWith() {
    return new s(59551, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get OtherHouses() {
    return new s(58764, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Outbond() {
    return new s(61992, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Outbound() {
    return new s(57802, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Outbox() {
    return new s(61279, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get OutdoorGrill() {
    return new s(59975, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Outlet() {
    return new s(61908, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get OutlinedFlag() {
    return new s(57710, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Output() {
    return new s(60350, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Padding() {
    return new s(59848, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Pages() {
    return new s(59385, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Pageview() {
    return new s(59552, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Paid() {
    return new s(61505, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Palette() {
    return new s(58378, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PanTool() {
    return new s(59685, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PanToolAlt() {
    return new s(60345, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Panorama() {
    return new s(58379, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PanoramaFishEye() {
    return new s(58380, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PanoramaFisheye() {
    return new s(58380, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PanoramaHorizontal() {
    return new s(58381, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PanoramaHorizontalSelect() {
    return new s(61280, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PanoramaPhotosphere() {
    return new s(59849, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PanoramaPhotosphereSelect() {
    return new s(59850, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PanoramaVertical() {
    return new s(58382, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PanoramaVerticalSelect() {
    return new s(61281, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PanoramaWideAngle() {
    return new s(58383, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PanoramaWideAngleSelect() {
    return new s(61282, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Paragliding() {
    return new s(58639, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Park() {
    return new s(60003, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PartyMode() {
    return new s(59386, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Password() {
    return new s(61506, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Paste() {
    return new s(61592, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Pattern() {
    return new s(61507, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Pause() {
    return new s(57396, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PauseCircle() {
    return new s(57762, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PauseCircleFilled() {
    return new s(57397, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PauseCircleOutline() {
    return new s(57398, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PausePresentation() {
    return new s(57578, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Payment() {
    return new s(59553, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Payments() {
    return new s(61283, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Paypal() {
    return new s(60045, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PedalBike() {
    return new s(60201, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Pending() {
    return new s(61284, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PendingActions() {
    return new s(61883, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Pentagon() {
    return new s(60240, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get People() {
    return new s(59387, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PeopleAlt() {
    return new s(59937, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PeopleOutline() {
    return new s(59388, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Percent() {
    return new s(60248, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PermCameraMic() {
    return new s(59554, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PermContactCal() {
    return new s(59555, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PermContactCalendar() {
    return new s(59555, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PermDataSetting() {
    return new s(59556, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PermDeviceInfo() {
    return new s(59557, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PermDeviceInformation() {
    return new s(59557, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PermIdentity() {
    return new s(59558, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PermMedia() {
    return new s(59559, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PermPhoneMsg() {
    return new s(59560, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PermScanWifi() {
    return new s(59561, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Person() {
    return new s(59389, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PersonAdd() {
    return new s(59390, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PersonAddAlt() {
    return new s(59981, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PersonAddAlt1() {
    return new s(61285, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PersonAddDisabled() {
    return new s(59851, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PersonOff() {
    return new s(58640, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PersonOutline() {
    return new s(59391, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PersonPin() {
    return new s(58714, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PersonPinCircle() {
    return new s(58730, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PersonRemove() {
    return new s(61286, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PersonRemoveAlt1() {
    return new s(61287, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PersonSearch() {
    return new s(61702, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PersonalInjury() {
    return new s(59098, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PersonalVideo() {
    return new s(58939, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PestControl() {
    return new s(61690, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PestControlRodent() {
    return new s(61693, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Pets() {
    return new s(59677, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Phishing() {
    return new s(60119, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Phone() {
    return new s(57549, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhoneAndroid() {
    return new s(58148, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhoneBluetoothSpeaker() {
    return new s(58907, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhoneCallback() {
    return new s(58953, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhoneDisabled() {
    return new s(59852, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhoneEnabled() {
    return new s(59853, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhoneForwarded() {
    return new s(58908, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhoneInTalk() {
    return new s(58909, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhoneIphone() {
    return new s(58149, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhoneLocked() {
    return new s(58910, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhoneMissed() {
    return new s(58911, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhonePaused() {
    return new s(58912, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Phonelink() {
    return new s(58150, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhonelinkErase() {
    return new s(57563, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhonelinkLock() {
    return new s(57564, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhonelinkOff() {
    return new s(58151, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhonelinkRing() {
    return new s(57565, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhonelinkSetup() {
    return new s(57566, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Photo() {
    return new s(58384, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhotoAlbum() {
    return new s(58385, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhotoCamera() {
    return new s(58386, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhotoCameraBack() {
    return new s(61288, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhotoCameraFront() {
    return new s(61289, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhotoFilter() {
    return new s(58427, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhotoLibrary() {
    return new s(58387, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhotoSizeSelectActual() {
    return new s(58418, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhotoSizeSelectLarge() {
    return new s(58419, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PhotoSizeSelectSmall() {
    return new s(58420, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Php() {
    return new s(60303, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Piano() {
    return new s(58657, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PianoOff() {
    return new s(58656, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PictureAsPdf() {
    return new s(58389, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PictureInPicture() {
    return new s(59562, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PictureInPictureAlt() {
    return new s(59665, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PieChart() {
    return new s(59076, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PieChartOutline() {
    return new s(61508, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Pin() {
    return new s(61509, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PinDrop() {
    return new s(58718, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PinEnd() {
    return new s(59239, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PinInvoke() {
    return new s(59235, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Pinch() {
    return new s(60216, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PivotTableChart() {
    return new s(59854, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Pix() {
    return new s(60067, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Place() {
    return new s(58719, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Plagiarism() {
    return new s(59994, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PlayArrow() {
    return new s(57399, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PlayCircle() {
    return new s(57796, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PlayCircleFill() {
    return new s(57400, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PlayCircleFilled() {
    return new s(57400, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PlayCircleOutline() {
    return new s(57401, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PlayDisabled() {
    return new s(61290, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PlayForWork() {
    return new s(59654, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PlayLesson() {
    return new s(61511, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PlaylistAdd() {
    return new s(57403, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PlaylistAddCheck() {
    return new s(57445, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PlaylistAddCheckCircle() {
    return new s(59366, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PlaylistAddCircle() {
    return new s(59365, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PlaylistPlay() {
    return new s(57439, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PlaylistRemove() {
    return new s(60288, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Plumbing() {
    return new s(61703, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PlusOne() {
    return new s(59392, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Podcasts() {
    return new s(61512, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PointOfSale() {
    return new s(61822, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Policy() {
    return new s(59927, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Poll() {
    return new s(59393, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Polyline() {
    return new s(60347, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Polymer() {
    return new s(59563, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Pool() {
    return new s(60232, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PortableWifiOff() {
    return new s(57550, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Portrait() {
    return new s(58390, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PostAdd() {
    return new s(59936, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Power() {
    return new s(58940, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PowerInput() {
    return new s(58166, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PowerOff() {
    return new s(58950, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PowerSettingsNew() {
    return new s(59564, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PrecisionManufacturing() {
    return new s(61513, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PregnantWoman() {
    return new s(59678, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PresentToAll() {
    return new s(57567, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Preview() {
    return new s(61893, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PriceChange() {
    return new s(61514, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PriceCheck() {
    return new s(61515, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Print() {
    return new s(59565, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PrintDisabled() {
    return new s(59855, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PriorityHigh() {
    return new s(58949, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PrivacyTip() {
    return new s(61660, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PrivateConnectivity() {
    return new s(59204, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ProductionQuantityLimits() {
    return new s(57809, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Psychology() {
    return new s(59978, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Public() {
    return new s(59403, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PublicOff() {
    return new s(61898, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Publish() {
    return new s(57941, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PublishedWithChanges() {
    return new s(62002, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PunchClock() {
    return new s(60072, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get PushPin() {
    return new s(61709, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get QrCode() {
    return new s(61291, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get QrCode2() {
    return new s(57354, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get QrCodeScanner() {
    return new s(61958, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get QueryBuilder() {
    return new s(59566, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get QueryStats() {
    return new s(58620, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get QuestionAnswer() {
    return new s(59567, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get QuestionMark() {
    return new s(60299, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Queue() {
    return new s(57404, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get QueueMusic() {
    return new s(57405, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get QueuePlayNext() {
    return new s(57446, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get QuickContactsDialer() {
    return new s(57551, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get QuickContactsMail() {
    return new s(57552, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Quickreply() {
    return new s(61292, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Quiz() {
    return new s(61516, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Quora() {
    return new s(60056, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RMobiledata() {
    return new s(61517, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Radar() {
    return new s(61518, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Radio() {
    return new s(57406, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RadioButtonChecked() {
    return new s(59447, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RadioButtonOff() {
    return new s(59446, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RadioButtonOn() {
    return new s(59447, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RadioButtonUnchecked() {
    return new s(59446, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RailwayAlert() {
    return new s(59857, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RamenDining() {
    return new s(60004, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RampLeft() {
    return new s(60316, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RampRight() {
    return new s(60310, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RateReview() {
    return new s(58720, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RawOff() {
    return new s(61519, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RawOn() {
    return new s(61520, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ReadMore() {
    return new s(61293, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RealEstateAgent() {
    return new s(59194, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Receipt() {
    return new s(59568, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ReceiptLong() {
    return new s(61294, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RecentActors() {
    return new s(57407, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Recommend() {
    return new s(59858, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RecordVoiceOver() {
    return new s(59679, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Rectangle() {
    return new s(60244, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Recycling() {
    return new s(59232, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Reddit() {
    return new s(60064, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Redeem() {
    return new s(59569, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Redo() {
    return new s(57690, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ReduceCapacity() {
    return new s(61980, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Refresh() {
    return new s(58837, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RememberMe() {
    return new s(61521, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Remove() {
    return new s(57691, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RemoveCircle() {
    return new s(57692, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RemoveCircleOutline() {
    return new s(57693, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RemoveDone() {
    return new s(59859, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RemoveFromQueue() {
    return new s(57447, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RemoveModerator() {
    return new s(59860, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RemoveRedEye() {
    return new s(58391, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RemoveShoppingCart() {
    return new s(59688, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Reorder() {
    return new s(59646, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Repeat() {
    return new s(57408, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RepeatOn() {
    return new s(59862, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RepeatOne() {
    return new s(57409, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RepeatOneOn() {
    return new s(59863, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Replay() {
    return new s(57410, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Replay10() {
    return new s(57433, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Replay30() {
    return new s(57434, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Replay5() {
    return new s(57435, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ReplayCircleFilled() {
    return new s(59864, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Reply() {
    return new s(57694, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ReplyAll() {
    return new s(57695, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Report() {
    return new s(57696, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ReportGmailerrorred() {
    return new s(61522, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ReportOff() {
    return new s(57712, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ReportProblem() {
    return new s(59570, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RequestPage() {
    return new s(61996, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RequestQuote() {
    return new s(61878, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ResetTv() {
    return new s(59865, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RestartAlt() {
    return new s(61523, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Restaurant() {
    return new s(58732, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RestaurantMenu() {
    return new s(58721, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Restore() {
    return new s(59571, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RestoreFromTrash() {
    return new s(59704, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RestorePage() {
    return new s(59689, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Reviews() {
    return new s(61524, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RiceBowl() {
    return new s(61941, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RingVolume() {
    return new s(57553, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Rocket() {
    return new s(60325, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RocketLaunch() {
    return new s(60315, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RollerSkating() {
    return new s(60365, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Roofing() {
    return new s(61953, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Room() {
    return new s(59572, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RoomPreferences() {
    return new s(61880, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RoomService() {
    return new s(60233, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Rotate90DegreesCcw() {
    return new s(58392, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Rotate90DegreesCw() {
    return new s(60075, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RotateLeft() {
    return new s(58393, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RotateRight() {
    return new s(58394, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RoundaboutLeft() {
    return new s(60313, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RoundaboutRight() {
    return new s(60323, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RoundedCorner() {
    return new s(59680, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Route() {
    return new s(60109, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Router() {
    return new s(58152, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Rowing() {
    return new s(59681, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RssFeed() {
    return new s(57573, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Rsvp() {
    return new s(61525, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Rtt() {
    return new s(59821, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Rule() {
    return new s(61890, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RuleFolder() {
    return new s(61897, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RunCircle() {
    return new s(61295, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RunningWithErrors() {
    return new s(58653, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get RvHookup() {
    return new s(58946, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SafetyCheck() {
    return new s(60399, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SafetyDivider() {
    return new s(57804, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Sailing() {
    return new s(58626, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Sanitizer() {
    return new s(61981, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Satellite() {
    return new s(58722, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SatelliteAlt() {
    return new s(60218, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Save() {
    return new s(57697, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SaveAlt() {
    return new s(57713, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SaveAs() {
    return new s(60256, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SavedSearch() {
    return new s(59921, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Savings() {
    return new s(58091, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Scale() {
    return new s(60255, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Scanner() {
    return new s(58153, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ScatterPlot() {
    return new s(57960, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Schedule() {
    return new s(59573, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ScheduleSend() {
    return new s(59914, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Schema() {
    return new s(58621, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get School() {
    return new s(59404, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Science() {
    return new s(59979, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Score() {
    return new s(57961, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Scoreboard() {
    return new s(60368, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ScreenLockLandscape() {
    return new s(57790, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ScreenLockPortrait() {
    return new s(57791, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ScreenLockRotation() {
    return new s(57792, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ScreenRotation() {
    return new s(57793, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ScreenRotationAlt() {
    return new s(60398, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ScreenSearchDesktop() {
    return new s(61296, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ScreenShare() {
    return new s(57570, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Screenshot() {
    return new s(61526, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ScubaDiving() {
    return new s(60366, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Sd() {
    return new s(59869, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SdCard() {
    return new s(58915, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SdCardAlert() {
    return new s(61527, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SdStorage() {
    return new s(57794, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Search() {
    return new s(59574, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SearchOff() {
    return new s(60022, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Security() {
    return new s(58154, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SecurityUpdate() {
    return new s(61528, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SecurityUpdateGood() {
    return new s(61529, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SecurityUpdateWarning() {
    return new s(61530, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Segment() {
    return new s(59723, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SelectAll() {
    return new s(57698, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SelfImprovement() {
    return new s(60024, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Sell() {
    return new s(61531, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Send() {
    return new s(57699, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SendAndArchive() {
    return new s(59916, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SendTimeExtension() {
    return new s(60123, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SendToMobile() {
    return new s(61532, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SensorDoor() {
    return new s(61877, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SensorWindow() {
    return new s(61876, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Sensors() {
    return new s(58654, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SensorsOff() {
    return new s(58655, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SentimentDissatisfied() {
    return new s(59409, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SentimentNeutral() {
    return new s(59410, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SentimentSatisfied() {
    return new s(59411, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SentimentSatisfiedAlt() {
    return new s(57581, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SentimentVeryDissatisfied() {
    return new s(59412, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SentimentVerySatisfied() {
    return new s(59413, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SetMeal() {
    return new s(61930, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Settings() {
    return new s(59576, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsAccessibility() {
    return new s(61533, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsApplications() {
    return new s(59577, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsBackupRestore() {
    return new s(59578, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsBluetooth() {
    return new s(59579, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsBrightness() {
    return new s(59581, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsCell() {
    return new s(59580, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsDisplay() {
    return new s(59581, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsEthernet() {
    return new s(59582, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsInputAntenna() {
    return new s(59583, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsInputComponent() {
    return new s(59584, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsInputComposite() {
    return new s(59585, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsInputHdmi() {
    return new s(59586, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsInputSvideo() {
    return new s(59587, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsOverscan() {
    return new s(59588, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsPhone() {
    return new s(59589, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsPower() {
    return new s(59590, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsRemote() {
    return new s(59591, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsSuggest() {
    return new s(61534, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsSystemDaydream() {
    return new s(57795, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SettingsVoice() {
    return new s(59592, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SevereCold() {
    return new s(60371, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Share() {
    return new s(59405, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ShareArrivalTime() {
    return new s(58660, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ShareLocation() {
    return new s(61535, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Shield() {
    return new s(59872, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ShieldMoon() {
    return new s(60073, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Shop() {
    return new s(59593, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Shop2() {
    return new s(57758, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ShopTwo() {
    return new s(59594, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Shopify() {
    return new s(60061, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ShoppingBag() {
    return new s(61900, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ShoppingBasket() {
    return new s(59595, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ShoppingCart() {
    return new s(59596, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ShoppingCartCheckout() {
    return new s(60296, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ShortText() {
    return new s(57953, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Shortcut() {
    return new s(61536, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ShowChart() {
    return new s(59105, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Shower() {
    return new s(61537, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Shuffle() {
    return new s(57411, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ShuffleOn() {
    return new s(59873, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ShutterSpeed() {
    return new s(58429, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Sick() {
    return new s(61984, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignLanguage() {
    return new s(60389, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalCellular0Bar() {
    return new s(61608, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalCellular4Bar() {
    return new s(57800, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalCellularAlt() {
    return new s(57858, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalCellularAlt1Bar() {
    return new s(60383, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalCellularAlt2Bar() {
    return new s(60387, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalCellularConnectedNoInternet0Bar() {
    return new s(61612, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalCellularConnectedNoInternet4Bar() {
    return new s(57805, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalCellularNoSim() {
    return new s(57806, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalCellularNodata() {
    return new s(61538, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalCellularNull() {
    return new s(57807, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalCellularOff() {
    return new s(57808, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalWifi0Bar() {
    return new s(61616, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalWifi4Bar() {
    return new s(57816, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalWifi4BarLock() {
    return new s(57817, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalWifiBad() {
    return new s(61539, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalWifiConnectedNoInternet4() {
    return new s(61540, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalWifiOff() {
    return new s(57818, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalWifiStatusbar4Bar() {
    return new s(61541, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalWifiStatusbarConnectedNoInternet4() {
    return new s(61542, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SignalWifiStatusbarNull() {
    return new s(61543, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Signpost() {
    return new s(60305, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SimCard() {
    return new s(58155, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SimCardAlert() {
    return new s(58916, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SimCardDownload() {
    return new s(61544, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SingleBed() {
    return new s(59976, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Sip() {
    return new s(61545, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Skateboarding() {
    return new s(58641, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SkipNext() {
    return new s(57412, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SkipPrevious() {
    return new s(57413, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Sledding() {
    return new s(58642, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Slideshow() {
    return new s(58395, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SlowMotionVideo() {
    return new s(57448, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SmartButton() {
    return new s(61889, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SmartDisplay() {
    return new s(61546, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SmartScreen() {
    return new s(61547, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SmartToy() {
    return new s(61548, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Smartphone() {
    return new s(58156, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SmokeFree() {
    return new s(60234, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SmokingRooms() {
    return new s(60235, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Sms() {
    return new s(58917, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SmsFailed() {
    return new s(58918, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Snapchat() {
    return new s(60014, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SnippetFolder() {
    return new s(61895, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Snooze() {
    return new s(57414, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Snowboarding() {
    return new s(58643, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Snowmobile() {
    return new s(58627, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Snowshoeing() {
    return new s(58644, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Soap() {
    return new s(61874, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SocialDistance() {
    return new s(57803, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Sort() {
    return new s(57700, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SortByAlpha() {
    return new s(57427, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Sos() {
    return new s(60407, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SoupKitchen() {
    return new s(59347, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Source() {
    return new s(61892, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get South() {
    return new s(61923, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SouthAmerica() {
    return new s(59364, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SouthEast() {
    return new s(61924, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SouthWest() {
    return new s(61925, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Spa() {
    return new s(60236, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SpaceBar() {
    return new s(57942, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SpaceDashboard() {
    return new s(58987, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SpatialAudio() {
    return new s(60395, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SpatialAudioOff() {
    return new s(60392, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SpatialTracking() {
    return new s(60394, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Speaker() {
    return new s(58157, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SpeakerGroup() {
    return new s(58158, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SpeakerNotes() {
    return new s(59597, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SpeakerNotesOff() {
    return new s(59690, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SpeakerPhone() {
    return new s(57554, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Speed() {
    return new s(59876, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Spellcheck() {
    return new s(59598, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Splitscreen() {
    return new s(61549, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Spoke() {
    return new s(59815, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Sports() {
    return new s(59952, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsBar() {
    return new s(61939, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsBaseball() {
    return new s(59985, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsBasketball() {
    return new s(59942, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsCricket() {
    return new s(59943, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsEsports() {
    return new s(59944, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsFootball() {
    return new s(59945, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsGolf() {
    return new s(59946, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsGymnastics() {
    return new s(60356, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsHandball() {
    return new s(59955, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsHockey() {
    return new s(59947, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsKabaddi() {
    return new s(59956, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsMartialArts() {
    return new s(60137, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsMma() {
    return new s(59948, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsMotorsports() {
    return new s(59949, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsRugby() {
    return new s(59950, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsScore() {
    return new s(61550, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsSoccer() {
    return new s(59951, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsTennis() {
    return new s(59954, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SportsVolleyball() {
    return new s(59953, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Square() {
    return new s(60214, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SquareFoot() {
    return new s(59977, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SsidChart() {
    return new s(60262, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get StackedBarChart() {
    return new s(59878, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get StackedLineChart() {
    return new s(61995, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Stadium() {
    return new s(60304, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Stairs() {
    return new s(61865, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Star() {
    return new s(59448, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get StarBorder() {
    return new s(59450, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get StarBorderPurple500() {
    return new s(61593, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get StarHalf() {
    return new s(59449, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get StarOutline() {
    return new s(61551, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get StarPurple500() {
    return new s(61594, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get StarRate() {
    return new s(61676, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Stars() {
    return new s(59600, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Start() {
    return new s(57481, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get StayCurrentLandscape() {
    return new s(57555, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get StayCurrentPortrait() {
    return new s(57556, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get StayPrimaryLandscape() {
    return new s(57557, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get StayPrimaryPortrait() {
    return new s(57558, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get StickyNote2() {
    return new s(61948, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Stop() {
    return new s(57415, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get StopCircle() {
    return new s(61297, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get StopScreenShare() {
    return new s(57571, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Storage() {
    return new s(57819, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Store() {
    return new s(59601, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get StoreMallDirectory() {
    return new s(58723, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Storefront() {
    return new s(59922, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Storm() {
    return new s(61552, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Straight() {
    return new s(60309, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Straighten() {
    return new s(58396, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Stream() {
    return new s(59881, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Streetview() {
    return new s(58734, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get StrikethroughS() {
    return new s(57943, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Stroller() {
    return new s(61870, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Style() {
    return new s(58397, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SubdirectoryArrowLeft() {
    return new s(58841, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SubdirectoryArrowRight() {
    return new s(58842, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Subject() {
    return new s(59602, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Subscript() {
    return new s(61713, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Subscriptions() {
    return new s(57444, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Subtitles() {
    return new s(57416, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SubtitlesOff() {
    return new s(61298, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Subway() {
    return new s(58735, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Summarize() {
    return new s(61553, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Superscript() {
    return new s(61714, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SupervisedUserCircle() {
    return new s(59705, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SupervisorAccount() {
    return new s(59603, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Support() {
    return new s(61299, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SupportAgent() {
    return new s(61666, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Surfing() {
    return new s(58645, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SurroundSound() {
    return new s(57417, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwapCalls() {
    return new s(57559, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwapHoriz() {
    return new s(59604, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwapHorizontalCircle() {
    return new s(59699, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwapVert() {
    return new s(59605, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwapVertCircle() {
    return new s(59606, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwapVerticalCircle() {
    return new s(59606, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Swipe() {
    return new s(59884, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwipeDown() {
    return new s(60243, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwipeDownAlt() {
    return new s(60208, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwipeLeft() {
    return new s(60249, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwipeLeftAlt() {
    return new s(60211, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwipeRight() {
    return new s(60242, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwipeRightAlt() {
    return new s(60246, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwipeUp() {
    return new s(60206, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwipeUpAlt() {
    return new s(60213, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwipeVertical() {
    return new s(60241, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwitchAccessShortcut() {
    return new s(59361, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwitchAccessShortcutAdd() {
    return new s(59362, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwitchAccount() {
    return new s(59885, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwitchCamera() {
    return new s(58398, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwitchLeft() {
    return new s(61905, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwitchRight() {
    return new s(61906, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SwitchVideo() {
    return new s(58399, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Synagogue() {
    return new s(60080, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Sync() {
    return new s(58919, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SyncAlt() {
    return new s(59928, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SyncDisabled() {
    return new s(58920, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SyncLock() {
    return new s(60142, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SyncProblem() {
    return new s(58921, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SystemSecurityUpdate() {
    return new s(61554, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SystemSecurityUpdateGood() {
    return new s(61555, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SystemSecurityUpdateWarning() {
    return new s(61556, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SystemUpdate() {
    return new s(58922, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SystemUpdateAlt() {
    return new s(59607, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get SystemUpdateTv() {
    return new s(59607, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Tab() {
    return new s(59608, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TabUnselected() {
    return new s(59609, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TableBar() {
    return new s(60114, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TableChart() {
    return new s(57957, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TableRestaurant() {
    return new s(60102, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TableRows() {
    return new s(61697, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TableView() {
    return new s(61886, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Tablet() {
    return new s(58159, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TabletAndroid() {
    return new s(58160, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TabletMac() {
    return new s(58161, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Tag() {
    return new s(59887, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TagFaces() {
    return new s(58400, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TakeoutDining() {
    return new s(60020, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TapAndPlay() {
    return new s(58923, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Tapas() {
    return new s(61929, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Task() {
    return new s(61557, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TaskAlt() {
    return new s(58086, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TaxiAlert() {
    return new s(61300, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Telegram() {
    return new s(60011, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TempleBuddhist() {
    return new s(60083, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TempleHindu() {
    return new s(60079, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Terminal() {
    return new s(60302, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Terrain() {
    return new s(58724, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TextDecrease() {
    return new s(60125, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TextFields() {
    return new s(57954, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TextFormat() {
    return new s(57701, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TextIncrease() {
    return new s(60130, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TextRotateUp() {
    return new s(59706, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TextRotateVertical() {
    return new s(59707, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TextRotationAngledown() {
    return new s(59708, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TextRotationAngleup() {
    return new s(59709, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TextRotationDown() {
    return new s(59710, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TextRotationNone() {
    return new s(59711, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TextSnippet() {
    return new s(61894, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Textsms() {
    return new s(57560, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Texture() {
    return new s(58401, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TheaterComedy() {
    return new s(60006, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Theaters() {
    return new s(59610, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Thermostat() {
    return new s(61558, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ThermostatAuto() {
    return new s(61559, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ThumbDown() {
    return new s(59611, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ThumbDownAlt() {
    return new s(59414, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ThumbDownOffAlt() {
    return new s(59890, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ThumbUp() {
    return new s(59612, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ThumbUpAlt() {
    return new s(59415, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ThumbUpOffAlt() {
    return new s(59891, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ThumbsUpDown() {
    return new s(59613, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Thunderstorm() {
    return new s(60379, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Tiktok() {
    return new s(60030, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TimeToLeave() {
    return new s(58924, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Timelapse() {
    return new s(58402, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Timeline() {
    return new s(59682, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Timer() {
    return new s(58405, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Timer10() {
    return new s(58403, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Timer10Select() {
    return new s(61562, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Timer3() {
    return new s(58404, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Timer3Select() {
    return new s(61563, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TimerOff() {
    return new s(58406, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TipsAndUpdates() {
    return new s(59290, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TireRepair() {
    return new s(60360, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Title() {
    return new s(57956, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Toc() {
    return new s(59614, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Today() {
    return new s(59615, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ToggleOff() {
    return new s(59893, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ToggleOn() {
    return new s(59894, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Token() {
    return new s(59941, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Toll() {
    return new s(59616, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Tonality() {
    return new s(58407, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Topic() {
    return new s(61896, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TouchApp() {
    return new s(59667, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Tour() {
    return new s(61301, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Toys() {
    return new s(58162, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TrackChanges() {
    return new s(59617, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Traffic() {
    return new s(58725, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Train() {
    return new s(58736, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Tram() {
    return new s(58737, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TransferWithinAStation() {
    return new s(58738, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Transform() {
    return new s(58408, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Transgender() {
    return new s(58765, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TransitEnterexit() {
    return new s(58745, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Translate() {
    return new s(59618, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TravelExplore() {
    return new s(58075, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TrendingDown() {
    return new s(59619, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TrendingFlat() {
    return new s(59620, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TrendingNeutral() {
    return new s(59620, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TrendingUp() {
    return new s(59621, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TripOrigin() {
    return new s(58747, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Try() {
    return new s(61564, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Tsunami() {
    return new s(60376, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Tty() {
    return new s(61866, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Tune() {
    return new s(58409, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Tungsten() {
    return new s(61565, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TurnLeft() {
    return new s(60326, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TurnRight() {
    return new s(60331, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TurnSharpLeft() {
    return new s(60327, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TurnSharpRight() {
    return new s(60330, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TurnSlightLeft() {
    return new s(60324, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TurnSlightRight() {
    return new s(60314, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TurnedIn() {
    return new s(59622, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TurnedInNot() {
    return new s(59623, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Tv() {
    return new s(58163, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TvOff() {
    return new s(58951, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get TwoWheeler() {
    return new s(59897, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get UTurnLeft() {
    return new s(60321, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get UTurnRight() {
    return new s(60322, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Umbrella() {
    return new s(61869, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Unarchive() {
    return new s(57705, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Undo() {
    return new s(57702, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get UnfoldLess() {
    return new s(58838, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get UnfoldMore() {
    return new s(58839, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Unpublished() {
    return new s(62006, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Unsubscribe() {
    return new s(57579, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Upcoming() {
    return new s(61566, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Update() {
    return new s(59683, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get UpdateDisabled() {
    return new s(57461, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Upgrade() {
    return new s(61691, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Upload() {
    return new s(61595, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get UploadFile() {
    return new s(59900, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Usb() {
    return new s(57824, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get UsbOff() {
    return new s(58618, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Vaccines() {
    return new s(57656, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VapeFree() {
    return new s(60358, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VapingRooms() {
    return new s(60367, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Verified() {
    return new s(61302, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VerifiedUser() {
    return new s(59624, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VerticalAlignBottom() {
    return new s(57944, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VerticalAlignCenter() {
    return new s(57945, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VerticalAlignTop() {
    return new s(57946, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VerticalDistribute() {
    return new s(57462, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VerticalSplit() {
    return new s(59721, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Vibration() {
    return new s(58925, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VideoCall() {
    return new s(57456, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VideoCameraBack() {
    return new s(61567, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VideoCameraFront() {
    return new s(61568, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VideoCollection() {
    return new s(57418, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VideoFile() {
    return new s(60295, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VideoLabel() {
    return new s(57457, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VideoLibrary() {
    return new s(57418, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VideoSettings() {
    return new s(60021, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VideoStable() {
    return new s(61569, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Videocam() {
    return new s(57419, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VideocamOff() {
    return new s(57420, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VideogameAsset() {
    return new s(58168, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VideogameAssetOff() {
    return new s(58624, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewAgenda() {
    return new s(59625, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewArray() {
    return new s(59626, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewCarousel() {
    return new s(59627, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewColumn() {
    return new s(59628, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewComfortable() {
    return new s(58410, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewComfy() {
    return new s(58410, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewComfyAlt() {
    return new s(60275, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewCompact() {
    return new s(58411, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewCompactAlt() {
    return new s(60276, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewCozy() {
    return new s(60277, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewDay() {
    return new s(59629, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewHeadline() {
    return new s(59630, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewInAr() {
    return new s(59902, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewKanban() {
    return new s(60287, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewList() {
    return new s(59631, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewModule() {
    return new s(59632, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewQuilt() {
    return new s(59633, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewSidebar() {
    return new s(61716, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewStream() {
    return new s(59634, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewTimeline() {
    return new s(60293, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ViewWeek() {
    return new s(59635, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Vignette() {
    return new s(58421, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Villa() {
    return new s(58758, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Visibility() {
    return new s(59636, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VisibilityOff() {
    return new s(59637, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VoiceChat() {
    return new s(58926, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VoiceOverOff() {
    return new s(59722, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Voicemail() {
    return new s(57561, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Volcano() {
    return new s(60378, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VolumeDown() {
    return new s(57421, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VolumeMute() {
    return new s(57422, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VolumeOff() {
    return new s(57423, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VolumeUp() {
    return new s(57424, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VolunteerActivism() {
    return new s(60016, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VpnKey() {
    return new s(57562, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VpnKeyOff() {
    return new s(60282, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get VpnLock() {
    return new s(58927, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Vrpano() {
    return new s(61570, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WalletGiftcard() {
    return new s(59638, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WalletMembership() {
    return new s(59639, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WalletTravel() {
    return new s(59640, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Wallpaper() {
    return new s(59231, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Warehouse() {
    return new s(60344, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Warning() {
    return new s(57346, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WarningAmber() {
    return new s(61571, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Wash() {
    return new s(61873, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Watch() {
    return new s(58164, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WatchLater() {
    return new s(59684, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WatchOff() {
    return new s(60131, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Water() {
    return new s(61572, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WaterDamage() {
    return new s(61955, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WaterDrop() {
    return new s(59288, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WaterfallChart() {
    return new s(59904, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Waves() {
    return new s(57718, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WavingHand() {
    return new s(59238, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WbAuto() {
    return new s(58412, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WbCloudy() {
    return new s(58413, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WbIncandescent() {
    return new s(58414, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WbIridescent() {
    return new s(58422, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WbShade() {
    return new s(59905, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WbSunny() {
    return new s(58416, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WbTwilight() {
    return new s(57798, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Wc() {
    return new s(58941, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Web() {
    return new s(57425, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WebAsset() {
    return new s(57449, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WebAssetOff() {
    return new s(58615, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Webhook() {
    return new s(60306, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Wechat() {
    return new s(60033, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Weekend() {
    return new s(57707, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get West() {
    return new s(61926, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Whatsapp() {
    return new s(60060, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Whatshot() {
    return new s(59406, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WheelchairPickup() {
    return new s(61867, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WhereToVote() {
    return new s(57719, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Widgets() {
    return new s(59230, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Wifi() {
    return new s(58942, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Wifi1Bar() {
    return new s(58570, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Wifi2Bar() {
    return new s(58585, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WifiCalling() {
    return new s(61303, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WifiCalling3() {
    return new s(61573, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WifiChannel() {
    return new s(60266, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WifiFind() {
    return new s(60209, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WifiLock() {
    return new s(57825, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WifiOff() {
    return new s(58952, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WifiPassword() {
    return new s(60267, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WifiProtectedSetup() {
    return new s(61692, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WifiTethering() {
    return new s(57826, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WifiTetheringError() {
    return new s(61574, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WifiTetheringErrorRounded() {
    return new s(61574, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WifiTetheringOff() {
    return new s(61575, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Window() {
    return new s(61576, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WineBar() {
    return new s(61928, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Woman() {
    return new s(57662, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WooCommerce() {
    return new s(60013, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Wordpress() {
    return new s(60063, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Work() {
    return new s(59641, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WorkOff() {
    return new s(59714, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WorkOutline() {
    return new s(59715, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WorkspacePremium() {
    return new s(59311, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Workspaces() {
    return new s(57760, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WrapText() {
    return new s(57947, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get WrongLocation() {
    return new s(61304, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Wysiwyg() {
    return new s(61891, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get Yard() {
    return new s(61577, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get YoutubeSearchedFor() {
    return new s(59642, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ZoomIn() {
    return new s(59647, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ZoomInMap() {
    return new s(60205, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ZoomOut() {
    return new s(59648, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
  get ZoomOutMap() {
    return new s(58731, t.FontFamily, t.AssemblyName, t.AssetPath);
  }
};
let yt = t;
m(yt, "FontFamily", "Material Icons Outlined"), m(yt, "AssemblyName", "PixUI"), m(yt, "AssetPath", "MaterialIconsOutlined.woff2");
class ye {
}
m(ye, "Filled", new At()), m(ye, "Outlined", new yt());
class Fa {
  constructor(a) {
    m(this, "_onFontLoaded");
    m(this, "_cachedFont");
    m(this, "_cachedGlyphId", 0);
    m(this, "_loading", !1);
    this._onFontLoaded = a;
  }
  Paint(a, n, r, l, o = 0, h = 0) {
    if (this._cachedFont == null) {
      let y = oe.Instance.TryMatchFamilyFromAsset(l.FontFamily);
      if (y == null) {
        this._loading || (this._loading = !0, oe.Instance.StartLoadFontFromAsset(
          l.AssemblyName,
          l.AssetPath,
          l.FontFamily
        ), oe.Instance.FontChanged.Add(this._OnFontChanged, this));
        return;
      }
      this._cachedFont = new CanvasKit.Font(y, n), this._cachedGlyphId = this._cachedFont.getGlyphIDs(String.fromCharCode(l.CodePoint))[0];
    }
    let A = S.Shared(r);
    a.drawGlyphs([this._cachedGlyphId], [o, n + h], 0, 0, this._cachedFont, A);
  }
  _OnFontChanged() {
    oe.Instance.FontChanged.Remove(this._OnFontChanged, this), this._onFontLoaded();
  }
  Reset() {
    var a;
    (a = this._cachedFont) == null || a.delete(), this._cachedFont = null, this._cachedGlyphId = 0, this._loading = !1;
  }
  Dispose() {
    var a;
    (a = this._cachedFont) == null || a.delete();
  }
}
m(Fa, "$meta_System_IDisposable", !0);
class lt extends O {
  constructor(n) {
    super();
    m(this, "_data");
    m(this, "_size");
    m(this, "_color");
    m(this, "_painter");
    this._painter = new Fa(this.OnIconFontLoaded.bind(this)), this._data = this.Bind(n, W.AffectsVisual);
  }
  get Size() {
    return this._size;
  }
  set Size(n) {
    this._size = this.Rebind(this._size, n, W.AffectsLayout);
  }
  get Color() {
    return this._color;
  }
  set Color(n) {
    this._color = this.Rebind(this._color, n, W.AffectsVisual);
  }
  OnIconFontLoaded() {
    var n;
    this.IsMounted ? this.Invalidate(c.Repaint) : (n = this.Parent) == null || n.Invalidate(
      c.Repaint,
      new Fn(f.FromLTWH(this.X, this.Y, this.W, this.H))
    );
  }
  OnStateChanged(n, r) {
    (n === this._data || n === this._size) && this._painter.Reset(), super.OnStateChanged(n, r);
  }
  Layout(n, r) {
    var o, h;
    let l = (h = (o = this._size) == null ? void 0 : o.Value) != null ? h : x.DefaultFontSize;
    this.SetSize(
      Math.max(0, Math.min(n, l)),
      Math.max(0, Math.min(r, l))
    );
  }
  Paint(n, r = null) {
    var h, A, y, F;
    let l = (A = (h = this._size) == null ? void 0 : h.Value) != null ? A : x.DefaultFontSize, o = (F = (y = this._color) == null ? void 0 : y.Value) != null ? F : new T(4284441448);
    this._painter.Paint(n, l, o, this._data.Value);
  }
  Dispose() {
    this._painter.Dispose(), super.Dispose();
  }
}
var Ie = /* @__PURE__ */ ((i) => (i[i.MenuItem = 0] = "MenuItem", i[i.SubMenu = 1] = "SubMenu", i[i.Divider = 2] = "Divider", i))(Ie || {}), Gs, zs;
const zt = class {
  constructor(a, n = null, r = null, l = null, o = null, h = !0) {
    b(this, Gs, 0);
    m(this, "Icon");
    m(this, "Label");
    m(this, "Enabled", !1);
    m(this, "Action");
    b(this, zs, void 0);
    this.Type = a, this.Label = n, this.Icon = r, this.Action = l, this.Children = new g.List(o), this.Enabled = h;
  }
  get Type() {
    return d(this, Gs);
  }
  set Type(a) {
    N(this, Gs, a);
  }
  get Children() {
    return d(this, zs);
  }
  set Children(a) {
    N(this, zs, a);
  }
  static Item(a, n = null, r = null) {
    return new zt(0, a, n, r);
  }
  static SubMenu(a, n, r) {
    return new zt(1, a, n, null, r);
  }
  static Divider() {
    return new zt(2);
  }
};
let Ha = zt;
Gs = new WeakMap(), zs = new WeakMap();
var Us, Ys;
class tr {
  constructor() {
    m(this, "TextColor", p.op_Implicit_From(D.Black));
    b(this, Us, Z.Only(8, 5, 8, 5));
    b(this, Ys, 30);
    m(this, "BackgroundColor", new T(200, 200, 200));
    m(this, "HoverColor", x.AccentColor);
    m(this, "HoverTextColor", D.White);
    m(this, "_popupMenuStack");
  }
  get ItemPadding() {
    return d(this, Us);
  }
  set ItemPadding(a) {
    N(this, Us, a);
  }
  get PopupItemHeight() {
    return d(this, Ys);
  }
  set PopupItemHeight(a) {
    N(this, Ys, a);
  }
  set Color(a) {
    this.TextColor.Value = a;
  }
  OnMenuItemHoverChanged(a, n) {
    var r;
    if (!!n && !(this._popupMenuStack != null && this._popupMenuStack.TryCloseSome(a))) {
      if (a.MenuItem.Type == Ie.SubMenu) {
        (r = this._popupMenuStack) != null || (this._popupMenuStack = new Ln(a.Overlay, this.CloseAll.bind(this)));
        let l = new zn(a, null, a.Depth + 1, this), o = a.LocalToWindow(0, 0);
        a.Parent instanceof zn ? l.SetPosition(o.X + a.W, o.Y) : l.SetPosition(o.X, o.Y + a.H);
        let h = a.Root.Window;
        l.Layout(h.Width, h.Height), this._popupMenuStack.Add(l);
      }
      this._popupMenuStack != null && !this._popupMenuStack.HasChild && this.CloseAll();
    }
  }
  ShowContextMenu(a) {
    var h;
    let n = it.Current, r = n.LastMouseX, l = n.LastMouseY;
    (h = this._popupMenuStack) != null || (this._popupMenuStack = new Ln(n.Overlay, this.CloseAll.bind(this)));
    let o = new zn(null, a, 1, this);
    o.Layout(n.Width, n.Height), o.SetPosition(r, l), this._popupMenuStack.Add(o);
  }
  CloseAll() {
    var a;
    (a = this._popupMenuStack) == null || a.Hide(), this._popupMenuStack = null;
  }
}
Us = new WeakMap(), Ys = new WeakMap();
class Pl extends O {
  constructor(n) {
    super();
    m(this, "_children");
    m(this, "_controller");
    this._children = new g.List(n.length), this._controller = new tr(), this.BuildMenuItemWidgets(n);
  }
  set BackgroudColor(n) {
    this._controller.BackgroundColor = n;
  }
  set Color(n) {
    this._controller.Color = n;
  }
  BuildMenuItemWidgets(n) {
    for (const r of n) {
      let l = new xt(r, 0, !1, this._controller);
      l.Parent = this, this._children.Add(l);
    }
  }
  VisitChildren(n) {
    for (const r of this._children)
      if (n(r))
        break;
  }
  Layout(n, r) {
    let l = this.CacheAndCheckAssignWidth(n), o = this.CacheAndCheckAssignHeight(r);
    if (this.SetSize(l, o), this.HasLayout)
      return;
    this.HasLayout = !0;
    let h = 0;
    for (const A of this._children)
      A.Layout(Number.POSITIVE_INFINITY, o), A.SetPosition(h, 0), h += A.W;
  }
}
var Xs;
const Ut = class extends O {
  constructor(n, r, l, o) {
    super();
    m(this, "MenuItem");
    m(this, "Depth");
    m(this, "_controller");
    m(this, "_icon");
    m(this, "_label");
    m(this, "_expander");
    m(this, "_isHover", !1);
    b(this, Xs, void 0);
    this.Depth = r, this.MenuItem = n, this._controller = o, this.BuildChildren(l), this.MouseRegion = new We(() => Le.Hand), this.MouseRegion.HoverChanged.Add(this._OnHoverChanged, this), this.MouseRegion.PointerUp.Add(this._OnPointerUp, this);
  }
  get MouseRegion() {
    return d(this, Xs);
  }
  set MouseRegion(n) {
    N(this, Xs, n);
  }
  BuildChildren(n) {
    this.MenuItem.Type != Ie.Divider && (this.MenuItem.Icon != null && (this._icon = new lt(p.op_Implicit_From(this.MenuItem.Icon)).Init({ Color: this._controller.TextColor }), this._icon.Parent = this), this._label = new at(p.op_Implicit_From(this.MenuItem.Label)).Init({ TextColor: this._controller.TextColor }), this._label.Parent = this, this.MenuItem.Type == Ie.SubMenu && (this._expander = new lt(p.op_Implicit_From(n ? ye.Filled.ChevronRight : ye.Filled.ExpandMore)).Init(
      { Color: this._controller.TextColor }
    ), this._expander.Parent = this));
  }
  _OnPointerUp(n) {
    this.MenuItem.Type == Ie.MenuItem && this.MenuItem.Action != null && this.MenuItem.Action(), this._controller.CloseAll();
  }
  _OnHoverChanged(n) {
    this.MenuItem.Type != Ie.Divider && (this._isHover = n, this.Invalidate(c.Repaint), this._controller.OnMenuItemHoverChanged(this, n));
  }
  ResetWidth(n) {
    if (this.SetSize(n, this.H), this._expander != null) {
      let r = this.W - this._controller.ItemPadding.Right - this._expander.W;
      this._expander.SetPosition(r, this._expander.Y);
    }
  }
  VisitChildren(n) {
    this._icon != null && n(this._icon), this._expander != null && n(this._expander);
  }
  HitTest(n, r, l) {
    return this.ContainsPoint(n, r) ? (l.Add(this), !0) : !1;
  }
  Layout(n, r) {
    let l = this._controller.ItemPadding.Left;
    if (this.MenuItem.Type == Ie.Divider) {
      this.SetSize(l + 2, 6);
      return;
    }
    this._icon != null && (this._icon.Layout(n, r), this._icon.SetPosition(l, (r - this._icon.H) / 2), l += this._icon.W + 5), this._label != null && (this._label.Layout(n, r), this._label.SetPosition(l, (r - this._label.H) / 2), l += this._label.W + 5), this._expander != null && (this._expander.Layout(n, r), this._expander.SetPosition(l, (r - this._expander.H) / 2), l += this._expander.W), this.SetSize(l + this._controller.ItemPadding.Right, r);
  }
  Paint(n, r = null) {
    if (this.MenuItem.Type == Ie.Divider) {
      let l = S.Shared(D.Gray, CanvasKit.PaintStyle.Stroke, 2), o = this.H / 2;
      n.drawLine(this._controller.ItemPadding.Left, o, this.W - this._controller.ItemPadding.Horizontal, o, l);
      return;
    }
    if (this._isHover) {
      let l = S.Shared(this._controller.HoverColor, CanvasKit.PaintStyle.Fill);
      n.drawRect(f.FromLTWH(0, 0, this.W, this.H), l);
    }
    Ut.PaintChild(this._icon, n, r), Ut.PaintChild(this._label, n, r), Ut.PaintChild(this._expander, n, r);
  }
  static PaintChild(n, r, l) {
    n != null && (r.translate(n.X, n.Y), n.Paint(r, l), r.translate(-n.X, -n.Y));
  }
  toString() {
    return `MenuItemWidget["${this._label == null ? "" : this._label.Text.Value}"]`;
  }
};
let xt = Ut;
Xs = new WeakMap(), m(xt, "$meta_PixUI_IMouseRegion", !0);
class Ln extends xe {
  constructor(n, r) {
    super(n);
    m(this, "_closeAll");
    m(this, "_children", new g.List());
    this._closeAll = r;
  }
  get HasChild() {
    return this._children.length > 0;
  }
  Add(n) {
    n.Parent = this, this._children.Add(n), this._children.length == 1 ? this.Show() : this.Invalidate(c.Repaint);
  }
  TryCloseSome(n) {
    for (let l = this._children.length - 1; l >= 0; l--)
      if (n === this._children[l].Owner)
        return this.CloseTo(n.Depth), !0;
    let r = this._children[this._children.length - 1].Owner;
    return n.Depth == (r == null ? void 0 : r.Depth) ? this.CloseTo(n.Depth - 1) : r != null && !Ln.IsChildOf(n, r) && this.CloseTo(n.Depth - 1), !1;
  }
  static IsChildOf(n, r) {
    let l = !1;
    for (const o of r.MenuItem.Children)
      if (o === n.MenuItem) {
        l = !0;
        break;
      }
    return l;
  }
  CloseTo(n) {
    let r = !1;
    for (let l = this._children.length - 1; l >= 0 && l != n; l--)
      this._children[l].Parent = null, this._children.RemoveAt(l), r = !0;
    r && this.Invalidate(c.Repaint);
  }
  VisitChildren(n) {
    for (const r of this._children)
      if (n(r))
        break;
  }
  HitTest(n, r, l) {
    for (const o of this._children)
      if (this.HitTestChild(o, n, r, l))
        return !0;
    return !1;
  }
  Layout(n, r) {
  }
  Paint(n, r = null) {
    for (const l of this._children)
      n.translate(l.X, l.Y), l.Paint(n, r), n.translate(-l.X, -l.Y);
  }
  PreviewEvent(n, r) {
    if (n == $t.PointerDown) {
      let l = r, o = !1;
      for (const h of this._children)
        if (h.ContainsPoint(l.X, l.Y)) {
          o = !0;
          break;
        }
      if (!o)
        return this._closeAll(), U.Processed;
    }
    return super.PreviewEvent(n, r);
  }
}
class zn extends O {
  constructor(n, r, l, o) {
    super();
    m(this, "Owner");
    m(this, "_children");
    m(this, "_controller");
    if (n == null && r == null)
      throw new g.ArgumentNullException();
    this.Owner = n, this._controller = o, n != null ? (this._children = new g.List(n.MenuItem.Children.length), this.BuildMenuItemWidgets(n.MenuItem.Children, l)) : (this._children = new g.List(r.length), this.BuildMenuItemWidgets(r, l));
  }
  BuildMenuItemWidgets(n, r) {
    for (const l of n) {
      let o = new xt(l, r, !0, this._controller);
      o.Parent = this, this._children.Add(o);
    }
  }
  VisitChildren(n) {
    for (const r of this._children)
      if (n(r))
        break;
  }
  Layout(n, r) {
    if (this.HasLayout)
      return;
    this.HasLayout = !0;
    let l = 0, o = null, h = 0;
    for (const A of this._children)
      A.Layout(Number.POSITIVE_INFINITY, this._controller.PopupItemHeight), A.SetPosition(0, h), A.W >= l && (l = A.W, (o == null || A.MenuItem.Type != Ie.SubMenu) && (o = A)), h += A.H;
    o.MenuItem.Type != Ie.SubMenu && (l += x.DefaultFontSize);
    for (const A of this._children)
      A.ResetWidth(l);
    this.SetSize(l, h);
  }
  Paint(n, r = null) {
    let l = he.FromRectAndRadius(f.FromLTWH(0, 0, this.W, this.H), 4, 4), o = new CanvasKit.Path();
    o.addRRect(l), vn(n, o, D.Black, 5, !1, this.Root.Window.ScaleFactor);
    let h = S.Shared(this._controller.BackgroundColor);
    n.drawRRect(l, h), n.save(), n.clipPath(o, CanvasKit.ClipOp.Intersect, !1), this.PaintChildren(n, r), n.restore(), o.delete();
  }
}
class dl {
  static Show(a) {
    new tr().ShowContextMenu(a);
  }
}
class bl extends O {
  constructor(n, r, l = 1) {
    super();
    m(this, "_widget");
    m(this, "_label");
    m(this, "ColumnSpan");
    m(this, "_cachedLabelParagraph");
    if (l < 1)
      throw new g.ArgumentException();
    this._widget = r, this._widget.Parent = this, this._label = n, this.ColumnSpan = l;
  }
  VisitChildren(n) {
    n(this._widget);
  }
  Layout(n, r) {
    var o;
    this.CachedAvailableWidth = n, this.CachedAvailableHeight = r, (o = this._cachedLabelParagraph) != null || (this._cachedLabelParagraph = $a.BuildParagraph(
      this._label,
      Number.POSITIVE_INFINITY,
      x.DefaultFontSize,
      D.Black,
      null,
      1
    ));
    let l = this.Parent.LabelWidth + 5;
    this._widget.Layout(n - l, r), this._widget.SetPosition(l, 0), this.SetSize(n, Math.max(this._cachedLabelParagraph.getHeight(), this._widget.H));
  }
  Paint(n, r = null) {
    let l = this.Parent, o = l.LabelWidth, h = l.LabelAlignment, A = 0;
    h == te.Center ? A = (o - this._cachedLabelParagraph.getMaxIntrinsicWidth()) / 2 : h == te.Right && (A = o - this._cachedLabelParagraph.getMaxIntrinsicWidth()), n.save(), n.clipRect(f.FromLTWH(0, 0, o, this.H), CanvasKit.ClipOp.Intersect, !1), n.drawParagraph(
      this._cachedLabelParagraph,
      A,
      (this.H - this._cachedLabelParagraph.getHeight()) / 2
    ), n.restore(), this.PaintChildren(n, r);
  }
}
class Nl extends yn {
  constructor() {
    super();
    m(this, "_columns", 1);
    m(this, "_labelAlignment", te.Right);
    m(this, "_labelWidth", 120);
    m(this, "_padding", Z.All(5));
    m(this, "_horizontalSpacing", 5);
    m(this, "_verticalSpacing", 5);
  }
  get Columns() {
    return this._columns;
  }
  set Columns(n) {
    this._columns != n && (this._columns = n, this.IsMounted && this.Invalidate(c.Relayout));
  }
  get Padding() {
    return this._padding;
  }
  set Padding(n) {
    g.OpEquality(this._padding, n) || (this._padding = n, this.IsMounted && this.Invalidate(c.Relayout));
  }
  get LabelAlignment() {
    return this._labelAlignment;
  }
  set LabelAlignment(n) {
    this._labelAlignment != n && (this._labelAlignment = n, this.IsMounted && this.Invalidate(c.Relayout));
  }
  get LabelWidth() {
    return this._labelWidth;
  }
  set LabelWidth(n) {
    this._labelWidth != n && (this._labelWidth = n, this.IsMounted && this.Invalidate(c.Relayout));
  }
  Layout(n, r) {
    let l = this.CacheAndCheckAssignWidth(n), o = this.CacheAndCheckAssignHeight(r), h = (l - (this._columns - 1) * this._horizontalSpacing - this._padding.Left - this._padding.Right) / this._columns, A = this._padding.Top, y = 0, F = 0;
    for (let u = 0; u < this._children.length; u++) {
      let w = o - A;
      if (w <= 0)
        break;
      let P = this._children[u], C = Math.min(P.ColumnSpan, this._columns - y);
      P.Layout(h * C + (C - 1) * this._horizontalSpacing, w), P.SetPosition(
        this._padding.Left + y * this._horizontalSpacing + y * h,
        A
      ), F = Math.max(F, P.H), y += C, y == this._columns ? (A += this._verticalSpacing + F, y = 0, F = 0) : u == this._children.length - 1 && (A += F);
    }
    this.SetSize(l, Math.min(A + this._padding.Bottom, o));
  }
}
var qs;
class sr extends K {
  constructor() {
    super();
    m(this, "IsSelected", p.op_Implicit_From(!1));
    m(this, "_isHover", !1);
    b(this, qs, void 0);
    this.MouseRegion = new We(() => Le.Hand, !1), this.MouseRegion.HoverChanged.Add(this._OnHoverChanged, this), this.Bind(this.IsSelected, W.AffectsVisual);
  }
  get TabBar() {
    return this.Parent;
  }
  get MouseRegion() {
    return d(this, qs);
  }
  set MouseRegion(n) {
    N(this, qs, n);
  }
  set OnTap(n) {
    this.MouseRegion.PointerTap.Add(n, this);
  }
  _OnHoverChanged(n) {
    this._isHover = n, this.IsSelected.Value || this.Invalidate(c.Repaint);
  }
  get IsOpaque() {
    return this.IsSelected.Value ? this.TabBar.SelectedColor != null && this.TabBar.SelectedColor.IsOpaque : this._isHover ? this.TabBar.HoverColor != null && this.TabBar.HoverColor.IsOpaque : !1;
  }
  Layout(n, r) {
    let l = this.CacheAndCheckAssignWidth(n), o = this.CacheAndCheckAssignHeight(r);
    if (this.Child == null) {
      this.SetSize(0, 0);
      return;
    }
    this.Child.Layout(l, o), this.TabBar.Scrollable ? (this.SetSize(this.Child.W, o), this.Child.SetPosition(0, (o - this.Child.H) / 2)) : (this.SetSize(l, o), this.Child.SetPosition((l - this.Child.W) / 2, (o - this.Child.H) / 2));
  }
  Paint(n, r = null) {
    this.IsSelected.Value ? this.TabBar.SelectedColor != null && n.drawRect(
      f.FromLTWH(0, 0, this.W, this.H),
      S.Shared(this.TabBar.SelectedColor)
    ) : this._isHover && this.TabBar.HoverColor != null && n.drawRect(
      f.FromLTWH(0, 0, this.W, this.H),
      S.Shared(this.TabBar.HoverColor)
    ), this.Child != null && (n.translate(this.Child.X, this.Child.Y), this.Child.Paint(n, r == null ? void 0 : r.ToChild(this.Child)), n.translate(-this.Child.X, -this.Child.Y), this.IsSelected.Value && n.drawRect(
      f.FromLTWH(0, this.H - 4, this.W, 4),
      S.Shared(x.FocusedColor)
    ));
  }
}
qs = new WeakMap(), m(sr, "$meta_PixUI_IMouseRegion", !0);
var Qs;
class cl {
  constructor(a) {
    m(this, "_tabBar");
    m(this, "_tabBody");
    m(this, "DataSource");
    b(this, Qs, -1);
    m(this, "TabSelectChanged", new g.Event());
    m(this, "TabAdded", new g.Event());
    m(this, "TabClosed", new g.Event());
    this.DataSource = a;
  }
  get Count() {
    return this.DataSource.length;
  }
  get SelectedIndex() {
    return d(this, Qs);
  }
  set SelectedIndex(a) {
    N(this, Qs, a);
  }
  BindTabBar(a) {
    this._tabBar = a;
  }
  BindTabBody(a) {
    this._tabBody = a;
  }
  OnStateChanged(a, n) {
  }
  GetAt(a) {
    return this.DataSource[a];
  }
  IndexOf(a) {
    return this.DataSource.IndexOf(a);
  }
  SelectAt(a, n = !1) {
    var l;
    if (a < 0 || a == this.SelectedIndex)
      return;
    this._tabBar != null && this.SelectedIndex >= 0 && (this._tabBar.Tabs[this.SelectedIndex].IsSelected.Value = !1);
    let r = this.SelectedIndex;
    this.SelectedIndex = a, (l = this._tabBody) == null || l.SwitchFrom(r), this._tabBar != null && (this._tabBar.Tabs[this.SelectedIndex].IsSelected.Value = !0), this.TabSelectChanged.Invoke(a);
  }
  Add(a) {
    var n, r;
    this.DataSource.Add(a), (n = this._tabBar) == null || n.OnAdd(a), (r = this._tabBody) == null || r.OnAdd(a), this.TabAdded.Invoke(a), this.SelectAt(this.DataSource.length - 1);
  }
  Remove(a) {
    var l, o, h;
    let n = this.DataSource.IndexOf(a);
    if (n < 0)
      return;
    let r = n == this.SelectedIndex;
    if (n < this.SelectedIndex && (this.SelectedIndex -= 1), this.DataSource.RemoveAt(n), (l = this._tabBar) == null || l.OnRemoveAt(n), (o = this._tabBody) == null || o.OnRemoveAt(n), r)
      if (this.SelectedIndex = -1, this.DataSource.length > 0) {
        let A = Math.max(0, n - 1);
        this.SelectAt(A);
      } else
        (h = this._tabBody) == null || h.ClearBody(), this.TabSelectChanged.Invoke(-1);
    this.TabClosed.Invoke(a);
  }
}
Qs = new WeakMap();
var $s;
class jr extends O {
  constructor(n, r, l = !1) {
    super();
    m(this, "_controller");
    m(this, "_tabBuilder");
    m(this, "_tabs", new g.List());
    b(this, $s, !1);
    m(this, "_scrollOffset", 0);
    m(this, "BgColor");
    m(this, "SelectedColor");
    m(this, "HoverColor");
    if (this._controller = n, this._controller.BindTabBar(this), this._tabBuilder = r, this.Scrollable = l, this._controller.DataSource.length != this._tabs.length) {
      for (const o of this._controller.DataSource)
        this._tabs.Add(this.BuildTab(o));
      this._controller.SelectAt(0);
    }
  }
  get Tabs() {
    return this._tabs;
  }
  get Scrollable() {
    return d(this, $s);
  }
  set Scrollable(n) {
    N(this, $s, n);
  }
  OnTabSelected(n) {
    let r = this._tabs.IndexOf(n);
    this._controller.SelectAt(r, !0);
  }
  OnAdd(n) {
    this._tabs.Add(this.BuildTab(n)), this.Invalidate(c.Relayout);
  }
  OnRemoveAt(n) {
    this._tabs[n].Parent = null, this._tabs.RemoveAt(n), this.Invalidate(c.Relayout);
  }
  BuildTab(n) {
    let r = new sr();
    return this._tabBuilder(n, r), r.Parent = this, r.OnTap = (l) => this.OnTabSelected(r), r;
  }
  get IsOpaque() {
    return this.BgColor != null && this.BgColor.IsOpaque;
  }
  VisitChildren(n) {
    if (this._tabs.length != 0) {
      for (const r of this._tabs)
        if (n(r))
          break;
    }
  }
  HitTest(n, r, l) {
    if (!this.ContainsPoint(n, r))
      return !1;
    if (l.Add(this), this._tabs.length == 0)
      return !0;
    for (const o of this._tabs) {
      let h = o.X - this._scrollOffset;
      if (o.HitTest(n - h, r - o.Y, l))
        return !0;
    }
    return !0;
  }
  Layout(n, r) {
    let l = this.CacheAndCheckAssignWidth(n), o = this.CacheAndCheckAssignHeight(r);
    if (this._tabs.length == 0) {
      this.SetSize(l, o);
      return;
    }
    if (this.Scrollable) {
      this.SetSize(l, o);
      let h = 0;
      for (let A = 0; A < this._tabs.length; A++)
        this._tabs[A].Layout(Number.POSITIVE_INFINITY, o), this._tabs[A].SetPosition(h, 0), h += this._tabs[A].W;
    } else {
      this.SetSize(l, o);
      let h = l / this._tabs.length;
      for (let A = 0; A < this._tabs.length; A++)
        this._tabs[A].Layout(h, o), this._tabs[A].SetPosition(h * A, 0);
    }
  }
  Paint(n, r = null) {
    this.BgColor != null && n.drawRect(f.FromLTWH(0, 0, this.W, this.H), S.Shared(this.BgColor));
    for (const l of this._tabs)
      n.translate(l.X, l.Y), l.Paint(n, r == null ? void 0 : r.ToChild(l)), n.translate(-l.X, -l.Y);
  }
}
$s = new WeakMap();
class Wn extends En {
  constructor(n, r) {
    super();
    m(this, "_controller");
    m(this, "_bodyBuilder");
    m(this, "_bodies");
    this._controller = n, this._controller.BindTabBody(this), this._bodyBuilder = r, this._bodies = new g.List(new Array(this._controller.DataSource.length));
  }
  TryBuildBody() {
    let n = this._controller.SelectedIndex;
    if (this._bodies[n] == null) {
      let r = this._controller.DataSource[n];
      this._bodies[n] = this._bodyBuilder(r);
    }
    return this._bodies[n];
  }
  OnAdd(n) {
    this._bodies.Add(null);
  }
  OnRemoveAt(n) {
    this._bodies[n] != null && (this._bodies[n].Parent = null), this._bodies.RemoveAt(n);
  }
  SwitchFrom(n) {
    let r = this._controller.SelectedIndex, l = this.TryBuildBody();
    if (n < 0)
      this.ReplaceTo(l);
    else {
      let o = this.Child;
      o.SuspendingMount = !0, this.AnimateTo(
        o,
        l,
        200,
        !1,
        (h, A) => Wn.BuildDefaultTransition(
          h,
          A,
          new k(r > n ? 1 : -1, 0),
          k.Empty
        ),
        (h, A) => Wn.BuildDefaultTransition(
          h,
          A,
          k.Empty,
          new k(r > n ? -1 : 1, 0)
        )
      );
    }
  }
  ClearBody() {
    this.ReplaceTo(null);
  }
  static BuildDefaultTransition(n, r, l, o) {
    let h = new qa(l, o).Animate(n);
    return new er(h).Init({ Child: r });
  }
}
class fl extends O {
  constructor(n, r, l, o = !1, h = 35) {
    super();
    m(this, "_tabBar");
    m(this, "_tabBody");
    m(this, "_tabBarIndent");
    this._tabBarIndent = h, this._tabBody = new Wn(n, l), this._tabBar = new jr(n, (A, y) => {
      y.Child = new jn().Init(
        {
          IsLayoutTight: !0,
          Padding: p.op_Implicit_From(Z.Only(10, 2, o ? 0 : 10, 2)),
          Child: o ? new Ct().Init(
            {
              Children: [
                r(A, y.IsSelected),
                new Q(null, p.op_Implicit_From(ye.Filled.Close)).Init(
                  {
                    Style: Te.Transparent,
                    Shape: ie.Pills,
                    OnTap: (F) => n.Remove(A)
                  }
                )
              ]
            }
          ) : r(A, y.IsSelected)
        }
      );
    }, !0), this._tabBody.Parent = this, this._tabBar.Parent = this;
  }
  get TabBarBgColor() {
    return this._tabBar.BgColor;
  }
  set TabBarBgColor(n) {
    this._tabBar.BgColor = n;
  }
  get SelectedTabColor() {
    return this._tabBar.SelectedColor;
  }
  set SelectedTabColor(n) {
    this._tabBar.SelectedColor = n;
  }
  get HoverTabColor() {
    return this._tabBar.HoverColor;
  }
  set HoverTabColor(n) {
    this._tabBar.HoverColor = n;
  }
  VisitChildren(n) {
    n(this._tabBar) || n(this._tabBody);
  }
  Layout(n, r) {
    let l = this.CacheAndCheckAssignWidth(n), o = this.CacheAndCheckAssignHeight(r);
    this._tabBar.Layout(l, this._tabBarIndent), this._tabBar.SetPosition(0, 0), this._tabBody.Layout(l, o - this._tabBar.H), this._tabBody.SetPosition(0, this._tabBar.H), this.SetSize(l, o);
  }
}
class Re extends O {
  constructor(n, r) {
    super();
    m(this, "Data");
    m(this, "_controller");
    m(this, "_row");
    m(this, "_children");
    m(this, "IsSelected", p.op_Implicit_From(!1));
    m(this, "_color");
    m(this, "_checkState");
    m(this, "_expandController");
    m(this, "_expandCurve");
    m(this, "_expandArrowAnimation");
    m(this, "IsLeaf", !1);
    m(this, "IsLazyLoad", !1);
    m(this, "IsExpanded", !1);
    m(this, "_animationFlag", 0);
    m(this, "_animationValue", 0);
    this.Data = n, this._controller = r, this._row = new cn(), this._row.Parent = this, this._color = this.Compute1(this.IsSelected, (l) => l ? x.FocusedColor : D.Black), this.Bind(this.IsSelected, W.AffectsVisual);
  }
  get Controller() {
    return this._controller;
  }
  get Children() {
    var n;
    return (n = this._children) == null ? void 0 : n.ToArray();
  }
  set Icon(n) {
    var r, l;
    this._row.Icon = n, (l = (r = this._row.Icon).Color) != null || (r.Color = this._color);
  }
  set Label(n) {
    var r, l;
    this._row.Label = n, (l = (r = this._row.Label).TextColor) != null || (r.TextColor = this._color);
  }
  get IsExpanding() {
    return this._animationFlag == 1;
  }
  get IsCollapsing() {
    return this._animationFlag == -1;
  }
  get Depth() {
    let n = this, r = 0;
    for (; !(n.Parent instanceof Ue); )
      r++, n = n.Parent;
    return r;
  }
  get ParentNode() {
    return this.Parent == null || this.Parent instanceof Ue ? null : this.Parent;
  }
  TryBuildExpandIcon() {
    if (this._expandController != null)
      return;
    this._expandController = new ot(200, this.IsExpanded ? 1 : 0), this._expandController.ValueChanged.Add(this.OnAnimationValueChanged, this), this._expandCurve = new Qa(this._expandController, J.EaseInOutCubic), this._expandArrowAnimation = new Xa(0.75, 1).Animate(this._expandCurve);
    let n = new ya(this._expandArrowAnimation);
    n.OnPointerDown = this.OnTapExpander.bind(this), this._row.ExpandIcon = n;
  }
  OnAnimationValueChanged() {
    this._animationValue = this._expandController.Value, this.Invalidate(c.Relayout);
  }
  EnsureBuildChildren() {
    if (this.IsLeaf || this._children != null)
      return;
    let n = this._controller.ChildrenGetter(this.Data);
    this._children = new g.List(n.length);
    for (const r of n) {
      let l = new Re(r, this._controller);
      this._controller.NodeBuilder(r, l), l.TryBuildCheckbox(), l.Parent = this, this._children.Add(l);
    }
  }
  TryBuildAndLayoutChildren() {
    if (this._children != null && this.HasLayout && this._children.All((l) => l.HasLayout))
      return Ue.CalcMaxChildWidth(this._children);
    this.EnsureBuildChildren();
    let n = 0, r = this._controller.NodeHeight;
    for (let l = 0; l < this._children.length; l++) {
      let o = this._children[l];
      o.Layout(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY), o.SetPosition(0, r), r += o.H, n = Math.max(n, o.W);
    }
    return n;
  }
  OnTapExpander(n) {
    var r, l;
    if (this.IsExpanded)
      this.IsExpanded = !1, this._animationFlag = -1, (r = this._expandController) == null || r.Reverse();
    else {
      let o = this.TryBuildAndLayoutChildren();
      this.SetSize(Math.max(this.W, o), this.H), this.IsExpanded = !0, this._animationFlag = 1, (l = this._expandController) == null || l.Forward();
    }
  }
  VisitChildren(n) {
    if (!n(this._row) && !this.IsLeaf && this.IsExpanded && this._children != null) {
      for (const r of this._children)
        if (n(r))
          break;
    }
  }
  ContainsPoint(n, r) {
    return r >= 0 && r < this.H;
  }
  HitTest(n, r, l) {
    if (r < 0 || r > this.H)
      return !1;
    if (l.Add(this), r <= this._controller.NodeHeight)
      this.HitTestChild(this._row, n, r, l);
    else if (!this.IsLeaf && this._children != null) {
      for (const o of this._children)
        if (this.HitTestChild(o, n, r, l))
          break;
    }
    return !0;
  }
  Layout(n, r) {
    if (this.IsExpanding || this.IsCollapsing) {
      let l = this._children.Sum((h) => h.H), o = l * this._animationValue;
      this.IsCollapsing && this._animationValue == 0 ? (this._animationFlag = 0, this.SetSize(this._row.W, this._controller.NodeHeight)) : this.IsExpanding && this._animationValue == 1 ? (this._animationFlag = 0, this.SetSize(this.W, this._controller.NodeHeight + l)) : this.SetSize(this.W, this._controller.NodeHeight + o);
      return;
    }
    if (!this.HasLayout) {
      if (this.IsLeaf || this.TryBuildExpandIcon(), this._row.Layout(Number.POSITIVE_INFINITY, this.Controller.NodeHeight), this.IsLeaf || !this.IsExpanded) {
        this.SetSize(this._row.W, this._controller.NodeHeight), this.HasLayout = !0;
        return;
      }
      if (!this.IsLeaf && this.IsExpanded) {
        let l = this.TryBuildAndLayoutChildren();
        this.SetSize(
          Math.max(this._row.W, l),
          this._controller.NodeHeight + this._children.Sum((o) => o.H)
        ), this.HasLayout = !0;
      }
    }
  }
  OnChildSizeChanged(n, r, l, o) {
    let h = this.W, A = this.H;
    o.Widget = this, o.OldX += this.X, o.OldY += this.Y, l != 0 && this._children != null && Ue.UpdatePositionAfter(n, this._children, l);
    let y = h, F = A + l;
    r > 0 ? y = Math.max(n.W, this.W) : r < 0 && n.W - r == this._controller.TotalWidth && (this._children == null ? y = n.W : y = Math.max(Ue.CalcMaxChildWidth(this._children), this.W)), this.SetSize(y, F), this.Parent.OnChildSizeChanged(this, y - h, F - A, o);
  }
  Paint(n, r = null) {
    if ((this.IsExpanding || this.IsCollapsing) && (n.save(), n.clipRect(
      f.FromLTWH(0, 0, this._controller.TreeView.W, this.H),
      CanvasKit.ClipOp.Intersect,
      !1
    )), this._row.Paint(n, r), this.IsExpanding || this.IsCollapsing) {
      for (let l = 0; l < this._children.length && (Re.PaintChildNode(this._children[l], n, r), !((l + 1) * this._controller.NodeHeight >= this.H)); l++)
        ;
      n.restore();
    } else if (!this.IsLeaf && this.IsExpanded)
      for (const l of this._children)
        Re.PaintChildNode(l, n, r);
  }
  static PaintChildNode(n, r, l) {
    r.translate(n.X, n.Y), n.Paint(r, l == null ? void 0 : l.ToChild(n)), r.translate(-n.X, -n.Y), Xe.PaintWidgetBorder(n, r);
  }
  toString() {
    return `TreeNode["${this._row.Label == null ? "" : this._row.Label.Text.Value}"]`;
  }
  TryBuildCheckbox() {
    if (!this.Controller.ShowCheckbox)
      return;
    this._checkState = new ia(!1);
    let n = Ee.Tristate(this._checkState);
    n.ValueChanged.Add(this.OnCheckChanged, this), this._row.Checkbox = n;
  }
  OnCheckChanged(n) {
    this.Controller.SuspendAutoCheck || (this.Controller.SuspendAutoCheck = !0, Re.AutoCheckParent(this.ParentNode), Re.AutoCheckChildren(this, n), this.Controller.SuspendAutoCheck = !1), this.Controller.RaiseCheckChanged(this);
  }
  static AutoCheckParent(n) {
    if (n == null)
      return;
    let r = !0, l = !0;
    for (const h of n._children)
      if (h._checkState.Value == null) {
        r = !1, l = !1;
        break;
      } else
        h._checkState.Value == !0 ? l = !1 : r = !1;
    let o = null;
    r ? o = !0 : l && (o = !1), n._checkState.Value = o, Re.AutoCheckParent(n.ParentNode);
  }
  static AutoCheckChildren(n, r) {
    if (console.assert(r), !n.IsLeaf && (n.EnsureBuildChildren(), n._children != null && n._children.length > 0))
      for (const l of n._children)
        l._checkState.Value = r, Re.AutoCheckChildren(l, r);
  }
  SetChecked(n) {
    if (!this.Controller.ShowCheckbox)
      throw new g.InvalidOperationException("Not supported");
    this._checkState.Value = n;
  }
  get CheckState() {
    var n;
    return (n = this._checkState) == null ? void 0 : n.Value;
  }
  FindNode(n) {
    if (n(this.Data))
      return this;
    if (!this.IsLeaf) {
      this.EnsureBuildChildren();
      for (const r of this._children) {
        let l = r.FindNode(n);
        if (l != null)
          return l;
      }
    }
    return null;
  }
  Expand() {
    this.IsLeaf || this.IsExpanded || (this.IsExpanded = !0, this.HasLayout = !1, this.TryBuildExpandIcon(), this._expandController.Forward(1), this.Parent === this._controller.TreeView ? this._controller.TreeView.Invalidate(c.Relayout) : this.Invalidate(c.Relayout));
  }
  InsertChild(n, r) {
    if (this.IsLeaf)
      return;
    this.EnsureBuildChildren();
    let l = n < 0 ? this._children.length : n;
    this._children.Insert(l, r), this._controller.ChildrenGetter(this.Data).Insert(l, r.Data), this.HasLayout = !1;
  }
  RemoveChild(n) {
    this._children.Remove(n), this._controller.ChildrenGetter(this.Data).Remove(n.Data), this.HasLayout = !1;
  }
}
var js;
const Nt = class extends O {
  constructor() {
    super();
    m(this, "_expander");
    m(this, "_checkbox");
    m(this, "_icon");
    m(this, "_label");
    m(this, "_isHover", !1);
    b(this, js, void 0);
    this.MouseRegion = new We(null, !1), this.MouseRegion.HoverChanged.Add(this._OnHoverChanged, this), this.MouseRegion.PointerTap.Add(this._OnTap, this);
  }
  get MouseRegion() {
    return d(this, js);
  }
  set MouseRegion(n) {
    N(this, js, n);
  }
  set ExpandIcon(n) {
    this._expander = n, this._expander.Parent = this;
  }
  set Checkbox(n) {
    this._checkbox = n, this._checkbox.Parent = this;
  }
  get Icon() {
    return this._icon;
  }
  set Icon(n) {
    this._icon = n, this._icon.Parent = this;
  }
  get Label() {
    return this._label;
  }
  set Label(n) {
    this._label = n, this._label != null && (this._label.Parent = this);
  }
  get TreeNode() {
    return this.Parent;
  }
  get Controller() {
    return this.TreeNode.Controller;
  }
  _OnHoverChanged(n) {
    this._isHover = n, this.Invalidate(
      c.Repaint,
      new Fn(f.FromLTWH(
        0,
        0,
        this.Controller.TreeView.W,
        this.Controller.NodeHeight
      ))
    );
  }
  _OnTap(n) {
    this.Controller.SelectNode(this.TreeNode);
  }
  get IsOpaque() {
    return this._isHover && this.Controller.HoverColor.IsOpaque;
  }
  ContainsPoint(n, r) {
    return r >= 0 && r < this.H && n >= 0 && n < this.Controller.TreeView.W;
  }
  VisitChildren(n) {
    this._checkbox != null && n(this._checkbox), this._icon != null && n(this._icon), this._label != null && n(this._label);
  }
  HitTest(n, r, l) {
    return r < 0 || r > this.H ? !1 : (l.Add(this), this._expander != null && this.HitTestChild(this._expander, n, r, l), this._checkbox != null && this.HitTestChild(this._checkbox, n, r, l), !0);
  }
  Layout(n, r) {
    var o, h;
    let l = this.TreeNode.Depth * this.Controller.NodeIndent;
    this._expander != null && ((o = this._expander) == null || o.Layout(this.Controller.NodeHeight, this.Controller.NodeHeight), (h = this._expander) == null || h.SetPosition(l, (this.Controller.NodeHeight - this._expander.H) / 2)), l += this.Controller.NodeIndent, this.Controller.ShowCheckbox ? (this._checkbox.Layout(this.Controller.NodeHeight, this.Controller.NodeHeight), this._checkbox.SetPosition(l, (this.Controller.NodeHeight - this._checkbox.H) / 2), l += this._checkbox.W) : (this._icon != null && (this._icon.Layout(this.Controller.NodeHeight, this.Controller.NodeHeight), this._icon.SetPosition(l, (this.Controller.NodeHeight - this._icon.H) / 2)), l += this.Controller.NodeIndent), this._label != null && (this._label.Layout(Number.POSITIVE_INFINITY, this.Controller.NodeHeight), this._label.SetPosition(l, (this.Controller.NodeHeight - this._label.H) / 2), l += this._label.W), this.SetSize(l, this.Controller.NodeHeight);
  }
  Paint(n, r = null) {
    if (this._isHover) {
      let l = S.Shared(this.Controller.HoverColor);
      n.drawRect(
        f.FromLTWH(0, 0, this.Controller.TreeView.W, this.Controller.NodeHeight),
        l
      );
    }
    Nt.PaintChild(this._expander, n), this.Controller.ShowCheckbox ? Nt.PaintChild(this._checkbox, n) : Nt.PaintChild(this._icon, n), Nt.PaintChild(this._label, n);
  }
  static PaintChild(n, r) {
    n != null && (r.translate(n.X, n.Y), n.Paint(r), r.translate(-n.X, -n.Y), Xe.PaintWidgetBorder(n, r));
  }
  toString() {
    return `TreeNodeRow["${this._label == null ? "" : this._label.Text.Value}"]`;
  }
};
let cn = Nt;
js = new WeakMap(), m(cn, "$meta_PixUI_IMouseRegion", !0);
var Js, Zs;
class pl {
  constructor(a, n) {
    b(this, Js, void 0);
    m(this, "NodeBuilder");
    m(this, "ChildrenGetter");
    m(this, "Nodes", new g.List());
    m(this, "ScrollController", new na(jt.Both));
    m(this, "_selectedNodes", new g.List());
    m(this, "SelectionChanged", new g.Event());
    m(this, "HoverColor", new T(4289374890));
    m(this, "NodeIndent", 20);
    m(this, "NodeHeight", 0);
    m(this, "TotalWidth", 0);
    m(this, "TotalHeight", 0);
    m(this, "ShowCheckbox", !1);
    m(this, "SuspendAutoCheck", !1);
    m(this, "CheckChanged", new g.Event());
    m(this, "_isLoading", !1);
    b(this, Zs, void 0);
    m(this, "_dataSource");
    this.NodeBuilder = a, this.ChildrenGetter = n;
  }
  get TreeView() {
    return d(this, Js);
  }
  set TreeView(a) {
    N(this, Js, a);
  }
  get RootNodes() {
    return this.Nodes.ToArray();
  }
  get FirstSelectedNode() {
    return this._selectedNodes.length > 0 ? this._selectedNodes[0] : null;
  }
  get SelectedNodes() {
    return this._selectedNodes.ToArray();
  }
  RaiseCheckChanged(a) {
    this.CheckChanged.Invoke(a);
  }
  get LoadingPainter() {
    return d(this, Zs);
  }
  set LoadingPainter(a) {
    N(this, Zs, a);
  }
  get IsLoading() {
    return this._isLoading;
  }
  set IsLoading(a) {
    var n, r, l;
    this._isLoading != a && (this._isLoading = a, this._isLoading ? (this.LoadingPainter = new le(), this.LoadingPainter.Start(() => {
      var o;
      return (o = this.TreeView) == null ? void 0 : o.Invalidate(c.Repaint);
    })) : ((n = this.LoadingPainter) == null || n.Stop(), (r = this.LoadingPainter) == null || r.Dispose(), this.LoadingPainter = null), (l = this.TreeView) == null || l.Invalidate(c.Repaint));
  }
  get DataSource() {
    return this._dataSource;
  }
  set DataSource(a) {
    this._dataSource = a, this.TreeView != null && this.TreeView.IsMounted && (this.Nodes.Clear(), this.InitNodes(this.TreeView), this.TreeView.Invalidate(c.Relayout));
  }
  InitNodes(a) {
    if (this.TreeView = a, this._dataSource != null)
      for (const n of this._dataSource) {
        let r = new Re(n, this);
        this.NodeBuilder(n, r), r.TryBuildCheckbox(), r.Parent = a, this.Nodes.Add(r);
      }
  }
  FindNode(a) {
    for (const n of this.Nodes) {
      let r = n.FindNode(a);
      if (r != null)
        return r;
    }
    return null;
  }
  SelectNode(a) {
    if (!(this._selectedNodes.length == 1 && this._selectedNodes[0] === a)) {
      for (const n of this._selectedNodes)
        n.IsSelected.Value = !1;
      this._selectedNodes.Clear(), this._selectedNodes.Add(a), a.IsSelected.Value = !0, this.SelectionChanged.Invoke();
    }
  }
  ExpandTo(a) {
    let n = a.Parent;
    for (; n != null && n !== this.TreeView; ) {
      let r = n;
      r.Expand(), n = r.Parent;
    }
  }
  InsertNode(a, n = null, r = -1) {
    let l = new Re(a, this);
    if (this.NodeBuilder(a, l), n == null) {
      l.Parent = this.TreeView;
      let o = r < 0 ? this.Nodes.length : r;
      this.Nodes.Insert(o, l), this.DataSource.Insert(o, a), this.TreeView.Invalidate(c.Relayout);
    } else
      l.Parent = n, n.InsertChild(r, l), n.IsExpanded && n.Invalidate(c.Relayout);
    return l;
  }
  RemoveNode(a) {
    if (a.Parent === this.TreeView)
      this.Nodes.Remove(a), this.DataSource.Remove(a.Data), a.Parent = null, this.TreeView.Invalidate(c.Relayout);
    else {
      let r = a.Parent;
      r.RemoveChild(a), a.Parent = null, r.IsExpanded && r.Invalidate(c.Relayout);
    }
    let n = this._selectedNodes.IndexOf(a);
    n >= 0 && (this._selectedNodes.RemoveAt(n), this.SelectionChanged.Invoke());
  }
  SetChecked(a, n) {
    let r = this.FindNode((l) => g.Equals(a, l));
    if (r == null)
      throw new g.Exception("Can't find node");
    r.SetChecked(n);
  }
}
Js = new WeakMap(), Zs = new WeakMap();
const xn = class extends O {
  constructor(n, r = !1, l = 30) {
    super();
    m(this, "_controller");
    m(this, "_color");
    this._controller = n, this._controller.NodeHeight = l, this._controller.ShowCheckbox = r, this._controller.InitNodes(this);
  }
  get Color() {
    return this._color;
  }
  set Color(n) {
    this._color = this.Rebind(this._color, n, W.AffectsVisual);
  }
  set OnCheckChanged(n) {
    this._controller.CheckChanged.Add(n, this);
  }
  get ScrollOffsetX() {
    return this._controller.ScrollController.OffsetX;
  }
  get ScrollOffsetY() {
    return this._controller.ScrollController.OffsetY;
  }
  OnScroll(n, r) {
    if (this._controller.Nodes.length == 0)
      return k.Empty;
    let l = Math.max(0, this._controller.TotalWidth - this.W), o = Math.max(0, this._controller.TotalHeight - this.H), h = this._controller.ScrollController.OnScroll(n, r, l, o);
    return h.IsEmpty || this.Invalidate(c.Repaint), h;
  }
  get IsOpaque() {
    return this._color != null && this._color.Value.Alpha == 255;
  }
  get Clipper() {
    return new Rt(f.FromLTWH(0, 0, this.W, this.H));
  }
  VisitChildren(n) {
    for (const r of this._controller.Nodes)
      if (n(r))
        break;
  }
  Layout(n, r) {
    let l = this.CacheAndCheckAssignWidth(n), o = this.CacheAndCheckAssignHeight(r);
    this.SetSize(l, o);
    let h = 0, A = 0;
    for (const y of this._controller.Nodes)
      y.Layout(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY), y.SetPosition(0, A), h = Math.max(h, y.W), A += y.H;
    this._controller.TotalWidth = h, this._controller.TotalHeight = A;
  }
  OnChildSizeChanged(n, r, l, o) {
    o.OldW = this.W, o.OldH = this.H - n.Y, xn.UpdatePositionAfter(n, this._controller.Nodes, l), r > 0 ? this._controller.TotalWidth = Math.max(n.W, this._controller.TotalWidth) : r < 0 && n.W - r == this._controller.TotalWidth && (this._controller.TotalWidth = xn.CalcMaxChildWidth(this._controller.Nodes)), this._controller.TotalHeight += l;
  }
  Paint(n, r = null) {
    var o;
    if (this._controller.IsLoading) {
      this._color != null && n.drawRect(f.FromLTWH(0, 0, this.W, this.H), S.Shared(this._color.Value)), this._controller.LoadingPainter.PaintToWidget(this, n);
      return;
    }
    n.save(), n.clipRect(f.FromLTWH(0, 0, this.W, this.H), CanvasKit.ClipOp.Intersect, !1), this._color != null && n.drawRect(f.FromLTWH(0, 0, this.W, this.H), S.Shared(this._color.Value));
    let l = ((o = r == null ? void 0 : r.GetRect()) != null ? o : f.FromLTWH(0, 0, this.W, this.H)).Clone();
    for (const h of this._controller.Nodes) {
      let A = h.X - this.ScrollOffsetX, y = h.Y - this.ScrollOffsetY;
      if (y >= l.Bottom)
        break;
      y + h.H <= l.Top || (n.translate(A, y), h.Paint(n, null), n.translate(-A, -y));
    }
    n.restore();
  }
  static CalcMaxChildWidth(n) {
    let r = 0;
    for (const l of n)
      r = Math.max(r, l.W);
    return r;
  }
  static UpdatePositionAfter(n, r, l) {
    let o = -1;
    for (let h = 0; h < r.length; h++)
      if (o == -1)
        r[h] === n && (o = h);
      else {
        let A = r[h];
        A.SetPosition(A.X, A.Y + l);
      }
  }
};
let Ue = xn;
m(Ue, "$meta_PixUI_IScrollable", !0);
class Hn {
  constructor(a, n) {
    m(this, "RowIndex");
    m(this, "CachedItem");
    this.RowIndex = a, this.CachedItem = n;
  }
}
class ua {
  Compare(a, n) {
    return a.RowIndex.CompareTo(n.RowIndex);
  }
}
m(ua, "$meta_System_IComparer", !0);
class De {
  constructor() {
    m(this, "Color");
    m(this, "BackgroundColor");
    m(this, "FontSize", 15);
    m(this, "FontWeight", CanvasKit.FontWeight.Normal);
    m(this, "HorizontalAlignment", te.Left);
    m(this, "VerticalAlignment", Ae.Middle);
  }
}
m(De, "CellPadding", 5);
var Ks;
class ka extends O {
  constructor(n, r = null) {
    super();
    m(this, "_controller");
    m(this, "Theme");
    b(this, Ks, void 0);
    this._controller = n, this._controller.Attach(this), this.Theme = r != null ? r : fn.Default, this.MouseRegion = new We(), this.MouseRegion.PointerMove.Add(this._controller.OnPointerMove, this._controller), this.MouseRegion.PointerDown.Add(this._controller.OnPointerDown, this._controller);
  }
  get Columns() {
    return this._controller.Columns;
  }
  set Columns(n) {
    this._controller.Columns = n;
  }
  get MouseRegion() {
    return d(this, Ks);
  }
  set MouseRegion(n) {
    N(this, Ks, n);
  }
  get ScrollOffsetX() {
    return this._controller.ScrollController.OffsetX;
  }
  get ScrollOffsetY() {
    return this._controller.ScrollController.OffsetY;
  }
  OnScroll(n, r) {
    if (this._controller.DataView == null || this._controller.DataView.length == 0)
      return k.Empty;
    let l = this._controller.TotalRowsHeight, o = this._controller.TotalHeaderHeight, h = Math.max(0, this._controller.TotalColumnsWidth - this.W), A = Math.max(0, l - (this.H - o)), y = this._controller.VisibleStartRowIndex, F = this._controller.VisibleRows, u = this._controller.ScrollController.OnScroll(n, r, h, A);
    if (!u.IsEmpty) {
      if (r > 0) {
        let w = this._controller.VisibleStartRowIndex;
        w != y && this._controller.ClearCacheOnScroll(!0, w);
      } else {
        let w = y + F, P = this._controller.VisibleStartRowIndex + F;
        w != P && this._controller.ClearCacheOnScroll(!1, P);
      }
      this.Invalidate(c.Repaint);
    }
    return u;
  }
  Layout(n, r) {
    let l = this.CacheAndCheckAssignWidth(n), o = this.CacheAndCheckAssignHeight(r);
    this.SetSize(l, o), this._controller.CalcColumnsWidth(new Qt(l, o));
  }
  Paint(n, r = null) {
    let l = new Qt(this.W, this.H);
    n.save(), n.clipRect(f.FromLTWH(0, 0, this.W, this.H), CanvasKit.ClipOp.Intersect, !1);
    let o = this._controller.LayoutVisibleColumns(l.Clone()), h = this._controller.TotalColumnsWidth;
    if (this.PaintHeader(n, l.Clone(), h, o), this._controller.DataView == null || this._controller.DataView.length == 0) {
      n.restore();
      return;
    }
    if (this._controller.ScrollController.OffsetY > 0) {
      let A = f.FromLTWH(
        0,
        this._controller.TotalHeaderHeight,
        l.Width,
        l.Height - this._controller.TotalHeaderHeight
      );
      n.clipRect(A, CanvasKit.ClipOp.Intersect, !1);
    }
    if (this.PaintRows(n, l.Clone(), h, o), this._controller.ScrollController.OffsetY > 0) {
      let A = new CanvasKit.Path();
      A.addRect(f.FromLTWH(
        0,
        0,
        Math.min(l.Width, h),
        this._controller.TotalHeaderHeight
      )), vn(n, A, D.Black, 5, !1, this.Root.Window.ScaleFactor), A.delete();
    }
    this.PaintHighlight(n), n.restore();
  }
  PaintHeader(n, r, l, o) {
    let h = new g.List();
    if (r.Width < l && this._controller.HasFrozen) {
      let A = o.Where((u) => u.Frozen);
      for (const u of A)
        this.PaintHeaderCell(n, u, h);
      let y = this._controller.GetScrollClipRect(0, r.Height);
      n.save(), n.clipRect(y, CanvasKit.ClipOp.Intersect, !1);
      let F = o.Where((u) => !u.Frozen);
      for (const u of F)
        this.PaintHeaderCell(n, u, h);
      n.restore();
    } else
      for (const A of o)
        this.PaintHeaderCell(n, A, h);
  }
  PaintHeaderCell(n, r, l) {
    let o = this.GetHeaderCellRect(r);
    if (r.PaintHeader(n, o.Clone(), this.Theme), this.PaintCellBorder(n, o), r.Parent != null && !l.Contains(r.Parent)) {
      let h = r.Parent, A = h.Children.indexOf(r), y = 0;
      for (let F = 0; F < A; F++)
        y += h.Children[F].LayoutWidth;
      h.CachedLeft = r.CachedLeft - y, this.PaintHeaderCell(n, h, l), l.Add(h);
    }
  }
  GetHeaderCellRect(n) {
    let r = n.HeaderRowIndex, l = r * this._controller.HeaderRowHeight, o = n instanceof nr ? this._controller.HeaderRowHeight : (this._controller.HeaderRows - r) * this._controller.HeaderRowHeight;
    return f.FromLTWH(n.CachedLeft, l, n.LayoutWidth, o);
  }
  PaintRows(n, r, l, o) {
    let h = this._controller.TotalHeaderHeight, A = this._controller.ScrollDeltaY, y = this._controller.VisibleStartRowIndex;
    if (r.Width < l && this._controller.HasFrozen) {
      let F = o.Where((P) => P.Frozen == !0);
      for (const P of F)
        this.PaintColumnCells(n, P, y, h, A, r.Height);
      let u = this._controller.GetScrollClipRect(h, r.Height - h);
      n.save(), n.clipRect(u, CanvasKit.ClipOp.Intersect, !1);
      let w = o.Where((P) => P.Frozen == !1);
      for (const P of w)
        this.PaintColumnCells(
          n,
          P,
          y,
          h,
          A,
          r.Height
        );
      n.restore();
    } else
      for (const F of o)
        this.PaintColumnCells(
          n,
          F,
          y,
          h,
          A,
          r.Height
        );
  }
  PaintColumnCells(n, r, l, o, h, A) {
    let y = this.Theme.RowHeight;
    for (let F = l; F < this._controller.DataView.length; F++) {
      let u = f.FromLTWH(
        r.CachedLeft,
        o - h,
        r.LayoutWidth,
        y
      );
      if (this.Theme.StripeRows && F % 2 != 0) {
        let P = S.Shared(this.Theme.StripeBgColor);
        n.drawRect(u, P);
      }
      r.PaintCell(n, this._controller, F, u.Clone());
      let w = new f(
        r.CachedVisibleLeft,
        u.Top,
        r.CachedVisibleRight,
        u.Top + y
      );
      if (this.PaintCellBorder(n, w), o += y, o >= A)
        break;
    }
  }
  PaintCellBorder(n, r) {
    let l = S.Shared(this.Theme.BorderColor, CanvasKit.PaintStyle.Stroke, 1);
    n.drawRect(r, l);
  }
  PaintHighlight(n) {
    if (this.Theme.HighlightingCurrentRow) {
      let r = this._controller.GetCurrentRowRect();
      if (r != null)
        if (this.Theme.HighlightingCurrentCell) {
          let l = S.Shared(this.Theme.HighlightRowBgColor);
          n.drawRect(r, l);
        } else {
          let l = S.Shared(
            x.FocusedColor,
            CanvasKit.PaintStyle.Stroke,
            x.FocusedBorderWidth
          );
          n.drawRect(r, l);
        }
    }
    if (this.Theme.HighlightingCurrentCell) {
      let r = this._controller.GetCurrentCellRect();
      if (r != null) {
        let l = S.Shared(
          x.FocusedColor,
          CanvasKit.PaintStyle.Stroke,
          x.FocusedBorderWidth
        );
        n.drawRect(r, l);
      }
    }
  }
}
Ks = new WeakMap(), m(ka, "$meta_PixUI_IScrollable", !0), m(ka, "$meta_PixUI_IMouseRegion", !0);
var _s, en, tn;
class Cl {
  constructor() {
    m(this, "ScrollController", new na(jt.Both));
    m(this, "_columns");
    m(this, "_owner");
    b(this, _s, 1);
    b(this, en, 35);
    b(this, tn, !1);
    m(this, "_dataSource");
    m(this, "_cachedLeafColumns", new g.List());
    m(this, "_cachedVisibleColumns", new g.List());
    m(this, "_cachedWidgetSize", new Qt(0, 0));
    m(this, "_cachedScrollLeft", 0);
    m(this, "_cachedScrollRight", 0);
    m(this, "_cachedHitInHeader");
    m(this, "_cachedHitInRows");
    m(this, "_selectedRows", new g.List());
    m(this, "SelectionChanged", new g.Event());
  }
  Attach(a) {
    this._owner = a;
  }
  get Theme() {
    return this._owner.Theme;
  }
  get DataGrid() {
    return this._owner;
  }
  get Columns() {
    return this._columns;
  }
  set Columns(a) {
    this._columns = a, this.HeaderRows = 1, this._cachedLeafColumns.Clear();
    for (const n of this._columns)
      this.GetLeafColumns(n, this._cachedLeafColumns, null);
    this.HasFrozen = this._cachedLeafColumns.Any((n) => n.Frozen), this._owner != null && this._owner.IsMounted && this._owner.Invalidate(c.Relayout);
  }
  get HeaderRows() {
    return d(this, _s);
  }
  set HeaderRows(a) {
    N(this, _s, a);
  }
  get HeaderRowHeight() {
    return d(this, en);
  }
  set HeaderRowHeight(a) {
    N(this, en, a);
  }
  get TotalHeaderHeight() {
    return this.HeaderRows * this.HeaderRowHeight;
  }
  get TotalRowsHeight() {
    return this.DataView == null ? 0 : this.DataView.length * this.Theme.RowHeight;
  }
  get TotalColumnsWidth() {
    return this._cachedLeafColumns.Sum((a) => a.LayoutWidth);
  }
  get HasFrozen() {
    return d(this, tn);
  }
  set HasFrozen(a) {
    N(this, tn, a);
  }
  get ScrollDeltaY() {
    return this.ScrollController.OffsetY % this.Theme.RowHeight;
  }
  get VisibleStartRowIndex() {
    return Math.floor(Math.trunc(this.ScrollController.OffsetY / this.Theme.RowHeight)) & 4294967295;
  }
  get VisibleRows() {
    return Math.floor(Math.ceil(Math.max(0, this.DataGrid.H - this.TotalHeaderHeight) / this.Theme.RowHeight)) & 4294967295;
  }
  set DataSource(a) {
    var l;
    let n = this._dataSource == null ? !0 : this._dataSource.length == 0, r = a == null ? !0 : a.length == 0;
    this._dataSource = a, this.ClearAllCache(), !(n && r) && ((l = this._owner) == null || l.Invalidate(c.Repaint));
  }
  get DataView() {
    return this._dataSource;
  }
  get CurrentRowIndex() {
    return this._selectedRows.length > 0 ? this._selectedRows[0] : -1;
  }
  ObserveCurrentRow() {
    let a = new ma(
      () => this.DataView == null || this._selectedRows.length == 0 ? null : this.DataView[this._selectedRows[0]],
      (n) => {
        if (n == null) {
          this.ClearSelection();
          return;
        }
        let r = this.DataView.IndexOf(n);
        this.SelectAt(r);
      },
      !1
    );
    return this.SelectionChanged.Add(() => a.NotifyValueChanged()), a;
  }
  SelectAt(a) {
    let n = this.CurrentRowIndex, r = a;
    this.TrySelectRow(n, r);
  }
  ClearSelection() {
    this._selectedRows.Clear(), this._cachedHitInRows = null, this.SelectionChanged.Invoke();
  }
  TrySelectRow(a, n) {
    a != n && (this._selectedRows.Clear(), n != -1 && this._selectedRows.Add(n), this.SelectionChanged.Invoke());
  }
  Invalidate() {
    var a;
    (a = this._owner) == null || a.Invalidate(c.Repaint);
  }
  ClearAllCache() {
    for (const a of this._cachedLeafColumns)
      a.ClearAllCache();
  }
  ClearCacheOnScroll(a, n) {
    for (const r of this._cachedLeafColumns)
      r.ClearCacheOnScroll(a, n);
  }
  OnPointerMove(a) {
    var n;
    if (a.Buttons == tt.None)
      a.Y <= this.TotalHeaderHeight ? (this._cachedHitInHeader = this.HitTestInHeader(a.X, a.Y), this._cachedHitInHeader != null && this._cachedHitInHeader.IsColumnResizer ? $.Current = Le.ResizeLR : $.Current = Le.Arrow) : this._cachedHitInHeader != null && ($.Current = Le.Arrow, this._cachedHitInHeader = null);
    else if (a.Buttons == tt.Left && a.DeltaX != 0 && this._cachedHitInHeader != null) {
      let r = this._cachedHitInHeader.Column;
      if (r.Width.Type == Qe.Fixed) {
        let l = a.DeltaX, o = r.Width.Value + l;
        r.Width.ChangeValue(o), r.ClearAllCache(), l < 0 && this.ScrollController.OffsetX > 0 && (this.ScrollController.OffsetX = Math.max(this.ScrollController.OffsetX + l, 0)), this.CalcColumnsWidth(this._cachedWidgetSize, !0), (n = this._owner) == null || n.Invalidate(c.Repaint);
      }
    }
  }
  OnPointerDown(a) {
    var l;
    if (a.Y <= this.TotalHeaderHeight)
      return;
    let n = this.CurrentRowIndex;
    this._cachedHitInRows = this.HitTestInRows(a.X, a.Y);
    let r = this._cachedHitInRows != null ? this._cachedHitInRows.RowIndex : -1;
    this.TrySelectRow(n, r), this._cachedHitInRows != null && (this._cachedHitInRows.ScrollDeltaX != 0 || this._cachedHitInRows.ScrollDeltaY != 0) && (this.ScrollController.OffsetX += this._cachedHitInRows.ScrollDeltaX, this.ScrollController.OffsetY += this._cachedHitInRows.ScrollDeltaY), (l = this._owner) == null || l.Invalidate(c.Repaint);
  }
  HitTestInHeader(a, n) {
    for (const r of this._cachedVisibleColumns)
      if (r.CachedVisibleLeft <= a && a <= r.CachedVisibleRight) {
        let l = r.CachedVisibleRight - a <= 5;
        return new Ma(r, -1, 0, 0, l);
      }
    return null;
  }
  HitTestInRows(a, n) {
    if (this.DataView == null || this.DataView.length == 0)
      return null;
    let r = 0, l = 0, o = Math.floor(Math.trunc((n - this.TotalHeaderHeight + this.ScrollController.OffsetY) / this.Theme.RowHeight)) & 4294967295;
    if (o >= this.DataView.length)
      return this._cachedHitInRows;
    let h = this.ScrollDeltaY;
    h != 0 && o == this.VisibleStartRowIndex && (l = -h);
    for (const A of this._cachedVisibleColumns)
      if (A.CachedVisibleLeft <= a && a <= A.CachedVisibleRight)
        return A.CachedVisibleLeft != A.CachedLeft ? r = A.CachedLeft - A.CachedVisibleLeft : A.CachedVisibleRight != A.CachedLeft + A.LayoutWidth && (r = A.CachedLeft + A.LayoutWidth - A.CachedVisibleRight), new Ma(A, o, r, l);
    return null;
  }
  CalcColumnsWidth(a, n = !1) {
    let r = this._cachedWidgetSize.Width != a.Width;
    if (this.ScrollController.OffsetX > 0 && a.Width > this._cachedWidgetSize.Width) {
      let w = a.Width - this._cachedWidgetSize.Width;
      this.ScrollController.OffsetX = Math.max(this.ScrollController.OffsetX - w, 0);
    }
    if (this._cachedWidgetSize = a.Clone(), !r && !n)
      return;
    let l = this._cachedLeafColumns.Where((w) => w.Width.Type == Qe.Fixed).ToArray(), o = l.Sum((w) => w.Width.Value), h = this._cachedWidgetSize.Width - o, A = this._cachedLeafColumns.length - l.length, y = this._cachedLeafColumns.Where((w) => w.Width.Type == Qe.Percent).ToArray(), F = y.Sum((w) => (w.CalcWidth(h, A), w.LayoutWidth));
    h -= F, A -= y.length;
    let u = this._cachedLeafColumns.Where((w) => w.Width.Type == Qe.Auto).ToArray();
    for (const w of u)
      w.CalcWidth(h, A);
  }
  LayoutVisibleColumns(a) {
    this._cachedVisibleColumns.Clear();
    let n = 0, r = this._cachedLeafColumns.length - 1, l = a.Width, o = 0, h = a.Width < this.TotalColumnsWidth, A = 0;
    if (h && this.HasFrozen) {
      for (let F = 0; F < this._cachedLeafColumns.length; F++) {
        let u = this._cachedLeafColumns[F];
        if (!u.Frozen) {
          n = F;
          break;
        }
        u.CachedLeft = u.CachedVisibleLeft = o, u.CachedVisibleRight = u.CachedLeft + u.LayoutWidth, this._cachedVisibleColumns.Insert(A++, u), o += u.LayoutWidth;
      }
      if (l -= o, l <= 0)
        return this._cachedVisibleColumns;
      let y = 0;
      for (let F = this._cachedLeafColumns.length - 1; F >= 0; F--) {
        let u = this._cachedLeafColumns[F];
        if (!u.Frozen) {
          r = F;
          break;
        }
        if (u.CachedLeft = a.Width - y - u.LayoutWidth, u.CachedVisibleLeft = u.CachedLeft, u.CachedVisibleRight = u.CachedLeft + u.LayoutWidth, this._cachedVisibleColumns.Add(u), y += u.LayoutWidth, l - y <= 0)
          return this._cachedVisibleColumns;
      }
      if (l -= y, l <= 0)
        return this._cachedVisibleColumns;
    }
    if (this._cachedScrollLeft = o, this._cachedScrollRight = o + l, this.ScrollController.OffsetX > 0) {
      let y = 0;
      for (let F = n; F <= r; F++) {
        let u = this._cachedLeafColumns[F];
        if (y += u.LayoutWidth, !(y <= this.ScrollController.OffsetX)) {
          n = F, o = o - this.ScrollController.OffsetX + (y - u.LayoutWidth);
          break;
        }
      }
    }
    for (let y = n; y <= r; y++) {
      let F = this._cachedLeafColumns[y];
      if (F.CachedLeft = o, F.CachedVisibleLeft = Math.max(this._cachedScrollLeft, F.CachedLeft), F.CachedVisibleRight = Math.min(this._cachedScrollRight, F.CachedLeft + F.LayoutWidth), this._cachedVisibleColumns.Insert(A++, F), o += F.LayoutWidth, o >= this._cachedScrollRight)
        break;
    }
    return this._cachedVisibleColumns;
  }
  GetScrollClipRect(a, n) {
    return f.FromLTWH(
      this._cachedScrollLeft,
      a,
      this._cachedScrollRight - this._cachedScrollLeft,
      n
    );
  }
  GetCurrentRowRect() {
    if (this._selectedRows.length == 0)
      return null;
    let a = this.TotalHeaderHeight + (this._selectedRows[0] - this.VisibleStartRowIndex) * this.Theme.RowHeight - this.ScrollDeltaY;
    return new f(1, a + 1, this._owner.W - 2, a + this.Theme.RowHeight - 1);
  }
  GetCurrentCellRect() {
    if (this._cachedHitInRows == null || this._cachedHitInRows.RowIndex == -1)
      return null;
    let a = this._cachedHitInRows.Column, n = this.TotalHeaderHeight + (this._cachedHitInRows.RowIndex - this.VisibleStartRowIndex) * this.Theme.RowHeight - this.ScrollDeltaY;
    return new f(
      a.CachedVisibleLeft + 1,
      n + 1,
      a.CachedVisibleRight - 2,
      n + this.Theme.RowHeight - 1
    );
  }
  GetLeafColumns(a, n, r) {
    if (r != null && (a.Frozen = r), a instanceof nr) {
      const l = a;
      this.HeaderRows += 1;
      for (const o of l.Children)
        o.Parent = l, this.GetLeafColumns(o, n, a.Frozen);
    } else
      n.Add(a);
  }
  Add(a) {
    var n;
    this._dataSource.Add(a), (n = this._owner) == null || n.Invalidate(c.Repaint);
  }
  Remove(a) {
    let n = this.DataView.IndexOf(a);
    this.RemoveAt(n);
  }
  RemoveAt(a) {
    var r;
    let n = a;
    if (this.DataView !== this._dataSource) {
      let l = this.DataView[a];
      this.DataView.RemoveAt(a), n = this._dataSource.IndexOf(l);
    }
    this._dataSource.RemoveAt(n), this.ClearSelection(), this.ClearAllCache(), (r = this._owner) == null || r.Invalidate(c.Repaint);
  }
  Refresh() {
    var a;
    this.ClearAllCache(), (a = this._owner) == null || a.Invalidate(c.Repaint);
  }
}
_s = new WeakMap(), en = new WeakMap(), tn = new WeakMap();
class Ma {
  constructor(a, n, r = 0, l = 0, o = !1) {
    m(this, "Column");
    m(this, "RowIndex");
    m(this, "ScrollDeltaX");
    m(this, "ScrollDeltaY");
    m(this, "IsColumnResizer");
    this.Column = a, this.RowIndex = n, this.ScrollDeltaX = r, this.ScrollDeltaY = l, this.IsColumnResizer = o;
  }
}
const ct = class {
  constructor() {
    m(this, "DefaultHeaderCellStyle");
    m(this, "DefaultRowCellStyle");
    m(this, "RowHeight", 28);
    m(this, "CellPadding", 5);
    m(this, "BorderColor", new T(4293652213));
    m(this, "StripeRows", !0);
    m(this, "StripeBgColor", new T(4294638330));
    m(this, "HighlightingCurrentCell", !1);
    m(this, "HighlightingCurrentRow", !0);
    m(this, "HighlightRowBgColor", new T(807809592));
    this.DefaultHeaderCellStyle = new De().Init(
      {
        Color: D.Black,
        BackgroundColor: new T(4294309882),
        HorizontalAlignment: te.Center,
        FontWeight: CanvasKit.FontWeight.Bold
      }
    ), this.DefaultRowCellStyle = new De().Init({ Color: D.Black });
  }
  static get Default() {
    var a;
    return (a = ct._default) != null ? a : ct._default = new ct();
  }
};
let fn = ct;
m(fn, "_default");
var Qe = /* @__PURE__ */ ((i) => (i[i.Auto = 0] = "Auto", i[i.Percent = 1] = "Percent", i[i.Fixed = 2] = "Fixed", i))(Qe || {}), sn, nn, an;
const Yt = class {
  constructor(a, n, r) {
    b(this, sn, 0);
    b(this, nn, 0);
    b(this, an, 0);
    this.Type = a, this.Value = n, this.MinValue = r;
  }
  get Type() {
    return d(this, sn);
  }
  set Type(a) {
    N(this, sn, a);
  }
  get Value() {
    return d(this, nn);
  }
  set Value(a) {
    N(this, nn, a);
  }
  get MinValue() {
    return d(this, an);
  }
  set MinValue(a) {
    N(this, an, a);
  }
  static Percent(a, n = 20) {
    return a = clamp(a, 0, 100), new Yt(1, a, n);
  }
  static Auto(a = 20) {
    return new Yt(0, 0, a);
  }
  static Fixed(a) {
    return a = Math.max(0, a), new Yt(2, a, 0);
  }
  ChangeValue(a) {
    this.Value = a;
  }
};
let _n = Yt;
sn = new WeakMap(), nn = new WeakMap(), an = new WeakMap();
class Oe {
  constructor(a) {
    m(this, "Label");
    m(this, "Width", _n.Auto());
    m(this, "HeaderCellStyle");
    m(this, "CellStyle");
    m(this, "CellStyleGetter");
    m(this, "Frozen", !1);
    m(this, "Parent");
    m(this, "_cachedWidth", 0);
    m(this, "CachedLeft", 0);
    m(this, "CachedVisibleLeft", 0);
    m(this, "CachedVisibleRight", 0);
    this.Label = a;
  }
  get HeaderRowIndex() {
    return this.Parent == null ? 0 : this.Parent.HeaderRowIndex + 1;
  }
  get LayoutWidth() {
    return this.Width.Type == Qe.Fixed ? this.Width.Value : this._cachedWidth;
  }
  CalcWidth(a, n) {
    let r = !1;
    if (this.Width.Type == Qe.Percent) {
      let l = Math.max(a / this.Width.Value, this.Width.MinValue);
      r = l != this._cachedWidth, this._cachedWidth = l;
    } else if (this.Width.Type == Qe.Auto) {
      let l = Math.max(a / n, this.Width.MinValue);
      r = l != this._cachedWidth, this._cachedWidth = l;
    }
    r && this.ClearAllCache();
  }
  ClearAllCache() {
  }
  ClearCacheOnScroll(a, n) {
  }
  PaintHeader(a, n, r) {
    var h;
    let l = (h = this.HeaderCellStyle) != null ? h : r.DefaultHeaderCellStyle;
    if (l.BackgroundColor != null) {
      let A = S.Shared(l.BackgroundColor);
      a.drawRect(n, A);
    }
    let o = Oe.BuildCellParagraph(n.Clone(), l, this.Label, 2);
    Oe.PaintCellParagraph(a, n.Clone(), l, o), o.delete();
  }
  PaintCell(a, n, r, l) {
  }
  static BuildCellParagraph(a, n, r, l) {
    var u;
    let o = xa({
      color: (u = n.Color) != null ? u : D.Black,
      fontSize: n.FontSize,
      fontStyle: new Va(n.FontWeight, CanvasKit.FontSlant.Upright),
      heightMultiplier: 1
    }), h = CanvasKit.TextAlign.Left;
    switch (n.HorizontalAlignment) {
      case te.Right:
        h = CanvasKit.TextAlign.Right;
        break;
      case te.Center:
        h = CanvasKit.TextAlign.Center;
        break;
    }
    let A = Ba({
      maxLines: Math.floor(l) & 4294967295,
      textStyle: o,
      heightMultiplier: 1,
      textAlign: h
    }), y = va(A);
    y.pushStyle(o), y.addText(r), y.pop();
    let F = y.build();
    return F.layout(a.Width - De.CellPadding * 2), y.delete(), F;
  }
  static PaintCellParagraph(a, n, r, l) {
    if (r.VerticalAlignment == Ae.Middle) {
      let o = n.Left, h = n.Top + (n.Height - l.getHeight()) / 2;
      a.drawParagraph(l, o + De.CellPadding, h);
    } else if (r.VerticalAlignment == Ae.Bottom) {
      let o = n.Left, h = n.Bottom;
      a.drawParagraph(
        l,
        o + De.CellPadding,
        h - De.CellPadding - l.getHeight()
      );
    } else
      a.drawParagraph(
        l,
        n.Left + De.CellPadding,
        n.Top + De.CellPadding
      );
  }
}
class nr extends Oe {
  constructor(n, r) {
    super(n);
    m(this, "Children");
    this.Children = r;
  }
  get LayoutWidth() {
    return this.Children.Sum((n) => n.LayoutWidth);
  }
}
class Sl extends Oe {
  constructor(n, r) {
    super(n);
    m(this, "_cellValueGetter");
    this._cellValueGetter = r;
  }
  PaintCell(n, r, l, o) {
    var P, C;
    let h = r.DataView[l], A = this._cellValueGetter(h);
    if (A == null)
      return;
    let y = this.CellStyleGetter != null ? this.CellStyleGetter(h, l) : (P = this.CellStyle) != null ? P : r.Theme.DefaultRowCellStyle, F = new Fa(r.Invalidate.bind(r)), u = o.Left + De.CellPadding, w = o.Top;
    y.VerticalAlignment == Ae.Middle ? w += (o.Height - y.FontSize) / 2 : y.VerticalAlignment == Ae.Bottom && (w = w - o.Bottom - y.FontSize), F.Paint(
      n,
      y.FontSize,
      (C = y.Color) != null ? C : D.Black,
      A,
      u,
      w
    ), F.Dispose();
  }
}
const da = class extends Oe {
  constructor(n, r) {
    super(n);
    m(this, "_cellValueGetter");
    m(this, "_cellParagraphs", new g.List());
    this._cellValueGetter = r;
  }
  PaintCell(n, r, l, o) {
    var u;
    let h = r.DataView[l], A = this._cellValueGetter(h);
    if (g.IsNullOrEmpty(A))
      return;
    let y = this.CellStyleGetter != null ? this.CellStyleGetter(h, l) : (u = this.CellStyle) != null ? u : r.Theme.DefaultRowCellStyle, F = this.GetCellParagraph(l, r, o, A, y);
    Oe.PaintCellParagraph(n, o.Clone(), y, F);
  }
  GetCellParagraph(n, r, l, o, h) {
    let A = new Hn(n, null), y = this._cellParagraphs.BinarySearch(A, da._cellCacheComparer);
    if (y >= 0)
      return this._cellParagraphs[y].CachedItem;
    y = ~y, r.DataView[n];
    let F = Oe.BuildCellParagraph(l.Clone(), h, o, 1), u = new Hn(n, F);
    return this._cellParagraphs.Insert(y, u), F;
  }
  ClearAllCache() {
    this._cellParagraphs.Clear();
  }
  ClearCacheOnScroll(n, r) {
    n ? this._cellParagraphs.RemoveAll((l) => l.RowIndex < r) : this._cellParagraphs.RemoveAll((l) => l.RowIndex >= r);
  }
};
let Un = da;
m(Un, "_cellCacheComparer", new ua());
const ba = class extends Oe {
  constructor(n, r) {
    super(n);
    m(this, "_cellBuilder");
    m(this, "_cellWidgets", new g.List());
    this._cellBuilder = r;
  }
  PaintCell(n, r, l, o) {
    let h = this.GetCellWidget(l, r, o);
    n.translate(o.Left, o.Top), h.Paint(n, null), n.translate(-o.Left, -o.Top);
  }
  GetCellWidget(n, r, l) {
    let o = new Hn(n, null), h = this._cellWidgets.BinarySearch(o, ba._cellCacheComparer);
    if (h >= 0)
      return this._cellWidgets[h].CachedItem;
    h = ~h;
    let A = r.DataView[n], y = this._cellBuilder(A, n);
    y.Parent = r.DataGrid, y.Layout(l.Width, l.Height);
    let F = new Hn(n, y);
    return this._cellWidgets.Insert(h, F), y;
  }
  ClearCacheOnScroll(n, r) {
    n ? this._cellWidgets.RemoveAll((l) => l.RowIndex < r) : this._cellWidgets.RemoveAll((l) => l.RowIndex >= r);
  }
};
let pn = ba;
m(pn, "_cellCacheComparer", new ua());
class Rl extends pn {
  constructor(a, n, r = null) {
    super(a, (l, o) => {
      let h = new ma(
        () => n(l),
        r == null ? null : (A) => r(l, A)
      );
      return new Ee(h);
    });
  }
}
const Na = class {
  static set Current(a) {
    Na.PlatformCursors.SetCursor(a);
  }
};
let $ = Na;
m($, "PlatformCursors");
class Le {
  static get Arrow() {
    return $.PlatformCursors.Arrow;
  }
  static get Hand() {
    return $.PlatformCursors.Hand;
  }
  static get IBeam() {
    return $.PlatformCursors.IBeam;
  }
  static get ResizeLR() {
    return $.PlatformCursors.ResizeLR;
  }
  static get ResizeUD() {
    return $.PlatformCursors.ResizeUD;
  }
}
const Xt = class {
  static Init(a) {
    Xt._platformClipboard = a;
  }
  static WriteText(a) {
    return Xt._platformClipboard.WriteText(a);
  }
  static ReadText() {
    return Xt._platformClipboard.ReadText();
  }
};
let Cn = Xt;
m(Cn, "_platformClipboard");
class Fn {
  constructor(a) {
    m(this, "_rect");
    this._rect = a.Clone();
  }
  GetRect() {
    return this._rect;
  }
  Merge(a) {
  }
  IntersectsWith(a) {
    return this._rect.IntersectsWith(a.X, a.Y, a.W, a.H);
  }
  ToChild(a) {
    if (a.X == 0 && a.Y == 0)
      return this;
    let n = f.FromLTWH(
      this._rect.Left - a.X,
      this._rect.Top - a.Y,
      this._rect.Width,
      this._rect.Height
    );
    return new Fn(n.Clone());
  }
  toString() {
    return `RepaintArea[${this._rect}]`;
  }
}
class Jr {
  constructor(a, n, r) {
    m(this, "_lastDirtyArea");
    m(this, "_path");
    m(this, "_current", 0);
    this._lastDirtyArea = r, this._path = new g.List();
    let l = n;
    for (; l !== a; )
      this._path.Add(l), l = l.Parent;
    this._current = this._path.length - 1;
  }
  Merge(a) {
    throw new g.NotSupportedException();
  }
  IntersectsWith(a) {
    return this._current < 0 ? !1 : this._path[this._current] === a;
  }
  GetRect() {
    let a = this._path[this._current];
    return f.FromLTWH(a.X, a.Y, a.W, a.H);
  }
  ToChild(a) {
    return this._current--, this._current < 0 ? this._lastDirtyArea : this;
  }
  toString() {
    return this._current < 0 ? this._lastDirtyArea == null ? "" : this._lastDirtyArea.toString() : `RepaintChild[${this._path[this._current]}]`;
  }
}
var rn;
const Bn = class {
  constructor() {
    m(this, "MainWindow");
  }
  static get Current() {
    return d(Bn, rn);
  }
  static set Current(a) {
    N(Bn, rn, a);
  }
  OnInvalidateRequest() {
    let a = this.MainWindow, n = a.GetOffscreenCanvas(), r = a.GetOnscreenCanvas(), l = Sn.Default;
    l.Window = a;
    let o = g.DateTime.UtcNow;
    a.WidgetsInvalidQueue.IsEmpty || (l.Canvas = n, a.WidgetsInvalidQueue.RenderFrame(l), a.FlushOffscreenSurface()), a.OverlayInvalidQueue.IsEmpty || (l.Canvas = r, a.OverlayInvalidQueue.RelayoutAll()), a.DrawOffscreenSurface(), a.ScaleFactor != 1 && (r.save(), r.scale(a.ScaleFactor, a.ScaleFactor)), a.Overlay.Paint(r), a.ScaleFactor != 1 && r.restore(), a.HasPostInvalidateEvent = !1;
    let h = g.DateTime.op_Subtraction(g.DateTime.UtcNow, o);
    console.log(`Draw frame: ${h.TotalMilliseconds}ms`), a.Present();
  }
};
let pt = Bn;
rn = new WeakMap(), b(pt, rn, void 0);
var ln, mn;
const ca = class {
  constructor() {
    b(this, ln, void 0);
    b(this, mn, void 0);
  }
  get Window() {
    return d(this, ln);
  }
  set Window(a) {
    N(this, ln, a);
  }
  get Canvas() {
    return d(this, mn);
  }
  set Canvas(a) {
    N(this, mn, a);
  }
};
let Sn = ca;
ln = new WeakMap(), mn = new WeakMap(), m(Sn, "Default", new ca());
const fa = class {
  constructor() {
    m(this, "Widget");
    m(this, "OldX", 0);
    m(this, "OldY", 0);
    m(this, "OldW", 0);
    m(this, "OldH", 0);
  }
  GetDirtyArea() {
    let a = 0, n = 0;
    if (je(this.Widget.Parent)) {
      const r = this.Widget.Parent;
      a = r.ScrollOffsetX, n = r.ScrollOffsetY;
    }
    return new Fn(
      new f(
        Math.min(this.OldX, this.Widget.X) - a,
        Math.min(this.OldY, this.Widget.Y) - n,
        Math.max(this.OldX + this.OldW, this.Widget.X + this.Widget.W),
        Math.max(this.OldY + this.OldH, this.Widget.Y + this.Widget.H)
      )
    );
  }
};
let Bt = fa;
m(Bt, "Default", new fa());
var c = /* @__PURE__ */ ((i) => (i[i.Repaint = 0] = "Repaint", i[i.Relayout = 1] = "Relayout", i))(c || {});
class Zr {
  constructor() {
    m(this, "Widget");
    m(this, "Action", 0);
    m(this, "Level", 0);
    m(this, "RelayoutOnly", !1);
    m(this, "Area");
  }
}
class me {
  constructor() {
    m(this, "_queue", new g.List(32));
  }
  static Add(a, n, r) {
    if (!a.IsMounted)
      return !1;
    let l = a.Root;
    return l instanceof Aa ? n == 1 && l.Window.OverlayInvalidQueue.AddInternal(a, n, r) : l.Window.WidgetsInvalidQueue.AddInternal(a, n, r), l.Window.HasPostInvalidateEvent || (l.Window.HasPostInvalidateEvent = !0, pt.Current.PostInvalidateEvent()), !0;
  }
  get IsEmpty() {
    return this._queue.length == 0;
  }
  AddInternal(a, n, r) {
    var y;
    let l = me.GetLevelToTop(a), o = 0, h = !1;
    for (const F of this._queue) {
      if (F.Level > l)
        break;
      if (F.Widget === a) {
        F.Action < n && (F.Action = n), F.Action == 0 && n == 0 && (r == null && (F.Area = null), (y = F.Area) == null || y.Merge(r)), o = -1;
        break;
      }
      if (F.Widget.IsAnyParentOf(a)) {
        if (F.Action == 1 || F.Action == 0 && n == 0) {
          o = -1;
          break;
        }
        h = !0, F.Area = null;
      }
      o++;
    }
    if (o < 0)
      return;
    if (a.Parent != null)
      for (let F = o - 1; F >= 0; F--) {
        let u = this._queue[F];
        if (u.Level < l)
          break;
        if (u.Widget.Parent !== a.Parent)
          continue;
        let w = a.Parent.IndexOfChild(u.Widget);
        if (a.Parent.IndexOfChild(a) > w)
          break;
        o = F;
      }
    let A = new Zr().Init(
      {
        Widget: a,
        Action: n,
        Level: l,
        Area: r,
        RelayoutOnly: h
      }
    );
    this._queue.Insert(o, A);
  }
  static GetLevelToTop(a) {
    let n = 0, r = a;
    for (; r.Parent != null; )
      n++, r = r.Parent;
    return n;
  }
  RenderFrame(a) {
    var r;
    let n = !1;
    for (const l of this._queue)
      if (!!l.Widget.IsMounted)
        if (l.Action == 1) {
          n = !0;
          let o = Bt.Default;
          me.RelayoutWidget(l.Widget, o), l.RelayoutOnly || me.RepaintWidget(
            a,
            (r = o.Widget.Parent) != null ? r : o.Widget,
            o.GetDirtyArea()
          );
        } else
          me.RepaintWidget(a, l.Widget, l.Area);
    this._queue.Clear(), n && a.Window.RunNewHitTest();
  }
  RelayoutAll() {
    for (const a of this._queue)
      if (a.Action == 1) {
        let n = Bt.Default;
        me.RelayoutWidget(a.Widget, n);
      } else
        throw new g.InvalidOperationException();
    this._queue.Clear();
  }
  static RelayoutWidget(a, n) {
    n.Widget = a, n.OldX = a.X, n.OldY = a.Y, n.OldW = a.W, n.OldH = a.H, a.Layout(a.CachedAvailableWidth, a.CachedAvailableHeight), a.TryNotifyParentIfSizeChanged(n.OldW, n.OldH, n);
  }
  static RepaintWidget(a, n, r) {
    let l = a.Canvas, o = 0, h = 0, A = null, y = n, F = (r == null ? f.FromLTWH(0, 0, n.W, n.H) : r.GetRect()).Clone(), u = new Rt(F.Clone()), w = !1, P = F.Left, C = F.Top;
    do {
      let R = y.X, L = y.Y;
      if (je(y.Parent)) {
        const V = y.Parent;
        R -= V.ScrollOffsetX, L -= V.ScrollOffsetY;
      } else if (y.Parent instanceof Tt) {
        const V = y.Parent;
        let z = Ye.TransformPoint(V.EffectiveTransform, R, L);
        R = z.Dx, L = z.Dy;
      }
      A == null && (y.IsOpaque ? (A = y, o = 0, h = 0) : (P += R, C += L));
      let v = y.Clipper;
      if (v != null && (u = v.IntersectWith(u), u.IsEmpty)) {
        w = !0;
        break;
      }
      if (u.Offset(R, L), o += R, h += L, y.Parent == null)
        break;
      y = y.Parent;
    } while (!0);
    if (w) {
      console.log("\u88C1\u526A\u533A\u57DF\u4E3A\u7A7A\uFF0C\u4E0D\u9700\u8981\u91CD\u7ED8");
      return;
    }
    A == null && (A = y, o = 0, h = 0), console.log(`InvalidQueue.Repaint: ${n} dirty=${r} Opaque=${A} area={{X=${P} Y=${C} W=${F.Width} H=${F.Height}}}`), l.save();
    try {
      u.ApplyToCanvas(l), l.translate(o, h), A === a.Window.RootWidget && !A.IsOpaque && l.clear(a.Window.BackgroundColor), A === n ? A.Paint(l, r) : A.Paint(l, new Jr(A, n, r));
    } catch (R) {
      console.log(`InvalidQueue.RepaintWidget Error: ${R.Message}`);
    } finally {
      u.Dispose(), l.restore();
    }
  }
}
var on, hn, An;
const qt = class {
  constructor(a, n = null) {
    m(this, "RootWidget");
    m(this, "Overlay");
    m(this, "_routeHistoryManager");
    m(this, "FocusManagerStack", new Pr());
    m(this, "EventHookManager", new wr());
    m(this, "BackgroundColor", D.White);
    m(this, "WidgetsInvalidQueue", new me());
    m(this, "OverlayInvalidQueue", new me());
    m(this, "HasPostInvalidateEvent", !1);
    b(this, hn, -1);
    b(this, An, -1);
    m(this, "_oldHitResult", new Ta());
    m(this, "_newHitResult", new Ta());
    m(this, "_hitResultOnPointDown");
    g.IsNullOrEmpty(n) || (this.RouteHistoryManager.AssignedPath = n), this.Overlay = new Aa(this), this.RootWidget = new $n(this, a), Xe.EnableChanged.Add(() => this.RootWidget.Invalidate(c.Repaint)), qt.Current = this;
  }
  static get Current() {
    return d(qt, on);
  }
  static set Current(a) {
    N(qt, on, a);
  }
  get RouteHistoryManager() {
    var a;
    return (a = this._routeHistoryManager) != null || (this._routeHistoryManager = new ut()), this._routeHistoryManager;
  }
  get ScaleFactor() {
    return 1;
  }
  get LastMouseX() {
    return d(this, hn);
  }
  set LastMouseX(a) {
    N(this, hn, a);
  }
  get LastMouseY() {
    return d(this, An);
  }
  set LastMouseY(a) {
    N(this, An, a);
  }
  OnFirstShow() {
    this.RootWidget.Layout(this.Width, this.Height), this.Overlay.Layout(this.Width, this.Height);
    let a = this.GetOffscreenCanvas();
    a.clear(this.BackgroundColor), this.RootWidget.Paint(a), this.GetOnscreenCanvas(), this.FlushOffscreenSurface(), this.DrawOffscreenSurface(), this.Present();
  }
  OnPointerMove(a) {
    this.LastMouseX = a.X, this.LastMouseY = a.Y, this._oldHitResult.StillInLastRegion(a.X, a.Y) ? this.OldHitTest(a.X, a.Y) : this.NewHitTest(a.X, a.Y), this.CompareAndSwapHitTestResult(), this._oldHitResult.IsHitAnyMouseRegion && this._oldHitResult.PropagatePointerEvent(a, (n, r) => n.RaisePointerMove(r));
  }
  OnPointerMoveOutWindow() {
    this.LastMouseX = this.LastMouseY = -1, this.CompareAndSwapHitTestResult();
  }
  OnPointerDown(a) {
    this.EventHookManager.HookEvent($t.PointerDown, a) || (this._oldHitResult.IsHitAnyWidget || this.RootWidget.HitTest(a.X, a.Y, this._oldHitResult), this._oldHitResult.IsHitAnyMouseRegion && (this._hitResultOnPointDown = this._oldHitResult.LastEntry, this._oldHitResult.PropagatePointerEvent(a, (n, r) => n.RaisePointerDown(r)), this.FocusManagerStack.Focus(this._oldHitResult.LastHitWidget)));
  }
  OnPointerUp(a) {
    !this._oldHitResult.IsHitAnyMouseRegion || (this._hitResultOnPointDown != null && (this._hitResultOnPointDown.ContainsPoint(a.X, a.Y) && this._hitResultOnPointDown.Widget.MouseRegion.RaisePointerTap(a), this._hitResultOnPointDown = null), this._oldHitResult.PropagatePointerEvent(a, (n, r) => n.RaisePointerUp(r)));
  }
  OnScroll(a) {
    if (!this._oldHitResult.IsHitAnyWidget)
      return;
    let n = this._oldHitResult.LastHitWidget.FindParent((l) => je(l));
    if (n == null)
      return;
    let r = n.OnScroll(a.Dx, a.Dy);
    r.IsEmpty || this.AfterScrollDoneInternal(n, r.Dx, r.Dy);
  }
  OnKeyDown(a) {
    this.EventHookManager.HookEvent($t.KeyDown, a) || this.FocusManagerStack.OnKeyDown(a);
  }
  OnKeyUp(a) {
    this.FocusManagerStack.OnKeyUp(a);
  }
  OnTextInput(a) {
    this.FocusManagerStack.OnTextInput(a);
  }
  OldHitTest(a, n) {
    let r = !0;
    this._oldHitResult.LastHitWidget.Root instanceof $n && this.Overlay.HasEntry && (this.Overlay.HitTest(a, n, this._newHitResult), this._newHitResult.IsHitAnyMouseRegion && (r = !1)), r && (this._newHitResult.CopyFrom(this._oldHitResult), this._newHitResult.HitTestInLastRegion(a, n));
  }
  NewHitTest(a, n) {
    console.log(`========NewHitTest:(${a},${n}) ========`), this.Overlay.HasEntry && this.Overlay.HitTest(a, n, this._newHitResult), this._newHitResult.IsHitAnyWidget || this.RootWidget.HitTest(a, n, this._newHitResult);
  }
  CompareAndSwapHitTestResult() {
    this._oldHitResult.ExitOldRegion(this._newHitResult), this._newHitResult.EnterNewRegion(this._oldHitResult), this._oldHitResult.LastHitWidget != this._newHitResult.LastHitWidget && console.log(`Hit: ${this._newHitResult.LastHitWidget} ${this._newHitResult.LastWidgetWithMouseRegion}`), this._oldHitResult.Reset();
    let a = this._oldHitResult;
    this._oldHitResult = this._newHitResult, this._newHitResult = a;
  }
  AfterScrollDone(a, n) {
    this._oldHitResult.IsHitAnyWidget && a.IsAnyParentOf(this._oldHitResult.LastHitWidget) && this.AfterScrollDoneInternal(a, n.Dx, n.Dy);
  }
  AfterScrollDoneInternal(a, n, r) {
    console.assert(n != 0 || r != 0), this._oldHitResult.TranslateOnScroll(a, n, r, this.LastMouseX, this.LastMouseY) ? this.OldHitTest(this.LastMouseX, this.LastMouseY) : this.NewHitTest(this.LastMouseX, this.LastMouseY), this.CompareAndSwapHitTestResult();
  }
  BeforeDynamicViewChange(a) {
    let n = this.FocusManagerStack.GetFocusManagerByWidget(a);
    n.FocusedWidget != null && a.IsAnyParentOf(n.FocusedWidget) && n.Focus(null);
  }
  AfterDynamicViewChange(a) {
    !this._oldHitResult.IsHitAnyWidget || this._oldHitResult.LastHitWidget !== a || (this.OldHitTest(this.LastMouseX, this.LastMouseY), this.CompareAndSwapHitTestResult());
  }
  RunNewHitTest() {
    this.NewHitTest(this.LastMouseX, this.LastMouseY), this.CompareAndSwapHitTestResult();
  }
  StartTextInput() {
  }
  SetTextInputRect(a) {
  }
  StopTextInput() {
  }
};
let it = qt;
on = new WeakMap(), hn = new WeakMap(), An = new WeakMap(), b(it, on, void 0);
function Yn(i) {
  switch (i.buttons) {
    case 1:
      return tt.Left;
    case 2:
      return tt.Right;
    case 3:
      return tt.Middle;
    default:
      return tt.None;
  }
}
function Oa(i) {
  let a = B.None;
  if (i.shiftKey && (a |= B.Shift), i.ctrlKey && (a |= B.Control), i.altKey && (a |= B.Alt), i.key.length == 1) {
    let n = i.key.charCodeAt(0);
    if (n >= 65 && n <= 90)
      return a | n;
    if (n >= 97 && n <= 122)
      return a | n - 32;
  }
  switch (i.code) {
    case "Backspace":
      return a | B.Back;
    case "Tab":
      return a | B.Tab;
    case "Enter":
      return a | B.Return;
    case "ArrowLeft":
      return a | B.Left;
    case "ArrowRight":
      return a | B.Right;
    case "ArrowUp":
      return a | B.Up;
    case "ArrowDown":
      return a | B.Down;
  }
  return a;
}
class Kr extends it {
  constructor(n, r) {
    super(n, r);
    m(this, "_offscreenSurface");
    m(this, "_onscreenSurface");
    m(this, "_offscreenCanvas");
    m(this, "_onscreenCanvas");
    m(this, "_webGLVersion", -1);
    m(this, "_forceNewContext", !1);
    m(this, "_contextLost", !1);
    m(this, "_glContext", 0);
    m(this, "_grContext", null);
    m(this, "_currentCanvasPhysicalWidth", 0);
    m(this, "_currentCanvasPhysicalHeight", 0);
    m(this, "_htmlCanvas");
    m(this, "_htmlInput");
    this._webGLVersion = typeof WebGL2RenderingContext < "u" ? 2 : typeof WebGLRenderingContext < "u" ? 1 : -1, this.CreateCanvas(), this.CreateSurface(), this.BindWindowEvents(), this.CreateInput();
  }
  CreateCanvas() {
    this._htmlCanvas = document.createElement("canvas"), this._htmlCanvas.style.position = "absolute", this._htmlCanvas.style.zIndex = "1", this.UpdateCanvasSize(), this._forceNewContext = !1, this._contextLost = !1, this._webGLVersion != -1 && (this._glContext = CanvasKit.GetWebGLContext(this._htmlCanvas, {
      antialias: 0,
      majorVersion: this._webGLVersion
    }), this._glContext != 0 && (this._grContext = CanvasKit.MakeGrContext(this._glContext), this._grContext.setResourceCacheLimitBytes(100 * 1024 * 1024))), document.body.append(this._htmlCanvas);
  }
  UpdateCanvasSize() {
    const n = window.innerWidth, r = window.innerHeight, l = window.devicePixelRatio;
    this._htmlCanvas.width = n * l, this._htmlCanvas.height = r * l, this._htmlCanvas.style.width = n + "px", this._htmlCanvas.style.height = r + "px";
  }
  CreateSurface() {
    this._offscreenSurface != null && (this._offscreenSurface.dispose(), this._onscreenSurface.dispose(), this._offscreenCanvas = null, this._offscreenSurface = null, this._onscreenCanvas = null, this._onscreenSurface = null);
    const n = window.devicePixelRatio, r = this.Width * n, l = this.Height * n;
    this._offscreenSurface = CanvasKit.MakeRenderTarget(this._grContext, r, l), this._offscreenCanvas = this._offscreenSurface.getCanvas(), this._offscreenCanvas.scale(n, n), this._onscreenSurface = CanvasKit.MakeOnScreenGLSurface(this._grContext, r, l, CanvasKit.ColorSpace.SRGB), this._onscreenCanvas = this._onscreenSurface.getCanvas();
  }
  CreateInput() {
    let n = document.createElement("input");
    n.style.position = "absolute", n.style.width = n.style.height = n.style.padding = "0", n.type = "text", n.style.border = "none", n.style.zIndex = "3", document.body.appendChild(n), n.addEventListener("input", (r) => {
      const l = r;
      l.data && !l.isComposing && this.OnTextInput(l.data);
    }), n.addEventListener("compositionend", (r) => {
      r.data && this.OnTextInput(r.data);
    }), this._htmlInput = n;
  }
  BindWindowEvents() {
    window.onresize = (n) => {
      console.log("Resize Window: ", this.Width, this.Height), this.UpdateCanvasSize(), this.CreateSurface(), this.RootWidget.CachedAvailableWidth = this.Width, this.RootWidget.CachedAvailableHeight = this.Height, this.RootWidget.Invalidate(c.Relayout);
    }, window.onmousemove = (n) => {
      n.preventDefault(), n.stopPropagation();
      const r = Yn(n);
      this.OnPointerMove(st.UseDefault(r, n.x, n.y, n.movementX, n.movementY));
    }, window.onmousedown = (n) => {
      n.preventDefault(), n.stopPropagation();
      const r = Yn(n);
      this.OnPointerDown(st.UseDefault(r, n.x, n.y, n.movementX, n.movementY));
    }, window.onmouseup = (n) => {
      n.preventDefault(), n.stopPropagation();
      const r = Yn(n);
      this.OnPointerUp(st.UseDefault(r, n.x, n.y, n.movementX, n.movementY));
    }, window.onmouseout = (n) => {
      this.OnPointerMoveOutWindow();
    }, window.oncontextmenu = (n) => {
      n.preventDefault(), n.stopPropagation();
    }, window.onkeydown = (n) => {
      this.OnKeyDown(Wt.UseDefault(Oa(n))), n.code === "Tab" && n.preventDefault();
    }, window.onkeyup = (n) => {
      this.OnKeyUp(Wt.UseDefault(Oa(n))), n.code === "Tab" && n.preventDefault();
    }, window.onpopstate = (n) => {
      if (typeof n.state == "number")
        this.RouteHistoryManager.Goto(n.state);
      else {
        let r = "/";
        document.location.hash.length > 0 && (r = document.location.hash.substring(1));
        let l = document.location.origin + "/#" + r;
        history.replaceState(this.RouteHistoryManager.Count, "", l), this.RouteHistoryManager.Push(r);
      }
    }, this._htmlCanvas.onwheel = (n) => {
      n.preventDefault(), n.stopPropagation(), this.OnScroll(bn.Make(n.x, n.y, n.deltaX, n.deltaY));
    };
  }
  GetOnscreenCanvas() {
    return this._onscreenCanvas;
  }
  GetOffscreenCanvas() {
    return this._offscreenCanvas;
  }
  get Height() {
    return window.innerHeight;
  }
  get Width() {
    return window.innerWidth;
  }
  get ScaleFactor() {
    return window.devicePixelRatio;
  }
  FlushOffscreenSurface() {
    this._offscreenSurface.flush();
  }
  DrawOffscreenSurface() {
    let n = this._offscreenSurface.makeImageSnapshot();
    this._onscreenCanvas.drawImage(n, 0, 0), n.delete();
  }
  Present() {
    this._onscreenSurface.flush();
  }
  StartTextInput() {
    setTimeout(() => {
      this._htmlInput.focus({ preventScroll: !0 });
    }, 0);
  }
  StopTextInput() {
    this._htmlInput.blur(), this._htmlInput.value = "";
  }
}
class Dt extends $ {
  constructor(n) {
    super();
    m(this, "Name");
    this.Name = n;
  }
}
const et = class {
  get Arrow() {
    return et._arrow;
  }
  get Hand() {
    return et._hand;
  }
  get IBeam() {
    return et._ibeam;
  }
  get ResizeLR() {
    return et._resizeLR;
  }
  get ResizeUD() {
    return et._resizeUD;
  }
  SetCursor(a) {
    window.document.body.style.cursor = a.Name;
  }
};
let ve = et;
m(ve, "_arrow", new Dt("auto")), m(ve, "_hand", new Dt("pointer")), m(ve, "_ibeam", new Dt("text")), m(ve, "_resizeLR", new Dt("e-resize")), m(ve, "_resizeUD", new Dt("s-resize"));
class _r {
  ReadText() {
    return navigator.clipboard.readText();
  }
  WriteText(a) {
    return navigator.clipboard.writeText(a);
  }
}
class ar extends pt {
  static Run(a) {
    let n = CanvasKitInit({
      locateFile: (l) => "/" + l
    }), r = fetch("/MiSans-Regular.woff2").then((l) => l.arrayBuffer());
    Promise.all([n, r]).then(([l, o]) => {
      let h = window;
      h.CanvasKit = l, oe.Init(o), $.PlatformCursors = new ve(), Cn.Init(new _r());
      let A = new ar();
      pt.Current = A, A.RunInternal(a());
    });
  }
  RunInternal(a) {
    let n = null;
    document.location.hash.length > 0 && (n = document.location.hash.substring(1));
    let r = new Kr(a, n);
    this.MainWindow = r, r.OnFirstShow();
  }
  PostInvalidateEvent() {
    requestAnimationFrame(() => {
      this.OnInvalidateRequest();
    });
  }
  BeginInvoke(a) {
    setTimeout(a, 0);
  }
}
export {
  Bt as AffectsByRelayout,
  ra as Animatable,
  dr as AnimatedEvaluation,
  aa as Animation,
  cr as AnimationBehavior,
  ot as AnimationController,
  Qn as AnimationDirection,
  I as AnimationStatus,
  za as AnimationWithParent,
  Xn as Axis,
  La as Binding,
  W as BindingOptions,
  re as BorderRadius,
  Me as BorderSide,
  Ja as BorderStyle,
  Sr as BounceInOutCurve,
  Hr as BuildPathContext,
  Q as Button,
  wl as ButtonGroup,
  $r as ButtonIconPosition,
  ie as ButtonShape,
  Te as ButtonStyle,
  qe as Card,
  Br as Caret,
  vr as CaretDecorator,
  Hn as CellCache,
  ua as CellCacheComparer,
  De as CellStyle,
  Wr as Center,
  Tr as ChainedEvaluation,
  Ee as Checkbox,
  le as CircularProgressPainter,
  Cn as Clipboard,
  Vn as ClipperOfPath,
  Rt as ClipperOfRect,
  T as Color,
  nl as ColorTween,
  Ve as ColorUtils,
  D as Colors,
  Jn as Column,
  _n as ColumnWidth,
  Qe as ColumnWidthType,
  xr as Conditional,
  jn as Container,
  dl as ContextMenu,
  Sa as ConvertRadiusToSigma,
  Ht as Cubic,
  $ as Cursor,
  Le as Cursors,
  St as Curve,
  ht as CurveTween,
  Qa as CurvedAnimation,
  J as Curves,
  ka as DataGrid,
  Rl as DataGridCheckboxColumn,
  Oe as DataGridColumn,
  Cl as DataGridController,
  nr as DataGridGroupColumn,
  Ma as DataGridHitTestResult,
  pn as DataGridHostColumn,
  Sl as DataGridIconColumn,
  Un as DataGridTextColumn,
  fn as DataGridTheme,
  sl as DelayTask,
  ul as Dialog,
  Da as DoubleUtils,
  vn as DrawShadow,
  En as DynamicView,
  Z as EdgeInsets,
  rt as EditableText,
  wr as EventHookManager,
  U as EventPreviewResult,
  $t as EventType,
  ya as ExpandIcon,
  $e as Expanded,
  gl as FadeTransition,
  Rr as FlippedCurve,
  Xa as FloatTween,
  mt as FloatUtils,
  Rn as FocusManager,
  Pr as FocusManagerStack,
  sa as FocusNode,
  Vr as FocusedDecoration,
  Er as FocusedDecorator,
  oe as FontCollection,
  Va as FontStyle,
  Nl as Form,
  bl as FormItem,
  Al as FutureBuilder,
  Ca as GetRectForPosition,
  Tn as HitTestEntry,
  Ta as HitTestResult,
  te as HorizontalAlignment,
  Gr as HoverDecoration,
  zr as HoverDecorator,
  lt as Icon,
  s as IconData,
  Fa as IconPainter,
  ye as Icons,
  hl as IfConditional,
  Ra as ImageSource,
  yl as Input,
  Mt as InputBase,
  Dr as InputBorder,
  Kn as Inspector,
  br as InterpolationSimulation,
  Ia as Interval,
  c as InvalidAction,
  me as InvalidQueue,
  Zr as InvalidWidget,
  Ft as IsInterfaceOfIFocusable,
  qn as IsInterfaceOfIMouseRegion,
  In as IsInterfaceOfIRootWidget,
  je as IsInterfaceOfIScrollable,
  Ot as ItemState,
  Wt as KeyEvent,
  B as Keys,
  Cr as Linear,
  Xr as ListPopup,
  _a as ListPopupItemWidget,
  Nn as ListView,
  Ka as ListViewController,
  Pl as MainMenu,
  va as MakeParagraphBuilder,
  Ba as MakeParagraphStyle,
  xa as MakeTextStyle,
  At as MaterialIcons,
  yt as MaterialIconsOutlined,
  j as Matrix4,
  Ye as MatrixUtils,
  tr as MenuController,
  Ha as MenuItem,
  Ie as MenuItemType,
  xt as MenuItemWidget,
  We as MouseRegion,
  yn as MultiChildWidget,
  Dn as Navigator,
  Pn as Notification,
  qr as NotificationEntry,
  ll as ObjectNotifier,
  k as Offset,
  qa as OffsetTween,
  fr as OptionalAnimationController,
  kt as OutlineInputBorder,
  Ir as OutlinedBorder,
  Aa as Overlay,
  Sn as PaintContext,
  Xe as PaintDebugger,
  S as PaintUtils,
  pr as ParametricCurve,
  dn as Point,
  tt as PointerButtons,
  st as PointerEvent,
  xe as Popup,
  zn as PopupMenu,
  Ln as PopupMenuStack,
  Wa as PopupProxy,
  Ur as PopupTransitionWrap,
  Ga as PropagateEvent,
  he as RRect,
  It as Radio,
  G as Radius,
  f as Rect,
  Fn as RepaintArea,
  Jr as RepaintChild,
  Nr as RepeatingSimulation,
  $n as Root,
  Qr as RotationTransition,
  nt as RoundedRectangleBorder,
  ol as Route,
  ft as RouteChangeAction,
  oa as RouteHistoryEntry,
  ut as RouteHistoryManager,
  Mr as RouteView,
  Ct as Row,
  ia as Rx,
  ae as RxComputed,
  al as RxList,
  rl as RxObject,
  ma as RxProperty,
  wn as SawTooth,
  Yr as ScaleYTransition,
  na as ScrollController,
  jt as ScrollDirection,
  bn as ScrollEvent,
  Fl as Select,
  Zn as SelectText,
  Za as ShapeBorder,
  Ua as Simulation,
  K as SingleChildWidget,
  Qt as Size,
  er as SlideTransition,
  p as State,
  ja as StateBase,
  se as Switch,
  sr as Tab,
  jr as TabBar,
  Wn as TabBody,
  cl as TabController,
  fl as TabView,
  at as Text,
  ha as TextBase,
  $a as TextPainter,
  x as Theme,
  Ya as Ticker,
  Gn as Toggleable,
  Lt as Tolerance,
  Tt as Transform,
  kr as TransitionStack,
  pl as TreeController,
  Re as TreeNode,
  cn as TreeNodeRow,
  Ue as TreeView,
  la as Tween,
  pt as UIApplication,
  it as UIWindow,
  ea as Vector4,
  Ae as VerticalAlignment,
  ml as View,
  ar as WebApplication,
  Or as WhenBuilder,
  O as Widget,
  Lr as WidgetController,
  Ea as WidgetList,
  il as WidgetRef
};
