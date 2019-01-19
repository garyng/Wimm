import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NbTokenService, NbAuthOAuth2JWTToken } from '@nebular/auth';
import { JwtClaimNames } from 'src/app/@common/constants.g';
import { LayoutService } from 'src/app/@services/layout.service';
import { UserService } from 'src/app/@services/user.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  userName: string;
  name: string;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private layoutService: LayoutService,
    private userService: UserService,
    private router: Router) {
  }
  // todo: remove all commented code
  ngOnInit() {

    this.menuService
      .onItemClick()
      .pipe( filter(({ tag }) => tag === 'userMenu'), filter(({ item: { title } }) => title === 'Log out') )
      .subscribe(_ => this.router.navigate(['auth/logout']));

      this.userService.profile.subscribe(profile => {
        this.name = profile.name;
      });

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
