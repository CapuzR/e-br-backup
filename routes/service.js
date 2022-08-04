const  IdlFactory = require('./IDLs/bountyRushService.did.js'); 
const  Agent = require('@dfinity/agent'); 
const  Identity = require('./Utils/identities.js'); 
const  fetch = require('node-fetch'); 

const bRCanId = "rrkah-fqaaa-aaaaa-aaaaq-cai";

const createTMActor = async (canisterId, idl, options)=> {
    const phrase = "ricardo ricardo ricardo ricardo ricardo ricardo ricardo ricardo ricardo ricardo ricardo ricardo";
    const identity = await Identity.identityFromSeed(phrase);
    const agent = new Agent.HttpAgent({ ...options?.agentOptions, identity });
    await agent.fetchRootKey();

    return Agent.Actor.createActor(idl, {
        agent,
        canisterId,
        ...options?.actorOptions,
    });
};

const _startMatch = async (externalMatchId) => {

    const bRService = await createTMActor(bRCanId, IdlFactory.idlFactory, {
        agentOptions: { host: "http://127.0.0.1:8000", fetch },
    });

    try {
        const startMatchRes = await bRService.startMatch(externalMatchId);
        
        if("err" in startMatchRes) {
            if ("NotAuthorized" in startMatchRes.err) {
                console.log("Only admin can start a match.");
                return "Only admin can start a match.";
            } else if ("NonExistentItem" in startMatchRes.err) {
                console.log("Match doesn't exist, please report to team via email: rjcapuz@a3capas.com");
                return "Match doesn't exist, please report to team via email: rjcapuz@a3capas.com";
            } else if ("Unknown" in startMatchRes.err) {
                console.log(startMatchRes.err.Unknown);
                return startMatchRes.err.Unknown;
            }
        } else if ("ok" in startMatchRes) {
            console.log(startMatchRes.ok);
            return "Ok";
        };
    } catch (e) {
        console.log(e);
        return "Unexpected error: " + e;
    };
};

const _endMatch = async (externalMatchId, stats) => {
    const bRService = await createTMActor(bRCanId, idlFactory, {
        agentOptions: { host: "http://127.0.0.1:8000" },
    });

    try {
        //TODO: Set to 1 manually, shouldn't be this way.
        const endMatchRes = await bRService.endMatch(externalMatchId, stats, "1");
        
        if("err" in endMatchRes) {
            if ("NotAuthorized" in endMatchRes.err) {
                console.log("Only admin can start a match.");
                return "Only admin can start a match.";
            } else if ("NonExistentItem" in endMatchRes.err) {
                console.log("Match or Invoice doesn't exist, please report to team via email: rjcapuz@a3capas.com");
                return "Match or Invoice doesn't exist, please report to team via email: rjcapuz@a3capas.com";
            } else if ("Unknown" in endMatchRes.err) {
                console.log(endMatchRes.err.Unknown);
                return endMatchRes.err.Unknown;
            }
        } else if ("ok" in endMatchRes) {
            console.log(endMatchRes.ok);
            return "Ok";
        };
    } catch (e) {
        console.log(e.messages);
        return "Unexpected error: " + e;
    };

};

exports.startMatch = async function (req, res, next) {
    console.log(req.body);
    await _startMatch(req.body.externalMatchID);

    res.send("Ok");
};

exports.endMatch = async function (req, res, next) {
    console.log(req.body);

    const stats = JSON.parse(req.body.stats);

    await _endMatch(req.body.externalMatchID, stats);

    res.send("Ok");
};