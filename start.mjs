import fs from'fs'
import http2 from'http2'
import url from'url'
import aHttp from '@anliting/http'
let listen=[1100]
http2.createSecureServer({
    key:fs.readFileSync('tls/key'),
    cert:fs.readFileSync('tls/crt'),
}).on('stream',async(stream,header)=>{
    let p=(new url.URL(header[':path'],'http://a')).pathname
    if(await aHttp.dirMap(
        stream,'file',p,{mime:1}
    ))
        return
    stream.respond({':status':404})
    stream.end()
}).listen(...listen)
let aUrl=new url.URL('https://[::1]')
aUrl.port=listen[0]
console.log(aUrl.href)
