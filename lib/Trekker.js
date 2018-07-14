import Grid from './Grid';
import Heap from 'heap';
import {
    DIAGONAL_MODE
} from './constants';

export default class Trekker {

    static DIAGONAL_MODE = DIAGONAL_MODE;

    constructor (data = []) {
        this.grid = new Grid(data);
        this.dirty = [];
        this.diagonalMode = DIAGONAL_MODE.NEVER;
        this.processNeighbourFn = defaultNeighbourProcessing;
    }

    processNeighbour (fn) {
        this.processNeighbourFn = fn;

        return this;
    }

    enableDiagonal (value) {
        this.diagonalMode = value;

        return this;
    }

    search (startX, startY, endX, endY) {
        this.flush();

        const startNode = this.grid.getAt(startX, startY);
        const endNode = this.grid.getAt(endX, endY);

        let heap = new Heap(heapComparison);

        heap.push(startNode);
        while (!heap.empty()) {
            const current = heap.pop();
            if (current === endNode) {
                return this.toPath(current);
            }

            current.closed = true;

            const neighbours = this.grid.getNeighbours(current, this.diagonalMode);
            const numNeighbours = neighbours.length;

            for (let i = 0; i < numNeighbours; i ++) {
                const neighbour = neighbours[i];

                if (neighbour.closed || neighbour.isWall || !this.processNeighbourFn(current, neighbour)) {
                    continue;
                }

                const cost = current.score + neighbour.cost; // TODO
                const beenVisited = neighbour.visited;

                this.dirty.push(neighbour);
                if (!beenVisited || cost < neighbour.cost) {
                    neighbour.visited = true;
                    neighbour.parent = current;
                    neighbour.heuristic = neighbour.heuristic || heuristic(neighbour, endNode);
                    neighbour.cost = cost;
                    neighbour.score = neighbour.cost + neighbour.heuristic;

                    if (!beenVisited) {
                        heap.push(neighbour);
                    } else {
                        heap.rescoreElement(neighbour);
                    }
                }
            }
        }

        return [];
    }

    flush () {
        const numNodes = this.dirty.length;
        for (let i = 0; i < numNodes; i++) {
            this.dirty[i].clean();
        }

        this.dirty = [];
    }

    toPath (node) {
        let curr = node;
        let path = [];

        while (curr.parent) {
            path.unshift(curr);
            curr = curr.parent;
        }

        return path;
    }

}

const heapComparison = (a, b) =>
    a.score - b.score;

const heuristic = (pos0, pos1) =>
    Math.abs(pos1.x - pos0.x) + Math.abs(pos1.y - pos0.y);

const defaultNeighbourProcessing = () =>
    true;
