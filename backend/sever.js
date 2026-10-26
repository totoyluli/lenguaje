// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Permite recibir JSON en las peticiones

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Reemplaza con tu usuario de MySQL
  password: '',      // Reemplaza con tu contraseña de MySQL
  database: 'lenguaje_señas'
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

// Ruta (API) para guardar una muestra en la BD (CREATE / INSERT)
app.post('/api/guardar-muestra', (req, res) => {
  const { id_modelo, etiqueta_letra, vector_landmarks } = req.body;

  // Query SQL usando INSERT[cite: 2]
  const query = `INSERT INTO muestras_senas (id_modelo, etiqueta_letra, vector_landmarks) VALUES (?, ?, ?)`;
  
  db.query(query, [id_modelo, etiqueta_letra, JSON.stringify(vector_landmarks)], (err, result) => {
    if (err) {
      console.error('Error insertando datos:', err);
      res.status(500).send('Error guardando en la base de datos');
    } else {
      res.status(201).send({ mensaje: 'Muestra guardada correctamente', id: result.insertId });
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});