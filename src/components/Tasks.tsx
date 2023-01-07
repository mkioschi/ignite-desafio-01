import { ChangeEvent, FormEvent, useState } from 'react';
import { PlusCircle, ClipboardText } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid';
import { Task } from './Task';

import styles from './Tasks.module.css';

interface TaskInterface {
  id: string,
  title: string,
  complete: boolean
}

export function Tasks() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  function handleTaskTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(event.target.value);
  }

  function handleCreateTaskSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTasks([{
      id: uuidv4(),
      title: newTaskTitle,
      complete: false
    }, ...tasks])

    setNewTaskTitle('');
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter(task => {
      return task.id !== id;
    }));
  }

  function completeTask(id: string) {
    let completeTasks: TaskInterface[] = [];
    let uncompleteTasks: TaskInterface[] = [];

    tasks.forEach(task => {
      if (task.complete === true || task.id === id) {
        task.complete = true;
        completeTasks.push(task);
      } else {
        uncompleteTasks.push(task);
      }
    });

    setTasks([...uncompleteTasks, ...completeTasks]);
  }

  function uncompleteTask(id: string) {
    let completeTasks: TaskInterface[] = [];
    let uncompleteTasks: TaskInterface[] = [];

    tasks.forEach(task => {
      if (task.complete === false || task.id === id) {
        task.complete = false;
        uncompleteTasks.push(task);
      } else {
        completeTasks.push(task);
      }
    });

    setTasks([...uncompleteTasks, ...completeTasks]);
  }

  const isNewTaskTitleEmpty = newTaskTitle.length === 0;

  return (
    <main className={styles.tasks}>
      <form onSubmit={handleCreateTaskSubmit} className={styles.createTaskForm}>
        <input
          type="text"
          name="task"
          placeholder='Adicione uma nova tarefa'
          value={newTaskTitle}
          onChange={handleTaskTitleChange}
        />
        <button type="submit" disabled={isNewTaskTitleEmpty}>Criar <PlusCircle size={18} /></button>
      </form>

      <div className={styles.statuses}>
        <p className={styles.totalTasks}>
          Tarefas Criadas <span>{tasks.length}</span>
        </p>

        <p className={styles.finishedTasks}>
          Concluídas <span>{tasks.reduce((sum, task) => task.complete === true ? sum + 1 : sum, 0)} de {tasks.length}</span>
        </p>
      </div>

      <ul className={styles.tasksList}>
        {
          tasks.length > 0 ?
            tasks.map(task => {
              return <Task
                key={task.id}
                id={task.id}
                complete={task.complete}
                title={task.title}
                onDeleteTask={deleteTask}
                onCompleteTask={completeTask}
                onUncompleteTask={uncompleteTask}
              />
            }) :
            <div className={styles.empty}>
              <div className={styles.image}>
                <ClipboardText size={80} />
              </div>

              <p>
                <strong>Você ainda não tem tarefas cadastradas</strong><br />
                Crie tarefas e organize seus itens a fazer
              </p>
            </div>
        }
      </ul>
    </main>
  );
}