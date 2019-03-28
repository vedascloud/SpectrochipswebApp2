import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import {UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry} from 'ngx-file-drop';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {User} from '../user';

@Component({
  selector: 'app-create-sequenceuser',
  templateUrl: './create-sequenceuser.component.html',
  styleUrls: ['./create-sequenceuser.component.css'],
  providers: [UserService]
})
export class CreateSequenceuserComponent  {
  // @Output() show_read_users_event = new EventEmitter();
  @Output() show_read_one_user_event = new EventEmitter();
  @Input() userID;
   @Input() username;
  form: FormGroup;
  public loading = false;
  public files: UploadFile[] = [];

  @ViewChild('fileInput') fileInput: ElementRef;
  
  //userName = localStorage.getItem('userName');
  // userID:string;
  user: User;
public paramsSub:any
  constructor(private fb: FormBuilder, private userService: UserService,private route:Router, private activeRoute:ActivatedRoute) {
    this.createForm();
  }


  createForm() {
    this.paramsSub= this.activeRoute.params.subscribe(params=>{
      this.userID = params['userID']
    })
    this.form = this.fb.group({
      avatar: ['', Validators.required]
    });
  }

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          this.form.get('avatar').setValue(file);
        });
      }
    }
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }

  private prepareSave(): any {
    const input = new FormData();
    input.append('userID', this.userID);
    input.append('jsonfile', this.form.get('avatar').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)
    this.userService.insertUserSequencefile(formModel)
      .subscribe(
        user => {
          // show an alert to tell the user if product was created or not
          console.log(user);
          if(user.result === 'error'){
            this.loading = false;
            setTimeout(() => {
              // FormData cannot be inspected (see "Key difference"), hence no need to log it here
              alert(user.message);
              this.loading = false;
            }, 0);
          } else {
            this.loading = false;
            setTimeout(() => {
              // FormData cannot be inspected (see "Key difference"), hence no need to log it here
              alert(user.message);
              this.loading = false;
            }, 0);
            // go back to list of users
            this.readoneUser();
          }
        },
        error => console.log(error)
      );

  }

  /*readUsers() {
    this.show_read_users_event.emit({ title: 'Testers List', username: this.username });
  }*/

  readoneUser(){
    console.log('rp comp readOneUser');
    this.loading = true;
    this.route.navigate([`oneuser/${this.userID}`])
    // tell the parent component (AppComponent)
    // this.show_read_one_user_event.emit({
    //   userID: this.userID,
    //   title: 'Tester Information',
    //   username: this.username
    // });
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

}
