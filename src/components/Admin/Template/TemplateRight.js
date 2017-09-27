import React from 'react';
import styled from 'styled-components';

const TemplateRightWrapper = styled.div`
  background-color: #f1f1f1;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 16px;
`;

function TemplateRight({ children }) {
  return <TemplateRightWrapper className="col">{children}</TemplateRightWrapper>;
}

export default TemplateRight;
