import { Context } from "koa";
import { Db, ObjectId } from "mongodb";
import { client } from "../config/db.config";
import { User } from "../models/user.model";

const database = client.db("Q-Delivery")
const collection = database.collection("events");

export class HomeController {

  // Read
  static async getAll(ctx: Context) {
    const ordersByCompany = collection.aggregate([
      {
        $match: {
          "type": { $regex: "OrderFulfillmentEvent" },
          "date": { $lte: new Date() }
        }
      },
      // { 
      //   $group: {
      //     "_id": { "id": "$DeliveryCompanyId" },
      //     "count": { "$sum": 1 }
      //   } 
      // }
    ]).limit(10);
    const res = await ordersByCompany.toArray();
    
    ctx.body = res;
  }

  static async getOne(ctx: Context) {
    const user = await collection.findOne({ "_id": new ObjectId(ctx.params.id) });
    ctx.body = user;
  }
}