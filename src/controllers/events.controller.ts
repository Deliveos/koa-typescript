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
    
    const events = await collection.aggregate([
      {
        $group: {
          "_id": { "id": "$OrderId.Id" },
          "Company": {"$max": "$DeliveryCompanyId.Id"},
          // "CompanyName": { "$max": await database.collection('deliveryCompanies').findOne({ "DeliveryCompanyId": { "Id": "$Company" }})},
          "type": {"$max": "$type"},
          "WeightKg": { "$max": "$WeightKg" },
          "ExpectingPriceTenge": { "$max": "$ExpectingPriceTenge" },
          "ExpectingDeliveryDate": { "$max": "$ExpectingDeliveryDate" },
          "Date": { "$max": "$Date" },
          "Client": { "$max": "$ClientId.Id" },
          "FromLocationId": { "$max": "$FromLocationId" },
          "ToLocationId": { "$max": "$ToLocationId" },
        },
      },
      {
        $match: {
          "type": "Hackathon2022.OrderFulfillmentEvent, Hackathon2022"
        }
      },
      // {
      //   $lookup: {
      //       from: "locations",
      //       localField: "FromLocationId",
      //       foreignField: "LocationId",
      //       as: "newField"
      //   }
      // },
      // {
      //     $addFields: {
      //       FromLocation: "$newField.Name"
      //     }
      // },
      // {
      //     $unwind: "$FromLocation"
      // },
      // {
      //     $project: {
      //       newField: 0
      //     }
      // },
      // {
      //   $lookup: {
      //       from: "locations",
      //       localField: "ToLocationId",
      //       foreignField: "LocationId",
      //       as: "newField2"
      //   }
      // },
      // {
      //     $addFields: {
      //       FromLocation: "$newField2.Name"
      //     }
      // },
      // {
      //     $unwind: "$ToLocation"
      // },
      // {
      //     $project: {
      //       newField2: 0
      //     }
      // },
    ]).limit(10).skip(Number.parseInt(page as string));
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