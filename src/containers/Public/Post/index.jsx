// components and utils
import React, { Component } from 'react'
import { notification, Icon, message, PageHeader, Row, Col, Skeleton, Rate, Comment, Tooltip, List, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import history from '../../../utils/history'
import moment from 'moment'

// actions
import * as usersActions from '../../../actions/users'
import * as postsActions from '../../../actions/posts'
import * as commentsActions from '../../../actions/comments'

// styles and images
import styles from './styles.module.scss'

class Post extends Component {
  state = {
    user: null,
    comments: [],
    posts: [],
    post: null,
    loading: true,
  }

  componentDidMount = () => {
    this.loadPost()
  }

  componentDidUpdate = prevProps => {
    if (prevProps.match.params.id !== this.props.match.params.id) this.loadPost()
  }

  loadPost = async () => {
    this.setState({ loading: true })
    let hideMessage = message.loading('Loading post...')

    try {
      let res = await Promise.all([
        postsActions.getPost(this.props.match.params.id),
        commentsActions.getCommentsByPost(this.props.match.params.id),
      ])

      let post = res[0]
      let comments = res[1]

      res = await Promise.all([usersActions.getUser(post.userId), postsActions.getPostsByUser(post.userId)])

      let user = res[0]
      let posts = res[1]

      this.setState({ user, comments, posts, post })
    } catch (e) {
      notification.open({
        message: 'Fetch post error',
        description: e.message || e,
        icon: <Icon type="warning" style={{ color: 'red' }} />,
      })
    } finally {
      this.setState({ loading: false }, () => {
        hideMessage()
      })
    }
  }

  render = () => {
    const { user, post, posts, comments, loading } = this.state

    const commentsList = comments.map(comment => ({
      actions: [<span>Reply to</span>],
      author: comment.email,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: <p>{comment.body}</p>,
      datetime: () => {
        let title = moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD HH:mm:ss')
        let fromNow = moment()
          .subtract(1, 'days')
          .fromNow()

        return (
          <Tooltip title={title}>
            <span>{fromNow}</span>
          </Tooltip>
        )
      },
    }))

    return loading ? (
      <div>
        <Skeleton />
      </div>
    ) : (
      <div>
        <PageHeader
          onBack={() => history.push('/')}
          title={post.title}
          subTitle={`By ${user.name} from ${user.company.name}`}
        />
        <Row className={styles.content}>
          <Col span={10}>
            <p>{post.body}</p>
            <Rate value={4} />

            <List
              header={`${commentsList.length} comments`}
              itemLayout="horizontal"
              dataSource={commentsList}
              renderItem={item => (
                <Comment
                  actions={item.actions}
                  author={item.author}
                  avatar={item.avatar}
                  content={item.content}
                  datetime={item.datetime}
                />
              )}
            />
          </Col>
          <Col span={14} className={styles.posts}>
            <List
              itemLayout="horizontal"
              dataSource={posts}
              renderItem={post => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://picsum.photos/300/200/?random" />}
                    title={<Link to={`/post/${post.id}`}>{post.title}</Link>}
                    description={post.body}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Post
