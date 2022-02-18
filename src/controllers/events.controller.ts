import { Context } from "koa";
import { ObjectId } from "mongodb";
import { client } from "../config/db.config";

const database = client.db("Q-Delivery")
const collection = database.collection("events");

export class EventsController {

  // Read
  static async getAll(ctx: Context) {   
    var page = ctx.params.page;
    const events = collection.find().limit(10).skip(page);
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