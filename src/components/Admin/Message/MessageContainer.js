import React, { Component } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';
import _ from 'lodash';
import TemplateLeft from '../Template/TemplateLeft';
import TemplateRight from '../Template/TemplateRight';
import MessageCreate from './MessageCreate';
import MessageEdit from './MessageEdit';
import MessageList from './MessageList';
import MessageDetails from './MessageDetails';
import Buttons from '../../Input/Buttons';
import * as adminMessageAction from '../../../modules/adminMessage';
import * as api from '../../../utils/api';

class MessageContainer extends Component {
  state = {
    messageType: [],
    typeSelected: '',
    allMessage: [],
    testing: true,
  };

  componentDidMount() {
    this.props.fetchMessageType();
    this.props.fetchAllMessage();
  }

  componentWillReceiveProps(nextProps) {
    const { messageType, allMessage } = nextProps.adminMessage;
    const keyTypes = _.keys(messageType);
    const mapKeys = _.keys(allMessage);
    const messageList = _.values(allMessage);
    mapKeys.map(key => (allMessage[key].key = key));
    this.setState({ messageType: keyTypes, allMessage: messageList });
  }

  broadcastMessageToUsers = () => {
    const { text, category, attachment } = this.props.adminMessage.selected;
    const { testing } = this.state;
    const broadcastMessage = {
      message: {},
    };

    if (category === 'text') {
      broadcastMessage.message.text = text;
    } else if (category === 'image') {
      broadcastMessage.message.attachment = attachment;
    }

    if (testing === true) {
      api.broadcastMessageToTestUsers(broadcastMessage);
    } else {
      api.broadcastMessage(broadcastMessage);
    }
  };

  handleSwitchChange = () => {
    this.setState(prevState => ({ testing: !prevState.testing }));
  };

  render() {
    const { adminMessage } = this.props;
    const { messageType, typeSelected, allMessage, testing } = this.state;

    return (
      <div className="row template-wrapper">
        <TemplateLeft>
          <div className="col-12">
            <FormControlLabel
              className="mb-0"
              control={<Checkbox checked={testing} onChange={this.handleSwitchChange} value="Testing" />}
              label="Testing"
            />
          </div>
          {testing && (
            <div className="col-12">
              <small className="text-muted">*** ยิงหาเฉพาะ Tester</small>
            </div>
          )}

          <MessageList messageType={messageType} typeSelected={typeSelected} allMessage={allMessage} />
        </TemplateLeft>

        <TemplateRight>
          {adminMessage.selected.key &&
            !adminMessage.editing && (
              <MessageDetails
                details={adminMessage.selected}
                broadcast={this.broadcastMessageToUsers}
                edit={() => this.props.editMessage(true)}
              />
            )}

          {adminMessage.creating && <MessageCreate />}
          {adminMessage.editing && <MessageEdit />}
        </TemplateRight>

        <div className="fab-button">
          <Buttons className="float-right" fab color="primary" click={() => this.props.createNewMessage(true)}>
            <i className="fa fa-plus" aria-hidden="true" />
          </Buttons>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ adminMessage }) => ({ adminMessage });

export default connect(mapStateToProps, { ...adminMessageAction })(MessageContainer);
