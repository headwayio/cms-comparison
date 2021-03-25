import * as React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Headway from '../images/svg/HDWY-Logo-mark.svg'
import LinkButton from '../components/link-button'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({
  data: {
    localBlogs: { nodes: pages },
    contentfulBlogs: { nodes: contentfulPages },
  },
}) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Let's compare some CMS's</p>
    <p>AKA: Content Management Systems</p>
    <Headway />
    <div>
      <br />
      {pages.map(({ fields: { slug } }) => (
        <>
          <LinkButton to={slug} text={'Go to ' + slug} /> <br /> <br />
        </>
      ))}
      {contentfulPages.map(({ slug }) => (
        <>
          <LinkButton to={`/${slug}/`} text={`Go to /${slug}/`} /> <br /> <br />
        </>
      ))}
    </div>
  </Layout>
)

IndexPage.propTypes = {
  data: PropTypes.shape({
    localBlogs: PropTypes.object,
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query HomeQuery {
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
`
