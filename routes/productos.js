const express = require('express');
const router = express.Router();
const db = require('../db/conexion');

// LEER
router.get('/', (req, res) => {
    db.all('SELECT * FROM productos', [], (err, rows) => {
        if (err) return res.send(err.message);
        res.render('productos', { productos: rows });
    });
});

// CREAR
router.post('/crear', (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    db.run(
        'INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)',
        [nombre, descripcion, precio],
        () => res.redirect('/productos')
    );
});

// EDITAR
router.post('/editar/:id', (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    db.run(
        'UPDATE productos SET nombre=?, descripcion=?, precio=? WHERE id=?',
        [nombre, descripcion, precio, req.params.id],
        () => res.redirect('/productos')
    );
});

// BORRAR
router.get('/borrar/:id', (req, res) => {
    db.run(
        'DELETE FROM productos WHERE id=?',
        [req.params.id],
        () => res.redirect('/productos')
    );
});

module.exports = router;