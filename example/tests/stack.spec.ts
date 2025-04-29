import {describe, expect, test} from 'vitest';
import Stack from '../entities/Stack';

describe('stack',() => {
    test('stack should be empty when initialized', () => {
        const stack = new Stack();
        expect(stack.isEmpty()).toBeTruthy();
    });
    test('stack should not be empty after pushing an element', () => {
        const stack = new Stack();
        stack.push(1);
        expect(stack.isEmpty()).toBeFalsy();
    });
    test('stack should be empty after popping the last element', () => {
        const stack = new Stack();
        stack.push(1);
        stack.pop();
        expect(stack.isEmpty()).toBeTruthy();
    });
    test('stack should not be empty after pushing multiple elements and popping one', () => {
        const stack = new Stack();
        stack.push(1);
        stack.push(2);
        stack.pop();
        expect(stack.isEmpty()).toBeFalsy();
    });

    test('can not pop on empty stack', () => {
        const stack = new Stack();
        expect(()=> stack.pop()).toThrowError('stack is empty');
    }
    );

    test('push 99 returns 99 when pop,  then pus 10 returns 10 when pop', () => {
        const stack = new Stack();
        stack.push(99);
        expect(stack.pop()).toEqual(99);
        stack.push(10);
        expect(stack.pop()).toEqual(10);
    }
    );
    test('push 99 returns 99 when pop, then push 10 returns 10 when pop', () => {
        const stack = new Stack();
        stack.push(99);
        stack.push(10);
        expect(stack.pop()).toEqual(10);
        expect(stack.pop()).toEqual(99);
    });
});
