function TaskForm({ newTask, setNewTask, createTask }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={createTask}>Add Task</button>
    </div>
  )
}

export default TaskForm
