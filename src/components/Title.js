import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import PropTypes from 'prop-types'

const TitleWrapper = styled.div`text-align: center;`
const TitleHeader = styled.h1`font-weight: 700;`

const Title = ({ title }) => {
	return (
		<TitleWrapper>
			<Logo />
			<TitleHeader>{title}</TitleHeader>
		</TitleWrapper>
	)
}

Title.propTypes = {
	title: PropTypes.string.isRequired
}

export default Title
