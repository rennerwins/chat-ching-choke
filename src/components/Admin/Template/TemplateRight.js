import React from 'react'
import styled from 'styled-components'

const TemplateRightWrapper = styled.div`
	background-color: #f1f1f1;
	height: 100%;
	overflow-y: scroll;
	padding-bottom: 16px;
`

const TemplateRight = props => {
	return <TemplateRightWrapper className="col">{props.children}</TemplateRightWrapper>
}

export default TemplateRight
