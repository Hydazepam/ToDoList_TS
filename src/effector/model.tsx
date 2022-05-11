import { createEvent, createStore, restore, combine, sample, guard } from 'effector';
import { Task } from './types';

export const changedTask = createEvent<string>();
export const addTask = createEvent<string>();
export const toogleTask = createEvent<number>();
export const removeTask = createEvent<number>();
export const filter = createEvent();
export const toogleAll = createEvent();
export const clearCompleted = createEvent();
// const quantityActiveTasks = createEvent<number>();

export const $todo = restore(changedTask, '').reset(addTask);

const $todos = createStore<Task[]>([])
  .on(addTask, (list: Task[], task: string) => {if (task.length > 0) return [...list, { text: task, completed: false }]})
  .on(toogleTask, (list, index) => list.map((task, i) => ({ ...task, completed: index === i ? !task.completed : task.completed })))
  .on(removeTask, (list, index) => list.filter((_, i) => i !== index))
  .on(clearCompleted, (list) => list.filter((task) => !task.completed))

const $allChecked = createStore(false);

//   .on(toogleAll, (isChecked: boolean) => !isChecked)
  // .on(toogleAll, (list: Task[], isChecked: boolean) => !isChecked ? list.map((task) => !task.completed ? ({ ...task, completed: true}) : task) : list.map((task) => !task.completed))

const $currFilter = createStore(null)
  .on(filter, (_, filter) => filter)

export const $filteredToDoList = combine(
  $todos,
  $currFilter,
  (list, filter) => filter === null
    ? list
    : list.filter((task) => task.completed === filter)
)

guard({
  clock: toogleAll,
  source: $allChecked,
  filter: (task) => !task.complete 
  target: $filteredToDoList,
})
// const $filteredToDoList = combine(
//   $todos,
//   $currFilter,
//   $allChecked,
//   (list, filter, isChecked) => {
//     if (isChecked) {
//       console.log(isChecked)
//       list.map((task) => !task.completed ? ({ ...task, completed: isChecked}) : task);
//     } else {
//       console.log(isChecked)
//       list.map((task) => ({ ...task, completed: isChecked}));
//     }
//     return filter === null ? list : list.filter((task) => task.completed === filter)
//     // return list;
//   }
// )

sample({
  clock: addTask,
  source: [$todo, $todos],
})