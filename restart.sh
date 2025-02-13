#!/bin/bash

# Проверка наличия переданного пути к файлу бота
echo "DEBUG: Bot file is: $1"
BOT_FILE="$1"

if [ -z "$BOT_FILE" ]; then
  echo "Ошибка: Не указан путь к файлу бота."
  exit 1
fi

BOT_DIR=$(dirname "$BOT_FILE")
echo "DEBUG: Bot directory is: $BOT_DIR"
VENV_DIR="${BOT_DIR}/env"
echo "DEBUG: Virtual environment directory is: $VENV_DIR"

# Проверка существования виртуального окружения
if [ ! -d "$VENV_DIR" ]; then
  echo "Ошибка: Виртуальное окружение не найдено в $VENV_DIR"
  exit 1
fi

# Активация виртуального окружения
source "$VENV_DIR/bin/activate"

BOT_NAME=$(basename "$BOT_FILE" .py)
echo "DEBUG: Bot name is: $BOT_NAME"
echo "DEBUG: Restarting bot with pm2 command: pm2 restart \"$BOT_NAME\""

# Перезапуск бота через pm2
pm2 restart "$BOT_NAME"
STATUS=$?
if [ $STATUS -ne 0 ]; then
  echo "Ошибка перезапуска pm2, статус: $STATUS"
  exit $STATUS
fi

echo "Бот $BOT_NAME успешно перезапущен!"
