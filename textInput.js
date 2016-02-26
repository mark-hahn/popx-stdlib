
var Popx = require('popx');

(_=>{
  'use strict';

  module.exports = 
  class TextInput extends Popx {
    constructor (env, module) {
      super(env, module);
      this.react('selector', pins => {
        if (this.changedListener) 
          this.ele.removeEventListener('changed', this.changedListener);
        this.ele = document.querySelector(pins.selector.val);
        this.changedListener = e => this.emit('changed', e);
        this.ele.addEventListener('changed', this.changedListener);
      });
    }
  };

})();