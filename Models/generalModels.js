'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerStatsSchema = Schema({
    principal: {type: String, required: false},
    points: {type: String, required: false},
    earned: {type: String, required: false},
    lost: {type: String, required: false},
    matchesWon: {type: String, required: false},
    matchesLost: {type: String, required: false},
});
const UsersSchema = Schema({
    userBasics: {
        username: {type: String, required: false},
        avatarUrl: {type: String, required: false},
        firstName: {type: String, required: false},
        lastName: {type: String, required: false},
        displayName: {type: String, required: false},
        about: {type: String, required: false},
    },
    points: {type: String, required: false},
    details: {type: String, required: false},
    createdOn: {type: String, required: false},
    updatedOn: {type: String, required: false},
});
const MatchesSchema = Schema({
    id: {type: String, required: false},
    createdOn: {type: String, required: false},
    updatedOn: {type: String, required: false},
    createdBy: {type: String, required: false},
    currentRound: {type: String, required: false},
    rounds: {type: String, required: false},
    accumulatedBet: {type: String, required: false},
    currentBet: {type: String, required: false},
    pot: {type: String, required: false},
    status: {type: Schema.Types.Mixed},
    minBet: {type: String, required: false},
    maxBet: {type: String, required: false},
    maxNumPlayers: {type: String, required: false},
    joinedPlayersQty: {type: String, required: false},
    currentPlayer: {type: Array, required: false},
    tokenSymbol: {type: String, required: false},
    details: {type: Array, required: false},
    roundOpener: {type: String, required: false},
});
const InvoicesSchema = Schema({
    id: {type: String, required: false},
    createdBy: {type: String, required: false},
    createdOn: {type: String, required: false},
    updatedOn: {type: String, required: false},
    matchId: {type: String, required: false},
    amount: {type: String, required: false},
    amountPaid: {type: String, required: false},
    token: {
        symbol: {type: String, required: false},
        decimals: {type: String, required: false},
        meta : {
            Issuer: {type: String, required: false},
        }
    },
    payments: [{
        verifiedAtTime: {type: String, required: false},
        paid: {type: Boolean, required: false},
        amount: {type: String, required: false},
        currentRound: {type: String, required: false},
    }],
    paidByPlayer: {type: String, required: false},
    isPaidByPlayer: {type: Boolean, required: false},
    paidToPlayer: {type: String, required: false},
    isPaidToPlayer: {type: Boolean, required: false},
    expiration: {type: String, required: false},
    matchPlayerAID: {
        type: {type: String, required: false},
        data: {type: String, required: false},
    },
    details: {type: Array, required: false},
    playerPaymentBlockHeight: {type: String, required: false},
    toPlayerPaymentBlockHeight: {type: String, required: false},
    paidToPlayerVerifiedAtTime: {type: Array, required: false},
    paidByPlayerVerifiedAtTime: {type: Array, required: false},
});


const playerStats = mongoose.model('PlayerStats', PlayerStatsSchema, "playerStats");
const users = mongoose.model('Users', UsersSchema, "users");
const matches = mongoose.model('Matches', MatchesSchema, "matches");
const invoices = mongoose.model('Invoices', InvoicesSchema, "invoices");

module.exports = { 
    PlayerStats: playerStats, 
    Matches: matches, 
    Invoices: invoices, 
    Users: users 
};