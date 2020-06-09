import namor from "namor";

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const dataDummy = () => {
    return {
        nama: namor.generate({ words: 2, numbers: 0 }),
        nilaiMax: Math.random() * 10,
        nilaiMin: Math.random() * 10,
        bobot: Math.floor(Math.random() * 10)
    };
};

export function makeData(len = 5553) {
    return range(len).map(d => {
        return {
            ...dataDummy(),
            children: range(10).map(dataDummy)
        };
    });
}