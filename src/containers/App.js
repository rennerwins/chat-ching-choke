import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Quiz from './Quiz';
import Home from './Home';
import Login from './Login';
import Admin from './admin/Admin';
import Navbar from '../components/Common/Navbar';
import * as userAction from '../modules/user';

const Body = styled.div`
  height: 100vh;
  padding-top: 4rem;
`;

class App extends Component {
  componentDidMount() {
    this.props.getUserDetails();
  }

  render() {
    const { user, logout } = this.props;

    return (
      <div>
        <Navbar logout={logout} isLogin={user.isLogin} />
        <Body className="container-fluid">
          <Switch>
            {localStorage.isLogin !== undefined ? (
              <Route exact path="/" component={Home} />
            ) : (
              <Route exact path="/" component={Login} />
            )}

            <Route path="/quiz" component={Quiz} />

            {localStorage.isAdmin && localStorage.isLogin ? (
              <Route path="/admin" component={Admin} />
            ) : (
              <Redirect to="/" />
            )}
          </Switch>
        </Body>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default withRouter(connect(mapStateToProps, { ...userAction })(App));
