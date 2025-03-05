<script setup lang="ts">
import FailedfulIcon from '@/components/icons/FailedfulIcon.vue';
import OngoingIcon from '@/components/icons/OngoingIcon.vue';
import SuccessfulIcon from '@/components/icons/SuccessfulIcon.vue';
import CopyIcon from '@/components/icons/CopyIcon.vue';
import LoadingBox from '@/components/LoadingBox.vue';
import OutIcon from '@/components/icons/OutIcon.vue';

import { format } from 'timeago.js';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Message } from '@/scripts/types';
import Client from '@/scripts/client';
import { formatEther, type Hex } from 'viem';
import { getChain, getToken } from '@/scripts/utils';

const route = useRoute();

const loading = ref<boolean>(true);
const message = ref<Message | null>(null);
const messageId = ref<Hex | undefined>(route.params.id as Hex | undefined);

const getMessage = async () => {
    if (!messageId.value) return;
    loading.value = true;
    const data = await Client.getMessage(messageId.value);
    message.value = data?.data || null;
    loading.value = false;
};

onMounted(() => {
    getMessage();
});
</script>

<template>
    <section id="section">
        <div class="app_width">
            <div class="title">
                <h3>Message Details</h3>
                <div class="hash">
                    <p>{{ messageId }}</p>
                    <CopyIcon />
                </div>
            </div>

            <LoadingBox v-if="loading" />

            <div class="message" v-else-if="message != null">
                <table>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Message Id:</td>
                                <td>
                                    <div class="hash">
                                        <p>{{ message.messageId }}</p>
                                        <CopyIcon />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Status:</td>
                                <td>
                                    <div class="status" v-if="message.status == 0">
                                        <OngoingIcon />
                                        <p>Pending</p>
                                    </div>
                                    <div class="status" v-if="message.status == 1">
                                        <OngoingIcon />
                                        <p>Processing</p>
                                    </div>
                                    <div class="status" v-if="message.status == 2">
                                        <SuccessfulIcon />
                                        <p>Successful</p>
                                    </div>
                                    <div class="status" v-if="message.status == 3">
                                        <FailedfulIcon />
                                        <p>Failed</p>
                                    </div>
                                    <div class="status" v-if="message.status == 4">
                                        <FailedfulIcon />
                                        <p>Will Retry</p>
                                    </div>
                                    <div class="status" v-if="message.status == 5">
                                        <OngoingIcon />
                                        <p>Retrying</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Source transaction hash:</td>
                                <td>
                                    <a v-if="message.fromTrxHash"
                                        :href="`${getChain(message.fromChainId)?.blockExplorers?.default?.url}/tx/${message.fromTrxHash}`"
                                        target="_blank">
                                        <div class="hash">
                                            <div class="img"><img :src="`/images/${message.fromChainId}.png`" alt="">
                                            </div>
                                            <p>{{ message.fromTrxHash }}</p>
                                            <OutIcon />
                                        </div>
                                    </a>
                                    <div class="hash" v-else>
                                        <div class="img"><img :src="`/images/${message.fromChainId}.png`" alt=""></div>
                                        <p>--------</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Destination transaction hash:</td>
                                <td>
                                    <a v-if="message.toTrxHash"
                                        :href="`${getChain(message.toChainId)?.blockExplorers?.default?.url}/tx/${message.toTrxHash}`"
                                        target="_blank">
                                        <div class="hash">
                                            <div class="img"><img :src="`/images/${message.toChainId}.png`" alt="">
                                                <p>{{ message.toTrxHash }}</p>
                                                <OutIcon />
                                            </div>
                                        </div>
                                    </a>
                                    <div class="hash" v-else>
                                        <div class="img"><img :src="`/images/${message.toChainId}.png`" alt=""></div>
                                        <p>--------</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Source user application:</td>
                                <td>
                                    <a :href="`${getChain(message.fromChainId)?.blockExplorers?.default?.url}/address/${message.sender}`"
                                        target="_blank">
                                        <div class="hash">
                                            <div class="img"><img :src="`/images/${message.fromChainId}.png`" alt="">
                                            </div>
                                            <p>{{ message.sender }}</p>
                                            <OutIcon />
                                        </div>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Destination user application:</td>
                                <td>
                                    <a :href="`${getChain(message.toChainId)?.blockExplorers?.default?.url}/address/${message.receiver}`"
                                        target="_blank">
                                        <div class="hash">
                                            <div class="img"><img :src="`/images/${message.toChainId}.png`" alt="">
                                            </div>
                                            <p>{{ message.receiver }}</p>
                                            <OutIcon />
                                        </div>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody" v-if="message.tokens.length > 0">
                        <tbody>
                            <tr>
                                <td>Tokens transferred:</td>
                                <td v-for="token, index in message.tokens" :key="index">
                                    <div class="token">
                                        <div class="img"><img :src="getToken(message.fromChainId, token.tokenId)?.image"
                                                alt=""></div>
                                        <p>{{ formatEther(BigInt(token.amount)) }} <span>{{
                                            getToken(message.fromChainId,
                                                token.tokenId)?.symbol
                                                }}</span></p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Message fee:</td>
                                <td>
                                    <div class="token">
                                        <div class="img"><img :src="`/images/${message.fromChainId}.png`" alt="">
                                        </div>

                                        <p>{{ formatEther(BigInt(message.fee)) }} <span>{{
                                            getChain(message.fromChainId)?.nativeCurrency }}</span></p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Sequence Number:</td>

                                <td class="nonce">{{ message.sequenceNumber }}</td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Created at:</td>

                                <td class="time">{{ format((message.initializedTimestamp || 0) * 1000) }},
                                    {{
                                        Intl.DateTimeFormat('en-US', {
                                            day: '2-digit',
                                            month: 'short'
                                        }).format((message.initializedTimestamp || 0) * 1000)
                                    }}
                                </td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody" v-if="message.status == 2">
                        <tbody>
                            <tr>
                                <td>Delivered at:</td>
                                <td class="time">{{ format((message.deliveredTimestamp || 0) * 1000) }},
                                    {{
                                        Intl.DateTimeFormat('en-US', {
                                            day: '2-digit',
                                            month: 'short'
                                        }).format((message.deliveredTimestamp || 0) * 1000)
                                    }}
                                </td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody" v-if="message.status == 3">
                        <tbody>
                            <tr>
                                <td>Failed at:</td>
                                <td class="time">{{ format((message.failedTimestamp || 0) * 1000) }},
                                    {{
                                        Intl.DateTimeFormat('en-US', {
                                            day: '2-digit',
                                            month: 'short'
                                        }).format((message.failedTimestamp || 0) * 1000)
                                    }}
                                </td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Payload:</td>
                                <td>
                                    <div class="payload">
                                        <p>{{ message.payload }}</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                </table>
            </div>
        </div>
    </section>
</template>


<style scoped>
#section {
    margin-top: 150px;
    padding-bottom: 60px;
}

.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title h3 {
    color: var(--tx-normal);
    font-size: 20px;
    font-weight: 600;
}

.title .hash {
    display: flex;
    align-items: center;
    gap: 16px;
}

.title .hash p {
    color: var(--tx-semi);
    font-size: 14px;
}

.title .hash svg {
    border-radius: 4px;
    background: var(--bg-darker);
    padding: 10px;
    width: 40px;
    height: 40px;
}


.message {
    border-radius: 8px;
    border: 2px solid var(--bg-darker);
    background: var(--bg-dark);
    width: 100%;
    margin-top: 30px;
}

table {
    width: 100%;
}

.tbody {
    border-bottom: 2px solid var(--bg);
    padding: 0 26px;
}

tbody {
    height: 70px;
}

td:first-child {
    width: 325px;
    color: var(--tx-semi);
    font-size: 14px;
    font-weight: 500;
}

.tbody .hash {
    display: flex;
    align-items: center;
    gap: 10px;
}

.tbody .hash .img {
    border-radius: 4px;
    background: var(--bg-darkest);
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tbody .hash img {
    width: 16px;
    height: 16px;
    border-radius: 8px;
}

.tbody .hash p {
    color: var(--tx-normal);
    font-size: 14px;
    font-weight: 500;
}


.token {
    display: flex;
    align-items: center;
    gap: 10px;
}

.token .img {
    border-radius: 4px;
    background: var(--bg-darkest);
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.token img {
    width: 16px;
    height: 16px;
    border-radius: 8px;
}

.token p {
    color: var(--tx-normal);
    font-size: 14px;
    font-weight: 500;
}

.tbody p span {
    color: var(--tx-semi);
}

.hash svg {
    width: 16px;
    height: 16px;
}

.nonce,
.time {
    color: var(--tx-normal);
    font-size: 14px;
    font-weight: 500;
}


.status {
    display: flex;
    align-items: center;
    gap: 8px;
}

.status p {
    color: var(--tx-normal);
    font-size: 14px;
}


.payload {
    border-radius: 4px;
    border: 1px solid var(--bg-darkest);
    background: var(--bg-light, #0D1112);
    padding: 16px 150px 16px 20px;
    margin: 28px 0;
    width: 900px;
}

.payload p {
    color: var(--tx-semi);
    font-size: 14px;
    font-weight: 500;
    word-wrap: break-word;
}
</style>