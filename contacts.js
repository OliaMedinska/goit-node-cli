const fs = require('fs').promises;
import { join } from 'path';

const contactPath = join(__dirname, 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  } catch (error) {
    return null;
  }
}

async function removeContact(contactId) {
  try {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const contacts = JSON.parse(data);
  const index = contacts.findIndex((c) => c.id === contactId);

  if (index !== -1) {
    const removedContact = contacts.splice(index, 1);
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2), 'utf-8');
    return removeContact;
  } else {
    return null;
  }
  } catch (error) {
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const newContact = {
      id: Date.now.toString(),
      name,
      email,
      phone,  
    };
  
    contacts.push(newContact);
  
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2), 'utf-8');
    return newContact;
  } catch (error) {
    return null;
  }
};


export {listContacts, getContactById, removeContact, addContact};