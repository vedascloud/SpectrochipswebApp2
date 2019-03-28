import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { Observable, from} from 'rxjs';
import { User } from '../user';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
  providers: [UserService]
})

export class DeleteUserComponent {

  /*
      @Output will tell the parent component (AppComponent)
      that an event has happened (via .emit(), see readProducts() method below)
  */
  @Output() show_read_users_event = new EventEmitter();

  // @Input enable getting the product_id from parent component (AppComponent)
 // @Input() userID;
 // @Input() username;

  userName = localStorage.getItem('userName');
  public userID:string;
  user: User;
  
  public loading = false;
  private paramsSub: any;
  // initialize product service
  constructor(private userService: UserService, private route:Router, private activeRoute: ActivatedRoute ){}

  // user clicks 'yes' button
  deleteUser(){
    this.loading = true;
    this.paramsSub = this.activeRoute.params.subscribe(params => {
      
      this.userID = params['userID'];
    // delete data from database
    this.userService.deleteUser(this.userID)
      .subscribe(
        user => {
          this.loading = false;
          // show an alert to tell the user if user was deleted or not
          console.log("testing");

          // go back to list of products
          this.readUsers();
        },
        error => {console.log(error);this.loading = false; }
      );
      });
  }

  // user clicks the 'read testers' button
  readUsers(){
    this.show_read_users_event.emit({ title: "Read Testers",username:this.userName });
    this.route.navigateByUrl('users');
  }

}
