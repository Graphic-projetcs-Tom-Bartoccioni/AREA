import { AuthService, User } from '@auth0/auth0-angular';
import { Component, OnInit } from '@angular/core';

import { ActionReaction } from 'src/app/types/ActionReaction';
import { ActionReactionData } from 'src/app/types/ActionReactionData';
import { CentralServerService } from 'src/app/services/central-server.service';
import { NavBarComponent } from 'src/app/component/navbar/navbar.component';

@Component({
  selector: 'app-apk',
  templateUrl: './apk.component.html'
})

export class ApkComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
