import { Router } from "express";
const router = Router();
import { MongoClient } from "mongodb";
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  return result;
}
async function main() {
  const time = Date.now();
  const client = new MongoClient(
    "mongodb+srv://Rwr23-wr_24jn:fxUmQ55db2Uw-Z81XK7R@cluster0.1wvygiu.mongodb.net/?retryWrites=true&w=majority"
  );
  let data;
  try {
    await client.connect();
    const collection = client.db("try").collection("try");
    const result = await collection.insertOne({
      name: generateRandomString(10),
      age: 30,
    });
    data = await collection.findOne({ _id: result.insertedId });
  } finally {
    await client.close();
  }
  return { data, queryDuration: Date.now() - time };
}

router.get("/", async (_req, res) => {
  res.status(200).json(await main());
});

export default router;
