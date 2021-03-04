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
  res.set('Access-Control-Allow-Origin', "http://localhost:3000");

  let sampleFile;
  let uploadPath;
  
  let newObj = JSON.parse(req.body.userData);
  let userName = newObj["email"].split("@")[0].split('.').join('');
  
  let fullObj = {};
  fullObj[userName] = newObj;
  
  let theUser = JSON.stringify(fullObj, null, 2);
	fs.writeFileSync('./userDatas/user.json', theUser);

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }
 
  let newFileName = req.files.userFile.name.split(".");
  newFileName[0] = userName;
  newFileName = newFileName.join(".");
 
  uploadPath = __dirname + '/uploads/' + newFileName;

  req.files.userFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send(`{"ez": "kész"}`);
  });
});

app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});