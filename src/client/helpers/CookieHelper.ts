import Cookies from 'js-cookie'
import uuid from 'uuid/v4'
import getLog from '../../utils/log'

const log = getLog('CookieHelper')

export const cookieNames = Object.freeze({
  DEVICE: 'c-d',
})

export const getDeviceId = (): string => {
  let deviceId = Cookies.get(cookieNames.DEVICE)
  if (!deviceId) {
    deviceId = uuid()
    Cookies.set(cookieNames.DEVICE, deviceId, { expires: 9999 })
  }
  log.info('deviceId', deviceId)
  return deviceId
}