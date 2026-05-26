function sqlTypeFor(questionType) {
    switch (questionType) {
        case 'scale':
            return 'INTEGER';
        case 'radio':
        case 'select':
        case 'checkbox':
        case 'textarea':
            return 'TEXT';
        default:
            return 'TEXT';
    }
}

function serializeValue(question, value) {
    if (value === undefined || value === null || value === '') {
        return null;
    }
    if (question.type === 'checkbox') {
        if (Array.isArray(value)) {
            return value.length ? JSON.stringify(value) : null;
        }
        return JSON.stringify([value]);
    }
    if (question.type === 'scale') {
        return parseInt(value, 10);
    }
    return String(value);
}

module.exports = { sqlTypeFor, serializeValue };
