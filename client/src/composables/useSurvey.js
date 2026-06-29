import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import '@shared/survey-data.js';
import '@shared/blocks-config.js';
import { UI } from '../constants/ui.js';
import { useToast } from './useToast.js';
import { apiFetch } from '../utils/apiFetch.js';

const surveyData = typeof window !== 'undefined' ? window.surveyData : {};
const blocksConfig = typeof window !== 'undefined' ? window.blocksConfig : [];

function createInitialFormData() {
    return { kaspi_functions: [] };
}

export function useSurvey() {
    const currentLang = ref('ru');
    const formData = reactive(createInitialFormData());
    const fieldErrors = reactive({});
    const { message: submitMessage, type: submitMessageType, showError, showSuccess, dismiss: dismissToast } = useToast();
    const isSubmitting = ref(false);
    const part1Submitted = ref(localStorage.getItem('survey_part1_done') === '1');
    const surveyComplete = ref(localStorage.getItem('survey_complete') === '1');
    const sessionId = ref(localStorage.getItem('survey_session_id') || '');

    const part1Blocks = blocksConfig.slice(0, 6);
    const part2Blocks = blocksConfig.slice(6);

    const isConsentGiven = computed(() => formData.consent === 'yes');
    const isConsentDenied = computed(() => formData.consent === 'no');

    const hasLocalProgress = computed(() =>
        part1Submitted.value
        || surveyComplete.value
        || formData.consent
        || Object.keys(formData).some((k) => {
            if (k === 'kaspi_functions') return formData[k].length > 0;
            return Boolean(formData[k]);
        })
    );

    const steps = computed(() => [
        { text: UI.instruction1, active: !part1Submitted.value && !surveyComplete.value },
        { text: UI.instruction2, active: part1Submitted.value && isConsentGiven.value && !surveyComplete.value },
        { text: UI.instruction3, active: part1Submitted.value && isConsentGiven.value && !surveyComplete.value }
    ]);

    // const visiblePart1Blocks = computed(() => {
    //     if (isConsentGiven.value) return part1Blocks;
    //     return part1Blocks.slice(0, 3);
    // });
    const visiblePart1Blocks = computed(() => {
        if (isConsentGiven.value) {
            return part1Blocks; // ← Все блоки Части 1 (C-H)
        }
        return part1Blocks.slice(0, 1); // ← ТОЛЬКО блок C (согласие)
    });
    
    const progressTotal = computed(() => {
        if (surveyComplete.value) return 0;
        if (part1Submitted.value && isConsentGiven.value) {
            return part1Blocks.length + part2Blocks.length;
        }
        return visiblePart1Blocks.value.length;
    });

    const progressPercent = computed(() => {
        if (!progressTotal.value) return 0;
        let filled = visiblePart1Blocks.value.length;
        if (part1Submitted.value && isConsentGiven.value) {
            filled = part1Blocks.length + part2Blocks.length;
        }
        return Math.min(100, Math.round((filled / progressTotal.value) * 100));
    });

    const thankYouMessage = computed(() => {
        if (isConsentDenied.value) return UI.thankYouDecline[currentLang.value];
        return UI.thankYou[currentLang.value];
    });

    function ensureSessionId() {
        if (!sessionId.value) {
            sessionId.value = Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
            localStorage.setItem('survey_session_id', sessionId.value);
        }
    }

    function clearSurveyStorage() {
        const sid = sessionId.value;
        localStorage.removeItem('survey_part1_done');
        localStorage.removeItem('survey_complete');
        localStorage.removeItem('survey_session_id');
        if (sid) localStorage.removeItem(`survey_draft_${sid}`);
    }

    function resetFormState() {
        Object.keys(formData).forEach((k) => delete formData[k]);
        Object.assign(formData, createInitialFormData());
        part1Submitted.value = false;
        surveyComplete.value = false;
        sessionId.value = '';
        Object.keys(fieldErrors).forEach((k) => delete fieldErrors[k]);
    }

    function resetProgress() {
        const msg = UI.reset_confirm[currentLang.value];
        if (!confirm(msg)) return;
        clearSurveyStorage();
        resetFormState();
        dismissToast();
        showSuccess(UI.reset_done[currentLang.value]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function getRequiredKeys(phase) {
        const keys = [];
        for (const [key, q] of Object.entries(surveyData)) {
            if (q.type === 'textarea') continue;
            if (key === 'kaspi_functions') continue;
            if (phase === 'part1') {
                if (visiblePart1Blocks.value.some((b) => b.questions.includes(key))) keys.push(key);
            } else if (phase === 'part2' && part2Blocks.some((b) => b.questions.includes(key))) {
                keys.push(key);
            }
        }
        return keys;
    }

    function validatePhase(phase) {
        Object.keys(fieldErrors).forEach((k) => delete fieldErrors[k]);
        if (!formData.consent && phase === 'part1') {
            showError(UI.consent_required[currentLang.value]);
            return false;
        }
        const missing = getRequiredKeys(phase).filter((key) => {
            const v = formData[key];
            return Array.isArray(v) ? v.length === 0 : !v;
        });
        if (missing.length) {
            missing.forEach((k) => { fieldErrors[k] = true; });
            document.querySelector(`[data-question-key="${missing[0]}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            showError(UI.missingFieldsMessage[currentLang.value]);
            setTimeout(() => missing.forEach((k) => delete fieldErrors[k]), 2500);
            return false;
        }
        return true;
    }

    function buildPayload() {
        return { ...formData, session_id: sessionId.value, lang: currentLang.value };
    }

    async function submitPart1() {
        if (!validatePhase('part1')) return;
        ensureSessionId();
        isSubmitting.value = true;
        try {
            const { result } = await apiFetch('/api/submit/part1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(buildPayload())
            }, currentLang.value);
            part1Submitted.value = true;
            localStorage.setItem('survey_part1_done', '1');
            if (result.is_complete) {
                surveyComplete.value = true;
                localStorage.setItem('survey_complete', '1');
                localStorage.removeItem(`survey_draft_${sessionId.value}`);
            } else {
                showSuccess(UI.part1_saved[currentLang.value]);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (e) {
            showError(e.message);
        } finally {
            isSubmitting.value = false;
        }
    }

    async function submitPart2() {
        if (!validatePhase('part2')) return;
        isSubmitting.value = true;
        try {
            await apiFetch('/api/submit/part2', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(buildPayload())
            }, currentLang.value);
            surveyComplete.value = true;
            localStorage.setItem('survey_complete', '1');
            localStorage.removeItem(`survey_draft_${sessionId.value}`);
            showSuccess(UI.thankYou[currentLang.value]);
        } catch (e) {
            showError(e.message);
        } finally {
            isSubmitting.value = false;
        }
    }

    function toggleLanguage() {
        currentLang.value = currentLang.value === 'ru' ? 'en' : 'ru';
    }

    let draftTimer;
    watch(formData, () => {
        clearTimeout(draftTimer);
        draftTimer = setTimeout(() => {
            if (surveyComplete.value) return;
            ensureSessionId();
            localStorage.setItem(`survey_draft_${sessionId.value}`, JSON.stringify({ ...formData }));
        }, 500);
    }, { deep: true });

    watch(() => formData.consent, (v) => {
        if (v === 'no') {
            setTimeout(() => window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight }), 100);
        }
    });

    onMounted(() => {
        ensureSessionId();
        const draft = localStorage.getItem(`survey_draft_${sessionId.value}`);
        if (draft) {
            try {
                const parsed = JSON.parse(draft);
                Object.assign(formData, parsed);
                if (!Array.isArray(formData.kaspi_functions)) formData.kaspi_functions = [];
            } catch (_) {}
        }
    });

    onUnmounted(() => clearTimeout(draftTimer));

    return {
        UI,
        surveyData,
        currentLang,
        formData,
        fieldErrors,
        submitMessage,
        submitMessageType,
        dismissToast,
        isSubmitting,
        part1Submitted,
        surveyComplete,
        hasLocalProgress,
        part2Blocks,
        visiblePart1Blocks,
        isConsentGiven,
        isConsentDenied,
        steps,
        progressTotal,
        progressPercent,
        thankYouMessage,
        toggleLanguage,
        resetProgress,
        submitPart1,
        submitPart2
    };
}
