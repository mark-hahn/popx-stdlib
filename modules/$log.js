
/* pragma:module = $log */

let fs     = require('fs');
let util   = require('util');
let moment = require('moment');

this.react( '*', (pinName, val, oldVal, sentFrom) => {
  let line = `${moment().format().slice(0,-6).replace('T',' ')} 
              ${sentFrom.pinName}(${sentFrom.module}) 
              ${sentFrom.event ? 'event' : ''}
              ->
              ${sentFrom.wireName}: ${util.inspect(val)}`
              .replace(/\s+/g, ' ');
  if (this.get('console') !== false) {
    console.log(line.slice(0,100));
  }
  let path = this.get('path');
  if (path) {
    if (typeof fs.appendFileSync !== 'function') {
      console.log('popx: no file sys to write log:', path);
    } else fs.appendFileSync(path, line + '\n');
  }
});
