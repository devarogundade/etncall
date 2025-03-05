<script setup lang="ts">
import ProgressBoxWhite from './ProgressBoxWhite.vue';

const props = defineProps({
    state: { type: String },
    width: { type: String },
    bg: { type: String },
    progress: { type: Boolean },
    text: { type: String },
});
</script>

<template>
    <div ref="button" :class="`button ${props.state}`" :style="`width: ${props.width}; background: ${props.bg};`">
        <ProgressBoxWhite class="progress" v-if="props.progress" />
        <p v-else>{{ props.text }}</p>
    </div>
</template>


<style scoped>
.button {
    padding: 0 20px;
    max-width: 100%;
    height: 50px;
    background: var(--primary);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    transition: .2s;
}

.button:hover {
    transform: translateY(-2px);
}


p {
    color: var(--bg-darkest, #11282E);
    font-size: 18px;
    font-weight: 800;
}

.disable {
    cursor: not-allowed;
    background: var(--primary-light);
}

.disable:hover {
    transform: translateY(0);
    animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
}

.disable p {
    color: var(--tx-dimmed);
}

.progress {
    transform: scale(0.4, 0.4);
}
</style>