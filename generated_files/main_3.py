import asyncio
import aiohttp
from aiogram import Bot, Dispatcher
from aiogram.types import Message
from aiogram.filters import Command

TOKEN = "7656252183:AAGbRq8sZlAKYShZzW7JGIaBZMuxG_kRN1I"
bot = Bot(token=TOKEN)
dp = Dispatcher()

async def delete_webhook():
    url = f"https://api.telegram.org/bot{TOKEN}/deleteWebhook"
    async with aiohttp.ClientSession() as session:
        async with session.post(url) as resp:
            print("Webhook deleted:", await resp.text())

@dp.message(Command("bot"))
async def info_command(message: Message):
    await message.answer("Это сделано через Конструктор Ботов - Made in Jandarbek")

async def main():
    await delete_webhook()
    await dp.start_polling(bot)



# Block: CHATGPT
import g4f

@dp.message(Command("chat"))
async def ask_chatgpt(message: Message):
    user_question = message.text.replace("/chat", "").strip()
    if not user_question:
        await message.answer("Сұрақты /chat кейін қоясыз, мысалы: `/chat Жандарбектің неше тісі бар?`")
        return
    await message.answer("Ойланудамын ... ⏳")
    loop = asyncio.get_event_loop()
    response = await loop.run_in_executor(
        None, 
        g4f.ChatCompletion.create, 
        "gpt-4", 
        [{"role": "user", "content": user_question}]
    )
    await message.answer(response)
#1
if __name__ == '__main__':
    asyncio.run(main())
#2