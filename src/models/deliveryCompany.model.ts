import { Int32, ObjectId } from "mongodb";

interface Company {
  _id: ObjectId | null,
  DeliveryCompanyId: {
    Id: Int32
  };
  Name: String;
  Date: String;
}

export { Company };