'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = Schema({
    principal: {type: String, required: false},
});
const AuthSchema = Schema({
    principal: {type: String, required: false},
});
const AllowListSchema = Schema({
    principal: {type: String, required: false},
});
const TurnManagerSchema = Schema({
    principal: {type: String, required: false},
});

const admins = mongoose.model('Admins', AdminSchema, "admins");
const auth = mongoose.model('Auth', AuthSchema, "auth");
const allowList = mongoose.model('AllowList', AllowListSchema, "allowList");
const turnManager = mongoose.model('TurnManager', TurnManagerSchema, "turnManager");

// mongoose.Number.cast(v => {
//     if (v === '二') {
//       return 2;
//     }
//     return originalCast(v);
//   });

module.exports = { 
    Admins: admins, 
    Auth: auth, 
    AllowList: allowList, 
    TurnManager: turnManager  
};