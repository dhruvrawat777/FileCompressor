import {BinaryHeap} from './heap';
export {HuffmanCoder}

class HuffmanCoder{
    //dfs on huffman tree to get encodings for all characters
    getMappings(node,path){
        if(typeof(node[1])=="string"){
            this.mappings[node[1]]=path;
            return;
        }
        this.getMappings(node[1][0],path+"0");
        this.getMappings(node[1][1],path+"1");
    }
    stringify(node){
        // adding ' to differentiate between characters
        if(typeof(node[1])==="string"){
            return '\''+node[1];
        }
        return '0'+this.stringify(node[1][0])+'1'+this.stringify(node[1][1]);
    }
    encode(data){
        this.heap=new BinaryHeap();
        const mp=new Map();         //For storing frequency
        for(let i=0;i<data.length;i++){         //Inserting elements in heap
            if(data[i] in mp){
                mp[data[i]]+=1;
            }
            else{
                mp[data[i]]=1;
            }
        }
        // Using max heap but we need minHeap so making value negative
        for(const key in mp){
            this.heap.insert([-mp[key],key]);
        }
        //Creating huffman tree
        while(this.heap.size()>1){
            const node1=this.heap.extractMax();
            const node2=this.heap.extractMax();
            const node=[node1[0]+node2[0],[node1,node2]];
            this.heap.insert(node);
        }
        const huffman_encoder=this.heap.extractMax();
        this.mappings={};
        this.getMappings(huffman_encoder,"");
        let binary_string="";
        //creating binary string
        for(let i=0;i<data.length;i++){
            binary_string=binary_string+this.mappings[data[i]];
        }
        //padding binary string to make it's length multiple of 8
        let rem=(8-binary_string.length%8)%8;
        let padding="";
        for(let i=0;i<rem;i++){
            padding=padding+"0";
        }
        binary_string+=padding;
    
        let result="";
        for(let i=0;i<binary_string.length;i+=8){
            let num=0;
            for(let j=0;j<8;j++){
                num=num*2+(binary_string[i+j]-"0");
            }
            result+=String.fromCharCode(num);
        }
        let final_res=this.stringify(huffman_encoder)+'\n'+rem+'\n'+result;
        let info="Compression ratio:"+data.length/final_res.length;
        info="Compression Complete and file sent for download"+'\n'+info;
        return [final_res,this.display(huffman_encoder,false),info];

    }
}