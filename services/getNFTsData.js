const Principal = require('@dfinity/principal'); 
const axios = require('axios');
const Utils = require("../routes/Utils/utils");
const to32bits = Utils.to32bits;



const getTokenId = (principal, index) => {
    const padding = Buffer("\x0Atid");
    const array = new Uint8Array([
        ...padding,
        ...Principal.Principal.fromText(principal).toUint8Array(),
        ...to32bits(index),
    ]);
    return Principal.Principal.fromUint8Array(array).toText();
};

exports.getAllCollNfts = async (canisterId, supply, luckArr, type, collName)=> {
    var count = 0;
    let arr = [];

    while (count < supply) {
        const tokenId = getTokenId(canisterId, count)
        arr.push({
            id : tokenId,
            luck : luckArr[count],
            url : await getTokenUrl("http://" + canisterId + ".raw.ic0.app/tokenid=" + tokenId, type, count),
            collection : collName,
            mimeType : "video/mp4"
        });
        count++;
    };

    return arr;
};

const getTokenUrl = async (baseUrl, type, count) => {
    if (type == 'simple') {
        return baseUrl
    } else {
        htmlRes = await axios.get(baseUrl);
        // console.log(htmlRes);
        var urlRegex = /(https?:\/\/[^" ]*)/;
        const input = htmlRes.data;
        console.log(input.match(urlRegex)[0]);
        return input.match(urlRegex)[1];
    };
};
