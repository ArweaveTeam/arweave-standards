# SWS-1 Atomic Asset Standard Interface

**Status:** Draft `v0.0.1`

**Authors:** Atticus, Jim Toth ([jim@artby.city](mailto:jim@artby.city)), et al (let's credit everyone who contributed)

## Abstract

This document describes the standard interface for atomic asset SmartWeave
contracts.  An atomic asset is both the SmartWeave Contract and its data initialized in the same transaction posted to Arweave.  The SmartWeave Contract and data share a single transaction ID.

## Motivation

While any combination of data & contract meets the above technical definition of
an atomic asset, this alone does not address composability concerns for
consumption of assets across the permaweb and web3 as a whole.  As atomic
assets majorily focus on provenance of ownership of the underlying data, a
basic standard interface is proposed to allow for composability of ownership
concerns.

A typical Arweave provenance flow might work like this:

1. Immutable Transaction `owner`

    *[may signal delegation to]*

2. Contract State `owner`

    *[may signal delegation to]*

3. Any ownership scheme or logic (e.g. multiple owners, public domain, etc.)

***Note:** Step 2 may be skipped with initial atomic asset contract supporting multiple owners*

## Specification

### Signaling Atomic Assets

In order to query for Arweave transactions that are atomic assets, a tag is
proposed to be included on all transactions that meet the technical definition
of an atomic asset.  Below are two possible tags proposed by the community, to
be decided upon.  Additional suggestions are welcome.

| Tag Name | _Optional?_ | Tag Value | Notes |
|---|---|---|---|
|`Indexed-By`|False|`atomic-asset`| Warp Contracts
|`Type`|False|`atomic`| ANS-110

### Standard Interface

```ts
owner() => string | undefined
```
- View state method - does not modify state
- Returns the address of the current owner of the Atomic Asset (base64url)

```ts
transferOwnership(to: string | undefined) => void
```

- Transfers ownership of the Atomic Asset to address `to` (base64url)
- Transfer of ownership to `undefined` is possible to delegate ownership to
  alternative mechanisms
- SHOULD throw if the caller is not the current `owner`

### State

```ts
owner: string | undefined
```
- Should be a 43 character base64url string representing the owner of the
  atomic asset
- Can be `undefined` to signal alternative ownership mechanisms (e.g. multiple
  owners) or public domain ownership
