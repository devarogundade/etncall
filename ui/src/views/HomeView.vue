<script setup lang="ts">
import { Status, type Message } from '@/scripts/types';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { format } from "timeago.js";
import { fineId, getChain } from '@/scripts/utils';
import Client from '@/scripts/client';
import { notify } from '@/reactives/notify';
import LoadingBox from '@/components/LoadingBox.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';

const total = ref<number>(0);
const search = ref<string>("");
const loading = ref<boolean>(false);
const messages = ref<Message[]>([]);

const router = useRouter();

const goSearch = () => {
    if (search.value == '') {
        notify.push({
            title: 'Enter Msg Id or Txn Hash',
            description: 'Field is required!',
            category: 'error'
        });
        return;
    }

    router.push(`/messages/${search}`);
    search.value = '';
};

const getMessages = async () => {
    const data = await Client.getMessages(1, 10);
    messages.value = data?.data?.data || [];
    total.value = data?.data?.total || 0;
};

onMounted(() => {
    getMessages();
});
</script>

<template>
    <section>
        <div class="app_width">
            <div class="container">
                <h3>Cross-chain interoperability protocol for Electroneum.</h3>

                <p>ETNCall is enabling Web3 applications on Electroneum go cross-chain, by powering seamless transfer of
                    arbitrarily any data from other blockchains and vice versa.</p>

                <div class="actions">
                    <RouterLink to="/bridge">
                        <button>Token Bridge</button>
                    </RouterLink>
                    <button>Developers Guide</button>
                </div>

                <img src="/images/blockchain.jpg" alt="">
            </div>

            <div class="explore">
                <div class="explore_title">
                    <h3>Explore Cross-chain Messages</h3>
                    <p>Track all cross-chain messages passed by ETNCall across Polygon, Scroll, and
                        more to come.</p>
                </div>

                <div class="explore_stat">
                    <div class="explore_stat_title">
                        <p>Latest Messages</p>
                        <p>Latest {{ total < 10 ? total : '10' }} out of <span>{{ total }}</span></p>
                    </div>

                    <div class="search">
                        <input type="text" v-model="search" placeholder="Search by Msg Id or Transaction hash">
                        <div @click="goSearch" class="search_action">
                            <SearchIcon />
                        </div>
                    </div>
                </div>

                <LoadingBox v-if="loading" />

                <div class="explore_table" v-else>
                    <table>
                        <thead>
                            <tr>
                                <td>Msg Id</td>
                                <td>Status</td>
                                <td>Created</td>
                                <td>Source Txn Hash</td>
                                <td>Destination Txn Hash</td>
                            </tr>
                        </thead>
                        <tbody>
                            <RouterLink :to="`/${message.messageId}`" v-for="message, i in messages" :key="i">

                                <tr>
                                    <td>
                                        <p class="message_id">{{ fineId(message.messageId) }}</p>
                                    </td>
                                    <td>
                                        <div class="message_status" v-if="message.status == Status.PROCESSING">
                                            <OngoingIcon />
                                            <p>Pending</p>
                                        </div>
                                        <div class="message_status" v-if="message.status == Status.PROCESSING">
                                            <OngoingIcon />
                                            <p>Processing</p>
                                        </div>
                                        <div class="message_status" v-if="message.status == Status.DELIVERED">
                                            <SuccessfulIcon />
                                            <p>Successful</p>
                                        </div>
                                        <div class="message_status" v-if="message.status == Status.FAILED">
                                            <FailedfulIcon />
                                            <p>Failed</p>
                                        </div>
                                        <div class="message_status" v-if="message.status == Status.RETRY">
                                            <FailedfulIcon />
                                            <p>Will Retry</p>
                                        </div>
                                        <div class="message_status" v-if="message.status == Status.RETRYING">
                                            <OngoingIcon />
                                            <p>Retrying</p>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="message_time">{{ format((message.initializedTimestamp || 0) *
                                            1000)
                                            }}</p>
                                    </td>
                                    <td>
                                        <div class="message_hash">
                                            <div class="message_hash_image">
                                                <img :src="`${message.fromChainId}.png`" alt="">
                                            </div>
                                            <a v-if="message.fromTrxHash"
                                                :href="`${getChain(message.fromChainId)?.blockExplorers?.[0]}/tx/${message.fromTrxHash}`">
                                                <p>{{ fineId(message.fromTrxHash) }}</p>
                                            </a>
                                            <p v-else>--------</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="message_hash">
                                            <a v-if="message.toTrxHash"
                                                :href="`${getChain(message.toChainId)?.blockExplorers?.[0]}/tx/${message.toTrxHash}`">
                                                <p>{{ fineId(message.toTrxHash) }}</p>
                                            </a>
                                            <p v-else>--------</p>

                                            <div class="message_hash_image">
                                                <img :src="`${message.toChainId}.png`" alt="">
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </RouterLink>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>


<style scoped>
.container {
    padding: 100px 0;
    position: relative;
}

.container h3 {
    font-size: 40px;
    font-weight: 500;
    color: var(--tx-normal);
    text-align: center;
}

.container p {
    margin-top: 20px;
    font-size: 30px;
    line-height: 44px;
    color: var(--tx-semi);
    text-align: center;
}

.container .actions {
    margin-top: 60px;
    display: flex;
    align-items: center;
    gap: 40px;
    justify-content: center;
}

.container button {
    height: 50px;
    padding: 0 20px;
    background: var(--primary-light);
    color: var(--bg);
    font-weight: 500;
    border: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
}

.container img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.03;
    object-fit: cover;
}

.explore {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
    padding-bottom: 50px;
}

.explore_title {
    text-align: center;
    width: 560px;
}

.explore_title h3 {
    color: var(--tx-normal);
    font-size: 34px;
    font-weight: 600;
}

.explore_title p {
    margin-top: 26px;
    color: var(--tx-semi);
    text-align: center;
    font-size: 16px;
}

.explore_stat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 60px;
}

.explore_stat_title p:first-child {
    color: var(--tx-normal);
    font-size: 20px;
    font-weight: 600;
}

.explore_stat_title p:last-child {
    margin-top: 8px;
    color: var(--tx-dimmed);
    font-size: 14px;
}

.explore_stat_title p:last-child span {
    color: var(--primary-light);
}

.search {
    display: flex;
    align-items: center;
    border-radius: 4px;
    border: 1px solid var(--bg-darkest);
    background: var(--bg-dark);
    overflow: hidden;
}

.search input {
    background: none;
    border: none;
    width: 320px;
    height: 40px;
    padding: 0 16px;
    align-items: center;
    flex-shrink: 0;
    outline: none;
    color: var(--tx-normal);
    font-size: 14px;
    font-weight: 500;
}

.search_action {
    background: var(--bg-darkest);
    height: 40px;
    width: 40px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.explore_table {
    width: 100%;
    padding: 0 26px;
    margin-top: 30px;
    border-radius: 15px;
    border: 2px solid var(--bg-darker);
    background: var(--bg-dark);
    overflow: hidden;
}

thead tr {
    height: 70px;
}

td:first-child {
    width: 214px;
}

td:nth-child(2) {
    width: 214px;
}

td:nth-child(3) {
    width: 178px;
}

td:nth-child(4) {
    width: 300px;
}

td:nth-child(5) {
    width: 300px;
    text-align: right;
}

table {
    width: 100%;
}

thead td {
    color: var(--tx-semi);
    font-size: 14px;
}

tbody tr {
    display: flex;
    align-items: center;
    height: 86px;
    background: var(--bg-light);
    margin-bottom: 3px;
    padding: 0 26px;
}

.tbody:hover {
    background: var(--bg-lighter);
}

.tbody:last-child {
    margin-bottom: 0;
}

.message_hash {
    display: flex;
    align-items: center;
    gap: 10px;
}

.message_id {
    color: var(--tx-normal);
    font-size: 14px;
    font-weight: 500;
}

.message_status {
    display: flex;
    align-items: center;
    gap: 10px;
}

.message_status p {
    color: var(--tx-normal);
    font-size: 14px;
}

.message_time {
    color: var(--tx-normal);
    font-size: 14px;
    font-weight: 500;
}

.message_hash_image {
    padding: 4px;
    border-radius: 4px;
    background: var(--bg-lightest);
    display: flex;
    align-items: center;
    justify-content: center;
}

.message_hash img {
    width: 14px;
    height: 14px;
    border-radius: 7px;
}

.message_hash p {
    color: var(--tx-semi);
    font-size: 14px;
}

td:nth-child(5) .message_hash {
    justify-content: flex-end;
}
</style>
