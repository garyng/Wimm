import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbMenuItem, NbThemeService, NbMenuService, NbDialogService } from '@nebular/theme';
import { MENU_ITEM } from '../@common/menu-items';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AddComponent } from './records/add/add.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnDestroy {

  menuItems: NbMenuItem[] = MENU_ITEM;

  private alive = true;

  currentTheme: string;

  constructor(protected themeService: NbThemeService, private router: Router) {
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
    this.router.navigate(['/records/add']);
  }

}
