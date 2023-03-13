'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AssetCanisterIdsSchema = Schema({
    id: {type: String, required: false},
});
const MatchSettingsSchema = Schema({
    turnMinBet: {type: String, required: false},
    matchMinBet: {type: String, required: false},
    matchMaxBet: {type: String, required: false},
    maxNumPlayers: {type: String, required: false},
    minNumPlayers: {type: String, required: false},
    minNumRounds: {type: String, required: false},
    maxNumRounds: {type: String, required: false},
    fees: {
        network: {type: String, required: false},
        bR: {type: String, required: false}
    },
    pointsPerMatch: {
        winner: {type: String, required: false},
        looser: {type: String, required: false},
    }
});
// const ContractInfoSchema = Schema({
//     createdMatchesToDate: {type: String, required: false},
//     startedMatchesToDate: {type: String, required: false},
//     endedMatchesToDate: {type: String, required: false},
//     icpBetsToDate: {e8s: {type: String, required: false}}
// });
const ErrorQtySchema = Schema({
    transferToMatchError: {type: String, required: false},
    updateInvoicePWError: {type: String, required: false},
    updateInvoiceTMError: {type: String, required: false},
    payToWinnerError: {type: String, required: false},
    payToElementumError: {type: String, required: false},
    checkPaymentError: {type: String, required: false},
});


const matchSettings = mongoose.model('MatchSettings', MatchSettingsSchema, "matchSettings");
// const contractInfo = mongoose.model('ContractInfo', ContractInfoSchema, "contractInfo");
const errorQty = mongoose.model('ErrorQty', ErrorQtySchema, "errorQty");
const assetCanisterIds = mongoose.model('AssetCanisterIds', AssetCanisterIdsSchema, "assetCanisterIds");

module.exports = { 
    MatchSettings: matchSettings, 
    // ContractInfo: contractInfo, 
    ErrorQty: errorQty, 
    AssetCanisterIds: assetCanisterIds 
};