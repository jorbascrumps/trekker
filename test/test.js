const should = require('should');

const Trekker = require('../lib/Trekker').default;

describe('Trekker', () => {
    const grid = [
        [ 1, 1, 1 ],
        [ 1, 0, 1 ],
        [ 1, 2, 1 ],
    ];

    it('Should path horizontally', () => {
        const expected = '[1,0],[2,0]';
        const actual = new Trekker(grid)
            .search(0, 0, 2, 0)
            .toString();

        should.equal(actual, expected);
    });

    it('Should path vertically', () => {
        const expected = '[0,1],[0,2]';
        const actual = new Trekker(grid)
            .search(0, 0, 0, 2)
            .toString();

        should.equal(actual, expected);
    });

    it('Should avoid walls', () => {
        const expected = '[0,1],[0,2],[1,2],[2,2]';
        const actual = new Trekker(grid)
            .search(0, 0, 2, 2)
            .toString();

        should.equal(actual, expected);
    });

    it('Should return empty if destination unreachable', () => {
        const expected = '';
        const actual = new Trekker(grid)
            .search(0, 0, 1, 1)
            .toString();

        should.equal(actual, expected);
    });

    it('Should accept custom neighbour processing', () => {
        const expected = '[0,1],[0,0],[1,0],[2,0],[2,1],[2,2]';
        const actual = new Trekker(grid)
            .processAdjacent((current, neighbour) => neighbour.weight !== 2)
            .search(0, 2, 2, 2)
            .toString();

        should.equal(actual, expected);
    });
});
