import { Component } from '@angular/core';

import { ValutService } from './vault.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private vaultService: ValutService,
  ) {}

  get() {
    this.vaultService.getSecret('test');
  }

  set() {
    this.vaultService.setSecret('test', 'yay!');
  }
}
