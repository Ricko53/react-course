import React from 'react'
import PropTypes from 'prop-types'
import Chartist from 'chartist'

import ChartistCompontent from '../commons/ChartistCompontent.js'

import './index.less'

let dataDailySalesChart = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
          [12, 17, 7, 17, 23, 18, 38]
      ]
    }

let optionsDailySalesChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
    }

let  dataCompletedTasksChart = {
        labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
        series: [
            [230, 750, 450, 300, 280, 240, 200, 190]
        ]
      }

let  optionsCompletedTasksChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 20,
        }
      }

let dataEmailsSubscriptionChart = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

    ]
};
let optionsEmailsSubscriptionChart = {
    axisX: {
        showGrid: false
    },
    low: 0,
    high: 1000,
    chartPadding: {
        top: 0,
        right: 5,
        bottom: 0,
        left: 0
    }
};

export default class MessageManage extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
      }
  }

  componentWillMount() {
  }

  render() {

    return(
      <section className="message-manage">
        <div className="row-flex">
          <div className="col-md-3">
            <div className="card card-stats">
              <div className="card-header" data-background-color="purple">
                <i className="fa fa-user"></i>
              </div>
              <div className="card-content">
                <p className="category">新增用户</p>
                <h3 className="title">50<small>人</small></h3>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="icon-price-tag"></i> <a href="#pablo">Get More Space...</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-stats">
              <div className="card-header" data-background-color="red">
                <i className="fa fa-calendar"></i>
              </div>
              <div className="card-content">
                <p className="category">参与课程人数</p>
                <h3 className="title">120<small>人</small></h3>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="icon-price-tag"></i> <a href="#pablo">Get More Space...</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="row-flex">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header card-chart" data-background-color="purple">
                
                <ChartistCompontent 
                  id={"dailySalesChart"}
                  type={"Line"}
                  data={dataDailySalesChart}
                  options={optionsDailySalesChart}>
                </ChartistCompontent>

              </div>
              <div className="card-content">
                <h4 className="title">Daily Sales</h4>
                <p className="category"><span className="text-success"><i className="fa fa-long-arrow-up"></i> 55%  </span> increase in today sales.</p>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="material-icons">access_time</i> updated 4 minutes ago
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header card-chart" data-background-color="red">
                
                <ChartistCompontent 
                  id={"completedTasksChart"}
                  type={"Line"}
                  data={dataCompletedTasksChart}
                  options={optionsCompletedTasksChart}>
                </ChartistCompontent>

              </div>
              <div className="card-content">
                <h4 className="title">Daily Sales</h4>
                <p className="category"><span className="text-success"><i className="fa fa-long-arrow-up"></i> 55%  </span> increase in today sales.</p>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="material-icons">access_time</i> updated 4 minutes ago
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="row-flex">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header card-chart" data-background-color="orange">
                
                <ChartistCompontent 
                  id={"completedTasksChart2"}
                  type={"Line"}
                  data={dataCompletedTasksChart}
                  options={optionsEmailsSubscriptionChart}>
                </ChartistCompontent>

              </div>
              <div className="card-content">
                <h4 className="title">Daily Sales</h4>
                <p className="category"><span className="text-success"><i className="fa fa-long-arrow-up"></i> 55%  </span> increase in today sales.</p>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="material-icons">access_time</i> updated 4 minutes ago
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header card-chart" data-background-color="green">
                
                <ChartistCompontent 
                  id={"emailsSubscriptionChart"}
                  type={"Bar"}
                  data={dataEmailsSubscriptionChart}
                  options={optionsCompletedTasksChart}>
                </ChartistCompontent>

              </div>
              <div className="card-content">
                <h4 className="title">Daily Sales</h4>
                <p className="category"><span className="text-success"><i className="fa fa-long-arrow-up"></i> 55%  </span> increase in today sales.</p>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="material-icons">access_time</i> updated 4 minutes ago
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    )
  }
}