const  IdlFactory = require('./IDLs/bountyRushService.did.js'); 
const  Agent = require('@dfinity/agent'); 
const  Principal = require('@dfinity/principal'); 
const  Identity = require('./Utils/identities.js'); 
const fetch = (...args) =>
import('node-fetch').then(({ default: fetch }) => fetch(...args));

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

const filterStats = (stats)=> {
    var newStats = stats;
    for (let i in stats) {
        if (stats[i].principal == '') {
            newStats = stats.slice(0, i-1).concat(stats.slice(i+1, stats.length-1));
        } else {
            newStats[i].principal = Principal.Principal.fromText(stats[i].principal);
        };
    };

    return newStats;
};

// const _getTMPrincipal = async () => {
//     const bRService = await createTMActor(bRCanId, IdlFactory.idlFactory, {
//         agentOptions: { host: "http://127.0.0.1:8000", fetch },
//     });
// };

// exports.httpReq = async (req, res) => {
//     res.send(await NFTs.getAllCollNfts("k4qsa-4aaaa-aaaah-qbvnq-cai", 100, mLuck, "simple", "Elementum: Faceted Meninas"));
// };

const _startMatch = async (externalMatchId) => {

    const bRService = await createTMActor(bRCanId, IdlFactory.idlFactory, {
        agentOptions: { host: host, fetch },
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
            } else {
                console.log(startMatchRes.err);
                return startMatchRes.err;
            };
        } else if ("ok" in startMatchRes) {
            console.log(startMatchRes.ok);
            // return "err";
            return "Ok";
        };
    } catch (e) {
        console.log(e);
        return "Unexpected error: " + e;
    };
};

const _endMatch = async (externalMatchId, stats) => {
    const bRService = await createTMActor(bRCanId, IdlFactory.idlFactory, {
        agentOptions: { host: host, fetch },
    });
    console.log("endMatch nodejs after Actor creation");
    console.log(bRService);

    let filteredStats = filterStats(stats.playerDataStats);

    console.log("filteredStats", filteredStats);
    try {
        //TODO: Set to 1 manually, shouldn't be this way.
        const endMatchRes = await bRService.endMatch(externalMatchId, filteredStats, 1);
        console.log("Pasó bRService");
        console.log("endMatchRes", endMatchRes);
        
        if("err" in endMatchRes) {
            if ("NotAuthorized" in endMatchRes.err) {
                console.log("Only admin can end a match.");
                return "Only admin can end a match.";
            } else if ("NonExistentItem" in endMatchRes.err) {
                console.log("Match or Invoice doesn't exist, please report to team via email: rjcapuz@a3capas.com");
                return "Match or Invoice doesn't exist, please report to team via email: rjcapuz@a3capas.com";
            } else if ("Unknown" in endMatchRes.err) {
                console.log(endMatchRes.err.Unknown);
                return endMatchRes.err.Unknown;
            } else {
                console.log(endMatchRes.err);
                unityContext.send("ReactApi", "HandleCallback", endMatchRes.err);
            };
        } else if ("ok" in endMatchRes) {
            console.log(endMatchRes.ok);
            return "Ok";
        };
    } catch (e) {
        console.log(e);
        return "Unexpected error: " + e;
    };
};

const _matchForcedClose = async (externalMatchId, reason) => {
    const bRService = await createTMActor(bRCanId, IdlFactory.idlFactory, {
        agentOptions: { host: host, fetch },
    });
    
    turnInit = {
        ForcedExit : {
            text : reason,
            detail : {
                MatchClosed : null
            }
        }
    };

    try {
        const matchForcedCloseRes = await bRService.matchForcedClose(externalMatchId, turnInit);
        console.log("matchForcedCloseRes", matchForcedCloseRes);
        
        if("err" in matchForcedCloseRes) {
            if ("NotAuthorized" in matchForcedCloseRes.err) {
                console.log("Only TM can forced end a match.");
                return "Only TM can forced end a match.";
            } else if ("NonExistentItem" in matchForcedCloseRes.err) {
                console.log("Match doesn't exist.");
                return "Match doesn't exist.";
            } else if ("Unknown" in matchForcedCloseRes.err) {
                console.log(matchForcedCloseRes.err.Unknown);
                return matchForcedCloseRes.err.Unknown;
            } else {
                console.log(matchForcedCloseRes.err);
                return matchForcedCloseRes.err;
            };
        } else if ("ok" in matchForcedCloseRes) {
            console.log(matchForcedCloseRes.ok);
            return "Ok";
        };
    } catch (e) {
        console.log(e);
        return "Unexpected error: " + e;
    };
};

const _forcedExit = async (playerPrincipal, externalMatchId, reason, detail) => {

    if (!externalMatchId) {
        return "No externalMatchID received.";
    };

    var turnInit = "";
    const bRService = await createTMActor(bRCanId, IdlFactory.idlFactory, {
        agentOptions: { host: host, fetch },
    });

    if (detail == 'Banned') {
        turnInit = {
            ForcedExit : {
                text : reason,
                detail : {
                  Banned : null
                }
            }
        };
    } else if (detail == 'LeaveGame') {
        turnInit = {
            ForcedExit : {
                text : reason,
                detail : {
                  LeaveGame : null
                }
            }
        };
    } else if (detail == 'TimeLimit') {
        turnInit = {
            ForcedExit : {
                text : reason,
                detail : {
                    TimeLimit : null
                }
            }
        };
    };
    
    try {
        const forcedExit = await bRService.forcedExit(Principal.Principal.fromText(playerPrincipal), externalMatchId, turnInit);

        if("err" in forcedExit) {
            if ("NotAuthorized" in forcedExit.err) {
                console.log("Only TM can forced end a match.");
                return "Only TM can forced end a match.";
            } else if ("NonExistentItem" in forcedExit.err) {
                console.log("Match doesn't exist.");
                return "Match doesn't exist.";
            } else if ("Unknown" in forcedExit.err) {
                console.log(forcedExit.err.Unknown);
                return forcedExit.err.Unknown;
            }
        } else if ("ok" in forcedExit) {
            console.log(forcedExit.ok);
            return "Ok";
        };

    } catch (e) {
        console.log(e);
        return "Unexpected error: " + e;
    };
};

exports.test = async function (req, res, next) {
    res.send("Ok");
};

exports.startMatch = async function (req, res, next) {
    let startMatchRes = await _startMatch(req.body.externalMatchID)
    if (startMatchRes != "Ok") {
        res.status(500).send(startMatchRes);
    } else {
        res.status(200).send(startMatchRes);
    };
};

// exports.getTMPrincipal = async function (req, res, next) {
//     await _getTMPrincipal();
// };

exports.endMatch = async function (req, res, next) {
    const stats = JSON.parse(req.body.stats);
    res.send(await _endMatch(req.body.externalMatchID, stats));
};

exports.matchForcedClose = async function (req, res, next) {
    console.log("MatchForcedClose");
    res.send(await _matchForcedClose(req.body.externalMatchID, req.body.reason));
};

exports.forcedExit = async function (req, res, next) {
    // res.send(await _forcedExit(req.body.playerPrincipal, req.body.externalMatchID, req.body.reasonText, req.body.reasonDetail));
    res.send(await _forcedExit(req.body.playerPrincipal, req.body.externalMatchID, req.body.reason, req.body.detail));
};