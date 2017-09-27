import React, { Component } from 'react';
import styled from 'styled-components';
import MobileStepper from 'material-ui/MobileStepper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { db } from '../../utils/firebase';

const SmallAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0.25em 0;
`;
const UserName = styled.span`font-size: 1em;`;
const UserTableWrapper = styled.div`
  height: 75vh;
  overflow-y: scroll;
`;

class AdminUsers extends Component {
  state = {
    users: [],
    totalUser: null,
    lastKey: null,
    limit: 50,
    pageCount: null,
    keys: [],
    num: 0,
  };

  componentDidMount() {
    this.getUserKeys(this.state.num);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.num !== this.state.num) {
      this.getUserKeys(this.state.num);
    }
  }

  getUserKeys = num => {
    db.ref('userIds').on('value', snapshot => {
      const { limit } = this.state;
      const totalUser = Object.keys(snapshot.val()).length;
      const pageCount = totalUser / limit;
      const keys = [];

      for (let i = 0; i < pageCount; i += 1) {
        const key = Object.keys(snapshot.val())[i * limit];
        keys.push(key);
      }

      this.setState({ totalUser, pageCount, keys });
      if (keys.length > 0) {
        this.getCurrentUsers(this.state.keys[num]);
      }
    });
  };

  getCurrentUsers = userKey => {
    this.setState({ users: [] });
    db
      .ref('users')
      .limitToFirst(this.state.limit)
      .startAt(null, userKey)
      .once('value', snapshot => {
        const userArray = [];
        let endKey = null;
        for (const user in snapshot.val()) {
          userArray.push(snapshot.val()[user]);
          endKey = user;
        }

        this.setState({
          users: userArray,
          lastKey: endKey,
        });
      });
  };

  nextPage = () => {
    this.setState(prevState => ({
      num: prevState.num + 1,
    }));
  };

  prevPage = () => {
    this.setState(prevState => ({
      num: prevState.num - 1,
    }));
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12 text-center">
            <h2>จำนวนสมาชิก {this.state.totalUser}</h2>
          </div>
        </div>

        <UserTableWrapper className="row">
          <div className="col-12 text-center">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell numeric style={{ textAlign: 'center' }}>
                    #
                  </TableCell>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell numeric style={{ textAlign: 'center' }}>
                    Coupon(s)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.users.map((n, index) => (
                  <TableRow key={n.fbid}>
                    <TableCell numeric style={{ textAlign: 'center' }}>
                      {index + 1 + this.state.limit * this.state.num}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      <SmallAvatar src={n.profilePic} alt="user-avatar" />
                    </TableCell>
                    <TableCell>
                      <UserName>
                        {n.firstName} {n.lastName}
                      </UserName>
                    </TableCell>
                    <TableCell numeric style={{ textAlign: 'center' }}>
                      <UserName>{n.coupon}</UserName>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </UserTableWrapper>

        <div className="row">
          <div className="col-12 text-center">
            <MobileStepper
              type="text"
              steps={6}
              position="static"
              activeStep={this.state.num}
              onBack={this.prevPage}
              onNext={this.nextPage}
              disableBack={this.state.num === 0}
              disableNext={this.state.num === this.state.pageCount}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AdminUsers;
