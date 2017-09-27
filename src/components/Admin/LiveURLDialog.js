import React, { Component } from 'react';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { db } from '../../utils/firebase';

class LiveURLDialog extends Component {
  state = {
    link: '',
  };

  handleInput = e => {
    this.setState({ link: e.target.value });
  };

  handleSubmit = () => {
    db.ref('liveURL').set(this.state.link);
    this.props.close();
  };

  render() {
    const { open, close } = this.props;
    const { link } = this.state;
    return (
      <Dialog open={open} onRequestClose={close} ignoreBackdropClick ignoreEscapeKeyUp>
        <DialogTitle>{'ใส่ Link Youtube URL'}</DialogTitle>
        <DialogContent>
          <TextField
            id="name"
            className="mt-0 mb-2"
            style={{ width: '100%' }}
            placeholder="ใส่ Link Youtube"
            margin="normal"
            value={link}
            onChange={this.handleInput}
          />

          <small>ตัวอย่าง : `yRHTbynL__4`</small>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            ยกเลิก
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default LiveURLDialog;
