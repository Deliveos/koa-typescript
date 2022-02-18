import { Context } from "koa";
import { Db, ObjectId } from "mongodb";
import { client } from "../config/db.config";
import { EventType } from "../models/event_types.model";
import { User } from "../models/user.model";

const database = client.db("Q-Delivery")
const collection = database.collection("events");

export class PeriodsController {

  // Read
  static async getAll(ctx: Context) {
    var event_typeSuccess = await database.collection<EventType>('event_types').findOne({ "index": 6 });
    var currentDate = new Date();
    
    const ordersByCompanySuccess = collection.aggregate([
      { 
        $group: {
          "_id": { "id": "$OrderId.Id" },
          "Company": {"$max": "$DeliveryCompanyId.Id"},
          "type": { "$first": event_typeSuccess?.name },
          "Date": { "$max": "$Date" },
        },
      },
      {
        $project: {
          _id: true,
          Company: true,
          Date: true,
          isBetween: {
            $and: [{
              $lt: [
                new Date("$Date"),
                currentDate
              ]
            },
            {
              $gt: [
                new Date("$Date"),
                currentDate.setMonth(currentDate.getMonth() - 1)
              ]
            }]
          }
        }
      }
    ]);

    var res = await ordersByCompanySuccess.toArray();

    for (let i = 0; i < res.length; i++) {
      const CompanyName = await database.collection('deliveryCompanies').findOne({ "DeliveryCompanyId": res[i]._id.id });
      res[i]['FromLocationName'] = CompanyName?.Name;
    }
        
    ctx.body = res;
  }
}