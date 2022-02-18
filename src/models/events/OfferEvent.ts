import { Double, Int32, ObjectId } from "mongodb";

class OfferEvent {
  constructor (offerId: { Id: Int32 }, deliveryCompanyId: { Id: Int32 }, offeredPriceTenge: Double, date: String, orderId: { Id: Int32 }) {
    this.OfferId = offerId;
    this.DeliveryCompanyId = deliveryCompanyId;
    this.OfferedPriceTenge = offeredPriceTenge;
    this.Date = date;
    this.OrderId = orderId;
    this._id = null;
  }

  _id: ObjectId | null;
  OfferId: {
    Id: Int32
  };
  DeliveryCompanyId: {
    Id: Int32
  };
  OfferedPriceTenge: Double;
  Date: String;
  OrderId: {
    Id: Int32
  };
}

export { OfferEvent };