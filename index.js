
const express = require('express');
const app = express();
app.use(express.json());

const Joi = require('joi');

const fs = require('fs');

const port = process.env.PORT || 3000;

const users =[
    { name :"sai1",password :"password1",profession : "student1",id :1 },
    { name :"sai2",password :"password2",profession : "student2",id :2 },
    { name :"sai3",password :"password3",profession : "student3",id :3 },
    { name :"sai4",password :"password4",profession : "student4",id :4 }

];




app.get('/',function(req,res){
    res.send("My Node Assignment");
});


app.get('/api/users', function(req, res){
    res.send(users);
});


app.post('/api/insert', function(req, res){
    const array = {
        
        name : req.body.name,
        password : req.body.password,
        profession : req.body.profession,
        id : users.length + 1
    };
    users.push(array);
    res.send(array);
   
});


app.put('/api/update/:id/name/password/profession', function(req,res){
    const array = users.find(c => c.id === parseInt(req.params.id));
    if(!array) return res.status(404).send("user data not found.");

    const { error } = validateName(req.body);
    if(error)
    {
        return res.status(400).send(error.details[0].message);
    }
    array.name = req.body.name;
    array.password = req.body.password;
    array.profession = req.body.profession;

    res.send(users);
    
});

function validateName(name)
{
    const schema = {
        name : Joi.string().min(3).required(),
        password : Joi.string().min(3).required(),
        profession : Joi.string().min(3).required()


    };
    return Joi.validate(name, schema);
}


app.delete('/api/delete/:id', function(req,res){
    const array = users.find(c => c.id === parseInt(req.params.id));
    if(!array) return res.status(404).send("user data  not found.");

    const index = users.indexOf(array);
    users.splice(index,1);
    res.send(array);
    
});




app.listen(port, () => console.log(`currently running in ${port}!!!`));
