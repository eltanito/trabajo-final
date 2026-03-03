const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('contacto');
});

router.post('/', (req, res) => {
    console.log('MAIL RECIBIDO:', req.body);
    res.redirect('/');
});

module.exports = router;