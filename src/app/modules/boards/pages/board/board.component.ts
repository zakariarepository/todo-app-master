import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component';

import { ToDo, Column } from '@models/todo.model';
import {TodoCreateDialogComponent} from "@boards/components/todo-create-dialog/todo-create-dialog.component";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class BoardComponent {
  columns: Column[] = [
    {
      title: 'ToDo',
      todos: [],
    },
    {
      title: 'Doing',
      todos: [],
    },
    {
      title: 'Done',
      todos: [],
    },
  ];

  constructor(private dialog: Dialog, private http: HttpClient) {
    this.getAllStudent();
  }

  getAllStudent() {

    this.http.get("http://localhost:8000/tache/getAll")
      .subscribe((resultData: any)=>
      {
        resultData.data.forEach((element:ToDo) => {
          if(element._status=="ToDo") this.columns[0].todos.push(element)
          if(element._status=="Doing") this.columns[1].todos.push(element)
          if(element._status=="Done") this.columns[2].todos.push(element)
        });
        console.log(resultData);

      });
  }


  addColumn() {
    this.columns.push({
      title: 'New Column',
      todos: [],
    });
  }

  openDialog(todo: ToDo) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        todo: todo,
      },
    });
    dialogRef.closed.subscribe((output) => {
      if (output) {
        console.log(output);
      }
    });
  }

  //---------------------test create dialog-----------------------------
  openCreateDialog() {
    const dialogRef = this.dialog.open(TodoCreateDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        todo: null,
      },
    });
    dialogRef.closed.subscribe((output) => {
      if (output) {
        console.log(output);
      }
    });
  }


  //-------------------------when we drag and drop we execute this function------------------



  drop(event: CdkDragDrop<ToDo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.UpdateRecords(event.container.data[event.currentIndex],event.container.id);
      console.log(event.container.id);
    }
  }

  UpdateRecords(tache : ToDo, indexStatus : string)
  {
    var newStaus: string = '';
    if(indexStatus=="cdk-drop-list-0"){
      newStaus="ToDo";
    }
    else if(indexStatus=="cdk-drop-list-1"){
      newStaus="Doing";
    }else {
      newStaus="Done";
      console.log("task is done")
    }
    let bodyData = {
      "title" : tache.title,
      "description" : tache.description,
      "_status" : newStaus,

    };

    this.http.patch("http://localhost:8000/tache/update"+ "/"+tache._id,bodyData).subscribe((resultData: any)=>
    {
      console.log(resultData);

    });
  }
}
