import { Context } from "koa";
import { Db, ObjectId } from "mongodb";
import { client } from "../config/db.config";
import { EventType } from "../models/event_types.model";
import { User } from "../models/user.model";

const database = client.db("Q-Delivery")
const collection = database.collection("events");

export class HomeController {

  // Read
  static async getAll(ctx: Context) {
    var event_typeSuccess = await database.collection<EventType>('event_types').findOne({ "index": 6 });
    var event_typeFail = await database.collection<EventType>('event_types').findOne({ "index": 7 });
    
    const ordersByCompanySuccess = collection.aggregate([
      { 
        $group: {
          "_id": { "id": "$OrderId" },
          "Company": {"$max": "$DeliveryCompanyId.Id"},
          // "CompanyName": { "$max": await database.collection('deliveryCompanies').findOne({ "DeliveryCompanyId": { "Id": "$Company" }})},
          "type": {"$max": "$type"}
        } 
      },
      {
        $match: {
          $or: [
            {"type": event_typeSuccess?.name},
            {"type": event_typeFail?.name}
          ]
        }
      },
      { 
        $group: {
          "_id": { "id": "$Company" },
          "CompanyName": { "$max": await database.collection('deliveryCompanies').findOne({ "DeliveryCompanyId": { "Id": "$Company" }}) },
          "countSuccess": { "$sum": "type" }
        } 
      },
    ]);
    const res = await ordersByCompanySuccess.toArray();
    var company_names = await database.collection('deliveryCompanies').find().toArray();
    
    ctx.body = res;
  }

  static async getOne(ctx: Context) {
    const user = await collection.findOne({ "_id": new ObjectId(ctx.params.id) });
    ctx.body = user;
  }
}