const fs = require('fs');
const Web3 = require('web3');

const providerURL = `https://rpc.gaiaxtestnet.oceanprotocol.com` // or use your local node 'http://localhost:8545'
const web3 = new Web3(new Web3.providers.HttpProvider(providerURL));

const historyJsonPath = './src/content/blockHistory.json';

const firstHackathonBlock = 1623079; // corresponds to 30/09/21, 12:00 AM UTC

const data = {
	blocks: []
};

const retrievedBlockHistory = fs.existsSync(historyJsonPath) ?
	JSON.parse(fs.readFileSync(historyJsonPath)) : undefined;

const latestRetrievedBlock = 
	retrievedBlockHistory?.blocks[retrievedBlockHistory.blocks.length - 1]?.currentBlockNumber || 
	firstHackathonBlock;

/**
 * Uses a setTimeout and Promise to simulate a sleep (inaccurate).
 * @param {number} milliseconds Time to sleep.
 * @returns {Promise} A promise that is resolved by a timeout.
 */
function sleep(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}


/**
 * Returns the block that corresponds to the given hash or block number.
 * @param {(string|number)} blockHashOrBlockNumber An identifier for the block.
 * @returns {object|string} The found block or an empty string. 
 */
function getBlockByBlockHashOrBlockNumber(blockHashOrBlockNumber) {
	return web3.eth.getBlock(blockHashOrBlockNumber);	
}

function writeJSON() {
	console.log('Writing blockHistory.json');
	fs.writeFile(historyJsonPath, JSON.stringify(data), (err, result) => console.log);
}

/**
 * Retrieves the DLT history block by block from the starting block until the latest block
 * that was retrieved when the function was called.
 * @returns {} 
 */
async function getBlockHistory() {
	if(latestRetrievedBlock !== firstHackathonBlock) {
		console.log(`📥 Already retrieved ${latestRetrievedBlock - firstHackathonBlock} blocks`);
		
		data.blocks = data.blocks.concat(retrievedBlockHistory.blocks);
	}
	
	const {number: latestBlockNumber} = await getBlockByBlockHashOrBlockNumber('latest');
	console.log(`📥 Downloading ${latestBlockNumber - latestRetrievedBlock} blocks (${latestRetrievedBlock}/${latestBlockNumber})`);

	for (let currentBlockNumber = latestRetrievedBlock; currentBlockNumber < latestRetrievedBlock + 50; currentBlockNumber++) {
		try {
			
			const {miner: node, timestamp, transactions } = getBlockByBlockHashOrBlockNumber(currentBlockNumber);
			data.blocks.push({ currentBlockNumber, node, timestamp, transactions })
			console.log(`${currentBlockNumber}/${latestBlockNumber}`)
		}
		catch(e) {
			writeJSON();
			console.error(e);
		}
	}
	console.log("awaiting resolves")
	await Promise.all(data.blocks)
	console.log(data.blocks)


	writeJSON();
} 


async function getBlockHistorySpeed() {
	if(latestRetrievedBlock !== firstHackathonBlock) {
		console.log(`📥 Already retrieved ${latestRetrievedBlock - firstHackathonBlock} blocks`);
		data.blocks = data.blocks.concat(retrievedBlockHistory.blocks);
	}
	
	const {number: latestBlockNumber} = await getBlockByBlockHashOrBlockNumber('latest');
	console.log(`📥 Downloading ${latestBlockNumber - latestRetrievedBlock} blocks (${latestRetrievedBlock}/${latestBlockNumber})`);

	for (let currentBlockNumber = latestRetrievedBlock; currentBlockNumber < latestRetrievedBlock + 50; currentBlockNumber++) {
		try {
			
			const {miner: node, timestamp, transactions } = getBlockByBlockHashOrBlockNumber(currentBlockNumber);
			data.blocks.push({ currentBlockNumber, node, timestamp, transactions })
			console.log(`${currentBlockNumber}/${latestBlockNumber}`)
		}
		catch(e) {
			writeJSON();
			console.error(e);
		}
	}
	console.log("awaiting resolves")
	await Promise.all(data.blocks)
	console.log(data.blocks)


	writeJSON();
} 






getBlockHistory();
