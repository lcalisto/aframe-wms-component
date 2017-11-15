/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('wms', {
	schema: {
	    url: {
	    	type: 'string',
	    	default: ''
	    },
	    bbox: {
	    	type: 'array',
	    	default: []
	    },
	    projection: {
	    	type: 'string',
	    	default: ''
	    },
	    version: {
	    	type: 'string',
	    	default: '1.3.0',
	    	oneOf: ['1.3.0', '1.3', '1.0.0', '1.1.1', '1.1.0', '1.1', '1.0']
	    },
	    format: {
	    	type: 'string',
	    	default: 'png'
	    },
	    transparent: {
	    	type: 'string',
	    	default: 'true'
	    },
	    layers: {
	    	type: 'string',
	    	default: ''
	    },
	    styles: {
	    	type: 'string',
	    	default: ''
	    },
	    width: {
	    	type: 'number',
	    	default: 250 // change this
	    },
	    height: {
	    	type: 'number',
	    	default: 250 //change this
	    }
	  },
	  init: function () {		  

	  },
	  update: function (oldData) {
		    var data = this.data;  // Component property values.
		    var el = this.el;  // Reference to the component's entity.
		    a=el;
		    b=data;
		    // Nothing changed
		    if (AFRAME.utils.deepEqual(oldData, data)) {
		      return;
		    }
		    //Check for the required schema elements    
		    if(data.url==''){
		    	console.warn('WMS component: URL not specified. Aborting!');
		    	return;
		    }
		    if(data.bbox=='' || data.bbox.length!=4){
		    	console.warn('WMS component: BBOX not correct. Aborting!');
		    	return;
		    }
		    if(data.projection==''){
		    	console.warn('WMS component: PROJECTION not specified. Aborting!');
		    	return;
		    }
		    if(data.layers==''){
		    	console.warn('WMS component: LAYERS not specified. Aborting!');
		    	return;
		    }
		     //Check if version is correct 
		    if(!['1.3.0', '1.3', '1.0.0', '1.1.1', '1.1.0', '1.1', '1.0'].includes(data.version)){
		    	console.warn('WMS component: Version not correct. Aborting!');
		    	return;
		    }
		    var url=this.constructURL(data);
		    el.setAttribute('material', 'src', url);
		    el.removeAttribute('material','color'); // If color no image is shown. TODO: Find a different way!
		    // TODO find a way to deal with CORS
		    // TODO implement get feature info
		  },
	  constructURL:function(data){
		  if(data.version.toLowerCase()=='1.3.0'){
			  projParam='CRS'
		  }else{
			  projParam='SRS'
		  }
		  var url=data.url+'?'
		  +'SERVICE=WMS&'
		  +'REQUEST=GetMap&'
		  +'BBOX='+data.bbox+'&'
		  +'FORMAT='+'image/'+data.format.toLowerCase()+'&'
		  +'HEIGHT='+String(data.height)+'&'
		  +'WIDTH='+String(data.width)+'&'
		  +'LAYERS='+data.layers+'&'
		  +projParam+'='+data.projection.replace(/\s/g,'')+'&' // Replace all white spaces in the projection string
		  +'STYLES='+data.styles+'&'
		  +'TRANSPARENT='+data.transparent+'&'
		  +'VERSION='+data.version;
		  return encodeURI(url);
		  
	  }
	});

/***/ })
/******/ ]);