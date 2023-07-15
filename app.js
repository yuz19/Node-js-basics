const express=require('express');
const  mongoose   = require('mongoose');
const morgan=require('morgan');

const blogRoutes=require('./routes/blogRoutes');
//express app
const app=express();
//connect to mongodb
const dbURI='mongodb+srv://admin:Algi19622002nabiL@nodetuts.ntp4vjc.mongodb.net/node-tuts'
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((result)=>app.listen(3000))
    .catch((err)=>console.log(err))
    //register view engine
app.set('view engine','ejs')
//listen for requests

    //app.set('views','myviews')
/*app.use((req,res,next)=>{
    console.log('new request made:');
    console.log('host: ',req.hostname);
    console.log('path: ',req.path);
    console.log('method: ',req.method);
    next();
})*/

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
app.get('/add-blog',(req,res)=>{
    const blog=new Blog({
        title:'New Blog2',
        snippet:'about my new blog',
        body:'more about my new blog'
    });

    blog.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})
app.get('/all-blogs',(req,res)=>{
    Blog.find()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})
app.get('/single-blog',(req,res)=>{
    Blog.findById('64b0519c50a7d7ba2e42788d')
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})
//routes
app.get('/',(req,res)=>{
    //res.send('<p>Home Page</p>');
    //html:res.sendFile('./views/index.html',{root:__dirname});
    /*
    const blogs=[
            {title:'Yoshi finds eggs',snippet:'Lorem ispum dolor sit amet consecteur'},
            {title:'Mario finds stars',snippet:'Lorem ispum dolor sit amet consecteur'},
            {title:'How to defeat bowser',snippet:'Lorem ispum dolor sit amet consecteur'},
    ];

    res.render('index',{ title: 'Home',blogs:blogs})
    */
   res.redirect('/blogs')
});

app.get('/about',(req,res)=>{
    //res.send('<p>about Page</p>');
   //html: res.sendFile('./views/about.html',{root:__dirname});
   res.render('about',{ title: 'About'})
});
//blog routes
app.use('/blogs',blogRoutes)
//redirects
app.get('/about-us',(req,res)=>{
    res.redirect('/about');
})

//404 page
app.use((req,res)=>{
    //html:res.status(404).sendFile('/views/404.html',{ root:__dirname})
    res.status(404).render('404',{ title: '404'})
})