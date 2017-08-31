import React from 'react'
import styled from 'styled-components'

const Table = styled.div`
	width: 30px;
	height: 30px;
	display: inline-block;
	text-align: center;
	font-size: 1em;
  border: 1px solid black;
  box-sizing: border-box;
`

const Span = styled.span`font-size: 10px;`

const GridTable = props => {
	return (
		<Table>
			<Span>{props.num}</Span>
		</Table>
	)
}

export default GridTable
