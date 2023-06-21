let akunRil = {
    hartaAktivaAsset: [
        {
            1: "Harta Lancar",
            jenis: [{ 1: "Kas" }, { 2: "Piutang" }, { 3: "Persediaan" }]
        },
        {
            2: "Harta Tetap"
        },
        {
            3: "Investasi"
        }
    ],
    hutangKewajiban: [
        {
            1: "Hutang Jangka Pendek",
            jenis: [{ 1: "Hutang Usaha" }, { 2: "Hutang Beban" }]
        },
        {
            2: "Hutang Jangka Panjang",
            jenis: [{ 1: "Hutang Bank" }, { 2: "Hutang Lainya" }]
        }
    ],
    mdoal: [
        {
            1: "Modal Pemilik",
        },
        {
            2: "Modal Saham"
        }
    ]
}

let akunNominal = {
    pendapatan: [
        {
            1: "Pendapatan Usaha"
        },
        {
            2: "Pendapatan Lainya"
        }
    ],
    bebanBiaya: [
        {
            1: "Beban Usaha"
        },
        {
            2: "Beban Lainya"
        }
    ]
}

// let akun = [akunRil, akunNominal]

const akun = {
    "Akun Ril": {
        "Harta / Asset / Aktiva": {
            "Harta Lancar": ["Kas", "Piutang", "Persediaan"],
            "Harta Tetap": ["-"],
            "Investasi": ["-"]
        },
        "Hutang / Kewajiban": {
            "Hutang Jangka Pendek": ["Hutang Usaha", "Hutang Beban"],
            "Hutang Jangka Panjang": ["Hutang Bank", "Hutang BebaLainya"]
        },
        "Modal": {
            "Modal Pemilik": ["-"],
            "Modal Saham": ["-"]
        }
    },
    "Akun Nominal": {
        "Pendapatan": {
            "Pendapatan Usaha": ["-"],
            "Pendapatan Lainya": ["-"]
        },
        "Beban / Biaya": {
            "Beban / Biaya Usaha": ["-"],
            "Beban / Biaya Lainya": ["-"]
        }
    }
}



















let productDetail1 = [{price: 25000, qty: 20, from: 'initial', date: '01/11/2021'}, {price: 20000, qty: 10, from: 'purchase', date: '21/01/2022'}]
let productDetail2 = [{price: 25000, qty: 13, from: 'initial', date: '01/11/2021'}, {price: 23000, qty: 5, from: 'purchase', date: '05/12/2021'}]

let firstStock1 = [productDetail1.reduce((acc, curr) => acc + curr.qty, 0), 3]
let firstStock2 = [productDetail2.reduce((acc, curr) => acc + curr.qty, 0), 2]
let opname = firstStock1[0] - firstStock1[1]


const deductStock = (targetStock, opname) => {
    let stock = targetStock.map(val => val)
    let remainingOpname = opname
    let deductedStock = []

    if( opname >= 0 ) {
        for ( let i = 0; i < stock.length; i++ ) {
            let currentQty = stock[i].qty
            let deductedQty = 0
      
            if ( currentQty >= 0 ) {
                deductedQty = Math.min(remainingOpname, currentQty)
                stock[i].qty -= deductedQty
                remainingOpname -= deductedQty
            }
    
            deductedStock.push({ price: stock[i].price, qty: deductedQty, from: stock[i].from, date: stock[i].date })
        }
    } 
    if( opname < 0 ) stock[stock.length - 1].qty -= opname
  
    
    return { updatedStock: stock, deductedStock }
}

const transferStock = (deductedStock, targetStock) => {
    let combinedStock = deductedStock.map((val) => {
        return { price: val.price, qty: 0, from: val.from, date: val.date }
    })
    
    combinedStock = combinedStock.concat(targetStock)
    
    combinedStock = combinedStock.reverse().filter((item, i) => {
        return (i == combinedStock.findIndex((val) => {
            return val.price == item.price && val.date == item.date
        }))
    })
    
    let transferredStock = combinedStock.map((val, i) => {
        deductedStock.forEach(x => {
            if( x.price == val.price && x.date == val.date ) val.qty += x.qty
        })
        
        return val
    })

    transferredStock.sort((a, b) => new Date(a.date) - new Date(b.date))
    return transferredStock
}


let result = deductStock(productDetail1, opname)
let transferredStock = transferStock(result.deductedStock, productDetail2)

// const betweenWarehouses = (updatedStock, transferredStock, targetStock, stock) => {
//     let remainingStock = transferredStock
//     let stockBefore = updatedStock(stock, transferredStock).updatedStock
//     let appendStock
//     let missingDetail = []
//     let duplicatedDetail = []

//     let allOfDetail = stockBefore.concat(targetStock)
//     allOfDetail = allOfDetail.filter((item, index) => {
//         return (
//             index === allOfDetail.findIndex(
//             (obj) =>
//                 obj.price === item.price &&
//                 obj.from === item.from &&
//                 obj.date === item.date
//             )
//         )
//     })
//     allOfDetail.sort((a, b) => new Date(a.date) - new Date(b.date))

//     // stockBefore.forEach((x, xi) => {
//     //     targetStock.forEach((y, yi) => {
//     //         if( x.price == y.price ) duplicatedDetail.push(x)
//     //         if( x.price != y.price ) missingDetail.push(x)
//     //         if( y.price != x.price ) missingDetail.push(y)
//     //     })
//     // })
//     // console.log(duplicatedDetail)
//     // console.log(missingDetail)

//     // appendStock = duplicatedDetail.concat(missingDetail)

//     // appendStock = appendStock.sort((a, b) => new Date(a.date) - new Date(b.date))

//     return { stockBefore, appendStock }
// }

// let afterResult = betweenWarehouses(deductStock, firstStock1[1], productDetail2, productDetail1)



// const moveQty = (productDetail1, productDetail2, opname) => {
//     for (let i = 0; i < productDetail1.length; i++) {
//         // Reduce the qty in the element by opname
//         productDetail1[i].qty -= opname

//         if (productDetail1[i].qty === 0) {
//             continue
//         }

//         if (!productDetail2.some(e => e.price === productDetail1[i].price)) {
//             // Add the element to the second variable
//             productDetail2.push(productDetail1[i])
//         }
//     }
//     productDetail2.forEach(e => e.qty += productDetail1.reduce((a, b) => a + b.qty, 0))
// }

// moveQty(productDetail1, productDetail2, opname)


// for (let i = 0; i < productDetail1.length && opname > 0; i++) {
//     let item = productDetail1[i];
//     let deduction = Math.min(opname, item.qty);
//     item.qty -= deduction;
//     opname -= deduction;
// }

// for (let i = 0; i < productDetail1.length; i++) {
//     let item = productDetail1[i];
//     let existingItemIndex = productDetail2.findIndex(
//         (el) => el.price === item.price
//     );
//     if (existingItemIndex !== -1) {
//         productDetail2[existingItemIndex].qty += item.qty;
//     } else {
//         productDetail2.push({ price: item.price, qty: item.qty, from: 'purchase', date: item.date });
//     }
// }


// console.log(productDetail1)
// console.log(productDetail2)

