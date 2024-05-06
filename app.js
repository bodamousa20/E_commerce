const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session')
const db = require('./db');
require('dotenv').config()


app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: process.env.ENCRYPTION_SECRET_KEY, 
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 24 * 60 * 60 * 1000,
    }
}));

app.set('view engine', 'ejs');
app.set('views', 'views');

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth')
const errorController = require('./controllers/errorController')

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.get('/home', (req, res) => {
    res.json({ success: true, message: 'show up home page' });
});

app.use('/', authRoutes);

app.use('/',errorController.get404);

async function startServer() {
    try {
        await db.getDB();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();