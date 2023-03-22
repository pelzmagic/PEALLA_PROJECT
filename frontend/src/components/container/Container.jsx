import Task from "../task/Task"
import './container.css'

export default function Container() {
  return (
    <main className="main-container">
        <Task title="TODO" type="to-do" />
        <Task title="IN PROGRESS" type="in-progress" />
        <Task title="COMPLETED" type="completed" />
    </main>
  )
}
