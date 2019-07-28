import fs from'fs'
import mime from'mime/lite.js'
async function dirMap(req,res,option={}){
    let p=req.url.substring(1)
    let fh
    try{
        fh=await fs.promises.open(`file/${p}`,'r')
    }catch(e){
        if(['ENOENT'].includes(e.code))
            return 0
        throw e
    }
    if(!(await fh.stat()).isFile()){
        fh.close()
        return 0
    }
    let o={}
    if(option.mime){
        let t=mime.getType(p)
        if(t)
            o['content-type']=t
    }
    res.writeHead(200,o)
    fs.createReadStream(0,{fd:fh.fd,autoClose:false}).on('end',()=>
        fh.close()
    ).pipe(res)
    return 1
}
export default{dirMap}
