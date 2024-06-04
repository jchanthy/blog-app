import express from 'express';
import {join} from 'path';
import morgan from "morgan";
import {createWriteStream} from 'fs';
import session from "express-session";
import compression from 'compression';

const app = express();
const port = 3000;
const logFile = join(__dirname, 'access.log');
app.use('/assets', express.static(join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(compression());

app.use(morgan(':method - :url - :date - :response-time ms', {
    stream: createWriteStream(logFile, {flags: 'a'})
}));
app.use('/admin', session({
    name: 'sessId',
    resave: false,
    saveUninitialized: true,
    secret: app.get('env') === 'production' ? process.env.sessionSecret : '1232131qdasdqqwe1121',
    cookie: {
        httpOnly: true,
        maxAge: 1600000,
        secure: app.get('env') === 'production',
    }
}));
app.set('view engine', 'pug');

// Sample blog posts (replace with database or file system storage later)
const posts = [
    {
        id: 1,
        title: 'Sample Post 1',
        author: 'David',
        content: 'This is the content of the first sample blog post.'
    },
    {
        id: 2,
        title: 'Sample Post 2',
        author: 'David',
        content: 'This is the content of the second sample blog post.',
    }
];
const users = [
    {username: 'admin', password: 'password123'},
];

app.get('/', (req, res) => {
    res.render('index', {posts}, (err, html) => {
        if (err) {
            res.status(500).send('Error rendering template');
        } else {
            res.send(html);
        }
    });
});

app.post('/api/posts', (req, res) => {
    console.log(req.body);
    res.json({message: 'Got it!!'});
})

// Login route
app.get('/admin', (req, res) => req.session.user ? res.redirect('/admin/dashboard') : res.redirect('/admin/login'))
    .get('/admin/login', (req, res) =>
        res.render('login'))
    .post('/admin/login', (req, res) => {
        const {email, password} = req.body;
        if (email === 'john@mail.com' && password === '123') {
            req.session.user = 'John C.';
            return res.redirect('/admin/dashboard')
        }
        res.redirect('/admin/login');
    });
// Logout route
app.get('/admin/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/admin/login')
});
// Dashboard route (protected)
app.get('/admin/dashboard', (req, res) => {
    res.render('dashboard', {
        user: req.session.user, posts
    });
});
app.post('/admin/approve', (req, res) => {
    res.redirect('/admin/dashboard');
});
app.get('/logout', (req, res) => {
    res.redirect('/login')
});
app.post('/admin/approve', (req, res) => res.redirect('/admin/dashboard'));

// Catch-all route for unmatched paths
app.get('*', (req, res) => {
    res.status(404).send('<h1>404</h1>'); // Render the "page not found" template with a 404 status code
});
// Promise.all([connectToDb()]).then(() => app.listen(port, () => console.log(`server running port ${port}`)));
app.listen(port, () => console.log(`server is running port ${port}`));