import { db } from "../database/database.config.js"
import dayjs from "dayjs";

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