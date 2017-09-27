import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import * as api from '../../utils/api';

class Answer extends Component {
  state = {
    message: '',
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  };

  submitAnswer = () => {
    const { PSID, ans, number } = this.props;

    api.answerFromWeb(PSID, ans).then(res => {
      if (res.message === 'update success') {
        this.setState({
          open: true,
          message: 'ได้รับคำตอบแล้วจ้า',
        });
      } else if (res.error === 1) {
        this.setState({
          open: true,
          message: 'หมดเวลาตอบข้อนี้แล้ว',
        });
      } else if (res.error === 2) {
        this.setState({
          open: true,
          message: 'คุณตอบข้อนี้ไปแล้ว',
        });
      }
    });

    this.props.onSelect(number);
  };

  handleRequestClose = () => {
    this.setState({ open: false, message: '' });
  };

  render() {
    const { ans, selected, cssName } = this.props;
    const { vertical, horizontal, open, message } = this.state;
    return (
      <div>
        <Button disabled={selected} onClick={this.submitAnswer} color="primary" className={cssName}>
          {ans}
        </Button>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onRequestClose={this.handleRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
        />
      </div>
    );
  }
}

export default Answer;
