const config = {
  PORT: process.env.PORT? Number.parseInt(process.env.PORT) : 5000,
  HOST: process.env.HOST || 'localhost' as string,
  DB: "mongodb+srv://root:root@test.sxyhr.mongodb.net/node_test?retryWrites=true&w=majority" as string
  // DB: "mongodb://localhost:27017/node_test" as string
};

export { config };