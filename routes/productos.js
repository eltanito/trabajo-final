const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
    db.all('SELECT * FROM productos', (err, rows) => {
        res.render('productos', { productos: rows });
    });
});

router.get('/agregar', (req, res) => {
    res.render('agregar');
});

router.post('/agregar', (req, res) => {
    const { nombre, descripcion, precio } = req.body;

    db.run(
        'INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)',
        [nombre, descripcion, precio],
        () => res.redirect('/productos')
    );
});

router.get('/editar/:id', (req, res) => {
    db.get(
        'SELECT * FROM productos WHERE id = ?',
        [req.params.id],
        (err, row) => {
            res.render('editar', { producto: row });
        }
    );
});

router.post('/editar/:id', (req, res) => {
    const { nombre, descripcion, precio } = req.body;

    db.run(
        'UPDATE productos SET nombre=?, descripcion=?, precio=? WHERE id=?',
        [nombre, descripcion, precio, req.params.id],
        () => res.redirect('/productos')
    );
});

router.get('/eliminar/:id', (req, res) => {
    db.run(
        'DELETE FROM productos WHERE id=?',
        [req.params.id],
        () => res.redirect('/productos')
    );
});

module.exports = router;