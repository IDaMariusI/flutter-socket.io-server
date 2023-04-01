const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Héroes del Silencio'));
bands.addBand(new Band('Metallica'));

//Sockets Messages
io.on('connection', client => {
    console.log('Client Conected');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('Client Disconected');
     });

    client.on('message', (payload) => {
        console.log('Mensaje:', payload);
        io.emit('message', {admin: 'Nuevo mensaje'});
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
  });