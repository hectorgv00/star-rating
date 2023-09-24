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
    fontSize: 155,
    stars: 5,
    name: 'test',
    rating: 6
  }
  starsOptions2: IStar = {
    fontSize: 34,
    stars: 5,
    name: 'tost',
    rating: 0
  }
  starsOptions3: IStar = {
    fontSize: 5,
    stars: 5,
    name: 'tust',
    rating: 7
  }

  gerStarsNumber(event:number){
    console.log(event);
  }

}
