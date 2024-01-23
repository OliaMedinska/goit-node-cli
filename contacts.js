const fs = require('fs').promises;
const path = require('path');
const { json } = require('stream/consumers');

const contactsPath = path.dirname("./db/contacts.json");

async function listContacts() {
    try {
        const contacts = await fs.readFile(contactsPath, 'utf-8');
        return contacts;
      } catch (error) {
        return [];
      }
  }
  
  async function getContactById(contactId) {
    try {
        const contacts = await fs.readFile(contactsPath, 'utf-8');
        const contact = contacts.find((c) => c.id === contactId);
        return contact || null;
    } catch (error) {
        return null;
    }
  }
  
  async function removeContact(contactId) {
    try {
        const contacts = await fs.readFile(contactsPath, 'utf-8');
        const index = contacts.findIndex((c) => c.id === contactId);

        if(index === -1){
            const removedContact = contacts.slice(index, 1);
            await fs.writeFile(contactsPath, contacts, 'utf-8');
            return removedContact;
        }else{
            return null;
        }
    } catch (error) {
        return null;
    }
  }
  
  async function addContact(name, email, phone) {
    try {
        const newContact = {
            id: Date.now().toString(),
            name,
            email,
            phone,
        }

        await fs.appendFile(contactsPath, JSON.stringify(newContact));
        return newContact;
    } catch (error) {
        return null;
    }
  }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };
