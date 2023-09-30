const express =  require('express');
const checkAuth = require('./middleware/checkAuth');
require('dotenv').config();
const { engine } =  require('express-handlebars');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkAuth);
app.use(express.static('public'));
require('./controllers/auth.js')(app);
require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/replies.js')(app);
require('./data/db');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//* Home
app.get('/', (req, res) => {
  res.render('home');
});


//* New post (get)
app.get('/posts/new', (req, res) => {
  res.render('posts-new', {});
});

app.listen(3000);

module.exports = app;
