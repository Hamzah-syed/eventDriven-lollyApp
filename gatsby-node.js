const path = require("path");

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query MyQuery {
      Lollies {
        allLollies {
          id
        }
      }
    }
  `);

  data.Lollies.allLollies.forEach(({ id }) => {
    actions.createPage({
      path: `lolly/${id}`,
      component: path.resolve(`./src/template/lollyPage.tsx`),
      context: {
        id: id,
      },
    });
  });
};

// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions;

//   // page.matchPath is a special key that’s used for matching pages

//   // only on the client.

//   if (page.path.match(/^\/lollies/)) {
//     page.matchPath = "/lollies/*";

//     // Update the page.

//     createPage(page);
//   }
// };
