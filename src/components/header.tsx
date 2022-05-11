import { TextField } from '@mui/material';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useStore } from 'effector-react';
import { $todo, toogleAll, changedTask, addTask } from '../effector/model'

export function Header() {
  const todo = useStore($todo);

  return (
    <header>
      <h1 className="title">ToDoList</h1>
      <input type="checkbox" onClick={() => toogleAll()}></input>
      <TextField
        sx={{ mr: 1 }}
        value={todo}
        onChange={(e) => changedTask(e.target.value)}
        onKeyDown={(e) => {if (e.key === 'Enter') addTask(todo)}}
        type="text"
        className="input"
        id="outlined-basic"
        label="Type your task here"
        variant="outlined"
      />
      <Fab className="button" sx={{ ml: 0 }} type="submit" onClick={() => addTask(todo)} color="primary" aria-label="add">
        <Add />
      </Fab>
    </header>
  )
}