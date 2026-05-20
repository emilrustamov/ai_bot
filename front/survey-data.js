// survey-data.js
// Вопросы и ответы анкеты (русский / английский)

const surveyData = {
    // ==================== БЛОК А: Демографические данные ====================
    gender: {
        text: {
            ru: "Пол",
            en: "Gender"
        },
        type: "radio",
        required: true,
        options: [
            { value: "male", label: { ru: "Мужской", en: "Male" } },
            { value: "female", label: { ru: "Женский", en: "Female" } },
            { value: "not_say", label: { ru: "Не указывать", en: "Not specify" } }
        ]
    },
    age: {
        text: {
            ru: "Возрастная группа",
            en: "Age group"
        },
        type: "radio",
        required: true,
        options: [
            { value: "18-24", label: { ru: "18–24", en: "18–24" } },
            { value: "25-34", label: { ru: "25–34", en: "25–34" } },
            { value: "35-44", label: { ru: "35–44", en: "35–44" } },
            { value: "45+", label: { ru: "45+", en: "45+" } }
        ]
    },
    education: {
        text: {
            ru: "Уровень образования",
            en: "Education level"
        },
        type: "radio",
        required: true,
        options: [
            { value: "school", label: { ru: "Среднее", en: "Secondary" } },
            { value: "bachelor", label: { ru: "Бакалавриат", en: "Bachelor" } },
            { value: "master", label: { ru: "Магистратура", en: "Master" } },
            { value: "higher", label: { ru: "Выше", en: "Higher" } }
        ]
    },
    employment: {
        text: {
            ru: "Статус занятости",
            en: "Employment status"
        },
        type: "radio",
        required: true,
        options: [
            { value: "student", label: { ru: "Студент", en: "Student" } },
            { value: "employed", label: { ru: "Работаю", en: "Employed" } },
            { value: "self", label: { ru: "Самозанятый", en: "Self-employed" } },
            { value: "unemployed", label: { ru: "Не работаю", en: "Unemployed" } }
        ]
    },
    city: {
        text: {
            ru: "Город / Регион",
            en: "City / Region"
        },
        type: "select",
        required: true,
        options: [
            { value: "almaty", label: { ru: "Алматы", en: "Almaty" } },
            { value: "astana", label: { ru: "Астана", en: "Astana" } },
            { value: "shymkent", label: { ru: "Шымкент", en: "Shymkent" } },
            { value: "other", label: { ru: "Другой", en: "Other" } }
        ]
    },

    // ==================== БЛОК Б: Профиль использования Kaspi.kz ====================
    kaspi_years: {
        text: {
            ru: "Как давно вы используете Kaspi.kz?",
            en: "How long have you been using Kaspi.kz?"
        },
        type: "radio",
        required: true,
        options: [
            { value: "less1", label: { ru: "< 1 года", en: "< 1 year" } },
            { value: "1-2", label: { ru: "1–2 года", en: "1–2 years" } },
            { value: "3-4", label: { ru: "3–4 года", en: "3–4 years" } },
            { value: "5plus", label: { ru: "5+ лет", en: "5+ years" } }
        ]
    },
    kaspi_frequency: {
        text: {
            ru: "Как часто вы пользуетесь Kaspi.kz?",
            en: "How often do you use Kaspi.kz?"
        },
        type: "radio",
        required: true,
        options: [
            { value: "rare", label: { ru: "Редко", en: "Rarely" } },
            { value: "monthly", label: { ru: "Ежемесячно", en: "Monthly" } },
            { value: "weekly", label: { ru: "Еженедельно", en: "Weekly" } },
            { value: "daily", label: { ru: "Ежедневно", en: "Daily" } }
        ]
    },
    kaspi_functions: {
        text: {
            ru: "Какими функциями Kaspi вы пользуетесь чаще всего? (можно выбрать несколько)",
            en: "Which Kaspi functions do you use most often? (select multiple)"
        },
        type: "radio",
        required: false,
        options: [
            { value: "marketplace", label: { ru: "Маркетплейс", en: "Marketplace" } },
            { value: "pay", label: { ru: "Kaspi Pay", en: "Kaspi Pay" } },
            { value: "bank", label: { ru: "Kaspi Банк", en: "Kaspi Bank" } },
            { value: "delivery", label: { ru: "Kaspi Доставка", en: "Kaspi Delivery" } }
        ]
    },
    kaspi_trust: {
        text: {
            ru: "Насколько вы доверяете Kaspi.kz в целом?",
            en: "How much do you trust Kaspi.kz in general?"
        },
        type: "radio",
        required: true,
        options: [
            { value: "not_trust", label: { ru: "Совсем не доверяю", en: "Do not trust at all" } },
            { value: "little", label: { ru: "Немного", en: "Little" } },
            { value: "moderate", label: { ru: "Умеренно", en: "Moderately" } },
            { value: "trust", label: { ru: "Очень доверяю", en: "Trust a lot" } }
        ]
    },
    kaspi_chatbot_before: {
        text: {
            ru: "Использовали ли вы чатбот Kaspi.kz раньше?",
            en: "Have you used the Kaspi.kz chatbot before?"
        },
        type: "radio",
        required: true,
        options: [
            { value: "never", label: { ru: "Никогда", en: "Never" } },
            { value: "1-2", label: { ru: "1–2 раза", en: "1–2 times" } },
            { value: "several", label: { ru: "Несколько раз", en: "Several times" } },
            { value: "regularly", label: { ru: "Регулярно", en: "Regularly" } }
        ]
    },

    // ==================== БЛОК В: Согласие на участие ====================
    consent: {
        text: {
            ru: "Готовы ли вы использовать AI-чатбот Kaspi.kz в рамках данного исследования и заполнить Часть 2 сразу после?",
            en: "Are you willing to use the Kaspi.kz AI chatbot for this study and complete Part 2 immediately after?"
        },
        type: "radio",
        required: true,
        options: [
            { value: "yes", label: { ru: "Да, согласен(на)", en: "Yes, I agree" } },
            { value: "no", label: { ru: "Нет, отказываюсь", en: "No, I decline" } }
        ]
    },

    // ==================== БЛОК Г: Ожидаемое качество информации (IQ) ====================
    iq1: {
        text: {
            ru: "Я ожидаю, что чатбот Kaspi.kz будет предоставлять точную информацию о товарах, ценах и заказах.",
            en: "I expect that the Kaspi.kz chatbot will provide accurate information about products, prices, and orders."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    iq2: {
        text: {
            ru: "Я ожидаю, что информация от чатбота Kaspi.kz будет полной и достаточной для моих нужд.",
            en: "I expect that the information from the Kaspi.kz chatbot will be complete and sufficient for my needs."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    iq3: {
        text: {
            ru: "Я ожидаю, что чатбот Kaspi.kz будет предоставлять информацию, релевантную моему конкретному вопросу.",
            en: "I expect that the Kaspi.kz chatbot will provide information relevant to my specific question."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    iq4: {
        text: {
            ru: "Я ожидаю, что чатбот Kaspi.kz будет предоставлять актуальную информацию (текущие цены, наличие товаров).",
            en: "I expect that the Kaspi.kz chatbot will provide up-to-date information (current prices, product availability)."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    iq5: {
        text: {
            ru: "Я ожидаю, что смогу полагаться на информацию чатбота Kaspi.kz при принятии решений о покупке.",
            en: "I expect that I can rely on the Kaspi.kz chatbot's information when making purchasing decisions."
        },
        type: "scale",
        min: 1,
        max: 7
    },

    // ==================== БЛОК Д: Ожидаемая скорость (SP) ====================
    sp1: {
        text: {
            ru: "Я ожидаю, что чатбот Kaspi.kz будет быстро отвечать на мои вопросы.",
            en: "I expect that the Kaspi.kz chatbot will respond quickly to my questions."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    sp2: {
        text: {
            ru: "Я ожидаю, что чатбот Kaspi.kz будет обрабатывать мои запросы без заметных задержек.",
            en: "I expect that the Kaspi.kz chatbot will process my requests without noticeable delays."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    sp3: {
        text: {
            ru: "Я ожидаю, что чатбот Kaspi.kz будет отвечать в темпе, который ощущается как естественный и эффективный.",
            en: "I expect that the Kaspi.kz chatbot will respond at a pace that feels natural and efficient."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    sp4: {
        text: {
            ru: "Я ожидаю, что при использовании чатбота Kaspi.kz не буду испытывать раздражающего ожидания.",
            en: "I expect that I will not experience frustrating waiting when using the Kaspi.kz chatbot."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    sp5: {
        text: {
            ru: "Я ожидаю, что общая скорость ответа чатбота Kaspi.kz будет соответствовать моим потребностям.",
            en: "I expect that the overall response speed of the Kaspi.kz chatbot will meet my needs."
        },
        type: "scale",
        min: 1,
        max: 7
    },

    // ==================== БЛОК Е: Ожидаемая эмпатия (EM) ====================
    em1: {
        text: {
            ru: "Я ожидаю, что чатбот Kaspi.kz будет понимать, что мне действительно нужно.",
            en: "I expect that the Kaspi.kz chatbot will understand what I really need."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    em2: {
        text: {
            ru: "Я ожидаю, что чатбот Kaspi.kz будет отвечать так, что будет чувствоваться его желание помочь.",
            en: "I expect that the Kaspi.kz chatbot will respond in a way that shows its desire to help."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    em3: {
        text: {
            ru: "Я ожидаю, что чатбот Kaspi.kz будет признавать мои опасения и реагировать на них должным образом.",
            en: "I expect that the Kaspi.kz chatbot will acknowledge my concerns and respond to them appropriately."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    em4: {
        text: {
            ru: "Я ожидаю, что чатбот Kaspi.kz будет адаптировать ответы к моей конкретной ситуации.",
            en: "I expect that the Kaspi.kz chatbot will adapt its responses to my specific situation."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    em5: {
        text: {
            ru: "Я ожидаю, что взаимодействие с чатботом Kaspi.kz будет ощущаться как искреннее стремление помочь, а не следование скрипту.",
            en: "I expect that interaction with the Kaspi.kz chatbot will feel like a genuine desire to help, not just following a script."
        },
        type: "scale",
        min: 1,
        max: 7
    },

    // ==================== БЛОК Ж: Ожидаемое человекоподобие (HN) ====================
    hn1: {
        text: {
            ru: "Я ожидаю, что чатбот Kaspi.kz будет общаться в естественной, человекоподобной манере.",
            en: "I expect that the Kaspi.kz chatbot will communicate in a natural, human-like manner."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    hn2: {
        text: {
            ru: "Я ожидаю, что чатбот Kaspi.kz будет ощущаться скорее как человек, чем как автоматизированная система.",
            en: "I expect that the Kaspi.kz chatbot will feel more like a human than an automated system."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    hn3: {
        text: {
            ru: "Я ожидаю, что чатбот Kaspi.kz будет иметь выраженную и последовательную личность.",
            en: "I expect that the Kaspi.kz chatbot will have a distinct and consistent personality."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    hn4: {
        text: {
            ru: "Я ожидаю, что разговоры с чатботом Kaspi.kz будут ощущаться естественными и плавными.",
            en: "I expect that conversations with the Kaspi.kz chatbot will feel natural and smooth."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    hn5: {
        text: {
            ru: "Я ожидаю, что чатбот Kaspi.kz создаст ощущение социального присутствия во время взаимодействия.",
            en: "I expect that the Kaspi.kz chatbot will create a sense of social presence during interaction."
        },
        type: "scale",
        min: 1,
        max: 7
    },

    // ==================== БЛОК З: Риск конфиденциальности до использования (PPR до) ====================
    ppr_before1: {
        text: {
            ru: "Меня беспокоит, что чатбот Kaspi.kz может собирать мои персональные данные без моего ведома. <i style=\"font-weight: 400;\">Примечание: Kaspi имеет доступ к вашим финансовым данным, истории покупок и личной информации.</i>",       
            en: "I am concerned that the Kaspi.kz chatbot may collect my personal data without my knowledge. <i style=\"font-weight: 400;\">Note: Kaspi has access to your financial data, purchase history, and personal information.</i>"
        },
        type: "scale",
        min: 1,
        max: 7
    },
    ppr_before2: {
        text: {
            ru: "Я опасаюсь, что информация, которой я делюсь с чатботом Kaspi.kz, может быть использована не в целях обслуживания клиентов.",
            en: "I fear that the information I share with the Kaspi.kz chatbot may be used for purposes other than customer service."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    ppr_before3: {
        text: {
            ru: "Использование чатбота Kaspi.kz подвергает мои персональные и финансовые данные риску несанкционированного доступа.",
            en: "Using the Kaspi.kz chatbot exposes my personal and financial data to the risk of unauthorized access."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    ppr_before4: {
        text: {
            ru: "Я чувствую неопределённость в том, как Kaspi.kz хранит и обрабатывает данные, собранные через чатбот.",
            en: "I feel uncertain about how Kaspi.kz stores and processes data collected through the chatbot."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    ppr_before5: {
        text: {
            ru: "Существует значительный риск того, что Kaspi.kz неправомерно использует информацию, собранную через чатбот.",
            en: "There is a significant risk that Kaspi.kz will misuse the information collected through the chatbot."
        },
        type: "scale",
        min: 1,
        max: 7
    },

    // ==================== ЧАСТЬ 2 ====================

    // ==================== БЛОК И: Воспринимаемое качество информации (IQ реальный) ====================
    iq_real1: {
        text: {
            ru: "Чатбот Kaspi.kz предоставил точную информацию о товарах, ценах и заказах.",
            en: "The Kaspi.kz chatbot provided accurate information about products, prices, and orders."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    iq_real2: {
        text: {
            ru: "Информация от чатбота Kaspi.kz была полной и достаточной для моих нужд.",
            en: "The information from the Kaspi.kz chatbot was complete and sufficient for my needs."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    iq_real3: {
        text: {
            ru: "Чатбот Kaspi.kz предоставил информацию, релевантную моему конкретному вопросу.",
            en: "The Kaspi.kz chatbot provided information relevant to my specific question."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    iq_real4: {
        text: {
            ru: "Чатбот Kaspi.kz предоставил актуальную информацию (правильные цены, наличие товаров).",
            en: "The Kaspi.kz chatbot provided up-to-date information (correct prices, product availability)."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    iq_real5: {
        text: {
            ru: "Я мог(ла) полагаться на информацию чатбота Kaspi.kz при принятии решений о покупке.",
            en: "I could rely on the Kaspi.kz chatbot's information when making purchasing decisions."
        },
        type: "scale",
        min: 1,
        max: 7
    },

    // ==================== БЛОК К: Воспринимаемая скорость (SP реальный) ====================
    sp_real1: {
        text: {
            ru: "Чатбот Kaspi.kz быстро отвечал на мои вопросы.",
            en: "The Kaspi.kz chatbot responded quickly to my questions."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    sp_real2: {
        text: {
            ru: "Чатбот Kaspi.kz обрабатывал мои запросы без заметных задержек.",
            en: "The Kaspi.kz chatbot processed my requests without noticeable delays."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    sp_real3: {
        text: {
            ru: "Чатбот Kaspi.kz отвечал в темпе, который ощущался как естественный и эффективный.",
            en: "The Kaspi.kz chatbot responded at a pace that felt natural and efficient."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    sp_real4: {
        text: {
            ru: "При использовании чатбота Kaspi.kz я не испытывал(а) раздражающего ожидания.",
            en: "When using the Kaspi.kz chatbot, I did not experience frustrating waiting."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    sp_real5: {
        text: {
            ru: "Общая скорость ответа чатбота Kaspi.kz соответствовала моим ожиданиям.",
            en: "The overall response speed of the Kaspi.kz chatbot met my expectations."
        },
        type: "scale",
        min: 1,
        max: 7
    },

    // ==================== БЛОК Л: Воспринимаемая эмпатия (EM реальный) ====================
    em_real1: {
        text: {
            ru: "Чатбот Kaspi.kz, казалось, понимал, что мне действительно нужно.",
            en: "The Kaspi.kz chatbot seemed to understand what I really needed."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    em_real2: {
        text: {
            ru: "Чатбот Kaspi.kz отвечал так, что чувствовалось его желание помочь мне.",
            en: "The Kaspi.kz chatbot responded in a way that showed its desire to help me."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    em_real3: {
        text: {
            ru: "Чатбот Kaspi.kz признавал мои опасения и реагировал на них должным образом.",
            en: "The Kaspi.kz chatbot acknowledged my concerns and responded to them appropriately."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    em_real4: {
        text: {
            ru: "Чатбот Kaspi.kz адаптировал свои ответы к моей конкретной ситуации.",
            en: "The Kaspi.kz chatbot adapted its responses to my specific situation."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    em_real5: {
        text: {
            ru: "Взаимодействие с чатботом Kaspi.kz ощущалось как искреннее стремление помочь мне.",
            en: "Interaction with the Kaspi.kz chatbot felt like a genuine desire to help me."
        },
        type: "scale",
        min: 1,
        max: 7
    },

    // ==================== БЛОК М: Воспринимаемое человекоподобие (HN реальный) ====================
    hn_real1: {
        text: {
            ru: "Чатбот Kaspi.kz общался в естественной, человекоподобной манере.",
            en: "The Kaspi.kz chatbot communicated in a natural, human-like manner."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    hn_real2: {
        text: {
            ru: "Чатбот Kaspi.kz ощущался скорее как человек, чем как автоматизированная система.",
            en: "The Kaspi.kz chatbot felt more like a human than an automated system."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    hn_real3: {
        text: {
            ru: "Чатбот Kaspi.kz имел выраженную и последовательную личность на протяжении всего взаимодействия.",
            en: "The Kaspi.kz chatbot had a distinct and consistent personality throughout the interaction."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    hn_real4: {
        text: {
            ru: "Разговор с чатботом Kaspi.kz ощущался естественным и плавным.",
            en: "The conversation with the Kaspi.kz chatbot felt natural and smooth."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    hn_real5: {
        text: {
            ru: "Чатбот Kaspi.kz создал ощущение социального присутствия во время нашего взаимодействия.",
            en: "The Kaspi.kz chatbot created a sense of social presence during our interaction."
        },
        type: "scale",
        min: 1,
        max: 7
    },

    // ==================== БЛОК Н: Подтверждение ожиданий (CE) ====================
    ce1: {
        text: {
            ru: "Работа чатбота Kaspi.kz оказалась лучше, чем я ожидал(а).",
            en: "The Kaspi.kz chatbot's performance was better than I expected."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    ce2: {
        text: {
            ru: "Качество помощи, оказанной чатботом Kaspi.kz, превзошло мои ожидания.",
            en: "The quality of assistance provided by the Kaspi.kz chatbot exceeded my expectations."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    ce3: {
        text: {
            ru: "Чатбот Kaspi.kz дал мне больше, чем я изначально рассчитывал(а).",
            en: "The Kaspi.kz chatbot gave me more than I initially expected."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    ce4: {
        text: {
            ru: "В целом большинство моих ожиданий от чатбота Kaspi.kz подтвердились.",
            en: "Overall, most of my expectations of the Kaspi.kz chatbot were confirmed."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    ce5: {
        text: {
            ru: "Мой опыт использования чатбота Kaspi.kz совпал с тем, на что я надеялся(лась).",
            en: "My experience with the Kaspi.kz chatbot matched what I had hoped for."
        },
        type: "scale",
        min: 1,
        max: 7
    },

    // ==================== БЛОК О: Доверие к платформе Kaspi.kz (TR) ====================
    tr1: {
        text: {
            ru: "Я доверяю Kaspi.kz в том, что платформа выполняет свои обязательства перед клиентами (заказы, возвраты, качество сервиса).",
            en: "I trust Kaspi.kz to fulfill its obligations to customers (orders, returns, service quality)."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    tr2: {
        text: {
            ru: "Kaspi.kz надёжен и последователен в предоставлении своих товаров и услуг.",
            en: "Kaspi.kz is reliable and consistent in providing its goods and services."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    tr3: {
        text: {
            ru: "Я верю, что Kaspi.kz честен в своих отношениях с клиентами.",
            en: "I believe Kaspi.kz is honest in its dealings with customers."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    tr4: {
        text: {
            ru: "Kaspi.kz обладает компетентностью для обеспечения высококачественного опыта покупок и обслуживания.",
            en: "Kaspi.kz has the competence to provide a high-quality shopping and service experience."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    tr5: {
        text: {
            ru: "Я уверен(а), что Kaspi.kz защищает мою личную и финансовую информацию.",
            en: "I am confident that Kaspi.kz protects my personal and financial information."
        },
        type: "scale",
        min: 1,
        max: 7
    },

    // ==================== БЛОК П: Риск конфиденциальности после использования (PPR после) ====================
    ppr_after1: {
        text: {
            ru: "Меня беспокоит, что чатбот Kaspi.kz мог собирать мои персональные данные в ходе этого взаимодействия.",
            en: "I am concerned that the Kaspi.kz chatbot may have collected my personal data during this interaction."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    ppr_after2: {
        text: {
            ru: "Я опасаюсь, что информация, которой я поделился(лась) с чатботом Kaspi.kz, может быть использована не в целях обслуживания клиентов.",
            en: "I fear that the information I shared with the Kaspi.kz chatbot may be used for purposes other than customer service."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    ppr_after3: {
        text: {
            ru: "Использование чатбота Kaspi.kz подвергло мои персональные и финансовые данные риску несанкционированного доступа.",
            en: "Using the Kaspi.kz chatbot exposed my personal and financial data to the risk of unauthorized access."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    ppr_after4: {
        text: {
            ru: "Я чувствую неопределённость в том, как Kaspi.kz хранил и обрабатывал мои данные в ходе этого взаимодействия с чатботом.",
            en: "I feel uncertain about how Kaspi.kz stored and processed my data during this interaction with the chatbot."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    ppr_after5: {
        text: {
            ru: "Существует значительный риск того, что Kaspi.kz неправомерно использует информацию, собранную через чатбот в ходе этого взаимодействия.",
            en: "There is a significant risk that Kaspi.kz will misuse the information collected through the chatbot during this interaction."
        },
        type: "scale",
        min: 1,
        max: 7
    },

    // ==================== БЛОК Р: Намерение продолжить использование (CI) ====================
    ci1: {
        text: {
            ru: "Я намерен(а) использовать чатбот Kaspi.kz в следующий раз, когда мне понадобится помощь на платформе.",
            en: "I intend to use the Kaspi.kz chatbot next time I need help on the platform."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    ci2: {
        text: {
            ru: "Я планирую регулярно использовать чатбот Kaspi.kz для будущих покупок и обслуживания.",
            en: "I plan to regularly use the Kaspi.kz chatbot for future purchases and service."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    ci3: {
        text: {
            ru: "Я предпочту чатбот Kaspi.kz звонку в службу поддержки или посещению офиса Kaspi.",
            en: "I would prefer the Kaspi.kz chatbot over calling customer support or visiting a Kaspi office."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    ci4: {
        text: {
            ru: "Я порекомендую чатбот Kaspi.kz друзьям и родственникам, которые пользуются Kaspi.",
            en: "I would recommend the Kaspi.kz chatbot to friends and relatives who use Kaspi."
        },
        type: "scale",
        min: 1,
        max: 7
    },
    ci5: {
        text: {
            ru: "Моё общее намерение продолжать использование чатбота Kaspi.kz очень сильное.",
            en: "My overall intention to continue using the Kaspi.kz chatbot is very strong."
        },
        type: "scale",
        min: 1,
        max: 7
    },

    // ==================== БЛОК С: Открытые вопросы ====================
    open1: {
        text: {
            ru: "Что вам понравилось больше всего в чатботе Kaspi.kz в ходе данного взаимодействия?",
            en: "What did you like most about the Kaspi.kz chatbot during this interaction?"
        },
        type: "textarea",
        required: false,
        rows: 3
    },
    open2: {
        text: {
            ru: "Что можно было бы улучшить в чатботе Kaspi.kz?",
            en: "What could be improved in the Kaspi.kz chatbot?"
        },
        type: "textarea",
        required: false,
        rows: 3
    },
    open3: {
        text: {
            ru: "Повлияло ли взаимодействие с чатботом на ваши опасения относительно того, как Kaspi.kz обрабатывает ваши персональные данные? Пожалуйста, объясните.",
            en: "Did the interaction with the chatbot affect your concerns about how Kaspi.kz handles your personal data? Please explain."
        },
        type: "textarea",
        required: false,
        rows: 4
    }
};

if (typeof window !== 'undefined') {
    window.surveyData = surveyData;
}