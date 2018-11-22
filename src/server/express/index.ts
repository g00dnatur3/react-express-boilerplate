// SET AWS CREDENTIALS IF NEEDED
// process.env.AWS_ACCESS_KEY_ID = 'XXXX'
// process.env.AWS_SECRET_ACCESS_KEY = 'XXXX'

import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import * as https from 'https'
import * as http from 'http'
import {Request, Response, NextFunction} from 'express'
import HttpError from './HttpError'
import errorHanlder from './middleware/errorHandler'
import favicon from 'serve-favicon'
import fs from 'fs'
import path from 'path'

// -- IMPORT CONTROLLERS HERE --
// import MyController from './controllers/MyController'

const app: express.Application = express()
const env: string = app.get('env')

function ensureSecure(req, res, next){
  if(req.secure){
    // OK, continue
    return next();
  };
  // handle port numbers if you need non defaults
  // res.redirect('https://' + req.host + req.url); // express 3.x
  res.redirect('https://' + req.hostname + req.url); // express 4.x
}
if (env === 'production') {
  app.all('*', ensureSecure);
}

app.use(morgan('dev')) // logging middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(favicon(path.join(__dirname, '../../../../public/images', 'favicon.ico')))
app.use(express.static('public'))

function routeToIndex(req: any, res: any) {
  const index: string = '../../../../public/index.html'
  res.sendFile(path.join(__dirname, index), (err: any) => {
    if (err) res.status(500).send(err)
  })
}

// #######################################
// #    CLIENT ROUTES  -->  REACT ROUTER
// #######################################
// Add forwarding to the clientside REACT-ROUTER --> src/client/app.tsx
if (env === 'production') {
  // If you update src/client/app.tsx, then you MUST update here (production only)
  app.use('/landing', routeToIndex)
}

// #######################################
// #    API ROUTE  -->  CONTROLLER
// #######################################
// Add your controller(s) here
//app.use('/api', MyController)

// - needed if you are using s3
// - example GET request for your s3 file -> api/s3/uploads/filename.jpg
// -
// app.use('/api/s3', require('react-s3-uploader/s3router')({
//   bucket: "mybucket",
//   headers: {'Access-Control-Allow-Origin': '*'}, // optional
//   ACL: 'private', // this is default
//   uniquePrefix: true // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
// }));

// #######################################
// #    ERROR HANDLING - DO NOT MOVE
// #######################################
// catch 404 and forward to errorHandler
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new HttpError('not found')
  err.status = 404
  next(err)
})
app.use(errorHanlder)

const sslOpts = {
  key: fs.readFileSync(path.resolve(__dirname,'../ssl/server.key')),
  cert: fs.readFileSync(path.resolve(__dirname,'../ssl/server.crt')),
  requestCert: false,
  rejectUnauthorized: false
};

let port = 8080 // dev-port

if (env === 'production') {
  // start ssl server
  https.createServer(sslOpts, app).listen(443, function() {
    console.log('Listening on port 443 with SSL')
    console.log(`NODE_ENV: ${env}`)
  })
  port = 80 // prod-port
}

http.createServer(app).listen(port, function() {
  console.log(`Listening on port ${port}`)
  console.log(`NODE_ENV: ${env}`)
})