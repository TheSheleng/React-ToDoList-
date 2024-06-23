export interface Task {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}