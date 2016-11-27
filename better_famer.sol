pragma solidity ^0.4.0;

contract BetterFarmer {

    address creator;

    struct farmer {
        address id;
        string name;
        string gender;
        string province;
    }
    mapping(address => farmer) public allFarmer;

    struct activity {
        address id;
        string activityType;
        string description;
        uint amount;
    }
    mapping(address => activity[]) public stories;

    function BetterFarmer() {
        creator = msg.sender;
    }

    function buildFarmer(address id, string name, string gender, string province) {
        farmer memory newFarmer = farmer(id, name, gender, province);
        allFarmer[id] = newFarmer;
    }

    function getFarmerInformation(address id) returns(string name, string gender, string province) {
        farmer currentFarmer = allFarmer[id];
        return (currentFarmer.name, currentFarmer.gender,currentFarmer.province);
    }

    function buildActivity(address id, string activityType, string description, uint amount) {
        activity memory newActivity = activity(id, activityType, description, amount);
        stories[id].push(newActivity);
    }

    function countActivity(address id) returns(uint) {
      return stories[id].length;
    }


}
