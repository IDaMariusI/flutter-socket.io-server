const {io} = require('../index');

//Sockets Messages
io.on('connection', client => {
    console.log('Client Conected');

    client.on('disconnect', () => { 
        console.log('Client Disconected');
     });

    client.on('message', (payload) => {
        console.log('Mensaje:', payload);

        io.emit('message', {admin: 'Nuevo mensjae'});
    });
  });