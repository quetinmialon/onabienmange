import EmptyStackError from "../errors/EmptyStackError";

export default class Stack{
    private index = 0;
    private elements : number[] = []
    isEmpty(): Boolean{
        return this.index === 0;
    }
    push(element : number): void{
        this.elements[this.index++] = element;
    }
    pop(): number{
        if(this.isEmpty()){
            throw new EmptyStackError('stack is empty');
        }
        return this.elements[--this.index];
    }
}