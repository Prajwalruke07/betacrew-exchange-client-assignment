# BetaCrew Exchange Client

This Node.js client application interacts with the BetaCrew exchange server to retrieve stock ticker data. The client connects to a TCP server, requests stock data, and processes the received packets to generate a JSON file with all sequences.

Instructions to Run the Code:

1)Clone the Repository:
Command: git clone https://github.com/Prajwalruke07/betacrew-exchange-client-assignment.git

2)Navigate to the Project Directory:
Command: cd betacrew-exchange-client-assignment

3)Install Dependencies:
Command: npm install

4)Start the BetaCrew Exchange Server (if not already running):
Unzip the betacrew_exchange_server.zip and navigate to the server directory.
Command: cd betacrew_exchange_server

5)Command: node main.js

6)Run the Node.js Client:
Command: node client.js

7)Check the Output:
The output will be saved in a file named output.json in the project directory. If the file is empty or missing, ensure that the client is properly interacting with the server.
Please let me know if you have any questions or need further information.


How It Works
Connection: The client connects to the TCP server using Node.js's net module.
Request Handling: The client sends a request to stream all packets or to resend specific packets as required.
Data Processing: The received data is parsed, and missing sequences are requested if necessary.
Output: The final data is written to output.json.
