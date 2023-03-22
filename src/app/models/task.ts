export class Task {
  id?: number;
  name?: string;
  description?: string;
  statusId?: number;
  groupId?: number;
  files?: string[]; // TODO: add fiels for task
  people?: string[]; // TODO: add people who contribute for task
}
