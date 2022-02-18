import { Context } from "koa";
import { ObjectId } from "mongodb";
import { client } from "../config/db.config";
import { EventType } from "../models/event_types.model";

const database = client.db("Q-Delivery")
const collection = database.collection("events");

export class EventsController {

  // Read
  static async getAll(ctx: Context) {   

    var elementsOnPage = 50;

    var page = ctx.request.query.page;
    var typeIndex = ctx.request.query.type;
    var event_type = await database.collection<EventType>('event_types').findOne({ "index": Number.parseInt(typeIndex as string) });  
    
    const events = await collection.aggregate([
      {
        $group: {
          "_id": { "id": "$OrderId.Id" },
          "Company": {"$max": "$DeliveryCompanyId.Id"},
          "CompanyName": { "$max": await database.collection('deliveryCompanies').findOne({ "DeliveryCompanyId": { "Id": "$Company" }})},
          "type": { "$first": event_type?.name },
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
          "type": event_type?.name
        }
      },
      // {
      //   $addFields: {
      //     CompanyName: ""
      //   }
      // },
      // {
      //   $addFields: {
      //     ClientName: ""
      //   }
      // }
    ]).limit(elementsOnPage).skip(Number.parseInt(page as string)-1);
    const res = await events.toArray();

    res.forEach(async (item) => {      
      item.CompanyName = (await database.collection('deliveryCompanies').findOne({ "DeliveryCompanyId": { "Id": "$Company" },}))?.Name;
      item.ClientName = (await database.collection('clients').findOne({ "ClientId": { "Id": "$Client" },}))?.Name;
    })

    const allData = await collection.aggregate([
      {
        $match: {
          "type": event_type?.name
        }
      },
      {
        $group: {
          "_id": null,
          "allElements": { $sum: 1 }
        }
      }
    ]).toArray();

    const res_x = {
      "pages": Math.ceil(allData[0].allElements / elementsOnPage),
      "elements": res,
    };
    
    ctx.body = res_x;
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