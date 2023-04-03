const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?

  const merkle = new MerkleTree(niceList);

  const name = "Norman Block";
  const index = niceList.findIndex((n) => n === name);
  const proof = merkle.getProof(index);
  const merkleRoot = merkle.getRoot();
  // console.log(proof);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name,
    proof,
    merkleRoot,
  });

  console.log({ gift });
}

main();
