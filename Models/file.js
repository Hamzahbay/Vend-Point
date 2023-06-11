const fs = require('fs')

/**
 * Represents a class for working with files.
 * @class
 */
class File {
    /**
     * Creates a new instance of File.
     * @constructor
     * @param {string} dir - The directory where the file will be created or deleted.
     * @param {string} name - The name of the file.
     * @param {string} extension - The extension of the file.
     */
    constructor(dir, name, extension) {
        this.dir = dir
        this.name = name
        this.extension = extension
    }

    /**
     * Creates a new file with the given name and extension in the specified directory.
     * @param {any} data - The data to write to the new file.
     * @returns {Promise} A Promise that resolves an Object when the file has been created, or rejects with an error if the file could not be created.
     */
    create(data) {
        return new Promise((resolve, reject) => {
            try {
                fs.writeFileSync(`${this.dir}/${this.name}.${this.extension}`, data)
                resolve({ path: `${this.dir}`, name: `${this.name}.${this.extension}`, fullPath: `${this.dir}/${this.name}.${this.extension}`, data })
            } catch(err) {
                reject(`Error creating file: ${err}`)
            }
        })
    }

    /**
     * Deletes the file with the given name and extension from the specified directory.
     * @returns {Promise} A Promise that resolves when the file has been deleted, or rejects with an error if the file could not be deleted.
     */
    delete() {
        return new Promise((resolve, reject) => {
            try {
                fs.unlinkSync(`${this.dir}/${this.name}.${this.extension}`)
                resolve('File deleted successfully')
            } catch(err) {
                reject(`Error deleting file: ${err}`)
            }
        })
    }

    /**
     * Read files that has given from specified directory.
     * @returns {Promise} A Promise that resolves an object when the files has been read, or rejects with an error if the files could not be read.
     */
    read() {
        return new Promise((resolve, reject) => {
            try {
                let read = fs.readFileSync(`${this.dir}/${this.name}`)
                resolve({ path: `${this.dir}`, name: `${this.name}.${this.extension}`, fullPath: `${this.dir}/${this.name}.${this.extension}`, data: read })
            } catch (err) {
                reject(`Error reading files: ${err}`)
            }
        });
    }
}

module.exports = File
