import { JsonConvert, ValueCheckingMode } from 'json2typescript'
import User from '../src/model/User'
import users from '../src/fixtures/users'
//import businesses from '../src/fixtures/businesses'
import dao from '../src/server/express/services/dao'

//import assert from 'assert'
import getLog from '../src/utils/log'
const log = getLog(__filename)

let jsonConvert: JsonConvert = new JsonConvert()
jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;

;(async() => {

  const userToSave = jsonConvert.deserializeObject(users[0], User)

  await dao.dropCollection('users')

  const r = await dao.save(userToSave)
  if (r) {
    log.info(r.result)
  }

  const user = await dao.getUser({id: userToSave._id})

  log.info(user)

  await dao.close()

})().catch(err => {
  log.error(err)
  dao.close()
})


