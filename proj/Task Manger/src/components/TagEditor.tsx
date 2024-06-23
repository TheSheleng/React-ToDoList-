import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Button, Form, Container, InputGroup, FormControl } from 'react-bootstrap';
import { getTags, addTag, updateTag, deleteTag } from "../services/api";
import { Tag } from "../types";
import "../App.css";

const TagEditor: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState<string>("");
  const [editTagId, setEditTagId] = useState<string | null>(null);
  const [editTagName, setEditTagName] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTags();
      setTags(result);
    };
    fetchData();
  }, []);

  const handleAddTag = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("")

    if(tags.some((tag) => tag.name === newTagName)) {
      setError("Duplicate values")
      return
    }

    const newTag = await addTag({ name: newTagName });
    setTags([...tags, newTag]);
    setNewTagName("");
  };

  const handleEditTag = (tag: Tag) => {
    setEditTagId(tag.id);
    setEditTagName(tag.name);
  };

  const handleUpdateTag = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (editTagId !== null) {
      const updatedTag = await updateTag(editTagId, { name: editTagName });
      setTags(tags.map((tag) => (tag.id === editTagId ? updatedTag : tag)));
      setEditTagId(null);
      setEditTagName("");
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    await deleteTag(tagId);
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  return (
    <Container>
      <h2>Edit Tags</h2>

      <ul className="list-unstyled">
        {tags.map((tag) => (
          <li key={tag.id}>
            {editTagId === tag.id ? (

              <Form onSubmit={handleUpdateTag}>
                <InputGroup className="mb-3">
                  <Form.Control
                   type="text"
                   value={editTagName}
                   onChange={(e: ChangeEvent<HTMLInputElement>) =>
                     setEditTagName(e.target.value)
                   }
                   maxLength={10}
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
                  value={tag.name}
                  readOnly
                />
                <Button 
                  onClick={() => handleEditTag(tag)}
                  variant="secondary"
                  type="button"
                >
                  Edit
                </Button>
                <Button
                    onClick={() => handleDeleteTag(tag.id)}
                    variant="danger"
                >
                  Delete
                </Button>
              </InputGroup>
            )}
          </li>
        ))}
      </ul> 

      <Form onSubmit={handleAddTag} className="form-add">
        <span className="error">{error}</span>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            value={newTagName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewTagName(e.target.value)
            }
            placeholder="New Tag Name"
            maxLength={10}
            required
          />
          <Button type="submit" variant="primary">
            Add Tag
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
};

export default TagEditor;