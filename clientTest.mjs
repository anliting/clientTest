import fs from'fs'
import mime from'mime/lite'
function dirMap(req,res,option={}){
    return new Promise((resolve,reject)=>{
        let p=req.url.substring(1),rs=fs.createReadStream(`file/${p}`)
        rs.on('error',e=>{
            if(['EISDIR','ENOENT'].includes(e.code))
                return resolve(0)
            reject(e)
        }).on('open',()=>{
            let o={}
            if(option.mime){
                let t=mime.getType(p)
                if(t)
                    o['content-type']=t
            }
            res.writeHead(200,o)
            rs.pipe(res)
            resolve(1)
        })
    })
}
export default{dirMap}
