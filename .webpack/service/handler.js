/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./handler.js":
/*!********************!*\
  !*** ./handler.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"doprocess\": () => (/* binding */ doprocess)\n/* harmony export */ });\n/* harmony import */ var middy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! middy */ \"middy\");\n/* harmony import */ var middy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(middy__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chrome-aws-lambda */ \"chrome-aws-lambda\");\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var puppeteer_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! puppeteer-core */ \"puppeteer-core\");\n/* harmony import */ var puppeteer_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(puppeteer_core__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var middy_middlewares__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! middy/middlewares */ \"middy/middlewares\");\n/* harmony import */ var middy_middlewares__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(middy_middlewares__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\n\n\nconst handler  = async (event) => {\nconsole.log(process.env.IS_OFFLINE);\n    const executablePath = process.env.IS_OFFLINE\n        ? \"D:\\\\VisualCodeProjects\\\\openServerManagementPageInChrome\\\\node_modules\\\\puppeteer\\\\.local-chromium\\\\win64-901912\\\\chrome-win\\\\chrome.exe\"//\"C:\\\\Users\\\\Wissem\\\\test\\\\node_modules\\\\puppeteer\\\\.local-chromium\\\\win64-686378\\\\chrome-win\\\\chrome.exe\"\n        : await (chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_1___default().executablePath);\n\n    const browser = await puppeteer_core__WEBPACK_IMPORTED_MODULE_2___default().launch({\n        headless:false,\n        args: [\n            '--disable-features=site-per-process', //to look inside iframes\n            '--disable-gpu',\n            '--disable-dev-shm-usage',\n            '--disable-setuid-sandbox',\n            '--no-first-run',\n            '--no-sandbox',\n            '--no-zygote',\n        ],\n        executablePath\n    });\n\n    const page = await browser.newPage();\n    const {url} = event.queryStringParameters;\n    const {timeout} = event.queryStringParameters;\n    let timedout=0;\n    let success=0;\n    await page.goto(url, {\n        waitUntil: [\"networkidle0\", \"load\", \"domcontentloaded\"]\n    });\n    await page.evaluate(() => {document.domain = 'isograd.com';console.log('document.domain',document.domain)}); //execute js inside page\n    await page.waitForSelector('#deskdiv iframe[id*=\"iframe_\"]', {timeout: 5000}).then(()=>{\n        console.log('#deskdiv iframe[id*=\"iframe_\"]  exist');\n    }).catch(e=>{\n        console.log('#deskdiv iframe[id*=\"iframe_\"] doesnot exist',e.toString());\n        timedout=1;\n    });\n    const elementHandle = await page.$('#deskdiv iframe[id*=\"iframe_\"]');\n    const rdp_iframe = await elementHandle.contentFrame();\n    await rdp_iframe.waitForSelector('#thinrdp_canvas_1 canvas',{timeout: timeout}).then(()=>{\n        success=1;\n        console.log('#deskdiv iframe[id*=\"iframe_\"] #thinrdp_canvas_1 canvas exist');\n    }).catch(e=>{\n        console.log('#deskdiv iframe[id*=\"iframe_\"] doesnot exist',e.toString());\n        timedout=1;\n    });  //wait until thinfinity succeed to open rdp session and pass or timeout\n    await browser.close();\n\n  return {\n    statusCode: 200,\n    body: JSON.stringify(\n      {\n        message: 'Alls done',\n        timedout:timedout,\n        input: event,\n        success:success\n      },\n      null,\n      2\n    ),\n  };\n\n  // Use this code if you don't use the http event with the LAMBDA-PROXY integration\n  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };\n};\nconst doprocess = middy__WEBPACK_IMPORTED_MODULE_0___default()(handler)\n    .use((0,middy_middlewares__WEBPACK_IMPORTED_MODULE_3__.httpHeaderNormalizer)())\n    .use((0,middy_middlewares__WEBPACK_IMPORTED_MODULE_3__.cors)())\n    .use((0,middy_middlewares__WEBPACK_IMPORTED_MODULE_3__.doNotWaitForEmptyEventLoop)())\n    .use((0,middy_middlewares__WEBPACK_IMPORTED_MODULE_3__.httpErrorHandler)());\n\n//# sourceURL=webpack://openServerManagementPageInChrome/./handler.js?");

/***/ }),

/***/ "chrome-aws-lambda":
/*!************************************!*\
  !*** external "chrome-aws-lambda" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("chrome-aws-lambda");

/***/ }),

/***/ "middy":
/*!************************!*\
  !*** external "middy" ***!
  \************************/
/***/ ((module) => {

module.exports = require("middy");

/***/ }),

/***/ "middy/middlewares":
/*!************************************!*\
  !*** external "middy/middlewares" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("middy/middlewares");

/***/ }),

/***/ "puppeteer-core":
/*!*********************************!*\
  !*** external "puppeteer-core" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("puppeteer-core");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./handler.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;