// tests
const BlockchainClass = require('./blockchain.js');
const BlockClass = require('./block.js');

blocko = new BlockchainClass.Blockchain();
blocko._addBlock(new BlockClass.Block("pollos"));




// console.log(blocko.requestMessageOwnershipVerification("addrex"));


// A = new Date().getTime().toString().slice(0, -3);
// console.log(A);
// function waitTime(){
//     return new Promise(function (resolve){
//         setTimeout(function(){
//             B = new Date().getTime().toString().slice(0, -3);
//             resolve(B);
//         }, 2000)
//     }).then(function(result){
//         console.log(result);
//         if((B-A) <= 2){
//             console.log("bingo");
//         }
        
//     });
// }
// waitTime();
