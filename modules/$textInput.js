
var $textInput = null;
(_=>{
  'use strict';
  $textInput = class extends Popx {
    constructor (module) {
      super(module);
      
      this.react('selector', (_, selector) => {
        if (this.changeListener) {
          this.ele.removeEventListener('change', this.changeListener);
          delete this.changeListener;
        }
        if (selector) {
          this.ele = document.querySelector(selector);
          this.changeListener = e => this.emit('change', e);
          this.ele.addEventListener('change', this.changeListener);
        }
      });
      
    }
  };
})();
