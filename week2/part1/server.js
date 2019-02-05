clienconst net = require('net');
const emMethods = require('./employeeModule_v1');
const util = require('util');

clients = [];

const server = net.createServer(
    (socket) => {
        console.log('connected to server');
        clients.push(socket);

        socket.on('end', () => {
            console.log('disconnected');
            var index = clients.indexOf(socket);

            if(index !== -1){
                clients.splice(index);
            }
        });

        socket.on('data', (data) => {
            console.log('data provided: ' + data);
            var serverOutput = '';

            // process client input and send response
            dataString = data.toString();

            // diagnostic
            console.log('[DIAGNOSTIC: server.js - socket.on] dataString: '+dataString);

            if(dataString.includes('lookupById')){
                serverOutput = util.inspect(
                        emMethods.lookupById( util.inspect(
                                dataString.substring(dataString.indexOf(' ')).trim())
                        )
                    )
                console.log('server response: '+serverOutput);
            }
            else if(dataString.includes('lookupByLastName')){
                serverOutput = util.inspect(
                        emMethods.lookupByLastName( 
                                dataString.substring(dataString.indexOf(' ')).trim()
                        )
                    )
                console.log('server response: '+serverOutput);
            }
            else if(dataString.includes('addEmployee')){
                dataArray = dataString.split(' ');
                dataArray.forEach((elem) => {
                    elem.trim();
                    
                });
                serverOutput = util.inspect(
                        emMethods.addEmployee(dataArray[1], dataArray[2])
                    )
                console.log('server response: '+serverOutput);
            }
            else{
                serverOutput = 'no bread for you';
            }
            socket.write(serverOutput);
        }); 

        
    });

server.listen(3000, () => {
    console.log('listening for connections');
});