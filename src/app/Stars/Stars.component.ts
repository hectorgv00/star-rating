import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IStar } from '../iStar';

@Component({
  selector: 'Stars',
  templateUrl: './Stars.component.html',
  styleUrls: ['./Stars.component.scss'],
})
export class StarsComponent implements OnInit {
  @Output() rating: EventEmitter<number> = new EventEmitter<number>();

  @Input() stars: IStar = {
    fontSize: '34px',
    stars: 5,
    name: 'test',
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['stars']) {
      if (changes['stars'].currentValue) {
        setTimeout(() => {
          let starsContainer = document.querySelector(`#${this.stars.name}`);
          for (let index = 0; index < this.stars.stars * 2; index++) {
            let halfStar = document.createElement(`input`);
            halfStar.setAttribute('type', 'radio');
            halfStar.setAttribute('name', this.stars.name);
            starsContainer?.appendChild(halfStar);
          }
          let stars:HTMLElement[] = Array.from(document.querySelectorAll(
            `input[type="radio"][name="${this.stars.name}"]`
          ));          
          stars.forEach((star, index) => {
            star.addEventListener('click', () => {
              this.rating.emit(this.stars.stars * 2 - index);
            });
          });
          if(this.stars.rating){
            stars[this.stars.stars * 2 - this.stars.rating].click();
          }
        }, 1);
      }
    }
  }

  ngOnInit() {}
  
}
