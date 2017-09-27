import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import * as api from '../../utils/api';
import { getTotalUser, getTotalCoupon, getTotalParticipant, getLatestUsers } from '../../modules/admin';
import AdminStats from '../../components/Admin/AdminStats';
import LinkButton from '../../components/Common/LinkButton';
import LiveURLDialog from '../../components/Admin/LiveURLDialog';

class AdminMain extends Component {
  state = {
    open: false,
    maxUserNum: 5,
  };

  componentDidMount() {
    this.props.getTotalUser();
    this.props.getTotalCoupon();
    this.props.getTotalParticipant();
    this.props.getLatestUsers(this.state.maxUserNum);
  }

  resetAll = () => {
    api.restart();
  };

  openDialog = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="row">
        <div className="col-12 mb-3">
          <Paper elevation={4}>
            <div className="row">
              <AdminStats header={`จำนวนสมาชิก`} number={this.props.totalUsers} />

              <AdminStats header={`จำนวนผู้เล่น`} number={this.props.totalParticipants} />

              <AdminStats header={`จำนวนคูปอง`} number={this.props.totalCoupons} />
            </div>
          </Paper>
        </div>

        <div className="col-12 mb-3">
          <div className="row">
            <div className="col text-center mb-2">
              <LinkButton to="/admin/quiz" raised color="primary" text="เริ่มกิจกรรม" />
            </div>

            <div className="col text-center mb-2">
              <LinkButton to="/admin/participants" raised color="primary" text="ดูผู้เข้าร่วม" />
            </div>

            <div className="col text-center mb-2">
              <LinkButton to="/admin/users" raised color="primary" text="ดูสมาชิกทั้งหมด" />
            </div>

            <div className="col text-center mb-2">
              <Button raised color="primary" onClick={this.openDialog}>
                ใส่ URL LIVE
              </Button>

              <LiveURLDialog open={this.state.open} close={this.handleRequestClose} />
            </div>

            <div className="col text-center mb-2">
              <LinkButton to="/admin/prize" raised color="primary" text="แสดงคูปอง" />
            </div>

            <div className="col text-center mb-2">
              <LinkButton to="/admin/coupon" raised color="primary" text="จับรางวัล" />
            </div>

            <div className="col text-center mb-2">
              <Button onClick={this.resetAll} raised color="accent">
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ admin }) => admin;

export default connect(mapStateToProps, {
  getTotalUser,
  getTotalCoupon,
  getTotalParticipant,
  getLatestUsers,
})(AdminMain);
