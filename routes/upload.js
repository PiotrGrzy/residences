const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
dotenv.config();

aws.config.setPromisesDependency();
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION
});
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    acl: 'public-read',
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname, contentType: file.mimetype });
    },
    key: function(req, file, cb) {
      const type = file.originalname.split('.')[1];
      cb(null, Date.now().toString() + `.${type}`);
    }
  })
});

module.exports = upload;
