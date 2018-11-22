import dao from '../src/server/express/services/dao'

const {renderHtml} = require('../src/server/express/templates/PurchaseEmail')

;(async () => {
  const user = await dao.getUser({email: 'g00dnatur3@gmail.com'})
  if (user && user._id) {
    const certs = await dao.getSoldCertificates({userId: user._id})

    for (let c of certs) {
      if (!c.businessId) throw `missing required businessId for soldCert: ${c._id}`
      const business = await dao.getBusiness(c.businessId)
      if (!business) throw `business not found for id: ${c.businessId}`
      c.business = business

      if (!c.fundraiserId) throw `missing required fundraiserId for soldCert: ${c._id}`
      const fundraiser = await dao.getFundraiser(c.fundraiserId)
      if (!fundraiser) throw `fundraiser not found for id: ${c.fundraiserId}`
      c.fundraiser = fundraiser

      if (!c.certificateOfferId) throw `missing required certificateOfferId for soldCert: ${c._id}`
      const offer = await dao.getCertificateOffer(c.certificateOfferId)
      if (!offer) throw `certificateOffer not found for id: ${c.certificateOfferId}`
      c.offer = offer
    }

    console.log(certs)
    const html = renderHtml({user, certificates: certs})
    console.log()
    console.log(html)
    console.log()
  }
  await dao.close()
})()
.catch(err => {
  console.log(err)
})
