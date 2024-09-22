class DataFile {
    constructor(id, message) {
        this.id = id;
        this.message = message;
    }

    toString() {
        return `ID: ${this.id}, Message: ${this.message}`;
    }
}
module.exports = DataFile;

