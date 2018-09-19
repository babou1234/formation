import { MatColumns } from './../interface/mat-columns';

export class MatTableHelper {
    protected todoTableMap: Map<String, MatColumns> = new Map();

     /**
     * Retourne le tableau des colonnes à afficher à partir du Map défini
     */
    public getDisplayedColumns(): String[] {
        const toDisplay: String[] = [];

        this.todoTableMap.forEach((column, key) => {
            if (column.isDisplayed) {
                toDisplay.push(column.value);
            }
        });

        return toDisplay;
    }

    /**
     * 
     * @param key 
     */
    public getColumn(key: String): MatColumns {
        return this.todoTableMap.get(key);
    }

    public getOptionalColumns(): MatColumns[] {
        const toDisplay: MatColumns[] = [];

        this.todoTableMap.forEach((column, key) => {
            if (!column.always) {
                toDisplay.push(column);
            }
        });
        return toDisplay;
    }

    /**
     * 
     */
    public setDisplayedColumns(userSelection: String[]): String[] {
        this.todoTableMap.forEach((column, key) => {
            if(!column.always) {
                if (userSelection.indexOf(column.value) === -1) {
                    column.isDisplayed = false;
                } else {
                    column.isDisplayed = true;
                }
            this.todoTableMap.set(key, column); // remplace l'objet dans la clé concernée
            }
        });
        return this.getDisplayedColumns();
    }

/**
 * fonction qui permet de faire la même chose que getOptionalColumns mais renvoie un tableau string au lieu d'un MatColumns
 */
public optionalColumnsToArray(): String[] {
    const toDisplay: String[] = [];

    this.todoTableMap.forEach((column, key) => {
        if(!column.always) {
            toDisplay.push(column.value);
        }
    });
    return toDisplay;
}
}
