const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {signUpModelObj} = require('./src/modal/SignUp');
const {articleModelObj} = require('./src/modal/Article');




//Object Initialization
const app = express();
app.use(cors());

//DB connect
mongoose.connect("mongodb+srv://steffi:steffi@cluster0.npwp5.mongodb.net/BlogAppDatabase?retryWrites=true&w=majority",{
    useUnifiedTopology: true,
       useNewUrlParser: true,
})

//Posting
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const path = require('path');
app.use(express.static('./build'))

app.use(function (req,res,next){
    //Website you wish to allow to connect
     res.setHeader('Access-Control-Allow-Origin', '*');

     //res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');

     //Request methods you wish to allow
     res.setHeader('Access-Control-Allow-Methods','GET','POST','OPTIONS','PUT','PATCH' ,'DELETE');

      //Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');

      //Set to true if you need the website to include cookies in the request sent
      //to API (e.g in case you use sessions)

      res.setHeader('Access-Control-Allow-Credentials',true);

      //Pass to next layer of middleware
      next();
});

//Routing
//Adding signup datas
app.post('/api/signup',async(req,res) =>{
    try{
        let mydata = new signUpModelObj(req.body);
        let result = await mydata.save();
        res.json(result);

    }catch(err){
        console.log(err);
    }

});

//Adding Article datas

app.post('/api/articles',async(req,res) =>{
    try{
        let mydata = new articleModelObj(req.body);
        let result = await mydata.save();
        res.json(result);

    }catch(err){
        console.log(err);
    }

});

//Getting all article lists
app.get('/api/viewall',async(req,res)=>{
    try{
        let result = await articleModelObj.find();
        res.json(result);
        // console.log(result)
    }catch(e){
        console.log(e)
    }
});

//Getting a single Article
app.get('/api/article/:title',async(req,res)=>{
    
    const articleTitle = req.params.title;
    await articleModelObj.findOne({title:articleTitle}).then(
        function(article){
            res.json(article);
        }
    )  
})

//Deleting a single Article
app.delete('/api/article/:title/delete',async(req,res)=>{
     
    try{
        const articleTitle = req.params.title;
        let result= await articleModelObj.findOneAndDelete({title:articleTitle});
        res.json(result);

        // if(result.length < 0){
        //     res.json({status:'success'})
        // }
        // else{
        //     res.json({status:' failed'})
        // }

    }catch(err){

    } 
});

//Checking login 
app.post("/api/login",async(req,res)=>{
    try{
        var userEmail = req.body.email;
        var userPassword = req.body.password;
        let result= await signUpModelObj.find({$and:[{email:userEmail},{password:userPassword}]});
        // res.json(result);

        if(result.length >0){
            res.json({status:'success',data:result})
        }
        else{
            res.json({status:' failed'})
        }

    }catch(err){

    }
}
);
app.post('/api/article/:name/:id',(req,res)=>{
    const id = req.params.id;
    
    // res.send(articleInfo[articleName]);
    const filter ={_id:Object(id)};
    const update = req.body;
    
    articleModelObj.findOneAndUpdate(filter,update,{new:true}).then(
        function(article){
            res.json(article);
        }
    )

})

app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname + '/build/index.html'));
})



// var port = process.env.PORT || 5001;

app.listen(5001,()=>{
    console.log("Server Ready on 5001");
});