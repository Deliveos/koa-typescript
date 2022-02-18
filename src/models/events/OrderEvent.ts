import { Double, Int32, ObjectId } from "mongodb";

class OrderEvent {
  constructor (
    clientId: { Id: Int32 }, 
    fromLocationId: Int32, 
    toLocationId: Int32, 
    weightKg: Double, 
    expectingPriceTenge: Double, 
    expectingDeliveryDate: String,
    date: String,
    orderId: {
      Id: Int32
    },
    _id: ObjectId | null = null
  ) {
    this._id = _id;
    this.ClientId = clientId,
    this.FromLocationId = fromLocationId;
    this.ToLocationId = toLocationId;
    this.WeightKg = weightKg;
    this.ExpectingPriceTenge = expectingPriceTenge;
    this.ExpectingDeliveryDate = expectingDeliveryDate;
    this.Date = date;
    this.OrderId = orderId;
  }

  _id: ObjectId | null;
  ClientId: {
    Id: Int32
  };
  FromLocationId: Int32;
  ToLocationId: Int32;
  WeightKg: Double;
  ExpectingPriceTenge: Double;
  ExpectingDeliveryDate: String;
  Date: String;
  OrderId: {
    Id: Int32
  };
}

export {OrderEvent};