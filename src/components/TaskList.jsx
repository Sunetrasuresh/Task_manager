function TaskList({
  tasks,
  editId,
  editTitle,
  setEditId,
  setEditTitle,
  updateTask,
  deleteTask,
  toggleTask,
}) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          {editId === task.id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <button onClick={() => updateTask(task.id)}>Save</button>

              <button
                onClick={() => {
                  setEditId(null)
                  setEditTitle("")
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h3>{task.title}</h3>

              <p>
                Status:
                {task.completed ? " Completed" : " Pending"}
              </p>

              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                Mark as completed
              </label>

              <br />

              <button
                onClick={() => {
                  setEditId(task.id)
                  setEditTitle(task.title)
                }}
              >
                Edit
              </button>

              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default TaskList
