const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const express = require('express');
const cors = require('cors')
const port = process.env.PORT || 5000;

const app = express();



// mildware 

app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.edl5qg1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri)

async function run(){
    try{
        const servicesCollection = client.db('geniousCar').collection('services')

        app.get('/services',async (req,res)=>{
            const query = {};
            const cursor = servicesCollection.find(query)
            const services = await cursor.toArray()
            res.send(services);
        })

    }
    finally{

    }
}

run().catch(err=>console.log(err))




app.get('/',(req,res)=>{
    res.send('api running on port')
})

app.listen(port,()=> console.log('port number ',port))