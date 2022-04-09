export class HangmanConstants
{
    static readonly ALLOWED_MISTAKES = 6;
    static readonly ALLOWED_HELPS = 3;
    static readonly HELP_PENALTY = 5;
    static readonly LETTERS = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];
    static readonly UNMASKED_LETTERS: string[] = [' ', '-', '.', '\''];
    static readonly POINTS_FOR_LETTER = 1;
    static readonly POINTS_FOR_SENTENCE = 5;
    static readonly TITLE = 'Hangman';
};