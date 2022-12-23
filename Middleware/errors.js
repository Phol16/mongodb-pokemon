const errors = (error,request,response,next)=>{
  return response.status(500).json({
    error:error.message,
  })
}
export default errors