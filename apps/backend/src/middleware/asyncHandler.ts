import { Request, Response, NextFunction } from "express"

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

//Generic
// export function asyncHandler<
//   P = any,
//   ResBody = any,
//   ReqBody = any,
//   ReqQuery = any
// >(
//   fn: (
//     req: Request<P, ResBody, ReqBody, ReqQuery>,
//     res: Response<ResBody>,
//     next: NextFunction
//   ) => Promise<any>
// ) {
//   return (
//     req: Request<P, ResBody, ReqBody, ReqQuery>,
//     res: Response<ResBody>,
//     next: NextFunction
//   ) => {
//     Promise.resolve(fn(req, res, next)).catch(next)
//   }
// }