const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());  
app.use(express.json()); // populate request body

const thingamabobs = [
    {id: 1, name: "plumbus", price: 34.59},
    {id: 2, name: "vana furby", price: 666},
    {id: 3, name: "sapakas", price: 2000},
]

app.get('/thingamabobs', (req, res) => {res.send(thingamabobs)})

app.get('/thingamabobs/:id', (req, res) => {
    if (typeof thingamabobs[req.params.id -1] === 'undefined') 
        {
            return res.status(404).send({error:"Object not found. Check your thingamabobs id"})
        }
        res.send(thingamabobs[req.params.id -1]);
})

app.post('/thingamabobs', (req, res) => {
    if(!req.body.name || !req.body.price) 
    {
        return res.status(400).send({error:"One or multiple parameters missing"})
    }

    let newThingy = {
        id: thingamabobs.length+1, 
        price: req.body.price, 
        name: req.body.name
    }

    thingamabobs.push(newThingy)
    res.status(201).location('localhost:8080/thingamabobs/'+(thingamabobs.length-1)).send(newThingy)
})

app.delete('/thingamabobs/:id', (req, res) => {
    if (typeof thingamabobs[req.params.id -1] === 'undefined') 
        {
            return res.status(404).send({error:"Object not found. Check your thingamabobs id"})
        }
    thingamabobs.splice(req.params.id -1,1)
    res.status(204).send({error: "No content"})
})

app.put('/thingamabobs/:id', (req, res) => { 
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: "One or multiple parameters missing" });
    }
    
    const id = parseInt(req.params.id);

    const index = thingamabobs.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).send({ error: "Thingamabob not found" });
    }

    thingamabobs[index].name = req.body.name;
    thingamabobs[index].price = req.body.price;
    res.status(200).send(thingamabobs[index]);
}); 

const people = [
    {id: 1, name: "asd", email: "robi111@gmail.com"},
    {id: 2, name: "das asd", email: "robi222@gmail.com"},
    {id: 3, name: "sadas", email: "robi333@gmail.com"},
]

app.get('/people', (req, res) => {res.send(people)})

app.get('/people/:id', (req, res) => {
    if (typeof people[req.params.id -1] === 'undefined') 
        {
            return res.status(404).send({error:"Object not found. Check your people id"})
        }
        res.send(people[req.params.id -1]);
})

app.post('/people', (req, res) => {
    if(!req.body.name || !req.body.email) 
    {
        return res.status(400).send({error:"One or multiple parameters missing"})
    }

    let peopleThingy = {
        id: people.length+1, 
        email: req.body.email, 
        name: req.body.name
    }

    people.push(peopleThingy)
    res.status(201).location('localhost:8080/people/'+(people.length-1)).send(peopleThingy)
})

app.delete('/people/:id', (req, res) => {
    if (typeof people[req.params.id -1] === 'undefined') 
        {
            return res.status(404).send({error:"Object not found. Check your thingamabobs id"})
        }
    people.splice(req.params.id -1,1)
    res.status(204).send({error: "No content"})
})

app.put('/people/:id', (req, res) => { 
    if (!req.body.name || !req.body.email) {
        return res.status(400).send({ error: "One or multiple parameters missing" });
    }
    
    const id = parseInt(req.params.id);

    const index = people.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).send({ error: "People not found" });
    }

    people[index].name = req.body.name;
    people[index].price = req.body.email;
    res.status(200).send(people[index]);
}); 


app.listen(8080, () => {
    console.log(`API running at: http://localhost:8080`)
})

//npm init -y
//npm i express cors
//node .
//xh v localhost:8080/thingamabobs name=RaketiteadlaneErki price=2.55
