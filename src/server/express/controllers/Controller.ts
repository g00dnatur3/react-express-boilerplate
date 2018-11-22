import { Router, Request, Response, NextFunction } from 'express'
import HttpError from '../HttpError'
import dao from '../../services/dao'
import getLog from '../../../../src/utils/log'

const log = getLog(__filename)
const router: Router = Router()

// EXAMPLE GET
// router.get('/???', async (req: Request, res: Response, next: NextFunction) => {
//   if (!req.query.email) {
//     return next(new HttpError('missing required query-param: email', 400))
//   }
//   try {

//   }
//   catch(err) {
//     log.error(err)
//     return next(new HttpError(`Internal error: ${err.message}`, 500))
//   }
// })


// EXAMPLE POST
// router.post('/???', async (req: Request, res: Response, next: NextFunction) => {
//   log.info('/???', req.body)
//   const data = req.body
//   try {

//   }
//   catch (err) {
//     log.error(err)
//     return next(new HttpError(`Internal error: ${err.message}`, 500))
//   }
// })

export default router