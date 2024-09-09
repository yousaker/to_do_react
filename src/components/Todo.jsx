import React, { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Container,
  IconButton,
  Typography,
  Checkbox,
  Card,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

export default function Todo() {
  const [task, setTask] = useState(""); // المهمة الجديدة
  const [tasks, setTasks] = useState([]); // قائمة المهام
  const [editIndex, setEditIndex] = useState(null); // مؤشر المهمة التي يتم تعديلها
  const [completedTasks, setCompletedTasks] = useState([]); // المهام المنتهية

  const addTask = () => {
    if (task.trim() !== "") {
      if (editIndex !== null) {
        // إذا كانت المهمة في وضع التحرير
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = task;
        setTasks(updatedTasks);
        setEditIndex(null); // إيقاف وضع التحرير
      } else {
        setTasks([...tasks, task]); // إضافة مهمة جديدة
      }
      setTask(""); // إعادة تعيين حقل الإدخال
    }
  };

  const deleteTask = (indexToDelete) => {
    const newTasks = tasks.filter((_, index) => index !== indexToDelete); // حذف المهمة المحددة
    setTasks(newTasks);
  };

  const toggleCompleteTask = (index) => {
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter((i) => i !== index)); // إلغاء الشطب
    } else {
      setCompletedTasks([...completedTasks, index]); // شطب المهمة
    }
  };

  const editTask = (index) => {
    setTask(tasks[index]); // تحميل المهمة في حقل الإدخال
    setEditIndex(index); // تعيين مؤشر المهمة للتحرير
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        To-Do List
      </Typography>

      {/* حقل إدخال المهمة */}
      <TextField
        label={editIndex !== null ? "Edit Task" : "New Task"} // تغيير النص عند التحرير
        variant="outlined"
        fullWidth
        value={task} // ربط الحقل النصي بحالة المهمة الجديدة
        onChange={(e) => setTask(e.target.value)} // تحديث حالة المهمة
        style={{ marginBottom: "1rem" }} // إضافة مساحة تحت الحقل
      />

      {/* زر لإضافة أو تعديل المهمة */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={addTask}
        style={{ marginBottom: "1rem" }}
      >
        {editIndex !== null ? <SaveIcon /> : "Add Task"}
      </Button>

      {/* قائمة المهام */}
      <List style={{ marginTop: "2rem" }}>
        {tasks.map((task, index) => (
          <Card
            key={index}
            variant="outlined"
            style={{
              marginBottom: "1rem",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardContent>
              <ListItem
                secondaryAction={
                  <>
                    {/* زر تعديل المهمة */}
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => editTask(index)}
                    >
                      <EditIcon />
                    </IconButton>

                    {/* زر حذف المهمة */}
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteTask(index)}
                    >
                      <DeleteIcon style={{ color: "#f44336" }} />
                    </IconButton>
                  </>
                }
              >
                {/* مربع اختيار لشطب المهمة */}
                <Checkbox
                  edge="start"
                  checked={completedTasks.includes(index)}
                  onChange={() => toggleCompleteTask(index)}
                />

                {/* نص المهمة */}
                <ListItemText
                  primary={task}
                  style={{
                    textDecoration: completedTasks.includes(index)
                      ? "line-through"
                      : "none",
                    color: completedTasks.includes(index) ? "gray" : "black",
                  }}
                />
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </Container>
  );
}
