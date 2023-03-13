const  IdlFactory = require('./IDLs/bountyRushService.did.mjs'); 
const  Agent = require('@dfinity/agent'); 
const  Principal = require('@dfinity/principal'); 
const  Identity = require('./Utils/identities.js'); 
const fetch = (...args) =>
import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();
fs = require('fs');

const bRCanId = process.env.BRCANID;
const host = process.env.NETWORK;


// const bRCanId = "rrkah-fqaaa-aaaaa-aaaaq-cai";

const createTMActor = async (canisterId, idl, options)=> {
    const phrase = process.env.SEEDPHRASE;
    const identity = await Identity.identityFromSeed(phrase);
    const agent = new Agent.HttpAgent({ ...options?.agentOptions, identity });
    await agent.fetchRootKey();

    return Agent.Actor.createActor(idl, {
        agent,
        canisterId,
        ...options?.actorOptions,
    });
};

exports.test = async function (req, res, next) {
    // var count = 1;
    // var text = "";
    // console.log("mjm");
    // while (count <= 3) {
    //     text = text + "blender -b ./DELISTAYA/" + count + ".blend -o ./Render/" + count + "-# -f 1; ";
    //     count++;
    // };
    
    // fs.writeFile('dugrosk.txt', text, function (err) {
    //   if (err) return console.log(err);
    // //   console.log('Hello World > helloworld.txt');
    // });
    res.send("Ok");
};

const _backupTest = async () => {
    const bRService = await createTMActor(bRCanId, IdlFactory.idlFactory, {
        agentOptions: { host: host, fetch },
    });

    try {
        const backupRes = await bRService.backup();
        
        if("err" in backupRes) {
            if ("NotAuthorized" in backupRes.err) {
                console.log("Only admin can backup.");
                return "Only admin can backup.";
            };
        } else if ("ok" in backupRes) {
            console.log(backupRes.ok);
            // return "err";
            return "Ok";
        };
    } catch (e) {
        console.log(e);
        return "Unexpected error: " + e;
    };
};

exports.backupTest = async function (req, res, next) {
    let backupRes = await _backupTest()
    if (backupRes != "Ok") {
        res.status(500).send(backupRes);
    } else {
        res.status(200).send(backupRes);
    };
};