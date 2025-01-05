import List from '@mui/material/List';
import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const getInitialData = () => {
  const data = JSON.parse(localStorage.getItem("todos"));
  if (!data) {
    return [];
  }
  else {
    return data;
  }
}

export default function TodoList(){
    const [todos, setTodos] = useState(getInitialData);

    useEffect(()=>{
      localStorage.setItem("todos",JSON.stringify(todos));
    }, [todos]);

    const removeTodo = (id) => {
      setTodos((prevTodos) =>{
        return prevTodos.filter((t) => t.id !== id);
      })
    }

    const toggleTodo = (id) => {
      setTodos(prevTodos => {
        return prevTodos.map(todo => {
            if(todo.id === id){
            return {...todo, completed: !todo.completed}
          } else {
            return todo;
          }
          })
        }) 
      }

    const addTodo = (text) =>{
       setTodos((prevTodos)=> {
        return [...prevTodos, {text:text, id: crypto.randomUUID(), completed: false}];
      })
    }  
    
    
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {todos.map((todo) => {
              return <TodoItem todo={todo} key={todo.id} remove ={removeTodo} toggle={toggleTodo}/>
            })}
           <TodoForm addTodo={addTodo}/>
        </List>
    );
}
/*
import * as React from 'react';


export default function CheckboxList() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          
      })}
    </List>
  );
}
*/