import axios from 'axios';
import { useState } from 'react';
import { Task } from '../../models/Task';

import Section from '../UI/Section/Section';
import TaskForm from './TaskForm';

interface Props {
  onAddTask(task: Task): void;
}

export default function NewTask(props: Props) {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const enterTaskHandler = async (taskText: string) => {
    setIsLoading(true);
    setError(undefined);
    try {
      let response = await axios.post("http://localhost:8080/api/tasks", { text: taskText });

      console.log(response.data);
      
      const createdTask: Task = response.data;

      props.onAddTask(createdTask);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

