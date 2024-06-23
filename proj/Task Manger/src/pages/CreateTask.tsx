import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, InputGroup } from 'react-bootstrap';
import { getCategorys, getTags, addTask } from "../services/api";
import { Category, Tag, Task as TaskType } from "../types";
import "../App.css";

const CreateTask: React.FC = () => {
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState<Omit<TaskType, "id">>({
    title: "",
    description: "",
    tags: [],
    category: "",
  });
  
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const categoryData = await getCategorys();
      const tagData = await getTags();
      setCategorys(categoryData);
      setTags(tagData);
      if (categoryData.length > 0) {
        setNewTask((prevTask) => ({ ...prevTask, category: categoryData[0].id }));
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNewTask({ ...newTask, [name]: value });
  };

  const handleTagsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedTags: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedTags.push(options[i].value);
      }
    }
    setNewTask({ ...newTask, tags: selectedTags });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addTask(newTask);
    navigate("/");
  };

  return (
    <Container>
      <h2>Create Task</h2>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
          <Form.Control
            type="text"
            name="title"
            value={newTask.title}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
          <Form.Control
            type="text"
            name="description"
            value={newTask.description}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Tags</InputGroup.Text>
          <Form.Select
            name="tags"
            value={newTask.tags}
            onChange={(e) => handleTagsChange(e)}
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
            value={newTask.category}
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

        <Button variant="success" type="submit">
          Create Task
        </Button>
      </Form>
    </Container>
  );
};

export default CreateTask;
