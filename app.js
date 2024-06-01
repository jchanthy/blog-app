import express from 'express';
import ejs from 'ejs';

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
    res.status(404).send('Post not found');
  }
});
app.listen(port, ()=>console.log(`server runing port ${port}`));