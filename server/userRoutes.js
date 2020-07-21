const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const cors = require('cors')


router.use(cors())

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'VACATIONS'
});

db.connect((err)=>{
  if(err){
      throw err
  
  }
  console.log("connected to my sql")
})

router.post('/register', async (req,res)=>{
  const {fname,lname,username,password} = req.body
  if(fname && lname && username && password){
    const q1=`SELECT * FROM users where username='${username}'`
    const users = await Query(q1)
    console.log(users)
    if(!users.length){
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
          console.log(hash)
          const q = `INSERT INTO users
          (fname,lname,username,password)
          VALUES ("${req.body.fname}","${req.body.lname}","${req.body.username}","${hash}")
          ` 

         const results = await Query(q)
         const q2= `SELECT * FROM users` 
         const users = await Query(q2)
         const user = users.find(u=>u.username===username)
         if(user){
          if(bcrypt.compareSync(password,user.password )){
          jwt.sign({username, isAdmin: user.isAdmin}, "blah",(err, token)=>{
            if (err){
        
              res.sendStatus(500)
              throw err1
            }
            let id = user.id
            let isAdmin = user.isAdmin
            res.json({token,isAdmin,id})
            console.log(token)
            
          
      })
      }else{
          res.status(400).send("wrong password")
      }
              }else{
                  res.status(400).send("user not found")
                
              }
    
    }else {
      res.status(400).send("username already exists")
    }
     
      }else {
          res.status(400).send("missing some info")
      }
  
    })

    router.post('/login', async(req,res)=>{
      const {username,password} = req.body
      if(username && password){
        const q= `SELECT * FROM users` 
        const users = await Query(q)
          const user = users.find(u=>u.username===username)
          if(user){
      if(bcrypt.compareSync(password,user.password )){
      jwt.sign({username, isAdmin: user.isAdmin}, "blah",(err, token)=>{
        if (err){
    
          res.sendStatus(500)
          throw err1
        }
        let id = user.id
        let isAdmin = user.isAdmin
        res.json({token,isAdmin,id})
        
        
      
  })
  }else{
      res.status(400).send("wrong password")
  }
          }else{
              res.status(400).send("user not found")
              //redirecting to the registration form
          }
      }else {
          res.status(400).send("missing some info")
      }
    })
  

module.exports = router

function Query(q,...par){
  return new Promise((resolve,reject)=>{
   db.query(q,par,(err,results)=>{
       if(err){
           reject(err)
       }else{
           resolve(results)
       }
   })
  })
}
