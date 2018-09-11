export interface TodoInterface {
   
    /**
     * @var (optional)id: number
     * identifiant du todo, mis ne optionnel car au départ par d'identifiant, apparaît à la sauvegarde dans la BD.
     */
    id?: number;
    
    /**
     * Titre du Todo
     * @var String
     */
    title: String;
    /**
     * Date de début pour le todo
     * @var Date begin
     * 
     */
        begin: Date;

    /**
     * Date de fin pour le todo
     * @var Date end
     * 
     */
    end: Date;

    /**
     * todo coché= booléen vrai
     * @var boolean
     */
    isChecked?: boolean;
}
