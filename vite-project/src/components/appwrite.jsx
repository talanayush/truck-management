import { Client, Account, OAuthProvider } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('666d2c77003d7e8acfe5');

const account = new Account(client);

export { account, client };