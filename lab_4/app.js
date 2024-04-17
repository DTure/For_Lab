const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();
 
const patientScheme = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    diagnosis: String
}, { versionKey: false });

const Patient = mongoose.model("Patient", patientScheme);
 
app.use(express.static(__dirname + "/public"));
 
mongoose.connect("mongodb://localhost:27017/patientdb", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err) {
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});
  
app.get("/api/patients", function(req, res) {        
    Patient.find({}, function(err, patients) {
        if(err) return console.log(err);
        res.send(patients)
    });
});
 
app.get("/api/patients/:id", function(req, res) {         
    const id = req.params.id;
    Patient.findOne({_id: id}, function(err, patient) {          
        if(err) return console.log(err);
        res.send(patient);
    });
});
    
app.post("/api/patients", jsonParser, function (req, res) {        
    if(!req.body) return res.sendStatus(400);        
    const { firstName, lastName, age, diagnosis } = req.body;
    const patient = new Patient({ firstName, lastName, age, diagnosis });        
    patient.save(function(err) {
        if(err) return console.log(err);
        res.send(patient);
    });
});
     
app.delete("/api/patients/:id", function(req, res) {         
    const id = req.params.id;
    Patient.findByIdAndDelete(id, function(err, patient) {                
        if(err) return console.log(err);
        res.send(patient);
    });
});
    
app.put("/api/patients", jsonParser, function(req, res) {         
    if(!req.body) return res.sendStatus(400);
    const { id, firstName, lastName, age, diagnosis } = req.body;
    const newPatient = { firstName, lastName, age, diagnosis };
     
    Patient.findOneAndUpdate({_id: id}, newPatient, {new: true}, function(err, patient) {
        if(err) return console.log(err); 
        res.send(patient);
    });
});
