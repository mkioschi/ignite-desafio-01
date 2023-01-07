import { Trash, Check } from 'phosphor-react';
import React from 'react';
import styles from './Task.module.css'

interface TaskProps {
  id: string,
  title: string,
  complete?: boolean,
  onDeleteTask: (id: string) => void,
  onCompleteTask: (id: string) => void,
  onUncompleteTask: (id: string) => void,
}

export function Task({
  id,
  title,
  complete = false,
  onDeleteTask,
  onCompleteTask,
  onUncompleteTask
}: TaskProps) {
  function deleteTaskHandle() {
    onDeleteTask(id);
  }

  function toogleCompleteTask(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    
    if (complete) {
      onUncompleteTask(id);
    } else {
      onCompleteTask(id);
    }
  }

  return (
    <li className={`${styles.task} ${complete ? styles.taskComplete : ''}`}>
      <a href="#" onClick={toogleCompleteTask}><Check size={12} /></a>
      <p>{title}</p>
      <button onClick={deleteTaskHandle}><Trash size={16} /></button>
    </li>
  );
}