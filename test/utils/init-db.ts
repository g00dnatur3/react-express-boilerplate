import dao from '../../src/server/express/services/dao'
//import Like from '../../src/model/Like'
import User from '../../src/model/User'
import Fundraiser from '../../src/model/Fundraiser'
//import SoldCertificate from '../../src/model/SoldCertificate'
import Business from '../../src/model/Business'
import Champion from '../../src/model/Champion'
import Sponsorship from '../../src/model/Sponsorship'
import CertificateOffer from '../../src/model/CertificateOffer'
//import likes from '../../src/fixtures/likes'
import businesses from '../../src/fixtures/businesses'
import certificateOffers from '../../src/fixtures/certificateOffers'
import champions from '../../src/fixtures/champions'
import sponsorships from '../../src/fixtures/sponsorships'
//import soldCertificates from '../../src/fixtures/soldCertificates'
import fundraisers from '../../src/fixtures/fundraisers'
import users from '../../src/fixtures/users'
import { deserialize } from '../../src/utils/json'

import getLog from '../../src/utils/log'
const log = getLog(__filename)

;(async () => {

  log.info('drop database...')
  await dao.dropDatabase()

  log.info('save users...')

  for (let user of users) {
    await dao.save(deserialize(user, User))
  }
  
  log.info('save businesses...')
  for (let business of businesses) {
    await dao.save(deserialize(business, Business))
  }
  
  log.info('save fundraiders...')
  log.info('save businesses...')
  for (let fundraiser of fundraisers) {
    await dao.save(deserialize(fundraiser, Fundraiser))
  }
  
  // log.info('save likes...')
  // for (let like of likes) {
  //   await dao.save(deserialize(like, Like))
  // }
  
  // log.info('save soldCertificates...')
  // for (let soldCertificate of soldCertificates) {
  //   await dao.save(deserialize(soldCertificate, SoldCertificate))
  // }
  
  log.info('save champions...')
  for (let champion of champions) {
    await dao.save(deserialize(champion, Champion))
  }
  
  log.info('save certificateOffers...')
  for (let certificateOffer of certificateOffers) {
    await dao.save(deserialize(certificateOffer, CertificateOffer))
  }
  
  log.info('save sponsorships...')
  for (let sponsorship of sponsorships) {
    await dao.save(deserialize(sponsorship, Sponsorship))
  }

  await dao.close()
  log.info('Database Populated')

})().catch(err => {
  log.error(err)
  dao.close()
})
