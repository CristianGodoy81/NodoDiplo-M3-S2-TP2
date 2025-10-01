const mongoose = require('mongoose');

//mongoose.connect('mongodb+srv://cristianUser:cristianPass@cluster0.ej51pih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
//mongoose.connect('mongodb+srv://cristianUser:cristianPass@cluster0.ej51pih.mongodb.net/superheroesDB')
mongoose.connect('mongodb+srv://Grupo-06:grupo06@cursadanodejs.ls9ii.mongodb.net/Node-js')
    .then(()=>{console.log('Conexion exitosa a MongoDB');})
    .catch((error)=>{console.error('Error al conectar a MongoDB: ', error)});

const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: {type: String, require: true},
    nombreReal: {type: String, require: true},
    edad: {type: Number, min: 0},
    planetaOrigen: {type: String, default: 'Desconocido'},
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: {type: Date, default: Date.now},
    creador: String
}, {collection: 'Grupo-06'});

const SuperHero = mongoose.model('SuperHero', superheroSchema);

async function insertSuperHero(){
    const hero = new SuperHero({
        nombreSuperHeroe: 'Spiderman',
        nombreReal: 'Peter Parker',
        edad: 25,
        planetaOrigen: 'Tierra',
        debilidad: 'Radioactiva',
        poderes: ['Trepar paredes', 'Sentido arácnido', 'Super fuerza', 'Agilidad'],
        aliados: ['Ironman'],
        enemigos: ['Duende Verde'],
        creador: 'Cristian'
    });
    await hero.save();
    console.log('Superheroe insertado: ', hero);    
}

async function updateSuperHero(nombreSuperHeroe){
    const result = await SuperHero.updateOne(
        {nombreSuperHeroe: nombreSuperHeroe},
        {$set: {edad: 26}}
    );
    console.log('Resultado de la actualizacion: ', result);
}

async function deleteSuperHero(nombreSuperHeroe){
    const result = await SuperHero.deleteOne({nombreSuperHeroe: nombreSuperHeroe});
    console.log('Superheroe eliminado: ', result);
}

async function findSuperHeroes(){
    const heroes = await SuperHero.find({planetaOrigen: 'Tierra'});
    console.log('Superheroes encontrados: ', heroes);
}

//insertSuperHero();
//updateSuperHero('Spiderman');
//deleteSuperHero('Spiderman');
//findSuperHeroes();