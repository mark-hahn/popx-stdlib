
var Popx = require('popx');

(_=>{
  'use strict';

  module.exports = 
  class TextInput extends Popx {
    constructor (env, name, module) {
      super(env, name, module);
      this.react('selector', (pinName, wireName, wire) => {
        if (this.changedListener) {
          this.ele.removeEventListener('changed', this.changedListener);
          delete this.changedListener;
        }
        if (wire.val) {
          this.ele = document.querySelector(wire.val);
          this.changedListener = e => this.emit('changed', e);
          this.ele.addEventListener('changed', this.changedListener);
        }
      });
    }
  };

})();