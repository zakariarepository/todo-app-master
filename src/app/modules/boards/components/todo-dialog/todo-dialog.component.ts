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
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
})
export class TodoDialogComponent {
  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  todo: ToDo;

  constructor(
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData,
    private http: HttpClient,
  ) {
    this.todo = data.todo;
  }

  close() {
    this.submitForm();
    this.dialogRef.close();
  }

  DeleteTache() {
    this.http.delete("http://localhost:8000/tache/delete"+ "/"+ this.todo._id).subscribe((resultData: any)=>
    {
      console.log(resultData);
      this.dialogRef.close();

    });
  }
  //-----------------------
  UpdateRecords(tache : ToDo)
  {
    let bodyData = {
      "title" : tache.title,
      "description" : tache.description,
      "_status" : tache._status,

    };

    this.http.patch("http://localhost:8000/tache/update"+ "/"+this.todo._id,bodyData).subscribe((resultData: any)=>
    {
      console.log(resultData);

    });
  }

//---------------------------------
  submitForm() {
    const Todo = {
      _id:'',
      title: this.todo.title,
      description: this.todo.description,
      _status: this.todo._status
    };

    // Call a function and pass the userObject as a parameter
    this.UpdateRecords(Todo);

  }
}
