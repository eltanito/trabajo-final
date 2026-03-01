app.use(express.static('public'));
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const exphbs = require('express-handlebars');

const app = express();
const db = new sqlite3.Database('./database.sqlite');

// Crear tabla si no existe
db.run(`
CREATE TABLE IF NOT EXISTS productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT,
  precio REAL
)
`);

app.use(express.urlencoded({ extended: true }));

app.engine('hbs', exphbs.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// INICIO
app.get('/', (req, res) => {
    res.render('inicio');
});

// LISTAR PRODUCTOS
app.get('/productos', (req, res) => {
    db.all('SELECT * FROM productos', (err, rows) => {
        if (err) return res.send("Error en base de datos");
        res.render('productos', { productos: rows });
    });
});

// FORM NUEVO
app.get('/nuevo', (req, res) => {
    res.render('nuevo');
});

// CREAR
app.post('/nuevo', (req, res) => {
    const { nombre, precio } = req.body;
    db.run('INSERT INTO productos (nombre, precio) VALUES (?, ?)',
        [nombre, precio],
        (err) => {
            if (err) return res.send("Error al guardar");
            res.redirect('/productos');
        }
    );
});

// FORM EDITAR
app.get('/editar/:id', (req, res) => {
    db.get('SELECT * FROM productos WHERE id = ?',
        [req.params.id],
        (err, row) => {
            if (err || !row) return res.send("Producto no encontrado");
            res.render('editar', row);
        }
    );
});

// ACTUALIZAR
app.post('/editar/:id', (req, res) => {
    const { nombre, precio } = req.body;
    db.run(
        'UPDATE productos SET nombre = ?, precio = ? WHERE id = ?',
        [nombre, precio, req.params.id],
        (err) => {
            if (err) return res.send("Error al actualizar");
            res.redirect('/productos');
        }
    );
});

// ELIMINAR
app.get('/eliminar/:id', (req, res) => {
    db.run('DELETE FROM productos WHERE id = ?',
        [req.params.id],
        (err) => {
            if (err) return res.send("Error al eliminar");
            res.redirect('/productos');
        }
    );
});

// CONTACTO
const nodemailer = require('nodemailer');
app.post('/contacto', async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'eltanito490@gmail.com',
                pass: 'CLAVE_DE_APLICACION'
            }
        });

        await transporter.sendMail({
            from: req.body.email,
            to: 'eltanito490@gmial.com',
            subject: 'Mensaje desde formulario',
            text: req.body.mensaje
        });

        res.send("Mensaje enviado correctamente ✅");

    } catch (error) {
        console.error(error);
        res.send("Error al enviar el mensaje ❌");
    }
});