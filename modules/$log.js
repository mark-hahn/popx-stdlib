
/* pragma module = $log */

let fs     = require('fs');
let util   = require('util');
let moment = require('moment');

this.react( '*', (pinName, value, data) => {
  let line = `${moment().format().slice(0,-6).replace('T',' ')} 
              ${data.sentFrom.pinName}(${data.sentFrom.module}) 
              ${data.isEvent ? 'event' : ''}
              ->
              ${data.sentFrom.wireName}: ${util.inspect(value)}`
              .replace(/\s+/g, ' ');
  if (this.get('$console') !== false) {
    console.log(line.slice(0,100));
  }
  let path = this.get('$path');
  if (path && Popx.inNode()) fs.appendFileSync(path, line + '\n');
});
