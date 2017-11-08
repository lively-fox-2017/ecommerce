'use strict'
// require('dotenv').config()
const Multer = require('multer')
const Storage = require('@google-cloud/storage')
const storage = Storage({
  projectId: "api-project-721451771393",
  keyFilename: "keyFile.json"
})
const bucket = storage.bucket("olshop.belitopikuy.xyz")

function getUrl(filename) {
  return `https://storage.googleapis.com/olshop.belitopikuy.xyz/assets/images/products/${filename}`
}

function uploadFile(req, res, next) {
  if (!req.file) {
    return next()
  }

  let gcsname = "olshop-" + req.file.originalname
  // const file = bucket.file('/products/'+gcsname) // belajaran
  let file = bucket.file("/assets/images/products/"+gcsname)

  let stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getUrl(gcsname)
      next()
    })
  })

  stream.end(req.file.buffer)
}

function deleteFile(fileName){
  // console.log('-------------------------->', fileName)
  bucket.deleteFiles({prefix: `assets/images/products/${fileName}`}, (err) => {
    if (!err) {
      console.log("Berhasil Hapus File di Google Cloud Storage");
    } else {
      console.log("Gagal Hapus File di Google Cloud Storage");
    }
  });
}

let multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
})

module.exports = {
  getUrl,
  uploadFile,
  deleteFile,
  multer
}
