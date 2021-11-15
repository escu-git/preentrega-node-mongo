const { UserModel } = require('../../Database/mongodb');
const dbManager = require('./db');
const collection = 'users';

const log = {
    signUp: async(req, res)=>{
        try{
            const{user, password}=req.body;
            const usuario = {user:user, password:password, isAdmin:false}
            console.log(usuario);
            const savedUser = await dbManager.insert(collection, usuario)
            res.status(200).json({data:savedUser, message:`Usuario ${user} fue creado con éxito`})
        }catch(err){
            res.status(400).json({message:'Error creando user', err:err})
        }
    },
    login: async(req, res)=>{
        try{
            const{user, password}=req.body;
            const queryDB = await UserModel.find({user:user});
            if(queryDB.length == 0){
                res.status(401).json({message:`No se ha encontrado el user ${user}.`})
            }else{
                if(queryDB[0].password == password){
                    req.session.user = user;
                    req.session.password = password;
                    res.send(`User ${user} logueo correctamente.`)
                }else{
                    console.log('La contraseña es incorrecta')
                }
            }
        }catch(err){
            res.status(400).json({err:err})
        }
    }
}

module.exports=log;