import React from 'react'
import PropTypes from 'prop-types'

import './index.less'

export default class LoginPage extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
      }
  }

  componentWillMount() {
  }

  render() {

    return(
      <article className="login-page">
        <header className="header">
          <div className="container flex-space">
            <h6>Carzy Coach</h6>
            <div></div>
          </div>
        </header>
        <section className="login-contant">
          <div className="header-primary">
            <h2 className="title">LOGIN</h2>
          </div>
          <form className="form">

            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-user"></i>
              </span>
              <input type="text" className="form-control" placeholder="账号..." />
            </div>

            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-lock"></i>
              </span>
              <input type="password" placeholder="密码..." className="form-control" />
            </div>

            <button className="btn btn-primary form-button" type="submit">Get Start</button>

          </form>
        </section>
        <footer className="footer">
          © 2017 made with by JinLang
        </footer>
      </article>
    )
  }
}

LoginPage.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}