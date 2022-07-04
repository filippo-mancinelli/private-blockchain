
/**
 *                          Block class
 *  The Block class will store the data and act as a dataset for this application.
 *  The class will expose a method to validate the data... The body of
 *  the block will contain an Object that contain the data to be stored, encoded.
 *  All the exposed methods should return a Promise to allow all the methods to
 *  run asynchronously.
 */

//import tools for encoding
const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');

class Block {

    // Constructor - argument data will be the object containing the transaction data
	constructor(data){
		this.hash = null;                                           // Hash of the block
		this.height = 0;                                            // Block Height (consecutive number of each block)
		this.body = Buffer.from(JSON.stringify(data)).toString('hex');   // Will contain the transactions stored in the block, encoded 
		this.time = 0;                                              // Timestamp for the Block creation
		this.previousBlockHash = null;                              // Reference to the previous Block Hash
    }
    
    /**
     *  validate() method will validate if the block has been tampered or not.
     *  Been tampered means that someone from outside the application tried to change
     *  values in the block data as a consequence the hash of the block should be different.
     */
    validate() {
        let self = this;
        return new Promise((resolve, reject) => {
            var current_hash = self.hash;
            var real_hash = SHA256(JSON.stringify(self.data));
            // Comparing if the hashes changed
            if( current_hash !== real_hash){
                reject(false).then(console.log("the block is not valid"));
            }
            resolve(true).then(console.log("the block is valid"));
        });
    }

    /**
     *  Auxiliary Method to return the block body (decoding the data)
     */
    getBData() {
        let self = this;
        return new Promise(function(resolve, reject){
            const encoded_data = self.body;              // Store the data 
            const decoded_data = hex2ascii(encoded_data) // Decode the data to retrieve the JSON representation of the object
            var obj = JSON.parse(decoded_data);          // Parse the data to an object to retrieve.
            if(self.height != 0 ){                        // Resolve with the data if the object isn't the Genesis block
                resolve(obj);
            }else{
                reject(Error("Cannot return data from the genesis block."));
            }
        });
    }

}

module.exports.Block = Block;                   // Exposing the Block class as a module