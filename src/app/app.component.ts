import { isPlatformBrowser , DOCUMENT} from '@angular/common';
import { environment } from '../environments/environment';
import { Component , OnInit, Inject, PLATFORM_ID} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  // properties for child components
  title="Admin Pannel";
  userID;
  username;
  url;

    public ngOnInit(): void {
        if (!isPlatformBrowser(this.platformId)) {
            let bases = this.document.getElementsByTagName('base');
    
            if (bases.length > 0) {
                bases[0].setAttribute('href', environment.baseHref);
            }
        }
    };

 constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(DOCUMENT) private document: any) {}


  showUserLogin($event){
    this.title="Admin Pannel";
    this.hideAll_Html();
    this.show_user_login_html=true;
  };

  showLoginPage($event){
    this.title="Admin Panel";
    this.hideAll_Html();
    this.show_user_login_html=true;
  };
  // show the 'create product form'
  showCreateUser($event){

    // set title
    this.title=$event.title;
    this.username=$event.username;
    // hide all html then show only one html
    this.hideAll_Html();
    this.show_create_user_html=true;
  };

  showCreateTest($event){

    // set title
    this.title=$event.title;
    this.username=$event.username;
    // hide all html then show only one html
    this.hideAll_Html();
    this.show_create_test_html=true;
  };

  showCreateSequence($event){

    // set title
    this.title=$event.title;
    this.username=$event.username;
    // hide all html then show only one html
    this.hideAll_Html();
    this.show_create_sequence_html=true;
  };

  showUpdateTest($event){
    this.title=$event.title;
    this.username=$event.username;
    this.url=$event.url;
    this.hideAll_Html();
    this.show_update_test_html=true;
  };

  showUpdateSequence($event){
    this.username=$event.username;
    this.title=$event.title;
    this.url=$event.url;
    this.hideAll_Html();
    this.show_update_sequence_html=true;
  };

// show products list
  showReadUsers($event){
    // set title
    this.title=$event.title;
    this.username=$event.username;
    // hide all html then show only one html
    this.hideAll_Html();
    this.show_read_users_html=true;
  };


// show details of a product
  showReadOneUser($event){

    // set title and product ID
    this.title=$event.title;
    this.userID=$event.userID;
    this.username=$event.username;
    // hide all html then show only one html
    this.hideAll_Html();
    this.show_read_one_user_html=true;
  };

  showReadFiles($event){
    this.title=$event.title;
    this.url=$event.url;
    this.username=$event.username;
    this.hideAll_Html();
    this.show_read_files_html=true;
  };

  // show the 'update product form'
  showUpdateUser($event){

    // set title and product ID
    this.title=$event.title;
    this.userID=$event.userID;
    this.username=$event.username;
    // hide all html then show only one html
    this.hideAll_Html();
    this.show_update_user_html=true;
  };

  // show 'are you sure?' prompt to confirm deletion of a record
  showDeleteUser($event){

    // set title and user ID
    this.title=$event.title;
    this.userID=$event.userID;
    this.username=$event.username;
    // hide all html then show only one html
    this.hideAll_Html();
    this.show_delete_user_html=true;
  };

  showDeleteSequence($event){
    this.title=$event.title;
    this.username=$event.username;
    this.url=$event.url;
    this.hideAll_Html();
    this.show_delete_sequence_html=true;
  };

  showDeleteTest($event){
    this.title=$event.title;
    this.username=$event.username;
    this.url=$event.url;
    this.hideAll_Html();
    this.show_delete_test_html=true;
  };

  showCreateTestuser($event){
    this.title=$event.title;
    this.userID=$event.userID;
    this.username=$event.username;
    this.hideAll_Html();
    this.show_create_testuser_html=true;
  };

  showCreateSequenceuser($event){
    this.title=$event.title;
    this.userID=$event.userID;
    this.username=$event.username;
    this.hideAll_Html();
    this.show_create_sequenceuser_html=true;
  };

// hide all html views
  hideAll_Html(){
    this.show_read_users_html=false;
    this.show_create_user_html=false;
    this.show_read_one_user_html=false;
    this.show_update_user_html=false;
    this.show_delete_user_html=false;
    this.show_user_login_html=false;
    this.show_read_files_html=false;
    this.show_create_test_html=false;
    this.show_create_sequence_html=false;
    this.show_update_test_html=false;
    this.show_update_sequence_html=false;
    this.show_delete_sequence_html=false;
    this.show_delete_test_html=false;
    this.show_create_testuser_html=false;
    this.show_create_sequenceuser_html=false;
  };

  // properties used to identify what views to show
  show_user_login_html=true;
  show_read_users_html=false;
  show_create_user_html=false;
  show_read_one_user_html=false;
  show_update_user_html=false;
  show_delete_user_html=false;
  show_read_files_html=false;
  show_create_test_html=false;
  show_create_sequence_html=false;
  show_update_test_html=false;
  show_update_sequence_html=false;
  show_delete_test_html=false;
  show_delete_sequence_html=false;
  show_create_testuser_html=false;
  show_create_sequenceuser_html=false;
}
