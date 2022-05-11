import { Fab } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { clearCompleted } from '../effector/model';

export function Footer() {
  return (
    <Fab onClick={() => clearCompleted()} variant="extended" size="small" color="primary">
      <Delete sx={{ mr: 0 }} />
      Clear Completed
    </Fab>
  )
}