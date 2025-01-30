import axios from 'axios'

export async function getUserDetails() {
  return await axios.get('http://127.0.0.1:8000/api/user-details')
}

export async function createUserDetails(formData) {
  return await axios.post('http://127.0.0.1:8000/api/user-details', formData)
}

export async function updateUserDetails(formData, id) {
  return await axios.put('http://127.0.0.1:8000/api/user-details/' + id, formData)
}

export async function deleteUserDetails(id) {
  return await axios.delete('http://127.0.0.1:8000/api/user-details/' + id)
}
