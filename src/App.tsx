import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import NewTask from './components/NewTask/NewTask';
import Tasks from './components/Tasks/Tasks';
import { Task } from './models/Task';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      let loadedTasks: Task[] = []

      let response = await axios.get("http://localhost:8080/api/tasks");
      loadedTasks = response.data;
      

      setTasks(loadedTasks);

    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };


  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task: Task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={() => fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
