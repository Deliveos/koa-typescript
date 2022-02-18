import { Int32, Double } from "mongodb";

export interface Location {
    LocationID: Int32,
    Name: String,
    Coordinates: Array<Double>,
    CoordinatesSrid: Int32
}