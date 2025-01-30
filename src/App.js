import { useState, useEffect } from 'react'
import {
  getUserDetails,
  createUserDetails,
  updateUserDetails,
  deleteUserDetails
} from './api/userDetails'
import './App.css'

function App() {
  const [userDetailsTableData, setUserDetailsTableData] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)
  const [updateId, setUpdateId] = useState(null)

  async function onLoad() {
    try {
      const response = await getUserDetails()
      if (response && response.data) {
        setUserDetailsTableData(response.data)
      } else {
        console.error('Failed to fetch user details')
      }
    } catch (error) {
      console.error('Error fetching user details:', error)
    }
  }

  async function onSubmit(event) {
    event.preventDefault()
    setIsUpdate(false)

    if (!isUpdate) {
      await createUserDetails({
        name: document.querySelector('input[name="name"]').value,
        contact: document.querySelector('input[name="contact"]').value,
        address: document.querySelector('input[name="address"]').value
      })
      await onLoad()
    } else {
      await updateUserDetails(
        {
          name: document.querySelector('input[name="name"]').value,
          contact: document.querySelector('input[name="contact"]').value,
          address: document.querySelector('input[name="address"]').value
        },
        updateId
      )
      await onLoad()
    }

    document.querySelector('input[name="name"]').value = ''
    document.querySelector('input[name="contact"]').value = ''
    document.querySelector('input[name="address"]').value = ''
  }

  function onUpdate(user, id) {
    setUpdateId(id)
    setIsUpdate(true)

    document.querySelector('input[name="name"]').value = user.name
    document.querySelector('input[name="contact"]').value = user.contact
    document.querySelector('input[name="address"]').value = user.address
  }

  async function onDelete(id) {
    const updatedData = userDetailsTableData.filter((user) => user.id !== id)
    setUserDetailsTableData(updatedData)
    await deleteUserDetails(id)
  }

  useEffect(() => {
    onLoad()
  }, [])

  function UpdateButton({ user }) {
    return <button onClick={() => onUpdate(user, user.id)}>Update</button>
  }

  function DeleteButton({ id }) {
    return <button onClick={() => onDelete(id)}>Delete</button>
  }

  return (
    <div className="App">
      <header className="App-header">
        <label>Name:</label>
        <input name="name" />
        <label>Contact:</label>
        <input name="contact" />
        <label>Address:</label>
        <input name="address" />
        <br />
        <button onClick={onSubmit}>{isUpdate ? 'Update' : 'Submit'}</button>
        <br />
        <br />

        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Contact</td>
              <td>Address</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {userDetailsTableData.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.contact}</td>
                  <td>{user.address}</td>
                  <td>
                    <UpdateButton user={user} />
                    <DeleteButton id={user.id} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </header>
    </div>
  )
}

export default App
