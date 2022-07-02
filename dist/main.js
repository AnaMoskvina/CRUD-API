/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/dotenv/lib/main.js":
/*!*****************************************!*\
  !*** ./node_modules/dotenv/lib/main.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const fs = __webpack_require__(/*! fs */ \"fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\nconst os = __webpack_require__(/*! os */ \"os\")\n\nconst LINE = /(?:^|^)\\s*(?:export\\s+)?([\\w.-]+)(?:\\s*=\\s*?|:\\s+?)(\\s*'(?:\\\\'|[^'])*'|\\s*\"(?:\\\\\"|[^\"])*\"|\\s*`(?:\\\\`|[^`])*`|[^#\\r\\n]+)?\\s*(?:#.*)?(?:$|$)/mg\n\n// Parser src into an Object\nfunction parse (src) {\n  const obj = {}\n\n  // Convert buffer to string\n  let lines = src.toString()\n\n  // Convert line breaks to same format\n  lines = lines.replace(/\\r\\n?/mg, '\\n')\n\n  let match\n  while ((match = LINE.exec(lines)) != null) {\n    const key = match[1]\n\n    // Default undefined or null to empty string\n    let value = (match[2] || '')\n\n    // Remove whitespace\n    value = value.trim()\n\n    // Check if double quoted\n    const maybeQuote = value[0]\n\n    // Remove surrounding quotes\n    value = value.replace(/^(['\"`])([\\s\\S]*)\\1$/mg, '$2')\n\n    // Expand newlines if double quoted\n    if (maybeQuote === '\"') {\n      value = value.replace(/\\\\n/g, '\\n')\n      value = value.replace(/\\\\r/g, '\\r')\n    }\n\n    // Add to object\n    obj[key] = value\n  }\n\n  return obj\n}\n\nfunction _log (message) {\n  console.log(`[dotenv][DEBUG] ${message}`)\n}\n\nfunction _resolveHome (envPath) {\n  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath\n}\n\n// Populates process.env from .env file\nfunction config (options) {\n  let dotenvPath = path.resolve(process.cwd(), '.env')\n  let encoding = 'utf8'\n  const debug = Boolean(options && options.debug)\n  const override = Boolean(options && options.override)\n\n  if (options) {\n    if (options.path != null) {\n      dotenvPath = _resolveHome(options.path)\n    }\n    if (options.encoding != null) {\n      encoding = options.encoding\n    }\n  }\n\n  try {\n    // Specifying an encoding returns a string instead of a buffer\n    const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }))\n\n    Object.keys(parsed).forEach(function (key) {\n      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {\n        process.env[key] = parsed[key]\n      } else {\n        if (override === true) {\n          process.env[key] = parsed[key]\n        }\n\n        if (debug) {\n          if (override === true) {\n            _log(`\"${key}\" is already defined in \\`process.env\\` and WAS overwritten`)\n          } else {\n            _log(`\"${key}\" is already defined in \\`process.env\\` and was NOT overwritten`)\n          }\n        }\n      }\n    })\n\n    return { parsed }\n  } catch (e) {\n    if (debug) {\n      _log(`Failed to load ${dotenvPath} ${e.message}`)\n    }\n\n    return { error: e }\n  }\n}\n\nconst DotenvModule = {\n  config,\n  parse\n}\n\nmodule.exports.config = DotenvModule.config\nmodule.exports.parse = DotenvModule.parse\nmodule.exports = DotenvModule\n\n\n//# sourceURL=webpack://crud-api/./node_modules/dotenv/lib/main.js?");

/***/ }),

/***/ "./src/DB.ts":
/*!*******************!*\
  !*** ./src/DB.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"db\": () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\n\nvar DB = /** @class */ (function () {\n    function DB() {\n        this.store = {};\n    }\n    DB.prototype.getUsers = function () {\n        return Object.values(this.store);\n    };\n    DB.prototype.getUser = function (id) {\n        return this.store[id] ? this.store[id] : null;\n    };\n    DB.prototype.postUser = function (user) {\n        var uuid = crypto__WEBPACK_IMPORTED_MODULE_0___default().randomUUID({ disableEntropyCache: true });\n        var createdUser = __assign(__assign({}, user), { id: uuid });\n        this.store[uuid] = createdUser;\n        return createdUser;\n    };\n    DB.prototype.deleteUser = function (id) {\n        delete this.store[id];\n    };\n    DB.prototype.putUser = function (id, user) {\n        var updatedUser = __assign(__assign({}, this.store[id]), user);\n        this.store[id] = updatedUser;\n        return updatedUser;\n    };\n    return DB;\n}());\nvar db = new DB();\n\n\n//# sourceURL=webpack://crud-api/./src/DB.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _DB__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DB */ \"./src/DB.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\n(__webpack_require__(/*! dotenv */ \"./node_modules/dotenv/lib/main.js\").config)();\n\n\n\nvar port = process.env.PORT;\n// Inital data in DB\n_DB__WEBPACK_IMPORTED_MODULE_1__.db.postUser({\n    username: 'user',\n    age: 30,\n    hobbies: []\n});\n_DB__WEBPACK_IMPORTED_MODULE_1__.db.postUser({\n    username: 'user1',\n    age: 33,\n    hobbies: ['coding']\n});\nvar requestListener = function (req, res) {\n    var path = req.url, method = req.method;\n    var id = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getIdFromUrl)(path);\n    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_2__.getIsUrlValid)(path)) {\n        res.writeHead(404);\n        res.write('Invalid endpoint');\n        res.end();\n        return;\n    }\n    var respondWithIdCheck = function (id, handleSuccess) {\n        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_2__.getIsValidUuid)(id)) {\n            res.writeHead(400);\n            res.write('Invalid format of id');\n            res.end();\n        }\n        else if (!(0,_utils__WEBPACK_IMPORTED_MODULE_2__.getIfIdExist)(id)) {\n            res.writeHead(404);\n            res.write(\"User with id \".concat(id, \" does not exist\"));\n            res.end();\n        }\n        else {\n            handleSuccess();\n        }\n    };\n    if (method === 'GET') {\n        if (!id) {\n            res.writeHead(200);\n            res.write(JSON.stringify(_DB__WEBPACK_IMPORTED_MODULE_1__.db.getUsers()));\n            res.end();\n        }\n        else {\n            var handleSuccess = function () {\n                res.writeHead(200);\n                res.write(JSON.stringify(_DB__WEBPACK_IMPORTED_MODULE_1__.db.getUser(id)));\n                res.end();\n            };\n            respondWithIdCheck(id, handleSuccess);\n        }\n    }\n    if (method === 'POST') {\n        var body_1 = [];\n        req.on('data', function (chunk) {\n            body_1.push(chunk);\n        }).on('end', function () {\n            var bodyObj = JSON.parse(body_1.toString());\n            if (!(0,_utils__WEBPACK_IMPORTED_MODULE_2__.getIsPostBodyValid)(bodyObj)) {\n                res.writeHead(400);\n                res.write('Body should contain username (string), age (number) and hobbies (empty array or array of strings)');\n                res.end();\n            }\n            else {\n                var createdUser = _DB__WEBPACK_IMPORTED_MODULE_1__.db.postUser(bodyObj);\n                res.setHeader('Content-Type', 'application/json');\n                res.writeHead(201);\n                res.write(JSON.stringify(createdUser));\n                res.end();\n            }\n        });\n    }\n    if (method === 'PUT') {\n        var handleSuccess = function () {\n            var body = [];\n            req.on('data', function (chunk) {\n                body.push(chunk);\n            }).on('end', function () {\n                var bodyObj = JSON.parse(body.toString());\n                if (!(0,_utils__WEBPACK_IMPORTED_MODULE_2__.getIsPutBodyValid)(bodyObj)) {\n                    res.writeHead(400);\n                    res.write('Body type is invalid');\n                    res.end();\n                }\n                else {\n                    var updatedUser = _DB__WEBPACK_IMPORTED_MODULE_1__.db.putUser(id, bodyObj);\n                    res.setHeader(\"Content-Type\", \"application/json\");\n                    res.writeHead(200);\n                    res.write(JSON.stringify(updatedUser));\n                    res.end();\n                }\n            });\n        };\n        respondWithIdCheck(id, handleSuccess);\n    }\n    if (method === 'DELETE') {\n        var handleSuccess = function () {\n            _DB__WEBPACK_IMPORTED_MODULE_1__.db.deleteUser(id);\n            res.writeHead(204);\n            res.end();\n        };\n        respondWithIdCheck(id, handleSuccess);\n    }\n};\nvar server = http__WEBPACK_IMPORTED_MODULE_0___default().createServer(requestListener);\nserver.listen(port);\n\n\n//# sourceURL=webpack://crud-api/./src/index.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getIdFromUrl\": () => (/* binding */ getIdFromUrl),\n/* harmony export */   \"getIfIdExist\": () => (/* binding */ getIfIdExist),\n/* harmony export */   \"getIsPostBodyValid\": () => (/* binding */ getIsPostBodyValid),\n/* harmony export */   \"getIsPutBodyValid\": () => (/* binding */ getIsPutBodyValid),\n/* harmony export */   \"getIsUrlValid\": () => (/* binding */ getIsUrlValid),\n/* harmony export */   \"getIsValidUuid\": () => (/* binding */ getIsValidUuid),\n/* harmony export */   \"usersEndpoint\": () => (/* binding */ usersEndpoint)\n/* harmony export */ });\n/* harmony import */ var _DB__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DB */ \"./src/DB.ts\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-node/validate.js\");\n\n\nvar usersEndpoint = '/api/users';\nvar getIsValidUuid = function (id) { return (0,uuid__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(id); };\nvar getIfIdExist = function (id) {\n    return !!_DB__WEBPACK_IMPORTED_MODULE_0__.db.getUsers().find(function (user) { return user.id === id; });\n};\nvar getIsUrlValid = function (url) {\n    var arrUrl = url.split('/');\n    var arrEndpoint = usersEndpoint.split('/');\n    if (!url.startsWith(usersEndpoint))\n        return false;\n    if (arrUrl.length > 4 || arrUrl.length < 3)\n        return false;\n    for (var i = 0; i < arrEndpoint.length - 1; i++) {\n        if (arrEndpoint[i] !== arrUrl[i]) {\n            return false;\n        }\n    }\n    return true;\n};\nvar getIdFromUrl = function (url) {\n    if (url === usersEndpoint)\n        return null;\n    else\n        return url.split('/')[3];\n};\nvar getIsPostBodyValid = function (body) {\n    var hobbies = body.hobbies, username = body.username, age = body.age;\n    return Object.keys(body).length === 3\n        && username && age && hobbies\n        && typeof username === 'string'\n        && typeof age === 'number'\n        && Array.isArray(hobbies)\n        && hobbies.every(function (hobbie) { return typeof hobbie === 'string'; });\n};\nvar getIsPutBodyValid = function (body) {\n    var validFieldNames = ['username', 'age', 'hobbies']; // TODO: where its better to place?\n    var areKeysValid = true;\n    Object.keys(body).forEach(function (key) {\n        if (!validFieldNames.includes(key))\n            areKeysValid = false;\n    });\n    var hobbies = body.hobbies, username = body.username, age = body.age;\n    return Object.keys(body).length <= 3\n        && (typeof username === 'string' || typeof username === 'undefined')\n        && (typeof age === 'number' || typeof username === 'undefined')\n        && ((Array.isArray(hobbies) && hobbies.every(function (hobbie) { return typeof hobbie === 'string'; })) || typeof hobbies === 'undefined')\n        && areKeysValid;\n};\n\n\n//# sourceURL=webpack://crud-api/./src/utils.ts?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/regex.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/regex.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/esm-node/regex.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/validate.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/validate.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ \"./node_modules/uuid/dist/esm-node/regex.js\");\n\n\nfunction validate(uuid) {\n  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].test(uuid);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/esm-node/validate.js?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;