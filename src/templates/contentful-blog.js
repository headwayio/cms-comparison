import * as React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import RichText from '../components/rich-text'

function Page({
  data: {
    contentfulBlog: { body, hero, title },
  },
}) {
  return (
    <Layout>
      <GatsbyImage image={getImage(hero)} />
      <div>
        <RichText body={body} />
      </div>
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.shape({
    contentfulBlog: PropTypes.shape({
      title: PropTypes.string,
      hero: PropTypes.object,
      body: RichText.propTypes,
    }),
  }),
}

export default Page

export const pageQuery = graphql`
  query textBlogQuery($slug: String!) {
    contentfulBlog(slug: { eq: $slug }) {
      title
      hero {
        gatsbyImageData
      }
      body {
        ...BlogBodyRichText
      }
    }
  }
`
