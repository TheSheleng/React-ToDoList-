import { useEffect, useState } from "react";
import Task from "./Task";
import { Container, Row, Col } from 'react-bootstrap';
import { getTasks, getCategorys } from "../services/api";
import { Task as TaskType, Category } from "../types";
import "../App.css";

const TaskList = ({ searchTerm }: { searchTerm: string }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [categorys, setCategorys] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const taskData = await getTasks();
      const categoryData = await getCategorys();
      setTasks(taskData);
      setCategorys(categoryData);
    };
    fetchData();
  }, []);

  let formatString = (str: string) => str.toLowerCase().trim().replace(/\s+/g, ' ');
  let formattedSearchTerm = formatString(searchTerm);
  const filteredTasks = tasks.filter(
    task => formatString(task.title).includes(formattedSearchTerm)
  );

  const categoryedTasks = categorys.map((category) => {
    return {
      category: category.name,
      tasks: filteredTasks.filter((task) => task.category === category.id),
    };
  });

  if(!categoryedTasks) return null

  return (
    <Container>
      {categoryedTasks.map(({ category, tasks }) => {
        
        if (tasks.length === 0) return null;
        
        return (
          <div key={category}>
            <h3>{category}</h3>
            <Row xs={1} md={3} className="g-4">
              {tasks.map((task) => (
                <Col key={task.id}>
                  <Task task={task} />
                </Col>
              ))}
            </Row>
          </div>
        );
      })}
    </Container>
  );
};

export default TaskList;