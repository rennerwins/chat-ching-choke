import axios from 'axios'
axios.defaults.baseURL = 'https://us-central1-codelab-a8367.cloudfunctions.net/'

// Get quiz detail
export const getQuizStatus = async () => {
	const { data } = await axios.get(`getQuizStatus`)
	return data
}

// Get participants' details
export const getParticipants = async () => {
	const { data } = await axios.get(`getParticipants`)
	return data
}

// Start sending activity request
export const sendRequest = async () => {
	const { data } = await axios.get(`sendRequest`)
	return data
}

// Send question to players (next, timer)
// next: Boolean (true = next question, false = repeat question)
// timer: Number in second
export const sendQuiz = async (next, timer) => {
	let sec
	timer ? (sec = timer) : (sec = 120)
	const { data } = await axios.get(`sendQuiz?next=${next}&timer=${sec}`)
	return data
}

// Force stop receiving answer
export const setCanAnswer = async () => {
	const { data } = await axios.get(`setCanAnswer?status=close`)
	return data
}

// Send result to players
export const sendResult = async () => {
	const { data } = await axios.get(`sendResult`)
	return data
}

// Reset everything to start from the beginning without sending result to users
export const restart = async () => {
	const { data } = await axios.get(`restart`)
	return data
}

// Get top 10 players score
export const getTopUsers = async () => {
	const { data } = await axios.get(`getTopUsers`)
	return data
}

// Show random users that answer correctly
export const showRandomCorrectUsers = async quizNumber => {
	const { data } = await axios.get(
		`showRandomCorrectUsers?quizno=${quizNumber}`
	)
	return data
}

// Create new quiz array
export const addQuiz = async quizArray => {
	const { data } = await axios.post(`addQuiz`, quizArray)
	return data
}

// Add new user with Facebook ID
export const addNewUserFromWeb = async (userID, firebaseKey) => {
	const { data } = await axios.post(`addNewUserFromWeb`, {
		userID,
		firebaseKey
	})
	return data
}

// Answer from web
export const answerFromWeb = async (PSID, answer) => {
	const { data } = await axios.post(`answerFromWeb`, {
		PSID,
		answer
	})
	return data
}

export const sharePost = async (postURL, PSID) => {
	const { data } = await axios.post(`testFrontFunctionFacebook`, {
		postURL,
		PSID
	})
	return data
}

export const getCouponPair = async (couponNumber) => {
	const { data } = await axios.get(`getCouponPair?couponNumber=${couponNumber}`)
	return data
}

export const checkUserSharedPost = async (PSID) => {
	const { data } = await axios.get(`viewIfUserSharePost?userID=${PSID}&mode=99`)
	return data
}
