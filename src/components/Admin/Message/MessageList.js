import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageItem from './MessageItem';
import { selectedMessage } from '../../../modules/adminMessage';

class MessageList extends Component {
  handleSelection = index => {
    const message = this.props.allMessage[index];
    this.props.selectedMessage(message);
  };

  render() {
    const { allMessage, children } = this.props;

    return (
      <div>
        {allMessage.map((item, index) => (
          <div className="col-12" key={item.key}>
            <MessageItem click={() => this.handleSelection(index)} item={item} />
          </div>
        ))}
        {children}
      </div>
    );
  }
}

export default connect(null, { selectedMessage })(MessageList);
