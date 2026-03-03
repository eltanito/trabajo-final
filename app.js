const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine(
    'hbs',
    exphbs.engine({
        extname: 'hbs',
        defaultLayout: 'main'
    })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const productosRoutes = require('./routes/productos');
app.use('/productos', productosRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/contacto', (req, res) => {
    res.render('contacto');
});

app.post('/contacto', (req, res) => {
    console.log("Mensaje recibido:");
    console.log(req.body);

    res.render('contacto', { ok: true });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});