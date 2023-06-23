let con = require('../models/database');
let conn = con.conn;
async function postProduct(req,res){
    console.log(req.body);
    conn.connect((err)=>{
        if(err){
            throw err;
        }
        const sql = 'insert into stationary(name,description,price,quantity) values?';
        const values = [req.body.name,req.body.desc,req.body.price,req.body.quantity];
        conn.query(sql,[[values]],(err,result)=>{
             if(err){
                return res.send({message:'error'});
             }
             return res.send({
                message:'successfully inserted'
             })
        })
    })
}
async function getData(req,res){
    conn.connect((err)=>{
        if(err){
            throw err;
        }
        const sql = 'select * from stationary';
        
        conn.query(sql,(err,result)=>{
             if(err){
                return res.send({message:'error'});
             }
             return res.send(result);
        })
    })
}
function getDataBasedOnId(req,res){
    conn.connect((err)=>{
        if(err){
            console.log(err);
        }
        const sql = 'select quantity from stationary where id=?';
        conn.query(sql,[req.params.id],(err,result)=>{
            if(err){
                return res.send({
                    message:'error'
                })
            }
            return res.send(result);
        })
    })
}
function updateProduct(req,res){
    conn.connect((err)=>{
        if(err){
           throw err;
        }
        const sql = 'update stationary set stationary=? where id=?';
        conn.query(sql,[req.body.quantity,req.params.id],(err,result)=>{
            if(err){
                return res.send({
                    message:'error'
                })
            }
            return res.send(
                {
                    message:'update succesfull'
                }
            );
        })
    })
}
module.exports = {postProduct,getDataBasedOnId,getData,updateProduct};