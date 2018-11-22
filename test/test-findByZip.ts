import dao from '../src/server/express/services/dao'
import Fundraiser from '../src/model/Fundraiser'
import getLog from '../src/utils/log'
const log = getLog(__filename)

;(async() => {
  const fr: Fundraiser | null = await dao.getFundraiserByEmail('john.doe@orchard.com')
  log.info('fr', fr)
  if (fr) {
    const offers = await dao.findCertificateOffersByDistance(fr)
    console.log('offers', offers)
  }
  await dao.close()
})().catch(err => {
  log.error(err)
  dao.close()
})