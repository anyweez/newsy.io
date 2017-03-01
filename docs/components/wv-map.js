'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    name: 'wv-map',
    data: function data() {
        return {};
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div id=\"map-loc\"></div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-22aebdfa", module.exports)
  } else {
    hotAPI.update("_v-22aebdfa", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}