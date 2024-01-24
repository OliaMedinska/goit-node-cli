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
        console.table(await listContacts());
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




// Pobierz referencję do dynamicznego diva
const dynamicElement = document.querySelector('.');

// Utwórz funkcję obsługi zdarzenia
const handleMutation = (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.target === dynamicElement) {
      // Wykonywane, gdy zmienia się zawartość dynamicznego diva
      console.log('Zawartość dynamicznego diva została zmieniona:', dynamicElement.textContent);

      // Sprawdź zawartość i dodaj tekst w zależności od warunku
      if (dynamicElement.textContent.includes('Warunek 1')) {
        // Dodaj tekst w zależności od warunku
        const newText = 'Tekst dla Warunku 1';
        // Przykładowa akcja, np. dodanie tekstu do dokumentu
        document.body.appendChild(document.createTextNode(newText));
      } else if (dynamicElement.textContent.includes('Warunek 2')) {
        // Dodaj tekst w zależności od innego warunku
        const newText = 'Tekst dla Warunku 2';
        // Przykładowa akcja, np. dodanie tekstu do dokumentu
        document.body.appendChild(document.createTextNode(newText));
      }
    }
  }
};

// Utwórz obiekt MutationObserver
const observer = new MutationObserver(handleMutation);

// Skonfiguruj obserwację zmian wewnątrz dynamicznego diva
observer.observe(dynamicElement, { childList: true, subtree: true });