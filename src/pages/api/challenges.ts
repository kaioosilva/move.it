import { NowRequest, NowResponse } from "@vercel/node";
import connectToDatabase from "../../database/mongoDBConfig";

export default async (request: NowRequest, response: NowResponse) => {
  const {
    level,
    currentExperience,
    login,
    name,
    challengesCompleted,
    challengeExperience,
  } = request.body;

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection("githubUsers");

  let userAlreadyExists = await collection.findOne({
    login,
    name,
  });

  if (!userAlreadyExists) {
    return response.send({
      success: false,
      message: "Error: User does not exist.",
    });
  } else {
    await collection.findOneAndUpdate(
      {
        login,
        name,
      },
      {
        $set: {
          level: level,
          currentExperience: currentExperience,
          experienceTotal:
            userAlreadyExists.experienceTotal + challengeExperience,
          challengesCompleted: challengesCompleted,
        },
      },
      { returnOriginal: false }
    );
  }

  return response.status(201).json({ ok: true });
};
