import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, InputGroup } from 'react-bootstrap';
import { getTasks, getCategorys, getTags, updateTask, deleteTask } from "../services/api";
import { Category, Tag, Task as TaskType } from "../types";
import "../App.css";

const EditTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<TaskType | null>(null);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const taskData = await getTasks();
        const categoryData = await getCategorys();
        const tagData = await getTags();

        const foundTask = taskData.find((c) => c.id === id);

        if (foundTask) {
          setTask(foundTask);
        } else {
          console.error("Task not found");
        }
        setCategorys(categoryData);
        setTags(tagData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!task) return;

    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleTagsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!task) return;

    const options = e.target.options;
    const selectedTags: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedTags.push(options[i].value);
      }
    }
    setTask({ ...task, tags: selectedTags });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task && task.id) {
      await updateTask(task);
      navigate("/");
    }
  };

  const handleDelete = async () => {
    if (!task || !task.id) return;
    try {
      await deleteTask(task.id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2>Edit Task</h2>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
          <Form.Control
            type="text"
            name="title"
            value={task.title}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
          <Form.Control
            type="text"
            name="description"
            value={task.description}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Tags</InputGroup.Text>
          <Form.Select
            name="tags"
            value={task.tags}
            onChange={handleTagsChange}
            multiple
            required
          >
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </Form.Select>
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Category</InputGroup.Text>
          <Form.Select
            name="category"
            value={task.category}
            onChange={(e) => handleInputChange(e)}
            required
          >
            {categorys.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </InputGroup>

        <Button variant="success" type="submit" className="me-2">
          Save Changes
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Form>
    </Container>
  );
};

export default EditTask;
