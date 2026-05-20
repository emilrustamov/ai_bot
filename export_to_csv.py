import sqlite3
import json
import pandas as pd

print("📂 Подключаюсь к базе...")
conn = sqlite3.connect('database.db')

print("🔍 Читаю данные...")
df = pd.read_sql_query("SELECT id, session_id, submitted_at, responses_json FROM responses", conn)

print(f"✅ Найдено записей: {len(df)}")

# Разворачиваем JSON в колонки
print("🔄 Разворачиваю JSON...")
responses = df['responses_json'].apply(json.loads)
responses_df = pd.json_normalize(responses)

# Объединяем с основными колонками
result = pd.concat([df[['id', 'session_id', 'submitted_at']], responses_df], axis=1)

# Сохраняем в Excel
print("💾 Сохраняю в Excel...")
result.to_excel('all_answers.xlsx', index=False)

print(f"✅ Готово! Файл: all_answers.xlsx")
print(f"📊 Всего строк: {len(result)}")
print(f"📋 Всего колонок: {len(result.columns)}")
conn.close()