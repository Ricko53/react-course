import React from 'react'
import PropTypes from 'prop-types'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import mokedata from './mokeData.js'

import './index.less'

export default class CoachManage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      coachList: mokedata.data,
    }

  }

  handleOpenDialog() {

  }

  render() {

    let { coachList } = this.state

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
                <div key={item.id} className="coach-item col-md-3">
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
      </section>
    )
  }
}