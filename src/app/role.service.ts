import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Role } from './role';

@Injectable()

// Service for roles data.
export class RoleService {

  // We need Http to talk to a remote server.
  constructor(private _http: Http) { }

  // Get list of categories from database via api.
  readRoles(): Observable<Role[]>{
    return this._http
      .get("https://www.vedascloud.com/users/roles")
      .pipe(map((res: Response) => res.json()));
  }

}

