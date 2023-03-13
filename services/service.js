const  IdlFactory = require('../IDLs/bountyRushService.did.js'); 
const  Agent = require('@dfinity/agent'); 
const  Principal = require('@dfinity/principal'); 
const  Identity = require('../Utils/identities.js'); 
const fetch = (...args) =>
import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();
fs = require('fs');

const {
    Admins,
    Auth,
    AllowList,
    TurnManager
} = require( "../Models/authModels" );
const {
    PlayerStats, 
    Matches, 
    Invoices, 
    Users
} = require( "../Models/generalModels" );
const {
    UsernamePpal,
    ExternalInternalMatchIdEntries,
    ActivePlayerMatches,
    MatchInvoiceEntries,
    UserInvoiceEntries,
    MatchPlayerStatsEntries
} = require( "../Models/relsModels" );
const {
    MatchSettings, 
    ContractInfo, 
    ErrorQty, 
    AssetCanisterIds 
} = require( "../Models/settingModels" );

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

function roughSizeOfObject( object ) {

    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
            bytes += 4;
        }
        else if ( typeof value === 'string' ) {
            bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes += 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList.push( value );

            for( var i in value ) {
                stack.push( value[ i ] );
            }
        }
    }
    return bytes;
}

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

            backupRes.ok.assetCanisterIds.map((assetCanisterId)=>{
                AssetCanisterIds({ id: assetCanisterId.toText() }).save();
            });
            await backupRes.ok.admins.map((admin)=>{
                Admins({ principal: admin.toText() }).save();
            });
            await backupRes.ok.auth.map((auth)=>{
                Auth({ principal: auth.toText() }).save();
            });
            await backupRes.ok.allowList.map((allowList)=>{
                AllowList({ principal: allowList[0].toText() }).save();
            });
            await backupRes.ok.turnManagers.map((turnManagers)=>{
                TurnManager({ principal: turnManagers.toText() }).save();
            });
            await backupRes.ok.playerStats.map((playerStats)=>{
                let data = Object.assign(
                    {
                        principal: playerStats[0].toText()
                    },
                    playerStats[1]
                );
                PlayerStats(data).save();
            });
            await backupRes.ok.matches.map((matches)=>{
                Matches(matches[1]).save();
            });
            // await backupRes.ok.invoices.map((invoice)=>{
            //     let data = {
            //         id: invoice[1].id,
            //         createdBy: invoice[1].createdBy,
            //         createdOn: invoice[1].createdOn,
            //         updatedOn: invoice[1].updatedOn,
            //         matchId: invoice[1].matchId,
            //         amount: invoice[1].amount,
            //         amountPaid: invoice[1].amountPaid,
            //         token: {
            //             symbol: invoice[1].symbol,
            //             decimals: invoice[1].decimals,
            //             meta : {
            //                 Issuer: invoice[1].Issuer,
            //             }
            //         },
            //         payments: invoice[1].payments,
            //         paidByPlayer: invoice[1].paidByPlayer,
            //         isPaidByPlayer: invoice[1].isPaidByPlayer,
            //         paidToPlayer: invoice[1].paidToPlayer,
            //         isPaidToPlayer: invoice[1].isPaidToPlayer,
            //         expiration: invoice[1].expiration,
            //         matchPlayerAID: {
            //             type: invoice[1].type,
            //             data: invoice[1].data,
            //         },
            //         details: invoice[1].details,
            //         playerPaymentBlockHeight: invoice[1].playerPaymentBlockHeight,
            //         toPlayerPaymentBlockHeight: invoice[1].toPlayerPaymentBlockHeight,
            //         paidToPlayerVerifiedAtTime: invoice[1].paidToPlayerVerifiedAtTime,
            //         paidByPlayerVerifiedAtTime: invoice[1].paidByPlayerVerifiedAtTime,
            //     };
            //     Invoices(data).save();
            // });
            // backupRes.ok.users.map((user)=>{
            //     let data = Object.assign(
            //         { 
            //             principal: user[0].toText()
            //         },
            //         user[1]
            //     );
            //     Users(data).save();
            // });
            // backupRes.ok.usernamePpal.map((rel)=>{
            //     let data = { 
            //         username: rel[0],
            //         principal: rel[1].toText()
            //     };
            //     UsernamePpal(data).save();
            // });
            await backupRes.ok.externalInternalMatchIdEntries.map((rel)=>{
                let data = {
                    externalMatchId: rel[0],
                    matchId: rel[1]
                };
                ExternalInternalMatchIdEntries(data).save();
            });
            console.log("Before activePlayerMatches");
            await backupRes.ok.activePlayerMatches.map((rel)=>{
                let data = { 
                    principal: rel[0].toText(),
                    matchId: rel[1]
                };
                ActivePlayerMatches(data).save();
            });
            console.log("Before matchInvoiceEntries");
            await backupRes.ok.matchInvoiceEntries.map((rel)=>{
                let data = { 
                    matchId: rel[0],
                    invoiceId: rel[1]
                };
                MatchInvoiceEntries(data).save();
            });
            console.log("Before userInvoiceEntries");
            await backupRes.ok.userInvoiceEntries.map((rel)=>{
                let data = { 
                    principal: rel[0].toText(),
                    invoiceId: rel[1]
                };
                UserInvoiceEntries(data).save();
            });
            console.log("Before matchPlayerStatsEntries");
            await backupRes.ok.matchPlayerStatsEntries.map((rel)=>{
                let data = { 
                    invoiceId: rel[0],
                    principal: rel[1].toText(),
                    stats: rel[2]
                };
                MatchPlayerStatsEntries(data).save();
            });
            console.log("Before MatchSettings");
            await MatchSettings(backupRes.ok.matchSettings).save();
            console.log("Before ErrorQty");
            await ErrorQty(backupRes.ok.errorQty).save();
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

exports.readBackupText = async function () {
    
    res.send(await Invoices.find({}).exec());
};