const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Contact {
    element_id: ID!
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
          'MATCH (c:Contact) RETURN elementId(c) AS element_id, c.name AS name, c.phone AS phone'
        );

        return result.records.map(record => ({
          element_id: record.get('element_id'),
          name: record.get('name'),
          phone: record.get('phone'),
        }));
      } finally {
        await session.close();
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
