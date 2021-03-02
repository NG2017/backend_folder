const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = 8000;
app.use('/form', express.static(path.join(__dirname, '../frontend/public')));


// app.use('/script.js', express.static(__dirname + '../public/script.js'));



// default options
app.use(fileUpload());

app.get('/ping', function(req, res) {
  console.log(__dirname);
  res.send('pong');
});

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;


  console.log(req.body);
  console.log(".......");
  console.log("username", req.body.username);


  let theUser = JSON.stringify(req.body.username, null, 2);
	fs.writeFileSync('./backend/userDatas/user.json', theUser);





  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.userfile;

  uploadPath = __dirname + '/uploads/' + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send(`{"ez": "bizony json"}`);
  });
});

app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});