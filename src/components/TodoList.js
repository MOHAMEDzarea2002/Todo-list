import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/GridLegacy";
import TextField from "@mui/material/TextField";
import Todo from "./Todo";
import Button from "@mui/material/Button";
import { useState, useEffect, useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { DataTodo, SetDataTodo } = useContext(TodoContext);
  const [TitleInputs, SetTitleInputs] = useState("");
  const [filter, setFilter] = useState("الكل");

  // Load from localStorage
  useEffect(() => {
    const StorgeTodo = JSON.parse(localStorage.getItem("todo"));
    if (StorgeTodo) {
      SetDataTodo(StorgeTodo);
    }
  }, []);

  // Add new todo
  function handleAdd() {
    if (TitleInputs.trim() === "") {
      return alert("من فضلك ادخل مهمتك");
    }
    const NewTodo = {
      id: uuidv4(),
      Title: TitleInputs,
      Details: "",
      isCompleted: false,
    };
    const NewDataTodo = [...DataTodo, NewTodo];
    SetDataTodo(NewDataTodo);
    localStorage.setItem("todo", JSON.stringify(NewDataTodo));
    SetTitleInputs("");
  }

  // update State filter
  const handleFilterChange = ( event ,newFilter) => {
      setFilter(newFilter);
  };
// ` Filtered todos based on the selected filter
  const filteredTodos = DataTodo.filter((todo) => {
    if (filter === "الكل") return true;
    if (filter === "منجز") return todo.isCompleted;
    if (filter === "غير منجز") return !todo.isCompleted;
  });

  return (
    <Container   maxWidth="md" >
      <Card  style={{overflowY:"scroll", maxHeight:"70vh",}}>
        <CardContent>
          <Typography gutterBottom variant="h2">
            مهامي
          </Typography>
          <Divider variant="middle" />

          {/* Filter Buttons */}
          <ToggleButtonGroup
            value={filter}
            onChange={handleFilterChange}
            color="primary"
            exclusive
            aria-label="Platform"
            style={{ direction: "ltr", marginTop: "30px" }}
          >
            <ToggleButton value="الكل">الكل</ToggleButton>
            <ToggleButton value="منجز">منجز</ToggleButton>
            <ToggleButton value="غير منجز">غير منجز</ToggleButton>
          </ToggleButtonGroup>

          {/* Todo List */}
          
           {filteredTodos.length > 0 ?  
           (filteredTodos.map((item) => (
              <Todo key={item.id} todo={item} />
            )) ):
            (
              <Typography
                variant="h5"
                style={{ textAlign: "center", marginTop: "20px" }}
              >
                لا توجد مهام لعرضها
              </Typography>
            )
}

          {/* Input + Add Button */}
          <Grid
            container
            style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <Grid item xs={8}>
              <TextField
                style={{ width: "100%", fontSize: "25px" }}
                id="standard-basic"
                label="اكتب مهمتك هنا"
                variant="standard"
                placeholder="اكتب مهمتك هنا"
                value={TitleInputs}
                onChange={(e) => SetTitleInputs(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                disableElevation
                style={{ width: "90%", height: "100%", fontSize: "20px" }}
                onClick={handleAdd}
                disabled={TitleInputs.length <= 0 ? true : false}
              >
                أضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}