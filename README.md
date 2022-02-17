### C Lightning Tallycoin
This is a nodejs script that links lightningd to the lightning enabled non-custodial crowdfunding site https://tallyco.in 

To get started, clone the repo and install the node dependencies. 
``` 
git clone https://github.com/AutonomousOrganization/cl-tallycoin.git 
cd cl-tallycoin && npm i
```

Then you need to link to your tallycoin account by putting in your api key and link to your clightning node by pointing to the data directory: 
```
export APIKEY='xxd-xxd-xxd'
export LNDIR=/home/ao/.lightning/bitcoin
```
Then initialize the connection process: 
```
node tallycoin_connect.js
```
Now the money being counted on your crowdfunding page is going directly into the node under your full control. As it should be. 
   
https://tallyco.in/s/tdtk79/

