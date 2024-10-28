import express from "express"
import fs from 'fs/promises'

const app = express()

const port = process.env.PORT || 3001


let jsonData;

const readJson = async () => {
    const data = await fs.readFile("data.json", 'utf-8');
    jsonData = JSON.parse(data)
}

readJson().then(()=>{
    app.listen(port, ()=>{
        console.log(`App listening on port ${port}`)
    })
})

app.get('/seaAnimals', (req, res) =>{
    res.send(jsonData)
})

app.get('/name/:name', (req, res) => {
    const reqName = req.params.name.substring(1); // Substring to match the format in your example
    const seaAnimals = jsonData.seaAnimals;

    seaAnimals.forEach((animal, index) => {
        if (animal.name === reqName) {
            const foundAnimal = seaAnimals[index]; // Use the current index to retrieve the object
            res.send(foundAnimal);
        }
    });
});

app.get('/size', (req, res) => {
    const reqSize = req.query.size;
    const seaAnimals = jsonData.seaAnimals;
    let filteredAnimals = [];

    seaAnimals.forEach((animal) => {
        const animalSize = parseFloat(animal.size.split('-')[0]); 
        if (reqSize === 'small' && animalSize <= 25) {
            filteredAnimals.push(animal);
        } else if (reqSize === 'medium' && animalSize > 25 && animalSize <= 200) {
            filteredAnimals.push(animal);
        } else if (reqSize === 'large' && animalSize > 200) {
            filteredAnimals.push(animal);
        }
    });
    res.json(filteredAnimals);
});

app.get('/location', (req, res) => {
    const reqLocation = req.query.location;
    const seaAnimals = jsonData.seaAnimals;
    let filteredAnimals = [];

    seaAnimals.forEach((animal) => {
        if (animal.location.includes(reqLocation)) {
            filteredAnimals.push(animal);
        }
    });
    res.json(filteredAnimals);
});