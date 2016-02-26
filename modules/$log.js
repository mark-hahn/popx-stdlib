
var fs     = require('fs');
var util   = require('util');
var Popx   = require('popx');
var moment = require('moment');

(()=>{
  'use strict';

  module.exports = 
  class Log extends Popx {
    constructor (module) {
      super(module);
      this.react( '*', (val, pinName, ext) => {
        let line = `${moment().format().slice(0,-6).replace('T',' ')} 
                    ${ext.event ? 'event' : 'value'}
                    module:${module.name}, pin:${pinName}, 
                    wire:${ext.wireName}, value:${util.inspect(val)}`
                   .replace(/\s+/g, ' ').slice(0,100);
        if (this.get('console').val !== false) console.log(line);
        let path = this.get('path').val;
        if (path) fs.appendFileSync(path, line);
      });
    }
  };
})();