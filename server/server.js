const express = require('express');
require('dotenv').config();
const app = express();
const session = require('express-session');
const {appRouter} = require('./Routes/appRouter.js');
const loginRouter = require('./Routes/loginRouter');
const {manageNewProduct, manageNewMessage, persistentHistory} = require('./helpers/socketFunctions.js');
const {setDatabase} = require('../Database/product_DB.js');
const handlebarsEngine = require('./helpers/handlebars');
const {mongodb} = require('../Database/mongodb.js');
const PORT = process.env.PORT || 3001;

app.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin',"http://localhost:3000");
    res.setHeader('Access-Control-Allow-Headers',"*");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

setDatabase();
mongodb().catch(err=>console.log(err));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:true,
    saveUninitialized:true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/api', appRouter);
app.use('/', loginRouter);


const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(PORT, ()=>{
    console.log(`\n *** Server initializated on port ${PORT} *** \n`)
});
http.on('err', (err)=>{
    console.log(err)
})

io.on('connection', (socket)=>{
    console.log('User connected')
    persistentHistory(socket)
    socket.on('newProduct',(data)=>{
        manageNewProduct(data, socket)
    })
    socket.on('newMessage', msg=>{
        manageNewMessage(msg, socket, io)
    })
})

//function to export socket.io to other js files.
function getSocketFromApp(){
    return io;
}

//function to modularize handlebars config.
handlebarsEngine(app);

module.exports.importedIo = getSocketFromApp;