import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit, Input, Output, OnChanges, EventEmitter , Inject} from '@angular/core';
import { UserService } from '../user.service';
import { Observable} from 'rxjs';
import {User} from '../user';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-read-one-user',
  templateUrl: './read-one-user.component.html',
  styleUrls: ['./read-one-user.component.css'],
  providers: [UserService]
})

export class ReadOneUserComponent implements OnChanges, OnInit {

  /*
      @Output will tell the parent component (AppComponent)
      that an event has happened (via .emit(), see readProducts() method below)
  */
  @Output() show_read_users_event = new EventEmitter();
  @Output() show_read_files_event = new EventEmitter();
  @Output() show_create_testuser_event = new EventEmitter();
  @Output() show_create_sequenceuser_event = new EventEmitter();

  // @Input means it will accept value from parent component (AppComponent)
 //;
  
  userName = localStorage.getItem('userName');
  public userID:string;
  user: User;
  public loading = false;
  private paramsSub: any;
  // initialize product service
  constructor(@Inject(WINDOW) private window: Window, private userService: UserService, private route : Router, private activeRoute: ActivatedRoute ){ }

  ngOnInit(){
    this.paramsSub = this.activeRoute.params.subscribe(params => {
      
      this.userID = params['userID'];
      this.loading = true;
      this.userService.readOneUser(this.userID)
        .subscribe(user => {
          this.loading = false; 
          this.user = user
        },err => {this.loading = false;},);
   });
   console.log(this.userID);
  }
  // user clicks the 'read products' button
  readUsers(){
    this.show_read_users_event.emit({ title: "Testers List", username:this.userName });
    this.route.navigateByUrl('/users');
  }

  createTestuser(title) {
    console.log("title,,,,", title);
    this.route.navigate([`creatTestUser/${this.userID}`]);
   // this.show_create_testuser_event.emit({title:title, userID: this.userID});
  }

  createSequenceuser(title) {
    console.log("title,,,,", title);
    this.route.navigate([`createSeqUser/${this.userID}`])
    //this.show_create_sequenceuser_event.emit({title:title, userID: this.userID});
    
  }

  readJsonData(id, type){
    this.route.navigate([`readFiles/${id}/${type}/${this.userID}`]);
    // this.show_read_files_event.emit({
    //   url:url,
    //   title:tit,
    //   username:this.userName
    // });
  }

  deleteTestfile(url){
    this.loading = true;
    this.userService.deleteTestfile(this.userID,url)
      .subscribe(deleteuser => {
        this.userService.readOneUser(this.userID)
          .subscribe(user => {this.user = user, this.loading = false; });
      }, error => {console.log(error), this.loading = false; }
      );
  }

  deleteSeqfile(url){
    this.loading = true;
    this.userService.deleteSeqfile(this.userID,url)
      .subscribe(deleteuser => {
          this.userService.readOneUser(this.userID)
            .subscribe(user => {this.user = user, this.loading = false; });
        }, error => { console.log(error), this.loading = false; }
      );
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
        error => console.log(error)
      );
  }

  // call the record when 'product_id' was changed
  ngOnChanges(){
    console.log('user id...',this.userID);
    // this.loading = true;
    // this.userService.readOneUser(this.userID)
    //   .subscribe(user => {this.loading = false; this.user = user},err => {this.loading = false;},);
  }

}
