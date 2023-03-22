import { useState } from 'react'
import Box from "./Box"
import './task.css'

export default function Task({ title, type }) {
    const [boxArrays, setBoxArrays] = useState([
        {
            id: crypto.randomUUID(),
            text: 'New Task',
        }
    ])
    function handleAdd(type) {
        setBoxArrays([...boxArrays, { id: crypto.randomUUID(), text: `New ${type} task` }])
    }

  return (
    <div className="task-container">
        <h1 className={`task-title ${type}`}>{ title }</h1>
        <div className="add" onClick={() => handleAdd(type)}>
            <i className='bx bx-plus'></i>
        </div>
        <div className="task-content">
            {boxArrays.map((box) => {
                return <Box key={box.id} content={box.text} setBoxArrays={setBoxArrays} id={box.id} />
            })}
        </div>
    </div>
  )
}
