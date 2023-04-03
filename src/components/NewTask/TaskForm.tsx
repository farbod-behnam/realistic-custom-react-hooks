import { FormEvent, useRef } from 'react';

import classes from './TaskForm.module.css';

interface Props {
  onEnterTask(enteredValue: string): void;
  loading: boolean;
}

export default function TaskForm(props: Props) {

  const taskInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let enteredValue = taskInputRef.current?.value;

    if (enteredValue !== undefined && enteredValue.trim().length > 0) {
      props.onEnterTask(enteredValue);
      taskInputRef.current!.value = "";
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input type='text' ref={taskInputRef} />
      <button>{props.loading ? 'Sending...' : 'Add Task'}</button>
    </form>
  );
};
