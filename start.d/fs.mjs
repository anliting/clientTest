import fs from'fs'
async function createReadStream(p){
    let fh
    try{
        fh=await fs.promises.open(p,'r')
    }catch(e){
        throw['ENOENT'].includes(e.code)?createReadStream.badPath:e
    }
    if(!(await fh.stat()).isFile()){
        fh.close()
        throw createReadStream.badPath
    }
    return fs.createReadStream(0,{fd:fh.fd,autoClose:false}).on('end',()=>
        fh.close()
    )
}
createReadStream.badPath=Symbol()
export default{createReadStream}
