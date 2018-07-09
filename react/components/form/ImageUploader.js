import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import Dropzone from 'react-dropzone'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { RenderContextConsumer } from 'render'
import { Button, Spinner } from 'vtex.styleguide'
import UploadFile from '../../queries/UploadFile.graphql'
import { graphql } from 'react-apollo'
import CloseIcon from '../../images/CloseIcon'

class ImageUploader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      imageUrl: props.value || '',
    }
  }

  handleImageRemove = () => {
    this.props.onChange('')
    this.setState({ imageUrl: '' })
  }

  handleImageDrop = async (acceptedFiles, rejectedFiles) => {
    const { uploadFile } = this.props

    if (!acceptedFiles && !acceptedFiles[0]) {
      return
    }

    try {
      const {data: {uploadFile: {fileUrl}}} = await uploadFile({
        variables: { file: acceptedFiles[0] },
      })

      this.props.onChange(fileUrl)
      this.setState({ imageUrl: fileUrl, isLoading: false })
    } catch (e) {
      console.log('Error: ', e)
      this.setState({ isLoading: false })
    }
  }

  render() {
    const {
      disabled,
      schema: { title },
      value,
    } = this.props
    const { isLoading, imageUrl } = this.state

    const FieldTitle = () => <span className="w-100 db mb3"><FormattedMessage id={title} /></span>

    if (value) {
      return (
        <Fragment>
          <FieldTitle />
          <img src={value} />
          <div onClick={this.handleImageRemove}>
            <CloseIcon fill="#000" />
          </div>
        </Fragment>
      )
    }

    return (
      <RenderContextConsumer>
        {({ account, workspace }) => (
          <Fragment>
            <FieldTitle />
            <Dropzone
              className="w-100 h4 ba bw1 br3 b--dashed b--light-gray cursor"
              multiple={false}
              onDrop={(acceptedFiles, rejectedFiles) =>
                this.handleImageDrop(acceptedFiles, rejectedFiles, {
                  account,
                  workspace,
                })
              }
            >
              <div className="h-100 flex flex-column justify-center items-center">
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Fragment>
                    <div className="mb4">Drag image here</div>
                    <Button
                      onClick={this.handleManualImageUpload}
                      size="small"
                      variation="secondary"
                    >
                      Upload
                    </Button>
                  </Fragment>
                )}
              </div>
            </Dropzone>
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
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.string,
  uploadFile: PropTypes.any,
}

export default graphql(UploadFile, { name: 'uploadFile' })(injectIntl(ImageUploader))
