const express = require('express');

const bodyParser = require('body-parser');
const rout = require('./routes/route');
const app = express();

const cors = require('cors');
app.use(express.json());
app.use(cors(
    {
        origin:['http://localhost:3000'],
        method:['post','get'],
        credentials:true
    }
));
app.use(bodyParser.urlencoded());
app.use(rout.router);
app.listen(8000,()=>{
    console.log('server started');
})