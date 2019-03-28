import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { Observable} from 'rxjs';
import {User} from '../user';
import {Role} from "../role";
import {Router , ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-read-files',
  templateUrl: './read-files.component.html',
  styleUrls: ['./read-files.component.css'],
  providers:[UserService]
})
export class ReadFilesComponent implements OnInit {


  /*
      @Output will tell the parent component (AppComponent)
      that an event has happened (via .emit(), see readProducts() method below)
  */
  @Output() show_read_users_event = new EventEmitter();
  @Output() show_read_files_event = new EventEmitter();
  @Input() username;
  // @Input means it will accept value from parent component (AppComponent)
  @Input() url;
  public loading = false;
  private userID:string;
  // initialize product service
  constructor(private userService: UserService, private route:Router, private activeCRouter:ActivatedRoute) {}
  user: User;
  jsdata: string;
  files: any[];
  selectedFileId: string= '';
  selectedFileType: string= '';
  private paramsSub:any;
  // user clicks the 'read products' button
  readUsers() {
    this.show_read_users_event.emit({ title: "Testers List", username:this.username });
    this.route.navigateByUrl('users');
  }
  getSelectedFileDetails(obj){
    if(obj && obj.url){
    this.loading = true;
    this.userService.readJsonData(obj.url)
    .subscribe(jsdata => {this.jsdata = JSON.stringify(jsdata,undefined,2), this.loading = false; },error => {
      this.loading = false;
      this.jsdata = 'Not a Valid JSON Data';
    });
  
    }
  }
  getFileDetailsForSpecificUser(files){
    if(files){
        if(files[this.selectedFileType] && Array.isArray(files[this.selectedFileType])) {
          let index = files[this.selectedFileType].findIndex((obj) =>{
            return obj._id === this.selectedFileId;

          })
          if(index !== -1){
            this.getSelectedFileDetails(files[this.selectedFileType][index]);
          }
        }
    }
  }
  getFileDetails(files){
    if(files && Array.isArray(files)){
      files.forEach((val) => {
        if(val[this.selectedFileType] && Array.isArray(val[this.selectedFileType])) {
          let index = val[this.selectedFileType].findIndex((obj) =>{
            return obj._id === this.selectedFileId;

          })
          if(index !== -1){
            this.getSelectedFileDetails(val[this.selectedFileType][index]);
          }

        }
      })
    }
  }
  getAllJsonData(){
    this.loading = true;
    
    if(!this.userID){
          this.userService.readPublic()
          .subscribe(files => {
              this.loading =false;
              this.files = files['files'];
              this.getFileDetails(this.files);
            },error => {
              this.loading = false;
            }
          );
        
    }else{
      this.userService.readSpecificUser(this.userID).subscribe(files => {
              this.loading =false;
              // this.files = files['files'];
              this.getFileDetailsForSpecificUser(files);
            },error => {
              this.loading = false;
            }
          );
    }
   
  }

  // call the record when 'product_id' was changed
  ngOnInit() {
    this.paramsSub = this.activeCRouter.params.subscribe(params =>{
      this.selectedFileId = params['id']
      this.selectedFileType = params['type'];
      this.userID = params['userID'];
    });
    this.getAllJsonData() 
  }
}
