
var Popx = require('popx');

(_=>{
  'use strict';
  module.exports = 
  class Constant extends Popx {
    constructor (env, module) {
      super(env, module);
      setTimeout((_=> this.set('out', module.state)), 0);
    }
  };
})();