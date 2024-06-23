import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Task as TaskType, Tag } from "../types";
import { Card as BootstrapCard, Badge } from 'react-bootstrap';
import { getTags } from "../services/api";
import "../App.css";

const Task: React.FC<{ task: TaskType }> = ({ task }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const tagData = await getTags();
      setTags(tagData);
    };
    fetchData();
  }, []);

  const handleTaskClick = () => {
    navigate(`/edit-task/${task.id}`);
  };
  
  return (
    <BootstrapCard onClick={handleTaskClick} className="mb-3">
      <BootstrapCard.Header>
        <h3>{task.title}</h3>
        <div className="mb-2">
          {task.tags.map((tag) => (
            <Badge key={tag} bg="success" className="me-1">
              
              {tags.find(t => t.id === tag)?.name}
            </Badge>
          ))}
        </div>
      </BootstrapCard.Header>
      <BootstrapCard.Body>
        <BootstrapCard.Text>{task.description}</BootstrapCard.Text>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Task;
