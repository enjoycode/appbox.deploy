var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateWrapper = (obj, member, setter, getter) => {
  return {
    set _(value) {
      __privateSet(obj, member, value, setter);
    },
    get _() {
      return __privateGet(obj, member, getter);
    }
  };
};
var __provider, __socket, __connectDone, __msgIdIndex, __sessionId, __name;
import { BytesInputStream, BytesOutputStream, Entity } from "/AppBoxCore.js";
import { RxObject, RxProperty, ObjectNotifier } from "/PixUI.js";
class Channel {
  static get SessionId() {
    return __privateGet(this, __provider).SessionId;
  }
  static Init(provider) {
    __privateSet(this, __provider, provider);
  }
  static Login(user, password, external) {
    return __privateGet(this, __provider).Login(user, password, external);
  }
  static Invoke(service, args, entityFactories) {
    return __privateGet(this, __provider).Invoke(service, args, entityFactories);
  }
}
__provider = new WeakMap();
__privateAdd(Channel, __provider, void 0);
var InvokeErrorCode = /* @__PURE__ */ ((InvokeErrorCode2) => {
  InvokeErrorCode2[InvokeErrorCode2["None"] = 0] = "None";
  InvokeErrorCode2[InvokeErrorCode2["DeserializeRequestFail"] = 1] = "DeserializeRequestFail";
  InvokeErrorCode2[InvokeErrorCode2["ServiceNotExists"] = 2] = "ServiceNotExists";
  InvokeErrorCode2[InvokeErrorCode2["ServiceInnerError"] = 3] = "ServiceInnerError";
  InvokeErrorCode2[InvokeErrorCode2["SessionNotExists"] = 4] = "SessionNotExists";
  InvokeErrorCode2[InvokeErrorCode2["SerializeResponseFail"] = 5] = "SerializeResponseFail";
  InvokeErrorCode2[InvokeErrorCode2["Timeout"] = 6] = "Timeout";
  InvokeErrorCode2[InvokeErrorCode2["SendRequestFail"] = 10] = "SendRequestFail";
  InvokeErrorCode2[InvokeErrorCode2["DeserializeResponseFail"] = 11] = "DeserializeResponseFail";
  return InvokeErrorCode2;
})(InvokeErrorCode || {});
var MessageType = /* @__PURE__ */ ((MessageType2) => {
  MessageType2[MessageType2["Event"] = 3] = "Event";
  MessageType2[MessageType2["LoginRequest"] = 5] = "LoginRequest";
  MessageType2[MessageType2["LoginResponse"] = 6] = "LoginResponse";
  MessageType2[MessageType2["InvokeRequest"] = 10] = "InvokeRequest";
  MessageType2[MessageType2["InvokeResponse"] = 11] = "InvokeResponse";
  return MessageType2;
})(MessageType || {});
class WebChannel {
  constructor() {
    __privateAdd(this, __socket, void 0);
    __privateAdd(this, __connectDone, void 0);
    __privateAdd(this, __msgIdIndex, 0);
    __publicField(this, "waitHandles", /* @__PURE__ */ new Map());
    __privateAdd(this, __sessionId, void 0);
    __privateAdd(this, __name, void 0);
  }
  get SessionId() {
    return __privateGet(this, __sessionId);
  }
  get Name() {
    return __privateGet(this, __name);
  }
  Connect() {
    let scheme = document.location.protocol === "https:" ? "wss" : "ws";
    let port = document.location.port ? ":" + document.location.port : "";
    let connectionUrl = scheme + "://" + document.location.hostname + port + "/ws";
    console.log("Start connect to : " + connectionUrl);
    __privateSet(this, __socket, new WebSocket(connectionUrl));
    __privateGet(this, __socket).binaryType = "arraybuffer";
    __privateGet(this, __socket).onmessage = (e) => this.OnMessage(e);
    __privateSet(this, __connectDone, new Promise((resolve, reject) => {
      __privateGet(this, __socket).onopen = (e) => {
        console.log("WebSocket connect done.");
        resolve();
      };
      __privateGet(this, __socket).onclose = (e) => {
        if (e.code === 1006) {
          console.warn("WebSocket connect failed.");
          reject();
        } else if (e.code !== 1e3) {
          console.warn("\u8FDE\u63A5\u5173\u95ED, \u8BF7\u91CD\u65B0\u767B\u5F55");
        }
        __privateSet(this, __socket, null);
        __privateSet(this, __connectDone, null);
      };
    }));
    return __privateGet(this, __connectDone);
  }
  OnMessage(event) {
    if (event.data instanceof ArrayBuffer) {
      let rs = new BytesInputStream(event.data);
      let msgType = rs.ReadByte();
      if (msgType == MessageType.InvokeResponse) {
        this.ProcessInvokeResponse(rs);
      } else if (msgType == MessageType.LoginResponse) {
        this.ProcessLoginResponse(rs);
      } else if (msgType == MessageType.Event)
        ;
      else {
        console.warn("Receive unknown message type:", msgType);
      }
    } else {
      console.warn("Receive none binary message: ", event.data);
    }
  }
  ProcessLoginResponse(stream) {
    const reqMsgId = stream.ReadInt();
    const loginOk = stream.ReadBool();
    if (loginOk) {
      __privateSet(this, __sessionId, stream.ReadInt());
      __privateSet(this, __name, stream.ReadString());
      this.SetResponse(reqMsgId, InvokeErrorCode.None, void 0);
    } else {
      let errorMsg = stream.ReadString();
      this.SetResponse(reqMsgId, InvokeErrorCode.ServiceInnerError, errorMsg);
    }
  }
  ProcessInvokeResponse(stream) {
    let reqMsgId = stream.ReadInt();
    let errorCode = stream.ReadByte();
    let result;
    let waitHandler = this.waitHandles.get(reqMsgId);
    stream.EntityFactories = waitHandler.Ef;
    if (stream.Remaining > 0) {
      try {
        result = stream.Deserialize();
      } catch (error) {
        errorCode = InvokeErrorCode.DeserializeResponseFail;
        result = error;
      }
    }
    this.SetResponse(reqMsgId, errorCode, result);
  }
  SetResponse(reqId, error, result) {
    let waitHandler = this.waitHandles.get(reqId);
    if (!waitHandler) {
      console.warn("Request has time out");
      return;
    }
    this.waitHandles.delete(reqId);
    const cb = waitHandler.Cb;
    if (error != InvokeErrorCode.None) {
      cb(error.toString() + ":" + result, null);
    } else {
      cb(null, result);
    }
  }
  MakeMsgId() {
    __privateWrapper(this, __msgIdIndex)._++;
    if (__privateGet(this, __msgIdIndex) > 2147483647) {
      __privateSet(this, __msgIdIndex, 0);
    }
    return __privateGet(this, __msgIdIndex);
  }
  async SendMessage(data) {
    if (!__privateGet(this, __socket) || __privateGet(this, __socket).readyState !== WebSocket.OPEN) {
      if (__privateGet(this, __socket) && __privateGet(this, __socket).readyState === WebSocket.CONNECTING) {
        await __privateGet(this, __connectDone);
      } else {
        await this.Connect();
      }
    }
    try {
      __privateGet(this, __socket).send(data);
    } catch (error) {
      console.error("WebSocket\u53D1\u9001\u6570\u636E\u9519\u8BEF: " + error);
    }
  }
  MakePromise(reqId, entityFactories) {
    let waitHandler = { Cb: null, Ef: entityFactories };
    let promise = new Promise((resolve, reject) => {
      waitHandler.Cb = (err, res) => {
        if (err)
          reject(err);
        else
          resolve(res);
      };
    });
    this.waitHandles.set(reqId, waitHandler);
    return promise;
  }
  async Login(user, password, external) {
    const msgId = this.MakeMsgId();
    let promise = this.MakePromise(msgId);
    let ws = new BytesOutputStream();
    ws.WriteByte(MessageType.LoginRequest);
    ws.WriteInt(msgId);
    ws.WriteString(user);
    ws.WriteString(password);
    await this.SendMessage(ws.Bytes);
    return promise;
  }
  Logout() {
    return Promise.resolve();
  }
  async Invoke(service, args, entityFactories) {
    const msgId = this.MakeMsgId();
    let promise = this.MakePromise(msgId, entityFactories);
    let ws = new BytesOutputStream();
    ws.WriteByte(MessageType.InvokeRequest);
    ws.WriteInt(msgId);
    ws.WriteString(service);
    if (args) {
      for (const arg of args) {
        ws.Serialize(arg);
      }
    }
    await this.SendMessage(ws.Bytes);
    return promise;
  }
}
__socket = new WeakMap();
__connectDone = new WeakMap();
__msgIdIndex = new WeakMap();
__sessionId = new WeakMap();
__name = new WeakMap();
class RxEntity extends RxObject {
  constructor(empty) {
    super();
    __publicField(this, "_ds");
    this._ds = /* @__PURE__ */ new Map();
    this._target = empty;
    this._target.PropertyChanged.Add(this.OnTargetPropertyChanged, this);
  }
  Observe(memberId, getter, setter) {
    let state = this._ds.get(memberId);
    if (state)
      return state;
    let proxy = new RxProperty(() => getter(this._target), (v) => setter(this._target, v), false);
    this._ds.set(memberId, proxy);
    return proxy;
  }
  OnTargetPropertyChanged(memberId) {
    let state = this._ds.get(memberId);
    state == null ? void 0 : state.NotifyValueChanged();
  }
  OnTargetChanged(old) {
    old.PropertyChanged.Remove(this.OnTargetPropertyChanged, this);
    this._target.PropertyChanged.Add(this.OnTargetPropertyChanged, this);
    this._ds.forEach((state) => {
      state.NotifyValueChanged();
    });
  }
}
const initializeAppBoxClient = () => {
  Object.defineProperty(Entity.prototype, "Observe", {
    value: function Observe(memberId, getter, setter) {
      let rxMember = new RxProperty(() => getter(this), (v) => setter(this, v));
      this.PropertyChanged.Add((mid) => {
        if (mid === memberId)
          rxMember.NotifyValueChanged();
      });
      return rxMember;
    },
    writable: true,
    configurable: true
  });
  Object.defineProperty(ObjectNotifier.prototype, "BindToRxEntity", {
    value: function BindToRxEntity(rxEntity) {
      this.OnChange = (t) => {
        rxEntity.Target = t;
      };
    },
    writable: true,
    configurable: true
  });
};
export { Channel, RxEntity, WebChannel, initializeAppBoxClient };
