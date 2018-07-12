export default class GridNode {

    constructor (x = 0, y = 0, weight = 1) {
        this.x = x;
        this.y = y;
        this.weight = weight;
        this.closed = false;
        this.visited = false;
        this.parent = null;
        this.heuristic = null;
        this._cost = 1;
        this._score = 1;
    }

    get cost () {
        return this._cost;
    }
    set cost (val) {
        return this._cost = val
    }

    get score () {
        return this._score;
    }
    set score (val) {
        return this._score = val
    }

    get isWall () {
        return this.weight === 0;
    }

    clean () {
        this.f = 0;
        this.score = 0;
        this.heuristic = 0;
        this.visited = false;
        this.closed = false;
        this.parent = null;
    }

    toString () {
        return JSON.stringify([ this.x, this.y ]);
    }

}
