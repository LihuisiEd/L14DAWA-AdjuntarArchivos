const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán los archivos adjuntos
const path = require('path');

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.array('file'), (req, res) => {
    const fileInfos = req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype
    }));
  
    res.send(fileInfos);
  });
  


app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
