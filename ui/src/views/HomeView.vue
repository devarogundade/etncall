<script setup lang="ts">
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
    font-weight: 600;
    border: none;
    font-size: 16px;
    cursor: pointer;
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
</style>
