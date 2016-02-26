
var Popx = require('popx');

(_=>{
  'use strict';

  module.exports = 
  class TextInput extends Popx {
    constructor (module) {
      super(module);
      this.react('selector', val => {
        if (this.changedListener) {
          this.ele.removeEventListener('changed', this.changedListener);
          delete this.changedListener;
        }
        if (val) {
          this.ele = document.querySelector(val);
          this.changedListener = e => this.emit('changed', e);
          this.ele.addEventListener('changed', this.changedListener);
        }
      });
    }
  };

})();