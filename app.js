import express from 'express';
import ejs from 'ejs';
import path from 'path';

// app.use(express.static('public'));
const app = express();
const port = 3000;

// Sample blog posts (replace with database or file system storage later)
const posts = [
  {
    title: 'Sample Post 1',
    content: 'This is the content of the first sample blog post.',
  },
  {
    title: 'Sample Post 2',
    content: 'This is the content of the second sample blog post.',
  },
];
const users = [
  { username: 'admin', password: 'password123' },
];
// Set EJS as the templating engine
// app.engine('ejs', ejs.renderFile);

// Serve static files from 'public' directory (optional for additional resources)
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
   ejs.renderFile('./views/index.ejs', {posts}, (err, html)=>{
    if(err){
        res.status(500).send('Error rendering template');
    }else{
        res.send(html);
    }
   });
});
app.get('/posts', (req, res)=> {
    res.send(posts);
})
// Route to display a single post by its index in the posts array (replace with database lookup later)
app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < posts.length) {
    res.send(posts[id]);
  } else {
    res.status(404).render('postNotFound.ejs');
  }
});


// Login route
app.get('/login', (req, res) => { res.render('login.ejs')});
app.post('/login', (req, res) => {res.redirect('/dashboard')});
 
// Dashboard route (protected)
app.get('/dashboard', (req, res) => {
res.render('dashboard.ejs');
});

app.get('/logout', (req, res)=>{res.redirect('/login')});

// Catch-all route for unmatched paths
app.get('*', (req, res) => {
  res.status(404).render('page404.ejs'); // Render the "page not found" template with a 404 status code
});
app.listen(port, ()=>console.log(`server runing port ${port}`));