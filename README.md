# Amazon Music Song Data Extractor
Using a Chrome Extension and Node server to save the current song and artisit information to a text file for use in streaming software like OBS or Xsplit.

#### About
This is my solution to the problem of no API support from Amazon Music. The Chrome Extension simply checks if I'm playing music and if I am then passes the song title and artist from `contentScript.js` to `background.js`. From the backgroung script we just make a simple POST to the Node (express.js) server. From there the server writes the data to a text file. We can not write to a file from within the browser, so we need to extract it and make an API call.

#### Setup
Coming soon