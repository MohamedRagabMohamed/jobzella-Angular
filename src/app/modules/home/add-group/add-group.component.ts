import { GroupService } from 'src/app/services/group.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css'],
})
export class AddGroupComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  submitted = false;
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private groupService: GroupService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    let group = this.form.getRawValue() as Group;
    this.groupService.addGroup(group).subscribe(
      (res) => {
        this.createNotification('success', '', 'Group added successfully');
        this.submitted = false;
        this.modal.triggerOk();
        this.modal.destroy();
      },
      (error) => {
        this.createNotification('error', '', 'Cannot add Group server is down');
        this.submitted = false;
      }
    );
  }

  createNotification(type: string, title: string, content: string): void {
    this.notification.create(type, title, content);
  }
}
