var express = require('express');
var app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
var BodyParser = require('body-parser');

app.use(express.urlencoded({ extended : true}));  //prende ejs 

//connect to mangodb 
//mangoo 
// get save delete  questi funzioni puo fare
//npm install mongoose
const dbURI ='mongodb+srv://emink45:b1UPtaWkMsb6CNBs@nodetuts.fmu4c.mongodb.net/note-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology:true })
.then((result) => console.log('siamo in ascolto nella porta 3000'))
 .then((result)=> app.listen(3000))
.catch((err)=> console.log(err));

//view engine ejs
app.set('view engine', 'ejs');  //dichiaro che ejs sara templete

/*app.listen(3000,()=> {
    console.log('funziona?');
});
*/
 

//middleware & static files    come immagini e css
app.use(express.static('public')); // tutto questa cartella sara publico nel frontend



 app.use(morgan('dev'));

 app.get('/add-blog', (req , res) => {
    const blog= new Blog({                  //crezione blog
        title: 'ULTIMO CHE HO MESSO',
        testo:'ciao frateli2f',
        body: 'ciao ciao ciao ciao ciao2'
    });
    blog.save()
    .then((result)=> {
        
        res.send(result);
    })
    .catch ((error)=>{
        console.log(error);
    })
 });

 app.get('/all-blogs', (req , res) => {
    Blog.find()  //funzione che prende tutti i blog
    .then((result)=>{
        res.send(result);
        res.render('index',{title : 'All blogs', blogs: result});
    })
    .catch((err)=> console.log(err));
 });

 app.get('/blogs', (req , res) => {
    Blog.find()  //funzione che prende tutti i blog
    .then((result)=>{
        var rev = result.reverse();
        res.render('index',{title : 'All blogs', blogs: rev});
    })
    .catch((err)=> console.log(err));
 });

 app.get('/single-blog', (req , res)=> {

   Blog.findById('60c8bfb79f3e361d3037658f') // trova tramite id
   .then((result)=>{
      res.send(result);
   })
   .catch((err)=> console.log(err));
 });
 
app.post('/blogs',(req , res)=>{
     
   console.log(req.body);
   const blog= new Blog(req.body);
   blog.save()
     res.redirect('/blogs');
});
app.use((req, res,next)=> {
    console.log('new request made');
    console.log('host'+req.hostname);
    next();
});





app.get('/blogs/create', (req , res) => {
    res.render('create', {title: 'Create'});
});

/*app.get('/',(req , res) => {
    const blogs= 
 [
   {title: 'RICK GRIMS: ', testo: 'uccidero tutti gli zombie'},
   {title: 'PETER MER' , testo :'ciao io sono il figlio di grims'},
   {title: 'moglie', testo:'sono morta per colpa di mia figlia'},
 ];

    // res.end('<p>prova</p>');
     // res.sendFile('./view/index.html', { root: __dirname });
     res.render('index',{title : 'Home', blogs});   //va direttamente nella cartella views percio si deve sempre chiamare cosi
});
*/


app.get('/about',(req , res) => {
    // res.end('<p>prova</p>');  
      // res.sendFile('./view/about.html', { root: __dirname });
      res.render('about', {title: 'about'})
     
});

app.get('/',(req, res) =>{

    res.redirect('/blogs');
})
// 404 error pagina non esistente

app.get('*', (req , res)=>{

    res.render('404',{title:'error'});
});
