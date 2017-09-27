import React from 'react';
import CardWrapper from '../../Common/CardWrapper';

function MessageItem({ item, click }) {
  const { category, messageType, text, attachment, key } = item;

  return (
    <CardWrapper className="pointer">
      <div onClick={click} role="presentation">
        <small className="text-muted">{messageType}</small>
        {category === 'text' && <p className="mb-0">{text}</p>}
        {category === 'image' && (
          <div>
            <img src={attachment.payload.url} alt={key} width="100px" />
          </div>
        )}
      </div>
    </CardWrapper>
  );
}

export default MessageItem;
