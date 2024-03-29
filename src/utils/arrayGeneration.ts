export default function arrayGeneration() {
    let arr: number[] = [];

    function isPrime(x: number): boolean {
        for (let i = 2; i < x; i++) {
            if (x % i === 0) return false;
        }

        return true;
    }

    for (let i = 2; i <= 55; i++) {
        if (isPrime(i)) arr.push(i);
    }

    return arr.concat(arr).filter(x => x !== 0).sort(() => Math.random() - 0.5);
}