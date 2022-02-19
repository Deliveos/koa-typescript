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

    var periodDate = ctx.request.query.period; 
    var ordersByPeriod;
    console.log(periodDate);
    
    
    switch (periodDate) {
      case "week":
        ordersByPeriod = collection.aggregate([
          {
            $group: {
              "_id": { "id": "$OrderId.Id" },
              "Date": { "$max": "$Date" },
            },
          },
          { 
            $group: {
              "_id": null,
              "mon": {
                $sum: {
                  $cond: [
                    { $eq: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-21).toISOString()] }, 1, 0
                  ]
                }
              },
              "tue": {
                $sum: {
                  $cond: [
                    { $and: [
                      { $gte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-21).toISOString()] },
                      { $lte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-14).toISOString()] }
                    ] }, 1, 0
                  ]
                }
              },
              "wed": {
                $sum: {
                  $cond: [
                    { $and: [
                      { $gte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-14).toISOString()] },
                      { $lte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-7).toISOString()] }
                    ] }, 1, 0
                  ]
                }
              },
              "thu": {
                $sum: {
                  $cond: [
                    { $gte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-7).toISOString()] }, 1, 0
                  ]
                }
              },
              "fri": {
                $sum: {
                  $cond: [
                    { $gte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-7).toISOString()] }, 1, 0
                  ]
                }
              },
              "sat": {
                $sum: {
                  $cond: [
                    { $gte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-7).toISOString()] }, 1, 0
                  ]
                }
              },
              "sun": {
                $sum: {
                  $cond: [
                    { $gte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-7).toISOString()] }, 1, 0
                  ]
                }
              }
            }
          }
        ]);
        break;

      case "month":
        ordersByPeriod = collection.aggregate([
          {
            $group: {
              "_id": { "id": "$OrderId.Id" },
              "Date": { "$max": "$Date" },
            },
          },
          { 
            $group: {
              "_id": null,
              "21_30_days": {
                $sum: {
                  $cond: [
                    { $and: [
                      { $gte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-30).toISOString()] },
                      { $lte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-21).toISOString()] }
                    ] }, 1, 0
                  ]
                }
              },
              "14_21_days": {
                $sum: {
                  $cond: [
                    { $and: [
                      { $gte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-21).toISOString()] },
                      { $lte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-14).toISOString()] }
                    ] }, 1, 0
                  ]
                }
              },
              "7_14_days": {
                $sum: {
                  $cond: [
                    { $and: [
                      { $gte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-14).toISOString()] },
                      { $lte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-7).toISOString()] }
                    ] }, 1, 0
                  ]
                }
              },
              "1_7_days": {
                $sum: {
                  $cond: [
                    { $gte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-7).toISOString()] }, 1, 0
                  ]
                }
              }
            }
          }
        ]);
        break;

      case "year":

        ordersByPeriod = collection.aggregate([
          {
            $group: {
              "_id": { "id": "$OrderId.Id" },
              "Date": { "$max": "$Date" },
            },
          },
          { 
            $group: {
              "_id": null,
              "jan": {
                $sum: {
                  $cond: [
                    { $and: [
                      { $eq: ["$Date", new Date(currentDate.getFullYear(), 1, currentDate.getDate()).toISOString()] },
                    ] }, 1, 0
                  ]
                }
              },
              "feb": {
                $sum: {
                  $cond: [
                    { $and: [
                      { $gte: ["$Date", new Date(currentDate.getFullYear(), 2, 1).toISOString()] },
                      { $lte: ["$Date", new Date(currentDate.getFullYear(), 2, 28).toISOString()] }
                    ] }, 1, 0
                  ]
                }
              },
              "mar": {
                $sum: {
                  $cond: [
                    { $and: [
                      { $gte: ["$Date", new Date(currentDate.getFullYear(), 3, currentDate.getDate()).toISOString()] },
                      { $lte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).toISOString()] }
                    ] }, 1, 0
                  ]
                }
              },
              "apr": {
                $sum: {
                  $cond: [
                    { $gte: ["$Date", new Date(currentDate.getFullYear(), 4, currentDate.getDate()).toISOString()] }, 1, 0
                  ]
                }
              },
              "may": {
                $sum: {
                  $cond: [
                    { $and: [
                      { $gte: ["$Date", new Date(currentDate.getFullYear(), 5, currentDate.getDate()).toISOString()] },
                      { $lte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).toISOString()] }
                    ] }, 1, 0
                  ]
                }
              },
              "jun": {
                $sum: {
                  $cond: [
                    { $gte: ["$Date", new Date(currentDate.getFullYear(), 6, currentDate.getDate()).toISOString()] }, 1, 0
                  ]
                }
              },
              "jul": {
                $sum: {
                  $cond: [
                    { $and: [
                      { $gte: ["$Date", new Date(currentDate.getFullYear(), 7, currentDate.getDate()).toISOString()] },
                      { $lte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).toISOString()] }
                    ] }, 1, 0
                  ]
                }
              },
              "aug": {
                $sum: {
                  $cond: [
                    { $gte: ["$Date", new Date(currentDate.getFullYear(), 8, currentDate.getDate()).toISOString()] }, 1, 0
                  ]
                }
              },
              "sep": {
                $sum: {
                  $cond: [
                    { $and: [
                      { $gte: ["$Date", new Date(currentDate.getFullYear(), 9, currentDate.getDate()).toISOString()] },
                      { $lte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).toISOString()] }
                    ] }, 1, 0
                  ]
                }
              },
              "oct": {
                $sum: {
                  $cond: [
                    { $gte: ["$Date", new Date(currentDate.getFullYear(), 10, currentDate.getDate()).toISOString()] }, 1, 0
                  ]
                }
              },
              "nov": {
                $sum: {
                  $cond: [
                    { $and: [
                      { $gte: ["$Date", new Date(currentDate.getFullYear(), 11, currentDate.getDate()).toISOString()] },
                      { $lte: ["$Date", new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).toISOString()] }
                    ] }, 1, 0
                  ]
                }
              },
              "dec": {
                $sum: {
                  $cond: [
                    { $gte: ["$Date", new Date(currentDate.getFullYear(), 12, currentDate.getDate()).toISOString()] }, 1, 0
                  ]
                }
              }
            }
          }
        ]);
        break;
    }

    var res = await ordersByPeriod?.toArray();
    ctx.body = res;
  }
}