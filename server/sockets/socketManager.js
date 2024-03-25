module.exports = function(io) {
    io.on('connection', function(socket){
      console.log('Client Connected');
      
      // Gestion des messages
      socket.on('message', function(data){
        console.log("identifiant reçu : " + data.identifier + " de l'@ : " + data.email);

        socket.broadcast.emit('server_message', data);
        socket.emit('server_message', data);
      });
      
      // Gestion des déconnexions
      socket.on('disconnect', function(){
        console.log('Client Disconnected.');
      });
    });
  };
  