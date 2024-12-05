var express = require("express")
var mongodb = require("mongodb").MongoClient;

var cors = require("cors");
const { MongoClient } = require("mongodb");

var conString = "mongodb://127.0.0.1:27017"

var app = express()

app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use(express.json())


// POST Method for User Register
app.post("/register-user", (req,res)=>{
    
    var user = {
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Mobile: req.body.Mobile
    }

    MongoClient.connect(conString).then(clienObject=>{
        var database = clienObject.db("todo")
        database.collection("users").insertOne(user).then(()=>{
            console.log("User Registered")
            res.end()
        })
    })
})


// GET Method for Fetching all User data
app.get("/users", (req,res)=>{
    MongoClient.connect(conString).then(clienObject=>{
        var database = clienObject.db("todo")
        database.collection("users").find({}).toArray().then(documents=>{
            res.send(documents)
            res.end
        })
    })
})

// POST method for Add appointment
app.post("/add-appointment", (req, res)=>{

    var appointment = {
        AppointmentId: parseInt(req.body.AppointmentId),
        Title: req.body.Title,
        Description: req.body.Description,
        Date: new Date(req.body.Date),
        UserId : req.body.UserId
    }


    MongoClient.connect(conString).then(clienObject=>{
        var database = clienObject.db("todo")
        database.collection("appointments").insertOne(appointment).then(()=>{
            res.send("Appointment Added...")
            res.end()
        })
    })
})

// GET Method for appointments based on UserId
app.get("/get-appointments/:userid", (req, res)=>{

    MongoClient.connect(conString).then(clienObject=>{
        var database = clienObject.db("todo")

        database.collection("appointments").find({UserId:req.params.userid}).toArray().then(documents=>{
            res.send(documents);
            res.end()
        })
    })

})


// GET method for appointment based on ID
app.get("/get-appointment/:id", (req, res)=>{

    MongoClient.connect(conString).then(clienObject=>{
        var database = clienObject.db("todo")

        database.collection("appointments").find({AppointmentId: parseInt(req.params.id)}).toArray().then(documents=>{
            res.send(documents);
            res.end()
        })
    })

})


//  PUT Method for Edit appointment
app.put("/edit-appointment/:id", (req, res)=>{

    var id = parseInt(req.params.id)

    var appointment = {
        AppointmentId: parseInt(req.body.AppointmentId),
        Title: req.body.Title,
        Description: req.body.Description,
        Date: new Date(req.body.Date),
        UserId : req.body.UserId
    }

    MongoClient.connect(conString).then(clienObject=>{
        var database = clienObject.db("todo")
        database.collection("appointments").updateOne({AppointmentId: id},{$set:appointment}).then(()=>{
            res.send("Appointment Added...")
            console.log("Appointment Edited")
            res.end()
        })
    })
})

// DELETE Method for delete appointment based on id
app.delete("/delete-appointment/:id", (req, res)=>{
    var id = parseInt(req.params.id)

    MongoClient.connect(conString).then(clienObject=>{
        var database = clienObject.db("todo")
        database.collection("appointments").deleteOne({AppointmentId:id}).then(()=>{
            res.send("Appointment Deleted...")
            console.log("Appointment Deleted...")
            res.end()
        })
    })
})


app.listen(4040)

console.log(`Server Started http://127.0.0.1.4040`)