const Diginotice = artifacts.require("Diginotice");
const User = artifacts.require("User");
module.exports = function (deployer) {
  deployer.deploy(Diginotice);
  deployer.deploy(User)

};

