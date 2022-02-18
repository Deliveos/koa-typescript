import { Context } from "koa";
import { ObjectId } from "mongodb";
import { client } from "../config/db.config";
import { User } from "../models/user.model";

const database = client.db("Q-Delivery")
const collection = database.collection("events");

export class HomeController {

  // Read
  static async getAll(ctx: Context) {
    const users = collection.aggregate([ 
      { 
        $group: {
          "_id": { $first: "$DeliveryCompanyId" } 
        } 
      }
    ]);
    const res = await users.toArray();
    console.log(res);
    
    ctx.body = res;
  }

  static async getOne(ctx: Context) {
    const user = await collection.findOne({ "_id": new ObjectId(ctx.params.id) });
    ctx.body = user;
  }
}