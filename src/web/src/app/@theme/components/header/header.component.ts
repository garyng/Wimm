import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { LayoutService } from '../../../@core/data/layout.service';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NbTokenService } from '@nebular/auth';
import { JwtClaimNames } from 'src/app/@common/constants.g';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  userName: string;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private layoutService: LayoutService,
    private tokenService: NbTokenService,
    private router: Router) {
  }
  // todo: remove all commented code
  ngOnInit() {
    // this.userService.getUsers()
    //   .subscribe((users: any) => this.user = users.nick);

    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'userMenu'),
        filter(({ item: { title } }) => title === 'Log out')
      )
      .subscribe(_ => this.router.navigate(['auth/logout']));

    this.tokenService
      .get()
      .subscribe(token => this.userName = token.getPayload()[JwtClaimNames.NAME]);

  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  // toggleSettings(): boolean {
  //   this.sidebarService.toggle(false, 'settings-sidebar');

  //   return false;
  // }

  goToHome() {
    this.menuService.navigateHome();
  }

  // startSearch() {
  //   this.analyticsService.trackEvent('startSearch');
  // }
}
