import { useState } from "react"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"

function Tasks() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("myTasks")) || []
  })

  const [newTask, setNewTask] = useState("")
  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [error, setError] = useState("")

  async function createTask() {
    if (newTask.trim() === "") {
      alert("Please enter a task")
      return
    }

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title: newTask,
            completed: false,
            userId: 1,
          }),
        },
      )

      if (!response.ok) {
        throw new Error("Failed to create task.")
      }

      const data = await response.json()

      const myTask = {
        ...data,
        id: Date.now(),
      }

      const updatedTasks = [...tasks, myTask]

      setTasks(updatedTasks)

      localStorage.setItem("myTasks", JSON.stringify(updatedTasks))

      setNewTask("")
    } catch (error) {
      setError(error.message)
    }
  }

  async function toggleTask(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
          }
        : task,
    )

    setTasks(updatedTasks)

    localStorage.setItem("myTasks", JSON.stringify(updatedTasks))
  }

  async function updateTask(id) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title: editTitle,
            completed: false,
            userId: 1,
          }),
        },
      )

      if (!response.ok) {
        throw new Error("Failed to update task.")
      }

      const updatedTasks = tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: editTitle,
            }
          : task,
      )

      setTasks(updatedTasks)

      localStorage.setItem("myTasks", JSON.stringify(updatedTasks))

      setEditId(null)
      setEditTitle("")
    } catch (error) {
      setError(error.message)
    }
  }

  async function deleteTask(id) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        },
      )

      if (!response.ok) {
        throw new Error("Failed to delete task.")
      }

      const updatedTasks = tasks.filter((task) => task.id !== id)
      setTasks(updatedTasks)
      localStorage.setItem("myTasks", JSON.stringify(updatedTasks))
    } catch (error) {
      setError(error.message)
    }
  }

  if (error) {
    return <h2>{error}</h2>
  }

  return (
    <div>
      <h1>Task Manager</h1>

      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        createTask={createTask}
      />

      <h2>My Tasks</h2>

      <TaskList
        tasks={tasks}
        editId={editId}
        editTitle={editTitle}
        setEditId={setEditId}
        setEditTitle={setEditTitle}
        updateTask={updateTask}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
      />
    </div>
  )
}

export default Tasks
