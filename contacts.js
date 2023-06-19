const fs = require('fs/promises');
const { join } = require('path');
const shortid = require('shortid');

const contactsPath = join(__dirname, '/db/contacts.json');

const getListContact = async() => {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(contacts);
}
const getContactById = async(id) => {
    const contacts = await getListContact();
    const oneContact = contacts.find((contact) => contact.id === id);
    return oneContact;
}
const removeContact = async(id) => {
    const contacts = await getListContact();
    const indexContact = contacts.findIndex((contact) => contact.id === id);
    if(indexContact === -1){
        return null;
    }
    const [contact] = contacts.splice(indexContact, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));
    return contact;
}
const addContact = async(data) => {
    const contacts = await getListContact();
    const contact = {
        id: shortid.generate(),
        ...data
    }
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));
    return contact;
}

module.exports = {
    getListContact,
    getContactById,
    removeContact,
    addContact,
}