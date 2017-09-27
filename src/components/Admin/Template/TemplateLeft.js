import React from 'react';
import styled from 'styled-components';

const TemplateLeftWrapper = styled.div`
  background-color: #fff;
  border-right: 1px solid lightgrey;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 16px;
`;

function TemplateLeft({ children }) {
  return <TemplateLeftWrapper className="col-4 px-0">{children}</TemplateLeftWrapper>;
}

export default TemplateLeft;
