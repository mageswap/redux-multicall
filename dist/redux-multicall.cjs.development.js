'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRedux = require('react-redux');
var bignumber = require('@ethersproject/bignumber');
var toolkit = require('@reduxjs/toolkit');

var DEFAULT_BLOCKS_PER_FETCH = 1;
var DEFAULT_CALL_GAS_REQUIRED = 1000000;
var DEFAULT_CHUNK_GAS_REQUIRED = 200000;
var CHUNK_GAS_LIMIT = 100000000;
var CONSERVATIVE_BLOCK_GAS_LIMIT = 10000000; // conservative, hard-coded estimate of the current block gas limit
// Consts for hooks
var INVALID_RESULT = {
  valid: false,
  blockNumber: undefined,
  data: undefined
};
var NEVER_RELOAD = {
  blocksPerFetch: Infinity
};
var INVALID_CALL_STATE = {
  valid: false,
  result: undefined,
  loading: false,
  syncing: false,
  error: false
};
var LOADING_CALL_STATE = {
  valid: true,
  result: undefined,
  loading: true,
  syncing: true,
  error: false
};

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function toCallKey(call) {
  var key = call.address + "-" + call.callData;
  if (call.gasRequired) {
    if (!Number.isSafeInteger(call.gasRequired)) {
      throw new Error("Invalid number: " + call.gasRequired);
    }
    key += "-" + call.gasRequired;
  }
  return key;
}
function parseCallKey(callKey) {
  var pcs = callKey.split('-');
  if (![2, 3].includes(pcs.length)) {
    throw new Error("Invalid call key: " + callKey);
  }
  return _extends({
    address: pcs[0],
    callData: pcs[1]
  }, pcs[2] ? {
    gasRequired: Number.parseInt(pcs[2])
  } : {});
}
function callsToCallKeys(calls) {
  var _calls$filter$map$sor, _calls$filter, _calls$filter$map;
  return (_calls$filter$map$sor = calls == null ? void 0 : (_calls$filter = calls.filter(function (c) {
    return Boolean(c);
  })) == null ? void 0 : (_calls$filter$map = _calls$filter.map(toCallKey)) == null ? void 0 : _calls$filter$map.sort()) != null ? _calls$filter$map$sor : [];
}
function callKeysToCalls(callKeys) {
  if (!(callKeys != null && callKeys.length)) return null;
  return callKeys.map(function (key) {
    return parseCallKey(key);
  });
}

// Converts CallResult[] to CallState[], only updating if call states have changed.
// Ensures that CallState results remain referentially stable when unchanged, preventing
// spurious re-renders which would otherwise occur because mapping always creates a new object.
function useCallStates(results, contractInterface, fragment, latestBlockNumber) {
  // Avoid refreshing the results with every changing block number (eg latestBlockNumber).
  // Instead, only refresh the results if they need to be synced - if there is a result which is stale, for which blockNumber < latestBlockNumber.
  var syncingBlockNumber = React.useMemo(function () {
    var lowestBlockNumber = results.reduce(function (memo, result) {
      return result.blockNumber ? Math.min(memo != null ? memo : result.blockNumber, result.blockNumber) : memo;
    }, undefined);
    return Math.max(lowestBlockNumber != null ? lowestBlockNumber : 0, latestBlockNumber != null ? latestBlockNumber : 0);
  }, [results, latestBlockNumber]);
  return React.useMemo(function () {
    return results.map(function (result, i) {
      var resultFragment = typeof fragment === 'function' ? fragment(i) : fragment;
      return toCallState(result, contractInterface, resultFragment, syncingBlockNumber);
    });
  }, [contractInterface, fragment, results, syncingBlockNumber]);
}
function toCallState(callResult, contractInterface, fragment, syncingBlockNumber) {
  if (!callResult || !callResult.valid) {
    return INVALID_CALL_STATE;
  }
  var data = callResult.data,
    blockNumber = callResult.blockNumber;
  if (!blockNumber || !contractInterface || !fragment || !syncingBlockNumber) {
    return LOADING_CALL_STATE;
  }
  var success = data && data.length > 2;
  var syncing = blockNumber < syncingBlockNumber;
  var result = undefined;
  if (success && data) {
    try {
      result = contractInterface.decodeFunctionResult(fragment, data);
    } catch (error) {
      console.debug('Result data parsing failed', fragment, data);
      return {
        valid: true,
        loading: false,
        error: true,
        syncing: syncing,
        result: result
      };
    }
  }
  return {
    valid: true,
    loading: false,
    syncing: syncing,
    result: result,
    error: !success
  };
}

function isMethodArg(x) {
  return bignumber.BigNumber.isBigNumber(x) || ['string', 'number'].indexOf(typeof x) !== -1;
}
function isValidMethodArgs(x) {
  return x === undefined || Array.isArray(x) && x.every(function (xi) {
    return isMethodArg(xi) || Array.isArray(xi) && xi.every(isMethodArg);
  });
}

// the lowest level call for subscribing to contract data
function useCallsDataSubscription(context, chainId, calls, listenerOptions) {
  var reducerPath = context.reducerPath,
    actions = context.actions;
  var callResults = reactRedux.useSelector(function (state) {
    return state[reducerPath].callResults;
  });
  var defaultListenerOptions = reactRedux.useSelector(function (state) {
    return state[reducerPath].listenerOptions;
  });
  var dispatch = reactRedux.useDispatch();
  var serializedCallKeys = React.useMemo(function () {
    return JSON.stringify(callsToCallKeys(calls));
  }, [calls]);
  // update listeners when there is an actual change that persists for at least 100ms
  React.useEffect(function () {
    var _chainId, _ref, _listenerOptions$bloc;
    var callKeys = JSON.parse(serializedCallKeys);
    var calls = callKeysToCalls(callKeys);
    if (!chainId || !calls) return;
    var blocksPerFetchFromState = (_chainId = (defaultListenerOptions != null ? defaultListenerOptions : {})[chainId]) == null ? void 0 : _chainId.blocksPerFetch;
    var blocksPerFetchForChain = (_ref = (_listenerOptions$bloc = listenerOptions == null ? void 0 : listenerOptions.blocksPerFetch) != null ? _listenerOptions$bloc : blocksPerFetchFromState) != null ? _ref : DEFAULT_BLOCKS_PER_FETCH;
    dispatch(actions.addMulticallListeners({
      chainId: chainId,
      calls: calls,
      options: {
        blocksPerFetch: blocksPerFetchForChain
      }
    }));
    return function () {
      dispatch(actions.removeMulticallListeners({
        chainId: chainId,
        calls: calls,
        options: {
          blocksPerFetch: blocksPerFetchForChain
        }
      }));
    };
  }, [actions, chainId, dispatch, listenerOptions, serializedCallKeys, defaultListenerOptions]);
  var lastResults = React.useRef([]);
  return React.useMemo(function () {
    var isChanged = lastResults.current.length !== calls.length;
    // Construct results using a for-loop to handle sparse arrays.
    // Array.prototype.map would skip empty entries.
    var results = [];
    for (var i = 0; i < calls.length; ++i) {
      var call = calls[i];
      var result = INVALID_RESULT;
      if (chainId && call) {
        var _callResults$chainId;
        var callResult = (_callResults$chainId = callResults[chainId]) == null ? void 0 : _callResults$chainId[toCallKey(call)];
        result = {
          valid: true,
          data: callResult != null && callResult.data && callResult.data !== '0x' ? callResult.data : undefined,
          blockNumber: callResult == null ? void 0 : callResult.blockNumber
        };
      }
      isChanged = isChanged || !areCallResultsEqual(result, lastResults.current[i]);
      results.push(result);
    }
    // Force the results to be referentially stable if they have not changed.
    // This is necessary because *all* callResults are passed as deps when initially memoizing the results.
    if (isChanged) {
      lastResults.current = results;
    }
    return lastResults.current;
  }, [callResults, calls, chainId]);
}
function areCallResultsEqual(a, b) {
  return a.valid === b.valid && a.data === b.data && a.blockNumber === b.blockNumber;
}
// Similar to useCallsDataSubscription above but for subscribing to
// calls to multiple chains at once
function useMultichainCallsDataSubscription(context, chainToCalls, listenerOptions) {
  var reducerPath = context.reducerPath,
    actions = context.actions;
  var callResults = reactRedux.useSelector(function (state) {
    return state[reducerPath].callResults;
  });
  var defaultListenerOptions = reactRedux.useSelector(function (state) {
    return state[reducerPath].listenerOptions;
  });
  var dispatch = reactRedux.useDispatch();
  var serializedCallKeys = React.useMemo(function () {
    var sortedChainIds = getChainIds(chainToCalls).sort();
    var chainCallKeysTuple = sortedChainIds.map(function (chainId) {
      var calls = chainToCalls[chainId];
      var callKeys = callsToCallKeys(calls);
      // Note, using a tuple to ensure consistent order when serialized
      return [chainId, callKeys];
    });
    return JSON.stringify(chainCallKeysTuple);
  }, [chainToCalls]);
  React.useEffect(function () {
    var chainCallKeysTuples = JSON.parse(serializedCallKeys);
    if (!(chainCallKeysTuples != null && chainCallKeysTuples.length)) return;
    reactRedux.batch(function () {
      for (var _iterator = _createForOfIteratorHelperLoose(chainCallKeysTuples), _step; !(_step = _iterator()).done;) {
        var _chainId2, _ref2, _listenerOptions$bloc2;
        var _step$value = _step.value,
          chainId = _step$value[0],
          callKeys = _step$value[1];
        var calls = callKeysToCalls(callKeys);
        if (!(calls != null && calls.length)) continue;
        var blocksPerFetchFromState = (_chainId2 = (defaultListenerOptions != null ? defaultListenerOptions : {})[chainId]) == null ? void 0 : _chainId2.blocksPerFetch;
        var blocksPerFetchForChain = (_ref2 = (_listenerOptions$bloc2 = listenerOptions == null ? void 0 : listenerOptions.blocksPerFetch) != null ? _listenerOptions$bloc2 : blocksPerFetchFromState) != null ? _ref2 : DEFAULT_BLOCKS_PER_FETCH;
        dispatch(actions.addMulticallListeners({
          chainId: chainId,
          calls: calls,
          options: {
            blocksPerFetch: blocksPerFetchForChain
          }
        }));
      }
    });
    return function () {
      reactRedux.batch(function () {
        for (var _iterator2 = _createForOfIteratorHelperLoose(chainCallKeysTuples), _step2; !(_step2 = _iterator2()).done;) {
          var _chainId3, _ref3, _listenerOptions$bloc3;
          var _step2$value = _step2.value,
            chainId = _step2$value[0],
            callKeys = _step2$value[1];
          var calls = callKeysToCalls(callKeys);
          if (!(calls != null && calls.length)) continue;
          var blocksPerFetchFromState = (_chainId3 = (defaultListenerOptions != null ? defaultListenerOptions : {})[chainId]) == null ? void 0 : _chainId3.blocksPerFetch;
          var blocksPerFetchForChain = (_ref3 = (_listenerOptions$bloc3 = listenerOptions == null ? void 0 : listenerOptions.blocksPerFetch) != null ? _listenerOptions$bloc3 : blocksPerFetchFromState) != null ? _ref3 : DEFAULT_BLOCKS_PER_FETCH;
          dispatch(actions.removeMulticallListeners({
            chainId: chainId,
            calls: calls,
            options: {
              blocksPerFetch: blocksPerFetchForChain
            }
          }));
        }
      });
    };
  }, [actions, dispatch, listenerOptions, serializedCallKeys, defaultListenerOptions]);
  return React.useMemo(function () {
    return getChainIds(chainToCalls).reduce(function (result, chainId) {
      var calls = chainToCalls[chainId];
      result[chainId] = calls.map(function (call) {
        var _callResults$chainId2;
        if (!chainId || !call) return INVALID_RESULT;
        var result = (_callResults$chainId2 = callResults[chainId]) == null ? void 0 : _callResults$chainId2[toCallKey(call)];
        var data = result != null && result.data && result.data !== '0x' ? result.data : undefined;
        return {
          valid: true,
          data: data,
          blockNumber: result == null ? void 0 : result.blockNumber
        };
      });
      return result;
    }, {});
  }, [callResults, chainToCalls]);
}
// formats many calls to a single function on a single contract, with the function name and inputs specified
function useSingleContractMultipleData(context, chainId, latestBlockNumber, contract, methodName, callInputs, options) {
  var _ref4 = options != null ? options : {},
    gasRequired = _ref4.gasRequired;
  // Create ethers function fragment
  var fragment = React.useMemo(function () {
    var _contract$interface;
    return contract == null ? void 0 : (_contract$interface = contract["interface"]) == null ? void 0 : _contract$interface.getFunction(methodName);
  }, [contract, methodName]);
  // Get encoded call data. Note can't use useCallData below b.c. this is  for a list of CallInputs
  var callDatas = React.useMemo(function () {
    if (!contract || !fragment) return [];
    return callInputs.map(function (callInput) {
      return isValidMethodArgs(callInput) ? contract["interface"].encodeFunctionData(fragment, callInput) : undefined;
    });
  }, [callInputs, contract, fragment]);
  // Create call objects
  var calls = React.useMemo(function () {
    if (!contract) return [];
    return callDatas.map(function (callData) {
      if (!callData) return undefined;
      return {
        address: contract.address,
        callData: callData,
        gasRequired: gasRequired
      };
    });
  }, [contract, callDatas, gasRequired]);
  // Subscribe to call data
  var results = useCallsDataSubscription(context, chainId, calls, options);
  return useCallStates(results, contract == null ? void 0 : contract["interface"], fragment, latestBlockNumber);
}
function useMultipleContractSingleData(context, chainId, latestBlockNumber, addresses, contractInterface, methodName, callInputs, options) {
  var _ref5 = options != null ? options : {},
    gasRequired = _ref5.gasRequired;
  var _useCallData = useCallData(methodName, contractInterface, callInputs),
    fragment = _useCallData.fragment,
    callData = _useCallData.callData;
  // Create call objects
  var calls = React.useMemo(function () {
    if (!callData) return [];
    return addresses.map(function (address) {
      if (!address) return undefined;
      return {
        address: address,
        callData: callData,
        gasRequired: gasRequired
      };
    });
  }, [addresses, callData, gasRequired]);
  // Subscribe to call data
  var results = useCallsDataSubscription(context, chainId, calls, options);
  return useCallStates(results, contractInterface, fragment, latestBlockNumber);
}
function useSingleCallResult(context, chainId, latestBlockNumber, contract, methodName, inputs, options) {
  var _useSingleContractMul;
  var callInputs = React.useMemo(function () {
    return [inputs];
  }, [inputs]);
  return (_useSingleContractMul = useSingleContractMultipleData(context, chainId, latestBlockNumber, contract, methodName, callInputs, options)[0]) != null ? _useSingleContractMul : INVALID_CALL_STATE;
}
// formats many calls to any number of functions on a single contract, with only the calldata specified
function useSingleContractWithCallData(context, chainId, latestBlockNumber, contract, callDatas, options) {
  var _ref6 = options != null ? options : {},
    gasRequired = _ref6.gasRequired;
  // Create call objects
  var calls = React.useMemo(function () {
    if (!contract) return [];
    return callDatas.map(function (callData) {
      return {
        address: contract.address,
        callData: callData,
        gasRequired: gasRequired
      };
    });
  }, [callDatas, contract, gasRequired]);
  // Subscribe to call data
  var results = useCallsDataSubscription(context, chainId, calls, options);
  var fragment = React.useCallback(function (i) {
    var _contract$interface2;
    return contract == null ? void 0 : (_contract$interface2 = contract["interface"]) == null ? void 0 : _contract$interface2.getFunction(callDatas[i].substring(0, 10));
  }, [callDatas, contract]);
  return useCallStates(results, contract == null ? void 0 : contract["interface"], fragment, latestBlockNumber);
}
// Similar to useMultipleContractSingleData but instead of multiple contracts on one chain,
// this is for querying compatible contracts on multiple chains
function useMultiChainMultiContractSingleData(context, chainToBlockNumber, chainToAddresses, contractInterface, methodName, callInputs, options) {
  var _ref7 = options != null ? options : {},
    gasRequired = _ref7.gasRequired;
  var _useCallData2 = useCallData(methodName, contractInterface, callInputs),
    fragment = _useCallData2.fragment,
    callData = _useCallData2.callData;
  // Create call objects
  var chainToCalls = React.useMemo(function () {
    if (!callData || !chainToAddresses) return {};
    return getChainIds(chainToAddresses).reduce(function (result, chainId) {
      var addresses = chainToAddresses[chainId];
      var calls = addresses.map(function (address) {
        if (!address) return undefined;
        return {
          address: address,
          callData: callData,
          gasRequired: gasRequired
        };
      });
      result[chainId] = calls;
      return result;
    }, {});
  }, [chainToAddresses, callData, gasRequired]);
  // Subscribe to call data
  var chainIdToResults = useMultichainCallsDataSubscription(context, chainToCalls, options);
  // TODO(WEB-2097): Multichain states are not referentially stable, because they cannot use the
  // same codepath (eg useCallStates).
  return React.useMemo(function () {
    return getChainIds(chainIdToResults).reduce(function (combinedResults, chainId) {
      var latestBlockNumber = chainToBlockNumber == null ? void 0 : chainToBlockNumber[chainId];
      var results = chainIdToResults[chainId];
      combinedResults[chainId] = results.map(function (result) {
        return toCallState(result, contractInterface, fragment, latestBlockNumber);
      });
      return combinedResults;
    }, {});
  }, [fragment, contractInterface, chainIdToResults, chainToBlockNumber]);
}
// Similar to useSingleCallResult but instead of one contract on one chain,
// this is for querying a contract on multiple chains
function useMultiChainSingleContractSingleData(context, chainToBlockNumber, chainToAddress, contractInterface, methodName, callInputs, options) {
  // This hook uses the more flexible useMultiChainMultiContractSingleData internally,
  // but transforms the inputs and outputs for convenience
  var chainIdToAddresses = React.useMemo(function () {
    return getChainIds(chainToAddress).reduce(function (result, chainId) {
      result[chainId] = [chainToAddress[chainId]];
      return result;
    }, {});
  }, [chainToAddress]);
  var multiContractResults = useMultiChainMultiContractSingleData(context, chainToBlockNumber, chainIdToAddresses, contractInterface, methodName, callInputs, options);
  return React.useMemo(function () {
    return getChainIds(chainToAddress).reduce(function (result, chainId) {
      var _multiContractResults, _multiContractResults2;
      result[chainId] = (_multiContractResults = (_multiContractResults2 = multiContractResults[chainId]) == null ? void 0 : _multiContractResults2[0]) != null ? _multiContractResults : INVALID_CALL_STATE;
      return result;
    }, {});
  }, [chainToAddress, multiContractResults]);
}
function useCallData(methodName, contractInterface, callInputs) {
  // Create ethers function fragment
  var fragment = React.useMemo(function () {
    return contractInterface == null ? void 0 : contractInterface.getFunction(methodName);
  }, [contractInterface, methodName]);
  // Get encoded call data
  var callData = React.useMemo(function () {
    return fragment && isValidMethodArgs(callInputs) ? contractInterface == null ? void 0 : contractInterface.encodeFunctionData(fragment, callInputs) : undefined;
  }, [callInputs, contractInterface, fragment]);
  return {
    fragment: fragment,
    callData: callData
  };
}
function getChainIds(chainIdMap) {
  return Object.keys(chainIdMap).map(function (c) {
    return parseInt(c, 10);
  });
}

var initialState = {
  callResults: {}
};
function createMulticallSlice(reducerPath) {
  return toolkit.createSlice({
    name: reducerPath,
    initialState: initialState,
    reducers: {
      addMulticallListeners: function addMulticallListeners(state, action) {
        var _listeners$chainId;
        var _action$payload = action.payload,
          calls = _action$payload.calls,
          chainId = _action$payload.chainId,
          blocksPerFetch = _action$payload.options.blocksPerFetch;
        var listeners = state.callListeners ? state.callListeners : state.callListeners = {};
        listeners[chainId] = (_listeners$chainId = listeners[chainId]) != null ? _listeners$chainId : {};
        calls.forEach(function (call) {
          var _listeners$chainId$ca, _listeners$chainId$ca2;
          var callKey = toCallKey(call);
          listeners[chainId][callKey] = (_listeners$chainId$ca = listeners[chainId][callKey]) != null ? _listeners$chainId$ca : {};
          listeners[chainId][callKey][blocksPerFetch] = ((_listeners$chainId$ca2 = listeners[chainId][callKey][blocksPerFetch]) != null ? _listeners$chainId$ca2 : 0) + 1;
        });
      },
      removeMulticallListeners: function removeMulticallListeners(state, action) {
        var _action$payload2 = action.payload,
          calls = _action$payload2.calls,
          chainId = _action$payload2.chainId,
          blocksPerFetch = _action$payload2.options.blocksPerFetch;
        var listeners = state.callListeners ? state.callListeners : state.callListeners = {};
        if (!listeners[chainId]) return;
        calls.forEach(function (call) {
          var callKey = toCallKey(call);
          if (!listeners[chainId][callKey]) return;
          if (!listeners[chainId][callKey][blocksPerFetch]) return;
          if (listeners[chainId][callKey][blocksPerFetch] === 1) {
            delete listeners[chainId][callKey][blocksPerFetch];
          } else {
            listeners[chainId][callKey][blocksPerFetch]--;
          }
        });
      },
      fetchingMulticallResults: function fetchingMulticallResults(state, action) {
        var _state$callResults$ch;
        var _action$payload3 = action.payload,
          chainId = _action$payload3.chainId,
          fetchingBlockNumber = _action$payload3.fetchingBlockNumber,
          calls = _action$payload3.calls;
        state.callResults[chainId] = (_state$callResults$ch = state.callResults[chainId]) != null ? _state$callResults$ch : {};
        calls.forEach(function (call) {
          var callKey = toCallKey(call);
          var current = state.callResults[chainId][callKey];
          if (!current) {
            state.callResults[chainId][callKey] = {
              fetchingBlockNumber: fetchingBlockNumber
            };
          } else {
            var _current$fetchingBloc;
            if (((_current$fetchingBloc = current.fetchingBlockNumber) != null ? _current$fetchingBloc : 0) >= fetchingBlockNumber) return;
            state.callResults[chainId][callKey].fetchingBlockNumber = fetchingBlockNumber;
          }
        });
      },
      errorFetchingMulticallResults: function errorFetchingMulticallResults(state, action) {
        var _state$callResults$ch2;
        var _action$payload4 = action.payload,
          chainId = _action$payload4.chainId,
          fetchingBlockNumber = _action$payload4.fetchingBlockNumber,
          calls = _action$payload4.calls;
        state.callResults[chainId] = (_state$callResults$ch2 = state.callResults[chainId]) != null ? _state$callResults$ch2 : {};
        calls.forEach(function (call) {
          var callKey = toCallKey(call);
          var current = state.callResults[chainId][callKey];
          if (!current || typeof current.fetchingBlockNumber !== 'number') return; // only should be dispatched if we are already fetching
          if (current.fetchingBlockNumber <= fetchingBlockNumber) {
            delete current.fetchingBlockNumber;
            current.data = null;
            current.blockNumber = fetchingBlockNumber;
          }
        });
      },
      updateMulticallResults: function updateMulticallResults(state, action) {
        var _state$callResults$ch3;
        var _action$payload5 = action.payload,
          chainId = _action$payload5.chainId,
          results = _action$payload5.results,
          blockNumber = _action$payload5.blockNumber;
        state.callResults[chainId] = (_state$callResults$ch3 = state.callResults[chainId]) != null ? _state$callResults$ch3 : {};
        Object.keys(results).forEach(function (callKey) {
          var _current$blockNumber;
          var current = state.callResults[chainId][callKey];
          if (((_current$blockNumber = current == null ? void 0 : current.blockNumber) != null ? _current$blockNumber : 0) > blockNumber) return;
          if ((current == null ? void 0 : current.data) === results[callKey] && (current == null ? void 0 : current.blockNumber) === blockNumber) return;
          state.callResults[chainId][callKey] = {
            data: results[callKey],
            blockNumber: blockNumber
          };
        });
      },
      updateListenerOptions: function updateListenerOptions(state, action) {
        var _state$listenerOption;
        var _action$payload6 = action.payload,
          chainId = _action$payload6.chainId,
          listenerOptions = _action$payload6.listenerOptions;
        state.listenerOptions = (_state$listenerOption = state.listenerOptions) != null ? _state$listenerOption : {};
        state.listenerOptions[chainId] = listenerOptions;
      }
    }
  });
}

/**
 * Tries to pack a list of items into as few bins as possible using the first-fit bin packing algorithm
 * @param calls the calls to chunk
 * @param chunkGasLimit the gas limit of any one chunk of calls, i.e. bin capacity
 * @param defaultGasRequired the default amount of gas an individual call should cost if not specified
 */
function chunkCalls(calls, chunkGasLimit, defaultGasRequired) {
  if (defaultGasRequired === void 0) {
    defaultGasRequired = DEFAULT_CHUNK_GAS_REQUIRED;
  }
  return calls
  // first sort by gas required
  .sort(function (c1, c2) {
    var _c2$gasRequired, _c1$gasRequired;
    return ((_c2$gasRequired = c2.gasRequired) != null ? _c2$gasRequired : defaultGasRequired) - ((_c1$gasRequired = c1.gasRequired) != null ? _c1$gasRequired : defaultGasRequired);
  })
  // then bin the calls according to the first fit algorithm
  .reduce(function (bins, call) {
    var _call$gasRequired;
    var gas = (_call$gasRequired = call.gasRequired) != null ? _call$gasRequired : defaultGasRequired;
    for (var _iterator = _createForOfIteratorHelperLoose(bins), _step; !(_step = _iterator()).done;) {
      var bin = _step.value;
      if (bin.cumulativeGasLimit + gas <= chunkGasLimit) {
        bin.calls.push(call);
        bin.cumulativeGasLimit += gas;
        return bins;
      }
    }
    // didn't find a bin for the call, make a new bin
    bins.push({
      calls: [call],
      cumulativeGasLimit: gas
    });
    return bins;
  }, [])
  // pull out just the calls from each bin
  .map(function (b) {
    return b.calls;
  });
}

// TODO de-duplicate this file with web interface
// https://github.com/Uniswap/interface/blob/main/src/utils/retry.ts
function wait(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}
function waitRandom(min, max) {
  return wait(min + Math.round(Math.random() * Math.max(0, max - min)));
}
/**
 * This error is thrown if the function is cancelled before completing
 */
var CancelledError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(CancelledError, _Error);
  function CancelledError() {
    var _this;
    _this = _Error.call(this, 'Cancelled') || this;
    _this.isCancelledError = true;
    return _this;
  }
  return CancelledError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Throw this error if the function should retry
 */
var RetryableError = /*#__PURE__*/function (_Error2) {
  _inheritsLoose(RetryableError, _Error2);
  function RetryableError() {
    var _this2;
    _this2 = _Error2.apply(this, arguments) || this;
    _this2.isRetryableError = true;
    return _this2;
  }
  return RetryableError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Retries the function that returns the promise until the promise successfully resolves up to n retries
 * @param fn function to retry
 * @param n how many times to retry
 * @param minWait min wait between retries in ms
 * @param maxWait max wait between retries in ms
 */
function retry(fn, _ref) {
  var n = _ref.n,
    minWait = _ref.minWait,
    maxWait = _ref.maxWait;
  var completed = false;
  var rejectCancelled;
  var promise = new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
      var result;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            rejectCancelled = reject;
          case 1:
            result = void 0;
            _context.prev = 3;
            _context.next = 6;
            return fn();
          case 6:
            result = _context.sent;
            if (!completed) {
              resolve(result);
              completed = true;
            }
            return _context.abrupt("break", 24);
          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](3);
            if (!completed) {
              _context.next = 15;
              break;
            }
            return _context.abrupt("break", 24);
          case 15:
            if (!(n <= 0 || !_context.t0.isRetryableError)) {
              _context.next = 19;
              break;
            }
            reject(_context.t0);
            completed = true;
            return _context.abrupt("break", 24);
          case 19:
            n--;
          case 20:
            _context.next = 22;
            return waitRandom(minWait, maxWait);
          case 22:
            _context.next = 1;
            break;
          case 24:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[3, 11]]);
    }));
    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  return {
    promise: promise,
    cancel: function cancel() {
      if (completed) return;
      completed = true;
      rejectCancelled(new CancelledError());
    }
  };
}

// TODO de-duplicate this file with web interface
// modified from https://usehooks.com/useDebounce/
function useDebounce(value, delay) {
  var _useState = React.useState(value),
    debouncedValue = _useState[0],
    setDebouncedValue = _useState[1];
  React.useEffect(function () {
    // Update debounced value after delay
    var handler = setTimeout(function () {
      setDebouncedValue(value);
    }, delay);
    // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return function () {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

var FETCH_RETRY_CONFIG = {
  n: Infinity,
  minWait: 1000,
  maxWait: 2500
};
/**
 * Fetches a chunk of calls, enforcing a minimum block number constraint
 * @param multicall multicall contract to fetch against
 * @param chunk chunk of calls to make
 * @param blockNumber block number passed as the block tag in the eth_call
 */
function fetchChunk(_x, _x2, _x3, _x4) {
  return _fetchChunk.apply(this, arguments);
}
/**
 * From the current all listeners state, return each call key mapped to the
 * minimum number of blocks per fetch. This is how often each key must be fetched.
 * @param allListeners the all listeners state
 * @param chainId the current chain id
 */
function _fetchChunk() {
  _fetchChunk = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(multicall, chunk, blockNumber, isDebug) {
    var _yield$multicall$call, returnData, _error$message, _error$message2, error, half, _yield$Promise$all, c0, c1;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.debug('Fetching chunk', chunk, blockNumber);
          _context.prev = 1;
          _context.next = 4;
          return multicall.callStatic.multicall(chunk.map(function (obj) {
            var _obj$gasRequired;
            return {
              target: obj.address,
              callData: obj.callData,
              gasLimit: (_obj$gasRequired = obj.gasRequired) != null ? _obj$gasRequired : DEFAULT_CALL_GAS_REQUIRED
            };
          }),
          // we aren't passing through the block gas limit we used to create the chunk, because it causes a problem with the integ tests
          {
            blockTag: blockNumber
          });
        case 4:
          _yield$multicall$call = _context.sent;
          returnData = _yield$multicall$call.returnData;
          if (isDebug) {
            returnData.forEach(function (_ref, i) {
              var _chunk$i$gasRequired;
              var gasUsed = _ref.gasUsed,
                returnData = _ref.returnData,
                success = _ref.success;
              if (!success && returnData.length === 2 && gasUsed.gte(Math.floor(((_chunk$i$gasRequired = chunk[i].gasRequired) != null ? _chunk$i$gasRequired : DEFAULT_CALL_GAS_REQUIRED) * 0.95))) {
                var _chunk$i$gasRequired2;
                console.warn("A call failed due to requiring " + gasUsed.toString() + " vs. allowed " + ((_chunk$i$gasRequired2 = chunk[i].gasRequired) != null ? _chunk$i$gasRequired2 : DEFAULT_CALL_GAS_REQUIRED), chunk[i]);
              }
            });
          }
          return _context.abrupt("return", returnData);
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          error = _context.t0;
          if (!(error.code === -32000 || ((_error$message = error.message) == null ? void 0 : _error$message.indexOf('header not found')) !== -1)) {
            _context.next = 17;
            break;
          }
          throw new RetryableError("header not found for block number " + blockNumber);
        case 17:
          if (!(error.code === -32603 || ((_error$message2 = error.message) == null ? void 0 : _error$message2.indexOf('execution ran out of gas')) !== -1)) {
            _context.next = 27;
            break;
          }
          if (!(chunk.length > 1)) {
            _context.next = 27;
            break;
          }
          {
            console.debug('Splitting a chunk in 2', chunk);
          }
          half = Math.floor(chunk.length / 2);
          _context.next = 23;
          return Promise.all([fetchChunk(multicall, chunk.slice(0, half), blockNumber), fetchChunk(multicall, chunk.slice(half, chunk.length), blockNumber)]);
        case 23:
          _yield$Promise$all = _context.sent;
          c0 = _yield$Promise$all[0];
          c1 = _yield$Promise$all[1];
          return _context.abrupt("return", c0.concat(c1));
        case 27:
          console.error('Failed to fetch chunk', error);
          throw error;
        case 29:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 10]]);
  }));
  return _fetchChunk.apply(this, arguments);
}
function activeListeningKeys(allListeners, chainId) {
  if (!allListeners || !chainId) return {};
  var listeners = allListeners[chainId];
  if (!listeners) return {};
  return Object.keys(listeners).reduce(function (memo, callKey) {
    var keyListeners = listeners[callKey];
    memo[callKey] = Object.keys(keyListeners).filter(function (key) {
      var blocksPerFetch = parseInt(key);
      if (blocksPerFetch <= 0) return false;
      return keyListeners[blocksPerFetch] > 0;
    }).reduce(function (previousMin, current) {
      return Math.min(previousMin, parseInt(current));
    }, Infinity);
    return memo;
  }, {});
}
/**
 * Return the keys that need to be refetched
 * @param callResults current call result state
 * @param listeningKeys each call key mapped to how old the data can be in blocks
 * @param chainId the current chain id
 * @param latestBlockNumber the latest block number
 */
function outdatedListeningKeys(callResults, listeningKeys, chainId, latestBlockNumber) {
  if (!chainId || !latestBlockNumber) return [];
  var results = callResults[chainId];
  // no results at all, load everything
  if (!results) return Object.keys(listeningKeys);
  return Object.keys(listeningKeys).filter(function (callKey) {
    var blocksPerFetch = listeningKeys[callKey];
    var data = callResults[chainId][callKey];
    // no data, must fetch
    if (!data) return true;
    var minDataBlockNumber = latestBlockNumber - (blocksPerFetch - 1);
    // already fetching it for a recent enough block, don't refetch it
    if (data.fetchingBlockNumber && data.fetchingBlockNumber >= minDataBlockNumber) return false;
    // if data is older than minDataBlockNumber, fetch it
    return !data.blockNumber || data.blockNumber < minDataBlockNumber;
  });
}
function onFetchChunkSuccess(context, chunk, result) {
  var actions = context.actions,
    dispatch = context.dispatch,
    chainId = context.chainId,
    latestBlockNumber = context.latestBlockNumber,
    isDebug = context.isDebug;
  // split the returned slice into errors and results
  var _chunk$reduce = chunk.reduce(function (memo, call, i) {
      if (result[i].success) {
        var _result$i$returnData;
        memo.results[toCallKey(call)] = (_result$i$returnData = result[i].returnData) != null ? _result$i$returnData : null;
      } else {
        memo.erroredCalls.push(call);
      }
      return memo;
    }, {
      erroredCalls: [],
      results: {}
    }),
    erroredCalls = _chunk$reduce.erroredCalls,
    results = _chunk$reduce.results;
  // dispatch any new results
  if (Object.keys(results).length > 0) dispatch(actions.updateMulticallResults({
    chainId: chainId,
    results: results,
    blockNumber: latestBlockNumber
  }));
  // dispatch any errored calls
  if (erroredCalls.length > 0) {
    if (isDebug) {
      result.forEach(function (returnData, ix) {
        if (!returnData.success) {
          console.debug('Call failed', chunk[ix], returnData);
        }
      });
    } else {
      console.debug('Calls errored in fetch', erroredCalls);
    }
    dispatch(actions.errorFetchingMulticallResults({
      calls: erroredCalls,
      chainId: chainId,
      fetchingBlockNumber: latestBlockNumber
    }));
  }
}
function onFetchChunkFailure(context, chunk, error) {
  var actions = context.actions,
    dispatch = context.dispatch,
    chainId = context.chainId,
    latestBlockNumber = context.latestBlockNumber;
  if (error.isCancelledError) {
    console.debug('Cancelled fetch for blockNumber', latestBlockNumber, chunk, chainId);
    return;
  }
  console.error('Failed to fetch multicall chunk', chunk, chainId, error);
  dispatch(actions.errorFetchingMulticallResults({
    calls: chunk,
    chainId: chainId,
    fetchingBlockNumber: latestBlockNumber
  }));
}
function Updater(props) {
  var context = props.context,
    chainId = props.chainId,
    latestBlockNumber = props.latestBlockNumber,
    contract = props.contract,
    isDebug = props.isDebug,
    listenerOptions = props.listenerOptions;
  var actions = context.actions,
    reducerPath = context.reducerPath;
  var dispatch = reactRedux.useDispatch();
  // set user configured listenerOptions in state for given chain ID.
  React.useEffect(function () {
    if (chainId && listenerOptions) {
      dispatch(actions.updateListenerOptions({
        chainId: chainId,
        listenerOptions: listenerOptions
      }));
    }
  }, [chainId, listenerOptions, actions, dispatch]);
  var state = reactRedux.useSelector(function (state) {
    return state[reducerPath];
  });
  // wait for listeners to settle before triggering updates
  var debouncedListeners = useDebounce(state.callListeners, 100);
  var cancellations = React.useRef();
  var listeningKeys = React.useMemo(function () {
    return activeListeningKeys(debouncedListeners, chainId);
  }, [debouncedListeners, chainId]);
  var serializedOutdatedCallKeys = React.useMemo(function () {
    var outdatedCallKeys = outdatedListeningKeys(state.callResults, listeningKeys, chainId, latestBlockNumber);
    return JSON.stringify(outdatedCallKeys.sort());
  }, [chainId, state.callResults, listeningKeys, latestBlockNumber]);
  React.useEffect(function () {
    if (!latestBlockNumber || !chainId || !contract) return;
    var outdatedCallKeys = JSON.parse(serializedOutdatedCallKeys);
    if (outdatedCallKeys.length === 0) return;
    var calls = outdatedCallKeys.map(function (key) {
      return parseCallKey(key);
    });
    var chunkedCalls = chunkCalls(calls, CHUNK_GAS_LIMIT);
    if (cancellations.current && cancellations.current.blockNumber !== latestBlockNumber) {
      cancellations.current.cancellations.forEach(function (c) {
        return c();
      });
    }
    dispatch(actions.fetchingMulticallResults({
      calls: calls,
      chainId: chainId,
      fetchingBlockNumber: latestBlockNumber
    }));
    var fetchChunkContext = {
      actions: actions,
      dispatch: dispatch,
      chainId: chainId,
      latestBlockNumber: latestBlockNumber,
      isDebug: isDebug
    };
    // Execute fetches and gather cancellation callbacks
    var newCancellations = chunkedCalls.map(function (chunk) {
      var _retry = retry(function () {
          return fetchChunk(contract, chunk, latestBlockNumber, isDebug);
        }, FETCH_RETRY_CONFIG),
        cancel = _retry.cancel,
        promise = _retry.promise;
      promise.then(function (result) {
        return onFetchChunkSuccess(fetchChunkContext, chunk, result);
      })["catch"](function (error) {
        return onFetchChunkFailure(fetchChunkContext, chunk, error);
      });
      return cancel;
    });
    cancellations.current = {
      blockNumber: latestBlockNumber,
      cancellations: newCancellations
    };
  }, [actions, chainId, contract, dispatch, serializedOutdatedCallKeys, latestBlockNumber, isDebug]);
  return null;
}
function createUpdater(context) {
  var UpdaterContextBound = function UpdaterContextBound(props) {
    return React__default.createElement(Updater, Object.assign({
      context: context
    }, props));
  };
  return UpdaterContextBound;
}

// Inspired by RTK Query's createApi
function createMulticall(options) {
  var _options$reducerPath;
  var reducerPath = (_options$reducerPath = options == null ? void 0 : options.reducerPath) != null ? _options$reducerPath : 'multicall';
  var slice = createMulticallSlice(reducerPath);
  var actions = slice.actions,
    reducer = slice.reducer;
  var context = {
    reducerPath: reducerPath,
    actions: actions
  };
  var useMultipleContractSingleData$1 = function useMultipleContractSingleData$1() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return useMultipleContractSingleData.apply(void 0, [context].concat(args));
  };
  var useSingleContractMultipleData$1 = function useSingleContractMultipleData$1() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return useSingleContractMultipleData.apply(void 0, [context].concat(args));
  };
  var useSingleContractWithCallData$1 = function useSingleContractWithCallData$1() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return useSingleContractWithCallData.apply(void 0, [context].concat(args));
  };
  var useSingleCallResult$1 = function useSingleCallResult$1() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return useSingleCallResult.apply(void 0, [context].concat(args));
  };
  var useMultiChainMultiContractSingleData$1 = function useMultiChainMultiContractSingleData$1() {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }
    return useMultiChainMultiContractSingleData.apply(void 0, [context].concat(args));
  };
  var useMultiChainSingleContractSingleData$1 = function useMultiChainSingleContractSingleData$1() {
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }
    return useMultiChainSingleContractSingleData.apply(void 0, [context].concat(args));
  };
  var hooks = {
    useMultipleContractSingleData: useMultipleContractSingleData$1,
    useSingleContractMultipleData: useSingleContractMultipleData$1,
    useSingleContractWithCallData: useSingleContractWithCallData$1,
    useSingleCallResult: useSingleCallResult$1,
    useMultiChainMultiContractSingleData: useMultiChainMultiContractSingleData$1,
    useMultiChainSingleContractSingleData: useMultiChainSingleContractSingleData$1
  };
  var Updater = createUpdater(context);
  return {
    reducerPath: reducerPath,
    reducer: reducer,
    actions: actions,
    hooks: hooks,
    Updater: Updater
  };
}

exports.CHUNK_GAS_LIMIT = CHUNK_GAS_LIMIT;
exports.CONSERVATIVE_BLOCK_GAS_LIMIT = CONSERVATIVE_BLOCK_GAS_LIMIT;
exports.DEFAULT_BLOCKS_PER_FETCH = DEFAULT_BLOCKS_PER_FETCH;
exports.DEFAULT_CALL_GAS_REQUIRED = DEFAULT_CALL_GAS_REQUIRED;
exports.DEFAULT_CHUNK_GAS_REQUIRED = DEFAULT_CHUNK_GAS_REQUIRED;
exports.INVALID_CALL_STATE = INVALID_CALL_STATE;
exports.INVALID_RESULT = INVALID_RESULT;
exports.LOADING_CALL_STATE = LOADING_CALL_STATE;
exports.NEVER_RELOAD = NEVER_RELOAD;
exports.createMulticall = createMulticall;
//# sourceMappingURL=redux-multicall.cjs.development.js.map
