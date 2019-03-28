import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-delete-sequence',
  templateUrl: './delete-sequence.component.html',
  styleUrls: ['./delete-sequence.component.css'],
  providers: [UserService]
})
export class DeleteSequenceComponent {
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
  //deletePublicSequencefile
  constructor(private userService: UserService, private route:Router, private activatedRoute:ActivatedRoute){}

  deleteSequence(){
    this.loading = true;
    this.userService.deletePublicSequencefile(this.selectedFileTypeURL)
      .subscribe(
        user => {
          this.loading = false;
         
          this.readUsers();
        },
        error => {console.log(error); this.loading = false; }
      );
  }

  // user clicks the 'read testers' button
  readUsers(){
   
    this.route.navigateByUrl('users')
  }


  getFileDetails(files){
    if(files && Array.isArray(files)){
      files.forEach((val) => {
        if(val.sequenceFiles && Array.isArray(val.sequenceFiles)) {
          let index = val.sequenceFiles.findIndex((obj) =>{
            return obj._id === this.selectedFileId;
          })
          if(index !== -1){
            this.selectedFileTypeURL = val.sequenceFiles[index].url;
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
