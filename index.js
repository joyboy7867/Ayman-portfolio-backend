import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"

const skillSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    }
})
const projectSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }

})

const certificateSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }
})
const resumeschema=new mongoose.Schema({
    link:{
        type:String,
    }
})

const mskill=new mongoose.model("Skill",skillSchema)
const mproject=new mongoose.model("Project",projectSchema)
const mcertificate=new mongoose.model("Certificate",certificateSchema)
const resumemodel=new mongoose.model("resume",resumeschema);
const app=express()
app.use(cors());
mongoose.connect("mongodb+srv://amaankp7867:T26DPKnwjMrm7yJ2@cluster0.fkphqcw.mongodb.net/").then(()=>{
    console.log("connected to database")
}).catch(err=>{
    console.log("not connected to database")
})
app.use(bodyParser.urlencoded({extended:true}))

app.post("/api/aymanpersonal/skill",async(req,res)=>{
    const{Name,img}=req.body
    const skill=new mskill({
        Name:Name,
        img:img
    })
    await skill.save()
})
app.post("/api/aymanpersonal/resume",async(req,res)=>{
    const{link}=req.body
    const resume=new resumemodel({
        link:link
    })
    await resume.save()
})

app.post("/api/aymanpersonal/project",async(req,res)=>{
    const{Name,img,link}=req.body
    const project=new mproject({
        Name:Name,
        img:img,
        link:link
    })
    await project.save()
})

app.post("/api/aymanpersonal/certificate",async(req,res)=>{
    const{Name,img,link}=req.body
    const certificate=new mcertificate({
        Name:Name,
        img:img,
        link:link
    })
    await certificate.save()
})

app.get("/api/aymanpersonal/skill",async(req,res)=>{
    await mskill.find({}).then((found)=>{
       
        res.json(found)
    })
})
app.get("/api/aymanpersonal/resume",async(req,res)=>{
    await resumemodel.find({}).then((found)=>{
        
        res.json(found[0].link)
    })
})

app.get("/api/aymanpersonal/project",async(req,res)=>{
    await mproject.find({}).then((found)=>{
        
        res.json(found)
    })
})

app.get("/api/aymanpersonal/certificate",async(req,res)=>{
    await mcertificate.find({}).then((found)=>{
       
        res.json(found)
    })
})



app.listen(5000,()=>{
    console.log("Running at localhost 5000")
})