# BetaCrew Exchange Client

This Node.js client application interacts with the BetaCrew exchange server to retrieve stock ticker data. The client connects to a TCP server, requests stock data, and processes the received packets to generate a JSON file with all sequences.

## Prerequisites

- Node.js v16.17.0 or higher

## Setup and Installation

1. **Clone the Repository:**

   ```sh
   git clone [(https://github.com/Prajwalruke07/betacrew-exchange-client-assignment/tree/main)]
Navigate to the Project Directory:

sh
Copy code
cd [Name of the Repository Directory]
Install Dependencies:

Install the necessary Node.js packages by running:
npm install

Running the Application
Start the BetaCrew Exchange Server:

Before running the client, ensure that the BetaCrew exchange server is running. If you need the server code, follow the instructions provided separately.

Run the Client:

In a separate terminal window, navigate to the client directory and run:


node client.js
Check the Output:

After running the client, the results will be saved in output.json located in the client directory. This file contains an array of packets with increasing sequence numbers.

How It Works
Connection: The client connects to the TCP server using Node.js's net module.
Request Handling: The client sends a request to stream all packets or to resend specific packets as required.
Data Processing: The received data is parsed, and missing sequences are requested if necessary.
Output: The final data is written to output.json.
