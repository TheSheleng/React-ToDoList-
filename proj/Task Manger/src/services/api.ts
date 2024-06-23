import axios from "axios";
import { Task, Category, Tag } from "../types";

const API_URL = "http://localhost:3000";

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(`${API_URL}/tasks`);
  return response.data;
};

export const getCategorys = async (): Promise<Category[]> => {
  const response = await axios.get<Category[]>(`${API_URL}/categorys`);
  return response.data;
};

export const getTags = async (): Promise<Tag[]> => {
  const response = await axios.get<Tag[]>(`${API_URL}/tags`);
  return response.data;
};

export const addCategory = async (category: Omit<Category, "id">): Promise<Category> => {
  const response = await axios.post<Category>(`${API_URL}/categorys`, category);
  return response.data;
};

export const updateCategory = async (
  id: string,
  category: Omit<Category, "id">
): Promise<Category> => {
  const response = await axios.put<Category>(`${API_URL}/categorys/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/categorys/${id}`);
};

export const addTag = async (tag: {name:string}): Promise<Tag> => {
  const response = await axios.post<Tag>(`${API_URL}/tags`, tag);
  return response.data;
};

export const updateTag = async (
  id: string,
  tag: Omit<Tag, "id">
): Promise<Tag> => {
  const response = await axios.put<Tag>(`${API_URL}/tags/${id}`, tag);
  return response.data;
};

export const deleteTag = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/tags/${id}`);
};

export const updateTask = async (task: Task): Promise<void> => {
  await axios.put(`${API_URL}/tasks/${task.id}`, task);
};

export const addTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const response = await axios.post<Task>(`${API_URL}/tasks`, task);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};