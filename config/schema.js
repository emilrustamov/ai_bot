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

const BASE_PART1_KEYS = [
    'gender', 'age', 'education', 'employment', 'city',
    'kaspi_years', 'kaspi_frequency', 'kaspi_functions', 'kaspi_trust', 'kaspi_chatbot_before',
    'consent'
];

const OPTIONAL_PART1_KEYS = ['kaspi_functions'];

function getPart1ExtendedKeys() {
    return blocksConfig.slice(3, 8).flatMap((b) => b.questions);
}

function getPart1Keys(consent) {
    if (consent === 'yes') {
        return [...BASE_PART1_KEYS, ...getPart1ExtendedKeys()];
    }
    return [...BASE_PART1_KEYS];
}

function getPart2Keys() {
    return blocksConfig.slice(8).flatMap((b) => b.questions);
}

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
