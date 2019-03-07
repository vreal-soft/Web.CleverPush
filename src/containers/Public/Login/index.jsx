import React, { Component } from 'react'
import { Select, Icon, Button, Alert, message, notification } from 'antd'
import { connect } from 'react-redux'

import * as usersActions from '../../../actions/users'

import styles from './styles.module.scss'

class Login extends Component {
  state = {
    userId: null,
    loading: true,
  }

  componentDidMount = () => {
    if (this.props.user.id) return this.props.history.replace('/')

    this.loadUsers()
  }

  loadUsers = async () => {
    this.setState({ loading: true })
    let hideMessage = message.loading('Loading users list...')

    try {
      await usersActions.getUsers()
    } catch (e) {
      notification.open({
        message: 'Fetch users list error',
        description: e.message || e,
        icon: <Icon type="warning" style={{ color: 'red' }} />,
      })
    } finally {
      hideMessage()
      this.setState({ loading: false })
    }
  }

  onChangeUser = userId => {
    this.setState({ userId })
  }

  onClickSignIn = () => {
    const user = this.props.users.find(user => user.id === this.state.userId)

    usersActions.setUser(user)
    this.props.history.replace('/')

    message.success(`Perfect! You signed in as ${user.name}`, 3)
    if (user.id === 1) {
      notification.open({
        message: 'Admin section',
        description: 'You have admin permissions. You can go to admin section using link "Admin section" in header',
        icon: <Icon type="info-circle" style={{ color: '#108ee9' }} />,
      })
    }
  }

  render = () => {
    return (
      <div className={styles.login}>
        <div className={styles.form}>
          <Icon type="login" className={styles.icon} />
          <Alert message="Admin section available for Leanne Graham." type="info" className={styles.alert} />
          <Select
            className={styles.search}
            size="large"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.onChangeUser}
            value={this.state.userId || undefined}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {this.props.users.map(user => (
              <Select.Option value={user.id}>{user.name}</Select.Option>
            ))}
          </Select>
          <Button type="primary" size="large" loading={this.state.loading} onClick={this.onClickSignIn} block>
            Sign In
          </Button>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  user: state.user,
  users: state.users,
}))(Login)
