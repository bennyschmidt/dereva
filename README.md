# Dereva

[Dereva](https://github.com/bennyschmidt/dereva) is a deployable Node.js service that extends [`drv-core`](https://github.com/bennyschmidt/drv-core) with native content types and file storage enabling robust non-fungible records. For fungible systems, it allows any user with quantifiable Dereva (a minimum account balance of 0.0000000001) to define and alias their own token to sell or freely distribute in any amount and denomination they choose, limited to their account balance.

## Decentralization

Anyone can create their own token, or their own content protocol, by forking the [Dereva](https://github.com/bennyschmidt/dereva) repository and serving it to the web with their new token name and configuration. The codebase installs a local copy of `drv-core`, so that every instance of Dereva runs its own blockchain instance.

Transactions are broadcasted to other nodes in the peer network, who run their own validation logic to determine if it should be entered into their blockchain instance or not. Because everyone installs the same blockchain, the validation logic should be identical. But if a host tampers with their local blockchain code, they may yield different validation results than other nodes. Enforcing a protocol should vary depending on how strict it is, but it usually includes satisfying unit tests in order to be included in peer lists.

Anyone can determine the validity of a transaction against a certain confidence threshold by counting at any time how many instances have validated it versus how many instances are running. As more peers run a transaction, confidence is built, and upon a certain threshold determined by the user a transaction may be deemed valid.

When performing a basic balance inquiry or when transferring Dereva to another user, like any other request the values are determined functionally - that is, they are calculated at the time it's needed to be across a number of peer instances until the provided confidence threshold is met.

## Contracts

Contracts are agreements between participants in a transaction that are specified in the request by their string name (e.g. `{ contract: "DRV100" }`). Currently there are 2 kinds of contracts:

**[DRV100](https://github.com/bennyschmidt/DRV100) (Record)**

**[DRV200](https://github.com/bennyschmidt/DRV200) (Non-Fungible Record)**

Contracts can encompass just one, or many transactions, and even establish long-term payment schedules involving various layers of validation and user interaction.

## Usage

1. Fork this repository and make any desired changes or necessary extensions. For example, invent a new content type and change the way users interact through it, or create a digital currency that users can spend on goods and services in your app ecosystem.

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

- `DATA_URI`: Your [DSS Database](https://github.com/exactchange/dss) URI.
- `HOST`: The address at which you host this app.
- `PORT`: The port you're serving it over.
- `TOKEN_ADDRESS`, `TOKEN_NAME`, `TOKEN_LOGO_URL`, & `TOKEN_DENOMINATION`: This is the protocol info your peer instance will broadcast to the network. If your protocol instance is not for fungible token systems, you can just use `1` for the `TOKEN_DENOMINATION`.

3A. When your service is ready, add it to your existing infrastructure and begin selling your new token. Replenish your own token supply by purchasing [Dereva](https://exactchange.network/dereva/?app=shop).

or 3B. For content protocols, you shouldn't have a front-end component built into the protocol, and there is no token associated with it as in the case of NFT, you just need to keep your peer list up-to-date. If you want to monetize content in your protocol, that should happen in a separate app, and the protocol should be maintained as a standalone, open-source framework that others might extend.

## Node.js Boilerplate

You can also use this [Node.js boilerplate](https://github.com/bennyschmidt/node-dereva-boilerplate). Just clone the repo, add your `.env` and deploy.

## Topics

- [Decentralization](https://github.com/bennyschmidt/drv-core/blob/master/README.md#decentralization)
- [Contracts](https://github.com/bennyschmidt/drv-core/blob/master/README.md#contracts)
- [Validations](https://github.com/bennyschmidt/drv-core/blob/master/README.md#validations)
- [Enforcements](https://github.com/bennyschmidt/drv-core/blob/master/README.md#enforcements)
