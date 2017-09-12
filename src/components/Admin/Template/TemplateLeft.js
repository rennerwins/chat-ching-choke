import React from 'react'
import styled from 'styled-components'

const TemplateLeftWrapper = styled.div`
	background-color: #fff;
	border-right: 1px solid lightgrey;
	height: 100%;
	overflow-y: scroll;
`

const TemplateLeft = props => {
	return <TemplateLeftWrapper className="col-4 px-0">{props.children}</TemplateLeftWrapper>
}

export default TemplateLeft
