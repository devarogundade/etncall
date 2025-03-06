<script setup lang="ts">
import { fineId } from '@/scripts/utils';
import { useWalletStore } from '@/stores/wallet';
import { useRoute } from 'vue-router';
import { createWeb3Modal } from '@web3modal/wagmi/vue';
import { useWeb3Modal } from '@web3modal/wagmi/vue';
import { config, chains } from '@/scripts/config';
import { watchAccount } from '@wagmi/core';
import { onMounted } from 'vue';

const route = useRoute();
const walletStore = useWalletStore();

createWeb3Modal({
    wagmiConfig: config,
    projectId: import.meta.env.VITE_PROJECT_ID,
    // @ts-ignore
    chains: chains,
    enableAnalytics: true,
    themeMode: 'dark'
});

const modal = useWeb3Modal();

onMounted(() => {
    watchAccount(config, {
        onChange: (account, prevAccount) => {
            walletStore.setAddress(account.address ?
                account.address :
                null
            );
        }
    });
});
</script>

<template>
    <section>
        <div class="app_width">
            <header>
                <RouterLink to="/">
                    <p>ETNCall</p>
                </RouterLink>

                <nav>
                    <RouterLink to="/bridge">Bridge</RouterLink>
                    <a href="https://devpost.com/software/etncall" target="_blank">Devpost</a>
                    <a href="https://github.com/devarogundade/etncall" target="_blank">Github</a>
                </nav>

                <RouterLink to="/bridge" v-if="route.name == 'home'">
                    <button>Token bridge</button>
                </RouterLink>

                <div v-else>
                    <button @click="modal.open()" v-if="!walletStore.address">Connect Wallet</button>
                    <button v-else>{{ fineId(walletStore.address) }}</button>
                </div>
            </header>
        </div>
    </section>
</template>

<style scoped>
section {
    position: sticky;
    top: 0;
    z-index: 10;
    background: var(--bg);
    border-bottom: 1px solid var(--bg-darkest);
}

header p {
    font-size: 34px;
    font-weight: 500;
    color: var(--tx-normal);
}

nav {
    display: flex;
    align-items: center;
    gap: 40px;
}

nav a {
    color: var(--tx-semi);
    font-size: 16px;
}

button {
    height: 50px;
    padding: 0 20px;
    background: var(--primary);
    color: var(--tx-normal);
    width: 200px;
    border: none;
    font-size: 16px;
    cursor: pointer;
}

header {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>