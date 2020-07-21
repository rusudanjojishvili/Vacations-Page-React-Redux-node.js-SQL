const router = require('express').Router()
const jwt = require('jsonwebtoken')


const onlyUsers = (req, res, next)=>{
    const token = req.header("token")
    console.log(req.headers)
    //token is instead of authorization
    if(token){
    jwt.verify(token, "blah", (err, decoded)=>{
        if(err){
            res.sendStatus(401)
        }else{
            
            req.user = decoded
            next()
        }
    })
    }else{
        res.sendStatus(401)
    }
    }
    
    const onlyAdmins = (req, res, next)=>{
        const token = req.header("token")
        //token is instead of authorization
        if(token){
        jwt.verify(token, "blah", (err, decoded)=>{
            if(err){
                res.sendStatus(401)
            }else{
                
                if(decoded.isAdmin){
                req.user = decoded
                next()
                }else{
                    res.sendStatus(401)
                }
            }
        })
        }else{
            res.sendStatus(401)
        }
        }
        
        module.exports= {onlyUsers,onlyAdmins}
