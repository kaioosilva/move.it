import { NowRequest, NowResponse } from "@vercel/node";
import connectToDatabase from "../../database/mongoDBConfig";

export default async (request: NowRequest, response: NowResponse) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection("githubUsers");

  const cursor = collection.find({}).sort({ experienceTotal: -1 }).limit(30);

  const allValues = await cursor.toArray();

  await cursor.close();

  return response.status(201).json(allValues);
};
