import { Task } from '../../models/Task';
import Loading from '../UI/Loading/Loading';
import Section from '../UI/Section/Section';
import TaskItem from './TaskItem';
import classes from './Tasks.module.css';

interface Props {
  items: Task[];
  onFetch(): void;
  error: string | undefined;
  loading: boolean;
}

export default function Tasks(props: Props) {
  let taskListElement = <h2>No tasks found. Start adding some!</h2>;

  if (props.items.length > 0) {
    taskListElement = (
      <ul>
        {props.items.map((task: Task) => (
          <TaskItem key={task.id}>{task.text}</TaskItem>
        ))}
      </ul>
    );
  }

  let content = taskListElement;

  if (props.error) {

    content = (
    <div>
      <p>{props.error}</p>
      <button onClick={props.onFetch}>Try again</button>
    </div>
    );
  }

  if (props.loading) {
    // content = <p>Loading task...</p>;
    content = <Loading></Loading>
  }

  return (
    <Section>
      <div className={classes.container}>{content}</div>
    </Section>
  );
};

