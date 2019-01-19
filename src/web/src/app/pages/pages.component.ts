import { Component, OnDestroy } from '@angular/core';
import { NbMenuItem, NbThemeService } from '@nebular/theme';
import { MENU_ITEM } from '../@common/menu-items';
import { takeWhile } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../@services/user.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnDestroy {

  menuItems: NbMenuItem[] = MENU_ITEM;

  private alive = true;

  currentTheme: string;

  constructor(protected themeService: NbThemeService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  goToNewRecord() {
    this.router.navigate(['./records/add'], {relativeTo: this.activatedRoute});
  }

}
