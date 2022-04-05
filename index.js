const express = require('express')
const app = express();
const swaggerDocument = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//some exapmle usually database
var users = [
    {id:0, first:"Amy", last :"Smith", phone:"xxx1112222", email:"amy@mit.edu", password:"password", gender: "female"},
    {id:1, first:"Bobbie", last :"Johnson", phone:"xxx2223333" , email:"JBob@mit.edu", password: "12345", gender: "male"}
            ]


//get all data stored
app.get("/users", (req,res)=>{
    res.send(users);
})
            
app.post("/user",(req,res)=>{
    users.push({
                id: req.body.id,
             first: req.body.first,
              last: req.body.last,
             phone: req.body.phone,
             email: req.body.email,
          password: req.body.password,
            gender: req.body.gender
        });
    res.send(`${JSON.stringify(users)} created`)
   
 })

app.delete("/user/:id", (req,res)=>{

    //console.log(`delete:${id} ${req.params.id}`)
    users = users.filter(item => item.id != req.params.id)
    res.send("users left:"+JSON.stringify(users));
})

app.get("/user/:id", (req, res) => {
    console.log(req);
    const result = users.filter(user => user.id == req.params.id);
    res.send(result);
});

app.listen(3000, () => {console.log('runnning on the port 3000')})