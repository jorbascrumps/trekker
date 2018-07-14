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
            .processNeighbour((current, neighbour) => neighbour.weight !== 2)
            .search(0, 2, 2, 2)
            .toString();

        should.equal(actual, expected);
    });

});

describe('Diagonal mode', () => {
    const grid = [
        [ 1, 1, 1, 1 ],
        [ 1, 1, 0, 1 ],
        [ 1, 0, 1, 1 ],
        [ 1, 1, 1, 1 ],
    ];

    it ('Never (default)', () => {
        const expected = '[1,0],[0,0]';
        const actual = new Trekker(grid)
            .enableDiagonal(Trekker.DIAGONAL_MODE.NEVER)
            .search(1, 1, 0, 0)
            .toString();

        should.equal(actual, expected);
    });

    it ('Always', () => {
        const expected = '[1,0]';
        const actual = new Trekker(grid)
            .enableDiagonal(Trekker.DIAGONAL_MODE.ALWAYS)
            .search(0, 1, 1, 0)
            .toString();

        should.equal(actual, expected);
    });

    it ('One obstacle', () => {
        const expected = '[2,0],[3,1],[2,2]';
        const actual = new Trekker(grid)
            .enableDiagonal(Trekker.DIAGONAL_MODE.ONE_OBSTACLE)
            .search(1, 1, 2, 2)
            .toString();

        should.equal(actual, expected);
    });

    it ('No obstacles', () => {
        const expected = '[3,0],[3,1],[3,2],[2,3]';
        const actual = new Trekker(grid)
            .enableDiagonal(Trekker.DIAGONAL_MODE.NO_OBSTACLES)
            .search(2, 0, 2, 3)
            .toString();

        should.equal(actual, expected);
    });

});
