import Node from './Node';

export default class Grid {

    constructor (data = []) {
        this.data = [];

        const numRows = data.length;
        const numCols = data[0].length;
        for (let row = 0; row < numRows; row++) {
            this.data[row] = [];

            for (let col = 0; col < numCols; col++) {
                const node = new Node(col, row, data[row][col]);

                this.data[row][col] = node;
            }
        }
    }

    getAt (x, y) {
        return this.data[y][x];
    }

    getNeighbours ({ x, y }) {
        const grid = this.data;
        let neighbours = [];

        // North
        if (grid[y - 1] && grid[y - 1][x]) {
            neighbours.push(grid[y - 1][x]);
        }

        // South
        if (grid[y + 1] && grid[y + 1][x]) {
            neighbours.push(grid[y + 1][x]);
        }

        // East
        if (grid[y] && grid[y][x + 1]) {
            neighbours.push(grid[y][x + 1]);
        }

        // West
        if (grid[y] && grid[y][x - 1]) {
            neighbours.push(grid[y][x - 1]);
        }

        return neighbours;
    }

}
