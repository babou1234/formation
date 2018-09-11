import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from '../../shared/services/todo.service';
import { TodoInterface } from '../../shared/interface/todo-interface';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  /**
   * Abonnement à un todo qui vient de l'espace ou plutôt de todoService
   */
  private todoSubscription: Subscription;

  /**
   * 
   * @var TodoInterface[]
   */
  public todos: TodoInterface[];

  constructor(private todoService: TodoService) {
    this.todos = [];
    this.todoSubscription = this.todoService.getTodo().subscribe((todo) => {
        console.log('Observable Todo : ' + JSON.stringify(todo));
        //ajoute le todo à la liste des todos sans savoir s'il est nouveau ou si MAJ
        //s'il n'existe pas déjà...
        //Attention s'il existe, je dois le remplacer par les nouvelles valeurs
        const index = this.todos.findIndex((obj)=> obj.id == todo.id);
        if(index === -1 && todo.hasOwnProperty('id')) {
        this.todos.push(todo);
        } else {
          this.todos[index] = todo;
        }
    });
   }

   /**
    * Après construction de l'objet, on charge la liste des todos existant dans la BD
    */
  ngOnInit() {
    //récupère les todos existants dans la base
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      console.log('Il y a ' + this.todos.length + ' todos à afficher')
    });
  }

    //supprime le todo coché
    public delete(index: number): void {
      const _todo = this.todos[index];
      this.todoService.deleteTodo(_todo);
      this.todos.splice(index,1);      
    }

    /**
     * aucun todo coché:
     */
    private _allChecked(): Boolean {
      let allChecked: Boolean = false;
  
      for(const todo of this.todos){
        if (!todo.isChecked) {
          allChecked = false;
        }
      }
      return allChecked;
    }

/**
 * gère le statut des todos coché ou pas
 */
    public checkedStatus: Boolean = false;

    public checkUncheckAll() {
      //change le statut de la boîte à cocher à côté de titre
      this.checkedStatus= !this.checkedStatus;
  
      //appelle la méthode privée pour changer le statut des todos
      this._check();
    }

    /**
 * Détermine si oui ou non aucune boîte n'est cochée
 */
  public noneChecked(): boolean {
    let status: boolean = true;
    for(const todo of this.todos) {
      if(todo.isChecked) {
        status=false;
      }
    }
    return status;
  }


      /**
   * Bascule l'état isChecked d'un todo
   * @param index Indice de l'élément dans le tableau
   */
  public toggle(index: number): void {
    this.todos[index].isChecked = !this.todos[index].isChecked;
    this.checkedStatus = this._allChecked();
  }

  private _check():void {
    for (let index=0; index< this.todos.length; index ++) {
      this.todos[index].isChecked= !this.todos[index].isChecked;
    }
  }

        /**
     * Suppression de tous les todo cochés
     */
    public deleteChecked(): void {
      const _todos: TodoInterface[] = [];

      for (const todo of this.todos) {
        if (!todo.isChecked) {
          _todos.push(todo);
        } else {
          this.todoService.deleteTodo(todo);
        }
      }
      this.todos= _todos;
  }

  
  public update(todo: TodoInterface): void {
    console.log('Modifications du todo : ' +todo.id);
    this.todoService.sendTodo(todo);
  }

}
