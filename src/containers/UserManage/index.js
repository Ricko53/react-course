import React from 'react'
import PropTypes from 'prop-types'

import mokedata from './mokeData.js'

import './index.less'

export default class UserManage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      UserList: mokedata.data,
    }

  }

  handleOpenDialog() {

  }

  render() {

    let { UserList } = this.state

    return(
      <section className="user-manage">
        <div className="user-option row-flex">
          <div className="col-md-3">
            <div className="card card-stats">
              <div className="card-header" data-background-color="purple">
                <i className="fa fa-user-plus"></i>
              </div>
              <div className="card-content">
                <p className="category">新增用户</p>
                <h3 className="title">50<small>人</small></h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-stats">
              <div className="card-header" data-background-color="orange">
                <i className="fa fa-address-card"></i>
              </div>
              <div className="card-content">
                <p className="category">VIP用户</p>
                <h3 className="title">150<small>人</small></h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-stats">
              <div className="card-header" data-background-color="green">
                <i className="fa fa-user"></i>
              </div>
              <div className="card-content">
                <p className="category">普通用户</p>
                <h3 className="title">700<small>人</small></h3>
              </div>
            </div>
          </div>
        </div>
        <div className="user-list row-flex flex-wrap">
          {
            UserList.map((item, i) => {
              return (
                <div key={item.id} className="user-item col-md-3">
                  <img className="user-thumb" src={item.thumb} />
                  <div className="user-content">
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