import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NbTokenService, NbAuthOAuth2JWTToken } from '@nebular/auth';
import { JwtClaimNames } from 'src/app/@common/constants.g';
import { LayoutService } from 'src/app/@services/layout.service';
import { Auth0UserService } from 'src/app/@services/auth0.user.service';
import * as Auth0 from 'auth0-js';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  userName: string;
  profile: Auth0.Auth0UserProfile;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private layoutService: LayoutService,
    private userService: Auth0UserService,
    private router: Router) {
  }
  // todo: remove all commented code
  ngOnInit() {

    this.menuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'userMenu')
      ).subscribe(({ item: { title } }) => this.onUserMenuItemClicked(title));

      this.userService.profile.subscribe(profile => {
        this.profile = profile;
      });
  }

  onUserMenuItemClicked(title) {
    switch (title) {
      case 'Log out':
        this.router.navigate(['/auth/logout']);
        break;
      case 'Profile':
        this.router.navigate(['/app/profile']);
        break;
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

}
