import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import styled from 'styled-components';
import _ from 'lodash';
import SmallAvatar from '../../components/Admin/SmallAvatar';
import GridTable from '../../components/Admin/GridTable';
import { totalCoupon } from '../../modules/admin';
import { db } from '../../utils/firebase';

const ImageWrapper = styled.div`
  position: absolute;
  top: 1px;
  z-index: 2;
  max-width: 100%;
  margin: 0 auto;
`;

const GridWrapper = styled.div`
  position: absolute;
  max-width: 100%;
  margin: 0 auto;
`;

class AdminPrize extends Component {
  state = {
    users: [],
    num: 0,
    limit: 150,
    running: false,
    totalCoupon: null,
    keys: [],
    fetchCount: null,
    index: 0,
    clicked: false,
    allUsers: [],
    ticking: 1,
    increment: 2,
    delay: 100,
  };

  componentDidMount() {
    this.getCouponLength();
  }

  componentDidUpdate(prevProps, prevState) {
    const { index, keys, num, delay } = this.state;
    if (index !== prevState.index) this.runUsers();
    if (keys[index + 1] < num) setTimeout(() => this.nextBatch(), delay);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getCouponLength = () => {
    db.ref('couponPair').once('value', snapshot => {
      const { limit } = this.state;
      let totalCoupons = null;
      let fetchCount = null;
      const keys = [];
      const allUsers = [];
      if (snapshot.val()) {
        totalCoupons = Object.keys(snapshot.val()).length;
        fetchCount = totalCoupons / limit;
        snapshot.val().map(user => allUsers.push(user.fbid));
      }

      for (let i = 0; i < fetchCount; i += 1) {
        const key = Object.keys(snapshot.val())[i * limit];
        keys.push(key);
      }

      this.props.totalCoupon(totalCoupons);

      this.setState({
        totalCoupon: totalCoupons,
        fetchCount,
        keys,
        allUsers,
      });
    });
  };

  getUsers = userKey => {
    db
      .ref('couponPair')
      .limitToFirst(this.state.limit)
      .startAt(null, userKey)
      .once('value', snapshot => {
        const val = [];
        const arr = Array.isArray(snapshot.val());
        const snap = snapshot.val();

        if (arr) {
          snap.map(v => val.push(v));
        } else {
          _.values(snap).map(v => val.push(v));
        }

        this.setState(prevState => ({
          users: [...prevState.users, ...val],
        }));

        this.interval = setInterval(() => this.tick(), this.state.ticking);
      });
  };

  nextBatch = () => {
    this.setState(prevState => ({ index: prevState.index + 1 }));
  };

  runUsers = () => {
    const { keys } = this.state;
    if (keys.length > 0) this.getUsers(this.state.keys[this.state.index]);
    this.setState({ clicked: true });
  };

  tick = () => {
    const { users, num, increment } = this.state;

    if (users.length > 0) {
      if (num <= users.length) {
        this.setState(prevState => ({ num: prevState.num + increment }));
      } else {
        clearInterval(this.interval);
      }
    }
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12 text-center">
            <h1>จำนวนคูปองทั้งหมด {this.state.totalCoupon}</h1>
            <Button hidden={this.state.clicked} raised color="primary" onClick={this.runUsers}>
              เริ่มส่งคูปอง
            </Button>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <ImageWrapper>
              {this.state.users.length > 0 &&
                this.state.users.map(
                  (player, index) => index <= this.state.num && <SmallAvatar src={player.profilePic} key={index} />
                )}
            </ImageWrapper>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <GridWrapper>
              {this.state.allUsers.map((player, index) => <GridTable key={index} num={index + 1} />)}
            </GridWrapper>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { totalCoupon })(AdminPrize);
