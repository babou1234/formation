export interface MatColumns {
    /**
     * @var String title Titre de la colonne dans le tableau
     */
    title: String;

    /**
     * @var always Boolean Determine si la colonne doit toujours être affichée
     */
    always: boolean;

    /**
     * @var value String: valeur utilisée dans la liste des colonnes à afficher
     */
    value: String;

    /**
     * @var isDisplayed Boolean vrai si la colonne est affichée
     */
    isDisplayed: Boolean;
}
