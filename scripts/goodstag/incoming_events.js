try {
    const tag = await GT.tag().getTag({ "identity": "epc:" + event.data.epc });

    if (tag.product) {
        // Check wheter scanned tag belongs to a book by querying database with isbn
        const book = await GT.product().getProduct({ "identity": "isbn:" + tag.product });
        if (book) {
            return {
                'type': 'bookscan',
                'isbn': tag.product,
                'book': book
            }
        }
        // Check wheter scanned tag belongs to a card by querying database with card-id
        const card = await GT.product().getProduct({ "identity": "card-id:" + tag.product });
        if (card) {
            return {
                'type': 'cardscan',
                'card-id': tag.product,
                'card': card
            }
        }
    } else {
        Log.error('Tag scanned with no valid product attached: ' + JSON.stringify(tag))
    }
} catch (err) {
    Log.error(err);
}
return {name: 'returnEvent', value:'Test!'};