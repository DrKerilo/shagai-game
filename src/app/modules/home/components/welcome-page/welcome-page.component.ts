import { Component, OnInit } from '@angular/core';
import { Shagai } from 'src/app/shared/models/shagai';
import { ShagaiService } from 'src/app/core/services/shagai.service';
import { PositionEnum } from 'src/app/shared/enum/position.enum';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  public shagai: Shagai;
  public position = PositionEnum;

  constructor(private shagaiService: ShagaiService) {}

  ngOnInit() {
  }

  onClick() {
    this.shagai = this.shagaiService.newGame();
  }
}
