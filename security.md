Ниже — практически полезный, современный чек-лист безопасности для Next.js 16 (App Router, Server Actions, Edge/Node runtime), а также конкретные настройки next.config.ts, которые реально помогают повысить защиту.

✅ 1. Основные меры защиты сервера Next.js

Эти шаги не зависят от Next.js, но критичны при продакшене.

1.1. Обновляйте зависимости

Особенно важно для:

next

react, react-dom

любых UI/SSR-плагинов

серверных библиотек (ORM, prisma, mongoose и т.п.)

npm audit fix
npm outdated

1.2. Используйте HTTPS + HSTS

На уровне reverse-proxy (NGINX, Cloudflare, Vercel):

Strict-Transport-Security: max-age=63072000; includeSubDomains; preload


Обязательно отключайте HTTP полностью.

1.3. Защита API

Если вы используете:

Server Actions → следите за authorized actions

API routes → добавьте rate limiting

Middleware → проверка токенов/JWT

Используйте rate limiter, например:

Upstash Ratelimit

Cloudflare rate limiting

express-rate-limit (если у вас кастомный сервер)

1.4. Защита от CSRF

Если есть формы или cookie-based auth:

Используйте:

SameSite='strict'

CSRF-токены (если POST из браузера)

Пример:

cookies().set("session", token, {
httpOnly: true,
secure: true,
sameSite: "strict",
});

1.5. Защита от XSS

Next.js по умолчанию защищает, но важно:

Никогда не рендерить опасный HTML

Проверяйте данные от пользователей

Используйте Content Security Policy (см. ниже)

1.6. Защита от SSRF

При работе с внешними API разрешайте только разрешённые хосты.

1.7. Изоляция переменных окружения

Секреты держите только в:

process.env.*

.env.local (не коммитить)

.env.production (deployment only)

Next.js раскрывает только переменные с префиксом NEXT_PUBLIC_.

✅ 2. Настройки безопасности в next.config.ts

Ниже — рекомендованный продакшен-конфиг для Next.js 15–16.

2.1. Security headers (очень важно)

Добавьте заголовки:

// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
reactStrictMode: true,

async headers() {
return [
{
source: "/(.*)",
headers: [
{
key: "X-Frame-Options",
value: "DENY",
},
{
key: "X-Content-Type-Options",
value: "nosniff",
},
{
key: "Referrer-Policy",
value: "strict-origin-when-cross-origin",
},
{
key: "Permissions-Policy",
value:
"camera=(), microphone=(), geolocation=(), interest-cohort=()",
},
{
key: "Strict-Transport-Security",
value: "max-age=63072000; includeSubDomains; preload",
},
{
key: "Content-Security-Policy",
value: [
"default-src 'self'",
"script-src 'self' 'unsafe-inline' 'unsafe-eval'",
"style-src 'self' 'unsafe-inline'",
"img-src 'self' blob: data:",
"connect-src 'self' https:",
"font-src 'self'",
"frame-ancestors 'none'",
"object-src 'none'",
].join("; "),
},
],
},
];
},
};

export default nextConfig;

💡 Важно

CSP может ломать сторонние скрипты (Google Tag Manager, Yandex, Stripe).

Если используете внешние сервисы — нужно добавить их в whitelist.

2.2. Ограничьте домены изображений

Если используете <Image>:

images: {
remotePatterns: [
{
protocol: "https",
hostname: "example.com",
},
],
},


Иначе могут быть XXS / SSRF атаки через image proxy.

2.3. Запрещаем использование внешних eval

Эта настройка уменьшает риск XSS:

compiler: {
removeConsole: process.env.NODE_ENV === "production",
},

2.4. Включите SWC minimizer для защиты кода

SWC уменьшает размер бандла и скрывает структуру кода:

swcMinify: true,

2.5. Включите строгую типизацию на сервере

Помогает ловить ошибки и инъекции:

typescript: {
ignoreBuildErrors: false,
},

2.6. Удаляйте sourcemaps в продакшене

Чтобы не раскрывать код:

productionBrowserSourceMaps: false,

📦 3. Защита Server Actions (Next.js 14–16)

Если вы используете Server Actions:

"use server";

export async function updateProfile(prevState, formData) {
if (!auth()) throw new Error("Unauthorized");
// your logic
}


Всегда проверяйте авторизацию внутри каждого server action.

Никогда не доверяйте данным с формы.

🚀 Итог — минимальный набор защиты

Если кратко:

Сервер

✔ HTTPS + HSTS
✔ Rate limiting
✔ Безопасные cookies
✔ CSRF защита
✔ Защита API

Next.js настройки

✔ CSP, Permissions-Policy, X-Frame-Options – в headers
✔ Ограничение доменов изображений
✔ SWC minify
✔ removeConsole
✔ Без исходных карт в продакшене

Если хочешь — могу:
✅ проверить твой текущий next.config.ts
✅ подготовить идеальный конфиг именно для твоего приложения
✅ сделать полноценный PROTECTION checklist

Сбрось свой next.config.ts — я оптимизирую.
