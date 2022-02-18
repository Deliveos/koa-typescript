import { ObjectId, Timestamp } from "mongodb";

export interface User {
  _id: ObjectId | null;
  Name: string;
  Role: string;
  Password: string;
  Date: Timestamp;
}