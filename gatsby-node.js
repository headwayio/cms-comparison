const path = require('path')
const slash = require('slash')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const localBlog = path.resolve('./src/templates/local-blog.js')
  const contentfulBlog = path.resolve('./src/templates/contentful-blog.js')

  return graphql(`
    {
      localBlogs: allMarkdownRemark {
        nodes {
          fields {
            slug
          }
        }
      }
      contentfulBlogs: allContentfulBlog {
        nodes {
          slug
        }
      }
    }
  `).then(async result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const { contentfulBlogs, localBlogs } = result.data

    localBlogs?.nodes.forEach(post => {
      createPage({
        path: post.fields.slug,
        component: localBlog,
        context: {
          slug: post.fields.slug,
        },
      })
    })
    contentfulBlogs?.nodes.forEach(post => {
      createPage({
        path: post.slug,
        component: contentfulBlog,
        context: {
          slug: post.slug,
        },
      })
    })
  })
}

// create a field called slug for each markdown file
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
   type ContentfulLinkButton implements Node {
      to: String
      text: String
    }
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }
    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }
    type Fields {
      slug: String
    }
  `)
}
