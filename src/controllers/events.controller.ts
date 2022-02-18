import { Context } from "koa";
import { ObjectId } from "mongodb";
import { client } from "../config/db.config";
import { EventType } from "../models/event_types.model";

const database = client.db("Q-Delivery")
const collection = database.collection("events");

export class EventsController {

  // Read
  static async getAll(ctx: Context) {   
    var page = ctx.request.query.page;
    var typeIndex = ctx.request.query.type;
    var event_type = await database.collection<EventType>('event_types').findOne({ "index": Number.parseInt(typeIndex as string) });
    
    const events = collection.find({
          "type": event_type?.name
    }).limit(10).skip(Number.parseInt(page as string));
    const res = await events.toArray();
    
    ctx.body = res;
  }

  static async getOne(ctx: Context) {
    console.log(ctx.params.id);
    
    const user = await collection.findOne({ "_id": new ObjectId(ctx.params.id) });
    ctx.body = user;
  }

  // Write
  static async insertOne(ctx: Context) {
    const {email, name} = ctx.request.body;
    const result = await collection.insertOne({
      
    });
    if (result.insertedId !== undefined && result !== null) {
      ctx.status = 201;
    }
  }

  static async updateOne(ctx: Context) {
    const {email, name} = ctx.request.body;
    const result = await collection.updateOne(
      {
        '_id': new ObjectId(ctx.params.id)
      },
      { 
        $set: {
        "email": email as string,
        "name": name as string,
        "role": "client"
        }
      }
    );
    if (result.acknowledged) {
      ctx.status = 200;
    }
  }

  static async deleteOne(ctx: Context) {
    const result = await collection.deleteOne({'_id': new ObjectId(ctx.params.id)});
    if (result.acknowledged) {
      ctx.status = 200;
    }
  }
}