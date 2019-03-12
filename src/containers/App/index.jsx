import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router'
import { Provider } from 'react-redux'
import PrivateRoute from 'components/PrivateRoute'
import history from 'utils/history'

import AppLoading from 'components/AppLoading'
import Public from '../Public'
import Admin from '../Admin'

import store from 'store'
import * as userActions from 'actions/users'

class App extends Component {
  state = {
    initialized: false,
  }

  componentDidMount = () => {
    this.loadUser()
  }

  loadUser = async () => {
    try {
      await userActions.authUser()
    } catch (e) {
      // handle exception
    } finally {
      this.setState({ initialized: true })
    }
  }

  render = () => {
    return (
      <Provider store={store}>
        {this.state.initialized ? (
          <Router history={history}>
            <Switch>
              <PrivateRoute roles={['admin']} path="/admin" component={Admin} />
              <Route path="/" component={Public} />
            </Switch>
          </Router>
        ) : (
          <AppLoading />
        )}
      </Provider>
    )
  }
}

export default App
