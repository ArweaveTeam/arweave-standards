
# Arweave-id custom gateway

## Motivation

This document is meant as an example, to highlight how a 2nd layer service can bring extra utility to the Arweave network. It is an intentionally a simple example.

## Description of arweave-id and initial problem

arweave-id names are registered by mining a transaction with a certain data schema, and that transaction says `my arweave-id is Bill Gates`. To lookup an arweave-id for a given wallet address, you query for a transaction from that wallet address matching that data schema, get the latest transaction, and you have that persons arweave-id.

This is a simple scheme but has two problems:

1. Two people can claim the exact same name, two people can mine a valid transaction with the name 'Bill Gates' and when you lookup either wallet they will correctly give back 'Bill Gates' as the name. So there is no uniqueness of names.

2. It doesn't provide a way to do a reverse lookup of names, ie, resolve 'Bill Gates' back to a wallet address. This is obvious, because of point 1. How would you pick one wallet address out of the 50 that calls themselves 'Bill Gates'.

## A 2nd layer gateway to the rescue

To solve the uniqueness problem is very simple, and once we solve the uniqueness problem, we solve the
other problem too.

To solve the uniqueness problem, it's a matter of ordering. The first person to claim the name 'Bill Gates' should own that name, any transactions that claim that name afterwards, should be considered invalid. The issue here is that, to know who claimed the name 'Bill Gates' first, you need a complete history of all arweave-id transactions. It's not practical for a client who just wishes to resolve a wallet address to a name to maintain or query this complete history arweave-id transactions.

This is where our 2nd layer gateway sits. This gateway only does a single thing: It maintains a list of all transactions that are `arweave-id` transactions, and it answers queries for resolving a wallet address to a name, and trivially, the reverse.

## Implementing the 2nd layer gateway

There are basically two methods at this time:

1. Run a full node, discard any transactions that aren't arweave-id transactions, provide an API while getting rewarded for storing a proportion of the weave as a participant of the Arweave network.

2. Synchronize the relevant transactions from another public gateway, keeping up to date on any new transactions and use that data to provide an API

## Further Notes

This is a simple example of a 2nd layer gateway understanding the data schema of certain transactions, enforcing some extra rules and providing an API or a capability on top this understanding that would be impractical for clients to do on their own.
