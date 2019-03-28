import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user';
import { map } from 'rxjs/operators';

@Injectable()

// Service for users data.
export class UserService {

  // We need Http to talk to a remote server.
  constructor(private _http: Http) { }

  readPublic(): Observable<any> {
    return this._http
      .get("https://www.vedascloud.com/spectrochips/public/json")
      .pipe(map((res: Response) => res.json()));
  }
  // Get list of products from remote server.
  readUsers(): Observable<User[]> {
    //18.204.210.99
    return this._http
      .get("https://www.vedascloud.com/spectrochips/users")
      .pipe(map((res: Response) => res.json()));
  }
  readSpecificUser(userId: string): Observable<User[]> {
    //18.204.210.99
    return this._http
      .get("https://www.vedascloud.com/spectrochips/user/"+ userId)
      .pipe(map((res: Response) => res.json()));
  }

  // Send product data to remote server to create it.
  createUser(user): Observable<User> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(
      "https://www.vedascloud.com/spectrochips/user",
      user,
      options
    ).pipe(map((res: Response) => res.json()));
  }

  checkUser(user): Observable<User> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(
      "https://www.vedascloud.com/spectrochips/admin/login",
      user,
      options
    ).pipe(map((res: Response) => res.json()));
  }

  // Get a user details from remote server.
  readOneUser(userID): Observable<User> {
    return this._http
      .get("https://www.vedascloud.com/spectrochips/user/"+userID)
      .pipe(map((res: Response) => res.json()));
  }

  readJsonData(url): Observable<User> {
    console.log('url to fetch...',url);
    return this._http
      .get(url)
      .pipe(map((res: Response ) => res.json()));
  }

  // Send user data to remote server to update it.
  updateUser(user): Observable<User>{

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.put(
      "https://www.vedascloud.com/spectrochips/user",
      user,
      options
    ).pipe(map((res: Response) => res.json()));
  }

  // Send user ID to remote server to delete it.
  deleteUser(userID): Observable<User> {
    console.log('user id delete...',userID);
    return this._http
      .delete("https://www.vedascloud.com/spectrochips/user/"+userID)
      .pipe(map((res: Response) => res.json()));
  }

  downloadFile(url): Observable<any>{
    console.log(url);
    return this._http
      .get(url)
      .pipe(map((res: Response) => res.json()));
  }

  deleteTestfile(userID,url): Observable<User> {
    console.log('userID...', userID, url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http
      .post("https://www.vedascloud.com/spectrochips/test/json/delete", { userID: userID , url : url}, options)
      .pipe(map((res: Response) => res.json()));
  }

  deleteSeqfile(userID,url): Observable<User> {
    console.log('userID...', userID, url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http
      .post("https://www.vedascloud.com/spectrochips/sequence/json/delete", { userID: userID , url : url}, options)
      .pipe(map((res: Response) => res.json()));
  }

  deletePublicTestfile(url): Observable<User> {
    ///spectrochips/test/json/delete
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http
      .post("https://www.vedascloud.com/spectrochips/admin/test/delete", { url : url}, options)
      .pipe(map((res: Response) => res.json()));

  }

  deletePublicSequencefile(url): Observable<User> {
    ///spectrochips/test/json/delete
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http
      .post("https://www.vedascloud.com/spectrochips/admin/sequence/delete", { url : url}, options)
      .pipe(map((res: Response) => res.json()));

  }

  insertPublicTestfile(data): Observable<any> {
    console.log('form data...', data);
    let headers = new Headers();
    //headers.append('Accept', 'application/json');
    //headers.append('Content-Type', 'multipart/form-data;----WebKitFormBoundaryDtbT5UpPj83kllfw'); // application/x-www-form-urlencoded
    let options = new RequestOptions({ headers: headers });

    return this._http.post(
      'https://www.vedascloud.com/spectrochips/admin/json/test/upload', data, options
    ).pipe(map((res: Response) => res.json()));
  }

  insertUserTestfile(data) : Observable<any> {
    ///spectrochips/user/json/test/upload
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });

    return this._http.post(
      'https://www.vedascloud.com/spectrochips/user/json/test/upload', data, options
    ).pipe(map((res: Response) => res.json()));

  }

  insertUserSequencefile(data) : Observable<any> {
    ///spectrochips/user/json/test/upload
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });

    return this._http.post(
      'https://www.vedascloud.com/spectrochips/user/json/sequence/upload', data, options
    ).pipe(map((res: Response) => res.json()));

  }

  updatePublicTestfile(data): Observable<any> {
    console.log('form data...', data);
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this._http.post(
      'https://www.vedascloud.com/spectrochips/admin/test/update', data, options
    ).pipe(map((res: Response) => res.json()));
  }

  updatePublicSequencefile(data): Observable<any> {
    console.log('form data...', data);
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this._http.post(
      'https://www.vedascloud.com/spectrochips/admin/sequence/update', data, options
    ).pipe(map((res: Response) => res.json()));
  }

  ///spectrochips/admin/json/sequence/upload
  insertPublicSequencefile(data): Observable<any> {
    console.log('form data...', data);
    let headers = new Headers();
    //headers.append('Accept', 'application/json');
    //headers.append('Content-Type', 'multipart/form-data;----WebKitFormBoundaryDtbT5UpPj83kllfw'); // application/x-www-form-urlencoded
    let options = new RequestOptions({ headers: headers });

    return this._http.post(
      'https://www.vedascloud.com/spectrochips/admin/json/sequence/upload', data, options
    ).pipe(map((res: Response) => res.json()));
  }
}
