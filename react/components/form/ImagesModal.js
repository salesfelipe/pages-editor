import React, { Fragment } from 'react'
import { Button, Modal, Tabs, Tab } from 'vtex.styleguide'

class ImagesModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: false, currentTab: 1 }
  }

  handleTabChange = tabIndex => {
    this.setState({
      currentTab: tabIndex,
    })
  }

  handleOpenModal = () => {
    this.setState({ isModalOpen: true })
  }

  handleCloseModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    const images = [
      'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-mobile-01.png',
      'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-mobile-02.png',
      'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-mobile-01.png',
      'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-mobile-02.png',
      'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-mobile-01.png',
      'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-mobile-02.png',
    ]

    return (
      <Fragment>
        <Button onClick={this.handleOpenModal}>Imagens</Button>

        <Modal isOpen={this.state.isModalOpen} onClose={this.handleCloseModal}>
          <div style={{ minWidth: '700px' }}>
            <Tabs>
              <Tab
                label="Media upload"
                active={this.state.currentTab === 1}
                onClick={() => this.handleTabChange(1)}
              >
                <p>Content for tab 1</p>
              </Tab>
              <Tab
                label="Gallery"
                active={this.state.currentTab === 2}
                onClick={() => this.handleTabChange(2)}
              >
                <div className="w-100 mt4 center ph3-ns">
                  {images.map(el => {
                    return (
                      <div className="fl w-100 w-25-ns pa2">
                        <img src={el} />
                      </div>
                    )
                  })}
                </div>
              </Tab>
            </Tabs>
          </div>
        </Modal>
      </Fragment>
    )
  }
}

export default ImagesModal
