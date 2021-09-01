# Arweave Web Wallet Extensions

This file demonstrates how an Arweave Web Wallet Extension should structure it's API so that all dApps, as well as `arweave-js` can use it properly. An implementation of this can be found at [th8ta/ArConnect](https://github.com/th8ta/ArConnect).

## Logic of the wallet

Arweave web wallet extensions are not just simple middlewares to sign transactions. They allow the user to interact with dApps in a more seamless way, similar to how Web 2 logins work.

TODO: explain permissions, etc.

## The global API object

All web wallet extensions should provide (inject) a field inside the browsers `window` object called `arweaveWallet`. This can be accessed via `window.arweaveWallet`. 

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
