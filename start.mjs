import fs from'fs'
import http from'http'
import https from'https'
import clientTest from'./clientTest.mjs'
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
server.listen(8000,'::1')
