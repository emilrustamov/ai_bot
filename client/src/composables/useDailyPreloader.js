import { computed, onMounted, ref } from 'vue';

const COOKIE_KEY = 'ai_survey_preloader_day';
const PRELOADER_DURATION_MS = 1500;
const MESSAGE_INTERVAL_MS = 350;

function getTodayKey() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function getCookieValue(name) {
    const match = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split('=').slice(1).join('=')) : '';
}

function setCookieValue(name, value) {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=86400; samesite=lax`;
}

export function useDailyPreloader(currentLang) {
    const visible = ref(false);
    const index = ref(0);
    const messages = computed(() => {
        if (currentLang.value === 'en') {
            return [
                'Initializing AI module for precise response...',
                'Analyzing context and preparing logic...',
                'Optimizing answer quality...'
            ];
        }
        return [
            'Подгружаем AI-модуль для точного ответа...',
            'Анализируем контекст и подготавливаем логику...',
            'Оптимизируем качество ответа...'
        ];
    });
    const currentMessage = computed(() => messages.value[index.value] || messages.value[0]);

    onMounted(() => {
        const todayKey = getTodayKey();
        const hasSeenToday = getCookieValue(COOKIE_KEY) === todayKey;
        if (hasSeenToday) return;

        visible.value = true;
        const tick = setInterval(() => {
            index.value = (index.value + 1) % messages.value.length;
        }, MESSAGE_INTERVAL_MS);

        setTimeout(() => {
            clearInterval(tick);
            visible.value = false;
            setCookieValue(COOKIE_KEY, todayKey);
        }, PRELOADER_DURATION_MS);
    });

    return {
        preloaderVisible: visible,
        preloaderMessage: currentMessage
    };
}
