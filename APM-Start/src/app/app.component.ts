import {Component} from '@angular/core';

import {AuthService} from './user/auth.service';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {MessageService} from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private authService: AuthService,
              private router: Router,
              private messagesService: MessageService) {
    router.events.subscribe((routerEvent) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
    console.log('Log out');
  }

  private checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationError ||
      routerEvent instanceof NavigationCancel) {
      this.loading = false;
    }
  }

  showMessages(): void{
    this.router.navigate([{outlets: {popup: ['messages']}}]);
    this.messagesService.isDisplayed = true;
  }

  hideMessages(): void{
    this.router.navigate([{outlets: {popup: null}}]);
    this.messagesService.isDisplayed = false;
  }

  isMessageDisplayed(): boolean{
    return this.messagesService.isDisplayed;
  }
}
