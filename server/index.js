const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authCtrl = require('./controllers/auth_controller');
const createInitialSession = require('./middlewares/checkForSession').checkUserSession;
const swagCtrl = require('./controllers/swag_controller');
const cartCtrl = require('./controllers/cart_controller');
const searchCtrl = require('./controllers/search_controller');
const app = express();

app.use(bodyParser.json());


app.use(session({
    secret: 'lkj;oacoin',
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 10000}
}))
app.use(createInitialSession);
app.use(express.static(`${__dirname}../public/build`));
const port = 3000;

app.get('/api/swag', swagCtrl.read);
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.post('/api/signout', authCtrl.signout);
app.get('/api/user', authCtrl.getUser);

//cart
app.post('/api/cart', cartCtrl.add);
app.post('/api/cart/checkout', cartCtrl.checkout);
app.delete('/api/cart', cartCtrl.delete);

//search
app.get('/api/search', searchCtrl.search);

app.listen(port, console.log(`Listening on port: ${port}`));