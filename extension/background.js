let json; // Holds JSON from contentScript.js

// Listen for the connection from contentScript.js
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "amazonMusic");

  // Listen for updated track info from contentScript.js
  // Happens when music starts playing or track info updates
  port.onMessage.addListener(function(msg) {
    // Set the track info
    json = JSON.parse(msg);

    // Send track info the sever
    makePostRequest(json);
  });

});

/**
 * Using a simple XMLHttpRequest to send track info to the server.
 * Fetch API was causing issues with Content-Type being text and 
 * would not send as application/json even though it was set.
 * Server was showing body as empty as text.
 * 
 * @param {JSON} data the track info sent over from the content script.
 */
function makePostRequest(data) {
  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
      console.log(data);
    }
  });

  xhr.open("POST", "http://localhost:3000/TrackInfo");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(JSON.stringify(json));
}