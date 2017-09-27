import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Coupon = styled.span`
  margin-top: 0px;
  color: #424242;
  font-weight: 500;
`;

const UserCoupon = ({ coupon }) => (
  <Coupon>
    จำนวนคูปอง : <i className="fa fa-ticket" aria-hidden="true" /> {coupon}
  </Coupon>
);

UserCoupon.propTypes = {
  coupon: PropTypes.number,
};

export default UserCoupon;
