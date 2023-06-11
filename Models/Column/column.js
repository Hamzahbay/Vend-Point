module.exports = {
    data: [
        { name: 'id', dataType: 'INTEGER PRIMARY KEY AUTOINCREMENT', mode: 'DEFAULT' },
        { name: 'name', dataType: 'VARCHAR(12)', mode: 'MANUAL' },
        { name: 'path', dataType: 'TEXT', mode: 'MANUAL' },
        { name: 'permission', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'setPassword', dataType: 'BIT', mode: 'MANUAL' },
        { name: 'date', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'time', dataType: 'VARCHAR(20)', mode: 'MANUAL' }
    ],
    user: [
        { name: 'id', dataType: 'INTEGER PRIMARY KEY AUTOINCREMENT', mode: 'DEFAULT' },
        { name: 'name', dataType: 'VARCHAR(50)', mode: 'MANUAL' },
        { name: 'password', dataType: 'VARCHAR(100)', mode: 'MANUAL' },
        { name: 'role', dataType: 'VARCHAR(10)', mode: 'MANUAL' },
        { name: 'authority', dataType: 'JSON', mode: 'MANUAL' },
        { name: 'date', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'time', dataType: 'VARCHAR(20)', mode: 'MANUAL' }
    ],
    setting: [
        { name: 'id', dataType: 'INTEGER PRIMARY KEY AUTOINCREMENT', mode: 'DEFAULT' },
        { name: 'interactId', dataType: 'INTEGER', mode: 'MANUAL' },
        { name: 'effect', dataType: 'JSON', mode: 'MANUAL' },
        { name: 'date', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'time', dataType: 'VARCHAR(20)', mode: 'MANUAL' }
    ],
    memo: [
        { name: 'id', dataType: 'INTEGER PRIMARY KEY AUTOINCREMENT', mode: 'DEFAULT' },
        { name: 'title', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'description', dataType: 'TEXT', mode: 'MANUAL' },
        { name: 'detail', dataType: 'JSON', mode: 'MANUAL' },
        { name: 'date', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'time', dataType: 'VARCHAR(20)', mode: 'MANUAL' }
    ],
    account: [
        { name: 'id', dataType: 'INTEGER PRIMARY KEY AUTOINCREMENT', mode: 'DEFAULT' },
        { name: 'name', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'detail', dataType: 'JSON', mode: 'MANUAL' },
        { name: 'date', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'time', dataType: 'VARCHAR(20)', mode: 'MANUAL' }
    ],
    product: [
        { name: 'id', dataType: 'INTEGER PRIMARY KEY AUTOINCREMENT', mode: 'DEFAULT' },
        { name: 'name', dataType: 'VARCHAR(100)', mode: 'MANUAL' },
        { name: 'qty', dataType: 'VARCHAR(50)', mode: 'MANUAL' },
        { name: 'unit', dataType: 'VARCHAR(10)', mode: 'MANUAL' },
        { name: 'price', dataType: 'VARCHAR(100)', mode: 'MANUAL' },
        { name: 'date', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'time', dataType: 'VARCHAR(20)', mode: 'MANUAL' }
    ],
    supplier: [
        { name: 'id', dataType: 'INTEGER PRIMARY KEY AUTOINCREMENT', mode: 'DEFAULT' },
        { name: 'name', dataType: 'VARCHAR(100)', mode: 'MANUAL' },
        { name: 'note', dataType: 'TEXT', mode: 'MANUAL' },
        { name: 'date', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'time', dataType: 'VARCHAR(20)', mode: 'MANUAL' }
    ],
    buyer: [
        { name: 'id', dataType: 'INTEGER PRIMARY KEY AUTOINCREMENT', mode: 'DEFAULT' },
        { name: 'name', dataType: 'VARCHAR(100)', mode: 'MANUAL' },
        { name: 'type', dataType: 'VARCHAR(10)', mode: 'MANUAL' },
        { name: 'note', dataType: 'TEXT', mode: 'MANUAL' },
        { name: 'date', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'time', dataType: 'VARCHAR(20)', mode: 'MANUAL' }
    ],
    purchase: [
        { name: 'id', dataType: 'INTEGER PRIMARY KEY AUTOINCREMENT', mode: 'DEFAULT' },
        { name: 'supplierId', dataType: 'INTEGER', mode: 'MANUAL' },
        { name: 'detail', dataType: 'JSON', mode: 'MANUAL' },
        { name: 'note', dataType: 'TEXT', mode: 'MANUAL' },
        { name: 'date', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'time', dataType: 'VARCHAR(20)', mode: 'MANUAL' }
    ],
    purchaseInvoice: [
        { name: 'id', dataType: 'INTEGER PRIMARY KEY AUTOINCREMENT', mode: 'DEFAULT' },
        { name: 'purchaseId', dataType: 'INTEGER', mode: 'MANUAL' },
        { name: 'detail', dataType: 'JSON', mode: 'MANUAL' },
        { name: 'date', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'time', dataType: 'VARCHAR(20)', mode: 'MANUAL' }
    ],
    selling: [
        { name: 'id', dataType: 'INTEGER PRIMARY KEY AUTOINCREMENT', mode: 'DEFAULT' },
        { name: 'buyerId', dataType: 'INTEGER', mode: 'MANUAL' },
        { name: 'detail', dataType: 'JSON', mode: 'MANUAL' },
        { name: 'note', dataType: 'TEXT', mode: 'MANUAL' },
        { name: 'date', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'time', dataType: 'VARCHAR(20)', mode: 'MANUAL' }
    ],
    sellingInvoice: [
        { name: 'id', dataType: 'INTEGER PRIMARY KEY AUTOINCREMENT', mode: 'DEFAULT' },
        { name: 'sellingId', dataType: 'INTEGER', mode: 'MANUAL' },
        { name: 'detail', dataType: 'JSON', mode: 'MANUAL' },
        { name: 'date', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'time', dataType: 'VARCHAR(20)', mode: 'MANUAL' }
    ],
    expenses: [
        { name: 'id', dataType: 'INTEGER PRIMARY KEY AUTOINCREMENT', mode: 'DEFAULT' },
        { name: 'name', dataType: 'VARCHAR(100)', mode: 'MANUAL' },
        { name: 'type', dataType: 'VARCHAR(10)', mode: 'MANUAL' },
        { name: 'date', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'time', dataType: 'VARCHAR(20)', mode: 'MANUAL' }
    ],
    expensesInvoice: [
        { name: 'id', dataType: 'INTEGER PRIMARY KEY AUTOINCREMENT', mode: 'DEFAULT' },
        { name: 'expensesId', dataType: 'INTEGER', mode: 'MANUAL' },
        { name: 'detail', dataType: 'JSON', mode: 'MANUAL' },
        { name: 'note', dataType: 'TEXT', mode: 'MANUAL' },
        { name: 'date', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'time', dataType: 'VARCHAR(20)', mode: 'MANUAL' }
    ],
    inclusion: [
        { name: 'id', dataType: 'INTEGER PRIMARY KEY AUTOINCREMENT', mode: 'DEFAULT' },
        { name: 'name', dataType: 'VARCHAR(100)', mode: 'MANUAL' },
        { name: 'type', dataType: 'VARCHAR(10)', mode: 'MANUAL' },
        { name: 'date', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'time', dataType: 'VARCHAR(20)', mode: 'MANUAL' }
    ],
    inclusionInvoice: [
        { name: 'id', dataType: 'INTEGER PRIMARY KEY AUTOINCREMENT', mode: 'DEFAULT' },
        { name: 'inclusionId', dataType: 'INTEGER', mode: 'MANUAL' },
        { name: 'detail', dataType: 'JSON', mode: 'MANUAL' },
        { name: 'note', dataType: 'TEXT', mode: 'MANUAL' },
        { name: 'date', dataType: 'VARCHAR(20)', mode: 'MANUAL' },
        { name: 'time', dataType: 'VARCHAR(20)', mode: 'MANUAL' }
    ]
}