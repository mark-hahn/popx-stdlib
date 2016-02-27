
var $constant = null;
(_=>{
  'use strict';
  $constant = class extends Popx {
    constructor (module) {
      super(module);
      setTimeout((_=> this.set('out', module.state)), 0);
    }
  };
})();
