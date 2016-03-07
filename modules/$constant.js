
let data = this.get('$data');
if(this.isPin('$in'))
  this.react('$in', (_, __, meta) => {
    this.emit('$out', data, meta);
  });
else
  this.put('$out', data);
