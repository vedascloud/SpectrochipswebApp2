import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-delete-test',
  templateUrl: './delete-test.component.html',
  styleUrls: ['./delete-test.component.css'],
  providers: [UserService]
})
export class DeleteTestComponent {

  @Output() show_read_users_event = new EventEmitter();

  // @Input enable getting the product_id from parent component (AppComponent)

  @Input() username;
  @Input() url;
  public loading = false;
  
  jsdata: string;
  files: any[];
  selectedFileId: string= '';
  selectedFileTypeURL: string= '';
  private paramsSub:any;
 
  constructor(private userService: UserService, private route:Router, private activatedRoute:ActivatedRoute){}

  deleteTest(){
    this.loading = true;
    // delete data from database
    this.userService.deletePublicTestfile(this.selectedFileTypeURL)
      .subscribe(
        user => {
          this.loading = false;
          // show an alert to tell the user if user was deleted or not
          console.log(user);

          // go back to list of products
          this.readUsers();
        },
        error => {console.log(error); this.loading = false; }
      );
  }

  // user clicks the 'read testers' button
  readUsers(){
    this.show_read_users_event.emit({ title: "Read Testers", username:this.username });
    this.route.navigateByUrl('users');
  }

  //copying from here
  
  getFileDetails(files){
    if(files && Array.isArray(files)){
      files.forEach((val) => {
        if(val.testFiles && Array.isArray(val.testFiles)) {
          let index = val.testFiles.findIndex((obj) =>{
            return obj._id === this.selectedFileId;
          })
          if(index !== -1){
            this.selectedFileTypeURL = val.testFiles[index].url;
          }

        }
      })
    }
  }
  getAllJsonData(){
    this.loading = true;
    this.userService.readUsers()
      .subscribe(users => {
          this.userService.readPublic()
          .subscribe(files => {
              this.loading =false;
              this.files = files['files'];
              this.getFileDetails(this.files);
            },error => {
              this.loading = false;
            }
          );
        }, error => {
      this.loading = false;
      }
      );
  }

  // call the record when 'product_id' was changed
  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(params =>{
      this.selectedFileId = params['id']
    });
    this.getAllJsonData() 
  }

}
