// Global variables
let elemetnIsVisible = false;
let trackArtistElement = document.querySelector(".trackArtist");
let trackTitleElement = document.querySelector(".trackTitle");
let currentSongName = null;
let currentArtist = null;
let songData = {songName: "", artistName: ""};

// Create port for passing track info to background.js
let port = chrome.runtime.connect({ name: "amazonMusic" });

// If the music hasn't been started then these elements are not visible
function areElementsVisible() {
  if (trackArtistElement !== null && trackTitleElement !== null) {
    elemetnIsVisible = true;
  }
}

// Check that music has started playing.
// Once music is playing the elements that contain the song and artist values will be available.
let checkIfElementsAreVisible = setInterval(() => {
  // Try and set the element
  trackArtistElement = document.querySelector(".trackArtist");
  trackTitleElement = document.querySelector(".trackTitle");

  // Are the elements visible yet (is music playing).
  areElementsVisible();
  console.log("++" + elemetnIsVisible);

  // Stop checking if elements are visible (music is playing)
  if (elemetnIsVisible) {
    clearInterval(checkIfElementsAreVisible);
    console.log("Elements are visible");

    // Now that we have the song and artist we can start using it.
    handleTrackData();
    let checkDataInterval = setInterval(() => {
      handleTrackData();
    }, 1000 * 2);
  }
}, 1000 * 2);

// Set the current song and artist and pass it to background.js.
// Update the song and artist if it has changed.
function handleTrackData() {
  // Set the most recent track info
  songData.artistName = trackArtistElement.children[0].innerText;
  songData.songName = trackTitleElement.children[0].innerText;

  // When music starts playing set the current song and artisit
  if (currentSongName === null || currentArtist === null) {
    // Send to background.js now that we have track info
    port.postMessage(JSON.stringify(songData));
    
    currentSongName = trackTitleElement.children[0].innerText;
    currentArtist = trackArtistElement.children[0].innerText;
  }

  // Only update current track info if it has changed
  if (songData.artistName !== currentArtist || songData.songName !== currentSongName) {
    // Send the new track info to background.js.
    port.postMessage(JSON.stringify(songData));

    currentSongName = trackTitleElement.children[0].innerText;
    currentArtist = trackArtistElement.children[0].innerText;
  }

}
