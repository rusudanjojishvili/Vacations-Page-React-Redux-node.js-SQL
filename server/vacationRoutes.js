const router = require('express').Router()
const mysql = require('mysql')
const {onlyUsers, onlyAdmins} = require('./mw')
const cors = require('cors')

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
router.use(cors())
router.get('/',onlyAdmins,async(req,res)=>{
    //i need to add then onlyadmins or only users
   const q=`
   
select 
vacations.id,
vacations.description,
vacations.destination ,
vacations.img,
DATE_FORMAT(fromdate, "%Y-%m-%d") as fromdate,
DATE_FORMAT(todate, "%Y-%m-%d") as todate,
vacations.price,
vacations.followersN,
vacations.status
from vacations`
   try{
   const results = await Query(q)
   res.json(results)
   }
   catch(err){
     res.json(err)
   }
})
router.get('/followedvacs/:id',onlyUsers,async(req,res)=>{
    let id = req.params.id
    let q =`select 
    vacations.id,
    vacations.description,
    vacations.destination ,
    vacations.img,
    DATE_FORMAT(fromdate, "%Y-%m-%d") as fromdate,
    DATE_FORMAT(todate, "%Y-%m-%d") as todate,
    vacations.price,
    vacations.followersN,
    followedvacs.status,
    followedvacs.users_id 
    from vacations
    left join followedvacs on vacations.id = followedvacs.vacations_id
    where followedvacs.users_id =${id} 
    order by vacations.id   
    `
    const results1 = await Query(q)
    let NumbsArr = results1.map(vac=>{
       return vac.id
    });
    let vacIds=[0,...NumbsArr]
    let vacIds1 = vacIds.toString()
    let q2 = `SELECT
    vacations.id,
    vacations.description,
    vacations.destination ,
    vacations.img,
    DATE_FORMAT(fromdate,"%Y-%m-%d") as fromdate,
    DATE_FORMAT(todate, "%Y-%m-%d") as todate,
    vacations.price,
    vacations.followersN,
    vacations.status
    from vacations WHERE id NOT IN (${vacIds1})`
    const results2 = await Query(q2)
    console.log('results2',results2)
    let unitedresults = [...results1, ...results2]
    console.log('results1',results1)
   
    try{
    
     res.json(unitedresults)
            
    }catch(err){
        console.log(err)
    }
    
})

router.post('/', onlyAdmins, async(req,res)=>{
    
    const q=`INSERT INTO VACATIONS
    (description, destination, img, fromdate, todate, price)
    VALUES ("${req.body.description}","${req.body.destination}","${req.body.img}",
    "${req.body.fromdate}","${req.body.todate}",${req.body.price})`
    const results = await Query(q)
    res.json(results)
})
// router.post('/search', onlyAdmins,onlyUsers, async(req,res)=>{
//     const descsearchresult=req.body.description
//     const fromdateresult = req.body.fromdate
//     const todateresult = req.body.todate
//     const q=`select * from vacations where description like '%${descsearchresult}%' or fromdate like '%${fromdateresult}%' or '%${todateresult}%'`
//     try{
//         const results = await Query(q)
//         res.json(results)
//         console.log('results',results)
//         }
//         catch(err){
//           console.log(err)
//         }
// })
router.post('/search/:id',async(req,res)=>{
   const {description,fromdate,todate}=req.body;
   console.log(description,fromdate,todate)
   let id = req.params.id
   let qfinal;
    let q =`select 
    vacations.id,
    vacations.description,
    vacations.destination ,
    vacations.img,
    DATE_FORMAT(fromdate, "%Y-%m-%d") as fromdate,
    DATE_FORMAT(todate, "%Y-%m-%d") as todate,
    vacations.price,
    vacations.followersN,
    followedvacs.status,
    followedvacs.users_id 
    from vacations
    left join followedvacs on vacations.id = followedvacs.vacations_id
    where followedvacs.users_id =${id} 
    order by vacations.id   
    `
    const results1 = await Query(q)
    let NumbsArr = results1.map(vac=>{
       return vac.id
    });
    let vacIds=[0,...NumbsArr]
    let vacIds1 = vacIds.toString()
  
    const q_array=[`select 
    vacations.id,
    vacations.description,
    vacations.destination ,
    vacations.img,
    DATE_FORMAT(fromdate, "%Y-%m-%d") as fromdate,
    DATE_FORMAT(todate, "%Y-%m-%d") as todate,
    vacations.price,
    vacations.followersN,
    followedvacs.status
    from vacations
    left join followedvacs on vacations.id = followedvacs.vacations_id
    where followedvacs.users_id =${id} `
]
const middle=[`union all`]
const q_array2=[`select 
vacations.id,
vacations.description,
vacations.destination ,
vacations.img,
DATE_FORMAT(fromdate, "%Y-%m-%d") as fromdate,
DATE_FORMAT(todate,"%Y-%m-%d") as todate,
vacations.price,
vacations.followersN,
vacations.status
from vacations WHERE id NOT IN (${vacIds1}) `]
    
if(description){
    q_array.push(`AND description like '%${description}%'`)
    q_array2.push(`AND description like '%${description}%'`)
}
if(fromdate){
    q_array.push(`AND fromdate >= date_format('${fromdate}',"%Y/%m/%d") `)
    q_array2.push(`AND fromdate >= date_format('${fromdate}',"%Y/%m/%d") `)
}
if(todate){
    q_array.push(`AND fromdate <= date_format('${todate}',"%Y/%m/%d") `)
    q_array2.push(`AND fromdate <= date_format('${todate}',"%Y/%m/%d") `)
}
let array1 = q_array.join(" ")
let array2 = q_array2.join(" ")
let unitedarrays=[array1,middle,array2]
 
qfinal=unitedarrays.join(" ")
console.log(qfinal)
    
    try{
        const results = await Query(qfinal)
        res.json(results)
        console.log('results',results)
        }
        catch(err){
          console.log(err)
        }
})

router.put('/:id',onlyAdmins, async(req,res)=>{
    let q = `UPDATE VACATIONS
    SET description="${req.body.description}",destination="${req.body.destination}",
    img="${req.body.img}",fromdate="${req.body.fromdate}",todate="${req.body.todate}",price=${req.body.price}
    WHERE id=?` 
    const results = await Query(q,[req.params.id])
    res.json(results)
    console.log(results)
})

router.delete('/:id', onlyAdmins,async (req,res)=>{
    const q = `delete from vacations where id=?`
    const results = await Query(q,[req.params.id])
    res.json(results)
    console.log(results)
})
router.get('/charts',onlyUsers,async (req,res)=>{
    const q = `SELECT * FROM vacations where followersN!=0`
    const results = await Query(q)
    // let destinarr =  results.map(vac=>{
    //     return vac.destination
    //  });
   
    res.json(results)
})



router.post('/follow', onlyUsers,async(req,res)=>{
    const q= `INSERT INTO followedvacs
    (users_id,vacations_id)
    VALUES (${req.body.users_id},${req.body.vacations_id})`
    const results = await Query(q)
    console.log('results',results)
    const q2 =`update vacations set 
    followersN = followersN + 1 where vacations.id=${req.body.vacations_id}`
    const results2 = await Query(q2)
    console.log('results2',results2)
    res.json({results,results2})
})

router.post('/unfollow', onlyUsers,async(req,res)=>{
    const q= `delete from followedvacs
    where users_id = ${req.body.users_id} and vacations_id=${req.body.vacations_id}`
    const results = await Query(q)
    const q2 = `update vacations set 
    followersN = followersN - 1 where vacations.id=${req.body.vacations_id}`
    const results2 = await Query(q2)
    res.json({results,results2})
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
//from_date.split('T')[0]