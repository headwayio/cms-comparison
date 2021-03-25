import * as React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import LinkButton from './link-button'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

// False positive on ESLint detecting a react component, these
// are just stateless render functions
/* eslint-disable react/display-name */
const getRenderOptions = references => {
  const referenceById = new Map()
  if (references) {
    for (const reference of references) {
      referenceById.set(reference.contentful_id, reference)
    }
  }

  return {
    renderNode: {
      // [BLOCKS.PARAGRAPH]: (_, children) => {
      //   return (
      //     <Typography color="textSecondary" style={{ marginTop: '1rem' }}>
      //       {children}
      //     </Typography>
      //   )
      // },
      // [BLOCKS.HEADING_1]: (_, children) => (
      //   <Typography color="textSecondary" variant="h1">
      //     {children}
      //   </Typography>
      // ),
      // [BLOCKS.HEADING_2]: (_, children) => (
      //   <Typography
      //     color="textSecondary"
      //     variant="h2"
      //     style={{ marginTop: '2rem' }}
      //   >
      //     {children}
      //   </Typography>
      // ),
      // [BLOCKS.HEADING_3]: (_, children) => (
      //   <Typography
      //     color="textSecondary"
      //     variant="h3"
      //     style={{ marginTop: '1rem' }}
      //   >
      //     {children}
      //   </Typography>
      // ),
      // [BLOCKS.HEADING_4]: (_, children) => (
      //   <Typography color="textSecondary" variant="h4">
      //     {children}
      //   </Typography>
      // ),
      // [BLOCKS.HEADING_5]: (_, children) => (
      //   <Typography color="textSecondary" variant="h5">
      //     {children}
      //   </Typography>
      // ),
      // [BLOCKS.HEADING_6]: (_, children) => (
      //   <Typography color="textSecondary" variant="h6">
      //     {children}
      //   </Typography>
      // ),
      [BLOCKS.EMBEDDED_ENTRY]: node => {
        const id = node?.data?.target?.sys?.id
        const props = referenceById.get(id)
        if (!props) {
          console.info(
            `(Warning) RichText: Referenced entry ${id} was not found. Double check and make sure the content is published.`
          )
          return null
        }

        if (props.__typename === 'ContentfulLinkButton') {
          return <LinkButton {...props} />
        }
        return null
      },
    },
    [INLINES.EMBEDDED_ENTRY]: node => {
      const id = node?.data?.target?.sys?.id
      const props = referenceById.get(id)
      if (!props) {
        console.info(
          `(Warning) RichText: Referenced entry ${id} was not found. Double check and make sure the content is published.`
        )
        return null
      }

      if (props.__typename === 'ContentfulLinkButton') {
        return <LinkButton {...props} />
      }
      return null
    },
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const image = getImage(node?.data?.target)
      if (!image) {
        console.info(
          '(Warning) RichText: Unexpected asset type encountered. This component only renders image assets.'
        )
        return null
      }

      return <GatsbyImage style={{ marginTop: '2rem' }} image={image} />
    },
  }
}
/* eslint-enable react/display-name */

const RichText = ({ body }) => {
  const options = React.useMemo(() => {
    return getRenderOptions(body.references)
  }, [body.references])

  return renderRichText(body, options)
}

RichText.propTypes = {
  data: PropTypes.shape({
    body: PropTypes.object,
  }),
}
export default RichText

export const query = graphql`
  fragment BlogBodyRichText on ContentfulBlogBody {
    raw
    references {
      __typename
      ... on ContentfulLinkButton {
        contentful_id
        to
        text
      }
    }
  }
`
