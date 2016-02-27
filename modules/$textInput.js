
var $textInput = null;
(_=>{
  'use strict';
  $textInput = class extends Popx {
    constructor (module) {
      super(module);
      
      this.react('selector', selector => {
        if (this.changedListener) {
          this.ele.removeEventListener('change', this.changedListener);
          delete this.changedListener;
        }
        if (selector) {
          this.ele = document.querySelector(selector);
          this.changedListener = e => this.emit('change', e);
          this.ele.addEventListener('change', this.changedListener);
        }
      });
      
    }
  };
})();
