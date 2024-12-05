var express = require("express")

var mongoClient = require("mongodb").MongoClient

var app = express()

app.get('/', (req, res)=>{
     res.send("<h2>Welcome to API</h2>")
     res.end()
})


app.get('/products', (req, res)=>{
    mongoClient.connect("mongodb://127.0.0.1:27017")
    .then(clientObj=>{
        var database = clientObj.db("tododb")
        database.collection("products").find({}).toArray().then(documents=>{
            res.send(documents)
            res.end
        })
    })
})


app.post('/add',(req, res)=>{
    res.send("POST Method: For saving data on Server")
    res.end()
})


app.put('/edit', (req,res)=>{
    res.send("PUT Method : Modifying and updating data on server")
    res.end()
})


app.delete('/delete', (req, res)=>{
    res.send("DELETE Method : Removing details from server")
    res.end()
})


app.get('*', (req, res)=>{
    res.send("<code>Not Found: Page you requested not found</code>")
    res.end()
})

app.listen(4040)
console.log(`Server App Sarted http://127.0.0.1:4040`)