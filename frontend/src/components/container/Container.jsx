import { useState, useEffect } from "react"
import Task from "../task/Task"
import './container.css'

export default function Container() {
  const [lists, setLists] = useState([])
  const [refresh, setRefresh] = useState(false)
  const backendUrl = 'http://localhost:3000';
  function handleAddList() {
    let title = prompt('Enter list title: ')
    if (title === '' || title === undefined || title === null) {
      title = 'Untitled'
    }
    setLists([...lists, { _id: `frontend${crypto.randomUUID()}`, title: title, cards: [{ _id: `frontend${crypto.randomUUID()}`, text: 'Add new task' }] }])
    saveTitle(title) // Save list title to database
  }

  // Function to save list title to database
  function saveTitle(title='') {
    fetch(`${backendUrl}/api/v1/list/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
      },
      body: JSON.stringify({
          title: title,
      })
    })
    .then(res => {
      if (res.status === 200) {
          setRefresh(true)
          console.log('Title saved')
          return res.json()
      } else {
          throw new Error('Error saving list')
      }
    })
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  // useFfect to get lists from database when refresh is true
  useEffect(() => {
    if (refresh === true) {
      fetch(`${backendUrl}/api/v1/list/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          setRefresh(false)
          return res.json()
        } else {
          throw new Error('Error getting lists')
        }
      })
      .then(data => {
        console.log(data)
        setLists(data.list)
      })
      .catch(err => console.log(err))
    }
  }, [refresh])

  // useEffect to get lists from database when component mounts
  useEffect(() => {
    fetch(`${backendUrl}/api/v1/list/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error('Error getting lists')
        }
      })
      .then(data => {
        console.log(data)
        setLists(data.list)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <main className="main-container">
        <div className="add-list" onClick={handleAddList}>
            Add List
        </div>
        <div className="main-content">
          {lists.map(list => {
            return <Task
                      key={list._id}
                      title={list.title}
                      cardsList={ list.cards.length > 0 ? list.cards : [{ _id: `frontend${crypto.randomUUID()}`, text: 'Add new task' }] }
                      listId={list._id}
                      setLists={setLists}
                    />
          })}
        </div>
    </main>
  )
}