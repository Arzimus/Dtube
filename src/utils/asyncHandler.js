const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(
      requestHandler(req, res, next)
    ).catch((err) => next(err))
  }
}

export { asyncHandler }

// const asyncHandler = (fn) => async (fn) => {
//   try {
//     fn(req, res, next)
//   } catch (error) {
//     res.status(error.code).json({
//       success: false,
//       message: error.message
//     })
//   }
// }