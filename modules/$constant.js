
let data = this.get('$data');
if(this.isPin('$in'))
  this.react('$in', (_, valIn) => {
    this.emit('$out', data, valIn.meta);
  });
else
  this.put('$out', data);
