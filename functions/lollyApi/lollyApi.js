const { ApolloServer, gql } = require("apollo-server-lambda"),
  faunadb = require("faunadb"),
  shortId = require("shortId"),
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
    to: String!
    message: String!
    from: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    slug: String!
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
        const slug = shortId.generate();
        args.slug = slug;

        const result = await Client.query(
          q.Create(q.Collection("lollies"), {
            data: args,
          })
        );

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
