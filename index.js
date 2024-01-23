const { program } = require('commander');
const { listContacts, getContactById, removeContact,addContact} = require('./contacts');
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        console.table(listContacts());
      break;

    case "get":
        console.log("Contact by ID:");
        console.log(await getContactById(id));
      break;

    case "add":
        console.log("Added contact:");
        console.log(await addContact(name, email, phone));
      break;

    case "remove":
        console.log("Removed contact:");
        console.log(await removeContact(id));
      break;

    default:
        console.warn("Unknown action. Available actions: list, get, remove, add.");
  }
}

invokeAction(options);