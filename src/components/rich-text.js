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
