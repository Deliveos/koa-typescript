const config = {
  PORT: process.env.PORT? Number.parseInt(process.env.PORT) : 5000,
  HOST: process.env.HOST || 'localhost' as string,
  DB: "mongodb+srv://root:" + process.env.PASS || "root" + "@Q-Delivery.sxyhr.mongodb.net/text?retryWrites=true&w=majority" as string};

export { config };