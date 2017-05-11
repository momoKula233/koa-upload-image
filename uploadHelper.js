const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')

const mkdirsSync = ( dirname ) => {
  if (fs.existsSync( dirname )) {
    return true
  } else {
    if (mkdirsSync( path.dirname(dirname)) ) {
      fs.mkdirSync( dirname )
      return true
    }
  }
  return false;
}

function getSuffix( fileName ) {
  return fileName.split('.').pop();
}

function Rename(fileName) {
  return Math.random().toString(16).substr(2) + '.' + getSuffix(fileName)
}

function uploadFile( ctx, options) {
  const _emmiter = new Busboy({headers: ctx.req.headers})
  const fileType = options.fileType;
  const filePath = path.join( options.path,  fileType)
  const confirm = mkdirsSync( filePath );
  if(!confirm) return;
  console.log('start uploading...')
  return new Promise((resolve, reject) => {
    let result = { 
      success: false,
      message: '',
      data: null
    }
    _emmiter.on('file', function(fieldname, file, filename, encoding, mimetype) {
      const fileName = Rename(filename);
      const saveTo = path.join(path.join( filePath, fileName ))
      file.pipe(fs.createWriteStream(saveTo))
      file.on('end', function() {
        result.success = true
        result.data = {
          pictureUrl: `//${ctx.host}/image/${fileType}/${fileName}`
        }
        resolve(result)
      })
    })

    _emmiter.on('finish', function() {
      console.log('finished...')
    })

    _emmiter.on('error', function(err) {
      console.log('err...')
      reject(result)
    })

    ctx.req.pipe(_emmiter)
  })
} 

module.exports =  {
  uploadFile
}