const net = require('net');
const fs = require('fs');

// Configuration
const SERVER_HOST = 'localhost';
const SERVER_PORT = 3000;
const OUTPUT_FILE = 'output.json';

let receivedPackets = [];
let missingSequences = new Set();
let highestSequence = 0;

// Connect to the server
const client = new net.Socket();
client.connect(SERVER_PORT, SERVER_HOST, () => {
  console.log('Connected to server');

  // Request to stream all packets
  const requestPayload = Buffer.alloc(2);
  requestPayload.writeInt8(1, 0); // callType = 1 for "Stream All Packets"
  client.write(requestPayload);
});

// Handle incoming data from the server
client.on('data', (data) => {
  console.log('Data received from server');
  
  // Parse the incoming data
  const packet = parsePacket(data);
  console.log('Parsed packet:', packet);
  receivedPackets.push(packet);

  // Track the highest sequence number
  if (packet.packetSequence > highestSequence) {
    highestSequence = packet.packetSequence;
  }

  // Check for missing sequences
  if (packet.packetSequence !== receivedPackets.length) {
    for (let i = receivedPackets.length; i < packet.packetSequence; i++) {
      missingSequences.add(i);
    }
  } else {
    missingSequences.delete(packet.packetSequence);
  }
});

// Handle server disconnection
client.on('end', () => {
  console.log('Disconnected from server');

  // Request missing packets
  requestMissingPackets(() => {
    // Write the output to a JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(receivedPackets, null, 2));
    console.log(`Output written to ${OUTPUT_FILE}`);
  });
});

// Handle errors
client.on('error', (err) => {
  console.error('Error:', err);
});

function parsePacket(data) {
  console.log('Parsing data:', data);
  return {
    symbol: data.slice(0, 4).toString('ascii'),
    buysellindicator: data.slice(4, 5).toString('ascii'),
    quantity: data.readInt32BE(5),
    price: data.readInt32BE(9),
    packetSequence: data.readInt32BE(13),
  };
}

function requestMissingPackets(callback) {
  if (missingSequences.size === 0) {
    return callback();
  }

  let remainingRequests = missingSequences.size;

  missingSequences.forEach((seq) => {
    const requestPayload = Buffer.alloc(2);
    requestPayload.writeInt8(2, 0); // callType = 2 for "Resend Packet"
    requestPayload.writeInt8(seq, 1); // resendSeq = sequence number
    client.write(requestPayload);

    client.once('data', (data) => {
      const packet = parsePacket(data);
      receivedPackets[packet.packetSequence - 1] = packet;
      remainingRequests -= 1;

      if (remainingRequests === 0) {
        callback();
      }
    });
  });
}
