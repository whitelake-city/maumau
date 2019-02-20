class Deck {
    constructor() {
        this.values = [
            '7',
            '8',
            '9'
        ]
        this.symbols = [
            'herz',
            'pik',
            'kreuz',
            'karo'
        ]
    }

    createDeck() {
        let result = []
        this.values
            .forEach((val, i) => {
                this.symbols.forEach(((symbol) => {
                    result.push({
                        wert: val,
                        art: symbol
                    })
                }))
            })

        return this.shuffle(result);

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