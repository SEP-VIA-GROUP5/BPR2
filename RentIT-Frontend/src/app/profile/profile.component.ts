import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "src/api/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileId: string;

  alive: boolean = true;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.params['id'];

    if(!this.userService.redirectUserIfNotLoggedIn()) {
      console.log('happpens');
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
