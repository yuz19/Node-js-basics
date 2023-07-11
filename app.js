const express=require('express');

//express app
const app=express();

//register view engine
app.set('view engine','ejs')
//listen for requests
app.listen(3000);
    //app.set('views','myviews')

app.get('/',(req,res)=>{
    //res.send('<p>Home Page</p>');
    //html:res.sendFile('./views/index.html',{root:__dirname});
    res.render('index')
});

app.get('/about',(req,res)=>{
    //res.send('<p>about Page</p>');
   //html: res.sendFile('./views/about.html',{root:__dirname});
   res.render('about')
});

app.get('/blogs/create',(req,res)=>{
    res.render('create')
});

//redirects
app.get('/about-us',(req,res)=>{
    res.redirect('/about');
})

//404 page
app.use((req,res)=>{
    //html:res.status(404).sendFile('/views/404.html',{ root:__dirname})
    res.status(404).render('404')
})