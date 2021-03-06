import React from 'react';
import { connect } from 'react-redux';
import Title from '../components/Common/Title';
import FacebookLogin from '../components/User/FacebookLogin';
import * as userAction from '../modules/user';

function Login({ facebookLogin }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Title title="แชท ชิง โชค" />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col text-center">
          <FacebookLogin text="เข้าสู่ระบบด้วย Facebook" facebookLogin={facebookLogin} />
        </div>
      </div>
    </div>
  );
}

export default connect(null, { ...userAction })(Login);
