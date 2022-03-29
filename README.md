# Gaia-x-snapshot
This is a straightforward tool to extract active accounts on the Gaia-X testnet created during the Gaia-X Hackathon II. It will connect to a public Gaia-X Testnet node and query the given range of blocks. Blocks contain transaction hashes that can be used to get the details for each transaction. This includes the sender and receiver of a transaction. You can create a set with these values to get the number of active accounts during the specified range.

## How to get started

Set the `blockNumberStart` and `blockNumberEnd` to get started. Currently, it connects to a public node. This will limit how quickly you can query the blocks and transactions. If you want to speed up the process, you should spin up your Gaia-X Testnet node and query from localhost.

```bash 
npm i
node index.js 
```
