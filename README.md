# Ethereum transactions crawler task
### Application for the Trace Labs Internship

## To do:
- [x] Create ui with required inputs
- [x] Connect to an API
- [x] Connect the client to the server
- [] Finishing touches

*Todo for 9/7/2022*
- [x] Add other crypto support on the backend
- [x] Add a nice way to show errors
- [x] Add a loader
- [] Create a form to view the price of crypto on specific date
- [x] Pagination for the viewer

## Task:
Create an application that will allow a user to view transaction data from the Ethereum blockchain associated with a specific wallet address W that the user inputs, starting with block B. The application should get information on:
- wallets (addresses) and 
- amounts of ETH associated with transactions made to and from the given wallet W and
- show them in a simple human-readable way (ideally, through a web page). 
The application should collect and display ALL transaction data starting from the given block B. 

## Example:
If a user requests to view transactions associated with the address 0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f from block 9000000 to the current block, your application should be able to crawl and visualize all transaction data (addresses that have sent and received tokens from the address 0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f, and how much ETH was used for a given transaction) in that period of time.

## Required inputs:
- wallet address
- beginning block

## Required outputs:
- Show transactions (adresses, ammount, time)

### Authors:
- Vukašin Vulović