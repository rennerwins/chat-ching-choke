import React, { Component } from 'react';
import styled from 'styled-components';
import { db } from '../../utils/firebase';

const UserAvatar = styled.img`
  position: relative;
  opacity: 1;
  width: 50px;
  height: 50px;
  border-radius: 4px;
  text-align: center;
`;

class AdminParticipants extends Component {
  state = {
    participants: [],
  };

  componentDidMount() {
    db.ref('participants').on('child_added', snapshot => {
      this.setState(prevState => ({
        participants: [...prevState.participants, snapshot.val()],
      }));
    });
  }

  render() {
    const { participants } = this.state;
    return (
      <div className="row">
        <div className="col-3">
          <h4 style={{ paddingTop: '20px' }}>{participants.length}</h4>
        </div>

        <div className="col-9">
          <div className="row">
            {participants.length > 0 &&
              participants.reverse().map(user => (
                <div className="col-2 px-0 my-2 mx-1" key={user.profilePic}>
                  <UserAvatar src={user.profilePic} alt="user-avatar" />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminParticipants;
