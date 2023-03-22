import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Input() groupId?: number;
  @Input() status?: number;
  form: FormGroup = this.fb.group({});
  submitted = false;
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private taskService: TaskService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: [this.status?.toString() ?? null, Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    let task = this.form.getRawValue() as Task;
    task.groupId = this.groupId;
    this.taskService.addTask(task).subscribe(
      (res) => {
        this.createNotification('success', '', 'Task added successfully');
        this.submitted = false;
        this.modal.triggerOk();
        this.modal.destroy();
      },
      (error) => {
        this.createNotification('error', '', 'Cannot add task server is down');
        this.submitted = false;
      }
    );
  }

  createNotification(type: string, title: string, content: string): void {
    this.notification.create(type, title, content);
  }
}
