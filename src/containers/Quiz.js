import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuizList from '../components/Quiz/QuizList';
import { db } from '../utils/firebase';
import * as quizAction from '../modules/quiz';
import * as statusAction from '../modules/status';
import * as userAction from '../modules/user';
import Youtube from '../components/Quiz/Youtube';

class Quiz extends Component {
  state = {
    currentQuiz: -1,
    selected: false,
    cssName: 'answer-button',
    num: null,
    liveURL: '',
  };

  componentDidMount() {
    this.props.checkCanEnter();
    this.props.checkPlaying();
    this.props.fetchQuiz();
    this.checkCurrentQuiz();
    this.setLiveURL();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.user.PSID && nextProps.status.playing) {
      this.props.checkParticipant(nextProps.user, nextProps.quiz);
    }
    if (this.state.currentQuiz !== nextState.currentQuiz) {
      this.clearSelectAnswer();
    }
  }

  onSelected = number => {
    this.setState({
      selected: true,
      cssName: 'answer-button-selected',
      num: number,
    });
  };

  onAnswer = () => {
    this.setState({ num: 0 });
  };

  setLiveURL = () => {
    db.ref('liveURL').on('value', snapshot => {
      this.setState({ liveURL: snapshot.val() });
    });
  };

  clearSelectAnswer = () => {
    this.setState({ selected: false, num: null });
  };

  checkCurrentQuiz = () => {
    db.ref('currentQuiz').on('value', snapshot => {
      this.setState({ currentQuiz: snapshot.val() });
    });
  };

  render() {
    const { liveURL, currentQuiz, selected, num } = this.state;
    const { quiz, user } = this.props;
    return (
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 text-center">
            <Youtube liveURL={liveURL} />
          </div>

          <div className="col-12 col-md-6">
            {currentQuiz === quiz.quizList.length && (
              <h1 className="text-center" style={{ whiteSpace: 'normal' }}>
                ขอบคุณที่ร่วมสนุกกับ <span style={{ color: '#C83430' }}>แชทชิงโชค</span> เจอกันใหม่ทุกวันจันทร์ 2 ทุ่ม
              </h1>
            )}

            <QuizList
              currentQuiz={currentQuiz}
              onSelect={this.onSelected}
              onAnswer={this.onAnswer}
              PSID={user.PSID}
              selected={selected}
              answered={num}
              quiz={quiz.quizList}
            />

            <div className="row">
              {num === null &&
                currentQuiz !== -1 &&
                currentQuiz < quiz.quizList.length - 1 && (
                  <div className="col-12 text-center">
                    <small style={{ color: '#9e9e9e', textAlign: 'center' }}>
                      *คิดให้ดีก่อนตอบ ตอบแล้วเปลี่ยนใจไม่ได้นะจ๊ะ
                    </small>
                  </div>
                )}

              {num !== null &&
                currentQuiz !== -1 && (
                  <div className="col-12 text-center">
                    <h5 style={{ color: '#E53935' }}>กรุณารอคำถามข้อถัดไป</h5>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  ...quizAction,
  ...statusAction,
  ...userAction,
})(Quiz);
