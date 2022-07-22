const token = JSON.parse(localStorage.getItem("token"));
const sendHttpRequest = (method, url, data = null,) => {
	const params = {
		method: method,
		body: null,
		headers: {
			'Content-Type': 'application/json',
            'X-Auth': token
		},
	}
    if (method === 'POST' || method === 'PUT') {
		params.body = JSON.stringify(data)
	}
	return fetch(url, params).then((response) => {
		if (response.status === 400) {
			return response.json().then((errResData) => {
				const error = new Error('Something went wrong!')
				error.data = errResData
				throw error
			})
		} else if (response.status === 401) {
			return response.json().then((errResData) => {
				const error = new Error('Something went wrong!')
				error.data = errResData
				throw error
			})
		}
		return response.json()
	})
}  



export const signUpPost=(data)=>{
    return sendHttpRequest('POST', 'http://localhost:1717/signin', data)
        .then(responData=>{
            console.log(responData);
            return responData
        })
        .catch(err=>{
            return null
        })
}

export const Login=(data)=>{
    return sendHttpRequest('POST', 'http://localhost:1717/login', data)
        .then(responData=>{
            return responData
        })
        .catch(err=>{
            return null
        })
}

export const getMe=()=>{
    return sendHttpRequest('GET', 'http://localhost:1717/me')
        .then(responData=>{
            return responData
        })
        .catch(err=>{
            return null
        })
}

export const getBooks=()=>{
    return sendHttpRequest('GET', 'http://localhost:1717/books')
        .then(responData=>{
            return responData
        })
        .catch(err=>{
            return null
        })
}

export const createBooks=(data)=>{
    return sendHttpRequest('POST', 'http://localhost:1717/books/create', data)
        .then(responData=>{
            return responData
        })
        .catch(err=>{
            return null
        })
}


export const getBooksById=(id)=>{
    return sendHttpRequest('GET', `http://localhost:1717/books/${id}`)
        .then(responData=>{
            return responData
        })
        .catch(err=>{
            return null
        })
}

export const deleteBookById=(id)=>{
    return sendHttpRequest('DELETE', `http://localhost:1717/books/delete/${id}`)
        .then(responData=>{
            return responData
        })
        .catch(err=>{
            return null
        })
}

export const updateBook=(id, data)=>{
    return sendHttpRequest('PUT', `http://localhost:1717/books/update/${id}`, data)
        .then(responData=>{
            return responData
        })
        .catch(err=>{
            return null
        })
}
