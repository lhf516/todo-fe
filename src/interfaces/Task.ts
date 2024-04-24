import { UUID } from "crypto";

export interface Task extends UpdateTask {
  id?: UUID;
}

export interface UpdateTask {
  title: string;
  detail: string;
  completed: boolean;
  createdAt?: Date | null;
  deletedAt?: Date | null;
}
