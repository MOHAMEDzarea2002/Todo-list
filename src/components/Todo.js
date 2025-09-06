import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/GridLegacy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import "../App.css";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

// Import Delete Model And Edit Model
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function Todo({ todo }) {
  const { DataTodo, SetDataTodo } = useContext(TodoContext);
  const [ShowDeletTodo, setShowDeletTodo] = React.useState(false);
  const [showEditTodo, setshowEditTodo] = React.useState(false);
  const [UpdatedTodo, setUpdatedTodo] = React.useState({
    Title: todo.Title,
    Details: todo.Details,
  });

  //  Handel Checkc Success
  function HandelCheckc() {
    const UpdateTodo = DataTodo.map((item) => {
      if (item.id === todo.id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    SetDataTodo(UpdateTodo);
    localStorage.setItem("todo", JSON.stringify(UpdateTodo));
  }
  // close Delete Model
  const handleDeleteClose = () => {
    setShowDeletTodo(false);
  };
  // show Delete Model
  function HandleClickDelete() {
    setShowDeletTodo(true);
  }

  //  Handle Delete Todo
  function HandleDeletTodo() {
    const UpdatedDeletTodo = DataTodo.filter((item) => item.id !== todo.id);
    SetDataTodo(UpdatedDeletTodo);
    setShowDeletTodo(false);
    localStorage.setItem("todo", JSON.stringify(UpdatedDeletTodo));
  }
  // show Edit Model
  function HandleClickEdit() {
    setshowEditTodo(true);
  }
  //  Edit Model close
  function HandlekEditColose() {
    setshowEditTodo(false);
  }

  // Handle updatedTodo
  function HandelUpdatedTodo(e) {
    e.preventDefault();
    const UpdatedAddTodo = DataTodo.map((item) => {
      if (item.id === todo.id) {
        return {
          ...item,
          Title: UpdatedTodo.Title,
          Details: UpdatedTodo.Details,
        };
      }
      return item;
    });
    SetDataTodo(UpdatedAddTodo);
    setshowEditTodo(false);
    localStorage.setItem("todo", JSON.stringify(UpdatedAddTodo));
  }
 return (
  <>
    {/* Start Edit */}
    <Dialog
      open={showEditTodo}
      onClose={HandlekEditColose}
      fullWidth
      maxWidth="sm"
      dir="rtl"
    >
      <DialogTitle>تعديل المهمة</DialogTitle>
      <DialogContent>
        <DialogContentText>
          لتعديل المهمة قم بتغيير البيانات في الحقول التالية
        </DialogContentText>
        <form onSubmit={HandelUpdatedTodo} id="subscription-form">
          <TextField
            autoFocus
            required
            margin="dense"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={UpdatedTodo.Title}
            onChange={(e) =>
              setUpdatedTodo({ ...UpdatedTodo, Title: e.target.value })
            }
          />
          <TextField
            required
            margin="dense"
            label="تفاصيل المهمة"
            fullWidth
            variant="standard"
            value={UpdatedTodo.Details}
            onChange={(e) =>
              setUpdatedTodo({ ...UpdatedTodo, Details: e.target.value })
            }
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={HandlekEditColose}>اغلاق</Button>
        <Button type="submit" form="subscription-form">
          تحديث
        </Button>
      </DialogActions>
    </Dialog>
    {/* End Edit */}

    {/* Start Delete Modal */}
    <Dialog
      open={ShowDeletTodo}
      onClose={handleDeleteClose}
      fullWidth
      maxWidth="xs"
      dir="rtl"
    >
      <DialogTitle>هل انت متأكد من حذف المهمة؟</DialogTitle>
      <DialogContent>
        <DialogContentText>
          لا يمكنك التراجع من الحذف بعد اتمامه
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={HandleDeletTodo}>
          حذف
        </Button>
        <Button onClick={handleDeleteClose} autoFocus>
          اغلاق
        </Button>
      </DialogActions>
    </Dialog>
    {/* End Delete Modal */}

    {/* Todo Card */}
    <Card
      className="TodoCard"
      sx={{
        backgroundColor: "#283593",
        mt: 3,
        color: "white",
      }}
      
    >
      <CardContent>
        <Grid
          container
          spacing={2}
          alignItems="center"
        >
          <Grid item xs={12} sm={8}>
            <Typography
              gutterBottom
              variant="h6"
              sx={{
                textAlign: "right",
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.Title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: "right",
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.Details}
            </Typography>
          </Grid>

          {/* Actions */}
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-end", sm: "space-around" },
              gap: 1,
            }}
          >
            <IconButton
              onClick={HandelCheckc}
              sx={{
                border: "solid #8bc34a 3px",
                bgcolor: todo.isCompleted ? "#8bc34a" : "white",
                color: todo.isCompleted ? "white" : "#8bc34a",
                width: 40,
                height: 40,
              }}
            >
              <CheckCircleIcon />
            </IconButton>

            <IconButton
              onClick={HandleClickEdit}
              sx={{
                color: "#4a82c3ff",
                bgcolor: "white",
                border: "solid #4a82c3ff 3px",
                width: 40,
                height: 40,
              }}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              onClick={HandleClickDelete}
              sx={{
                color: "red",
                bgcolor: "white",
                border: "solid red 3px",
                width: 40,
                height: 40,
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </>
);

}
