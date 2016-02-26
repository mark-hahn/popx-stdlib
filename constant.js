
var Popx = require('popx');

(_=>{
  'use strict';
  module.exports = 
  class Constant extends Popx {
    constructor (env, name, module) {
      super(env, name, module);
      setTimeout((_=> this.set('out', module.state)), 0);
    }
  };
})();