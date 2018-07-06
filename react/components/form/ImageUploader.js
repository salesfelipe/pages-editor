import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import Dropzone from 'react-dropzone'
import { RenderContextConsumer } from 'render'
import { graphql } from 'react-apollo'

import UploadFile from '../../queries/UploadFile.graphql'

class ImageUploader extends Component {
  handleImageDrop = async (acceptedFiles, rejectedFiles) => {
    console.log('==> acceptedFiles', acceptedFiles)
    console.log('--> rejectedFiles', rejectedFiles)

    if (!acceptedFiles && !acceptedFiles[0]) {
      return
    }
    console.log('~~> acceptedFiles[0]', acceptedFiles[0])
    const { uploadFile } = this.props
    uploadFile({
      refetchQueries: [
        { query: UploadFile },
      ],
      variables: { file: acceptedFiles[0] },
    })
      .then((data) => {
        console.log('Image uploaded:', data)
      })
      .catch(err => {
        alert('Error upload an image.')
        console.log(err)
      })
  }

  render() {
    const {
      disabled,
      schema: { title },
    } = this.props

    return (
      <RenderContextConsumer>
        {() => (
          <Fragment>
            <span className="w-100 db mb3">{title}</span>
            <div className="cursor">
              <Dropzone
                disabled={disabled}
                multiple={false}
                onDrop={(acceptedFiles, rejectedFiles) =>
                  this.handleImageDrop(acceptedFiles, rejectedFiles)
                }
              >
                <div className="h-100">
                  <span>LOOK AT ME, I'M WORKING!</span>
                </div>
              </Dropzone>
            </div>
          </Fragment>
        )}
      </RenderContextConsumer>
    )
  }
}

ImageUploader.defaultProps = {
  disabled: false,
  value: '',
}

ImageUploader.propTypes = {
  disabled: PropTypes.bool,
  uploadFile: PropTypes.any,
  schema: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.string,
}

export default graphql(UploadFile, { name: 'uploadFile' })(ImageUploader)
