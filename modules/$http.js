
const http = require('http');
let resByReqId = {};
let reqId = 0;

switch(this.get('$op')) {

  case 'server':
    const hostname = this.get('$host') || '127.0.0.1';
    const port = this.get('$port') || 8080;
    http.createServer((req, res) => {
      resByReqId[++reqId] = res;
      this.emit('$req', null, 
          {reqId, reqUrl: req.url, reqHdrs: req.headers, reqMethod: req.method});
    }).listen(port, hostname, _=> {
      this.log(`Server running at http://${hostname}:${port}/`);
    });
    this.react('$res', (_, data, meta) => {
      let res = resByReqId[meta.reqId];
      res.writeHead(meta.resCode || 200, meta.hdrs || {'Content-Type': 'text/plain' });
      res.end(data);
    });
    break;
    
  default: 
    utils.fatal(`invalid $op "${this.get('$op')}" for $http module ${this.module.name}`);
}
