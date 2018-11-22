import { JsonConvert, ValueCheckingMode } from 'json2typescript'

import Entity from '../src/model/Entity'
import Like from '../src/model/Like'
import User from '../src/model/User'
import Fundraider from '../src/model/Fundraiser'
import SoldCertificate from '../src/model/SoldCertificate'
import Offer from '../src/model/Offer'
import Address from '../src/model/Address'
import Business from '../src/model/Business'
import Champion from '../src/model/Champion'
import UserReference from '../src/model/UserReference'
import Sponsorship from '../src/model/Sponsorship'
import CertificateOffer from '../src/model/CertificateOffer'

import likes from '../src/fixtures/likes'
import businesses from '../src/fixtures/businesses'
import certificateOffers from '../src/fixtures/certificateOffers'
import champions from '../src/fixtures/champions'
import sponsorships from '../src/fixtures/sponsorships'
import soldCertificates from '../src/fixtures/soldCertificates'
import fundraiders from '../src/fixtures/fundraisers'
import users from '../src/fixtures/users'

import assert from 'assert'
import getLog from '../src/utils/log'
const log = getLog(__filename)

let jsonConvert: JsonConvert = new JsonConvert()
jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL

let certificateOffer: CertificateOffer = jsonConvert.deserializeObject(certificateOffers[0], CertificateOffer)
assert(certificateOffer instanceof Entity)
assert(certificateOffer instanceof Offer)
assert(certificateOffer instanceof CertificateOffer)

const a: any = businesses[0]
a.offers = [certificateOffer]

log.info(a)
console.log()

let business: Business = jsonConvert.deserializeObject(a, Business)

assert(business instanceof Entity)
assert(business instanceof Business)
if (business.locations) assert(business.locations[0] instanceof Address)

const test = jsonConvert.serialize(business)

assert(!test.offers)

//log.info(test)

let like: Like = jsonConvert.deserializeObject(likes[0], Like)

log.info(like)

assert(like instanceof Entity)
assert(like instanceof Like)
assert(like.userRef instanceof UserReference)

let champion: Champion = jsonConvert.deserializeObject(champions[0], Champion)

log.info(champion)

assert(champion instanceof Entity)
assert(champion instanceof Offer)
assert(champion instanceof Champion)

let sponsorship: Sponsorship = jsonConvert.deserializeObject(sponsorships[0], Sponsorship)

assert(sponsorship instanceof Entity)
assert(sponsorship instanceof Offer)
assert(sponsorship instanceof Sponsorship)

let soldCertificate: SoldCertificate = jsonConvert.deserializeObject(soldCertificates[0], SoldCertificate)

assert(soldCertificate instanceof Entity)
assert(soldCertificate instanceof SoldCertificate)

let user: User = jsonConvert.deserializeObject(users[0], User)

assert(user instanceof Entity)
assert(user instanceof User)

let fundraider: Fundraider = jsonConvert.deserializeObject(fundraiders[0], Fundraider)

assert(fundraider instanceof Entity)
assert(fundraider instanceof Fundraider)

log.info(certificateOffer)


