const { buildSchema } = require('graphql');
// const { GraphQLSchema } = require('graphql')

const schema1 = buildSchema(`
  type Query {
    shortenURL(url: String!): Url
  }

  type Url {
    id: Int
    shortUrlString: String
    fullUrlString: String
  }

`);

module.exports = schema1;