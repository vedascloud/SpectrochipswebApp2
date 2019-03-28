import { Component, Input, Output, EventEmitter,ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import {UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry} from "ngx-file-drop";
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styleUrls: ['./update-test.component.css'],
  providers: [UserService]
})
export class UpdateTestComponent {
  @Output() show_read_users_event = new EventEmitter();
  @Input() username;
  @Input() url;

  form: FormGroup;
  public loading = false;

  @ViewChild('fileInput') fileInput: ElementRef;


  constructor(private fb: FormBuilder, private userService: UserService, private route:Router,private activeRoute: ActivatedRoute) {
    this.createForm();
  }
  
  createForm() {
    this.form = this.fb.group({
      avatar: ["",Validators.required]
    });
  }

  public files: UploadFile[] = [];

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
      let file = event.target.files[0];
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
    let input = new FormData();
    input.append('username', this.username);
    input.append('jsonfile', this.form.get('avatar').value);
    input.append('url', this.url);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)
    this.userService.updatePublicTestfile(formModel)
      .subscribe(
        user => {
          // show an alert to tell the user if product was created or not
          console.log(user);
          this.loading = false;
          if(user.result == 'error'){
            setTimeout(() => {
              // FormData cannot be inspected (see "Key difference"), hence no need to log it here
              alert(user.message);
              this.loading = false;
            }, 0);
          }else{
            this.loading = false;
            setTimeout(() => {
              // FormData cannot be inspected (see "Key difference"), hence no need to log it here
              alert(user.message);
              this.loading = false;
            }, 0);
            // go back to list of users
            this.readUsers();
          }
        },
        error => {console.log(error); this.loading = false; }
      );
    setTimeout(() => {
      // FormData cannot be inspected (see "Key difference"), hence no need to log it here
      alert('done!');
      this.loading = false;
    }, 1000);
  }
  readUsers() {
    this.show_read_users_event.emit({ title: "Testers List", username:this.username });
    this.route.navigateByUrl('users');
  }
  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
}
