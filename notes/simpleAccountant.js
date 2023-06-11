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