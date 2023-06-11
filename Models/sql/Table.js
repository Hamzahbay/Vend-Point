const sqlite3 = require('sqlite3').verbose()

/**
 * Represents a class that does something useful.
 * @class
 */
class Table {
    /**
   * Creates a new instance of Table.
   * @constructor
   * @param {string} name - A string argument  for the name of the table.
   * @param {string} dir - A string argument the directory path of db file.
   */
    constructor(dir, name) {
        this.dir = dir
        this.name = name
        this.column = []
    }

    /**
     * Performs a task that creates an sqlite3 table.
     * @param {Array<{name: string, dataType: string, mode: 'DEFAULT' | 'MANUAL'}>} column - An array of objects representing the columns to create in the table.
     * @throws {string} If the `column` argument is not an array.
     * @returns {Promise<Object>} A Promise that resolves to an object with information about the newly created table, or rejects with an error message.     
     */
    CREATE(column) {
        const columnRows = []
        if( !Array.isArray(column) ) return Promise.reject('Column argument must be an array.')
        
        if( column.every(x => x.mode === 'MANUAL' || x.mode === 'DEFAULT') === false ) return Promise.reject('Properties mode of column must be DEFAULT or MANUAL.')

        this.column = column.map(({ name, dataType, mode }) => ({ name, dataType, mode }))

        for( const m of column ) {
            columnRows.push({ name: m.name, dataType: m.dataType })
        }
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.dir)

            const columnSyntax = columnRows.map(col => `${col.name} ${col.dataType}`).join(', ')
            const query = `CREATE TABLE ${this.name}(${columnSyntax})`

            db.serialize(() => {
                db.run(query, err => {
                    db.close()

                    if(err) {
                        console.log(`query: "${query}"`)
                        return reject(err)
                    }
                    return resolve({ tableName: this.name, column })
                })
            })
        })
    }

    /**
     * Performs a task that add column an sqlite3 table.
     * @param {{name: string, dataType: string, mode: 'DEFAULT' | 'MANUAL'}} column - An objects representing table columns.
     * @returns {Promise<string>} A promise that resolves to a success message or rejects with an error message.
     */
    ADD_COLUMN(column) {
        if( ['MANUAL', 'DEFAULT'].includes(column.mode) === false ) return Promise.reject('Properties mode of column must be DEFAULT or MANUAL.')
        
        return Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.dir)
            this.column.push({ name: column.name, dataType: column.dataType, mode: column.mode })

            const query = `ALTER TABLE ${this.name} ADD COLUMN ${column.name} ${column.dataType}`

            db.serialize(() => {
                db.run(query, err => {
                    db.close()

                    if(err) {
                        console.log(`query: "${query}"`)
                        return reject(err)
                    }
                    return resolve(`Column ${column.name} ${column.dataType} successfully added.`)
                })
            })
        })
    }

    /**
     * Performs a task that deletes an sqlite3 table.
     * @returns {Promise<string>} A promise that resolves to a success message or rejects with an error message.
     */
    DROP() {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.dir)

            const query = `DROP TABLE ${thi.name}`
    
            db.serialize(() => {
                db.run(query, err => {
                    db.close()

                    if(err) {
                        console.log(`query: "${query}"`)
                        return reject(err)
                    }
                    return resolve(`Table ${thi.name} deleted successfully.`)
                })
            })
        })
    }

    /**
     * Performs a task that describes an sqlite3 table.
     * @returns {Promise<string>} A promise that resolves to an object or rejects with an error message.
     */
    DESCRIBE() {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.dir)

            const query = `PRAGMA table_info(${this.name})`
    
            db.serialize(() => {
                db.all(query, (err, tables) => {
                    db.close()

                    if(err) {
                        console.log(`query: "${query}"`)
                        return reject(err)
                    }
                    return resolve(tables)
                })
            })
        })
    }

    /**
     * Performs a task that updates the name of an sqlite3 table.
     * @param {string} newName - A string argument for the new name of the table.
     * @returns {Promise<string>} A promise that resolves to a success message or rejects with an error message.
     */
    UPDATE(newName) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.dir)

            const query = `ALTER TABLE ${this.name} RENAME TO ${newName}`
    
            db.serialize(() => {
                db.run(query, err => {
                    db.close()

                    if(err) {
                        console.log(`query: "${query}"`)
                        return reject(err)
                    }
                    this.name = newName // update the current name to the new name
                    return resolve(`Table ${this.name} successfully update to ${newName}.`)
                })
            })
        })
    }

    /**
     * Performs a task that changes the data type of an sqlite3 table column.
     * @param {string} columnName - A string argument for the name of the column to change.
     * @param {string} newDataType - A string argument for the new data type of the column.
     * @returns {Promise<string>} A promise that resolves to a success message or rejects with an error message.
     */
    UPDATE_DATA_TYPE(columnName, newDataType) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.dir)

            const query = `ALTER TABLE ${this.name} ALTER COLUMN ${columnName} ${newDataType}`

            db.serialize(() => {
                db.run(query, err => {
                    db.close()

                    if(err) {
                        console.log(`query: "${query}"`)
                        return reject(err)
                    }
                    return resolve(`Column ${columnName} data type from ${this.name} changed to ${newDataType} successfully.`)
                })
            })
        })
    }

    /**
     * Performs a task that changes the name of an sqlite3 table column.
     * @param {string} columnName - A string argument for the name of the column to change.
     * @param {string} newColumnName - A string argument for the new name of the column.
     * @returns {Promise<string>} A promise that resolves to a success message or rejects with an error message.
     */
    UPDATE_COLUMN_NAME(columnName, newColumnName) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.dir)

            const query = `ALTER TABLE ${this.name} RENAME COLUMN ${columnName} TO ${newColumnName}`

            db.serialize(() => {
                db.run(query, err => {
                    db.close()

                    if(err) {
                        console.log(`query: "${query}"`)
                        return reject(err)
                    }
                    return resolve(`Column ${columnName} name from ${this.name} changed to ${newColumnName} successfully.`)
                })
            })
        })
    }

    /**
     * Performs a task that inserts data into an sqlite3 table.
     * Each object must have the same property as the column name in the table.
     * @param {Object.<string, any>} data - An object for the values to insert into the table.
     * @returns {Promise<string>} A promise that resolves to an object with information about the newly created table or rejects with an error message.
     */
    async INSERT(data) {
        await this.DESCRIBE().then(table => {
            this.column = this.column.map((val, i) => ({ name: table[i]['name'], dataType: table[i]['type'], mode: table[i]['dflt_value'] != null || table[i]['pk'] == 1 ? 'DEFAULT':'MANUAL' }))
        }).catch(err => console.log(err))
        let manualMode = this.column.filter(x => x.mode === 'MANUAL').map(x => x.name)
        let defaultMode = this.column.filter(x => x.mode === 'DEFAULT').map(x => x.name)
        manualMode = manualMode.map(val => `${val}`).join(',')

        if( Object.keys(data).every(x => this.column.find(y => y.name === x)) === false ) return Promise.reject('Properties name must be same as column name.')
        if( Object.keys(data).find(x => defaultMode.includes(x) == true) != undefined ) return Promise.reject("Properties isn't 'MANUAL' mode.")
        
        const $data = Object.assign({}, ...Object.keys(data).map(key => ({ [`$${key}`]: data[key] })))
        
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.dir)

            const values = Object.keys(data).map((val) => `$${val}`).join(",")
            const query = `INSERT INTO ${this.name} ${defaultMode.length > 0 ? `(${manualMode})` : ''} VALUES (${values})`

            db.serialize(() => {
                db.run(query, $data, err => {
                    db.close()

                    if(err) {
                        console.log(`query: "${query}"`)
                        return reject(err)
                    }
                    return resolve(data)
                })
            })
        })
    }

    /**
     * Performs a task that inserts data into an sqlite3 table.
     * Each object must have the same property as the column name in the table.
     * @param {Array<Object>} data - An Array of object for the values to insert into the table.
     * @returns {Promise<string>} A promise that resolves to an object with information about the newly created table or rejects with an error message.
     */
    async INSERT_MANY(data) {
        if( Array.isArray(data) === false ) return Promise.reject('Data argument must be an array.')
        await this.DESCRIBE().then(table => {
            this.column = this.column.map((val, i) => ({ name: table[i]['name'], dataType: table[i]['type'], mode: table[i]['dflt_value'] != null || table[i]['pk'] == 1 ? 'DEFAULT':'MANUAL' }))
        }).catch(err => console.log(err))
        let manualMode = this.column.filter(x => x.mode === 'MANUAL').map(x => x.name)
        let defaultMode = this.column.filter(x => x.mode === 'DEFAULT').map(x => x.name)
        
        if( data.every(x => Object.keys(x).every(y => this.column.find(z => z.name === y))) === false ) return Promise.reject('Properties name must be same as column name.')
        if( data.find(x => defaultMode.includes(...Object.keys(x)) == true) != undefined ) return Promise.reject("Properties isn't 'MANUAL' mode.")
        
        let $data = data.map(val => {
            return manualMode.reduce((acc, key) => {
                acc[key] = val[key]
                return acc
            }, {})
        })
        let finalData = $data
        manualMode = manualMode.map(val => `${val}`).join(',')
        $data = $data.map(x => Object.keys(x).map(y => `${x[y]}`)).flat()

        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.dir)

            const values = data.map(val => `(${Object.keys(val).map(() => `?`).join(',')})`).reduce((acc, curr) => acc + ',' + curr)
            const query = `INSERT INTO ${this.name} ${defaultMode.length > 0 ? `(${manualMode})` : ''} VALUES ${values}`
            
            db.serialize(() => {
                db.run(query, $data, err => {
                    
                    if(err) {
                        console.log(`query: "${query}"`)
                        return reject(err)
                    }
                    return resolve(finalData)
                })
            })
        })
    }

    /**
     * Performs a task that updates data in an sqlite3 table.
     * @param {Object} newData - An object representing the new data to update.
     * @param {Object} where - An object representing the WHERE clause to use for updating data.
     * @returns {Promise<string>} A promise that resolves to a success message or rejects with an error message.
     */
    UPDATE_DATA(newData, where) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.dir)

            const setValues = Object.keys(newData).map(key => `${key} = ?`).join(', ')
            const whereClause = Object.keys(where).map(key => `${key} = ?`).join(' AND ')

            const values = Object.values(newData).concat(Object.values(where))
            const query = `UPDATE ${this.name} SET ${setValues} WHERE ${whereClause}`

            db.serialize(() => {
                db.run(query, values, err => {
                    db.close()

                    if(err) {
                        console.log(`query: "${query}"`)
                        return reject(err)
                    }
                    return resolve(`Data updated successfully.`)
                })
            })
        })
    }

    /**
     * Performs a task that updates data in an sqlite3 table.
     * @returns {Promise<string>} A promise that resolves to a success message or rejects with an error message.
     */
    SELECT() {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.dir)

            const query = `SELECT * FROM ${this.name}`

            db.serialize(() => {
                db.run(query, (err, rows) => {
                    db.close()

                    if(err) {
                        console.log(`query: "${query}"`)
                        return reject(err)
                    }
                    return resolve(rows)
                })
            })
        })
    }

    /**
     * Performs a task that selects a specified column depending on the data.
     * @param {Object{where: string, equals: string}} whereData - An object argument for the data to match.
     * @returns {Promise<Array>} A promise that resolves to an array of objects representing the selected rows or rejects with an error message.
     */
    SELECT_SPECIFIED(whereData) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.dir)

            const query = `SELECT * FROM ${this.name} WHERE ${whereData.where} = ?`

            db.serialize(() => {
                db.all(query, [whereData.equals], (err, rows) => {
                    db.close()

                    if(err) {
                        console.log(`query: "${query}"`)
                        return reject(err)
                    }
                    return resolve(rows)
                })
            })
        })
    }
}

module.exports = Table
