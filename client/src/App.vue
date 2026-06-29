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
    <div
        class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 font-sans text-slate-800 antialiased">
        <Transition name="fade">
            <div v-if="preloaderVisible"
                class="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center px-4">
                <div
                    class="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 text-slate-100 shadow-2xl">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-8 h-8 rounded-full border-2 border-brand-500/40 border-t-brand-500 animate-spin">
                        </div>
                        <div class="text-sm font-semibold tracking-wide uppercase text-brand-200">AI Loading</div>
                    </div>
                    <p class="text-sm sm:text-base leading-relaxed">{{ preloaderMessage }}</p>
                </div>
            </div>
        </Transition>

        <header class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
            <div class="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-2 sm:gap-4">
                <div class="flex items-center gap-3 min-w-0">
                    <div
                        class="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                        K</div>
                    <p class="text-sm font-semibold text-slate-800 truncate hidden sm:block">{{ UI.title[currentLang] }}
                    </p>
                </div>
                <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <button v-if="hasLocalProgress" type="button"
                        class="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        @click="resetProgress">
                        {{ UI.reset_progress[currentLang] }}
                    </button>
                    <button type="button"
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                        @click="toggleLanguage">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21v-2m-4.2-2.2l1.4 1.4M18.6 5.6l-1.4-1.4" />
                        </svg>
                        {{ UI.language_switch[currentLang] }}
                    </button>
                </div>
            </div>
        </header>
        <main class="max-w-3xl mx-auto px-4 py-6 pb-32">
            <!-- <section class="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-6 sm:p-8 mb-6">
                <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">{{ UI.title[currentLang]
                    }}</h1>
                <ol class="space-y-3 mb-5">
                    <li v-for="(step, i) in steps" :key="i" class="flex gap-3 text-sm">
                        <span
                            class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                            :class="step.active ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'">{{ i + 1
                            }}</span>
                        <span :class="step.active ? 'text-slate-800 font-medium' : 'text-slate-500'">{{
                            step.text[currentLang] }}</span>
                    </li>
                </ol>
                <p class="inline-flex items-center gap-2 text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-2">
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {{ UI.anonymous_note[currentLang] }}
                </p>
            </section> -->

            <!-- ===== НОВАЯ ИНСТРУКЦИЯ ===== -->
            <section class="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-6 sm:p-8 mb-6">
                <!-- Заголовок -->
                <div class="flex items-start gap-4 mb-4">
                    <div
                        class="flex-shrink-0 w-10 h-10 rounded-xl bg-[#E0E7FF] flex items-center justify-center text-[#4F46E5]">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-lg sm:text-xl font-bold text-slate-800">
                            {{ UI.chatbotSection.title[currentLang] }}
                        </h2>
                        <p class="text-sm text-slate-600">
                            {{ UI.chatbotSection.subtitle[currentLang] }}
                        </p>
                        <p class="text-xs text-slate-500 mt-0.5 font-medium">
                            {{ UI.chatbotSection.research[currentLang] }}
                        </p>
                    </div>
                </div>

                <!-- Обращение к участнику -->
                <div class="space-y-3 text-sm text-slate-700 leading-relaxed">
                    <p>
                        <span class="font-semibold">{{ UI.chatbotSection.greeting[currentLang] }}</span>
                        {{ UI.chatbotSection.greetingText[currentLang] }}
                    </p>
                    <p>
                        {{ UI.chatbotSection.instruction[currentLang] }}
                        <span class="font-semibold text-[#4F46E5]">
                            {{ UI.chatbotSection.part1[currentLang] }}
                        </span>
                        {{ currentLang === 'ru' ? ',' : ',' }}
                        <span class="font-semibold text-emerald-700">
                            {{ UI.chatbotSection.part2[currentLang] }}
                        </span>
                        {{ currentLang === 'ru' ? '.' : '.' }}
                    </p>
                </div>

                <!-- ЗАДАНИЕ ДЛЯ УЧАСТНИКА -->
                <div class="mt-5 pt-4 border-t border-blue-200/50">
                    <div class="flex items-center gap-2 mb-2">
                        <div
                            class="flex-shrink-0 w-10 h-10 rounded-xl bg-[#E0E7FF] flex items-center justify-center text-blue-600">
                            <svg width="19" height="22" viewBox="0 0 19 22" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 10C7 8.89543 7.89543 8 9 8H17C18.1046 8 19 8.89543 19 10V20C19 21.1046 18.1046 22 17 22H9C7.89543 22 7 21.1046 7 20V10Z"
                                    fill="#4F46E5" fill-opacity="0.33" />
                                <path
                                    d="M6.25 0.75H9.75C10.5784 0.75 11.25 1.42157 11.25 2.25C11.25 3.07843 10.5784 3.75 9.75 3.75H6.25C5.42157 3.75 4.75 3.07843 4.75 2.25C4.75 1.42157 5.42157 0.75 6.25 0.75Z"
                                    stroke="#4F46E5" stroke-width="1.5" />
                                <path
                                    d="M4.03617 12.8826C4.04191 12.6261 4.14605 12.3815 4.32705 12.1996L5.54034 10.9802C5.81518 10.704 6.26206 10.7035 6.53759 10.979C6.81381 11.2552 6.81244 11.7035 6.53454 11.978L5.76454 12.7387C5.59527 12.9059 5.5 13.1339 5.5 13.3718L5.5 14L6.13596 13.9878C6.39432 13.9828 6.64073 13.878 6.82354 13.6954L8.54019 11.9802L10.8331 9.68731C10.9657 9.55471 11.0402 9.37485 11.0402 9.18732L11.0402 9.14531C11.0402 8.77798 10.7424 8.48021 10.3751 8.48021L10.3635 8.48021C10.1564 8.48021 9.95771 8.56207 9.81073 8.70793L7.99004 10.5148C7.71378 10.7889 7.26784 10.7881 6.99263 10.5129C6.71567 10.2359 6.71683 9.78652 6.99522 9.51099L8.91189 7.61403C9.65438 6.87917 10.8373 6.82186 11.6551 7.47182C12.6695 8.27801 12.7647 9.7974 11.8461 10.7113L7.83827 14.6984C7.62767 14.9079 7.35921 15.0496 7.06741 15.1053L5.37082 15.4292C5.12416 15.4763 4.87359 15.4999 4.62248 15.4997C4.27894 15.4995 4.00051 15.221 4.00027 14.8775L4 14.5L4.03617 12.8826Z"
                                    fill="#4F46E5" />
                                <path
                                    d="M0 9.75C0 9.33579 0.335786 9 0.75 9C1.16421 9 1.5 9.33579 1.5 9.75V17.3462C1.5 17.8984 1.94772 18.3462 2.5 18.3462H13.5769C14.0867 18.3462 14.5 17.9329 14.5 17.4231V17.25C14.5 16.8358 14.8358 16.5 15.25 16.5C15.6642 16.5 16 16.8358 16 17.25V18C16 19.1046 15.1046 20 14 20H2C0.895431 20 0 19.1046 0 18V9.75Z"
                                    fill="#4F46E5" />
                                <path
                                    d="M16 11.75C16 12.1642 15.6642 12.5 15.25 12.5C14.8358 12.5 14.5 12.1642 14.5 11.75V4.5C14.5 3.94771 14.0523 3.5 13.5 3.5L2.5 3.5C1.94771 3.5 1.5 3.94771 1.5 4.5L1.5 5.55769C1.5 5.97191 1.16421 6.30769 0.75 6.30769C0.335787 6.30769 0 5.97191 0 5.55769L0 4C0 2.89543 0.895431 2 2 2H5.5L5 3.5L8 4L11 3.5L10.5 2H14C15.1046 2 16 2.89543 16 4V11.75Z"
                                    fill="#4F46E5" />
                            </svg>





                        </div>
                        <h3 class="font-bold text-slate-800 text-sm sm:text-base">
                            {{ UI.chatbotSection.taskTitle[currentLang] }}
                        </h3>
                    </div>
                    <p class="text-sm text-slate-700 leading-relaxed">
                        {{ UI.chatbotSection.taskText[currentLang] }}
                    </p>
                </div>

                <!-- ШАГ 1 -->
                <div class="mt-4 pt-4 border-t border-blue-200/50">
                    <div class="flex items-start gap-3">
                        <span
                            class="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                        <div>
                            <h4 class="font-semibold text-slate-800 text-sm">
                                {{ UI.chatbotSection.step1Title[currentLang] }}
                            </h4>
                            <div class="text-sm text-slate-600 leading-relaxed mt-1 space-y-1">
                                <p>{{ UI.chatbotSection.step1Text[currentLang] }}</p>
                                <ul class="list-disc pl-5 space-y-0.5">
                                    <li>{{ UI.chatbotSection.step1List1[currentLang] }}</li>
                                    <li>{{ UI.chatbotSection.step1List2[currentLang] }}</li>
                                    <li>{{ UI.chatbotSection.step1List3[currentLang] }}</li>
                                    <li>{{ UI.chatbotSection.step1List4[currentLang] }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ШАГ 2 -->
                <div class="mt-4 pt-4 border-t border-blue-200/50">
                    <div class="flex items-start gap-3">
                        <span
                            class="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                        <div>
                            <h4 class="font-semibold text-slate-800 text-sm">
                                {{ UI.chatbotSection.step2Title[currentLang] }}
                            </h4>
                            <div class="text-sm text-slate-600 leading-relaxed mt-1 space-y-1">
                                <p>{{ UI.chatbotSection.step2Text[currentLang] }}</p>
                                <ul class="list-disc pl-5 space-y-0.5">
                                    <li>{{ UI.chatbotSection.step2List1[currentLang] }}</li>
                                    <li>{{ UI.chatbotSection.step2List2[currentLang] }}</li>
                                    <li>{{ UI.chatbotSection.step2List3[currentLang] }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ШАГ 3 -->
                <div class="mt-4 pt-4 border-t border-blue-200/50">
                    <div class="flex items-start gap-3">
                        <span
                            class="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                        <div>
                            <h4 class="font-semibold text-slate-800 text-sm">
                                {{ UI.chatbotSection.step3Title[currentLang] }}
                            </h4>
                            <div class="text-sm text-slate-600 leading-relaxed mt-1 space-y-1">
                                <p>{{ UI.chatbotSection.step3Text[currentLang] }}</p>
                                <ul class="list-disc pl-5 space-y-0.5">
                                    <li>{{ UI.chatbotSection.step3List1[currentLang] }}</li>
                                    <li>{{ UI.chatbotSection.step3List2[currentLang] }}</li>
                                    <li class="font-medium text-amber-700">
                                        {{ UI.chatbotSection.step3List3[currentLang] }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div v-if="surveyComplete"
                class="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center shadow-sm">
                <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg class="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <p class="text-emerald-900 text-lg font-semibold">{{ thankYouMessage }}</p>
                <button type="button"
                    class="mt-6 text-sm font-medium text-brand-600 hover:text-brand-700 underline-offset-2 hover:underline"
                    @click="resetProgress">
                    {{ UI.reset_progress[currentLang] }}
                </button>
            </div>

            <template v-else>
                <div v-if="progressTotal > 0"
                    class="mb-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm p-4">
                    <div class="flex justify-between items-center text-sm mb-2">
                        <span class="font-medium text-slate-700">{{ UI.progress[currentLang] }}</span>
                        <span class="text-slate-500">{{ progressPercent }}%</span>
                    </div>
                    <div class="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full transition-all duration-500 ease-out"
                            :style="{ width: progressPercent + '%' }"></div>
                    </div>
                </div>

                <div v-if="!part1Submitted || isConsentGiven">
                    <div class="flex items-center gap-2 mb-4">
                        <span
                            class="px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wide bg-brand-100 text-brand-700">1</span>
                        <h2 class="text-lg font-bold text-slate-900">{{ UI.part1_title[currentLang] }}</h2>
                    </div>
                    <div v-for="block in visiblePart1Blocks" :key="'p1-' + block.id"
                        class="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-5 sm:p-6 mb-5">
                        <h3
                            class="text-base font-semibold text-slate-900 mb-5 pb-3 border-b border-slate-100 flex items-center gap-2">
                            <span class="w-1 h-5 rounded-full bg-brand-500"></span>
                            {{ block.title[currentLang] }}
                        </h3>
                        <div v-for="questionKey in block.questions" :key="questionKey" :data-question-key="questionKey"
                            :class="['mb-6 last:mb-0 rounded-xl transition-colors', fieldErrors[questionKey] ? 'ring-2 ring-red-300 bg-red-50/50 p-4 -mx-1' : '']">
                            <QuestionField :question-key="questionKey" :form-data="formData" :current-lang="currentLang"
                                :ui="UI" :survey-data="surveyData" />
                        </div>
                    </div>
                    <div v-if="isConsentDenied"
                        class="rounded-2xl bg-amber-50 border border-amber-200 p-5 mb-6 flex gap-3">
                        <svg class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="text-amber-900 font-medium text-sm">{{ UI.refuseMessage[currentLang] }}</p>
                    </div>
                </div>

                <div v-if="part1Submitted && isConsentGiven">
                    <div
                        class="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 p-5 sm:p-6 my-8 flex gap-4">
                        <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                            <svg class="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-amber-900 font-semibold">{{ UI.divider_message[currentLang] }}</p>
                            <p class="text-amber-800/80 text-sm mt-1">{{ UI.divider_hint[currentLang] }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 mb-4">
                        <span
                            class="px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wide bg-emerald-100 text-emerald-700">2</span>
                        <h2 class="text-lg font-bold text-slate-900">{{ UI.part2_title[currentLang] }}</h2>
                    </div>
                    <div v-for="block in part2Blocks" :key="'p2-' + block.id"
                        class="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-5 sm:p-6 mb-5">
                        <h3
                            class="text-base font-semibold text-slate-900 mb-5 pb-3 border-b border-slate-100 flex items-center gap-2">
                            <span class="w-1 h-5 rounded-full bg-emerald-500"></span>
                            {{ block.title[currentLang] }}
                        </h3>
                        <div v-for="questionKey in block.questions" :key="questionKey" :data-question-key="questionKey"
                            :class="['mb-6 last:mb-0 rounded-xl transition-colors', fieldErrors[questionKey] ? 'ring-2 ring-red-300 bg-red-50/50 p-4 -mx-1' : '']">
                            <QuestionField :question-key="questionKey" :form-data="formData" :current-lang="currentLang"
                                :ui="UI" :survey-data="surveyData" />
                        </div>
                    </div>
                </div>
            </template>
        </main>

        <footer v-if="!surveyComplete"
            class="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200/80 bg-white/90 backdrop-blur-lg">
            <div class="max-w-3xl mx-auto px-4 py-4">
                <button v-if="!part1Submitted" type="button" :disabled="isSubmitting"
                    class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 shadow-lg shadow-brand-600/25 transition-all active:scale-[0.98]"
                    @click="submitPart1">
                    <svg v-if="isSubmitting" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {{ isSubmitting ? UI.submitting[currentLang] : UI.save_part1[currentLang] }}
                </button>
                <button v-if="part1Submitted && isConsentGiven" type="button" :disabled="isSubmitting"
                    class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 shadow-lg shadow-emerald-600/25 transition-all active:scale-[0.98]"
                    @click="submitPart2">
                    <svg v-if="isSubmitting" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {{ isSubmitting ? UI.submitting[currentLang] : UI.submit_button[currentLang] }}
                </button>
            </div>
        </footer>

        <Toast :message="submitMessage" :type="submitMessageType" @dismiss="dismissToast" />
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
