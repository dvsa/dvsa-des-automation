"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseDriver = exports.BASEDRIVER_HANDLED_SETTINGS = exports.ALL_COMMANDS = void 0;
Object.defineProperty(exports, "DEFAULT_BASE_PATH", {
  enumerable: true,
  get: function () {
    return _constants.DEFAULT_BASE_PATH;
  }
});
exports.NO_SESSION_ID_COMMANDS = exports.METHOD_MAP = exports.JWProxy = exports.ImageElement = exports.DeviceSettings = exports.DEFAULT_WS_PATHNAME_PREFIX = void 0;
Object.defineProperty(exports, "PROTOCOLS", {
  enumerable: true,
  get: function () {
    return _constants.PROTOCOLS;
  }
});
exports.validateCaps = exports.statusCodes = exports.server = exports.routeToCommandName = exports.routeConfiguringFunction = exports.processCapabilities = exports.normalizeBasePath = exports.isStandardCap = exports.isSessionCommand = exports.isErrorType = exports.getSummaryByCode = exports.errors = exports.errorFromW3CJsonCode = exports.errorFromMJSONWPStatusCode = exports.errorFromCode = exports.determineProtocol = exports.default = exports.STATIC_DIR = exports.Protocol = void 0;

require("source-map-support/register");

var driver = _interopRequireWildcard(require("./lib/basedriver/driver"));

var image = _interopRequireWildcard(require("./lib/basedriver/image-element"));

var deviceSettings = _interopRequireWildcard(require("./lib/basedriver/device-settings"));

var protocol = _interopRequireWildcard(require("./lib/protocol"));

var _constants = require("./lib/constants");

var staticIndex = _interopRequireWildcard(require("./lib/express/static"));

var serverIndex = _interopRequireWildcard(require("./lib/express/server"));

var proxyIndex = _interopRequireWildcard(require("./lib/jsonwp-proxy/proxy"));

var statusIndex = _interopRequireWildcard(require("./lib/jsonwp-status/status"));

var caps = _interopRequireWildcard(require("./lib/basedriver/capabilities"));

var ws = _interopRequireWildcard(require("./lib/express/websocket"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  BaseDriver
} = driver;
exports.BaseDriver = BaseDriver;
const {
  ImageElement
} = image;
exports.ImageElement = ImageElement;
const {
  DeviceSettings,
  BASEDRIVER_HANDLED_SETTINGS
} = deviceSettings;
exports.BASEDRIVER_HANDLED_SETTINGS = BASEDRIVER_HANDLED_SETTINGS;
exports.DeviceSettings = DeviceSettings;
var _default = BaseDriver;
exports.default = _default;
const {
  Protocol,
  routeConfiguringFunction,
  errors,
  isErrorType,
  errorFromMJSONWPStatusCode,
  errorFromW3CJsonCode,
  ALL_COMMANDS,
  METHOD_MAP,
  routeToCommandName,
  NO_SESSION_ID_COMMANDS,
  isSessionCommand,
  normalizeBasePath,
  determineProtocol
} = protocol;
exports.determineProtocol = determineProtocol;
exports.normalizeBasePath = normalizeBasePath;
exports.isSessionCommand = isSessionCommand;
exports.NO_SESSION_ID_COMMANDS = NO_SESSION_ID_COMMANDS;
exports.routeToCommandName = routeToCommandName;
exports.METHOD_MAP = METHOD_MAP;
exports.ALL_COMMANDS = ALL_COMMANDS;
exports.errorFromW3CJsonCode = errorFromW3CJsonCode;
exports.errorFromCode = exports.errorFromMJSONWPStatusCode = errorFromMJSONWPStatusCode;
exports.isErrorType = isErrorType;
exports.errors = errors;
exports.routeConfiguringFunction = routeConfiguringFunction;
exports.Protocol = Protocol;
const {
  STATIC_DIR
} = staticIndex;
exports.STATIC_DIR = STATIC_DIR;
const {
  server
} = serverIndex;
exports.server = server;
const {
  JWProxy
} = proxyIndex;
exports.JWProxy = JWProxy;
const {
  codes: statusCodes,
  getSummaryByCode
} = statusIndex;
exports.getSummaryByCode = getSummaryByCode;
exports.statusCodes = statusCodes;
const {
  processCapabilities,
  isStandardCap,
  validateCaps
} = caps;
exports.validateCaps = validateCaps;
exports.isStandardCap = isStandardCap;
exports.processCapabilities = processCapabilities;
const {
  DEFAULT_WS_PATHNAME_PREFIX
} = ws;
exports.DEFAULT_WS_PATHNAME_PREFIX = DEFAULT_WS_PATHNAME_PREFIX;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkJhc2VEcml2ZXIiLCJkcml2ZXIiLCJJbWFnZUVsZW1lbnQiLCJpbWFnZSIsIkRldmljZVNldHRpbmdzIiwiQkFTRURSSVZFUl9IQU5ETEVEX1NFVFRJTkdTIiwiZGV2aWNlU2V0dGluZ3MiLCJQcm90b2NvbCIsInJvdXRlQ29uZmlndXJpbmdGdW5jdGlvbiIsImVycm9ycyIsImlzRXJyb3JUeXBlIiwiZXJyb3JGcm9tTUpTT05XUFN0YXR1c0NvZGUiLCJlcnJvckZyb21XM0NKc29uQ29kZSIsIkFMTF9DT01NQU5EUyIsIk1FVEhPRF9NQVAiLCJyb3V0ZVRvQ29tbWFuZE5hbWUiLCJOT19TRVNTSU9OX0lEX0NPTU1BTkRTIiwiaXNTZXNzaW9uQ29tbWFuZCIsIm5vcm1hbGl6ZUJhc2VQYXRoIiwiZGV0ZXJtaW5lUHJvdG9jb2wiLCJwcm90b2NvbCIsIlNUQVRJQ19ESVIiLCJzdGF0aWNJbmRleCIsInNlcnZlciIsInNlcnZlckluZGV4IiwiSldQcm94eSIsInByb3h5SW5kZXgiLCJjb2RlcyIsInN0YXR1c0NvZGVzIiwiZ2V0U3VtbWFyeUJ5Q29kZSIsInN0YXR1c0luZGV4IiwicHJvY2Vzc0NhcGFiaWxpdGllcyIsImlzU3RhbmRhcmRDYXAiLCJ2YWxpZGF0ZUNhcHMiLCJjYXBzIiwiREVGQVVMVF9XU19QQVRITkFNRV9QUkVGSVgiLCJ3cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7QUFDQTs7QUFDQTs7QUFXQTs7QUFDQTs7QUFvQkE7O0FBSUE7O0FBS0E7O0FBS0E7O0FBS0E7O0FBS0E7Ozs7OztBQXREQSxNQUFNO0FBQUVBLEVBQUFBO0FBQUYsSUFBaUJDLE1BQXZCOztBQUNBLE1BQU07QUFBRUMsRUFBQUE7QUFBRixJQUFtQkMsS0FBekI7O0FBQ0EsTUFBTTtBQUFFQyxFQUFBQSxjQUFGO0FBQWtCQyxFQUFBQTtBQUFsQixJQUFrREMsY0FBeEQ7OztlQUdlTixVOztBQVNmLE1BQU07QUFDSk8sRUFBQUEsUUFESTtBQUNNQyxFQUFBQSx3QkFETjtBQUNnQ0MsRUFBQUEsTUFEaEM7QUFDd0NDLEVBQUFBLFdBRHhDO0FBRUpDLEVBQUFBLDBCQUZJO0FBRXdCQyxFQUFBQSxvQkFGeEI7QUFFOENDLEVBQUFBLFlBRjlDO0FBRTREQyxFQUFBQSxVQUY1RDtBQUdKQyxFQUFBQSxrQkFISTtBQUdnQkMsRUFBQUEsc0JBSGhCO0FBR3dDQyxFQUFBQSxnQkFIeEM7QUFJSkMsRUFBQUEsaUJBSkk7QUFJZUMsRUFBQUE7QUFKZixJQUtGQyxRQUxKOzs7Ozs7Ozs7Ozs7OztBQWlCQSxNQUFNO0FBQUVDLEVBQUFBO0FBQUYsSUFBaUJDLFdBQXZCOztBQUlBLE1BQU07QUFBRUMsRUFBQUE7QUFBRixJQUFhQyxXQUFuQjs7QUFLQSxNQUFNO0FBQUVDLEVBQUFBO0FBQUYsSUFBY0MsVUFBcEI7O0FBS0EsTUFBTTtBQUFFQyxFQUFBQSxLQUFLLEVBQUVDLFdBQVQ7QUFBc0JDLEVBQUFBO0FBQXRCLElBQTJDQyxXQUFqRDs7O0FBS0EsTUFBTTtBQUFFQyxFQUFBQSxtQkFBRjtBQUF1QkMsRUFBQUEsYUFBdkI7QUFBc0NDLEVBQUFBO0FBQXRDLElBQXVEQyxJQUE3RDs7OztBQUtBLE1BQU07QUFBRUMsRUFBQUE7QUFBRixJQUFpQ0MsRUFBdkMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0cmFuc3BpbGU6bWFpblxuXG4vLyBCYXNlRHJpdmVyIGV4cG9ydHNcbmltcG9ydCAqIGFzIGRyaXZlciBmcm9tICcuL2xpYi9iYXNlZHJpdmVyL2RyaXZlcic7XG5pbXBvcnQgKiBhcyBpbWFnZSBmcm9tICcuL2xpYi9iYXNlZHJpdmVyL2ltYWdlLWVsZW1lbnQnO1xuaW1wb3J0ICogYXMgZGV2aWNlU2V0dGluZ3MgZnJvbSAnLi9saWIvYmFzZWRyaXZlci9kZXZpY2Utc2V0dGluZ3MnO1xuXG5jb25zdCB7IEJhc2VEcml2ZXIgfSA9IGRyaXZlcjtcbmNvbnN0IHsgSW1hZ2VFbGVtZW50IH0gPSBpbWFnZTtcbmNvbnN0IHsgRGV2aWNlU2V0dGluZ3MsIEJBU0VEUklWRVJfSEFORExFRF9TRVRUSU5HUyB9ID0gZGV2aWNlU2V0dGluZ3M7XG5cbmV4cG9ydCB7IEJhc2VEcml2ZXIsIERldmljZVNldHRpbmdzLCBJbWFnZUVsZW1lbnQsIEJBU0VEUklWRVJfSEFORExFRF9TRVRUSU5HUyB9O1xuZXhwb3J0IGRlZmF1bHQgQmFzZURyaXZlcjtcblxuXG4vLyBNSlNPTldQIGV4cG9ydHNcbmltcG9ydCAqIGFzIHByb3RvY29sIGZyb20gJy4vbGliL3Byb3RvY29sJztcbmltcG9ydCB7XG4gIERFRkFVTFRfQkFTRV9QQVRILCBQUk9UT0NPTFNcbn0gZnJvbSAnLi9saWIvY29uc3RhbnRzJztcblxuY29uc3Qge1xuICBQcm90b2NvbCwgcm91dGVDb25maWd1cmluZ0Z1bmN0aW9uLCBlcnJvcnMsIGlzRXJyb3JUeXBlLFxuICBlcnJvckZyb21NSlNPTldQU3RhdHVzQ29kZSwgZXJyb3JGcm9tVzNDSnNvbkNvZGUsIEFMTF9DT01NQU5EUywgTUVUSE9EX01BUCxcbiAgcm91dGVUb0NvbW1hbmROYW1lLCBOT19TRVNTSU9OX0lEX0NPTU1BTkRTLCBpc1Nlc3Npb25Db21tYW5kLFxuICBub3JtYWxpemVCYXNlUGF0aCwgZGV0ZXJtaW5lUHJvdG9jb2xcbn0gPSBwcm90b2NvbDtcblxuZXhwb3J0IHtcbiAgUHJvdG9jb2wsIHJvdXRlQ29uZmlndXJpbmdGdW5jdGlvbiwgZXJyb3JzLCBpc0Vycm9yVHlwZSwgUFJPVE9DT0xTLFxuICBlcnJvckZyb21NSlNPTldQU3RhdHVzQ29kZSwgZXJyb3JGcm9tVzNDSnNvbkNvZGUsIGRldGVybWluZVByb3RvY29sLFxuICBlcnJvckZyb21NSlNPTldQU3RhdHVzQ29kZSBhcyBlcnJvckZyb21Db2RlLCBBTExfQ09NTUFORFMsIE1FVEhPRF9NQVAsXG4gIHJvdXRlVG9Db21tYW5kTmFtZSwgTk9fU0VTU0lPTl9JRF9DT01NQU5EUywgaXNTZXNzaW9uQ29tbWFuZCxcbiAgREVGQVVMVF9CQVNFX1BBVEgsIG5vcm1hbGl6ZUJhc2VQYXRoXG59O1xuXG4vLyBFeHByZXNzIGV4cG9ydHNcbmltcG9ydCAqIGFzIHN0YXRpY0luZGV4IGZyb20gJy4vbGliL2V4cHJlc3Mvc3RhdGljJztcbmNvbnN0IHsgU1RBVElDX0RJUiB9ID0gc3RhdGljSW5kZXg7XG5leHBvcnQgeyBTVEFUSUNfRElSIH07XG5cbmltcG9ydCAqIGFzIHNlcnZlckluZGV4IGZyb20gJy4vbGliL2V4cHJlc3Mvc2VydmVyJztcbmNvbnN0IHsgc2VydmVyIH0gPSBzZXJ2ZXJJbmRleDtcbmV4cG9ydCB7IHNlcnZlciB9O1xuXG4vLyBqc29ud3AtcHJveHkgZXhwb3J0c1xuaW1wb3J0ICogYXMgcHJveHlJbmRleCBmcm9tICcuL2xpYi9qc29ud3AtcHJveHkvcHJveHknO1xuY29uc3QgeyBKV1Byb3h5IH0gPSBwcm94eUluZGV4O1xuZXhwb3J0IHsgSldQcm94eSB9O1xuXG4vLyBqc29ud3Atc3RhdHVzIGV4cG9ydHNcbmltcG9ydCAqIGFzIHN0YXR1c0luZGV4IGZyb20gJy4vbGliL2pzb253cC1zdGF0dXMvc3RhdHVzJztcbmNvbnN0IHsgY29kZXM6IHN0YXR1c0NvZGVzLCBnZXRTdW1tYXJ5QnlDb2RlIH0gPSBzdGF0dXNJbmRleDtcbmV4cG9ydCB7IHN0YXR1c0NvZGVzLCBnZXRTdW1tYXJ5QnlDb2RlIH07XG5cbi8vIFczQyBjYXBhYmlsaXRpZXMgcGFyc2VyXG5pbXBvcnQgKiBhcyBjYXBzIGZyb20gJy4vbGliL2Jhc2Vkcml2ZXIvY2FwYWJpbGl0aWVzJztcbmNvbnN0IHsgcHJvY2Vzc0NhcGFiaWxpdGllcywgaXNTdGFuZGFyZENhcCwgdmFsaWRhdGVDYXBzIH0gPSBjYXBzO1xuZXhwb3J0IHsgcHJvY2Vzc0NhcGFiaWxpdGllcywgaXNTdGFuZGFyZENhcCwgdmFsaWRhdGVDYXBzIH07XG5cbi8vIFdlYiBzb2NrZXQgaGVscGVyc1xuaW1wb3J0ICogYXMgd3MgZnJvbSAnLi9saWIvZXhwcmVzcy93ZWJzb2NrZXQnO1xuY29uc3QgeyBERUZBVUxUX1dTX1BBVEhOQU1FX1BSRUZJWCB9ID0gd3M7XG5leHBvcnQgeyBERUZBVUxUX1dTX1BBVEhOQU1FX1BSRUZJWCB9O1xuIl0sImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZVJvb3QiOiIuLiJ9
