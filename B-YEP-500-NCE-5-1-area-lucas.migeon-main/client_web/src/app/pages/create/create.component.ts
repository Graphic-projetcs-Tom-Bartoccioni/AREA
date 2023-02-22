import { Component, OnInit } from '@angular/core';

import { ActionData } from 'src/app/data/ActionData';
import { ActionReaction } from 'src/app/types/ActionReaction';
import { ActionReactionData } from 'src/app/types/ActionReactionData';
import { CentralServerService } from 'src/app/services/central-server.service';
import { NavBarComponent } from 'src/app/component/navbar/navbar.component';
import { ReactionData } from 'src/app/data/ReactionData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  public titleActionReaction!: string;

  public progressStep: number = 1;
  public actionReactionList!: ActionReaction[] | null
  public data: ActionReaction = {title: "", actionService: "", action: {id: 0, title: "", description: ""}, reactionService: "", reaction: {id: 0, title: "", description: ""}};
  public actionList!: ActionReactionData[];
  public reactionList!: ActionReactionData[];
  public colorActionService!: string;
  public colorReactionService!: string;
  public actionConnected: boolean = false;
  public reactionConnected: boolean = false;

  constructor(private route: Router,
              private action: ActionData,
              private reaction: ReactionData,
              private server: CentralServerService
            ) { }

  ngOnInit(): void {
    const params = window.location.search;
    if (window.opener) {
      // send them to the opening window
      window.opener.postMessage(params);
      // close the popup
      window.close();
    }
    this.server.getActionReactionList().subscribe((res) => {
      this.actionReactionList = res;
    });
  }

  public save() {
      if (this.actionReactionList?.find(actionReaction => actionReaction.title === this.titleActionReaction)) {
        return;
      }
      this.data.title = this.titleActionReaction;
      NavBarComponent.createButtonTrigger = false;
      this.progressStep = 1;
      this.server.saveActionReaction(this.data).subscribe((res) => {
        this.route.navigate(['/home']);
      })
  }

  public setValueInput(val: string) {
    this.titleActionReaction = val;
  }

//   public connectionActionService(service: string) {
//       switch(service) {
//       //   case "youtube":
//       //     this.openSignInWindow(
//       //       "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&response_type=code&client_id=284715382868-nml2sr0miius6oqk8frr6e4qt3clqoal.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fcreate",
//       //       "oauth youtube"
//       //     );
//       //     break;
//       //   case "github":
//       //     this.openSignInWindow(
//       //       "https://github.com/login/oauth/authorize?client_id=34a1d5858eaccbdfc04f&redirect_uri=http://localhost:4200/&scope=repo,repo:status,user&state=Miaw",
//       //       "oauth youtube"
//       //     );
//       //     break;
//       }
//   }

//   public connectionReactionService(service: string) {
//     switch(service) {
//       case "youtube":
//         this.reactionConnected = true;
//         break;
//       case "github":
//         this.reactionConnected = true;
//         break;
//     }
//     if (this.isNeedingToDisplayServiceActionConnection() == false && this.reactionConnected == true) {
//       this.nextStep();
//     }
//     if (this.reactionConnected == true && this.actionConnected == true) {
//       this.nextStep();
//     }
// }

  // public isNeedingToDisplayServiceActionConnection(): boolean {
  //   if (this.data.actionService === 'timer' || this.data.actionService === "weather" || this.data.actionService === "discord") {
  //     return false;
  //   }
  //   return true;
  // }

  // public isNeedingToDisplayServiceReactionConnection(): boolean {
  //   if (this.data.reactionService === this.data.actionService) {
  //     return false;
  //   }
  //   if (this.data.reactionService === 'timer' || this.data.reactionService === "weather" || this.data.reactionService === "discord") {
  //     return false;
  //   }
  //   return true;
  // }

  public loadDataAction() {
    switch (this.data.actionService) {
      case "discord":
          this.actionList = this.action.getDiscordAction();
          this.colorActionService = "#5865F2";
          break;
      case "youtube":
          this.actionList = this.action.getYoutubeAction();
          this.colorActionService = "#FF0000";
          break;
      // case "github":
      //     this.actionList = this.action.getGithubAction();
      //     this.colorActionService = "#333";
      //     break;
      case "timer":
          this.actionList = this.action.getTimerAction();
          this.colorActionService = "#223";
          break;
      case "weather":
          this.actionList = this.action.getWeatherAction();
          this.colorActionService = "#49c";
          break;
      case "randomUser":
          this.actionList = this.action.getRandomUserAction();
          this.colorActionService = "#333";
      }
  }

  public loadDataReaction() {
    switch (this.data.reactionService) {
      case "discord":
          this.reactionList = this.reaction.getDiscordReaction();
          this.colorReactionService = "#5865F2";
          break;
    }
  }

  public selectAction(action: ActionReactionData) {
    this.data.action = action;
    this.nextStep();
  }

  public selectReaction(reaction: ActionReactionData) {
    this.data.reaction = reaction;
    // if (this.isNeedingToDisplayServiceActionConnection() === false && this.isNeedingToDisplayServiceReactionConnection() === false) {
      this.progressStep = this.progressStep+2;
    // } else {
    //   this.nextStep();
    // }
  }

  public selectServiceAction(service: string) {
    this.data.actionService = service;
    this.loadDataAction();
    this.nextStep();
  }

  public selectServiceReaction(service: string) {
    this.data.reactionService = service;
    this.loadDataReaction();
    this.progressStep++
  }

  public cancel() {
    this.data = {title: "", actionService: "", action: {id: 0, title: "", description: ""}, reactionService: "", reaction: {id: 0, title: "", description: ""}};
    this.progressStep = 1;
    this.route.navigate(["home"]);
    NavBarComponent.createButtonTrigger = false;
  }

  public nextStep() {
      this.progressStep++
  }

  public previousStep() {
    this.progressStep--
  }


//   public receiveMessage(event: MessageEvent<any>) {
//     if (event.origin !== "http://localhost:4200") {
//       return;
//     }
//     const { data } = event;
//     const url = new URL(`http://localhost:4200/auth/google/login${data}`);
//     console.log(url.searchParams.get("code"));
//     this.actionConnected = true;
//     // if (this.isNeedingToDisplayServiceReactionConnection() == false && this.actionConnected == true) {
//     //   this.nextStep();
//     // }
//   };

//   public openSignInWindow(url: string, name: string) {
//     let windowObjectReference!: Window | null;
//     let previousUrl = null;

//     window.removeEventListener('message', this.receiveMessage);

//     const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

//     if (windowObjectReference === null) {
//       windowObjectReference = window.open(url, name, strWindowFeatures);
//     } else if (previousUrl !== url) {
//       windowObjectReference = window.open(url, name, strWindowFeatures);
//       if (windowObjectReference != null) {
//         windowObjectReference.focus();
//       }
//     } else {
//         windowObjectReference.focus();
//     }
//     window.addEventListener('message', event => this.receiveMessage(event), false);
//     previousUrl = url;
//   };
}
