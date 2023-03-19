var Xt = Object.defineProperty;
var qt = (r, t, e) => t in r ? Xt(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var o = (r, t, e) => (qt(r, typeof t != "symbol" ? t + "" : t, e), e), Dt = (r, t, e) => {
  if (!t.has(r))
    throw TypeError("Cannot " + e);
};
var w = (r, t, e) => (Dt(r, t, "read from private field"), e ? e.call(r) : t.get(r)), x = (r, t, e) => {
  if (t.has(r))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(r) : t.set(r, e);
}, E = (r, t, e, i) => (Dt(r, t, "write to private field"), i ? i.call(r, e) : t.set(r, e), e);
import * as c from "/System.js";
import * as u from "/PixUI.js";
class Yt {
  constructor(t) {
    o(this, "_textBuffer");
    o(this, "_readBuffer");
    this._textBuffer = t, this._readBuffer = new Uint16Array(1024);
  }
  Read(t, e, i) {
    console.log(`ParserInput.Read: ${t} ${e} ${i}`);
    const n = t;
    if (n >= this._textBuffer.Length)
      return null;
    let s = Math.min(this._readBuffer.length, this._textBuffer.Length - n);
    return i && (s = Math.min(s, i - t)), this._textBuffer.CopyTo(this._readBuffer, n, s), String.fromCharCode.apply(null, this._readBuffer.subarray(0, s));
  }
}
const $ = class {
  constructor(t, e) {
    o(this, "row");
    o(this, "column");
    this.row = Math.floor(t) & 4294967295, this.column = Math.floor(e) & 4294967295;
  }
  Clone() {
    return new $(Math.floor(this.row) & 4294967295, Math.floor(this.column) & 4294967295);
  }
  static FromLocation(t) {
    return new $(t.Line, t.Column * B.ParserEncoding);
  }
  toString() {
    return `(${this.row}, ${this.column})`;
  }
};
let p = $;
o(p, "Empty", new $(0, 0));
class xt {
  constructor() {
    o(this, "startIndex", 0);
    o(this, "oldEndIndex", 0);
    o(this, "newEndIndex", 0);
    o(this, "startPosition", p.Empty.Clone());
    o(this, "oldEndPosition", p.Empty.Clone());
    o(this, "newEndPosition", p.Empty.Clone());
  }
  Clone() {
    let t = new xt();
    return t.startIndex = this.startIndex, t.oldEndIndex = this.oldEndIndex, t.newEndIndex = this.newEndIndex, t.startPosition = this.startPosition, t.oldEndPosition = this.oldEndPosition, t.newEndPosition = this.newEndPosition, t;
  }
}
class Vt {
  constructor(t) {
    o(this, "Left");
    o(this, "Right");
    o(this, "Parent");
    o(this, "Value");
    o(this, "Color", !1);
    this.Value = t;
  }
  get LeftMost() {
    let t = this;
    for (; t.Left != null; )
      t = t.Left;
    return t;
  }
  get RightMost() {
    let t = this;
    for (; t.Right != null; )
      t = t.Right;
    return t;
  }
}
var Z, J;
const g = class {
  constructor(t) {
    o(this, "_host");
    x(this, Z, void 0);
    x(this, J, 0);
    if (t == null)
      throw new c.ArgumentNullException("host");
    this._host = t;
  }
  get Root() {
    return w(this, Z);
  }
  set Root(t) {
    E(this, Z, t);
  }
  get Count() {
    return w(this, J);
  }
  set Count(t) {
    E(this, J, t);
  }
  Clear() {
    this.Root = null, this.Count = 0;
  }
  Add(t) {
    this.AddInternal(new Vt(t));
  }
  AddInternal(t) {
    if (console.assert(t.Color == g.BLACK), this.Root == null) {
      this.Count = 1, this.Root = t;
      return;
    }
    let e = this.Root;
    for (; ; )
      if (this._host.Compare(t.Value, e.Value) <= 0) {
        if (e.Left == null) {
          this.InsertAsLeft(e, t);
          return;
        }
        e = e.Left;
      } else {
        if (e.Right == null) {
          this.InsertAsRight(e, t);
          return;
        }
        e = e.Right;
      }
  }
  InsertAsLeft(t, e) {
    console.assert(t.Left == null), t.Left = e, e.Parent = t, e.Color = g.RED, this._host.UpdateAfterChildrenChange(t), this.FixTreeOnInsert(e), this.Count++;
  }
  InsertAsRight(t, e) {
    console.assert(t.Right == null), t.Right = e, e.Parent = t, e.Color = g.RED, this._host.UpdateAfterChildrenChange(t), this.FixTreeOnInsert(e), this.Count++;
  }
  FixTreeOnInsert(t) {
    console.assert(t != null), console.assert(t.Color == g.RED), console.assert(t.Left == null || t.Left.Color == g.BLACK), console.assert(t.Right == null || t.Right.Color == g.BLACK);
    let e = t.Parent;
    if (e == null) {
      t.Color = g.BLACK;
      return;
    }
    if (e.Color == g.BLACK)
      return;
    let i = e.Parent, n = this.Sibling(e);
    if (n != null && n.Color == g.RED) {
      e.Color = g.BLACK, n.Color = g.BLACK, i.Color = g.RED, this.FixTreeOnInsert(i);
      return;
    }
    t == e.Right && e == i.Left ? (this.RotateLeft(e), t = t.Left) : t == e.Left && e == i.Right && (this.RotateRight(e), t = t.Right), e = t.Parent, i = e.Parent, e.Color = g.BLACK, i.Color = g.RED, t == e.Left && e == i.Left ? this.RotateRight(i) : (console.assert(t == e.Right && e == i.Right), this.RotateLeft(i));
  }
  ReplaceNode(t, e) {
    t.Parent == null ? (console.assert(t == this.Root), this.Root = e) : t.Parent.Left == t ? t.Parent.Left = e : t.Parent.Right = e, e != null && (e.Parent = t.Parent), t.Parent = null;
  }
  RotateLeft(t) {
    let e = t.Right;
    console.assert(e != null), console.assert(e.Parent == t), this.ReplaceNode(t, e), t.Right = e.Left, t.Right != null && (t.Right.Parent = t), e.Left = t, t.Parent = e, this._host.UpdateAfterRotateLeft(t);
  }
  RotateRight(t) {
    let e = t.Left;
    console.assert(e != null), console.assert(e.Parent == t), this.ReplaceNode(t, e), t.Left = e.Right, t.Left != null && (t.Left.Parent = t), e.Right = t, t.Parent = e, this._host.UpdateAfterRotateRight(t);
  }
  Sibling(t) {
    return t == t.Parent.Left ? t.Parent.Right : t.Parent.Left;
  }
  RemoveAt(t) {
    let e = t.Node;
    if (e == null)
      throw new c.ArgumentException("Invalid iterator");
    for (; e.Parent != null; )
      e = e.Parent;
    if (e != this.Root)
      throw new c.ArgumentException("Iterator does not belong to this tree");
    this.RemoveNode(t.Node);
  }
  RemoveNode(t) {
    var n;
    if (t.Left != null && t.Right != null) {
      let s = t.Right.LeftMost;
      this.RemoveNode(s), this.ReplaceNode(t, s), s.Left = t.Left, s.Left != null && (s.Left.Parent = s), s.Right = t.Right, s.Right != null && (s.Right.Parent = s), s.Color = t.Color, this._host.UpdateAfterChildrenChange(s), s.Parent != null && this._host.UpdateAfterChildrenChange(s.Parent);
      return;
    }
    this.Count--;
    let e = t.Parent, i = (n = t.Left) != null ? n : t.Right;
    this.ReplaceNode(t, i), e != null && this._host.UpdateAfterChildrenChange(e), t.Color == g.BLACK && (i != null && i.Color == g.RED ? i.Color = g.BLACK : this.FixTreeOnDelete(i, e));
  }
  static Sibling2(t, e) {
    return console.assert(t == null || t.Parent == e), t == e.Left ? e.Right : e.Left;
  }
  static GetColor(t) {
    return t != null ? t.Color : g.BLACK;
  }
  FixTreeOnDelete(t, e) {
    if (console.assert(t == null || t.Parent == e), e == null)
      return;
    let i = g.Sibling2(t, e);
    if (i.Color == g.RED && (e.Color = g.RED, i.Color = g.BLACK, t == e.Left ? this.RotateLeft(e) : this.RotateRight(e), i = g.Sibling2(t, e)), e.Color == g.BLACK && i.Color == g.BLACK && g.GetColor(i.Left) == g.BLACK && g.GetColor(i.Right) == g.BLACK) {
      i.Color = g.RED, this.FixTreeOnDelete(e, e.Parent);
      return;
    }
    if (e.Color == g.RED && i.Color == g.BLACK && g.GetColor(i.Left) == g.BLACK && g.GetColor(i.Right) == g.BLACK) {
      i.Color = g.RED, e.Color = g.BLACK;
      return;
    }
    t == e.Left && i.Color == g.BLACK && g.GetColor(i.Left) == g.RED && g.GetColor(i.Right) == g.BLACK ? (i.Color = g.RED, i.Left.Color = g.BLACK, this.RotateRight(i)) : t == e.Right && i.Color == g.BLACK && g.GetColor(i.Right) == g.RED && g.GetColor(i.Left) == g.BLACK && (i.Color = g.RED, i.Right.Color = g.BLACK, this.RotateLeft(i)), i = g.Sibling2(t, e), i.Color = e.Color, e.Color = g.BLACK, t == e.Left ? (i.Right != null && (console.assert(i.Right.Color == g.RED), i.Right.Color = g.BLACK), this.RotateLeft(e)) : (i.Left != null && (console.assert(i.Left.Color == g.RED), i.Left.Color = g.BLACK), this.RotateRight(e));
  }
  Find(t) {
    let e = this.LowerBound(t);
    for (; e.IsValid && this._host.Compare(e.Current, t) == 0; ) {
      if (this._host.Equals(e.Current, t))
        return e;
      e.MoveNext();
    }
    return new M(null);
  }
  LowerBound(t) {
    let e = this.Root, i = null;
    for (; e != null; )
      this._host.Compare(e.Value, t) < 0 ? e = e.Right : (i = e, e = e.Left);
    return new M(i);
  }
  UpperBound(t) {
    let e = this.LowerBound(t);
    for (; e.IsValid && this._host.Compare(e.Current, t) == 0; )
      e.MoveNext();
    return e;
  }
  Begin() {
    return this.Root == null ? new M(null) : new M(this.Root.LeftMost);
  }
  Contains(t) {
    return this.Find(t).IsValid;
  }
  Remove(t) {
    let e = this.Find(t);
    return e.IsValid ? (this.RemoveAt(e.Clone()), !0) : !1;
  }
};
let q = g;
Z = new WeakMap(), J = new WeakMap(), o(q, "RED", !0), o(q, "BLACK", !1);
var tt;
const Rt = class {
  constructor(t) {
    x(this, tt, void 0);
    this.Node = t;
  }
  get Node() {
    return w(this, tt);
  }
  set Node(t) {
    E(this, tt, t);
  }
  Clone() {
    return new Rt(this.Node);
  }
  get IsValid() {
    return this.Node != null;
  }
  get Current() {
    if (this.Node != null)
      return this.Node.Value;
    throw new c.InvalidOperationException();
  }
  MoveNext() {
    if (this.Node == null)
      return !1;
    if (this.Node.Right != null)
      this.Node = this.Node.Right.LeftMost;
    else {
      let t;
      do
        t = this.Node, this.Node = this.Node.Parent;
      while (this.Node != null && this.Node.Right == t);
    }
    return this.Node != null;
  }
  MoveBack() {
    if (this.Node == null)
      return !1;
    if (this.Node.Left != null)
      this.Node = this.Node.Left.RightMost;
    else {
      let t;
      do
        t = this.Node, this.Node = this.Node.Parent;
      while (this.Node != null && this.Node.Left == t);
    }
    return this.Node != null;
  }
};
let M = Rt;
tt = new WeakMap();
const Q = class {
  static IsUtf16Surrogate(t) {
    return (t & 63488) == 55296;
  }
  static IsUnicodeDirectionality(t) {
    return t == 8207 || t == 8206;
  }
  static IsMultiCodeUnit(t) {
    return Q.IsUtf16Surrogate(t) || t == Q.ZwjUtf16 || Q.IsUnicodeDirectionality(t);
  }
};
let ct = Q;
o(ct, "ZwjUtf16", Math.floor(8205) & 255);
class Nt {
  toString() {
    throw new c.NotImplementedException();
  }
  SubSequence(t, e) {
    return this.SubNode(t, e);
  }
}
class b extends Nt {
  constructor(e) {
    super();
    o(this, "_data");
    this._data = e;
  }
  get Length() {
    return this._data.length;
  }
  GetCharAt(e) {
    return this._data[e];
  }
  CopyTo(e, i, n) {
    let s = this._data.subarray(e, e + n);
    i.set(s);
  }
  SubNode(e, i) {
    if (e == 0 && i == this.Length)
      return this;
    let n = new Uint16Array(i - e);
    return n.set(this._data.subarray(e, i)), new b(n);
  }
  toString() {
    return String.fromCharCode.apply(null, this._data);
  }
}
class F extends Nt {
  constructor(e, i) {
    super();
    o(this, "_count");
    o(this, "head");
    o(this, "tail");
    this._count = e.Length + i.Length, this.head = e, this.tail = i;
  }
  get Length() {
    return this._count;
  }
  GetCharAt(e) {
    let i = this.head.Length;
    return e < i ? this.head.GetCharAt(e) : this.tail.GetCharAt(e - i);
  }
  RotateRight() {
    if (this.head instanceof F) {
      const e = this.head;
      return new F(e.head, new F(e.tail, this.tail));
    }
    return this;
  }
  RotateLeft() {
    if (this.tail instanceof F) {
      const e = this.tail;
      return new F(new F(this.head, e.head), e.tail);
    }
    return this;
  }
  CopyTo(e, i, n) {
    let s = this.head.Length;
    if (e + n <= s)
      this.head.CopyTo(e, i, n);
    else if (e >= s)
      this.tail.CopyTo(e - s, i, n);
    else {
      let l = s - e;
      this.head.CopyTo(e, i, l), this.tail.CopyTo(0, i.subarray(l), n - l);
    }
  }
  SubNode(e, i) {
    let n = this.head.Length;
    return i <= n ? this.head.SubNode(e, i) : e >= n ? this.tail.SubNode(e - n, i - n) : e == 0 && i == this._count ? this : k.ConcatNodes(
      this.head.SubNode(e, n),
      this.tail.SubNode(0, i - n)
    );
  }
}
const m = class {
  constructor(t) {
    o(this, "_root");
    o(this, "_hash", 0);
    o(this, "myLastLeaf");
    this._root = t;
  }
  get Length() {
    return this._root.Length;
  }
  GetCharAt(t) {
    if (this._root instanceof b)
      return this._root.GetCharAt(t);
    let e = this.myLastLeaf;
    return (e == null || t < e.Offset || t >= e.Offset + e.LeafNode.Length) && (this.myLastLeaf = e = this.FindLeaf(t, 0)), e.LeafNode.GetCharAt(t - e.Offset);
  }
  static FromString(t) {
    return new m(new b(c.StringToUint16Array(t)));
  }
  Concat(t) {
    return t.Length == 0 ? this : this.Length == 0 ? t : new m(m.ConcatNodes(this.EnsureChunked()._root, t.EnsureChunked()._root));
  }
  InsertText(t, e) {
    return this.GetText(0, t).Concat(m.FromString(e)).Concat(this.SubText(t));
  }
  RemoveText(t, e) {
    if (e == 0)
      return this;
    let i = t + e;
    if (i > this.Length)
      throw new c.IndexOutOfRangeException();
    return this.EnsureChunked().GetText(0, t).Concat(this.SubText(i));
  }
  GetText(t, e) {
    let i = t + e;
    if (t < 0 || t > i || i > this.Length)
      throw new c.IndexOutOfRangeException(" start :" + t + " end :" + i + " needs to be between 0 <= " + this.Length);
    return t == 0 && i == this.Length ? this : t == i ? m.Empty : new m(this._root.SubNode(t, i));
  }
  CopyTo(t, e, i) {
    this.VerifyRange(t, i), this._root.CopyTo(t, e, i);
  }
  VerifyRange(t, e) {
    if (t < 0 || t > this.Length)
      throw new c.ArgumentOutOfRangeException(
        "startIndex",
        `0 <= startIndex <= ${this.Length}`
      );
    if (e < 0 || t + e > this.Length)
      throw new c.ArgumentOutOfRangeException(
        "length",
        `0 <= length, startIndex(${t})+length(${e}) <= ${e} `
      );
  }
  toString() {
    return this._root.toString();
  }
  GetString(t, e) {
    let i = new Uint16Array(e);
    return this.CopyTo(t, i, e), String.fromCharCode.apply(null, i);
  }
  SubText(t) {
    return this.GetText(t, this.Length - t);
  }
  EnsureChunked() {
    return this.Length > m.BlockSize && this._root instanceof b ? new m(m.NodeOf(this._root, 0, this.Length)) : this;
  }
  static NodeOf(t, e, i) {
    if (i <= m.BlockSize)
      return t.SubNode(e, e + i);
    let n = i + m.BlockSize >> 1 & m.BlockMask;
    return new F(
      m.NodeOf(t, e, n),
      m.NodeOf(t, e + n, i - n)
    );
  }
  static ConcatNodes(t, e) {
    if (t.Length + e.Length <= m.BlockSize) {
      let l = new Uint16Array(t.Length + e.Length);
      return t.CopyTo(0, l, t.Length), e.CopyTo(0, l.subarray(t.Length), e.Length), new b(l);
    }
    let n = t, s = e;
    if (n.Length << 1 < s.Length && s instanceof F) {
      let l = s;
      l.head.Length > l.tail.Length && (s = l.RotateRight()), n = m.ConcatNodes(n, l.head), s = l.tail;
    } else if (s.Length << 1 < n.Length && n instanceof F) {
      let l = n;
      l.tail.Length > l.head.Length && (n = l.RotateLeft()), s = m.ConcatNodes(l.tail, s), n = l.head;
    }
    return new F(n, s);
  }
  FindLeaf(t, e) {
    let i = this._root;
    for (; ; ) {
      if (t >= i.Length)
        throw new c.IndexOutOfRangeException();
      if (i instanceof b) {
        const s = i;
        return new zt(s, e);
      }
      let n = i;
      t < n.head.Length ? i = n.head : (e += n.head.Length, t -= n.head.Length, i = n.tail);
    }
  }
};
let k = m;
o(k, "BlockSize", 1 << 6), o(k, "BlockMask", ~(m.BlockSize - 1)), o(k, "EmptyNode", new b(new Uint16Array(0))), o(k, "Empty", new m(m.EmptyNode));
class zt {
  constructor(t, e) {
    o(this, "LeafNode");
    o(this, "Offset");
    this.LeafNode = t, this.Offset = e;
  }
}
class $t {
  constructor(t = null) {
    o(this, "_buffer");
    this._buffer = t != null ? t : k.Empty;
  }
  get ImmutableText() {
    return this._buffer;
  }
  get Length() {
    return this._buffer.Length;
  }
  GetCharAt(t) {
    return this._buffer.GetText(t, 1).GetCharAt(0);
  }
  GetText(t, e) {
    return this._buffer.GetString(t, e);
  }
  Insert(t, e) {
    this._buffer = this._buffer.InsertText(t, e);
  }
  Remove(t, e) {
    this._buffer = this._buffer.RemoveText(t, e);
  }
  Replace(t, e, i) {
    this._buffer = this._buffer.RemoveText(t, e), c.IsNullOrEmpty(i) || (this._buffer = this._buffer.InsertText(t, i));
  }
  SetContent(t) {
    this._buffer = k.FromString(t);
  }
  CopyTo(t, e, i) {
    this._buffer.CopyTo(e, t, i);
  }
}
const Gt = class {
  constructor(t, e) {
    o(this, "StartColumn");
    o(this, "EndColumn");
    this.StartColumn = t, this.EndColumn = e;
  }
  Equals(t) {
    return this.StartColumn == t.StartColumn && this.EndColumn == t.EndColumn;
  }
  Clone() {
    return new Gt(this.StartColumn, this.EndColumn);
  }
};
let St = Gt;
o(St, "$meta_System_IEquatable", !0);
var et, it;
class Qt {
  constructor(t, e, i) {
    o(this, "Document");
    x(this, et, L.Empty.Clone());
    x(this, it, L.Empty.Clone());
    if (L.op_GreaterThan(e, i))
      throw new c.ArgumentOutOfRangeException();
    this.Document = t, this.StartPosition = e.Clone(), this.EndPosition = i.Clone();
  }
  get StartPosition() {
    return w(this, et);
  }
  set StartPosition(t) {
    E(this, et, t);
  }
  get EndPosition() {
    return w(this, it);
  }
  set EndPosition(t) {
    E(this, it, t);
  }
  get Offset() {
    return this.Document.PositionToOffset(this.StartPosition.Clone());
  }
  get EndOffset() {
    return this.Document.PositionToOffset(this.EndPosition.Clone());
  }
  get Length() {
    return this.EndOffset - this.Offset;
  }
  get IsEmpty() {
    return c.OpEquality(this.StartPosition, this.EndPosition);
  }
  get SelectedText() {
    return this.Length <= 0 ? "" : this.Document.GetText(this.Offset, this.Length);
  }
  ContainsOffset(t) {
    return this.Offset <= t && t <= this.EndOffset;
  }
}
et = new WeakMap(), it = new WeakMap();
class D {
  constructor(t) {
    o(this, "_textEditor");
    o(this, "SelectionCollection");
    o(this, "SelectFrom");
    o(this, "SelectionStart", L.Empty.Clone());
    o(this, "SelectionChanged", new c.Event());
    this._textEditor = t, this.SelectionCollection = new c.List(), this.SelectFrom = new jt(), this.SelectionStart = L.Empty.Clone();
  }
  get HasSomethingSelected() {
    return this.SelectionCollection.length > 0;
  }
  get SelectionIsReadonly() {
    return !1;
  }
  get SelectedText() {
    if (!this.HasSomethingSelected)
      return "";
    if (this.SelectionCollection.length == 1)
      return this.SelectionCollection[0].SelectedText;
    let t = "";
    for (const e of this.SelectionCollection)
      t += e.SelectedText;
    return t;
  }
  SetSelection(t, e) {
    this.SelectionCollection.length == 1 && c.OpEquality(this.SelectionCollection[0].StartPosition, t) && c.OpEquality(this.SelectionCollection[0].EndPosition, e) || (this.SelectionCollection.Clear(), this.SelectionCollection.Add(new Qt(
      this._textEditor.Document,
      t.Clone(),
      e.Clone()
    )), this.SelectionChanged.Invoke());
  }
  ClearSelection() {
    let t = this._textEditor.PointerPos.Clone();
    this.SelectFrom.First = this.SelectFrom.Where;
    let e = this._textEditor.TextView.GetLogicalPosition(
      t.X - this._textEditor.TextView.Bounds.Left,
      t.Y - this._textEditor.TextView.Bounds.Top
    );
    this.SelectFrom.Where == O.Gutter && (e.Column = 0), e.Line >= this._textEditor.Document.TotalNumberOfLines && (e.Line = this._textEditor.Document.TotalNumberOfLines - 1, e.Column = this._textEditor.Document.GetLineSegment(this._textEditor.Document.TotalNumberOfLines - 1).Length), this.SelectionStart = e.Clone(), this.SelectionCollection.Clear(), this.SelectionChanged.Invoke();
  }
  RemoveSelectedText() {
    if (this.SelectionIsReadonly) {
      this.ClearSelection();
      return;
    }
    let t = !0;
    for (const e of this.SelectionCollection) {
      t && e.StartPosition.Line != e.EndPosition.Line && (t = !1);
      let i = e.Offset;
      this._textEditor.Document.Remove(i, e.Length);
    }
    this.ClearSelection();
  }
  ExtendSelection(t, e) {
    if (c.OpEquality(t, e))
      return;
    let i = L.Empty.Clone(), n = L.Empty.Clone(), s = e.Column;
    if (D.GreaterEqPos(t.Clone(), e.Clone()) ? (i = e.Clone(), n = t.Clone()) : (i = t.Clone(), n = e.Clone()), c.OpEquality(i, n))
      return;
    if (!this.HasSomethingSelected) {
      this.SetSelection(i.Clone(), n.Clone()), this.SelectFrom.Where == O.None && (this.SelectionStart = t.Clone());
      return;
    }
    let h = this.SelectionCollection[0];
    this.SelectFrom.Where == O.Gutter && (e.Column = 0), D.GreaterEqPos(e.Clone(), this.SelectionStart.Clone()) ? (h.StartPosition = this.SelectionStart.Clone(), this.SelectFrom.Where == O.Gutter ? h.EndPosition = new L(this._textEditor.Caret.Column, this._textEditor.Caret.Line) : (e.Column = s, h.EndPosition = e.Clone())) : (this.SelectFrom.Where == O.Gutter && this.SelectFrom.First == O.Gutter ? h.EndPosition = this.NextValidPosition(this.SelectionStart.Line) : h.EndPosition = this.SelectionStart.Clone(), h.StartPosition = e.Clone()), this.SelectionChanged.Invoke();
  }
  NextValidPosition(t) {
    return t < this._textEditor.Document.TotalNumberOfLines - 1 ? new L(0, t + 1) : new L(
      this._textEditor.Document.GetLineSegment(this._textEditor.Document.TotalNumberOfLines - 1).Length + 1,
      t
    );
  }
  static GreaterEqPos(t, e) {
    return t.Line > e.Line || t.Line == e.Line && t.Column >= e.Column;
  }
}
var O = /* @__PURE__ */ ((r) => (r[r.None = 0] = "None", r[r.Gutter = 1] = "Gutter", r[r.TextArea = 2] = "TextArea", r))(O || {});
class jt {
  constructor() {
    o(this, "Where", 0);
    o(this, "First", 0);
  }
}
class Zt {
  Execute(t) {
    let e = t.SelectionManager.SelectedText;
    e.length > 0 && (u.Clipboard.WriteText(e), t.Caret.Position = t.SelectionManager.SelectionCollection[0].StartPosition.Clone(), t.SelectionManager.RemoveSelectedText());
  }
}
class Jt {
  Execute(t) {
    let e = t.SelectionManager.SelectedText;
    e.length > 0 && u.Clipboard.WriteText(e);
  }
}
class Et {
  Execute(t) {
    Et.ExecInternal(t);
  }
  static async ExecInternal(t) {
    let e = await u.Clipboard.ReadText();
    c.IsNullOrEmpty(e) || (t.Document.UndoStack.StartUndoGroup(), t.SelectionManager.HasSomethingSelected && (t.Caret.Position = t.SelectionManager.SelectionCollection[0].StartPosition.Clone(), t.SelectionManager.RemoveSelectedText()), t.InsertOrReplaceString(e), t.Document.UndoStack.EndUndoGroup());
  }
}
var gt = /* @__PURE__ */ ((r) => (r[r.Unspecified = 0] = "Unspecified", r[r.MemberBody = 1] = "MemberBody", r[r.Region = 2] = "Region", r[r.TypeBody = 3] = "TypeBody", r))(gt || {}), nt;
class Lt {
  constructor(t, e, i, n, s, l, h = null, d = !1) {
    o(this, "_document");
    o(this, "IsFolded", !1);
    o(this, "_foldType", 0);
    x(this, nt, "");
    o(this, "_startLine", -1);
    o(this, "_startColumn", 0);
    o(this, "_endLine", -1);
    o(this, "_endColumn", 0);
    o(this, "_offset", 0);
    o(this, "_length", 0);
    this._document = t, this.IsFolded = d, this._foldType = l, this.FoldText = c.IsNullOrEmpty(h) ? "..." : h, e = Math.min(this._document.TotalNumberOfLines - 1, Math.max(e, 0));
    let f = this._document.GetLineSegment(e);
    n = Math.min(t.TotalNumberOfLines - 1, Math.max(n, 0));
    let C = this._document.GetLineSegment(n);
    this._offset = f.Offset + Math.min(i, f.Length), this._length = C.Offset + Math.min(s, C.Length) - this._offset;
  }
  get FoldText() {
    return w(this, nt);
  }
  set FoldText(t) {
    E(this, nt, t);
  }
  get Offset() {
    return this._offset;
  }
  set Offset(t) {
    this._offset = t, this._startLine = this._endLine = -1;
  }
  get Length() {
    return this._length;
  }
  set Length(t) {
    this._length = t, this._endLine = -1;
  }
  get StartLine() {
    return this._startLine < 0 && this.GetStartPointForOffset(this.Offset), this._startLine;
  }
  get StartColumn() {
    return this._startLine < 0 && this.GetStartPointForOffset(this.Offset), this._startColumn;
  }
  get EndLine() {
    return this._endLine < 0 && this.GetEndPointForOffset(this.Offset + this.Length), this._endLine;
  }
  get EndColumn() {
    return this._endLine < 0 && this.GetEndPointForOffset(this.Offset + this.Length), this._endColumn;
  }
  GetStartPointForOffset(t) {
    t > this._document.TextLength ? (this._startLine = this._document.TotalNumberOfLines + 1, this._startColumn = 1) : t < 0 ? this._startLine = this._startColumn = -1 : (this._startLine = this._document.GetLineNumberForOffset(t), this._startColumn = t - this._document.GetLineSegment(this._startLine).Offset);
  }
  GetEndPointForOffset(t) {
    t > this._document.TextLength ? (this._endLine = this._document.TotalNumberOfLines + 1, this._endColumn = 1) : t < 0 ? this._endLine = this._endColumn = -1 : (this._endLine = this._document.GetLineNumberForOffset(t), this._endColumn = t - this._document.GetLineSegment(this._endLine).Offset);
  }
  CompareTo(t) {
    return this.Offset != t.Offset ? this.Offset.CompareTo(t.Offset) : this.Length.CompareTo(t.Length);
  }
}
nt = new WeakMap(), o(Lt, "$meta_System_IComparable", !0);
class te {
  constructor(t) {
    o(this, "_document");
    o(this, "_foldMarker", new c.List());
    o(this, "_foldMarkerByEnd", new c.List());
    o(this, "FoldingsChanged", new c.Event());
    this._document = t;
  }
  RaiseFoldingsChanged() {
    this.FoldingsChanged.Invoke();
  }
  IsLineVisible(t) {
    let e = this.GetFoldingsContainsLineNumber(t);
    for (const i of e)
      if (i.IsFolded)
        return !1;
    return !0;
  }
  GetTopLevelFoldedFoldings() {
    let t = new c.List(), e = new L(0, 0);
    for (const i of this._foldMarker)
      i.IsFolded && (i.StartLine > e.Line || i.StartLine == e.Line && i.StartColumn >= e.Column) && (t.Add(i), e = new L(i.EndColumn, i.EndLine));
    return t;
  }
  GetFoldingsWithStart(t) {
    return this.GetFoldingsByStartAfterColumn(t, -1, !1);
  }
  GetFoldingsContainsLineNumber(t) {
    let e = new c.List();
    for (const i of this._foldMarker)
      i.StartLine < t && t < i.EndLine && e.Add(i);
    return e;
  }
  GetFoldingsWithEnd(t) {
    return this.GetFoldingsByEndAfterColumn(t, 0, !1);
  }
  GetFoldedFoldingsWithStartAfterColumn(t, e) {
    return this.GetFoldingsByStartAfterColumn(t, e, !0);
  }
  GetFoldedFoldingsWithStart(t) {
    return this.GetFoldingsByStartAfterColumn(t, -1, !0);
  }
  GetFoldedFoldingsWithEnd(t) {
    return this.GetFoldingsByEndAfterColumn(t, 0, !0);
  }
  GetFoldingsByStartAfterColumn(t, e, i) {
    let n = new c.List(), s = new Lt(
      this._document,
      t,
      e,
      t,
      e,
      gt.Unspecified,
      "",
      !1
    ), l = this._foldMarker.BinarySearch(s, Y.Instance);
    for (l < 0 && (l = ~l); l < this._foldMarker.length; l++) {
      let h = this._foldMarker[l];
      if (h.StartLine < t || h.StartLine > t)
        break;
      h.StartColumn <= e || (!i || h.IsFolded) && n.Add(h);
    }
    return n;
  }
  GetFoldingsByEndAfterColumn(t, e, i) {
    let n = new c.List(), s = new Lt(
      this._document,
      t,
      e,
      t,
      e,
      gt.Unspecified,
      "",
      !1
    ), l = this._foldMarkerByEnd.BinarySearch(s, H.Instance);
    for (l < 0 && (l = ~l); l < this._foldMarkerByEnd.length; l++) {
      let h = this._foldMarkerByEnd[l];
      if (h.EndLine < t || h.EndLine > t)
        break;
      h.EndColumn <= e || (!i || h.IsFolded) && n.Add(h);
    }
    return n;
  }
  UpdateFoldings(t) {
    if (t != null && t.length != 0)
      if (t.Sort((e, i) => e.CompareTo(i)), this._foldMarker.length == t.length) {
        for (let e = 0; e < this._foldMarker.length; ++e)
          t[e].IsFolded = this._foldMarker[e].IsFolded;
        this._foldMarker = t;
      } else
        for (let e = 0, i = 0; e < this._foldMarker.length && i < t.length; ) {
          let n = t[i].CompareTo(this._foldMarker[e]);
          n > 0 ? ++e : (n == 0 && (t[i].IsFolded = this._foldMarker[e].IsFolded), ++i);
        }
    t != null ? (this._foldMarker = t, this._foldMarkerByEnd = new c.List(t), this._foldMarkerByEnd.Sort((e, i) => H.Instance.Compare(e, i))) : (this._foldMarker.Clear(), this._foldMarkerByEnd.Clear()), this.FoldingsChanged.Invoke();
  }
}
const Ft = class {
  Compare(t, e) {
    return t.StartLine < e.StartLine ? -1 : t.StartLine == e.StartLine ? t.StartColumn.CompareTo(e.StartColumn) : 1;
  }
};
let Y = Ft;
o(Y, "$meta_System_IComparer", !0), o(Y, "Instance", new Ft());
const It = class {
  Compare(t, e) {
    return t.EndLine < e.EndLine ? -1 : t.EndLine == e.EndLine ? t.EndColumn.CompareTo(e.EndColumn) : 1;
  }
};
let H = It;
o(H, "$meta_System_IComparer", !0), o(H, "Instance", new It());
var a = /* @__PURE__ */ ((r) => (r[r.Unknown = 0] = "Unknown", r[r.WhiteSpace = 1] = "WhiteSpace", r[r.Error = 2] = "Error", r[r.Module = 3] = "Module", r[r.Type = 4] = "Type", r[r.BuiltinType = 5] = "BuiltinType", r[r.LiteralNumber = 6] = "LiteralNumber", r[r.LiteralString = 7] = "LiteralString", r[r.Constant = 8] = "Constant", r[r.Keyword = 9] = "Keyword", r[r.Comment = 10] = "Comment", r[r.PunctuationDelimiter = 11] = "PunctuationDelimiter", r[r.PunctuationBracket = 12] = "PunctuationBracket", r[r.Operator = 13] = "Operator", r[r.Variable = 14] = "Variable", r[r.Function = 15] = "Function", r))(a || {});
class G {
  static Make(t, e) {
    return (Math.floor(t) & 4294967295) << 24 | e;
  }
  static GetTokenStartColumn(t) {
    return t & 16777215;
  }
  static GetTokenType(t) {
    return t >> 24;
  }
}
const U = class {
  constructor() {
    o(this, "_foldQuery");
  }
  GetAutoColsingPairs(t) {
    switch (t) {
      case 123:
        return 125;
      case 91:
        return 93;
      case 40:
        return 41;
      case 34:
        return 34;
      default:
        return null;
    }
  }
  IsLeafNode(t) {
    let e = t.type;
    return e == "modifier" || e == "string_literal" || e == "character_literal";
  }
  GetTokenType(t) {
    let e = t.type;
    if (e == "Error")
      return a.Unknown;
    if (!t.isNamed()) {
      let i;
      return U.TokenMap.TryGetValue(e, new c.Out(() => i, (n) => i = n)) ? i : a.Unknown;
    }
    switch (e) {
      case "identifier":
        return U.GetIdentifierTokenType(t);
      case "implicit_type":
      case "pointer_type":
      case "function_pointer_type":
      case "predefined_type":
        return a.BuiltinType;
      case "real_literal":
      case "integer_literal":
        return a.LiteralNumber;
      case "string_literal":
      case "character_literal":
        return a.LiteralString;
      case "null_literal":
      case "boolean_literal":
        return a.Constant;
      case "modifier":
      case "void_keyword":
        return a.Keyword;
      case "comment":
        return a.Comment;
      default:
        return a.Unknown;
    }
  }
  static GetIdentifierTokenType(t) {
    let e = t.parent.type;
    if (e == "Error")
      return a.Unknown;
    switch (e) {
      case "namespace_declaration":
      case "using_directive":
        return a.Module;
      case "class_declaration":
      case "interface_declaration":
      case "enum_declaration":
      case "struct_declaration":
      case "record_declaration":
      case "object_creation_expression":
      case "constructor_declaration":
      case "generic_name":
      case "array_type":
      case "base_list":
        return a.Type;
      case "argument":
      case "variable_declarator":
      case "property_declaration":
        return a.Variable;
      case "method_declaration":
        return a.Function;
      case "qualified_name":
        return U.GetIdentifierTypeFromQualifiedName(t);
      case "member_access_expression":
        return U.GetIdentifierTypeFromMemberAccess(t);
      default:
        return a.Unknown;
    }
  }
  static GetIdentifierTypeFromQualifiedName(t) {
    var e, i;
    return ((e = t.parent.parent) == null ? void 0 : e.type) == "qualified_name" ? a.Module : ((i = t.parent.parent) == null ? void 0 : i.type) == "assignment_expression" ? a.Variable : t.nextNamedSibling == null ? a.Type : a.Module;
  }
  static GetIdentifierTypeFromMemberAccess(t) {
    return t.parent.parent.type == "invocation_expression" ? a.Function : t.nextNamedSibling == null ? a.Variable : a.Type;
  }
  GenerateFoldMarkers(t) {
    var l;
    let e = t.SyntaxParser;
    if (e.RootNode == null)
      return null;
    (l = this._foldQuery) != null || (this._foldQuery = e.CreateQuery(U.FoldQuery));
    let i = this._foldQuery.captures(e.RootNode), n = 0, s = new c.List(i.length);
    for (const h of i) {
      if (n == h.node.id)
        continue;
      n = h.node.id;
      let d = h.node;
      if (d.startPosition.row == d.endPosition.row)
        continue;
      let f = d.startIndex / B.ParserEncoding, C = d.endIndex / B.ParserEncoding, S = new Lt(t, 0, 0, 0, 0, gt.TypeBody, "{...}");
      S.Offset = f, S.Length = C - f, s.Add(S);
    }
    return s;
  }
};
let z = U;
o(z, "TokenMap", new c.Dictionary().Init([
  [";", a.PunctuationDelimiter],
  [".", a.PunctuationDelimiter],
  [",", a.PunctuationDelimiter],
  ["--", a.Operator],
  ["-", a.Operator],
  ["-=", a.Operator],
  ["&", a.Operator],
  ["&&", a.Operator],
  ["+", a.Operator],
  ["++", a.Operator],
  ["+=", a.Operator],
  ["<", a.Operator],
  ["<<", a.Operator],
  ["=", a.Operator],
  ["==", a.Operator],
  ["!", a.Operator],
  ["!=", a.Operator],
  ["=>", a.Operator],
  [">", a.Operator],
  [">>", a.Operator],
  ["|", a.Operator],
  ["||", a.Operator],
  ["?", a.Operator],
  ["??", a.Operator],
  ["^", a.Operator],
  ["~", a.Operator],
  ["*", a.Operator],
  ["/", a.Operator],
  ["%", a.Operator],
  [":", a.Operator],
  ["(", a.PunctuationBracket],
  [")", a.PunctuationBracket],
  ["[", a.PunctuationBracket],
  ["]", a.PunctuationBracket],
  ["{", a.PunctuationBracket],
  ["}", a.PunctuationBracket],
  ["as", a.Keyword],
  ["base", a.Keyword],
  ["break", a.Keyword],
  ["case", a.Keyword],
  ["catch", a.Keyword],
  ["checked", a.Keyword],
  ["class", a.Keyword],
  ["continue", a.Keyword],
  ["default", a.Keyword],
  ["delegate", a.Keyword],
  ["do", a.Keyword],
  ["else", a.Keyword],
  ["enum", a.Keyword],
  ["event", a.Keyword],
  ["explicit", a.Keyword],
  ["finally", a.Keyword],
  ["for", a.Keyword],
  ["foreach", a.Keyword],
  ["goto", a.Keyword],
  ["if", a.Keyword],
  ["implicit", a.Keyword],
  ["interface", a.Keyword],
  ["is", a.Keyword],
  ["lock", a.Keyword],
  ["namespace", a.Keyword],
  ["operator", a.Keyword],
  ["params", a.Keyword],
  ["return", a.Keyword],
  ["sizeof", a.Keyword],
  ["stackalloc", a.Keyword],
  ["struct", a.Keyword],
  ["switch", a.Keyword],
  ["throw", a.Keyword],
  ["try", a.Keyword],
  ["typeof", a.Keyword],
  ["unchecked", a.Keyword],
  ["using", a.Keyword],
  ["while", a.Keyword],
  ["new", a.Keyword],
  ["await", a.Keyword],
  ["in", a.Keyword],
  ["yield", a.Keyword],
  ["get", a.Keyword],
  ["set", a.Keyword],
  ["when", a.Keyword],
  ["out", a.Keyword],
  ["ref", a.Keyword],
  ["from", a.Keyword],
  ["where", a.Keyword],
  ["select", a.Keyword],
  ["record", a.Keyword],
  ["init", a.Keyword],
  ["with", a.Keyword],
  ["let", a.Keyword],
  ["var", a.Keyword],
  ["this", a.Keyword]
])), o(z, "FoldQuery", `
body: [
  (declaration_list)
  (switch_body)
  (enum_member_declaration_list)
] @fold

accessors: [
  (accessor_list)
] @fold

initializer: [
  (initializer_expression)
] @fold

(block) @fold
`);
var ot;
const T = class {
  constructor(t) {
    o(this, "_document");
    o(this, "_parser");
    x(this, ot, void 0);
    o(this, "_oldTree");
    o(this, "_edit", new xt());
    o(this, "_startLineOfChanged", 0);
    o(this, "_endLineOfChanged", 0);
    this._document = t;
    let e = Kt.Get();
    this._parser = new window.TreeSitter(), this._parser.setLanguage(e), this.Language = new z();
  }
  get Language() {
    return w(this, ot);
  }
  set Language(t) {
    E(this, ot, t);
  }
  get RootNode() {
    var t;
    return (t = this._oldTree) == null ? void 0 : t.rootNode;
  }
  BeginInsert(t, e) {
    let i = this._document.OffsetToPosition(t);
    this._edit.startIndex = (Math.floor(t) & 4294967295) * T.ParserEncoding, this._edit.oldEndIndex = this._edit.startIndex, this._edit.newEndIndex = this._edit.startIndex + (Math.floor(e) & 4294967295) * T.ParserEncoding, this._edit.startPosition = p.FromLocation(i.Clone()), this._edit.oldEndPosition = this._edit.startPosition;
  }
  EndInsert(t, e) {
    let i = this._document.OffsetToPosition(t + e);
    this._edit.newEndPosition = p.FromLocation(i.Clone()), this._oldTree.edit(this._edit.Clone()), this.Parse(!1), this.Tokenize(this._startLineOfChanged, this._endLineOfChanged);
  }
  BeginRemove(t, e) {
    let i = this._document.OffsetToPosition(t), n = this._document.OffsetToPosition(t + e);
    this._edit.startIndex = (Math.floor(t) & 4294967295) * T.ParserEncoding, this._edit.oldEndIndex = this._edit.startIndex + (Math.floor(e) & 4294967295) * T.ParserEncoding, this._edit.newEndIndex = this._edit.startIndex, this._edit.startPosition = p.FromLocation(i.Clone()), this._edit.oldEndPosition = p.FromLocation(n.Clone()), this._edit.newEndPosition = this._edit.startPosition;
  }
  EndRemove() {
    this._oldTree.edit(this._edit.Clone()), this.Parse(!1), this.Tokenize(this._startLineOfChanged, this._endLineOfChanged);
  }
  BeginReplace(t, e, i) {
    let n = this._document.OffsetToPosition(t), s = this._document.OffsetToPosition(t + e);
    this._edit.startIndex = (Math.floor(t) & 4294967295) * T.ParserEncoding, this._edit.oldEndIndex = this._edit.startIndex + (Math.floor(e) & 4294967295) * T.ParserEncoding, this._edit.newEndIndex = this._edit.startIndex + (Math.floor((i - e) * T.ParserEncoding) & 4294967295), this._edit.startPosition = p.FromLocation(n.Clone()), this._edit.oldEndPosition = p.FromLocation(s.Clone());
  }
  EndReplace(t, e, i) {
    let n = this._document.OffsetToPosition(t + (i - e));
    this._edit.newEndPosition = p.FromLocation(n.Clone()), this._oldTree.edit(this._edit.Clone()), this.Parse(!1), this.Tokenize(this._startLineOfChanged, this._endLineOfChanged);
  }
  Parse(t) {
    let e = new Yt(this._document.TextBuffer), i = this._parser.parse(e.Read.bind(e), t === !0 ? null : this._oldTree);
    if (this._oldTree && !t) {
      let s = i.getChangedRanges(this._oldTree);
      this._oldTree.delete(), this._startLineOfChanged = this._edit.startPosition.row, this._endLineOfChanged = this._startLineOfChanged + 1;
      for (const l of s)
        this._startLineOfChanged = Math.min(this._startLineOfChanged, l.startPosition.row), this._endLineOfChanged = Math.max(this._endLineOfChanged, l.endPosition.row);
    }
    this._oldTree = i;
    let n = this.Language.GenerateFoldMarkers(this._document);
    this._document.FoldingManager.UpdateFoldings(n);
  }
  Tokenize(t, e) {
    for (let i = t; i < e; i++)
      this.TokenizeLine(i);
  }
  TokenizeLine(t) {
    let e = this._document.GetLineSegment(t), i = e.Length;
    if (i == 0)
      return;
    let n = new p(t, 0), s = new p(t, i * T.ParserEncoding), l = this._oldTree.rootNode.namedDescendantForPosition(n, s);
    e.BeginTokenize(), T.ContainsFullLine(l, e) ? this.VisitNode(l, e) : e.AddToken(a.Unknown, e.Offset, e.Length), e.EndTokenize();
  }
  VisitChildren(t, e) {
    for (const i of t.children)
      if (!T.BeforeLine(i, e)) {
        if (T.AfterLine(i, e))
          break;
        this.VisitNode(i, e);
      }
  }
  VisitNode(t, e) {
    let i = t.childCount;
    if (!this.Language.IsLeafNode(t) && i > 0) {
      this.VisitChildren(t, e);
      return;
    }
    if (t.endIndex <= t.startIndex)
      return;
    let n = this.Language.GetTokenType(t), s = Math.max(t.startIndex / T.ParserEncoding, e.Offset), l = Math.min(
      (t.endIndex - t.startIndex) / T.ParserEncoding,
      e.Length
    );
    e.AddToken(n, s, l);
  }
  static ContainsFullLine(t, e) {
    let i = t.startIndex / T.ParserEncoding, n = t.endIndex / T.ParserEncoding;
    return i <= e.Offset && e.Offset + e.Length <= n;
  }
  static BeforeLine(t, e) {
    return t.endIndex / T.ParserEncoding < e.Offset;
  }
  static AfterLine(t, e) {
    return t.startIndex / T.ParserEncoding > e.Offset + e.Length;
  }
  CreateQuery(t) {
    return this._parser.getLanguage().query(t);
  }
  GetDirtyLines(t) {
    return new Fe(t).Init(
      {
        StartLine: this._startLineOfChanged,
        EndLine: this._endLineOfChanged
      }
    );
  }
  DumpTree() {
    this._oldTree == null && console.log("No parsed tree."), console.log(this._oldTree.rootNode);
  }
  Dispose() {
    var t;
    (t = this._oldTree) == null || t.delete(), this._parser.delete();
  }
};
let B = T;
ot = new WeakMap(), o(B, "$meta_System_IDisposable", !0), o(B, "ParserEncoding", 1);
class ee {
  constructor() {
    o(this, "removedLines");
    o(this, "textAnchor");
  }
  AddRemovedLine(t) {
    var e;
    (e = this.removedLines) != null || (this.removedLines = new c.List()), this.removedLines.Add(t);
  }
  AddDeletedAnchor(t) {
    var e;
    (e = this.textAnchor) != null || (this.textAnchor = new c.List()), this.textAnchor.Add(t);
  }
  RaiseEvents() {
    if (this.textAnchor != null)
      for (const t of this.textAnchor)
        t.RaiseDeleted();
  }
}
var rt, st, lt;
class At {
  constructor() {
    o(this, "TreeEntry", V.Invalid.Clone());
    x(this, rt, 0);
    x(this, st, 0);
    o(this, "_lineTokens");
    o(this, "_tokenColumnIndex", 0);
    o(this, "_cachedParagraph");
    x(this, lt, void 0);
  }
  get IsDeleted() {
    return !this.TreeEntry.IsValid;
  }
  get LineNumber() {
    return this.TreeEntry.CurrentIndex;
  }
  get Offset() {
    return this.TreeEntry.CurrentOffset;
  }
  set Offset(t) {
    throw new c.NotSupportedException();
  }
  get Length() {
    return this.TotalLength - this.DelimiterLength;
  }
  set Length(t) {
    throw new c.NotSupportedException();
  }
  get TotalLength() {
    return w(this, rt);
  }
  set TotalLength(t) {
    E(this, rt, t);
  }
  get DelimiterLength() {
    return w(this, st);
  }
  set DelimiterLength(t) {
    E(this, st, t);
  }
  get CachedFolds() {
    return w(this, lt);
  }
  set CachedFolds(t) {
    E(this, lt, t);
  }
  InsertedLinePart(t, e, i) {
    i != 0 && this.ClearFoldedLineCache(t);
  }
  RemovedLinePart(t, e, i, n) {
    n != 0 && this.ClearFoldedLineCache(t);
  }
  Deleted(t) {
    this.TreeEntry = V.Invalid.Clone();
  }
  MergedWith(t, e) {
  }
  SplitTo(t) {
  }
  BeginTokenize() {
    this.ClearCachedParagraph(), this._lineTokens = new c.List(), this._tokenColumnIndex = 0;
  }
  AddToken(t, e, i) {
    let n = e - this.Offset;
    n > this._tokenColumnIndex && (this._lineTokens.Add(G.Make(a.WhiteSpace, this._tokenColumnIndex)), this._tokenColumnIndex = n), this._lineTokens.Add(G.Make(t, n)), this._tokenColumnIndex += i;
  }
  EndTokenize() {
    this._tokenColumnIndex < this.Length && this._lineTokens.Add(G.Make(a.WhiteSpace, this._tokenColumnIndex));
  }
  GetTokenAt(t) {
    if (this._lineTokens == null)
      return null;
    let e = this.Length;
    for (let i = this._lineTokens.length - 1; i >= 0; i--) {
      let n = this._lineTokens[i], s = G.GetTokenStartColumn(n);
      if (s < t && t <= e)
        return n;
      e = s;
    }
    return null;
  }
  GetLeadingWhiteSpaces() {
    return this._lineTokens == null || G.GetTokenType(this._lineTokens[0]) != a.WhiteSpace ? 0 : this._lineTokens.length > 1 ? G.GetTokenStartColumn(this._lineTokens[1]) : this.Length;
  }
  GetLineParagraph(t) {
    if (this._cachedParagraph != null)
      return this._cachedParagraph;
    let e = u.MakeParagraphStyle({ maxLines: 1, heightMultiplier: 1 }), i = u.MakeParagraphBuilder(e);
    if (this._lineTokens == null || this.Length == 0) {
      let n = t.Document.GetText(this.Offset, this.Length);
      i.pushStyle(t.Theme.TextStyle), i.addText(n);
    } else
      t.Document.TextEditorOptions.EnableFolding ? this.BuildParagraphByFoldings(i, t) : this.BuildParagraphByTokens(i, t, 0, this.Length);
    return this._cachedParagraph = i.build(), this._cachedParagraph.layout(Number.POSITIVE_INFINITY), i.delete(), this._cachedParagraph;
  }
  BuildParagraphByTokens(t, e, i, n) {
    let s = 0, l = 0, h = 0, d = 0;
    for (let f = 0; f < this._lineTokens.length; f++) {
      if (s = this._lineTokens[f], l = G.GetTokenStartColumn(s), h = f == this._lineTokens.length - 1 ? this.Length : G.GetTokenStartColumn(this._lineTokens[f + 1]), i >= h)
        continue;
      d = e.Document.PositionToOffset(
        new L(l, this.LineNumber)
      );
      let C = e.Document.GetText(d, h - l);
      if (t.pushStyle(e.Theme.GetTokenStyle(G.GetTokenType(s))), t.addText(C), t.pop(), h >= n)
        break;
    }
  }
  BuildParagraphByFoldings(t, e) {
    var h;
    let i = this.LineNumber, n = -1, s = 0, l = null;
    for (; ; ) {
      let d = e.Document.FoldingManager.GetFoldedFoldingsWithStartAfterColumn(
        i,
        n
      );
      if (d.length <= 0) {
        i == this.LineNumber ? this.BuildParagraphByTokens(t, e, 0, L.MaxColumn) : e.Document.GetLineSegment(l.EndLine).BuildParagraphByTokens(
          t,
          e,
          l.EndColumn,
          L.MaxColumn
        );
        break;
      }
      let f = d[0];
      for (const C of d)
        C.StartColumn < f.StartColumn && (f = C);
      if (d.Clear(), i == this.LineNumber ? f.StartColumn > 0 && (this.BuildParagraphByTokens(t, e, 0, f.StartColumn), s += f.StartColumn) : (e.Document.GetLineSegment(l.EndLine).BuildParagraphByTokens(
        t,
        e,
        l.EndColumn,
        f.StartColumn
      ), s += f.StartColumn - l.EndColumn), t.pushStyle(e.Theme.FoldedTextStyle), t.addText(f.FoldText), t.pop(), (h = this.CachedFolds) != null || (this.CachedFolds = new c.List()), this.CachedFolds.Add(new ie(s, f)), s += f.FoldText.length, n = f.EndColumn, i = f.EndLine, l = f, i >= e.Document.TotalNumberOfLines)
        break;
    }
  }
  GetXPos(t, e, i) {
    let n = this.GetLineParagraph(t);
    if (e == this.LineNumber) {
      if (i == 0)
        return 0;
      let h = i - 1;
      return i > 1 && ct.IsMultiCodeUnit(t.Document.GetCharAt(this.Offset + i - 2)) && (h -= 1), u.GetRectForPosition(n, h, CanvasKit.RectHeightStyle.Tight, CanvasKit.RectWidthStyle.Tight).Rect.Right;
    }
    let s = -1;
    for (const h of this.CachedFolds)
      if (e == h.FoldMarker.EndLine) {
        s = h.LineEnd + i - h.FoldMarker.EndColumn;
        break;
      }
    return u.GetRectForPosition(n, s - 1, CanvasKit.RectHeightStyle.Tight, CanvasKit.RectWidthStyle.Tight).Rect.Right;
  }
  ClearCachedParagraph() {
    var t;
    (t = this._cachedParagraph) == null || t.delete(), this._cachedParagraph = null, this.CachedFolds = null;
  }
  ClearFoldedLineCache(t) {
    let e = this.LineNumber, i = t.GetVisibleLine(e), n = t.GetFirstLogicalLine(i);
    n != e && t.GetLineSegment(n).ClearCachedParagraph();
  }
  toString() {
    return this.IsDeleted ? "[LineSegment: (deleted) Length = " + this.Length + ", TotalLength = " + this.TotalLength + ", DelimiterLength = " + this.DelimiterLength + "]" : "[LineSegment: LineNumber=" + this.LineNumber + ", Offset = " + this.Offset + ", Length = " + this.Length + ", TotalLength = " + this.TotalLength + ", DelimiterLength = " + this.DelimiterLength + "]";
  }
}
rt = new WeakMap(), st = new WeakMap(), lt = new WeakMap();
class ie {
  constructor(t, e) {
    o(this, "LineStart");
    o(this, "FoldMarker");
    this.LineStart = t, this.FoldMarker = e;
  }
  get LineEnd() {
    return this.LineStart + this.FoldMarker.FoldText.length;
  }
}
class bt {
  constructor(t) {
    o(this, "LineSegment");
    o(this, "Count", 0);
    o(this, "TotalLength", 0);
    this.LineSegment = t, this.Count = 1, this.TotalLength = t.TotalLength;
  }
  toString() {
    return "[RBNode count=" + this.Count + " totalLength=" + this.TotalLength + " lineSegment.LineNumber=" + this.LineSegment.LineNumber + " lineSegment.Offset=" + this.LineSegment.Offset + " lineSegment.TotalLength=" + this.LineSegment.TotalLength + " lineSegment.DelimiterLength=" + this.LineSegment.DelimiterLength + "]";
  }
}
class Bt {
  Compare(t, e) {
    throw new c.NotImplementedException();
  }
  Equals(t, e) {
    throw new c.NotImplementedException();
  }
  UpdateAfterChildrenChange(t) {
    let e = 1, i = t.Value.LineSegment.TotalLength;
    t.Left != null && (e += t.Left.Value.Count, i += t.Left.Value.TotalLength), t.Right != null && (e += t.Right.Value.Count, i += t.Right.Value.TotalLength), (e != t.Value.Count || i != t.Value.TotalLength) && (t.Value.Count = e, t.Value.TotalLength = i, t.Parent != null && this.UpdateAfterChildrenChange(t.Parent));
  }
  UpdateAfterRotateLeft(t) {
    this.UpdateAfterChildrenChange(t), this.UpdateAfterChildrenChange(t.Parent);
  }
  UpdateAfterRotateRight(t) {
    this.UpdateAfterChildrenChange(t), this.UpdateAfterChildrenChange(t.Parent);
  }
}
const K = class {
  constructor(t) {
    o(this, "Iterator");
    this.Iterator = t.Clone();
  }
  Clone() {
    return new K(this.Iterator.Clone());
  }
  get Current() {
    return this.Iterator.Current.LineSegment;
  }
  get IsValid() {
    return this.Iterator.IsValid;
  }
  get CurrentIndex() {
    if (this.Iterator.Node == null)
      throw new c.InvalidOperationException();
    return K.GetIndexFromNode(this.Iterator.Node);
  }
  get CurrentOffset() {
    if (this.Iterator.Node == null)
      throw new c.InvalidOperationException();
    return K.GetOffsetFromNode(this.Iterator.Node);
  }
  MoveNext() {
    return this.Iterator.MoveNext();
  }
  MoveBack() {
    return this.Iterator.MoveBack();
  }
  static GetIndexFromNode(t) {
    let e = t.Left != null ? t.Left.Value.Count : 0;
    for (; t.Parent != null; )
      t == t.Parent.Right && (t.Parent.Left != null && (e += t.Parent.Left.Value.Count), e++), t = t.Parent;
    return e;
  }
  static GetOffsetFromNode(t) {
    let e = t.Left != null ? t.Left.Value.TotalLength : 0;
    for (; t.Parent != null; )
      t == t.Parent.Right && (t.Parent.Left != null && (e += t.Parent.Left.Value.TotalLength), e += t.Parent.Value.LineSegment.TotalLength), t = t.Parent;
    return e;
  }
};
let V = K;
o(V, "Invalid", new K(new M(null)));
class ne {
  constructor() {
    o(this, "_tree", new q(new Bt()));
    this.Clear();
  }
  GetNode(t) {
    if (t < 0 || t >= this._tree.Count)
      throw new c.ArgumentOutOfRangeException(
        "index",
        "index should be between 0 and " + (this._tree.Count - 1)
      );
    let e = this._tree.Root;
    for (; ; )
      if (e.Left != null && t < e.Left.Value.Count)
        e = e.Left;
      else {
        if (e.Left != null && (t -= e.Left.Value.Count), t == 0)
          return e;
        t--, e = e.Right;
      }
  }
  GetNodeByOffset(t) {
    if (t < 0 || t > this.TotalLength)
      throw new c.ArgumentOutOfRangeException(
        "offset",
        "offset should be between 0 and " + this.TotalLength
      );
    if (t == this.TotalLength) {
      if (this._tree.Root == null)
        throw new c.InvalidOperationException("Cannot call GetNodeByOffset while tree is empty.");
      return this._tree.Root.RightMost;
    }
    let e = this._tree.Root;
    for (; ; )
      if (e.Left != null && t < e.Left.Value.TotalLength)
        e = e.Left;
      else {
        if (e.Left != null && (t -= e.Left.Value.TotalLength), t -= e.Value.LineSegment.TotalLength, t < 0)
          return e;
        e = e.Right;
      }
  }
  GetByOffset(t) {
    return this.GetNodeByOffset(t).Value.LineSegment;
  }
  get TotalLength() {
    return this._tree.Root == null ? 0 : this._tree.Root.Value.TotalLength;
  }
  SetSegmentLength(t, e) {
    if (t == null)
      throw new c.ArgumentNullException("segment");
    let i = t.TreeEntry.Iterator.Node;
    t.TotalLength = e, new Bt().UpdateAfterChildrenChange(i);
  }
  RemoveSegment(t) {
    this._tree.RemoveAt(t.TreeEntry.Iterator.Clone());
  }
  InsertSegmentAfter(t, e) {
    let i = new At();
    return i.TotalLength = e, i.DelimiterLength = t.DelimiterLength, i.TreeEntry = this.InsertAfter(t.TreeEntry.Iterator.Node, i), i;
  }
  InsertAfter(t, e) {
    let i = new Vt(new bt(e));
    return t.Right == null ? this._tree.InsertAsRight(t, i) : this._tree.InsertAsLeft(t.Right.LeftMost, i), new V(new M(i));
  }
  get Count() {
    return this._tree.Count;
  }
  GetAt(t) {
    return this.GetNode(t).Value.LineSegment;
  }
  IndexOf(t) {
    let e = t.LineNumber;
    return e < 0 || e >= this.Count || t != this.GetAt(e) ? -1 : e;
  }
  Clear() {
    this._tree.Clear();
    let t = new At();
    t.TotalLength = 0, t.DelimiterLength = 0, this._tree.Add(new bt(t)), t.TreeEntry = this.GetEnumeratorForIndex(0);
  }
  Contains(t) {
    return this.IndexOf(t) >= 0;
  }
  GetEnumeratorForIndex(t) {
    return new V(new M(this.GetNode(t)));
  }
  GetEnumeratorForOffset(t) {
    return new V(new M(this.GetNodeByOffset(t)));
  }
}
class oe {
  constructor(t, e, i) {
    o(this, "Document");
    o(this, "Start");
    o(this, "Moved");
    this.Document = t, this.Start = e, this.Moved = i;
  }
}
class Ae {
  constructor(t, e) {
    o(this, "Document");
    o(this, "LineSegment");
    this.Document = t, this.LineSegment = e;
  }
}
class re {
  constructor(t, e, i) {
    o(this, "Document");
    o(this, "LineSegment");
    o(this, "LengthDelta");
    this.Document = t, this.LineSegment = e, this.LengthDelta = i;
  }
}
class Ct {
  constructor(t) {
    o(this, "_document");
    o(this, "_lineCollection");
    o(this, "LineLengthChanged", new c.Event());
    o(this, "LineCountChanged", new c.Event());
    o(this, "LineDeleted", new c.Event());
    this._document = t, this._lineCollection = new ne();
  }
  get TotalNumberOfLines() {
    return this._lineCollection.Count;
  }
  GetLineNumberForOffset(t) {
    return this.GetLineSegmentForOffset(t).LineNumber;
  }
  GetLineSegmentForOffset(t) {
    return this._lineCollection.GetByOffset(t);
  }
  GetLineSegment(t) {
    return this._lineCollection.GetNode(t).Value.LineSegment;
  }
  GetFirstLogicalLine(t) {
    if (!this._document.TextEditorOptions.EnableFolding)
      return t;
    let e = 0, i = 0, n = this._document.FoldingManager.GetTopLevelFoldedFoldings();
    for (const s of n)
      if (s.StartLine >= i) {
        if (e + s.StartLine - i >= t)
          break;
        e += s.StartLine - i, i = s.EndLine;
      }
    return n.Clear(), i + t - e;
  }
  GetVisibleLine(t) {
    if (!this._document.TextEditorOptions.EnableFolding)
      return t;
    let e = 0, i = 0, n = this._document.FoldingManager.GetTopLevelFoldedFoldings();
    for (const s of n) {
      if (s.StartLine >= t)
        break;
      if (s.StartLine >= i) {
        if (e += s.StartLine - i, s.EndLine > t)
          return e;
        i = s.EndLine;
      }
    }
    return n.Clear(), e += t - i, e;
  }
  SetContent(t) {
    this._lineCollection.Clear(), c.IsNullOrEmpty(t) || this.Replace(0, 0, t);
  }
  Insert(t, e) {
    this.Replace(t, 0, e);
  }
  Remove(t, e) {
    this.Replace(t, e, "");
  }
  Replace(t, e, i) {
    let n = this.GetLineNumberForOffset(t), s = this.TotalNumberOfLines, l = new ee();
    this.RemoveInternal(l, t, e), c.IsNullOrEmpty(i) || this.InsertInternal(t, i), this.TotalNumberOfLines != s && this.LineCountChanged.Invoke(new oe(
      this._document,
      n,
      this.TotalNumberOfLines - s
    ));
  }
  InsertInternal(t, e) {
    let i = this._lineCollection.GetByOffset(t), n = Ct.NextDelimiter(e, 0);
    if (n == null) {
      i.InsertedLinePart(this, t - i.Offset, e.length), this.SetSegmentLength(i, i.TotalLength + e.length);
      return;
    }
    let s = i;
    s.InsertedLinePart(this, t - s.Offset, n.Offset);
    let l = 0;
    for (; n != null; ) {
      let h = t + n.Offset + n.Length, d = i.Offset, f = d + i.TotalLength - (t + l);
      this._lineCollection.SetSegmentLength(i, h - d);
      let C = this._lineCollection.InsertSegmentAfter(i, f);
      i.DelimiterLength = n.Length, i = C, l = n.Offset + n.Length, n = Ct.NextDelimiter(e, l);
    }
    s.SplitTo(i), l != e.length && (i.InsertedLinePart(this, 0, e.length - l), this.SetSegmentLength(
      i,
      i.TotalLength + e.length - l
    ));
  }
  RemoveInternal(t, e, i) {
    if (i == 0)
      return;
    let n = this._lineCollection.GetEnumeratorForOffset(e), s = n.Current, l = s.Offset;
    if (e + i < l + s.TotalLength) {
      s.RemovedLinePart(
        this,
        t,
        e - l,
        i
      ), this.SetSegmentLength(s, s.TotalLength - i);
      return;
    }
    let h = l + s.TotalLength - e;
    s.RemovedLinePart(
      this,
      t,
      e - l,
      h
    );
    let d = this._lineCollection.GetByOffset(e + i);
    if (d == s) {
      this.SetSegmentLength(s, s.TotalLength - i);
      return;
    }
    let C = d.Offset + d.TotalLength - (e + i);
    d.RemovedLinePart(
      this,
      t,
      0,
      d.TotalLength - C
    ), s.MergedWith(d, e - l), this.SetSegmentLength(
      s,
      s.TotalLength - h + C
    ), s.DelimiterLength = d.DelimiterLength, n.MoveNext();
    let S;
    do
      S = n.Current, n.MoveNext(), this._lineCollection.RemoveSegment(S), S.Deleted(t);
    while (S != d);
  }
  SetSegmentLength(t, e) {
    let i = e - t.TotalLength;
    i != 0 && (this._lineCollection.SetSegmentLength(t, e), this.LineLengthChanged.Invoke(new re(this._document, t, i)));
  }
  static NextDelimiter(t, e) {
    for (let i = e; i < t.length; i++)
      switch (t.charCodeAt(i)) {
        case 13:
          return i + 1 < t.length && t.charCodeAt(i + 1) == 10 ? new Tt(i, 2) : new Tt(i, 1);
        case 10:
          return new Tt(i, 1);
      }
    return null;
  }
}
class Tt {
  constructor(t, e) {
    o(this, "Offset");
    o(this, "Length");
    this.Offset = t, this.Length = e;
  }
}
class se {
  constructor() {
    o(this, "_undostack", new c.Stack());
    o(this, "_redostack", new c.Stack());
    o(this, "TextEditor");
    o(this, "_undoGroupDepth", 0);
    o(this, "_actionCountInUndoGroup", 0);
    o(this, "AcceptChanges", !0);
  }
  get CanUndo() {
    return this._undostack.length > 0;
  }
  get CanRedo() {
    return this._redostack.length > 0;
  }
  get UndoItemCount() {
    return this._undostack.length;
  }
  get RedoItemCount() {
    return this._redostack.length;
  }
  StartUndoGroup() {
    this._undoGroupDepth == 0 && (this._actionCountInUndoGroup = 0), this._undoGroupDepth++;
  }
  EndUndoGroup() {
    if (this._undoGroupDepth == 0)
      throw new c.InvalidOperationException("There are no open undo groups");
    if (this._undoGroupDepth--, this._undoGroupDepth == 0 && this._actionCountInUndoGroup > 1) {
      let t = new le(this._undostack, this._actionCountInUndoGroup);
      this._undostack.Push(t);
    }
  }
  AssertNoUndoGroupOpen() {
    if (this._undoGroupDepth != 0)
      throw this._undoGroupDepth = 0, new c.InvalidOperationException("No undo group should be open at this point");
  }
  Undo() {
    if (this.AssertNoUndoGroupOpen(), this._undostack.length > 0) {
      let t = this._undostack.Pop();
      this._redostack.Push(t), t.Undo();
    }
  }
  Redo() {
    if (this.AssertNoUndoGroupOpen(), this._redostack.length > 0) {
      let t = this._redostack.Pop();
      this._undostack.Push(t), t.Redo();
    }
  }
  Push(t) {
    if (t == null)
      throw new c.ArgumentNullException("operation");
    this.AcceptChanges && (this.StartUndoGroup(), this._undostack.Push(t), this._actionCountInUndoGroup++, this.TextEditor != null && (this._undostack.Push(new de(this, this.TextEditor.Caret.Position.Clone())), this._actionCountInUndoGroup++), this.EndUndoGroup(), this.ClearRedoStack());
  }
  ClearRedoStack() {
    this._redostack.Clear();
  }
  ClearAll() {
    this.AssertNoUndoGroupOpen(), this._undostack.Clear(), this._redostack.Clear(), this._actionCountInUndoGroup = 0;
  }
}
class le {
  constructor(t, e) {
    o(this, "_undoList");
    e = Math.min(e, t.length), this._undoList = new Array(e);
    for (let i = 0; i < e; ++i)
      this._undoList[i] = t.Pop();
  }
  Undo() {
    for (let t = 0; t < this._undoList.length; ++t)
      this._undoList[t].Undo();
  }
  Redo() {
    for (let t = this._undoList.length - 1; t >= 0; --t)
      this._undoList[t].Redo();
  }
}
class ae {
  constructor(t, e, i) {
    o(this, "_document");
    o(this, "_offset");
    o(this, "_text");
    this._document = t, this._offset = e, this._text = i;
  }
  Undo() {
    var t;
    (t = this._document.UndoStack.TextEditor) == null || t.SelectionManager.ClearSelection(), this._document.UndoStack.AcceptChanges = !1, this._document.Insert(this._offset, this._text), this._document.UndoStack.AcceptChanges = !0;
  }
  Redo() {
    var t;
    (t = this._document.UndoStack.TextEditor) == null || t.SelectionManager.ClearSelection(), this._document.UndoStack.AcceptChanges = !1, this._document.Remove(this._offset, this._text.length), this._document.UndoStack.AcceptChanges = !0;
  }
}
class he {
  constructor(t, e, i) {
    o(this, "_document");
    o(this, "_offset");
    o(this, "_text");
    this._document = t, this._offset = e, this._text = i;
  }
  Undo() {
    var t;
    (t = this._document.UndoStack.TextEditor) == null || t.SelectionManager.ClearSelection(), this._document.UndoStack.AcceptChanges = !1, this._document.Remove(this._offset, this._text.length), this._document.UndoStack.AcceptChanges = !0;
  }
  Redo() {
    var t;
    (t = this._document.UndoStack.TextEditor) == null || t.SelectionManager.ClearSelection(), this._document.UndoStack.AcceptChanges = !1, this._document.Insert(this._offset, this._text), this._document.UndoStack.AcceptChanges = !0;
  }
}
class ue {
  constructor(t, e, i, n) {
    o(this, "_document");
    o(this, "_offset");
    o(this, "_text");
    o(this, "_origText");
    this._document = t, this._offset = e, this._text = n, this._origText = i;
  }
  Undo() {
    var t;
    (t = this._document.UndoStack.TextEditor) == null || t.SelectionManager.ClearSelection(), this._document.UndoStack.AcceptChanges = !1, this._document.Replace(this._offset, this._text.length, this._origText), this._document.UndoStack.AcceptChanges = !0;
  }
  Redo() {
    var t;
    (t = this._document.UndoStack.TextEditor) == null || t.SelectionManager.ClearSelection(), this._document.UndoStack.AcceptChanges = !1, this._document.Replace(this._offset, this._origText.length, this._text), this._document.UndoStack.AcceptChanges = !0;
  }
}
class de {
  constructor(t, e) {
    o(this, "_stack");
    o(this, "_pos");
    o(this, "_redoPos", L.Empty.Clone());
    this._stack = t, this._pos = e.Clone();
  }
  Undo() {
    this._redoPos = this._stack.TextEditor.Caret.Position.Clone(), this._stack.TextEditor.Caret.Position = this._pos.Clone(), this._stack.TextEditor.SelectionManager.ClearSelection();
  }
  Redo() {
    this._stack.TextEditor.Caret.Position = this._redoPos.Clone(), this._stack.TextEditor.SelectionManager.ClearSelection();
  }
}
var Ut = /* @__PURE__ */ ((r) => (r[r.Before = 0] = "Before", r[r.After = 1] = "After", r))(Ut || {}), Wt = /* @__PURE__ */ ((r) => (r[r.None = 0] = "None", r[r.FullRow = 1] = "FullRow", r))(Wt || {}), vt = /* @__PURE__ */ ((r) => (r[r.None = 0] = "None", r[r.Auto = 1] = "Auto", r[r.Smart = 2] = "Smart", r))(vt || {}), ce = /* @__PURE__ */ ((r) => (r[r.None = 0] = "None", r[r.OnBracket = 1] = "OnBracket", r[r.AfterBracket = 2] = "AfterBracket", r))(ce || {}), Pt = /* @__PURE__ */ ((r) => (r[r.Normal = 0] = "Normal", r[r.Additive = 1] = "Additive", r))(Pt || {});
const j = class {
  constructor(t, e) {
    o(this, "Line", 0);
    o(this, "Column", 0);
    this.Line = e, this.Column = t;
  }
  get IsEmpty() {
    return this.Column <= 0 && this.Line <= 0;
  }
  toString() {
    return `(Line ${this.Line}, Col ${this.Column})`;
  }
  Equals(t) {
    return c.OpEquality(this, t);
  }
  static op_Equality(t, e) {
    return t.Column == e.Column && t.Line == e.Line;
  }
  static op_Inequality(t, e) {
    return t.Column != e.Column || t.Line != e.Line;
  }
  static op_LessThan(t, e) {
    return t.Line < e.Line ? !0 : t.Line == e.Line ? t.Column < e.Column : !1;
  }
  static op_GreaterThan(t, e) {
    return t.Line > e.Line ? !0 : t.Line == e.Line ? t.Column > e.Column : !1;
  }
  Clone() {
    return new j(this.Column, this.Line);
  }
  CompareTo(t) {
    return c.OpEquality(this, t) ? 0 : j.op_LessThan(this, t) ? -1 : 1;
  }
};
let L = j;
o(L, "$meta_System_IComparable", !0), o(L, "$meta_System_IEquatable", !0), o(L, "MaxColumn", 16777215), o(L, "Empty", new j(-1, -1));
var fe = /* @__PURE__ */ ((r) => (r[r.BeforeInsertion = 0] = "BeforeInsertion", r[r.AfterInsertion = 1] = "AfterInsertion", r))(fe || {});
class wt {
  constructor(t, e) {
    o(this, "lineSegment");
    o(this, "columnNumber", 0);
    o(this, "MovementType", 0);
    o(this, "Deleted", new c.Event());
    this.lineSegment = t, this.columnNumber = e;
  }
  static AnchorDeletedError() {
    return new c.InvalidOperationException("The text containing the anchor was deleted");
  }
  get Line() {
    if (this.lineSegment == null)
      throw wt.AnchorDeletedError();
    return this.lineSegment;
  }
  set Line(t) {
    this.lineSegment = t;
  }
  get IsDeleted() {
    return this.lineSegment == null;
  }
  get LineNumber() {
    return this.Line.LineNumber;
  }
  get ColumnNumber() {
    if (this.lineSegment == null)
      throw wt.AnchorDeletedError();
    return this.columnNumber;
  }
  set ColumnNumber(t) {
    this.columnNumber = t;
  }
  get Location() {
    return new L(this.ColumnNumber, this.LineNumber);
  }
  get Offset() {
    return this.Line.Offset + this.columnNumber;
  }
  Delete(t) {
    this.lineSegment = null, t.Value.AddDeletedAnchor(this);
  }
  RaiseDeleted() {
    this.Deleted.Invoke();
  }
  toString() {
    return this.IsDeleted ? "[TextAnchor (deleted)]" : `[TextAnchor ${this.Location}]`;
  }
}
class ge {
  constructor() {
    o(this, "TabIndent", 4);
    o(this, "IndentationSize", 4);
    o(this, "IndentStyle", vt.Smart);
    o(this, "DocumentSelectionMode", Pt.Normal);
    o(this, "BracketMatchingStyle", Ut.After);
    o(this, "AllowCaretBeyondEOL", !1);
    o(this, "CaretLine", !1);
    o(this, "ShowMatchingBracket", !0);
    o(this, "ShowLineNumbers", !0);
    o(this, "ShowSpaces", !1);
    o(this, "ShowTabs", !1);
    o(this, "ShowEOLMarker", !1);
    o(this, "ShowInvalidLines", !1);
    o(this, "IsIconBarVisible", !1);
    o(this, "EnableFolding", !0);
    o(this, "ShowHorizontalRuler", !1);
    o(this, "ShowVerticalRuler", !1);
    o(this, "ConvertTabsToSpaces", !1);
    o(this, "MouseWheelScrollDown", !0);
    o(this, "MouseWheelTextZoom", !0);
    o(this, "HideMouseCursor", !1);
    o(this, "CutCopyWholeLine", !0);
    o(this, "VerticalRulerRow", 80);
    o(this, "LineViewerStyle", Wt.None);
    o(this, "LineTerminator", `
`);
    o(this, "AutoInsertCurlyBracket", !0);
    o(this, "SupportReadOnlySegments", !1);
  }
}
class dt {
  constructor(t, e, i, n) {
    o(this, "Document");
    o(this, "Offset");
    o(this, "Length");
    o(this, "Text");
    this.Document = t, this.Offset = e, this.Length = i, this.Text = n;
  }
}
class Ht {
  constructor(t, e = null) {
    o(this, "_fileName", "");
    o(this, "Tag");
    o(this, "_lineManager");
    o(this, "TextBuffer");
    o(this, "SyntaxParser");
    o(this, "FoldingManager");
    o(this, "TextEditorOptions");
    o(this, "UndoStack");
    o(this, "Readonly", !1);
    o(this, "DocumentChanged", new c.Event());
    this._fileName = t, this.Tag = e, this.TextBuffer = new $t(), this._lineManager = new Ct(this), this.SyntaxParser = new B(this), this.FoldingManager = new te(this), this.TextEditorOptions = new ge(), this.UndoStack = new se();
  }
  get HasSyntaxError() {
    var t, e;
    return (e = (t = this.SyntaxParser.RootNode) == null ? void 0 : t.hasError()) != null ? e : !1;
  }
  get TextLength() {
    return this.TextBuffer.Length;
  }
  get TotalNumberOfLines() {
    return this._lineManager.TotalNumberOfLines;
  }
  get TextContent() {
    return this.GetText(0, this.TextBuffer.Length);
  }
  set TextContent(t) {
    this.TextBuffer.SetContent(t), this._lineManager.SetContent(t), this.UndoStack.ClearAll(), this.SyntaxParser.Parse(!0), this.SyntaxParser.Tokenize(0, this.TotalNumberOfLines), this.DocumentChanged.Invoke(new dt(this, 0, 0, t));
  }
  GetCharAt(t) {
    return this.TextBuffer.GetCharAt(t);
  }
  GetText(t, e) {
    return this.TextBuffer.GetText(t, e);
  }
  Insert(t, e) {
    this.Readonly || (this.SyntaxParser.BeginInsert(t, e.length), this.TextBuffer.Insert(t, e), this._lineManager.Insert(t, e), this.UndoStack.Push(new he(this, t, e)), this.SyntaxParser.EndInsert(t, e.length), this.DocumentChanged.Invoke(new dt(this, t, 0, e)));
  }
  Remove(t, e) {
    this.Readonly || (this.SyntaxParser.BeginRemove(t, e), this.UndoStack.Push(new ae(this, t, this.GetText(t, e))), this.TextBuffer.Remove(t, e), this._lineManager.Remove(t, e), this.SyntaxParser.EndRemove(), this.DocumentChanged.Invoke(new dt(this, t, e, "")));
  }
  Replace(t, e, i) {
    this.Readonly || (this.SyntaxParser.BeginReplace(t, e, i.length), this.UndoStack.Push(new ue(this, t, this.GetText(t, e), i)), this.TextBuffer.Replace(t, e, i), this._lineManager.Replace(t, e, i), this.SyntaxParser.EndReplace(t, e, i.length), this.DocumentChanged.Invoke(new dt(this, t, e, i)));
  }
  StartUndoGroup() {
    this.UndoStack.StartUndoGroup();
  }
  EndUndoGroup() {
    this.UndoStack.EndUndoGroup();
  }
  GetLineNumberForOffset(t) {
    return this._lineManager.GetLineNumberForOffset(t);
  }
  GetLineSegmentForOffset(t) {
    return this._lineManager.GetLineSegmentForOffset(t);
  }
  GetLineSegment(t) {
    return this._lineManager.GetLineSegment(t);
  }
  GetFirstLogicalLine(t) {
    return this._lineManager.GetFirstLogicalLine(t);
  }
  GetVisibleLine(t) {
    return this._lineManager.GetVisibleLine(t);
  }
  OffsetToPosition(t) {
    let e = this.GetLineNumberForOffset(t), i = this.GetLineSegment(e);
    return new L(t - i.Offset, e);
  }
  PositionToOffset(t) {
    if (t.Line >= this.TotalNumberOfLines)
      return 0;
    let e = this.GetLineSegment(t.Line);
    return Math.min(this.TextLength, e.Offset + Math.min(e.Length, t.Column));
  }
  UpdateSegmentsOnDocumentChanged(t, e) {
    let i = e.Length > 0 ? e.Length : 0, n = c.IsNullOrEmpty(e.Text) ? 0 : e.Text.length;
    for (let s = 0; s < t.length; ++s) {
      let l = t[s], h = l.Offset, d = l.Offset + l.Length;
      if (e.Offset <= h && (h -= i, h < e.Offset && (h = e.Offset)), e.Offset < d && (d -= i, d < e.Offset && (d = e.Offset)), h == d) {
        t.RemoveAt(s), --s;
        continue;
      }
      e.Offset <= h && (h += n), e.Offset < d && (d += n), l.Offset = h, l.Length = d - h;
    }
  }
  Dispose() {
    this.SyntaxParser.Dispose();
  }
}
o(Ht, "$meta_System_IDisposable", !0);
class be {
  constructor(t) {
    o(this, "_command");
    this._command = t;
  }
  Execute(t) {
    this._command(t);
  }
}
class Le {
  Execute(t) {
    let e = t.Caret.Position.Clone(), i = t.Document.FoldingManager.GetFoldedFoldingsWithEnd(e.Line), n = null;
    for (const s of i)
      if (s.EndColumn == e.Column) {
        n = s;
        break;
      }
    if (n != null)
      e.Line = n.StartLine, e.Column = n.StartColumn;
    else if (e.Column > 0)
      e.Column -= 1;
    else if (e.Line > 0) {
      let s = t.Document.GetLineSegment(e.Line - 1);
      e.Column = s.Length, e.Line = e.Line - 1;
    }
    t.Caret.Position = e.Clone();
  }
}
class Ce {
  Execute(t) {
    let e = t.Document.GetLineSegment(t.Caret.Line), i = t.Caret.Position.Clone(), n = t.Document.FoldingManager.GetFoldedFoldingsWithStart(i.Line), s = null;
    for (const l of n)
      if (l.StartColumn == i.Column) {
        s = l;
        break;
      }
    s != null ? (i.Line = s.EndLine, i.Column = s.EndColumn) : i.Column < e.Length || t.Document.TextEditorOptions.AllowCaretBeyondEOL ? i.Column += 1 : i.Column + 1 < t.Document.TotalNumberOfLines && (i.Line += 1, i.Column = 0), t.Caret.Position = i.Clone();
  }
}
class me {
  Execute(t) {
    let e = t.Caret.Position.Clone(), i = t.Document.GetVisibleLine(e.Line);
    if (i > 0) {
      let n = t.TextView.GetDrawingXPos(e.Line, e.Column) + t.VirtualTop.X, s = t.TextView.Bounds.Top + (i - 1) * t.TextView.FontHeight - t.VirtualTop.Y, l = t.TextView.GetLogicalLine(s), h = t.TextView.GetLogicalColumn(l, n);
      t.Caret.Position = h.Location.Clone();
    }
  }
}
class Se {
  Execute(t) {
    let e = t.Caret.Position.Clone(), i = t.Document.GetVisibleLine(e.Line);
    if (i < t.Document.GetVisibleLine(t.Document.TotalNumberOfLines)) {
      let n = t.TextView.GetDrawingXPos(e.Line, e.Column) + t.VirtualTop.X, s = t.TextView.Bounds.Top + (i + 1) * t.TextView.FontHeight - t.VirtualTop.Y, l = t.TextView.GetLogicalLine(s), h = t.TextView.GetLogicalColumn(l, n);
      t.Caret.Position = h.Location.Clone();
    }
  }
}
class Te {
  Execute(t) {
    if (t.SelectionManager.HasSomethingSelected) {
      t.DeleteSelection();
      return;
    }
    let e = t.Caret.Offset;
    if (e <= 0)
      return;
    let i = t.Document.GetLineNumberForOffset(e), s = t.Document.GetLineSegment(i).Offset;
    if (s == e) {
      let l = t.Document.GetLineSegment(i - 1), h = l.Offset + l.Length;
      t.Document.Remove(h, s - h), t.Caret.Position = new L(l.Length, i - 1);
    } else {
      let l = t.Document.GetCharAt(e - 1), h = t.Document.SyntaxParser.Language.GetAutoColsingPairs(l), d = h != null && h == t.Document.GetCharAt(e) ? 2 : 1;
      t.Document.Remove(e - 1, d), t.Caret.Position = t.Document.OffsetToPosition(e - 1);
    }
  }
}
class _e {
  Execute(t) {
    let e = t.Document.TextEditorOptions.TabIndent, i = " ".repeat(e);
    t.InsertOrReplaceString(i);
  }
}
class pe {
  Execute(t) {
    t.Document.UndoStack.StartUndoGroup();
    let e = t.Caret.Line, n = t.Document.GetLineSegment(e).GetLeadingWhiteSpaces();
    n == 0 ? t.InsertOrReplaceString(`
`) : t.InsertOrReplaceString(`
` + " ".repeat(n)), t.Document.UndoStack.EndUndoGroup();
  }
}
class we {
  Execute(t) {
    t.Document.UndoStack.Undo();
  }
}
class xe {
  Execute(t) {
    t.Document.UndoStack.Redo();
  }
}
class Ot {
  constructor(t) {
    o(this, "TextEditor");
    o(this, "Bounds", u.Rect.Empty);
    this.TextEditor = t;
  }
  get Theme() {
    return this.TextEditor.Theme;
  }
  get Document() {
    return this.TextEditor.Document;
  }
  get IsVisible() {
    return !0;
  }
  get Size() {
    return new u.Size(-1, -1);
  }
  HandlePointerDown(t, e, i) {
  }
}
var at;
class Ee extends Ot {
  constructor(e) {
    super(e);
    o(this, "_spaceWidth", 10);
    x(this, at, 0);
    this.FontHeight = e.Theme.FontSize + e.Theme.LineSpace * 2;
  }
  get FontHeight() {
    return w(this, at);
  }
  set FontHeight(e) {
    E(this, at, e);
  }
  get VisibleLineCount() {
    return 1 + (Math.floor(Math.round(this.Bounds.Height / this.FontHeight)) & 4294967295);
  }
  get VisibleLineDrawingRemainder() {
    return Math.floor(Math.round(this.TextEditor.VirtualTop.Y % this.FontHeight)) & 4294967295;
  }
  get FirstVisibleLine() {
    return this.Document.GetFirstLogicalLine(Math.floor(this.TextEditor.VirtualTop.Y / this.FontHeight) & 4294967295);
  }
  set FirstVisibleLine(e) {
    this.FirstVisibleLine != e && (this.TextEditor.VirtualTop = new u.Point(
      this.TextEditor.VirtualTop.X,
      this.Document.GetVisibleLine(e) * this.FontHeight
    ));
  }
  get FirstPhysicalLine() {
    return Math.floor(this.TextEditor.VirtualTop.Y / this.FontHeight) & 4294967295;
  }
  GetLogicalPosition(e, i) {
    return this.GetLogicalColumn(this.GetLogicalLine(i), e).Location;
  }
  GetLogicalColumn(e, i) {
    if (i += this.TextEditor.VirtualTop.X, e >= this.Document.TotalNumberOfLines)
      return new _t(
        new L(Math.floor(i / this._spaceWidth) & 4294967295, e),
        null
      );
    if (i <= 0)
      return new _t(new L(0, e), null);
    let n = this.Document.GetLineSegment(e), s = null, h = n.GetLineParagraph(this.TextEditor).getGlyphPositionAtCoordinate(i, 1).pos, d = h;
    if (n.CachedFolds != null && d > n.CachedFolds[0].LineStart)
      for (const f of n.CachedFolds) {
        if (h < f.LineStart)
          break;
        if (h >= f.LineStart && h < f.LineEnd) {
          s = f.FoldMarker, e = f.FoldMarker.EndLine, d = f.FoldMarker.EndColumn;
          break;
        } else
          h >= f.LineEnd && (e = f.FoldMarker.EndLine, d = f.FoldMarker.EndColumn + (h - f.LineEnd));
      }
    return new _t(new L(d, e), s);
  }
  GetLogicalLine(e) {
    let i = Math.max(0, Math.floor((e + this.TextEditor.VirtualTop.Y) / this.FontHeight) & 4294967295);
    return this.Document.GetFirstLogicalLine(i);
  }
  GetDrawingXPos(e, i) {
    let n = this.Document.FoldingManager.GetTopLevelFoldedFoldings(), s = -1;
    for (let d = n.length - 1; d >= 0; d--) {
      let f = n[d];
      if (s >= 0)
        if (f.EndLine == s)
          s = f.StartLine;
        else
          break;
      else
        (f.StartLine == e || f.EndLine == e) && (s = f.StartLine);
    }
    return (s < 0 ? this.Document.GetLineSegment(e) : this.Document.GetLineSegment(s)).GetXPos(this.TextEditor, e, i) - this.TextEditor.VirtualTop.X;
  }
  HandlePointerDown(e, i, n) {
    let s = e - this.Bounds.Left, l = i - this.Bounds.Top;
    if (n == u.PointerButtons.Left) {
      let h = this.GetLogicalLine(l), d = this.GetLogicalColumn(h, s);
      this.TextEditor.SelectionManager.ClearSelection(), this.TextEditor.Caret.Position = d.Location.Clone();
    } else if (n == u.PointerButtons.Right) {
      let h = this.TextEditor.Controller.ContextMenuBuilder;
      if (h != null) {
        let d = h(this.TextEditor);
        d.length > 0 && u.ContextMenu.Show(d);
      }
    }
  }
  Paint(e, i) {
    if (i.Width <= 0 || i.Height <= 0)
      return;
    let n = this.TextEditor.VirtualTop.X;
    n > 0 && (e.save(), e.clipRect(this.Bounds, CanvasKit.ClipOp.Intersect, !1));
    let s = u.PaintUtils.Shared(this.Theme.TextBgColor);
    e.drawRect(i, s);
    let l = Math.floor((this.Bounds.Height + this.VisibleLineDrawingRemainder) / this.FontHeight + 1) & 4294967295;
    this.PaintLines(e, l), n > 0 && e.restore();
  }
  PaintLines(e, i) {
    let n = this.TextEditor.VirtualTop.X;
    for (let s = 0; s < i; s++) {
      let l = u.Rect.FromLTWH(
        this.Bounds.Left - n,
        this.Bounds.Top + s * this.FontHeight - this.VisibleLineDrawingRemainder,
        this.Bounds.Width + n,
        this.FontHeight
      ), h = this.Document.GetFirstLogicalLine(
        this.Document.GetVisibleLine(this.FirstVisibleLine) + s
      );
      if (h >= this.Document.TotalNumberOfLines)
        return;
      let d = this.Document.GetLineSegment(h);
      if (d.Length == 0)
        continue;
      let f = d.GetLineParagraph(this.TextEditor);
      e.drawParagraph(f, l.Left, l.Top + this.Theme.LineSpace);
    }
  }
}
at = new WeakMap();
class _t {
  constructor(t, e) {
    o(this, "Location");
    o(this, "InFoldMarker");
    this.Location = t.Clone(), this.InFoldMarker = e;
  }
}
class Pe extends Ot {
  constructor(e) {
    super(e);
    o(this, "_selectedFoldLine", -1);
  }
  GetNormalPaint() {
    return u.PaintUtils.Shared(new u.Color(200, 200, 200, 255), CanvasKit.PaintStyle.Stroke, 1);
  }
  GetSelectedPaint() {
    return u.PaintUtils.Shared(new u.Color(200, 200, 200, 255), CanvasKit.PaintStyle.Stroke, 1.5);
  }
  SelectedFoldingFrom(e) {
    for (const i of e)
      if (this._selectedFoldLine == i.StartLine)
        return !0;
    return !1;
  }
  get Size() {
    return new u.Size(this.TextEditor.TextView.FontHeight, -1);
  }
  get IsVisible() {
    return this.TextEditor.Document.TextEditorOptions.EnableFolding;
  }
  HandlePointerDown(e, i, n) {
    let s = Math.floor((i + this.TextEditor.VirtualTop.Y) / this.TextEditor.TextView.FontHeight) & 4294967295, l = this.Document.GetFirstLogicalLine(s);
    if (l < 0 || l + 1 >= this.Document.TotalNumberOfLines)
      return;
    let h = this.Document.FoldingManager.GetFoldingsWithStart(l);
    for (const f of h)
      f.IsFolded = !f.IsFolded;
    this.Document.GetLineSegment(l).ClearCachedParagraph(), this.TextEditor.Caret.UpdateCaretPosition(), h.length > 0 && (this.Document.FoldingManager.RaiseFoldingsChanged(), this.TextEditor.Controller.Widget.RequestInvalidate(!0, null));
  }
  Paint(e, i) {
    if (i.Width <= 0 || i.Height <= 0)
      return;
    let n = u.PaintUtils.Shared(this.TextEditor.Theme.TextBgColor);
    e.drawRect(i, n);
    let s = this.TextEditor.TextView.FontHeight, l = this.TextEditor.TextView.VisibleLineDrawingRemainder, h = Math.floor((this.Bounds.Height + l) / s + 1) & 4294967295;
    for (let d = 0; d < h; ++d) {
      let f = u.Rect.FromLTWH(
        this.Bounds.Left,
        this.Bounds.Top + d * s - l,
        this.Bounds.Width,
        s
      );
      if (i.IntersectsWith(
        f.Left,
        f.Top,
        f.Width,
        f.Height
      )) {
        let C = this.Document.GetFirstLogicalLine(this.TextEditor.TextView.FirstPhysicalLine + d);
        C < this.Document.TotalNumberOfLines && this.PaintFoldMarker(e, C, f.Clone());
      }
    }
  }
  PaintFoldMarker(e, i, n) {
    let s = this.Document.FoldingManager, l = s.GetFoldingsWithStart(i), h = s.GetFoldingsContainsLineNumber(i), d = s.GetFoldingsWithEnd(i), f = l.length > 0, C = h.length > 0, S = d.length > 0, W = this.SelectedFoldingFrom(l), R = this.SelectedFoldingFrom(h), X = this.SelectedFoldingFrom(d), I = this.TextEditor.TextView.FontHeight * 0.57;
    I -= I % 2;
    let mt = n.Top + (n.Height - I) / 2, y = n.Left + (n.Width - I) / 2 + I / 2;
    if (f) {
      let A = !0, Mt = !1;
      for (const N of l)
        N.IsFolded ? A = !1 : Mt = N.EndLine > N.StartLine;
      let kt = !1;
      for (const N of d)
        N.EndLine > N.StartLine && !N.IsFolded && (kt = !0);
      this.PaintMarker(
        e,
        u.Rect.FromLTWH(
          n.Left + (n.Width - I) / 2,
          mt,
          I,
          I
        ),
        A,
        W
      ), (C || kt) && e.drawLine(
        y,
        n.Top,
        y,
        mt - 1,
        R ? this.GetSelectedPaint() : this.GetNormalPaint()
      ), (C || Mt) && e.drawLine(
        y,
        mt + I + 1,
        y,
        n.Bottom,
        X || W && A || R ? this.GetSelectedPaint() : this.GetNormalPaint()
      );
    } else if (S) {
      let A = n.Top + n.Height / 2;
      e.drawLine(
        y,
        A,
        y + I / 2,
        A,
        X ? this.GetSelectedPaint() : this.GetNormalPaint()
      ), e.drawLine(
        y,
        n.Top,
        y,
        A,
        R || X ? this.GetSelectedPaint() : this.GetNormalPaint()
      ), C && e.drawLine(
        y,
        A + 1,
        y,
        n.Bottom,
        R ? this.GetSelectedPaint() : this.GetNormalPaint()
      );
    } else
      C && e.drawLine(
        y,
        n.Top,
        y,
        n.Bottom,
        R ? this.GetSelectedPaint() : this.GetNormalPaint()
      );
  }
  PaintMarker(e, i, n, s) {
    e.drawRect(
      u.Rect.FromLTWH(i.Left, i.Top, i.Width, i.Height),
      s ? this.GetSelectedPaint() : this.GetNormalPaint()
    );
    let l = i.Height / 8 + 1, h = i.Height / 2 + i.Height % 2;
    e.drawLine(
      i.Left + l,
      i.Top + h,
      i.Left + i.Width - l,
      i.Top + h,
      this.GetNormalPaint()
    ), n || e.drawLine(
      i.Left + h,
      i.Top + l,
      i.Left + h,
      i.Top + i.Height - l,
      this.GetNormalPaint()
    );
  }
}
class Oe extends Ot {
  constructor(e) {
    super(e);
    o(this, "_numberCache");
    o(this, "_numberWidth");
    this._numberCache = this.GenerateNumberCache(), this._numberWidth = this._numberCache[7].getLongestLine();
  }
  GenerateNumberCache() {
    let e = new Array(10), i = u.MakeTextStyle({ color: this.Theme.LineNumberColor });
    for (let n = 0; n < 10; n++) {
      let s = u.MakeParagraphStyle({ maxLines: 1 }), l = u.MakeParagraphBuilder(s);
      l.pushStyle(i), l.addText(n.toString());
      let h = l.build();
      h.layout(Number.MAX_VALUE), e[n] = h, l.delete();
    }
    return e;
  }
  get Size() {
    return new u.Size(this._numberWidth * 5, -1);
  }
  Paint(e, i) {
    if (i.Width <= 0 || i.Height <= 0)
      return;
    let n = u.PaintUtils.Shared(this.Theme.LineBgColor);
    e.drawRect(i, n);
    let s = this.TextEditor.TextView.FontHeight, l = this.TextEditor.TextView.VisibleLineDrawingRemainder, h = (Math.floor((this.Bounds.Height + l) / s) & 4294967295) + 1;
    for (let d = 0; d < h; d++) {
      let f = this.Bounds.Top + s * d - l + this.Theme.LineSpace;
      if (i.IntersectsWith(this.Bounds.Left, f, this.Bounds.Width, s)) {
        let C = this.Document.GetFirstLogicalLine(
          this.Document.GetVisibleLine(this.TextEditor.TextView.FirstVisibleLine) + d
        );
        C < this.Document.TotalNumberOfLines && this.DrawLineNumber(e, C + 1, f);
      }
    }
  }
  DrawLineNumber(e, i, n) {
    let s = i % 10, l = (Math.floor(i / 10) & 4294967295) % 10, h = (Math.floor(i / 100) & 4294967295) % 10, d = (Math.floor(i / 1e3) & 4294967295) % 10;
    e.drawParagraph(this._numberCache[s], 2 + this._numberWidth * 3, n), i >= 10 && e.drawParagraph(this._numberCache[l], 2 + this._numberWidth * 2, n), i >= 100 && e.drawParagraph(this._numberCache[h], 2 + this._numberWidth, n), i >= 1e3 && e.drawParagraph(this._numberCache[d], 2, n);
  }
}
var ft = /* @__PURE__ */ ((r) => (r[r.Method = 0] = "Method", r[r.Function = 1] = "Function", r[r.Constructor = 2] = "Constructor", r[r.Field = 3] = "Field", r[r.Variable = 4] = "Variable", r[r.Class = 5] = "Class", r[r.Struct = 6] = "Struct", r[r.Interface = 7] = "Interface", r[r.Module = 8] = "Module", r[r.Property = 9] = "Property", r[r.Event = 10] = "Event", r[r.Operator = 11] = "Operator", r[r.Unit = 12] = "Unit", r[r.Value = 13] = "Value", r[r.Constant = 14] = "Constant", r[r.Enum = 15] = "Enum", r[r.EnumMember = 16] = "EnumMember", r[r.Keyword = 17] = "Keyword", r[r.Text = 18] = "Text", r[r.Color = 19] = "Color", r[r.File = 20] = "File", r[r.Reference = 21] = "Reference", r[r.CustomColor = 22] = "CustomColor", r[r.Folder = 23] = "Folder", r[r.TypeParameter = 24] = "TypeParameter", r[r.User = 25] = "User", r[r.Issue = 26] = "Issue", r[r.Snippet = 27] = "Snippet", r))(ft || {});
class ye {
  constructor(t, e) {
    o(this, "Offset");
    o(this, "Word");
    this.Offset = t, this.Word = e;
  }
}
class yt extends u.Widget {
  constructor(e, i) {
    super();
    o(this, "_item");
    o(this, "_isSelected");
    o(this, "_iconPainter");
    o(this, "_paragraph");
    this._item = e, this._isSelected = i, this._iconPainter = new u.IconPainter(() => this.Invalidate(u.InvalidAction.Repaint));
  }
  Layout(e, i) {
    this.SetSize(e, i);
  }
  Paint(e, i = null) {
    var h;
    let n = 13, s = 2, l = 3;
    this._iconPainter.Paint(e, n, u.Colors.Gray, yt.GetIcon(this._item.Kind), s, l), (h = this._paragraph) != null || (this._paragraph = u.TextPainter.BuildParagraph(
      this._item.Label,
      Number.POSITIVE_INFINITY,
      n,
      u.Colors.Black,
      null,
      1,
      !0
    )), e.drawParagraph(this._paragraph, s + 20, l);
  }
  static GetIcon(e) {
    switch (e) {
      case ft.Function:
      case ft.Method:
        return u.Icons.Filled.Functions;
      case ft.Event:
        return u.Icons.Filled.Bolt;
      default:
        return u.Icons.Filled.Title;
    }
  }
}
const P = class {
  constructor(t, e) {
    o(this, "_controller");
    o(this, "_provider");
    o(this, "_completionStartOffset", -1);
    o(this, "_startByTriggerChar", !1);
    o(this, "_completionWindow");
    o(this, "_state", P.StateIdle);
    this._controller = t, this._provider = e;
  }
  RunCompletion(t) {
    if (this._provider == null)
      return;
    let e = this.GetWordAtPosition(this._controller.TextEditor.Caret.Position);
    if (this._state == P.StateShow)
      if (e == null)
        this.HideCompletionWindow();
      else {
        this.UpdateFilter();
        return;
      }
    if (e != null)
      this._completionStartOffset = e.Offset, this._startByTriggerChar = !1, this._state = P.StateShow, this.RunInternal(e.Word);
    else {
      let i = t.charCodeAt(t.length - 1);
      this._provider.TriggerCharacters.Contains(i) && (this._completionStartOffset = this._controller.TextEditor.Caret.Offset, this._startByTriggerChar = !0, this._state = P.StateShow, this.RunInternal(""));
    }
  }
  async RunInternal(t) {
    let e = await this._provider.ProvideCompletionItems(
      this._controller.Document,
      this._controller.TextEditor.Caret.Offset,
      t
    );
    this.ShowCompletionWindow(e, "");
  }
  GetWordAtPosition(t) {
    let e = this._controller.Document.GetLineSegment(t.Line), i = e.GetTokenAt(t.Column);
    if (i == null)
      return null;
    let n = G.GetTokenType(i);
    if (n == a.Comment || n == a.Constant || n == a.LiteralNumber || n == a.LiteralString || n == a.PunctuationBracket || n == a.PunctuationDelimiter || n == a.WhiteSpace || n == a.Operator)
      return null;
    let s = G.GetTokenStartColumn(i), l = t.Column - s;
    if (l <= 0)
      return null;
    let h = e.Offset + s, d = this._controller.Document.GetText(h, l);
    return new ye(h, d);
  }
  ShowCompletionWindow(t, e) {
    if (t == null || t.length == 0) {
      this._state = P.StateIdle;
      return;
    }
    this._completionWindow == null && (this._completionWindow = new u.ListPopup(
      this._controller.Widget.Overlay,
      P.BuildPopupItem,
      250,
      18,
      8
    ), this._completionWindow.OnSelectionChanged = this.OnCompletionDone.bind(this)), this._completionWindow.DataSource = t, this._completionWindow.TrySelectFirst();
    let i = this._controller.TextEditor.Caret, n = this._controller.TextEditor.TextView.FontHeight, s = this._controller.Widget.LocalToWindow(0, 0);
    this._completionWindow.UpdatePosition(
      i.CanvasPosX + s.X - 8,
      i.CanvasPosY + n + s.Y
    ), this._completionWindow.Show();
  }
  HideCompletionWindow() {
    var t;
    (t = this._completionWindow) == null || t.Hide(), this._state = P.StateIdle;
  }
  UpdateFilter() {
    var e, i;
    let t = this._controller.Document.GetText(
      this._completionStartOffset,
      this._controller.TextEditor.Caret.Offset - this._completionStartOffset
    );
    (e = this._completionWindow) == null || e.UpdateFilter((n) => n.Label.startsWith(t)), (i = this._completionWindow) == null || i.TrySelectFirst();
  }
  ClearFilter() {
    var t, e;
    (t = this._completionWindow) == null || t.ClearFilter(), (e = this._completionWindow) == null || e.TrySelectFirst();
  }
  OnCaretChangedByNoneTextInput() {
    if (this._state != P.StateSuspendHide) {
      this.HideCompletionWindow();
      return;
    }
    let t = this._controller.TextEditor.Caret;
    t.Offset <= this._completionStartOffset ? t.Offset == this._completionStartOffset && this._startByTriggerChar ? (this._state = P.StateShow, this.ClearFilter()) : this.HideCompletionWindow() : (this._state = P.StateShow, this.UpdateFilter());
  }
  PreProcessKeyDown(t) {
    this._state == P.StateShow && t.KeyCode == u.Keys.Back && (this._state = P.StateSuspendHide);
  }
  OnCompletionDone(t) {
    var e;
    this.HideCompletionWindow(), t != null && this._controller.TextEditor.InsertOrReplaceString(
      (e = t.InsertText) != null ? e : t.Label,
      this._controller.TextEditor.Caret.Offset - this._completionStartOffset
    );
  }
  static BuildPopupItem(t, e, i, n) {
    return new yt(t, n);
  }
};
let v = P;
o(v, "StateIdle", 0), o(v, "StateShow", 1), o(v, "StateSuspendHide", 2);
var Re = /* @__PURE__ */ ((r) => (r[r.InsertMode = 0] = "InsertMode", r[r.OverwriteMode = 1] = "OverwriteMode", r))(Re || {});
class Ge {
  constructor(t) {
    o(this, "_textEditor");
    o(this, "_line", 0);
    o(this, "_column", 0);
    o(this, "_caretPosX", 0);
    o(this, "_caretPosY", 0);
    o(this, "_currentPos", new L(-1, -1));
    o(this, "_desiredXPos", 0);
    o(this, "Mode", 0);
    o(this, "PositionChanged", new c.Event());
    this._textEditor = t;
  }
  get Line() {
    return this._line;
  }
  set Line(t) {
    this._line != t && (this._line = t, this.ValidateCaretPos(), this.UpdateCaretPosition(), this.OnPositionChanged());
  }
  get Column() {
    return this._column;
  }
  set Column(t) {
    this._column != t && (this._column = t, this.ValidateCaretPos(), this.UpdateCaretPosition(), this.OnPositionChanged());
  }
  get CanvasPosX() {
    return this._textEditor.TextView.Bounds.Left + this._caretPosX - this._textEditor.VirtualTop.X - 0.5;
  }
  get CanvasPosY() {
    return this._textEditor.TextView.Bounds.Top + this._caretPosY - this._textEditor.VirtualTop.Y;
  }
  get Position() {
    return new L(this._column, this._line);
  }
  set Position(t) {
    (this._line != t.Line || this._column != t.Column) && (this._line = t.Line, this._column = t.Column, this.UpdateCaretPosition(), this.OnPositionChanged());
  }
  get Offset() {
    return this._textEditor.Document.PositionToOffset(this.Position.Clone());
  }
  ValidatePosition(t) {
    let e = Math.max(0, Math.min(this._textEditor.Document.TotalNumberOfLines - 1, t.Line)), i = Math.max(0, t.Column);
    if (i >= L.MaxColumn || !this._textEditor.Document.TextEditorOptions.AllowCaretBeyondEOL) {
      let n = this._textEditor.Document.GetLineSegment(e);
      i = Math.min(i, n.Length);
    }
    return new L(i, e);
  }
  ValidateCaretPos() {
    if (this._line = Math.max(0, Math.min(this._textEditor.Document.TotalNumberOfLines - 1, this._line)), this._column = Math.max(0, this._column), this._column >= L.MaxColumn || !this._textEditor.Document.TextEditorOptions.AllowCaretBeyondEOL) {
      let t = this._textEditor.Document.GetLineSegment(this._line);
      this._column = Math.min(this._column, t.Length);
    }
  }
  UpdateCaretPosition() {
    this.ValidateCaretPos(), this._caretPosX = this._textEditor.TextView.GetDrawingXPos(this._line, this._column) + this._textEditor.VirtualTop.X, this._caretPosY = this._textEditor.Document.GetVisibleLine(this._line) * this._textEditor.TextView.FontHeight;
  }
  OnPositionChanged() {
    this.PositionChanged.Invoke();
  }
  Paint(t) {
    let e = this._textEditor.TextView.FontHeight, i = this._textEditor.TextView.Bounds.Clone(), n = this.CanvasPosX, s = this.CanvasPosY;
    if (n >= i.Left - 0.5) {
      let h = u.PaintUtils.Shared(this._textEditor.Theme.CaretColor);
      t.drawRect(u.Rect.FromLTWH(n, s, 2, e), h);
    }
    let l = u.PaintUtils.Shared(this._textEditor.Theme.LineHighlightColor);
    t.drawRect(
      u.Rect.FromLTWH(i.Left, s, i.Width, e),
      l
    );
  }
}
class Fe {
  constructor(t) {
    o(this, "_controller");
    o(this, "StartLine", 0);
    o(this, "EndLine", 0);
    this._controller = t;
  }
  Merge(t) {
  }
  GetRect() {
    return u.Rect.Empty;
  }
  IntersectsWith(t) {
    throw new c.NotSupportedException();
  }
  ToChild(t) {
    throw new c.NotSupportedException();
  }
}
class Ie {
  constructor() {
    o(this, "FontSize", 15);
    o(this, "LineSpace", 2);
    o(this, "CaretColor", u.Colors.Red);
    o(this, "LineHighlightColor", new u.Color(150, 150, 150, 20));
    o(this, "SelectionColor", new u.Color(167, 209, 255, 50));
    o(this, "TextBgColor", new u.Color(4281019179));
    o(this, "LineBgColor", new u.Color(4281414453));
    o(this, "BracketHighlightPaint", new CanvasKit.Paint());
    o(this, "LineNumberColor", new u.Color(4284506982));
    o(this, "TextStyle", u.MakeTextStyle({ color: new u.Color(4289312711), heightMultiplier: 1 }));
    o(this, "FoldedTextStyle", u.MakeTextStyle({
      color: new u.Color(4289312711),
      heightMultiplier: 1
    }));
    o(this, "_tokenErrorStyle", u.MakeTextStyle({ color: u.Colors.Red, heightMultiplier: 1 }));
    o(this, "_tokenTypeStyle", u.MakeTextStyle({
      color: new u.Color(4284996593),
      heightMultiplier: 1
    }));
    o(this, "_tokenNumberStyle", u.MakeTextStyle({
      color: new u.Color(4285109949),
      heightMultiplier: 1
    }));
    o(this, "_tokenStringStyle", u.MakeTextStyle({
      color: new u.Color(4288201593),
      heightMultiplier: 1
    }));
    o(this, "_tokenKeywordStyle", u.MakeTextStyle({
      color: new u.Color(4291590439),
      heightMultiplier: 1
    }));
    o(this, "_tokenCommentStyle", u.MakeTextStyle({
      color: new u.Color(4284454991),
      heightMultiplier: 1
    }));
    o(this, "_tokenVariableStyle", u.MakeTextStyle({
      color: new u.Color(4292897909),
      heightMultiplier: 1
    }));
    o(this, "_tokenFunctionStyle", u.MakeTextStyle({
      color: new u.Color(4294952803),
      heightMultiplier: 1
    }));
  }
  GetTokenStyle(t) {
    switch (t) {
      case a.Error:
        return this._tokenErrorStyle;
      case a.Type:
        return this._tokenTypeStyle;
      case a.BuiltinType:
        return this._tokenTypeStyle;
      case a.LiteralNumber:
        return this._tokenNumberStyle;
      case a.LiteralString:
        return this._tokenStringStyle;
      case a.Constant:
      case a.Keyword:
        return this._tokenKeywordStyle;
      case a.Comment:
        return this._tokenCommentStyle;
      case a.Variable:
        return this._tokenVariableStyle;
      case a.Function:
        return this._tokenFunctionStyle;
      default:
        return this.TextStyle;
    }
  }
}
class Me {
  constructor(t) {
    o(this, "Controller");
    o(this, "Caret");
    o(this, "SelectionManager");
    o(this, "TextView");
    o(this, "LeftAreas");
    o(this, "_virtualTop", u.Point.Empty.Clone());
    o(this, "PointerPos", u.Point.Empty.Clone());
    this.Controller = t, this.Controller.Document.UndoStack.TextEditor = this, this.Caret = new Ge(this), this.SelectionManager = new D(this), this.TextView = new Ee(this), this.LeftAreas = [new Oe(this), new Pe(this)];
  }
  get Theme() {
    return this.Controller.Theme;
  }
  get Document() {
    return this.Controller.Document;
  }
  get VirtualTop() {
    return this._virtualTop;
  }
  set VirtualTop(t) {
    let e = new u.Point(
      Math.max(0, t.X),
      Math.min(this.MaxVScrollValue, Math.max(0, t.Y))
    );
    c.OpInequality(this._virtualTop, e) && (this._virtualTop = e.Clone());
  }
  get MaxVScrollValue() {
    return (this.Document.GetVisibleLine(this.Document.TotalNumberOfLines - 1) + 1 + this.TextView.VisibleLineCount * 2 / 3) * this.TextView.FontHeight;
  }
  InsertOrReplaceString(t, e = 0) {
    this.Document.UndoStack.StartUndoGroup(), this.Document.TextEditorOptions.DocumentSelectionMode == Pt.Normal && this.SelectionManager.HasSomethingSelected && (this.Caret.Position = this.SelectionManager.SelectionCollection[0].StartPosition.Clone(), this.SelectionManager.RemoveSelectedText());
    let i = this.Document.GetLineSegment(this.Caret.Line);
    if (i.Length < this.Caret.Column) {
      let n = this.Caret.Column - i.Length;
      t = " ".repeat(n) + t;
    }
    e == 0 ? (this.Document.Insert(this.Caret.Offset, t), this.Caret.Position = this.Document.OffsetToPosition(this.Caret.Offset + t.length)) : (this.Document.Replace(this.Caret.Offset - e, e, t), e == t.length ? this.Caret.UpdateCaretPosition() : this.Caret.Position = new L(
      this.Caret.Position.Column - e + t.length,
      this.Caret.Position.Line
    )), this.Document.UndoStack.EndUndoGroup();
  }
  DeleteSelection() {
    this.SelectionManager.SelectionIsReadonly || (this.Caret.Position = this.SelectionManager.SelectionCollection[0].StartPosition.Clone(), this.SelectionManager.RemoveSelectedText());
  }
  Paint(t, e, i) {
    let n = 0, s = 0;
    for (const h of this.LeftAreas) {
      if (!h.IsVisible)
        continue;
      let d = u.Rect.FromLTWH(
        n,
        s,
        h.Size.Width,
        e.Height - s
      );
      c.OpInequality(d, h.Bounds) && (h.Bounds = d.Clone()), n += h.Bounds.Width, h.Paint(t, d.Clone());
    }
    let l = u.Rect.FromLTWH(
      n,
      s,
      e.Width - n,
      e.Height - s
    );
    c.OpInequality(l, this.TextView.Bounds) && (this.TextView.Bounds = l.Clone()), this.TextView.Paint(t, l.Clone());
  }
}
class ke extends u.Widget {
  constructor(e) {
    super();
    o(this, "_codeEditor");
    this._codeEditor = e;
  }
  Layout(e, i) {
    this.SetSize(0, 0);
  }
  Paint(e, i = null) {
    let n = this._codeEditor.Controller.TextEditor;
    e.save();
    let s = this._codeEditor.LocalToWindow(0, 0);
    e.translate(s.X, s.Y), e.clipRect(n.TextView.Bounds, CanvasKit.ClipOp.Intersect, !1), n.Caret.Paint(e);
    let l = n.TextView, h = u.PaintUtils.Shared(n.Theme.SelectionColor);
    for (const d of n.SelectionManager.SelectionCollection) {
      let f = d.StartPosition.Line, C = d.EndPosition.Line;
      for (let S = f; S <= C; S++) {
        if (!n.Document.FoldingManager.IsLineVisible(S))
          continue;
        let W = 0, R = 0;
        S == f && (W = l.GetDrawingXPos(S, d.StartPosition.Column)), S == C ? R = l.GetDrawingXPos(S, d.EndPosition.Column) : R = l.Bounds.Width;
        let X = l.Bounds.Top + n.Document.GetVisibleLine(S) * l.FontHeight - n.VirtualTop.Y;
        e.drawRect(u.Rect.FromLTWH(
          W + l.Bounds.Left,
          X,
          R - W,
          l.FontHeight
        ), h);
      }
    }
    e.restore();
  }
}
class _ extends u.WidgetController {
  constructor(e, i, n = null, s = null) {
    super();
    o(this, "Document");
    o(this, "TextEditor");
    o(this, "Theme");
    o(this, "_completionContext");
    o(this, "ContextMenuBuilder");
    o(this, "_editActions", new c.Dictionary().Init([
      [u.Keys.Left, new Le()],
      [u.Keys.Right, new Ce()],
      [u.Keys.Up, new me()],
      [u.Keys.Down, new Se()],
      [u.Keys.Back, new Te()],
      [u.Keys.Return, new pe()],
      [u.Keys.Tab, new _e()],
      [u.Keys.Control | u.Keys.C, new Jt()],
      [u.Keys.Control | u.Keys.X, new Zt()],
      [u.Keys.Control | u.Keys.V, new Et()],
      [u.Keys.Control | u.Keys.Z, new we()],
      [u.Keys.Control | u.Keys.Y, new xe()]
    ]));
    o(this, "_mouseDownPos", u.Point.Empty.Clone());
    o(this, "_gotMouseDown", !1);
    o(this, "_doDragDrop", !1);
    o(this, "_minSelection", L.Empty.Clone());
    o(this, "_maxSelection", L.Empty.Clone());
    o(this, "_caretChangedByTextInput", !1);
    this.Theme = new Ie(), this.Document = new Ht(e, s), this.TextEditor = new Me(this), this._completionContext = new v(this, n), this.Document.TextContent = i, this.Document.DocumentChanged.Add(this._OnDocumentChanged, this), this.TextEditor.Caret.PositionChanged.Add(this._OnCaretPositionChanged, this);
  }
  OnPointerDown(e) {
    this.TextEditor.PointerPos.X = e.X, this.TextEditor.PointerPos.Y = e.Y;
    for (const i of this.TextEditor.LeftAreas)
      i.Bounds.ContainsPoint(e.X, e.Y) && i.HandlePointerDown(e.X, e.Y, e.Buttons);
    this.TextEditor.TextView.Bounds.ContainsPoint(e.X, e.Y) && (this._gotMouseDown = !0, this.TextEditor.SelectionManager.SelectFrom.Where = O.TextArea, this._mouseDownPos = new u.Point(e.X, e.Y), this._minSelection = L.Empty.Clone(), this._maxSelection = L.Empty.Clone(), this.TextEditor.TextView.HandlePointerDown(e.X, e.Y, e.Buttons));
  }
  OnPointerUp(e) {
    this.TextEditor.SelectionManager.SelectFrom.Where = O.None, this._gotMouseDown = !1, this._mouseDownPos = new u.Point(-1, -1);
  }
  OnPointerMove(e) {
    this.TextEditor.PointerPos.X = e.X, this.TextEditor.PointerPos.Y = e.Y, e.Buttons == u.PointerButtons.Left && this._gotMouseDown && this.TextEditor.SelectionManager.SelectFrom.Where == O.TextArea && this.ExtendSelectionToPointer();
  }
  OnScroll(e, i) {
    let n = this.TextEditor.VirtualTop.X, s = this.TextEditor.VirtualTop.Y;
    this.TextEditor.VirtualTop = new u.Point(n + e, s + i);
    let l = new u.Offset(this.TextEditor.VirtualTop.X - n, this.TextEditor.VirtualTop.Y - s);
    return (l.Dx != 0 || l.Dy != 0) && this.Widget.RequestInvalidate(!0, null), l;
  }
  OnKeyDown(e) {
    let i;
    this._completionContext.PreProcessKeyDown(e), this._editActions.TryGetValue(Math.floor(e.KeyData) & 4294967295, new c.Out(() => i, (n) => i = n)) && (i.Execute(this.TextEditor), e.StopPropagate());
  }
  OnTextInput(e) {
    this._caretChangedByTextInput = !0;
    let i = e.length == 1 ? this.Document.SyntaxParser.Language.GetAutoColsingPairs(e.charCodeAt(0)) : null;
    if (i == null)
      this.TextEditor.InsertOrReplaceString(e, 0);
    else {
      this.TextEditor.InsertOrReplaceString(e + String.fromCharCode(i).repeat(1), 0);
      let n = this.TextEditor.Caret.Position.Clone();
      this.TextEditor.Caret.Position = new L(n.Column - 1, n.Line);
    }
    this._caretChangedByTextInput = !1, this._completionContext.RunCompletion(e);
  }
  ExtendSelectionToPointer() {
    let e = this.TextEditor.PointerPos.Clone(), i = this.TextEditor.TextView.GetLogicalPosition(
      Math.max(0, e.X - this.TextEditor.TextView.Bounds.Left),
      e.Y - this.TextEditor.TextView.Bounds.Top
    );
    i.Line;
    let n = this.TextEditor.Caret.Position.Clone();
    if (!(c.OpEquality(n, i) && this.TextEditor.SelectionManager.SelectFrom.Where != O.Gutter))
      if (this.TextEditor.SelectionManager.SelectFrom.Where == O.Gutter ? i.Line < this.TextEditor.SelectionManager.SelectionStart.Line ? this.TextEditor.Caret.Position = new L(0, i.Line) : this.TextEditor.Caret.Position = this.TextEditor.SelectionManager.NextValidPosition(i.Line) : this.TextEditor.Caret.Position = i.Clone(), !this._minSelection.IsEmpty && this.TextEditor.SelectionManager.HasSomethingSelected && this.TextEditor.SelectionManager.SelectFrom.Where == O.TextArea) {
        this.TextEditor.SelectionManager.SelectionCollection[0];
        let s = (D.GreaterEqPos(this._minSelection.Clone(), this._maxSelection.Clone()) ? this._maxSelection : this._minSelection).Clone(), l = (D.GreaterEqPos(this._minSelection.Clone(), this._maxSelection.Clone()) ? this._minSelection : this._maxSelection).Clone();
        if (D.GreaterEqPos(l.Clone(), i.Clone()) && D.GreaterEqPos(i.Clone(), s.Clone()))
          this.TextEditor.SelectionManager.SetSelection(s.Clone(), l.Clone());
        else if (D.GreaterEqPos(l.Clone(), i.Clone())) {
          let h = this.TextEditor.Document.PositionToOffset(i.Clone());
          s = this.TextEditor.Document.OffsetToPosition(_.FindWordStart(this.TextEditor.Document, h)), this.TextEditor.SelectionManager.SetSelection(s.Clone(), l.Clone());
        } else {
          let h = this.TextEditor.Document.PositionToOffset(i.Clone());
          l = this.TextEditor.Document.OffsetToPosition(_.FindWordEnd(this.TextEditor.Document, h)), this.TextEditor.SelectionManager.SetSelection(s.Clone(), l.Clone());
        }
      } else
        this.TextEditor.SelectionManager.ExtendSelection(n.Clone(), this.TextEditor.Caret.Position.Clone());
  }
  _OnDocumentChanged(e) {
    this.Widget.RequestInvalidate(!0, null);
  }
  _OnCaretPositionChanged() {
    this._caretChangedByTextInput || this._completionContext.OnCaretChangedByNoneTextInput(), this.Widget.RequestInvalidate(!1, null);
  }
  SetCaret(e, i) {
    this.TextEditor.Caret.Position = new L(i, e);
  }
  SetSelection(e, i) {
    this.TextEditor.SelectionManager.SetSelection(e.Clone(), i.Clone());
  }
  static IsSelectableChar(e) {
    return !_.IsWhiteSpace(e);
  }
  static IsWhiteSpace(e) {
    return e == 32;
  }
  static FindWordStart(e, i) {
    let n = e.GetLineSegmentForOffset(i);
    if (i > 0 && _.IsWhiteSpace(e.GetCharAt(i - 1)) && _.IsWhiteSpace(e.GetCharAt(i)))
      for (; i > n.Offset && _.IsWhiteSpace(e.GetCharAt(i - 1)); )
        --i;
    else if (_.IsSelectableChar(e.GetCharAt(i)) || i > 0 && _.IsWhiteSpace(e.GetCharAt(i)) && _.IsSelectableChar(e.GetCharAt(i - 1)))
      for (; i > n.Offset && _.IsSelectableChar(e.GetCharAt(i - 1)); )
        --i;
    else if (i > 0 && !_.IsWhiteSpace(e.GetCharAt(i - 1)) && !_.IsSelectableChar(e.GetCharAt(i - 1)))
      return Math.max(0, i - 1);
    return i;
  }
  static FindWordEnd(e, i) {
    let n = e.GetLineSegmentForOffset(i);
    if (n.Length == 0)
      return i;
    let s = n.Offset + n.Length;
    if (i = Math.min(i, s - 1), _.IsSelectableChar(e.GetCharAt(i)))
      for (; i < s && _.IsSelectableChar(e.GetCharAt(i)); )
        ++i;
    else if (_.IsWhiteSpace(e.GetCharAt(i))) {
      if (i > 0 && _.IsWhiteSpace(e.GetCharAt(i - 1)))
        for (; i < s && _.IsWhiteSpace(e.GetCharAt(i)); )
          ++i;
    } else
      return Math.max(0, i + 1);
    return i;
  }
}
var ht, ut;
class pt extends u.Widget {
  constructor(e) {
    super();
    o(this, "Controller");
    o(this, "_decoration");
    x(this, ht, void 0);
    x(this, ut, void 0);
    this.MouseRegion = new u.MouseRegion(), this.FocusNode = new u.FocusNode(), this.Controller = e, this.Controller.AttachWidget(this), this._decoration = new ke(this), this.MouseRegion.PointerDown.Add(this.Controller.OnPointerDown, this.Controller), this.MouseRegion.PointerUp.Add(this.Controller.OnPointerUp, this.Controller), this.MouseRegion.PointerMove.Add(this.Controller.OnPointerMove, this.Controller), this.FocusNode.FocusChanged.Add(this._OnFocusChanged, this), this.FocusNode.KeyDown.Add(this.Controller.OnKeyDown, this.Controller), this.FocusNode.TextInput.Add(this.Controller.OnTextInput, this.Controller);
  }
  get MouseRegion() {
    return w(this, ht);
  }
  set MouseRegion(e) {
    E(this, ht, e);
  }
  get FocusNode() {
    return w(this, ut);
  }
  set FocusNode(e) {
    E(this, ut, e);
  }
  get ScrollOffsetX() {
    return this.Controller.TextEditor.VirtualTop.X;
  }
  get ScrollOffsetY() {
    return this.Controller.TextEditor.VirtualTop.Y;
  }
  RequestInvalidate(e, i) {
    e ? this.Invalidate(u.InvalidAction.Repaint, i) : this._decoration.Invalidate(u.InvalidAction.Repaint);
  }
  _OnFocusChanged(e) {
    e ? this.Root.Window.StartTextInput() : this.Root.Window.StopTextInput();
  }
  OnScroll(e, i) {
    return this.Controller.OnScroll(e, i);
  }
  OnMounted() {
    this.Overlay.Show(this._decoration), super.OnMounted();
  }
  OnUnmounted() {
    this._decoration.Parent != null && this._decoration.Parent.Remove(this._decoration), super.OnUnmounted();
  }
  get IsOpaque() {
    return !0;
  }
  Layout(e, i) {
    let n = this.CacheAndCheckAssignWidth(e), s = this.CacheAndCheckAssignHeight(i);
    this.SetSize(n, s);
  }
  Paint(e, i = null) {
    let n = u.Rect.FromLTWH(0, 0, this.W, this.H);
    e.save(), e.clipRect(n, CanvasKit.ClipOp.Intersect, !1), this.Controller.TextEditor.Paint(e, new u.Size(this.W, this.H), i), e.restore();
  }
}
ht = new WeakMap(), ut = new WeakMap(), o(pt, "$meta_PixUI_IMouseRegion", !0), o(pt, "$meta_PixUI_IFocusable", !0), o(pt, "$meta_PixUI_IScrollable", !0);
class Kt {
  static Init(t) {
    this._csharp = t;
  }
  static Get() {
    return this._csharp;
  }
}
o(Kt, "_csharp");
export {
  fe as AnchorMovementType,
  Te as BackspaceCommand,
  ce as BracketHighlightingStyle,
  Ut as BracketMatchingStyle,
  z as CSharpLanguage,
  ie as CachedFoldInfo,
  Ge as Caret,
  Se as CaretDown,
  Le as CaretLeft,
  Re as CaretMode,
  Ce as CaretRight,
  me as CaretUp,
  _ as CodeEditorController,
  pt as CodeEditorWidget,
  G as CodeToken,
  St as ColumnRange,
  v as CompletionContext,
  ft as CompletionItemKind,
  yt as CompletionItemWidget,
  ye as CompletionWord,
  F as CompositeNode,
  Jt as CopyCommand,
  be as CustomEditCommand,
  Zt as CutCommand,
  ee as DeferredEventList,
  Tt as DelimiterSegment,
  Fe as DirtyLines,
  Ht as Document,
  dt as DocumentEventArgs,
  Pt as DocumentSelectionMode,
  Ot as EditorArea,
  ke as EditorDecorator,
  H as EndComparer,
  Pe as FoldArea,
  Lt as FoldMarker,
  gt as FoldType,
  te as FoldingManager,
  Oe as GutterArea,
  k as ImmutableText,
  $t as ImmutableTextBuffer,
  vt as IndentStyle,
  zt as InnerLeaf,
  b as LeafNode,
  oe as LineCountChangeEventArgs,
  Ae as LineEventArgs,
  re as LineLengthChangeEventArgs,
  Ct as LineManager,
  At as LineSegment,
  ne as LineSegmentTree,
  Wt as LineViewerStyle,
  V as LinesEnumerator,
  _t as LogicalColumnInfo,
  Nt as Node,
  Yt as ParserInput,
  Et as PasteCommand,
  Bt as RBHost,
  bt as RBNode,
  q as RedBlackTree,
  M as RedBlackTreeIterator,
  Vt as RedBlackTreeNode,
  xe as RedoCommand,
  pe as ReturnCommand,
  jt as SelectFrom,
  Qt as Selection,
  D as SelectionManager,
  Y as StartComparer,
  B as SyntaxParser,
  Kt as TSCSharpLanguage,
  xt as TSEdit,
  p as TSPoint,
  _e as TabCommand,
  wt as TextAnchor,
  Me as TextEditor,
  ge as TextEditorOptions,
  Ie as TextEditorTheme,
  L as TextLocation,
  ct as TextUtils,
  Ee as TextView,
  a as TokenType,
  we as UndoCommand,
  le as UndoQueue,
  se as UndoStack,
  ae as UndoableDelete,
  he as UndoableInsert,
  ue as UndoableReplace,
  de as UndoableSetCaretPosition,
  O as WhereFrom
};
