const  IdlFactory = require('./IDLs/bountyRushService.did.js'); 
const  Agent = require('@dfinity/agent'); 
const  Principal = require('@dfinity/principal'); 
const  Identity = require('./Utils/identities.js'); 
const  fetch = require('node-fetch'); 
const axios = require('axios');
const fs = require("fs");


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

const canList = [
    {
        canId : "zejmq-rqaaa-aaaah-qcnsq-cai",
        assetCanId : "yusot-paaaa-aaaaj-qallq-cai",
        qty : 71
    },
    {
        canId : "zejmq-rqaaa-aaaah-qcnsq-cai",
        assetCanId : "zz4k5-aiaaa-aaaaj-qalma-cai",
        qty : 70
    },
    {
        canId : "zejmq-rqaaa-aaaah-qcnsq-cai",
        assetCanId : "z65mj-nqaaa-aaaaj-qalmq-cai",
        qty : 71
    },
    {
        canId : "zejmq-rqaaa-aaaah-qcnsq-cai",
        assetCanId : "zx6hv-3yaaa-aaaaj-qalna-cai",
        qty : 70
    },
    {
        canId : "zejmq-rqaaa-aaaah-qcnsq-cai",
        assetCanId : "zq7bb-waaaa-aaaaj-qalnq-cai",
        qty : 70
    },
    {
        canId : "zejmq-rqaaa-aaaah-qcnsq-cai",
        assetCanId : "zfyqm-xiaaa-aaaaj-qaloa-cai",
        qty : 70
    },
    {
        canId : "zejmq-rqaaa-aaaah-qcnsq-cai",
        assetCanId : "zczwy-2qaaa-aaaaj-qaloq-cai",
        qty : 70
    },
    {
        canId : "zejmq-rqaaa-aaaah-qcnsq-cai",
        assetCanId : "zl25e-myaaa-aaaaj-qalpa-cai",
        qty : 70
    },
    {
        canId : "zejmq-rqaaa-aaaah-qcnsq-cai",
        assetCanId : "zm33q-baaaa-aaaaj-qalpq-cai",
        qty : 70
    },
    {
        canId : "zejmq-rqaaa-aaaah-qcnsq-cai",
        assetCanId : "4qabv-kiaaa-aaaaj-qalqa-cai",
        qty : 70
    },
];

// exports.httpReq = async () => {
//     res = await axios.get("https://zm33q-baaaa-aaaaj-qalpq-cai.raw.ic0.app/?index=50");
//     console.log(res);
    // var testUrl = res.data.match(/'(?<=[src="]).*(?=[\"])'/gi),
    // var testUrl = res.data.match(/(http \d+(\.\d)*)/i),
    // onlyUrl = testUrl && testUrl[1];
    // var urlRegex = /(https?:\/\/[^" ]*)/;

    // var input = res.data;
    // var url = input.match(urlRegex)[1];
    // console.log(url);
    // fs.writeFile('./result.txt', url, function (err) {
    //     if (err) throw err;               console.log('Results Received');
    //   }); 
    // let canArr = [];
    // for ( let can of canList ) {
    //     let i = 0;
    //     console.log("CanId: " + can.assetCanId);
    //     console.log("*********************************************************");
    //     while (i < can.qty) {
    //         // console.log("Index: " + i );
    //         // res = await axios.get("https://" + can.assetCanId + ".raw.ic0.app/?index=" + i);
    //         var urlRegex = /(https?:\/\/[^" ]*)/;
    //         // console.log(res.data);        
    //         var input = "https://" + can.assetCanId + ".raw.ic0.app/?index=" + i;
    //         var url = input.match(urlRegex)[1];
    //         canArr.push(url);
    //         // console.log("status: " + res.status);
    //         // console.log("-------------------------------");
    //         // if (res.status != 200) {
    //         //     console.log(res.request._currentUrl);
    //         //     console.log("Pos: " + i);
    //         // };
    //         i = i + 1;
    //     };
        
    //     console.log("Total assets: " + i);
    //     console.log("*********************************************************");
    //     console.log("End of CanId: " + can.assetCanId);
    // };
    // console.log(canArr.length);
    // fs.writeFile('./result.txt', canArr.join(), function (err) {
    //     if (err) throw err;               console.log('Results Received');
    // }); 
    // canList.map(async (can)=> {
        
    // });
// };

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
        agentOptions: { host: "http://127.0.0.1:8000", fetch },
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
        agentOptions: { host: "http://127.0.0.1:8000", fetch },
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
        agentOptions: { host: "http://127.0.0.1:8000", fetch },
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
