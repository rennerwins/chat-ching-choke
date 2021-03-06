import React, { Component } from 'react';
import InputText from '../../Input/InputText';
import Dropdown from '../../Input/Dropdown';
import CheckBox from '../../Input/CheckBox';
import Buttons from '../../Input/Buttons';
import CardWrapper from '../../Common/CardWrapper';
import { db } from '../../../utils/firebase';

class QuizCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      q: '',
      selection: ['CHOICES', 'VOTE', 'STRING'],
      type: '',
      num: this.props.num,
      choices: [],
      a: [],
      checked: [false, false, false, false],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.num) this.setState(() => ({ num: nextProps.num }));
  }

  handleChoices = (e, index) => {
    const { value } = e.target;
    const { type, choices, a } = this.state;

    if (type !== 'STRING') {
      choices[index] = value;
      this.setState({ choices });
    } else {
      a[index] = value;
      this.setState({ a });
    }
  };

  handleAnswers = (e, index) => {
    const { checked } = e.target;
    const checking = this.state.checked;
    const { choices } = this.state;
    const answers = [];

    checking[index] = checked;
    checking.map((c, ind) => c && answers.push(choices[ind]));
    this.setState({ a: answers });
  };

  submitQuiz = () => {
    const { q, type, num, choices, a } = this.state;
    const quiz = {
      q,
      choices,
      a,
      type,
    };

    db.ref(`quiz/${num}`).set(quiz);

    this.cancelSubmitQuiz();
  };

  cancelSubmitQuiz = () => {
    this.setState({
      q: '',
      type: '',
      choices: [],
      a: [],
      checked: [false, false, false, false],
    });
  };

  render() {
    const choices = [];
    const answers = [];
    const stringAnswers = [];
    for (let i = 0; i < 4; i += 1) {
      choices.push(
        <InputText
          key={i}
          label={`คำตอบที่ ${i + 1}`}
          fullWidth
          value={this.state.choices[i] || ''}
          change={e => this.handleChoices(e, i)}
        />
      );
    }

    for (let x = 0; x < 4; x += 1) {
      answers.push(
        <CheckBox
          key={x}
          checked={this.state.checked[x]}
          label={`ข้อที่ ${x + 1}`}
          value={this.state.choices[x]}
          change={e => this.handleAnswers(e, x)}
        />
      );
    }

    for (let y = 0; y < 4; y += 1) {
      stringAnswers.push(
        <InputText
          key={y}
          label={`คำตอบที่ ${y + 1}`}
          fullWidth
          value={this.state.a[y] || ''}
          change={e => this.handleChoices(e, y)}
        />
      );
    }

    const { type } = this.state;

    return (
      <CardWrapper className="msg-template">
        <div className="row mb-3">
          <div className="col-12 text-center">
            <h2>สร้างคำถามใหม่</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-12 mb-3">
            <InputText
              value={this.state.q}
              label="คำถาม"
              change={e => this.setState({ q: e.target.value })}
              fullWidth
            />
          </div>

          <div className="col-12 mb-3">
            <Dropdown
              label="ประเภทคำถาม"
              type={this.state.type}
              selection={this.state.selection}
              change={e => this.setState({ type: e.target.value })}
            />
          </div>

          <div className="col-12 mb-3">
            {type === 'CHOICES' && choices}
            {type === 'VOTE' && choices}
            {type === 'STRING' && stringAnswers}
          </div>
          {type === 'CHOICES' && <div className="col-12">{answers}</div>}
        </div>

        <div className="row">
          <div className="col-12">
            <Buttons className="float-left" text="ยกเลิก" click={this.props.cancel} />
            <Buttons className="float-right" color="primary" text="บันทึก" click={this.submitQuiz} />
          </div>
        </div>
      </CardWrapper>
    );
  }
}

export default QuizCreate;
