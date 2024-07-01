export interface ToDo {
  _id: string;
  title: string;

  description: string;

  _status: string;

}

export interface Column {
  title: string;
  todos: ToDo[];
}
