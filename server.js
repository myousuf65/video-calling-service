import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import cors from 'cors'
import {connect} from "amqplib"



// defining __dirname and __filename
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// express initialization
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static('./public/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// rabbitmq initialization
const connection = await connect("amqp://localhost")
const channel = await connection.createChannel()
const offerQueue = 'offer-queue'
const initializationQueue = 'initiate-call'
await channel.assertQueue(initializationQueue, { durable : false })

channel.consume(initializationQueue, (msg)=>{
  console.log('received ', msg.content.toString())
})


// app.post('initiate', (req, res)=>{  
// })
