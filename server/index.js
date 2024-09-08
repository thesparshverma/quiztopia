import env from "dotenv";
env.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Hello world");
})

mongoose.connect(process.env.URI,{useNewUrlParser:true});

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String
})

const User = new mongoose.model("User",userSchema);

app.post("/register",(req,res)=>{
    const {Username,Email,Password}=req.body;
    User.findOne({email:Email})
    .then(result=>{
        if(result===null){
            User.findOne({username:Username})
            .then(result1=>{
                if(result1===null){
                    const user = new User({username:Username,email:Email,password:Password});
                    user.save();
                    res.send({user,error:0})
                }
                else{
                    res.send({error:2});
                }
            })
            .catch(err1=>{console.log(err1)});
        }
        else{
            res.send({error:1});
        }
    })
    .catch(err=>{console.log(err)});
})

app.post("/login",(req,res)=>{
    const {Email,Password}=req.body;
    User.findOne({email:Email,password:Password})
    .then(result=>{
        if(result===null){
            User.findOne({username:Email,password:Password})
            .then(result1=>{
                if(result1===null){
                    res.send({error:true});
                }
                else{
                    res.send({"result":result1,error:false});
                }
            })
            .catch(err1=>{console.log(err1)});
        }
        else{
            res.send({result,error:false});
        }
    })
    .catch(err=>{console.log(err)});
})

const quizSchema = new mongoose.Schema({
    userID:String,
    title:String,
    time:String
})

const Quiz = new mongoose.model("Quiz",quizSchema)

const questionSchema = new mongoose.Schema({
    quizID:String,
    q:String,
    a:String,
    b:String,
    c:String,
    d:String,
    ans:String
})

const Question = new mongoose.model("Question",questionSchema);

app.post("/users/:user",(req,res)=>{
    Quiz.find({userID:req.body.userID}).then(result=>{
        res.send(result);
    })
    .catch(err=>{console.log(err)})

})

app.post("/quiz",(req,res)=>{
    const {userID,title,questions,time} = req.body;
    let quiz = new Quiz({"userID":userID,"title":title,"time":time})
    const quizID = quiz._id.valueOf();
    let s = "";
    questions.map((e)=>{
        const question = new Question({"quizID":quizID,q:e.q , a:e.a , b:e.b , c:e.c , d:e.d , ans:e.ans})
        question.save();
    })
    quiz.save();
    res.send(quiz);
})

function check(s){
    if(s.length!==24) return false;
    for(let i=0 ; i<24 ; i++){
        if((s[i]<='9' && s[i]>='0') || (s[i]>='a' && s[i]<='f')) continue;
        else return false;
    }
    return true;
}

app.post("/quiz/:quizID",(req,res)=>{
    const id = req.params.quizID;
    if(check(id)===false){
        res.send({error:true});
    }
    else{
        Quiz.findOne({_id:id}).then(result=>{
            if(result===null) res.send({error:true});
            else{
                Question.find({quizID:id}).then(result1=>{
                    res.send({quiz:result,questions:result1})
                })
            }
        })
    }
})

app.delete("/quiz/:quizID",(req,res)=>{
    const id = req.params.quizID;
    Question.deleteMany({quizID:id})
    .then(result=>{})
    .catch(err=>{console.log(err)});

    Quiz.deleteOne({_id:id})
    .then(result=>{res.send("Deleted")})
    .catch(err=>{console.log(err)});
})

app.post("/search",(req,res)=>{
    const id = req.body.quizID;
    if(check(id)===false) res.send({error:true});
    else{
        Quiz.findOne({_id:id}).then(result=>{
            if(result===null) res.send({error:true})
            else res.send({result,error:false})
        }).catch(err=>{console.log(err)})
    }
})

app.get("/random",(req,res)=>{
    Quiz.find()
    .then(result=>{
        const index = Math.floor(Math.random()*result.length);
        res.send(result[index]._id.valueOf());
    }).catch(err=>console.log(err));
})

app.listen(process.env.PORT || 5000,()=>{
    console.log(process.env.PORT);
})