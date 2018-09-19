
import { MatTableHelper } from './mat-table-helper'

export class TodoHelper extends MatTableHelper {
    
    public constructor() {
        super();

        this.todoTableMap.set(
            'title',
            {title: 'A faire', always: true, value: 'title', isDisplayed: true}
        );
        this.todoTableMap.set(
            'begin',
            {title: 'Du...', always: false, value: 'begin', isDisplayed: true}
        );
        this.todoTableMap.set(
            'end',
            {title: 'Au...', always: false, value: 'end', isDisplayed: true}
        );
        this.todoTableMap.set(
            'update',
            {title: 'update', always: true, value: 'update', isDisplayed: true}
        );
        this.todoTableMap.set(
            'delete',
            {title: 'delete', always: true, value: 'delete', isDisplayed: true}
        );
    } 
}
