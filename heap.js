class BinaryHeap {
    constructor() {
        this.heap = [];
    }
    size() {
        return this.heap.length;
    }
    empty() {
        if (this.size() == 0) {
            return true;
        }
        return false;
    }
    insert(value) {
        this.heap.push(value);
        this.bubbleUp();
    }
   
}