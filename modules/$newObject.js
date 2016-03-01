
/* pragma module = $newObject */

this.react('*', (pinName, value, data) => {
  if (!data.isEvent) return;
  let instance = {};
  for (let instancePinName of this.getInstancePins())
      instance[instancePinName] = this.get(instancePinName);
  this.emit('$instance', instance);
});
