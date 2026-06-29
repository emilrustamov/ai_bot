const {
    surveyData,
    getPart1Keys,
    getPart2Keys,
    isRequiredKey
} = require('../config/schema');

function validateField(key, value) {
    const question = surveyData[key];
    if (!question) {
        return `Unknown field: ${key}`;
    }

    if (value === undefined || value === null || value === '') {
        return null;
    }

    if (question.type === 'scale') {
        const num = parseInt(value, 10);
        if (Number.isNaN(num) || num < 1 || num > 7) {
            return `Invalid scale value for ${key}`;
        }
        return null;
    }

    if (question.type === 'radio' || question.type === 'select') {
        const allowed = question.options.map((o) => o.value);
        if (!allowed.includes(value)) {
            return `Invalid option for ${key}`;
        }
        return null;
    }

    if (question.type === 'checkbox') {
        const arr = Array.isArray(value) ? value : [value];
        const allowed = question.options.map((o) => o.value);
        for (const v of arr) {
            if (!allowed.includes(v)) {
                return `Invalid checkbox value for ${key}`;
            }
        }
        return null;
    }

    if (question.type === 'textarea') {
        if (typeof value !== 'string' || value.length > 10000) {
            return `Invalid text for ${key}`;
        }
        return null;
    }

    return null;
}

function validatePayload(data, phase) {
    const errors = [];
    const consent = data.consent;

    console.log('🔍 VALIDATE PAYLOAD:');
    console.log('  phase:', phase);
    console.log('  consent:', consent);
    console.log('  data keys:', Object.keys(data));
    
   

    if (!data.session_id || typeof data.session_id !== 'string') {
        errors.push('session_id is required');
    }

    if (phase === 'part1' && !consent) {
        errors.push('consent is required');
    }

    if (consent && !['yes', 'no'].includes(consent)) {
        errors.push('Invalid consent value');
    }

    const allowedKeys = phase === 'part1' ? getPart1Keys(consent) : getPart2Keys();
    const requiredKeys = allowedKeys.filter((k) => isRequiredKey(k, phase, consent));

    for (const key of requiredKeys) {
        const val = data[key];
        if (Array.isArray(val) ? val.length === 0 : !val) {
            errors.push(`Missing required field: ${key}`);
        }
    }

    for (const key of allowedKeys) {
        if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
            const err = validateField(key, data[key]);
            if (err) errors.push(err);
        }
    }

    for (const key of Object.keys(data)) {
        if (['session_id', 'lang', 'submitted_at'].includes(key)) continue;
        if (!surveyData[key] && !allowedKeys.includes(key)) {
            if (surveyData[key] === undefined && phase === 'part2' && getPart1Keys('yes').includes(key)) {
                continue;
            }
        }
    }

    return errors;
}

module.exports = { validatePayload, validateField };
