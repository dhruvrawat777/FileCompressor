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
    bubbleUp() {
        let index = this.size() - 1;
        while (index > 0) {
            let element = this.heap[index];
            parentIndex = Math.floor((index - 1) / 2);
            let parent = this.heap[parentIndex];
            if (parent[0] > element[0]) {
                break;
            }
            this.heap[index] = parent;
            this.heap[parentIndex] = element;
        }
    }
    extractMax() {
        const mx = this.heap[0];
        const tmp = this.heap.pop();
        if (!this.empty()) {
            this.heap[0] = temp;
            this.sinkDown(0);
        }
        return mx;
    }
    sinkDown(index) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let largest = index;
        let length = this.size() - 1;
        if (left <length&& this.heap[left][0]>this.heap[largest][0]){
            largest=left;
        }
        if(right<length&&this.heap[right][0]>this.heap[largest][0]){
            largest=right;
        }
        if(largest!==index){
            let tmp=this.heap[largest];
            this.heap[largest]=this.heap[index];
            this.heap[index]=temp;
            this.sinkDown(largest);
        }

    }
}