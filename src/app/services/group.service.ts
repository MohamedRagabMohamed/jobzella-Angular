import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(public httpServ: HttpService) {}

  getGroupsByUserId(): Observable<Group[]> {
    return this.httpServ._getCall<Group[]>(
      `${environment.apiUrl}/group/userGroups`
    );
  }

  addGroup(record: Group): Observable<any> {
    return this.httpServ._postCall<any>(`${environment.apiUrl}/group`, record);
  }

  editRecord(record: Group): Observable<any> {
    return this.httpServ._putCall<any>(`${environment.apiUrl}/group`, record);
  }

  deleteRecord(id: number) {
    return this.httpServ._deleteCall<any>(`${environment.apiUrl}/group/${id}`);
  }
}
