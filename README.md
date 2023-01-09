# Dereva

[Dereva](https://github.com/bennyschmidt/dereva) is a deployable Node.js [service](https://github.com/bennyschmidt/node-service-library) that extends [`drv-core`](https://github.com/bennyschmidt/drv-core) with native content types and file storage, enabling robust non-fungible records in addition to fungible transactions. You can install & use it as a library, or deploy this code as a REST API. For fungible systems, it allows any user with quantifiable Dereva to alias & denominate their own token to sell or freely distribute.

## Decentralization

Anyone can create their own token, or their own content protocol, by forking the [Dereva](https://github.com/bennyschmidt/dereva) repository and serving it to the web with their new token name and configuration. The codebase installs a local copy of `drv-core`, so that every instance of Dereva runs its own blockchain instance. 

`drv-core` broadcasts transactions to other nodes in the peer network, who run their own validation logic to determine if it should be entered into their blockchain instance or not. Because everyone installs the same blockchain, the validation logic should be identical. But if a host tampered with their local blockchain code, they may yield different validation results than other nodes. Implementing a protocol layer on top of `drv-core` (like Dereva) is thus usually necessary, and enforcing it should vary depending on how strict it needs to be, but it usually includes satisfying unit tests in order to be retained in peer lists.

Anyone can determine the validity of a transaction against a certain confidence threshold by counting how many instances have validated it versus the total being queried. As more peers run a transaction, confidence is built, and upon a certain threshold determined by the user a transaction may be deemed valid.

When performing a basic balance inquiry or when transferring Dereva to another user, like any other request the values are determined functionally - in other words, calculated at the time it's needed to be across a number of peer instances until the provided confidence threshold is met.

## Contracts

Contracts are agreements between participants in a transaction that help enforce the protocol. The contract type is specified in the request by it's string name (e.g. `{ contract: "DRV100" }`). Currently there are 2 kinds of contracts:

**[DRV100](https://github.com/bennyschmidt/DRV100) (Record)**

**[DRV200](https://github.com/bennyschmidt/DRV200) (Non-Fungible Record)**

## Usage

1. The default export of this library is the service module only (built with [`node-service-library`](https://github.com/bennyschmidt/node-service-library). You can include this service in your existing Node.js project, or create a server from scratch by forking [`node-service-core`](https://github.com/bennyschmidt/node-service-core) and installing Dereva (`npm i dereva`).

2. Add an `.env` file to the root of your directory with the following scaffold:


```
  DATA_URI=
  HOST=
  PORT=
  TOKEN_ADDRESS=
  TOKEN_NAME=
  TOKEN_LOGO_URL=
  TOKEN_DENOMINATION=
```

- `DATA_URI`: Your [DSS Database](https://github.com/exactchange/dss) URI (just use the project directory `.`, or `path/to/storage`, see step 3).
- `HOST`: The address at which you host this app.
- `PORT`: The port you're serving it over.
- `TOKEN_ADDRESS`, `TOKEN_NAME`, `TOKEN_LOGO_URL`, & `TOKEN_DENOMINATION`: This is the protocol info your peer instance will broadcast to the network. If your protocol instance is not purposed for fungible token systems, you can just use `1` for the `TOKEN_DENOMINATION`.

3. For blockchain file storage, create a `path/to/storage/.dss/data/transactions.json` file populated with just `{}`. Keep the `.dss` file in your `.gitignore` to prevent committing data files to git.

## Node.js Boilerplate

Instead of the above 3 steps, you can simply clone this [Node.js boilerplate](https://github.com/bennyschmidt/node-dereva-boilerplate). Just add your `.env` file, a `.dss` directory, and deploy.

## Topics

- [Decentralization](https://github.com/bennyschmidt/drv-core/blob/master/README.md#decentralization)
- [Contracts](https://github.com/bennyschmidt/drv-core/blob/master/README.md#contracts)
- [Validations](https://github.com/bennyschmidt/drv-core/blob/master/README.md#validations)
- [Enforcements](https://github.com/bennyschmidt/drv-core/blob/master/README.md#enforcements)
