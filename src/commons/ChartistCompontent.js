import React from 'react'
import PropTypes from 'prop-types'
import warning from 'fbjs/lib/warning'
import Chartist from 'chartist'

let seq = 0,
    delays = 80,
    durations = 500;
let seq2 = 0,
    delays2 = 80,
    durations2 = 500;

const animate = {
  // startAnimationForLineChart: function(chart) {
  Line: function(chart) {
      chart.on('draw', function(data) {
          if (data.type === 'line' || data.type === 'area') {
              data.element.animate({
                  d: {
                      begin: 600,
                      dur: 700,
                      from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                      to: data.path.clone().stringify(),
                      easing: Chartist.Svg.Easing.easeOutQuint
                  }
              });
          } else if (data.type === 'point') {
              seq++;
              data.element.animate({
                  opacity: {
                      begin: seq * delays,
                      dur: durations,
                      from: 0,
                      to: 1,
                      easing: 'ease'
                  }
              });
          }
      });

      seq = 0;
  },
  // startAnimationForBarChart: function(chart) {
  Bar: function(chart) {
      chart.on('draw', function(data) {
          if (data.type === 'bar') {
              seq2++;
              data.element.animate({
                  opacity: {
                      begin: seq2 * delays2,
                      dur: durations2,
                      from: 0,
                      to: 1,
                      easing: 'ease'
                  }
              });
          }
      });

      seq2 = 0;
  }
}

export default class ChartistCompontent extends React.Component {

    componentDidMount() {
      let { id, type, data, options } = this.props

      // type Line, Bar, Pie

      let dailySalesChart = new Chartist[type](`#${id}`, data, options)

      animate[type](dailySalesChart)
    }

    render() {
       let { id, type } = this.props

       return (
        <div className="ct-chart" id={id}></div>
      )
    }
}

ChartistCompontent.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  data: PropTypes.object,
  options: PropTypes.object,
}