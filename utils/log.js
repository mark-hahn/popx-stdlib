
var fs     = require('fs');
var util   = require('util');
var Popx   = require('popx');
var moment = require('moment');

(()=>{
  'use strict';

  class Log extends Popx {
    constructor () {
      super();
      this.react( '*', pins => {
        for(var pinName in pins) {
          let pin = pins[pinName];
          if (pin.event || pin.change) {
            let line = `${moment.format().slice(0,-6).replace('T',' ')} 
                        ${pin.event ? 'event' : 'value'}
                        ${pinName}: ${util.inspect(pin.val)}`
                       .replace(/\s+/g, ' ');
            if (pins.console.val !== false) console.log(line);
            if (pins.path.val) fs.appendFileSync(path, line);
          }
        }
      });
    }
  }

  module.exports = new Log();
})();