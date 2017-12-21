import React from 'react'
import PropTypes from 'prop-types'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import DetailLayoutTransform from '../Commons/DetailLayoutTransform'

import mokedata from './mokeData.js'

import './index.less'

let winWidth = window.innerWidth
let winHeight = window.innerHeight
let currentDom

export default class CoachManage extends React.Component {

  constructor(props) {
    super(props);

    this.handelOpenDetail = this.handelOpenDetail.bind(this)
    this.handelCloseDetail = this.handelCloseDetail.bind(this)

    this.state = {
      coachList: mokedata.data,
      showDetail: false,
      imageInfo: {},
      initPostiton: {
        // coverClient: {},
        // contentClient: {},
      },
      transPosition: {
        afterCoverClient: {
          y: 250,
          x: 250,
          height: 120,
          width: 120,
        },
        afterContentClient: {
          y: 200,
          x: 200,
          height: 400,
          width: winWidth - 400,
        }
      },
    }

  }

  handleOpenDialog() {

  }

  handelOpenDetail(e) {
    let target = e.target
    let image = target.querySelector('.coach-thumb')

    currentDom = target

    currentDom.classList.add('active')

    let imageInfo = {
      imgUrl: image.src
    }

    let initPostiton = {
      coverClient: image.getBoundingClientRect(),
      contentClient: target.getBoundingClientRect()
    }

    this.setState({
      showDetail: true,
      imageInfo,
      initPostiton,
    })
  }

  handelCloseDetail() {
    this.setState({
      showDetail: false
    })

    currentDom.classList.remove('active')
  }

  render() {

    let { coachList, showDetail, imageInfo, initPostiton, transPosition } = this.state

    return(
      <section className="coach-manage">
        <div className="coach-option">
          <div className="option-left"></div>
          <div className="option-right">
            <FloatingActionButton mini={true} backgroundColor={"#7b1fa2"} onClick={this.handleOpenDialog}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
        <div className="coach-list row-flex flex-wrap">
          {
            coachList.map((item, i) => {
              return (
                <div key={item.id} className="coach-item col-md-3" onClick={e => this.handelOpenDetail(e)}>
                  <img className="coach-thumb" src={item.thumb} />
                  <div className="coach-content">
                    <h6>{item.name}</h6>
                    <p>{item.desc}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
        <DetailLayoutTransform
          show={showDetail}
          info={imageInfo}
          initPostiton={initPostiton}
          transPosition={transPosition}
          showData={{}}
          closeDetail={this.handelCloseDetail}
        >
        </DetailLayoutTransform>
      </section>
    )
  }
}