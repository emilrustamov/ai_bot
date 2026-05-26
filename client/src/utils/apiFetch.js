const DEFAULT_TIMEOUT_MS = 30000;

export function getFetchErrorMessage(error, lang = 'ru') {
    if (error?.name === 'AbortError') {
        return lang === 'ru'
            ? 'Превышено время ожидания. Попробуйте ещё раз.'
            : 'Request timed out. Please try again.';
    }
    if (!navigator.onLine || error?.message === 'Failed to fetch') {
        return lang === 'ru'
            ? 'Нет подключения к интернету. Проверьте сеть и повторите.'
            : 'No internet connection. Check your network and try again.';
    }
    return error?.message || (lang === 'ru' ? 'Ошибка отправки' : 'Submission error');
}

export async function apiFetch(url, options = {}, lang = 'ru', timeoutMs = DEFAULT_TIMEOUT_MS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timeoutId);

        let result = {};
        const contentType = res.headers.get('content-type');
        if (contentType?.includes('application/json')) {
            try {
                result = await res.json();
            } catch (_) {}
        }

        if (!res.ok) {
            throw new Error(result.error || (lang === 'ru' ? 'Ошибка сервера' : 'Server error'));
        }

        return { res, result };
    } catch (error) {
        clearTimeout(timeoutId);
        const wrapped = new Error(getFetchErrorMessage(error, lang));
        wrapped.cause = error;
        throw wrapped;
    }
}
