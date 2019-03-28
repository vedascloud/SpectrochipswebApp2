import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit, Input, Output, EventEmitter , Inject} from '@angular/core';
import { Observable} from 'rxjs';
import { User } from '../user';
import {UserService} from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-read-users',
  templateUrl: './read-users.component.html',
  styleUrls: ['./read-users.component.css'],
  providers: [UserService]
})

export class ReadUsersComponent implements OnInit {
  /*
      * Needed to notify the 'consumer of this component', which is the 'AppComponent',
        that an 'event' happened in this component.
  */

  @Output() show_user_login_event = new EventEmitter();
  @Output() show_create_user_event = new EventEmitter();
  @Output() show_read_one_user_event=new EventEmitter();
  @Output() show_update_user_event=new EventEmitter();
  @Output() show_delete_user_event=new EventEmitter();
  @Output() show_user_files_event=new EventEmitter();
  @Output() show_read_files_event = new EventEmitter();
  @Output() show_create_test_event = new EventEmitter();
  @Output() show_create_sequence_event = new EventEmitter();
  @Output() show_update_test_event = new EventEmitter();
  @Output() show_update_sequence_event = new EventEmitter();
  @Output() show_delete_test_event = new EventEmitter();
  @Output() show_delete_sequence_event = new EventEmitter();
  @Output() show_create_testuser_event = new EventEmitter();

  @Input() username;
  // store list of users
  users: User[];
  files: any[];
  jsdata:string;
  public loading = false;
  // initialize productService to retrieve list products in the ngOnInit()
  constructor(@Inject(WINDOW) private window: Window, private userService: UserService, private route : Router ) {}

  // methods that we will use later
  // when user clicks the 'create' button
  createUser() {
    this.route.navigateByUrl('create-users');
    // tell the parent component (AppComponent)
    this.show_create_user_event.emit({
      title: "Create Tester",
      username:this.username
      
    });
  }

  createTest(){
    console.log('username passing', this.username);
    this.show_create_test_event.emit({title:"Create Test File", username:this.username});
    this.route.navigateByUrl('createTest');
  }

  createSeq(){
    console.log('username passing', this.username);
    this.show_create_sequence_event.emit({title:'Create Sequence File', username:this.username});
    this.route.navigateByUrl('createseq');
  }

  // when user clicks the 'read' button
  readOneUser(userID){
    console.log('rp comp readOneUser');
   // this.loading = true;
    this.route.navigate([`oneuser/${userID}`])
    // tell the parent component (AppComponent)
    this.show_read_one_user_event.emit({
      userID: userID,
      title: "Tester Information",
      username:this.username,
    });
    
  }
//https://www.vedascloud.com/spectrochips/files/sequence/UritestA10.json

  readJsonData(id, type){
    this.route.navigate([`readFiles/${id}/${type}`]);
    // this.show_read_files_event.emit({
    //   url:url,
    //   title:tit,
    //   username:this.username
    // });
  }

  deleteTestfile(id){
    this.route.navigate([`deleteTest/${id}`]);
    // this.show_delete_test_event.emit({
    //   title: "Delete Test File",
    //   url:url,
    //   username:this.username,
    // });
  }

  deleteSequencefile(id){
    // tell the parent component (AppComponent)
    this.route.navigate([`deleteSequence/${id}`])
    // this.show_delete_sequence_event.emit({
    //   title: "Delete Sequence File",
    //   url:url,
    //   username:this.username
    // });
  }

  updatePublicTestfiles(url){
    this.route.navigateByUrl('updateTest');
    this.show_update_test_event.emit({
      username:this.username,
      url:url,
      title:"Update Test File"
    });
  }

  updatePublicSequencefiles(url){
    this.route.navigateByUrl('updateSequence');
    this.show_update_sequence_event.emit({
      username:this.username,
     url:url,
      title:"Update Sequence File"
    });
  }
  // when user clicks the 'update' button
  updateUser(userID){
    console.log('rp comp updateUser');
    this.route.navigate([`updateUser/${userID}`])
    // tell the parent component (AppComponent)
    this.show_update_user_event.emit({
      userID: userID,
      title: "Update Tester",
      username:this.username,
    });
    
  }
  // when user clicks the 'delete' button
  deleteUser(userID){
    console.log('user id read.',userID);
    this.route.navigate([`deleteUser/${userID}`]);
    // tell the parent component (AppComponent)
    this.show_delete_user_event.emit({
      userID: userID,
      title: "Delete Tester",
      username:this.username
    });
  }

  downloadFile(url){
    this.loading = true;
    var m = url.toString().match(/.*\/(.+?)\./);
    if (m && m.length > 1)
    {
      console.log('len..', m);
    }

    // delete data from database
    this.userService.downloadFile(url)
      .subscribe(
        user => {
          this.loading = false;
          // show an alert to tell the user if user was deleted or not
          //console.log(user);

          // go back to list of products
          console.log('start download:', user);
          var blob = new Blob([JSON.stringify(user)], { type: 'application/json' });
          var url = this.window.URL.createObjectURL(blob);
          var a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = m[1];
          a.click();
          this.window.URL.revokeObjectURL(url);
          a.remove(); // remove the element
        },
        error => {
          this.loading = false;
          console.log(error);
        }
      );
  }

  // Read users from API.
  ngOnInit() {
    this.loading = true;
    this.userService.readUsers()
      .subscribe(users => {
          this.users = users['users'];
          this.userService.readPublic()
          .subscribe(files => {
              this.loading =false;
              this.files = files['files'];
            },error => {
              this.loading = false;
            }
          );
        }, error => {
      this.loading = false;
      }
      );
  }
}
