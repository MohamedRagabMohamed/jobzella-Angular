import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AuthService } from 'src/app/services/auth/authentication-service';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/models/group';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { Constants } from 'src/app/constants/constants';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AddTaskComponent } from '../add-task/add-task.component';
import { AddGroupComponent } from '../add-group/add-group.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  image = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
  groupClass = 'activeGroup';
  currentGroupId = -1;
  statusList = Constants.Status;
  loading = false;
  todoList: Task[] = [
    { name: 'Get to work', description: 'asuyhfajkjfkasj', statusId: 0 },
    { name: 'Pick up groceries', description: 'asuyhfajkjfkasj', statusId: 0 },
    { name: 'Go home', description: 'asuyhfajkjfkasj', statusId: 0 },
    { name: 'Fall asleep', description: 'asuyhfajkjfkasj', statusId: 0 },
  ];
  onProgressList: Task[] = [
    {
      name: 'Get to muzeum',
      description: 'asu jhbkj jhajkd hjjkasjh',
      statusId: 1,
    },
    {
      name: 'Pick up fruits',
      description: 'asu jhbkj jhajkd hjjkasjh',
      statusId: 1,
    },
    {
      name: 'Go cinma',
      description: 'asu jhbkj jhajkd hjjkasjh',
      statusId: 1,
    },
    {
      name: 'feed a baby',
      description: 'asu jhbkj jhajkd hjjkasjh',
      statusId: 1,
    },
  ];
  doneList: Task[] = [
    {
      name: 'Get up',
      description: 'p ookhg qlkd l;,,z epqwpokwlq',
      statusId: 1,
    },
    {
      name: 'Brush teeth',
      description: 'p ookhg qlkd l;,,z epqwpokwlq',
      statusId: 1,
    },
    {
      name: 'Take a shower',
      description: 'p ookhg qlkd l;,,z epqwpokwlq',
      statusId: 1,
    },
    {
      name: 'Check e-mail',
      description: 'p ookhg qlkd l;,,z epqwpokwlq',
      statusId: 1,
    },
    {
      name: 'Walk dog',
      description: 'p ookhg qlkd l;,,z epqwpokwlq',
      statusId: 1,
    },
  ];
  groupList: Group[] = [];
  numberOfAllTasks = 0;
  constructor(
    private authService: AuthService,
    private router: Router,
    private groupService: GroupService,
    private taskService: TaskService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups() {
    this.groupService.getGroupsByUserId().subscribe(
      (res) => {
        this.groupList = res;
        this.groupList = this.groupList.map((group) => {
          return { ...group, image: this.image, groupClass: '' };
        });
        if (this.groupList.length > 0) {
          this.getCurrentGroupTasks(this.groupList[0].id!);
        }
      },
      (error) => {}
    );
  }

  updateTotalNumberOfTasks() {
    this.numberOfAllTasks =
      this.todoList.length + this.onProgressList.length + this.doneList.length;
  }

  getCurrentGroupTasks(groupId: number) {
    this.loading = true;
    this.currentGroupId = groupId;
    this.updateSelectedGroup(groupId);
    this.resetLists();
    this.getTasks(groupId);
  }

  updateSelectedGroup(groupId: number) {
    this.groupList = this.groupList.map((group) => {
      group.groupClass = group.id === groupId ? this.groupClass : '';
      return group;
    });
  }

  getTasks(groupId: number) {
    this.taskService.getTasksByGroupID(groupId).subscribe(
      (res) => {
        console.log(res);
        if (res?.length > 0) {
          this.updateStatusLists(res);
        }
        this.updateTotalNumberOfTasks();
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  updateStatusLists(res: Task[]) {
    res.forEach((task) => {
      if (task.statusId === this.statusList.todo) {
        this.todoList.push(task);
      } else if (task.statusId === this.statusList.onProgress) {
        this.onProgressList.push(task);
      } else if (task.statusId === this.statusList.done) {
        this.doneList.push(task);
      }
    });
  }

  resetLists() {
    this.todoList = [];
    this.onProgressList = [];
    this.doneList = [];
  }
  showModelAddTask(selectedStatus: number) {
    this.modalService.create({
      nzTitle: 'Add Task',
      nzMaskStyle: {},
      nzContent: AddTaskComponent,
      nzCentered: true,
      nzComponentParams: {
        groupId: this.currentGroupId,
        status: selectedStatus > 0 ? selectedStatus : undefined,
      },
      nzOnOk: () => {
        this, this.getCurrentGroupTasks(this.currentGroupId);
      },
    });
  }

  showModelAddGroup() {
    this.modalService.create({
      nzTitle: 'Add Group',
      nzMaskStyle: {},
      nzContent: AddGroupComponent,
      nzCentered: true,
      nzOnOk: () => {
        this, this.loadGroups();
      },
    });
  }
  drop(event: CdkDragDrop<any>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data, // todo: should use this array to get moved task and update his status
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  logout() {
    this.router.navigate(['/auth/login']);
    this.authService.logout();
  }
}
