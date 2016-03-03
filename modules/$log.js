
/* pragma module = $log */

let fs     = require('fs');
let util   = require('util');
let moment = require('moment');

let pinNames = (this.get('$allWires') ? '**' : '*');
  
this.react(pinNames, null, (pinName, data, meta) => {
  let line = `${moment().format().slice(0,-6).replace('T',' ')} 
              ${meta.sentFrom.pinName}(${meta.sentFrom.module}) 
              ${meta.isEvent ? 'event' : ''}
              ->
              ${meta.sentFrom.wireName}: ${util.inspect(data)}`
              .replace(/\s+/g, ' ');
  if (this.get('$console') !== false) {
    console.log(line.slice(0,100));
  }
  let path = this.get('$path');
  if (path && Popx.inNode()) fs.appendFileSync(path, line + '\n');
});
