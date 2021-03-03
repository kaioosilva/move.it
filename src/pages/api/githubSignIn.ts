import { NowRequest, NowResponse } from "@vercel/node";
import connectToDatabase from "../../database/mongoDBConfig";
import axios from "axios";

export default async (request: NowRequest, response: NowResponse) => {
  const { query } = request;

  const { code } = query;

  if (!code) {
    return response.send({
      success: false,
      message: "Error: no code",
    });
  }

  const options = {
    headers: { Accept: "application/json" },
  };

  const result = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: "ed3209fa24a5b426d532",
      client_secret: "34cb762d342bc62da5851eaa6bc837139a4257f6",
      code,
    },
    options
  );

  const { access_token } = result.data;

  const user_data = await axios.get("https://api.github.com/user", {
    headers: { Authorization: "token " + access_token },
  });

  const { data } = user_data;

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection("githubUsers");

  let userAlreadyExists = await collection.findOne({
    login: data.login,
    name: data.name,
  });

  if (!userAlreadyExists) {
    userAlreadyExists = await collection.insertOne({
      login: data.login,
      avatar: data.avatar_url,
      token: access_token,
      code: code,
      name: data.name,
      signinAt: new Date(),
    });
  } else {
    await collection.findOneAndUpdate(
      {
        login: data.login,
        name: data.name,
      },
      { $set: { code: code, token: access_token } },
      { returnOriginal: false }
    );
  }

  response.redirect(`../home?code=${code}`);
};
