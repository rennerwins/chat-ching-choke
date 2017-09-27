import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import UserProfileCard from '../components/User/UserProfileCard';
import PlayingStatus from '../components/Home/PlayingStatus';
import WarningMessage from '../components/Home/WarningMessage';
import PlayingOptions from '../components/Home/PlayingOptions';
import * as userAction from '../modules/user';
import * as statusAction from '../modules/status';
import * as quizAction from '../modules/quiz';
import { db } from '../utils/firebase';

class Home extends Component {
  state = {
    deny: false,
    greetingText: '',
  };

  componentDidMount() {
    this.props.checkPlaying();
    this.props.checkCanEnter();
    this.props.fetchQuiz();
    this.getGreetingText();
  }

  getGreetingText = () => {
    db.ref('greetingText').on('value', snapshot => this.setState(() => ({ greetingText: snapshot.val() })));
  };

  acceptParticipation = () => {
    const { user, quiz } = this.props;
    this.props.checkParticipant(user, quiz);
  };

  denyParticipation = () => {
    this.setState({ deny: true });
  };

  render() {
    const { canEnter, playing } = this.props.status;
    const { deny, greetingText } = this.state;
    const { loading, canPlay } = this.props.user;

    return (
      <div className="container">
        <div className="row justify-content-md-center align-items-center">
          <div className="col-12 col-md-6 text-center">
            <Paper elevation={3}>
              <UserProfileCard user={this.props.user} />
            </Paper>
          </div>

          <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 text-center mt-4">
            {loading ? (
              <h4>กำลังโหลดข้อมูล...</h4>
            ) : (
              <PlayingStatus canEnter={canEnter} playing={playing} greetingText={greetingText} />
            )}

            {!loading && !canPlay && <WarningMessage />}

            {!loading &&
              canPlay &&
              !deny && (
                <div className="row">
                  <div className="col-12 text-center">
                    {canEnter && <PlayingOptions accept={this.acceptParticipation} deny={this.denyParticipation} />}
                  </div>
                </div>
              )}

            {!loading && canPlay && deny && <h4>น่าเสียดายจัง ไว้โอกาสหน้านะ</h4>}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  ...userAction,
  ...statusAction,
  ...quizAction,
})(Home);
