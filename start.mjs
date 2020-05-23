import fs from'fs'
import http from'http'
import https from'https'
import net from'net'
import urlModule from'url'
import clientTest from'./start.d/clientTest.mjs'
let listen=[1100,'::1']
let server=http.createServer()
/*https.createServer({
    key:fs.readFileSync('key'),
    cert:fs.readFileSync('crt'),
})*/
server.on('request',async(req,res)=>{
    if(await clientTest.dirMap(req,res,{mime:1}))
        return
    res.writeHead(404)
    res.end()
})
server.listen(...listen)
let url=new urlModule.URL('http://[::1]')
url.hostname=net.isIPv6(listen[1])?`[${listen[1]}]`:listen[1]
url.port=listen[0]
console.log(url.href)
