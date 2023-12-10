const isAdmin = (req,res,next) => {
    let user = req.auth_user
    if(user.is_admin==true){
        next()
    } else{
        res.status(401).json({msg:"Unauthorized access"})
    }


}

module.exports = isAdmin