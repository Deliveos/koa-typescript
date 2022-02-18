import { ObjectId } from "mongodb";

export interface EventType {
    id: ObjectId,
    name: String,
    index: Number
}