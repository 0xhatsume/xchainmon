# X-ChainMon (Cross-Chain-Mon)
XchainMon (Cross-Chain-Mon) is a project born from Eth Global Hackathon 2024 (Singapore) to showcase a pokemon styled game span across various EVM chains with AI NPCs and Dynamic wallet on-boarding.

#### Hackathon Features in the Project

1. It uses <mark>Dynamic Labs</mark> to onboard users with a custom UI and also connect their wallet.
   ```
   (in mud-deployment/client/src/index.tsx)

   line 24 - 33:

    const config = createConfig({
      chains: [sepolia, morphHolesky, rootstockTestnet, flowTestnet],
      multiInjectedProviderDiscovery: false,
      transports: {
        [sepolia.id]: http(),
        [morphHolesky.id]: http(),
        [rootstockTestnet.id]: http(),
        [flowTestnet.id]: http()
      },
    });
   

   line 40 - 56:

    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <DynamicWagmiConnector> ...



    (in mud-deployment/client/src/components/Navbar/index.tsx)
    line 16 - 18:

     <span className="bg-transparent w-[250px] ml-auto">
                <DynamicWidget/>
            </span>
   
   ```

1. The game stack library uses <mark>[Mud.dev]</mark>(https://mud.dev/) ([https://mud.dev/quickstart](https://mud.dev/quickstart)) to create a shared game state that is replicated across various chains.

2. Players move around the Pokemon-styled map and capture Monsters unique to each chain only. **But inorder to complete their "Pokedex", they need to capture monsters from other chains**.

3. Each player and monster is a unique ERC721 token. As each players data is only record on their respective chain, we use <mark>Chainlink's CCIP</mark> to bridge the monsters and players across "Portals" for them to retain consistent ownership across chains.

4. Players can also interact with NPCs on the map which are AI controlled via LLM models with the help of <mark>Phala network's TEE</mark> and backend validations to ensure truthful inference.
   ```
   (in ai-server/ServerAgent.ts)

    line 29 - 32:

   const openai = new OpenAI({
        baseURL: 'https://api.red-pill.ai/v1',
        apiKey: env.REDPILL_OPENAI_API_KEY,
    })

    line 108 - 111:
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
   ```

#### References

1. Dynamic Labs: https://docs.dynamic.xyz/
2. Mud.dev: https://mud.dev/
3. Phala Network: https://docs.phala.network/
4. Chainlink CCIP: https://docs.chain.link/ccip
5. [AI NPC](https://github.com/dzoba/gptrpg) repository


#### Deployments

We deployed the the following chains (testnets):

1. Eth Sepolia
2. Base Sepolia
3. Morph Testnet
4. Rootstock Testnet

