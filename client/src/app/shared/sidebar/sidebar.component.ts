import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  isAdmin : Boolean = false;
  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    if(this.authService.currentUserValue.userRole == "admin"){
      this.isAdmin = true;
    }
  }
  logout(){
    this.authService.logout();
  }
  navbarClass = "topnav";
  responsive(){
    if(this.navbarClass == "topnav"){
      this.navbarClass = "topnav responsive"
    }else{
      this.navbarClass = "topnav";
    }
  }
}
