# bunq

A wrapper for part of the Bunq API v1 in Type-/JavaScript forked from Simon Schraeders https://github.com/c0dr/bunq


intended functionality:

- authentication procedure with Bunq server consisting of
    - key creation and installation
    - device server registration with API key
    - session server registration to get session auth token
    - https://doc.bunq.com/api/1/page/authentication
    
    
- account information 
    - balance
    - transactions
    - https://doc.bunq.com/api/1/call/monetary-account
    
    
- payment to SEPA accounts
    - https://doc.bunq.com/api/1/call/payment


- installing of callbacks to an URL
    - https://doc.bunq.com/api/1/page/callbacks
    

prerequisites
- node.js: https://nodejs.org/en/download/
- typescript: npm install -g typescript
- jest: https://facebook.github.io/jest/

clone, compile, run tests

- git clone https://github.com/cofdev0/bunq.git bunq
- cd bunq
- npm init
- npm install
- tsc
- jest