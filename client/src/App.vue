<script setup>
import QuestionField from './components/QuestionField.vue';
import Toast from './components/Toast.vue';
import { useSurvey } from './composables/useSurvey.js';
import { useDailyPreloader } from './composables/useDailyPreloader.js';

const {
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
} = useSurvey();

const {
    preloaderVisible,
    preloaderMessage
} = useDailyPreloader(currentLang);
</script>

<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 font-sans text-slate-800 antialiased">
        <Transition name="fade">
            <div
                v-if="preloaderVisible"
                class="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center px-4"
            >
                <div class="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 text-slate-100 shadow-2xl">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-8 h-8 rounded-full border-2 border-brand-500/40 border-t-brand-500 animate-spin"></div>
                        <div class="text-sm font-semibold tracking-wide uppercase text-brand-200">AI Loading</div>
                    </div>
                    <p class="text-sm sm:text-base leading-relaxed">{{ preloaderMessage }}</p>
                </div>
            </div>
        </Transition>

        <header class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
            <div class="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-2 sm:gap-4">
                <div class="flex items-center gap-3 min-w-0">
                    <div class="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-sm font-bold shadow-sm">K</div>
                    <p class="text-sm font-semibold text-slate-800 truncate hidden sm:block">{{ UI.title[currentLang] }}</p>
                </div>
                <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <button
                        v-if="hasLocalProgress"
                        type="button"
                        class="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        @click="resetProgress"
                    >
                        {{ UI.reset_progress[currentLang] }}
                    </button>
                    <button
                        type="button"
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                        @click="toggleLanguage"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21v-2m-4.2-2.2l1.4 1.4M18.6 5.6l-1.4-1.4" />
                        </svg>
                        {{ UI.language_switch[currentLang] }}
                    </button>
                </div>
            </div>
        </header>

        <main class="max-w-3xl mx-auto px-4 py-6 pb-32">
            <section class="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-6 sm:p-8 mb-6">
                <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">{{ UI.title[currentLang] }}</h1>
                <ol class="space-y-3 mb-5">
                    <li v-for="(step, i) in steps" :key="i" class="flex gap-3 text-sm">
                        <span
                            class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                            :class="step.active ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'"
                        >{{ i + 1 }}</span>
                        <span :class="step.active ? 'text-slate-800 font-medium' : 'text-slate-500'">{{ step.text[currentLang] }}</span>
                    </li>
                </ol>
                <p class="inline-flex items-center gap-2 text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-2">
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {{ UI.anonymous_note[currentLang] }}
                </p>
            </section>

            <div v-if="surveyComplete" class="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center shadow-sm">
                <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg class="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <p class="text-emerald-900 text-lg font-semibold">{{ thankYouMessage }}</p>
                <button
                    type="button"
                    class="mt-6 text-sm font-medium text-brand-600 hover:text-brand-700 underline-offset-2 hover:underline"
                    @click="resetProgress"
                >
                    {{ UI.reset_progress[currentLang] }}
                </button>
            </div>

            <template v-else>
                <div v-if="progressTotal > 0" class="mb-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm p-4">
                    <div class="flex justify-between items-center text-sm mb-2">
                        <span class="font-medium text-slate-700">{{ UI.progress[currentLang] }}</span>
                        <span class="text-slate-500">{{ progressPercent }}%</span>
                    </div>
                    <div class="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                            class="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full transition-all duration-500 ease-out"
                            :style="{ width: progressPercent + '%' }"
                        ></div>
                    </div>
                </div>

                <div v-if="!part1Submitted || isConsentGiven">
                    <div class="flex items-center gap-2 mb-4">
                        <span class="px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wide bg-brand-100 text-brand-700">1</span>
                        <h2 class="text-lg font-bold text-slate-900">{{ UI.part1_title[currentLang] }}</h2>
                    </div>
                    <div
                        v-for="block in visiblePart1Blocks"
                        :key="'p1-' + block.id"
                        class="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-5 sm:p-6 mb-5"
                    >
                        <h3 class="text-base font-semibold text-slate-900 mb-5 pb-3 border-b border-slate-100 flex items-center gap-2">
                            <span class="w-1 h-5 rounded-full bg-brand-500"></span>
                            {{ block.title[currentLang] }}
                        </h3>
                        <div
                            v-for="questionKey in block.questions"
                            :key="questionKey"
                            :data-question-key="questionKey"
                            :class="['mb-6 last:mb-0 rounded-xl transition-colors', fieldErrors[questionKey] ? 'ring-2 ring-red-300 bg-red-50/50 p-4 -mx-1' : '']"
                        >
                            <QuestionField
                                :question-key="questionKey"
                                :form-data="formData"
                                :current-lang="currentLang"
                                :ui="UI"
                                :survey-data="surveyData"
                            />
                        </div>
                    </div>
                    <div v-if="isConsentDenied" class="rounded-2xl bg-amber-50 border border-amber-200 p-5 mb-6 flex gap-3">
                        <svg class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="text-amber-900 font-medium text-sm">{{ UI.refuseMessage[currentLang] }}</p>
                    </div>
                </div>

                <div v-if="part1Submitted && isConsentGiven">
                    <div class="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 p-5 sm:p-6 my-8 flex gap-4">
                        <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                            <svg class="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-amber-900 font-semibold">{{ UI.divider_message[currentLang] }}</p>
                            <p class="text-amber-800/80 text-sm mt-1">{{ UI.divider_hint[currentLang] }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 mb-4">
                        <span class="px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wide bg-emerald-100 text-emerald-700">2</span>
                        <h2 class="text-lg font-bold text-slate-900">{{ UI.part2_title[currentLang] }}</h2>
                    </div>
                    <div
                        v-for="block in part2Blocks"
                        :key="'p2-' + block.id"
                        class="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-5 sm:p-6 mb-5"
                    >
                        <h3 class="text-base font-semibold text-slate-900 mb-5 pb-3 border-b border-slate-100 flex items-center gap-2">
                            <span class="w-1 h-5 rounded-full bg-emerald-500"></span>
                            {{ block.title[currentLang] }}
                        </h3>
                        <div
                            v-for="questionKey in block.questions"
                            :key="questionKey"
                            :data-question-key="questionKey"
                            :class="['mb-6 last:mb-0 rounded-xl transition-colors', fieldErrors[questionKey] ? 'ring-2 ring-red-300 bg-red-50/50 p-4 -mx-1' : '']"
                        >
                            <QuestionField
                                :question-key="questionKey"
                                :form-data="formData"
                                :current-lang="currentLang"
                                :ui="UI"
                                :survey-data="surveyData"
                            />
                        </div>
                    </div>
                </div>
            </template>
        </main>

        <footer v-if="!surveyComplete" class="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200/80 bg-white/90 backdrop-blur-lg">
            <div class="max-w-3xl mx-auto px-4 py-4">
                <button
                    v-if="!part1Submitted"
                    type="button"
                    :disabled="isSubmitting"
                    class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 shadow-lg shadow-brand-600/25 transition-all active:scale-[0.98]"
                    @click="submitPart1"
                >
                    <svg v-if="isSubmitting" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {{ isSubmitting ? UI.submitting[currentLang] : UI.save_part1[currentLang] }}
                </button>
                <button
                    v-if="part1Submitted && isConsentGiven"
                    type="button"
                    :disabled="isSubmitting"
                    class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 shadow-lg shadow-emerald-600/25 transition-all active:scale-[0.98]"
                    @click="submitPart2"
                >
                    <svg v-if="isSubmitting" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {{ isSubmitting ? UI.submitting[currentLang] : UI.submit_button[currentLang] }}
                </button>
            </div>
        </footer>

        <Toast
            :message="submitMessage"
            :type="submitMessageType"
            @dismiss="dismissToast"
        />
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
