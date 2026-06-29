const blocksConfig = [
    {
        id: 'C',
        title: { ru: "В. Согласие на участие", en: "C. Consent" },
        questions: ['consent']
    },
    {
        id: 'D',
        title: { ru: "Г. Ожидаемое качество информации (IQ)", en: "D. Expected Information Quality (IQ)" },
        questions: ['iq2', 'iq3', 'iq4']
    },
    {
        id: 'E',
        title: { ru: "Д. Ожидаемая скорость (SP)", en: "E. Expected Speed (SP)" },
        questions: ['sp2', 'sp3', 'sp5']
    },
    {
        id: 'F',
        title: { ru: "Е. Ожидаемая эмпатия (EM)", en: "F. Expected Empathy (EM)" },
        questions: ['em1', 'em2', 'em5']
    },
    {
        id: 'G',
        title: { ru: "Ж. Ожидаемое человекоподобие (HN)", en: "G. Expected Human Likeness (HN)" },
        questions: ['hn1', 'hn2', 'hn5']
    },
    {
        id: 'H',
        title: { ru: "З. Риск конфиденциальности (PPR) — ДО", en: "H. Privacy Risk (PPR) — BEFORE" },
        questions: ['ppr_before2', 'ppr_before3', 'ppr_before5']
    },
    //blok2
    {
        id: 'I',
        title: { ru: "И. Воспринимаемое качество информации (IQ)", en: "I. Perceived Information Quality (IQ)" },
        questions: ['iq_real2', 'iq_real3', 'iq_real4']
    },
    {
        id: 'J',
        title: { ru: "К. Воспринимаемая скорость (SP)", en: "J. Perceived Speed (SP)" },
        questions: ['sp_real2', 'sp_real3', 'sp_real5']
    },
    {
        id: 'K',
        title: { ru: "Л. Воспринимаемая эмпатия (EM)", en: "K. Perceived Empathy (EM)" },
        questions: ['em_real1', 'em_real2', 'em_real5']
    },
    {
        id: 'L',
        title: { ru: "М. Воспринимаемое человекоподобие (HN)", en: "L. Perceived Human Likeness (HN)" },
        questions: ['hn_real1', 'hn_real2', 'hn_real5']
    },
    {
        id: 'M',
        title: { ru: "Н. Подтверждение ожиданий (CE)", en: "M. Confirmation of Expectations (CE)" },
        questions: ['ce1', 'ce2', 'ce3', 'ce4', 'ce5']
    },
    {
        id: 'N',
        title: { ru: "О. Доверие к платформе (TR)", en: "N. Trust in Platform (TR)" },
        questions: ['tr1', 'tr2', 'tr3', 'tr4', 'tr5']
    },
    {
        id: 'O',
        title: { ru: "П. Риск конфиденциальности (PPR) — ПОСЛЕ", en: "O. Privacy Risk (PPR) — AFTER" },
        questions: ['ppr_after2', 'ppr_after3', 'ppr_after5']
    },
    {
        id: 'P',
        title: { ru: "Р. Намерение продолжить использование (CI)", en: "P. Continuance Intention (CI)" },
        questions: ['ci1', 'ci2', 'ci3', 'ci4', 'ci5']
    },
    // {
    //     id: 'Q',
    //     title: { ru: "С. Открытые вопросы", en: "Q. Open-ended Questions" },
    //     questions: ['open1', 'open2', 'open3']
    // }
    {
        id: 'A',
        title: { ru: "А. Демографические данные", en: "A. Demographics" },
        questions: ['gender', 'age', 'education', 'employment', 'city']
    },
    {
        id: 'B',
        title: { ru: "Б. Профиль использования Kaspi.kz", en: "B. Kaspi.kz Usage Profile" },
        questions: ['kaspi_years', 'kaspi_frequency', 'kaspi_functions', 'kaspi_trust', 'kaspi_chatbot_before']
    }
];

if (typeof window !== 'undefined') {
    window.blocksConfig = blocksConfig;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { blocksConfig };
}
