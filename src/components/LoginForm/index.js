import {Component} from 'react'
import Cookies from 'js-cookie'

class LoginForm extends Component {
  state = {
    userId: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUserId = e => {
    this.setState({userId: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async e => {
    e.preventDefault()
    const {userId, password} = this.state
    const userDetails = {userId, password}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    console.log(options)
    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        this.onSubmitFailure(data.error_msg)
      }
    } catch (error) {
      this.onSubmitFailure('An error occurred during the login process.')
    }
  }

  render() {
    const {userId, password, errorMsg, showErrorMsg} = this.state
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
        </div>
        <h1>Welcome Back</h1>
        <form onSubmit={this.onSubmitForm}>
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            placeholder="Enter User ID"
            value={userId}
            onChange={this.onChangeUserId}
          />
          <label htmlFor="password">PIN</label>
          <input
            type="password"
            id="password"
            placeholder="Enter PIN"
            value={password}
            onChange={this.onChangePassword}
          />
          <button type="submit">Login</button>
        </form>
        {showErrorMsg && <p>*{errorMsg}</p>}
      </div>
    )
  }
}

export default LoginForm
