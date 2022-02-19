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
    // var ordersByPeriod;
    
    // switch (periodDate) {
    //   case "week":
    //     ordersByPeriod = collection.aggregate([]);
    //     break;

    //   case "month":
    //     ordersByPeriod = collection.aggregate([
    //       {
    //         $group: {
    //           "_id": null,
    //           "21_30_days": {
    //             $sum: {
    //               $cond: [
    //                 { $and: [
    //                   { $gte: [console.log(new Date("$Date")), new Date().setDate(new Date().getDay()-30)] },
    //                   { $lte: [new Date("$Date"), new Date().setDate(new Date().getDay()-21)] }
    //                 ] }, 1, 0
    //               ]
    //             }
    //           },
    //           "14_21_days": {
    //             $sum: {
    //               $cond: [
    //                 { $and: [
    //                   { $gte: [new Date("$Date"), new Date().setDate(new Date().getDay()-21)] },
    //                   { $lte: [new Date("$Date"), new Date().setDate(new Date().getDay()-14)] }
    //                 ] }, 1, 0
    //               ]
    //             }
    //           },
    //           "7_14_days": {
    //             $sum: {
    //               $cond: [
    //                 { $and: [
    //                   { $gte: [new Date("$Date"), new Date().setDate(new Date().getDay()-14)] },
    //                   { $lte: [new Date("$Date"), new Date().setDate(new Date().getDay()-7)] }
    //                 ] }, 1, 0
    //               ]
    //             }
    //           },
    //           "1_7_days": {
    //             $sum: {
    //               $cond: [
    //                 { $gte: [console.log(new Date("$Date")), new Date().setDate(new Date().getDay()-7)] }, 1, 0
    //               ]
    //             }
    //           }
    //         }
    //       }
    //     ]);
    //     break;

    //   case "year":
    //     ordersByPeriod = collection.aggregate([]);
    //     break;
    // }

    const ordersByPeriod = collection.aggregate([
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
                  { $gte: [new Date("$Date"), new Date().setDate(new Date().getDay()-30)] },
                  { $lte: [new Date("$Date"), new Date().setDate(new Date().getDay()-21)] }
                ] }, 1, 0
              ]
            }
          },
          "14_21_days": {
            $sum: {
              $cond: [
                { $and: [
                  { $gte: [new Date("$Date"), new Date().setDate(new Date().getDay()-21)] },
                  { $lte: [new Date("$Date"), new Date().setDate(new Date().getDay()-14)] }
                ] }, 1, 0
              ]
            }
          },
          "7_14_days": {
            $sum: {
              $cond: [
                { $and: [
                  { $gte: [new Date("$Date"), new Date().setDate(new Date().getDay()-14)] },
                  { $lte: [new Date("$Date"), new Date().setDate(new Date().getDay()-7)] }
                ] }, 1, 0
              ]
            }
          },
          "1_7_days": {
            $sum: {
              $cond: [
                { $gte: [new Date("$Date"), new Date().setDate(new Date().getDay()-7)] }, 1, 0
              ]
            }
          }
        }
      }
    ]);

    var res = await ordersByPeriod?.toArray();
    ctx.body = res;
  }
}