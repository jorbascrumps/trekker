import Node from './Node';
import {
    DIAGONAL_MODE
} from './constants';

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

    getNeighbours ({ x, y }, diagonalMode = DIAGONAL_MODE.NEVER) {
        const grid = this.data;
        const nodes = {
            north: grid[y - 1] && grid[y - 1][x],
            northeast: grid[y - 1] && grid[y - 1][x + 1],
            east: grid[y] && grid[y][x + 1],
            southeast: grid[y + 1] && grid[y + 1][x + 1],
            south: grid[y + 1] && grid[y + 1][x],
            southwest: grid[y + 1] && grid[y + 1][x - 1],
            west: grid[y] && grid[y][x - 1],
            northwest: grid[y - 1] && grid[y - 1][x - 1]
        };
        let neighbours = [];

        nodes.north && nodes.north.weight &&
            neighbours.push(nodes.north);
        nodes.south && nodes.south.weight &&
            neighbours.push(nodes.south);
        nodes.east && nodes.east.weight &&
            neighbours.push(nodes.east);
        nodes.west && nodes.west.weight &&
            neighbours.push(nodes.west);

        if (diagonalMode === DIAGONAL_MODE.NEVER) {
            return neighbours;
        }

        if (diagonalMode === DIAGONAL_MODE.ALWAYS) {
            nodes.northeast && nodes.northeast.weight &&
                neighbours.push(nodes.northeast);
            nodes.southeast && nodes.southeast.weight &&
                neighbours.push(nodes.southeast);
            nodes.southwest && nodes.southwest.weight &&
                neighbours.push(nodes.southwest);
            nodes.northwest && nodes.northwest.weight &&
                neighbours.push(nodes.northwest);
        }

        if (diagonalMode === DIAGONAL_MODE.ONE_OBSTACLE) {
            nodes.northeast && (nodes.north.weight || nodes.east.weight) &&
                neighbours.push(nodes.northeast);
            nodes.southeast && (nodes.east.weight || nodes.south.weight) &&
                neighbours.push(nodes.southeast);
            nodes.southwest && (nodes.south.weight || nodes.west.weight) &&
                neighbours.push(nodes.southwest);
            nodes.northwest && (nodes.west.weight || nodes.north.weight) &&
                neighbours.push(nodes.northwest);
        }

        if (diagonalMode === DIAGONAL_MODE.NO_OBSTACLES) {
            nodes.northeast && (nodes.north.weight && nodes.east.weight) &&
                neighbours.push(nodes.northeast);
            nodes.southeast && (nodes.east.weight && nodes.south.weight) &&
                neighbours.push(nodes.southeast);
            nodes.southwest && (nodes.south.weight && nodes.west.weight) &&
                neighbours.push(nodes.southwest);
            nodes.northwest && (nodes.west.weight && nodes.north.weight) &&
                neighbours.push(nodes.northwest);
        }

        return neighbours;
    }

}
