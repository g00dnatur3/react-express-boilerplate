import {deserialize} from '../../utils/json'
import Cookies from 'js-cookie'
import uuid from 'uuid/v4'
import User from '../../model/User'
import getLog from '../../utils/log'

const log = getLog('CookieHelper')

export const cookieNames = Object.freeze({
  DEVICE: 'zf-d',
  USER: 'zf-u',
  LIKES: 'zf-l',
  CART: 'zf-c'
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

export const isLiked = (businessId: string): boolean => {
  const likesCookie = Cookies.get(cookieNames.LIKES)
  if (!likesCookie) return false
  const likes: string[] = JSON.parse(likesCookie)
  return likes.indexOf(businessId) !== -1
}

export const setLiked = (businessId: string) => {
  const likesCookie = Cookies.get(cookieNames.LIKES)
  const likes: string[] = likesCookie ? JSON.parse(likesCookie) : []
  likes.push(businessId)
  Cookies.set(cookieNames.LIKES, JSON.stringify(likes), { expires: 9999 })
}

export const setUser = (user: User) => {
  Cookies.set(cookieNames.USER, JSON.stringify(user), { expires: 9999 })
}

export const getUser = () => {
  const json = Cookies.get(cookieNames.USER)
  return !json ? null : deserialize(JSON.parse(json), User)
}

export const clearLikes = () => Cookies.remove(cookieNames.LIKES)

export const addItemToCart = (itemId): boolean => {
  if (!itemId) {
    log.warn('addItemToCart - itemId is null', itemId)
    return false
  }
  const cartCookie = Cookies.get(cookieNames.CART)
  const cart: any = cartCookie ? JSON.parse(cartCookie) : {}
  if (cart[itemId]) return false
  cart[itemId] = 1
  Cookies.set(cookieNames.CART, JSON.stringify(cart), { expires: 9999 })
  return true
}

export const removeItemFromCart = (itemId) => {
  const cartCookie = Cookies.get(cookieNames.CART)
  const cart: any = cartCookie ? JSON.parse(cartCookie) : null
  if (cart) {
    for (let key of Object.keys(cart)) {
      if (key.startsWith(itemId)) delete cart[key]
    }
    Cookies.set(cookieNames.CART, JSON.stringify(cart), { expires: 9999 })
  }
}

export const clearCart = () => Cookies.remove(cookieNames.CART)

export const getCart = (): string[] => {
  const cartCookie = Cookies.get(cookieNames.CART)
  const cart: any = cartCookie ? JSON.parse(cartCookie) : null
  return !cart ? [] : Object.keys(cart) 
}

export const getCartSize = () => {
  const cartCookie = Cookies.get(cookieNames.CART)
  const cart: any = cartCookie ? JSON.parse(cartCookie) : null
  if (!cart || Object.keys(cart).length === 0) return 0
  return (<any>Object).values(cart).reduce((a,b) => a+b)
}
