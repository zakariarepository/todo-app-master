import { Component, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import {
  faClose,
  faCheckToSlot,
  faBars,
  faUser,
  faTag,
  faCheckSquare,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { ToDo } from '@models/todo.model';
import {HttpClient} from "@angular/common/http";

interface InputData {
  todo: ToDo;
}

interface OutputData {
  rta: boolean;
}

@Component({
  selector: 'app-todo-create-dialog',
  templateUrl: './todo-create-dialog.component.html',
})
export class TodoCreateDialogComponent {
  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  titlee: string ="";
  description: string ="";
  _status: string ="ToDo";


  constructor(
    private dialogRef: DialogRef<OutputData>,
    private http: HttpClient,
  ) {}

  close() {
    this.dialogRef.close();
  }

  registerTache(tache : ToDo)
  {

    let bodyData = {
      "title" : tache.title,
      "description" : tache.description,
      "_status" : tache._status,
    };
    this.http.post("http://localhost:8000/tache/create",bodyData).subscribe((resultData: any)=>
    {
      console.log(resultData);
      //this.getAllEmployee();
      tache.title = '';
      tache.description = '';
      tache._status  = '';
    });
  }

  submitForm() {
    const Todo = {
      _id: '',
      title: this.titlee,
      description: this.description,
      _status: this._status
    };

    // Call a function and pass the userObject as a parameter
    this.registerTache(Todo);
    this.dialogRef.close();
  }
}
