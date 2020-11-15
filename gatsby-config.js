require("dotenv").config();

module.exports = {
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-styled-components",

    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "lollies",
        // This is the field under which it's accessible
        fieldName: "Lollies",
        // URL to query from
        url:
          "https://syn3vddvf5durmyoighbskxsgu.appsync-api.us-east-2.amazonaws.com/graphql",
        headers: {
          "x-api-key": "da2-erswtpxirzg2hkfvkxtbri6roi",
        },
      },
    },
  ],
};
