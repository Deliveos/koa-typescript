import { Double, Int32, ObjectId } from "mongodb";

export interface Event {
  _id: ObjectId,
  ClientId: {
    Id: Int32 
  } | null,
  Type: String,
  FromLocationId: Int32,
  ToLocationId: Int32
  Data: String,
  ExpectingDeliveryDate: String,
  WeightKg: Double,
  ExpectingPriceTenge: Double,
  OrderId: {
    Id: Int32
  } | null
}