import { Context } from "koa";
import { ObjectId } from "mongodb";
import { client } from "../config/db.config";
import { User } from "../models/user.model";

const database = client.db("q-delivery")
const collection = database.collection<User>("users");

export class HomeController {

  // Read
  static async getAll(ctx: Context) {
    const users = collection.find();
    const res = await users.toArray();
    console.log(res);
    
    ctx.body = res;
  }

  static async getOne(ctx: Context) {
    const user = await collection.findOne({ "_id": new ObjectId(ctx.params.id) });
    ctx.body = user;
  }
}