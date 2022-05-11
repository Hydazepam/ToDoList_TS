import { List, ListItem, ListItemButton, ListItemIcon, Checkbox, ListItemText, IconButton } from '@mui/material';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useStore } from 'effector-react';
import { $filteredToDoList, removeTask, toogleTask, filter } from '../effector/model'

const filtersRadioButtons = (
  <footer>
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="All"
      >
        <FormControlLabel onClick={filter.prepend(() => null)} value="All" control={<Radio />} label="All" defaultChecked/>
        <FormControlLabel onClick={filter.prepend(() => false)} value="Active" control={<Radio />} label="Active" />
        <FormControlLabel onClick={filter.prepend(() => true)} value="Completed" control={<Radio />} label="Completed" />
      </RadioGroup>
    </FormControl>
  </footer>
)

export function Main() {
  const tasks = useStore($filteredToDoList);

  return (
    <>
      {filtersRadioButtons}
      <List>
        {tasks.map((task, index) => (
          <ListItem
            className="listItem"
            key={index}
            style={{textDecoration: task.completed ? 'line-through' : ''}}
            secondaryAction={
              <IconButton onClick={() => removeTask(index)} className="hiddenButton" edge="end">
                <Delete />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton onClick={() => toogleTask(index)} dense>
              <ListItemIcon>
                <Checkbox edge="start" checked={task.completed}/>
              </ListItemIcon>
              <ListItemText>{task.text}</ListItemText>
            </ListItemButton>
          </ListItem>
          )
        )}
      </List>
    </>
  )
}
