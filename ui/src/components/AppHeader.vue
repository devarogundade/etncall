<template>
    <section>
        <div class="app_width">
            <header>
                <p>ETNCall</p>
                <nav>
                    <a href="">Bridge</a>
                    <a href="">Devpost</a>
                    <a href="">Github</a>
                </nav>
                <button>Token bridge</button>
            </header>
        </div>
    </section>
</template>

<style scoped>
section {
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