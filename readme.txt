sudo mkdir -p /var/www/example.com/public_html //создает папки
sudo chmod -R 755 /var/www //разрешение на запись файлов

Ctrl+O - сохранить, Ctrl+X - выйти
node hello.js &
exit

htop
F4 - фильтр
воодим что-то ? node
F9 - enter

найти нужный процесс
lsof -i tcp:port

ps -aux //показывает все процессы и возвращает управление
ps - aux | qreb node //фильтр из процессов

ls — показать кратко содержимое текущего каталога
ls -lah — показать подробно содержимое текущего каталога, включая скрытые файлы
cat file.txt — отобразить содержимое файла file.txt
tail file.txt — отобразить последнюю часть содержимого файла file.txt
tail -f _server.log - показывает лог в режиме реального времени