import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuizItem from './QuizItem';
import { selectedQuiz } from '../../../modules/quiz';

class QuizList extends Component {
  handleSelection = index => {
    const quizItem = this.props.quizList[index];
    this.props.selectedQuiz(quizItem, index);
  };

  render() {
    const { quizList, children } = this.props;
    return (
      <div>
        {quizList.map((item, index) => (
          <div className="col-12" key={index}>
            <QuizItem click={() => this.handleSelection(index)} item={item} index={index} />
          </div>
        ))}
        {children}
      </div>
    );
  }
}

export default connect(null, { selectedQuiz })(QuizList);
