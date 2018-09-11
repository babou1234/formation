import { Component, OnInit } from '@angular/core';
import { 
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
 } from '@angular/forms';
 import {DateValidators} from './../../shared/validators/date-validators';

 import * as moment from 'moment';
import { TodoService } from '../../shared/services/todo.service';
import { TodoInterface } from '../../shared/interface/todo-interface';

import { Subscription} from 'rxjs';
import { JsonpCallbackContext } from '../../../../node_modules/@angular/common/http/src/jsonp';

@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})


export class TodoFormComponent implements OnInit {

  /**
   * @var todoform: FormGroup prise en charge du formulaire par ReactiveForm
   */
  public todoForm: FormGroup;

/**
 * Abonnement à un todo qui vient du tableau des todo (todo-list) et qui passe par l'intermédiaire du service
 */
  private todoSubscription: Subscription;

  /**
   * Défnit un objet todo à mettre à jour
   * @var todoToUpdate: TodoInterface
   */
  private todoToUpdate: TodoInterface;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) {
    //objet todoToUpdate vide
    this.todoToUpdate = {
      title: '',
      begin: new Date(),
      end: new Date()
    };
    
    //Abonnement au todo
    this.todoSubscription = this.todoService.getTodo().subscribe((unTodo) => {
    console.log('Je viens de recevoir un todo : ' +JSON.stringify(unTodo));
    this.todoToUpdate = unTodo;
    this._loadForm();
    });
   }

  /**
   * @return FormControl contrôle du titre du formulaire
   */
  public get title() {
    return this.todoForm.controls.title;
  }

  /**
   * Méthode definie dans l'interface OnInit.
   * est appelée automatiquement après le constructeur de la classe courante
   * constrution du formulaire todoForm
   */
  ngOnInit() {
    //Définit le formulaire, ce qu'il contient et les règles de validation du formulaire
    this.todoForm = this.formBuilder.group(
      {
        title: [
          this.todoToUpdate.title, //valeur par defaut pour le controle titre
          [Validators.required, Validators.minLength(5)] // Regles de validation à appliquer. Plus besoin de required dans le HTML
        ],
        begin: [
          moment(this.todoToUpdate.begin).format('YYYY-MM-DD'),
          [Validators.required]
        ],
        end: [
          moment(this.todoToUpdate.end).format('YYYY-MM-DD'),
          [Validators.required]
        ]
      },
      {validator: Validators.compose([
        DateValidators.dateLessThan('begin', 'end', {'begin' : true})
      ])}
    );
  }

  /**
   * Emet le nouveau todo
   */
  public saveTodo(): void {
    const _todo: TodoInterface = this.todoForm.value;
    _todo.isChecked = false;
    //On doit tenir compte d'un todoToUpdate complet
    console.log('todoToUpdate : ' + JSON.stringify(this.todoToUpdate));
    if (this.todoToUpdate.hasOwnProperty('id')) {
      //c'est une mise à jour
      _todo.id = this.todoToUpdate.id;
      this.todoService.updateTodo(_todo);
    } else {
      //c'est une création
      this.todoService.addTodo(
        _todo
      );
    }  
  }

  private _loadForm(): void {
    this.ngOnInit();
  }

}
