const { ApolloServer, gql } = require("apollo-server-lambda"),
  faunadb = require("faunadb"),
  q = faunadb.query;

require("dotenv").config();

const Client = new faunadb.Client({
  secret: "fnAD5uDay1ACBz6efQRmbEcRNMFwIv3meE4clE9j",
});

const typeDefs = gql`
  type Query {
    hello: String!
  }
  type Lolly {
    id: ID!
    to: String!
    message: String!
    from: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    lollyPath: String!
  }
  type Mutation {
    craeteLolly(
      to: String!
      message: String!
      from: String!
      flavourTop: String!
      flavourMiddle: String!
      flavourBottom: String!
    ): Lolly
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "hello world";
    },
  },

  Mutation: {
    craeteLolly: async (_, args) => {
      try {
        const result = await Client.query(
          q.Create(q.Collection("lollies"), {
            data: args,
          })
        );
        console.log(result);
        return result.data;
      } catch (error) {
        return error.toString();
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
});

exports.handler = server.createHandler();
