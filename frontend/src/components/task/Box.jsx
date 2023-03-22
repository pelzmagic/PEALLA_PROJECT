import { useState } from 'react'
import './box.css'

export default function Box({ content, setBoxArrays, id }) {
    const [text, setText] = useState(content);
    const [showTrash, setShowTrash] = useState(false);
    function handleShowTrash() {
        setShowTrash(!showTrash)
    }
    function handleContentChange(event) {
        setText(event.target.value);
        setBoxArrays((prev) => {
            return prev.map((item) => {
                if (item.id === id) {
                    return { ...item, text: event.target.value }
                }
                return item
            })
        })
    }
    function handleDelete(id) {
        setBoxArrays((prev) =>{
            return prev.filter((item) => item.id !== id)})
    }
    
  return (
    <div className='box' onMouseEnter={handleShowTrash} onMouseLeave={handleShowTrash} >
        <i className={ showTrash ? 'bx bxs-trash show-trash' : 'bx bxs-trash' } onClick={() => handleDelete(id)}></i>
        <textarea className='box-textarea' value={text} onChange={handleContentChange} >
        </textarea>

    </div>
  )
}
