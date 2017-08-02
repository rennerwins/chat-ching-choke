import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserProfileCard from '../components/UserProfileCard'

class Home extends Component {
  static propTypes = {
    userDetails: PropTypes.object
  }

  render() {
    return (
      <div>
        <UserProfileCard userDetails={this.props.userDetails}  />
      </div>
    )
  }
}

export default Home
