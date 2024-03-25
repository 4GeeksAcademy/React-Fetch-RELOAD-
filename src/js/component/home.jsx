import React, { useEffect, useState } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  function createUser() {
	fetch("https://playground.4geeks.com/apis/fake/todos/user/Juan1234",{
	method: "POST",
	body: JSON.stringify([]),
	headers:{
		"Content-Type": "application/json"
	}
  })
  .then((response)=>response.json())
  .then((data)=>setTodos(data))
  .catch((error)=>console.log(error))
}

function getInfo() {
	fetch("https://playground.4geeks.com/apis/fake/todos/user/Juan1234",{
	method: "GET"
  })
  .then((response)=>{
    console.log(response);
    if (response.ok) {
      return response.json()
    }
    else {
      if (response.status === 404) {
        createUser()
      }
      else {
        console.log("Error en la solicitud", response.status)
      }
    }
   
  })
  .then((data) => setTodos(data))
  .catch((error)=>console.log(error))
}

function putInfo(todos) {
  console.log("Datos que se envían a la API:", todos);
	fetch("https://playground.4geeks.com/apis/fake/todos/user/Juan1234",{
	method: "PUT",
	body: JSON.stringify(todos),
	headers:{
		"Content-Type": "application/json"
	}

  })
  .then((response)=>response.json())
  .then((data)=>console.log(data))
  .catch((error)=>console.log(error))
}

function addTodos(enter) {
    if (enter.key === "Enter") {
      const newTodos = todos.concat({ label: inputValue, done: false });
      setTodos(todos.concat( { label: inputValue, done: false }))
      setInputValue("");
      putInfo(newTodos);
    }
}

function removeTodos(currentIndex) {
   const filter = todos.filter((item, index) => index !== currentIndex)
   setTodos(filter)
   putInfo(filter)
}

  useEffect(() => {
    getInfo();
  },[])

  return (
    <div className="container">
      <h1 className="text-center">Lista de tareas</h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(llamar) => setInputValue(llamar.target.value)}
            value={inputValue}
            onKeyDown={addTodos}
            placeholder="Agrega una nueva tarea"
          />
        </li>
        {todos.map((item, index) => (
          <li key={index}>
            {item.label}
            <button
              onClick={() => removeTodos(index)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </li>
        ))}
      </ul>
      <div>Tienes {todos.length} tareas pendientes por hacer</div>
    </div>
  );
};

export default Home;
