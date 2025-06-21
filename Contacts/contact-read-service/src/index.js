const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { typeDefs, resolvers } = require('./schema');
const driver = require('./neo4j');

const app = express();

app.use(cors());

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ driver }),
    introspection: true,    // permite introspección (default en dev)
    playground: true        // habilita playground (Apollo Server v2)
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 3026;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();

process.on('SIGINT', async () => {
  await driver.close();
  process.exit(0);
});
