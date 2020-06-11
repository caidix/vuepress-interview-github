const http = require('http')
http.createServer((req, res) => {
  console.log(process.argv)
}).listen(3000, ()=>{
  process.title = '3000端口的王'
  console.log("3000,Open" + process.pid)
})