// Global variables
let elemetnIsVisible = false;
let trackArtistElement = document.querySelector(".trackArtist");
let trackTitleElement = document.querySelector(".trackTitle");
let musicHorizontalItem = document.querySelector("music-horizontal-item");
let currentSongName = null;
let currentArtist = null;
let songData = {songName: "", artistName: ""};

console.log("\nAmazon Music Extension -- Content Sctript Loaded\n");

// Create port for passing track info to background.js
let port = chrome.runtime.connect({ name: "amazonMusic" });

// If the music hasn't been started then these elements are not visible
function areElementsVisible() {

  if (musicHorizontalItem !== null) {
    elemetnIsVisible = true;

    console.log(`Music Horizontal Item Found...`);
    
    console.log(musicHorizontalItem.getAttribute("primary-text"));
    console.log(musicHorizontalItem.getAttribute("secondary-text"));
  }

}

// Check that music has started playing.
// Once music is playing the elements that contain the song and artist values will be available.
let checkIfElementsAreVisible = setInterval(() => {
  // Try and set the element
  musicHorizontalItem = document.querySelector("music-horizontal-item");

  // music-horizontal-item

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
  // songData.artistName = trackArtistElement.children[0].innerText;
  // songData.songName = trackTitleElement.children[0].innerText;

  songData.songName = musicHorizontalItem.getAttribute("primary-text");
  songData.artistName = musicHorizontalItem.getAttribute("secondary-text");

  // When music starts playing set the current song and artisit
  if (currentSongName === null || currentArtist === null) {
    // Send to background.js now that we have track info
    port.postMessage(JSON.stringify(songData));
    
    currentSongName = musicHorizontalItem.getAttribute("primary-text");
    currentArtist = musicHorizontalItem.getAttribute("secondary-text");
  }

  // Only update current track info if it has changed
  if (songData.artistName !== currentArtist || songData.songName !== currentSongName) {
    // Send the new track info to background.js.
    port.postMessage(JSON.stringify(songData));

    currentSongName = musicHorizontalItem.getAttribute("primary-text");
    currentArtist = musicHorizontalItem.getAttribute("secondary-text");

    console.log("New Song...");
  }

}
