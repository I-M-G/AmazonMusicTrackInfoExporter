# Amazon Music Song Data Extractor
Using a Chrome Extension and Node server to save the current song and artisit information to a text file for use in streaming software like OBS or Xsplit.

### About
This is my solution to the problem of no API support from Amazon Music. The Chrome Extension simply checks if I'm playing music and if I am then passes the song title and artist from `contentScript.js` to `background.js`. From the background script we just make a simple `POST` to the Node (express.js) server. From there the server writes the data to a text file. We can not write to a file from within the browser, so we need to extract it and make an API call. The [Develop Extenions Docs](https://developer.chrome.com/extensions/devguide) are helpful if you want to better understand how the content and backgroud scripts work.

### Setup
You'll need to add a `logs` folder to the project or change the output location of the text files.

##### Install NPM Packages
You'll need to install `express` and `cors` for this project.

##### Installing the extension
Open up your Chrome browser and in a new tab go to `chrome://extensions`. On the extensions page enable __'Developer Mode'__ and click __'Load Unpacked'__. Navigate to the project location and select the __`extension`__ folder to install. You'll need to toggle the extension on when you want to use it, otherwise I leave it off. 

##### Running the server
Once the extension is installed and enabled, load up a tab with Amazon Music. Start the  server `node app.js` and start playing music. When the server receives the song data it will console log it and write it to the text file.  The `POST` to the server only happens if the song changes. The content script checks every 2 seconds for a song change.
