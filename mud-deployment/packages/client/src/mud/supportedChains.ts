/*
 * The supported chains.
 * By default, there are only two chains here:
 *
 * - mudFoundry, the chain running on anvil that pnpm dev
 *   starts by default. It is similar to the viem anvil chain
 *   (see https://viem.sh/docs/clients/test.html), but with the
 *   basefee set to zero to avoid transaction fees.
 * - latticeTestnet, our public test network.
 *

 */

import { MUDChain, latticeTestnet, mudFoundry } from "@latticexyz/common/chains";
import { defineChain } from "viem";

export const taikoHekla = /*#__PURE__*/ defineChain({
    id: 167_009,
    name: 'Taiko Hekla L2',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
        http: ['https://rpc.hekla.taiko.xyz'],
        },
    },
    blockExplorers: {
        default: {
        name: 'Taikoscan',
        url: 'https://hekla.taikoscan.network',
        },
    },
    testnet: true,
})

/*
 * See https://mud.dev/tutorials/minimal/deploy#run-the-user-interface
 * for instructions on how to add networks.
 */
export const supportedChains: MUDChain[] = [taikoHekla, mudFoundry, latticeTestnet];
//export const supportedChains: MUDChain[] = [mudFoundry, latticeTestnet];
