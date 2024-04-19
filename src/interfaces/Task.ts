export interface Task {
  id: number;
  title: string;
  detail: string;
  completed: boolean;
}

export interface UpdateTask {
  title: string;
  detail: string;
  completed: boolean;
}