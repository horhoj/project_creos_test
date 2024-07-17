# Тестовое для вашей компании

ДЕМО: https://project-creos-test.vercel.app/designers

# Описание

Выполнены все задачи, вся верстка вручную без UI_KIT

!!!В некоторых случаях бекенд, при фильтрации по дизайнерам, отдает двойников.

# Используется:

date-fns, recharts, i18next, axios, vite, uuid, classnames, react, typescript, redux-tookit, docker(docker-compose), nginx (для раздачи статики билда), eslint + prettier

# запуск

npm i

npm run dev

# запуск в докере (протестировано только на линукс, нужны make, docker, docker-compose)

запуск в режиме разработки (порт 3000)

make docker-ddev

запуск в режиме раздачи билда через nginx (порт 80)

make docker-init

разумеется порты можно поменять в настройках
