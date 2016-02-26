
var fs     = require('fs');
var util   = require('util');
var Popx   = require('popx');
var moment = require('moment');

(()=>{
  'use strict';

  module.exports = 
  class Log extends Popx {
    constructor (env, name, module) {
      super(env, name, module);
      this.react( '*', (pinName, wireName, wire) => {
        let line = `${moment.format().slice(0,-6).replace('T',' ')} 
                    ${wire.event ? 'event' : 'value'}
                    ${pinName}, ${wireName}: ${util.inspect(wire.val)}`
                   .replace(/\s+/g, ' ');
        if (this.get('console').val !== false) console.log(line);
        let path = this.get('path').val;
        if (path) fs.appendFileSync(path, line);
      });
    }
  };
})();