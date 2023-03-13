'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsernamePpalSchema = Schema({
    username: {type: String, required: false},
    principal: {type: String, required: false},
});
const ExternalInternalMatchIdEntriesSchema = Schema({
    externalMatchId: {type: String, required: false},
    matchId: {type: String, required: false},
});
const ActivePlayerMatchesSchema = Schema({
    principal: {type: String, required: false},
    matchId: {type: String, required: false},
});
const MatchInvoiceEntriesSchema = Schema({
    invoiceId: {type: String, required: false},
    matchId: {type: String, required: false},
});
const UserInvoiceEntriesSchema = Schema({
    principal: {type: String, required: false},
    invoiceId: {type: String, required: false},
});
const MatchPlayerStatsEntriesSchema = Schema({
    principal: {type: String, required: false},
    invoiceId: {type: String, required: false},
    stats: {
        joinPosition : {type: String, required: false},
        position : {type: String, required: false},
        points : {type: String, required: false},
        earned : {type: String, required: false},
        lost :  {type: String, required: false},
        invoiceId : {type: String, required: false},
        matchId : {type: String, required: false},
        playerPrincipal : {type: String, required: false},
        accumulatedBet : {type: String, required: false},
        status: {type: Schema.Types.Mixed},
    }
});

const usernamePpal = mongoose.model('UsernamePpal', UsernamePpalSchema, "usernamePpal");
const externalInternalMatchIdEntries = mongoose.model('ExternalInternalMatchIdEntries', ExternalInternalMatchIdEntriesSchema, "externalInternalMatchIdEntries");
const activePlayerMatches = mongoose.model('ActivePlayerMatches', ActivePlayerMatchesSchema, "activePlayerMatches");
const matchInvoiceEntries = mongoose.model('MatchInvoiceEntries', MatchInvoiceEntriesSchema, "matchInvoiceEntries");
const userInvoiceEntries = mongoose.model('UserInvoiceEntries', UserInvoiceEntriesSchema, "userInvoiceEntries");
const matchPlayerStatsEntries = mongoose.model('MatchPlayerStatsEntries', MatchPlayerStatsEntriesSchema, "matchPlayerStatsEntries");

module.exports = { 
    UsernamePpal: usernamePpal, 
    ExternalInternalMatchIdEntries: externalInternalMatchIdEntries, 
    ActivePlayerMatches: activePlayerMatches, 
    MatchInvoiceEntries: matchInvoiceEntries, 
    UserInvoiceEntries: userInvoiceEntries, 
    MatchPlayerStatsEntries: matchPlayerStatsEntries 
};