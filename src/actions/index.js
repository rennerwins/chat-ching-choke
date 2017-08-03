export const STORE_USER = 'STORE_USER'
export const REMOVE_USER = 'REMOVE_USER'

export const storeUser  = userDetails => {
	const action = {
		type: STORE_USER,
		userDetails
	}
	return action
}

export const removeUser = userDetails => {
	const action = {
		type: REMOVE_USER,
		userDetails
	}
	return action
}
