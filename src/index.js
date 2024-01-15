import { program } from "commander";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");


program.parse(process.argv);

const options = program.opts();

async function invokeAction() {
  const { action, id, name, email, phone } = options;

  switch (action) {
    case "list":
      console.table(await listContacts());
      break;

    case "get":
      console.log("Contact by ID:");
      console.log(await getContactById(id));
      break;

    case "remove":
      console.log("Removed contact:");
      console.log(await removeContact(id));
      break;

    case "add":
      console.log("Added contact:");
      console.log(await addContact(name, email, phone));
      break;

    default:
      console.warn("Unknown action. Available actions: list, get, remove, add.");
  }
}


invokeAction();