// import CSS. Webpack with deal with it
import "../css/style.css"

// Import libraries we need.
import { default as Web3} from "web3"
import { default as contract } from "truffle-contract"

// get build artifacts from compiled smart contract and create the truffle contract
import eventArtifacts from "../../build/contracts/Events.json"
var EventContract = contract(eventArtifacts)

/*
 * This holds all the functions for the app
 */
window.App = {
  // called when web3 is set up
  start: function() { 
    // setting up contract providers and transaction defaults for ALL contract instances
	EventContract.setProvider(window.web3.currentProvider)
    EventContract.defaults({from: window.web3.eth.accounts[0],gas:6721975})
 },

  // Function that is called when user clicks the "vote" button
  event: function() {
    var uid = $("#id-input").val() //getting user inputted id

    // Actually voting for the Candidate using the Contract and displaying "Voted"
    EventContract.deployed().then(function(instance){
      instance.addCandidate("PARSER","10","Sucess").then(function(result){
        $("#msg").html("<p>Events Added</p>")
      })
    }).catch(function(err){ 
      console.error("ERROR! " + err.message)
    })
  },

}

// When the page loads, we create a web3 instance and set a provider. We then set up the app
window.addEventListener("load", function() {
  // Is there an injected web3 instance?
  if (typeof web3 !== "undefined") {
    console.warn("Using web3 detected from external source like Metamask")
    // If there is a web3 instance(in Mist/Metamask), then we use its provider to create our web3object
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for deployment. More info here: http://truffleframework.com/tutorials/truffle-and-metamask")
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))
  }
  // initializing the App
  window.App.start()
})