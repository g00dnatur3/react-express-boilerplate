import getLog from '../../utils/log'

const log = getLog(__filename)
const {createClient} = require('node-ses')
const client = createClient({ 
  key: process.env.AWS_ACCESS_KEY_ID, 
  secret: process.env.AWS_SECRET_ACCESS_KEY 
});

const from = 'yourname@something.com'

function sendEmail(opts: {to: string, subject: string, message: string, altText: string}) {
  log.info('sendEmail', {...opts, from})
  return new Promise((resolve, reject) => {
    client.sendEmail({...opts, from}, (err, data, res) => {
      if (err) reject(err)
      else resolve({data, res})
    });
  })
}

export {
  sendEmail
}