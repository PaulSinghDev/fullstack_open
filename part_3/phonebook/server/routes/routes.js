const { request } = require("express");
module.exports = function (app, persons) {
    const getUniqueId = (number = 0) => {
        const randomNumber = Math.ceil(Math.random() * (number > 0 ? number : Math.pow(13,5)));
        const id = persons.find(person => person.id === randomNumber) 
            ? getUniqueId(number)
            : randomNumber;

        return id;
    };
    app.get('/api/persons', (request, response) => {
        return response.json(persons);
    });
    app.get('/info', (request, response) => {
        const date = new Date().toLocaleString();
        const numberOfPeople = persons.length;
        return response.send(`The phone book currently has information for ${numberOfPeople} people. \n ${date}`);
    });
    app.get('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id);
        const person = persons.find(person => person.id === id);
        return person ? response.json(person) : response.status(404).end();
    });
    app.delete('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id);
        persons = persons.filter(person => person.id !== id);
        return response.status(204).end();
    });
    app.post('/api/persons', (request, response) => {
        const { name, number } = request.body;
        console.log(name, number);
        if(!name) {
            return response.status(400).json({
                error: "No name provided" 
            });
        }
        if(!number) {
            return response.status(400).json({
                error: "No number provided" 
            });
        }

        const existingEntry = persons.find(person => person.name === name);
        if(existingEntry) {
            return response.status(400).json({
                error: `Someone with the name ${name} already exists`
            });
        }

        const id = getUniqueId();
        const newPerson = {
            name,
            number,
            id
        };
        persons = persons.concat(newPerson);
        return response.json(newPerson);
    });
    app.put('/api/persons/:id', (request, response) => {
        const id = Number(request.body.id);
        const person = persons.find(person => person.id === id);
        if(!person) {
            return response.status(404).end();
        }
        person.name = request.body.name;
        person.number = request.body.number;

        return response.json(person);
    });
};