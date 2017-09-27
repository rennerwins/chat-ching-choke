import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as api from '../../utils/api';
import Crown from '../../image/crown.png';

const Avatar = styled.img`
  opacity: 1;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  margin-bottom: 16px;
  display: inline-block;
`;

const CrownTitle = styled.img`
  width: 120px;
  position: absolute;
  top: -30px;
  left: -38px;
  transform: rotate(-25deg);
`;

const Place = styled.h1`font-size: 50px;`;

const Username = styled.p`
  font-size: 26px;
  display: inline-block;
  margin-left: 16px;
`;

class AdminWinner extends Component {
  state = {
    topUsers: [],
  };

  componentDidMount() {
    api.getTopUsers().then(({ topUsers }) => {
      if (topUsers) this.setState({ topUsers });
    });
  }

  render() {
    return (
      <div className="row mt-4">
        <div className="col-12 col-md-10">
          <br />
          <br />
          {this.state.topUsers.length !== 0 &&
            this.state.topUsers.map(
              (data, index) =>
                index < 3 && (
                  <div className="row mb-4" key={data.lastName}>
                    <div className="col-2">
                      <Place>{index + 1}</Place>
                    </div>

                    <div className="col">
                      {index === 0 && <CrownTitle src={Crown} alt="crown" />}
                      <Avatar src={data.profilePic} alt="avatar-image" />
                      <Username>
                        {data.firstName} {data.lastName}
                      </Username>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, null)(AdminWinner);
