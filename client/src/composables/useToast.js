import { ref, onUnmounted } from 'vue';

export function useToast() {
    const message = ref('');
    const type = ref('success');
    let hideTimer = null;

    function clearHideTimer() {
        if (hideTimer) {
            clearTimeout(hideTimer);
            hideTimer = null;
        }
    }

    function show(msg, msgType, duration) {
        clearHideTimer();
        message.value = msg;
        type.value = msgType;
        hideTimer = setTimeout(() => {
            message.value = '';
            hideTimer = null;
        }, duration);
    }

    function showError(msg) {
        show(msg, 'error', 4500);
    }

    function showSuccess(msg) {
        show(msg, 'success', 5000);
    }

    function dismiss() {
        clearHideTimer();
        message.value = '';
    }

    onUnmounted(clearHideTimer);

    return { message, type, showError, showSuccess, dismiss };
}
