import { Component } from '@angular/core';
import { TodoInterface} from './shared/interface/todo-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: String = 'hello test';

  /**
   * @var todos: TodoInterface[]
   * Tableau des todos
   */
  public todos: TodoInterface[];

  /**
   * @var aTodo: String
   * Nouveau todo à ajouter à nore tableau
   */
  public aTodo: String;

  /**
   * Constructeur de la classe AppComponent
   * Invoqué dès la création d'un objet de type AppComponent
   */
  public constructor() {
    /*this.todos = [
      {title: 'Nouveau todo', isChecked: false},
      {title: 'what the fuck', isChecked: false}
    ];
    */
    this.aTodo='';
  }



 



 




 


  public changeTitle(): void {
    this.title = 'Hola test';
  }
}
