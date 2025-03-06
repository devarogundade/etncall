<script setup lang="ts">
import Button from '@/components/Button.vue';
import OutIcon from '@/components/icons/OutIcon.vue';
import { notify } from '../reactives/notify';
import { ref } from 'vue';
import { switchChain } from '@wagmi/core';
import { config } from '@/scripts/config';
import { TokenContract } from '@/scripts/erc20';
import { getChains, getTokens } from '@/scripts/utils';
import { parseEther, type Hex } from 'viem';
import { useWalletStore } from '@/stores/wallet';
import { getFaucets } from '../scripts/utils';

const minting = ref<number>(-1);
const walletStore = useWalletStore();

const mint = async (chainId: number) => {
    if (!walletStore.address) {
        notify.push({
            title: 'Warning',
            description: 'Connect your wallet!',
            category: 'error'
        });
        return;
    }

    if (minting.value > -1) {
        notify.push({
            title: 'Warning',
            description: 'Waiting for on-going minting to finish!',
            category: 'error'
        });
        return;
    }

    minting.value = chainId;

    await switchChain(config, { chainId });

    let result: Hex | null = null;

    for (let index = 0; index < getTokens.length; index++) {
        result = await TokenContract.mint(chainId, getTokens[index], parseEther('10'));
    }

    if (result) {
        notify.push({
            'title': 'Transactions sent',
            'description': 'Tokens were minted!',
            'category': 'success',
            'linkTitle': 'Bridge',
            'linkUrl': '/bridge'
        });
    } else {
        notify.push({
            'title': 'Transactions failed',
            'description': 'Minting failed, Try again!',
            'category': 'error'
        });
    }

    minting.value = -1;
};
</script>

<template>
    <section>
        <div class="app_width">
            <div class="container">
                <div class="bridge_rect" v-for="chain in getChains" :key="chain.id">
                    <div class="bridge_rect_toolbar">
                        <p>{{ chain.name }}</p>

                        <div>
                            <a :href="getFaucets[chain.id]" target="_blank">Get {{ chain.nativeCurrency.symbol }}
                                <OutIcon />
                            </a>
                            <img :src="`/images/${chain.id}.png`" alt="">
                        </div>
                    </div>

                    <div class="form_rect">
                        <div class="coin" v-for="token in getTokens">
                            <div>
                                <img :src="token.image" alt="">
                                <p>{{ token.name }}</p>
                            </div>
                            <p><span>10</span> {{ token.symbol }} </p>
                        </div>
                    </div>

                    <div class="view_route" @click="mint(chain.id)">
                        <Button :progress="minting == chain.id" :text="'Mint all'" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>



<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 50px 0;
}

.bridge_rect {
    width: 450px;
    flex-shrink: 0;
    border-radius: 14px;
    border: 2px solid var(--bg-darkest);
    background: var(--bg-dark);
    padding: 24px;
}

.form_rect {
    border-radius: 8px;
    background: var(--bg-darker);
    margin-top: 30px;
    padding: 0 20px;
}

.bridge_rect_toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.bridge_rect_toolbar div {
    display: flex;
    align-items: center;
    gap: 20px;
}

.bridge_rect_toolbar a {
    padding: 8px 12px;
    background: var(--bg-darkest);
    color: var(--tx-normal);
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
}

.bridge_rect_toolbar>p {
    color: var(--tx-normal);
    font-size: 20px;
    font-weight: 800;
}

.bridge_rect_toolbar img {
    width: 30px;
    height: 30px;
    border-radius: 15px;
}

.coin {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    border-image: linear-gradient(to right, var(--primary-light) 3%, var(--bg-darkest) 3%, var(--bg-darkest) 97%, var(--primary-light) 97%) 1;
    border-bottom-width: 1px;
    border-bottom-style: solid;
}

.coin svg {
    cursor: pointer;
}

.coin div {
    display: flex;
    align-items: center;
    gap: 10px;
}

.coin div p {
    color: var(--tx-normal);
    font-size: 16px;
    font-weight: 800;
}

.coin:last-child {
    border: none;
}

.coin span {
    color: var(--tx-normal);
}

.coin>p {
    color: var(--tx-dimmed);
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
}

.coin img {
    height: 20px;
    height: 20px;
    object-fit: cover;
    border-radius: 10px;
}

.view_route {
    margin-top: 40px;
}
</style>