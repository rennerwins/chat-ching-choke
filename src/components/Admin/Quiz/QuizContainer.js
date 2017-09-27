import React, { Component } from 'react';
import { connect } from 'react-redux';
import TemplateLeft from '../Template/TemplateLeft';
import TemplateRight from '../Template/TemplateRight';
import QuizList from './QuizList';
import QuizDetails from './QuizDetails';
import QuizCreate from './QuizCreate';
import QuizEdit from './QuizEdit';
import Buttons from '../../Input/Buttons';
import DialogBox from '../../Common/DialogBox';
import * as quizAction from '../../../modules/quiz';

class QuizContainer extends Component {
  state = {
    quizList: [],
    openDialog: false,
  };

  componentDidMount() {
    this.props.fetchQuiz();
  }

  componentWillReceiveProps(nextProps) {
    const { quizList } = nextProps.quiz;
    if (quizList) this.setState({ quizList });
  }

  handleRequestClose = () => {
    this.setState({ openDialog: false });
  };

  handleDeleteAllQuiz = () => {
    this.props.deleteAllQuiz();
    this.handleRequestClose();
  };

  render() {
    const { quizList } = this.state;
    const { quiz } = this.props;
    return (
      <div className="row template-wrapper">
        <TemplateLeft>
          <QuizList quizList={quizList} />
        </TemplateLeft>

        <TemplateRight>
          {quiz.selected.q &&
            !quiz.editing && <QuizDetails details={quiz.selected} edit={() => this.props.editQuiz(true)} />}
          {quiz.creating && <QuizCreate num={quizList.length} cancel={() => this.props.createNewQuiz(false)} />}
          {quiz.editing && <QuizEdit quiz={quiz.selected} cancel={() => this.props.editQuiz(false)} />}
        </TemplateRight>

        <div className="fab-button">
          <Buttons className="float-right" fab color="primary" click={() => this.props.createNewQuiz(true)}>
            <i className="fa fa-plus" aria-hidden="true" />
          </Buttons>

          <Buttons className="float-right mr-3" fab color="accent" click={() => this.setState({ openDialog: true })}>
            <i className="fa fa-trash-o" aria-hidden="true" />
          </Buttons>
        </div>

        <DialogBox
          openDialog={this.state.openDialog}
          title="ต้องการลบคำถามทั้งหมด?"
          confirm={this.handleDeleteAllQuiz}
          close={this.handleRequestClose}
        >
          หากว่ายืนยันในการลบคำถามจะไม่สามารถกู้คืนมาได้
        </DialogBox>
      </div>
    );
  }
}

const mapStateToProps = ({ quiz }) => ({ quiz });

export default connect(mapStateToProps, { ...quizAction })(QuizContainer);
