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

if [ ! -d "$VENV_DIR" ]; then
  echo "Ошибка: Виртуальное окружение не найдено в $VENV_DIR"
  exit 1
fi

source "$VENV_DIR/bin/activate"

BOT_NAME=$(basename "$BOT_FILE" .py)
echo "DEBUG: Bot name is: $BOT_NAME"
echo "DEBUG: Starting bot with pm2 command: pm2 start python3 --name \"$BOT_NAME\" -- \"$BOT_FILE\""

echo "DEBUG: Проверка существования файла: $BOT_FILE"
ls -lah "$BOT_FILE"

pm2 start python3 --name "$BOT_NAME" -- "$BOT_FILE"
STATUS=$?
if [ $STATUS -ne 0 ]; then
  echo "Ошибка запуска pm2, статус: $STATUS"
  exit $STATUS
fi

echo "Бот $BOT_NAME успешно запущен!"

# Явный запуск любого бота через pm2
pm2 start /var/www/bot_zhasa/bot_zhasa/generated_files/env/bin/python3 --name "$BOT_NAME" -- "$BOT_FILE"
