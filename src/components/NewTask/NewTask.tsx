import { useEffect, useState } from 'react';
import useAxiosFunction from '../../hooks/use-axios-function';
import { Task } from '../../models/Task';

import Section from '../UI/Section/Section';
import TaskForm from './TaskForm';

interface Props {
  onAddTask(task: Task): void;
}

export default function NewTask(props: Props) {

  const [createdTask, error, isLoading, axiosSendRequest] = useAxiosFunction<Task>();

  const enterTaskHandler = async (text: string) => {

    if (text !== undefined && text.trim().length > 0) {

      axiosSendRequest({
        url: "http://localhost:8080/api/tasks",
        method: "POST",
        data: { id: "", text: text }
      });

    }

  };


  useEffect(() => {

    if (createdTask) {
      props.onAddTask(createdTask);
    }

  }, [createdTask])

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

