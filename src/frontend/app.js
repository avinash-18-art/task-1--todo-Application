const API_URL = 'https://your-render-api.onrender.com/api'

document.getElementById('register-form').addEventListener('submit', async e => {
  e.preventDefault()
  const email = document.getElementById('register-email').value
  const password = document.getElementById('register-password').value
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    alert(data.message)
  } catch (error) {
    console.error('Failed to register', error)
    alert('Failed to register: ' + error.message)
  }
})

document.getElementById('login-form').addEventListener('submit', async e => {
  e.preventDefault()
  const email = document.getElementById('login-email').value
  const password = document.getElementById('login-password').value
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      loadTodos()
    } else {
      alert(data.error)
    }
  } catch (error) {
    console.error('Failed to login', error)
    alert('Failed to login: ' + error.message)
  }
})

document.getElementById('todo-form').addEventListener('submit', async e => {
  e.preventDefault()
  const title = document.getElementById('todo-title').value
  const description = document.getElementById('todo-description').value
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
      }),
    })
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }
    const todo = await response.json()
    addTodoToList(todo)
  } catch (error) {
    console.error('Failed to add to-do', error)
    alert('Failed to add to-do: ' + error.message)
  }
})

async function loadTodos() {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`${API_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }
    const todos = await response.json()
    document.getElementById('todo-list').innerHTML = ''
    todos.forEach(addTodoToList)
  } catch (error) {
    console.error('Failed to load to-dos', error)
    alert('Failed to load to-dos: ' + error.message)
  }
}

function addTodoToList(todo) {
  const li = document.createElement('li')
  li.textContent = `${todo.title}: ${todo.description}`
  if (todo.completed) {
    li.classList.add('completed')
  }
  li.addEventListener('click', async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${API_URL}/todos/${todo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }
      const updatedTodo = await response.json()
      li.classList.toggle('completed', updatedTodo.completed)
    } catch (error) {
      console.error('Failed to update to-do', error)
      alert('Failed to update to-do: ' + error.message)
    }
  })
  document.getElementById('todo-list').appendChild(li)
}