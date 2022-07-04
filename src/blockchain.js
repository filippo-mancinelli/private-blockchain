/**
 *                          Blockchain Class
 *  The Blockchain class contain the basics functions to create your own private blockchain
 *  It uses libraries like `crypto-js` to create the hashes for each block and `bitcoinjs-message` 
 *  to verify a message signature. The chain is stored in the array
 *  `this.chain = [];`. Of course each time you run the application the chain will be empty because and array
 *  isn't a persisten storage method.
 *  
 */

const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./block.js');
const bitcoinMessage = require('bitcoinjs-message');
const bcrypt = require("bcrypt");

class Blockchain {

    /**
     * Constructor of the class, The methods in this class will always return a Promise to allow 
     * client applications or other backends to call asynchronous functions.
     */
    constructor() {
        this.chain = [];
        this.height = -1;
        this.initializeChain();
    }

    /**
     * This method will check for the height of the chain and if there isn't a Genesis Block it will create it.
     */
    async initializeChain() {
        if( this.height === -1){
            let block = new BlockClass.Block({data: 'Genesis Block'});
            await this._addBlock(block);
        }
    }

    /**
     * Utility method that return a Promise that will resolve with the height of the chain
     */
    getChainHeight() {
        return new Promise((resolve, reject) => {
            resolve(this.height);
        });
    }

    /**
     * _addBlock(block) will store a block in the chain
     * @param {*} block 
     * The method will return a Promise that will resolve with the block added
     * or reject if an error happen during the execution.
     */
    _addBlock(block) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            if(self.height === -1){
                block.previousBlockHash = "";
            } else {
                block.previousBlockHash = self.chain[self.chain.length -1].hash;
            }
                block.time = new Date().getTime().toString().slice(0, -3);
                block.height = self.height +1;
                self.height ++;

                block.hash = SHA256(JSON.stringify(block));
                self.chain.push(block);
                resolve(block);
           reject("Errorrr");
        });
    }

    /**
     * The requestMessageOwnershipVerification(address) method
     * will allow you  to request a message that you will use to
     * sign it with your Bitcoin Wallet (Electrum or Bitcoin Core)
     * The method return a Promise that will resolve with the message to be signed
     * @param {*} address 
     */
    requestMessageOwnershipVerification(address) {
        return new Promise((resolve) => {
            let message =`${address}:${new Date().getTime().toString().slice(0,-3)}:starRegistry`;
            resolve(message);
        }).then(function (result){
            message = result;
        });
    }

    /**
     * The submitStar(address, message, signature, star) method
     * will allow users to register a new Block with the star object
     * into the chain. This method will resolve with the Block added or
     * reject with an error.
     */
    submitStar(address, message, signature, star) {
        let self = this;
        return new Promise(async (resolve, reject) => {
          let time = parseInt(message.split(":")[1]);
          let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));
          
          if(currentTime - time < 300){                              //check if time elapsed < 5 minutes 
            if(bitcoinMessage.verify(message, address, signature)){  //verify the message
                block = new BlockClass.Block(message);               //create the block 
                self.chain.push(block);                              //push it into the chain
                resolve(block);
            }else{
                reject(Error("Message is not verified."));
            }
          }else{
            reject(Error("Too much time has passed."));
          }
        });
    }

    /**
     * This method will return a Promise that will resolve with the Block
     *  with the hash passed as a parameter.
     * Search on the chain array for the block that has the hash.
     * @param {*} hash 
     */
    getBlockByHash(hash) {
        let self = this;
        return new Promise((resolve, reject) => {
          const block = self.chain.filter(block => block.hash === hash);
          if(typeof block != 'undefined'){
            resolve(block);
          }
          reject(Error("No block found with this hash."));
        });
    }

    /**
     * This method will return a Promise that will resolve with the Block object 
     * with the height equal to the parameter `height`
     * @param {*} height 
     */
    getBlockByHeight(height) {
        let self = this;
        return new Promise((resolve, reject) => {
            let block = self.chain.filter(p => p.height === height)[0];
            if(block){
                resolve(block);
            } else {
                resolve(null);
            }
        });
    }

    /**
     * This method will return a Promise that will resolve with an array of Stars objects existing in the chain 
     * and are belongs to the owner with the wallet address passed as parameter.
     * @param {*} address 
     */
    getStarsByWalletAddress (address) {
        let self = this;
        let stars = [];
        return new Promise((resolve, reject) => {
            stars = self.chain.filter(block => block.getBData().split(":")[0]);
        });
    }

    /**
     * This method will return a Promise that will resolve with the list of errors when validating the chain.
     */
    validateChain() {
        let self = this;
        let errorLog = [];
        return new Promise(async (resolve, reject) => {
            
        });
    }

}

module.exports.Blockchain = Blockchain;   
