 import mongoose from "mongoose";
import dns from "node:dns";

const connectDB = async () => {
  try {
    const dnsServers = process.env.MONGODB_DNS_SERVERS
      ?.split(",")
      .map((server) => server.trim())
      .filter(Boolean);

    if (dnsServers?.length) {
      dns.setServers(dnsServers);
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;