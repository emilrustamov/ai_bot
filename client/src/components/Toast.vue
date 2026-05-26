<script setup>
defineProps({
    message: { type: String, default: '' },
    type: { type: String, default: 'success' }
});

defineEmits(['dismiss']);
</script>

<template>
    <Transition name="toast">
        <div
            v-if="message"
            class="fixed top-20 right-4 left-4 sm:left-auto z-50 max-w-sm"
            :role="type === 'error' ? 'alert' : 'status'"
            aria-live="polite"
            aria-atomic="true"
        >
            <div
                class="flex items-start gap-3 p-4 rounded-xl shadow-xl border"
                :class="type === 'success' ? 'bg-white border-emerald-200 text-emerald-900' : 'bg-white border-red-200 text-red-900'"
            >
                <div class="flex-1 text-sm font-medium">{{ message }}</div>
                <button
                    type="button"
                    class="text-slate-400 hover:text-slate-600 text-lg leading-none"
                    :aria-label="type === 'error' ? 'Закрыть' : 'Close'"
                    @click="$emit('dismiss')"
                >&times;</button>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}
.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>
