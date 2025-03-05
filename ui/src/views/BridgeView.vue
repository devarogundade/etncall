<script setup lang="ts">
import { ref, watch } from 'vue';
import { config } from '@/scripts/config';
import BridgeContract from '@/scripts/contract';
import { TokenContract } from '@/scripts/erc20';
import { getChains, getTokens, NATIVE_TOKEN, toMoney } from '@/scripts/utils';
import { useWalletStore } from '@/stores/wallet';
import { switchChain } from '@wagmi/core';
import { formatEther, parseEther } from 'viem';
import { notify } from '@/reactives/notify';
import Button from '@/components/Button.vue';
import SemanticRed from '@/components/icons/SemanticRed.vue';
import SemanticGreen from '@/components/icons/SemanticGreen.vue';
import SwapIcon from '@/components/icons/SwapIcon.vue';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue';
import RefreshIcon from '@/components/icons/RefreshIcon.vue';
import TimeIcon from '@/components/icons/TimeIcon.vue';

const walletStore = useWalletStore();

const form = ref({
    froming: false,
    coining: false,
    interchange: false,
    bridging: false,
    approving: false,
    allowance: 0,
    bridge: {
        balance0: 0,
        balance1: 0,
        token: getTokens[0],
        bridgeFee: 0,
        amount: 0,
        from: {
            chain: getChains[0]
        },
        to: {
            chain: getChains[1]
        },
    },
});

const bridging = ref<boolean>(false);
const approving = ref<boolean>(false);

const refresh = () => {
    refreshAllowance();
    refreshBalance();

    notify.push({
        title: `Refreshing...`,
        description: `Your balance and allowances will be updated!.`,
        category: 'success'
    });
};

const refreshAllowance = async () => {
    if (!walletStore.address) return;

    let fromChain = form.value.bridge.from.chain;
    let toChain = form.value.bridge.to.chain;

    if (form.value.bridge.token.address[fromChain.id] == NATIVE_TOKEN) {
        form.value.allowance = Number.MAX_VALUE;
        return;
    }

    if (form.value.interchange) {
        fromChain = toChain;
    }

    const allowance = await TokenContract.getAllowance(
        form.value.bridge.token.address[fromChain.id],
        walletStore.address,
        BridgeContract.address[fromChain.id],
        fromChain.id
    );

    form.value.allowance = Number(formatEther(allowance));
};

const refreshBalance = async () => {
    if (!walletStore.address) return;

    const token0 = form.value.bridge.token.address[form.value.bridge.from.chain.id];
    const token1 = form.value.bridge.token.address[form.value.bridge.to.chain.id];

    const balance0 = await TokenContract.getTokenBalance(
        token0 == NATIVE_TOKEN ? undefined : token0,
        walletStore.address,
        form.value.bridge.from.chain.id
    );

    const balance1 = await TokenContract.getTokenBalance(
        token1 == NATIVE_TOKEN ? undefined : token1,
        walletStore.address,
        form.value.bridge.to.chain.id
    );

    form.value.bridge.balance0 = Number(formatEther(balance0));
    form.value.bridge.balance1 = Number(formatEther(balance1));
};

const approve = async () => {
    if (approving.value) return;
    approving.value = true;

    let fromChain = form.value.bridge.from.chain;
    let toChain = form.value.bridge.to.chain;

    if (form.value.interchange) {
        let tempFrom = fromChain;
        fromChain = toChain;
        toChain = tempFrom;
    }

    await switchChain(config, { chainId: fromChain.id });

    await TokenContract.approve(
        form.value.bridge.token.address[fromChain.id],
        BridgeContract.address[fromChain.id],
        parseEther(form.value.bridge.amount.toString())
    );

    refreshAllowance();

    approving.value = false;
};

const bridge = async () => {
    if (bridging.value) return;

    if (form.value.bridge.amount == 0) {
        notify.push({
            title: 'Enter an amount!',
            description: 'Field is required!',
            category: 'error'
        });
        return;
    }

    if (form.value.bridge.amount > 50) {
        notify.push({
            title: `Not much liquidity of ${form.value.bridge.token.symbol} in the pools`,
            description: `Use amount <= 100 ${form.value.bridge.token.symbol} Instead!`,
            category: 'error'
        });
        return;
    }

    bridging.value = true;

    let fromChain = form.value.bridge.from.chain;
    let toChain = form.value.bridge.to.chain;

    if (form.value.interchange) {
        let tempFrom = fromChain;
        fromChain = toChain;
        toChain = tempFrom;
    }

    await switchChain(config, { chainId: fromChain.id });

    const txHash = await BridgeContract.bridge(
        fromChain,
        toChain,
        form.value.bridge.token,
        parseEther(form.value.bridge.amount.toString())
    );

    if (txHash) {
        notify.push({
            title: 'Transaction sent',
            description: 'View transaction at the transactions page!',
            category: 'success',
            linkTitle: 'View Trx',
            linkUrl: '/'
        });
    } else {
        notify.push({
            title: 'Transaction failed',
            description: 'Try again!',
            category: 'error'
        });
    }

    bridging.value = false;

    refreshBalance();
};

watch(walletStore, () => {
    refreshBalance();
    refreshAllowance();
});

watch(form.value, () => {
    refreshBalance();
    refreshAllowance();
});
</script>

<template>
    <section id="section">
        <div class="app_width">
            <div class="container">
                <div class="bridge_rect">
                    <div class="bridge_rect_toolbar">
                        <p>Bridge</p>
                        <RefreshIcon @click="refresh" />
                    </div>

                    <div class="form_rect" :style="{ transform: form.interchange ? 'translateY(275px)' : '' }">
                        <div class="from_toolbar">
                            <p class="from_label0">{{ form.interchange ? 'To' : 'From' }}</p>
                            <div class="from_chain">
                                <div class="active_from_chain" @click="form.froming = !form.froming">
                                    <img :src="`/images/${form.bridge.from.chain.id}.png`" alt="">
                                    <p>{{ form.bridge.from.chain.name }}</p>
                                    <ArrowDownIcon />
                                </div>

                                <div class="inactive_from_chains" v-show="form.froming"
                                    @click="form.froming = !form.froming"
                                    :style="{ top: form.interchange ? '-35px' : '205px' }">
                                    <div class="chain" v-for="chain, index in getChains"
                                        @click="!form.interchange ? form.bridge.from.chain = chain : form.bridge.to.chain = chain;"
                                        :key="index">
                                        <img :src="`/images/${chain.id}.png`" alt="">
                                        <p>{{ chain.name }}</p>
                                        <SemanticGreen v-if="form.bridge.from.chain.id == chain.id" />
                                        <SemanticGreen v-else-if="form.bridge.to.chain.id == chain.id" />
                                    </div>
                                </div>
                            </div>

                            <div class="from_connection" v-if="!walletStore.address">
                                <SemanticRed />
                                <p>Connect</p>
                            </div>

                            <div class="from_connection" v-else>
                                <SemanticGreen />
                                <p>Connected</p>
                            </div>
                        </div>

                        <div class="from_input">
                            <div class="est" v-if="form.interchange">Est.</div>
                            <div class="max" v-else
                                @click="Number(formatEther(BigInt(form.bridge.balance0))) > 50 ? form.bridge.amount = 50 : form.bridge.amount = form.bridge.balance0">
                                Max
                            </div>
                            <input type="number" v-model="form.bridge.amount" placeholder="0.00">
                            <div class="currency" @click="form.coining = !form.coining">
                                <img :src="form.bridge.token.image" alt="">
                                <p>{{ form.bridge.token.symbol }}</p>
                                <ArrowDownIcon />

                                <div class="inactive_from_currencies" v-if="form.coining && !form.interchange">
                                    <div class="currency" v-for="token, index in getTokens"
                                        @click="form.bridge.token = token" :key="index">
                                        <img :src="token.image" alt="">
                                        <p>{{ token.name }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="from_balance">
                            <p>~${{ toMoney(form.bridge.token.price * form.bridge.amount) }}</p>
                            <p>Bal: <span>{{ toMoney(form.bridge.balance0) }}</span></p>
                        </div>

                    </div>

                    <div class="inter_change" @click="form.interchange = !form.interchange">
                        <div class="inter_change_border"> </div>
                        <SwapIcon :style="{ transform: form.interchange ? 'rotate(180deg)' : '' }" />
                    </div>

                    <div class="to_rect" :style="{ transform: form.interchange ? 'translateY(-280px)' : '' }">
                        <div class="to_toolbar">
                            <p class="from_label0">{{ !form.interchange ? 'To' : 'From' }}</p>
                            <div class="to_chain">
                                <div class="active_to_chain">
                                    <img :src="`/images/${form.bridge.to.chain.id}.png`" alt="">
                                    <p>{{ form.bridge.to.chain.name }}</p>
                                </div>
                            </div>


                            <div class="from_connection" v-if="!walletStore.address">
                                <SemanticRed />
                                <p>Connect</p>
                            </div>

                            <div class="to_connection" v-else>
                                <SemanticGreen />
                                <p>Connected</p>
                            </div>
                        </div>

                        <div class="to_input">
                            <div class="est" v-if="!form.interchange">Est.</div>
                            <div class="max" v-else @click="Number(formatEther(BigInt(form.bridge.balance1))) > 50 ?
                                form.bridge.amount = 50 :
                                form.bridge.amount = form.bridge.balance1">
                                Max
                            </div>

                            <input type="number" v-model="form.bridge.amount" placeholder="0.00">
                            <div class="currency" @click="form.coining = !form.coining">
                                <img :src="form.bridge.token.image" alt="">
                                <p>{{ form.bridge.token.symbol }}</p>
                                <ArrowDownIcon />

                                <div class="inactive_from_currencies" v-if="form.coining && form.interchange">
                                    <div class="currency" v-for="token, index in getTokens"
                                        @click="form.bridge.token = token" :key="index">
                                        <img :src="token.image" alt="">
                                        <p>{{ token.name }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="to_balance">
                            <p>~${{ toMoney((form.bridge.token.price * form.bridge.amount)) }}</p>
                            <p>Bal: <span>{{ toMoney(form.bridge.balance1) }}</span></p>
                        </div>
                    </div>

                    <div class="view_route">
                        <Button v-if="form.allowance < form.bridge.amount" :progress="approving"
                            :text="'Approve ' + form.bridge.token.symbol" @click="approve" />
                        <Button v-else :progress="bridging || approving" :text="'Bridge'" @click="bridge" />
                    </div>

                    <div class="schedule">
                        <div class="est_time">
                            <p>Est. time</p>
                            <div>
                                <TimeIcon />
                                <p>30secs - 1min</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
    padding: 60px 0;
    flex-direction: column;
}

.note {
    width: 450px;
    max-width: 100%;
}

.note a {
    color: var(--primary-light);
    text-decoration: underline;
}

.note p {
    text-align: center;
    color: var(--tx-semi);
    font-family: Avenir;
    font-size: 14px;
    font-weight: 500;
}

.bridge_rect {
    width: 500px;
    max-width: 100%;
    flex-shrink: 0;
    border-radius: 14px;
    border: 2px solid var(--bg-darkest);
    background: var(--bg-dark);
    padding: 24px;
}

.bridge_rect_toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 0;
}

.bridge_rect_toolbar p {
    color: var(--tx-normal);
    font-size: 20px;
    font-weight: 800;

}

.bridge_rect_toolbar svg {
    display: inline-flex;
    padding: 9px;
    align-items: flex-start;
    gap: 10px;
    width: 38px;
    height: 38px;
    cursor: pointer;
    border-radius: 12px;
    border: 1px solid var(--bg-darkest);
}

.form_rect,
.to_rect {
    border-radius: 8px;
    background: var(--bg-darker);
    margin-top: 20px;
    padding: 0 16px;
    padding-bottom: 24px;
}

.from_toolbar,

.to_toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-image: linear-gradient(to right, var(--primary-light) 3%, var(--bg-darkest) 3%, var(--bg-darkest) 97%, var(--primary-light) 97%) 1;
    border-bottom-width: 1px;
    border-bottom-style: solid;
}

.active_from_chain,
.active_to_chain {
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid var(--primary-dark, #327EA8);
    height: 56px;
    padding: 0 14px;
    position: relative;
    user-select: none;
    cursor: pointer;
    text-align: center;
}

.active_from_chain img,
.active_to_chain img {
    width: 24px;
    height: 24px;
    border-radius: 12px;
}

.active_from_chain p,
.active_to_chain p {
    color: var(--tx-normal);
    font-size: 16px;
    font-weight: 800;
}

.inactive_from_chains {
    border-radius: 6px;
    border: 1px solid var(--bg-darker);
    background: var(--bg-dark);
    position: absolute;
    transform: translate(-50%, 50%);
    left: 50%;
    z-index: 3;
    width: 200px;
    padding: 0 16px;
    user-select: none;
}

.inactive_from_chains .chain {
    border-bottom: 1px solid var(--bg-darker);
    height: 64px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.inactive_from_chains p {
    color: var(--tx-normal);
    font-size: 16px;
    font-weight: 800;
    width: 120px;
}

.inactive_from_chains img {
    width: 24px;
    height: 24px;
    border-radius: 12px;
}


.from_chain>svg,
.to_chain>svg {
    margin-left: 2px;
}

.from_label0,
.to_label0 {
    color: var(--tx-dimmed);
    font-size: 16px;
    font-weight: 500;
    width: 110px;
}

.from_connection,
.to_connection {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 110px;
    justify-content: flex-end;
    cursor: pointer;
    user-select: none;
}

.from_connection p,
.to_connection p {
    color: var(--tx-dimmed);
    font-size: 12px;
    font-weight: 500;
}

.from_input,
.to_input {
    margin-top: 30px;
    display: flex;
    gap: 16px;
}

.max,
.est {
    width: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 3px;
    background: var(--bg-darkest, #0A1D2E);
    color: var(--primary);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
}

.est {
    color: var(--tx-semi);
}

.from_input input,
.to_input input {
    width: 100%;
    color: var(--tx-normal);
    font-size: 20px;
    font-weight: 900;
    background: transparent;
    border: none;
    outline: none;
}

.from_input .currency,
.to_input .currency {
    width: 110px;
    display: flex;
    align-items: center;
    gap: 6px;
    position: relative;
}

.currency img {
    width: 24px;
    height: 24px;
    border-radius: 12px;
}

.currency p {
    color: var(--tx-normal);
    font-size: 16px;
    font-weight: 800;

}

.currency>svg {
    margin-left: 2px;
}

.inactive_from_currencies {
    position: relative;
    border-radius: 6px;
    border: 1px solid var(--bg-darker);
    background: var(--bg-dark);
    position: absolute;
    top: 35px;
    right: 0;
    z-index: 3;
    width: 200px;
    padding: 0 16px;
}

.inactive_from_currencies .currency {
    border-bottom: 1px solid var(--bg-darker);
    height: 64px;
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    cursor: pointer;
}

.from_balance,
.to_balance {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.from_balance p,
.to_balance p {
    color: var(--tx-dimmed);
    font-size: 14px;
    font-weight: 500;
}

.from_balance p span,
.to_balance p span {
    color: var(--tx-normal);
    font-weight: 800;
}

.inter_change {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    cursor: pointer;
    user-select: none;
    position: relative;
}

.inter_change_border {
    border-radius: 12px;
    border: 1px solid #182D40;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
}

.inter_change svg:last-child {
    position: absolute;
}


.view_route {
    margin-top: 40px;
}

.schedule {
    margin-top: 20px;
}

.est_time {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 52px;
}

.est_time>p {
    color: var(--tx-normal);
    font-size: 16px;
    font-weight: 500;
}

.est_time div {
    display: flex;
    align-items: center;
    gap: 10px;
}

.est_time div p {
    color: var(--tx-dimmed);
    font-size: 14px;
    font-weight: 500;
}
</style>