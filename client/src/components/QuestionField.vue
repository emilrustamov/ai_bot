<script setup>
import { computed } from 'vue';

const props = defineProps({
    questionKey: { type: String, required: true },
    formData: { type: Object, required: true },
    currentLang: { type: String, required: true },
    ui: { type: Object, required: true },
    surveyData: { type: Object, required: true }
});

const question = computed(() => props.surveyData[props.questionKey]);

function isSelected(value) {
    return String(props.formData[props.questionKey]) === String(value);
}

function isChecked(value) {
    const arr = props.formData[props.questionKey];
    return Array.isArray(arr) && arr.includes(value);
}

function optionClass(selected) {
    return selected
        ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500/30'
        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50';
}

function scaleClass(num) {
    const selected = String(props.formData[props.questionKey]) === String(num);
    return selected
        ? 'border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/30'
        : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50';
}
</script>

<template>
    <template v-if="question">
        <p class="text-sm sm:text-base font-medium text-slate-800 leading-relaxed mb-4" v-html="question.text[currentLang]"></p>

        <div v-if="question.type === 'scale'" class="space-y-3">
            <div class="scale-grid">
                <label
                    v-for="num in 7"
                    :key="num"
                    class="scale-option flex items-center justify-center rounded-xl border-2 py-3 sm:py-2.5 text-sm font-semibold cursor-pointer transition-all duration-150"
                    :class="scaleClass(num)"
                >
                    <input v-model="formData[questionKey]" type="radio" :name="questionKey" :value="num" class="sr-only">
                    {{ num }}
                </label>
            </div>
            <div class="flex justify-between gap-2 text-[11px] sm:text-xs text-slate-500 px-0.5">
                <span class="max-w-[30%] leading-tight">{{ ui.scale_labels[currentLang][1] }}</span>
                <span class="text-center">{{ ui.scale_labels[currentLang][4] }}</span>
                <span class="max-w-[30%] text-right leading-tight">{{ ui.scale_labels[currentLang][7] }}</span>
            </div>
        </div>

        <div v-else-if="question.type === 'radio'" class="grid gap-2 sm:grid-cols-2">
            <label
                v-for="opt in question.options"
                :key="opt.value"
                class="flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-150"
                :class="optionClass(isSelected(opt.value))"
            >
                <span
                    class="flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    :class="isSelected(opt.value) ? 'border-brand-600' : 'border-slate-300'"
                >
                    <span v-if="isSelected(opt.value)" class="w-2 h-2 rounded-full bg-brand-600"></span>
                </span>
                <input v-model="formData[questionKey]" type="radio" :name="questionKey" :value="opt.value" class="sr-only">
                <span class="text-sm text-slate-700">{{ opt.label[currentLang] }}</span>
            </label>
        </div>

        <div v-else-if="question.type === 'checkbox'" class="grid gap-2 sm:grid-cols-2">
            <label
                v-for="opt in question.options"
                :key="opt.value"
                class="flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-150"
                :class="optionClass(isChecked(opt.value))"
            >
                <span
                    class="flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center"
                    :class="isChecked(opt.value) ? 'border-brand-600 bg-brand-600' : 'border-slate-300 bg-white'"
                >
                    <svg v-if="isChecked(opt.value)" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                </span>
                <input v-model="formData[questionKey]" type="checkbox" :value="opt.value" class="sr-only">
                <span class="text-sm text-slate-700">{{ opt.label[currentLang] }}</span>
            </label>
        </div>

        <div v-else-if="question.type === 'select'">
            <select
                v-model="formData[questionKey]"
                class="w-full sm:max-w-md appearance-none rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-shadow"
            >
                <option value="">{{ ui.select_default[currentLang] }}</option>
                <option v-for="opt in question.options" :key="opt.value" :value="opt.value">
                    {{ opt.label[currentLang] }}
                </option>
            </select>
        </div>

        <div v-else-if="question.type === 'textarea'">
            <textarea
                v-model="formData[questionKey]"
                :rows="question.rows || 3"
                class="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none resize-y min-h-[100px] transition-shadow"
                :placeholder="ui.textarea_placeholder[currentLang]"
            ></textarea>
        </div>
    </template>
    <div v-else class="text-red-600 text-sm rounded-lg bg-red-50 px-3 py-2">
        Вопрос «{{ questionKey }}» не найден
    </div>
</template>
