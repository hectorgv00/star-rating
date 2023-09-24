import { Component, Input, SimpleChanges } from '@angular/core';
import { IStar } from './iStar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'star-rating';
  starsOptions: IStar = {
    fontSize: '34px',
    stars: 5,
    name: 'test',
    rating: 0
  }

  gerStarsNumber(event:number){
    console.log(event);
  }

}
