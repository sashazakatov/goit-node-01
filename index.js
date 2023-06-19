// const argv = require('yargs').argv;
const { getListContact, getContactById, removeContact, addContact } = require('./contacts');

// TODO: рефакторить
const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await getListContact();
      console.log(contacts);
      break;
    case 'get':
      const contact = await getContactById(id);
      console.log(contact);
      break;
    case 'add':
      const addedContact = await addContact({name, email, phone});
      console.log(addedContact);
      break;
    case 'remove':
      const removedContact = await removeContact(id);
      console.log(removedContact);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction({action:"add", name:"Sasha Zakatov", email:"sashaZakatov@gmail.com", phone:"3806964989"});


// invokeAction(argv)