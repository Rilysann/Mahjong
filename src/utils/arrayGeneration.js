export default function arrayGeneration() {
    let arr = [];

    function isPrime(x) {
        for (let i = 2; i < x; i++) {
            if (x % i === 0) return false;
        }

        return true;
    }

    for (let i = 2; i <= 60; i++) {
        if (isPrime(i)) arr.push(i);
    }

    arr[Math.floor(Math.random() * arr.length)] = 0;

    return arr.concat(arr).filter(x => x !== 0).sort(() => Math.random() - 0.5);
}