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
        // Añadimos un timeout de una milesima por desfase
        setTimeout(() => {
          // Recogemos el contenedor de las estrellas que coincida con el nombre
          let starsContainer: HTMLElement = this.getStarsContainer();
          // Creamos los inputs de las estrellas
          this.createInputsStars(starsContainer)
          // Recogemos los inputs de las estrellas
          let stars:HTMLElement[] = Array.from(document.querySelectorAll(
            `input[type="radio"][name="${this.stars.name}"]`
          ));      
          // Añadimos el evento click a cada estrella
          this.addEventListenerClick(stars);    
          // Si hay una valoracion previa, la mostramos
          if(this.stars.rating){
            stars[this.stars.stars * 2 - this.stars.rating].click();
          }
        }, 1);
      }
    }
  }

  ngOnInit() {}
  
  createInputsStars(starsContainer:HTMLElement ){
    for (let index = 0; index < this.stars.stars * 2; index++) {
      let halfStar = document.createElement(`input`);
      halfStar.setAttribute('type', 'radio');
      halfStar.setAttribute('name', this.stars.name);
      starsContainer?.appendChild(halfStar);
    }
  }

  addEventListenerClick(stars:HTMLElement[]){
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        this.rating.emit(this.stars.stars * 2 - index);
      });
    });
  }

  getStarsContainer():HTMLElement{
   return document.querySelector(`#${this.stars.name}`)!;
  }
}
