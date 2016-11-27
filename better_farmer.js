var Web3 = require('web3');
var web3 = new Web3();

var betterFarmer;

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

var contractAddress = '0x097cF241d920D440311320aA3c64Fb22F0fEda94';
var contractCJI = [ { "constant": false, "inputs": [ { "name": "id", "type": "address" }, { "name": "activityType", "type": "string" }, { "name": "description", "type": "string" }, { "name": "amount", "type": "uint256" } ], "name": "buildActivity", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "address" } ], "name": "countActivity", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "allFarmer", "outputs": [ { "name": "id", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "name", "type": "string", "value": "" }, { "name": "gender", "type": "string", "value": "" }, { "name": "province", "type": "string", "value": "" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "address" } ], "name": "getFarmerInformation", "outputs": [ { "name": "name", "type": "string" }, { "name": "gender", "type": "string" }, { "name": "province", "type": "string" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "address" }, { "name": "name", "type": "string" }, { "name": "gender", "type": "string" }, { "name": "province", "type": "string" } ], "name": "buildFarmer", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "BetterFarmer", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "stories", "outputs": [ { "name": "id", "type": "address" }, { "name": "activityType", "type": "string" }, { "name": "description", "type": "string" }, { "name": "amount", "type": "uint256" } ], "payable": false, "type": "function" } ];
var currentAccounts;
web3.eth.getAccounts(function(error, accounts){
  if(!error) {
    currentAccounts = accounts;
    start();
  }
});

function start() {
  web3.eth.getCode(contractAddress, function(error, res) {
    if (!error) {
      var betterFarmerContract = web3.eth.contract(contractCJI);
      betterFarmer = betterFarmerContract.at(contractAddress);
      web3.personal.unlockAccount(currentAccounts[0], "s0mk1atPUI")
      callCountActivity(1);
    }
  });
}

function callCountActivity(farmerId) {
  betterFarmer.countActivity.call(farmerId, function(error, size) {
    for(var position=0; position<size; position++) {
      var activity = betterFarmer.stories.call(farmerId, position);
      var activityType = activity[1];
      var description = activity[2];
      console.log(activityType, ", ", description);
    }
  });
}
