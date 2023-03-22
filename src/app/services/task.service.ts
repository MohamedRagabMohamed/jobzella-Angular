import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(public httpServ: HttpService) {}

  getTasksByGroupID(groupId: number): Observable<Task[]> {
    return this.httpServ._getCall<Task[]>(
      `${environment.apiUrl}/task/groupTasks/${groupId}`
    );
  }

  addTask(record: Task): Observable<any> {
    return this.httpServ._postCall<any>(`${environment.apiUrl}/task`, record);
  }

  editRecord(record: Task): Observable<any> {
    return this.httpServ._putCall<any>(`${environment.apiUrl}/task`, record);
  }

  deleteRecord(id: number) {
    return this.httpServ._deleteCall<any>(`${environment.apiUrl}/task/${id}`);
  }
}
