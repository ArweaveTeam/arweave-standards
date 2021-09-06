# Arweave Web Wallet Extensions

This file demonstrates how an Arweave Web Wallet Extension should structure it's API so that all dApps, as well as `arweave-js` can use it properly. An implementation of this can be found at [th8ta/ArConnect](https://github.com/th8ta/ArConnect).

## Logic of the wallet

Arweave web wallet extensions are not just simple middlewares to sign transactions. They allow the user to interact with dApps in a more seamless way, similar to how Web 2 logins work.

A wallet extension should provide specific permissions for the API calls that the user has to approve. To do this, the extension should show a popup window on *connect*, to ask the user for these permissions. Ideally the wallet should also provide some sort of limitation of how much the specific dApp can spend from the user's wallet, because the popup won't show on each transaction signing.

Preferably the wallet should notify the user in an understandable way every time a transaction signing occurs.

## The global API object

All web wallet extensions should provide (inject) a field inside the browser's `window` object called `arweaveWallet`. This can be accessed via `window.arweaveWallet`. An example `d.ts` file of this object can be found in [injected-api.d.ts](injected-api.d.ts).

### Indicating the injection of the API object

When injected, the extension should fire a custom event (`arweaveWalletLoaded`) for the current tab. A sample code for this can be found below, and should be added to the end of the injected script:

```ts
dispatchEvent(new CustomEvent("arweaveWalletLoaded", { detail: {} }));
```

Developers will be able to listen to this event this way:

```ts
window.addEventListener("arweaveWalletLoaded", () => {
  /** Handle wallet extension loaded event **/
});
```

### Wallet Switch Event

If the extension provides multi-wallet support (the user is able to add more than 1 keyfile to the extension), the wallet extension should always fire a custom event (`walletSwitch`), with the new address associated to the active keyfile as a parameter. The extension can choose to only fire the event if the app has the permissions `ACCESS_ADDRESS` or `ACCESS_ALL_ADDRESSES`.

The event can be fired at the injected script:

```ts
dispatchEvent(new CustomEvent("walletSwitch", { detail: { address: newAddress } }));
```

Developers will be able to listen to this event this way:

```ts
window.addEventListener("arweaveWalletLoaded", () => {
  const newAddress = e.detail.address;
  /** Handle wallet extension wallet switch event **/
});
```

### Important API functions

These functions are used by `arweave-js` and they should be added to the global API object. See [njected-api.d.ts](injected-api.d.ts) for more.

#### `connect(permissions, appInfo?): Promise<void>`

Connect to the extension with a list of permissions and an optional application info (with a name and a logo).

#### `getActiveAddress(): Promise<string>`

Get the associated Arweave address to the currently active keyfile.

#### `getPermissions(): Promise<Permission[]>`

Get the list of allowed permissions to the current dApp.

#### `sign(transaction, options?): Promise<Transaction>`

Sign a transaction and return the signed transaction instance. Parameters of the function should match the one in [arweave-js](https://github.com/ArweaveTeam/arweave-js/blob/5d88c18d61f6dad522cd2b670641aae0733a783d/src/common/transactions.ts#L186) (except the `jwk` parameter).

### Other API functions

#### `disconnect(): Promise<void>`

Disconnect from the wallet extension.

#### `getAllAddresses(): Promise<string[]>`

Get all addresses added to the wallet extension.

#### `encrypt(data, options): Promise<Uint8Array>`

Encrypt a string with the user's wallet.

#### `decrypt(data, options): Promise<string>`

Decrypt a string encrypted with the user's wallet.

#### `signature(data, options): Promise<string>`

Get the signature for a data array.

### Permissions

The user needs to define at least one of these permissions when connecting, in an array of strings:

- `ACCESS_ADDRESS`: for [`getActiveAddress()`](#getactiveaddress-promisestring)

- `ACCESS_ALL_ADDRESSES`: for [`getAllAaddresses()`](#getalladdresses-promisestring)

- `SIGN_TRANSACTION`: for [`sign()`](#signaturedata-options-promisestring)

- `ENCRYPT`: for [`encrypt()`](#encryptdata-options-promiseuint8array)

- `DECRYPT`: for [`decrypt()`](#decryptdata-options-promisestring)

- `SIGNATURE`: for [`signature()`](#signaturedata-options-promisestring)

## Trust

To gain trust and ensure transparency, wallet extensions should be open source and accessible to the public. Clearly explaining how they work, if/how they take fees, and how they guard users' keyfiles is strongly recommended.
