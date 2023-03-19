var Rn = Object.defineProperty;
var zn = (d, e, t) => e in d ? Rn(d, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : d[e] = t;
var n = (d, e, t) => (zn(d, typeof e != "symbol" ? e + "" : e, t), t), ln = (d, e, t) => {
  if (!e.has(d))
    throw TypeError("Cannot " + t);
};
var M = (d, e, t) => (ln(d, e, "read from private field"), t ? t.call(d) : e.get(d)), T = (d, e, t) => {
  if (e.has(d))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(d) : e.set(d, t);
}, v = (d, e, t, i) => (ln(d, e, "write to private field"), i ? i.call(d, t) : e.set(d, t), t);
import * as u from "/System.js";
class Kt {
  static In(e, t = 3) {
    return Math.pow(e, t);
  }
  static Out(e, t = 3) {
    return 1 - Math.pow(1 - e, t);
  }
  static InOut(e, t = 3) {
    return ((e *= 2) <= 1 ? Math.pow(e, t) : 2 - Math.pow(2 - e, t)) / 2;
  }
}
class Jt {
  static In(e, t = 1.70158) {
    return e * e * (t * (e - 1) + e);
  }
  static Out(e, t = 1.70158) {
    return --e * e * ((e + 1) * t + e) + 1;
  }
  static InOut(e, t = 1.70158) {
    return ((e *= 2) < 1 ? e * e * ((t + 1) * e - t) : (e -= 2) * e * ((t + 1) * e + t) + 2) / 2;
  }
}
const nt = class {
  static BuildBezierEasingFunction(e, t, i, s) {
    if (e < 0 || e > 1 || i < 0 || i > 1)
      throw new u.Exception("Bezier x values must be in [0, 1] range");
    if (e == t && i == s)
      return nt.LinearEasing;
    let a = new Float32Array(nt.s_kSplineTableSize);
    for (let h = 0; h < nt.s_kSplineTableSize; ++h)
      a[h] = nt.CalcBezier(h * nt.s_kSampleStepSize, e, i);
    function r(h) {
      let o = 0, l = 1, c = nt.s_kSplineTableSize - 1;
      for (; l != c && a[l] <= h; ++l)
        o += nt.s_kSampleStepSize;
      --l;
      let p = (h - a[l]) / (a[l + 1] - a[l]), m = o + p * nt.s_kSampleStepSize, P = nt.GetSlope(m, e, i);
      return P >= nt.s_minSlope ? nt.NewtonRaphsonIterate(h, m, e, i) : P == 0 ? m : nt.BinarySubdivide(h, o, o + nt.s_kSampleStepSize, e, i);
    }
    return (h) => nt.CalcBezier(r(h), t, s);
  }
  static A(e, t) {
    return 1 - 3 * t + 3 * e;
  }
  static B(e, t) {
    return 3 * t - 6 * e;
  }
  static C(e) {
    return 3 * e;
  }
  static CalcBezier(e, t, i) {
    return ((nt.A(t, i) * e + nt.B(t, i)) * e + nt.C(t)) * e;
  }
  static GetSlope(e, t, i) {
    return 3 * nt.A(t, i) * e * e + 2 * nt.B(t, i) * e + nt.C(t);
  }
  static BinarySubdivide(e, t, i, s, a) {
    let r = 0, h = 0, o = 0;
    do
      h = t + (i - t) / 2, r = nt.CalcBezier(h, s, a) - e, r > 0 ? i = h : t = h;
    while (Math.abs(r) > nt.s_presicion && ++o < nt.s_maxIterations);
    return h;
  }
  static NewtonRaphsonIterate(e, t, i, s) {
    for (let a = 0; a < nt.s_iterations; ++a) {
      let r = nt.GetSlope(t, i, s);
      if (r == 0)
        return t;
      let h = nt.CalcBezier(t, i, s) - e;
      t -= h / r;
    }
    return t;
  }
  static LinearEasing(e) {
    return e;
  }
};
let It = nt;
n(It, "s_iterations", 4), n(It, "s_minSlope", 1e-3), n(It, "s_presicion", 1e-7), n(It, "s_maxIterations", 10), n(It, "s_kSplineTableSize", 11), n(It, "s_kSampleStepSize", 1 / (nt.s_kSplineTableSize - 1));
class Ws {
  static In(e) {
    return 1 - Math.sqrt(1 - e * e);
  }
  static Out(e) {
    return Math.sqrt(1 - --e * e);
  }
  static InOut(e) {
    return ((e *= 2) <= 1 ? 1 - Math.sqrt(1 - e * e) : Math.sqrt(1 - (e -= 2) * e) + 1) / 2;
  }
}
const Vt = class {
  static In(e, t = 1, i = 0.3) {
    let s = Math.asin(1 / (t = Math.max(1, t))) * (i /= Vt.tau);
    return t * Vt.Tpmt(- --e) * Math.sin((s - e) / i);
  }
  static Out(e, t = 1, i = 0.3) {
    let s = Math.asin(1 / (t = Math.max(1, t))) * (i /= Vt.tau);
    return 1 - t * Vt.Tpmt(e = +e) * Math.sin((e + s) / i);
  }
  static InOut(e, t = 1, i = 0.3) {
    let s = Math.asin(1 / (t = Math.max(1, t))) * (i /= Vt.tau);
    return (e = e * 2 - 1) < 0 ? t * Vt.Tpmt(-e) * Math.sin((s - e) / i) : (2 - t * Vt.Tpmt(e) * Math.sin((s + e) / i)) / 2;
  }
  static Tpmt(e) {
    return (Math.pow(2, -10 * e) - 9765625e-10) * 1.0009775171065494;
  }
};
let Lt = Vt;
n(Lt, "tau", 2 * Math.PI);
const mt = class {
  static In(e) {
    return 1 - mt.Out(1 - e);
  }
  static Out(e) {
    return (e = +e) < mt.s_b1 ? mt.s_b0 * e * e : e < mt.s_b3 ? mt.s_b0 * (e -= mt.s_b2) * e + mt.s_b4 : e < mt.s_b6 ? mt.s_b0 * (e -= mt.s_b5) * e + mt.s_b7 : mt.s_b0 * (e -= mt.s_b8) * e + mt.s_b9;
  }
  static InOut(e) {
    return ((e *= 2) <= 1 ? 1 - mt.Out(1 - e) : mt.Out(e - 1) + 1) / 2;
  }
};
let yt = mt;
n(yt, "s_b1", 4 / 11), n(yt, "s_b2", 6 / 11), n(yt, "s_b3", 8 / 11), n(yt, "s_b4", 3 / 4), n(yt, "s_b5", 9 / 11), n(yt, "s_b6", 10 / 11), n(yt, "s_b7", 15 / 16), n(yt, "s_b8", 21 / 22), n(yt, "s_b9", 63 / 64), n(yt, "s_b0", 1 / mt.s_b1 / mt.s_b1);
class Wt {
  static In(e) {
    return Wt.Tpmt(1 - +e);
  }
  static Out(e) {
    return 1 - Wt.Tpmt(e);
  }
  static InOut(e) {
    return ((e *= 2) <= 1 ? Wt.Tpmt(1 - e) : 2 - Wt.Tpmt(e - 1)) / 2;
  }
  static Tpmt(e) {
    return (Math.pow(2, -10 * e) - 9765625e-10) * 1.0009775171065494;
  }
}
class Ns {
  static In(e) {
    return e * e * e;
  }
  static Out(e) {
    return --e * e * e + 1;
  }
  static InOut(e) {
    return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
  }
}
var ce, me;
class _a {
  constructor(e, t, i = 10) {
    T(this, ce, void 0);
    T(this, me, u.TimeSpan.Empty.Clone());
    t.Context.Visual;
    let s = t.Context.Chart, a = t.Context.Index * i, r = s.AnimationsSpeed.TotalMilliseconds + a, h = a / r;
    this.Function = (o) => {
      if (o <= h)
        return 0;
      let l = (o - h) / (1 - h);
      return e(l);
    }, this.Speed = u.TimeSpan.FromMilliseconds(r);
  }
  get Function() {
    return M(this, ce);
  }
  set Function(e) {
    v(this, ce, e);
  }
  get Speed() {
    return M(this, me);
  }
  set Speed(e) {
    v(this, me, e);
  }
}
ce = new WeakMap(), me = new WeakMap();
class Nt {
  static get BackIn() {
    return (e) => Jt.In(e);
  }
  static get BackOut() {
    return (e) => Jt.Out(e);
  }
  static get BackInOut() {
    return (e) => Jt.InOut(e);
  }
  static get BounceIn() {
    return yt.In;
  }
  static get BounceOut() {
    return yt.Out;
  }
  static get BounceInOut() {
    return yt.InOut;
  }
  static get CircleIn() {
    return Ws.In;
  }
  static get CircleOut() {
    return Ws.Out;
  }
  static get CircleInOut() {
    return Ws.InOut;
  }
  static get CubicIn() {
    return Ns.In;
  }
  static get CubicOut() {
    return Ns.Out;
  }
  static get CubicInOut() {
    return Ns.InOut;
  }
  static get Ease() {
    return Nt.BuildCubicBezier(0.25, 0.1, 0.25, 1);
  }
  static get EaseIn() {
    return Nt.BuildCubicBezier(0.42, 0, 1, 1);
  }
  static get EaseOut() {
    return Nt.BuildCubicBezier(0, 0, 0.58, 1);
  }
  static get EaseInOut() {
    return Nt.BuildCubicBezier(0.42, 0, 0.58, 1);
  }
  static get ElasticIn() {
    return (e) => Lt.In(e);
  }
  static get ElasticOut() {
    return (e) => Lt.Out(e);
  }
  static get ElasticInOut() {
    return (e) => Lt.InOut(e);
  }
  static get ExponentialIn() {
    return Wt.In;
  }
  static get ExponentialOut() {
    return Wt.Out;
  }
  static get ExponentialInOut() {
    return Wt.InOut;
  }
  static get Lineal() {
    return (e) => e;
  }
  static get PolinominalIn() {
    return (e) => Kt.In(e);
  }
  static get PolinominalOut() {
    return (e) => Kt.Out(e);
  }
  static get PolinominalInOut() {
    return (e) => Kt.InOut(e);
  }
  static get QuadraticIn() {
    return (e) => e * e;
  }
  static get QuadraticOut() {
    return (e) => e * (2 - e);
  }
  static get QuadraticInOut() {
    return (e) => ((e *= 2) <= 1 ? e * e : --e * (2 - e) + 1) / 2;
  }
  static get SinIn() {
    return (e) => +e == 1 ? 1 : 1 - Math.cos(e * Math.PI / 2);
  }
  static get SinOut() {
    return (e) => Math.sin(e * Math.PI / 2);
  }
  static get SinInOut() {
    return (e) => (1 - Math.cos(Math.PI * e)) / 2;
  }
  static get BuildFunctionUsingKeyFrames() {
    return (e) => {
      if (e.length < 2)
        throw new u.Exception("At least 2 key frames are required.");
      return e[e.length - 1].Time < 1 && (e = new u.List(e).Init(
        [
          new Zn().Init(
            {
              Time: 1,
              Value: e[e.length - 1].Value
            }
          )
        ]
      ).ToArray()), (t) => {
        let i = 0, s = e[i], a = e[i + 1];
        for (; a.Time < t && i < e.length - 2; )
          i++, s = e[i], a = e[i + 1];
        let r = a.Time - s.Time, h = a.Value - s.Value, o = (t - s.Time) / r;
        return s.Value + a.EasingFunction(o) * h;
      };
    };
  }
  static get BuildCustomBackIn() {
    return (e) => (t) => Jt.In(t, e);
  }
  static get BuildCustomBackOut() {
    return (e) => (t) => Jt.Out(t, e);
  }
  static get BuildCustomBackInOut() {
    return (e) => (t) => Jt.InOut(t, e);
  }
  static get BuildCustomElasticIn() {
    return (e, t) => (i) => Lt.In(i, e, t);
  }
  static get BuildCustomElasticOut() {
    return (e, t) => (i) => Lt.Out(i, e, t);
  }
  static get BuildCustomElasticInOut() {
    return (e, t) => (i) => Lt.InOut(i, e, t);
  }
  static get BuildCustomPolinominalIn() {
    return (e) => (t) => Kt.In(t, e);
  }
  static get BuildCustomPolinominalOut() {
    return (e) => (t) => Kt.Out(t, e);
  }
  static get BuildCustomPolinominalInOut() {
    return (e) => (t) => Kt.InOut(t, e);
  }
  static get BuildCubicBezier() {
    return (e, t, i, s) => It.BuildBezierEasingFunction(e, t, i, s);
  }
}
class ee {
  constructor() {
    n(this, "_isInternalSet", !1);
    n(this, "_isThemeSet", !1);
    n(this, "_userSets", new u.HashSet());
    n(this, "_deletingTasks", new u.List());
    n(this, "PropertyChanged", new u.Event());
    n(this, "Tag");
  }
  RemoveOldPaints(e) {
    if (this._deletingTasks.length != 0) {
      for (const t of this._deletingTasks)
        e.CoreCanvas.RemovePaintTask(t), t.Dispose();
      this._deletingTasks.Clear();
    }
  }
  RemoveFromUI(e) {
    for (const t of this.GetPaintTasks())
      t != null && (e.Canvas.RemovePaintTask(t), t.ClearGeometriesFromPaintTask(e.Canvas));
  }
  SetPaintProperty(e, t, i = !1, s = null) {
    if (s == null)
      throw new u.ArgumentNullException("propertyName");
    !this.CanSetProperty(s) || (e.Value != null && this._deletingTasks.Add(e.Value), e.Value = t, e.Value != null && (e.Value.IsStroke = i, e.Value.IsFill = !i, i || (e.Value.StrokeThickness = 0)), this.OnPropertyChanged(s));
  }
  SetProperty(e, t, i = null) {
    if (i == null)
      throw new u.ArgumentNullException("propertyName");
    !this.CanSetProperty(i) || (e.Value = t, this.OnPropertyChanged(i));
  }
  CanSetProperty(e) {
    return !this._isInternalSet || !this._userSets.Contains(e);
  }
  ScheduleDeleteFor(e) {
    this._deletingTasks.Add(e);
  }
  OnPaintChanged(e) {
  }
  OnPropertyChanged(e = null) {
    if (!this._isInternalSet) {
      if (e == null)
        throw new u.ArgumentNullException("propertyName");
      this._userSets.Add(e), this.PropertyChanged.Invoke(this, new u.PropertyChangedEventArgs(e));
    }
  }
}
class Zt {
  constructor(e, t) {
    n(this, "_sync", {});
    n(this, "_action");
    n(this, "_isWaiting", !1);
    n(this, "ThrottlerTimeSpan", u.TimeSpan.Empty.Clone());
    this._action = e, this.ThrottlerTimeSpan = t;
  }
  async Call() {
    {
      if (this._isWaiting)
        return;
      this._isWaiting = !0;
    }
    await new Promise((e) => setTimeout(() => e(), Math.floor(this.ThrottlerTimeSpan.TotalMilliseconds) & 4294967295)), this._isWaiting = !1, await Promise.any([this._action()]);
  }
  ForceCall() {
    this._action();
  }
}
var D = /* @__PURE__ */ ((d) => (d[d.AllSeries = 0] = "AllSeries", d[d.CartesianSeries = 2] = "CartesianSeries", d[d.Bar = 4] = "Bar", d[d.Line = 8] = "Line", d[d.StepLine = 16] = "StepLine", d[d.Scatter = 32] = "Scatter", d[d.Heat = 64] = "Heat", d[d.Financial = 128] = "Financial", d[d.PieSeries = 256] = "PieSeries", d[d.Stacked = 512] = "Stacked", d[d.PrimaryAxisVerticalOrientation = 1024] = "PrimaryAxisVerticalOrientation", d[d.PrimaryAxisHorizontalOrientation = 2048] = "PrimaryAxisHorizontalOrientation", d[d.Gauge = 4096] = "Gauge", d[d.GaugeFill = 8192] = "GaugeFill", d[d.Sketch = 16384] = "Sketch", d[d.Solid = 32768] = "Solid", d[d.PrefersXStrategyTooltips = 65536] = "PrefersXStrategyTooltips", d[d.PrefersYStrategyTooltips = 131072] = "PrefersYStrategyTooltips", d[d.PrefersXYStrategyTooltips = 262144] = "PrefersXYStrategyTooltips", d[d.Polar = 524288] = "Polar", d[d.PolarLine = 1048576] = "PolarLine", d))(D || {}), Se, pe, Pe, ge, ye, Ce, _e;
class En {
  constructor(e, t, i) {
    T(this, Se, void 0);
    T(this, pe, void 0);
    T(this, Pe, void 0);
    T(this, ge, void 0);
    T(this, ye, void 0);
    T(this, Ce, void 0);
    T(this, _e, void 0);
    this.Chart = e, this.Series = t, this.Entity = i;
  }
  get Chart() {
    return M(this, Se);
  }
  set Chart(e) {
    v(this, Se, e);
  }
  get Series() {
    return M(this, pe);
  }
  set Series(e) {
    v(this, pe, e);
  }
  get Entity() {
    return M(this, Pe);
  }
  set Entity(e) {
    v(this, Pe, e);
  }
  get DataSource() {
    return M(this, ge);
  }
  set DataSource(e) {
    v(this, ge, e);
  }
  get Index() {
    return this.Entity?.EntityIndex ?? 0;
  }
  get Visual() {
    return M(this, ye);
  }
  set Visual(e) {
    v(this, ye, e);
  }
  get Label() {
    return M(this, Ce);
  }
  set Label(e) {
    v(this, Ce, e);
  }
  get HoverArea() {
    return M(this, _e);
  }
  set HoverArea(e) {
    v(this, _e, e);
  }
}
Se = new WeakMap(), pe = new WeakMap(), Pe = new WeakMap(), ge = new WeakMap(), ye = new WeakMap(), Ce = new WeakMap(), _e = new WeakMap();
var fe, we, xe, Me, Te, ve;
const Bs = class {
  constructor(e, t, i, s, a, r = !1) {
    T(this, fe, !1);
    T(this, we, 0);
    T(this, xe, 0);
    T(this, Me, 0);
    T(this, Te, 0);
    T(this, ve, 0);
    this.PrimaryValue = e, this.SecondaryValue = t, this.TertiaryValue = i, this.QuaternaryValue = s, this.QuinaryValue = a, this.IsEmpty = r;
  }
  static MakeByXY(e, t, i = 0) {
    return new Bs(t, e, i, 0, 0);
  }
  static get Empty() {
    return new Bs(0, 0, 0, 0, 0, !0);
  }
  get IsEmpty() {
    return M(this, fe);
  }
  set IsEmpty(e) {
    v(this, fe, e);
  }
  get PrimaryValue() {
    return M(this, we);
  }
  set PrimaryValue(e) {
    v(this, we, e);
  }
  get SecondaryValue() {
    return M(this, xe);
  }
  set SecondaryValue(e) {
    v(this, xe, e);
  }
  get TertiaryValue() {
    return M(this, Me);
  }
  set TertiaryValue(e) {
    v(this, Me, e);
  }
  get QuaternaryValue() {
    return M(this, Te);
  }
  set QuaternaryValue(e) {
    v(this, Te, e);
  }
  get QuinaryValue() {
    return M(this, ve);
  }
  set QuinaryValue(e) {
    v(this, ve, e);
  }
};
let K = Bs;
fe = new WeakMap(), we = new WeakMap(), xe = new WeakMap(), Me = new WeakMap(), Te = new WeakMap(), ve = new WeakMap();
var Ae;
class Mn {
  constructor() {
    n(this, "_stackPositions", new u.Dictionary());
    n(this, "_stack", new u.List());
    n(this, "_totals", new u.Dictionary());
    n(this, "_stackCount", 0);
    n(this, "_knownMaxLenght", 0);
    T(this, Ae, 0);
  }
  get MaxLength() {
    return M(this, Ae);
  }
  set MaxLength(e) {
    v(this, Ae, e);
  }
  GetSeriesStackPosition(e) {
    let t;
    if (!this._stackPositions.TryGetValue(e, new u.Out(() => t, (i) => t = i))) {
      let i = new u.Dictionary(this._knownMaxLenght);
      this._stack.Add(i), t = this._stackCount++, this._stackPositions.SetAt(e, t);
    }
    return t;
  }
  StackPoint(e, t) {
    let i, s = e.SecondaryValue, a = e.PrimaryValue, r = 0, h = 0;
    if (t > 0) {
      let l = t, c = !1;
      for (; l >= 0 && !c && l - 1 >= 0; ) {
        let p;
        this._stack[l - 1].TryGetValue(s, new u.Out(() => p, (P) => p = P)) ? (r = p.End, h = p.NegativeEnd, c = !0) : l--;
      }
    }
    let o = this._stack[t];
    if (!o.TryGetValue(e.SecondaryValue, new u.Out(() => i, (l) => i = l))) {
      let l;
      i = new un().Init(
        {
          Start: r,
          End: r,
          NegativeStart: h,
          NegativeEnd: h
        }
      ), o.Add(s, i), this._totals.TryGetValue(s, new u.Out(() => l, (c) => l = c)) || this._totals.Add(s, new On()), this._knownMaxLenght++;
    }
    if (a >= 0) {
      i.End += a;
      let l = this._totals.GetAt(s).Positive + a;
      return this._totals.GetAt(s).Positive = l, l;
    } else {
      i.NegativeEnd += a;
      let l = this._totals.GetAt(s).Negative + a;
      return this._totals.GetAt(s).Negative = l, l;
    }
  }
  GetStack(e, t) {
    let i = e.SecondaryValue, s = this._stack[t].GetAt(i);
    return new un().Init(
      {
        Start: s.Start,
        End: s.End,
        Total: this._totals.GetAt(i).Positive,
        NegativeStart: s.NegativeStart,
        NegativeEnd: s.NegativeEnd,
        NegativeTotal: this._totals.GetAt(i).Negative
      }
    );
  }
}
Ae = new WeakMap();
class Hs {
  constructor(e) {
    n(this, "_series");
    n(this, "_columnsCount", 0);
    n(this, "_rowsCount", 0);
    n(this, "_stackedColumnsCount", 0);
    n(this, "_stackedRowsCount", 0);
    n(this, "_areBarsIndexed", !1);
    n(this, "_columnPositions", new u.Dictionary());
    n(this, "_rowPositions", new u.Dictionary());
    n(this, "_stackColumnPositions", new u.Dictionary());
    n(this, "_stackRowsPositions", new u.Dictionary());
    n(this, "_stackers", new u.Dictionary());
    this._series = e;
  }
  GetColumnPostion(e) {
    return this._areBarsIndexed ? this._columnPositions.GetAt(e) : (this.IndexBars(), this._columnPositions.GetAt(e));
  }
  GetColumnSeriesCount() {
    return this._areBarsIndexed ? this._columnsCount : (this.IndexBars(), this._columnsCount);
  }
  GetRowPostion(e) {
    return this._areBarsIndexed ? this._rowPositions.GetAt(e) : (this.IndexBars(), this._rowPositions.GetAt(e));
  }
  GetRowSeriesCount() {
    return this._areBarsIndexed ? this._rowsCount : (this.IndexBars(), this._rowsCount);
  }
  GetStackedColumnPostion(e) {
    return this._areBarsIndexed ? this._stackColumnPositions.GetAt(e.GetStackGroup()) : (this.IndexBars(), this._stackColumnPositions.GetAt(e.GetStackGroup()));
  }
  GetStackedColumnSeriesCount() {
    return this._areBarsIndexed ? this._stackedColumnsCount : (this.IndexBars(), this._stackedColumnsCount);
  }
  GetStackedRowPostion(e) {
    return this._areBarsIndexed ? this._stackRowsPositions.GetAt(e.GetStackGroup()) : (this.IndexBars(), this._stackRowsPositions.GetAt(e.GetStackGroup()));
  }
  GetStackedRowSeriesCount() {
    return this._areBarsIndexed ? this._stackedRowsCount : (this.IndexBars(), this._stackedRowsCount);
  }
  IndexBars() {
    this._columnsCount = 0, this._rowsCount = 0, this._stackedColumnsCount = 0, this._stackedRowsCount = 0;
    for (const e of this._series)
      if (!!L.IsBarSeries(e)) {
        if (L.IsColumnSeries(e)) {
          if (!L.IsStackedSeries(e)) {
            this._columnPositions.SetAt(e, this._columnsCount++);
            continue;
          }
          this._stackColumnPositions.ContainsKey(e.GetStackGroup()) || this._stackColumnPositions.SetAt(e.GetStackGroup(), this._stackedColumnsCount++);
          continue;
        }
        if (L.IsRowSeries(e)) {
          if (!L.IsRowSeries(e)) {
            this._rowPositions.SetAt(e, this._rowsCount++);
            continue;
          }
          this._stackRowsPositions.ContainsKey(e.GetStackGroup()) || this._stackRowsPositions.SetAt(e.GetStackGroup(), this._stackedRowsCount++);
          continue;
        }
      }
    this._areBarsIndexed = !0;
  }
  GetStackPosition(e, t) {
    if (!L.IsStackedSeries(e))
      return null;
    let i = this.GetStacker(e, t);
    return i == null ? null : new ta().Init(
      {
        Stacker: i,
        Position: i.GetSeriesStackPosition(e)
      }
    );
  }
  GetStacker(e, t) {
    let i, s = `${e.SeriesProperties}.${t}`;
    return this._stackers.TryGetValue(s, new u.Out(() => i, (a) => i = a)) || (i = new Mn(), this._stackers.Add(s, i)), i;
  }
}
class hn {
  constructor() {
    n(this, "MostTop", 34028235e31);
    n(this, "MostBottom", -34028235e31);
    n(this, "MostRight", -34028235e31);
    n(this, "MostLeft", 34028235e31);
    n(this, "PieX", 0);
    n(this, "PieY", 0);
  }
}
var be;
class Xn {
  constructor() {
    n(this, "_currentProvider");
    n(this, "_theme", {});
    T(this, be, {});
    n(this, "EasingFunction", Nt.ExponentialOut);
    n(this, "AnimationsSpeed", u.TimeSpan.FromMilliseconds(800));
    n(this, "ZoomSpeed", 0.2);
    n(this, "ZoomMode", ot.None);
    n(this, "LegendPosition", Xt.Hidden);
    n(this, "LegendBackgroundPaint");
    n(this, "LegendTextPaint");
    n(this, "LegendTextSize");
    n(this, "TooltipPosition", Bt.Top);
    n(this, "TooltipBackgroundPaint");
    n(this, "TooltipTextPaint");
    n(this, "TooltipTextSize");
    n(this, "TooltipFindingStrategy", _t.Automatic);
    n(this, "PolarInitialRotation", -90);
    n(this, "UpdateThrottlingTimeout", u.TimeSpan.FromMilliseconds(50));
  }
  get CurrentThemeId() {
    return M(this, be);
  }
  set CurrentThemeId(e) {
    v(this, be, e);
  }
  HasProvider(e) {
    return this._currentProvider = e, this;
  }
  GetProvider() {
    if (this._currentProvider == null)
      throw new u.NotImplementedException("There is no a ChartEngine registered.");
    return this._currentProvider;
  }
  WithAnimationsSpeed(e) {
    return this.AnimationsSpeed = e, this;
  }
  WithEasingFunction(e) {
    return this.EasingFunction = e, this;
  }
  WithZoomSpeed(e) {
    return this.ZoomSpeed = e, this;
  }
  WithZoomMode(e) {
    return this.ZoomMode = e, this;
  }
  WithUpdateThrottlingTimeout(e) {
    return this.UpdateThrottlingTimeout = e, this;
  }
  WithLegendBackgroundPaint(e) {
    return this.LegendBackgroundPaint = e, this;
  }
  WithLegendTextPaint(e) {
    return this.LegendTextPaint = e, this;
  }
  WithLegendTextSize(e) {
    return this.LegendTextSize = e, this;
  }
  WithTooltipBackgroundPaint(e) {
    return this.TooltipBackgroundPaint = e, this;
  }
  WithTooltipTextPaint(e) {
    return this.TooltipTextPaint = e, this;
  }
  WithTooltipTextSize(e) {
    return this.TooltipTextSize = e, this;
  }
  HasTheme(e) {
    this.CurrentThemeId = {};
    let t;
    return this._theme = t = new Jn(), e(t), this;
  }
  GetTheme() {
    if (this._theme == null)
      throw new u.Exception("A theme is required.");
    return this._theme;
  }
}
be = new WeakMap();
function Hn(d) {
  return typeof d == "object" && d !== null && !Array.isArray(d) && "$meta_LiveChartsCore_IChartEntity" in d.constructor;
}
class Yn {
  constructor(e) {
    n(this, "_labels");
    this._labels = e;
  }
  Function(e) {
    let t = Math.floor(e) & 4294967295;
    return t < 0 || t > this._labels.length - 1 ? "" : this._labels[t];
  }
}
var De;
const nn = class {
  constructor(e, t, i) {
    n(this, "_localCoordinate", K.Empty);
    n(this, "IsLocalEmpty", !1);
    n(this, "StackedValue");
    T(this, De, void 0);
    n(this, "RemoveOnCompleted", !1);
    this.Context = new En(e, t, i);
  }
  get IsLocalEmptyInternal() {
    return this.IsLocalEmpty;
  }
  static get Empty() {
    return new nn(null, null, new he()).Init({ IsLocalEmpty: !0 });
  }
  get IsEmpty() {
    return this.IsLocalEmpty || this.Context.Entity.Coordinate.IsEmpty;
  }
  get PrimaryValue() {
    return this._localCoordinate.IsEmpty ? this.Context.Entity.Coordinate.PrimaryValue : this._localCoordinate.PrimaryValue;
  }
  set PrimaryValue(e) {
    this.OnCoordinateChanged(
      new K(
        e,
        this._localCoordinate.SecondaryValue,
        this._localCoordinate.TertiaryValue,
        this._localCoordinate.QuaternaryValue,
        this._localCoordinate.QuinaryValue
      )
    );
  }
  get SecondaryValue() {
    return this._localCoordinate.IsEmpty ? this.Context.Entity.Coordinate.SecondaryValue : this._localCoordinate.SecondaryValue;
  }
  set SecondaryValue(e) {
    this.OnCoordinateChanged(
      new K(
        this._localCoordinate.PrimaryValue,
        e,
        this._localCoordinate.TertiaryValue,
        this._localCoordinate.QuaternaryValue,
        this._localCoordinate.QuinaryValue
      )
    );
  }
  get TertiaryValue() {
    return this._localCoordinate.IsEmpty ? this.Context.Entity.Coordinate.TertiaryValue : this._localCoordinate.TertiaryValue;
  }
  set TertiaryValue(e) {
    this.OnCoordinateChanged(
      new K(
        this._localCoordinate.PrimaryValue,
        this._localCoordinate.SecondaryValue,
        e,
        this._localCoordinate.QuaternaryValue,
        this._localCoordinate.QuinaryValue
      )
    );
  }
  get QuaternaryValue() {
    return this._localCoordinate.IsEmpty ? this.Context.Entity.Coordinate.QuaternaryValue : this._localCoordinate.QuaternaryValue;
  }
  set QuaternaryValue(e) {
    this.OnCoordinateChanged(
      new K(
        this._localCoordinate.PrimaryValue,
        this._localCoordinate.SecondaryValue,
        this._localCoordinate.TertiaryValue,
        e,
        this._localCoordinate.QuinaryValue
      )
    );
  }
  get QuinaryValue() {
    return this._localCoordinate.IsEmpty ? this.Context.Entity.Coordinate.QuinaryValue : this._localCoordinate.QuinaryValue;
  }
  set QuinaryValue(e) {
    this.OnCoordinateChanged(
      new K(
        this._localCoordinate.PrimaryValue,
        this._localCoordinate.SecondaryValue,
        this._localCoordinate.TertiaryValue,
        this._localCoordinate.QuaternaryValue,
        e
      )
    );
  }
  get AsTooltipString() {
    return this.Context.Series.GetTooltipText(this);
  }
  get AsDataLabel() {
    return this.Context.Series.GetDataLabelText(this);
  }
  get Context() {
    return M(this, De);
  }
  set Context(e) {
    v(this, De, e);
  }
  DistanceTo(e) {
    return this.Context.HoverArea?.DistanceTo(e.Clone()) ?? Number.NaN;
  }
  OnCoordinateChanged(e) {
    this._localCoordinate = e;
  }
};
let qt = nn;
De = new WeakMap();
class ct extends qt {
  constructor(e) {
    super(e.Context.Chart, e.Context.Series, e.Context.Entity), this.IsLocalEmpty = e.IsLocalEmptyInternal, this.StackedValue = e.StackedValue, this.Context.DataSource = e.Context.DataSource, this.Context.Visual = e.Context.Visual, this.Context.Label = e.Context.Label, this.Context.HoverArea = e.Context.HoverArea;
  }
  get Model() {
    return this.Context.DataSource;
  }
  get Visual() {
    return this.Context.Visual;
  }
  get Label() {
    return this.Context.Label;
  }
}
class fa {
  constructor() {
    n(this, "SeriesProperties", 0);
    n(this, "Rule");
  }
}
var ke, Ie;
class wa {
  constructor(e, t, i = !1) {
    T(this, ke, void 0);
    T(this, Ie, void 0);
    n(this, "IsHoverState", !1);
    this.Stroke = e, e != null && (e.IsStroke = !0, e.IsFill = !1), this.Fill = t, t != null && (t.IsStroke = !1, t.IsFill = !0, t.StrokeThickness = 0), this.IsHoverState = i;
  }
  get Stroke() {
    return M(this, ke);
  }
  set Stroke(e) {
    v(this, ke, e);
  }
  get Fill() {
    return M(this, Ie);
  }
  set Fill(e) {
    v(this, Ie, e);
  }
}
ke = new WeakMap(), Ie = new WeakMap();
class Dt {
  constructor(e, t, i = null) {
    n(this, "_onCollectionChanged");
    n(this, "_onItemPropertyChanged");
    n(this, "_itemsListening", new u.HashSet());
    n(this, "checkINotifyPropertyChanged", !1);
    if (this._onCollectionChanged = e, this._onItemPropertyChanged = t, i != null) {
      this.checkINotifyPropertyChanged = i;
      return;
    }
    this.checkINotifyPropertyChanged = !0;
  }
  Initialize(e) {
    if (e != null && (u.IsInterfaceOfINotifyCollectionChanged(e) && e.CollectionChanged.Add(this.OnCollectionChanged, this), this.checkINotifyPropertyChanged))
      for (const t of Dt.GetINotifyPropertyChangedItems(e))
        t.PropertyChanged.Add(this._onItemPropertyChanged, this);
  }
  Dispose(e) {
    if (e != null && (u.IsInterfaceOfINotifyCollectionChanged(e) && e.CollectionChanged.Remove(this.OnCollectionChanged, this), this.checkINotifyPropertyChanged))
      for (const t of Dt.GetINotifyPropertyChangedItems(e))
        t.PropertyChanged.Remove(this._onItemPropertyChanged, this);
  }
  OnCollectionChanged(e, t) {
    if (this.checkINotifyPropertyChanged)
      switch (t.Action) {
        case u.NotifyCollectionChangedAction.Add:
          for (const i of Dt.GetINotifyPropertyChangedItems(t.NewItems))
            i.PropertyChanged.Add(this._onItemPropertyChanged, this), this._itemsListening.Add(i);
          break;
        case u.NotifyCollectionChangedAction.Remove:
          for (const i of Dt.GetINotifyPropertyChangedItems(t.OldItems))
            i.PropertyChanged.Remove(this._onItemPropertyChanged, this), this._itemsListening.Remove(i);
          break;
        case u.NotifyCollectionChangedAction.Replace:
          for (const i of Dt.GetINotifyPropertyChangedItems(t.NewItems))
            i.PropertyChanged.Add(this._onItemPropertyChanged, this), this._itemsListening.Add(i);
          for (const i of Dt.GetINotifyPropertyChangedItems(t.OldItems))
            i.PropertyChanged.Remove(this._onItemPropertyChanged, this), this._itemsListening.Remove(i);
          break;
        case u.NotifyCollectionChangedAction.Reset:
          for (const i of this._itemsListening)
            i.PropertyChanged.Remove(this._onItemPropertyChanged, this);
          if (this._itemsListening.Clear(), u.IsInterfaceOfIEnumerable(e)) {
            const i = e;
            for (const s of Dt.GetINotifyPropertyChangedItems(i))
              s.PropertyChanged.Add(this._onItemPropertyChanged, this), this._itemsListening.Remove(s);
          }
          break;
        case u.NotifyCollectionChangedAction.Move:
          break;
      }
    this._onCollectionChanged(e, t);
  }
  static GetINotifyPropertyChangedItems(e) {
    const t = function* (i) {
      if (i != null)
        for (const s of i)
          u.IsInterfaceOfINotifyPropertyChanged(s) && (yield s);
    }.bind(this);
    return u.EnumerableFrom(() => t(e));
  }
}
class On {
  constructor() {
    n(this, "Positive", 0);
    n(this, "Negative", 0);
  }
}
class vt {
  constructor() {
    n(this, "_toDeleteCount", 0);
  }
  static For(e) {
    for (const t of e)
      t.RemoveOnCompleted = !0;
    return new vt().Init({ _toDeleteCount: e.length });
  }
  Clean(e) {
    !e.RemoveOnCompleted || (this._toDeleteCount--, e.RemoveOnCompleted = !1);
  }
  CollectPoints(e, t, i, s, a) {
    if (this._toDeleteCount == 0)
      return;
    let r = e.Where((h) => h.RemoveOnCompleted);
    for (const h of r)
      h.Context.Chart == t && (a(h, i, s), e.Remove(h));
  }
  CollectPointsForPolar(e, t, i, s) {
    if (this._toDeleteCount == 0)
      return;
    let a = e.Where((r) => r.RemoveOnCompleted);
    for (const r of a)
      r.Context.Chart == t && (s(r, i), e.Remove(r));
  }
}
class Tn {
  constructor(e, ...t) {
    n(this, "PaintTask");
    n(this, "Geometries");
    this.PaintTask = e, this.Geometries = new u.HashSet(t);
  }
}
var Wn = /* @__PURE__ */ ((d) => (d[d.Cartesian = 0] = "Cartesian", d[d.Pie = 1] = "Pie", d))(Wn || {});
const xt = class {
  static GetTooltipLocation(e, t, i) {
    let s = null;
    if (i instanceof Ft || i instanceof oa ? s = xt._getCartesianTooltipLocation(e, i.TooltipPosition, t.Clone(), i.DrawMarginSize.Clone()) : i instanceof ha && (s = xt._getPieTooltipLocation(e, t.Clone())), s == null)
      throw new u.Exception("location not supported");
    let a = i.DrawMarginSize.Clone(), r = s.X, h = s.Y, o = a.Width, l = a.Height;
    return r + t.Width > o && (r = o - t.Width), r < 0 && (r = 0), h < 0 && (h = 0), h + t.Height > l && (h = l - t.Height), new B(r, h);
  }
  static _getCartesianTooltipLocation(e, t, i, s) {
    let a = 0, r = new hn();
    for (const l of e)
      l.Context.HoverArea != null && (l.Context.HoverArea.SuggestTooltipPlacement(r), a++);
    if (a == 0)
      return null;
    r.MostBottom > s.Height - i.Height && (r.MostBottom = s.Height - i.Height), r.MostTop < 0 && (r.MostTop = 0);
    let h = (r.MostRight + r.MostLeft) / 2 - i.Width * 0.5, o = (r.MostTop + r.MostBottom) / 2 - i.Height * 0.5;
    return match(t).with(Bt.Top, () => new B(h, r.MostTop - i.Height)).with(Bt.Bottom, () => new B(h, r.MostBottom)).with(Bt.Left, () => new B(r.MostLeft - i.Width, o)).with(Bt.Right, () => new B(r.MostRight, o)).with(Bt.Center, () => new B(h, o)).with(Bt.Hidden, () => new B(0, 0)).otherwise(() => new B(0, 0));
  }
  static _getPieTooltipLocation(e, t) {
    let i = new hn(), s = !1;
    for (const a of e)
      if (a.Context.HoverArea != null) {
        a.Context.HoverArea.SuggestTooltipPlacement(i), s = !0;
        break;
      }
    return s ? new B(i.PieX - t.Width * 0.5, i.PieY - t.Height * 0.5) : null;
  }
  static GetTick(e, t, i = null, s = null) {
    i ?? (i = e.VisibleDataBounds);
    let a = (s?.Width ?? 0) * 0.6;
    a < 20 * xt.Cf && (a = 20 * xt.Cf);
    let r = s?.Height ?? 0;
    r < 12 * xt.Cf && (r = 12 * xt.Cf);
    let h = e.MaxLimit == null ? i.Max : e.MaxLimit, o = e.MinLimit == null ? i.Min : e.MinLimit, l = h - o;
    l == 0 && (l = o);
    let c = e.Orientation == et.Y ? Math.round(t.Height / r) : Math.round(t.Width / a), p = l / c, m = Math.pow(10, Math.floor(Math.log(p) / Math.log(10))), P = p / m, C = P > 5 ? 10 * m : P > 2 ? 5 * m : P > 1 ? 2 * m : m;
    return new mn().Init({ Value: C, Magnitude: m });
  }
  static GetTickForPolar(e, t, i = null) {
    i ?? (i = e.VisibleDataBounds);
    let s = e.MaxLimit == null ? i.Max : e.MaxLimit, a = e.MinLimit == null ? i.Min : e.MinLimit, r = t.ControlSize.Clone(), h = r.Width < r.Height ? r.Width : r.Height, o = h - t.InnerRadius, l = h * t.TotalAnge / 360, c = s - a, p = e.Orientation == Mt.Angle ? Math.round(l / (10 * xt.Cf)) : Math.round(o / (30 * xt.Cf)), m = c / p, P = Math.pow(10, Math.floor(Math.log(m) / Math.log(10))), C = m / P, G = C > 5 ? 10 * P : C > 2 ? 5 * P : C > 1 ? 2 * P : P;
    return new mn().Init({ Value: G, Magnitude: P });
  }
  static TransitionateProperties(e, ...t) {
    return new qn(e, t);
  }
  static IsBarSeries(e) {
    return (e.SeriesProperties & D.Bar) != 0;
  }
  static IsColumnSeries(e) {
    return (e.SeriesProperties & (D.Bar | D.PrimaryAxisVerticalOrientation)) != 0;
  }
  static IsRowSeries(e) {
    return (e.SeriesProperties & (D.Bar | D.PrimaryAxisHorizontalOrientation)) != 0;
  }
  static IsStackedSeries(e) {
    return (e.SeriesProperties & D.Stacked) != 0;
  }
  static IsVerticalSeries(e) {
    return (e.SeriesProperties & D.PrimaryAxisVerticalOrientation) != 0;
  }
  static IsHorizontalSeries(e) {
    return (e.SeriesProperties & D.PrimaryAxisHorizontalOrientation) != 0;
  }
  static IsFinancialSeries(e) {
    return (e.SeriesProperties & D.Financial) != 0;
  }
  static GetTooltipFindingStrategy(e) {
    let t = !0, i = !0;
    for (const s of e)
      t = t && (s.SeriesProperties & D.PrefersXStrategyTooltips) != 0, i = i && (s.SeriesProperties & D.PrefersYStrategyTooltips) != 0;
    return t ? _t.CompareOnlyXTakeClosest : i ? _t.CompareOnlyYTakeClosest : _t.CompareAllTakeClosest;
  }
  static FindClosestTo(e, t) {
    let i = xt.FindClosestTo1(e, t.Clone());
    return i == null ? null : new ct(i);
  }
  static FindClosestTo1(e, t) {
    let i = new B(t.X, t.Y);
    return e.Select((s) => ({
      distance: s.DistanceTo(i.Clone()),
      point: s
    })).OrderBy((s) => s.distance, u.NumberComparer).FirstOrDefault()?.point;
  }
  static FindClosestTo2(e, t) {
    return e.Select((i) => {
      let s = i.GetTargetLocation(), a = i.GetTargetSize();
      return {
        distance: Math.sqrt(Math.pow(t.X - (s.X + a.Width * 0.5), 2) + Math.pow(t.Y - (s.Y + a.Height * 0.5), 2)),
        visual: i
      };
    }).OrderBy((i) => i.distance, u.NumberComparer).FirstOrDefault()?.visual;
  }
  static GetNextScaler(e, t) {
    return dt.Make(t.DrawMarginLocation.Clone(), t.DrawMarginSize.Clone(), e);
  }
  static GetActualScaler(e, t) {
    return e.ActualBounds.HasPreviousState ? dt.Make(
      t.ActualBounds.Location.Clone(),
      t.ActualBounds.Size.Clone(),
      e,
      new $().Init(
        {
          Max: e.ActualBounds.MaxVisibleBound,
          Min: e.ActualBounds.MinVisibleBound
        }
      )
    ) : null;
  }
  static SelectFirst(e, t) {
    const i = function* (s, a) {
      for (const r of s) {
        yield a(r);
        return;
      }
    }.bind(this);
    return u.EnumerableFrom(() => i(e, t));
  }
  static SplitByNullGaps(e, t) {
    const i = function* (s, a) {
      let r = new vn(s.GetEnumerator());
      for (; !r.Finished; )
        yield xt.YieldReturnUntilNextNullChartPoint(r, a);
      r.Dispose();
    }.bind(this);
    return u.EnumerableFrom(() => i(e, t));
  }
  static AsSplineData(e) {
    const t = function* (i) {
      let s = i.Where((r) => !r.IsEmpty).GetEnumerator();
      if (!s.MoveNext())
        return;
      let a = new Nn(s.Current);
      if (!s.MoveNext()) {
        yield a;
        return;
      }
      for (a.GoNext(s.Current); s.MoveNext(); )
        yield a, a.IsFirst = !1, a.GoNext(s.Current);
      a.IsFirst = !1, yield a, a.GoNext(a.Next), yield a, s.Dispose();
    }.bind(this);
    return u.EnumerableFrom(() => t(e));
  }
  static YieldReturnUntilNextNullChartPoint(e, t) {
    const i = function* (s, a) {
      for (; s.Enumerator.MoveNext(); )
        if (s.Enumerator.Current.IsEmpty) {
          let r = s.IsEmpty;
          if (s.IsEmpty = !0, a(s.Enumerator.Current), !r)
            return;
        } else
          yield s.Enumerator.Current, s.IsEmpty = !1;
      s.Finished = !0;
    }.bind(this);
    return u.EnumerableFrom(() => i(e, t));
  }
};
let L = xt;
n(L, "Cf", 3);
var Ve;
class vn {
  constructor(e) {
    T(this, Ve, void 0);
    n(this, "IsEmpty", !0);
    n(this, "Finished", !1);
    this.Enumerator = e;
  }
  get Enumerator() {
    return M(this, Ve);
  }
  set Enumerator(e) {
    v(this, Ve, e);
  }
  Dispose() {
    this.Enumerator.Dispose();
  }
}
Ve = new WeakMap(), n(vn, "$meta_System_IDisposable", !0);
class Nn {
  constructor(e) {
    n(this, "Previous");
    n(this, "Current");
    n(this, "Next");
    n(this, "AfterNext");
    n(this, "IsFirst", !0);
    this.Previous = e, this.Current = e, this.Next = e, this.AfterNext = e;
  }
  GoNext(e) {
    this.Previous = this.Current, this.Current = this.Next, this.Next = this.AfterNext, this.AfterNext = e;
  }
}
class An {
  constructor() {
    n(this, "IsAutomaticUpdate", !0);
    n(this, "Throttling", !0);
  }
}
class un {
  constructor() {
    n(this, "Start", 0);
    n(this, "End", 0);
    n(this, "Total", 0);
    n(this, "NegativeStart", 0);
    n(this, "NegativeEnd", 0);
    n(this, "NegativeTotal", 0);
  }
  get Share() {
    return (this.End - this.Start) / this.Total;
  }
}
class bn {
}
class qs {
  constructor(e) {
    n(this, "TargetPoint");
    n(this, "X0", 0);
    n(this, "Y0", 0);
    n(this, "X1", 0);
    n(this, "Y1", 0);
    n(this, "X2", 0);
    n(this, "Y2", 0);
    this.TargetPoint = e, this.X0 = this.Y0 = this.X1 = this.Y1 = this.X2 = this.Y2 = 0;
  }
}
class zt {
  constructor() {
    n(this, "Width", 0);
    n(this, "Height", 0);
    n(this, "PaintSchedules", new u.List());
  }
}
class gt extends bn {
  constructor() {
    super();
    n(this, "X", 0);
    n(this, "Y", 0);
    n(this, "Width", 0);
    n(this, "Height", 0);
  }
  SetDimensions(t, i, s, a) {
    return this.X = t, this.Y = i, this.Width = s, this.Height = a, this;
  }
  DistanceTo(t) {
    let i = this.X + this.Width * 0.5, s = this.Y + this.Height * 0.5;
    return Math.sqrt(Math.pow(t.X - i, 2) + Math.pow(t.Y - s, 2));
  }
  IsPointerOver(t, i) {
    let s = this.Width < 1 ? 1 : this.Width, a = this.Height < 1 ? 1 : this.Height, r = t.X > this.X && t.X < this.X + s, h = t.Y > this.Y && t.Y < this.Y + a;
    switch (i) {
      case _t.CompareOnlyX:
      case _t.CompareOnlyXTakeClosest:
        return r;
      case _t.CompareOnlyY:
      case _t.CompareOnlyYTakeClosest:
        return h;
      case _t.CompareAll:
      case _t.CompareAllTakeClosest:
        return r && h;
      case _t.Automatic:
        throw new u.Exception(`The strategy ${i} is not supported.`);
      default:
        throw new u.NotImplementedException();
    }
  }
  SuggestTooltipPlacement(t) {
    this.Y < t.MostTop && (t.MostTop = this.Y), this.Y + this.Height > t.MostBottom && (t.MostBottom = this.Y + this.Height), this.X + this.Width > t.MostRight && (t.MostRight = this.X + this.Width), this.X < t.MostLeft && (t.MostLeft = this.X);
  }
}
class dn extends bn {
  constructor() {
    super(...arguments);
    n(this, "CenterX", 0);
    n(this, "CenterY", 0);
    n(this, "StartAngle", 0);
    n(this, "EndAngle", 0);
    n(this, "Radius", 0);
  }
  SetDimensions(t, i, s, a, r) {
    return this.CenterX = t, this.CenterY = i, this.StartAngle = s, this.EndAngle = a, this.Radius = r, this;
  }
  DistanceTo(t) {
    let i = (this.StartAngle + this.EndAngle) * 0.5, s = this.Radius * 0.5;
    i *= Math.PI / 180;
    let a = s * Math.cos(i), r = s * Math.sin(i);
    return Math.sqrt(Math.pow(t.X - r, 2) + Math.pow(t.Y - a, 2));
  }
  IsPointerOver(t, i) {
    let s = this.StartAngle;
    s %= 360, s < 0 && (s += 360);
    let a = this.EndAngle - 0.01;
    a %= 360, a < 0 && (a += 360);
    let r = this.CenterX - t.X, h = this.CenterY - t.Y, o = Math.atan(h / r) * (180 / Math.PI);
    (r > 0 && h < 0 || r > 0 && h > 0) && (o += 180), r < 0 && h > 0 && (o += 360);
    let l = Math.sqrt(Math.pow(r, 2) + Math.pow(h, 2));
    return a > s ? s <= o && a >= o && l < this.Radius : (o < s && (o += 360), s <= o && a + 360 >= o && l < this.Radius);
  }
  SuggestTooltipPlacement(t) {
    let i = (this.StartAngle + this.EndAngle) / 2;
    t.PieX = this.CenterX + Math.cos(i * (Math.PI / 180)) * this.Radius, t.PieY = this.CenterY + Math.sin(i * (Math.PI / 180)) * this.Radius;
  }
}
function xa(d) {
  return typeof d == "object" && d !== null && !Array.isArray(d) && "$meta_LiveChartsCore_IPolarChartView" in d.constructor;
}
function Ma(d) {
  return typeof d == "object" && d !== null && !Array.isArray(d) && "$meta_LiveChartsCore_ICartesianAxis" in d.constructor;
}
function Ta(d) {
  return typeof d == "object" && d !== null && !Array.isArray(d) && "$meta_LiveChartsCore_ICartesianAxis1" in d.constructor;
}
function Un(d) {
  return typeof d == "object" && d !== null && !Array.isArray(d) && "$meta_LiveChartsCore_IPieSeries" in d.constructor;
}
function va(d) {
  return typeof d == "object" && d !== null && !Array.isArray(d) && "$meta_LiveChartsCore_ICartesianChartView" in d.constructor;
}
class Qs {
  constructor() {
    n(this, "_isTModelChartEntity", !1);
    n(this, "_chartIndexEntityMap", new u.Dictionary());
    n(this, "_series");
    n(this, "PreviousKnownBounds", new Ot(!0));
    let e = new Ot(!0);
    this.PreviousKnownBounds = e;
  }
  Fetch(e, t) {
    const i = function* (s, a) {
      if (s.Values != null) {
        this._series = s;
        for (const r of this.GetEntities(s, a)) {
          let h;
          if (r == null) {
            yield qt.Empty;
            continue;
          }
          r.ChartPoints != null && r.ChartPoints.TryGetValue(a.View, new u.Out(() => h, (o) => h = o)) ? yield h : yield qt.Empty;
        }
      }
    }.bind(this);
    return u.EnumerableFrom(() => i(e, t));
  }
  DisposePoint(e) {
    let t;
    if (this._isTModelChartEntity)
      return;
    let i = e.Context.Chart.CoreChart.Canvas;
    this._chartIndexEntityMap.TryGetValue(i.Sync, new u.Out(() => t, (a) => t = a));
    let s = t;
    s?.Remove(e.Context.Entity.EntityIndex);
  }
  Dispose(e) {
    if (this._series = null, this._isTModelChartEntity)
      return;
    let t = e.Canvas;
    this._chartIndexEntityMap.Remove(t.Sync);
  }
  GetCartesianBounds(e, t, i, s) {
    let a = e.SeriesContext.GetStackPosition(t, t.GetStackGroup()), r = i.MinLimit ?? -17976931348623157e292, h = i.MaxLimit ?? 17976931348623157e292, o = s.MinLimit ?? -17976931348623157e292, l = s.MaxLimit ?? 17976931348623157e292, c = !1, p = new Ot(), m = null;
    for (const P of t.Fetch(e)) {
      if (P.IsEmpty)
        continue;
      let C = P.PrimaryValue, G = P.SecondaryValue, S = P.TertiaryValue;
      if (a != null && (C = a.StackPoint(P)), p.PrimaryBounds.AppendValue(C), p.SecondaryBounds.AppendValue(G), p.TertiaryBounds.AppendValue(S), C >= o && C <= l && G >= r && G <= h && (p.VisiblePrimaryBounds.AppendValue(C), p.VisibleSecondaryBounds.AppendValue(G), p.VisibleTertiaryBounds.AppendValue(S)), m != null) {
        let f = Math.abs(m.SecondaryValue - P.SecondaryValue), y = Math.abs(m.PrimaryValue - P.PrimaryValue);
        f < p.SecondaryBounds.MinDelta && (p.SecondaryBounds.MinDelta = f), y < p.PrimaryBounds.MinDelta && (p.PrimaryBounds.MinDelta = y);
      }
      m = P, c = !0;
    }
    return c ? new Yt(this.PreviousKnownBounds = p, !1) : new Yt(this.PreviousKnownBounds, !0);
  }
  GetFinancialBounds(e, t, i, s) {
    let a = i.MinLimit ?? -17976931348623157e292, r = i.MaxLimit ?? 17976931348623157e292, h = s.MinLimit ?? -17976931348623157e292, o = s.MaxLimit ?? 17976931348623157e292, l = !1, c = new Ot(), p = null;
    for (const m of t.Fetch(e)) {
      if (m.IsEmpty)
        continue;
      let P = m.PrimaryValue, C = m.QuinaryValue, G = m.SecondaryValue, S = m.TertiaryValue;
      if (c.PrimaryBounds.AppendValue(P), c.PrimaryBounds.AppendValue(C), c.SecondaryBounds.AppendValue(G), c.TertiaryBounds.AppendValue(S), P >= h && C <= o && G >= a && G <= r && (c.VisiblePrimaryBounds.AppendValue(P), c.VisiblePrimaryBounds.AppendValue(C), c.VisibleSecondaryBounds.AppendValue(G), c.VisibleTertiaryBounds.AppendValue(S)), p != null) {
        let f = Math.abs(p.SecondaryValue - m.SecondaryValue), y = Math.abs(p.PrimaryValue - m.PrimaryValue);
        f < c.SecondaryBounds.MinDelta && (c.SecondaryBounds.MinDelta = f), y < c.PrimaryBounds.MinDelta && (c.PrimaryBounds.MinDelta = y);
      }
      p = m, l = !0;
    }
    return l ? new Yt(this.PreviousKnownBounds = c, !1) : new Yt(this.PreviousKnownBounds, !0);
  }
  GetPieBounds(e, t) {
    let i = e.SeriesContext.GetStackPosition(t, t.GetStackGroup());
    if (i == null)
      throw new u.Exception("Unexpected null stacker");
    let s = new Ot(), a = !1;
    for (const r of t.Fetch(e))
      r.IsEmpty || (i.StackPoint(r), s.PrimaryBounds.AppendValue(r.PrimaryValue), s.SecondaryBounds.AppendValue(r.SecondaryValue), s.TertiaryBounds.AppendValue(t.Pushout > t.HoverPushout ? t.Pushout : t.HoverPushout), a = !0);
    return a || (s.PrimaryBounds.AppendValue(0), s.SecondaryBounds.AppendValue(0), s.TertiaryBounds.AppendValue(0)), new Yt(s, !1);
  }
  RestartVisuals() {
    throw new u.NotImplementedException("DataFactory.RestartVisuals");
  }
  GetEntities(e, t) {
    return this._isTModelChartEntity = Hn(e.Values.First((i) => i != null)), this._isTModelChartEntity ? this.EnumerateChartEntities(e, t) : this.EnumerateByValEntities(e, t);
  }
  EnumerateChartEntities(e, t) {
    const i = function* (s, a) {
      if (s.Values == null)
        return;
      let r = s.Values, h = 0;
      for (const o of r) {
        let l;
        if (o == null) {
          h++, yield new he();
          continue;
        }
        o.ChartPoints ?? (o.ChartPoints = new u.Dictionary()), o.ChartPoints.TryGetValue(a.View, new u.Out(() => l, (c) => l = c)) || (l = new qt(a.View, s, o), o.ChartPoints.SetAt(a.View, l)), l.Context.DataSource = o, o.EntityIndex = h++, yield o;
      }
    }.bind(this);
    return u.EnumerableFrom(() => i(e, t));
  }
  EnumerateByValEntities(e, t) {
    const i = function* (s, a) {
      let r;
      if (s.Values == null)
        return;
      let h = a.Canvas;
      Qs.TrySetMapperForNumberSeries(s);
      let o = s.Mapping;
      if (o == null)
        throw new u.Exception("series has no mapper");
      let l = 0;
      this._chartIndexEntityMap.TryGetValue(h.Sync, new u.Out(() => r, (p) => r = p)), r == null && (r = new u.Dictionary(), this._chartIndexEntityMap.SetAt(h.Sync, r));
      let c = r;
      for (const p of s.Values) {
        let m, P;
        if (p == null) {
          yield new he(), l++;
          continue;
        }
        c.TryGetValue(l, new u.Out(() => m, (C) => m = C)) || c.SetAt(l, m = new he().Init(
          {
            ChartPoints: new u.Dictionary()
          }
        )), m.ChartPoints.TryGetValue(a.View, new u.Out(() => P, (C) => P = C)) || (P = new qt(a.View, s, m), m.ChartPoints.SetAt(a.View, P)), P.Context.DataSource = p, m.EntityIndex = l++, o(p, P), m.UpdateCoordinate(P), yield m;
      }
    }.bind(this);
    return u.EnumerableFrom(() => i(e, t));
  }
  static TrySetMapperForNumberSeries(e) {
    if (e.Mapping != null)
      return;
    typeof e.Values.First((i) => i != null) == "number" && (e.Mapping = (i, s) => {
      s.PrimaryValue = i ?? 0, s.SecondaryValue = s.Context.Entity.EntityIndex;
    });
  }
}
class Aa {
  GetDefaultDataFactory() {
    return new Qs();
  }
}
class ba {
  constructor(e) {
    n(this, "Delta", B.Empty.Clone());
    n(this, "Handled", !1);
    this.Delta = e.Clone(), this.Handled = !1;
  }
}
var Le, Be;
class Da {
  constructor(e, t) {
    n(this, "_closer");
    T(this, Le, B.Empty.Clone());
    T(this, Be, void 0);
    this.PointerLocation = t.Clone(), this.VisualElements = e;
  }
  get PointerLocation() {
    return M(this, Le);
  }
  set PointerLocation(e) {
    v(this, Le, e);
  }
  get ClosestToPointerVisualElement() {
    return this._closer ?? (this._closer = this.FindClosest());
  }
  get VisualElements() {
    return M(this, Be);
  }
  set VisualElements(e) {
    v(this, Be, e);
  }
  FindClosest() {
    return L.FindClosestTo2(this.VisualElements, this.PointerLocation.Clone());
  }
}
Le = new WeakMap(), Be = new WeakMap();
class re {
  constructor() {
    n(this, "Value", 0);
    n(this, "Label");
    n(this, "Separator");
    n(this, "Tick");
    n(this, "Subseparators");
    n(this, "Subticks");
  }
  get Geometry() {
    return this.Separator;
  }
}
class As {
  constructor() {
    n(this, "Value", 0);
    n(this, "Label");
    n(this, "Circle");
  }
  get Geometry() {
    return this.Circle;
  }
}
const Gs = class {
  constructor(e = 0, t = 0) {
    n(this, "Width", 0);
    n(this, "Height", 0);
    this.Width = e, this.Height = t;
  }
  static op_Equality(e, t) {
    return e.Width == t.Width && e.Height == t.Height;
  }
  static op_Inequality(e, t) {
    return !u.OpEquality(e, t);
  }
  Clone() {
    return new Gs(this.Width, this.Height);
  }
};
let U = Gs;
n(U, "Empty", new Gs(0, 0));
const Fs = class {
  constructor(e = 0, t = 0) {
    n(this, "X", 0);
    n(this, "Y", 0);
    this.X = e, this.Y = t;
  }
  static op_Equality(e, t) {
    return e.X == t.X && e.Y == t.Y;
  }
  static op_Inequality(e, t) {
    return !u.OpEquality(e, t);
  }
  Clone() {
    return new Fs(this.X, this.Y);
  }
};
let B = Fs;
n(B, "Empty", new Fs(0, 0));
const Rs = class {
  constructor(e = 0, t = 0) {
    n(this, "X", 0);
    n(this, "Y", 0);
    this.X = e, this.Y = t;
  }
  static op_Equality(e, t) {
    return e.X == t.X && e.Y == t.Y;
  }
  static op_Inequality(e, t) {
    return !u.OpEquality(e, t);
  }
  Clone() {
    return new Rs(this.X, this.Y);
  }
};
let le = Rs;
n(le, "Empty", new Rs(0, 0).Clone());
const zs = class {
  constructor(e, t) {
    n(this, "Location", B.Empty.Clone());
    n(this, "Size", U.Empty.Clone());
    this.Location = e.Clone(), this.Size = t.Clone();
  }
  get X() {
    return this.Location.X;
  }
  get Y() {
    return this.Location.Y;
  }
  get Width() {
    return this.Size.Width;
  }
  get Height() {
    return this.Size.Height;
  }
  static op_Equality(e, t) {
    return u.OpEquality(e.Location, t.Location) && u.OpEquality(e.Size, t.Size);
  }
  static op_Inequality(e, t) {
    return !u.OpEquality(e, t);
  }
  Clone() {
    return new zs(new B(this.Location.X, this.Location.Y), new U(this.Size.Width, this.Size.Height));
  }
};
let W = zs;
n(W, "Empty", new zs(new B(0, 0), new U(0, 0)).Clone());
class ht {
  constructor(e, t, i, s = 255) {
    n(this, "R", 0);
    n(this, "G", 0);
    n(this, "B", 0);
    n(this, "A", 0);
    this.R = e, this.G = t, this.B = i, this.A = s;
  }
  static get Empty() {
    return new ht(255, 255, 255, 0);
  }
  static op_Equality(e, t) {
    return e.R == t.R && e.G == t.G && e.B == t.B && e.A == t.A;
  }
  static op_Inequality(e, t) {
    return !u.OpEquality(e, t);
  }
  static FromArgb(e, t, i, s) {
    return new ht(t, i, s, e);
  }
  static FromColorWithAlpha(e, t) {
    return new ht(t.R, t.G, t.B, e);
  }
  Clone() {
    return new ht(this.R, this.G, this.B, this.A);
  }
}
const Es = class {
  constructor(e, t, i, s) {
    n(this, "Left", 0);
    n(this, "Right", 0);
    n(this, "Top", 0);
    n(this, "Bottom", 0);
    this.Left = e, this.Top = t, this.Right = i, this.Bottom = s;
  }
  static All(e) {
    return new Es(e, e, e, e);
  }
};
let kt = Es;
n(kt, "Default", new Es(0, 0, 0, 0));
class Zn {
  constructor() {
    n(this, "Time", 0);
    n(this, "Value", 0);
    n(this, "EasingFunction", Nt.Lineal);
  }
}
class qn {
  constructor(e, t) {
    n(this, "_properties");
    n(this, "_target");
    this._target = e, this._properties = t;
  }
  WithAnimation(e) {
    return this._target.SetTransition(e, ...this._properties), this;
  }
  WithAnimationBuilder(e) {
    let t = new cn();
    return e(t), this.WithAnimation(t);
  }
  WithAnimationFromChart(e) {
    return this.WithAnimation(new cn().WithDuration(e.View.AnimationsSpeed).WithEasingFunction(e.View.EasingFunction));
  }
  CompleteCurrentTransitions() {
    return this._target.CompleteTransition(...this._properties), this;
  }
}
function jn(d) {
  return typeof d == "object" && d !== null && !Array.isArray(d) && "$meta_LiveChartsCore_ILabelGeometry" in d.constructor;
}
class $n {
  constructor(e) {
    n(this, "Geometry");
    n(this, "StepSegment", new Kn());
    n(this, "FillPath");
    n(this, "StrokePath");
    this.Geometry = e();
  }
  get MainGeometry() {
    return this.Geometry?.MainGeometry;
  }
}
class Dn {
  constructor(e) {
    n(this, "Geometry");
    n(this, "Bezier", new Qn());
    n(this, "FillPath");
    n(this, "StrokePath");
    this.Geometry = e;
  }
  get MainGeometry() {
    return this.Geometry?.MainGeometry;
  }
}
var it = /* @__PURE__ */ ((d) => (d[d.Start = 0] = "Start", d[d.End = 1] = "End", d[d.Middle = 2] = "Middle", d))(it || {});
function ka(d) {
  return typeof d == "object" && d !== null && !Array.isArray(d) && "$meta_LiveChartsCore_IAnimatable" in d.constructor;
}
class Ia {
  OnBegingDraw() {
  }
  OnEndDraw() {
  }
}
function ks(d) {
  return typeof d == "object" && d !== null && !Array.isArray(d) && "$meta_LiveChartsCore_IRoundedRectangleChartPoint" in d.constructor;
}
class cn {
  constructor() {
    n(this, "_duration", 0n);
    n(this, "_animationCompletedCount", 0);
    n(this, "_repeatTimes", 0);
    n(this, "EasingFunction");
    this.EasingFunction = (e) => e;
  }
  get Duration() {
    return this._duration;
  }
  set Duration(e) {
    this._duration = e;
  }
  get Repeat() {
    return this._repeatTimes;
  }
  set Repeat(e) {
    this._repeatTimes = e;
  }
  WithEasingFunction(e) {
    return this.EasingFunction = e, this;
  }
  WithDuration(e) {
    return this._duration = BigInt(e.TotalMilliseconds.toFixed(0)), this;
  }
  RepeatTimes(e) {
    return this._repeatTimes = e, this;
  }
  RepeatIndefinitely() {
    return this._repeatTimes = 2147483647, this;
  }
}
var js = /* @__PURE__ */ ((d) => (d[d.Horizontal = 0] = "Horizontal", d[d.Vertical = 1] = "Vertical", d))(js || {}), $t = /* @__PURE__ */ ((d) => (d[d.NotClosed = 0] = "NotClosed", d[d.CloseToPivot = 1] = "CloseToPivot", d[d.CloseToStart = 2] = "CloseToStart", d))($t || {}), Ge;
class ie {
  constructor() {
    n(this, "IsValid", !0);
    n(this, "CurrentTime", BigInt("-9223372036854775808"));
    n(this, "RemoveOnCompleted", !1);
    T(this, Ge, new u.Dictionary());
  }
  get MotionProperties() {
    return M(this, Ge);
  }
  set MotionProperties(e) {
    v(this, Ge, e);
  }
  SetTransition(e, ...t) {
    let i = e?.Duration == 0n ? null : e;
    (t == null || t.length == 0) && (t = this.MotionProperties.Keys.ToArray());
    for (const s of t)
      this.MotionProperties.GetAt(s).Animation = i;
  }
  RemoveTransition(...e) {
    (e == null || e.length == 0) && (e = this.MotionProperties.Keys.ToArray());
    for (const t of e)
      this.MotionProperties.GetAt(t).Animation = null;
  }
  CompleteTransition(...e) {
    (e == null || e.length == 0) && (e = this.MotionProperties.Keys.ToArray());
    for (const t of e) {
      let i;
      if (!this.MotionProperties.TryGetValue(t, new u.Out(() => i, (s) => i = s)))
        throw new u.Exception(`The property ${t} is not a transition property of this instance.`);
      i.Animation != null && (i.IsCompleted = !0);
    }
  }
  RegisterMotionProperty(e) {
    return this.MotionProperties.SetAt(e.PropertyName, e), e;
  }
}
Ge = new WeakMap(), n(ie, "$meta_LiveChartsCore_IAnimatable", !0);
class Va extends ie {
  constructor() {
    super();
    n(this, "_xiProperty");
    n(this, "_yiProperty");
    n(this, "_xjProperty");
    n(this, "_yjProperty");
    n(this, "Id", 0);
    this._xiProperty = this.RegisterMotionProperty(new ft("Xi", 0)), this._yiProperty = this.RegisterMotionProperty(new ft("Yi", 0)), this._xjProperty = this.RegisterMotionProperty(new ft("Xj", 0)), this._yjProperty = this.RegisterMotionProperty(new ft("Yj", 0));
  }
  get Xi() {
    return this._xiProperty.GetMovement(this);
  }
  set Xi(t) {
    this._xiProperty.SetMovement(t, this);
  }
  get Yi() {
    return this._yiProperty.GetMovement(this);
  }
  set Yi(t) {
    this._yiProperty.SetMovement(t, this);
  }
  get Xj() {
    return this._xjProperty.GetMovement(this);
  }
  set Xj(t) {
    this._xjProperty.SetMovement(t, this);
  }
  get Yj() {
    return this._yjProperty.GetMovement(this);
  }
  set Yj(t) {
    this._yjProperty.SetMovement(t, this);
  }
  Follows(t) {
    this.IsValid = t.IsValid, this.CurrentTime = t.CurrentTime, this.RemoveOnCompleted = t.RemoveOnCompleted;
    let i = t.MotionProperties.GetAt("Xj"), s = t.MotionProperties.GetAt("Yj");
    this.MotionProperties.GetAt("Xi").CopyFrom(i), this.MotionProperties.GetAt("Xj").CopyFrom(i), this.MotionProperties.GetAt("Yi").CopyFrom(s), this.MotionProperties.GetAt("Yj").CopyFrom(s);
  }
}
class Qn extends ie {
  constructor() {
    super();
    n(this, "_xiProperty");
    n(this, "_yiProperty");
    n(this, "_xmProperty");
    n(this, "_ymProperty");
    n(this, "_xjProperty");
    n(this, "_yjProperty");
    n(this, "Id", 0);
    this._xiProperty = this.RegisterMotionProperty(new ft("Xi", 0)), this._yiProperty = this.RegisterMotionProperty(new ft("Yi", 0)), this._xmProperty = this.RegisterMotionProperty(new ft("Xm", 0)), this._ymProperty = this.RegisterMotionProperty(new ft("Ym", 0)), this._xjProperty = this.RegisterMotionProperty(new ft("Xj", 0)), this._yjProperty = this.RegisterMotionProperty(new ft("Yj", 0));
  }
  get Xi() {
    return this._xiProperty.GetMovement(this);
  }
  set Xi(t) {
    this._xiProperty.SetMovement(t, this);
  }
  get Yi() {
    return this._yiProperty.GetMovement(this);
  }
  set Yi(t) {
    this._yiProperty.SetMovement(t, this);
  }
  get Xm() {
    return this._xmProperty.GetMovement(this);
  }
  set Xm(t) {
    this._xmProperty.SetMovement(t, this);
  }
  get Ym() {
    return this._ymProperty.GetMovement(this);
  }
  set Ym(t) {
    this._ymProperty.SetMovement(t, this);
  }
  get Xj() {
    return this._xjProperty.GetMovement(this);
  }
  set Xj(t) {
    this._xjProperty.SetMovement(t, this);
  }
  get Yj() {
    return this._yjProperty.GetMovement(this);
  }
  set Yj(t) {
    this._yjProperty.SetMovement(t, this);
  }
  Follows(t) {
    this.IsValid = t.IsValid, this.CurrentTime = t.CurrentTime, this.RemoveOnCompleted = t.RemoveOnCompleted;
    let i = t.MotionProperties.GetAt("Xj"), s = t.MotionProperties.GetAt("Yj");
    this.MotionProperties.GetAt("Xi").CopyFrom(i), this.MotionProperties.GetAt("Xm").CopyFrom(i), this.MotionProperties.GetAt("Xj").CopyFrom(i), this.MotionProperties.GetAt("Yi").CopyFrom(s), this.MotionProperties.GetAt("Ym").CopyFrom(s), this.MotionProperties.GetAt("Yj").CopyFrom(s);
  }
}
class Kn extends ie {
  constructor() {
    super();
    n(this, "_xiProperty");
    n(this, "_yiProperty");
    n(this, "_xjProperty");
    n(this, "_yjProperty");
    n(this, "Id", 0);
    this._xiProperty = this.RegisterMotionProperty(new ft("Xi", 0)), this._yiProperty = this.RegisterMotionProperty(new ft("Yi", 0)), this._xjProperty = this.RegisterMotionProperty(new ft("Xj", 0)), this._yjProperty = this.RegisterMotionProperty(new ft("Yj", 0));
  }
  get Xi() {
    return this._xiProperty.GetMovement(this);
  }
  set Xi(t) {
    this._xiProperty.SetMovement(t, this);
  }
  get Yi() {
    return this._yiProperty.GetMovement(this);
  }
  set Yi(t) {
    this._yiProperty.SetMovement(t, this);
  }
  get Xj() {
    return this._xjProperty.GetMovement(this);
  }
  set Xj(t) {
    this._xjProperty.SetMovement(t, this);
  }
  get Yj() {
    return this._yjProperty.GetMovement(this);
  }
  set Yj(t) {
    this._yjProperty.SetMovement(t, this);
  }
  Follows(t) {
    this.IsValid = t.IsValid, this.CurrentTime = t.CurrentTime, this.RemoveOnCompleted = t.RemoveOnCompleted;
    let i = t.MotionProperties.GetAt("Xj"), s = t.MotionProperties.GetAt("Yj");
    this.MotionProperties.GetAt("Xi").CopyFrom(i), this.MotionProperties.GetAt("Xj").CopyFrom(i), this.MotionProperties.GetAt("Yi").CopyFrom(s), this.MotionProperties.GetAt("Yj").CopyFrom(s);
  }
}
class q {
  static get FluentDesign() {
    return [
      q.RGB(116, 77, 169),
      q.RGB(231, 72, 86),
      q.RGB(255, 140, 0),
      q.RGB(0, 153, 188),
      q.RGB(191, 0, 119),
      q.RGB(1, 133, 116),
      q.RGB(194, 57, 179),
      q.RGB(76, 74, 72),
      q.RGB(0, 183, 195)
    ];
  }
  static get MaterialDesign500() {
    return [
      q.RGB(33, 150, 243),
      q.RGB(244, 67, 54),
      q.RGB(139, 195, 74),
      q.RGB(0, 188, 212),
      q.RGB(63, 81, 181),
      q.RGB(255, 193, 7),
      q.RGB(0, 150, 136),
      q.RGB(233, 30, 99),
      q.RGB(96, 125, 139)
    ];
  }
  static get MaterialDesign200() {
    return [
      q.RGB(144, 202, 249),
      q.RGB(239, 154, 154),
      q.RGB(197, 225, 165),
      q.RGB(128, 222, 234),
      q.RGB(159, 168, 218),
      q.RGB(255, 224, 130),
      q.RGB(128, 203, 196),
      q.RGB(244, 143, 177),
      q.RGB(176, 190, 197)
    ];
  }
  static get MaterialDesign800() {
    return [
      q.RGB(21, 101, 192),
      q.RGB(198, 40, 40),
      q.RGB(85, 139, 47),
      q.RGB(0, 131, 143),
      q.RGB(40, 53, 147),
      q.RGB(255, 143, 0),
      q.RGB(0, 105, 92),
      q.RGB(173, 20, 87),
      q.RGB(55, 71, 79)
    ];
  }
  static RGB(e, t, i) {
    return ht.FromArgb(255, e, t, i);
  }
}
class Jn {
  constructor() {
    n(this, "AxisBuilder", new u.List());
    n(this, "DrawMarginFrameBuilder", new u.List());
    n(this, "SeriesBuilder", new u.List());
    n(this, "PieSeriesBuilder", new u.List());
    n(this, "GaugeSeriesBuilder", new u.List());
    n(this, "GaugeFillSeriesBuilder", new u.List());
    n(this, "CartesianSeriesBuilder", new u.List());
    n(this, "StepLineSeriesBuilder", new u.List());
    n(this, "StackedStepLineSeriesBuilder", new u.List());
    n(this, "LineSeriesBuilder", new u.List());
    n(this, "PolarSeriesBuilder", new u.List());
    n(this, "PolarLineSeriesBuilder", new u.List());
    n(this, "StackedPolarSeriesBuilder", new u.List());
    n(this, "HeatSeriesBuilder", new u.List());
    n(this, "FinancialSeriesBuilder", new u.List());
    n(this, "StackedLineSeriesBuilder", new u.List());
    n(this, "BarSeriesBuilder", new u.List());
    n(this, "ColumnSeriesBuilder", new u.List());
    n(this, "RowSeriesBuilder", new u.List());
    n(this, "StackedBarSeriesBuilder", new u.List());
    n(this, "StackedColumnSeriesBuilder", new u.List());
    n(this, "StackedRowSeriesBuilder", new u.List());
    n(this, "ScatterSeriesBuilder", new u.List());
  }
  ApplyStyleToAxis(e) {
    for (const t of this.AxisBuilder)
      t(e);
  }
  ApplyStyleToSeries(e) {
    for (const i of this.SeriesBuilder)
      i(e);
    if ((e.SeriesProperties & D.PieSeries) == D.PieSeries)
      if ((e.SeriesProperties & D.Gauge) != 0)
        if ((e.SeriesProperties & D.GaugeFill) != 0)
          for (const i of this.GaugeFillSeriesBuilder)
            i(e);
        else
          for (const i of this.GaugeSeriesBuilder)
            i(e);
      else
        for (const i of this.PieSeriesBuilder)
          i(e);
    if ((e.SeriesProperties & D.CartesianSeries) == D.CartesianSeries)
      for (const i of this.CartesianSeriesBuilder)
        i(e);
    if ((e.SeriesProperties & D.Bar) == D.Bar && (e.SeriesProperties & D.Stacked) != D.Stacked) {
      let i = e;
      for (const s of this.BarSeriesBuilder)
        s(i);
      if ((e.SeriesProperties & D.PrimaryAxisVerticalOrientation) == D.PrimaryAxisVerticalOrientation)
        for (const s of this.ColumnSeriesBuilder)
          s(i);
      if ((e.SeriesProperties & D.PrimaryAxisHorizontalOrientation) == D.PrimaryAxisHorizontalOrientation)
        for (const s of this.RowSeriesBuilder)
          s(i);
    }
    let t = D.Bar | D.Stacked;
    if ((e.SeriesProperties & t) == t) {
      let i = e;
      for (const s of this.StackedBarSeriesBuilder)
        s(i);
      if ((e.SeriesProperties & D.PrimaryAxisVerticalOrientation) == D.PrimaryAxisVerticalOrientation)
        for (const s of this.StackedColumnSeriesBuilder)
          s(i);
      if ((e.SeriesProperties & D.PrimaryAxisHorizontalOrientation) == D.PrimaryAxisHorizontalOrientation)
        for (const s of this.StackedRowSeriesBuilder)
          s(i);
    }
    if ((e.SeriesProperties & D.Scatter) == D.Scatter)
      for (const i of this.ScatterSeriesBuilder)
        i(e);
    if ((e.SeriesProperties & D.StepLine) == D.StepLine) {
      let i = e;
      for (const s of this.StepLineSeriesBuilder)
        s(i);
      if ((e.SeriesProperties & D.Stacked) == D.Stacked)
        for (const s of this.StackedStepLineSeriesBuilder)
          s(i);
    }
    if ((e.SeriesProperties & D.Line) == D.Line) {
      let i = e;
      for (const s of this.LineSeriesBuilder)
        s(i);
      if ((e.SeriesProperties & D.Stacked) == D.Stacked)
        for (const s of this.StackedLineSeriesBuilder)
          s(i);
    }
    if ((e.SeriesProperties & D.Polar) == D.Polar) {
      let i = e;
      for (const s of this.PolarSeriesBuilder)
        s(i);
      if ((e.SeriesProperties & D.Stacked) == D.Stacked)
        for (const s of this.StackedPolarSeriesBuilder)
          s(i);
    }
    if ((e.SeriesProperties & D.PolarLine) == D.PolarLine) {
      let i = e;
      for (const s of this.PolarLineSeriesBuilder)
        s(i);
      if ((e.SeriesProperties & D.Stacked) == D.Stacked)
        for (const s of this.StackedPolarSeriesBuilder)
          s(i);
    }
    if ((e.SeriesProperties & D.Heat) == D.Heat) {
      let i = e;
      for (const s of this.HeatSeriesBuilder)
        s(i);
    }
    if ((e.SeriesProperties & D.Financial) == D.Financial) {
      let i = e;
      for (const s of this.FinancialSeriesBuilder)
        s(i);
    }
  }
}
class La {
  static HasRuleForAxes(e, t) {
    return e.AxisBuilder.Add(t), e;
  }
  static HasRuleForDrawMargin(e, t) {
    return e.DrawMarginFrameBuilder.Add(t), e;
  }
  static HasRuleForAnySeries(e, t) {
    return e.SeriesBuilder.Add(t), e;
  }
  static HasRuleForPieSeries(e, t) {
    return e.PieSeriesBuilder.Add(t), e;
  }
  static HasRuleForGaugeSeries(e, t) {
    return e.GaugeSeriesBuilder.Add(t), e;
  }
  static HasRuleForGaugeFillSeries(e, t) {
    return e.GaugeFillSeriesBuilder.Add(t), e;
  }
  static HasRuleForLineSeries(e, t) {
    return e.LineSeriesBuilder.Add(t), e;
  }
  static HasRuleForStepLineSeries(e, t) {
    return e.StepLineSeriesBuilder.Add(t), e;
  }
  static HasRuleForStackedStepLineSeries(e, t) {
    return e.StackedStepLineSeriesBuilder.Add(t), e;
  }
  static HasRuleForStackedLineSeries(e, t) {
    return e.StackedLineSeriesBuilder.Add(t), e;
  }
  static HasRuleForBarSeries(e, t) {
    return e.BarSeriesBuilder.Add(t), e;
  }
  static HasRuleForColumnSeries(e, t) {
    return e.ColumnSeriesBuilder.Add(t), e;
  }
  static HasRuleForRowSeries(e, t) {
    return e.ColumnSeriesBuilder.Add(t), e;
  }
  static HasRuleForStackedBarSeries(e, t) {
    return e.StackedBarSeriesBuilder.Add(t), e;
  }
  static HasRuleForStackedColumnSeries(e, t) {
    return e.StackedColumnSeriesBuilder.Add(t), e;
  }
  static HasRuleForStackedRowSeries(e, t) {
    return e.StackedRowSeriesBuilder.Add(t), e;
  }
  static HasRuleForScatterSeries(e, t) {
    return e.ScatterSeriesBuilder.Add(t), e;
  }
  static HasRuleForHeatSeries(e, t) {
    return e.HeatSeriesBuilder.Add(t), e;
  }
  static HasRuleForFinancialSeries(e, t) {
    return e.FinancialSeriesBuilder.Add(t), e;
  }
  static HasRuleForPolaSeries(e, t) {
    return e.PolarSeriesBuilder.Add(t), e;
  }
  static HasRuleForPolarLineSeries(e, t) {
    return e.PolarLineSeriesBuilder.Add(t), e;
  }
}
var Fe, Re;
const te = class {
  constructor(e, t, i, s, a, r, h) {
    n(this, "_deltaVal");
    n(this, "_m");
    n(this, "_mInv");
    n(this, "_minPx");
    n(this, "_maxPx");
    n(this, "_deltaPx");
    n(this, "_orientation");
    T(this, Fe, 0);
    T(this, Re, 0);
    this._minPx = e, this._maxPx = t, this._deltaPx = i, this._deltaVal = s, this._m = a, this._mInv = r, this._orientation = h;
  }
  static MakeDefault() {
    let e = 0, t = 100, i = t - e, s = 0 - 100, a = i / s, r = 1 / a;
    return new te(e, t, i, s, a, r, et.Unknown).Init({
      MaxVal: 0,
      MinVal: 100
    });
  }
  static Make(e, t, i, s = null) {
    if (i.Orientation == et.Unknown)
      throw new u.Exception("The axis is not ready to be scaled.");
    let a = i.Orientation, r = 0, h = 0, o = 0, l = 0, c = 0, p = 0, m = 0, P = 0, C = i.DataBounds, G = i.VisibleDataBounds, S = i.MaxLimit, f = i.MinLimit;
    if (s != null && (C = s, G = s, f = null, S = null), !Number.isFinite(C.Delta) || !Number.isFinite(G.Delta))
      return m = 0, P = 0, r = 0, i.Orientation == et.X ? (l = e.X, c = e.X + t.Width, p = c - l) : (l = e.Y, c = e.Y + t.Height, p = c - l), h = 0, o = 0, new te(l, c, p, r, h, o, a).Init({
        MaxVal: m,
        MinVal: P
      });
    if (i.Orientation == et.X) {
      if (l = e.X, c = e.X + t.Width, p = c - l, m = i.IsInverted ? C.Min : C.Max, P = i.IsInverted ? C.Max : C.Min, S != null || f != null)
        m = i.IsInverted ? f ?? P : S ?? m, P = i.IsInverted ? S ?? m : f ?? P;
      else {
        let y = i.IsInverted ? G.Min : G.Max, g = i.IsInverted ? G.Max : G.Min;
        (y != m || g != P) && (m = y, P = g);
      }
      r = m - P;
    } else {
      if (l = e.Y, c = e.Y + t.Height, p = c - l, m = i.IsInverted ? C.Max : C.Min, P = i.IsInverted ? C.Min : C.Max, S != null || f != null)
        m = i.IsInverted ? S ?? P : f ?? m, P = i.IsInverted ? f ?? m : S ?? P;
      else {
        let y = i.IsInverted ? G.Max : G.Min, g = i.IsInverted ? G.Min : G.Max;
        (y != m || g != P) && (m = y, P = g);
      }
      r = m - P;
    }
    return h = p / r, o = 1 / h, !Number.isNaN(h) && !!Number.isFinite(h) ? new te(l, c, p, r, h, o, a).Init({
      MaxVal: m,
      MinVal: P
    }) : (h = 0, o = 0, new te(l, c, p, r, h, o, a).Init({
      MaxVal: m,
      MinVal: P
    }));
  }
  get MaxVal() {
    return M(this, Fe);
  }
  set MaxVal(e) {
    v(this, Fe, e);
  }
  get MinVal() {
    return M(this, Re);
  }
  set MinVal(e) {
    v(this, Re, e);
  }
  MeasureInPixels(e) {
    return Math.abs(this._orientation == et.X ? this._minPx + (e - this.MinVal) * this._m - (this._minPx + (0 - this.MinVal) * this._m) : this._minPx + (0 - this.MinVal) * this._m - (this._minPx + (e - this.MinVal) * this._m));
  }
  ToPixels(e) {
    return this._minPx + (e - this.MinVal) * this._m;
  }
  ToChartValues(e) {
    return this.MinVal + (e - this._minPx) * this._mInv;
  }
};
let dt = te;
Fe = new WeakMap(), Re = new WeakMap();
var kn = /* @__PURE__ */ ((d) => (d[d.Pixels = 0] = "Pixels", d[d.ChartValues = 1] = "ChartValues", d))(kn || {}), Mt = /* @__PURE__ */ ((d) => (d[d.Unknown = 0] = "Unknown", d[d.Angle = 1] = "Angle", d[d.Radius = 2] = "Radius", d))(Mt || {});
class lt {
  constructor(e, t, i, s) {
    n(this, "Left", 0);
    n(this, "Top", 0);
    n(this, "Right", 0);
    n(this, "Bottom", 0);
    this.Left = e, this.Top = t, this.Right = i, this.Bottom = s;
  }
  static Empty() {
    return new lt(0, 0, 0, 0);
  }
  static All(e) {
    return new lt(e, e, e, e);
  }
  static get Auto() {
    return Number.NaN;
  }
  static IsAuto(e) {
    return Number.isNaN(e);
  }
}
var et = /* @__PURE__ */ ((d) => (d[d.Unknown = 0] = "Unknown", d[d.X = 1] = "X", d[d.Y = 2] = "Y", d))(et || {}), Bt = /* @__PURE__ */ ((d) => (d[d.Hidden = 0] = "Hidden", d[d.Top = 1] = "Top", d[d.Bottom = 2] = "Bottom", d[d.Left = 3] = "Left", d[d.Right = 4] = "Right", d[d.Center = 5] = "Center", d))(Bt || {}), _t = /* @__PURE__ */ ((d) => (d[d.Automatic = 0] = "Automatic", d[d.CompareAll = 1] = "CompareAll", d[d.CompareOnlyX = 2] = "CompareOnlyX", d[d.CompareOnlyY = 3] = "CompareOnlyY", d[d.CompareAllTakeClosest = 4] = "CompareAllTakeClosest", d[d.CompareOnlyXTakeClosest = 5] = "CompareOnlyXTakeClosest", d[d.CompareOnlyYTakeClosest = 6] = "CompareOnlyYTakeClosest", d))(_t || {});
class ta {
  constructor() {
    n(this, "Stacker", new Mn());
    n(this, "Position", 0);
  }
  StackPoint(e) {
    return this.Stacker.StackPoint(e, this.Position);
  }
  GetStack(e) {
    return e.StackedValue = this.Stacker.GetStack(e, this.Position);
  }
}
var ze;
class Is {
  constructor(e) {
    n(this, "_nextNode");
    n(this, "_currentNode");
    T(this, ze, void 0);
    this.AreaGeometry = e, this._nextNode = e.FirstCommand;
  }
  get AreaGeometry() {
    return M(this, ze);
  }
  set AreaGeometry(e) {
    v(this, ze, e);
  }
  AddConsecutiveSegment(e, t) {
    for (; this._nextNode != null && this._nextNode.Next != null && e.Id >= this._nextNode.Next.Value.Id; )
      this._nextNode = this._nextNode.Next, this._nextNode.Previous != null && this.AreaGeometry.RemoveCommand(this._nextNode.Previous);
    if (this._nextNode == null) {
      this._currentNode != null && t && e.Follows(this._currentNode.Value), this._currentNode = this.AreaGeometry.AddLast(e);
      return;
    }
    if (this._nextNode.Value.Id == e.Id) {
      u.Equals(this._nextNode.Value, e) || (t && e.Follows(this._nextNode.Value), this._nextNode.Value = e), this._currentNode = this._nextNode, this._nextNode = this._currentNode.Next;
      return;
    }
    this._currentNode == null && (this._currentNode = this._nextNode), t && e.Follows(this._currentNode.Value), this._currentNode = this.AreaGeometry.AddBefore(this._nextNode, e), this._nextNode = this._currentNode.Next;
  }
  Clear() {
    this.AreaGeometry.ClearCommands();
  }
  End() {
    for (; this._currentNode?.Next != null; )
      this.AreaGeometry.RemoveCommand(this._currentNode.Next);
  }
  LogPath() {
    let e = "", t = this.AreaGeometry.FirstCommand;
    for (; t != null; )
      e += `${t.Value.Id}, `, t = t.Next;
  }
}
ze = new WeakMap();
var Ee;
class Yt {
  constructor(e, t) {
    n(this, "_isPrevious");
    T(this, Ee, void 0);
    this.Bounds = e, this._isPrevious = this.HasData;
  }
  get Bounds() {
    return M(this, Ee);
  }
  set Bounds(e) {
    v(this, Ee, e);
  }
  get HasData() {
    return this._isPrevious || this.Bounds.IsEmpty;
  }
}
Ee = new WeakMap();
var Et = /* @__PURE__ */ ((d) => (d[d.End = 0] = "End", d[d.Start = 1] = "Start", d[d.Middle = 2] = "Middle", d[d.Top = 3] = "Top", d[d.Bottom = 4] = "Bottom", d[d.Left = 5] = "Left", d[d.Right = 6] = "Right", d))(Et || {}), Ct = /* @__PURE__ */ ((d) => (d[d.ChartCenter = 0] = "ChartCenter", d[d.End = 1] = "End", d[d.Start = 2] = "Start", d[d.Middle = 3] = "Middle", d[d.Outer = 4] = "Outer", d))(Ct || {}), Pt = /* @__PURE__ */ ((d) => (d[d.Start = 0] = "Start", d[d.End = 1] = "End", d))(Pt || {});
class mn {
  constructor() {
    n(this, "Value", 0);
    n(this, "Magnitude", 0);
  }
}
var Xe, He, Ye, Oe, We, Ne, Ue;
const ue = class {
  constructor(e, t, i, s, a, r, h, o = !1) {
    n(this, "_deltaRadius");
    n(this, "_innerRadiusOffset");
    n(this, "_outerRadiusOffset");
    n(this, "_scalableRadius");
    n(this, "_initialRotation");
    n(this, "_deltaAngleVal");
    n(this, "_circumference");
    T(this, Xe, 0);
    T(this, He, 0);
    T(this, Ye, 0);
    T(this, Oe, 0);
    T(this, We, 0);
    T(this, Ne, 0);
    T(this, Ue, 0);
    let l, c, p, m;
    if (l = i.DataBounds, c = i.VisibleDataBounds, p = s.DataBounds, m = s.VisibleDataBounds, l == null || c == null)
      throw new u.Exception("angle bounds not found");
    if (p == null || m == null)
      throw new u.Exception("radius bounds not found");
    this.CenterX = e.X + t.Width * 0.5, this.CenterY = e.Y + t.Height * 0.5, this.MinRadius = s.MinLimit ?? m.Min, this.MaxRadius = s.MaxLimit ?? m.Max, this._deltaRadius = this.MaxRadius - this.MinRadius;
    let P = t.Width < t.Height ? t.Width : t.Height;
    this._innerRadiusOffset = a, this.InnerRadius = a, this._outerRadiusOffset = 0, this._scalableRadius = P * 0.5 - this._innerRadiusOffset - this._outerRadiusOffset, this.MinAngle = i.MinLimit ?? l.Min, this.MaxAngle = i.MaxLimit ?? l.Max, this._deltaAngleVal = this.MaxAngle - this.MinAngle, this._initialRotation = r, this._circumference = h;
  }
  get CenterX() {
    return M(this, Xe);
  }
  set CenterX(e) {
    v(this, Xe, e);
  }
  get CenterY() {
    return M(this, He);
  }
  set CenterY(e) {
    v(this, He, e);
  }
  get InnerRadius() {
    return M(this, Ye);
  }
  set InnerRadius(e) {
    v(this, Ye, e);
  }
  get MaxRadius() {
    return M(this, Oe);
  }
  set MaxRadius(e) {
    v(this, Oe, e);
  }
  get MinRadius() {
    return M(this, We);
  }
  set MinRadius(e) {
    v(this, We, e);
  }
  get MinAngle() {
    return M(this, Ne);
  }
  set MinAngle(e) {
    v(this, Ne, e);
  }
  get MaxAngle() {
    return M(this, Ue);
  }
  set MaxAngle(e) {
    v(this, Ue, e);
  }
  ToPixelsFromCharPoint(e) {
    return this.ToPixels(e.SecondaryValue, e.PrimaryValue);
  }
  ToPixels(e, t) {
    let i = (t - this.MinRadius) / this._deltaRadius, s = this._innerRadiusOffset + this._scalableRadius * i, a = this._circumference * e / this._deltaAngleVal;
    return a += this._initialRotation, a *= ue.ToRadians, new B(
      this.CenterX + Math.cos(a) * s,
      this.CenterY + Math.sin(a) * s
    );
  }
  ToChartValues(e, t) {
    let i = e - this.CenterX, s = t - this.CenterY, r = (Math.sqrt(Math.pow(i, 2) + Math.pow(s, 2)) - this._innerRadiusOffset) / this._scalableRadius, h = Math.atan(s / i) * (1 / ue.ToRadians);
    return i < 0 && s > 0 && (h = 180 + h), i < 0 && s <= 0 && (h = 180 + h), i > 0 && s <= 0 && (h = 360 + h), h -= this._initialRotation, h < 0 && (h = 360 - h), new le(
      this.MinAngle + this._deltaAngleVal * h / this._circumference,
      this.MinRadius + r * (this.MaxRadius - this.MinRadius)
    );
  }
  ToPixelsWithAngleInDegrees(e, t) {
    let i = (t - this.MinRadius) / this._deltaRadius, s = this._innerRadiusOffset + this._scalableRadius * i, a = e * ue.ToRadians;
    return new B(
      this.CenterX + Math.cos(a) * s,
      this.CenterY + Math.sin(a) * s
    );
  }
  GetAngle(e) {
    return this._initialRotation + this._circumference * e / this._deltaAngleVal;
  }
};
let Rt = ue;
Xe = new WeakMap(), He = new WeakMap(), Ye = new WeakMap(), Oe = new WeakMap(), We = new WeakMap(), Ne = new WeakMap(), Ue = new WeakMap(), n(Rt, "ToRadians", Math.PI / 180);
var Ze, qe, je, $e, Qe, Ke, Je;
class $ {
  constructor() {
    T(this, Ze, !0);
    T(this, qe, -34028235e31);
    T(this, je, 34028235e31);
    T(this, $e, 0);
    T(this, Qe, 0);
    T(this, Ke, 0);
    T(this, Je, 17976931348623157e292);
  }
  get IsEmpty() {
    return M(this, Ze);
  }
  set IsEmpty(e) {
    v(this, Ze, e);
  }
  get Max() {
    return M(this, qe);
  }
  set Max(e) {
    v(this, qe, e);
  }
  get Min() {
    return M(this, je);
  }
  set Min(e) {
    v(this, je, e);
  }
  get PaddingMax() {
    return M(this, $e);
  }
  set PaddingMax(e) {
    v(this, $e, e);
  }
  get PaddingMin() {
    return M(this, Qe);
  }
  set PaddingMin(e) {
    v(this, Qe, e);
  }
  get RequestedGeometrySize() {
    return M(this, Ke);
  }
  set RequestedGeometrySize(e) {
    v(this, Ke, e);
  }
  get Delta() {
    return this.Max - this.Min;
  }
  get MinDelta() {
    return M(this, Je);
  }
  set MinDelta(e) {
    v(this, Je, e);
  }
  AppendValue(e) {
    this.Max <= e && (this.Max = e), this.Min >= e && (this.Min = e), this.IsEmpty = !1;
  }
  AppendValueByBounds(e) {
    this.Max <= e.Max && (this.Max = e.Max), this.Min >= e.Min && (this.Min = e.Min), e.MinDelta < this.MinDelta && (this.MinDelta = e.MinDelta), this.RequestedGeometrySize < e.RequestedGeometrySize && (this.RequestedGeometrySize = e.RequestedGeometrySize), this.PaddingMin < e.PaddingMin && (this.PaddingMin = e.PaddingMin), this.PaddingMax < e.PaddingMax && (this.PaddingMax = e.PaddingMax), this.IsEmpty = !1;
  }
  HasSameLimitTo(e) {
    return this.Max == e.Max && this.Min == e.Min;
  }
}
Ze = new WeakMap(), qe = new WeakMap(), je = new WeakMap(), $e = new WeakMap(), Qe = new WeakMap(), Ke = new WeakMap(), Je = new WeakMap();
var ea = /* @__PURE__ */ ((d) => (d[d.Auto = 0] = "Auto", d[d.Horizontal = 1] = "Horizontal", d[d.Vertical = 2] = "Vertical", d))(ea || {}), ti;
class Ot {
  constructor(e = !1) {
    T(this, ti, !1);
    n(this, "PrimaryBounds");
    n(this, "SecondaryBounds");
    n(this, "TertiaryBounds");
    n(this, "VisiblePrimaryBounds");
    n(this, "VisibleSecondaryBounds");
    n(this, "VisibleTertiaryBounds");
    this.PrimaryBounds = new $(), this.SecondaryBounds = new $(), this.TertiaryBounds = new $(), this.VisiblePrimaryBounds = new $(), this.VisibleSecondaryBounds = new $(), this.VisibleTertiaryBounds = new $(), e && (this.VisiblePrimaryBounds.AppendValue(0), this.VisiblePrimaryBounds.AppendValue(10), this.PrimaryBounds.AppendValue(0), this.PrimaryBounds.AppendValue(10), this.VisibleSecondaryBounds.AppendValue(0), this.VisibleSecondaryBounds.AppendValue(10), this.SecondaryBounds.AppendValue(0), this.SecondaryBounds.AppendValue(10), this.VisibleTertiaryBounds.AppendValue(1), this.TertiaryBounds.AppendValue(1), this.IsEmpty = !0);
  }
  get IsEmpty() {
    return M(this, ti);
  }
  set IsEmpty(e) {
    v(this, ti, e);
  }
}
ti = new WeakMap();
var Xt = /* @__PURE__ */ ((d) => (d[d.Hidden = 0] = "Hidden", d[d.Top = 1] = "Top", d[d.Left = 2] = "Left", d[d.Right = 3] = "Right", d[d.Bottom = 4] = "Bottom", d))(Xt || {}), ot = /* @__PURE__ */ ((d) => (d[d.None = 0] = "None", d[d.X = 1] = "X", d[d.Y = 2] = "Y", d[d.Both = 3] = "Both", d))(ot || {}), wt = /* @__PURE__ */ ((d) => (d[d.ZoomIn = 0] = "ZoomIn", d[d.ZoomOut = 1] = "ZoomOut", d[d.DefinedByScaleFactor = 2] = "DefinedByScaleFactor", d))(wt || {}), oe = /* @__PURE__ */ ((d) => (d[d.Outer = 0] = "Outer", d[d.Center = 1] = "Center", d[d.Inner = 2] = "Inner", d))(oe || {});
function ia(d) {
  return typeof d == "object" && d !== null && !Array.isArray(d) && "$meta_LiveChartsCore_ISeries" in d.constructor;
}
var ei;
const de = class extends ee {
  constructor(t) {
    super();
    n(this, "subscribedTo", new u.HashSet());
    n(this, "implementsICP");
    n(this, "pivot", 0);
    n(this, "everFetched", new u.HashSet());
    n(this, "hoverPaint");
    n(this, "_requestedCustomMeasureHandler", !1);
    n(this, "_customMeasureHandler", null);
    n(this, "_observer");
    n(this, "_values");
    n(this, "_name");
    n(this, "_mapping");
    n(this, "_zIndex", 0);
    n(this, "_tooltipLabelFormatter", (t) => `${t.Context.Series.Name} ${t.PrimaryValue}`);
    n(this, "_dataLabelsFormatter", (t) => `${t.PrimaryValue}`);
    n(this, "_isVisible", !0);
    n(this, "_dataPadding", new B(0.5, 0.5).Clone());
    n(this, "_dataFactory");
    n(this, "_isVisibleAtLegend", !0);
    n(this, "_miniatureShapeSize", 12);
    n(this, "_miniatureSketch", new zt());
    n(this, "_easingFunction");
    n(this, "_animationsSpeed");
    n(this, "PaintsChanged", !1);
    T(this, ei, 0);
    n(this, "SeriesId", -1);
    n(this, "PointMeasured", new u.Event());
    n(this, "PointCreated", new u.Event());
    n(this, "DataPointerDown", new u.Event());
    n(this, "DataPointerHover", new u.Event());
    n(this, "DataPointerHoverLost", new u.Event());
    n(this, "ChartPointPointerHover", new u.Event());
    n(this, "ChartPointPointerHoverLost", new u.Event());
    n(this, "ChartPointPointerDown", new u.Event());
    n(this, "IsHoverable", !0);
    n(this, "VisibilityChanged", new u.Event());
    this.SeriesProperties = t, this._observer = new Dt(
      (i, s) => this.NotifySubscribers(),
      (i, s) => this.NotifySubscribers()
    );
  }
  get ActivePoints() {
    return this.everFetched;
  }
  get SeriesProperties() {
    return M(this, ei);
  }
  set SeriesProperties(t) {
    v(this, ei, t);
  }
  get Name() {
    return this._name;
  }
  set Name(t) {
    this.SetProperty(new u.Ref(() => this._name, (i) => this._name = i), t, "Name");
  }
  get Values() {
    return this._values;
  }
  set Values(t) {
    this._observer?.Dispose(this._values), this._observer?.Initialize(t), this._values = t, this.OnPropertyChanged("Values");
  }
  get Pivot() {
    return this.pivot;
  }
  set Pivot(t) {
    this.SetProperty(new u.Ref(() => this.pivot, (i) => this.pivot = i), t, "Pivot");
  }
  get Mapping() {
    return this._mapping;
  }
  set Mapping(t) {
    this.SetProperty(new u.Ref(() => this._mapping, (i) => this._mapping = i), t, "Mapping");
  }
  get RequiresFindClosestOnPointerDown() {
    return this.DataPointerDown != null || this.ChartPointPointerDown != null;
  }
  get ZIndex() {
    return this._zIndex;
  }
  set ZIndex(t) {
    this.SetProperty(new u.Ref(() => this._zIndex, (i) => this._zIndex = i), t, "ZIndex");
  }
  get TooltipLabelFormatter() {
    return this._tooltipLabelFormatter;
  }
  set TooltipLabelFormatter(t) {
    this.SetProperty(new u.Ref(() => this._tooltipLabelFormatter, (i) => this._tooltipLabelFormatter = i), t, "TooltipLabelFormatter");
  }
  get DataLabelsFormatter() {
    return this._dataLabelsFormatter;
  }
  set DataLabelsFormatter(t) {
    this.SetProperty(new u.Ref(() => this._dataLabelsFormatter, (i) => this._dataLabelsFormatter = i), t, "DataLabelsFormatter");
  }
  get IsVisible() {
    return this._isVisible;
  }
  set IsVisible(t) {
    this.SetProperty(new u.Ref(() => this._isVisible, (i) => this._isVisible = i), t, "IsVisible");
  }
  get IsVisibleAtLegend() {
    return this._isVisibleAtLegend;
  }
  set IsVisibleAtLegend(t) {
    this.SetProperty(new u.Ref(() => this._isVisibleAtLegend, (i) => this._isVisibleAtLegend = i), t, "IsVisibleAtLegend");
  }
  get DataPadding() {
    return this._dataPadding;
  }
  set DataPadding(t) {
    this.SetProperty(new u.Ref(() => this._dataPadding, (i) => this._dataPadding = i), t.Clone(), "DataPadding");
  }
  get AnimationsSpeed() {
    return this._animationsSpeed;
  }
  set AnimationsSpeed(t) {
    this.SetProperty(new u.Ref(() => this._animationsSpeed, (i) => this._animationsSpeed = i), t, "AnimationsSpeed");
  }
  get EasingFunction() {
    return this._easingFunction;
  }
  set EasingFunction(t) {
    this.SetProperty(new u.Ref(() => this._easingFunction, (i) => this._easingFunction = i), t, "EasingFunction");
  }
  get DataFactory() {
    if (this._dataFactory == null) {
      let t = j.DefaultSettings.GetProvider();
      this._dataFactory = t.GetDefaultDataFactory();
    }
    return this._dataFactory;
  }
  get LegendShapeSize() {
    return this.MiniatureShapeSize;
  }
  set LegendShapeSize(t) {
    this.MiniatureShapeSize = t;
  }
  get MiniatureShapeSize() {
    return this._miniatureShapeSize;
  }
  set MiniatureShapeSize(t) {
    this._miniatureShapeSize = t, this.OnMiniatureChanged(), this.SetProperty(new u.Ref(() => this._miniatureShapeSize, (i) => this._miniatureShapeSize = i), t, "MiniatureShapeSize");
  }
  get CanvasSchedule() {
    return this._miniatureSketch;
  }
  set CanvasSchedule(t) {
    this.SetProperty(new u.Ref(() => this._miniatureSketch, (i) => this._miniatureSketch = i), t, "CanvasSchedule");
  }
  GetStackGroup() {
    return 0;
  }
  Fetch(t) {
    return this.subscribedTo.Add(t), this.DataFactory.Fetch(this, t);
  }
  OnDataPointerDown(t, i, s) {
    this.DataPointerDown.Invoke(t, i.Select((a) => new ct(a))), this.ChartPointPointerDown.Invoke(t, new ct(L.FindClosestTo(i, s.Clone())));
  }
  FindHitPoints(t, i, s) {
    let a = t.Canvas;
    a.StartPoint != null && (i.X -= a.StartPoint.X, i.Y -= a.StartPoint.Y);
    let r = this.Fetch(t).Where((o) => o.Context.HoverArea != null && o.Context.HoverArea.IsPointerOver(i.Clone(), s)), h = Math.floor(s) & 4294967295;
    return h >= 4 && h <= 6 && (r = L.SelectFirst(
      r.Select((o) => ({ distance: o.DistanceTo(i.Clone()), point: o })).OrderBy((o) => o.distance, u.NumberComparer),
      (o) => o.point
    )), r;
  }
  OnPointerEnter(t) {
    this.WhenPointerEnters(t);
  }
  OnPointerLeft(t) {
    this.WhenPointerLeaves(t);
  }
  RestartAnimations() {
    if (this.DataFactory == null)
      throw new u.Exception("Data provider not found");
    this.DataFactory.RestartVisuals();
  }
  GetTooltipText(t) {
    return this.TooltipLabelFormatter(new ct(t));
  }
  GetDataLabelText(t) {
    return this.DataLabelsFormatter(new ct(t));
  }
  RemoveFromUI(t) {
    super.RemoveFromUI(t), this.DataFactory?.Dispose(t), this._dataFactory = null, this.everFetched = new u.HashSet();
  }
  ConvertToTypedChartPoint(t) {
    return new ct(t);
  }
  BuildMiniatureSchedule(t, i) {
    let s = t.CloneTask(), a = t.IsStroke ? t.StrokeThickness : 0;
    return a > de.MAX_MINIATURE_STROKE_WIDTH && (a = de.MAX_MINIATURE_STROKE_WIDTH, s.StrokeThickness = de.MAX_MINIATURE_STROKE_WIDTH), i.X = 0.5 * a, i.Y = 0.5 * a, i.Height = this.MiniatureShapeSize, i.Width = this.MiniatureShapeSize, t.IsStroke && (s.ZIndex = 1), new Tn(s, i);
  }
  OnPointMeasured(t) {
    this.PointMeasured.Invoke(new ct(t));
  }
  OnPointCreated(t) {
    this.SetDefaultPointTransitions(t), this.PointCreated.Invoke(new ct(t));
  }
  OnVisibilityChanged() {
    this.VisibilityChanged.Invoke(this);
  }
  WhenPointerEnters(t) {
    let i = t.Context.Chart;
    if (this.hoverPaint == null) {
      let a = i.CoreChart;
      this.hoverPaint = j.DefaultSettings.GetProvider().GetSolidColorPaint(new ht(255, 255, 255, 100)), this.hoverPaint.ZIndex = 10049, this.hoverPaint.SetClipRectangle(i.CoreCanvas, new W(a.DrawMarginLocation.Clone(), a.DrawMarginSize.Clone()));
    }
    i.CoreCanvas.AddDrawableTask(this.hoverPaint);
    let s = t.Context.Visual;
    s == null || s.MainGeometry == null || (this.hoverPaint.AddGeometryToPaintTask(i.CoreCanvas, s.MainGeometry), this.DataPointerHover.Invoke(t.Context.Chart, new ct(t)), this.ChartPointPointerHover.Invoke(t.Context.Chart, new ct(t)));
  }
  WhenPointerLeaves(t) {
    if (this.hoverPaint == null)
      return;
    let i = t.Context.Visual;
    i == null || i.MainGeometry == null || (this.hoverPaint.RemoveGeometryFromPainTask(
      t.Context.Chart.CoreChart.Canvas,
      i.MainGeometry
    ), this.DataPointerHoverLost.Invoke(t.Context.Chart, new ct(t)), this.ChartPointPointerHoverLost.Invoke(t.Context.Chart, new ct(t)));
  }
  OnPaintChanged(t) {
    super.OnPaintChanged(t), this.OnMiniatureChanged(), this.PaintsChanged = !0;
  }
  OnMiniatureChanged() {
    this.CanvasSchedule = this.GetMiniatresSketch();
  }
  NotifySubscribers() {
    for (const t of this.subscribedTo)
      t.Update();
  }
};
let Gt = de;
ei = new WeakMap(), n(Gt, "$meta_LiveChartsCore_ISeries", !0), n(Gt, "$meta_System_INotifyPropertyChanged", !0), n(Gt, "MAX_MINIATURE_STROKE_WIDTH", 3.5);
var ii;
class Ks extends Gt {
  constructor(t) {
    super(t);
    n(this, "_dataLabelsPaint");
    n(this, "_dataLabelsSize", 16);
    n(this, "_dataLabelsRotation", 0);
    n(this, "_dataLabelsPadding", new kt(6, 8, 6, 8));
    T(this, ii, !0);
  }
  get DataLabelsPaint() {
    return this._dataLabelsPaint;
  }
  set DataLabelsPaint(t) {
    this.SetPaintProperty(new u.Ref(() => this._dataLabelsPaint, (i) => this._dataLabelsPaint = i), t, void 0, "DataLabelsPaint");
  }
  get DataLabelsSize() {
    return this._dataLabelsSize;
  }
  set DataLabelsSize(t) {
    this.SetProperty(new u.Ref(() => this._dataLabelsSize, (i) => this._dataLabelsSize = i), t, "DataLabelsSize");
  }
  get DataLabelsRotation() {
    return this._dataLabelsRotation;
  }
  set DataLabelsRotation(t) {
    this.SetProperty(new u.Ref(() => this._dataLabelsRotation, (i) => this._dataLabelsRotation = i), t, "DataLabelsRotation");
  }
  get DataLabelsPadding() {
    return this._dataLabelsPadding;
  }
  set DataLabelsPadding(t) {
    this.SetProperty(new u.Ref(() => this._dataLabelsPadding, (i) => this._dataLabelsPadding = i), t, "DataLabelsPadding");
  }
  get IsFirstDraw() {
    return M(this, ii);
  }
  set IsFirstDraw(t) {
    v(this, ii, t);
  }
  OnDataPointerDown(t, i, s) {
    this.OnDataPointerDown(t, i, s.Clone());
  }
}
ii = new WeakMap();
class Js extends Ks {
  constructor(t) {
    super(t);
    n(this, "_scalesXAt", 0);
    n(this, "_scalesYAt", 0);
    n(this, "_labelsPosition", 0);
    n(this, "_labelsTranslate", null);
  }
  get ScalesXAt() {
    return this._scalesXAt;
  }
  set ScalesXAt(t) {
    this.SetProperty(new u.Ref(() => this._scalesXAt, (i) => this._scalesXAt = i), t, "ScalesXAt");
  }
  get ScalesYAt() {
    return this._scalesYAt;
  }
  set ScalesYAt(t) {
    this.SetProperty(new u.Ref(() => this._scalesYAt, (i) => this._scalesYAt = i), t, "ScalesYAt");
  }
  get DataLabelsPosition() {
    return this._labelsPosition;
  }
  set DataLabelsPosition(t) {
    this.SetProperty(new u.Ref(() => this._labelsPosition, (i) => this._labelsPosition = i), t, "DataLabelsPosition");
  }
  get DataLabelsTranslate() {
    return this._labelsTranslate;
  }
  set DataLabelsTranslate(t) {
    this.SetProperty(new u.Ref(() => this._labelsTranslate, (i) => this._labelsTranslate = i), t?.Clone(), "DataLabelsTranslate");
  }
  GetBounds(t, i, s) {
    let a = this.DataFactory.GetCartesianBounds(t, this, i, s);
    if (a.HasData)
      return a;
    let r = a.Bounds, h = L.GetTick(s, t.ControlSize.Clone(), r.VisiblePrimaryBounds), l = L.GetTick(i, t.ControlSize.Clone(), r.VisibleSecondaryBounds).Value * this.DataPadding.X, c = h.Value * this.DataPadding.Y;
    r.VisibleSecondaryBounds.Delta == 0 && (l = i.UnitWidth * this.DataPadding.X), r.VisiblePrimaryBounds.Delta == 0 && (c = r.VisiblePrimaryBounds.Max * 0.25);
    let p = this.GetRequestedGeometrySize(), m = this.GetRequestedSecondaryOffset(), P = this.GetRequestedPrimaryOffset(), C = new Ot().Init(
      {
        SecondaryBounds: new $().Init(
          {
            Max: r.SecondaryBounds.Max + m * i.UnitWidth,
            Min: r.SecondaryBounds.Min - m * i.UnitWidth,
            MinDelta: r.SecondaryBounds.MinDelta,
            PaddingMax: l,
            PaddingMin: l,
            RequestedGeometrySize: p
          }
        ),
        PrimaryBounds: new $().Init(
          {
            Max: r.PrimaryBounds.Max + P * i.UnitWidth,
            Min: r.PrimaryBounds.Min - P * i.UnitWidth,
            MinDelta: r.PrimaryBounds.MinDelta,
            PaddingMax: c,
            PaddingMin: c,
            RequestedGeometrySize: p
          }
        ),
        VisibleSecondaryBounds: new $().Init(
          {
            Max: r.VisibleSecondaryBounds.Max + m * i.UnitWidth,
            Min: r.VisibleSecondaryBounds.Min - m * i.UnitWidth
          }
        ),
        VisiblePrimaryBounds: new $().Init(
          {
            Max: r.VisiblePrimaryBounds.Max + P * i.UnitWidth,
            Min: r.VisiblePrimaryBounds.Min - P * i.UnitWidth
          }
        ),
        TertiaryBounds: r.TertiaryBounds,
        VisibleTertiaryBounds: r.VisibleTertiaryBounds
      }
    );
    if (this.GetIsInvertedBounds()) {
      let G = C.SecondaryBounds, S = C.PrimaryBounds, f = C.VisibleSecondaryBounds, y = C.VisiblePrimaryBounds;
      C.SecondaryBounds = S, C.PrimaryBounds = G, C.VisibleSecondaryBounds = y, C.VisiblePrimaryBounds = f;
    }
    return new Yt(C, !1);
  }
  GetRequestedGeometrySize() {
    return 0;
  }
  GetRequestedSecondaryOffset() {
    return 0;
  }
  GetRequestedPrimaryOffset() {
    return 0;
  }
  GetIsInvertedBounds() {
    return !1;
  }
  SoftDeleteOrDispose(t) {
    let i = t.Core, s = i.XAxes.length > this.ScalesXAt ? i.XAxes[this.ScalesXAt] : null, a = i.YAxes.length > this.ScalesYAt ? i.YAxes[this.ScalesYAt] : null, r = s == null ? dt.MakeDefault() : dt.Make(i.DrawMarginLocation.Clone(), i.DrawMarginSize.Clone(), s), h = a == null ? dt.MakeDefault() : dt.Make(i.DrawMarginLocation.Clone(), i.DrawMarginSize.Clone(), a), o = new u.List();
    for (const l of this.everFetched)
      l.Context.Chart == t && (this.SoftDeleteOrDisposePoint(l, h, r), o.Add(l));
    for (const l of this.GetPaintTasks())
      l != null && i.Canvas.RemovePaintTask(l);
    for (const l of o)
      this.everFetched.Remove(l);
    this.OnVisibilityChanged();
  }
  GetLabelPosition(t, i, s, a, r, h, o, l, c, p) {
    let m = (t + t + s) * 0.5, P = (i + i + a) * 0.5;
    return match(h).with(
      Et.Middle,
      () => new B(m, P)
    ).with(
      Et.Top,
      () => new B(m, i - r.Height * 0.5)
    ).with(
      Et.Bottom,
      () => new B(m, i + a + r.Height * 0.5)
    ).with(
      Et.Left,
      () => new B(t - r.Width * 0.5, P)
    ).with(
      Et.Right,
      () => new B(t + s + r.Width * 0.5, P)
    ).with(Et.End, () => (o & D.PrimaryAxisHorizontalOrientation) == D.PrimaryAxisHorizontalOrientation ? l ? new B(t + s + r.Width * 0.5, P) : new B(t - r.Width * 0.5, P) : l ? new B(m, i - r.Height * 0.5) : new B(m, i + a + r.Height * 0.5)).with(Et.Start, () => (o & D.PrimaryAxisHorizontalOrientation) == D.PrimaryAxisHorizontalOrientation ? l ? new B(t - r.Width * 0.5, P) : new B(t + s + r.Width * 0.5, P) : l ? new B(m, i + a + r.Height * 0.5) : new B(m, i - r.Height * 0.5)).otherwise(() => {
      throw new u.Exception("Position not supported");
    });
  }
}
class Qt extends Js {
  constructor(t) {
    super(t);
    n(this, "_stroke", null);
    n(this, "_fill", null);
  }
  get Stroke() {
    return this._stroke;
  }
  set Stroke(t) {
    this.SetPaintProperty(new u.Ref(() => this._stroke, (i) => this._stroke = i), t, !0, "Stroke");
  }
  get Fill() {
    return this._fill;
  }
  set Fill(t) {
    this.SetPaintProperty(new u.Ref(() => this._fill, (i) => this._fill = i), t, void 0, "Fill");
  }
  GetPaintTasks() {
    return [this._stroke, this._fill, this.hoverPaint, this.DataLabelsPaint];
  }
  MiniatureEquals(t) {
    if (t instanceof Qt) {
      const i = t;
      return this.Name == t.Name && !this.PaintsChanged && this.Fill == i.Fill && this.Stroke == i.Stroke;
    }
    return !1;
  }
}
class In extends Js {
  constructor(t, i, s) {
    super(D.Financial | D.PrimaryAxisVerticalOrientation | D.Solid | D.PrefersXStrategyTooltips);
    n(this, "_upStroke", null);
    n(this, "_upFill", null);
    n(this, "_downStroke", null);
    n(this, "_downFill", null);
    n(this, "_maxBarWidth", 25);
    n(this, "_visualFactory");
    n(this, "_labelFactory");
    n(this, "_miniatureGeometryFactory");
    this._visualFactory = t, this._labelFactory = i, this._miniatureGeometryFactory = s, this.TooltipLabelFormatter = (a) => `${this.Name}, H: ${a.PrimaryValue}, O: ${a.TertiaryValue}, C: ${a.QuaternaryValue}, L: ${a.QuinaryValue}`;
  }
  get MaxBarWidth() {
    return this._maxBarWidth;
  }
  set MaxBarWidth(t) {
    this.SetProperty(new u.Ref(() => this._maxBarWidth, (i) => this._maxBarWidth = i), t, "MaxBarWidth");
  }
  get UpStroke() {
    return this._upStroke;
  }
  set UpStroke(t) {
    this.SetPaintProperty(new u.Ref(() => this._upStroke, (i) => this._upStroke = i), t, !0, "UpStroke");
  }
  get UpFill() {
    return this._upFill;
  }
  set UpFill(t) {
    this.SetPaintProperty(new u.Ref(() => this._upFill, (i) => this._upFill = i), t, void 0, "UpFill");
  }
  get DownStroke() {
    return this._downStroke;
  }
  set DownStroke(t) {
    this.SetPaintProperty(new u.Ref(() => this._downStroke, (i) => this._downStroke = i), t, !0, "DownStroke");
  }
  get DownFill() {
    return this._downFill;
  }
  set DownFill(t) {
    this.SetPaintProperty(new u.Ref(() => this._downFill, (i) => this._downFill = i), t, void 0, "DownFill");
  }
  Invalidate(t) {
    let i = t, s = i.YAxes[this.ScalesYAt], a = i.XAxes[this.ScalesXAt], r = i.DrawMarginLocation.Clone(), h = i.DrawMarginSize.Clone(), o = L.GetNextScaler(a, i), l = L.GetNextScaler(s, i), c = L.GetActualScaler(s, i), p = L.GetActualScaler(a, i), m = o.MeasureInPixels(a.UnitWidth), P = p == null ? 0 : p.MeasureInPixels(a.UnitWidth), C = 0.5 * m;
    m > this.MaxBarWidth && (m = this.MaxBarWidth, C = m * 0.5, P = m);
    let G = this.ZIndex == 0 ? this.SeriesId : this.ZIndex;
    this.UpFill != null && (this.UpFill.ZIndex = G + 0.1, this.UpFill.SetClipRectangle(i.Canvas, new W(r.Clone(), h.Clone())), i.Canvas.AddDrawableTask(this.UpFill)), this.DownFill != null && (this.DownFill.ZIndex = G + 0.1, this.DownFill.SetClipRectangle(i.Canvas, new W(r.Clone(), h.Clone())), i.Canvas.AddDrawableTask(this.DownFill)), this.UpStroke != null && (this.UpStroke.ZIndex = G + 0.2, this.UpStroke.SetClipRectangle(i.Canvas, new W(r.Clone(), h.Clone())), i.Canvas.AddDrawableTask(this.UpStroke)), this.DownStroke != null && (this.DownStroke.ZIndex = G + 0.2, this.DownStroke.SetClipRectangle(i.Canvas, new W(r.Clone(), h.Clone())), i.Canvas.AddDrawableTask(this.DownStroke)), this.DataLabelsPaint != null && (this.DataLabelsPaint.ZIndex = G + 0.3, i.Canvas.AddDrawableTask(this.DataLabelsPaint));
    let S = this.DataLabelsSize, f = vt.For(this.everFetched);
    for (const y of this.Fetch(i)) {
      let g = y.Context.Visual, _ = o.ToPixels(y.SecondaryValue), b = l.ToPixels(y.PrimaryValue), z = l.ToPixels(y.TertiaryValue), w = l.ToPixels(y.QuaternaryValue), V = l.ToPixels(y.QuinaryValue), I = z;
      if (y.IsEmpty) {
        g != null && (g.X = _ - C, g.Width = m, g.Y = I, g.Open = I, g.Close = I, g.Low = I, g.RemoveOnCompleted = !0, y.Context.Visual = null);
        continue;
      }
      if (g == null) {
        let A = _ - C, H = m;
        if (p != null && c != null) {
          let E = c.ToPixels(this.pivot), F = c.ToPixels(y.PrimaryValue), O = Math.abs(F - E);
          y.PrimaryValue > this.pivot || F - O, A = p.ToPixels(y.SecondaryValue) - C, H = P, i.IsZoomingOrPanning;
        }
        let x = this._visualFactory();
        x.X = A, x.Width = H, x.Y = I, x.Open = I, x.Close = I, x.Low = I, g = x, y.Context.Visual = g, this.OnPointCreated(y), this.everFetched.Add(y);
      }
      z > w ? (this.UpFill?.AddGeometryToPaintTask(i.Canvas, g), this.UpStroke?.AddGeometryToPaintTask(i.Canvas, g), this.DownFill?.RemoveGeometryFromPainTask(i.Canvas, g), this.DownStroke?.RemoveGeometryFromPainTask(i.Canvas, g)) : (this.DownFill?.AddGeometryToPaintTask(i.Canvas, g), this.DownStroke?.AddGeometryToPaintTask(i.Canvas, g), this.UpFill?.RemoveGeometryFromPainTask(i.Canvas, g), this.UpStroke?.RemoveGeometryFromPainTask(i.Canvas, g));
      let R = _ - C;
      g.X = R, g.Width = m, g.Y = b, g.Open = z, g.Close = w, g.Low = V, g.RemoveOnCompleted = !1;
      let X;
      if (y.Context.HoverArea instanceof gt ? X = y.Context.HoverArea : y.Context.HoverArea = X = new gt(), X.SetDimensions(_ - C, b, m, Math.abs(V - b)), f.Clean(y), this.DataLabelsPaint != null) {
        let A = y.Context.Label;
        if (A == null) {
          let E = this._labelFactory();
          E.X = _ - C, E.Y = b, E.RotateTransform = this.DataLabelsRotation, L.TransitionateProperties(E, "X", "Y").WithAnimationBuilder((F) => F.WithDuration(this.AnimationsSpeed ?? i.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? i.EasingFunction)), E.CompleteTransition(), A = E, y.Context.Label = E;
        }
        this.DataLabelsPaint.AddGeometryToPaintTask(i.Canvas, A), A.Text = this.DataLabelsFormatter(new ct(y)), A.TextSize = S, A.Padding = this.DataLabelsPadding;
        let H = A.Measure(this.DataLabelsPaint), x = this.GetLabelPosition(
          R,
          b,
          m,
          Math.abs(V - b),
          H.Clone(),
          this.DataLabelsPosition,
          this.SeriesProperties,
          y.PrimaryValue > this.Pivot,
          r.Clone(),
          h.Clone()
        );
        this.DataLabelsTranslate != null && (A.TranslateTransform = new B(H.Width * this.DataLabelsTranslate.X, H.Height * this.DataLabelsTranslate.Y)), A.X = x.X, A.Y = x.Y;
      }
      this.OnPointMeasured(y);
    }
    f.CollectPoints(
      this.everFetched,
      i.View,
      l,
      o,
      this.SoftDeleteOrDisposePoint.bind(this)
    );
  }
  GetBounds(t, i, s) {
    let a = this.DataFactory.GetFinancialBounds(t, this, i, s);
    if (a.HasData)
      return a;
    let r = a.Bounds, h = L.GetTick(s, t.ControlSize.Clone(), r.VisiblePrimaryBounds), l = L.GetTick(i, t.ControlSize.Clone(), r.VisibleSecondaryBounds).Value * this.DataPadding.X, c = h.Value * this.DataPadding.Y;
    r.VisibleSecondaryBounds.Delta == 0 && (l = i.UnitWidth * this.DataPadding.X), r.VisiblePrimaryBounds.Delta == 0 && (c = r.VisiblePrimaryBounds.Max * 0.25);
    let p = this.GetRequestedGeometrySize(), m = this.GetRequestedSecondaryOffset(), P = this.GetRequestedPrimaryOffset(), C = new Ot().Init(
      {
        SecondaryBounds: new $().Init(
          {
            Max: r.SecondaryBounds.Max + m * i.UnitWidth,
            Min: r.SecondaryBounds.Min - m * i.UnitWidth,
            MinDelta: r.SecondaryBounds.MinDelta,
            PaddingMax: l,
            PaddingMin: l,
            RequestedGeometrySize: p
          }
        ),
        PrimaryBounds: new $().Init(
          {
            Max: r.PrimaryBounds.Max + P * i.UnitWidth,
            Min: r.PrimaryBounds.Min - P * i.UnitWidth,
            MinDelta: r.PrimaryBounds.MinDelta,
            PaddingMax: c,
            PaddingMin: c,
            RequestedGeometrySize: p
          }
        ),
        VisibleSecondaryBounds: new $().Init(
          {
            Max: r.VisibleSecondaryBounds.Max + m * i.UnitWidth,
            Min: r.VisibleSecondaryBounds.Min - m * i.UnitWidth
          }
        ),
        VisiblePrimaryBounds: new $().Init(
          {
            Max: r.VisiblePrimaryBounds.Max + P * i.UnitWidth,
            Min: r.VisiblePrimaryBounds.Min - P * i.UnitWidth
          }
        ),
        TertiaryBounds: r.TertiaryBounds,
        VisibleTertiaryBounds: r.VisibleTertiaryBounds
      }
    );
    if (this.GetIsInvertedBounds()) {
      let G = C.SecondaryBounds, S = C.PrimaryBounds, f = C.VisibleSecondaryBounds, y = C.VisiblePrimaryBounds;
      C.SecondaryBounds = S, C.PrimaryBounds = G, C.VisibleSecondaryBounds = y, C.VisiblePrimaryBounds = f;
    }
    return new Yt(C, !1);
  }
  GetRequestedSecondaryOffset() {
    return 0.5;
  }
  SetDefaultPointTransitions(t) {
    let i = t.Context.Chart, s = t.Context.Visual;
    L.TransitionateProperties(
      s,
      "X",
      "Width",
      "Y",
      "Open",
      "Close",
      "Low"
    ).WithAnimationBuilder((a) => a.WithDuration(this.AnimationsSpeed ?? i.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? i.EasingFunction)).CompleteCurrentTransitions();
  }
  SoftDeleteOrDisposePoint(t, i, s) {
    let a = t.Context.Visual;
    if (a == null)
      return;
    if (this.DataFactory == null)
      throw new u.Exception("Data provider not found");
    if (t.Context.Chart.Core.IsZoomingOrPanning) {
      a.CompleteTransition(), a.RemoveOnCompleted = !0, this.DataFactory.DisposePoint(t);
      return;
    }
    let h = i.ToPixels(this.pivot), o = s.ToPixels(t.SecondaryValue);
    a.X = o, a.Y = h, a.Open = h, a.Close = h, a.Low = h, a.RemoveOnCompleted = !0, this.DataFactory.DisposePoint(t);
    let l = t.Context.Label;
    l != null && (l.TextSize = 1, l.RemoveOnCompleted = !0);
  }
  GetPaintTasks() {
    return [this._upFill, this._upStroke, this._downFill, this._downStroke, this.DataLabelsPaint, this.hoverPaint];
  }
  OnPaintChanged(t) {
    super.OnPaintChanged(t), this.OnPropertyChanged("OnPaintChanged");
  }
  MiniatureEquals(t) {
    if (t instanceof In) {
      const i = t;
      return this.Name == t.Name && this.UpFill == i.UpFill && this.UpStroke == i.UpStroke && this.DownFill == i.DownFill && this.DownStroke == i.DownStroke;
    }
    return !1;
  }
  GetMiniatresSketch() {
    let t = new u.List();
    return this.UpStroke != null && t.Add(this.BuildMiniatureSchedule(this.UpStroke, this._miniatureGeometryFactory())), new zt().Init(
      {
        Height: this.MiniatureShapeSize,
        Width: this.MiniatureShapeSize,
        PaintSchedules: t
      }
    );
  }
}
const an = class extends Qt {
  constructor(t, i, s, a, r = !1) {
    super(D.Line | D.PrimaryAxisVerticalOrientation | (r ? D.Stacked : 0) | D.Sketch | D.PrefersXStrategyTooltips);
    n(this, "_fillPathHelperDictionary", new u.Dictionary());
    n(this, "_strokePathHelperDictionary", new u.Dictionary());
    n(this, "_lineSmoothness", 0.65);
    n(this, "_geometrySize", 14);
    n(this, "_enableNullSplitting", !0);
    n(this, "_geometryFill");
    n(this, "_geometryStroke");
    n(this, "_visualPointFactory");
    n(this, "_pathGeometryFactory");
    n(this, "_visualFactory");
    n(this, "_labelFactory");
    this._visualPointFactory = a, this._pathGeometryFactory = s, this._visualFactory = t, this._labelFactory = i, this.DataPadding = new B(0.5, 1);
  }
  get GeometrySize() {
    return this._geometrySize;
  }
  set GeometrySize(t) {
    this.SetProperty(new u.Ref(() => this._geometrySize, (i) => this._geometrySize = i), t, "GeometrySize");
  }
  get LineSmoothness() {
    return this._lineSmoothness;
  }
  set LineSmoothness(t) {
    let i = t;
    t > 1 && (i = 1), t < 0 && (i = 0), this.SetProperty(new u.Ref(() => this._lineSmoothness, (s) => this._lineSmoothness = s), i, "LineSmoothness");
  }
  get EnableNullSplitting() {
    return this._enableNullSplitting;
  }
  set EnableNullSplitting(t) {
    this.SetProperty(new u.Ref(() => this._enableNullSplitting, (i) => this._enableNullSplitting = i), t, "EnableNullSplitting");
  }
  get GeometryFill() {
    return this._geometryFill;
  }
  set GeometryFill(t) {
    this.SetPaintProperty(new u.Ref(() => this._geometryFill, (i) => this._geometryFill = i), t, void 0, "GeometryFill");
  }
  get GeometryStroke() {
    return this._geometryStroke;
  }
  set GeometryStroke(t) {
    this.SetPaintProperty(new u.Ref(() => this._geometryStroke, (i) => this._geometryStroke = i), t, !0, "GeometryStroke");
  }
  Invalidate(t) {
    let i, s, a = t, r = a.YAxes[this.ScalesYAt], h = a.XAxes[this.ScalesXAt], o = a.DrawMarginLocation.Clone(), l = a.DrawMarginSize.Clone(), c = L.GetNextScaler(h, a), p = L.GetNextScaler(r, a);
    L.GetActualScaler(h, a), L.GetActualScaler(r, a);
    let m = this._geometrySize, P = m / 2;
    this.Stroke?.StrokeThickness;
    let C = p.ToPixels(this.pivot), G = this._enableNullSplitting ? L.SplitByNullGaps(this.Fetch(a), (w) => this.DeleteNullPoint(w, c, p)) : new u.List().Init([this.Fetch(a)]), S = (this.SeriesProperties & D.Stacked) == D.Stacked ? a.SeriesContext.GetStackPosition(this, this.GetStackGroup()) : null, f = this.ZIndex == 0 ? this.SeriesId : this.ZIndex;
    S != null && (f = 1e3 - S.Position, this.Fill != null && (this.Fill.ZIndex = f), this.Stroke != null && (this.Stroke.ZIndex = f));
    let y = this.DataLabelsSize, g = vt.For(this.everFetched);
    this._strokePathHelperDictionary.TryGetValue(t.Canvas.Sync, new u.Out(() => i, (w) => i = w)) || (i = new u.List(), this._strokePathHelperDictionary.SetAt(t.Canvas.Sync, i)), this._fillPathHelperDictionary.TryGetValue(t.Canvas.Sync, new u.Out(() => s, (w) => s = w)) || (s = new u.List(), this._fillPathHelperDictionary.SetAt(t.Canvas.Sync, s));
    let _ = c.MeasureInPixels(h.UnitWidth);
    _ = _ < m ? m : _;
    let b = 0;
    for (const w of G) {
      let V, I, R = !1;
      b >= s.length ? (R = !0, V = this._pathGeometryFactory(), V.ClosingMethod = $t.CloseToPivot, s.Add(V)) : V = s[b], b >= i.length ? (R = !0, I = this._pathGeometryFactory(), I.ClosingMethod = $t.NotClosed, i.Add(I)) : I = i[b];
      let X = new Is(I), A = new Is(V);
      this.Fill != null && (this.Fill.AddGeometryToPaintTask(a.Canvas, V), a.Canvas.AddDrawableTask(this.Fill), this.Fill.ZIndex = f + 0.1, this.Fill.SetClipRectangle(a.Canvas, new W(o.Clone(), l.Clone())), V.Pivot = C, R && L.TransitionateProperties(V, "Pivot").WithAnimationBuilder((x) => x.WithDuration(this.AnimationsSpeed ?? a.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? a.EasingFunction)).CompleteCurrentTransitions()), this.Stroke != null && (this.Stroke.AddGeometryToPaintTask(a.Canvas, I), a.Canvas.AddDrawableTask(this.Stroke), this.Stroke.ZIndex = f + 0.2, this.Stroke.SetClipRectangle(a.Canvas, new W(o.Clone(), l.Clone())), I.Pivot = C, R && L.TransitionateProperties(I, "Pivot").WithAnimationBuilder((x) => x.WithDuration(this.AnimationsSpeed ?? a.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? a.EasingFunction)).CompleteCurrentTransitions());
      let H = !0;
      for (const x of this.GetSpline(w, S)) {
        H = !1;
        let E = 0;
        S != null && (E = x.TargetPoint.PrimaryValue > 0 ? S.GetStack(x.TargetPoint).Start : S.GetStack(x.TargetPoint).NegativeStart);
        let F = x.TargetPoint.Context.Visual;
        if (F == null) {
          let Y = this._visualPointFactory();
          F = Y, this.IsFirstDraw && (Y.Geometry.X = c.ToPixels(x.TargetPoint.SecondaryValue), Y.Geometry.Y = C, Y.Geometry.Width = 0, Y.Geometry.Height = 0, Y.Bezier.Xi = c.ToPixels(x.X0), Y.Bezier.Xm = c.ToPixels(x.X1), Y.Bezier.Xj = c.ToPixels(x.X2), Y.Bezier.Yi = C, Y.Bezier.Ym = C, Y.Bezier.Yj = C), x.TargetPoint.Context.Visual = Y, this.OnPointCreated(x.TargetPoint);
        }
        this.everFetched.Add(x.TargetPoint), this.GeometryFill?.AddGeometryToPaintTask(a.Canvas, F.Geometry), this.GeometryStroke?.AddGeometryToPaintTask(a.Canvas, F.Geometry), F.Bezier.Id = x.TargetPoint.Context.Entity.EntityIndex, this.Fill != null && A.AddConsecutiveSegment(F.Bezier, !this.IsFirstDraw), this.Stroke != null && X.AddConsecutiveSegment(F.Bezier, !this.IsFirstDraw), F.Bezier.Xi = c.ToPixels(x.X0), F.Bezier.Xm = c.ToPixels(x.X1), F.Bezier.Xj = c.ToPixels(x.X2), F.Bezier.Yi = p.ToPixels(x.Y0), F.Bezier.Ym = p.ToPixels(x.Y1), F.Bezier.Yj = p.ToPixels(x.Y2);
        let O = c.ToPixels(x.TargetPoint.SecondaryValue), k = p.ToPixels(x.TargetPoint.PrimaryValue + E);
        F.Geometry.MotionProperties.GetAt("X").CopyFrom(F.Bezier.MotionProperties.GetAt("Xj")), F.Geometry.MotionProperties.GetAt("Y").CopyFrom(F.Bezier.MotionProperties.GetAt("Yj")), F.Geometry.TranslateTransform = new B(-P, -P), F.Geometry.Width = m, F.Geometry.Height = m, F.Geometry.RemoveOnCompleted = !1, F.FillPath = V, F.StrokePath = I;
        let N;
        if (x.TargetPoint.Context.HoverArea instanceof gt ? N = x.TargetPoint.Context.HoverArea : x.TargetPoint.Context.HoverArea = N = new gt(), N.SetDimensions(O - _ * 0.5, k - P, _, m), g.Clean(x.TargetPoint), this.DataLabelsPaint != null) {
          let Y = x.TargetPoint.Context.Label;
          if (Y == null) {
            let tt = this._labelFactory();
            tt.X = O - P, tt.Y = C - P, tt.RotateTransform = this.DataLabelsRotation, L.TransitionateProperties(tt, "X", "Y").WithAnimationBuilder((Q) => Q.WithDuration(this.AnimationsSpeed ?? a.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? a.EasingFunction)), tt.CompleteTransition(), Y = tt, x.TargetPoint.Context.Label = tt;
          }
          this.DataLabelsPaint.AddGeometryToPaintTask(a.Canvas, Y), Y.Text = this.DataLabelsFormatter(new ct(x.TargetPoint)), Y.TextSize = y, Y.Padding = this.DataLabelsPadding;
          let at = Y.Measure(this.DataLabelsPaint), Z = this.GetLabelPosition(
            O - P,
            k - P,
            m,
            m,
            at.Clone(),
            this.DataLabelsPosition,
            this.SeriesProperties,
            x.TargetPoint.PrimaryValue > this.Pivot,
            o.Clone(),
            l.Clone()
          );
          this.DataLabelsTranslate != null && (Y.TranslateTransform = new B(at.Width * this.DataLabelsTranslate.X, at.Height * this.DataLabelsTranslate.Y)), Y.X = Z.X, Y.Y = Z.Y;
        }
        this.OnPointMeasured(x.TargetPoint);
      }
      X.End(), A.End(), this.GeometryFill != null && (a.Canvas.AddDrawableTask(this.GeometryFill), this.GeometryFill.SetClipRectangle(a.Canvas, new W(o.Clone(), l.Clone())), this.GeometryFill.ZIndex = f + 0.3), this.GeometryStroke != null && (a.Canvas.AddDrawableTask(this.GeometryStroke), this.GeometryStroke.SetClipRectangle(a.Canvas, new W(o.Clone(), l.Clone())), this.GeometryStroke.ZIndex = f + 0.4), H || b++;
    }
    let z = s.length > i.length ? s.length : i.length;
    for (let w = z - 1; w >= b; w--) {
      if (w < s.length) {
        let V = s[w];
        this.Fill?.RemoveGeometryFromPainTask(a.Canvas, V), V.ClearCommands(), s.RemoveAt(w);
      }
      if (w < i.length) {
        let V = i[w];
        this.Stroke?.RemoveGeometryFromPainTask(a.Canvas, V), V.ClearCommands(), i.RemoveAt(w);
      }
    }
    this.DataLabelsPaint != null && (a.Canvas.AddDrawableTask(this.DataLabelsPaint), this.DataLabelsPaint.ZIndex = f + 0.5), g.CollectPoints(
      this.everFetched,
      a.View,
      p,
      c,
      this.SoftDeleteOrDisposePoint.bind(this)
    ), this.IsFirstDraw = !1;
  }
  GetRequestedGeometrySize() {
    return (this.GeometrySize + (this.GeometryStroke?.StrokeThickness ?? 0)) * 0.5;
  }
  MiniatureEquals(t) {
    if (t instanceof an) {
      const i = t;
      return this.Name == t.Name && !this.PaintsChanged && this.Fill == i.Fill && this.Stroke == i.Stroke && this.GeometryFill == i.GeometryFill && this.GeometryStroke == i.GeometryStroke;
    }
    return !1;
  }
  GetMiniatresSketch() {
    let t = new u.List();
    return this.GeometryFill != null ? t.Add(this.BuildMiniatureSchedule(this.GeometryFill, this._visualFactory())) : this.Fill != null && t.Add(this.BuildMiniatureSchedule(this.Fill, this._visualFactory())), this.GeometryStroke != null ? t.Add(this.BuildMiniatureSchedule(this.GeometryStroke, this._visualFactory())) : this.Stroke != null && t.Add(this.BuildMiniatureSchedule(this.Stroke, this._visualFactory())), new zt().Init(
      {
        Height: this.MiniatureShapeSize,
        Width: this.MiniatureShapeSize,
        PaintSchedules: t
      }
    );
  }
  SoftDeleteOrDispose(t) {
    super.SoftDeleteOrDispose(t);
    let i = t.CoreCanvas;
    if (this.Fill != null)
      for (const s of this._fillPathHelperDictionary)
        for (const a of s.Value)
          this.Fill.RemoveGeometryFromPainTask(i, a);
    if (this.Stroke != null)
      for (const s of this._strokePathHelperDictionary)
        for (const a of s.Value)
          this.Stroke.RemoveGeometryFromPainTask(i, a);
    this.GeometryFill != null && i.RemovePaintTask(this.GeometryFill), this.GeometryStroke != null && i.RemovePaintTask(this.GeometryStroke);
  }
  RemoveFromUI(t) {
    super.RemoveFromUI(t), this._fillPathHelperDictionary.Remove(t.Canvas.Sync), this._strokePathHelperDictionary.Remove(t.Canvas.Sync);
  }
  GetPaintTasks() {
    return [this.Stroke, this.Fill, this._geometryFill, this._geometryStroke, this.DataLabelsPaint, this.hoverPaint];
  }
  GetSpline(t, i) {
    const s = function* (a, r) {
      for (const h of L.AsSplineData(a)) {
        if (h.IsFirst) {
          let E = h.Current, F = (h.Current.PrimaryValue > 0 ? r?.GetStack(E).Start : r?.GetStack(E).NegativeStart) ?? 0;
          yield new qs(h.Next).Init(
            {
              X0: E.SecondaryValue,
              Y0: E.PrimaryValue + F,
              X1: E.SecondaryValue,
              Y1: E.PrimaryValue + F,
              X2: E.SecondaryValue,
              Y2: E.PrimaryValue + F
            }
          );
          continue;
        }
        let o = 0, l = 0, c = 0, p = 0;
        r != null && (o = h.Previous.PrimaryValue > 0 ? r.GetStack(h.Previous).Start : r.GetStack(h.Previous).NegativeStart, l = h.Current.PrimaryValue > 0 ? r.GetStack(h.Current).Start : r.GetStack(h.Current).NegativeStart, c = h.Next.PrimaryValue > 0 ? r.GetStack(h.Next).Start : r.GetStack(h.Next).NegativeStart, p = h.AfterNext.PrimaryValue > 0 ? r.GetStack(h.AfterNext).Start : r.GetStack(h.AfterNext).NegativeStart);
        let m = (h.Previous.SecondaryValue + h.Current.SecondaryValue) / 2, P = (h.Previous.PrimaryValue + o + h.Current.PrimaryValue + l) / 2, C = (h.Current.SecondaryValue + h.Next.SecondaryValue) / 2, G = (h.Current.PrimaryValue + l + h.Next.PrimaryValue + c) / 2, S = (h.Next.SecondaryValue + h.AfterNext.SecondaryValue) / 2, f = (h.Next.PrimaryValue + c + h.AfterNext.PrimaryValue + p) / 2, y = Math.sqrt((h.Current.SecondaryValue - h.Previous.SecondaryValue) * (h.Current.SecondaryValue - h.Previous.SecondaryValue) + (h.Current.PrimaryValue + l - h.Previous.PrimaryValue + o) * (h.Current.PrimaryValue + l - h.Previous.PrimaryValue + o)), g = Math.sqrt((h.Next.SecondaryValue - h.Current.SecondaryValue) * (h.Next.SecondaryValue - h.Current.SecondaryValue) + (h.Next.PrimaryValue + c - h.Current.PrimaryValue + l) * (h.Next.PrimaryValue + c - h.Current.PrimaryValue + l)), _ = Math.sqrt((h.AfterNext.SecondaryValue - h.Next.SecondaryValue) * (h.AfterNext.SecondaryValue - h.Next.SecondaryValue) + (h.AfterNext.PrimaryValue + p - h.Next.PrimaryValue + c) * (h.AfterNext.PrimaryValue + p - h.Next.PrimaryValue + c)), b = y / (y + g), z = g / (g + _);
        Number.isNaN(b) && (b = 0), Number.isNaN(z) && (z = 0);
        let w = m + (C - m) * b, V = P + (G - P) * b, I = C + (S - C) * z, R = G + (f - G) * z, X = w + (C - w) * this._lineSmoothness + h.Current.SecondaryValue - w, A = V + (G - V) * this._lineSmoothness + h.Current.PrimaryValue + l - V, H = I + (C - I) * this._lineSmoothness + h.Next.SecondaryValue - I, x = R + (G - R) * this._lineSmoothness + h.Next.PrimaryValue + c - R;
        yield new qs(h.Next).Init(
          {
            X0: X,
            Y0: A,
            X1: H,
            Y1: x,
            X2: h.Next.SecondaryValue,
            Y2: h.Next.PrimaryValue + c
          }
        );
      }
    }.bind(this);
    return u.EnumerableFrom(() => s(t, i));
  }
  SetDefaultPointTransitions(t) {
    let i = t.Context.Chart, s = t.Context.Visual;
    L.TransitionateProperties(
      s.Geometry,
      "X",
      "Y",
      "Width",
      "Height",
      "TranslateTransform"
    ).WithAnimationBuilder((a) => a.WithDuration(this.AnimationsSpeed ?? i.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? i.EasingFunction)).CompleteCurrentTransitions(), L.TransitionateProperties(
      s.Bezier,
      "Xi",
      "Yi",
      "Xm",
      "Ym",
      "Xj",
      "Yj"
    ).WithAnimationBuilder((a) => a.WithDuration(this.AnimationsSpeed ?? i.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? i.EasingFunction)).CompleteCurrentTransitions();
  }
  SoftDeleteOrDisposePoint(t, i, s) {
    let a = t.Context.Visual;
    if (a == null)
      return;
    if (this.DataFactory == null)
      throw new u.Exception("Data provider not found");
    let r = s.ToPixels(t.SecondaryValue), h = i.ToPixels(t.PrimaryValue);
    a.Geometry.X = r, a.Geometry.Y = h, a.Geometry.Height = 0, a.Geometry.Width = 0, a.Geometry.RemoveOnCompleted = !0, this.DataFactory.DisposePoint(t);
    let o = t.Context.Label;
    o != null && (o.TextSize = 1, o.RemoveOnCompleted = !0);
  }
  DeleteNullPoint(t, i, s) {
    let a;
    if (t.Context.Visual instanceof Dn)
      a = t.Context.Visual;
    else
      return;
    let r = i.ToPixels(t.SecondaryValue), h = s.ToPixels(t.PrimaryValue), o = this._geometrySize, l = o / 2;
    a.Geometry.X = r - l, a.Geometry.Y = h - l, a.Geometry.Width = o, a.Geometry.Height = o, a.Geometry.RemoveOnCompleted = !0, t.Context.Visual = null;
  }
};
let Ds = an;
n(Ds, "SplineData", class {
  constructor(t) {
    n(this, "Previous");
    n(this, "Current");
    n(this, "Next");
    n(this, "AfterNext");
    n(this, "IsFirst", !0);
    this.Previous = t, this.Current = t, this.Next = t, this.AfterNext = t;
  }
  GoNext(t) {
    this.Previous = this.Current, this.Current = this.Next, this.Next = this.AfterNext, this.AfterNext = t;
  }
});
class sa {
  constructor() {
    n(this, "_heatPaint");
    n(this, "_isHeatInCanvas", !1);
    n(this, "_heatMap", []);
    n(this, "_colorStops");
    n(this, "_lands");
    n(this, "_isVisible", !1);
    n(this, "_subscribedTo", new u.HashSet());
    n(this, "_observer");
    n(this, "_everUsed", new u.HashSet());
    n(this, "PropertyChanged", new u.Event());
    n(this, "Name", "");
    this._observer = new Dt(
      (e, t) => this.NotifySubscribers(),
      (e, t) => this.NotifySubscribers()
    );
  }
  get HeatMap() {
    return this._heatMap;
  }
  set HeatMap(e) {
    this._heatMap = e, this.OnPropertyChanged("HeatMap");
  }
  get ColorStops() {
    return this._colorStops;
  }
  set ColorStops(e) {
    this._colorStops = e, this.OnPropertyChanged("ColorStops");
  }
  get Lands() {
    return this._lands;
  }
  set Lands(e) {
    this._observer?.Dispose(this._lands), this._observer?.Initialize(e), this._lands = e, this.OnPropertyChanged("Lands");
  }
  get IsVisible() {
    return this._isVisible;
  }
  set IsVisible(e) {
    this._isVisible = e, this.OnPropertyChanged("IsVisible");
  }
  Measure(e) {
    if (this._subscribedTo.Add(e.CoreMap), this._heatPaint == null)
      throw new u.Exception("Default paint not found");
    this._isHeatInCanvas || (e.View.Canvas.AddDrawableTask(this._heatPaint), this._isHeatInCanvas = !0);
    let t = e.View.Fill?.ZIndex ?? 0;
    this._heatPaint.ZIndex = t + 1;
    let i = new $();
    if (this.Lands != null)
      for (const r of this.Lands)
        i.AppendValue(r.Value);
    let s = Vs.BuildColorStops(this.HeatMap, this.ColorStops), a = new u.HashSet(this._everUsed);
    if (this.Lands != null)
      for (const r of this.Lands) {
        Gn.BuildProjector(
          e.View.MapProjection,
          e.View.Width,
          e.View.Height
        );
        let h = Vs.InterpolateColor(r.Value, i, this.HeatMap, s), o = e.View.ActiveMap.FindLand(r.Name);
        if (o == null)
          return;
        let l = o.Data.Select((c) => c.Shape).Where((c) => c != null).Cast();
        for (const c of l)
          c.FillColor = h.Clone();
        this._everUsed.Add(o), a.Remove(o);
      }
    this.ClearHeat(a);
  }
  Delete(e) {
    this.ClearHeat(this._everUsed), this._subscribedTo.Remove(e.CoreMap);
  }
  IntitializeSeries(e) {
    this._heatPaint = e;
  }
  OnPropertyChanged(e = null) {
    this.PropertyChanged.Invoke(this, new u.PropertyChangedEventArgs(e));
  }
  NotifySubscribers() {
    for (const e of this._subscribedTo)
      e.Update();
  }
  ClearHeat(e) {
    for (const t of e) {
      let i = t.Data.Select((s) => s.Shape).Where((s) => s != null).Cast();
      for (const s of i)
        s.FillColor = ht.Empty.Clone();
      this._everUsed.Remove(t);
    }
  }
}
n(sa, "$meta_System_INotifyPropertyChanged", !0);
class tn extends Qt {
  constructor(t, i, s, a, r = !1) {
    super(D.StepLine | D.PrimaryAxisVerticalOrientation | (r ? D.Stacked : 0) | D.Sketch | D.PrefersXStrategyTooltips);
    n(this, "_fillPathHelperDictionary", new u.Dictionary());
    n(this, "_strokePathHelperDictionary", new u.Dictionary());
    n(this, "_geometrySize", 14);
    n(this, "_geometryFill");
    n(this, "_geometryStroke");
    n(this, "_enableNullSplitting", !0);
    n(this, "_visualFactory");
    n(this, "_labelFactory");
    n(this, "_pathGeometryFactory");
    n(this, "_visualPointFactory");
    this._visualFactory = t, this._labelFactory = i, this._pathGeometryFactory = s, this._visualPointFactory = a, this.DataPadding = new B(0.5, 1);
  }
  get EnableNullSplitting() {
    return this._enableNullSplitting;
  }
  set EnableNullSplitting(t) {
    this.SetProperty(new u.Ref(() => this._enableNullSplitting, (i) => this._enableNullSplitting = i), t, "EnableNullSplitting");
  }
  get GeometrySize() {
    return this._geometrySize;
  }
  set GeometrySize(t) {
    this.SetProperty(new u.Ref(() => this._geometrySize, (i) => this._geometrySize = i), t, "GeometrySize");
  }
  get GeometryFill() {
    return this._geometryFill;
  }
  set GeometryFill(t) {
    this.SetPaintProperty(new u.Ref(() => this._geometryFill, (i) => this._geometryFill = i), t, void 0, "GeometryFill");
  }
  get GeometryStroke() {
    return this._geometryStroke;
  }
  set GeometryStroke(t) {
    this.SetPaintProperty(new u.Ref(() => this._geometryStroke, (i) => this._geometryStroke = i), t, !0, "GeometryStroke");
  }
  Invalidate(t) {
    let i, s, a = t, r = a.YAxes[this.ScalesYAt], h = a.XAxes[this.ScalesXAt], o = a.DrawMarginLocation.Clone(), l = a.DrawMarginSize.Clone(), c = L.GetNextScaler(h, a), p = L.GetNextScaler(r, a);
    L.GetActualScaler(h, a), L.GetActualScaler(r, a);
    let m = this._geometrySize, P = m / 2;
    this.Stroke?.StrokeThickness;
    let C = p.ToPixels(this.pivot), G = this._enableNullSplitting ? L.SplitByNullGaps(this.Fetch(a), (z) => this.DeleteNullPoint(z, c, p)) : new u.List().Init([this.Fetch(a)]), S = (this.SeriesProperties & D.Stacked) == D.Stacked ? a.SeriesContext.GetStackPosition(this, this.GetStackGroup()) : null, f = this.ZIndex == 0 ? this.SeriesId : this.ZIndex;
    S != null && (f = 1e3 - S.Position, this.Fill != null && (this.Fill.ZIndex = f), this.Stroke != null && (this.Stroke.ZIndex = f));
    let y = this.DataLabelsSize, g = 0, _ = vt.For(this.everFetched);
    this._strokePathHelperDictionary.TryGetValue(t.Canvas.Sync, new u.Out(() => i, (z) => i = z)) || (i = new u.List(), this._strokePathHelperDictionary.SetAt(t.Canvas.Sync, i)), this._fillPathHelperDictionary.TryGetValue(t.Canvas.Sync, new u.Out(() => s, (z) => s = z)) || (s = new u.List(), this._fillPathHelperDictionary.SetAt(t.Canvas.Sync, s));
    let b = c.MeasureInPixels(h.UnitWidth);
    b = b < m ? m : b;
    for (const z of G) {
      let w, V, I = !1;
      g >= s.length ? (I = !0, w = this._pathGeometryFactory(), w.ClosingMethod = $t.CloseToPivot, V = this._pathGeometryFactory(), V.ClosingMethod = $t.NotClosed, s.Add(w), i.Add(V)) : (w = s[g], V = i[g]);
      let R = new Is(V), X = new Is(w);
      this.Fill != null && (this.Fill.AddGeometryToPaintTask(a.Canvas, w), a.Canvas.AddDrawableTask(this.Fill), this.Fill.ZIndex = f + 0.1, this.Fill.SetClipRectangle(a.Canvas, new W(o.Clone(), l.Clone())), w.Pivot = C, I && L.TransitionateProperties(w, "Pivot").WithAnimationBuilder((x) => x.WithDuration(this.AnimationsSpeed ?? a.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? a.EasingFunction)).CompleteCurrentTransitions()), this.Stroke != null && (this.Stroke.AddGeometryToPaintTask(a.Canvas, V), a.Canvas.AddDrawableTask(this.Stroke), this.Stroke.ZIndex = f + 0.2, this.Stroke.SetClipRectangle(a.Canvas, new W(o.Clone(), l.Clone())), V.Pivot = C, I && L.TransitionateProperties(V, "Pivot").WithAnimationBuilder((x) => x.WithDuration(this.AnimationsSpeed ?? a.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? a.EasingFunction)).CompleteCurrentTransitions());
      let A = 0, H = 0;
      for (const x of z) {
        let E = 0;
        S != null && (E = S.GetStack(x).Start);
        let F = x.Context.Visual, O = x.PrimaryValue + E - A, k = x.SecondaryValue - H;
        if (F == null) {
          let Z = this._visualPointFactory();
          F = Z, this.IsFirstDraw && (Z.Geometry.X = c.ToPixels(x.SecondaryValue), Z.Geometry.Y = C, Z.Geometry.Width = 0, Z.Geometry.Height = 0, Z.StepSegment.Xi = c.ToPixels(x.SecondaryValue - k), Z.StepSegment.Xj = c.ToPixels(x.SecondaryValue), Z.StepSegment.Yi = C, Z.StepSegment.Yj = C), x.Context.Visual = Z, this.OnPointCreated(x);
        }
        this.everFetched.Add(x), this.GeometryFill?.AddGeometryToPaintTask(a.Canvas, F.Geometry), this.GeometryStroke?.AddGeometryToPaintTask(a.Canvas, F.Geometry), F.StepSegment.Id = x.Context.Entity.EntityIndex, this.Fill != null && X.AddConsecutiveSegment(F.StepSegment, !this.IsFirstDraw), this.Stroke != null && R.AddConsecutiveSegment(F.StepSegment, !this.IsFirstDraw), F.StepSegment.Xi = c.ToPixels(x.SecondaryValue - k), F.StepSegment.Xj = c.ToPixels(x.SecondaryValue), F.StepSegment.Yi = p.ToPixels(x.PrimaryValue + E - O), F.StepSegment.Yj = p.ToPixels(x.PrimaryValue + E);
        let N = c.ToPixels(x.SecondaryValue), Y = p.ToPixels(x.PrimaryValue + E);
        F.Geometry.MotionProperties.GetAt("X").CopyFrom(F.StepSegment.MotionProperties.GetAt("Xj")), F.Geometry.MotionProperties.GetAt("Y").CopyFrom(F.StepSegment.MotionProperties.GetAt("Yj")), F.Geometry.TranslateTransform = new B(-P, -P), F.Geometry.Width = m, F.Geometry.Height = m, F.Geometry.RemoveOnCompleted = !1, F.FillPath = w, F.StrokePath = V;
        let at;
        if (x.Context.HoverArea instanceof gt ? at = x.Context.HoverArea : x.Context.HoverArea = at = new gt(), at.SetDimensions(N - b * 0.5, Y - P, b, m), _.Clean(x), this.DataLabelsPaint != null) {
          let Z = x.Context.Label;
          if (Z == null) {
            let st = this._labelFactory();
            st.X = N - P, st.Y = C - P, st.RotateTransform = this.DataLabelsRotation, L.TransitionateProperties(st, "X", "Y").WithAnimationBuilder((St) => St.WithDuration(this.AnimationsSpeed ?? a.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? a.EasingFunction)), st.CompleteTransition(), Z = st, x.Context.Label = st;
          }
          this.DataLabelsPaint.AddGeometryToPaintTask(a.Canvas, Z), Z.Text = this.DataLabelsFormatter(new ct(x)), Z.TextSize = y, Z.Padding = this.DataLabelsPadding;
          let tt = Z.Measure(this.DataLabelsPaint), Q = this.GetLabelPosition(
            N - P,
            Y - P,
            m,
            m,
            tt.Clone(),
            this.DataLabelsPosition,
            this.SeriesProperties,
            x.PrimaryValue > this.Pivot,
            o.Clone(),
            l.Clone()
          );
          this.DataLabelsTranslate != null && (Z.TranslateTransform = new B(tt.Width * this.DataLabelsTranslate.X, tt.Height * this.DataLabelsTranslate.Y)), Z.X = Q.X, Z.Y = Q.Y;
        }
        this.OnPointMeasured(x), A = x.PrimaryValue + E, H = x.SecondaryValue;
      }
      R.End(), X.End(), this.GeometryFill != null && (a.Canvas.AddDrawableTask(this.GeometryFill), this.GeometryFill.SetClipRectangle(a.Canvas, new W(o.Clone(), l.Clone())), this.GeometryFill.ZIndex = f + 0.3), this.GeometryStroke != null && (a.Canvas.AddDrawableTask(this.GeometryStroke), this.GeometryStroke.SetClipRectangle(a.Canvas, new W(o.Clone(), l.Clone())), this.GeometryStroke.ZIndex = f + 0.4), g++;
    }
    for (; g > s.length; ) {
      let z = s.length - 1, w = s[z];
      this.Fill?.RemoveGeometryFromPainTask(a.Canvas, w), s.RemoveAt(z);
      let V = i.length - 1, I = i[V];
      this.Stroke?.RemoveGeometryFromPainTask(a.Canvas, I), i.RemoveAt(V);
    }
    this.DataLabelsPaint != null && (a.Canvas.AddDrawableTask(this.DataLabelsPaint), this.DataLabelsPaint.ZIndex = f + 0.5), _.CollectPoints(
      this.everFetched,
      a.View,
      p,
      c,
      this.SoftDeleteOrDisposePoint.bind(this)
    ), this.IsFirstDraw = !1;
  }
  GetRequestedGeometrySize() {
    return (this.GeometrySize + (this.GeometryStroke?.StrokeThickness ?? 0)) * 0.5;
  }
  GetMiniatresSketch() {
    let t = new u.List();
    return this.GeometryFill != null ? t.Add(this.BuildMiniatureSchedule(this.GeometryFill, this._visualFactory())) : this.Fill != null && t.Add(this.BuildMiniatureSchedule(this.Fill, this._visualFactory())), this.GeometryStroke != null ? t.Add(this.BuildMiniatureSchedule(this.GeometryStroke, this._visualFactory())) : this.Stroke != null && t.Add(this.BuildMiniatureSchedule(this.Stroke, this._visualFactory())), new zt().Init(
      {
        Height: this.MiniatureShapeSize,
        Width: this.MiniatureShapeSize,
        PaintSchedules: t
      }
    );
  }
  MiniatureEquals(t) {
    if (t instanceof tn) {
      const i = t;
      return this.Name == t.Name && !this.PaintsChanged && this.Fill == i.Fill && this.Stroke == i.Stroke && this.GeometryFill == i.GeometryFill && this.GeometryStroke == i.GeometryStroke;
    }
    return !1;
  }
  SetDefaultPointTransitions(t) {
    let i = t.Context.Chart, s = t.Context.Visual;
    L.TransitionateProperties(
      s.Geometry,
      "X",
      "Y",
      "Width",
      "Height",
      "TranslateTransform"
    ).WithAnimationBuilder((a) => a.WithDuration(this.AnimationsSpeed ?? i.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? i.EasingFunction)).CompleteCurrentTransitions(), L.TransitionateProperties(
      s.StepSegment,
      "Xi",
      "Yi",
      "Xj",
      "Yj"
    ).WithAnimationBuilder((a) => a.WithDuration(this.AnimationsSpeed ?? i.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? i.EasingFunction)).CompleteCurrentTransitions();
  }
  SoftDeleteOrDisposePoint(t, i, s) {
    let a = t.Context.Visual;
    if (a == null)
      return;
    if (this.DataFactory == null)
      throw new u.Exception("Data provider not found");
    if (t.Context.Chart.Core.IsZoomingOrPanning) {
      a.Geometry.CompleteTransition(), a.Geometry.RemoveOnCompleted = !0, this.DataFactory.DisposePoint(t);
      return;
    }
    let h = s.ToPixels(t.SecondaryValue), o = i.ToPixels(t.PrimaryValue);
    a.Geometry.X = h, a.Geometry.Y = o, a.Geometry.Height = 0, a.Geometry.Width = 0, a.Geometry.RemoveOnCompleted = !0, this.DataFactory.DisposePoint(t);
    let l = t.Context.Label;
    l != null && (l.TextSize = 1, l.RemoveOnCompleted = !0);
  }
  SoftDeleteOrDispose(t) {
    super.SoftDeleteOrDispose(t);
    let i = t.CoreCanvas;
    if (this.Fill != null)
      for (const s of this._fillPathHelperDictionary.Values)
        for (const a of s)
          this.Fill.RemoveGeometryFromPainTask(i, a);
    if (this.Stroke != null)
      for (const s of this._strokePathHelperDictionary.Values)
        for (const a of s)
          this.Stroke.RemoveGeometryFromPainTask(i, a);
    this.GeometryFill != null && i.RemovePaintTask(this.GeometryFill), this.GeometryStroke != null && i.RemovePaintTask(this.GeometryStroke);
  }
  RemoveFromUI(t) {
    super.RemoveFromUI(t), this._fillPathHelperDictionary.Remove(t.Canvas.Sync), this._strokePathHelperDictionary.Remove(t.Canvas.Sync);
  }
  GetPaintTasks() {
    return [this.Stroke, this.Fill, this._geometryFill, this._geometryStroke, this.DataLabelsPaint, this.hoverPaint];
  }
  DeleteNullPoint(t, i, s) {
    let a;
    if (t.Context.Visual instanceof $n)
      a = t.Context.Visual;
    else
      return;
    let r = i.ToPixels(t.SecondaryValue), h = s.ToPixels(t.PrimaryValue), o = this._geometrySize, l = o / 2;
    a.Geometry.X = r - l, a.Geometry.Y = h - l, a.Geometry.Width = o, a.Geometry.Height = o, a.Geometry.RemoveOnCompleted = !0, t.Context.Visual = null;
  }
}
class Ba extends Qt {
  constructor(t, i) {
    super(D.Scatter | D.Solid | D.PrefersXYStrategyTooltips);
    n(this, "_weightBounds", new $());
    n(this, "_visualFactory");
    n(this, "_labelFactory");
    n(this, "MinGeometrySize", 6);
    n(this, "GeometrySize", 24);
    this._visualFactory = t, this._labelFactory = i, this.DataPadding = new B(1, 1), this.DataLabelsFormatter = (s) => `${s.SecondaryValue}, ${s.PrimaryValue}`, this.TooltipLabelFormatter = (s) => `${s.Context.Series.Name} ${s.SecondaryValue}, ${s.PrimaryValue}`;
  }
  Invalidate(t) {
    let i = t, s = i.YAxes[this.ScalesYAt], a = i.XAxes[this.ScalesXAt], r = i.DrawMarginLocation.Clone(), h = i.DrawMarginSize.Clone(), o = dt.Make(r.Clone(), h.Clone(), a), l = dt.Make(r.Clone(), h.Clone(), s), c = this.ZIndex == 0 ? this.SeriesId : this.ZIndex;
    this.Fill != null && (this.Fill.ZIndex = c + 0.1, this.Fill.SetClipRectangle(i.Canvas, new W(r.Clone(), h.Clone())), i.Canvas.AddDrawableTask(this.Fill)), this.Stroke != null && (this.Stroke.ZIndex = c + 0.2, this.Stroke.SetClipRectangle(i.Canvas, new W(r.Clone(), h.Clone())), i.Canvas.AddDrawableTask(this.Stroke)), this.DataLabelsPaint != null && (this.DataLabelsPaint.ZIndex = c + 0.3, i.Canvas.AddDrawableTask(this.DataLabelsPaint));
    let p = this.DataLabelsSize, m = vt.For(this.everFetched), P = this.GeometrySize, C = P / 2;
    this.Stroke?.StrokeThickness;
    let G = this._weightBounds.Max - this._weightBounds.Min > 0, S = -(this.GeometrySize - this.MinGeometrySize) / (this._weightBounds.Max - this._weightBounds.Min), f = o.MeasureInPixels(a.UnitWidth), y = l.MeasureInPixels(a.UnitWidth);
    f = f < P ? P : f, y = y < P ? P : y;
    for (const g of this.Fetch(i)) {
      let _ = g.Context.Visual, b = o.ToPixels(g.SecondaryValue), z = l.ToPixels(g.PrimaryValue);
      if (g.IsEmpty) {
        _ != null && (_.X = b - C, _.Y = z - C, _.Width = 0, _.Height = 0, _.RemoveOnCompleted = !0, g.Context.Visual = null);
        continue;
      }
      if (G && (P = S * (this._weightBounds.Max - g.TertiaryValue) + this.GeometrySize, C = P / 2), _ == null) {
        let I = this._visualFactory();
        I.X = b, I.Y = z, I.Width = 0, I.Height = 0, _ = I, g.Context.Visual = _, this.OnPointCreated(g), this.everFetched.Add(g);
      }
      this.Fill?.AddGeometryToPaintTask(i.Canvas, _), this.Stroke?.AddGeometryToPaintTask(i.Canvas, _);
      let w = _;
      w.X = b - C, w.Y = z - C, w.Width = P, w.Height = P, w.RemoveOnCompleted = !1;
      let V;
      if (g.Context.HoverArea instanceof gt ? V = g.Context.HoverArea : g.Context.HoverArea = V = new gt(), V.SetDimensions(b - f * 0.5, z - y * 0.5, f, y), m.Clean(g), this.DataLabelsPaint != null) {
        let I;
        if (jn(g.Context.Label))
          I = g.Context.Label;
        else {
          let A = this._labelFactory();
          A.X = b - C, A.Y = z - C, A.RotateTransform = this.DataLabelsRotation, L.TransitionateProperties(A, "X", "Y").WithAnimationBuilder((H) => H.WithDuration(this.AnimationsSpeed ?? i.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? i.EasingFunction)), A.CompleteTransition(), I = A, g.Context.Label = A;
        }
        this.DataLabelsPaint.AddGeometryToPaintTask(i.Canvas, I), I.Text = this.DataLabelsFormatter(new ct(g)), I.TextSize = p, I.Padding = this.DataLabelsPadding;
        let R = I.Measure(this.DataLabelsPaint), X = this.GetLabelPosition(
          b - C,
          z - C,
          P,
          P,
          R.Clone(),
          this.DataLabelsPosition,
          this.SeriesProperties,
          g.PrimaryValue > 0,
          r.Clone(),
          h.Clone()
        );
        this.DataLabelsTranslate != null && (I.TranslateTransform = new B(R.Width * this.DataLabelsTranslate.X, R.Height * this.DataLabelsTranslate.Y)), I.X = X.X, I.Y = X.Y;
      }
      this.OnPointMeasured(g);
    }
    m.CollectPoints(this.everFetched, i.View, l, o, this.SoftDeleteOrDisposePoint.bind(this));
  }
  GetBounds(t, i, s) {
    let a = super.GetBounds(t, i, s);
    return this._weightBounds = a.Bounds.TertiaryBounds, a;
  }
  GetMiniatresSketch() {
    let t = new u.List();
    return this.Fill != null && t.Add(this.BuildMiniatureSchedule(this.Fill, this._visualFactory())), this.Stroke != null && t.Add(this.BuildMiniatureSchedule(this.Stroke, this._visualFactory())), new zt().Init(
      {
        Height: this.MiniatureShapeSize,
        Width: this.MiniatureShapeSize,
        PaintSchedules: t
      }
    );
  }
  SetDefaultPointTransitions(t) {
    let i = t.Context.Visual, s = t.Context.Chart;
    if (i == null)
      throw new u.Exception("Unable to initialize the point instance.");
    L.TransitionateProperties(
      i,
      "X",
      "Y",
      "Width",
      "Height"
    ).WithAnimationBuilder((a) => a.WithDuration(this.AnimationsSpeed ?? s.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? s.EasingFunction)).CompleteCurrentTransitions();
  }
  SoftDeleteOrDisposePoint(t, i, s) {
    let a = t.Context.Visual;
    if (a == null)
      return;
    if (this.DataFactory == null)
      throw new u.Exception("Data provider not found");
    if (t.Context.Chart.Core.IsZoomingOrPanning) {
      a.CompleteTransition(), a.RemoveOnCompleted = !0, this.DataFactory.DisposePoint(t);
      return;
    }
    let h = s.ToPixels(t.SecondaryValue), o = i.ToPixels(t.PrimaryValue);
    a.X = h, a.Y = o, a.Height = 0, a.Width = 0, a.RemoveOnCompleted = !0, this.DataFactory.DisposePoint(t);
    let l = t.Context.Label;
    l != null && (l.TextSize = 1, l.RemoveOnCompleted = !0);
  }
}
class Vn extends Js {
  constructor(t, i) {
    super(D.Heat | D.PrimaryAxisVerticalOrientation | D.Solid | D.PrefersXYStrategyTooltips);
    n(this, "_paintTaks");
    n(this, "_weightBounds", new $());
    n(this, "_heatKnownLength", 0);
    n(this, "_heatStops", new u.List());
    n(this, "_heatMap", [
      ht.FromArgb(255, 87, 103, 222),
      ht.FromArgb(255, 95, 207, 249)
    ]);
    n(this, "_colorStops");
    n(this, "_pointPadding", kt.All(4));
    n(this, "_visualFactory");
    n(this, "_labelFactory");
    this._visualFactory = t, this._labelFactory = i, this.DataPadding = new B(0, 0), this.TooltipLabelFormatter = (s) => `${this.Name}: ${s.TertiaryValue}`;
  }
  get HeatMap() {
    return this._heatMap;
  }
  set HeatMap(t) {
    this.OnMiniatureChanged(), this.SetProperty(new u.Ref(() => this._heatMap, (i) => this._heatMap = i), t, "HeatMap");
  }
  get ColorStops() {
    return this._colorStops;
  }
  set ColorStops(t) {
    this.SetProperty(new u.Ref(() => this._colorStops, (i) => this._colorStops = i), t, "ColorStops");
  }
  get PointPadding() {
    return this._pointPadding;
  }
  set PointPadding(t) {
    this.SetProperty(new u.Ref(() => this._pointPadding, (i) => this._pointPadding = i), t, "PointPadding");
  }
  Invalidate(t) {
    this._paintTaks ?? (this._paintTaks = j.DefaultSettings.GetProvider().GetSolidColorPaint());
    let i = t, s = i.YAxes[this.ScalesYAt], a = i.XAxes[this.ScalesXAt], r = i.DrawMarginLocation.Clone(), h = i.DrawMarginSize.Clone(), o = L.GetNextScaler(a, i), l = L.GetNextScaler(s, i), c = L.GetActualScaler(s, i), p = L.GetActualScaler(a, i), m = o.MeasureInPixels(a.UnitWidth), P = l.MeasureInPixels(s.UnitWidth), C = this.ZIndex == 0 ? this.SeriesId : this.ZIndex;
    this._paintTaks != null && (this._paintTaks.ZIndex = C + 0.2, this._paintTaks.SetClipRectangle(i.Canvas, new W(r.Clone(), h.Clone())), i.Canvas.AddDrawableTask(this._paintTaks)), this.DataLabelsPaint != null && (this.DataLabelsPaint.ZIndex = C + 0.3, i.Canvas.AddDrawableTask(this.DataLabelsPaint));
    let G = this.DataLabelsSize, S = vt.For(this.everFetched), f = this.PointPadding;
    this._heatKnownLength != this.HeatMap.length && (this._heatStops = Vs.BuildColorStops(this.HeatMap, this.ColorStops), this._heatKnownLength = this.HeatMap.length);
    for (const y of this.Fetch(i)) {
      let g = y.Context.Visual, _ = l.ToPixels(y.PrimaryValue), b = o.ToPixels(y.SecondaryValue), z = y.TertiaryValue, w = Vs.InterpolateColor(z, this._weightBounds, this.HeatMap, this._heatStops);
      if (y.IsEmpty) {
        g != null && (g.X = b - m * 0.5, g.Y = _ - P * 0.5, g.Width = m, g.Height = P, g.RemoveOnCompleted = !0, g.Color = ht.FromColorWithAlpha(0, g.Color.Clone()), y.Context.Visual = null);
        continue;
      }
      if (g == null) {
        let I = b - m * 0.5, R = _ - P * 0.5;
        if (p != null && c != null) {
          let A = c.ToPixels(this.pivot), H = c.ToPixels(y.PrimaryValue), x = Math.abs(H - A);
          y.PrimaryValue > this.pivot || H - x, I = p.ToPixels(y.SecondaryValue) - m * 0.5, R = c.ToPixels(y.PrimaryValue) - P * 0.5;
        }
        let X = this._visualFactory();
        X.X = I + f.Left, X.Y = R + f.Top, X.Width = m - f.Left - f.Right, X.Height = P - f.Top - f.Bottom, X.Color = ht.FromArgb(0, w.R, w.G, w.B), g = X, y.Context.Visual = g, this.OnPointCreated(y), this.everFetched.Add(y);
      }
      this._paintTaks?.AddGeometryToPaintTask(i.Canvas, g), g.X = b - m * 0.5 + f.Left, g.Y = _ - P * 0.5 + f.Top, g.Width = m - f.Left - f.Right, g.Height = P - f.Top - f.Bottom, g.Color = ht.FromArgb(w.A, w.R, w.G, w.B), g.RemoveOnCompleted = !1;
      let V;
      if (y.Context.HoverArea instanceof gt ? V = y.Context.HoverArea : y.Context.HoverArea = V = new gt(), V.SetDimensions(b - m * 0.5, _ - P * 0.5, m, P), S.Clean(y), this.DataLabelsPaint != null) {
        let I = y.Context.Label;
        if (I == null) {
          let X = this._labelFactory();
          X.X = b - m * 0.5, X.Y = _ - m * 0.5, X.RotateTransform = this.DataLabelsRotation, L.TransitionateProperties(X, "X", "Y").WithAnimationBuilder((A) => A.WithDuration(this.AnimationsSpeed ?? i.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? i.EasingFunction)), X.CompleteTransition(), I = X, y.Context.Label = X;
        }
        this.DataLabelsPaint.AddGeometryToPaintTask(i.Canvas, I), I.Text = this.DataLabelsFormatter(new ct(y)), I.TextSize = G, I.Padding = this.DataLabelsPadding;
        let R = this.GetLabelPosition(
          b,
          _,
          m,
          m,
          I.Measure(this.DataLabelsPaint),
          this.DataLabelsPosition,
          this.SeriesProperties,
          y.PrimaryValue > this.Pivot,
          r.Clone(),
          h.Clone()
        );
        I.X = R.X, I.Y = R.Y;
      }
      this.OnPointMeasured(y);
    }
    S.CollectPoints(
      this.everFetched,
      i.View,
      l,
      o,
      this.SoftDeleteOrDisposePoint.bind(this)
    );
  }
  GetBounds(t, i, s) {
    let a = super.GetBounds(t, i, s);
    return this._weightBounds = a.Bounds.TertiaryBounds, a;
  }
  GetRequestedSecondaryOffset() {
    return 0.5;
  }
  GetRequestedPrimaryOffset() {
    return 0.5;
  }
  SetDefaultPointTransitions(t) {
    let i = t.Context.Chart, s = t.Context.Visual;
    L.TransitionateProperties(
      s,
      "X",
      "Width",
      "Y",
      "Height",
      "Color"
    ).WithAnimationBuilder((a) => a.WithDuration(this.AnimationsSpeed ?? i.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? i.EasingFunction)).CompleteCurrentTransitions();
  }
  SoftDeleteOrDisposePoint(t, i, s) {
    let a = t.Context.Visual;
    if (a == null)
      return;
    if (this.DataFactory == null)
      throw new u.Exception("Data provider not found");
    if (t.Context.Chart.Core.IsZoomingOrPanning) {
      a.CompleteTransition(), a.RemoveOnCompleted = !0, this.DataFactory.DisposePoint(t);
      return;
    }
    a.Color = ht.FromColorWithAlpha(255, a.Color.Clone()), a.RemoveOnCompleted = !0;
    let h = t.Context.Label;
    h != null && (h.TextSize = 1, h.RemoveOnCompleted = !0);
  }
  GetMiniatresSketch() {
    let t = new u.List(), i = j.DefaultSettings.GetProvider().GetSolidColorPaint(), s = i.StrokeThickness;
    s > Gt.MAX_MINIATURE_STROKE_WIDTH && (s = Gt.MAX_MINIATURE_STROKE_WIDTH, i.StrokeThickness = Gt.MAX_MINIATURE_STROKE_WIDTH);
    let a = this._visualFactory();
    return a.X = s * 0.5, a.Y = s * 0.5, a.Height = this.MiniatureShapeSize, a.Width = this.MiniatureShapeSize, a.Color = this.HeatMap[0].Clone(), i.ZIndex = 1, t.Add(new Tn(i, a)), new zt().Init(
      {
        Height: this.MiniatureShapeSize,
        Width: this.MiniatureShapeSize,
        PaintSchedules: t
      }
    );
  }
  MiniatureEquals(t) {
    if (t instanceof Vn) {
      const i = t;
      return this.Name == t.Name && this.HeatMap == i.HeatMap;
    }
    return !1;
  }
  GetPaintTasks() {
    return [this._paintTaks, this.hoverPaint];
  }
}
class na {
  constructor(e, t) {
    n(this, "Value");
    n(this, "Color");
    this.Value = e, this.Color = t.Clone();
  }
}
class jt extends Qt {
  constructor(t, i, s) {
    super(t);
    n(this, "_pading", 5);
    n(this, "_maxBarWidth", 50);
    n(this, "_ignoresBarPosition", !1);
    n(this, "_rx", 0);
    n(this, "_ry", 0);
    n(this, "_visualFactory");
    n(this, "_labelFactory");
    this._visualFactory = i, this._labelFactory = s;
  }
  get Padding() {
    return this._pading;
  }
  set Padding(t) {
    this.SetProperty(new u.Ref(() => this._pading, (i) => this._pading = i), t, "Padding");
  }
  get MaxBarWidth() {
    return this._maxBarWidth;
  }
  set MaxBarWidth(t) {
    this.SetProperty(new u.Ref(() => this._maxBarWidth, (i) => this._maxBarWidth = i), t, "MaxBarWidth");
  }
  get IgnoresBarPosition() {
    return this._ignoresBarPosition;
  }
  set IgnoresBarPosition(t) {
    this.SetProperty(new u.Ref(() => this._ignoresBarPosition, (i) => this._ignoresBarPosition = i), t, "IgnoresBarPosition");
  }
  get Rx() {
    return this._rx;
  }
  set Rx(t) {
    this.SetProperty(new u.Ref(() => this._rx, (i) => this._rx = i), t, "Rx");
  }
  get Ry() {
    return this._ry;
  }
  set Ry(t) {
    this.SetProperty(new u.Ref(() => this._ry, (i) => this._ry = i), t, "Ry");
  }
  GetMiniatresSketch() {
    let t = new u.List();
    return this.Fill != null && t.Add(this.BuildMiniatureSchedule(this.Fill, this._visualFactory())), this.Stroke != null && t.Add(this.BuildMiniatureSchedule(this.Stroke, this._visualFactory())), new zt().Init(
      {
        Height: this.MiniatureShapeSize,
        Width: this.MiniatureShapeSize,
        PaintSchedules: t
      }
    );
  }
}
n(jt, "MeasureHelper", class {
  constructor(t, i, s, a, r, h, o, l) {
    n(this, "uw", 0);
    n(this, "uwm", 0);
    n(this, "cp", 0);
    n(this, "p", 0);
    n(this, "actualUw", 0);
    this.p = r, r < h && (this.p = h), r > o && (this.p = o), this.uw = t.MeasureInPixels(a.UnitWidth), this.actualUw = this.uw;
    let c = s.Padding;
    this.uw - c < 1 && (c -= this.uw - c), this.uw -= c, this.uwm = 0.5 * this.uw;
    let p = 0, m = 0;
    l ? (p = i.SeriesContext.GetStackedColumnPostion(s), m = i.SeriesContext.GetStackedColumnSeriesCount()) : (p = i.SeriesContext.GetColumnPostion(s), m = i.SeriesContext.GetColumnSeriesCount()), this.cp = 0;
    let P = s.Padding;
    this.uw /= m;
    let C = s.MaxBarWidth;
    this.uw > C && (this.uw = C), this.uwm = 0.5 * this.uw, this.cp = s.IgnoresBarPosition ? 0 : (p - m / 2) * this.uw + this.uwm, this.uw -= P, this.cp += P * 0.5, this.uw < 1 && (this.uw = 1, this.uwm = 0.5);
  }
});
class aa extends jt {
  constructor(e, t, i = !1) {
    super(
      D.Bar | D.PrimaryAxisHorizontalOrientation | D.Solid | D.PrefersYStrategyTooltips | (i ? D.Stacked : 0),
      e,
      t
    );
  }
  Invalidate(e) {
    let t = e, i = t.YAxes[this.ScalesYAt], s = t.XAxes[this.ScalesXAt], a = t.DrawMarginLocation.Clone(), r = t.DrawMarginSize.Clone(), h = L.GetNextScaler(i, t), o = L.GetNextScaler(s, t), l = L.GetActualScaler(s, t), c = L.GetActualScaler(i, t), p = (this.SeriesProperties & D.Stacked) == D.Stacked, m = new jt.MeasureHelper(
      h,
      t,
      this,
      s,
      o.ToPixels(this.pivot),
      t.DrawMarginLocation.X,
      t.DrawMarginLocation.X + t.DrawMarginSize.Width,
      p
    ), P = c == null || l == null ? null : new jt.MeasureHelper(
      c,
      t,
      this,
      s,
      l.ToPixels(this.pivot),
      t.DrawMarginLocation.X,
      t.DrawMarginLocation.X + t.DrawMarginSize.Width,
      p
    ), C = this.ZIndex == 0 ? this.SeriesId : this.ZIndex;
    this.Fill != null && (this.Fill.ZIndex = C + 0.1, this.Fill.SetClipRectangle(t.Canvas, new W(a.Clone(), r.Clone())), t.Canvas.AddDrawableTask(this.Fill)), this.Stroke != null && (this.Stroke.ZIndex = C + 0.2, this.Stroke.SetClipRectangle(t.Canvas, new W(a.Clone(), r.Clone())), t.Canvas.AddDrawableTask(this.Stroke)), this.DataLabelsPaint != null && (this.DataLabelsPaint.ZIndex = C + 0.3, t.Canvas.AddDrawableTask(this.DataLabelsPaint));
    let G = this.DataLabelsSize, S = vt.For(this.everFetched), f = this.Rx, y = this.Ry, g = p ? t.SeriesContext.GetStackPosition(this, this.GetStackGroup()) : null;
    for (const _ of this.Fetch(t)) {
      let b = _.Context.Visual, z = o.ToPixels(_.PrimaryValue), w = h.ToPixels(_.SecondaryValue), V = Math.abs(z - m.p);
      if (_.IsEmpty) {
        b != null && (b.X = w - m.uwm + m.cp, b.Y = m.p, b.Width = m.uw, b.Height = 0, b.RemoveOnCompleted = !0, _.Context.Visual = null);
        continue;
      }
      if (b == null) {
        let A = w - m.uwm + m.cp, H = m.p, x = m.uw, E = 0;
        if (c != null && l != null && P != null) {
          let O = l.ToPixels(_.PrimaryValue), k = Math.abs(O - P.p), N = _.PrimaryValue > this.pivot ? O : O - k;
          A = c.ToPixels(_.SecondaryValue) - P.uwm + P.cp, H = t.IsZoomingOrPanning ? N : P.p, x = P.uw, E = t.IsZoomingOrPanning ? k : 0;
        }
        let F = this._visualFactory();
        if (F.X = H, F.Y = A, F.Width = E, F.Height = x, ks(F)) {
          const O = F;
          O.Rx = f, O.Ry = y;
        }
        b = F, _.Context.Visual = b, this.OnPointCreated(_), this.everFetched.Add(_);
      }
      this.Fill?.AddGeometryToPaintTask(t.Canvas, b), this.Stroke?.AddGeometryToPaintTask(t.Canvas, b);
      let I = s.IsInverted ? _.PrimaryValue > this.pivot ? z : z - V : _.PrimaryValue > this.pivot ? z - V : z, R = w - m.uwm + m.cp;
      if (g != null) {
        let A = g.GetStack(_), H = 0, x = 0;
        _.PrimaryValue >= 0 ? (H = o.ToPixels(A.Start), x = o.ToPixels(A.End)) : (H = o.ToPixels(A.NegativeStart), x = o.ToPixels(A.NegativeEnd)), I = x, V = H - x;
      }
      if (b.X = I, b.Y = R, b.Width = V, b.Height = m.uw, ks(b)) {
        const A = b;
        A.Rx = f, A.Ry = y;
      }
      b.RemoveOnCompleted = !1;
      let X;
      if (_.Context.HoverArea instanceof gt ? X = _.Context.HoverArea : _.Context.HoverArea = X = new gt(), X.SetDimensions(I, w - m.actualUw * 0.5, V, m.actualUw), S.Clean(_), this.DataLabelsPaint != null) {
        let A = _.Context.Label;
        if (A == null) {
          let E = this._labelFactory();
          E.X = m.p, E.Y = w - m.uwm + m.cp, E.RotateTransform = this.DataLabelsRotation, L.TransitionateProperties(E, "X", "Y").WithAnimationBuilder((F) => F.WithDuration(this.AnimationsSpeed ?? t.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? t.EasingFunction)), E.CompleteTransition(), A = E, _.Context.Label = E;
        }
        this.DataLabelsPaint.AddGeometryToPaintTask(t.Canvas, A), A.Text = this.DataLabelsFormatter(new ct(_)), A.TextSize = G, A.Padding = this.DataLabelsPadding;
        let H = A.Measure(this.DataLabelsPaint), x = this.GetLabelPosition(
          I,
          R,
          V,
          m.uw,
          A.Measure(this.DataLabelsPaint),
          this.DataLabelsPosition,
          this.SeriesProperties,
          _.PrimaryValue > this.Pivot,
          a.Clone(),
          r.Clone()
        );
        this.DataLabelsTranslate != null && (A.TranslateTransform = new B(H.Width * this.DataLabelsTranslate.X, H.Height * this.DataLabelsTranslate.Y)), A.X = x.X, A.Y = x.Y;
      }
      this.OnPointMeasured(_);
    }
    S.CollectPoints(
      this.everFetched,
      t.View,
      o,
      h,
      this.SoftDeleteOrDisposePoint.bind(this)
    );
  }
  GetRequestedSecondaryOffset() {
    return 0.5;
  }
  GetIsInvertedBounds() {
    return !0;
  }
  SetDefaultPointTransitions(e) {
    let t = e.Context.Chart, i = e.Context.Visual;
    L.TransitionateProperties(
      i,
      "X",
      "Width",
      "Y",
      "Height"
    ).WithAnimationBuilder((s) => s.WithDuration(this.AnimationsSpeed ?? t.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? t.EasingFunction)).CompleteCurrentTransitions();
  }
  SoftDeleteOrDisposePoint(e, t, i) {
    let s = e.Context.Visual;
    if (s == null)
      return;
    if (this.DataFactory == null)
      throw new u.Exception("Data provider not found");
    if (e.Context.Chart.Core.IsZoomingOrPanning) {
      s.CompleteTransition(), s.RemoveOnCompleted = !0, this.DataFactory.DisposePoint(e);
      return;
    }
    let r = t.ToPixels(this.pivot), h = i.ToPixels(e.SecondaryValue);
    s.X = r, s.Y = h, s.Width = 0, s.RemoveOnCompleted = !0, this.DataFactory.DisposePoint(e);
    let o = e.Context.Label;
    o != null && (o.TextSize = 1, o.RemoveOnCompleted = !0);
  }
}
class ra extends jt {
  constructor(e, t, i = !1) {
    super(
      D.Bar | D.PrimaryAxisVerticalOrientation | D.Solid | D.PrefersXStrategyTooltips | (i ? D.Stacked : 0),
      e,
      t
    ), this.DataPadding = new B(0, 1);
  }
  Invalidate(e) {
    let t = e, i = t.YAxes[this.ScalesYAt], s = t.XAxes[this.ScalesXAt], a = t.DrawMarginLocation.Clone(), r = t.DrawMarginSize.Clone(), h = L.GetNextScaler(s, t), o = L.GetNextScaler(i, t), l = L.GetActualScaler(i, t), c = L.GetActualScaler(s, t), p = (this.SeriesProperties & D.Stacked) == D.Stacked, m = new jt.MeasureHelper(
      h,
      t,
      this,
      s,
      o.ToPixels(this.pivot),
      t.DrawMarginLocation.Y,
      t.DrawMarginLocation.Y + t.DrawMarginSize.Height,
      p
    ), P = c == null || l == null ? null : new jt.MeasureHelper(
      c,
      t,
      this,
      s,
      l.ToPixels(this.pivot),
      t.DrawMarginLocation.Y,
      t.DrawMarginLocation.Y + t.DrawMarginSize.Height,
      p
    ), C = this.ZIndex == 0 ? this.SeriesId : this.ZIndex;
    this.Fill != null && (this.Fill.ZIndex = C + 0.1, this.Fill.SetClipRectangle(t.Canvas, new W(a.Clone(), r.Clone())), t.Canvas.AddDrawableTask(this.Fill)), this.Stroke != null && (this.Stroke.ZIndex = C + 0.2, this.Stroke.SetClipRectangle(t.Canvas, new W(a.Clone(), r.Clone())), t.Canvas.AddDrawableTask(this.Stroke)), this.DataLabelsPaint != null && (this.DataLabelsPaint.ZIndex = C + 0.3, t.Canvas.AddDrawableTask(this.DataLabelsPaint));
    let G = this.DataLabelsSize, S = vt.For(this.everFetched), f = this.Rx, y = this.Ry, g = p ? t.SeriesContext.GetStackPosition(this, this.GetStackGroup()) : null;
    for (const _ of this.Fetch(t)) {
      let b = _.Context.Visual, z = o.ToPixels(_.PrimaryValue), w = h.ToPixels(_.SecondaryValue), V = Math.abs(z - m.p);
      if (_.IsEmpty) {
        b != null && (b.X = w - m.uwm + m.cp, b.Y = m.p, b.Width = m.uw, b.Height = 0, b.RemoveOnCompleted = !0, _.Context.Visual = null);
        continue;
      }
      if (b == null) {
        let A = w - m.uwm + m.cp, H = m.p, x = m.uw, E = 0;
        if (c != null && l != null && P != null) {
          let O = l.ToPixels(_.PrimaryValue), k = Math.abs(O - P.p), N = _.PrimaryValue > this.pivot ? O : O - k;
          A = c.ToPixels(_.SecondaryValue) - P.uwm + P.cp, H = t.IsZoomingOrPanning ? N : P.p, x = P.uw, E = t.IsZoomingOrPanning ? k : 0;
        }
        let F = this._visualFactory();
        if (F.X = A, F.Y = H, F.Width = x, F.Height = E, ks(F)) {
          const O = F;
          O.Rx = f, O.Ry = y;
        }
        b = F, _.Context.Visual = b, this.OnPointCreated(_), this.everFetched.Add(_);
      }
      this.Fill?.AddGeometryToPaintTask(t.Canvas, b), this.Stroke?.AddGeometryToPaintTask(t.Canvas, b);
      let I = i.IsInverted ? _.PrimaryValue > this.pivot ? z - V : z : _.PrimaryValue > this.pivot ? z : z - V, R = w - m.uwm + m.cp;
      if (g != null) {
        let A = g.GetStack(_), H = 0, x = 0;
        _.PrimaryValue >= 0 ? (H = o.ToPixels(A.Start), x = o.ToPixels(A.End)) : (H = o.ToPixels(A.NegativeStart), x = o.ToPixels(A.NegativeEnd)), I = x, V = H - x;
      }
      if (b.X = R, b.Y = I, b.Width = m.uw, b.Height = V, ks(b)) {
        const A = b;
        A.Rx = f, A.Ry = y;
      }
      b.RemoveOnCompleted = !1;
      let X;
      if (_.Context.HoverArea instanceof gt ? X = _.Context.HoverArea : _.Context.HoverArea = X = new gt(), X.SetDimensions(w - m.actualUw * 0.5, I, m.actualUw, V), S.Clean(_), this.DataLabelsPaint != null) {
        let A = _.Context.Label;
        if (A == null) {
          let E = this._labelFactory();
          E.X = w - m.uwm + m.cp, E.Y = m.p, E.RotateTransform = this.DataLabelsRotation, L.TransitionateProperties(E, "X", "Y").WithAnimationBuilder((F) => F.WithDuration(this.AnimationsSpeed ?? t.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? t.EasingFunction)), E.CompleteTransition(), A = E, _.Context.Label = E;
        }
        this.DataLabelsPaint.AddGeometryToPaintTask(t.Canvas, A), A.Text = this.DataLabelsFormatter(new ct(_)), A.TextSize = G, A.Padding = this.DataLabelsPadding;
        let H = A.Measure(this.DataLabelsPaint), x = this.GetLabelPosition(
          R,
          I,
          m.uw,
          V,
          H.Clone(),
          this.DataLabelsPosition,
          this.SeriesProperties,
          _.PrimaryValue > this.Pivot,
          a.Clone(),
          r.Clone()
        );
        this.DataLabelsTranslate != null && (A.TranslateTransform = new B(H.Width * this.DataLabelsTranslate.X, H.Height * this.DataLabelsTranslate.Y)), A.X = x.X, A.Y = x.Y;
      }
      this.OnPointMeasured(_);
    }
    S.CollectPoints(
      this.everFetched,
      t.View,
      o,
      h,
      this.SoftDeleteOrDisposePoint.bind(this)
    );
  }
  GetRequestedSecondaryOffset() {
    return 0.5;
  }
  SetDefaultPointTransitions(e) {
    let t = e.Context.Chart, i = e.Context.Visual;
    L.TransitionateProperties(
      i,
      "X",
      "Width",
      "Y",
      "Height"
    ).WithAnimationBuilder((s) => s.WithDuration(this.AnimationsSpeed ?? t.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? t.EasingFunction)).CompleteCurrentTransitions();
  }
  SoftDeleteOrDisposePoint(e, t, i) {
    let s = e.Context.Visual;
    if (s == null)
      return;
    if (this.DataFactory == null)
      throw new u.Exception("Data provider not found");
    if (e.Context.Chart.Core.IsZoomingOrPanning) {
      s.CompleteTransition(), s.RemoveOnCompleted = !0, this.DataFactory.DisposePoint(e);
      return;
    }
    let r = t.ToPixels(this.pivot), h = i.ToPixels(e.SecondaryValue);
    s.X = h, s.Y = r, s.Height = 0, s.RemoveOnCompleted = !0, this.DataFactory.DisposePoint(e);
    let o = e.Context.Label;
    o != null && (o.TextSize = 1, o.RemoveOnCompleted = !0);
  }
}
class Ga extends Ks {
  constructor(t, i, s, a, r = !1) {
    super(D.Polar | D.PolarLine | (r ? D.Stacked : 0) | D.Sketch | D.PrefersXStrategyTooltips);
    n(this, "_fillPathHelperDictionary", new u.Dictionary());
    n(this, "_strokePathHelperDictionary", new u.Dictionary());
    n(this, "_lineSmoothness", 0.65);
    n(this, "_geometrySize", 14);
    n(this, "_enableNullSplitting", !0);
    n(this, "_geometryFill");
    n(this, "_geometryStroke");
    n(this, "_stroke", null);
    n(this, "_fill", null);
    n(this, "_scalesAngleAt", 0);
    n(this, "_scalesRadiusAt", 0);
    n(this, "_isClosed", !0);
    n(this, "_labelsPosition", 0);
    n(this, "_visualPointFactory");
    n(this, "_pathGeometryFactory");
    n(this, "_visualFactory");
    n(this, "_labelFactory");
    this._visualPointFactory = a, this._pathGeometryFactory = s, this._visualFactory = t, this._labelFactory = i, this.DataPadding = new B(1, 1.5);
  }
  get Stroke() {
    return this._stroke;
  }
  set Stroke(t) {
    this.SetPaintProperty(new u.Ref(() => this._stroke, (i) => this._stroke = i), t, !0, "Stroke");
  }
  get Fill() {
    return this._fill;
  }
  set Fill(t) {
    this.SetPaintProperty(new u.Ref(() => this._fill, (i) => this._fill = i), t, void 0, "Fill");
  }
  get GeometrySize() {
    return this._geometrySize;
  }
  set GeometrySize(t) {
    this.SetProperty(new u.Ref(() => this._geometrySize, (i) => this._geometrySize = i), t, "GeometrySize");
  }
  get ScalesAngleAt() {
    return this._scalesAngleAt;
  }
  set ScalesAngleAt(t) {
    this.SetProperty(new u.Ref(() => this._scalesAngleAt, (i) => this._scalesAngleAt = i), t, "ScalesAngleAt");
  }
  get ScalesRadiusAt() {
    return this._scalesRadiusAt;
  }
  set ScalesRadiusAt(t) {
    this.SetProperty(new u.Ref(() => this._scalesRadiusAt, (i) => this._scalesRadiusAt = i), t, "ScalesRadiusAt");
  }
  get LineSmoothness() {
    return this._lineSmoothness;
  }
  set LineSmoothness(t) {
    let i = t;
    t > 1 && (i = 1), t < 0 && (i = 0), this.SetProperty(new u.Ref(() => this._lineSmoothness, (s) => this._lineSmoothness = s), i, "LineSmoothness");
  }
  get EnableNullSplitting() {
    return this._enableNullSplitting;
  }
  set EnableNullSplitting(t) {
    this.SetProperty(new u.Ref(() => this._enableNullSplitting, (i) => this._enableNullSplitting = i), t, "EnableNullSplitting");
  }
  get GeometryFill() {
    return this._geometryFill;
  }
  set GeometryFill(t) {
    this.SetPaintProperty(new u.Ref(() => this._geometryFill, (i) => this._geometryFill = i), t, void 0, "GeometryFill");
  }
  get GeometryStroke() {
    return this._geometryStroke;
  }
  set GeometryStroke(t) {
    this.SetPaintProperty(new u.Ref(() => this._geometryStroke, (i) => this._geometryStroke = i), t, !0, "GeometryStroke");
  }
  get IsClosed() {
    return this._isClosed;
  }
  set IsClosed(t) {
    this.SetProperty(new u.Ref(() => this._isClosed, (i) => this._isClosed = i), t, "IsClosed");
  }
  get DataLabelsPosition() {
    return this._labelsPosition;
  }
  set DataLabelsPosition(t) {
    this.SetProperty(new u.Ref(() => this._labelsPosition, (i) => this._labelsPosition = i), t, "DataLabelsPosition");
  }
  Invalidate(t) {
    let i, s, a = t, r = a.AngleAxes[this.ScalesAngleAt], h = a.RadiusAxes[this.ScalesRadiusAt], o = a.DrawMarginLocation.Clone(), l = a.DrawMarginSize.Clone(), c = new Rt(
      o.Clone(),
      l.Clone(),
      r,
      h,
      a.InnerRadius,
      a.InitialRotation,
      a.TotalAnge
    ), p = this._geometrySize, m = p / 2;
    this.Stroke?.StrokeThickness;
    let P = this.Fetch(a).ToArray(), C = this._enableNullSplitting ? this.SplitEachNull(P, c) : [P], G = (this.SeriesProperties & D.Stacked) == D.Stacked ? a.SeriesContext.GetStackPosition(this, this.GetStackGroup()) : null, S = this.ZIndex == 0 ? this.SeriesId : this.ZIndex;
    G != null && (S = 1e3 - G.Position, this.Fill != null && (this.Fill.ZIndex = S), this.Stroke != null && (this.Stroke.ZIndex = S));
    let f = this.DataLabelsSize, y = 0, g = vt.For(this.everFetched);
    this._strokePathHelperDictionary.TryGetValue(t.Canvas.Sync, new u.Out(() => i, (w) => i = w)) || (i = new u.List(), this._strokePathHelperDictionary.SetAt(t.Canvas.Sync, i)), this._fillPathHelperDictionary.TryGetValue(t.Canvas.Sync, new u.Out(() => s, (w) => s = w)) || (s = new u.List(), this._fillPathHelperDictionary.SetAt(t.Canvas.Sync, s));
    for (const w of i)
      w.ClearCommands();
    for (const w of s)
      w.ClearCommands();
    let _ = this.DataLabelsRotation, b = !1, z = !1;
    (Math.floor(_) & 4294967295 & j.TangentAngle) != 0 && (_ -= j.TangentAngle, b = !0), (Math.floor(_) & 4294967295 & j.CotangentAngle) != 0 && (_ -= j.CotangentAngle, z = !0);
    for (const w of C) {
      let V, I;
      y >= s.length ? (V = this._pathGeometryFactory(), V.ClosingMethod = $t.NotClosed, I = this._pathGeometryFactory(), I.ClosingMethod = $t.NotClosed, s.Add(V), i.Add(I)) : (V = s[y], I = i[y]), this.Fill != null && (this.Fill.AddGeometryToPaintTask(a.Canvas, V), a.Canvas.AddDrawableTask(this.Fill), this.Fill.ZIndex = S + 0.1, this.Fill.SetClipRectangle(a.Canvas, new W(o.Clone(), l.Clone()))), this.Stroke != null && (this.Stroke.AddGeometryToPaintTask(a.Canvas, I), a.Canvas.AddDrawableTask(this.Stroke), this.Stroke.ZIndex = S + 0.2, this.Stroke.SetClipRectangle(a.Canvas, new W(o.Clone(), l.Clone())));
      for (const R of this.GetSpline(w, c, G)) {
        let X = 0;
        G != null && (X = G.GetStack(R.TargetPoint).Start);
        let A = c.ToPixels(R.TargetPoint.SecondaryValue, R.TargetPoint.PrimaryValue + X), H = A.X, x = A.Y, E = R.TargetPoint.Context.Visual;
        if (E == null) {
          let k = this._visualPointFactory();
          E = k;
          let N = c.CenterX - m, Y = c.CenterX - m, at = c.CenterX - m, Z = c.CenterY - m, tt = c.CenterY - m, Q = c.CenterY - m;
          k.Geometry.X = c.CenterX, k.Geometry.Y = c.CenterY, k.Geometry.Width = p, k.Geometry.Height = p, k.Bezier.Xi = N, k.Bezier.Yi = Z, k.Bezier.Xm = Y, k.Bezier.Ym = tt, k.Bezier.Xj = at, k.Bezier.Yj = Q, R.TargetPoint.Context.Visual = k, this.OnPointCreated(R.TargetPoint);
        }
        this.everFetched.Add(R.TargetPoint), this.GeometryFill?.AddGeometryToPaintTask(a.Canvas, E.Geometry), this.GeometryStroke?.AddGeometryToPaintTask(a.Canvas, E.Geometry), E.Bezier.Xi = R.X0, E.Bezier.Yi = R.Y0, E.Bezier.Xm = R.X1, E.Bezier.Ym = R.Y1, E.Bezier.Xj = R.X2, E.Bezier.Yj = R.Y2, this.Fill != null && V.AddLast(E.Bezier), this.Stroke != null && I.AddLast(E.Bezier), E.Geometry.X = H - m, E.Geometry.Y = x - m, E.Geometry.Width = p, E.Geometry.Height = p, E.Geometry.RemoveOnCompleted = !1, E.FillPath = V, E.StrokePath = I;
        let F = p < 16 ? 16 : p, O;
        if (R.TargetPoint.Context.HoverArea instanceof gt ? O = R.TargetPoint.Context.HoverArea : R.TargetPoint.Context.HoverArea = O = new gt(), O.SetDimensions(H - F * 0.5, x - F * 0.5, F, F), g.Clean(R.TargetPoint), this.DataLabelsPaint != null) {
          let k = R.TargetPoint.Context.Label, N = _ + (b ? c.GetAngle(R.TargetPoint.SecondaryValue) - 90 : 0) + (z ? c.GetAngle(R.TargetPoint.SecondaryValue) : 0);
          if ((b || z) && (N + 90) % 360 > 180 && (N += 180), k == null) {
            let Z = this._labelFactory();
            Z.X = H - m, Z.Y = c.CenterY - m, Z.RotateTransform = N, L.TransitionateProperties(Z, "X", "Y").WithAnimationBuilder((tt) => tt.WithDuration(this.AnimationsSpeed ?? a.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? a.EasingFunction)), Z.CompleteTransition(), k = Z, R.TargetPoint.Context.Label = Z;
          }
          this.DataLabelsPaint.AddGeometryToPaintTask(a.Canvas, k), k.Text = this.DataLabelsFormatter(new ct(R.TargetPoint)), k.TextSize = f, k.Padding = this.DataLabelsPadding, k.RotateTransform = N;
          let Y = Math.sqrt(Math.pow(A.X - c.CenterX, 2) + Math.pow(A.Y - c.CenterY, 2)), at = this.GetLabelPolarPosition(
            c.CenterX,
            c.CenterY,
            Y,
            c.GetAngle(R.TargetPoint.SecondaryValue),
            k.Measure(this.DataLabelsPaint),
            this.GeometrySize,
            this.DataLabelsPosition
          );
          k.X = at.X, k.Y = at.Y;
        }
        this.OnPointMeasured(R.TargetPoint);
      }
      this.GeometryFill != null && (a.Canvas.AddDrawableTask(this.GeometryFill), this.GeometryFill.SetClipRectangle(a.Canvas, new W(o.Clone(), l.Clone())), this.GeometryFill.ZIndex = S + 0.3), this.GeometryStroke != null && (a.Canvas.AddDrawableTask(this.GeometryStroke), this.GeometryStroke.SetClipRectangle(a.Canvas, new W(o.Clone(), l.Clone())), this.GeometryStroke.ZIndex = S + 0.4), y++;
    }
    for (; y > s.length; ) {
      let w = s.length - 1, V = s[w];
      this.Fill?.RemoveGeometryFromPainTask(a.Canvas, V), s.RemoveAt(w);
      let I = i.length - 1, R = i[I];
      this.Stroke?.RemoveGeometryFromPainTask(a.Canvas, R), i.RemoveAt(I);
    }
    this.DataLabelsPaint != null && (a.Canvas.AddDrawableTask(this.DataLabelsPaint), this.DataLabelsPaint.ZIndex = S + 0.5), g.CollectPointsForPolar(this.everFetched, a.View, c, this.SoftDeleteOrDisposePoint.bind(this));
  }
  GetBounds(t, i, s) {
    if (this.DataFactory == null)
      throw new u.Exception("A data provider is required");
    let a = this.DataFactory.GetCartesianBounds(t, this, i, s);
    if (a.HasData)
      return a;
    let r = a.Bounds, o = L.GetTickForPolar(s, t, r.VisiblePrimaryBounds).Value * this.DataPadding.Y;
    r.VisiblePrimaryBounds.Delta == 0 && (o = 0.1 * (r.VisiblePrimaryBounds.Min == 0 ? 1 : r.VisiblePrimaryBounds.Min) * this.DataPadding.Y);
    let l = this.GeometrySize * 0.5 + (this.Stroke?.StrokeThickness ?? 0);
    return new Yt(
      new Ot().Init(
        {
          SecondaryBounds: new $().Init(
            {
              Max: r.SecondaryBounds.Max,
              Min: r.SecondaryBounds.Min,
              MinDelta: r.SecondaryBounds.MinDelta,
              PaddingMax: 1,
              PaddingMin: 0,
              RequestedGeometrySize: l
            }
          ),
          PrimaryBounds: new $().Init(
            {
              Max: r.PrimaryBounds.Max,
              Min: r.PrimaryBounds.Min,
              MinDelta: r.PrimaryBounds.MinDelta,
              PaddingMax: o,
              PaddingMin: o,
              RequestedGeometrySize: l
            }
          ),
          VisibleSecondaryBounds: new $().Init(
            {
              Max: r.VisibleSecondaryBounds.Max,
              Min: r.VisibleSecondaryBounds.Min
            }
          ),
          VisiblePrimaryBounds: new $().Init(
            {
              Max: r.VisiblePrimaryBounds.Max,
              Min: r.VisiblePrimaryBounds.Min
            }
          )
        }
      ),
      !1
    );
  }
  GetMiniatresSketch() {
    let t = new u.List();
    return this.GeometryFill != null ? t.Add(this.BuildMiniatureSchedule(this.GeometryFill, this._visualFactory())) : this.Fill != null && t.Add(this.BuildMiniatureSchedule(this.Fill, this._visualFactory())), this.GeometryStroke != null ? t.Add(this.BuildMiniatureSchedule(this.GeometryStroke, this._visualFactory())) : this.Stroke != null && t.Add(this.BuildMiniatureSchedule(this.Stroke, this._visualFactory())), new zt().Init(
      {
        Height: this.MiniatureShapeSize,
        Width: this.MiniatureShapeSize,
        PaintSchedules: t
      }
    );
  }
  MiniatureEquals(t) {
    if (t instanceof Qt) {
      const i = t;
      return this.Name == t.Name && this.Fill == i.Fill && this.Stroke == i.Stroke;
    }
    return !1;
  }
  GetSpline(t, i, s) {
    const a = function* (r, h, o) {
      if (r.length == 0)
        return;
      let l = B.Empty.Clone(), c = B.Empty.Clone(), p = B.Empty.Clone(), m = B.Empty.Clone();
      for (let P = 0; P < r.length; P++) {
        let C = this.IsClosed && r.length > 3, G = P + 1 - r.length, S = P + 2 - r.length, f = r[P - 1 < 0 ? C ? r.length - 1 : 0 : P - 1], y = r[P], g = r[P + 1 > r.length - 1 ? C ? G : r.length - 1 : P + 1], _ = r[P + 2 > r.length - 1 ? C ? S : r.length - 1 : P + 2];
        l = h.ToPixels(f.SecondaryValue, f.PrimaryValue), c = h.ToPixels(y.SecondaryValue, y.PrimaryValue), p = h.ToPixels(g.SecondaryValue, g.PrimaryValue), m = h.ToPixels(_.SecondaryValue, _.PrimaryValue);
        let b = 0, z = 0, w = 0, V = 0;
        o != null && (b = h.ToPixels(0, o.GetStack(f).Start).Y, z = h.ToPixels(0, o.GetStack(y).Start).Y, w = h.ToPixels(0, o.GetStack(g).Start).Y, V = h.ToPixels(0, o.GetStack(_).Start).Y);
        let I = (l.X + c.X) / 2, R = (l.Y + b + c.Y + z) / 2, X = (c.X + p.X) / 2, A = (c.Y + z + p.Y + w) / 2, H = (p.X + m.X) / 2, x = (p.Y + w + m.Y + V) / 2, E = Math.sqrt((c.X - l.X) * (c.X - l.X) + (c.Y + z - l.Y + b) * (c.Y + z - l.Y + b)), F = Math.sqrt((p.X - c.X) * (p.X - c.X) + (p.Y + w - c.Y + z) * (p.Y + w - c.Y + z)), O = Math.sqrt((m.X - p.X) * (m.X - p.X) + (m.Y + V - p.Y + w) * (m.Y + V - p.Y + w)), k = E / (E + F), N = F / (F + O);
        Number.isNaN(k) && (k = 0), Number.isNaN(N) && (N = 0);
        let Y = I + (X - I) * k, at = R + (A - R) * k, Z = X + (H - X) * N, tt = A + (x - A) * N, Q = Y + (X - Y) * this._lineSmoothness + c.X - Y, st = at + (A - at) * this._lineSmoothness + c.Y + z - at, St = Z + (X - Z) * this._lineSmoothness + p.X - Z, ne = tt + (A - tt) * this._lineSmoothness + p.Y + w - tt, At = 0, ae = 0;
        P == 0 ? (At = c.X, ae = c.Y + z) : (At = Q, ae = st), yield new qs(r[P]).Init(
          {
            X0: At,
            Y0: ae,
            X1: St,
            Y1: ne,
            X2: p.X,
            Y2: p.Y
          }
        );
      }
    }.bind(this);
    return u.EnumerableFrom(() => a(t, i, s));
  }
  SetDefaultPointTransitions(t) {
    let i = t.Context.Chart, s = t.Context.Visual;
    L.TransitionateProperties(
      s.Geometry,
      "X",
      "Y",
      "Width",
      "Height"
    ).WithAnimationBuilder((a) => a.WithDuration(this.AnimationsSpeed ?? i.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? i.EasingFunction)).CompleteCurrentTransitions(), L.TransitionateProperties(
      s.Bezier,
      "Xi",
      "Yi",
      "Xm",
      "Ym",
      "Xj",
      "Yj"
    ).WithAnimationBuilder((a) => a.WithDuration(this.AnimationsSpeed ?? i.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? i.EasingFunction)).CompleteCurrentTransitions();
  }
  SoftDeleteOrDisposePoint(t, i) {
    let s = t.Context.Visual;
    if (s == null)
      return;
    if (this.DataFactory == null)
      throw new u.Exception("Data provider not found");
    let a = i.ToPixelsFromCharPoint(t), r = a.X, h = a.Y;
    s.Geometry.X = r, s.Geometry.Y = h, s.Geometry.Height = 0, s.Geometry.Width = 0, s.Geometry.RemoveOnCompleted = !0, this.DataFactory.DisposePoint(t);
    let o = t.Context.Label;
    o != null && (o.TextSize = 1, o.RemoveOnCompleted = !0);
  }
  SoftDeleteOrDispose(t) {
    let i = t.Core, s = new Rt(
      i.DrawMarginLocation.Clone(),
      i.DrawMarginSize.Clone(),
      i.AngleAxes[this.ScalesAngleAt],
      i.RadiusAxes[this.ScalesRadiusAt],
      i.InnerRadius,
      i.InitialRotation,
      i.TotalAnge
    ), a = new u.List();
    for (const h of this.everFetched)
      h.Context.Chart == t && (this.SoftDeleteOrDisposePoint(h, s), a.Add(h));
    for (const h of this.GetPaintTasks())
      h != null && i.Canvas.RemovePaintTask(h);
    for (const h of a)
      this.everFetched.Remove(h);
    let r = t.CoreCanvas;
    if (this.Fill != null)
      for (const h of this._fillPathHelperDictionary)
        for (const o of h.Value)
          this.Fill.RemoveGeometryFromPainTask(r, o);
    if (this.Stroke != null)
      for (const h of this._strokePathHelperDictionary)
        for (const o of h.Value)
          this.Stroke.RemoveGeometryFromPainTask(r, o);
    this.GeometryFill != null && r.RemovePaintTask(this.GeometryFill), this.GeometryStroke != null && r.RemovePaintTask(this.GeometryStroke), this.OnVisibilityChanged();
  }
  GetPaintTasks() {
    return [this.Stroke, this.Fill, this._geometryFill, this._geometryStroke, this.DataLabelsPaint, this.hoverPaint];
  }
  GetLabelPolarPosition(t, i, s, a, r, h, o) {
    let l = Math.PI / 180, c = 0;
    switch (o) {
      case Ct.End:
        c = a, s += Math.sqrt(Math.pow(r.Width + h * 0.5, 2) + Math.pow(r.Height + h * 0.5, 2)) * 0.5;
        break;
      case Ct.Start:
        c = a, s -= Math.sqrt(Math.pow(r.Width + h * 0.5, 2) + Math.pow(r.Height + h * 0.5, 2)) * 0.5;
        break;
      case Ct.Outer:
        c = a, s *= 2;
        break;
      case Ct.Middle:
        c = a;
        break;
      case Ct.ChartCenter:
        return new B(t, i);
    }
    return c %= 360, c < 0 && (c += 360), c *= l, new B(
      t + Math.cos(c) * s,
      i + Math.sin(c) * s
    );
  }
  SplitEachNull(t, i) {
    const s = function* (a, r) {
      let h = new u.List(a.length);
      for (const o of a) {
        if (o.IsEmpty) {
          if (o.Context.Visual instanceof Dn) {
            const l = o.Context.Visual;
            let c = r.ToPixelsFromCharPoint(o), p = c.X, m = c.Y, P = this._geometrySize, C = P / 2;
            this.Stroke?.StrokeThickness, l.Geometry.X = p - C, l.Geometry.Y = m - C, l.Geometry.Width = P, l.Geometry.Height = P, l.Geometry.RemoveOnCompleted = !0, o.Context.Visual = null;
          }
          h.length > 0 && (yield h.ToArray()), h = new u.List(a.length);
          continue;
        }
        h.Add(o);
      }
      h.length > 0 && (yield h.ToArray());
    }.bind(this);
    return u.EnumerableFrom(() => s(t, i));
  }
}
class Fa extends Ds {
  constructor(e, t, i, s) {
    super(e, t, i, s, !0), this.GeometryFill = null, this.GeometryStroke = null, this.GeometrySize = 0;
  }
}
class Ra extends aa {
  constructor(t, i) {
    super(t, i, !0);
    n(this, "_stackGroup", 0);
  }
  get StackGroup() {
    return this._stackGroup;
  }
  set StackGroup(t) {
    this._stackGroup = t, this.OnPropertyChanged("StackGroup");
  }
  GetStackGroup() {
    return this._stackGroup;
  }
}
class za extends ra {
  constructor(t, i) {
    super(t, i, !0);
    n(this, "_stackGroup", 0);
  }
  get StackGroup() {
    return this._stackGroup;
  }
  set StackGroup(t) {
    this._stackGroup = t, this.OnPropertyChanged("StackGroup");
  }
  GetStackGroup() {
    return this._stackGroup;
  }
}
class Ea extends tn {
  constructor(e, t, i, s) {
    super(e, t, i, s, !0), this.GeometryFill = null, this.GeometryStroke = null, this.GeometrySize = 0;
  }
}
const rn = class extends Ks {
  constructor(t, i, s, a = !1, r = !1) {
    super(D.PieSeries | D.Stacked | (a ? D.Gauge : 0) | (r ? D.GaugeFill : 0) | D.Solid);
    n(this, "_stroke", null);
    n(this, "_fill", null);
    n(this, "_pushout", 0);
    n(this, "_innerRadius", 0);
    n(this, "_maxOuterRadius", 1);
    n(this, "_hoverPushout", 20);
    n(this, "_innerPadding", 0);
    n(this, "_outerPadding", 0);
    n(this, "_maxRadialColW", 17976931348623157e292);
    n(this, "_cornerRadius", 0);
    n(this, "_radialAlign", oe.Outer);
    n(this, "_invertedCornerRadius", !1);
    n(this, "_isFillSeries", !1);
    n(this, "_labelsPosition", Ct.Middle);
    n(this, "_visualFactory");
    n(this, "_labelFactory");
    n(this, "_miniatureGeometryFactory");
    this._visualFactory = t, this._labelFactory = i, this._miniatureGeometryFactory = s;
  }
  get Stroke() {
    return this._stroke;
  }
  set Stroke(t) {
    this.SetPaintProperty(new u.Ref(() => this._stroke, (i) => this._stroke = i), t, !0, "Stroke");
  }
  get Fill() {
    return this._fill;
  }
  set Fill(t) {
    this.SetPaintProperty(new u.Ref(() => this._fill, (i) => this._fill = i), t, void 0, "Fill");
  }
  get Pushout() {
    return this._pushout;
  }
  set Pushout(t) {
    this.SetProperty(new u.Ref(() => this._pushout, (i) => this._pushout = i), t, "Pushout");
  }
  get InnerRadius() {
    return this._innerRadius;
  }
  set InnerRadius(t) {
    this.SetProperty(new u.Ref(() => this._innerRadius, (i) => this._innerRadius = i), t, "InnerRadius");
  }
  get MaxOuterRadius() {
    return this._maxOuterRadius;
  }
  set MaxOuterRadius(t) {
    this.SetProperty(new u.Ref(() => this._maxOuterRadius, (i) => this._maxOuterRadius = i), t, "MaxOuterRadius");
  }
  get HoverPushout() {
    return this._hoverPushout;
  }
  set HoverPushout(t) {
    this.SetProperty(new u.Ref(() => this._hoverPushout, (i) => this._hoverPushout = i), t, "HoverPushout");
  }
  get RelativeInnerRadius() {
    return this._innerPadding;
  }
  set RelativeInnerRadius(t) {
    this.SetProperty(new u.Ref(() => this._innerPadding, (i) => this._innerPadding = i), t, "RelativeInnerRadius");
  }
  get RelativeOuterRadius() {
    return this._outerPadding;
  }
  set RelativeOuterRadius(t) {
    this.SetProperty(new u.Ref(() => this._outerPadding, (i) => this._outerPadding = i), t, "RelativeOuterRadius");
  }
  get MaxRadialColumnWidth() {
    return this._maxRadialColW;
  }
  set MaxRadialColumnWidth(t) {
    this.SetProperty(new u.Ref(() => this._maxRadialColW, (i) => this._maxRadialColW = i), t, "MaxRadialColumnWidth");
  }
  get RadialAlign() {
    return this._radialAlign;
  }
  set RadialAlign(t) {
    this.SetProperty(new u.Ref(() => this._radialAlign, (i) => this._radialAlign = i), t, "RadialAlign");
  }
  get CornerRadius() {
    return this._cornerRadius;
  }
  set CornerRadius(t) {
    this.SetProperty(new u.Ref(() => this._cornerRadius, (i) => this._cornerRadius = i), t, "CornerRadius");
  }
  get InvertedCornerRadius() {
    return this._invertedCornerRadius;
  }
  set InvertedCornerRadius(t) {
    this.SetProperty(new u.Ref(() => this._invertedCornerRadius, (i) => this._invertedCornerRadius = i), t, "InvertedCornerRadius");
  }
  get IsFillSeries() {
    return this._isFillSeries;
  }
  set IsFillSeries(t) {
    this.SetProperty(new u.Ref(() => this._isFillSeries, (i) => this._isFillSeries = i), t, "IsFillSeries");
  }
  get DataLabelsPosition() {
    return this._labelsPosition;
  }
  set DataLabelsPosition(t) {
    this.SetProperty(new u.Ref(() => this._labelsPosition, (i) => this._labelsPosition = i), t, "DataLabelsPosition");
  }
  Invalidate(t) {
    let i = t, s = i.DrawMarginLocation.Clone(), a = i.DrawMarginSize.Clone(), r = a.Width < a.Height ? a.Width : a.Height, h = i.PushoutBounds.Max, o = this.Pushout, l = this.InnerRadius, c = this.MaxOuterRadius;
    r = r - (this.Stroke?.StrokeThickness ?? 0) * 2 - h * 2, r *= c;
    let p = i.View, m = Math.trunc(p.InitialRotation), P = p.MaxAngle, C = p.Total, G = this.ZIndex == 0 ? this.SeriesId : this.ZIndex;
    this.Fill != null && (this.Fill.ZIndex = G + 0.1, this.Fill.SetClipRectangle(i.Canvas, new W(s.Clone(), a.Clone())), i.Canvas.AddDrawableTask(this.Fill)), this.Stroke != null && (this.Stroke.ZIndex = G + 0.2, this.Stroke.SetClipRectangle(i.Canvas, new W(s.Clone(), a.Clone())), i.Canvas.AddDrawableTask(this.Stroke)), this.DataLabelsPaint != null && (this.DataLabelsPaint.ZIndex = 1e3 + G + 0.3, i.Canvas.AddDrawableTask(this.DataLabelsPaint));
    let S = s.X + a.Width * 0.5, f = s.Y + a.Height * 0.5, y = this.DataLabelsSize, g = i.SeriesContext.GetStackPosition(this, this.GetStackGroup());
    if (g == null)
      throw new u.Exception("Unexpected null stacker");
    let _ = vt.For(this.everFetched), b = this.Fetch(i).ToArray(), z = l, w = this.RelativeInnerRadius, V = this.RelativeOuterRadius, I = this.MaxRadialColumnWidth, R = this.CornerRadius, X = r, A = X - (X - 2 * l) * (b.length - 1) / b.length - V * 2;
    if (A * 0.5 - z > I) {
      let N = A * 0.5 - z - I;
      switch (this.RadialAlign) {
        case oe.Outer:
          V = 0, w = N;
          break;
        case oe.Center:
          V = N * 0.5, w = N * 0.5;
          break;
        case oe.Inner:
          V = N, w = 0;
          break;
        default:
          throw new u.NotImplementedException(`The alignment ${this.RadialAlign} is not supported.`);
      }
    }
    let H = this.DataLabelsRotation, x = !1, E = !1;
    (Math.floor(H) & 4294967295 & j.TangentAngle) != 0 && (H -= j.TangentAngle, x = !0), (Math.floor(H) & 4294967295 & j.CotangentAngle) != 0 && (H -= j.CotangentAngle, E = !0);
    let F = 1, O = p.IsClockwise;
    for (const N of b) {
      let Y = N.Context.Visual;
      if (N.IsEmpty) {
        Y != null && (Y.CenterX = S, Y.CenterY = f, Y.X = S, Y.Y = f, Y.Width = 0, Y.Height = 0, Y.SweepAngle = 0, Y.StartAngle = m, Y.PushOut = 0, Y.InnerRadius = 0, Y.CornerRadius = 0, Y.RemoveOnCompleted = !0, N.Context.Visual = null);
        let J = r;
        z = (J - (J - 2 * l) * (b.length - F) / b.length - V * 2 + V * 2) * 0.5, F++;
        continue;
      }
      let at = g.GetStack(N), Z = at.Start, tt = C ?? at.Total, Q = 0, st = 0;
      if (tt == 0 ? (Q = 0, st = 0) : (Q = Z / tt * P, st = (Z + N.PrimaryValue) / tt * P - Q, O || (Q = P - Q - st)), this.IsFillSeries && (Q = 0, st = P - 0.1), Y == null) {
        let J = this._visualFactory();
        J.CenterX = S, J.CenterY = f, J.X = S, J.Y = f, J.Width = 0, J.Height = 0, J.StartAngle = i.IsFirstDraw ? m : Q + m, J.SweepAngle = 0, J.PushOut = 0, J.InnerRadius = 0, J.CornerRadius = 0, Y = J, N.Context.Visual = Y, this.OnPointCreated(N), this.everFetched.Add(N);
      }
      this.Fill?.AddGeometryToPaintTask(i.Canvas, Y), this.Stroke?.AddGeometryToPaintTask(i.Canvas, Y);
      let St = Y;
      z += w;
      let ne = r, At = ne - (ne - 2 * l) * (b.length - F) / b.length - V * 2, ae = (a.Width - At) * 0.5;
      St.CenterX = S, St.CenterY = f, St.X = s.X + ae, St.Y = s.Y + (a.Height - At) * 0.5, St.Width = At, St.Height = At, St.InnerRadius = z, St.PushOut = o, St.StartAngle = Q + m, St.SweepAngle = st, St.CornerRadius = R, St.InvertedCornerRadius = this.InvertedCornerRadius, St.RemoveOnCompleted = !1, Q + m == m && st == 360 && (St.SweepAngle = 359.99);
      let Ys;
      if (N.Context.HoverArea instanceof dn ? Ys = N.Context.HoverArea : N.Context.HoverArea = Ys = new dn(), Ys.SetDimensions(S, f, Q + m, Q + m + st, ne * 0.5), _.Clean(N), this.DataLabelsPaint != null && N.PrimaryValue >= 0) {
        let J = N.Context.Label, Os = Q + m + st * 0.5, vs = H + (x ? Os - 90 : 0) + (E ? Os : 0);
        if ((x || E) && (vs + 90) % 360 > 180 && (vs += 180), J == null) {
          let ut = this._labelFactory();
          ut.X = S, ut.Y = f, ut.RotateTransform = vs, L.TransitionateProperties(ut, "X", "Y").WithAnimationBuilder((Tt) => Tt.WithDuration(this.AnimationsSpeed ?? i.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? i.EasingFunction)), ut.CompleteTransition(), J = ut, N.Context.Label = ut;
        }
        if (this.DataLabelsPaint.AddGeometryToPaintTask(i.Canvas, J), J.Text = this.DataLabelsFormatter(new ct(N)), J.TextSize = y, J.Padding = this.DataLabelsPadding, J.RotateTransform = vs, this.DataLabelsPosition == Ct.Start) {
          let ut = Q + m;
          ut %= 360, ut < 0 && (ut += 360);
          let Tt = 90;
          ut > 180 && (Tt = -90), J.HorizontalAlign = ut > 180 ? it.End : it.Start, J.RotateTransform = ut - Tt;
        }
        if (this.DataLabelsPosition == Ct.End) {
          let ut = Q + m + st;
          ut %= 360, ut < 0 && (ut += 360);
          let Tt = 90;
          ut > 180 && (Tt = -90), J.HorizontalAlign = ut > 180 ? it.Start : it.End, J.RotateTransform = ut - Tt;
        }
        if (this.DataLabelsPosition == Ct.Outer) {
          let Tt = (Q + m + st * 0.5) % 360, Fn = Tt < 90 || Tt > 270 && Tt < 360;
          J.HorizontalAlign = J.HorizontalAlign = Fn ? it.Start : it.End;
        }
        let on = this.GetLabelPolarPosition(
          S,
          f,
          ((At + V * 2) * 0.5 + z) * 0.5,
          z,
          Q + m,
          st,
          J.Measure(this.DataLabelsPaint),
          this.DataLabelsPosition
        );
        J.X = on.X, J.Y = on.Y;
      }
      this.OnPointMeasured(N), z = (At + V * 2) * 0.5, F++;
    }
    let k = dt.MakeDefault();
    _.CollectPoints(this.everFetched, i.View, k, k, this.SoftDeleteOrDisposePoint.bind(this));
  }
  GetBounds(t) {
    return this.DataFactory.GetPieBounds(t, this).Bounds;
  }
  GetMiniatresSketch() {
    let t = new u.List();
    return this.Fill != null && t.Add(this.BuildMiniatureSchedule(this.Fill, this._miniatureGeometryFactory())), this.Stroke != null && t.Add(this.BuildMiniatureSchedule(this.Stroke, this._miniatureGeometryFactory())), new zt().Init(
      {
        Height: this.MiniatureShapeSize,
        Width: this.MiniatureShapeSize,
        PaintSchedules: t
      }
    );
  }
  GetStackGroup() {
    return 0;
  }
  GetPaintTasks() {
    return [this._fill, this._stroke, this.DataLabelsPaint, this.hoverPaint];
  }
  WhenPointerEnters(t) {
    super.WhenPointerEnters(t);
    let i = t.Context.Visual;
    i == null || i.MainGeometry == null || (i.PushOut = this.HoverPushout);
  }
  WhenPointerLeaves(t) {
    super.WhenPointerLeaves(t);
    let i = t.Context.Visual;
    i == null || i.MainGeometry == null || (i.PushOut = this.Pushout);
  }
  MiniatureEquals(t) {
    if (t instanceof rn) {
      const i = t;
      return this.Name == i.Name && this.Fill == i.Fill && this.Stroke == i.Stroke;
    }
    return !1;
  }
  SetDefaultPointTransitions(t) {
    if (this.IsFillSeries)
      return;
    (this.SeriesProperties & D.Gauge) == D.Gauge;
    let i = t.Context.Chart, s = t.Context.Visual;
    L.TransitionateProperties(
      s,
      "StartAngle",
      "SweepAngle",
      "PushOut"
    ).WithAnimationBuilder((a) => a.WithDuration(this.AnimationsSpeed ?? i.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? i.EasingFunction)).CompleteCurrentTransitions(), (this.SeriesProperties & D.Gauge) == 0 && L.TransitionateProperties(
      s,
      "CenterX",
      "CenterY",
      "X",
      "Y",
      "InnerRadius",
      "Width",
      "Height"
    ).WithAnimationBuilder((a) => a.WithDuration(this.AnimationsSpeed ?? i.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? i.EasingFunction)).CompleteCurrentTransitions();
  }
  SoftDeleteOrDisposePoint(t, i, s) {
    let a = t.Context.Visual;
    if (a == null)
      return;
    if (this.DataFactory == null)
      throw new u.Exception("Data provider not found");
    a.StartAngle += a.SweepAngle, a.SweepAngle = 0, a.CornerRadius = 0, a.RemoveOnCompleted = !0, this.DataFactory.DisposePoint(t);
    let r = t.Context.Label;
    r != null && (r.TextSize = 1, r.RemoveOnCompleted = !0);
  }
  GetLabelPolarPosition(t, i, s, a, r, h, o, l) {
    let c = Math.PI / 180, p = 0;
    switch (l) {
      case Ct.End:
        p = r + h;
        break;
      case Ct.Start:
        p = r;
        break;
      case Ct.Outer:
        p = r + h * 0.5, s += s - a;
        break;
      case Ct.Middle:
        p = r + h * 0.5;
        break;
      case Ct.ChartCenter:
        return new B(t, i);
    }
    return p *= c, new B(
      t + Math.cos(p) * s,
      i + Math.sin(p) * s
    );
  }
  SoftDeleteOrDispose(t) {
    let i = t.Core, s = dt.MakeDefault(), a = new u.List();
    for (const r of this.everFetched)
      r.Context.Chart == t && (this.SoftDeleteOrDisposePoint(r, s, s), a.Add(r));
    for (const r of this.GetPaintTasks())
      r != null && i.Canvas.RemovePaintTask(r);
    for (const r of a)
      this.everFetched.Remove(r);
    this.OnVisibilityChanged();
  }
};
let Us = rn;
n(Us, "$meta_LiveChartsCore_IPieSeries", !0);
var si, ni, ai, ri, oi, li, hi, ui, di, ci, mi, Si, pi, Pi, gi, yi, Ci, _i, fi, wi;
class en {
  constructor(e, t, i) {
    n(this, "_everMeasuredElements", new u.HashSet());
    n(this, "_toDeleteElements", new u.HashSet());
    n(this, "_preserveFirstDraw", !1);
    n(this, "_updateThrottler");
    n(this, "_tooltipThrottler");
    n(this, "_panningThrottler");
    n(this, "_pointerPosition", new B(-10, -10).Clone());
    n(this, "_pointerPanningStartPosition", new B(-10, -10).Clone());
    n(this, "_pointerPanningPosition", new B(-10, -10).Clone());
    n(this, "_pointerPreviousPanningPosition", new B(-10, -10).Clone());
    n(this, "_isPanning", !1);
    n(this, "_isPointerIn", !1);
    n(this, "_activePoints", new u.Dictionary());
    n(this, "_previousSize", U.Empty.Clone());
    n(this, "Measuring", new u.Event());
    n(this, "UpdateStarted", new u.Event());
    n(this, "UpdateFinished", new u.Event());
    n(this, "PointerDown", new u.Event());
    n(this, "PointerMove", new u.Event());
    n(this, "PointerUp", new u.Event());
    n(this, "PointerLeft", new u.Event());
    n(this, "PanGesture", new u.Event());
    T(this, si, new Pa());
    T(this, ni, {});
    T(this, ai, {});
    T(this, ri, !1);
    T(this, oi, !0);
    T(this, li, void 0);
    T(this, hi, new Hs([]));
    T(this, ui, U.Empty.Clone());
    T(this, di, B.Empty.Clone());
    T(this, ci, U.Empty.Clone());
    T(this, mi, 0);
    T(this, Si, void 0);
    T(this, pi, 0);
    T(this, Pi, 0);
    T(this, gi, void 0);
    T(this, yi, u.TimeSpan.Empty.Clone());
    T(this, Ci, void 0);
    T(this, _i, []);
    T(this, fi, 0);
    T(this, wi, []);
    this.Canvas = e, e.Validated.Add(this.OnCanvasValidated, this), this.EasingFunction = Nt.QuadraticOut, j.IsConfigured || j.Configure(t), this._updateThrottler = i.DesignerMode ? new Zt(() => Promise.resolve(), u.TimeSpan.FromMilliseconds(50)) : new Zt(this.UpdateThrottlerUnlocked.bind(this), u.TimeSpan.FromMilliseconds(50)), this._updateThrottler.ThrottlerTimeSpan = i.UpdaterThrottler, this.PointerDown.Add(this.Chart_PointerDown, this), this.PointerMove.Add(this.Chart_PointerMove, this), this.PointerUp.Add(this.Chart_PointerUp, this), this.PointerLeft.Add(this.Chart_PointerLeft, this), this._tooltipThrottler = new Zt(this.TooltipThrottlerUnlocked.bind(this), u.TimeSpan.FromMilliseconds(10)), this._panningThrottler = new Zt(this.PanningThrottlerUnlocked.bind(this), u.TimeSpan.FromMilliseconds(30));
  }
  get ActualBounds() {
    return M(this, si);
  }
  set ActualBounds(e) {
    v(this, si, e);
  }
  get MeasureWork() {
    return M(this, ni);
  }
  set MeasureWork(e) {
    v(this, ni, e);
  }
  get ThemeId() {
    return M(this, ai);
  }
  set ThemeId(e) {
    v(this, ai, e);
  }
  get IsLoaded() {
    return M(this, ri);
  }
  set IsLoaded(e) {
    v(this, ri, e);
  }
  get IsFirstDraw() {
    return M(this, oi);
  }
  set IsFirstDraw(e) {
    v(this, oi, e);
  }
  get Canvas() {
    return M(this, li);
  }
  set Canvas(e) {
    v(this, li, e);
  }
  get SeriesContext() {
    return M(this, hi);
  }
  set SeriesContext(e) {
    v(this, hi, e);
  }
  get ControlSize() {
    return M(this, ui);
  }
  set ControlSize(e) {
    v(this, ui, e);
  }
  get DrawMarginLocation() {
    return M(this, di);
  }
  set DrawMarginLocation(e) {
    v(this, di, e);
  }
  get DrawMarginSize() {
    return M(this, ci);
  }
  set DrawMarginSize(e) {
    v(this, ci, e);
  }
  get LegendPosition() {
    return M(this, mi);
  }
  set LegendPosition(e) {
    v(this, mi, e);
  }
  get Legend() {
    return M(this, Si);
  }
  set Legend(e) {
    v(this, Si, e);
  }
  get TooltipPosition() {
    return M(this, pi);
  }
  set TooltipPosition(e) {
    v(this, pi, e);
  }
  get TooltipFindingStrategy() {
    return M(this, Pi);
  }
  set TooltipFindingStrategy(e) {
    v(this, Pi, e);
  }
  get Tooltip() {
    return M(this, gi);
  }
  set Tooltip(e) {
    v(this, gi, e);
  }
  get AnimationsSpeed() {
    return M(this, yi);
  }
  set AnimationsSpeed(e) {
    v(this, yi, e);
  }
  get EasingFunction() {
    return M(this, Ci);
  }
  set EasingFunction(e) {
    v(this, Ci, e);
  }
  get VisualElements() {
    return M(this, _i);
  }
  set VisualElements(e) {
    v(this, _i, e);
  }
  get PreviousLegendPosition() {
    return M(this, fi);
  }
  set PreviousLegendPosition(e) {
    v(this, fi, e);
  }
  get PreviousSeriesAtLegend() {
    return M(this, wi);
  }
  set PreviousSeriesAtLegend(e) {
    v(this, wi, e);
  }
  Update(e = null) {
    if (e ?? (e = new An()), !(e.IsAutomaticUpdate && !this.View.AutoUpdateEnabled)) {
      if (this._updateThrottler.ThrottlerTimeSpan = this.View.UpdaterThrottler, !e.Throttling) {
        this._updateThrottler.ForceCall();
        return;
      }
      this._updateThrottler.Call();
    }
  }
  Load() {
    this.IsLoaded = !0, this.IsFirstDraw = !0, this.Update();
  }
  Unload() {
    this.IsLoaded = !1, this._everMeasuredElements.Clear(), this._toDeleteElements.Clear(), this._activePoints.Clear(), this.Canvas.Dispose();
  }
  ClearTooltipData() {
    if (this._activePoints.length != 0) {
      for (const e of this._activePoints.Keys.ToArray()) {
        let t = e;
        t.Context.Series.OnPointerLeft(t), this._activePoints.Remove(e);
      }
      this.Canvas.Invalidate();
    }
  }
  InvokePointerDown(e, t) {
    this.PointerDown.Invoke(e.Clone());
    let i = L.GetTooltipFindingStrategy(this.ChartSeries);
    for (const r of this.ChartSeries) {
      if (!r.RequiresFindClosestOnPointerDown)
        continue;
      let h = r.FindHitPoints(this, e.Clone(), i);
      !h.Any() || r.OnDataPointerDown(this.View, h, e.Clone());
    }
    let s = this.ChartSeries.SelectMany((r) => r.FindHitPoints(this, e.Clone(), i));
    this.View.OnDataPointerDown(s, e.Clone());
    let a = this.VisualElements.Cast().SelectMany((r) => r.IsHitBy(this, e.Clone()));
    this.View.OnVisualElementPointerDown(a, e.Clone());
  }
  InvokePointerMove(e) {
    this.PointerMove.Invoke(e.Clone());
  }
  InvokePointerUp(e, t) {
    this.PointerUp.Invoke(e.Clone());
  }
  InvokePointerLeft() {
    this.PointerLeft.Invoke();
  }
  InvokePanGestrue(e) {
    this.PanGesture.Invoke(e);
  }
  SetDrawMargin(e, t) {
    this.DrawMarginSize = new U().Init(
      {
        Width: e.Width - t.Left - t.Right,
        Height: e.Height - t.Top - t.Bottom
      }
    ), this.DrawMarginLocation = new B(t.Left, t.Top);
  }
  SetPreviousSize() {
    this._previousSize = this.ControlSize.Clone();
  }
  InvokeOnMeasuring() {
    this.Measuring.Invoke(this.View);
  }
  InvokeOnUpdateStarted() {
    this.SetPreviousSize(), this.UpdateStarted.Invoke(this.View);
  }
  InvokeOnUpdateFinished() {
    this.UpdateFinished.Invoke(this.View);
  }
  SizeChanged() {
    return this._previousSize.Width != this.ControlSize.Width || this._previousSize.Height != this.ControlSize.Height;
  }
  SeriesMiniatureChanged(e, t) {
    if (t == Xt.Hidden && this.PreviousLegendPosition == Xt.Hidden)
      return !1;
    if (t != this.PreviousLegendPosition || this.PreviousSeriesAtLegend.length != e.length)
      return !0;
    for (let i = 0; i < e.length; i++) {
      if (i + 1 > this.PreviousSeriesAtLegend.length)
        return !0;
      let s = this.PreviousSeriesAtLegend[i], a = e[i];
      if (!s.MiniatureEquals(a))
        return !0;
    }
    return !1;
  }
  UpdateThrottlerUnlocked() {
    return new Promise((e) => {
      this.View.InvokeOnUIThread(() => {
        this.Measure();
      }), e();
    });
  }
  UpdateBounds() {
    this.ActualBounds.Location = this.DrawMarginLocation.Clone(), this.ActualBounds.Size = this.DrawMarginSize.Clone(), this.IsFirstDraw && (L.TransitionateProperties(
      this.ActualBounds
    ).WithAnimationBuilder((e) => e.WithDuration(this.AnimationsSpeed).WithEasingFunction(this.EasingFunction)).CompleteCurrentTransitions(), this.Canvas.Trackers.Add(this.ActualBounds));
  }
  InitializeVisualsCollector() {
    this._toDeleteElements = new u.HashSet(this._everMeasuredElements);
  }
  AddVisual(e) {
    e.Invalidate(this), e.RemoveOldPaints(this.View), this._everMeasuredElements.Add(e), this._toDeleteElements.Remove(e);
  }
  RemoveVisual(e) {
    e.RemoveFromUI(this), this._everMeasuredElements.Remove(e), this._toDeleteElements.Remove(e);
  }
  CollectVisuals() {
    for (const e of this._toDeleteElements)
      ia(e) ? e.SoftDeleteOrDispose(this.View) : e.RemoveFromUI(this), this._everMeasuredElements.Remove(e);
    this._toDeleteElements = new u.HashSet();
  }
  DrawLegend(e) {
    if (this.Legend != null && (this.SeriesMiniatureChanged(e, this.LegendPosition) || this.SizeChanged()))
      if (ya(this.Legend)) {
        const t = this.Legend;
        t.Measure(this), (this.LegendPosition == Xt.Left || this.LegendPosition == Xt.Right) && (this.ControlSize = new U(this.ControlSize.Width - t.Size.Width, this.ControlSize.Height).Clone()), (this.LegendPosition == Xt.Top || this.LegendPosition == Xt.Bottom) && (this.ControlSize = new U(this.ControlSize.Width, this.ControlSize.Height - t.Size.Height).Clone()), this.Canvas.StartPoint = new B(0, 0), this.Legend.Draw(this), this.PreviousLegendPosition = this.LegendPosition, this.PreviousSeriesAtLegend = e;
        for (const i of this.PreviousSeriesAtLegend.Cast())
          i.PaintsChanged = !1;
        this._preserveFirstDraw = this.IsFirstDraw;
      } else {
        this.Legend.Draw(this), this.PreviousLegendPosition = this.LegendPosition, this.PreviousSeriesAtLegend = e;
        for (const t of this.PreviousSeriesAtLegend.Cast())
          t.PaintsChanged = !1;
        this._preserveFirstDraw = this.IsFirstDraw, this.SetPreviousSize(), this.Measure();
        return;
      }
  }
  TooltipThrottlerUnlocked() {
    return new Promise((e) => {
      this.View.InvokeOnUIThread(() => {
        {
          if (this._pointerPosition.X < this.DrawMarginLocation.X || this._pointerPosition.X > this.DrawMarginLocation.X + this.DrawMarginSize.Width || this._pointerPosition.Y < this.DrawMarginLocation.Y || this._pointerPosition.Y > this.DrawMarginLocation.Y + this.DrawMarginSize.Height)
            return;
          let t = this.FindHoveredPointsBy(this._pointerPosition.Clone());
          if (!t.Any()) {
            this.ClearTooltipData(), this.Tooltip?.Hide();
            return;
          }
          if (this._activePoints.length > 0 && t.All((s) => this._activePoints.ContainsKey(s)))
            return;
          let i = {};
          for (const s of t)
            s.Context.Series.OnPointerEnter(s), this._activePoints.SetAt(s, i);
          for (const s of this._activePoints.Keys.ToArray())
            this._activePoints.GetAt(s) != i && (s.Context.Series.OnPointerLeft(s), this._activePoints.Remove(s));
          this.TooltipPosition != Bt.Hidden && this.Tooltip?.Show(t, this), this.Canvas.Invalidate();
        }
      }), e();
    });
  }
  PanningThrottlerUnlocked() {
    return new Promise((e) => {
      this.View.InvokeOnUIThread(() => {
        let t;
        if (this instanceof Ft)
          t = this;
        else
          return;
        {
          let i = this._pointerPanningPosition.X - this._pointerPreviousPanningPosition.X, s = this._pointerPanningPosition.Y - this._pointerPreviousPanningPosition.Y;
          i == 0 && (i = this._pointerPanningStartPosition.X - this._pointerPanningPosition.X > 0 ? -0.01 : 0.01), s == 0 && (s = this._pointerPanningStartPosition.Y - this._pointerPanningPosition.Y > 0 ? -0.01 : 0.01), t.Pan(new B(i, s), this._isPanning), this._pointerPreviousPanningPosition = new B(this._pointerPanningPosition.X, this._pointerPanningPosition.Y);
        }
      }), e();
    });
  }
  OnCanvasValidated(e) {
    this.InvokeOnUpdateFinished();
  }
  Chart_PointerDown(e) {
    this._isPanning = !0, this._pointerPreviousPanningPosition = e.Clone(), this._pointerPanningStartPosition = e.Clone();
  }
  Chart_PointerMove(e) {
    this._pointerPosition = e.Clone(), this._isPointerIn = !0, this._tooltipThrottler.Call(), this._isPanning && (this._pointerPanningPosition = e.Clone(), this._panningThrottler.Call());
  }
  Chart_PointerLeft() {
    this._isPointerIn = !1;
  }
  Chart_PointerUp(e) {
    !this._isPanning || (this._isPanning = !1, this._pointerPanningPosition = e.Clone(), this._panningThrottler.Call());
  }
}
si = new WeakMap(), ni = new WeakMap(), ai = new WeakMap(), ri = new WeakMap(), oi = new WeakMap(), li = new WeakMap(), hi = new WeakMap(), ui = new WeakMap(), di = new WeakMap(), ci = new WeakMap(), mi = new WeakMap(), Si = new WeakMap(), pi = new WeakMap(), Pi = new WeakMap(), gi = new WeakMap(), yi = new WeakMap(), Ci = new WeakMap(), _i = new WeakMap(), fi = new WeakMap(), wi = new WeakMap();
class Ln extends ee {
  constructor() {
    super(...arguments);
    n(this, "_stroke", null);
    n(this, "_fill", null);
    n(this, "_xi");
    n(this, "_xj");
    n(this, "_yi");
    n(this, "_yj");
    n(this, "_scalesXAt", 0);
    n(this, "_scalesYAt", 0);
    n(this, "_zIndex");
    n(this, "_isVisible", !0);
    n(this, "PropertyChanged", new u.Event());
  }
  get Stroke() {
    return this._stroke;
  }
  set Stroke(t) {
    this.SetPaintProperty(new u.Ref(() => this._stroke, (i) => this._stroke = i), t, !0, "Stroke");
  }
  get Fill() {
    return this._fill;
  }
  set Fill(t) {
    this.SetPaintProperty(new u.Ref(() => this._fill, (i) => this._fill = i), t, void 0, "Fill");
  }
  get IsVisible() {
    return this._isVisible;
  }
  set IsVisible(t) {
    this.SetProperty(new u.Ref(() => this._isVisible, (i) => this._isVisible = i), t, "IsVisible");
  }
  get Xi() {
    return this._xi;
  }
  set Xi(t) {
    this.SetProperty(new u.Ref(() => this._xi, (i) => this._xi = i), t, "Xi");
  }
  get Xj() {
    return this._xj;
  }
  set Xj(t) {
    this.SetProperty(new u.Ref(() => this._xj, (i) => this._xj = i), t, "Xj");
  }
  get Yi() {
    return this._yi;
  }
  set Yi(t) {
    this.SetProperty(new u.Ref(() => this._yi, (i) => this._yi = i), t, "Yi");
  }
  get Yj() {
    return this._yj;
  }
  set Yj(t) {
    this.SetProperty(new u.Ref(() => this._yj, (i) => this._yj = i), t, "Yj");
  }
  get ScalesXAt() {
    return this._scalesXAt;
  }
  set ScalesXAt(t) {
    this.SetProperty(new u.Ref(() => this._scalesXAt, (i) => this._scalesXAt = i), t, "ScalesXAt");
  }
  get ScalesYAt() {
    return this._scalesYAt;
  }
  set ScalesYAt(t) {
    this.SetProperty(new u.Ref(() => this._scalesYAt, (i) => this._scalesYAt = i), t, "ScalesYAt");
  }
  get ZIndex() {
    return this._zIndex;
  }
  set ZIndex(t) {
    this.SetProperty(new u.Ref(() => this._zIndex, (i) => this._zIndex = i), t, "ZIndex");
  }
  GetPaintTasks() {
    return [this._stroke, this._fill];
  }
  OnPaintChanged(t) {
    super.OnPaintChanged(t), this.OnPropertyChanged(t);
  }
  OnPropertyChanged(t = null) {
    this.PropertyChanged.Invoke(this, new u.PropertyChangedEventArgs(t));
  }
}
n(Ln, "$meta_System_INotifyPropertyChanged", !0);
class Xa extends Ln {
  constructor(t) {
    super();
    n(this, "_sizedGeometryFactory");
    n(this, "_fillSizedGeometry");
    n(this, "_strokeSizedGeometry");
    this._sizedGeometryFactory = t;
  }
  Invalidate(t) {
    let i = t.DrawMarginLocation.Clone(), s = t.DrawMarginSize.Clone(), a = t, r = a.YAxes[this.ScalesYAt], h = a.XAxes[this.ScalesXAt], o = dt.Make(i.Clone(), s.Clone(), h), l = dt.Make(i.Clone(), s.Clone(), r), c = this.Xi == null ? i.X : o.ToPixels(this.Xi), p = this.Xj == null ? i.X + s.Width : o.ToPixels(this.Xj), m = this.Yi == null ? i.Y : l.ToPixels(this.Yi), P = this.Yj == null ? i.Y + s.Height : l.ToPixels(this.Yj);
    this.Fill != null && (this.Fill.ZIndex = this.ZIndex ?? -2.5, this._fillSizedGeometry == null && (this._fillSizedGeometry = this._sizedGeometryFactory(), this._fillSizedGeometry.X = c, this._fillSizedGeometry.Y = m, this._fillSizedGeometry.Width = p - c, this._fillSizedGeometry.Height = P - m, L.TransitionateProperties(
      this._fillSizedGeometry,
      "X",
      "Width",
      "Y",
      "Height"
    ).WithAnimationBuilder((C) => C.WithDuration(t.AnimationsSpeed).WithEasingFunction(t.EasingFunction)), this._fillSizedGeometry.CompleteTransition()), this._fillSizedGeometry.X = c, this._fillSizedGeometry.Y = m, this._fillSizedGeometry.Width = p - c, this._fillSizedGeometry.Height = P - m, this.Fill.SetClipRectangle(a.Canvas, new W(i.Clone(), s.Clone())), this.Fill.AddGeometryToPaintTask(t.Canvas, this._fillSizedGeometry), t.Canvas.AddDrawableTask(this.Fill)), this.Stroke != null && (this.Stroke.ZIndex = this.ZIndex ?? 0, this._strokeSizedGeometry == null && (this._strokeSizedGeometry = this._sizedGeometryFactory(), this._strokeSizedGeometry.X = c, this._strokeSizedGeometry.Y = m, this._strokeSizedGeometry.Width = p - c, this._strokeSizedGeometry.Height = P - m, L.TransitionateProperties(
      this._strokeSizedGeometry,
      "X",
      "Width",
      "Y",
      "Height"
    ).WithAnimationBuilder((C) => C.WithDuration(t.AnimationsSpeed).WithEasingFunction(t.EasingFunction)), this._strokeSizedGeometry.CompleteTransition()), this._strokeSizedGeometry.X = c, this._strokeSizedGeometry.Y = m, this._strokeSizedGeometry.Width = p - c, this._strokeSizedGeometry.Height = P - m, this.Stroke.SetClipRectangle(a.Canvas, new W(i.Clone(), s.Clone())), this.Stroke.AddGeometryToPaintTask(t.Canvas, this._strokeSizedGeometry), t.Canvas.AddDrawableTask(this.Stroke));
  }
}
var xi, Mi, Ti, vi, Ai, bi, Di;
class oa extends en {
  constructor(t, i, s, a = !1) {
    super(s, i, t);
    n(this, "_chartView");
    n(this, "_nextSeries", 0);
    n(this, "_requiresLegendMeasureAlways", !1);
    T(this, xi, []);
    T(this, Mi, []);
    T(this, Ti, []);
    T(this, vi, !1);
    T(this, Ai, 0);
    T(this, bi, 0);
    T(this, Di, 0);
    this._chartView = t, this._requiresLegendMeasureAlways = a;
  }
  get AngleAxes() {
    return M(this, xi);
  }
  set AngleAxes(t) {
    v(this, xi, t);
  }
  get RadiusAxes() {
    return M(this, Mi);
  }
  set RadiusAxes(t) {
    v(this, Mi, t);
  }
  get Series() {
    return M(this, Ti);
  }
  set Series(t) {
    v(this, Ti, t);
  }
  get FitToBounds() {
    return M(this, vi);
  }
  set FitToBounds(t) {
    v(this, vi, t);
  }
  get TotalAnge() {
    return M(this, Ai);
  }
  set TotalAnge(t) {
    v(this, Ai, t);
  }
  get InnerRadius() {
    return M(this, bi);
  }
  set InnerRadius(t) {
    v(this, bi, t);
  }
  get InitialRotation() {
    return M(this, Di);
  }
  set InitialRotation(t) {
    v(this, Di, t);
  }
  get ChartSeries() {
    return this.Series;
  }
  get View() {
    return this._chartView;
  }
  FindHoveredPointsBy(t) {
    return this.ChartSeries.Where((i) => i.IsHoverable).SelectMany((i) => i.FindHitPoints(this, t.Clone(), _t.CompareAll));
  }
  Measure() {
    if (!this.IsLoaded)
      return;
    this.InvokeOnMeasuring(), this._preserveFirstDraw && (this.IsFirstDraw = !0, this._preserveFirstDraw = !1), this.MeasureWork = {}, this._chartView.DrawMargin, this.ControlSize = this._chartView.ControlSize.Clone(), this.AngleAxes = this._chartView.AngleAxes.Cast().Select((o) => o).ToArray(), this.RadiusAxes = this._chartView.RadiusAxes.Cast().Select((o) => o).ToArray();
    let t = j.DefaultSettings.GetTheme();
    this.LegendPosition = this._chartView.LegendPosition, this.Legend = this._chartView.Legend, this.TooltipPosition = this._chartView.TooltipPosition, this.Tooltip = this._chartView.Tooltip, this.AnimationsSpeed = this._chartView.AnimationsSpeed, this.EasingFunction = this._chartView.EasingFunction, this.FitToBounds = this._chartView.FitToBounds, this.TotalAnge = this._chartView.TotalAngle, this.InnerRadius = this._chartView.InnerRadius, this.InitialRotation = this._chartView.InitialRotation;
    let i = this._chartView.Series == null ? [] : this._chartView.Series.Where((o) => o.IsVisible);
    this.Series = i.Cast().ToArray(), this.VisualElements = this._chartView.VisualElements?.ToArray() ?? [], this.SeriesContext = new Hs(this.Series);
    let s = j.DefaultSettings.CurrentThemeId != this.ThemeId;
    for (const o of this.AngleAxes) {
      let l = o;
      l._isInternalSet = !0, o.Initialize(Mt.Angle), (!l._isThemeSet || s) && (t.ApplyStyleToAxis(o), l._isThemeSet = !0), l._isInternalSet = !1;
    }
    for (const o of this.RadiusAxes) {
      let l = o;
      l._isInternalSet = !0, o.Initialize(Mt.Radius), (!l._isThemeSet || s) && (t.ApplyStyleToAxis(o), l._isThemeSet = !0), l._isInternalSet = !1;
    }
    this.SetDrawMargin(this.ControlSize.Clone(), lt.Empty());
    for (const o of this.Series) {
      o.SeriesId == -1 && (o.SeriesId = this._nextSeries++);
      let l = o;
      l._isInternalSet = !0, (!l._isThemeSet || s) && (t.ApplyStyleToSeries(o), l._isThemeSet = !0);
      let c = this.AngleAxes[o.ScalesAngleAt], p = this.RadiusAxes[o.ScalesRadiusAt], m = o.GetBounds(this, c, p).Bounds;
      m.IsEmpty || (c.DataBounds.AppendValueByBounds(m.SecondaryBounds), p.DataBounds.AppendValueByBounds(m.PrimaryBounds), c.VisibleDataBounds.AppendValueByBounds(m.SecondaryBounds), p.VisibleDataBounds.AppendValueByBounds(m.PrimaryBounds));
    }
    for (const o of this.AngleAxes) {
      let l = o;
      if (l._isInternalSet = !0, !o.DataBounds.IsEmpty) {
        l._isInternalSet = !1;
        continue;
      }
      let c = 0, p = 10 * o.UnitWidth;
      o.DataBounds.AppendValue(p), o.DataBounds.AppendValue(c), o.VisibleDataBounds.AppendValue(p), o.VisibleDataBounds.AppendValue(c), o.DataBounds.MinDelta < p && (o.DataBounds.MinDelta = p), l._isInternalSet = !1;
    }
    for (const o of this.RadiusAxes) {
      let l = o;
      if (l._isInternalSet = !0, !o.DataBounds.IsEmpty) {
        l._isInternalSet = !1;
        continue;
      }
      let c = 0, p = 10 * o.UnitWidth;
      o.DataBounds.AppendValue(p), o.DataBounds.AppendValue(c), o.VisibleDataBounds.AppendValue(p), o.VisibleDataBounds.AppendValue(c), o.DataBounds.MinDelta < p && (o.DataBounds.MinDelta = p), l._isInternalSet = !1;
    }
    this.InitializeVisualsCollector();
    let a = this.Series.Where((o) => o.IsVisibleAtLegend).ToArray();
    if (this.DrawLegend(a), this.FitToBounds) {
      let o = 0, l = 0, c = 0, p = 0;
      for (const _ of this.Series) {
        let b = new Rt(
          this.DrawMarginLocation.Clone(),
          this.DrawMarginSize.Clone(),
          this.AngleAxes[_.ScalesAngleAt],
          this.RadiusAxes[_.ScalesRadiusAt],
          this.InnerRadius,
          this.InitialRotation,
          this.TotalAnge
        );
        for (const z of _.Fetch(this)) {
          let w = b.ToPixelsFromCharPoint(z), V = w.X - b.CenterX, I = w.Y - b.CenterY;
          V > 0 ? V > p && (p = V) : (V *= -1, V > c && (c = V)), I > 0 ? I > l && (l = I) : (I *= -1, I > o && (o = I));
        }
      }
      let m = this.ControlSize.Clone(), P = m.Width * 0.5, C = m.Height * 0.5, G = P - c, S = P - p, f = C - o, y = C - l, g = new lt(-G, -f, -S, -y);
      this.SetDrawMargin(this.ControlSize.Clone(), g);
    } else {
      let o = lt.Empty();
      if (this.View.Title != null) {
        let l = this.View.Title.Measure(this, null, null);
        o.Top = l.Height, l.Height;
      }
      this.SetDrawMargin(this.ControlSize.Clone(), o);
      for (const l of this.AngleAxes) {
        if (!l.IsVisible)
          continue;
        if (l.DataBounds.Max == l.DataBounds.Min) {
          let P = l.UnitWidth * 0.5;
          l.DataBounds.Min = l.DataBounds.Min - P, l.DataBounds.Max = l.DataBounds.Max + P, l.VisibleDataBounds.Min = l.VisibleDataBounds.Min - P, l.VisibleDataBounds.Max = l.VisibleDataBounds.Max + P;
        }
        let c = l;
        c.GetNameLabelSize(this);
        let m = c.GetPossibleSize(this).Height;
        l.Ro = o.Top + m, o.Top += m, o.Bottom += m, o.Left += m, o.Right += m;
      }
      for (const l of this.RadiusAxes)
        if (!!l.IsVisible && l.DataBounds.Max == l.DataBounds.Min) {
          let c = l.UnitWidth * 0.5;
          l.DataBounds.Min = l.DataBounds.Min - c, l.DataBounds.Max = l.DataBounds.Max + c, l.VisibleDataBounds.Min = l.VisibleDataBounds.Min - c, l.VisibleDataBounds.Max = l.VisibleDataBounds.Max + c;
        }
      this.SetDrawMargin(this.ControlSize.Clone(), o);
    }
    if (this.DrawMarginSize.Width <= 0 || this.DrawMarginSize.Height <= 0)
      return;
    this.UpdateBounds();
    let r = this.View.Title;
    if (r != null) {
      let o = r.Measure(this, null, null);
      r.AlignToTopLeftCorner(), r.X = this.ControlSize.Width * 0.5 - o.Width * 0.5, r.Y = 0, this.AddVisual(r);
    }
    let h = this.RadiusAxes.Concat(this.AngleAxes).ToArray();
    for (const o of h) {
      if (o.DataBounds.Max == o.DataBounds.Min) {
        let l = o.DataBounds.Min * 0.3;
        o.DataBounds.Min = o.DataBounds.Min - l, o.DataBounds.Max = o.DataBounds.Max + l;
      }
      if (o.MinLimit == null) {
        let l = 0;
        o.DataBounds.PaddingMin > l && (l = o.DataBounds.PaddingMin);
        let c = o;
        c._isInternalSet = !0, o.DataBounds.Min = o.DataBounds.Min - l, o.VisibleDataBounds.Min = o.VisibleDataBounds.Min - l, c._isInternalSet = !1;
      }
      if (o.MaxLimit == null) {
        let l = 0;
        o.DataBounds.PaddingMax > l && (l = o.DataBounds.PaddingMax);
        let c = o;
        c._isInternalSet = !0, o.DataBounds.Max = o.DataBounds.Max + l, o.VisibleDataBounds.Max = o.VisibleDataBounds.Max + l, c._isInternalSet = !1;
      }
      o.IsVisible && this.AddVisual(o), o.RemoveOldPaints(this.View);
    }
    for (const o of this.VisualElements)
      this.AddVisual(o);
    for (const o of this.Series)
      this.AddVisual(o);
    this.CollectVisuals();
    for (const o of h) {
      if (!o.IsVisible)
        continue;
      let l = o;
      l._isInternalSet = !0, o.ActualBounds.HasPreviousState = !0, l._isInternalSet = !1;
    }
    this.InvokeOnUpdateStarted(), this.IsFirstDraw = !1, this.ThemeId = j.DefaultSettings.CurrentThemeId, this.PreviousSeriesAtLegend = this.Series.Where((o) => o.IsVisibleAtLegend).ToArray(), this.PreviousLegendPosition = this.LegendPosition, this.Canvas.Invalidate();
  }
  ScaleUIPoint(t, i = 0, s = 0) {
    let a = this.AngleAxes[i], r = this.RadiusAxes[s], o = new Rt(
      this.DrawMarginLocation.Clone(),
      this.DrawMarginSize.Clone(),
      a,
      r,
      this.InnerRadius,
      this.InitialRotation,
      this.TotalAnge
    ).ToChartValues(t.X, t.Y);
    return new Float64Array([o.X, o.Y]);
  }
  Unload() {
    super.Unload(), this.IsFirstDraw = !0;
  }
}
xi = new WeakMap(), Mi = new WeakMap(), Ti = new WeakMap(), vi = new WeakMap(), Ai = new WeakMap(), bi = new WeakMap(), Di = new WeakMap();
class la extends ee {
  constructor(t, i, s) {
    super();
    n(this, "_textGeometryFactory");
    n(this, "_lineGeometryFactory");
    n(this, "_circleGeometryFactory");
    n(this, "activeSeparators", new u.Dictionary());
    n(this, "_orientation", 0);
    n(this, "_minStep", 0);
    n(this, "_dataBounds", null);
    n(this, "_visibleDataBounds", null);
    n(this, "_labelsRotation", 0);
    n(this, "_labeler", pt.Default);
    n(this, "_minLimit", null);
    n(this, "_maxLimit", null);
    n(this, "_namePaint");
    n(this, "_nameTextSize", 20);
    n(this, "_namePadding", kt.All(5));
    n(this, "_labelsPaint");
    n(this, "_unitWidth", 1);
    n(this, "_textSize", 16);
    n(this, "_separatorsPaint");
    n(this, "_showSeparatorLines", !0);
    n(this, "_isVisible", !0);
    n(this, "_isInverted", !1);
    n(this, "_forceStepToMin", !1);
    n(this, "_labelsAngle", 0);
    n(this, "_labelsPadding", kt.All(3));
    n(this, "_labelsVerticalAlign", it.Middle);
    n(this, "_labelsHorizontalAlign", it.Middle);
    n(this, "_labelsBackground", new ht(255, 255, 255).Clone());
    n(this, "_animatableBounds", new Ls());
    n(this, "Ro", 0);
    n(this, "Name", null);
    n(this, "Labels");
    n(this, "AnimationsSpeed");
    n(this, "EasingFunction");
    n(this, "Initialized", new u.Event());
    this._textGeometryFactory = t, this._lineGeometryFactory = i, this._circleGeometryFactory = s;
  }
  get DataBounds() {
    if (this._dataBounds == null)
      throw new u.Exception("bounds not found");
    return this._dataBounds;
  }
  get VisibleDataBounds() {
    if (this._visibleDataBounds == null)
      throw new u.Exception("bounds not found");
    return this._visibleDataBounds;
  }
  get ActualBounds() {
    return this._animatableBounds;
  }
  get NameTextSize() {
    return this._nameTextSize;
  }
  set NameTextSize(t) {
    this.SetProperty(new u.Ref(() => this._nameTextSize, (i) => this._nameTextSize = i), t, "NameTextSize");
  }
  get NamePadding() {
    return this._namePadding;
  }
  set NamePadding(t) {
    this.SetProperty(new u.Ref(() => this._namePadding, (i) => this._namePadding = i), t, "NamePadding");
  }
  get Orientation() {
    return this._orientation;
  }
  get LabelsAngle() {
    return this._labelsAngle;
  }
  set LabelsAngle(t) {
    this.SetProperty(new u.Ref(() => this._labelsAngle, (i) => this._labelsAngle = i), t, "LabelsAngle");
  }
  get Labeler() {
    return this._labeler;
  }
  set Labeler(t) {
    this.SetProperty(new u.Ref(() => this._labeler, (i) => this._labeler = i), t, "Labeler");
  }
  get MinStep() {
    return this._minStep;
  }
  set MinStep(t) {
    this.SetProperty(new u.Ref(() => this._minStep, (i) => this._minStep = i), t, "MinStep");
  }
  get ForceStepToMin() {
    return this._forceStepToMin;
  }
  set ForceStepToMin(t) {
    this.SetProperty(new u.Ref(() => this._forceStepToMin, (i) => this._forceStepToMin = i), t, "ForceStepToMin");
  }
  get MinLimit() {
    return this._minLimit;
  }
  set MinLimit(t) {
    this.SetProperty(new u.Ref(() => this._minLimit, (i) => this._minLimit = i), t, "MinLimit");
  }
  get MaxLimit() {
    return this._maxLimit;
  }
  set MaxLimit(t) {
    this.SetProperty(new u.Ref(() => this._maxLimit, (i) => this._maxLimit = i), t, "MaxLimit");
  }
  get UnitWidth() {
    return this._unitWidth;
  }
  set UnitWidth(t) {
    this.SetProperty(new u.Ref(() => this._unitWidth, (i) => this._unitWidth = i), t, "UnitWidth");
  }
  get LabelsRotation() {
    return this._labelsRotation;
  }
  set LabelsRotation(t) {
    this.SetProperty(new u.Ref(() => this._labelsRotation, (i) => this._labelsRotation = i), t, "LabelsRotation");
  }
  get TextSize() {
    return this._textSize;
  }
  set TextSize(t) {
    this.SetProperty(new u.Ref(() => this._textSize, (i) => this._textSize = i), t, "TextSize");
  }
  get LabelsPadding() {
    return this._labelsPadding;
  }
  set LabelsPadding(t) {
    this.SetProperty(new u.Ref(() => this._labelsPadding, (i) => this._labelsPadding = i), t, "LabelsPadding");
  }
  get LabelsVerticalAlignment() {
    return this._labelsVerticalAlign;
  }
  set LabelsVerticalAlignment(t) {
    this.SetProperty(new u.Ref(() => this._labelsVerticalAlign, (i) => this._labelsVerticalAlign = i), t, "LabelsVerticalAlignment");
  }
  get LabelsHorizontalAlignment() {
    return this._labelsHorizontalAlign;
  }
  set LabelsHorizontalAlignment(t) {
    this.SetProperty(new u.Ref(() => this._labelsHorizontalAlign, (i) => this._labelsHorizontalAlign = i), t, "LabelsHorizontalAlignment");
  }
  get LabelsBackground() {
    return this._labelsBackground;
  }
  set LabelsBackground(t) {
    this.SetProperty(new u.Ref(() => this._labelsBackground, (i) => this._labelsBackground = i), t.Clone(), "LabelsBackground");
  }
  get ShowSeparatorLines() {
    return this._showSeparatorLines;
  }
  set ShowSeparatorLines(t) {
    this.SetProperty(new u.Ref(() => this._showSeparatorLines, (i) => this._showSeparatorLines = i), t, "ShowSeparatorLines");
  }
  get IsVisible() {
    return this._isVisible;
  }
  set IsVisible(t) {
    this.SetProperty(new u.Ref(() => this._isVisible, (i) => this._isVisible = i), t, "IsVisible");
  }
  get IsInverted() {
    return this._isInverted;
  }
  set IsInverted(t) {
    this.SetProperty(new u.Ref(() => this._isInverted, (i) => this._isInverted = i), t, "IsInverted");
  }
  get NamePaint() {
    return this._namePaint;
  }
  set NamePaint(t) {
    this.SetPaintProperty(new u.Ref(() => this._namePaint, (i) => this._namePaint = i), t, void 0, "NamePaint");
  }
  get LabelsPaint() {
    return this._labelsPaint;
  }
  set LabelsPaint(t) {
    this.SetPaintProperty(new u.Ref(() => this._labelsPaint, (i) => this._labelsPaint = i), t, void 0, "LabelsPaint");
  }
  get SeparatorsPaint() {
    return this._separatorsPaint;
  }
  set SeparatorsPaint(t) {
    this.SetPaintProperty(new u.Ref(() => this._separatorsPaint, (i) => this._separatorsPaint = i), t, !0, "SeparatorsPaint");
  }
  Invalidate(t) {
    let i, s = t;
    if (this._dataBounds == null)
      throw new u.Exception("DataBounds not found");
    s.ControlSize.Clone();
    let a = s.DrawMarginLocation.Clone(), r = s.DrawMarginSize.Clone(), h = L.GetTickForPolar(this, s), o = this.Labeler;
    this.Labels != null && (o = pt.BuildNamedLabeler(this.Labels).Function.bind(pt.BuildNamedLabeler(this.Labels)), this._minStep = 1);
    let l = h.Value;
    l < this._minStep && (l = this._minStep), this._forceStepToMin && (l = this._minStep), this._animatableBounds.HasPreviousState || (L.TransitionateProperties(
      this._animatableBounds,
      "MinLimit",
      "MaxLimit"
    ).WithAnimationBuilder((z) => z.WithDuration(this.AnimationsSpeed ?? s.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? s.EasingFunction)), s.Canvas.Trackers.Add(this._animatableBounds)), this.NamePaint != null && (this.NamePaint.ZIndex == 0 && (this.NamePaint.ZIndex = -1), s.Canvas.AddDrawableTask(this.NamePaint)), this.LabelsPaint != null && (this.LabelsPaint.ZIndex == 0 && (this.LabelsPaint.ZIndex = -0.9), s.Canvas.AddDrawableTask(this.LabelsPaint)), this.SeparatorsPaint != null && (this.SeparatorsPaint.ZIndex == 0 && (this.SeparatorsPaint.ZIndex = -1), this.SeparatorsPaint.SetClipRectangle(s.Canvas, new W(a.Clone(), r.Clone())), s.Canvas.AddDrawableTask(this.SeparatorsPaint));
    let c, p;
    this._orientation == Mt.Angle ? (c = this, p = s.RadiusAxes[0]) : (c = s.AngleAxes[0], p = this);
    let m = new Rt(
      s.DrawMarginLocation.Clone(),
      s.DrawMarginSize.Clone(),
      c,
      p,
      s.InnerRadius,
      s.InitialRotation,
      s.TotalAnge
    ), P = this.TextSize, C = this._labelsRotation, G = !1, S = !1;
    (Math.floor(C) & 4294967295 & j.TangentAngle) != 0 && (C -= j.TangentAngle, G = !0), (Math.floor(C) & 4294967295 & j.CotangentAngle) != 0 && (C -= j.CotangentAngle, S = !0);
    let f = Math.abs(C) > 0.01, y = this.MaxLimit == null ? (this._visibleDataBounds ?? this._dataBounds).Max : this.MaxLimit, g = this.MinLimit == null ? (this._visibleDataBounds ?? this._dataBounds).Min : this.MinLimit, _ = Math.trunc(g / l) * l;
    this.activeSeparators.TryGetValue(s, new u.Out(() => i, (z) => i = z)) || (i = new u.Dictionary(), this.activeSeparators.SetAt(s, i));
    let b = new u.HashSet();
    for (let z = _; z <= y; z += l) {
      let w;
      if (z < g)
        continue;
      let V = o(z - 1 + 1);
      if (!i.TryGetValue(z, new u.Out(() => w, (R) => w = R))) {
        w = this._orientation == Mt.Angle ? new re().Init({ Value: z }) : new As().Init({ Value: z });
        let R = (this._orientation == Mt.Angle ? m.ToPixels(w.Value, m.MaxRadius) : m.ToPixelsWithAngleInDegrees(this.LabelsAngle, w.Value)).Clone();
        if (this.LabelsPaint != null) {
          let X = this._textGeometryFactory();
          X.TextSize = P, w.Label = X, f && (X.RotateTransform = C), L.TransitionateProperties(
            X,
            "X",
            "Y",
            "RotateTransform",
            "Opacity"
          ).WithAnimationBuilder((A) => A.WithDuration(this.AnimationsSpeed ?? s.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? s.EasingFunction)), X.X = R.X, X.Y = R.Y, X.Opacity = 0, X.CompleteTransition();
        }
        if (this.SeparatorsPaint != null && this.ShowSeparatorLines) {
          if (w instanceof re) {
            const X = w;
            let A = this._lineGeometryFactory();
            X.Separator = A, L.TransitionateProperties(
              A,
              "X",
              "X1",
              "Y",
              "Y1",
              "Opacity"
            ).WithAnimationBuilder((H) => H.WithDuration(this.AnimationsSpeed ?? s.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? s.EasingFunction)), A.Opacity = 0, A.CompleteTransition();
          }
          if (w instanceof As) {
            const X = w;
            let A = this._circleGeometryFactory();
            X.Circle = A, L.TransitionateProperties(
              A,
              "X",
              "Y",
              "Width",
              "Height",
              "Opacity"
            ).WithAnimationBuilder((E) => E.WithDuration(this.AnimationsSpeed ?? s.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? s.EasingFunction));
            let x = Math.sqrt(Math.pow(R.X - m.CenterX, 2) + Math.pow(R.Y - m.CenterY, 2));
            X.Circle.X = m.CenterX - x, X.Circle.Y = m.CenterY - x, X.Circle.Width = x * 2, X.Circle.Height = x * 2, A.Opacity = 0, A.CompleteTransition();
          }
        }
        i.Add(z, w);
      }
      this.SeparatorsPaint != null && this.ShowSeparatorLines && w.Geometry != null && this.SeparatorsPaint.AddGeometryToPaintTask(s.Canvas, w.Geometry), this.LabelsPaint != null && w.Label != null && this.LabelsPaint.AddGeometryToPaintTask(s.Canvas, w.Label);
      let I = (this._orientation == Mt.Angle ? m.ToPixels(w.Value, m.MaxRadius) : m.ToPixelsWithAngleInDegrees(this.LabelsAngle, w.Value)).Clone();
      if (w.Label != null) {
        w.Label.Text = V, w.Label.Padding = this._labelsPadding, w.Label.HorizontalAlign = this._labelsHorizontalAlign, w.Label.VerticalAlign = this._labelsVerticalAlign;
        let R = C + (G ? m.GetAngle(z) - 90 : 0) + (S ? m.GetAngle(z) : 0);
        w.Label.X = I.X, w.Label.Y = I.Y, w.Label.Background = this._labelsBackground.Clone(), R < 0 && (R = 360 + R % 360), this._orientation == Mt.Angle && (R + 90) % 360 > 180 && (R += 180), w.Label.RotateTransform = R, w.Label.Opacity = u.IsNullOrEmpty(V) ? 0 : 1, w.Label.X = I.X, w.Label.Y = I.Y, this._animatableBounds.HasPreviousState || w.Label.CompleteTransition();
      }
      if (w.Geometry != null) {
        if (w instanceof re) {
          const R = w;
          if (R.Separator != null) {
            let X = m.ToPixels(w.Value, m.MinRadius);
            R.Separator.X = X.X, R.Separator.X1 = I.X, R.Separator.Y = X.Y, R.Separator.Y1 = I.Y, this._animatableBounds.HasPreviousState || R.Separator.CompleteTransition();
          }
        }
        if (w instanceof As) {
          const R = w;
          if (R.Circle != null) {
            let A = Math.sqrt(Math.pow(I.X - m.CenterX, 2) + Math.pow(I.Y - m.CenterY, 2));
            R.Circle.X = m.CenterX - A, R.Circle.Y = m.CenterY - A, R.Circle.Width = A * 2, R.Circle.Height = A * 2, this._animatableBounds.HasPreviousState || R.Circle.CompleteTransition();
          }
        }
        w.Geometry.Opacity = 1;
      }
      (w.Label != null || w.Geometry != null) && b.Add(w);
    }
    for (const z of i)
      b.Contains(z.Value) || (this.SoftDeleteSeparator(s, z.Value, m), i.Remove(z.Key));
  }
  GetNameLabelSize(t) {
    if (this.NamePaint == null || u.IsNullOrEmpty(this.Name))
      return new U(0, 0);
    let i = this._textGeometryFactory();
    return i.Text = this.Name ?? "", i.TextSize = this.NameTextSize, i.Padding = this._labelsPadding, i.Measure(this.NamePaint);
  }
  GetPossibleSize(t) {
    if (this._dataBounds == null)
      throw new u.Exception("DataBounds not found");
    if (this.LabelsPaint == null)
      return new U(0, 0);
    let i = this.TextSize, s = this.Labeler, a = t, r, h;
    this._orientation == Mt.Angle ? (r = this, h = a.RadiusAxes[0]) : (r = a.AngleAxes[0], h = this);
    let o = new Rt(
      a.DrawMarginLocation.Clone(),
      a.DrawMarginSize.Clone(),
      r,
      h,
      a.InnerRadius,
      a.InitialRotation,
      a.TotalAnge
    );
    this.Labels != null && (s = pt.BuildNamedLabeler(this.Labels).Function.bind(pt.BuildNamedLabeler(this.Labels)), this._minStep = 1);
    let c = L.GetTickForPolar(this, a).Value;
    c < this._minStep && (c = this._minStep), this._forceStepToMin && (c = this._minStep);
    let p = this.MaxLimit == null ? (this._visibleDataBounds ?? this._dataBounds).Max : this.MaxLimit, m = this.MinLimit == null ? (this._visibleDataBounds ?? this._dataBounds).Min : this.MinLimit, P = Math.trunc(m / c) * c, C = 0, G = this.LabelsRotation;
    for (let S = P; S <= p; S += c) {
      let f = this._textGeometryFactory();
      f.Text = s(S), f.TextSize = i, f.RotateTransform = G + (this._orientation == Mt.Angle ? o.GetAngle(S) - 90 : 0), f.Padding = this._labelsPadding;
      let y = f.Measure(this.LabelsPaint), g = Math.sqrt(Math.pow(y.Width * 0.5, 2) + Math.pow(y.Height * 0.5, 2));
      g > C && (C = g);
    }
    return new U(0, C);
  }
  Initialize(t) {
    this._orientation = t, this._animatableBounds ?? (this._animatableBounds = new Ls()), this._dataBounds = new $(), this._visibleDataBounds = new $(), this.Initialized.Invoke(this);
  }
  Delete(t) {
    this._labelsPaint != null && (t.Canvas.RemovePaintTask(this._labelsPaint), this._labelsPaint.ClearGeometriesFromPaintTask(t.Canvas)), this._separatorsPaint != null && (t.Canvas.RemovePaintTask(this._separatorsPaint), this._separatorsPaint.ClearGeometriesFromPaintTask(t.Canvas)), this.activeSeparators.Remove(t);
  }
  RemoveFromUI(t) {
    super.RemoveFromUI(t), this._animatableBounds = null, this.activeSeparators.Remove(t);
  }
  SoftDeleteSeparator(t, i, s) {
    if (i.Geometry == null)
      return;
    let a = (this._orientation == Mt.Angle ? s.ToPixels(i.Value, s.MaxRadius) : s.ToPixels(0, i.Value)).Clone();
    if (i instanceof re) {
      const r = i;
      r.Separator.X = s.CenterX, r.Separator.Y = s.CenterY, r.Separator.X1 = a.X, r.Separator.Y1 = a.Y;
    }
    if (i instanceof As) {
      const r = i;
      r.Circle.X = s.CenterX, r.Circle.Y = s.CenterY, r.Circle.Width = 0, r.Circle.Height = 0;
    }
    i.Geometry.Opacity = 0, i.Geometry.RemoveOnCompleted = !0, i.Label != null && (i.Label.Opacity = 0, i.Label.RemoveOnCompleted = !0);
  }
  OnPaintChanged(t) {
    super.OnPaintChanged(t), this.OnPropertyChanged(t);
  }
  GetPaintTasks() {
    return [this._separatorsPaint, this._labelsPaint, this._namePaint];
  }
}
n(la, "$meta_System_INotifyPropertyChanged", !0);
const Xs = class extends ee {
  constructor(t, i) {
    super();
    n(this, "_textGeometryFactory");
    n(this, "_lineGeometryFactory");
    n(this, "activeSeparators", new u.Dictionary());
    n(this, "_xo", 0);
    n(this, "_yo", 0);
    n(this, "_size", U.Empty.Clone());
    n(this, "_orientation", 0);
    n(this, "_animatableBounds", new Ls());
    n(this, "_dataBounds", new $());
    n(this, "_visibleDataBounds", new $());
    n(this, "_minStep", 0);
    n(this, "_labelsRotation", 0);
    n(this, "_labelsDesiredSize", W.Empty.Clone());
    n(this, "_nameDesiredSize", W.Empty.Clone());
    n(this, "_nameGeometry");
    n(this, "_position", Pt.Start);
    n(this, "_labeler", pt.Default);
    n(this, "_padding", kt.Default);
    n(this, "_minLimit", null);
    n(this, "_maxLimit", null);
    n(this, "_namePaint");
    n(this, "_nameTextSize", 20);
    n(this, "_namePadding", kt.All(5));
    n(this, "_labelsPaint");
    n(this, "_unitWidth", 1);
    n(this, "_textSize", 16);
    n(this, "_separatorsPaint");
    n(this, "_subseparatorsPaint");
    n(this, "_drawTicksPath", !1);
    n(this, "_ticksPath");
    n(this, "_ticksPaint");
    n(this, "_subticksPaint");
    n(this, "_zeroPaint");
    n(this, "_zeroLine");
    n(this, "_crosshairLine");
    n(this, "_crosshairLabel");
    n(this, "_crosshairPaint");
    n(this, "_crosshairLabelsPaint");
    n(this, "_showSeparatorLines", !0);
    n(this, "_isVisible", !0);
    n(this, "_isInverted", !1);
    n(this, "_separatorsAtCenter", !0);
    n(this, "_ticksAtCenter", !0);
    n(this, "_forceStepToMin", !1);
    n(this, "_crosshairSnapEnabled", !1);
    n(this, "_tickLength", 6);
    n(this, "_subSections", 3);
    n(this, "_labelsAlignment");
    n(this, "_inLineNamePlacement", !1);
    n(this, "Name", null);
    n(this, "Labels");
    n(this, "CrosshairLabelsBackground");
    n(this, "CrosshairPadding");
    n(this, "AnimationsSpeed");
    n(this, "EasingFunction");
    n(this, "MinZoomDelta");
    n(this, "Initialized", new u.Event());
    this._textGeometryFactory = t, this._lineGeometryFactory = i;
  }
  get Xo() {
    return this._xo;
  }
  set Xo(t) {
    this._xo = t;
  }
  get Yo() {
    return this._yo;
  }
  set Yo(t) {
    this._yo = t;
  }
  get Size() {
    return this._size;
  }
  set Size(t) {
    this._size = t.Clone();
  }
  get LabelsDesiredSize() {
    return this._labelsDesiredSize;
  }
  set LabelsDesiredSize(t) {
    this._labelsDesiredSize = t.Clone();
  }
  get NameDesiredSize() {
    return this._nameDesiredSize;
  }
  set NameDesiredSize(t) {
    this._nameDesiredSize = t.Clone();
  }
  get DataBounds() {
    return this._dataBounds;
  }
  get VisibleDataBounds() {
    return this._visibleDataBounds;
  }
  get ActualBounds() {
    return this._animatableBounds;
  }
  get NameTextSize() {
    return this._nameTextSize;
  }
  set NameTextSize(t) {
    this.SetProperty(new u.Ref(() => this._nameTextSize, (i) => this._nameTextSize = i), t, "NameTextSize");
  }
  get NamePadding() {
    return this._namePadding;
  }
  set NamePadding(t) {
    this.SetProperty(new u.Ref(() => this._namePadding, (i) => this._namePadding = i), t, "NamePadding");
  }
  get LabelsAlignment() {
    return this._labelsAlignment;
  }
  set LabelsAlignment(t) {
    this.SetProperty(new u.Ref(() => this._labelsAlignment, (i) => this._labelsAlignment = i), t, "LabelsAlignment");
  }
  get Orientation() {
    return this._orientation;
  }
  get Padding() {
    return this._padding;
  }
  set Padding(t) {
    this.SetProperty(new u.Ref(() => this._padding, (i) => this._padding = i), t, "Padding");
  }
  get Labeler() {
    return this._labeler;
  }
  set Labeler(t) {
    this.SetProperty(new u.Ref(() => this._labeler, (i) => this._labeler = i), t, "Labeler");
  }
  get MinStep() {
    return this._minStep;
  }
  set MinStep(t) {
    this.SetProperty(new u.Ref(() => this._minStep, (i) => this._minStep = i), t, "MinStep");
  }
  get ForceStepToMin() {
    return this._forceStepToMin;
  }
  set ForceStepToMin(t) {
    this.SetProperty(new u.Ref(() => this._forceStepToMin, (i) => this._forceStepToMin = i), t, "ForceStepToMin");
  }
  get MinLimit() {
    return this._minLimit;
  }
  set MinLimit(t) {
    this.SetProperty(new u.Ref(() => this._minLimit, (i) => this._minLimit = i), t, "MinLimit");
  }
  get MaxLimit() {
    return this._maxLimit;
  }
  set MaxLimit(t) {
    this.SetProperty(new u.Ref(() => this._maxLimit, (i) => this._maxLimit = i), t, "MaxLimit");
  }
  get UnitWidth() {
    return this._unitWidth;
  }
  set UnitWidth(t) {
    this.SetProperty(new u.Ref(() => this._unitWidth, (i) => this._unitWidth = i), t, "UnitWidth");
  }
  get Position() {
    return this._position;
  }
  set Position(t) {
    this.SetProperty(new u.Ref(() => this._position, (i) => this._position = i), t, "Position");
  }
  get LabelsRotation() {
    return this._labelsRotation;
  }
  set LabelsRotation(t) {
    this.SetProperty(new u.Ref(() => this._labelsRotation, (i) => this._labelsRotation = i), t, "LabelsRotation");
  }
  get TextSize() {
    return this._textSize;
  }
  set TextSize(t) {
    this.SetProperty(new u.Ref(() => this._textSize, (i) => this._textSize = i), t, "TextSize");
  }
  get ShowSeparatorLines() {
    return this._showSeparatorLines;
  }
  set ShowSeparatorLines(t) {
    this.SetProperty(new u.Ref(() => this._showSeparatorLines, (i) => this._showSeparatorLines = i), t, "ShowSeparatorLines");
  }
  get IsVisible() {
    return this._isVisible;
  }
  set IsVisible(t) {
    this.SetProperty(new u.Ref(() => this._isVisible, (i) => this._isVisible = i), t, "IsVisible");
  }
  get IsInverted() {
    return this._isInverted;
  }
  set IsInverted(t) {
    this.SetProperty(new u.Ref(() => this._isInverted, (i) => this._isInverted = i), t, "IsInverted");
  }
  get SeparatorsAtCenter() {
    return this._separatorsAtCenter;
  }
  set SeparatorsAtCenter(t) {
    this.SetProperty(new u.Ref(() => this._separatorsAtCenter, (i) => this._separatorsAtCenter = i), t, "SeparatorsAtCenter");
  }
  get TicksAtCenter() {
    return this._ticksAtCenter;
  }
  set TicksAtCenter(t) {
    this.SetProperty(new u.Ref(() => this._ticksAtCenter, (i) => this._ticksAtCenter = i), t, "TicksAtCenter");
  }
  get NamePaint() {
    return this._namePaint;
  }
  set NamePaint(t) {
    this.SetPaintProperty(new u.Ref(() => this._namePaint, (i) => this._namePaint = i), t, void 0, "NamePaint");
  }
  get LabelsPaint() {
    return this._labelsPaint;
  }
  set LabelsPaint(t) {
    this.SetPaintProperty(new u.Ref(() => this._labelsPaint, (i) => this._labelsPaint = i), t, void 0, "LabelsPaint");
  }
  get SeparatorsPaint() {
    return this._separatorsPaint;
  }
  set SeparatorsPaint(t) {
    this.SetPaintProperty(new u.Ref(() => this._separatorsPaint, (i) => this._separatorsPaint = i), t, !0, "SeparatorsPaint");
  }
  get SubseparatorsPaint() {
    return this._subseparatorsPaint;
  }
  set SubseparatorsPaint(t) {
    this.SetPaintProperty(new u.Ref(() => this._subseparatorsPaint, (i) => this._subseparatorsPaint = i), t, !0, "SubseparatorsPaint");
  }
  get DrawTicksPath() {
    return this._drawTicksPath;
  }
  set DrawTicksPath(t) {
    this.SetProperty(new u.Ref(() => this._drawTicksPath, (i) => this._drawTicksPath = i), t, "DrawTicksPath");
  }
  get TicksPaint() {
    return this._ticksPaint;
  }
  set TicksPaint(t) {
    this.SetPaintProperty(new u.Ref(() => this._ticksPaint, (i) => this._ticksPaint = i), t, !0, "TicksPaint");
  }
  get SubticksPaint() {
    return this._subticksPaint;
  }
  set SubticksPaint(t) {
    this.SetPaintProperty(new u.Ref(() => this._subticksPaint, (i) => this._subticksPaint = i), t, !0, "SubticksPaint");
  }
  get ZeroPaint() {
    return this._zeroPaint;
  }
  set ZeroPaint(t) {
    this.SetPaintProperty(new u.Ref(() => this._zeroPaint, (i) => this._zeroPaint = i), t, !0, "ZeroPaint");
  }
  get CrosshairPaint() {
    return this._crosshairPaint;
  }
  set CrosshairPaint(t) {
    this.SetPaintProperty(new u.Ref(() => this._crosshairPaint, (i) => this._crosshairPaint = i), t, !0, "CrosshairPaint");
  }
  get CrosshairLabelsPaint() {
    return this._crosshairLabelsPaint;
  }
  set CrosshairLabelsPaint(t) {
    this.SetPaintProperty(new u.Ref(() => this._crosshairLabelsPaint, (i) => this._crosshairLabelsPaint = i), t, void 0, "CrosshairLabelsPaint");
  }
  get CrosshairSnapEnabled() {
    return this._crosshairSnapEnabled;
  }
  set CrosshairSnapEnabled(t) {
    this.SetProperty(new u.Ref(() => this._crosshairSnapEnabled, (i) => this._crosshairSnapEnabled = i), t, "CrosshairSnapEnabled");
  }
  get TextBrush() {
    return this.LabelsPaint;
  }
  set TextBrush(t) {
    this.LabelsPaint = t;
  }
  get SeparatorsBrush() {
    return this.SeparatorsPaint;
  }
  set SeparatorsBrush(t) {
    this.SeparatorsPaint = t;
  }
  get InLineNamePlacement() {
    return this._inLineNamePlacement;
  }
  set InLineNamePlacement(t) {
    this.SetProperty(new u.Ref(() => this._inLineNamePlacement, (i) => this._inLineNamePlacement = i), t, "InLineNamePlacement");
  }
  Invalidate(t) {
    let i, s = t, a = s.ControlSize.Clone(), r = s.DrawMarginLocation.Clone(), h = s.DrawMarginSize.Clone(), o = this.MaxLimit == null ? this._visibleDataBounds.Max : this.MaxLimit, l = this.MinLimit == null ? this._visibleDataBounds.Min : this.MinLimit;
    this._animatableBounds.MaxVisibleBound = o, this._animatableBounds.MinVisibleBound = l, this._animatableBounds.HasPreviousState || (L.TransitionateProperties(
      this._animatableBounds
    ).WithAnimationBuilder((O) => O.WithDuration(this.AnimationsSpeed ?? s.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? s.EasingFunction)).CompleteCurrentTransitions(), s.Canvas.Trackers.Add(this._animatableBounds));
    let c = L.GetNextScaler(this, s), p = L.GetActualScaler(this, s) ?? c, m = L.GetTick(this, h.Clone(), null, this.GetPossibleMaxLabelSize(t)), P = this.Labeler;
    this.Labels != null && (P = pt.BuildNamedLabeler(this.Labels).Function.bind(pt.BuildNamedLabeler(this.Labels)), this._minStep = 1);
    let C = m.Value;
    C < this._minStep && (C = this._minStep), this._forceStepToMin && (C = this._minStep), this.NamePaint != null && (this.NamePaint.ZIndex == 0 && (this.NamePaint.ZIndex = -1), s.Canvas.AddDrawableTask(this.NamePaint)), this.LabelsPaint != null && (this.LabelsPaint.ZIndex == 0 && (this.LabelsPaint.ZIndex = -0.9), s.Canvas.AddDrawableTask(this.LabelsPaint)), this.SubseparatorsPaint != null && (this.SubseparatorsPaint.ZIndex == 0 && (this.SubseparatorsPaint.ZIndex = -1), this.SubseparatorsPaint.SetClipRectangle(s.Canvas, new W(r.Clone(), h.Clone())), s.Canvas.AddDrawableTask(this.SubseparatorsPaint)), this.SeparatorsPaint != null && (this.SeparatorsPaint.ZIndex == 0 && (this.SeparatorsPaint.ZIndex = -1), this.SeparatorsPaint.SetClipRectangle(s.Canvas, new W(r.Clone(), h.Clone())), s.Canvas.AddDrawableTask(this.SeparatorsPaint));
    let G = (this._orientation == et.X ? new W(new B(r.X, 0), new U(h.Width, a.Height)) : new W(new B(0, r.Y), new U(a.Width, h.Height))).Clone();
    this.TicksPaint != null && (this.TicksPaint.ZIndex == 0 && (this.TicksPaint.ZIndex = -1), this.TicksPaint.SetClipRectangle(s.Canvas, G.Clone()), s.Canvas.AddDrawableTask(this.TicksPaint)), this.SubticksPaint != null && (this.SubticksPaint.ZIndex == 0 && (this.SubticksPaint.ZIndex = -1), this.SubticksPaint.SetClipRectangle(s.Canvas, G.Clone()), s.Canvas.AddDrawableTask(this.SubticksPaint));
    let S = r.Y, f = r.Y + h.Height, y = r.X, g = r.X + h.Width, _ = 0, b = 0;
    this._orientation == et.X ? b = this._position == Pt.Start ? a.Height - this._yo : this._yo : _ = this._position == Pt.Start ? this._xo : a.Width - this._xo;
    let z = this.TextSize, w = this._labelsRotation, V = Math.abs(w) > 0.01, I = Math.trunc(l / C) * C;
    this.activeSeparators.TryGetValue(s, new u.Out(() => i, (O) => i = O)) || (i = new u.Dictionary(), this.activeSeparators.SetAt(s, i)), this.Name != null && this.NamePaint != null && this.DrawName(s, this.NameTextSize, y, g, S, f), this.NamePaint != null && this._nameGeometry != null && this.NamePaint.AddGeometryToPaintTask(s.Canvas, this._nameGeometry);
    let R = this.NamePadding != null || this.SeparatorsPaint != null || this.LabelsPaint != null || this.TicksPaint != null || this.SubticksPaint != null || this.SubseparatorsPaint != null, X = new u.HashSet();
    if (this.ZeroPaint != null) {
      let O = 0, k = 0;
      this._orientation == et.X ? (O = c.ToPixels(0), k = b) : (O = _, k = c.ToPixels(0)), this.ZeroPaint.ZIndex == 0 && (this.ZeroPaint.ZIndex = -1), this.ZeroPaint.SetClipRectangle(s.Canvas, new W(r.Clone(), h.Clone())), s.Canvas.AddDrawableTask(this.ZeroPaint), this._zeroLine == null && (this._zeroLine = this._lineGeometryFactory(), this.ZeroPaint.AddGeometryToPaintTask(s.Canvas, this._zeroLine), this.InitializeLine(this._zeroLine, s), this.UpdateSeparator(this._zeroLine, O, k, y, g, S, f, rt.UpdateAndComplete)), this.UpdateSeparator(this._zeroLine, O, k, y, g, S, f, rt.Update);
    }
    if (this.TicksPaint != null && this._drawTicksPath) {
      if (this._ticksPath == null && (this._ticksPath = this._lineGeometryFactory(), this.InitializeLine(this._ticksPath, s)), this.TicksPaint.AddGeometryToPaintTask(s.Canvas, this._ticksPath), this._orientation == et.X) {
        let O = b + this._size.Height * 0.5 * (this._position == Pt.Start ? -1 : 1);
        this._ticksPath.X = y, this._ticksPath.X1 = g, this._ticksPath.Y = O, this._ticksPath.Y1 = O;
      } else {
        let O = _ + this._size.Width * 0.5 * (this._position == Pt.Start ? 1 : -1);
        this._ticksPath.X = O, this._ticksPath.X1 = O, this._ticksPath.Y = S, this._ticksPath.Y1 = f;
      }
      this._animatableBounds.HasPreviousState || this._ticksPath.CompleteTransition();
    }
    this.TicksPaint != null && this._ticksPath != null && !this._drawTicksPath && this.TicksPaint.RemoveGeometryFromPainTask(s.Canvas, this._ticksPath);
    let A = 0, H = 0, x = 0, E = 0, F = c.MeasureInPixels(this._unitWidth);
    !this._ticksAtCenter && this._orientation == et.X && (A = F * 0.5), !this._ticksAtCenter && this._orientation == et.Y && (H = F * 0.5), !this._separatorsAtCenter && this._orientation == et.X && (x = F * 0.5), !this._separatorsAtCenter && this._orientation == et.Y && (x = F * 0.5);
    for (let O = I - C; O <= o + C; O += C) {
      let k, N = pt.SixRepresentativeDigits(O - 1 + 1), Y = O < l || O > o ? "" : this.TryGetLabelOrLogError(P, O - 1 + 1), at = 0, Z = 0;
      this._orientation == et.X ? (at = c.ToPixels(O), Z = b) : (at = _, Z = c.ToPixels(O));
      let tt = 0, Q = 0;
      if (this._orientation == et.X ? (tt = p.ToPixels(O), Q = b) : (tt = _, Q = p.ToPixels(O)), i.TryGetValue(N, new u.Out(() => k, (st) => k = st)) || (k = new re().Init({ Value: O }), i.Add(N, k)), this.SeparatorsPaint != null && this.ShowSeparatorLines && k.Separator == null && (this.InitializeSeparator(k, s), this.UpdateSeparator(
        k.Separator,
        tt + x,
        Q + E,
        y,
        g,
        S,
        f,
        rt.UpdateAndComplete
      )), this.SubseparatorsPaint != null && this.ShowSeparatorLines && (k.Subseparators == null || k.Subseparators.length == 0) && (this.InitializeSubseparators(k, s), this.UpdateSubseparators(
        k.Subseparators,
        p,
        C,
        tt + x,
        Q + E,
        y,
        g,
        S,
        f,
        rt.UpdateAndComplete
      )), this.TicksPaint != null && k.Tick == null && (this.InitializeTick(k, s), this.UpdateTick(k.Tick, this._tickLength, tt + A, Q + H, rt.UpdateAndComplete)), this.SubticksPaint != null && this._subSections > 0 && (k.Subticks == null || k.Subticks.length == 0) && (this.InitializeSubticks(k, s), this.UpdateSubticks(k.Subticks, p, C, tt + A, Q + H, rt.UpdateAndComplete)), this.LabelsPaint != null && k.Label == null && (this.IntializeLabel(k, s, z, V, w), this.UpdateLabel(
        k.Label,
        tt,
        Q,
        this.TryGetLabelOrLogError(P, O - 1 + 1),
        V,
        w,
        rt.UpdateAndComplete
      )), this.SeparatorsPaint != null && k.Separator != null && (this.ShowSeparatorLines ? this.SeparatorsPaint.AddGeometryToPaintTask(s.Canvas, k.Separator) : this.SeparatorsPaint.RemoveGeometryFromPainTask(s.Canvas, k.Separator)), this.SubseparatorsPaint != null && k.Subseparators != null)
        if (this.ShowSeparatorLines)
          for (const st of k.Subseparators)
            this.SubseparatorsPaint.AddGeometryToPaintTask(s.Canvas, st);
        else
          for (const st of k.Subseparators)
            this.SubseparatorsPaint.RemoveGeometryFromPainTask(s.Canvas, st);
      if (this.LabelsPaint != null && k.Label != null && this.LabelsPaint.AddGeometryToPaintTask(s.Canvas, k.Label), this.TicksPaint != null && k.Tick != null && this.TicksPaint.AddGeometryToPaintTask(s.Canvas, k.Tick), this.SubticksPaint != null && k.Subticks != null)
        for (const st of k.Subticks)
          this.SubticksPaint.AddGeometryToPaintTask(s.Canvas, st);
      k.Separator != null && this.UpdateSeparator(k.Separator, at + x, Z + E, y, g, S, f, rt.Update), k.Subseparators != null && this.UpdateSubseparators(k.Subseparators, c, C, at + x, Z + H, y, g, S, f, rt.Update), k.Tick != null && this.UpdateTick(k.Tick, this._tickLength, at + A, Z + H, rt.Update), k.Subticks != null && this.UpdateSubticks(k.Subticks, c, C, at + A, Z + H, rt.Update), k.Label != null && this.UpdateLabel(k.Label, at, Z + H, Y, V, w, rt.Update), R && X.Add(k);
    }
    for (const O of i) {
      let k = O.Value;
      if (X.Contains(k))
        continue;
      let N = 0, Y = 0;
      this._orientation == et.X ? (N = c.ToPixels(k.Value), Y = b) : (N = _, Y = c.ToPixels(k.Value)), k.Separator != null && this.UpdateSeparator(k.Separator, N + x, Y + E, y, g, S, f, rt.UpdateAndRemove), k.Subseparators != null && this.UpdateSubseparators(
        k.Subseparators,
        c,
        C,
        N + x,
        Y + E,
        y,
        g,
        S,
        f,
        rt.UpdateAndRemove
      ), k.Tick != null && this.UpdateTick(k.Tick, this._tickLength, N + A, Y + H, rt.UpdateAndRemove), k.Subticks != null && this.UpdateSubticks(k.Subticks, c, C, N + A, Y + H, rt.UpdateAndRemove), k.Label != null && this.UpdateLabel(
        k.Label,
        N,
        Y + H,
        this.TryGetLabelOrLogError(P, k.Value - 1 + 1),
        V,
        w,
        rt.UpdateAndRemove
      ), i.Remove(O.Key);
    }
  }
  InvalidateCrosshair(t, i) {
    if (this.CrosshairPaint == null)
      return;
    let s;
    if (t instanceof Ft)
      s = t;
    else
      return;
    let a = L.GetNextScaler(this, s), r = s.ControlSize.Clone(), h = s.DrawMarginLocation.Clone(), o = s.DrawMarginSize.Clone(), l = 0, c = h.Y, p = h.Y + o.Height, m = h.X, P = h.X + o.Width, C = 0, G = 0;
    this._orientation == et.X ? G = this._position == Pt.Start ? r.Height - this._yo : this._yo : C = this._position == Pt.Start ? this._xo : r.Width - this._xo;
    let S = 0, f = 0;
    if (this._orientation == et.X) {
      let y = 0;
      if (this.CrosshairSnapEnabled) {
        let g = s.XAxes.indexOf(this), _ = Xs.FindClosestPoint(
          i.Clone(),
          s,
          s.Series.Where((b) => b.ScalesXAt == g)
        );
        y = a.ToPixels(_?.SecondaryValue ?? i.X), l = _?.SecondaryValue ?? a.ToChartValues(i.X);
      } else
        y = i.X, l = a.ToChartValues(i.X);
      S = y, f = G;
    } else {
      let y = 0;
      if (this.CrosshairSnapEnabled) {
        let g = s.YAxes.indexOf(this), _ = Xs.FindClosestPoint(
          i.Clone(),
          s,
          s.Series.Where((b) => b.ScalesYAt == g)
        );
        y = a.ToPixels(_?.PrimaryValue ?? i.Y), l = _?.PrimaryValue ?? a.ToChartValues(i.Y);
      } else
        y = i.Y, l = a.ToChartValues(i.Y);
      S = C, f = y;
    }
    if (this.CrosshairPaint.ZIndex == 0 && (this.CrosshairPaint.ZIndex = 1050), this.CrosshairPaint.SetClipRectangle(s.Canvas, new W(h.Clone(), o.Clone())), s.Canvas.AddDrawableTask(this.CrosshairPaint), this._crosshairLine == null && (this._crosshairLine = this._lineGeometryFactory(), this.UpdateSeparator(this._crosshairLine, S, f, m, P, c, p, rt.UpdateAndComplete)), this.CrosshairPaint.AddGeometryToPaintTask(s.Canvas, this._crosshairLine), this.CrosshairLabelsPaint != null) {
      this.CrosshairLabelsPaint.ZIndex == 0 && (this.CrosshairLabelsPaint.ZIndex = 1050), this.Orientation == et.X ? this.CrosshairLabelsPaint.SetClipRectangle(
        s.Canvas,
        new W(
          new B(h.X, 0),
          new U(o.Width, r.Height)
        )
      ) : this.CrosshairLabelsPaint.SetClipRectangle(
        s.Canvas,
        new W(
          new B(0, h.Y),
          new U(r.Width, o.Height)
        )
      ), s.Canvas.AddDrawableTask(this.CrosshairLabelsPaint), this._crosshairLabel ?? (this._crosshairLabel = this._textGeometryFactory());
      let y = this.Labeler;
      this.Labels != null && (y = pt.BuildNamedLabeler(this.Labels).Function.bind(pt.BuildNamedLabeler(this.Labels))), this._crosshairLabel.Text = this.TryGetLabelOrLogError(y, l), this._crosshairLabel.TextSize = this._textSize, this._crosshairLabel.Background = (this.CrosshairLabelsBackground ?? ht.Empty).Clone(), this._crosshairLabel.Padding = this.CrosshairPadding ?? this._padding, this._crosshairLabel.X = S, this._crosshairLabel.Y = f;
      let g = this._labelsRotation;
      Math.abs(g) > 0.01 && (this._crosshairLabel.RotateTransform = g), this.CrosshairLabelsPaint.AddGeometryToPaintTask(s.Canvas, this._crosshairLabel);
    }
    this.UpdateSeparator(this._crosshairLine, S, f, m, P, c, p, rt.Update), t.Canvas.Invalidate();
  }
  static FindClosestPoint(t, i, s) {
    let a = null;
    for (const r of s) {
      let o = r.FindHitPoints(i, t.Clone(), L.GetTooltipFindingStrategy(s)).FirstOrDefault();
      o != null && (a == null || o.DistanceTo(t.Clone()) < a.DistanceTo(t.Clone())) && (a = o);
    }
    return a;
  }
  GetNameLabelSize(t) {
    if (this.NamePaint == null || u.IsNullOrEmpty(this.Name))
      return new U(0, 0);
    let i = this._textGeometryFactory();
    return i.Text = this.Name ?? "", i.TextSize = this._nameTextSize, i.RotateTransform = this.Orientation == et.X || this.InLineNamePlacement ? 0 : -90, i.Padding = this.NamePadding, i.Measure(this.NamePaint);
  }
  GetPossibleSize(t) {
    if (this._dataBounds == null)
      throw new u.Exception("DataBounds not found");
    if (this.LabelsPaint == null)
      return new U(0, 0);
    let i = this._textSize, s = this.Labeler;
    this.Labels != null && (s = pt.BuildNamedLabeler(this.Labels).Function.bind(pt.BuildNamedLabeler(this.Labels)), this._minStep = 1);
    let r = L.GetTick(this, t.DrawMarginSize.Clone()).Value, h = this.MaxLimit == null ? this._visibleDataBounds.Max : this.MaxLimit, o = this.MinLimit == null ? this._visibleDataBounds.Min : this.MinLimit;
    r < this._minStep && (r = this._minStep), this._forceStepToMin && (r = this._minStep);
    let l = Math.trunc(o / r) * r, c = 0, p = 0, m = this.LabelsRotation;
    for (let P = l; P <= h; P += r) {
      let C = this._textGeometryFactory();
      C.Text = this.TryGetLabelOrLogError(s, P), C.TextSize = i, C.RotateTransform = m, C.Padding = this._padding;
      let G = C.Measure(this.LabelsPaint);
      G.Width > c && (c = G.Width), G.Height > p && (p = G.Height);
    }
    return new U(c, p);
  }
  Initialize(t) {
    this._orientation = t, this._dataBounds = new $(), this._visibleDataBounds = new $(), this._animatableBounds ?? (this._animatableBounds = new Ls()), this.Initialized.Invoke(this);
  }
  Delete(t) {
    for (const i of this.GetPaintTasks())
      i != null && (t.Canvas.RemovePaintTask(i), i.ClearGeometriesFromPaintTask(t.Canvas));
    this.activeSeparators.Remove(t);
  }
  RemoveFromUI(t) {
    super.RemoveFromUI(t), this._animatableBounds = null, this.activeSeparators.Remove(t);
  }
  OnPaintChanged(t) {
    super.OnPaintChanged(t), this.OnPropertyChanged(t);
  }
  GetPaintTasks() {
    return [this._separatorsPaint, this._labelsPaint, this._namePaint, this._zeroPaint, this._ticksPaint, this._subticksPaint, this._subseparatorsPaint];
  }
  GetPossibleMaxLabelSize(t) {
    if (this.LabelsPaint == null)
      return new U();
    let i = this.Labeler;
    this.Labels != null && (i = pt.BuildNamedLabeler(this.Labels).Function.bind(pt.BuildNamedLabeler(this.Labels)), this._minStep = 1);
    let a = L.GetTick(this, t.DrawMarginSize.Clone()).Value, r = this.MaxLimit == null ? this._visibleDataBounds.Max : this.MaxLimit, h = this.MinLimit == null ? this._visibleDataBounds.Min : this.MinLimit;
    a == 0 && (a = 1), a < this._minStep && (a = this._minStep), this._forceStepToMin && (a = this._minStep);
    let o = new U();
    if (r - h == 0)
      return o;
    for (let l = h; l <= r; l += a) {
      let c = this._textGeometryFactory();
      c.Text = i(l), c.TextSize = this._textSize, c.RotateTransform = this.LabelsRotation, c.Padding = this._padding;
      let p = c.Measure(this.LabelsPaint);
      o = new U(
        o.Width > p.Width ? o.Width : p.Width,
        o.Height > p.Height ? o.Height : p.Height
      );
    }
    return o;
  }
  DrawName(t, i, s, a, r, h) {
    let o = !1;
    this._nameGeometry == null && (this._nameGeometry = this._textGeometryFactory(), this._nameGeometry.TextSize = i, this._nameGeometry.HorizontalAlign = it.Middle, this._nameGeometry.VerticalAlign = it.Middle, L.TransitionateProperties(
      this._nameGeometry,
      "X",
      "Y"
    ).WithAnimationBuilder((l) => l.WithDuration(this.AnimationsSpeed ?? t.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? t.EasingFunction)), o = !0), this._nameGeometry.Padding = this.NamePadding, this._nameGeometry.Text = this.Name ?? "", this._nameGeometry.TextSize = this._nameTextSize, this._orientation == et.X ? this.InLineNamePlacement ? (this._nameGeometry.X = this._nameDesiredSize.X + this._nameDesiredSize.Width * 0.5, this._nameGeometry.Y = this._nameDesiredSize.Y + this._nameDesiredSize.Height * 0.5) : (this._nameGeometry.X = (s + a) * 0.5, this._nameGeometry.Y = this._nameDesiredSize.Y + this._nameDesiredSize.Height * 0.5) : this.InLineNamePlacement ? (this._nameGeometry.X = this._nameDesiredSize.X + this._nameDesiredSize.Width * 0.5, this._nameGeometry.Y = this._nameDesiredSize.Height * 0.5) : (this._nameGeometry.RotateTransform = -90, this._nameGeometry.X = this._nameDesiredSize.X + this._nameDesiredSize.Width * 0.5, this._nameGeometry.Y = (r + h) * 0.5), o && this._nameGeometry.CompleteTransition();
  }
  InitializeSeparator(t, i, s = null) {
    let a;
    s != null ? a = s : (a = this._lineGeometryFactory(), t.Separator = a), t.Separator = a, this.InitializeLine(a, i);
  }
  InitializeSubseparators(t, i) {
    t.Subseparators = new Array(this._subSections);
    for (let s = 0; s < this._subSections; s++) {
      let a = this._lineGeometryFactory();
      t.Subseparators[s] = a, this.InitializeTick(t, i, a);
    }
  }
  InitializeLine(t, i) {
    L.TransitionateProperties(
      t,
      "X",
      "X1",
      "Y",
      "Y1",
      "Opacity"
    ).WithAnimationBuilder((s) => s.WithDuration(this.AnimationsSpeed ?? i.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? i.EasingFunction));
  }
  InitializeTick(t, i, s = null) {
    let a;
    s != null ? a = s : (a = this._lineGeometryFactory(), t.Tick = a), L.TransitionateProperties(
      a,
      "X",
      "X1",
      "Y",
      "Y1",
      "Opacity"
    ).WithAnimationBuilder((r) => r.WithDuration(this.AnimationsSpeed ?? i.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? i.EasingFunction));
  }
  InitializeSubticks(t, i) {
    t.Subticks = new Array(this._subSections);
    for (let s = 0; s < this._subSections; s++) {
      let a = this._lineGeometryFactory();
      t.Subticks[s] = a, this.InitializeTick(t, i, a);
    }
  }
  IntializeLabel(t, i, s, a, r) {
    let h = this._textGeometryFactory();
    h.TextSize = s, t.Label = h, a && (h.RotateTransform = r), L.TransitionateProperties(
      h,
      "X",
      "Y",
      "Opacity"
    ).WithAnimationBuilder((o) => o.WithDuration(this.AnimationsSpeed ?? i.AnimationsSpeed).WithEasingFunction(this.EasingFunction ?? i.EasingFunction));
  }
  UpdateSeparator(t, i, s, a, r, h, o, l) {
    this._orientation == et.X ? (t.X = i, t.X1 = i, t.Y = h, t.Y1 = o) : (t.X = a, t.X1 = r, t.Y = s, t.Y1 = s), this.SetUpdateMode(t, l);
  }
  UpdateTick(t, i, s, a, r) {
    if (this._orientation == et.X) {
      let h = a + this._size.Height * 0.5, o = a - this._size.Height * 0.5;
      t.X = s, t.X1 = s, t.Y = this._position == Pt.Start ? o : h - i, t.Y1 = this._position == Pt.Start ? o + i : h;
    } else {
      let h = s + this._size.Width * 0.5, o = s - this._size.Width * 0.5;
      t.X = this._position == Pt.Start ? h : o + i, t.X1 = this._position == Pt.Start ? h - i : o, t.Y = a, t.Y1 = a;
    }
    this.SetUpdateMode(t, r);
  }
  UpdateSubseparators(t, i, s, a, r, h, o, l, c, p) {
    for (let m = 0; m < t.length; m++) {
      let P = t[m], C = (m + 1) / (this._subSections + 1), G = 0, S = 0;
      this._orientation == et.X ? G = i.MeasureInPixels(s * C) : S = i.MeasureInPixels(s * C), this.UpdateSeparator(P, a + G, r + S, h, o, l, c, p);
    }
  }
  UpdateSubticks(t, i, s, a, r, h) {
    for (let o = 0; o < t.length; o++) {
      let l = t[o], c = 0.5, p = (o + 1) / (this._subSections + 1);
      Math.abs(p - 0.5) < 0.01 && (c += 0.25);
      let m = 0, P = 0;
      this._orientation == et.X ? m = i.MeasureInPixels(s * p) : P = i.MeasureInPixels(s * p), this.UpdateTick(l, this._tickLength * c, a + m, r + P, h);
    }
  }
  UpdateLabel(t, i, s, a, r, h, o) {
    let l = h, c = Math.PI / 180;
    if (this._orientation == et.Y)
      if (l %= 180, l < 0 && (l += 360), l > 90 && l < 180 && (l += 180), l > 180 && l < 270 && (l += 180), (this._labelsAlignment == null ? this._position == Pt.Start ? it.End : it.Start : this._labelsAlignment) == it.Start) {
        if (r && this._labelsPaint != null) {
          let m = this._textGeometryFactory();
          m.Text = a, m.TextSize = this._textSize, m.Padding = this._padding;
          let P = m.Measure(this._labelsPaint), C = Math.cos((90 - l) * c) * P.Height;
          i += Math.abs(C * 0.5);
        }
        i -= this._labelsDesiredSize.Width * 0.5, t.HorizontalAlign = it.Start;
      } else {
        if (r && this._labelsPaint != null) {
          let m = this._textGeometryFactory();
          m.Text = a, m.TextSize = this._textSize, m.Padding = this._padding;
          let P = m.Measure(this._labelsPaint), C = Math.cos((90 - l) * c) * P.Height;
          i -= Math.abs(C * 0.5);
        }
        i += this._labelsDesiredSize.Width * 0.5, t.HorizontalAlign = it.End;
      }
    if (this._orientation == et.X)
      if (l %= 180, l < 0 && (l += 180), l >= 90 && (l -= 180), (this._labelsAlignment == null ? this._position == Pt.Start ? it.Start : it.End : this._labelsAlignment) == it.Start) {
        if (r && this._labelsPaint != null) {
          let m = this._textGeometryFactory();
          m.Text = a, m.TextSize = this._textSize, m.Padding = this._padding;
          let P = m.Measure(this._labelsPaint), C = Math.sin((90 - l) * c) * P.Height;
          s += Math.abs(C * 0.5);
        }
        r ? (s -= this._labelsDesiredSize.Height * 0.5, t.HorizontalAlign = l < 0 ? it.End : it.Start) : t.HorizontalAlign = it.Middle;
      } else {
        if (r && this._labelsPaint != null) {
          let m = this._textGeometryFactory();
          m.Text = a, m.TextSize = this._textSize, m.Padding = this._padding;
          let P = m.Measure(this._labelsPaint), C = Math.sin((90 - l) * c) * P.Height;
          s -= Math.abs(C * 0.5);
        }
        r ? (s += this._labelsDesiredSize.Height * 0.5, t.HorizontalAlign = l < 0 ? it.Start : it.End) : t.HorizontalAlign = it.Middle;
      }
    t.Text = a, t.Padding = this._padding, t.X = i, t.Y = s, r && (t.RotateTransform = l), this.SetUpdateMode(t, o);
  }
  SetUpdateMode(t, i) {
    switch (i) {
      case rt.UpdateAndComplete:
        this._animatableBounds.HasPreviousState && (t.Opacity = 0), t.CompleteTransition();
        break;
      case rt.UpdateAndRemove:
        t.Opacity = 0, t.RemoveOnCompleted = !0;
        break;
      case rt.Update:
      default:
        t.Opacity = 1;
        break;
    }
  }
  TryGetLabelOrLogError(t, i) {
    try {
      return t(i);
    } catch {
      return "";
    }
  }
};
let Zs = Xs;
n(Zs, "$meta_LiveChartsCore_ICartesianAxis", !0);
var rt = /* @__PURE__ */ ((d) => (d[d.Update = 0] = "Update", d[d.UpdateAndComplete = 1] = "UpdateAndComplete", d[d.UpdateAndRemove = 2] = "UpdateAndRemove", d))(rt || {}), ki;
class Ha {
  constructor(e) {
    n(this, "_everMeasuredSeries", new u.HashSet());
    n(this, "_updateThrottler");
    n(this, "_panningThrottler");
    n(this, "_isHeatInCanvas", !1);
    n(this, "_heatPaint");
    n(this, "_previousStroke");
    n(this, "_previousFill");
    n(this, "_pointerPanningPosition", new B(-10, -10).Clone());
    n(this, "_pointerPreviousPanningPosition", new B(-10, -10).Clone());
    n(this, "_isPanning", !1);
    n(this, "_mapFactory");
    n(this, "_activeMap");
    n(this, "_isUnloaded", !1);
    n(this, "PointerDown", new u.Event());
    n(this, "PointerMove", new u.Event());
    n(this, "PointerUp", new u.Event());
    n(this, "PointerLeft", new u.Event());
    n(this, "PanGesture", new u.Event());
    T(this, ki, void 0);
    this.View = e, this._updateThrottler = e.DesignerMode ? new Zt(() => Promise.resolve(), u.TimeSpan.FromMilliseconds(50)) : new Zt(this.UpdateThrottlerUnlocked.bind(this), u.TimeSpan.FromMilliseconds(100)), this._heatPaint = j.DefaultSettings.GetProvider().GetSolidColorPaint(), this._mapFactory = j.DefaultSettings.GetProvider().GetDefaultMapFactory(), this.PointerDown.Add(this.Chart_PointerDown, this), this.PointerMove.Add(this.Chart_PointerMove, this), this.PointerUp.Add(this.Chart_PointerUp, this), this.PointerLeft.Add(this.Chart_PointerLeft, this), this._panningThrottler = new Zt(this.PanningThrottlerUnlocked.bind(this), u.TimeSpan.FromMilliseconds(30));
  }
  get View() {
    return M(this, ki);
  }
  set View(e) {
    v(this, ki, e);
  }
  ViewTo(e) {
    this._mapFactory.ViewTo(this, e);
  }
  Pan(e) {
    this._mapFactory.Pan(this, e.Clone());
  }
  Update(e = null) {
    if (e ?? (e = new An()), !(e.IsAutomaticUpdate && !this.View.AutoUpdateEnabled)) {
      if (!e.Throttling) {
        this._updateThrottler.ForceCall();
        return;
      }
      this._updateThrottler.Call();
    }
  }
  Unload() {
    this.View.Stroke != null && this.View.Canvas.RemovePaintTask(this.View.Stroke), this.View.Fill != null && this.View.Canvas.RemovePaintTask(this.View.Fill), this._everMeasuredSeries.Clear(), this._heatPaint = null, this._previousStroke = null, this._previousFill = null, this._isUnloaded = !0, this._mapFactory.Dispose(), this._activeMap?.Dispose(), this._activeMap = null, this._mapFactory = null, this.View.Canvas.Dispose();
  }
  InvokePointerDown(e) {
    this.PointerDown.Invoke(e.Clone());
  }
  InvokePointerMove(e) {
    this.PointerMove.Invoke(e.Clone());
  }
  InvokePointerUp(e) {
    this.PointerUp.Invoke(e.Clone());
  }
  InvokePointerLeft() {
    this.PointerLeft.Invoke();
  }
  InvokePanGestrue(e) {
    this.PanGesture.Invoke(e);
  }
  UpdateThrottlerUnlocked() {
    return new Promise((e) => {
      this.View.InvokeOnUIThread(() => {
        {
          if (this._isUnloaded)
            return;
          this.Measure();
        }
      }), e();
    });
  }
  Measure() {
    this._activeMap != null && this._activeMap != this.View.ActiveMap && (this._previousStroke?.ClearGeometriesFromPaintTask(this.View.Canvas), this._previousFill?.ClearGeometriesFromPaintTask(this.View.Canvas), this._previousFill = null, this._previousStroke = null, this.View.Canvas.Clear()), this._activeMap = this.View.ActiveMap, this._isHeatInCanvas || (this.View.Canvas.AddDrawableTask(this._heatPaint), this._isHeatInCanvas = !0), this._previousStroke != this.View.Stroke && (this._previousStroke != null && this.View.Canvas.RemovePaintTask(this._previousStroke), this.View.Stroke != null && (this.View.Stroke.ZIndex == 0 && (this.View.Stroke.ZIndex = 2), this.View.Stroke.IsStroke = !0, this.View.Stroke.IsFill = !1, this.View.Canvas.AddDrawableTask(this.View.Stroke)), this._previousStroke = this.View.Stroke), this._previousFill != this.View.Fill && (this._previousFill != null && this.View.Canvas.RemovePaintTask(this._previousFill), this.View.Fill != null && (this.View.Fill.IsStroke = !1, this.View.Fill.IsFill = !0, this.View.Canvas.AddDrawableTask(this.View.Fill)), this._previousFill = this.View.Fill);
    let e = this._previousFill?.ZIndex ?? 0;
    this._heatPaint.ZIndex = e + 1;
    let t = new ma(
      this,
      this.View,
      this.View.ActiveMap,
      Gn.BuildProjector(this.View.MapProjection, this.View.Width, this.View.Height)
    );
    this._mapFactory.GenerateLands(t);
    let i = new u.HashSet(this._everMeasuredSeries);
    for (const s of this.View.Series.Cast())
      s.Measure(t), this._everMeasuredSeries.Add(s), i.Remove(s);
    for (const s of i)
      s.Delete(t), this._everMeasuredSeries.Remove(s);
    this.View.Canvas.Invalidate();
  }
  PanningThrottlerUnlocked() {
    return new Promise((e) => {
      this.View.InvokeOnUIThread(() => {
        this.Pan(
          new B(
            this._pointerPanningPosition.X - this._pointerPreviousPanningPosition.X,
            this._pointerPanningPosition.Y - this._pointerPreviousPanningPosition.Y
          )
        ), this._pointerPreviousPanningPosition = new B(this._pointerPanningPosition.X, this._pointerPanningPosition.Y);
      }), e();
    });
  }
  Chart_PointerDown(e) {
    this._isPanning = !0, this._pointerPreviousPanningPosition = e.Clone();
  }
  Chart_PointerMove(e) {
    !this._isPanning || (this._pointerPanningPosition = e.Clone(), this._panningThrottler.Call());
  }
  Chart_PointerLeft() {
  }
  Chart_PointerUp(e) {
    !this._isPanning || (this._isPanning = !1, this._panningThrottler.Call());
  }
}
ki = new WeakMap();
var Ii, Vi, Li, Bi;
class ha extends en {
  constructor(t, i, s, a = !1) {
    super(s, i, t);
    n(this, "_chartView");
    n(this, "_nextSeries", 0);
    n(this, "_requiresLegendMeasureAlways", !1);
    T(this, Ii, []);
    T(this, Vi, new $());
    T(this, Li, new $());
    T(this, Bi, new $());
    this._chartView = t, this._requiresLegendMeasureAlways = a;
  }
  get Series() {
    return M(this, Ii);
  }
  set Series(t) {
    v(this, Ii, t);
  }
  get ChartSeries() {
    return this.Series.Where((t) => !t.IsFillSeries);
  }
  get View() {
    return this._chartView;
  }
  get ValueBounds() {
    return M(this, Vi);
  }
  set ValueBounds(t) {
    v(this, Vi, t);
  }
  get IndexBounds() {
    return M(this, Li);
  }
  set IndexBounds(t) {
    v(this, Li, t);
  }
  get PushoutBounds() {
    return M(this, Bi);
  }
  set PushoutBounds(t) {
    v(this, Bi, t);
  }
  FindHoveredPointsBy(t) {
    return this._chartView.Series.Where((i) => Un(i) && !i.IsFillSeries).Where((i) => i.IsHoverable).SelectMany((i) => i.FindHitPoints(this, t.Clone(), _t.CompareAll));
  }
  Measure() {
    if (!this.IsLoaded)
      return;
    this.InvokeOnMeasuring(), this._preserveFirstDraw && (this.IsFirstDraw = !0, this._preserveFirstDraw = !1), this.MeasureWork = {};
    let t = this._chartView.DrawMargin;
    this.ControlSize = this._chartView.ControlSize.Clone();
    let i = this._chartView.Series == null ? [] : this._chartView.Series.Where((p) => p.IsVisible);
    this.Series = i.Cast().ToArray(), this.VisualElements = this._chartView.VisualElements?.ToArray() ?? [], this.LegendPosition = this._chartView.LegendPosition, this.Legend = this._chartView.Legend, this.TooltipPosition = this._chartView.TooltipPosition, this.Tooltip = this._chartView.Tooltip, this.AnimationsSpeed = this._chartView.AnimationsSpeed, this.EasingFunction = this._chartView.EasingFunction, this.SeriesContext = new Hs(this.Series);
    let s = j.DefaultSettings.CurrentThemeId != this.ThemeId, a = j.DefaultSettings.GetTheme();
    this.ValueBounds = new $(), this.IndexBounds = new $(), this.PushoutBounds = new $();
    for (const p of this.Series) {
      p.SeriesId == -1 && (p.SeriesId = this._nextSeries++);
      let m = p;
      m._isInternalSet = !0, (!m._isThemeSet || s) && (a.ApplyStyleToSeries(p), m._isThemeSet = !0);
      let P = p.GetBounds(this);
      this.ValueBounds.AppendValue(P.PrimaryBounds.Max), this.ValueBounds.AppendValue(P.PrimaryBounds.Min), this.IndexBounds.AppendValue(P.SecondaryBounds.Max), this.IndexBounds.AppendValue(P.SecondaryBounds.Min), this.PushoutBounds.AppendValue(P.TertiaryBounds.Max), this.PushoutBounds.AppendValue(P.TertiaryBounds.Min), m._isInternalSet = !1;
    }
    this.InitializeVisualsCollector();
    let r = this.Series.Where((p) => p.IsVisibleAtLegend).ToArray();
    this.DrawLegend(r);
    let h = this.View.Title, o = lt.Empty();
    if (h != null) {
      let p = h.Measure(this, null, null);
      o.Top = p.Height, p.Height;
    }
    let l = t ?? lt.All(lt.Auto), c = new lt(
      lt.IsAuto(l.Left) ? o.Left : l.Left,
      lt.IsAuto(l.Top) ? o.Top : l.Top,
      lt.IsAuto(l.Right) ? o.Right : l.Right,
      lt.IsAuto(l.Bottom) ? o.Bottom : l.Bottom
    );
    if (this.SetDrawMargin(this.ControlSize.Clone(), c), !(this.DrawMarginSize.Width <= 0 || this.DrawMarginSize.Height <= 0)) {
      if (this.UpdateBounds(), h != null) {
        let p = h.Measure(this, null, null);
        h.AlignToTopLeftCorner(), h.X = this.ControlSize.Width * 0.5 - p.Width * 0.5, h.Y = 0, this.AddVisual(h);
      }
      for (const p of this.VisualElements)
        this.AddVisual(p);
      for (const p of this.Series)
        this.AddVisual(p);
      this.CollectVisuals(), this.InvokeOnUpdateStarted(), this.IsFirstDraw = !1, this.ThemeId = j.DefaultSettings.CurrentThemeId, this.PreviousSeriesAtLegend = this.Series.Where((p) => p.IsVisibleAtLegend).ToArray(), this.PreviousLegendPosition = this.LegendPosition, this.Canvas.Invalidate();
    }
  }
  Unload() {
    super.Unload(), this.IsFirstDraw = !0;
  }
}
Ii = new WeakMap(), Vi = new WeakMap(), Li = new WeakMap(), Bi = new WeakMap();
var Gi, Fi, Ri, zi, Ei;
const bt = class extends en {
  constructor(t, i, s, a) {
    super(s, i, t);
    n(this, "_chartView");
    n(this, "_zoomingSection");
    n(this, "_nextSeries", 0);
    n(this, "_zoomingSpeed", 0);
    n(this, "_zoomMode", 0);
    n(this, "_previousDrawMarginFrame");
    n(this, "_crosshair", new u.HashSet());
    T(this, Gi, []);
    T(this, Fi, []);
    T(this, Ri, []);
    T(this, zi, []);
    T(this, Ei, !1);
    n(this, "_sectionZoomingStart", null);
    if (a == null)
      throw new u.Exception("zoomingSection is required.");
    this._chartView = t, this._zoomingSection = a, this._zoomingSection.X = -1, this._zoomingSection.Y = -1, this._zoomingSection.Width = 0, this._zoomingSection.Height = 0;
  }
  get XAxes() {
    return M(this, Gi);
  }
  set XAxes(t) {
    v(this, Gi, t);
  }
  get YAxes() {
    return M(this, Fi);
  }
  set YAxes(t) {
    v(this, Fi, t);
  }
  get Series() {
    return M(this, Ri);
  }
  set Series(t) {
    v(this, Ri, t);
  }
  get Sections() {
    return M(this, zi);
  }
  set Sections(t) {
    v(this, zi, t);
  }
  get ChartSeries() {
    return this.Series;
  }
  get IsZoomingOrPanning() {
    return M(this, Ei);
  }
  set IsZoomingOrPanning(t) {
    v(this, Ei, t);
  }
  get View() {
    return this._chartView;
  }
  FindHoveredPointsBy(t) {
    let i = this.TooltipFindingStrategy;
    return i == _t.Automatic && (i = L.GetTooltipFindingStrategy(this.Series)), this.ChartSeries.Where((s) => s.IsHoverable).SelectMany((s) => s.FindHitPoints(this, t.Clone(), i));
  }
  ScaleUIPoint(t, i = 0, s = 0) {
    let a = this.XAxes[i], r = this.YAxes[s], h = dt.Make(this.DrawMarginLocation.Clone(), this.DrawMarginSize.Clone(), a), o = dt.Make(this.DrawMarginLocation.Clone(), this.DrawMarginSize.Clone(), r);
    return new Float64Array([h.ToChartValues(t.X), o.ToChartValues(t.Y)]);
  }
  Zoom(t, i, s = null, a = !1) {
    if (this.YAxes == null || this.XAxes == null)
      return;
    let r = this._zoomingSpeed < 0.1 ? 0.1 : this._zoomingSpeed > 0.95 ? 0.95 : this._zoomingSpeed;
    if (r = 1 - r, s != null && i != wt.DefinedByScaleFactor)
      throw new u.InvalidOperationException("When the scale factor is defined, the zoom direction must be DefinedByScaleFactor... it just makes sense.");
    let h = i == wt.ZoomIn ? r : 1 / r;
    if ((this._zoomMode & ot.X) == ot.X)
      for (let o = 0; o < this.XAxes.length; o++) {
        let l = this.XAxes[o], c = dt.Make(this.DrawMarginLocation.Clone(), this.DrawMarginSize.Clone(), l).ToChartValues(t.X), p = l.MaxLimit == null ? l.DataBounds.Max : l.MaxLimit, m = l.MinLimit == null ? l.DataBounds.Min : l.MinLimit, P = 0, C = 0, G = p - m;
        if (s == null) {
          let y = (c - m) / G, g = 1 - y, _ = G * h;
          P = c - _ * y, C = c + _ * g;
        } else {
          let y = 1 - s, g = 0;
          y < 0 ? (g = -1, i = wt.ZoomIn) : (g = 1, i = wt.ZoomOut);
          let _ = G * Math.abs(y);
          P = m - _ * 0.5 * g, C = p + _ * 0.5 * g;
        }
        let S = l.MinZoomDelta ?? l.DataBounds.MinDelta * 3;
        if (i == wt.ZoomIn && C - P < S)
          continue;
        let f = (p - m) * (a ? bt.MaxAxisActiveBound : bt.MaxAxisBound);
        C > l.DataBounds.Max && i == wt.ZoomOut && (C = l.DataBounds.Max + f), P < l.DataBounds.Min && i == wt.ZoomOut && (P = l.DataBounds.Min - f), l.MaxLimit = C, l.MinLimit = P;
      }
    if ((this._zoomMode & ot.Y) == ot.Y)
      for (let o = 0; o < this.YAxes.length; o++) {
        let l = this.YAxes[o], c = dt.Make(this.DrawMarginLocation.Clone(), this.DrawMarginSize.Clone(), l).ToChartValues(t.Y), p = l.MaxLimit == null ? l.DataBounds.Max : l.MaxLimit, m = l.MinLimit == null ? l.DataBounds.Min : l.MinLimit, P = 0, C = 0, G = p - m;
        if (s == null) {
          let y = (c - m) / G, g = 1 - y, _ = G * h;
          P = c - _ * y, C = c + _ * g;
        } else {
          let y = 1 - s, g = 0;
          y < 0 ? (g = -1, i = wt.ZoomIn) : (g = 1, i = wt.ZoomOut);
          let _ = G * Math.abs(y);
          P = m - _ * 0.5 * g, C = p + _ * 0.5 * g;
        }
        let S = l.MinZoomDelta ?? l.DataBounds.MinDelta * 3;
        if (i == wt.ZoomIn && C - P < S)
          continue;
        let f = (p - m) * (a ? bt.MaxAxisActiveBound : bt.MaxAxisBound);
        C > l.DataBounds.Max && i == wt.ZoomOut && (C = l.DataBounds.Max + f), P < l.DataBounds.Min && i == wt.ZoomOut && (P = l.DataBounds.Min - f), l.MaxLimit = C, l.MinLimit = P;
      }
    this.IsZoomingOrPanning = !0;
  }
  Pan(t, i) {
    if ((this._zoomMode & ot.X) == ot.X)
      for (let s = 0; s < this.XAxes.length; s++) {
        let a = this.XAxes[s], r = dt.Make(this.DrawMarginLocation.Clone(), this.DrawMarginSize.Clone(), a), h = r.ToChartValues(-t.X) - r.ToChartValues(0), o = a.MaxLimit == null ? a.DataBounds.Max : a.MaxLimit, l = a.MinLimit == null ? a.DataBounds.Min : a.MinLimit, c = o - l;
        if (c = i ? c * bt.MaxAxisActiveBound : c * bt.MaxAxisBound, o + h > a.DataBounds.Max && t.X < 0) {
          a.MaxLimit = a.DataBounds.Max + c, a.MinLimit = a.DataBounds.Max - (o - c - l);
          continue;
        }
        if (l + h < a.DataBounds.Min && t.X > 0) {
          a.MinLimit = a.DataBounds.Min - c, a.MaxLimit = a.DataBounds.Min + o - l - c;
          continue;
        }
        a.MaxLimit = o + h, a.MinLimit = l + h;
      }
    if ((this._zoomMode & ot.Y) == ot.Y)
      for (let s = 0; s < this.YAxes.length; s++) {
        let a = this.YAxes[s], r = dt.Make(this.DrawMarginLocation.Clone(), this.DrawMarginSize.Clone(), a), h = -(r.ToChartValues(t.Y) - r.ToChartValues(0)), o = a.MaxLimit == null ? a.DataBounds.Max : a.MaxLimit, l = a.MinLimit == null ? a.DataBounds.Min : a.MinLimit, c = o - l;
        if (c = i ? c * bt.MaxAxisActiveBound : c * bt.MaxAxisBound, o + h > a.DataBounds.Max) {
          a.MaxLimit = a.DataBounds.Max + c, a.MinLimit = a.DataBounds.Max - (o - c - l);
          continue;
        }
        if (l + h < a.DataBounds.Min) {
          a.MinLimit = a.DataBounds.Min - c, a.MaxLimit = a.DataBounds.Min + o - l - c;
          continue;
        }
        a.MaxLimit = o + h, a.MinLimit = l + h;
      }
    this.IsZoomingOrPanning = !0;
  }
  Measure() {
    if (!this.IsLoaded)
      return;
    this.InvokeOnMeasuring(), this._preserveFirstDraw && (this.IsFirstDraw = !0, this._preserveFirstDraw = !1), this.MeasureWork = {};
    let t = this._chartView.DrawMargin;
    this.ControlSize = this._chartView.ControlSize.Clone(), this.YAxes = this._chartView.YAxes.Cast().Select((S) => S).ToArray(), this.XAxes = this._chartView.XAxes.Cast().Select((S) => S).ToArray(), this._zoomingSpeed = this._chartView.ZoomingSpeed, this._zoomMode = this._chartView.ZoomMode;
    let i = j.DefaultSettings.GetTheme();
    this.LegendPosition = this._chartView.LegendPosition, this.Legend = this._chartView.Legend, this.TooltipPosition = this._chartView.TooltipPosition, this.TooltipFindingStrategy = this._chartView.TooltipFindingStrategy, this.Tooltip = this._chartView.Tooltip, this.AnimationsSpeed = this._chartView.AnimationsSpeed, this.EasingFunction = this._chartView.EasingFunction;
    let s = this._chartView.Series == null ? [] : this._chartView.Series.Where((S) => S.IsVisible);
    this.Series = s.Cast().ToArray(), this.Sections = this._chartView.Sections?.Where((S) => S.IsVisible).ToArray() ?? [], this.VisualElements = this._chartView.VisualElements?.ToArray() ?? [], this.SeriesContext = new Hs(this.Series);
    let a = j.DefaultSettings.CurrentThemeId != this.ThemeId;
    for (const S of this.XAxes) {
      let f = S;
      f._isInternalSet = !0, S.Initialize(et.X), (!f._isThemeSet || a) && (i.ApplyStyleToAxis(S), f._isThemeSet = !0), f._isInternalSet = !1, S.CrosshairPaint != null && this._crosshair.Add(S);
    }
    for (const S of this.YAxes) {
      let f = S;
      f._isInternalSet = !0, S.Initialize(et.Y), (!f._isThemeSet || a) && (i.ApplyStyleToAxis(S), f._isThemeSet = !0), f._isInternalSet = !1, S.CrosshairPaint != null && this._crosshair.Add(S);
    }
    this.SetDrawMargin(this.ControlSize.Clone(), lt.Empty());
    for (const S of this.Series) {
      S.SeriesId == -1 && (S.SeriesId = this._nextSeries++);
      let f = S;
      f._isInternalSet = !0, (!f._isThemeSet || a) && (i.ApplyStyleToSeries(S), f._isThemeSet = !0);
      let y = this.XAxes[S.ScalesXAt], g = this.YAxes[S.ScalesYAt], _ = S.GetBounds(this, y, g).Bounds;
      _.IsEmpty || (y.DataBounds.AppendValueByBounds(_.SecondaryBounds), g.DataBounds.AppendValueByBounds(_.PrimaryBounds), y.VisibleDataBounds.AppendValueByBounds(_.VisibleSecondaryBounds), g.VisibleDataBounds.AppendValueByBounds(_.VisiblePrimaryBounds), f._isInternalSet = !1);
    }
    for (const S of this.XAxes) {
      let f = S;
      if (f._isInternalSet = !0, !S.DataBounds.IsEmpty) {
        f._isInternalSet = !1;
        continue;
      }
      let y = 0, g = 10 * S.UnitWidth;
      S.DataBounds.AppendValue(g), S.DataBounds.AppendValue(y), S.VisibleDataBounds.AppendValue(g), S.VisibleDataBounds.AppendValue(y), S.DataBounds.MinDelta < g && (S.DataBounds.MinDelta = g), f._isInternalSet = !1;
    }
    for (const S of this.YAxes) {
      let f = S;
      if (f._isInternalSet = !0, !S.DataBounds.IsEmpty) {
        f._isInternalSet = !1;
        continue;
      }
      let y = 0, g = 10 * S.UnitWidth;
      S.DataBounds.AppendValue(g), S.DataBounds.AppendValue(y), S.VisibleDataBounds.AppendValue(g), S.VisibleDataBounds.AppendValue(y), S.DataBounds.MinDelta < g && (S.DataBounds.MinDelta = g), f._isInternalSet = !1;
    }
    this.InitializeVisualsCollector();
    let r = this.Series.Where((S) => S.IsVisibleAtLegend).ToArray();
    this.DrawLegend(r);
    let h = this.View.Title, o = lt.Empty(), l = 0, c = 0, p = 0, m = 0;
    if (h != null) {
      let S = h.Measure(this, null, null);
      o.Top = S.Height, l = S.Height;
    }
    this.SetDrawMargin(this.ControlSize.Clone(), o);
    for (const S of this.XAxes) {
      if (!S.IsVisible)
        continue;
      if (S.DataBounds.Max == S.DataBounds.Min) {
        let _ = S.UnitWidth * 0.5;
        S.DataBounds.Min = S.DataBounds.Min - _, S.DataBounds.Max = S.DataBounds.Max + _, S.VisibleDataBounds.Min = S.VisibleDataBounds.Min - _, S.VisibleDataBounds.Max = S.VisibleDataBounds.Max + _;
      }
      let f = S, y = f.GetNameLabelSize(this), g = f.GetPossibleSize(this);
      if (S.Size = g.Clone(), S.Position == Pt.Start)
        if (S.InLineNamePlacement) {
          let _ = g.Height > y.Height ? g.Height : y.Height;
          S.NameDesiredSize = new W(new B(0, this.ControlSize.Height - _), new U(y.Width, _)), S.LabelsDesiredSize = new W(new B(0, S.NameDesiredSize.Y - _), new U(this.ControlSize.Width, g.Height)), S.Yo = o.Bottom + _ * 0.5, c = _, o.Bottom = c, o.Left = y.Width;
        } else
          S.NameDesiredSize = new W(new B(0, this.ControlSize.Height - c - y.Height), new U(this.ControlSize.Width, y.Height)), S.LabelsDesiredSize = new W(new B(0, S.NameDesiredSize.Y - g.Height), new U(this.ControlSize.Width, g.Height)), S.Yo = o.Bottom + g.Height * 0.5 + y.Height, c += g.Height + y.Height, o.Bottom = c, g.Width * 0.5 > o.Left && (o.Left = g.Width * 0.5), g.Width * 0.5 > o.Right && (o.Right = g.Width * 0.5);
      else if (S.InLineNamePlacement) {
        let _ = g.Height > y.Height ? g.Height : y.Height;
        S.NameDesiredSize = new W(new B(0, 0), new U(y.Width, _)), S.LabelsDesiredSize = new W(new B(0, S.NameDesiredSize.Y - _), new U(this.ControlSize.Width, g.Height)), S.Yo = o.Top + _ * 0.5, l = _, o.Top = l, o.Left = y.Width;
      } else
        S.NameDesiredSize = new W(new B(0, l), new U(this.ControlSize.Width, y.Height)), S.LabelsDesiredSize = new W(new B(0, l + y.Height), new U(this.ControlSize.Width, g.Height)), S.Yo = l + g.Height * 0.5 + y.Height, l += g.Height + y.Height, o.Top = l, p + g.Width * 0.5 > o.Left && (o.Left = p + g.Width * 0.5), m + g.Width * 0.5 > o.Right && (o.Right = m + g.Width * 0.5);
    }
    for (const S of this.YAxes) {
      if (!S.IsVisible)
        continue;
      if (S.DataBounds.Max == S.DataBounds.Min) {
        let b = S.UnitWidth * 0.5;
        S.DataBounds.Min = S.DataBounds.Min - b, S.DataBounds.Max = S.DataBounds.Max + b, S.VisibleDataBounds.Min = S.VisibleDataBounds.Min - b, S.VisibleDataBounds.Max = S.VisibleDataBounds.Max + b;
      }
      let f = S, y = f.GetNameLabelSize(this), g = f.GetPossibleSize(this);
      S.Size = g.Clone();
      let _ = g.Width;
      S.Position == Pt.Start ? S.InLineNamePlacement ? (_ < y.Width && (_ = y.Width), S.NameDesiredSize = new W(new B(p, 0), new U(y.Width, y.Height)), S.LabelsDesiredSize = new W(new B(p, 0), new U(g.Width, this.ControlSize.Height)), S.Xo = p + _ * 0.5, p += _, o.Top = y.Height, o.Left = p) : (S.NameDesiredSize = new W(new B(p, 0), new U(y.Width, this.ControlSize.Height)), S.LabelsDesiredSize = new W(new B(p + y.Width, 0), new U(g.Width, this.ControlSize.Height)), S.Xo = p + _ * 0.5 + y.Width, p += _ + y.Width, o.Left = p, g.Height * 0.5 > o.Top && (o.Top = g.Height * 0.5), g.Height * 0.5 > o.Bottom && (o.Bottom = g.Height * 0.5)) : S.InLineNamePlacement ? (_ < y.Width && (_ = y.Width), S.NameDesiredSize = new W(new B(this.ControlSize.Width - m - y.Width, 0), new U(y.Width, y.Height)), S.LabelsDesiredSize = new W(new B(S.NameDesiredSize.X - g.Width, 0), new U(g.Width, this.ControlSize.Height)), S.Xo = m + _ * 0.5, m += _, o.Top = y.Height, o.Right = m) : (S.NameDesiredSize = new W(new B(this.ControlSize.Width - m - y.Width, 0), new U(y.Width, this.ControlSize.Height)), S.LabelsDesiredSize = new W(new B(S.NameDesiredSize.X - g.Width, 0), new U(g.Width, this.ControlSize.Height)), S.Xo = m + _ * 0.5 + y.Width, m += _ + y.Width, o.Right = m, l + g.Height * 0.5 > o.Top && (o.Top = l + g.Height * 0.5), c + g.Height * 0.5 > o.Bottom && (o.Bottom = c + g.Height * 0.5));
    }
    let P = t ?? lt.All(lt.Auto), C = new lt(
      lt.IsAuto(P.Left) ? o.Left : P.Left,
      lt.IsAuto(P.Top) ? o.Top : P.Top,
      lt.IsAuto(P.Right) ? o.Right : P.Right,
      lt.IsAuto(P.Bottom) ? o.Bottom : P.Bottom
    );
    if (this.SetDrawMargin(this.ControlSize.Clone(), C), this.DrawMarginSize.Width <= 0 || this.DrawMarginSize.Height <= 0)
      return;
    if (this.UpdateBounds(), h != null) {
      let S = h.Measure(this, null, null);
      h.AlignToTopLeftCorner(), h.X = this.ControlSize.Width * 0.5 - S.Width * 0.5, h.Y = 0, this.AddVisual(h);
    }
    let G = this.XAxes.Concat(this.YAxes).ToArray();
    for (const S of G) {
      if (S.DataBounds.Max == S.DataBounds.Min) {
        let f = S.DataBounds.Min * 0.3;
        S.DataBounds.Min = S.DataBounds.Min - f, S.DataBounds.Max = S.DataBounds.Max + f;
      }
      if (S.MinLimit == null) {
        let f = dt.Make(this.DrawMarginLocation.Clone(), this.DrawMarginSize.Clone(), S), y = Math.abs(f.ToChartValues(S.DataBounds.RequestedGeometrySize) - f.ToChartValues(0));
        S.DataBounds.PaddingMin > y && (y = S.DataBounds.PaddingMin);
        let g = S;
        g._isInternalSet = !0, S.DataBounds.Min = S.DataBounds.Min - y, S.VisibleDataBounds.Min = S.VisibleDataBounds.Min - y, g._isInternalSet = !1;
      }
      if (S.MaxLimit == null) {
        let f = dt.Make(this.DrawMarginLocation.Clone(), this.DrawMarginSize.Clone(), S), y = Math.abs(f.ToChartValues(S.DataBounds.RequestedGeometrySize) - f.ToChartValues(0));
        S.DataBounds.PaddingMax > y && (y = S.DataBounds.PaddingMax);
        let g = S;
        g._isInternalSet = !0, S.DataBounds.Max = S.DataBounds.Max + y, S.VisibleDataBounds.Max = S.VisibleDataBounds.Max + y, g._isInternalSet = !1;
      }
      S.IsVisible && this.AddVisual(S), S.RemoveOldPaints(this.View);
    }
    for (const S of this.Sections)
      this.AddVisual(S);
    for (const S of this.VisualElements)
      this.AddVisual(S);
    for (const S of this.Series)
      this.AddVisual(S);
    this._previousDrawMarginFrame != null && this._chartView.DrawMarginFrame != this._previousDrawMarginFrame && (this._previousDrawMarginFrame.RemoveFromUI(this), this._previousDrawMarginFrame = null), this._chartView.DrawMarginFrame != null && (this.AddVisual(this._chartView.DrawMarginFrame), this._previousDrawMarginFrame = this._chartView.DrawMarginFrame), this.CollectVisuals();
    for (const S of G) {
      if (!S.IsVisible)
        continue;
      let f = S;
      f._isInternalSet = !0, S.ActualBounds.HasPreviousState = !0, f._isInternalSet = !1;
    }
    this.ActualBounds.HasPreviousState = !0, this.IsZoomingOrPanning = !1, this.InvokeOnUpdateStarted(), this.IsFirstDraw = !1, this.ThemeId = j.DefaultSettings.CurrentThemeId, this.PreviousSeriesAtLegend = this.Series.Where((S) => S.IsVisibleAtLegend).ToArray(), this.PreviousLegendPosition = this.LegendPosition, this.Canvas.Invalidate();
  }
  Unload() {
    super.Unload(), this._crosshair = new u.HashSet(), this.IsFirstDraw = !0;
  }
  InvokePointerDown(t, i) {
    if (i && this._zoomMode != ot.None) {
      this._sectionZoomingStart = t.Clone();
      let s = t.X, a = t.Y;
      if (s < this.DrawMarginLocation.X || s > this.DrawMarginLocation.X + this.DrawMarginSize.Width || a < this.DrawMarginLocation.Y || a > this.DrawMarginLocation.Y + this.DrawMarginSize.Height) {
        this._sectionZoomingStart = null;
        return;
      }
      this._zoomingSection.X = s, this._zoomingSection.Y = a;
      let r = (this._zoomMode & ot.X) == ot.X, h = (this._zoomMode & ot.Y) == ot.Y;
      r || (this._zoomingSection.X = this.DrawMarginLocation.X, this._zoomingSection.Width = this.DrawMarginSize.Width), h || (this._zoomingSection.Y = this.DrawMarginLocation.Y, this._zoomingSection.Height = this.DrawMarginSize.Height);
      return;
    }
    super.InvokePointerDown(t.Clone(), i);
  }
  InvokePointerMove(t) {
    for (const i of this._crosshair)
      i.InvalidateCrosshair(this, t.Clone());
    if (this._sectionZoomingStart != null) {
      let i = (this._zoomMode & ot.X) == ot.X, s = (this._zoomMode & ot.Y) == ot.Y, a = t.X, r = t.Y;
      a < this.DrawMarginLocation.X && (a = this.DrawMarginLocation.X), a > this.DrawMarginLocation.X + this.DrawMarginSize.Width && (a = this.DrawMarginLocation.X + this.DrawMarginSize.Width), r < this.DrawMarginLocation.Y && (r = this.DrawMarginLocation.Y), r > this.DrawMarginLocation.Y + this.DrawMarginSize.Height && (r = this.DrawMarginLocation.Y + this.DrawMarginSize.Height), i && (this._zoomingSection.Width = a - this._sectionZoomingStart.X), s && (this._zoomingSection.Height = r - this._sectionZoomingStart.Y), this.Canvas.Invalidate();
      return;
    }
    super.InvokePointerMove(t.Clone());
  }
  InvokePointerUp(t, i) {
    if (this._sectionZoomingStart != null) {
      if (Math.sqrt(Math.pow(t.X - this._sectionZoomingStart.X, 2) + Math.pow(t.Y - this._sectionZoomingStart.Y, 2)) < 15) {
        this._zoomingSection.X = -1, this._zoomingSection.Y = -1, this._zoomingSection.Width = 0, this._zoomingSection.Height = 0, this.Update(), this._sectionZoomingStart = null;
        return;
      }
      if ((this._zoomMode & ot.X) == ot.X)
        for (let a = 0; a < this.XAxes.length; a++) {
          let r = this.XAxes[a], h = this.ScaleUIPoint(this._sectionZoomingStart.Clone(), a, 0)[0], o = this.ScaleUIPoint(t.Clone(), a, 0)[0], l = 0, c = 0;
          h > o ? (l = h, c = o) : (l = o, c = h), l > (r.MaxLimit ?? 17976931348623157e292) && (l = r.MaxLimit ?? 17976931348623157e292), c < (r.MinLimit ?? -17976931348623157e292) && (c = r.MinLimit ?? -17976931348623157e292);
          let p = r.MinZoomDelta ?? r.DataBounds.MinDelta * 3;
          if (l - c > p)
            r.MinLimit = c, r.MaxLimit = l;
          else if (r.MaxLimit != null && r.MinLimit != null) {
            let m = l - c, C = (r.MaxLimit - r.MinLimit - m) * 0.5;
            r.MinLimit = c - C, r.MaxLimit = l + C;
          }
        }
      if ((this._zoomMode & ot.Y) == ot.Y)
        for (let a = 0; a < this.YAxes.length; a++) {
          let r = this.YAxes[a], h = this.ScaleUIPoint(this._sectionZoomingStart.Clone(), 0, a)[1], o = this.ScaleUIPoint(t.Clone(), 0, a)[1], l = 0, c = 0;
          h > o ? (l = h, c = o) : (l = o, c = h), l > (r.MaxLimit ?? 17976931348623157e292) && (l = r.MaxLimit ?? 17976931348623157e292), c < (r.MinLimit ?? -17976931348623157e292) && (c = r.MinLimit ?? -17976931348623157e292);
          let p = r.MinZoomDelta ?? r.DataBounds.MinDelta * 3;
          if (l - c > p)
            r.MinLimit = c, r.MaxLimit = l;
          else if (r.MaxLimit != null && r.MinLimit != null) {
            let m = l - c, C = (r.MaxLimit - r.MinLimit - m) * 0.5;
            r.MinLimit = c - C, r.MaxLimit = l + C;
          }
        }
      this._zoomingSection.X = -1, this._zoomingSection.Y = -1, this._zoomingSection.Width = 0, this._zoomingSection.Height = 0, this._sectionZoomingStart = null;
      return;
    }
    super.InvokePointerUp(t.Clone(), i);
  }
};
let Ft = bt;
Gi = new WeakMap(), Fi = new WeakMap(), Ri = new WeakMap(), zi = new WeakMap(), Ei = new WeakMap(), n(Ft, "MaxAxisBound", 0.05), n(Ft, "MaxAxisActiveBound", 0.15);
class ua extends ee {
  constructor() {
    super(...arguments);
    n(this, "_stroke", null);
    n(this, "_fill", null);
  }
  get Stroke() {
    return this._stroke;
  }
  set Stroke(t) {
    this.SetPaintProperty(new u.Ref(() => this._stroke, (i) => this._stroke = i), t, !0, "Stroke");
  }
  get Fill() {
    return this._fill;
  }
  set Fill(t) {
    this.SetPaintProperty(new u.Ref(() => this._fill, (i) => this._fill = i), t, void 0, "Fill");
  }
  GetPaintTasks() {
    return [this._stroke, this._fill];
  }
  OnPaintChanged(t) {
    super.OnPaintChanged(t), this.OnPropertyChanged(t);
  }
}
class Ya extends ua {
  constructor(t) {
    super();
    n(this, "_sizedGeometryFactory");
    n(this, "_fillSizedGeometry");
    n(this, "_strokeSizedGeometry");
    n(this, "_isInitialized", !1);
    this._sizedGeometryFactory = t;
  }
  Invalidate(t) {
    let i = t.DrawMarginLocation.Clone(), s = t.DrawMarginSize.Clone();
    this.Fill != null && (this.Fill.ZIndex = -3, this._fillSizedGeometry ?? (this._fillSizedGeometry = this._sizedGeometryFactory()), this._fillSizedGeometry.X = i.X, this._fillSizedGeometry.Y = i.Y, this._fillSizedGeometry.Width = s.Width, this._fillSizedGeometry.Height = s.Height, this.Fill.AddGeometryToPaintTask(t.Canvas, this._fillSizedGeometry), t.Canvas.AddDrawableTask(this.Fill)), this.Stroke != null && (this.Stroke.ZIndex = -2, this._strokeSizedGeometry ?? (this._strokeSizedGeometry = this._sizedGeometryFactory()), this._strokeSizedGeometry.X = i.X, this._strokeSizedGeometry.Y = i.Y, this._strokeSizedGeometry.Width = s.Width, this._strokeSizedGeometry.Height = s.Height, this.Stroke.AddGeometryToPaintTask(t.Canvas, this._strokeSizedGeometry), t.Canvas.AddDrawableTask(this.Stroke)), this._isInitialized || (this._fillSizedGeometry != null && L.TransitionateProperties(
      this._fillSizedGeometry,
      "X",
      "Y",
      "Width",
      "Height"
    ).WithAnimationBuilder((a) => a.WithDuration(t.AnimationsSpeed).WithEasingFunction(t.EasingFunction)).CompleteCurrentTransitions(), this._strokeSizedGeometry != null && L.TransitionateProperties(
      this._strokeSizedGeometry,
      "X",
      "Y",
      "Width",
      "Height"
    ).WithAnimationBuilder((a) => a.WithDuration(t.AnimationsSpeed).WithEasingFunction(t.EasingFunction)).CompleteCurrentTransitions(), this._isInitialized = !0);
  }
}
class Vs {
  static BuildColorStops(e, t) {
    if (e.length < 2)
      throw new u.Exception("At least 2 colors are required in a heat map.");
    if (t == null) {
      let s = 1 / (e.length - 1);
      t = new Float64Array(e.length);
      let a = 0;
      for (let r = 0; r < e.length; r++)
        t[r] = a, a += s;
    }
    if (t.length != e.length)
      throw new u.Exception("ColorStops and HeatMap must have the same length.");
    let i = new u.List();
    for (let s = 0; s < t.length; s++)
      i.Add(new na(t[s], e[s].Clone()));
    return i;
  }
  static InterpolateColor(e, t, i, s) {
    let a = t.Max - t.Min;
    a == 0 && (a = Number.EPSILON);
    let r = (e - t.Min) / a;
    r < 0 && (r = 0), r > 1 && (r = 1);
    let h = s[0];
    for (let o = 1; o < s.length; o++) {
      let l = s[o];
      if (l.Value < r) {
        h = s[o];
        continue;
      }
      let c = (r - h.Value) / (l.Value - h.Value);
      return ht.FromArgb(
        Math.floor(h.Color.A + c * (l.Color.A - h.Color.A)) & 255,
        Math.floor(h.Color.R + c * (l.Color.R - h.Color.R)) & 255,
        Math.floor(h.Color.G + c * (l.Color.G - h.Color.G)) & 255,
        Math.floor(h.Color.B + c * (l.Color.B - h.Color.B)) & 255
      );
    }
    return i[i.length - 1];
  }
}
var Xi, Hi;
const Ht = class {
  static get IsConfigured() {
    return M(Ht, Xi);
  }
  static set IsConfigured(e) {
    v(Ht, Xi, e);
  }
  static get DefaultSettings() {
    return M(Ht, Hi);
  }
  static set DefaultSettings(e) {
    v(Ht, Hi, e);
  }
  static get HoverKey() {
    return "HoverKey";
  }
  static get TangentAngle() {
    return 1 << 25;
  }
  static get CotangentAngle() {
    return 1 << 26;
  }
  static Configure(e) {
    if (e == null)
      throw new u.Exception("LiveChartsSettings must not be null.");
    Ht.IsConfigured = !0, e(Ht.DefaultSettings);
  }
};
let j = Ht;
Xi = new WeakMap(), Hi = new WeakMap(), n(j, "EnableLogging", !1), n(j, "s_defaultPaintTask", {}), T(j, Xi, !1), T(j, Hi, new Xn()), n(j, "DisableAnimations", u.TimeSpan.FromMilliseconds(1));
var Yi;
const Ut = class {
  static get Default() {
    return M(Ut, Yi);
  }
  static set Default(e) {
    v(Ut, Yi, e);
  }
  static get SixRepresentativeDigits() {
    return Ut.Log10_6;
  }
  static get Currency() {
    return (e) => e.toString();
  }
  static SetDefaultLabeler(e) {
    Ut.Default = e;
  }
  static FormatCurrency(e, t, i, s) {
    return e.toString();
  }
  static BuildNamedLabeler(e) {
    return new Yn(e);
  }
  static Log10_6(e) {
    return e.toString();
  }
};
let pt = Ut;
Yi = new WeakMap(), T(pt, Yi, Ut.Log10_6);
class da {
  constructor(e, t) {
    n(this, "_isPaintInCanvas", !1);
    n(this, "_clipFor", {});
    n(this, "_series");
    n(this, "_paint");
    n(this, "_whenPredicate");
    this._series = e, this._paint = t;
  }
  When(e) {
    return this._whenPredicate = e, this._series.PointMeasured.Add(this.OnMeasured, this), this._series;
  }
  Unsubscribe() {
    this._series.PointMeasured.Remove(this.OnMeasured, this);
  }
  OnMeasured(e) {
    if (this._whenPredicate == null || e.Visual == null)
      return;
    let t = this._whenPredicate.call(this, e), i = e.Context.Chart.CoreChart.Canvas, s = e.Visual.MainGeometry;
    if (s != null) {
      if (this._isPaintInCanvas || (i.AddDrawableTask(this._paint), this._isPaintInCanvas = !0), e.Context.Chart.CoreChart.MeasureWork != this._clipFor && (this._clipFor = e.Context.Chart.CoreChart.MeasureWork, e.Context.Chart.CoreChart instanceof Ft)) {
        const a = e.Context.Chart.CoreChart;
        let r = a.DrawMarginLocation.Clone(), h = a.DrawMarginSize.Clone();
        this._paint.SetClipRectangle(a.Canvas, new W(r.Clone(), h.Clone()));
      }
      if (t) {
        this._paint.AddGeometryToPaintTask(i, s);
        for (const a of this._series.GetPaintTasks())
          a?.RemoveGeometryFromPainTask(i, s);
      } else
        this._paint.RemoveGeometryFromPainTask(i, s);
    }
  }
}
class Oa {
  static WithConditionalPaint(e, t) {
    return new da(e, t);
  }
}
var Oi;
class ca {
  constructor() {
    T(this, Oi, new u.Dictionary());
  }
  get Layers() {
    return M(this, Oi);
  }
  set Layers(e) {
    v(this, Oi, e);
  }
  FindLand(e, t = "default") {
    let i;
    return this.Layers.GetAt(t).Lands.TryGetValue(e, new u.Out(() => i, (s) => i = s)) ? i : null;
  }
  Dispose() {
    this.Layers.Clear();
  }
}
Oi = new WeakMap(), n(ca, "$meta_System_IDisposable", !0);
var Wi, Ni, Ui, Zi;
class Bn {
  constructor() {
    T(this, Wi, 0);
    T(this, Ni, 0);
    T(this, Ui, 0);
    T(this, Zi, 0);
  }
  get MapWidth() {
    return M(this, Wi);
  }
  set MapWidth(e) {
    v(this, Wi, e);
  }
  get MapHeight() {
    return M(this, Ni);
  }
  set MapHeight(e) {
    v(this, Ni, e);
  }
  get XOffset() {
    return M(this, Ui);
  }
  set XOffset(e) {
    v(this, Ui, e);
  }
  get YOffset() {
    return M(this, Zi);
  }
  set YOffset(e) {
    v(this, Zi, e);
  }
}
Wi = new WeakMap(), Ni = new WeakMap(), Ui = new WeakMap(), Zi = new WeakMap();
class Sn extends Bn {
  constructor(t, i, s, a) {
    super();
    n(this, "_w");
    n(this, "_h");
    n(this, "_ox");
    n(this, "_oy");
    this._w = t, this._h = i, this._ox = s, this._oy = a, this.XOffset = this._ox, this.YOffset = this._oy, this.MapWidth = t, this.MapHeight = i;
  }
  static get PreferredRatio() {
    return new Float32Array([1, 1]);
  }
  ToMap(t) {
    let i = t[1], s = t[0], a = i * Math.PI / 180, r = Math.log(Math.tan(Math.PI / 4 + a / 2)), h = this._h / 2 - this._h * r / (2 * Math.PI);
    return new Float32Array([
      (s + 180) * (this._w / 360) + this._ox,
      h + this._oy
    ]);
  }
}
class Gn {
  static BuildProjector(e, t, i) {
    let s = e == $s.Default ? pn.PreferredRatio : Sn.PreferredRatio, a = t / s[0], r = i / s[1], h = 0, o = 0;
    if (a < r) {
      let l = t * s[1] / s[0];
      o = (i - l) * 0.5, i = l;
    } else {
      let l = i * s[0] / s[1];
      h = (t - l) * 0.5, t = l;
    }
    return e == $s.Default ? new pn(t, i, h, o) : new Sn(t, i, h, o);
  }
}
class Wa {
  constructor() {
    n(this, "Type");
    n(this, "Coordinates");
  }
}
class Na {
  constructor() {
    n(this, "Type");
    n(this, "Features");
  }
}
var qi, ji, $i, Qi;
class Ua {
  constructor(e, t, i, s) {
    T(this, qi, void 0);
    T(this, ji, void 0);
    T(this, $i, void 0);
    T(this, Qi, void 0);
    this.Chart = e, this.HeatPaint = t, this.HeatStops = i, this.Bounds = s;
  }
  get Chart() {
    return M(this, qi);
  }
  set Chart(e) {
    v(this, qi, e);
  }
  get HeatPaint() {
    return M(this, ji);
  }
  set HeatPaint(e) {
    v(this, ji, e);
  }
  get HeatStops() {
    return M(this, $i);
  }
  set HeatStops(e) {
    v(this, $i, e);
  }
  get Bounds() {
    return M(this, Qi);
  }
  set Bounds(e) {
    v(this, Qi, e);
  }
}
qi = new WeakMap(), ji = new WeakMap(), $i = new WeakMap(), Qi = new WeakMap();
var Ki, Ji, ts, es;
class ma {
  constructor(e, t, i, s) {
    T(this, Ki, void 0);
    T(this, Ji, void 0);
    T(this, ts, void 0);
    T(this, es, void 0);
    this.CoreMap = e, this.MapFile = i, this.Projector = s, this.View = t;
  }
  get CoreMap() {
    return M(this, Ki);
  }
  set CoreMap(e) {
    v(this, Ki, e);
  }
  get MapFile() {
    return M(this, Ji);
  }
  set MapFile(e) {
    v(this, Ji, e);
  }
  get Projector() {
    return M(this, ts);
  }
  set Projector(e) {
    v(this, ts, e);
  }
  get View() {
    return M(this, es);
  }
  set View(e) {
    v(this, es, e);
  }
}
Ki = new WeakMap(), Ji = new WeakMap(), ts = new WeakMap(), es = new WeakMap();
var is, ss;
class Za {
  constructor(e, t) {
    T(this, is, B.Empty.Clone());
    T(this, ss, 0);
    this.Pivot = e.Clone(), this.Direction = t;
  }
  get Pivot() {
    return M(this, is);
  }
  set Pivot(e) {
    v(this, is, e);
  }
  get Direction() {
    return M(this, ss);
  }
  set Direction(e) {
    v(this, ss, e);
  }
}
is = new WeakMap(), ss = new WeakMap();
var $s = /* @__PURE__ */ ((d) => (d[d.Default = 0] = "Default", d[d.Mercator = 1] = "Mercator", d))($s || {}), ns, as;
class qa {
  constructor(e) {
    n(this, "MaxBounds", new Float64Array([-17976931348623157e292, -17976931348623157e292]));
    n(this, "MinBounds", new Float64Array([17976931348623157e292, 17976931348623157e292]));
    T(this, ns, 0);
    T(this, as, void 0);
    n(this, "Shape");
    let t = new u.List();
    for (const i of e) {
      let s = i[0], a = i[1];
      s > this.MaxBounds[0] && (this.MaxBounds[0] = s), s < this.MinBounds[0] && (this.MinBounds[0] = s), a > this.MaxBounds[1] && (this.MaxBounds[1] = a), a < this.MinBounds[1] && (this.MinBounds[1] = a), t.Add(new le(s, a));
    }
    this.Coordinates = t.ToArray(), this.BoundsHypotenuse = Math.sqrt(Math.pow(this.MaxBounds[0] - this.MinBounds[0], 2) + Math.pow(this.MaxBounds[1] - this.MinBounds[1], 2));
  }
  get BoundsHypotenuse() {
    return M(this, ns);
  }
  set BoundsHypotenuse(e) {
    v(this, ns, e);
  }
  get Coordinates() {
    return M(this, as);
  }
  set Coordinates(e) {
    v(this, as, e);
  }
}
ns = new WeakMap(), as = new WeakMap();
var rs, os, ls, hs;
class ja {
  constructor(e, t, i) {
    T(this, rs, "");
    T(this, os, "");
    n(this, "SetOf", "");
    T(this, ls, 0);
    T(this, hs, 0);
    n(this, "MaxBounds", new Float64Array([-17976931348623157e292, -17976931348623157e292]));
    n(this, "MinBounds", new Float64Array([17976931348623157e292, 17976931348623157e292]));
    n(this, "Data", []);
    this.Name = t, this.ShortName = e, this.SetOf = i;
  }
  get ShortName() {
    return M(this, rs);
  }
  set ShortName(e) {
    v(this, rs, e);
  }
  get Name() {
    return M(this, os);
  }
  set Name(e) {
    v(this, os, e);
  }
  get HSize() {
    return M(this, ls);
  }
  set HSize(e) {
    v(this, ls, e);
  }
  get HCenter() {
    return M(this, hs);
  }
  set HCenter(e) {
    v(this, hs, e);
  }
}
rs = new WeakMap(), os = new WeakMap(), ls = new WeakMap(), hs = new WeakMap();
class $a {
  constructor() {
    n(this, "Type");
    n(this, "Properties");
    n(this, "Geometry");
  }
}
class pn extends Bn {
  constructor(t, i, s, a) {
    super();
    n(this, "_w");
    n(this, "_h");
    n(this, "_ox");
    n(this, "_oy");
    this._w = t, this._h = i, this._ox = s, this._oy = a, this.XOffset = this._ox, this.YOffset = this._oy, this.MapWidth = t, this.MapHeight = i;
  }
  static get PreferredRatio() {
    return new Float32Array([2, 1]);
  }
  ToMap(t) {
    return new Float32Array([
      this._ox + (t[0] + 180) / 360 * this._w,
      this._oy + (90 - t[1]) / 180 * this._h
    ]);
  }
}
var us;
class Qa {
  constructor(e, t, i) {
    n(this, "Name", "");
    n(this, "ProcessIndex", 0);
    n(this, "IsVisible", !0);
    n(this, "Stroke");
    n(this, "Fill");
    n(this, "Max", new Float64Array());
    n(this, "Min", new Float64Array());
    T(this, us, new u.Dictionary());
    n(this, "AddLandWhen");
    this.Name = e, this.Stroke = t, this.Fill = i;
  }
  get Lands() {
    return M(this, us);
  }
  set Lands(e) {
    v(this, us, e);
  }
}
us = new WeakMap();
var ds;
class se {
  constructor(e) {
    n(this, "fromValue", null);
    n(this, "toValue", null);
    n(this, "_startTime", 0n);
    n(this, "_endTime", 0n);
    n(this, "_requiresToInitialize", !0);
    n(this, "Animation");
    T(this, ds, "");
    n(this, "IsCompleted", !1);
    this.PropertyName = e;
  }
  get FromValue() {
    return this.fromValue;
  }
  get ToValue() {
    return this.toValue;
  }
  get PropertyName() {
    return M(this, ds);
  }
  set PropertyName(e) {
    v(this, ds, e);
  }
  CopyFrom(e) {
    let t = e;
    this.fromValue = t.FromValue, this.toValue = t.ToValue, this._startTime = t._startTime, this._endTime = t._endTime, this._requiresToInitialize = t._requiresToInitialize, this.Animation = t.Animation, this.IsCompleted = t.IsCompleted;
  }
  SetMovement(e, t) {
    this.fromValue = this.GetMovement(t), this.toValue = e, this.Animation != null && (t.CurrentTime == BigInt("-9223372036854775808") ? this._requiresToInitialize = !0 : (this._startTime = t.CurrentTime, this._endTime = t.CurrentTime + this.Animation._duration), this.Animation._animationCompletedCount = 0, this.IsCompleted = !1, this._requiresToInitialize = !0), t.IsValid = !1;
  }
  GetMovement(e) {
    let t = this.fromValue == null;
    if (this.Animation == null || this.Animation.EasingFunction == null || t || this.IsCompleted)
      return this.OnGetMovement(1);
    (this._requiresToInitialize || this._startTime == BigInt("-9223372036854775808")) && (this._startTime = e.CurrentTime, this._endTime = e.CurrentTime + this.Animation._duration, this._requiresToInitialize = !1), e.IsValid = !1;
    let i = Number(e.CurrentTime - this._startTime), s = Number(this._endTime - this._startTime), a = i / s;
    a >= 1 && (a = 1, this.Animation._animationCompletedCount++, this.IsCompleted = this.Animation._repeatTimes != 2147483647 && this.Animation._repeatTimes < this.Animation._animationCompletedCount, this.IsCompleted || (this._startTime = e.CurrentTime, this._endTime = e.CurrentTime + this.Animation._duration, this.IsCompleted = !1));
    let r = this.Animation.EasingFunction(a);
    return this.OnGetMovement(r);
  }
  GetCurrentValue(e) {
    {
      let t = Number(e.CurrentTime - this._startTime), i = Number(this._endTime - this._startTime), s = t / i;
      s >= 1 && (s = 1), e.CurrentTime == BigInt("-9223372036854775808") && (s = 0);
      let a = this.Animation?.EasingFunction?.call(this, s) ?? 1;
      return this.OnGetMovement(a);
    }
  }
}
ds = new WeakMap();
class Sa extends se {
  constructor(e, t) {
    super(e), this.fromValue = t.Clone(), this.toValue = t.Clone();
  }
  OnGetMovement(e) {
    return new B(
      this.fromValue.X + e * (this.toValue.X - this.fromValue.X),
      this.fromValue.Y + e * (this.toValue.Y - this.fromValue.Y)
    );
  }
}
var cs, ms;
class pa {
  constructor() {
    n(this, "_stopwatch", new u.Stopwatch());
    n(this, "_paintTasks", new u.HashSet());
    n(this, "_fpsStack", new u.List());
    n(this, "_previousFrameTime", 0n);
    n(this, "_previousLogTime", 0n);
    n(this, "_sync", {});
    n(this, "DisableAnimations", !1);
    n(this, "StartPoint");
    n(this, "Invalidated", new u.Event());
    n(this, "Validated", new u.Event());
    T(this, cs, !1);
    T(this, ms, new u.HashSet());
    this._stopwatch.Start();
  }
  get IsValid() {
    return M(this, cs);
  }
  set IsValid(e) {
    v(this, cs, e);
  }
  get Sync() {
    return this._sync;
  }
  get Trackers() {
    return M(this, ms);
  }
  set Trackers(e) {
    v(this, ms, e);
  }
  DrawFrame(e) {
    {
      e.OnBegingDraw();
      let t = !0, i = this._stopwatch.ElapsedMilliseconds, s = new u.List();
      for (const a of this._paintTasks.OrderBy((r) => r.ZIndex, u.NumberComparer)) {
        this.DisableAnimations && a.CompleteTransition(), a.IsValid = !0, a.CurrentTime = i, a.InitializeTask(e);
        for (const r of a.GetGeometries(this))
          r != null && (this.DisableAnimations && r.CompleteTransition(), r.IsValid = !0, r.CurrentTime = i, a.IsPaused || r.Draw(e), t = t && r.IsValid, r.IsValid && r.RemoveOnCompleted && s.Add(
            new u.Tuple2(a, r)
          ));
        t = t && a.IsValid, a.RemoveOnCompleted && a.IsValid && this._paintTasks.Remove(a), a.Dispose();
      }
      for (const a of this.Trackers)
        a.IsValid = !0, a.CurrentTime = i, t = t && a.IsValid;
      for (const a of s)
        a.Item1.RemoveGeometryFromPainTask(this, a.Item2), t = !1;
      this._previousFrameTime = i, this.IsValid = t, e.OnEndDraw();
    }
    this.IsValid && this.Validated.Invoke(this);
  }
  get DrawablesCount() {
    return this._paintTasks.length;
  }
  Invalidate() {
    this.IsValid = !1, this.Invalidated.Invoke(this);
  }
  AddDrawableTask(e) {
    this._paintTasks.Add(e);
  }
  SetPaintTasks(e) {
    this._paintTasks = e;
  }
  RemovePaintTask(e) {
    e.ReleaseCanvas(this), this._paintTasks.Remove(e);
  }
  Clear() {
    for (const e of this._paintTasks)
      e.ReleaseCanvas(this);
    this._paintTasks.Clear(), this.Invalidate();
  }
  CountGeometries() {
    let e = 0;
    for (const t of this._paintTasks)
      for (const i of t.GetGeometries(this))
        e++;
    return e;
  }
  Dispose() {
    for (const e of this._paintTasks)
      e.ReleaseCanvas(this);
    this._paintTasks.Clear(), this.Trackers.Clear(), this.IsValid = !0;
  }
}
cs = new WeakMap(), ms = new WeakMap(), n(pa, "$meta_System_IDisposable", !0);
class ft extends se {
  constructor(e, t = 0) {
    super(e), this.fromValue = t, this.toValue = t;
  }
  OnGetMovement(e) {
    return this.fromValue + e * (this.toValue - this.fromValue);
  }
}
class bs extends se {
  constructor(e, t = 0) {
    super(e), this.fromValue = t, this.toValue = t;
  }
  OnGetMovement(e) {
    return this.fromValue + e * (this.toValue - this.fromValue);
  }
}
class Ka extends se {
  constructor(e, t = null) {
    super(e), t ? (this.fromValue = t.Clone(), this.toValue = t.Clone()) : (this.fromValue = new ht(0, 0, 0, 0), this.toValue = new ht(0, 0, 0, 0));
  }
  OnGetMovement(e) {
    return u.OpEquality(
      this.toValue,
      ht.Empty
    ) ? ht.Empty : ht.FromArgb(
      Math.floor(this.fromValue.A + e * (this.toValue.A - this.fromValue.A)) & 255,
      Math.floor(this.fromValue.R + e * (this.toValue.R - this.fromValue.R)) & 255,
      Math.floor(this.fromValue.G + e * (this.toValue.G - this.fromValue.G)) & 255,
      Math.floor(this.fromValue.B + e * (this.toValue.B - this.fromValue.B)) & 255
    );
  }
}
var Ss;
class Pa extends ie {
  constructor() {
    super();
    n(this, "_locationProperty");
    n(this, "_sizeMotionProperty");
    T(this, Ss, !1);
    this._locationProperty = this.RegisterMotionProperty(new Sa("Location", new B())), this._sizeMotionProperty = this.RegisterMotionProperty(new ga("Size", new U()));
  }
  get Location() {
    return this._locationProperty.GetMovement(this);
  }
  set Location(t) {
    this._locationProperty.SetMovement(t.Clone(), this);
  }
  get Size() {
    return this._sizeMotionProperty.GetMovement(this);
  }
  set Size(t) {
    this._sizeMotionProperty.SetMovement(t.Clone(), this);
  }
  get HasPreviousState() {
    return M(this, Ss);
  }
  set HasPreviousState(t) {
    v(this, Ss, t);
  }
}
Ss = new WeakMap();
class ga extends se {
  constructor(e, t) {
    super(e), this.fromValue = t.Clone(), this.toValue = t.Clone();
  }
  OnGetMovement(e) {
    return new U(
      this.fromValue.Width + e * (this.toValue.Width - this.fromValue.Width),
      this.fromValue.Height + e * (this.toValue.Height - this.fromValue.Height)
    );
  }
}
var ps;
class Ls extends ie {
  constructor() {
    super();
    n(this, "_maxLimitProperty");
    n(this, "_minLimitProperty");
    n(this, "_maxDataBoundProperty");
    n(this, "_minDataBoundProperty");
    n(this, "_maxVisibleBoundProperty");
    n(this, "_minVisibleBoundProperty");
    T(this, ps, !1);
    this._maxLimitProperty = this.RegisterMotionProperty(new Pn("MaxLimit", null)), this._minLimitProperty = this.RegisterMotionProperty(new Pn("MinLimit", null)), this._maxDataBoundProperty = this.RegisterMotionProperty(new bs("MaxDataBound", 0)), this._minDataBoundProperty = this.RegisterMotionProperty(new bs("MinDataBound", 0)), this._maxVisibleBoundProperty = this.RegisterMotionProperty(new bs("MaxVisibleBound", 0)), this._minVisibleBoundProperty = this.RegisterMotionProperty(new bs("MinVisibleBound", 0));
  }
  get MaxLimit() {
    return this._maxLimitProperty.GetMovement(this);
  }
  set MaxLimit(t) {
    this._maxLimitProperty.SetMovement(t, this);
  }
  get MinLimit() {
    return this._minLimitProperty.GetMovement(this);
  }
  set MinLimit(t) {
    this._minLimitProperty.SetMovement(t, this);
  }
  get MaxDataBound() {
    return this._maxDataBoundProperty.GetMovement(this);
  }
  set MaxDataBound(t) {
    this._maxDataBoundProperty.SetMovement(t, this);
  }
  get MinDataBound() {
    return this._minDataBoundProperty.GetMovement(this);
  }
  set MinDataBound(t) {
    this._minDataBoundProperty.SetMovement(t, this);
  }
  get MaxVisibleBound() {
    return this._maxVisibleBoundProperty.GetMovement(this);
  }
  set MaxVisibleBound(t) {
    this._maxVisibleBoundProperty.SetMovement(t, this);
  }
  get MinVisibleBound() {
    return this._minVisibleBoundProperty.GetMovement(this);
  }
  set MinVisibleBound(t) {
    this._minVisibleBoundProperty.SetMovement(t, this);
  }
  get HasPreviousState() {
    return M(this, ps);
  }
  set HasPreviousState(t) {
    v(this, ps, t);
  }
}
ps = new WeakMap();
class Pn extends se {
  constructor(e, t) {
    super(e), this.fromValue = t, this.toValue = t;
  }
  OnGetMovement(e) {
    return this.fromValue == null || this.toValue == null ? this.toValue : this.fromValue + e * (this.toValue - this.fromValue);
  }
}
var Ps;
class gn {
  constructor(e, t, i, s, a) {
    n(this, "_high");
    n(this, "_open");
    n(this, "_close");
    n(this, "_low");
    n(this, "_date", u.DateTime.Empty.Clone());
    n(this, "EntityIndex", 0);
    n(this, "ChartPoints");
    T(this, Ps, K.Empty);
    n(this, "PropertyChanged", new u.Event());
    this.Date = e, this.High = t, this.Open = i, this.Close = s, this.Low = a;
  }
  get Date() {
    return this._date;
  }
  set Date(e) {
    this._date = e, this.OnPropertyChanged("Date");
  }
  get High() {
    return this._high;
  }
  set High(e) {
    this._high = e, this.OnPropertyChanged("High");
  }
  get Open() {
    return this._open;
  }
  set Open(e) {
    this._open = e, this.OnPropertyChanged("Open");
  }
  get Close() {
    return this._close;
  }
  set Close(e) {
    this._close = e, this.OnPropertyChanged("Close");
  }
  get Low() {
    return this._low;
  }
  set Low(e) {
    this._low = e, this.OnPropertyChanged("Low");
  }
  get Coordinate() {
    return M(this, Ps);
  }
  set Coordinate(e) {
    v(this, Ps, e);
  }
  OnPropertyChanged(e = null) {
    this.Coordinate = this._open == null || this._high == null || this._low == null || this._close == null ? K.Empty : new K(this._high, Number(this._date.Ticks), this._open, this._close, this._low), this.PropertyChanged.Invoke(this, new u.PropertyChangedEventArgs(e));
  }
}
Ps = new WeakMap(), n(gn, "$meta_LiveChartsCore_IChartEntity", !0), n(gn, "$meta_System_INotifyPropertyChanged", !0);
var gs;
class he {
  constructor() {
    n(this, "EntityIndex", 0);
    n(this, "ChartPoints");
    T(this, gs, K.Empty);
  }
  get Coordinate() {
    return M(this, gs);
  }
  set Coordinate(e) {
    v(this, gs, e);
  }
  UpdateCoordinate(e) {
    this.Coordinate = new K(e.PrimaryValue, e.SecondaryValue, e.TertiaryValue, e.QuaternaryValue, e.QuinaryValue);
  }
}
gs = new WeakMap(), n(he, "$meta_LiveChartsCore_IChartEntity", !0);
var ys;
class yn {
  constructor(e, t, i) {
    n(this, "_x");
    n(this, "_y");
    n(this, "_weight");
    n(this, "PropertyChanged", new u.Event());
    n(this, "EntityIndex", 0);
    n(this, "ChartPoints");
    T(this, ys, K.Empty);
    this.X = e, this.Y = t, this.Weight = i;
  }
  get X() {
    return this._x;
  }
  set X(e) {
    this._x = e, this.OnPropertyChanged("X");
  }
  get Y() {
    return this._y;
  }
  set Y(e) {
    this._y = e, this.OnPropertyChanged("Y");
  }
  get Weight() {
    return this._weight;
  }
  set Weight(e) {
    this._weight = e, this.OnPropertyChanged("Weight");
  }
  get Coordinate() {
    return M(this, ys);
  }
  set Coordinate(e) {
    v(this, ys, e);
  }
  OnPropertyChanged(e = null) {
    this.Coordinate = this._x == null || this._y == null ? K.Empty : K.MakeByXY(this._x ?? 0, this._y ?? 0, this._weight ?? 0), this.PropertyChanged.Invoke(this, new u.PropertyChangedEventArgs(e));
  }
}
ys = new WeakMap(), n(yn, "$meta_LiveChartsCore_IChartEntity", !0), n(yn, "$meta_System_INotifyPropertyChanged", !0);
var Cs;
class Cn {
  constructor(e, t) {
    n(this, "_dateTime", u.DateTime.Empty.Clone());
    n(this, "_value");
    n(this, "EntityIndex", 0);
    n(this, "ChartPoints");
    T(this, Cs, K.Empty);
    n(this, "PropertyChanged", new u.Event());
    this.DateTime = e, this.Value = t, this.Coordinate = t == null ? K.Empty : K.MakeByXY(Number(e.Ticks), t);
  }
  get DateTime() {
    return this._dateTime;
  }
  set DateTime(e) {
    this._dateTime = e, this.OnPropertyChanged("DateTime");
  }
  get Value() {
    return this._value;
  }
  set Value(e) {
    this._value = e, this.OnPropertyChanged("Value");
  }
  get Coordinate() {
    return M(this, Cs);
  }
  set Coordinate(e) {
    v(this, Cs, e);
  }
  OnPropertyChanged(e = null) {
    this.Coordinate = this._value == null ? K.Empty : K.MakeByXY(Number(this._dateTime.Ticks), this._value), this.PropertyChanged.Invoke(this, new u.PropertyChangedEventArgs(e));
  }
}
Cs = new WeakMap(), n(Cn, "$meta_LiveChartsCore_IChartEntity", !0), n(Cn, "$meta_System_INotifyPropertyChanged", !0);
var _s;
class _n {
  constructor(e, t) {
    n(this, "_timeSpan", u.TimeSpan.Empty.Clone());
    n(this, "_value");
    n(this, "EntityIndex", 0);
    n(this, "ChartPoints");
    T(this, _s, K.Empty);
    n(this, "PropertyChanged", new u.Event());
    this.TimeSpan = e, this.Value = t;
  }
  get TimeSpan() {
    return this._timeSpan;
  }
  set TimeSpan(e) {
    this._timeSpan = e, this.OnPropertyChanged("TimeSpan");
  }
  get Value() {
    return this._value;
  }
  set Value(e) {
    this._value = e, this.OnPropertyChanged("Value");
  }
  get Coordinate() {
    return M(this, _s);
  }
  set Coordinate(e) {
    v(this, _s, e);
  }
  OnPropertyChanged(e = null) {
    this.Coordinate = this._value == null ? K.Empty : K.MakeByXY(Number(this._timeSpan.Ticks), this._value ?? 0), this.PropertyChanged.Invoke(this, new u.PropertyChangedEventArgs(e));
  }
}
_s = new WeakMap(), n(_n, "$meta_LiveChartsCore_IChartEntity", !0), n(_n, "$meta_System_INotifyPropertyChanged", !0);
var fs;
class fn {
  constructor(e, t) {
    n(this, "_x");
    n(this, "_y");
    n(this, "EntityIndex", 0);
    n(this, "ChartPoints");
    T(this, fs, K.Empty);
    n(this, "PropertyChanged", new u.Event());
    this.X = e, this.Y = t;
  }
  get X() {
    return this._x;
  }
  set X(e) {
    this._x = e, this.OnPropertyChanged("X");
  }
  get Y() {
    return this._y;
  }
  set Y(e) {
    this._y = e, this.OnPropertyChanged("Y");
  }
  get Coordinate() {
    return M(this, fs);
  }
  set Coordinate(e) {
    v(this, fs, e);
  }
  OnPropertyChanged(e = null) {
    this.Coordinate = this._x == null || this._y == null ? K.Empty : K.MakeByXY(this._x, this._y), this.PropertyChanged.Invoke(this, new u.PropertyChangedEventArgs(e));
  }
}
fs = new WeakMap(), n(fn, "$meta_LiveChartsCore_IChartEntity", !0), n(fn, "$meta_System_INotifyPropertyChanged", !0);
var ws;
class wn {
  constructor(e) {
    n(this, "_value");
    n(this, "_entityIndex", 0);
    n(this, "ChartPoints");
    T(this, ws, K.Empty);
    n(this, "PropertyChanged", new u.Event());
    this.Value = e;
  }
  get Value() {
    return this._value;
  }
  set Value(e) {
    this._value = e, this.OnPropertyChanged("Value");
  }
  get EntityIndex() {
    return this._entityIndex;
  }
  set EntityIndex(e) {
    e != this._entityIndex && (this._entityIndex = e, this.OnCoordinateChanged());
  }
  get Coordinate() {
    return M(this, ws);
  }
  set Coordinate(e) {
    v(this, ws, e);
  }
  OnPropertyChanged(e = null) {
    this.OnCoordinateChanged(), this.PropertyChanged.Invoke(this, new u.PropertyChangedEventArgs(e));
  }
  OnCoordinateChanged() {
    this.Coordinate = this._value == null ? K.Empty : K.MakeByXY(this.EntityIndex, this._value);
  }
}
ws = new WeakMap(), n(wn, "$meta_LiveChartsCore_IChartEntity", !0), n(wn, "$meta_System_INotifyPropertyChanged", !0);
var xs;
class xn {
  constructor(e, t) {
    n(this, "_angle");
    n(this, "_radius");
    n(this, "EntityIndex", 0);
    n(this, "ChartPoints");
    T(this, xs, K.Empty);
    n(this, "PropertyChanged", new u.Event());
    this.Angle = e, this.Radius = t;
  }
  get Angle() {
    return this._angle;
  }
  set Angle(e) {
    this._angle = e, this.OnPropertyChanged("Angle");
  }
  get Radius() {
    return this._radius;
  }
  set Radius(e) {
    this._radius = e, this.OnPropertyChanged("Radius");
  }
  get Coordinate() {
    return M(this, xs);
  }
  set Coordinate(e) {
    v(this, xs, e);
  }
  OnPropertyChanged(e = null) {
    this.Coordinate = this._radius == null || this._angle == null ? K.Empty : K.MakeByXY(this._angle, this._radius), this.PropertyChanged.Invoke(this, new u.PropertyChangedEventArgs(e));
  }
}
xs = new WeakMap(), n(xn, "$meta_LiveChartsCore_IChartEntity", !0), n(xn, "$meta_System_INotifyPropertyChanged", !0);
class sn extends ee {
  constructor() {
    super(...arguments);
    n(this, "_x", 0);
    n(this, "_y", 0);
    n(this, "_xc", 0);
    n(this, "_yc", 0);
    n(this, "_parent");
    n(this, "_scalesXAt", 0);
    n(this, "_scalesYAt", 0);
    n(this, "LocationUnit", kn.Pixels);
    n(this, "PropertyChanged", new u.Event());
  }
  get X() {
    return this._x;
  }
  set X(t) {
    this._x = t, this.OnPropertyChanged("X");
  }
  get Y() {
    return this._y;
  }
  set Y(t) {
    this._y = t, this.OnPropertyChanged("Y");
  }
  get ScalesXAt() {
    return this._scalesXAt;
  }
  set ScalesXAt(t) {
    this._scalesXAt = t, this.OnPropertyChanged("ScalesXAt");
  }
  get ScalesYAt() {
    return this._scalesYAt;
  }
  set ScalesYAt(t) {
    this._scalesYAt = t, this.OnPropertyChanged("ScalesYAt");
  }
  Invalidate(t) {
    let i = null, s = null, a = null;
    if (t instanceof Ft) {
      a = t;
      let h = a.YAxes[this.ScalesYAt], o = a.XAxes[this.ScalesXAt];
      s = L.GetNextScaler(o, a), i = L.GetNextScaler(h, a);
    }
    for (const r of this.GetPaintTasks())
      r != null && t.Canvas.AddDrawableTask(r);
    this.OnInvalidated(t, i, s);
  }
  OnPaintChanged(t) {
    super.OnPaintChanged(t), this.OnPropertyChanged(t);
  }
  OnPropertyChanged(t = null) {
    this.PropertyChanged.Invoke(this, new u.PropertyChangedEventArgs(t));
  }
  GetPositionRelativeToParent() {
    let t = 0, i = 0;
    if (this._parent != null) {
      let s = this._parent.MotionProperties.GetAt("X"), a = this._parent.MotionProperties.GetAt("Y");
      t = s.GetCurrentValue(this._parent), i = a.GetCurrentValue(this._parent);
    }
    return new B(t + this.X, i + this.Y);
  }
  IsHitBy(t, i) {
    const s = function* (a, r) {
      let h = a.Canvas;
      h.StartPoint != null && (r.X -= h.StartPoint.X, r.Y -= h.StartPoint.Y);
      let o = this.GetTargetLocation(), l = this.GetTargetSize();
      r.X >= o.X && r.X <= o.X + l.Width && r.Y >= o.Y && r.Y <= o.Y + l.Height && (yield this);
    }.bind(this);
    return u.EnumerableFrom(() => s(t, i));
  }
  AlignToTopLeftCorner() {
  }
}
n(sn, "$meta_System_INotifyPropertyChanged", !0);
var Ms;
class Ja extends sn {
  constructor() {
    super(...arguments);
    n(this, "_targetPosition", B.Empty.Clone());
    n(this, "Size", U.Empty.Clone());
    T(this, Ms, new u.HashSet());
  }
  get Children() {
    return M(this, Ms);
  }
  set Children(t) {
    v(this, Ms, t);
  }
  GetTargetLocation() {
    return this._targetPosition;
  }
  GetTargetSize() {
    return this.Size;
  }
  Measure(t, i, s) {
    for (const a of this.Children)
      a.Measure(t, i, s);
    return this.GetTargetSize();
  }
  RemoveFromUI(t) {
    for (const i of this.Children)
      i.RemoveFromUI(t);
    super.RemoveFromUI(t);
  }
  OnInvalidated(t, i, s) {
    this._targetPosition = new B(this.X + this._xc, this.Y + this._yc).Clone();
    for (const a of this.Children)
      a._parent = this._parent, a._xc = this._xc, a._yc = this._yc, a._x = this.X, a._y = this.Y, a.OnInvalidated(t, i, s);
  }
  GetPaintTasks() {
    return [];
  }
}
Ms = new WeakMap();
var Ts;
class tr extends sn {
  constructor(t) {
    super();
    n(this, "_backgroundGeometryFactory");
    n(this, "_targetPosition", B.Empty.Clone());
    n(this, "_backgroundPaint");
    n(this, "_backgroundGeometry");
    T(this, Ts, new u.HashSet());
    n(this, "Orientation", 0);
    n(this, "VerticalAlignment", it.Middle);
    n(this, "HorizontalAlignment", it.Middle);
    n(this, "Padding", new kt(0, 0, 0, 0));
    this._backgroundGeometryFactory = t;
  }
  get Children() {
    return M(this, Ts);
  }
  set Children(t) {
    v(this, Ts, t);
  }
  get BackgroundPaint() {
    return this._backgroundPaint;
  }
  set BackgroundPaint(t) {
    this.SetPaintProperty(new u.Ref(() => this._backgroundPaint, (i) => this._backgroundPaint = i), t, void 0, "BackgroundPaint");
  }
  GetTargetLocation() {
    return this._targetPosition;
  }
  GetTargetSize() {
    let t = (this.Orientation == js.Horizontal ? this.Children.Aggregate(new U(0, 0), (i, s) => {
      let a = s.GetTargetSize();
      return new U(
        i.Width + a.Width,
        a.Height > i.Height ? a.Height : i.Height
      );
    }) : this.Children.Aggregate(new U(0, 0), (i, s) => {
      let a = s.GetTargetSize();
      return new U(
        a.Width > i.Width ? a.Width : i.Width,
        i.Height + a.Height
      );
    })).Clone();
    return new U(this.Padding.Left + this.Padding.Right + t.Width, this.Padding.Top + this.Padding.Bottom + t.Height);
  }
  Measure(t, i, s) {
    for (const a of this.Children)
      a.Measure(t, i, s);
    return this.GetTargetSize();
  }
  RemoveFromUI(t) {
    for (const i of this.Children)
      i.RemoveFromUI(t);
    super.RemoveFromUI(t);
  }
  OnInvalidated(t, i, s) {
    let a = this.Padding.Left, r = this.Padding.Top;
    this._targetPosition = new B(this.X + this._xc, this.Y + this._yc).Clone();
    let h = this.Measure(t, i, s);
    if (this._backgroundGeometry == null) {
      let o = this.GetPositionRelativeToParent();
      this._backgroundGeometry = this._backgroundGeometryFactory(), this._backgroundGeometry.X = o.X, this._backgroundGeometry.Y = o.Y, this._backgroundGeometry.Width = h.Width, this._backgroundGeometry.Height = h.Height, L.TransitionateProperties(
        this._backgroundGeometry
      ).WithAnimationFromChart(t).CompleteCurrentTransitions();
    }
    if (this.BackgroundPaint ?? (this.BackgroundPaint = j.DefaultSettings.GetProvider().GetSolidColorPaint(new ht(0, 0, 0, 0))), t.Canvas.AddDrawableTask(this.BackgroundPaint), this._backgroundGeometry.X = this._targetPosition.X, this._backgroundGeometry.Y = this._targetPosition.Y, this._backgroundGeometry.Width = h.Width, this._backgroundGeometry.Height = h.Height, this.BackgroundPaint.AddGeometryToPaintTask(t.Canvas, this._backgroundGeometry), this.Orientation == js.Horizontal)
      for (const o of this.Children) {
        o.Measure(t, i, s);
        let l = o.GetTargetSize();
        if (this._backgroundGeometry == null)
          throw new u.Exception("Background is required.");
        o._parent = this._backgroundGeometry, o._xc = this._targetPosition.X, o._yc = this._targetPosition.Y, o._x = a, o._y = this.VerticalAlignment == it.Middle ? r + (h.Height - this.Padding.Top - this.Padding.Bottom - l.Height) / 2 : this.VerticalAlignment == it.End ? r + h.Height - this.Padding.Top - this.Padding.Bottom - l.Height : r, o.OnInvalidated(t, i, s), a += l.Width;
      }
    else
      for (const o of this.Children) {
        o.Measure(t, i, s);
        let l = o.GetTargetSize();
        if (this._backgroundGeometry == null)
          throw new u.Exception("Background is required.");
        o._parent = this._backgroundGeometry, o._xc = this._targetPosition.X, o._yc = this._targetPosition.Y, o._x = this.HorizontalAlignment == it.Middle ? a + (h.Width - this.Padding.Left - this.Padding.Right - l.Width) / 2 : this.HorizontalAlignment == it.End ? a + h.Width - this.Padding.Left - this.Padding.Right - l.Width : a, o._y = r, o.OnInvalidated(t, i, s), r += l.Height;
      }
  }
  GetPaintTasks() {
    return [this._backgroundPaint];
  }
}
Ts = new WeakMap();
function ya(d) {
  return typeof d == "object" && d !== null && !Array.isArray(d) && "$meta_LiveChartsCore_IImageControl" in d.constructor;
}
export {
  Zt as ActionThrottler,
  it as Align,
  ie as Animatable,
  Ls as AnimatableAxisBounds,
  Pa as AnimatableContainer,
  cn as Animation,
  Zs as Axis,
  et as AxisOrientation,
  Pt as AxisPosition,
  mn as AxisTick,
  re as AxisVisualSeprator,
  Jt as BackEasingFunction,
  jt as BarSeries,
  qs as BezierData,
  Dn as BezierVisualPoint,
  yt as BounceEasingFunction,
  $ as Bounds,
  Ft as CartesianChart,
  Js as CartesianSeries,
  en as Chart,
  ee as ChartElement,
  Aa as ChartEngine,
  qt as ChartPoint,
  ct as ChartPoint3,
  vt as ChartPointCleanupContext,
  En as ChartPointContext,
  Ks as ChartSeries,
  An as ChartUpdateParams,
  Ws as CircleEasingFunction,
  Dt as CollectionDeepObserver,
  Ka as ColorMotionProperty,
  q as ColorPalletes,
  na as ColorStop,
  ra as ColumnSeries,
  Oa as ConditionalDrawExtensions,
  da as ConditionalPaintBuilder,
  js as ContainerOrientation,
  pn as ControlCoordinatesProjector,
  K as Coordinate,
  ca as CoreMap,
  It as CubicBezierEasingFunction,
  Qn as CubicBezierSegment,
  Ns as CubicEasingFunction,
  Qs as DataFactory,
  Et as DataLabelsPosition,
  Cn as DateTimePoint,
  _a as DelayedFunction,
  Wn as DesignerKind,
  Ot as DimensionalBounds,
  bs as DoubleMotionProperty,
  ua as DrawMarginFrame,
  Ya as DrawMarginFrame2,
  Ia as DrawingContext,
  Nt as EasingFunctions,
  Lt as ElasticEasingFunction,
  Wt as ExponentialEasingFunction,
  L as Extensions,
  gn as FinancialPoint,
  In as FinancialSeries,
  ft as FloatMotionProperty,
  vn as GapsBuilder,
  $a as GeoJsonFeature,
  Na as GeoJsonFile,
  Ha as GeoMap,
  Vs as HeatFunctions,
  sa as HeatLandSeries,
  Vn as HeatSeries,
  bn as HoverArea,
  ka as IsInterfaceOfIAnimatable,
  Ma as IsInterfaceOfICartesianAxis,
  Ta as IsInterfaceOfICartesianAxis1,
  va as IsInterfaceOfICartesianChartView,
  Hn as IsInterfaceOfIChartEntity,
  ya as IsInterfaceOfIImageControl,
  jn as IsInterfaceOfILabelGeometry,
  Un as IsInterfaceOfIPieSeries,
  xa as IsInterfaceOfIPolarChartView,
  ks as IsInterfaceOfIRoundedRectangleChartPoint,
  ia as IsInterfaceOfISeries,
  Zn as KeyFrame,
  pt as Labelers,
  qa as LandData,
  ja as LandDefinition,
  ea as LegendOrientation,
  Xt as LegendPosition,
  Va as LineSegment,
  Ds as LineSeries,
  j as LiveCharts,
  Xn as LiveChartsSettings,
  La as LiveChartsStylerExtensions,
  ht as LvcColor,
  B as LvcPoint,
  le as LvcPointD,
  W as LvcRectangle,
  U as LvcSize,
  ma as MapContext,
  Qa as MapLayer,
  $s as MapProjection,
  Bn as MapProjector,
  Ua as MapShapeContext,
  he as MappedChartEntity,
  Gn as Maps,
  lt as Margin,
  kn as MeasureUnit,
  Sn as MercatorProjector,
  pa as MotionCanvas,
  se as MotionProperty,
  Wa as MultiPoligonGeometry,
  Yn as NamedLabeler,
  Pn as NullableDoubleMotionProperty,
  fn as ObservablePoint,
  xn as ObservablePolarPoint,
  wn as ObservableValue,
  kt as Padding,
  Tn as PaintSchedule,
  ba as PanGestureEventArgs,
  ha as PieChart,
  Us as PieSeries,
  Sa as PointMotionProperty,
  la as PolarAxis,
  Mt as PolarAxisOrientation,
  oa as PolarChart,
  Ct as PolarLabelsPosition,
  Ga as PolarLineSeries,
  Rt as PolarScaler,
  Kt as PolinominalEasingFunction,
  oe as RadialAlignment,
  As as RadialAxisVisualSeparator,
  gt as RectangleHoverArea,
  Ja as RelativePanel,
  aa as RowSeries,
  dt as Scaler,
  Ba as ScatterSeries,
  Ln as Section,
  Xa as Section2,
  dn as SemicircleHoverArea,
  Gt as Series,
  Yt as SeriesBounds,
  Hs as SeriesContext,
  D as SeriesProperties,
  fa as SeriesStyleRule,
  ga as SizeMotionProperty,
  zt as Sketch,
  Nn as SplineData,
  tr as StackPanel,
  ta as StackPosition,
  Fa as StackedAreaSeries,
  za as StackedColumnSeries,
  Ra as StackedRowSeries,
  Ea as StackedStepAreaSeries,
  On as StackedTotal,
  un as StackedValue,
  Mn as Stacker,
  Kn as StepLineSegment,
  tn as StepLineSeries,
  $n as StepLineVisualPoint,
  Qt as StrokeAndFillCartesianSeries,
  wa as StrokeAndFillDrawable,
  Jn as Theme,
  _n as TimeSpanPoint,
  _t as TooltipFindingStrategy,
  hn as TooltipPlacementContext,
  Bt as TooltipPosition,
  qn as TransitionBuilder,
  $t as VectorClosingMethod,
  Is as VectorManager,
  sn as VisualElement,
  Da as VisualElementsEventArgs,
  yn as WeightedPoint,
  ot as ZoomAndPanMode,
  wt as ZoomDirection,
  Za as ZoomOnPointerView
};
