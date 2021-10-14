module.exports = {
  pathPrefix: "/sudoku-app/",
  flags: {
    FAST_DEV: true,
    // FAST_REFRESH: true,
  },
  siteMetadata: {
    title: `Nate Simonsen, Sudoku Puzzle`,
    description: `Free sudoku with customizable colors and configuration. Beautiful minimal ui free of ads.`,
    author: `@natejsimonsen`,
    siteUrl: `https://natejsimonsen.github.io/sudoku-app`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Open Sans",
              variants: ["300", "400", "500", "600", "700", "800"],
            },
          ],
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-material-ui`,
    "gatsby-plugin-postcss",
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sudoku`,
        short_name: `Sudoku`,
        start_url: `/sudoku-app/`,
        background_color: `#282828`,
        theme_color: `#f2f2f2`,
        display: `minimal-ui`,
        icon: `src/images/sudoku.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
};
