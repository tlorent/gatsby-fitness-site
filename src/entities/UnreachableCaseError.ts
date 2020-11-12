// use this to make typescript check if a switch statement is exhaustive or not.
// what does exhaustive mean? basically, make sure that there is a switch case for each value of a type, otherwise give a compile error.

export class UnreachableCaseError extends Error {
    constructor(val: never) {
        super(`Unreachable case: ${val}`);
    }
}
