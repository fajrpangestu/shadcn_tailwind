import 'dotenv/config'
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./../generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("ERRRRRRRRRRRRRRRRRRRRR");

const adapter = new PrismaMariaDb(connectionString)
const prisma = new PrismaClient({
    adapter: adapter
})

export default prisma