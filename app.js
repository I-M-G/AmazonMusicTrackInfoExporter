const fs = require('fs');
const cors = require('cors');

const express = require('express');
const app = express();
const port = 3000;

// Set server up to accept JSON data
app.use(express.json());
// Needed to make cross-origin http request
app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => res.send('Amazon Music - Data Exporter'));

app.post('/TrackInfo', (req, res) => {
  res.send(req.body);

  // JSON track info sent from the Chrome Extension
  let json = req.body;
  console.log(json);

  writeDataToFile(json, 'track_info');
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

// Write track info from Chrome Extension to file
function writeDataToFile(data, filename) {
  let text = `${data.songName} - ${data.artistName} || `;

  fs.writeFile(`./logs/${filename}.txt`, text, (error) => {
    if (error) console.error(error);
  });
}