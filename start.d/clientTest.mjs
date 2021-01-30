import fs from'fs'
import mime from'mime/lite.js'
import core from'@anliting/core'
import url from'url'
async function dirMap(req,res,option={}){
    let p=(new url.URL(req.url,'http://a')).pathname.substring(1),s
    try{
        s=await core.createReadStream(`file/${p}`)
    }catch(e){
        if(e==core.createReadStream.badPath)
            return
        throw e
    }
    let o={}
    if(option.mime){
        let t=mime.getType(p)
        if(t)
            o['content-type']=t
    }
    res.writeHead(200,o)
    s.pipe(res)
    return 1
}
export default{dirMap}
