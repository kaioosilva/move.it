import { MongoClient, Db } from "mongodb";
import url from "url";
//Porem temos o Cold start - que abre e fecha a conexao a toda requisicao.

//Estamos usando o Hot start - Em um intervalo de tempo ira manter a conexao do banco aberta,
// e se estiver aberta, mantem essa conexao.
let cachedDb: Db = null;

export default async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dbName = url.parse(uri).pathname.substr(1);

  const db = client.db(dbName);

  cachedDb = db;

  return db;
}
