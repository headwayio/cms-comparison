import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const LocalBlog = ({ data: { markdownRemark: blog } }) => {
  return (
    <Layout>
      <GatsbyImage
        image={getImage(blog.frontmatter.hero)}
        style={{ maxHeight: 500 }}
      />
      <div dangerouslySetInnerHTML={{ __html: blog?.html }} />
    </Layout>
  )
}

export default LocalBlog

LocalBlog.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}
export const blogQuery = graphql`
  query blogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        hero {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`
