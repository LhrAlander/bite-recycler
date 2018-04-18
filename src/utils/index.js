import axios from 'axios'
const appId = 'wx849816d52854ed3e'
const appSecret = '246c09366e3812b779ba4664694994a7'
function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) { return pair[1]; }
	}
	return (false);
}

function getUserInfo(code) {
	axios.post('http://alanderlight.club/userInfo', {
		appId,
		appSecret,
		code
	}).then(res => {
		console.log(res)
		let nickname = res.data.nickname
		let avatarurl = res.data.headimgurl
		let _nn = window.localStorage.getItem('nickname')
		if (_nn != nickname && _nn != undefined && _nn != null) {
			window.localStorage.setItem('nickname', nickname)
			window.localStorage.setItem('avatarurl', avatarurl)
		}
	}).catch(err => {
		console.log(err)
	})
}

export default { getQueryVariable, getUserInfo } 