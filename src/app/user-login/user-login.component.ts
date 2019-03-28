import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  providers: [UserService]
})

// component for creating a product record
export class UserLoginComponent implements OnInit {

ngOnInit(){
  localStorage.clear();
}
  @Output() show_read_users_event = new EventEmitter();
  // our angular form
  user_login_form: FormGroup;
  authenticationFlag: boolean = true;
  admin: string;
  username: string;
  public loading = false;

  // @Output will tell the parent component (AppComponent) that an event happened in this component


  // initialize 'product service', 'category service' and 'form builder'
  constructor(
    private userService: UserService,
    formBuilder: FormBuilder,
    private route : Router
  ) {
    // based on our html form, build our angular form
    this.user_login_form = formBuilder.group({
      username: ["", Validators.required],
      password : ["", Validators.required]
    });
    
  }

  // user clicks 'create' button
  userLogin() {

     this.loading = true;
     this.username = this.user_login_form.value.username;
     console.log('usernmae...',this.username);

    // send data to server
    this.userService.checkUser(this.user_login_form.value)
      .subscribe(
        user => {
          // show an alert to tell the user if product was created or not
          this.loading = false;
          console.log(user);
          if(user.result == 'error'){
            this.authenticationFlag = false;
          }else{
            console.log('you are in suc mode');
            //this.username=this.user_login_form.value.username;
            console.log('usernmae..',this.username);
            this.admin = this.username;
            console.log('admin..',this.admin);
            //this.authenticationFlag = true;
            // go back to list of users
            this.readUsers();
            localStorage.setItem('userName',this.username);
            this.route.navigateByUrl('/users');
          }
        },
        error => {
          this.loading = false;
          console.log(error);
        }
      );
  }

  // user clicks the 'read products' button
  readUsers(){
    this.show_read_users_event.emit({ title: "Testers List", username:this.admin });
  }

}
