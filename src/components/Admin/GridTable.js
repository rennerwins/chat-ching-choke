import React from 'react';
import styled from 'styled-components';

const Table = styled.div`
  width: 30px;
  height: 30px;
  display: inline-block;
  text-align: center;
  font-size: 1em;
  border: 1px solid black;
  box-sizing: border-box;
`;

function GridTable({ num }) {
  return (
    <Table>
      <span style={{ fontSize: '10px' }}>{num}</span>
    </Table>
  );
}

export default GridTable;
