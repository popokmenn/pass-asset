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
        kode: namor.generate({ words: 1, numbers: 0 }),
        nama: namor.generate({ words: 2, numbers: 0 }),
        masaManfaat: Math.floor(Math.random() * 10),
        penyusutan: Math.floor(Math.random() * 10)
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