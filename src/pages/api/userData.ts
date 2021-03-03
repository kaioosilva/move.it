import { NowRequest, NowResponse } from "@vercel/node";
import connectToDatabase from "../../database/mongoDBConfig";

export default async (request: NowRequest, response: NowResponse) => {
  const { code } = request.body;

  if (!code) {
    return response.send({
      success: false,
      message: "Error: no code",
    });
  }

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection("githubUsers");

  const user = await collection.findOne({
    code,
  });

  if (!user) {
    return response.json({ message: "User does not exist" });
  }

  return response.json(user);
};
