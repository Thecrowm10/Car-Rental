const express=require('express')
const router=express.Router()
const mysql_connect=require("./mysql_connector")
const connection = require('./mysql_connector')
router.get("/", (req,res)=>
{
    res.render("login")
    res.end()
}
)
router.use("/login",(req,res)=>
    {
        if(req.method==='GET'){
            res.render()
            res.end()
        }
        else{
            mysql_connect.getConnection((err,connection)=>
            {
                if(err){
                    connection.release()
                    res.send(err)
                    res.end()
                }
                else{
                    var username=req.body.username
                var password=req.body.password
    const q=`insert into login (username,password)values('${username}','${password}')`
    connection.query(q,(err)=>
    {
        if(err){
            connection.release()
                    res.render(err)
                    res.end()
        }
        else{
            res.render('index',{message:username+" Added Successfully"})
        } res.end()
    })
                    }
            })
        }  
    }
    )
    router.use("/register",(req,res)=>
        {
            if(req.method==='GET'){
                res.render("register")
                res.end()
            }
            else{
                mysql_connect.getConnection((err,connection)=>
                {
                    if(err){
                        connection.release()
                        res.send(err)
                        res.end()
                    }
                    else{
                        var name=req.body.name
                        var username=req.body.username
                        var email=req.body.email
                    var password=req.body.password
                    var confirm_password=req.body.confirm_password
        const q=`insert into register (name,username,email,password,confirm_password)values('${name}','${username}','${email}','${password}','${confirm_password}')`
        connection.query(q,(err)=>
        {
            if(err){
                connection.release()
                        res.render(err)
                        res.end()
            }
            else{
                res.render('index',{message:username+" Added Successfully"})
            }
        })
                        }
                })
            }  
        }
        )
module.exports = router; 