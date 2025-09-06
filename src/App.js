import {TodoContext} from"./context/TodoContext"
import "./App.css";
import TodoList from "./components/TodoList";
import { useState } from "react";
import Typography from "@mui/material/Typography";

// Other Imports

import { v4 as uuidv4 } from 'uuid';

// End Other Imports
// Initial Todo List
const InitialTodo = [
  {
    id: uuidv4(),
    Title: "الموضوع",
    Details: "لتفاصيل الخاصة بالموضوع",
    isCompleted: false,
  },
]
function App() {
  const [DataTodo, SetDataTodo] = useState(InitialTodo);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px", // علشان في مارجن من الحواف
        direction: "rtl",
        minHeight: "100vh",
        boxSizing: "border-box",
        
        alignItems:"center"
      }}
    >
      <TodoContext.Provider value={{ DataTodo, SetDataTodo }}>
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
          
          }}
    
        >
          <Typography gutterBottom variant="h2">
            Special design Rawdhudha            
          </Typography>
          <TodoList />
        </div>
      </TodoContext.Provider>
    </div>
  );
}


export default App;
