import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { RenderContextConsumer } from 'render'
import { Button, Spinner } from 'vtex.styleguide'

import UploadFile from '../../../queries/UpdateFile.gql'
import { graphql } from 'react-apollo'

import ImageIcon from '../../../images/ImageIcon'

import Dropzone from './Dropzone'

const GRADIENT_STYLES = {
  background:
    '-moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.83) 99%, rgba(0,0,0,0.83) 100%)',
  background:
    '-webkit-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.83) 99%, rgba(0,0,0,0.83) 100%)',
  background:
    'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.83) 99%, rgba(0,0,0,0.83) 100%)',
  filter:
    "progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#d4000000',GradientType=0)",
}

class ImageUploader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
    }
  }

  componentWillUnmount() {
    this.dropzoneRef = null
  }

  handleImageDrop = async (acceptedFiles) => {
    const { uploadFile } = this.props
    if (acceptedFiles && acceptedFiles[0]) {
      this.setState({ isLoading: true })
      try {
        const { data: { uploadFile: { fileUrl } } } = await uploadFile({
          variables: { file: acceptedFiles[0] },
        })

        this.props.onChange(fileUrl)
        this.setState({ imageUrl: fileUrl, isLoading: false })
      } catch (e) {
        console.log('Error: ', e)
        this.setState({ isLoading: false })
      }
    }
  }

  render() {
    const {
      disabled,
      schema: { title },
      value,
    } = this.props
    const { isLoading } = this.state

    const FieldTitle = () => <span className="w-100 db mb3">{title}</span>

    const backgroundImageStyle = {
      backgroundImage: `url(${value})`,
    }

    if (value) {
      return (
        <Fragment>
          <FieldTitle />
          <Dropzone
            disabled={disabled}
            extraClasses="bg-light-gray pointer"
            onDrop={(acceptedFiles, rejectedFiles) =>
              this.handleImageDrop(acceptedFiles, rejectedFiles, {
                account,
                workspace,
              })
            }
            refHandler={node => {
              this.dropzoneRef = node
            }}
          >
            <div
              className="w-100 h4 relative bg-center contain"
              style={backgroundImageStyle}
            >
              <div
                className="w-100 h-100 absolute bottom-0 br2 flex flex-column items-center justify-center"
                style={GRADIENT_STYLES}
              >
                <div
                  onClick={() => {
                    this.dropzoneRef.open()
                  }}
                >
                  <div className="flex justify-center mb3">
                    <ImageIcon stroke="#FFF" />
                  </div>
                  <span className="white">Change image</span>
                </div>
              </div>
            </div>
          </Dropzone>
        </Fragment>
      )
    }

    return (
      <RenderContextConsumer>
        {({ account, workspace }) => (
          <Fragment>
            <FieldTitle />
            <Dropzone
              disabled={disabled}
              extraClasses="ba bw1 b--dashed b--light-gray cursor"
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
                      <div className="mb3">
                        <ImageIcon stroke="#979899" />
                      </div>
                      <div className="mb5 f6 gray">Drag your image here</div>
                      <Button size="small" variation="secondary">
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
  uploadFile: PropTypes.any,
  value: PropTypes.string,
}

export default injectIntl(graphql(UploadFile, { name: 'uploadFile' })(ImageUploader))
