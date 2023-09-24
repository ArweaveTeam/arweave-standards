import { SignatureOptions } from "arweave/node/lib/crypto/crypto-interface";
import Transaction from "arweave/node/lib/transaction";

/**
 * Arweave wallet declarations
 */
declare global {
  interface Window {
    arweaveWallet: {
      /**
       * Connect to the extension and request permissions.
       *
       * @param permissions List of permissions requested.
       * @param appInfo Optional information about the dApp.
       */
      connect(permissions: PermissionType[], appInfo?: AppInfo): Promise<void>;

      /**
       * Disconnect from the extension. Removes all permissions from the dApp.
       */
      disconnect(): Promise<void>;

      /**
       * Get the currently used wallet's address in the extension.
       *
       * @returns Promise of wallet address string.
       */
      getActiveAddress(): Promise<string>;

      /**
       * Get all addresses added to the extension.
       *
       * @returns Promise of a list of the added wallets' addresses.
       */
      getAllAddresses(): Promise<string[]>;

      /**
       * Sign a transaction.
       *
       * @param transaction A valid Arweave transaction without a wallet keyfile added to it.
       * @param options Arweave signing options.
       *
       * @returns Promise of a signed transaction instance.
       */
      sign(
        transaction: Transaction,
        options?: SignatureOptions
      ): Promise<Transaction>;

      /**
       * Get the permissions allowed for the dApp site by the user.
       *
       * @returns Promise of a list of permissions allowed for the dApp.
       */
      getPermissions(): Promise<PermissionType[]>;

      /**
       * Encrypt a string, using the user's wallet.
       *
       * @param data String to encrypt.
       * @param options Encrypt options.
       *
       * @returns Promise of the encrypted string.
       */
      encrypt(
        data: string,
        options: {
          algorithm: string;
          hash: string;
          salt?: string;
        }
      ): Promise<Uint8Array>;

      /**
       * Decrypt a string encrypted with the user's wallet.
       *
       * @param data `Uint8Array` data to decrypt to a string.
       * @param options Decrypt options.
       *
       * @returns Promise of the decrypted string.
       */
      decrypt(
        data: Uint8Array,
        options: {
          algorithm: string;
          hash: string;
          salt?: string;
        }
      ): Promise<string>;

      /**
       * Get the signature for data array.
       *
       * @param data `Uint8Array` data to get the signature for.
       * @param algorithm Signature algorithm.
       *
       * @returns Promise of signature.
       */
      signature(
        data: Uint8Array,
        algorithm: any
      ): Promise<string>;
    };
  }
  interface WindowEventMap {
    /**
     * Wallet switch event, fired on keyfile change.
     */
    walletSwitch: CustomEvent<{ address: string }>;

    /**
     * The event fired when the extension has injected it's API in the `window` object.
     */
    arweaveWalletLoaded: CustomEvent<{}>;
  }
}

/**
 * The permissions available in your extension
 */
export type PermissionType =
  | "ACCESS_ADDRESS"
  | "ACCESS_ALL_ADDRESSES"
  | "SIGN_TRANSACTION"
  | "ENCRYPT"
  | "DECRYPT"
  | "SIGNATURE";

export interface AppInfo {
  name?: string;
  logo?: string;
}

export {};