## Dereva

Dereva is a deployable digital ledger that operates on the [Decentralized Record of Value](https://github.com/exactchange/drv-core) protocol. Any user with a minimum account balance of 0.0000000001 Dereva may define and alias (name) their new token to sell or freely distribute to their users in any amount and denomination they choose, limited to their account balance. Derevas are bound to, and can only be spent in whichever economy they were disbursed. The protocol also supports non-fungible records like documents and user content.

## Decentralization

Anyone can create their own token protocol by forking the Dereva repository and serving it to the web with their new token name and configuration. The codebase installs a local copy of [drv-core](https://www.npmjs.com/package/drv-core), so that every instance of Dereva runs its own instance of the blockchain.

## Usage

1. Fork this repository and make any desired changes or necessary extensions. For example, invent a new content type and change the way users interact through it, or create a digital currency that users can spend on goods and services in your app ecosystem.

2. Add an `.env` file to the root of your directory with the following scaffold:


```
  API_KEY=
  API_URL=
  BLOCKCHAIN_DB_NAME=
  BLOCKCHAIN_MONGO_URI=
  HOST=
  PORT=
  TOKEN_ADDRESS=
  TOKEN_NAME=
  TOKEN_LOGO_URL=
  TOKEN_DENOMINATION=
```

- `API_KEY` & `API_URL`: Only required if you plan on using the built-in [Identity Client](https://github.com/exactchange/identity-client).
- `DATA_URI`: Your [DSS Database](https://github.com/exactchange/dss) URI.
- `HOST`: The address at which you host this app.
- `PORT`: The port you're serving it over.
- `TOKEN_ADDRESS`, `TOKEN_NAME`, `TOKEN_LOGO_URL`, & `TOKEN_DENOMINATION`: This is the protocol info your peer instance will broadcast to the network. If your protocol instance is not for fungible token systems, you can just use `1` for the `TOKEN_DENOMINATION`.

3A. When your service is ready, deploy it to the web and begin selling your new token. Replenish your own token supply by purchasing [Dereva](https://exactchange.network/dereva/?app=shop). 

or 3B. For content protocols, you shouldn't have a front-end component built into the protocol, and there is no token to sell, you just need to keep your peer list up-to-date. If you want to monetize content in your protocol, that should happen in a separate app, and the protocol should be maintained as a standalone, open-source framework that others might extend.

## Topics

- [Decentralization](https://github.com/exactchange/drv-core/blob/master/README.md#decentralization)
- [Contracts](https://github.com/exactchange/drv-core/blob/master/README.md#contracts)
- [Validations](https://github.com/exactchange/drv-core/blob/master/README.md#validations)
- [Enforcements](https://github.com/exactchange/drv-core/blob/master/README.md#enforcements)
- [Redundancy](https://github.com/exactchange/drv-core/blob/master/README.md#redundancy)
- [Trading](https://github.com/exactchange/drv-core/blob/master/README.md#trading)
- [Anonymous Tokens](https://github.com/exactchange/drv-core/blob/master/README.md#anonymous-tokens)
