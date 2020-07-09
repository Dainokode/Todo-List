// ToDo List

// select form with class add(todo)
const addForm = document.querySelector(".add");
// console.log(addForm);

// select ul with class of list
const listUl = document.querySelector(".list");

// select search form input
const searchForm = document.querySelector(".search-form input");
// console.log(searchForm);

// create a function that generates lis
const generateTodo = (todo) => {
  let html = `
    <li>${todo} <i class='fas fa-trash-alt delete'></i></li>
  `;

  listUl.innerHTML += html;
};

// saveToLocalStorage function
const saveToLocalStorage = (todo) => {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    generateTodo(todo);
  });
};

// removeFromLocalStorage function
const removeFromLocalStorage = (item) => {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.pop(item);

  localStorage.setItem("todos", JSON.stringify(todos));
};

// listen for load event
document.addEventListener("DOMContentLoaded", getTodos);

// attach event listener to addForm
addForm.addEventListener("submit", (e) => {
  // prevent form default behavior
  e.preventDefault();

  // get value of form and store it into a variable and use trim() to remove white spaces
  const todo = addForm.add.value.trim();
  // clear input value
  addForm.add.value = "";

  // check if todo has length
  if (todo.length) {
    generateTodo(todo);
  }

  // saveToLocalStorage function
  saveToLocalStorage(todo);
});

listUl.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.style.opacity = "0";
    setTimeout(() => {
      e.target.parentElement.remove();
      removeFromLocalStorage(e.target.parentElement);
    }, 1000);
  }
});

// filterTodos function
const filterTodos = (inputValue) => {
  // select listUl children and convert it into an array and use filter() method
  Array.from(listUl.children)
    .filter((child) => {
      return !child.textContent.toLowerCase().includes(inputValue);
    })
    .forEach((child) => {
      child.classList.add("filtered");
    });

  Array.from(listUl.children)
    .filter((child) => {
      return child.textContent.toLowerCase().includes(inputValue);
    })
    .forEach((child) => {
      child.classList.remove("filtered");
    });
};

// listen for event on search form input - listen for a keyup
searchForm.addEventListener("keyup", () => {
  // get value of search input, use trim() (string method) to remove white spaces and store it in a variable
  const inputValue = searchForm.value.trim().toLowerCase();
  // console.log(inputValue);
  // function filterTodos()
  filterTodos(inputValue);
});
