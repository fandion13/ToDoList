import { Component, DoCheck } from '@angular/core';
import { TaskList } from '../../model/task-list';

declare var require;
const Swal = require('sweetalert2')

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  //localStorage.getItem("list") comando usado para popular o taskList se houver dados na list em cash, senão popula com uma lista vazia
  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  constructor() { }

  ngDoCheck(): void {
    this.setLocalStorage()
  }

  public deleteItemTaskList(event: number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskList.splice(event, 1);
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        )
      }
    })
  }

  public deleteAllTaskList(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskList = [];
        Swal.fire(
          'Deleted!',
          'All your tasks has been deleted.',
          'success'
        )
      }
    })
  }

  public setEmitTaskList(event: string){
    this.taskList.push({task: event, checked: false})
  }

  public validationInput(event: string, index: number){
    if(!event.length){
      Swal.fire({
        title: 'Empty task!',
        text: "Do you wish to delete?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.taskList.splice(index, 1);
          Swal.fire(
            'Deleted!',
            'Your task has been deleted.',
            'success'
          )
        }
      })
    }
  }
  
  public setLocalStorage(){
    if(this.taskList){
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));

      //comando usado para criar uma list em cash que vai receber dados da taskList
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }
}
