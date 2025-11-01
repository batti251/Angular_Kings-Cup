export class Game {
    public cardStack: string[] = [];
    public discardPile: string[] = [];
    public playerAmount: number[] = [];
    public playerCard: string[] = [];
    public currentPlayer: number = 0;


    constructor() {
        this.addCardStack();
    }

    /**
     * This Function adds all 52 cards to the cardStack
     * After it it will shuffle the Array 
     */
    addCardStack() {
        for (let index = 1; index < 14; index++) {
            this.cardStack.push('ace_' + index);
            this.cardStack.push('clubs_' + index);
            this.cardStack.push('diamonds_' + index);
            this.cardStack.push('hearts_' + index);
        }
        this.shuffle(this.cardStack)
    }

    /**
     * This Function shuffles the dedicated Array
     * 
     * @param array - The Array, that needs to be shuffled
     * @returns - returns the same, but shuffled Array
     */
    shuffle = (array: string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };


}