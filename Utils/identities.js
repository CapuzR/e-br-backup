//identity.ts
var Identity = require('@dfinity/identity');
var HdKey = require('hdkey');
var Bip39 = require('bip39');

exports.identityFromSeed = async function (phrase) {
  const seed = await Bip39.mnemonicToSeed(phrase);
  const root = HdKey.fromMasterSeed(seed);
  const addrnode = root.derive("m/44'/223'/0'/0/0");

  return Identity.Secp256k1KeyIdentity.fromSecretKey(addrnode.privateKey);
};

exports.newMnemonic = async function() {
  return Bip39.generateMnemonic();
};