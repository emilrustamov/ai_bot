const fs = require('fs');
const path = require('path');

const sharedSurvey = path.join(__dirname, '../shared/survey-data.js');
if (!fs.existsSync(sharedSurvey)) {
    throw new Error('shared/survey-data.js not found');
}
const { surveyData } = require(sharedSurvey);
const { blocksConfig } = require(path.join(__dirname, '../shared/blocks-config.js'));

const META_COLUMNS = [
    'session_id',
    'submitted_at',
    'part1_at',
    'part2_at',
    'lang',
    'is_complete',
    'user_agent',
    'ip_hash',
    'duration_seconds'
];

// ==================== НОВАЯ СТРУКТУРА ====================
// Блоки: C(0), D(1), E(2), F(3), G(4), H(5) — в Части 1
// Блоки: I(6), J(7), K(8), L(9), M(10), N(11), O(12), P(13) — в Части 2
// Блоки: A(14), B(15) — в конце (НЕ ВХОДЯТ в части)

// Базовые ключи для Части 1 (только consent из блока C)
const BASE_PART1_KEYS = [
    'consent'
];

// Опциональные ключи (необязательные для заполнения)
const OPTIONAL_PART1_KEYS = ['kaspi_functions'];

// Расширенные ключи для Части 1 (блоки D, E, F, G, H — индексы 1-5)
function getPart1ExtendedKeys() {
    // blocksConfig[1] = D, blocksConfig[2] = E, blocksConfig[3] = F, blocksConfig[4] = G, blocksConfig[5] = H
    return blocksConfig.slice(1, 6).flatMap((b) => b.questions);
}

// Ключи для Части 1 (все обязательные поля)
function getPart1Keys(consent) {
    if (consent === 'yes') {
        // consent + все вопросы из блоков D-H
        return [...BASE_PART1_KEYS, ...getPart1ExtendedKeys()];
    }
    // Если consent = 'no' — только consent
    return [...BASE_PART1_KEYS];
}

// Ключи для Части 2 (блоки I, J, K, L, M, N, O, P — индексы 6-13)
function getPart2Keys() {
    return blocksConfig.slice(6, 14).flatMap((b) => b.questions);
}

// ВСЕ ключи из survey-data.js (для создания БД)
function getAllQuestionKeys() {
    return Object.keys(surveyData);
}

function getQuestion(key) {
    return surveyData[key];
}

function isRequiredKey(key, phase, consent) {
    const q = surveyData[key];
    if (!q) return false;
    if (q.type === 'textarea') return false;
    if (OPTIONAL_PART1_KEYS.includes(key)) return false;
    if (phase === 'part1') {
        return getPart1Keys(consent).includes(key);
    }
    if (phase === 'part2') {
        return getPart2Keys().includes(key) && q.type !== 'textarea';
    }
    return false;
}

module.exports = {
    surveyData,
    blocksConfig,
    META_COLUMNS,
    BASE_PART1_KEYS,
    getPart1Keys,
    getPart2Keys,
    getAllQuestionKeys,
    getQuestion,
    isRequiredKey
};