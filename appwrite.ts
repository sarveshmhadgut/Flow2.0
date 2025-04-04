import { Client, Account, Databases, Storage, ID } from "appwrite";
import exp from "constants";
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { account, client, database, storage, ID };
