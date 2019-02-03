class Deck {
    constructor() {
        this.values = [
            '7',
            '8',
            '9',
            '10',
            'B',
            'D',
            'K',
            'A'
        ],
            this.symbols = [
                'Herz',
                'Pik',
                'Kreuz',
                'Karo'
            ]
    }

    createDeck() {
        return this.shuffle(this.values)
            .map((val) => {
                return [].concat.apply([],
                    this.shuffle(this.symbols)
                    .map((symbol)=> val+ symbol)
                );
            })
    }

    shuffle(array) {
        const a = array.slice();

        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }

        return a;
    }
}

module.exports = Deck