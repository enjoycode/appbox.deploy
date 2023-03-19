var _t = Object.defineProperty;
var wt = (u, i, t) => i in u ? _t(u, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : u[i] = t;
var o = (u, i, t) => (wt(u, typeof i != "symbol" ? i + "" : i, t), t), ot = (u, i, t) => {
  if (!i.has(u))
    throw TypeError("Cannot " + t);
};
var R = (u, i, t) => (ot(u, i, "read from private field"), t ? t.call(u) : i.get(u)), A = (u, i, t) => {
  if (i.has(u))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(u) : i.set(u, t);
}, I = (u, i, t, s) => (ot(u, i, "write to private field"), s ? s.call(u, t) : i.set(u, t), t);
import * as l from "/System.js";
import * as d from "/PixUI.js";
import * as n from "/LiveChartsCore.js";
class ft {
  constructor() {
    o(this, "_keys", new l.Dictionary());
    o(this, "_values", new l.Dictionary());
  }
  Add(i, t) {
    this._keys.Add(i, t), this._values.Add(t, i);
  }
  Remove(i) {
    let t = this._values.Remove(this._keys.GetAt(i));
    return this._keys.Remove(i) && t;
  }
  TryGetValue(i, t) {
    return this._keys.TryGetValue(i, t);
  }
  TryGetKey(i, t) {
    return this._values.TryGetValue(i, t);
  }
}
class Mt extends n.DrawingContext {
  constructor(t, s, r, e, a = !0) {
    super();
    o(this, "_clearOnBegingDraw");
    o(this, "MotionCanvas");
    o(this, "Width", 0);
    o(this, "Height", 0);
    o(this, "Canvas");
    o(this, "PaintTask");
    o(this, "Paint");
    o(this, "Background", d.Color.Empty);
    this.MotionCanvas = t, this.Width = s, this.Height = r, this.Canvas = e, this.PaintTask = null, this.Paint = null, this._clearOnBegingDraw = a;
  }
  OnBegingDraw() {
    l.OpInequality(this.Background, d.Color.Empty) && this.Canvas.drawRect(d.Rect.FromLTWH(0, 0, this.Width, this.Height), d.PaintUtils.Shared(this.Background)), !(this.MotionCanvas.StartPoint == null || this.MotionCanvas.StartPoint.X == 0 && this.MotionCanvas.StartPoint.Y == 0) && this.Canvas.translate(this.MotionCanvas.StartPoint.X, this.MotionCanvas.StartPoint.Y);
  }
  OnEndDraw() {
  }
}
class Ht extends n.LineSeries {
  constructor(i = !1) {
    super(
      () => new w(),
      () => new S(),
      () => new tt(),
      () => new Q(new w()),
      i
    );
  }
}
class Bt extends n.RowSeries {
  constructor() {
    super(() => new T(), () => new S());
  }
}
class Wt extends n.StepLineSeries {
  constructor() {
    super(
      () => new w(),
      () => new S(),
      () => new gt(),
      () => new dt(() => new w())
    );
  }
}
class Et extends n.HeatLandSeries {
  constructor() {
    throw super(), new l.NotImplementedException();
  }
}
class q extends n.PieSeries {
  constructor(i = !1, t = !1) {
    super(
      () => new X(),
      () => new S(),
      () => new w(),
      i,
      t
    );
  }
}
class Yt extends n.FinancialSeries {
  constructor() {
    super(
      () => new Ot(),
      () => new S(),
      () => new w()
    );
  }
}
class Xt extends n.HeatSeries {
  constructor() {
    super(() => new zt(), () => new S());
  }
}
class Kt extends n.ScatterSeries {
  constructor() {
    super(() => new w(), () => new S());
  }
}
class Nt extends n.StackedAreaSeries {
  constructor() {
    super(
      () => new w(),
      () => new S(),
      () => new tt(),
      () => new Q(new w())
    );
  }
}
class Ut extends n.StackedRowSeries {
  constructor() {
    super(() => new T(), () => new S());
  }
}
class $t extends n.StackedColumnSeries {
  constructor() {
    super(() => new T(), () => new S());
  }
}
class J {
  static Draw(i) {
    return new vt(i);
  }
}
var V;
class vt {
  constructor(i) {
    o(this, "_selectedPaint");
    A(this, V, void 0);
    this.Canvas = i;
  }
  get Canvas() {
    return R(this, V);
  }
  set Canvas(i) {
    I(this, V, i);
  }
  SelectPaint(i) {
    return this._selectedPaint = i, this.Canvas.AddDrawableTask(this._selectedPaint), this;
  }
  SelectColor(i, t = null, s = null) {
    t ?? (t = 1), s ?? (s = !1);
    let r = c.MakeByColorAndStroke(i, t);
    return r.IsFill = s, this.SelectPaint(r);
  }
  SetClip(i) {
    if (i == null)
      return this;
    if (this._selectedPaint == null)
      throw new l.Exception("There is no paint selected, please select a paint (By calling a Select method) to add the geometry to.");
    return this._selectedPaint.SetClipRectangle(this.Canvas, i.Clone()), this;
  }
  Draw(i) {
    if (this._selectedPaint == null)
      throw new l.Exception("There is no paint selected, please select a paint (By calling a Select method) to add the geometry to.");
    return this._selectedPaint.AddGeometryToPaintTask(this.Canvas, i), this;
  }
}
V = new WeakMap();
class jt extends n.Section2 {
  constructor() {
    super(() => new et());
  }
}
class kt extends n.PolarAxis {
  constructor() {
    super(
      () => new S(),
      () => new mt(),
      () => new w()
    );
  }
}
class L extends n.Axis {
  constructor() {
    super(() => new S(), () => new mt());
  }
}
class Tt {
  constructor() {
    o(this, "_usedPathShapes", new l.HashSet());
    o(this, "_usedPaints", new l.HashSet());
    o(this, "_usedLayers", new l.HashSet());
    o(this, "_mapView");
  }
  GenerateLands(i) {
    let t = i.Projector, s = new l.HashSet(this._usedLayers), r = new l.HashSet(this._usedPathShapes), e = new l.HashSet(this._usedPaints), a = i.View.ActiveMap.Layers.Values.Where((h) => h.IsVisible).OrderByDescending((h) => h.ProcessIndex, l.NumberComparer);
    this._mapView = i.View;
    for (const h of a) {
      let g = h.Stroke, C = h.Fill;
      C != null && (i.View.Canvas.AddDrawableTask(C), this._usedPaints.Add(C), e.Remove(C)), g != null && (i.View.Canvas.AddDrawableTask(g), this._usedPaints.Add(g), e.Remove(g)), this._usedLayers.Add(h.Name), s.Remove(h.Name);
      for (const m of h.Lands.Values)
        for (const P of m.Data) {
          let y;
          P.Shape == null ? (P.Shape = y = new Vt().Init({ IsClosed: !0 }), n.Extensions.TransitionateProperties(
            y,
            "FillColor"
          ).WithAnimationBuilder((_) => _.WithDuration(l.TimeSpan.FromMilliseconds(800)).WithEasingFunction(n.EasingFunctions.ExponentialOut))) : y = P.Shape, this._usedPathShapes.Add(y), r.Remove(y), g?.AddGeometryToPaintTask(i.View.Canvas, y), C?.AddGeometryToPaintTask(i.View.Canvas, y), y.ClearCommands();
          let f = !0;
          for (const _ of P.Coordinates) {
            let v = t.ToMap(new Float64Array([_.X, _.Y])), k = v[0], rt = v[1];
            if (f) {
              y.AddLast(new Lt().Init({ X: k, Y: rt })), f = !1;
              continue;
            }
            y.AddLast(new xt().Init({ X: k, Y: rt }));
          }
        }
      for (const m of r)
        g?.RemoveGeometryFromPainTask(i.View.Canvas, m), C?.RemoveGeometryFromPainTask(i.View.Canvas, m), m.ClearCommands(), this._usedPathShapes.Remove(m);
    }
    for (const h of e)
      this._usedPaints.Remove(h), i.View.Canvas.RemovePaintTask(h);
    for (const h of s)
      i.MapFile.Layers.Remove(h), this._usedLayers.Remove(h);
  }
  ViewTo(i, t) {
  }
  Pan(i, t) {
  }
  Dispose() {
    if (this._mapView != null) {
      let i = this._mapView.ActiveMap.Layers.Values.Where((t) => t.IsVisible).OrderByDescending((t) => t.ProcessIndex, l.NumberComparer);
      for (const t of i) {
        let s = t.Stroke, r = t.Fill;
        for (const e of t.Lands.Values)
          for (const a of e.Data) {
            let h = a.Shape;
            h != null && (s?.RemoveGeometryFromPainTask(this._mapView.Canvas, h), r?.AddGeometryToPaintTask(this._mapView.Canvas, h), a.Shape = null);
          }
        for (const e of this._usedPaints)
          this._mapView.Canvas.RemovePaintTask(e), e.ClearGeometriesFromPaintTask(this._mapView.Canvas);
        this._mapView.Canvas.RemovePaintTask(s), this._mapView.Canvas.RemovePaintTask(r);
      }
    }
    this._usedPathShapes.Clear(), this._usedLayers.Clear(), this._usedPaints.Clear();
  }
}
class Rt extends n.ChartEngine {
  GetDefaultMapFactory() {
    return new Tt();
  }
  GetDefaultCartesianAxis() {
    return new L();
  }
  GetDefaultPolarAxis() {
    return new kt();
  }
  GetSolidColorPaint(i) {
    return new c().Init({ Color: new d.Color(i.R, i.G, i.B, i.A) });
  }
}
class qt extends n.DrawMarginFrame2 {
  constructor() {
    super(() => new et());
  }
}
const x = class {
  static get DefaultPlatformBuilder() {
    return (i) => p.AddLightTheme(
      x.AddSkiaSharp(
        i
      )
    );
  }
  static UseDefaults(i) {
    return p.AddLightTheme(
      x.AddSkiaSharp(
        i
      )
    );
  }
  static AddSkiaSharp(i) {
    return i.HasProvider(new Rt());
  }
  static WithGlobalSKTypeface(i, t) {
    return n.LiveCharts.IsConfigured || n.LiveCharts.Configure(x.DefaultPlatformBuilder), x.DefaultSKTypeface = t, i;
  }
  static AsSKColor(i, t = null) {
    return new d.Color(i.R, i.G, i.B, t ?? i.A);
  }
  static WithOpacity(i, t) {
    return n.LvcColor.FromColorWithAlpha(t, i.Clone());
  }
  static AsLvcColor(i) {
    return new n.LvcColor(i.Red, i.Green, i.Blue, i.Alpha);
  }
  static AsLiveChartsPieSeries(i, t = null) {
    return t ?? (t = (s, r) => {
    }), new l.ObservableCollection(i.Select((s) => {
      let r = new q().Init({ Values: new l.ObservableCollection().Init([s]) });
      return t(s, r), r;
    }).ToArray());
  }
  static GetDistanceTo(i, t) {
    let s = n.LvcPointD.Empty.Clone(), r = 0, e = 0;
    if (n.IsInterfaceOfICartesianChartView(i.Context)) {
      const C = i.Context;
      s = C.ScalePixelsToData(new n.LvcPointD(t.X, t.Y));
      let m = i.Context.Series;
      if ((i.Context.Series.SeriesProperties & n.SeriesProperties.PrimaryAxisHorizontalOrientation) == n.SeriesProperties.PrimaryAxisHorizontalOrientation) {
        let P = C.Core.YAxes[m.ScalesYAt], y = C.Core.XAxes[m.ScalesXAt], f = C.Core.DrawMarginLocation.Clone(), _ = C.Core.DrawMarginSize.Clone(), v = n.Scaler.Make(f.Clone(), _.Clone(), P), k = n.Scaler.Make(f.Clone(), _.Clone(), y);
        r = v.ToPixels(i.SecondaryValue), e = k.ToPixels(i.PrimaryValue);
      } else {
        let P = C.Core.YAxes[m.ScalesXAt], y = C.Core.XAxes[m.ScalesYAt], f = C.Core.DrawMarginLocation.Clone(), _ = C.Core.DrawMarginSize.Clone(), v = n.Scaler.Make(f.Clone(), _.Clone(), y), k = n.Scaler.Make(f.Clone(), _.Clone(), P);
        r = v.ToPixels(i.SecondaryValue), e = k.ToPixels(i.PrimaryValue);
      }
    } else if (n.IsInterfaceOfIPolarChartView(i.Context)) {
      const C = i.Context;
      s = C.ScalePixelsToData(new n.LvcPointD(t.X, t.Y));
      let m = i.Context.Series, P = C.Core.AngleAxes[m.ScalesAngleAt], y = C.Core.RadiusAxes[m.ScalesRadiusAt], f = C.Core.DrawMarginLocation.Clone(), _ = C.Core.DrawMarginSize.Clone(), k = new n.PolarScaler(
        f.Clone(),
        _.Clone(),
        P,
        y,
        C.Core.InnerRadius,
        C.Core.InitialRotation,
        C.Core.TotalAnge
      ).ToPixelsFromCharPoint(i);
      r = k.X, e = k.Y;
    } else
      throw new l.NotImplementedException();
    let a = s.X - r, h = s.Y - e;
    return Math.sqrt(Math.pow(a, 2) + Math.pow(h, 2));
  }
};
let M = x;
o(M, "DefaultSKTypeface");
class at extends n.VisualElement {
  constructor() {
    super(...arguments);
    o(this, "_width", 0);
    o(this, "_height", 0);
    o(this, "_fill");
    o(this, "_stroke");
    o(this, "SizeUnit", n.MeasureUnit.Pixels);
  }
  get Width() {
    return this._width;
  }
  set Width(t) {
    this._width = t, this.OnPropertyChanged("Width");
  }
  get Height() {
    return this._height;
  }
  set Height(t) {
    this._height = t, this.OnPropertyChanged("Height");
  }
  get Fill() {
    return this._fill;
  }
  set Fill(t) {
    this.SetPaintProperty(new l.Ref(() => this._fill, (s) => this._fill = s), t, void 0, "Fill");
  }
  get Stroke() {
    return this._stroke;
  }
  set Stroke(t) {
    this.SetPaintProperty(new l.Ref(() => this._stroke, (s) => this._stroke = s), t, !0, "Stroke");
  }
  GetPaintTasks() {
    return [this._fill, this._stroke];
  }
  OnPaintChanged(t) {
    super.OnPaintChanged(t), this.OnPropertyChanged(t);
  }
}
class lt extends n.VisualElement {
  constructor() {
    super(...arguments);
    o(this, "_labelGeometry");
    o(this, "_paint");
    o(this, "_isVirtual", !1);
    o(this, "_text", "");
    o(this, "_textSize", 12);
    o(this, "_verticalAlignment", n.Align.Middle);
    o(this, "_horizontalAlignment", n.Align.Middle);
    o(this, "_backgroundColor", n.LvcColor.Empty.Clone());
    o(this, "_padding", n.Padding.All(0));
    o(this, "_rotation", 0);
    o(this, "_lineHeight", 1.75);
    o(this, "_translate", new n.LvcPoint().Clone());
    o(this, "_actualSize", new n.LvcSize().Clone());
    o(this, "_targetPosition", new n.LvcPoint().Clone());
  }
  get Paint() {
    return this._paint;
  }
  set Paint(t) {
    this.SetPaintProperty(new l.Ref(() => this._paint, (s) => this._paint = s), t, void 0, "Paint");
  }
  get Text() {
    return this._text;
  }
  set Text(t) {
    this._text = t, this.OnPropertyChanged("Text");
  }
  get TextSize() {
    return this._textSize;
  }
  set TextSize(t) {
    this._textSize = t, this.OnPropertyChanged("TextSize");
  }
  get Rotation() {
    return this._rotation;
  }
  set Rotation(t) {
    this._rotation = t, this.OnPropertyChanged("Rotation");
  }
  get Translate() {
    return this._translate;
  }
  set Translate(t) {
    this._translate = t.Clone(), this.OnPropertyChanged("Translate");
  }
  get VerticalAlignment() {
    return this._verticalAlignment;
  }
  set VerticalAlignment(t) {
    this._verticalAlignment = t, this.OnPropertyChanged("VerticalAlignment");
  }
  get HorizontalAlignment() {
    return this._horizontalAlignment;
  }
  set HorizontalAlignment(t) {
    this._horizontalAlignment = t, this.OnPropertyChanged("HorizontalAlignment");
  }
  get BackgroundColor() {
    return this._backgroundColor;
  }
  set BackgroundColor(t) {
    this._backgroundColor = t.Clone(), this.OnPropertyChanged("BackgroundColor");
  }
  get Padding() {
    return this._padding;
  }
  set Padding(t) {
    this._padding = t, this.OnPropertyChanged("Padding");
  }
  get LineHeight() {
    return this._lineHeight;
  }
  set LineHeight(t) {
    this._lineHeight = t, this.OnPropertyChanged("LineHeight");
  }
  GetPaintTasks() {
    return [this._paint];
  }
  AlignToTopLeftCorner() {
    this.VerticalAlignment = n.Align.Start, this.HorizontalAlignment = n.Align.Start;
  }
  OnInvalidated(t, s, r) {
    let e = this.X, a = this.Y;
    if (this.LocationUnit == n.MeasureUnit.ChartValues) {
      if (s == null || r == null)
        throw new l.Exception(`You can not use ${n.MeasureUnit.ChartValues} scale at this element.`);
      e = r.ToPixels(e), a = s.ToPixels(a);
    }
    if (this._targetPosition = new n.LvcPoint(this.X + this._xc, this.Y + this._yc).Clone(), this.Measure(t, s, r), this._labelGeometry == null) {
      let g = this.GetPositionRelativeToParent();
      this._labelGeometry = new S().Init(
        {
          Text: this.Text,
          TextSize: this.TextSize,
          X: g.X,
          Y: g.Y,
          RotateTransform: this.Rotation,
          TranslateTransform: this.Translate.Clone(),
          VerticalAlign: this.VerticalAlignment,
          HorizontalAlign: this.HorizontalAlignment,
          Background: this.BackgroundColor.Clone(),
          Padding: this.Padding
        }
      ), n.Extensions.TransitionateProperties(
        this._labelGeometry
      ).WithAnimationFromChart(t).CompleteCurrentTransitions();
    }
    this._labelGeometry.Text = this.Text, this._labelGeometry.TextSize = this.TextSize, this._labelGeometry.X = e + this._xc, this._labelGeometry.Y = a + this._yc, this._labelGeometry.RotateTransform = this.Rotation, this._labelGeometry.TranslateTransform = this.Translate.Clone(), this._labelGeometry.VerticalAlign = this.VerticalAlignment, this._labelGeometry.HorizontalAlign = this.HorizontalAlignment, this._labelGeometry.Background = this.BackgroundColor.Clone(), this._labelGeometry.Padding = this.Padding, this._labelGeometry.LineHeight = this.LineHeight;
    let h = J.Draw(t.Canvas);
    this.Paint != null && h.SelectPaint(this.Paint).Draw(this._labelGeometry);
  }
  Measure(t, s, r) {
    let e = this._labelGeometry ?? new S().Init(
      {
        Text: this.Text,
        TextSize: this.TextSize,
        RotateTransform: this.Rotation,
        TranslateTransform: this.Translate.Clone(),
        VerticalAlign: this.VerticalAlignment,
        HorizontalAlign: this.HorizontalAlignment,
        Background: this.BackgroundColor.Clone(),
        Padding: this.Padding
      }
    );
    return this._actualSize = (this._paint == null ? new n.LvcSize() : e.Measure(this._paint)).Clone();
  }
  GetTargetSize() {
    return this._actualSize;
  }
  GetTargetLocation() {
    let t = this._targetPosition.X, s = this._targetPosition.Y;
    t += this.Translate.X, s += this.Translate.Y;
    let r = this.GetTargetSize();
    return this.HorizontalAlignment == n.Align.Middle && (t -= r.Width * 0.5), this.HorizontalAlignment == n.Align.End && (t -= r.Width), this.VerticalAlignment == n.Align.Middle && (s -= r.Height * 0.5), this.VerticalAlignment == n.Align.End && (s -= r.Height), new n.LvcPoint(t, s);
  }
}
class Jt extends at {
  constructor(t) {
    super();
    o(this, "_geometry");
    o(this, "_actualSize", new n.LvcSize().Clone());
    o(this, "_targetLocation", new n.LvcPoint().Clone());
    o(this, "_geometryFactory");
    o(this, "GeometryIntialized", new l.Event());
    this._geometryFactory = t;
  }
  Measure(t, s, r) {
    let e = this.Width, a = this.Height;
    if (this.SizeUnit == n.MeasureUnit.ChartValues) {
      if (s == null || r == null)
        throw new l.Exception(`You can not use ${n.MeasureUnit.ChartValues} scale at this element.`);
      e = r.MeasureInPixels(e), a = s.MeasureInPixels(a);
    }
    return this._actualSize = new n.LvcSize(e, a);
  }
  GetTargetSize() {
    return this._actualSize;
  }
  OnInvalidated(t, s, r) {
    let e = this.X, a = this.Y;
    if (this.LocationUnit == n.MeasureUnit.ChartValues) {
      if (s == null || r == null)
        throw new l.Exception(`You can not use ${n.MeasureUnit.ChartValues} scale at this element.`);
      e = r.ToPixels(e), a = s.ToPixels(a);
    }
    if (this._targetLocation = new n.LvcPoint(this.X + this._xc, this.Y + this._yc).Clone(), this.Measure(t, s, r), this._geometry == null) {
      let g = this.GetPositionRelativeToParent();
      this._geometry = this._geometryFactory(), this._geometry.X = g.X, this._geometry.Y = g.Y, this._geometry.Width = this._actualSize.Width, this._geometry.Height = this._actualSize.Height, this.GeometryIntialized.Invoke(this._geometry), n.Extensions.TransitionateProperties(
        this._geometry
      ).WithAnimationFromChart(t).CompleteCurrentTransitions();
    }
    this._geometry.X = e + this._xc, this._geometry.Y = a + this._yc, this._geometry.Width = this._actualSize.Width, this._geometry.Height = this._actualSize.Height;
    let h = J.Draw(t.Canvas);
    this.Fill != null && h.SelectPaint(this.Fill).Draw(this._geometry), this.Stroke != null && h.SelectPaint(this.Stroke).Draw(this._geometry);
  }
  GetTargetLocation() {
    return this._targetLocation;
  }
}
class At extends at {
  constructor(t) {
    super();
    o(this, "_geometry");
    o(this, "_isInitialized", !1);
    o(this, "_actualSize", new n.LvcSize().Clone());
    o(this, "_targetPosition", new n.LvcPoint().Clone());
    o(this, "GeometryIntialized", new l.Event());
    this._geometry = t;
  }
  get Geometry() {
    return this._geometry;
  }
  set Geometry(t) {
    this._geometry != t && (this._geometry = t, this._isInitialized = !1, this.OnPropertyChanged("Geometry"));
  }
  Measure(t, s, r) {
    let e = this.Width, a = this.Height;
    if (this.SizeUnit == n.MeasureUnit.ChartValues) {
      if (s == null || r == null)
        throw new l.Exception(`You can not use ${n.MeasureUnit.ChartValues} scale at this element.`);
      e = r.MeasureInPixels(e), a = s.MeasureInPixels(a);
    }
    return this._actualSize = new n.LvcSize(e, a);
  }
  GetTargetSize() {
    return this._actualSize;
  }
  OnInvalidated(t, s, r) {
    let e = this.X, a = this.Y;
    if (this.LocationUnit == n.MeasureUnit.ChartValues) {
      if (s == null || r == null)
        throw new l.Exception(`You can not use ${n.MeasureUnit.ChartValues} scale at this element.`);
      e = r.ToPixels(e), a = s.ToPixels(a);
    }
    if (this._targetPosition = new n.LvcPoint(this.X + this._xc, this.Y + this._yc).Clone(), this.Measure(t, s, r), !this._isInitialized) {
      let g = this.GetPositionRelativeToParent();
      this.Geometry.X = g.X, this.Geometry.Y = g.Y, this.Geometry.Width = this._actualSize.Width, this.Geometry.Height = this._actualSize.Height, this.GeometryIntialized.Invoke(this.Geometry), n.Extensions.TransitionateProperties(
        this.Geometry
      ).WithAnimationFromChart(t).CompleteCurrentTransitions(), this._isInitialized = !0;
    }
    this.Geometry.X = e + this._xc, this.Geometry.Y = a + this._yc, this.Geometry.Width = this._actualSize.Width, this.Geometry.Height = this._actualSize.Height;
    let h = J.Draw(t.Canvas);
    this.Fill != null && h.SelectPaint(this.Fill).Draw(this.Geometry), this.Stroke != null && h.SelectPaint(this.Stroke).Draw(this.Geometry);
  }
  GetTargetLocation() {
    return this._targetPosition;
  }
}
class ht {
  static AsDrawnControl(i, t = 10050) {
    let s = new n.RelativePanel().Init(
      {
        Size: new n.LvcSize(i.Width, i.Height)
      }
    );
    for (const r of i.PaintSchedules)
      for (const e of r.Geometries) {
        let a = e, h = new At(a).Init(
          {
            Width: a.Width,
            Height: a.Height
          }
        );
        r.PaintTask.ZIndex = r.PaintTask.ZIndex + 1 + t, r.PaintTask.IsFill && (h.Fill = r.PaintTask), r.PaintTask.IsStroke && (h.Stroke = r.PaintTask), s.Children.Add(h);
      }
    return s;
  }
}
class Zt extends n.StackedStepAreaSeries {
  constructor() {
    super(
      () => new w(),
      () => new S(),
      () => new gt(),
      () => new dt(() => new w())
    );
  }
}
class Qt extends n.ColumnSeries {
  constructor() {
    super(() => new T(), () => new S());
  }
}
class p {
  static AddLightTheme(i, t = null) {
    return i.HasTheme((s) => {
      n.LiveCharts.DefaultSettings.WithAnimationsSpeed(l.TimeSpan.FromMilliseconds(800)).WithEasingFunction(n.EasingFunctions.ExponentialOut);
      let r = n.ColorPalletes.MaterialDesign500;
      n.LiveChartsStylerExtensions.HasRuleForGaugeFillSeries(
        n.LiveChartsStylerExtensions.HasRuleForGaugeSeries(
          n.LiveChartsStylerExtensions.HasRuleForPolarLineSeries(
            n.LiveChartsStylerExtensions.HasRuleForPieSeries(
              n.LiveChartsStylerExtensions.HasRuleForScatterSeries(
                n.LiveChartsStylerExtensions.HasRuleForFinancialSeries(
                  n.LiveChartsStylerExtensions.HasRuleForHeatSeries(
                    n.LiveChartsStylerExtensions.HasRuleForStackedStepLineSeries(
                      n.LiveChartsStylerExtensions.HasRuleForStackedBarSeries(
                        n.LiveChartsStylerExtensions.HasRuleForBarSeries(
                          n.LiveChartsStylerExtensions.HasRuleForStackedLineSeries(
                            n.LiveChartsStylerExtensions.HasRuleForStepLineSeries(
                              n.LiveChartsStylerExtensions.HasRuleForLineSeries(
                                n.LiveChartsStylerExtensions.HasRuleForAxes(
                                  s,
                                  (e) => {
                                    if (e.TextSize = 16, e.ShowSeparatorLines = !0, e.NamePaint = new c().Init({ Color: new d.Color(35, 35, 35) }), e.LabelsPaint = new c().Init({ Color: new d.Color(70, 70, 70) }), n.IsInterfaceOfICartesianAxis(e)) {
                                      const a = e;
                                      e.SeparatorsPaint = a.Orientation == n.AxisOrientation.X ? null : new c().Init({ Color: new d.Color(235, 235, 235) }), a.Padding = n.Padding.All(12);
                                    } else
                                      e.SeparatorsPaint = new c().Init({ Color: new d.Color(235, 235, 235) });
                                  }
                                ),
                                (e) => {
                                  let a = p.GetThemedColor(e, r);
                                  e.Name = `Series #${e.SeriesId + 1}`, e.GeometrySize = 12, e.GeometryStroke = c.MakeByColorAndStroke(a, 4), e.GeometryFill = c.MakeByColor(new d.Color(250, 250, 250)), e.Stroke = c.MakeByColorAndStroke(a, 4), e.Fill = c.MakeByColor(a.WithAlpha(50));
                                }
                              ),
                              (e) => {
                                let a = p.GetThemedColor(e, r);
                                e.Name = `Series #${e.SeriesId + 1}`, e.GeometrySize = 12, e.GeometryStroke = c.MakeByColorAndStroke(a, 4), e.GeometryFill = c.MakeByColor(new d.Color(250, 250, 250)), e.Stroke = c.MakeByColorAndStroke(a, 4), e.Fill = c.MakeByColor(a.WithAlpha(50));
                              }
                            ),
                            (e) => {
                              let a = p.GetThemedColor(e, r);
                              e.Name = `Series #${e.SeriesId + 1}`, e.GeometrySize = 0, e.GeometryStroke = null, e.GeometryFill = null, e.Stroke = null, e.Fill = c.MakeByColor(a);
                            }
                          ),
                          (e) => {
                            let a = p.GetThemedColor(e, r);
                            e.Name = `Series #${e.SeriesId + 1}`, e.Stroke = null, e.Fill = c.MakeByColor(a), e.Rx = 4, e.Ry = 4;
                          }
                        ),
                        (e) => {
                          let a = p.GetThemedColor(e, r);
                          e.Name = `Series #${e.SeriesId + 1}`, e.Stroke = null, e.Fill = c.MakeByColor(a), e.Rx = 0, e.Ry = 0;
                        }
                      ),
                      (e) => {
                        let a = p.GetThemedColor(e, r);
                        e.Name = `Series #${e.SeriesId + 1}`, e.GeometrySize = 0, e.GeometryStroke = null, e.GeometryFill = null, e.Stroke = null, e.Fill = c.MakeByColor(a);
                      }
                    ),
                    (e) => {
                    }
                  ),
                  (e) => {
                    e.Name = `Series #${e.SeriesId + 1}`, e.UpFill = c.MakeByColor(new d.Color(139, 195, 74, 255)), e.UpStroke = c.MakeByColorAndStroke(new d.Color(139, 195, 74, 255), 3), e.DownFill = c.MakeByColor(new d.Color(239, 83, 80, 255)), e.DownStroke = c.MakeByColorAndStroke(new d.Color(239, 83, 80, 255), 3);
                  }
                ),
                (e) => {
                  let a = p.GetThemedColor(e, r);
                  e.Name = `Series #${e.SeriesId + 1}`, e.Stroke = null, e.Fill = c.MakeByColor(a.WithAlpha(200));
                }
              ),
              (e) => {
                let a = p.GetThemedColor(e, r);
                e.Name = `Series #${e.SeriesId + 1}`, e.Stroke = null, e.Fill = c.MakeByColor(a);
              }
            ),
            (e) => {
              let a = p.GetThemedColor(e, r);
              e.Name = `Series #${e.SeriesId + 1}`, e.GeometrySize = 12, e.GeometryStroke = c.MakeByColorAndStroke(a, 4), e.GeometryFill = c.MakeByColor(new d.Color(250, 250, 250)), e.Stroke = c.MakeByColorAndStroke(a, 4), e.Fill = c.MakeByColor(a.WithAlpha(50));
            }
          ),
          (e) => {
            let a = p.GetThemedColor(e, r);
            e.Name = `Series #${e.SeriesId + 1}`, e.Stroke = null, e.Fill = c.MakeByColor(a), e.DataLabelsPosition = n.PolarLabelsPosition.ChartCenter, e.DataLabelsPaint = c.MakeByColor(new d.Color(70, 70, 70));
          }
        ),
        (e) => {
          e.Fill = c.MakeByColor(new d.Color(30, 30, 30, 10));
        }
      ), t?.call(this, s);
    });
  }
  static AddDarkTheme(i, t = null) {
    return i.HasTheme((s) => {
      n.LiveCharts.DefaultSettings.WithAnimationsSpeed(l.TimeSpan.FromMilliseconds(800)).WithEasingFunction(n.EasingFunctions.ExponentialOut).WithTooltipBackgroundPaint(c.MakeByColor(new d.Color(45, 45, 45))).WithTooltipTextPaint(c.MakeByColor(new d.Color(245, 245, 245)));
      let r = n.ColorPalletes.MaterialDesign200;
      n.LiveChartsStylerExtensions.HasRuleForGaugeFillSeries(
        n.LiveChartsStylerExtensions.HasRuleForGaugeSeries(
          n.LiveChartsStylerExtensions.HasRuleForPolarLineSeries(
            n.LiveChartsStylerExtensions.HasRuleForFinancialSeries(
              n.LiveChartsStylerExtensions.HasRuleForHeatSeries(
                n.LiveChartsStylerExtensions.HasRuleForStackedStepLineSeries(
                  n.LiveChartsStylerExtensions.HasRuleForPieSeries(
                    n.LiveChartsStylerExtensions.HasRuleForStackedBarSeries(
                      n.LiveChartsStylerExtensions.HasRuleForBarSeries(
                        n.LiveChartsStylerExtensions.HasRuleForStackedLineSeries(
                          n.LiveChartsStylerExtensions.HasRuleForStepLineSeries(
                            n.LiveChartsStylerExtensions.HasRuleForLineSeries(
                              n.LiveChartsStylerExtensions.HasRuleForAxes(
                                s,
                                (e) => {
                                  if (e.TextSize = 16, e.ShowSeparatorLines = !0, e.NamePaint = c.MakeByColor(new d.Color(235, 235, 235)), e.LabelsPaint = c.MakeByColor(new d.Color(200, 200, 200)), n.IsInterfaceOfICartesianAxis(e)) {
                                    const a = e;
                                    e.SeparatorsPaint = a.Orientation == n.AxisOrientation.X ? null : c.MakeByColor(new d.Color(90, 90, 90)), a.Padding = n.Padding.All(12);
                                  } else
                                    e.SeparatorsPaint = c.MakeByColor(new d.Color(90, 90, 90));
                                }
                              ),
                              (e) => {
                                let a = p.GetThemedColor(e, r);
                                e.Name = `Series #${e.SeriesId + 1}`, e.GeometrySize = 12, e.GeometryStroke = c.MakeByColorAndStroke(a, 4), e.GeometryFill = c.MakeByColor(new d.Color(30, 30, 30)), e.Stroke = c.MakeByColorAndStroke(a, 4), e.Fill = c.MakeByColor(a.WithAlpha(50));
                              }
                            ),
                            (e) => {
                              let a = p.GetThemedColor(e, r);
                              e.Name = `Series #${e.SeriesId + 1}`, e.GeometrySize = 12, e.GeometryStroke = c.MakeByColorAndStroke(a, 4), e.GeometryFill = c.MakeByColor(new d.Color(30, 30, 30)), e.Stroke = c.MakeByColorAndStroke(a, 4), e.Fill = c.MakeByColor(a.WithAlpha(50));
                            }
                          ),
                          (e) => {
                            let a = p.GetThemedColor(e, r);
                            e.Name = `Series #${e.SeriesId + 1}`, e.GeometrySize = 0, e.GeometryStroke = null, e.GeometryFill = null, e.Stroke = null, e.Fill = c.MakeByColor(a);
                          }
                        ),
                        (e) => {
                          let a = p.GetThemedColor(e, r);
                          e.Name = `Series #${e.SeriesId + 1}`, e.Stroke = null, e.Fill = c.MakeByColor(a), e.Rx = 4, e.Ry = 4;
                        }
                      ),
                      (e) => {
                        let a = p.GetThemedColor(e, r);
                        e.Name = `Series #${e.SeriesId + 1}`, e.Stroke = null, e.Fill = c.MakeByColor(a), e.Rx = 0, e.Ry = 0;
                      }
                    ),
                    (e) => {
                      let a = p.GetThemedColor(e, r);
                      e.Name = `Series #${e.SeriesId + 1}`, e.Stroke = null, e.Fill = c.MakeByColor(a);
                    }
                  ),
                  (e) => {
                    let a = p.GetThemedColor(e, r);
                    e.Name = `Series #${e.SeriesId + 1}`, e.GeometrySize = 0, e.GeometryStroke = null, e.GeometryFill = null, e.Stroke = null, e.Fill = c.MakeByColor(a);
                  }
                ),
                (e) => {
                }
              ),
              (e) => {
                e.Name = `Series #${e.SeriesId + 1}`, e.UpFill = c.MakeByColor(new d.Color(139, 195, 74, 255)), e.UpStroke = c.MakeByColorAndStroke(new d.Color(139, 195, 74, 255), 3), e.DownFill = c.MakeByColor(new d.Color(239, 83, 80, 255)), e.DownStroke = c.MakeByColorAndStroke(new d.Color(239, 83, 80, 255), 3);
              }
            ),
            (e) => {
              let a = p.GetThemedColor(e, r);
              e.Name = `Series #${e.SeriesId + 1}`, e.GeometrySize = 12, e.GeometryStroke = c.MakeByColorAndStroke(a, 4), e.GeometryFill = c.MakeByColor(new d.Color(0)), e.Stroke = c.MakeByColorAndStroke(a, 4), e.Fill = c.MakeByColor(a.WithAlpha(50));
            }
          ),
          (e) => {
            let a = p.GetThemedColor(e, r);
            e.Name = `Series #${e.SeriesId + 1}`, e.Stroke = null, e.Fill = c.MakeByColor(a), e.DataLabelsPaint = c.MakeByColor(new d.Color(200, 200, 200));
          }
        ),
        (e) => {
          e.Fill = c.MakeByColor(new d.Color(255, 255, 255, 30));
        }
      ), t?.call(this, s);
    });
  }
  static GetThemedColor(i, t) {
    return M.AsSKColor(t[i.SeriesId % t.length]);
  }
}
class te extends n.PolarLineSeries {
  constructor() {
    super(
      () => new w(),
      () => new S(),
      () => new tt(),
      () => new Q(new w())
    );
  }
}
class ee {
  constructor() {
    o(this, "_keyValuePairs", new l.Dictionary());
    o(this, "_tuples", new l.List());
    o(this, "_builtSeries");
    o(this, "_radialAlign", null);
    o(this, "_innerRadius", null);
    o(this, "_offsetRadius", null);
    o(this, "_backgroundInnerRadius", null);
    o(this, "_backgroundOffsetRadius", null);
    o(this, "_backgroundCornerRadius", null);
    o(this, "_cornerRadius", null);
    o(this, "_background", null);
    o(this, "_labelsSize", null);
    o(this, "_labelsPosition", null);
    o(this, "_backgroundMaxRadialColumnWidth", null);
    o(this, "_maxColumnWidth", null);
    o(this, "_labelFormatter", (i) => i.PrimaryValue.toString());
  }
  get InnerRadius() {
    return this._innerRadius;
  }
  set InnerRadius(i) {
    this._innerRadius = i, this.OnPopertyChanged();
  }
  WithInnerRadius(i) {
    return this.InnerRadius = i, this;
  }
  get OffsetRadius() {
    return this._offsetRadius;
  }
  set OffsetRadius(i) {
    this._offsetRadius = i, this.OnPopertyChanged();
  }
  WithOffsetRadius(i) {
    return this.OffsetRadius = i, this;
  }
  get MaxColumnWidth() {
    return this._maxColumnWidth;
  }
  set MaxColumnWidth(i) {
    this._maxColumnWidth = i, this.OnPopertyChanged();
  }
  WithMaxColumnWidth(i) {
    return this.MaxColumnWidth = i, this;
  }
  get CornerRadius() {
    return this._cornerRadius;
  }
  set CornerRadius(i) {
    this._cornerRadius = i, this.OnPopertyChanged();
  }
  WithCornerRadius(i) {
    return this.CornerRadius = i, this;
  }
  get RadialAlign() {
    return this._radialAlign;
  }
  set RadialAlign(i) {
    this._radialAlign = i, this.OnPopertyChanged();
  }
  WithRadialAlign(i) {
    return this.RadialAlign = i, this;
  }
  get BackgroundInnerRadius() {
    return this._backgroundInnerRadius;
  }
  set BackgroundInnerRadius(i) {
    this._backgroundInnerRadius = i, this.OnPopertyChanged();
  }
  WithBackgroundInnerRadius(i) {
    return this.BackgroundInnerRadius = i, this;
  }
  get BackgroundOffsetRadius() {
    return this._backgroundOffsetRadius;
  }
  set BackgroundOffsetRadius(i) {
    this._backgroundOffsetRadius = i, this.OnPopertyChanged();
  }
  WithBackgroundOffsetRadius(i) {
    return this.BackgroundOffsetRadius = i, this;
  }
  get BackgroundMaxRadialColumnWidth() {
    return this._backgroundMaxRadialColumnWidth;
  }
  set BackgroundMaxRadialColumnWidth(i) {
    this._backgroundMaxRadialColumnWidth = i, this.OnPopertyChanged();
  }
  WithBackgroundMaxRadialColumnWidth(i) {
    return this.BackgroundMaxRadialColumnWidth = i, this;
  }
  get BackgroundCornerRadius() {
    return this._backgroundCornerRadius;
  }
  set BackgroundCornerRadius(i) {
    this._backgroundCornerRadius = i, this.OnPopertyChanged();
  }
  WithBackgroundCornerRadius(i) {
    return this.BackgroundMaxRadialColumnWidth = i, this;
  }
  get Background() {
    return this._background;
  }
  set Background(i) {
    this._background = i, this.OnPopertyChanged();
  }
  WithBackground(i) {
    return this.Background = i, this;
  }
  get LabelsSize() {
    return this._labelsSize;
  }
  set LabelsSize(i) {
    this._labelsSize = i, this.OnPopertyChanged();
  }
  WithLabelsSize(i) {
    return this.LabelsSize = i, this;
  }
  get LabelsPosition() {
    return this._labelsPosition;
  }
  set LabelsPosition(i) {
    this._labelsPosition = i, this.OnPopertyChanged();
  }
  WithLabelsPosition(i) {
    return this.LabelsPosition = i, this;
  }
  get LabelFormatter() {
    return this._labelFormatter;
  }
  set LabelFormatter(i) {
    this._labelFormatter = i, this.OnPopertyChanged();
  }
  WithLabelFormatter(i) {
    return this.LabelFormatter = i, this;
  }
  AddValue1(i, t, s, r = null) {
    return this._tuples.Add(
      new l.Tuple4(i, t, s, r)
    ), this;
  }
  AddValue2(i, t, s, r = null) {
    return r ?? (r = new d.Color(35, 35, 35)), this.AddValue1(
      i,
      t,
      new c().Init({ Color: s }),
      new c().Init({ Color: r })
    );
  }
  AddValue3(i, t, s, r = null) {
    return this.AddValue2(new n.ObservableValue(i), t, s, r);
  }
  AddValue4(i) {
    return this.AddValue1(i, null, null, null);
  }
  AddValue5(i) {
    return this.AddValue4(new n.ObservableValue(i));
  }
  AddValue6(i, t) {
    return this.AddValue1(i, t, null, null);
  }
  AddValue7(i, t) {
    return this.AddValue6(new n.ObservableValue(i), t);
  }
  BuildSeries() {
    let i = new l.List(), t = 0;
    for (const e of this._tuples) {
      let a = new l.List();
      for (; a.length < this._tuples.length - 1; )
        a.Add(new n.ObservableValue(null));
      a.Insert(t, e.Item1);
      let h = new q(!0).Init(
        {
          ZIndex: t + 1,
          Values: a,
          Name: e.Item2,
          HoverPushout: 0
        }
      );
      e.Item3 != null && (h.Fill = e.Item3), e.Item4 != null && (h.DataLabelsPaint = e.Item4), this.LabelFormatter != null && (h.DataLabelsFormatter = this.LabelFormatter), h.Stroke, this.ApplyStyles(h), i.Add(h), this._keyValuePairs.Add(h, e), t++;
    }
    let s = new l.List();
    for (; s.length < this._tuples.length; )
      s.Add(new n.ObservableValue(0));
    let r = new q(!0, !0).Init(
      {
        ZIndex: -1,
        IsFillSeries: !0,
        Values: s
      }
    );
    return this.ApplyStyles(r), i.Add(r), this._builtSeries = i, i;
  }
  ApplyStyles(i) {
    if ((i.SeriesProperties & n.SeriesProperties.GaugeFill) == n.SeriesProperties.GaugeFill) {
      this.ApplyStylesToFill(i);
      return;
    }
    this.ApplyStylesToSeries(i);
  }
  ApplyStylesToFill(i) {
    this.Background != null && (i.Fill = this.Background), this.BackgroundInnerRadius != null && (i.InnerRadius = this.BackgroundInnerRadius), this.BackgroundOffsetRadius != null && (i.RelativeOuterRadius = this.BackgroundOffsetRadius, i.RelativeInnerRadius = this.BackgroundOffsetRadius), this.BackgroundMaxRadialColumnWidth != null && (i.MaxRadialColumnWidth = this.BackgroundMaxRadialColumnWidth), this.RadialAlign != null && (i.RadialAlign = this.RadialAlign);
  }
  ApplyStylesToSeries(i) {
    let t;
    this._keyValuePairs.TryGetValue(i, new l.Out(() => t, (s) => t = s)) && t.Item3 != null && (i.Fill = t.Item3), this.LabelsSize != null && (i.DataLabelsSize = this.LabelsSize), this.LabelsPosition != null && (i.DataLabelsPosition = this.LabelsPosition), this.InnerRadius != null && (i.InnerRadius = this.InnerRadius), this.OffsetRadius != null && (i.RelativeInnerRadius = this.OffsetRadius, i.RelativeOuterRadius = this.OffsetRadius), this.MaxColumnWidth != null && (i.MaxRadialColumnWidth = this.MaxColumnWidth), this.RadialAlign != null && (i.RadialAlign = this.RadialAlign), i.DataLabelsFormatter = this.LabelFormatter;
  }
  OnPopertyChanged() {
    if (this._builtSeries != null)
      for (const i of this._builtSeries)
        this.ApplyStyles(i);
  }
}
class It extends n.MotionProperty {
  constructor(i, t) {
    super(i), this.fromValue = t.Clone(), this.toValue = t.Clone();
  }
  OnGetMovement(i) {
    return new d.Matrix4(
      this.fromValue.M0 + i * (this.toValue.M0 - this.fromValue.M0),
      this.fromValue.M1 + i * (this.toValue.M1 - this.fromValue.M1),
      this.fromValue.M2 + i * (this.toValue.M2 - this.fromValue.M2),
      this.fromValue.M3 + i * (this.toValue.M3 - this.fromValue.M3),
      this.fromValue.M4 + i * (this.toValue.M4 - this.fromValue.M4),
      this.fromValue.M5 + i * (this.toValue.M5 - this.fromValue.M5),
      this.fromValue.M6 + i * (this.toValue.M6 - this.fromValue.M6),
      this.fromValue.M7 + i * (this.toValue.M7 - this.fromValue.M7),
      this.fromValue.M8 + i * (this.toValue.M8 - this.fromValue.M8),
      this.fromValue.M9 + i * (this.toValue.M9 - this.fromValue.M9),
      this.fromValue.M10 + i * (this.toValue.M10 - this.fromValue.M10),
      this.fromValue.M11 + i * (this.toValue.M11 - this.fromValue.M11),
      this.fromValue.M12 + i * (this.toValue.M12 - this.fromValue.M12),
      this.fromValue.M13 + i * (this.toValue.M13 - this.fromValue.M13),
      this.fromValue.M14 + i * (this.toValue.M14 - this.fromValue.M14),
      this.fromValue.M15 + i * (this.toValue.M15 - this.fromValue.M15)
    );
  }
}
class $ extends n.Animatable {
  constructor() {
    super();
    o(this, "_strokeMiterTransition");
    o(this, "_geometriesByCanvas", new l.Dictionary());
    o(this, "_clipRectangles", new l.Dictionary());
    o(this, "_matchesChar", null);
    o(this, "_skiaPaint");
    o(this, "_strokeWidthTransition");
    o(this, "_fontFamily");
    o(this, "ZIndex", 0);
    o(this, "Style", CanvasKit.PaintStyle.Fill);
    o(this, "IsStroke", !1);
    o(this, "IsFill", !1);
    o(this, "SKFontStyle");
    o(this, "SKTypeface");
    o(this, "IsAntialias", !0);
    o(this, "StrokeCap", CanvasKit.StrokeCap.Butt);
    o(this, "StrokeJoin", CanvasKit.StrokeJoin.Miter);
    o(this, "Color", d.Color.Empty.Clone());
    o(this, "IsPaused", !1);
    o(this, "PathEffect");
    o(this, "ImageFilter");
    this._strokeWidthTransition = this.RegisterMotionProperty(new n.FloatMotionProperty("StrokeThickness", 0)), this._strokeMiterTransition = this.RegisterMotionProperty(new n.FloatMotionProperty("StrokeMiter", 0));
  }
  get StrokeThickness() {
    return this._strokeWidthTransition.GetMovement(this);
  }
  set StrokeThickness(t) {
    this._strokeWidthTransition.SetMovement(t, this);
  }
  get FontFamily() {
    return this._fontFamily;
  }
  set FontFamily(t) {
    this._fontFamily = t;
  }
  get HasCustomFont() {
    return M.DefaultSKTypeface != null || this.FontFamily != null || this.SKTypeface != null || this.SKFontStyle != null;
  }
  get StrokeMiter() {
    return this._strokeMiterTransition.GetMovement(this);
  }
  set StrokeMiter(t) {
    this._strokeMiterTransition.SetMovement(t, this);
  }
  GetGeometries(t) {
    const s = function* (r) {
      let e = this.GetGeometriesByCanvas(r);
      if (e != null)
        for (const a of e)
          yield a;
    }.bind(this);
    return l.EnumerableFrom(() => s(t));
  }
  SetGeometries(t, s) {
    this._geometriesByCanvas.SetAt(t.Sync, s), this.IsValid = !1;
  }
  AddGeometryToPaintTask(t, s) {
    let r = this.GetGeometriesByCanvas(t);
    r == null && (r = new l.HashSet(), this._geometriesByCanvas.SetAt(t.Sync, r)), r.Add(s), this.IsValid = !1;
  }
  RemoveGeometryFromPainTask(t, s) {
    this.GetGeometriesByCanvas(t)?.Remove(s), this.IsValid = !1;
  }
  ClearGeometriesFromPaintTask(t) {
    this.GetGeometriesByCanvas(t)?.Clear(), this.IsValid = !1;
  }
  ReleaseCanvas(t) {
    this._geometriesByCanvas.Remove(t);
  }
  GetClipRectangle(t) {
    let s;
    return this._clipRectangles.TryGetValue(t.Sync, new l.Out(() => s, (r) => s = r)) ? s : n.LvcRectangle.Empty;
  }
  SetClipRectangle(t, s) {
    this._clipRectangles.SetAt(t.Sync, s);
  }
  Dispose() {
    this._skiaPaint?.delete(), this._skiaPaint = null;
  }
  GetSKTypeface() {
    return null;
  }
  GetGeometriesByCanvas(t) {
    let s;
    return this._geometriesByCanvas.TryGetValue(t.Sync, new l.Out(() => s, (r) => s = r)) ? s : null;
  }
}
const nt = class extends $ {
  constructor(t, s, r, e = null, a = CanvasKit.TileMode.Repeat) {
    super();
    o(this, "_gradientStops");
    o(this, "_startPoint");
    o(this, "_endPoint");
    o(this, "_colorPos");
    o(this, "_tileMode");
    o(this, "_drawingContext");
    this._gradientStops = t, this._startPoint = s.Clone(), this._endPoint = r.Clone(), this._colorPos = e, this._tileMode = a;
  }
  CloneTask() {
    return new nt(this._gradientStops, this._startPoint.Clone(), this._endPoint.Clone(), this._colorPos, this._tileMode).Init(
      {
        Style: this.Style,
        IsStroke: this.IsStroke,
        IsFill: this.IsFill,
        Color: this.Color,
        IsAntialias: this.IsAntialias,
        StrokeThickness: this.StrokeThickness,
        StrokeCap: this.StrokeCap,
        StrokeJoin: this.StrokeJoin,
        StrokeMiter: this.StrokeMiter,
        FontFamily: this.FontFamily,
        SKFontStyle: this.SKFontStyle,
        SKTypeface: this.SKTypeface,
        PathEffect: this.PathEffect?.Clone(),
        ImageFilter: this.ImageFilter?.Clone()
      }
    );
  }
  ApplyOpacityMask(t, s) {
    throw new l.NotImplementedException();
  }
  RestoreOpacityMask(t, s) {
    throw new l.NotImplementedException();
  }
  InitializeTask(t) {
    this._skiaPaint ?? (this._skiaPaint = new CanvasKit.Paint());
    let s = this.GetDrawRectangleSize(t), r = s.Left, e = r + s.Width, a = s.Top, h = a + s.Height, g = new d.Point(r + (e - r) * this._startPoint.X, a + (h - a) * this._startPoint.Y), C = new d.Point(r + (e - r) * this._endPoint.X, a + (h - a) * this._endPoint.Y);
    this._skiaPaint.setShader(CanvasKit.Shader.MakeLinearGradient(g.Clone(), C.Clone(), this._gradientStops, this._colorPos == null ? null : Array.from(this._colorPos), this._tileMode)), this._skiaPaint.setAntiAlias(this.IsAntialias), this._skiaPaint.setStyle(CanvasKit.PaintStyle.Stroke), this._skiaPaint.setStrokeWidth(this.StrokeThickness), this._skiaPaint.setStrokeCap(this.StrokeCap), this._skiaPaint.setStrokeJoin(this.StrokeJoin), this._skiaPaint.setStrokeMiter(this.StrokeMiter), this._skiaPaint.setStyle(this.IsStroke ? CanvasKit.PaintStyle.Stroke : CanvasKit.PaintStyle.Fill), this.PathEffect != null && (this.PathEffect.CreateEffect(t), this._skiaPaint.setPathEffect(this.PathEffect.SKPathEffect)), this.ImageFilter != null && (this.ImageFilter.CreateFilter(t), this._skiaPaint.setImageFilter(this.ImageFilter.SKImageFilter));
    let m = this.GetClipRectangle(t.MotionCanvas);
    l.OpInequality(m, n.LvcRectangle.Empty) && (t.Canvas.save(), t.Canvas.clipRect(d.Rect.FromLTWH(m.X, m.Y, m.Width, m.Height), CanvasKit.ClipOp.Intersect, !0), this._drawingContext = t), t.Paint = this._skiaPaint, t.PaintTask = this;
  }
  Dispose() {
    this.PathEffect?.Dispose(), this.ImageFilter?.Dispose(), this._drawingContext != null && l.OpInequality(this.GetClipRectangle(this._drawingContext.MotionCanvas), n.LvcRectangle.Empty) && (this._drawingContext.Canvas.restore(), this._drawingContext = null), super.Dispose();
  }
  GetDrawRectangleSize(t) {
    let s = this.GetClipRectangle(t.MotionCanvas);
    return l.OpEquality(
      s,
      n.LvcRectangle.Empty
    ) ? new d.Rect(0, 0, t.Width, t.Width) : new d.Rect(s.X, s.Y, s.X + s.Width, s.Y + s.Height);
  }
};
let Y = nt;
o(Y, "s_defaultStartPoint", new d.Point(0, 0.5).Clone()), o(Y, "s_defaultEndPoint", new d.Point(1, 0.5).Clone());
class c extends $ {
  constructor() {
    super();
    o(this, "_drawingContext");
  }
  static MakeByColor(t) {
    return new c().Init({ Color: t });
  }
  static MakeByColorAndStroke(t, s) {
    let r = new c();
    return r._strokeWidthTransition = r.RegisterMotionProperty(new n.FloatMotionProperty("StrokeThickness", s)), r.Color = t, r;
  }
  CloneTask() {
    return new c().Init(
      {
        Style: this.Style,
        IsStroke: this.IsStroke,
        IsFill: this.IsFill,
        Color: this.Color,
        IsAntialias: this.IsAntialias,
        StrokeThickness: this.StrokeThickness,
        StrokeCap: this.StrokeCap,
        StrokeJoin: this.StrokeJoin,
        StrokeMiter: this.StrokeMiter,
        FontFamily: this.FontFamily,
        SKFontStyle: this.SKFontStyle,
        SKTypeface: this.SKTypeface,
        PathEffect: this.PathEffect?.Clone(),
        ImageFilter: this.ImageFilter?.Clone()
      }
    );
  }
  InitializeTask(t) {
    this._skiaPaint ?? (this._skiaPaint = new CanvasKit.Paint()), this._skiaPaint.setColor(this.Color), this._skiaPaint.setAntiAlias(this.IsAntialias), this._skiaPaint.setStyle(this.IsStroke ? CanvasKit.PaintStyle.Stroke : CanvasKit.PaintStyle.Fill), this._skiaPaint.setStrokeCap(this.StrokeCap), this._skiaPaint.setStrokeJoin(this.StrokeJoin), this._skiaPaint.setStrokeMiter(this.StrokeMiter), this._skiaPaint.setStrokeWidth(this.StrokeThickness), this._skiaPaint.setStyle(this.IsStroke ? CanvasKit.PaintStyle.Stroke : CanvasKit.PaintStyle.Fill), this.PathEffect != null && (this.PathEffect.CreateEffect(t), this._skiaPaint.setPathEffect(this.PathEffect.SKPathEffect)), this.ImageFilter != null && (this.ImageFilter.CreateFilter(t), this._skiaPaint.setImageFilter(this.ImageFilter.SKImageFilter));
    let s = this.GetClipRectangle(t.MotionCanvas);
    l.OpInequality(s, n.LvcRectangle.Empty) && (t.Canvas.save(), t.Canvas.clipRect(
      d.Rect.FromLTWH(s.X, s.Y, s.Width, s.Height),
      CanvasKit.ClipOp.Intersect,
      !0
    ), this._drawingContext = t), t.Paint = this._skiaPaint, t.PaintTask = this;
  }
  ApplyOpacityMask(t, s) {
    if (t.PaintTask == null || t.Paint == null)
      return;
    let r = t.PaintTask.Color;
    t.Paint.setColor(new d.Color(r.Red, r.Green, r.Blue, Math.floor(255 * s.Opacity) & 255));
  }
  RestoreOpacityMask(t, s) {
    if (t.PaintTask == null || t.Paint == null)
      return;
    let r = t.PaintTask.Color;
    t.Paint.setColor(r);
  }
  Dispose() {
    this.PathEffect?.Dispose(), this.ImageFilter?.Dispose(), this._drawingContext != null && l.OpInequality(this.GetClipRectangle(this._drawingContext.MotionCanvas), n.LvcRectangle.Empty) && (this._drawingContext.Canvas.restore(), this._drawingContext = null), super.Dispose();
  }
}
class ie extends $ {
}
class ut extends $ {
  constructor(t, s = null, r = 0.5, e = null, a = CanvasKit.TileMode.Repeat) {
    super();
    o(this, "_drawingContext");
    o(this, "_gradientStops");
    o(this, "_center");
    o(this, "_radius");
    o(this, "_colorPos");
    o(this, "_tileMode");
    this._gradientStops = t, s == null && (this._center = new d.Point(0.5, 0.5)), this._radius = r, this._colorPos = e, this._tileMode = a;
  }
  CloneTask() {
    return new ut(this._gradientStops, this._center.Clone(), this._radius, this._colorPos, this._tileMode).Init(
      {
        Style: this.Style,
        IsStroke: this.IsStroke,
        IsFill: this.IsFill,
        Color: this.Color,
        IsAntialias: this.IsAntialias,
        StrokeThickness: this.StrokeThickness,
        StrokeCap: this.StrokeCap,
        StrokeJoin: this.StrokeJoin,
        StrokeMiter: this.StrokeMiter,
        FontFamily: this.FontFamily,
        SKFontStyle: this.SKFontStyle,
        SKTypeface: this.SKTypeface,
        PathEffect: this.PathEffect?.Clone(),
        ImageFilter: this.ImageFilter?.Clone()
      }
    );
  }
  InitializeTask(t) {
    this._skiaPaint ?? (this._skiaPaint = new CanvasKit.Paint());
    let s = this.GetDrawRectangleSize(t), r = new d.Point(s.Left + this._center.X * s.Width, s.Top + this._center.Y * s.Height), e = s.Left + s.Width > s.Top + s.Height ? s.Top + s.Height : s.Left + s.Width;
    e *= this._radius, this._skiaPaint.setShader(CanvasKit.Shader.MakeRadialGradient(r.Clone(), e, this._gradientStops, this._colorPos == null ? null : Array.from(this._colorPos), this._tileMode)), this._skiaPaint.setAntiAlias(this.IsAntialias), this._skiaPaint.setStyle(CanvasKit.PaintStyle.Stroke), this._skiaPaint.setStrokeWidth(this.StrokeThickness), this._skiaPaint.setStrokeCap(this.StrokeCap), this._skiaPaint.setStrokeJoin(this.StrokeJoin), this._skiaPaint.setStrokeMiter(this.StrokeMiter), this._skiaPaint.setStyle(this.IsStroke ? CanvasKit.PaintStyle.Stroke : CanvasKit.PaintStyle.Fill), this.PathEffect != null && (this.PathEffect.CreateEffect(t), this._skiaPaint.setPathEffect(this.PathEffect.SKPathEffect)), this.ImageFilter != null && (this.ImageFilter.CreateFilter(t), this._skiaPaint.setImageFilter(this.ImageFilter.SKImageFilter));
    let a = this.GetClipRectangle(t.MotionCanvas);
    l.OpInequality(a, n.LvcRectangle.Empty) && (t.Canvas.save(), t.Canvas.clipRect(d.Rect.FromLTWH(a.X, a.Y, a.Width, a.Height), CanvasKit.ClipOp.Intersect, !0), this._drawingContext = t), t.Paint = this._skiaPaint, t.PaintTask = this;
  }
  RestoreOpacityMask(t, s) {
    throw new l.NotImplementedException();
  }
  ApplyOpacityMask(t, s) {
    throw new l.NotImplementedException();
  }
  Dispose() {
    this.PathEffect?.Dispose(), this.ImageFilter?.Dispose(), this._drawingContext != null && l.OpInequality(this.GetClipRectangle(this._drawingContext.MotionCanvas), n.LvcRectangle.Empty) && (this._drawingContext.Canvas.restore(), this._drawingContext = null), super.Dispose();
  }
  GetDrawRectangleSize(t) {
    let s = this.GetClipRectangle(t.MotionCanvas);
    return l.OpEquality(
      s,
      n.LvcRectangle.Empty
    ) ? new d.Rect(0, 0, t.Width, t.Width) : new d.Rect(s.X, s.Y, s.Width, s.Height);
  }
}
const K = class {
  constructor() {
    o(this, "_orientation", n.ContainerOrientation.Vertical);
    o(this, "_stackPanel");
    o(this, "_activeSeries", new ft());
    o(this, "_toRemoveSeries", new l.List());
    o(this, "_backgroundPaint");
    o(this, "Size", n.LvcSize.Empty.Clone());
    o(this, "FontPaint");
    o(this, "TextSize", 15);
    this.FontPaint = new c().Init({ Color: new d.Color(30, 30, 30, 255) });
  }
  get BackgroundPaint() {
    return this._backgroundPaint;
  }
  set BackgroundPaint(i) {
    this._backgroundPaint = i, i != null && (i.IsFill = !0);
  }
  Draw(i) {
    if (i.Legend == null || i.LegendPosition == n.LegendPosition.Hidden || (this.Measure(i), this._stackPanel == null))
      return;
    this.BackgroundPaint != null && (this.BackgroundPaint.ZIndex = K.s_zIndex), this.FontPaint != null && (this.FontPaint.ZIndex = K.s_zIndex + 1);
    let t = i.ControlSize.Clone(), s = 17;
    i.LegendPosition == n.LegendPosition.Top && (i.Canvas.StartPoint = new n.LvcPoint(0, this.Size.Height), this._stackPanel.X = t.Width * 0.5 - this.Size.Width * 0.5, this._stackPanel.Y = -this.Size.Height), i.LegendPosition == n.LegendPosition.Bottom && (this._stackPanel.X = t.Width * 0.5 - this.Size.Width * 0.5, this._stackPanel.Y = t.Height), i.LegendPosition == n.LegendPosition.Left && (i.Canvas.StartPoint = new n.LvcPoint(this.Size.Width, 0), this._stackPanel.X = -this.Size.Width, this._stackPanel.Y = t.Height * 0.5 - this.Size.Height * 0.5), i.LegendPosition == n.LegendPosition.Right && (this._stackPanel.X = t.Width - s, this._stackPanel.Y = t.Height * 0.5 - this.Size.Height * 0.5), i.AddVisual(this._stackPanel);
    for (const r of this._toRemoveSeries) {
      let e;
      this._stackPanel.Children.Remove(r), i.RemoveVisual(r), this._activeSeries.TryGetKey(r, new l.Out(() => e, (a) => e = a)) && this._activeSeries.Remove(e);
    }
  }
  BuildLayout(i) {
    i.View.LegendBackgroundPaint != null && (this.BackgroundPaint = i.View.LegendBackgroundPaint), i.View.LegendTextPaint != null && (this.FontPaint = i.View.LegendTextPaint), i.View.LegendTextSize != null && (this.TextSize = i.View.LegendTextSize), this._orientation = i.LegendPosition == n.LegendPosition.Left || i.LegendPosition == n.LegendPosition.Right ? n.ContainerOrientation.Vertical : n.ContainerOrientation.Horizontal, this._stackPanel ?? (this._stackPanel = new n.StackPanel(() => new T()).Init(
      {
        Padding: n.Padding.All(0),
        HorizontalAlignment: n.Align.Start,
        VerticalAlignment: n.Align.Middle
      }
    )), this._stackPanel.Orientation = this._orientation, this._stackPanel.BackgroundPaint = this.BackgroundPaint, this._toRemoveSeries = new l.List(this._stackPanel.Children);
    for (const t of i.ChartSeries) {
      if (!t.IsVisibleAtLegend)
        continue;
      let s = this.GetSeriesVisual(t);
      this._toRemoveSeries.Remove(s);
    }
  }
  Measure(i) {
    let t = i;
    this.BuildLayout(t), this._stackPanel != null && (this.Size = this._stackPanel.Measure(t, null, null));
  }
  GetSeriesVisual(i) {
    let t;
    if (this._activeSeries.TryGetValue(i, new l.Out(() => t, (a) => t = a)))
      return t;
    let s = i.GetMiniatresSketch(), r = ht.AsDrawnControl(s), e = new n.StackPanel(() => new T()).Init(
      {
        Padding: new n.Padding(15, 4, 15, 4),
        VerticalAlignment: n.Align.Middle,
        HorizontalAlignment: n.Align.Middle
      }
    );
    return e.Children.Add(r), e.Children.Add(new lt().Init(
      {
        Text: i.Name ?? "",
        Paint: this.FontPaint,
        TextSize: this.TextSize,
        Padding: new n.Padding(8, 0, 0, 0),
        VerticalAlignment: n.Align.Start,
        HorizontalAlignment: n.Align.Start
      }
    )), this._stackPanel?.Children.Add(e), this._activeSeries.Add(i, e), e;
  }
};
let O = K;
o(O, "$meta_LiveChartsCore_IImageControl", !0), o(O, "s_zIndex", 10050);
var z;
const N = class {
  constructor() {
    o(this, "_chart");
    o(this, "_backgroundPaint");
    o(this, "_stackPanel");
    o(this, "_seriesVisualsMap", new l.Dictionary());
    A(this, z, n.LvcSize.Empty.Clone());
    o(this, "FontPaint");
    o(this, "TextSize", 16);
    this.FontPaint = new c().Init({ Color: new d.Color(28, 49, 58) }), this.BackgroundPaint = new c().Init(
      {
        Color: new d.Color(240, 240, 240),
        ImageFilter: new it(2, 2, 2, 2, new d.Color(30, 30, 30, 60))
      }
    );
  }
  get Size() {
    return R(this, z);
  }
  set Size(i) {
    I(this, z, i);
  }
  get BackgroundPaint() {
    return this._backgroundPaint;
  }
  set BackgroundPaint(i) {
    this._backgroundPaint = i, i != null && (i.IsFill = !0);
  }
  Show(i, t) {
    this._chart = t, t.View.TooltipBackgroundPaint != null && (this.BackgroundPaint = t.View.TooltipBackgroundPaint), t.View.TooltipTextPaint != null && (this.FontPaint = t.View.TooltipTextPaint), t.View.TooltipTextSize != null && (this.TextSize = t.View.TooltipTextSize), this.BackgroundPaint != null && (this.BackgroundPaint.ZIndex = N.s_zIndex), this.FontPaint != null && (this.FontPaint.ZIndex = N.s_zIndex + 1);
    let s = this._stackPanel ?? (this._stackPanel = new n.StackPanel(() => new T()).Init(
      {
        Padding: new n.Padding(12, 8, 12, 8),
        Orientation: n.ContainerOrientation.Vertical,
        HorizontalAlignment: n.Align.Start,
        VerticalAlignment: n.Align.Middle,
        BackgroundPaint: this.BackgroundPaint
      }
    )), r = new l.List(this._seriesVisualsMap.Values);
    for (const a of i) {
      let h = this.GetSeriesVisual(a);
      r.Remove(h);
    }
    this.Measure(t);
    let e = n.Extensions.GetTooltipLocation(i, this.Size.Clone(), t);
    this._stackPanel.X = e.X, this._stackPanel.Y = e.Y;
    for (const a of r)
      this._stackPanel.Children.Remove(a.Visual), t.RemoveVisual(a.Visual), this._seriesVisualsMap.Remove(a.Series);
    t.AddVisual(s);
  }
  Hide() {
    this._chart == null || this._stackPanel == null || this._chart.RemoveVisual(this._stackPanel);
  }
  Measure(i) {
    this._stackPanel != null && (this.Size = this._stackPanel.Measure(i, null, null));
  }
  GetSeriesVisual(i) {
    let t;
    if (this._seriesVisualsMap.TryGetValue(i.Context.Series, new l.Out(() => t, (g) => t = g)))
      return this._chart == null || (t.LabelVisual.Text = i.AsTooltipString, t.LabelVisual.Invalidate(this._chart)), t;
    let s = i.Context.Series.GetMiniatresSketch(), r = ht.AsDrawnControl(s), e = new lt().Init(
      {
        Text: i.AsTooltipString,
        Paint: this.FontPaint,
        TextSize: this.TextSize,
        Padding: new n.Padding(8, 0, 0, 0),
        VerticalAlignment: n.Align.Start,
        HorizontalAlignment: n.Align.Start
      }
    ), a = new n.StackPanel(() => new T()).Init(
      {
        Padding: new n.Padding(0, 4, 0, 4),
        VerticalAlignment: n.Align.Middle,
        HorizontalAlignment: n.Align.Middle
      }
    );
    a.Children.Add(r), a.Children.Add(e), this._stackPanel?.Children.Add(a);
    let h = new Ft(i.Context.Series, a, e);
    return this._seriesVisualsMap.Add(i.Context.Series, h), h;
  }
};
let G = N;
z = new WeakMap(), o(G, "$meta_LiveChartsCore_IImageControl", !0), o(G, "s_zIndex", 10050);
var D, b;
class Ft {
  constructor(i, t, s) {
    A(this, D, void 0);
    A(this, b, void 0);
    o(this, "LabelVisual");
    this.Series = i, this.Visual = t, this.LabelVisual = s;
  }
  get Series() {
    return R(this, D);
  }
  set Series(i) {
    I(this, D, i);
  }
  get Visual() {
    return R(this, b);
  }
  set Visual(i) {
    I(this, b, i);
  }
}
D = new WeakMap(), b = new WeakMap();
class Z extends n.Animatable {
}
class Q extends n.BezierVisualPoint {
  constructor(i) {
    super(i);
  }
}
class dt extends n.StepLineVisualPoint {
  constructor(i) {
    super(i);
  }
}
class ct extends n.Animatable {
  constructor() {
    super(...arguments);
    o(this, "Id", 0);
  }
}
class xt extends ct {
  constructor() {
    super();
    o(this, "_xProperty");
    o(this, "_yProperty");
    this._xProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("X", 0)), this._yProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("Y", 0));
  }
  get X() {
    return this._xProperty.GetMovement(this);
  }
  set X(t) {
    this._xProperty.SetMovement(t, this);
  }
  get Y() {
    return this._yProperty.GetMovement(this);
  }
  set Y(t) {
    this._yProperty.SetMovement(t, this);
  }
  Execute(t, s, r) {
    this.CurrentTime = s, t.lineTo(this.X, this.Y);
  }
}
class Lt extends ct {
  constructor() {
    super();
    o(this, "_xProperty");
    o(this, "_yProperty");
    this._xProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("X", 0)), this._yProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("Y", 0));
  }
  get X() {
    return this._xProperty.GetMovement(this);
  }
  set X(t) {
    this._xProperty.SetMovement(t, this);
  }
  get Y() {
    return this._yProperty.GetMovement(this);
  }
  set Y(t) {
    this._yProperty.SetMovement(t, this);
  }
  Execute(t, s, r) {
    t.moveTo(this.X, this.Y);
  }
}
class E extends Z {
  constructor(t = !1) {
    super();
    o(this, "_hasGeometryTransform", !1);
    o(this, "_opacityProperty");
    o(this, "_xProperty");
    o(this, "_yProperty");
    o(this, "_rotationProperty");
    o(this, "_transformOriginProperty");
    o(this, "_scaleProperty");
    o(this, "_skewProperty");
    o(this, "_translateProperty");
    o(this, "_transformProperty");
    o(this, "_hasTransform", !1);
    o(this, "_hasRotation", !1);
    o(this, "_hasScale", !1);
    o(this, "_hasSkew", !1);
    o(this, "_hasTranslate", !1);
    o(this, "Stroke");
    o(this, "Fill");
    this._hasGeometryTransform = t, this._xProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("X", 0)), this._yProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("Y", 0)), this._opacityProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("Opacity", 1)), this._transformOriginProperty = this.RegisterMotionProperty(
      new n.PointMotionProperty("TransformOrigin", new n.LvcPoint(0.5, 0.5))
    ), this._translateProperty = this.RegisterMotionProperty(
      new n.PointMotionProperty("TranslateTransform", new n.LvcPoint(0, 0))
    ), this._rotationProperty = this.RegisterMotionProperty(
      new n.FloatMotionProperty("RotateTransform", 0)
    ), this._scaleProperty = this.RegisterMotionProperty(
      new n.PointMotionProperty("ScaleTransform", new n.LvcPoint(1, 1))
    ), this._skewProperty = this.RegisterMotionProperty(
      new n.PointMotionProperty("SkewTransform", new n.LvcPoint(1, 1))
    ), this._transformProperty = this.RegisterMotionProperty(
      new It("Transform", d.Matrix4.CreateIdentity())
    );
  }
  get HasTransform() {
    return this._hasGeometryTransform || this._hasTranslate || this._hasRotation || this._hasScale || this._hasSkew || this._hasTransform;
  }
  get X() {
    return this._xProperty.GetMovement(this);
  }
  set X(t) {
    this._xProperty.SetMovement(t, this);
  }
  get Y() {
    return this._yProperty.GetMovement(this);
  }
  set Y(t) {
    this._yProperty.SetMovement(t, this);
  }
  get TransformOrigin() {
    return this._transformOriginProperty.GetMovement(this);
  }
  set TransformOrigin(t) {
    this._transformOriginProperty.SetMovement(t.Clone(), this);
  }
  get TranslateTransform() {
    return this._translateProperty.GetMovement(this);
  }
  set TranslateTransform(t) {
    this._translateProperty.SetMovement(t.Clone(), this), this._hasTranslate = t.X != 0 || t.Y != 0;
  }
  get RotateTransform() {
    return this._rotationProperty.GetMovement(this);
  }
  set RotateTransform(t) {
    this._rotationProperty.SetMovement(t, this), this._hasRotation = t != 0;
  }
  get ScaleTransform() {
    return this._scaleProperty.GetMovement(this);
  }
  set ScaleTransform(t) {
    this._scaleProperty.SetMovement(t.Clone(), this), this._hasScale = t.X != 1 || t.Y != 1;
  }
  get SkewTransform() {
    return this._skewProperty.GetMovement(this);
  }
  set SkewTransform(t) {
    this._skewProperty.SetMovement(t.Clone(), this), this._hasSkew = t.X != 0 || t.Y != 0;
  }
  get Transform() {
    return this._transformProperty.GetMovement(this);
  }
  set Transform(t) {
    this._transformProperty.SetMovement(t.Clone(), this), this._hasTransform = !t.IsIdentity;
  }
  get Opacity() {
    return this._opacityProperty.GetMovement(this);
  }
  set Opacity(t) {
    this._opacityProperty.SetMovement(t, this);
  }
  get MainGeometry() {
    return this.GetHighlitableGeometry();
  }
  Draw(t) {
    if (this.HasTransform) {
      t.Canvas.save();
      let e = this.OnMeasure(t.PaintTask), a = this.TransformOrigin.Clone(), h = new d.Point(this.X, this.Y), g = e.Width * a.X, C = e.Height * a.Y;
      if (this._hasGeometryTransform && this.ApplyCustomGeometryTransform(t), this._hasRotation && (t.Canvas.translate(h.X + g, h.Y + C), t.Canvas.rotate(this.RotateTransform, 0, 0), t.Canvas.translate(-h.X - g, -h.Y - C)), this._hasTranslate) {
        let m = this.TranslateTransform.Clone();
        t.Canvas.translate(m.X, m.Y);
      }
      if (this._hasScale) {
        let m = this.ScaleTransform.Clone();
        t.Canvas.translate(h.X + g, h.Y + C), t.Canvas.scale(m.X, m.Y), t.Canvas.translate(-h.X - g, -h.Y - C);
      }
      if (this._hasSkew) {
        let m = this.SkewTransform.Clone();
        t.Canvas.translate(h.X + g, h.Y + C), t.Canvas.skew(m.X, m.Y), t.Canvas.translate(-h.X - g, -h.Y - C);
      }
      if (this._hasTransform) {
        let m = this.Transform.Clone();
        t.Canvas.concat(m.TransponseTo());
      }
    }
    let s = null;
    t.PaintTask.IsStroke && this.Stroke != null && (this.Stroke.IsStroke = !0, s = t.Paint, this.Stroke.InitializeTask(t));
    let r = null;
    !t.PaintTask.IsStroke && this.Fill != null && (this.Fill.IsStroke = !1, r = t.Paint, this.Fill.InitializeTask(t)), this.Opacity != 1 && t.PaintTask.ApplyOpacityMask(t, this), this.OnDraw(t, t.Paint), this.Opacity != 1 && t.PaintTask.RestoreOpacityMask(t, this), t.PaintTask.IsStroke && this.Stroke != null && (this.Stroke.Dispose(), s != null && (t.Paint = s)), !t.PaintTask.IsStroke && this.Fill != null && (this.Fill.Dispose(), r != null && (t.Paint = r)), this.HasTransform && t.Canvas.restore();
  }
  Measure(t) {
    let s = this.OnMeasure(t), r = this.RotateTransform;
    if (Math.abs(r) > 0) {
      let e = Math.PI / 180;
      r %= 360, r < 0 && (r += 360), r > 180 && (r = 360 - r), r > 90 && r <= 180 && (r = 180 - r);
      let a = r * e, h = Math.cos(a) * s.Width + Math.sin(a) * s.Height, g = Math.sin(a) * s.Width + Math.cos(a) * s.Height;
      s = new n.LvcSize(h, g);
    }
    return s;
  }
  GetHighlitableGeometry() {
    return this;
  }
  ApplyCustomGeometryTransform(t) {
  }
}
var H;
class Ct extends Z {
  constructor() {
    super();
    o(this, "_pivotProperty");
    A(this, H, new l.LinkedList());
    o(this, "ClosingMethod", 0);
    this._pivotProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("Pivot", 0));
  }
  get Commands() {
    return R(this, H);
  }
  set Commands(t) {
    I(this, H, t);
  }
  get FirstCommand() {
    return this.Commands.First;
  }
  get LastCommand() {
    return this.Commands.Last;
  }
  get CountCommands() {
    return this.Commands.length;
  }
  get Pivot() {
    return this._pivotProperty.GetMovement(this);
  }
  set Pivot(t) {
    this._pivotProperty.SetMovement(t, this);
  }
  AddLast(t) {
    return this.IsValid = !1, this.Commands.AddLast(t);
  }
  AddFirst(t) {
    return this.IsValid = !1, this.Commands.AddFirst(t);
  }
  AddAfter(t, s) {
    return this.IsValid = !1, this.Commands.AddAfter(t, s);
  }
  AddBefore(t, s) {
    return this.IsValid = !1, this.Commands.AddBefore(t, s);
  }
  ContainsCommand(t) {
    return this.Commands.Contains(t);
  }
  RemoveCommand(t) {
    this.IsValid = !1, this.Commands.Remove(t);
  }
  ClearCommands() {
    this.IsValid = !1, this.Commands.Clear();
  }
  CompleteTransition(...t) {
    for (const s of this.Commands)
      s.CompleteTransition(...t);
    super.CompleteTransition(...t);
  }
  Draw(t) {
    if (this.Commands.length == 0)
      return;
    let s = new l.List(), r = new CanvasKit.Path(), e = !0, a = this.CurrentTime, h = !0, g = null;
    for (const C of this.Commands)
      C.IsValid = !0, C.CurrentTime = a, h && (h = !1, this.OnOpen(t, r, C)), this.OnDrawSegment(t, r, C), e = e && C.IsValid, C.IsValid && C.RemoveOnCompleted && s.Add(C), g = C;
    for (const C of s)
      this.Commands.Remove(C), e = !1;
    g != null && this.OnClose(t, r, g), t.Canvas.drawPath(r, t.Paint), e || (this.IsValid = !1), r.delete();
  }
  OnOpen(t, s, r) {
  }
  OnClose(t, s, r) {
  }
  OnDrawSegment(t, s, r) {
  }
}
H = new WeakMap();
class F extends E {
  constructor() {
    super();
    o(this, "widthProperty");
    o(this, "heightProperty");
    o(this, "matchDimensions", !1);
    this.widthProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("Width", 0)), this.heightProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("Height", 0));
  }
  get Width() {
    return this.widthProperty.GetMovement(this);
  }
  set Width(t) {
    this.widthProperty.SetMovement(t, this);
  }
  get Height() {
    return this.matchDimensions ? this.widthProperty.GetMovement(this) : this.heightProperty.GetMovement(this);
  }
  set Height(t) {
    if (this.matchDimensions) {
      this.widthProperty.SetMovement(t, this);
      return;
    }
    this.heightProperty.SetMovement(t, this);
  }
  OnMeasure(t) {
    return new n.LvcSize(this.Width, this.Height);
  }
}
class tt extends Ct {
  OnDrawSegment(i, t, s) {
    t.cubicTo(s.Xi, s.Yi, s.Xm, s.Ym, s.Xj, s.Yj);
  }
  OnOpen(i, t, s) {
    if (this.ClosingMethod == n.VectorClosingMethod.NotClosed) {
      t.moveTo(s.Xi, s.Yi);
      return;
    }
    if (this.ClosingMethod == n.VectorClosingMethod.CloseToPivot) {
      t.moveTo(s.Xi, this.Pivot), t.lineTo(s.Xi, s.Yi);
      return;
    }
  }
  OnClose(i, t, s) {
    if (this.ClosingMethod != n.VectorClosingMethod.NotClosed && this.ClosingMethod == n.VectorClosingMethod.CloseToPivot) {
      t.lineTo(s.Xj, this.Pivot), t.close();
      return;
    }
  }
}
class se {
  constructor() {
    o(this, "_value", 0);
    o(this, "PropertyChanged", new l.Event());
    o(this, "Name", "");
  }
  get Value() {
    return this._value;
  }
  set Value(i) {
    this._value = i, this.OnPropertyChanged("Value");
  }
  OnPropertyChanged(i = null) {
    this.PropertyChanged.Invoke(this, new l.PropertyChangedEventArgs(i));
  }
}
class S extends E {
  constructor() {
    super(!0);
    o(this, "_textSizeProperty");
    o(this, "_backgroundProperty");
    o(this, "VerticalAlign", n.Align.Middle);
    o(this, "HorizontalAlign", n.Align.Middle);
    o(this, "Text", "");
    o(this, "Padding", new n.Padding(0, 0, 0, 0));
    o(this, "LineHeight", 1.75);
    this._textSizeProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("TextSize", 11)), this._backgroundProperty = this.RegisterMotionProperty(new n.ColorMotionProperty("Background", n.LvcColor.Empty.Clone())), this.TransformOrigin = new n.LvcPoint(0, 0);
  }
  get TextSize() {
    return this._textSizeProperty.GetMovement(this);
  }
  set TextSize(t) {
    this._textSizeProperty.SetMovement(t, this);
  }
  get Background() {
    return this._backgroundProperty.GetMovement(this);
  }
  set Background(t) {
    this._backgroundProperty.SetMovement(t.Clone(), this);
  }
  OnDraw(t, s) {
    let r = this.OnMeasure(t.PaintTask), e = this.Background.Clone();
    if (l.OpInequality(e, n.LvcColor.Empty)) {
      let m = new CanvasKit.Paint(), P = this.Padding;
      t.Canvas.drawRect(d.Rect.FromLTWH(this.X - P.Left, this.Y - r.Height + P.Bottom, r.Width, r.Height), m), m.delete();
    }
    let a = this.GetLines(this.Text), h = a.length, g = 0, C = (this.GetActualLineHeight(s) - this.GetRawLineHeight(s)) * 0.5;
    for (const m of a) {
      let y = ++g / h * r.Height - r.Height;
      this.DrawLine(m, y - C, t, s);
    }
  }
  OnMeasure(t) {
    let s = new CanvasKit.Paint(), r = this.MeasureLines(s);
    return s.delete(), new n.LvcSize(r.Width + this.Padding.Left + this.Padding.Right, r.Height + this.Padding.Top + this.Padding.Bottom);
  }
  ApplyCustomGeometryTransform(t) {
    let s = this.MeasureLines(t.Paint), r = Math.PI / 180, e = this.Padding, a = 0.5, h = 0.5;
    switch (this.VerticalAlign) {
      case n.Align.Start:
        h = 1 * s.Height + e.Top;
        break;
      case n.Align.Middle:
        h = 0.5 * (s.Height + e.Top - e.Bottom);
        break;
      case n.Align.End:
        h = 0 * s.Height - e.Bottom;
        break;
    }
    switch (this.HorizontalAlign) {
      case n.Align.Start:
        a = 0 * s.Width - e.Left;
        break;
      case n.Align.Middle:
        a = 0.5 * (s.Width - e.Left + e.Right);
        break;
      case n.Align.End:
        a = 1 * s.Width + e.Right;
        break;
    }
    let g = this.RotateTransform;
    g = g * r;
    let C = -Math.cos(g) * a + -Math.sin(g) * h, m = -Math.sin(g) * a + Math.cos(g) * h;
    t.Canvas.translate(C, m);
  }
  DrawLine(t, s, r, e) {
    let a = d.TextPainter.BuildParagraph(t, Number.POSITIVE_INFINITY, this.TextSize, e.getColor());
    r.Canvas.drawParagraph(a, this.X, this.Y + s - this.TextSize), a.delete();
  }
  MeasureLines(t) {
    let s = 0, r = 0;
    for (const e of this.GetLines(this.Text)) {
      let a = d.TextPainter.BuildParagraph(e, Number.POSITIVE_INFINITY, this.TextSize, t.getColor(), null, 1, !0);
      r += a.getHeight() * this.LineHeight, a.getLongestLine() > s && (s = a.getLongestLine()), a.delete();
    }
    return new n.LvcSize(s, r);
  }
  GetActualLineHeight(t) {
    return this.TextSize * this.LineHeight;
  }
  GetRawLineHeight(t) {
    return this.TextSize;
  }
  GetLines(t) {
    return l.IsNullOrEmpty(t) ? [] : t.split(String.fromCharCode(10));
  }
}
o(S, "$meta_LiveChartsCore_ILabelGeometry", !0);
class gt extends Ct {
  constructor() {
    super(...arguments);
    o(this, "_isFirst", !0);
  }
  OnDrawSegment(t, s, r) {
    if (this._isFirst) {
      this._isFirst = !1;
      return;
    }
    s.lineTo(r.Xj, r.Yi), s.lineTo(r.Xj, r.Yj);
  }
  OnOpen(t, s, r) {
    if (this.ClosingMethod == n.VectorClosingMethod.NotClosed) {
      s.moveTo(r.Xj, r.Yj);
      return;
    }
    if (this.ClosingMethod == n.VectorClosingMethod.CloseToPivot) {
      s.moveTo(r.Xj, this.Pivot), s.lineTo(r.Xj, r.Yj);
      return;
    }
  }
  OnClose(t, s, r) {
    if (this._isFirst = !0, this.ClosingMethod != n.VectorClosingMethod.NotClosed && this.ClosingMethod == n.VectorClosingMethod.CloseToPivot) {
      s.lineTo(r.Xj, this.Pivot), s.close();
      return;
    }
  }
}
class ne extends F {
  constructor(t) {
    super();
    o(this, "_svg", "");
    o(this, "_svgPath");
    o(this, "FitToSize", !1);
    this._svgPath = t;
  }
  get SVG() {
    return this._svg;
  }
  set SVG(t) {
    this._svg = t, this.OnSVGPropertyChanged();
  }
  OnDraw(t, s) {
    if (this._svgPath == null)
      throw new l.Exception("SVG property is null and there is not a defined path to draw.");
    t.Canvas.save();
    let r = t.Canvas, e = d.Rect.FromFloat32Array(this._svgPath.getBounds());
    if (this.FitToSize)
      r.translate(this.X + this.Width / 2, this.Y + this.Height / 2), r.scale(
        this.Width / (e.Width + s.getStrokeWidth()),
        this.Height / (e.Height + s.getStrokeWidth())
      ), r.translate(-e.MidX, -e.MidY);
    else {
      let a = e.Width < e.Height ? e.Height : e.Width;
      r.translate(this.X + this.Width / 2, this.Y + this.Height / 2), r.scale(
        this.Width / (a + s.getStrokeWidth()),
        this.Height / (a + s.getStrokeWidth())
      ), r.translate(-e.MidX, -e.MidY);
    }
    r.drawPath(this._svgPath, s), t.Canvas.restore();
  }
  OnSVGPropertyChanged() {
    throw new l.NotImplementedException();
  }
}
class T extends F {
  constructor() {
    super();
    o(this, "_rx");
    o(this, "_ry");
    this._rx = this.RegisterMotionProperty(new n.FloatMotionProperty("Rx", 8)), this._ry = this.RegisterMotionProperty(new n.FloatMotionProperty("Ry", 8));
  }
  get Rx() {
    return this._rx.GetMovement(this);
  }
  set Rx(t) {
    this._rx.SetMovement(t, this);
  }
  get Ry() {
    return this._ry.GetMovement(this);
  }
  set Ry(t) {
    this._ry.SetMovement(t, this);
  }
  OnDraw(t, s) {
    let r = d.RRect.FromRectAndRadius(d.Rect.FromLTWH(this.X, this.Y, this.Width, this.Height), this.Rx, this.Ry);
    t.Canvas.drawRRect(r, s);
  }
}
o(T, "$meta_LiveChartsCore_IRoundedRectangleChartPoint", !0);
class mt extends E {
  constructor() {
    super();
    o(this, "_x1");
    o(this, "_y1");
    this._x1 = this.RegisterMotionProperty(new n.FloatMotionProperty("X1", 0)), this._y1 = this.RegisterMotionProperty(new n.FloatMotionProperty("Y1", 0));
  }
  get X1() {
    return this._x1.GetMovement(this);
  }
  set X1(t) {
    this._x1.SetMovement(t, this);
  }
  get Y1() {
    return this._y1.GetMovement(this);
  }
  set Y1(t) {
    this._y1.SetMovement(t, this);
  }
  OnDraw(t, s) {
    t.Canvas.drawLine(this.X, this.Y, this.X1, this.Y1, s);
  }
  OnMeasure(t) {
    return new n.LvcSize(Math.abs(this.X1 - this.X), Math.abs(this.Y1 - this.Y));
  }
}
class Ot extends E {
  constructor() {
    super();
    o(this, "_wProperty");
    o(this, "_oProperty");
    o(this, "_cProperty");
    o(this, "_lProperty");
    this._wProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("Width", 0)), this._oProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("Open", 0)), this._cProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("Close", 0)), this._lProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("Low", 0));
  }
  get Width() {
    return this._wProperty.GetMovement(this);
  }
  set Width(t) {
    this._wProperty.SetMovement(t, this);
  }
  get Open() {
    return this._oProperty.GetMovement(this);
  }
  set Open(t) {
    this._oProperty.SetMovement(t, this);
  }
  get Close() {
    return this._cProperty.GetMovement(this);
  }
  set Close(t) {
    this._cProperty.SetMovement(t, this);
  }
  get Low() {
    return this._lProperty.GetMovement(this);
  }
  set Low(t) {
    this._lProperty.SetMovement(t, this);
  }
  OnDraw(t, s) {
    let r = this.Width, e = this.X + r * 0.5, a = this.Y, h = this.Open, g = this.Close, C = this.Low, m = 0, P = 0;
    h > g ? (m = g, P = h) : (m = h, P = g), t.Canvas.drawLine(e, a, e, m, s), t.Canvas.drawRect(d.Rect.FromLTWH(this.X, m, r, Math.abs(h - g)), s), t.Canvas.drawLine(e, P, e, C, s);
  }
  OnMeasure(t) {
    return new n.LvcSize(this.Width, Math.abs(this.Low - this.Y));
  }
}
class Gt extends Z {
  constructor() {
    super(...arguments);
    o(this, "_commands", new l.LinkedList());
    o(this, "IsClosed", !1);
  }
  get FirstCommand() {
    return this._commands.First;
  }
  get LastCommand() {
    return this._commands.Last;
  }
  get CountCommands() {
    return this._commands.length;
  }
  Draw(t) {
    if (this._commands.length == 0)
      return;
    let s = new l.List(), r = new CanvasKit.Path(), e = !0;
    for (const a of this._commands)
      a.IsValid = !0, a.Execute(r, this.CurrentTime, this), e = e && a.IsValid, a.IsValid && a.RemoveOnCompleted && s.Add(a);
    for (const a of s)
      this._commands.Remove(a), e = !1;
    this.IsClosed && r.close(), t.Canvas.drawPath(r, t.Paint), e || (this.IsValid = !1), r.delete();
  }
  AddLast(t) {
    return this.IsValid = !1, this._commands.AddLast(t);
  }
  AddFirst(t) {
    return this.IsValid = !1, this._commands.AddFirst(t);
  }
  AddAfter(t, s) {
    return this.IsValid = !1, this._commands.AddAfter(t, s);
  }
  AddBefore(t, s) {
    return this.IsValid = !1, this._commands.AddBefore(t, s);
  }
  ContainsCommand(t) {
    return this._commands.Contains(t);
  }
  RemoveCommand(t) {
    return this.IsValid = !1, this._commands.Remove(t);
  }
  ClearCommands() {
    this._commands.Clear();
  }
  CompleteTransition(...t) {
    for (const s of this._commands)
      s.CompleteTransition(...t);
    super.CompleteTransition(...t);
  }
}
class Vt extends Gt {
  constructor() {
    super();
    o(this, "_fillProperty");
    this._fillProperty = this.RegisterMotionProperty(new n.ColorMotionProperty("FillColor", n.LvcColor.Empty.Clone()));
  }
  get FillColor() {
    return this._fillProperty.GetMovement(this);
  }
  set FillColor(t) {
    this._fillProperty.SetMovement(t.Clone(), this);
  }
  Draw(t) {
    if (this._commands.length == 0)
      return;
    let s = new l.List(), r = new CanvasKit.Path(), e = !0;
    for (const g of this._commands)
      g.IsValid = !0, g.Execute(r, this.CurrentTime, this), e = e && g.IsValid, g.IsValid && g.RemoveOnCompleted && s.Add(g);
    for (const g of s)
      this._commands.Remove(g), e = !1;
    this.IsClosed && r.close();
    let a = t.Paint.getColor(), h = this.FillColor.Clone();
    l.OpInequality(h, n.LvcColor.Empty) && (t.Paint.setColor(M.AsSKColor(h)), t.Paint.setStyle(CanvasKit.PaintStyle.Fill)), t.Canvas.drawPath(r, t.Paint), l.OpInequality(h, n.LvcColor.Empty) && t.Paint.setColor(a), e || (this.IsValid = !1), r.delete();
  }
  CompleteTransition(...t) {
    for (const s of this._commands)
      s.CompleteTransition(...t);
    super.CompleteTransition(...t);
  }
}
const U = class extends E {
  constructor() {
    super();
    o(this, "_cxProperty");
    o(this, "_cyProperty");
    o(this, "_wProperty");
    o(this, "_hProperty");
    o(this, "_startProperty");
    o(this, "_sweepProperty");
    o(this, "_pushoutProperty");
    o(this, "_innerRadiusProperty");
    o(this, "_cornerRadiusProperty");
    o(this, "InvertedCornerRadius", !1);
    this._cxProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("CenterX")), this._cyProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("CenterY")), this._wProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("Width")), this._hProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("Height")), this._startProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("StartAngle")), this._sweepProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("SweepAngle")), this._pushoutProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("PushOut")), this._innerRadiusProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("InnerRadius")), this._cornerRadiusProperty = this.RegisterMotionProperty(new n.FloatMotionProperty("CornerRadius"));
  }
  get CenterX() {
    return this._cxProperty.GetMovement(this);
  }
  set CenterX(t) {
    this._cxProperty.SetMovement(t, this);
  }
  get CenterY() {
    return this._cyProperty.GetMovement(this);
  }
  set CenterY(t) {
    this._cyProperty.SetMovement(t, this);
  }
  get Width() {
    return this._wProperty.GetMovement(this);
  }
  set Width(t) {
    this._wProperty.SetMovement(t, this);
  }
  get Height() {
    return this._hProperty.GetMovement(this);
  }
  set Height(t) {
    this._hProperty.SetMovement(t, this);
  }
  get StartAngle() {
    return this._startProperty.GetMovement(this);
  }
  set StartAngle(t) {
    this._startProperty.SetMovement(t, this);
  }
  get SweepAngle() {
    return this._sweepProperty.GetMovement(this);
  }
  set SweepAngle(t) {
    this._sweepProperty.SetMovement(t, this);
  }
  get PushOut() {
    return this._pushoutProperty.GetMovement(this);
  }
  set PushOut(t) {
    this._pushoutProperty.SetMovement(t, this);
  }
  get InnerRadius() {
    return this._innerRadiusProperty.GetMovement(this);
  }
  set InnerRadius(t) {
    this._innerRadiusProperty.SetMovement(t, this);
  }
  get CornerRadius() {
    return this._cornerRadiusProperty.GetMovement(this);
  }
  set CornerRadius(t) {
    this._cornerRadiusProperty.SetMovement(t, this);
  }
  OnMeasure(t) {
    return new n.LvcSize(this.Width, this.Height);
  }
  OnDraw(t, s) {
    if (U.AlternativeDraw != null) {
      U.AlternativeDraw(this, t, s);
      return;
    }
    if (this.CornerRadius > 0)
      throw new l.NotImplementedException("CornerRadius is not implemented.");
    let r = new CanvasKit.Path(), e = this.CenterX, a = this.CenterY, h = this.InnerRadius, g = this.Width * 0.5, C = this.StartAngle, m = this.SweepAngle, P = Math.PI / 180, y = this.PushOut;
    if (r.moveTo(
      e + Math.cos(C * P) * h,
      a + Math.sin(C * P) * h
    ), r.lineTo(
      e + Math.cos(C * P) * g,
      a + Math.sin(C * P) * g
    ), r.arcToOval(
      d.Rect.FromLTWH(this.X, this.Y, this.Width, this.Height),
      C,
      m,
      !1
    ), r.lineTo(
      e + Math.cos((m + C) * P) * h,
      a + Math.sin((m + C) * P) * h
    ), r.arcToRotated(
      h,
      h,
      0,
      !(m > 180),
      !0,
      e + Math.cos(C * P) * h,
      a + Math.sin(C * P) * h
    ), r.close(), y > 0) {
      let f = C + 0.5 * m, _ = y * Math.cos(f * P), v = y * Math.sin(f * P);
      t.Canvas.save(), t.Canvas.translate(_, v);
    }
    t.Canvas.drawPath(r, t.Paint), y > 0 && t.Canvas.restore(), r.delete();
  }
};
let X = U;
o(X, "AlternativeDraw");
class et extends F {
  constructor() {
    super();
  }
  OnDraw(i, t) {
    i.Canvas.drawRect(d.Rect.FromLTWH(this.X, this.Y, this.Width, this.Height), t);
  }
}
class re extends F {
  constructor() {
    super();
  }
  OnDraw(i, t) {
    let s = this.Width / 2, r = this.Height / 2;
    i.Canvas.drawOval(new d.Rect(this.X + s, this.Y + r, s, r), t);
  }
}
class zt extends F {
  constructor() {
    super();
    o(this, "_colorProperty");
    this._colorProperty = this.RegisterMotionProperty(new n.ColorMotionProperty("Color"));
  }
  get Color() {
    return this._colorProperty.GetMovement(this);
  }
  set Color(t) {
    this._colorProperty.SetMovement(t.Clone(), this);
  }
  OnDraw(t, s) {
    let r = this.Color.Clone();
    s.setColor(new d.Color(r.R, r.G, r.B, r.A)), t.Canvas.drawRect(d.Rect.FromLTWH(this.X, this.Y, this.Width, this.Height), s);
  }
}
class w extends F {
  constructor() {
    super(), this.matchDimensions = !0;
  }
  OnDraw(i, t) {
    let s = this.Width / 2;
    i.Canvas.drawCircle(this.X + s, this.Y + s, s, t);
  }
}
class oe extends F {
  constructor() {
    super(), this.matchDimensions = !0;
  }
  OnDraw(i, t) {
    i.Canvas.drawRect(d.Rect.FromLTWH(this.X, this.Y, this.Width, this.Height), t);
  }
}
class j {
  constructor() {
    o(this, "SKImageFilter");
  }
  Dispose() {
    this.SKImageFilter != null && (this.SKImageFilter.delete(), this.SKImageFilter = null);
  }
}
o(j, "$meta_System_IDisposable", !0);
class Pt extends j {
  constructor(t) {
    super();
    o(this, "_filters");
    this._filters = t;
  }
  Clone() {
    return new Pt(this._filters);
  }
  CreateFilter(t) {
    throw new l.NotImplementedException();
  }
  Dispose() {
    for (const t of this._filters)
      t.Dispose();
  }
}
class it extends j {
  constructor(t, s, r, e, a, h = null) {
    super();
    o(this, "_dx");
    o(this, "_dy");
    o(this, "_sigmaX");
    o(this, "_sigmaY");
    o(this, "_color");
    o(this, "_filter", null);
    this._dx = t, this._dy = s, this._sigmaX = r, this._sigmaY = e, this._color = a, this._filter = h;
  }
  Clone() {
    return new it(this._dx, this._dy, this._sigmaX, this._sigmaY, this._color, this._filter);
  }
  CreateFilter(t) {
    this.SKImageFilter = CanvasKit.ImageFilter.MakeDropShadow(this._dx, this._dy, this._sigmaX, this._sigmaY, this._color, this._filter);
  }
}
class yt extends j {
  constructor(t, s, r = null) {
    super();
    o(this, "_sigmaX");
    o(this, "_sigmaY");
    o(this, "_filter", null);
    this._sigmaX = t, this._sigmaY = s, this._filter = r;
  }
  Clone() {
    return new yt(this._sigmaX, this._sigmaY, this._filter);
  }
  CreateFilter(t) {
    this.SKImageFilter = CanvasKit.ImageFilter.MakeBlur(this._sigmaX, this._sigmaY, CanvasKit.TileMode.Decal, this._filter);
  }
}
class pt {
  constructor() {
    o(this, "SKPathEffect");
  }
  Dispose() {
    this.SKPathEffect != null && (this.SKPathEffect.delete(), this.SKPathEffect = null);
  }
}
o(pt, "$meta_System_IDisposable", !0);
class St extends pt {
  constructor(t, s = 0) {
    super();
    o(this, "_dashArray");
    o(this, "_phase", 0);
    this._dashArray = t, this._phase = s;
  }
  Clone() {
    return new St(this._dashArray, this._phase);
  }
  CreateEffect(t) {
    this.SKPathEffect = CanvasKit.PathEffect.MakeDash(Array.from(this._dashArray), this._phase);
  }
}
var B, W;
class st extends d.Widget {
  constructor(t, s) {
    super();
    o(this, "core");
    o(this, "legend", new O());
    o(this, "tooltip", new G());
    o(this, "_legendPosition", n.LiveCharts.DefaultSettings.LegendPosition);
    o(this, "_drawMargin", null);
    o(this, "_tooltipPosition", n.LiveCharts.DefaultSettings.TooltipPosition);
    o(this, "_title");
    o(this, "_visualsObserver");
    o(this, "_visuals", new l.List());
    o(this, "_legendTextPaint", n.LiveCharts.DefaultSettings.LegendTextPaint);
    o(this, "_legendBackgroundPaint", n.LiveCharts.DefaultSettings.LegendBackgroundPaint);
    o(this, "_legendTextSize", n.LiveCharts.DefaultSettings.LegendTextSize);
    o(this, "_tooltipTextPaint", n.LiveCharts.DefaultSettings.TooltipTextPaint);
    o(this, "_tooltipBackgroundPaint", n.LiveCharts.DefaultSettings.TooltipBackgroundPaint);
    o(this, "_tooltipTextSize", n.LiveCharts.DefaultSettings.TooltipTextSize);
    o(this, "BackColor", new n.LvcColor(255, 255, 255));
    o(this, "AnimationsSpeed", n.LiveCharts.DefaultSettings.AnimationsSpeed);
    o(this, "EasingFunction", n.LiveCharts.DefaultSettings.EasingFunction);
    o(this, "UpdaterThrottler", n.LiveCharts.DefaultSettings.UpdateThrottlingTimeout);
    o(this, "DataPointerDown", new l.Event());
    o(this, "ChartPointPointerDown", new l.Event());
    o(this, "Measuring", new l.Event());
    o(this, "UpdateStarted", new l.Event());
    o(this, "UpdateFinished", new l.Event());
    o(this, "VisualElementsPointerDown", new l.Event());
    o(this, "AutoUpdateEnabled", !0);
    o(this, "_isDrawingLoopRunning", !1);
    o(this, "_paintTasksSchedule", new l.List());
    o(this, "MaxFps", 65);
    A(this, B, new n.MotionCanvas());
    A(this, W, void 0);
    if (t != null && (this.tooltip = t), s != null && (this.legend = s), n.LiveCharts.IsConfigured || n.LiveCharts.Configure((r) => M.UseDefaults(r)), this.InitializeCore(), this._visualsObserver = new n.CollectionDeepObserver(
      (r, e) => this.OnPropertyChanged(),
      (r, e) => this.OnPropertyChanged(),
      !0
    ), this.core == null)
      throw new l.Exception("Core not found!");
    this.MouseRegion = new d.MouseRegion(), this.MouseRegion.PointerMove.Add((r) => this.core?.InvokePointerMove(new n.LvcPoint(r.X, r.Y))), this.MouseRegion.HoverChanged.Add((r) => {
      r || this.core?.InvokePointerLeft();
    });
  }
  get CoreChart() {
    return this.core;
  }
  get DesignerMode() {
    return !1;
  }
  get ControlSize() {
    return this.LegendPosition == n.LegendPosition.Hidden ? new n.LvcSize().Init({ Width: this.W, Height: this.H }) : new n.LvcSize().Init({ Width: this.W, Height: this.H });
  }
  get DrawMargin() {
    return this._drawMargin;
  }
  set DrawMargin(t) {
    this._drawMargin = t, this.OnPropertyChanged();
  }
  get LegendPosition() {
    return this._legendPosition;
  }
  set LegendPosition(t) {
    this._legendPosition = t, this.OnPropertyChanged();
  }
  get TooltipPosition() {
    return this._tooltipPosition;
  }
  set TooltipPosition(t) {
    this._tooltipPosition = t, this.OnPropertyChanged();
  }
  OnDataPointerDown(t, s) {
    throw new l.NotImplementedException();
  }
  InvokeOnUIThread(t) {
    !this.IsMounted || d.UIApplication.Current.BeginInvoke(t);
  }
  get LegendTextPaint() {
    return this._legendTextPaint;
  }
  set LegendTextPaint(t) {
    this._legendTextPaint = t, this.OnPropertyChanged();
  }
  get LegendBackgroundPaint() {
    return this._legendBackgroundPaint;
  }
  set LegendBackgroundPaint(t) {
    this._legendBackgroundPaint = t, this.OnPropertyChanged();
  }
  get LegendTextSize() {
    return this._legendTextSize;
  }
  set LegendTextSize(t) {
    this._legendTextSize = t, this.OnPropertyChanged();
  }
  get TooltipTextPaint() {
    return this._tooltipTextPaint;
  }
  set TooltipTextPaint(t) {
    this._tooltipTextPaint = t, this.OnPropertyChanged();
  }
  get TooltipBackgroundPaint() {
    return this._tooltipBackgroundPaint;
  }
  set TooltipBackgroundPaint(t) {
    this._tooltipBackgroundPaint = t, this.OnPropertyChanged();
  }
  get TooltipTextSize() {
    return this._tooltipTextSize;
  }
  set TooltipTextSize(t) {
    this._tooltipTextSize = t, this.OnPropertyChanged();
  }
  get Title() {
    return this._title;
  }
  set Title(t) {
    this._title = t, this.OnPropertyChanged();
  }
  get CoreCanvas() {
    return this.CanvasCore;
  }
  get Legend() {
    return this.legend;
  }
  set Legend(t) {
    this.legend = t;
  }
  get Tooltip() {
    return this.tooltip;
  }
  set Tooltip(t) {
    this.tooltip = t;
  }
  get VisualElements() {
    return this._visuals;
  }
  set VisualElements(t) {
    this._visualsObserver?.Dispose(this._visuals), this._visualsObserver?.Initialize(t), this._visuals = t, this.OnPropertyChanged();
  }
  ShowTooltip(t) {
    this.tooltip == null || this.core == null || this.tooltip.Show(t, this.core);
  }
  HideTooltip() {
    this.tooltip == null || this.core == null || (this.core.ClearTooltipData(), this.tooltip.Hide());
  }
  OnVisualElementPointerDown(t, s) {
    throw new l.NotImplementedException();
  }
  get PaintTasks() {
    return this._paintTasksSchedule;
  }
  set PaintTasks(t) {
    this._paintTasksSchedule = t, this.OnPaintTasksChanged();
  }
  get CanvasCore() {
    return R(this, B);
  }
  set CanvasCore(t) {
    I(this, B, t);
  }
  CanvasCore_Invalidated(t) {
    this.RunDrawingLoop();
  }
  async RunDrawingLoop() {
    if (this._isDrawingLoopRunning)
      return;
    this._isDrawingLoopRunning = !0;
    let t = l.TimeSpan.FromSeconds(1 / this.MaxFps);
    for (; !this.CanvasCore.IsValid; )
      this.Invalidate(d.InvalidAction.Repaint), await new Promise((s) => setTimeout(() => s(), Math.floor(t.TotalMilliseconds) & 4294967295));
    this._isDrawingLoopRunning = !1;
  }
  OnPaintTasksChanged() {
    let t = new l.HashSet();
    for (const s of this._paintTasksSchedule)
      s.PaintTask.SetGeometries(this.CanvasCore, s.Geometries), t.Add(s.PaintTask);
    this.CanvasCore.SetPaintTasks(t);
  }
  get MouseRegion() {
    return R(this, W);
  }
  set MouseRegion(t) {
    I(this, W, t);
  }
  OnMounted() {
    super.OnMounted(), this.core?.Load(), this.CanvasCore.Invalidated.Add(this.CanvasCore_Invalidated, this);
  }
  OnUnmounted() {
    super.OnUnmounted(), this.CanvasCore.Invalidated.Remove(this.CanvasCore_Invalidated, this), this.CanvasCore.Dispose(), l.IsInterfaceOfIDisposable(this.tooltip) && this.tooltip.Dispose(), this.core?.Unload(), this.OnUnloading();
  }
  Layout(t, s) {
    let r = this.CacheAndCheckAssignWidth(t), e = this.CacheAndCheckAssignHeight(s);
    this.SetSize(r, e);
  }
  Paint(t, s = null) {
    t.save(), t.clipRect(d.Rect.FromLTWH(0, 0, this.W, this.H), CanvasKit.ClipOp.Intersect, !1);
    let r = new Mt(this.CanvasCore, Math.floor(this.W) & 4294967295, Math.floor(this.H) & 4294967295, t);
    r.Background = M.AsSKColor(this.BackColor), this.CanvasCore.DrawFrame(r), t.restore();
  }
  OnUnloading() {
  }
  OnPropertyChanged() {
    this.core == null || this.DesignerMode || this.core.Update();
  }
}
B = new WeakMap(), W = new WeakMap(), o(st, "$meta_PixUI_IMouseRegion", !0);
class ae extends st {
  constructor(t = null, s = null) {
    super(t, s);
    o(this, "_seriesObserver");
    o(this, "_series", new l.List());
    o(this, "_isClockwise", !0);
    o(this, "_initialRotation", 0);
    o(this, "_maxAngle", 360);
    o(this, "_total");
    this._seriesObserver = new n.CollectionDeepObserver(
      (r, e) => this.OnPropertyChanged(),
      (r, e) => this.OnPropertyChanged(),
      !0
    ), this.Series = new l.ObservableCollection(), this.VisualElements = new l.ObservableCollection();
  }
  InitializeCore() {
    this.core = new n.PieChart(this, (t) => M.UseDefaults(t), this.CanvasCore, !0), !this.DesignerMode && this.core.Update();
  }
  GetPointsAt(t, s = n.TooltipFindingStrategy.Automatic) {
    let r = this.core;
    return s == n.TooltipFindingStrategy.Automatic && (s = n.Extensions.GetTooltipFindingStrategy(r.Series)), r.Series.SelectMany((e) => e.FindHitPoints(r, t.Clone(), s));
  }
  GetVisualsAt(t) {
    return this.core.VisualElements.SelectMany((r) => r.IsHitBy(this.core, t.Clone()));
  }
  get Core() {
    return this.core;
  }
  get Series() {
    return this._series;
  }
  set Series(t) {
    this._seriesObserver?.Dispose(this._series), this._seriesObserver?.Initialize(t), this._series = t, this.OnPropertyChanged();
  }
  get InitialRotation() {
    return this._initialRotation;
  }
  set InitialRotation(t) {
    this._initialRotation = t, this.OnPropertyChanged();
  }
  get MaxAngle() {
    return this._maxAngle;
  }
  set MaxAngle(t) {
    this._maxAngle = t, this.OnPropertyChanged();
  }
  get Total() {
    return this._total;
  }
  set Total(t) {
    this._total = t, this.OnPropertyChanged();
  }
  get IsClockwise() {
    return this._isClockwise;
  }
  set IsClockwise(t) {
    this._isClockwise = t, this.OnPropertyChanged();
  }
}
class Dt extends st {
  constructor(t = null, s = null) {
    super(t, s);
    o(this, "_seriesObserver");
    o(this, "_xObserver");
    o(this, "_yObserver");
    o(this, "_sectionsObserver");
    o(this, "_series", new l.List());
    o(this, "_xAxes", new l.List().Init([new L()]));
    o(this, "_yAxes", new l.List().Init([new L()]));
    o(this, "_sections", new l.List());
    o(this, "_drawMarginFrame");
    o(this, "_tooltipFindingStrategy", n.LiveCharts.DefaultSettings.TooltipFindingStrategy);
    o(this, "ZoomMode", n.LiveCharts.DefaultSettings.ZoomMode);
    o(this, "ZoomingSpeed", n.LiveCharts.DefaultSettings.ZoomSpeed);
    this._seriesObserver = new n.CollectionDeepObserver(this.OnDeepCollectionChanged.bind(this), this.OnDeepCollectionPropertyChanged.bind(this), !0), this._xObserver = new n.CollectionDeepObserver(
      this.OnDeepCollectionChanged.bind(this),
      this.OnDeepCollectionPropertyChanged.bind(this),
      !0
    ), this._yObserver = new n.CollectionDeepObserver(
      this.OnDeepCollectionChanged.bind(this),
      this.OnDeepCollectionPropertyChanged.bind(this),
      !0
    ), this._sectionsObserver = new n.CollectionDeepObserver(this.OnDeepCollectionChanged.bind(this), this.OnDeepCollectionPropertyChanged.bind(this), !0), this.XAxes = new l.List().Init(
      [
        new L()
      ]
    ), this.YAxes = new l.List().Init(
      [
        new L()
      ]
    ), this.Series = new l.ObservableCollection(), this.VisualElements = new l.ObservableCollection();
  }
  InitializeCore() {
    let t = new et(), s = new c().Init(
      {
        IsFill: !0,
        Color: new d.Color(33, 150, 243, 50),
        ZIndex: 2147483647
      }
    );
    s.AddGeometryToPaintTask(this.CanvasCore, t), this.CanvasCore.AddDrawableTask(s), this.core = new n.CartesianChart(this, (r) => M.UseDefaults(r), this.CanvasCore, t), !this.DesignerMode && this.core.Update();
  }
  GetPointsAt(t, s = n.TooltipFindingStrategy.Automatic) {
    let r = this.core;
    return s == n.TooltipFindingStrategy.Automatic && (s = n.Extensions.GetTooltipFindingStrategy(r.Series)), r.Series.SelectMany((e) => e.FindHitPoints(r, t.Clone(), s));
  }
  GetVisualsAt(t) {
    return this.core.VisualElements.SelectMany((r) => r.IsHitBy(this.core, t.Clone()));
  }
  get Core() {
    return this.core;
  }
  get XAxes() {
    return this._xAxes;
  }
  set XAxes(t) {
    this._xObserver?.Dispose(this._xAxes), this._xObserver?.Initialize(t), this._xAxes = t, this.OnPropertyChanged();
  }
  get YAxes() {
    return this._yAxes;
  }
  set YAxes(t) {
    this._yObserver?.Dispose(this._yAxes), this._yObserver?.Initialize(t), this._yAxes = t, this.OnPropertyChanged();
  }
  get Sections() {
    return this._sections;
  }
  set Sections(t) {
    this._sectionsObserver?.Dispose(this._sections), this._sectionsObserver?.Initialize(t), this._sections = t, this.OnPropertyChanged();
  }
  get Series() {
    return this._series;
  }
  set Series(t) {
    this._seriesObserver?.Dispose(this._series), this._seriesObserver?.Initialize(t), this._series = t, this.OnPropertyChanged();
  }
  get DrawMarginFrame() {
    return this._drawMarginFrame;
  }
  set DrawMarginFrame(t) {
    this._drawMarginFrame = t, this.OnPropertyChanged();
  }
  get TooltipFindingStrategy() {
    return this._tooltipFindingStrategy;
  }
  set TooltipFindingStrategy(t) {
    this._tooltipFindingStrategy = t, this.OnPropertyChanged();
  }
  ScalePixelsToData(t, s = 0, r = 0) {
    let e = this.core, a = n.Scaler.Make(e.DrawMarginLocation.Clone(), e.DrawMarginSize.Clone(), e.XAxes[s]), h = n.Scaler.Make(e.DrawMarginLocation.Clone(), e.DrawMarginSize.Clone(), e.YAxes[r]);
    return new n.LvcPointD(a.ToChartValues(t.X), h.ToChartValues(t.Y));
  }
  ScaleDataToPixels(t, s = 0, r = 0) {
    let e = this.core, a = n.Scaler.Make(e.DrawMarginLocation.Clone(), e.DrawMarginSize.Clone(), e.XAxes[s]), h = n.Scaler.Make(e.DrawMarginLocation.Clone(), e.DrawMarginSize.Clone(), e.YAxes[r]);
    return new n.LvcPointD(a.ToPixels(t.X), h.ToPixels(t.Y));
  }
  OnDeepCollectionChanged(t, s) {
    this.OnPropertyChanged();
  }
  OnDeepCollectionPropertyChanged(t, s) {
    this.OnPropertyChanged();
  }
}
o(Dt, "$meta_LiveChartsCore_ICartesianChartView", !0);
export {
  L as Axis,
  at as BaseGeometryVisual,
  Q as BezierPoint,
  yt as Blur,
  Ot as CandlestickGeometry,
  Yt as CandlesticksSeries,
  Dt as CartesianChart,
  st as ChartView,
  w as CircleGeometry,
  zt as ColoredRectangleGeometry,
  Qt as ColumnSeries,
  tt as CubicBezierAreaGeometry,
  St as DashEffect,
  ft as DoubleDict,
  X as DoughnutGeometry,
  qt as DrawMarginFrame,
  Z as Drawable,
  vt as DrawingCanvas,
  J as DrawingFluentExtensions,
  it as DropShadow,
  ee as GaugeBuilder,
  E as Geometry,
  Jt as GeometryVisual,
  se as HeatLand,
  Et as HeatLandSeries,
  Vt as HeatPathShape,
  Xt as HeatSeries,
  j as ImageFilter,
  Pt as ImageFiltersMergeOperation,
  S as LabelGeometry,
  lt as LabelVisual,
  mt as LineGeometry,
  xt as LineSegment,
  Ht as LineSeries,
  Y as LinearGradientPaint,
  M as LiveChartsSkiaSharp,
  Tt as MapFactory,
  Lt as MoveToPathCommand,
  re as OvalGeometry,
  $ as Paint,
  ie as PaintTask,
  ct as PathCommand,
  pt as PathEffect,
  Gt as PathGeometry,
  ae as PieChart,
  q as PieSeries,
  kt as PolarAxis,
  te as PolarLineSeries,
  ut as RadialGradientPaint,
  et as RectangleGeometry,
  jt as RectangularSection,
  T as RoundedRectangleGeometry,
  Bt as RowSeries,
  O as SKDefaultLegend,
  G as SKDefaultTooltip,
  It as SKMatrixMotionProperty,
  ne as SVGPathGeometry,
  Kt as ScatterSeries,
  Ft as SeriesVisual,
  F as SizedGeometry,
  Mt as SkiaDrawingContext,
  Rt as SkiaSharpProvider,
  c as SolidColorPaint,
  oe as SquareGeometry,
  Nt as StackedAreaSeries,
  $t as StackedColumnSeries,
  Ut as StackedRowSeries,
  Zt as StackedStepAreaSeries,
  gt as StepLineAreaGeometry,
  Wt as StepLineSeries,
  dt as StepPoint,
  p as ThemesExtensions,
  At as VariableGeometryVisual,
  Ct as VectorGeometry,
  ht as VisualElementsExtensions
};
