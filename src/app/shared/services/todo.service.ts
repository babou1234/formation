import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


//importer les modules d'observation
import { Observable, Subject } from 'rxjs';
import { TodoInterface } from '../interface/todo-interface';
import { Constants } from '../constants/constants';

@Injectable({ 
  providedIn: 'root'
})
export class TodoService {

/**
 * définit un Sujet observable de type todoInterface
 */
    private todoSubject: Subject<TodoInterface> = new Subject<TodoInterface>();

  /**
   * On injecte la dépendance HttpClient
   * @param _api: HttpClient Transport vers le backend 
   */
  constructor(private _api: HttpClient) { }

 /**On abandonne cette méthode car les méthodes httpClient ne retournent que des OBSERVABLES et pas des structures physiques type tableau demandé ci-dessous
  *  public getTodos(id: number = null): TodoInterface[] {
    let _todos: TodoInterface[] = [];
    return _todos;
  }*/
public getTodos(id: number = null): Observable<TodoInterface[]> {
  if (id !== null) {
    return this._api.get<TodoInterface[]>(
      Constants._API_ROOT + '/' + id
    );
  } else {
    return this._api.get<TodoInterface[]>(
      Constants._API_ROOT);
  }
}
/**
 * @param todo
 */
public addTodo(todo: TodoInterface) {
  this._api.post<TodoInterface[]> (
    Constants._API_ROOT,
    todo
  )
  .subscribe((addedTodo) => {
    const _emptyTodo = {
      title: '',
      begin: new Date(),
      end: new Date()
    };
    addedTodo[0].isChecked = false;
    this.sendTodo(addedTodo[0]);
    this.sendTodo(_emptyTodo);
  });
}
/**
 * Met à jour un todo
 * @param todo: TodoInterface : todo à mettre à jour 
 */
public updateTodo(todo: TodoInterface): void {
  this._api.put<TodoInterface> (
    Constants._API_ROOT + '/' + todo.id,
    todo
  ).subscribe((result) => {
    //on n'oublie pas de
    const _emptyTodo = {
      title: '',
      begin: new Date(),
      end: new Date()
    };
    this.sendTodo(todo);
    this.sendTodo(_emptyTodo);
  });
}


public deleteTodo(todo: TodoInterface): void {
  this._api.delete(
    Constants._API_ROOT + '/' + todo.id
  )
  .subscribe((result) => {

  });
  }

  /**
   * méthode permettant aux autres classes de souscrire (s'abonner) le sujet
   */
  public getTodo(): Observable<TodoInterface> {
    return this.todoSubject.asObservable();
  }

  /**
   * Diffuse le sujet vers les abonnés
   * @param todo todoInterface un todo qui passe par là
   */
  public sendTodo(todo: TodoInterface) {
    this.todoSubject.next(todo);
  }
}
