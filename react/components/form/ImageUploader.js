import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import Dropzone from 'react-dropzone'
import { RenderContextConsumer } from 'render'
import { Spinner } from 'vtex.styleguide'

class ImageUploader extends Component {
  constructor(props) {
    super(props)

    console.log(props.value)

    this.state = {
      // isLoading: !!props.value,
      imageUrl: props.value || '',
    }
  }

  // componentDidMount() {
  //   if (isLoading) {
  //     // fetch image
  //     // remove loading on callback
  //   }
  // }

  handleImageDrop = async (acceptedFiles, rejectedFiles, context) => {
    if (acceptedFiles && acceptedFiles[0]) {
      try {
        const BASE_URL = 'http://file-manager.vtex.aws-us-east-1.vtex.io'
        const APP = 'pages-editor'
        const BUCKET = 'images'

        const imageName = acceptedFiles[0].name

        const options = { method: 'put' }

        const response = await fetch(
          `${BASE_URL}/${context.account}/${
            context.workspace
          }/assets/${APP}/save/${BUCKET}/${imageName}`,
          options,
        )

        if (response) {
          this.setState({ imageUrl: response })
        } else {
          // Error!
        }
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  }

  render() {
    const {
      disabled,
      schema: { title },
    } = this.props

    // if (this.state.isLoading) {
    //   return <Spinner />
    // }

    return (
      <RenderContextConsumer>
        {({ account, workspace }) => (
          <Fragment>
            <span className="w-100 db mb3">{title}</span>
            <div className="cursor">
              <Dropzone
                disabled={disabled}
                multiple={false}
                onDrop={(acceptedFiles, rejectedFiles) =>
                  this.handleImageDrop(acceptedFiles, rejectedFiles, {
                    account,
                    workspace,
                  })
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
  schema: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.string,
}

export default ImageUploader
