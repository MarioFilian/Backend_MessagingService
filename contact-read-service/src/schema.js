const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Contact {
    id: ID!
    name: String!
    phone: String!
  }

  type Query {
    contacts: [Contact!]!
  }
`;

const resolvers = {
  Query: {
    contacts: async (_, __, { driver }) => {
      const session = driver.session();
      try {
        const result = await session.run(
          'MATCH (c:Contact) RETURN id(c) AS id, c.name AS name, c.phone AS phone'
        );

        return result.records.map(record => ({
          id: record.get('id').toString(),
          name: record.get('name'),
          phone: record.get('phone')
        }));
      } finally {
        await session.close();
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
