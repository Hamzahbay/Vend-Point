const fs = require('fs')

/**
 * Represents a class for working with folders.
 * @class
 */
class Folder {
    /**
     * Creates a new instance of Folder.
     * @constructor
     * @param {string} dir - The directory where the folder will be created or deleted.
     * @param {string} name - The name of the folder to be created or deleted.
     */
    constructor(dir, name) {
        this.dir = dir
        this.name = name
    }

    /**
     * Creates a new folder with the given name in the specified directory.
     * @returns {Promise} A Promise that resolves an object when the folder has been created, or rejects with an error if the folder could not be created.
     */
    create() {
        return new Promise((resolve, reject) => {
            try {
                fs.mkdirSync(`${this.dir}/${this.name}`);
                resolve({ path: `${this.dir}`, name: `${this.name}`, fullPath: `${this.dir}/${this.name}` })
            } catch (err) {
                reject(`Error creating folder: ${err}`)
            }
        })
    }

    /**
     * Deletes the folder with the given name from the specified directory.
     * @returns {Promise} A Promise that resolves when the folder has been deleted, or rejects with an error if the folder could not be deleted.
     */
    delete() {
        return new Promise((resolve, reject) => {
            try {
                fs.rmdirSync(`${this.dir}/${this.name}`, { recursive: true })
                resolve('Folder deleted successfully')
            } catch (err) {
                reject(`Error deleting folder: ${err}`)
            }
        })
    }

    /**
     * Read folders that has given from specified directory.
     * @returns {Promise} A Promise that resolves an object when the folder has been read, or rejects with an error if the folder could not be read.
     */
    read() {
        return new Promise((resolve, reject) => {
            try {
                let read = fs.readdirSync(`${this.dir}/${this.name}`)
                resolve({ path: `${this.dir}`, name: `${this.name}`, fullPath: `${this.dir}/${this.name}`, data: read })
            } catch (err) {
                reject(`Error reading folder: ${err}`)
            }
        })
    }
}

module.exports = Folder
