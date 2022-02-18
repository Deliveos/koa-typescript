import { Int32, ObjectId } from "mongodb";

interface DeliveryCompany {
  _id: ObjectId | null,
  DeliveryCompanyId: {
    Id: Int32
  };
  Name: String;
  Date: String;
}

export { DeliveryCompany };