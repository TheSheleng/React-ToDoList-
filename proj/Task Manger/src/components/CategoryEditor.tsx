import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button, Form, Container, InputGroup, FormControl } from 'react-bootstrap';
import { getTasks, deleteTask, getCategorys, addCategory, updateCategory, deleteCategory } from "../services/api";
import { Category } from "../types";
import "../App.css";

const CategoryEditor: React.FC = () => {
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCategorys = async () => {
      const categoryData = await getCategorys();
      setCategorys(categoryData);
    };
    fetchCategorys();
  }, []);

  const handleAddCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("")
    if(categorys.some((tag) => tag.name === newCategoryName)) {
      setError("Duplicate Values")
      return 
    }
    const newCategory = await addCategory({ name: newCategoryName });
    setCategorys([...categorys, newCategory]);
    setNewCategoryName("");
  };

  const handleEditCategory = (category: Category) => {
    setEditCategoryId(category.id);
    setEditCategoryName(category.name);
  };

  const handleUpdateCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editCategoryId !== null) {
      const updatedCategory = await updateCategory(editCategoryId, {
        name: editCategoryName,
      });
      setCategorys(
        categorys.map((category) => (category.id === editCategoryId ? updatedCategory : category))
      );
      setEditCategoryId(null);
      setEditCategoryName("");
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    (await getTasks()).forEach(e => {
      deleteTask(e.id);
    });

    await deleteCategory(categoryId);
    setCategorys(categorys.filter((category) => category.id !== categoryId));
  };

  return (
    <Container>
      <h2>Edit Categorys</h2>

      <ul className="list-unstyled">
        {categorys.map((category) => (
          <li key={category.id}>
            {editCategoryId === category.id ? (
              <Form onSubmit={handleUpdateCategory}>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    value={editCategoryName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEditCategoryName(e.target.value)
                    }
                    required
                  />
                  <Button type="submit" variant="success">
                    Update
                  </Button>
                </InputGroup>
              </Form>
            ) : (
              <InputGroup className="mb-3">
                <FormControl
                  value={category.name}
                  readOnly
                />
                <Button 
                  onClick={() => handleEditCategory(category)}
                  variant="secondary"
                  type="button"
                >
                  Edit
                </Button>
                <Button
                    onClick={() => handleDeleteCategory(category.id)}
                    variant="danger"
                >
                  Delete
                </Button>
              </InputGroup>
            )}
          </li>
        ))}
      </ul>
      
      <Form onSubmit={handleAddCategory} className="form-add">
        <span className="error">{error}</span>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            value={newCategoryName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewCategoryName(e.target.value)
            }
            placeholder="New Category Name"
            maxLength={40}
            required
          />
          <Button type="submit" variant="primary">
            Add Category
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
};

export default CategoryEditor;
