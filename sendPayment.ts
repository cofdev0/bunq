
import {BunqApiConfig} from "./BunqApiConfig";
import {BunqApiSetup} from "./BunqApiSetup";
import {BunqConnection} from "./BunqConnection";
import {BunqKey} from "./BunqKey";
import {BunqApi} from "./BunqApi";
import fs = require('fs');
var parseArgs = require('minimist');
const isValidIBAN = require('./ValidIBAN.js');

const config:BunqApiConfig = new BunqApiConfig();
const deviceServerConfig = BunqApiConfig.readJson(config.json.secretsFile);
const privateKeyPem:string=BunqApiConfig.read(config.json.privateKeyFile);
const key : BunqKey = new BunqKey(privateKeyPem);
const installationTokenConfig = BunqApiConfig.readJson(config.json.installationTokenFile);
const installationToken:string=installationTokenConfig.Response[1].Token.token;
const connect:BunqConnection = new BunqConnection();
const setup:BunqApiSetup=new BunqApiSetup(connect,key,deviceServerConfig.secret,installationToken);
const bunqApi:BunqApi=new BunqApi(connect, key,deviceServerConfig.secret,setup,
    config.json.bunqSessionFile, config.json.bunqSessionHistoryPath);


let argv = parseArgs(process.argv.slice(2), {})

if(!argv.iban || !argv.amount || !argv.description || !argv.name) {
    console.log("arguments incomplete!");
    console.log("example: node sendPayment --iban NL2INGB123456 --amount 0.11 --description thanks --name MrBean");
    process.exit(-1);
}

if(isValidIBAN(argv.iban)!=1) {
    console.log("wrong IBAN : "+argv.iban);
    process.exit(-1);
}


// console.log("name:"+argv.name);
// console.log("iban:"+argv.iban);
// console.log("amount:"+argv.amount);
// console.log("description:"+argv.description);

bunqApi.sendPayment(deviceServerConfig.userId, deviceServerConfig.accountId,
    argv.amount,argv.iban,argv.name,argv.description).then((response:string)=>{
    console.log(response);
    fs.writeFileSync(config.json.secretsPath+"/sendPaymentResponse.json", response);
    let resp:any = JSON.parse(response);
    //console.log("balance: "+resp.Response[0].MonetaryAccountBank.balance.value);
}).catch(function(error:string){
    console.log(error);
    expect(true).toBeFalsy();
});
