
var Popx = require('popx');

(_=>{
  'use strict';
  module.exports = 
  class Constant extends Popx {
    constructor (module) {
      super(module);
      setTimeout((_=> this.set('out', module.state)), 0);
    }
  };
})();