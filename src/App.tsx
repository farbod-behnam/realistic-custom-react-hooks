import React, { useEffect, useState } from 'react';
import './App.css';
import NewTask from './components/NewTask/NewTask';
import Tasks from './components/Tasks/Tasks';
import useAxios from './hooks/use-axios';
import { Task } from './models/Task';

function App() {

  const [tasks, setTasks] = useState<Task[]>([]);
  // const [data, error, isLoading] = useAxiosGet<Task[]>("/api/task");
  const [data, error, isLoading, refetch] = useAxios<Task[]>({
    url: "http://localhost:8080/api/tasks",
    method: "GET"
  });
  // const [data, error, isLoading, axiosSendRequest] = useAxiosFunction<Task[]>();

  const fetchData = () => {
    refetch();
  }


  useEffect(() => {

    if (data)
      setTasks(data);

  }, [data]);


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
        onFetch={fetchData}
      />
    </React.Fragment>
  );
}

export default App;
