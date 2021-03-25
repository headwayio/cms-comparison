const dotenv = require('dotenv')
const path = require('path')

if (process.env.ENVIRONMENT !== 'production') {
  dotenv.config()
}

const {
  CONTENTFUL_HOST,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN,
} = process.env

module.exports = {
  siteMetadata: {
    title: `CMS Comparison Demo`,
    description: `Everything you need to compare different Headless CMS's!`,
    author: `@panzacoder`,
  },
  plugins: [
    `babel-plugin-remove-graphql-queries`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-extract-schema`,
    `gatsby-plugin-image`,
    `gatsby-transformer-inline-svg`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_ACCESS_TOKEN,
        host: CONTENTFUL_HOST || 'cdn.contentful.com',
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images\/svg/,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sharp`,
    // {
    // resolve: `gatsby-plugin-manifest`,
    // options: {
    // name: `gatsby-starter-default`,
    // short_name: `starter`,
    // start_url: `/`,
    // background_color: `#663399`,
    // theme_color: `#663399`,
    // display: `minimal-ui`,
    // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    // },
    // },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
