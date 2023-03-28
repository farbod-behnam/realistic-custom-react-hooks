import { Key, ReactNode } from 'react';
import classes from './TaskItem.module.css';

interface Props {
  children: ReactNode;
}

export default function TaskItem(props: Props) {
  return <li className={classes.task}>{props.children}</li>
};
