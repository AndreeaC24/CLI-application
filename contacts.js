const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const { v4: uuidv4 } = require("uuid");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(
      (c) => c.id.toString() === contactId.toString()
    );
    return contact;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const aContact = contacts.filter(
      (c) => c.id.toString() !== contactId.toString()
    );
    await fs.writeFile(contactsPath, JSON.stringify(aContact));
    return aContact;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const aContact = [...contacts, { id: uuidv4(), name, email, phone }];
    await fs.writeFile(contactsPath, JSON.stringify(aContact));
    return aContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
