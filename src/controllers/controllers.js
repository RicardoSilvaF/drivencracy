import { db } from "../database/database.config.js"
import dayjs from "dayjs";
import { ObjectId} from "mongodb";
import diff from "dayjs"

export async function createPoll(req,res){
    const {title, expireAt} = req.body;
    if(expireAt === ""){
        const datePlusThirty = dayjs();
        datePlusThirty = datePlusThirty.add(30, 'day');
        expireAt = datePlusThirty.format('YYYY-MM-DD HH:mm');
        console.log(expireAt);
    }
    try{
        const newPoll = {
            title: title,
            expireAt: expireAt
        }

        await db.collection("polls").insertOne(newPoll);
        res.sendStatus(201)
    }
    catch(err){
        res.status(500).send(err.message);
    }
}


export async function getPolls(req,res){ 
    try{
        const pollsList = await db.collection("polls").find().toArray();
        res.send(pollsList);
    }
    catch(error){
        res.status(500).send(error.message);
    }
}


export async function createChoice(req,res){
    const {title, pollId} = req.body;

    const pollToModify = await db.collection("polls").findOne({_id: new ObjectId(pollId)}); // nonexisting poll validation
    if(!pollToModify){
        return res.sendStatus(404);
    }
    try{

        const titleRepeat = await db.collection("choices").findOne(req.body); // repeated title validation
        if(titleRepeat){
            return res.sendStatus(409);
        }
        
        const pollExpiredAt = dayjs(pollToModify.expireAt); // finished polls validation
        if (pollExpiredAt.isBefore(dayjs())){
            return res.sendStatus(403);
        }

        
        const newChoice = {
            title: title,
            pollId: pollId
        }
        await db.collection("choices").insertOne(newChoice);
        return res.status(201).send(newChoice); 
    }
    catch(err){
        res.status(500).send(err.message);
    }
} 