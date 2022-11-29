import { Request, Response, NextFunction } from 'express'

const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/login')
  }
}

export default adminAuth
