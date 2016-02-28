
var fs     = require('fs');
var util   = require('util');
var moment = require('moment');

var $log = null;
(_=>{
  'use strict';
  
  $log = class extends Popx {
    constructor (module) {
      super(module);
      this.react( '*', (pinName, val, oldVal, sentFrom) => {
        let line = valstr => `${moment().format().slice(0,-6).replace('T',' ')} 
                              ${sentFrom.module}(${sentFrom.pinName}) 
                              ->
                              ${sentFrom.event ? 'event' : 'value'}
                              wire:${sentFrom.wireName}, value:${valStr}
                              -> ${this.module.name}(${pinName})`
                              .replace(/\s+/g, ' ');
        let valStr = util.inspect(val);
        if (this.get('console') !== false) {
          console.log(line(valStr.replace(/\s+/g, ' ').slice(0,40)));
        }
        let path = this.get('path');
        if (path) fs.appendFileSync(path, line(valStr)+'\n');
      });
    }
  };
  
})();
