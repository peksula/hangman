export class HangmanConstants
{
    static readonly COMPLETED_MESSAGE = 'Game completed!!! Congratulations, you are a dark wizard!';
    static readonly ALLOWED_MISTAKES = 6;
    static readonly LETTERS = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];
    static readonly CLUE_FREQUENCY = 5;
    static readonly POINTS_FOR_LETTER = 0;
    static readonly POINTS_FOR_SENTENCE = 1;
    static readonly TITLE = 'Hangman';
    static readonly UNMASKED_LETTERS: string[] = [' ', '-', '.', '\''];
};