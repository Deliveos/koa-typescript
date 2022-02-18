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
          "type": {"$max": "$type"},
        } 
      },
      // {
      //   $addFields: {
      //     countFailed: {
      //       $cond: [
      //         {
      //           $eq: ["$type", event_typeFail],
      //         },
      //         false,
      //         true
      //       ]
      //     }
      //   }
      // },
      // {
      //   $addFields: {
      //     countSuccess: {
      //       $cond: [
      //         {
      //           $eq: ["$type", event_typeSuccess]
      //         },
      //         false,
      //         true
      //       ]
      //     }
      //   }
      // },
      {
        $match: {
          "type": event_typeSuccess?.name,
        }
      },
      { 
        $group: {
          "_id": { "id": "$Company" },
          "CompanyName": { "$max": await database.collection('deliveryCompanies').findOne({ "DeliveryCompanyId": { "Id": "$Company" }}) },
          "countSuccess": { "$sum": 1 },
          // "countFailed": { "$sum": "$countFailed" },
        } 
      },
    ]);

    const res = await ordersByCompanySuccess.toArray();
    res.forEach(async (item) => {
      item.CompanyName = (await database.collection('deliveryCompanies').findOne({ "DeliveryCompanyId": { "Id": item._id.id },}))?.Name;
    })
    
    var company_names = await database.collection('deliveryCompanies').find().toArray();
    
    ctx.body = res;
  }

  static async getOne(ctx: Context) {
    const user = await collection.findOne({ "_id": new ObjectId(ctx.params.id) });
    ctx.body = user;
  }
}