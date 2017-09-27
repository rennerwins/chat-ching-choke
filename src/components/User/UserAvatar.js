import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Avatar = styled.img`
  width: 125px;
  height: 125px;
  border-radius: 50%;
  text-align: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3), 0px 2px 10px rgba(0, 0, 0, 0.5);
  opacity: ${props => (props.firstPrize && props.start ? 0.4 : 1)};
`;

const UserAvatar = ({ avatar, firstPrize, start }) => (
  <Avatar src={avatar} alt="user-avatar" firstPrize={firstPrize} start={start} />
);

UserAvatar.propTypes = {
  avatar: PropTypes.string,
  firstPrize: PropTypes.bool,
  start: PropTypes.bool,
};

export default UserAvatar;
