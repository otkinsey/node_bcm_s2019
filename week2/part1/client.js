const net = require('net');
const readline = require('readline');

clientId = Math.floor(1000*Math.random());

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var readMessage = (client) => {
    rl.question('Enter command: ', (line) => {
        client.write(line);
        if(line === 'bye')
            client.end;
        else
            readMessage(client);
    });
}

var client = net.connect({port:3000}, () => {
    console.log('client: connected to server');
    readMessage(client);
});

client.on('end', () => {
    console.log('Client disconnected...');
});

client.on('data', (data) => {
    console.log('Received: ', data.toString());
    client.end;
});