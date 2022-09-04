import { useEffect, useState } from "react";
import "./todo.css";

export default function Todo() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");

  const [items, setItems] = useState<any>();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    setItems(todos);
  }, [todos]);

  function handleInputChange(e: any) {
    setTodo(e.target.value);
  }

  function handleFormSubmit(e: any) {
    e.preventDefault();
    let max = 0;
    todos.forEach((todo: any) => {
      if (todo.id > max) {
        max = todo.id;
      }
    });

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: max + 1,
          text: todo.trim(),
          statu: true,
        },
      ]);
    }
    setTodo("");
  }

  function handleDeleteClick(id: any) {
    const removeItem = todos.filter((todo: any) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  const handleChange = (id: any, e: any) => {
    if (e.target.checked) {
      todos.find((todo: any) => {
        return todo.id === id;
      }).statu = false;
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      todos.find((todo: any) => {
        return todo.id === id;
      }).statu = true;
      localStorage.setItem("todos", JSON.stringify(todos));
    }

    setTodos([...todos]);
  };

  const deleteCompleted = () => {
    setTodos(activeItems);
  };

  let activeItems = todos.filter((todo: any) => {
    return todo.statu === true;
  });

  let completedItems = todos.filter((todo: any) => {
    return todo.statu === false;
  });

  const showActive = () => {
    setItems(activeItems);
  };

  const showCompleted = () => {
    setItems(completedItems);
  };

  const showAll = () => {
    setItems(todos);
  };

  const checkAll = () => {
    if (activeItems.length > 0) {
      todos.forEach((element: any) => {
        element.statu = false;
      });
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      todos.forEach((element: any) => {
        element.statu = true;
      });
      localStorage.setItem("todos", JSON.stringify(todos));
    }

    setTodos([...todos]);
  };

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={handleFormSubmit}>
            <input
              name="todo"
              type="text"
              className="new-todo"
              placeholder="What needs to be done?"
              value={todo}
              onChange={handleInputChange}
              autoFocus
            />
          </form>
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all" onClick={checkAll}>
            Mark all as complete
          </label>

          <ul className="todo-list">
            {items?.map((todo: any) =>
              todo.statu !== true ? (
                <li className="completed" key={todo.id}>
                  <div className="view">
                    <input
                      checked
                      className="toggle"
                      type="checkbox"
                      onClick={(e) => handleChange(todo.id, e)}
                    />
                    <label>{todo.text}</label>
                    <button
                      className="destroy"
                      onClick={() => handleDeleteClick(todo.id)}
                    ></button>
                  </div>
                </li>
              ) : (
                <li className="" key={todo.id}>
                  <div className="view">
                    <input
                      defaultChecked={false}
                      className="toggle"
                      type="checkbox"
                      onClick={(e) => handleChange(todo.id, e)}
                    />
                    <label>{todo.text}</label>
                    <button
                      className="destroy"
                      onClick={() => handleDeleteClick(todo.id)}
                    ></button>
                  </div>
                </li>
              )
            )}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{activeItems.length} &nbsp;</strong>
            items left
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected" onClick={showAll}>
                All
              </a>
            </li>
            <li>
              <a href="#/" onClick={showActive}>
                Active
              </a>
            </li>
            <li>
              <a href="#/" onClick={showCompleted}>
                Completed
              </a>
            </li>
          </ul>

          {completedItems.length > 0 && (
            <button className="clear-completed" onClick={deleteCompleted}>
              Clear completed
            </button>
          )}
        </footer>
      </section>

      <footer className="info">
        <p>
          <a href="https://github.com/yazanselman">Click to edit a todo</a>
        </p>
        <p>
          Created by <a href="https://github.com/yazanselman">Selman Yazan</a>
        </p>
      </footer>
    </>
  );
}
