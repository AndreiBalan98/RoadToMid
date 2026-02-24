# PLAN COMPLET — Speedrun Full-Stack: De la Zero la Mid-Level

## Ideea centrală

Un singur proiect evolutiv: **Mini Task Tracker** — taskuri cu status și notițe.
Îl reconstruiești de mai multe ori. Fiecare versiune adaugă un strat nou.
Scopul nu e aplicația, ci **să înțelegi de ce există fiecare tehnologie și ce problemă rezolvă.**

Regula de aur: **simți problema → apoi folosești tool-ul.**

---

## Convenții pe tot parcursul proiectului

Acestea nu sunt o etapă separată. Le aplici **din prima zi, în fiecare etapă:**

- **Git** — inițializezi repo din Etapa 0. Fiecare etapă = un branch. Commit-uri mici, atomice, cu mesaje descriptive (Conventional Commits: `feat:`, `fix:`, `refactor:`).
- **README.md** — actualizat la fiecare etapă. Explică ce face proiectul, cum îl rulezi, ce ai învățat.
- **.gitignore** — de la început. Niciodată `node_modules/`, `.env`, `__pycache__/`, `*.pyc` în repo.
- **.env** — niciun secret hardcodat. Folosești variabile de mediu din Etapa 0.
- **Cod curat** — funcții scurte, nume clare, fără duplicare. Refactorizezi constant.
- **Documentare inline** — comentarii doar când „de ce", nu „ce". Codul în sine trebuie să fie clar.

---

## ETAPA 0 — Python Script (fundament logic)

### Ce construiești
Un CLI simplu care gestionează taskuri:
- `add <task>` — adaugă un task
- `list` — afișează taskurile
- `done <id>` — marchează ca terminat
- `delete <id>` — șterge un task

Stocare: dicționare în memorie (listă de dict-uri). Opțional: salvare în JSON file.

### Ce înveți
- Sintaxă Python, structuri de date (liste, dicționare)
- Funcții, parametri, return values
- Control flow (if/else, for, while)
- Input/output, string formatting
- Separarea logicii de I/O (funcțiile de logică nu fac `print` — returnează date)
- Organizare cod: un fișier `tasks.py` (logică) + un fișier `main.py` (CLI)

### Practică Git
- `git init`, primul commit
- `.gitignore` cu `__pycache__/`, `.env`
- Minimum 5-6 commit-uri separate (init, add, list, done, delete, refactor)

### Temă de gândire
> Ce se întâmplă cu datele când oprești scriptul? De ce ai nevoie de o bază de date?
> Ce e diferența între un script și un server? De ce nu poți accesa taskurile de pe alt calculator?

---

## ETAPA 1 — Server HTTP manual (fără framework)

### Ce construiești
Un server HTTP folosind doar `http.server` din Python standard.

Endpointuri:
- `GET /tasks` — returnează lista de taskuri (JSON)
- `POST /tasks` — creează un task nou (primește JSON)
- `DELETE /tasks/<id>` — șterge un task

### Ce înveți
- Ce e un server HTTP: ascultă pe un port, primește cereri, trimite răspunsuri
- Request: method, path, headers, body
- Response: status code, headers, body
- JSON: serializare (`json.dumps`) și deserializare (`json.loads`) manuală
- Routing manual: parsezi URL-ul, decizi ce funcție apelezi
- Content-Type header: de ce contează
- Status codes: 200, 201, 404, 400, 500 — ce înseamnă fiecare
- CORS: de ce browserul blochează cereri și cum adaugi headerele

### Ce NU folosești
Niciun framework, nicio bibliotecă externă. Doar Python standard.

### Temă de gândire
> Câte linii de cod ai scris doar pentru routing? Câte pentru parsarea body-ului?
> Ce se întâmplă dacă cineva trimite JSON invalid? Cum gestionezi erorile?
> De ce ai vrea ca altcineva să fi rezolvat deja problemele astea? → Framework.

---

## ETAPA 2 — API cu FastAPI

### Ce construiești
Refaci serverul din Etapa 1, dar cu FastAPI.

Aceleași endpointuri, plus:
- Validare automată cu Pydantic models
- Documentație Swagger generată automat (`/docs`)
- Response models explicite
- Error handling cu HTTPException
- Status codes corecte pe fiecare rută

### Ce înveți
- Ce e un framework și ce face pentru tine (compară cu Etapa 1)
- REST: resurse, verbe HTTP, convenții de URL
- Pydantic: modele de date, validare automată, serializare
- Type hints în Python: nu doar documentație, ci funcționalitate reală
- Dependency Injection (concept, nu doar FastAPI)
- Async/await: ce înseamnă, când contează, când nu
- CORS middleware

### Practică testare
- Instalezi `pytest` + `httpx`
- Scrii minimum 3-4 teste: test create task, test list tasks, test delete, test validare eșuată
- Rulezi testele cu `pytest -v`

### Structura fișierelor
```
backend/
├── main.py          # aplicația FastAPI, rutele
├── models.py        # Pydantic models (TaskCreate, TaskResponse)
├── store.py         # logica de stocare (încă în memorie)
├── tests/
│   └── test_api.py  # teste pytest
├── requirements.txt
└── .env
```

### Temă de gândire
> Ai văzut că FastAPI generează documentație automat. Ce ar fi fost necesar să faci asta manual?
> Datele încă se pierd la restart. Ce urmează?
> Ce se întâmplă dacă 1000 de utilizatori accesează simultan? (async, concurrency)

---

## ETAPA 3 — Frontend minimal (HTML + CSS + JavaScript vanilla)

### Ce construiești
O pagină web simplă care comunică cu API-ul din Etapa 2:
- Afișează lista de taskuri
- Formular pentru adăugare task nou
- Buton de ștergere pe fiecare task
- Buton de „done" care schimbă vizual task-ul

Un singur fișier `index.html` cu CSS inline/embedded și JavaScript inline.

### Ce înveți
- HTML semantic: `<form>`, `<ul>`, `<li>`, `<button>`, `<input>`
- CSS fundamental: box model, flexbox, margin/padding, culori, fonturi
- DOM manipulation: `document.getElementById`, `createElement`, `addEventListener`
- `fetch()` API: GET, POST, DELETE — cum trimiți și primești JSON
- Event handling: submit, click, prevent default
- Ciclul: user action → fetch → update DOM
- Ce e „state" în frontend (chiar dacă acum e doar variabile JS)
- Async/await în browser

### Ce NU folosești
Niciun framework, nicio bibliotecă, niciun build tool. Doar fișiere statice.

### Temă de gândire
> Ce se întâmplă dacă ai 50 de taskuri și schimbi unul? Redesenezi tot? Doar elementul ăla?
> Dacă ai 10 pagini, copii HTML-ul comun în fiecare? → Componente.
> Ce se întâmplă dacă scrii greșit numele unui câmp? JS nu te avertizează. → TypeScript.
> Cum faci layout-ul responsive fără să scrii 200 de linii CSS? → Tailwind.

---

## ETAPA 4 — Styling: CSS manual → Tailwind

### Ce construiești
Refaci UI-ul în două sub-pași:

**4a — CSS manual (fișier separat)**
- Extragi CSS-ul inline într-un `styles.css`
- Layout responsive cu media queries
- Design consistent: variabile CSS (`--primary-color`, etc.)
- Hover states, tranziții simple

**4b — Tailwind CSS**
- Refaci același design cu clase Tailwind
- Instalezi via CDN (simplu) sau via npm (real)
- Responsive cu prefixe (`sm:`, `md:`, `lg:`)
- Dark mode (opțional dar impresionant la interviu)

### Ce înveți
- CSS: specificity, cascade, inheritance, box model în profunzime
- Variabile CSS (custom properties)
- Media queries, responsive design
- Flexbox și Grid layout
- Tailwind: utility-first philosophy — de ce e rapid, de ce e consistent
- Trade-off: control total (CSS) vs viteză (Tailwind)

### Temă de gândire
> Câte clase CSS ai creat care fac aproape același lucru? → Tailwind rezolvă asta.
> Cum menții consistența vizuală într-o echipă de 5 oameni? → Design system, Tailwind config.
> Ce e un design token? Ce e un component library?

---

## ETAPA 5 — TypeScript

### Ce construiești
Convertești tot JavaScript-ul din frontend în TypeScript.

- Definești interfețe: `Task`, `CreateTaskRequest`, `ApiResponse`
- Tipuri pentru funcțiile fetch
- Tipuri pentru event handlers
- Strict mode activat

### Ce înveți
- De ce tipuri statice: erori prinse la compilare, nu în producție
- Interfaces vs Types
- Generics (cel puțin bazele: `Promise<Task[]>`, `Array<Task>`)
- Union types, optional properties
- Type narrowing, type guards
- `tsconfig.json` — ce opțiuni contează (`strict`, `target`, `module`)
- Compilare: TS → JS (ce rulează de fapt în browser)

### Setup
- Instalezi Node.js + npm (dacă nu ai deja)
- `npm init`, `npm install typescript`
- `tsconfig.json` cu `strict: true`
- Compilare cu `npx tsc`

### Temă de gândire
> Unde ai avut bug-uri în JS pe care TypeScript le-ar fi prins?
> Ce e diferența între type safety la compilare vs runtime?
> Ce sunt `any` și `unknown`? De ce `any` e periculos?

---

## ETAPA 6 — React

### Ce construiești
Refaci întregul frontend ca aplicație React (cu TypeScript).

Componente:
- `App` — root, gestionează state-ul global
- `TaskList` — primește array de taskuri, le randează
- `TaskItem` — un singur task, cu butoane de done/delete
- `TaskForm` — formular de creare task nou
- `StatusFilter` — filtrează taskuri după status

### Ce înveți
- Componentizare: UI-ul e un arbore de componente
- JSX: HTML în JavaScript (de fapt, un limbaj de template)
- Props: date care curg de la părinte la copil (one-way data flow)
- State (`useState`): date care se schimbă și re-randează componenta
- Effects (`useEffect`): side effects (fetch la mount, cleanup)
- Event handling în React
- Conditional rendering, list rendering (`map` + `key`)
- Custom hooks: `useTasksApi()` — extragi logica de fetch
- Component lifecycle mental model

### Setup
```bash
npm create vite@latest frontend -- --template react-ts
```

### Structura
```
frontend/
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskForm.tsx
│   │   └── StatusFilter.tsx
│   ├── hooks/
│   │   └── useTasksApi.ts
│   ├── types/
│   │   └── task.ts        # interfețe TypeScript partajate
│   └── main.tsx
├── package.json
├── tsconfig.json
└── tailwind.config.js     # Tailwind integrat din start
```

### Practică testare
- Instalezi React Testing Library + Vitest
- Testezi: render TaskItem, click delete, submit form
- Minimum 3-4 teste de componente

### Temă de gândire
> Ce se întâmplă dacă ai 20 de componente care au nevoie de aceleași date? Props drilling. → Context, state management.
> Ce e diferența între client-side rendering (ce faci acum) și server-side rendering?
> Ce se întâmplă cu SEO-ul? Googlebot vede pagina goală? → Next.js.

---

## ETAPA 7 — Next.js

### Ce construiești
Migrezi aplicația React într-un proiect Next.js (App Router).

Adaugi:
- Routing bazat pe foldere (`/tasks`, `/tasks/[id]`)
- Server Components (componentele se randează pe server)
- Server Actions (mutații fără API routes manuale)
- Loading states (`loading.tsx`)
- Error boundaries (`error.tsx`)
- Metadata (titluri, SEO)
- Layout partajat (`layout.tsx`)

### Ce înveți
- SSR (Server-Side Rendering) vs CSR (Client-Side Rendering): diferențe, trade-offs
- App Router: file-based routing, nested layouts
- Server Components vs Client Components (`'use client'`)
- Data fetching în Next.js: server-side, caching, revalidare
- Server Actions: mutații direct din componente, fără API intermediar
- Build & bundle: ce produce `next build`, cum optimizează
- Environment variables: `.env.local` vs `.env` (client vs server)
- Middleware (concept, nu implementare complexă)
- Image optimization (`next/image`)

### Structura
```
frontend/
├── app/
│   ├── layout.tsx         # layout root (nav, footer)
│   ├── page.tsx           # homepage → lista de taskuri
│   ├── loading.tsx        # skeleton/spinner global
│   ├── error.tsx          # error boundary global
│   └── tasks/
│       ├── page.tsx       # /tasks
│       └── [id]/
│           └── page.tsx   # /tasks/123
├── components/            # componente reutilizabile
├── lib/
│   └── api.ts             # funcții de fetch toward backend
├── types/
│   └── task.ts
├── tailwind.config.ts
├── next.config.js
└── package.json
```

### Temă de gândire
> Ce componente trebuie să fie Server Components și care Client Components?
> Ce e hydration? De ce uneori vezi un „flash" de conținut diferit?
> Ce e ISR (Incremental Static Regeneration)? Când l-ai folosi?
> Ce e edge rendering? Când contează?

---

## ETAPA 8 — Backend complet: Django + DRF + PostgreSQL

### Ce construiești
Migrezi backendul de pe FastAPI pe Django + Django REST Framework + PostgreSQL.

Include:
- Modele Django (Task cu câmpuri: title, status, notes, created_at, updated_at, user)
- Migrații de bază de date (`makemigrations`, `migrate`)
- Django Admin configurat (poți vedea/edita taskuri din browser)
- API REST complet cu DRF (serializers, viewsets, routers)
- Autentificare: registration, login, logout (session-based sau JWT)
- Permisiuni: fiecare user vede doar taskurile lui
- Filtrare, sortare, paginare pe API
- PostgreSQL ca bază de date (nu SQLite)

### Ce înveți
- Django philosophy: „batteries included" vs microframework
- ORM: modele Python → tabele SQL, fără să scrii SQL manual
- Migrații: versionare a schemei bazei de date
- Django Admin: interfață gratuită de administrare
- DRF: serializers (validare + transformare), viewsets (CRUD automat), routers (URL-uri automate)
- Autentificare vs autorizare: cine ești vs ce ai voie
- Session-based auth vs Token/JWT auth: diferențe, trade-offs
- ORM vs SQL raw: când folosești fiecare
- N+1 query problem, `select_related`, `prefetch_related`
- PostgreSQL: de ce nu SQLite în producție (concurrency, types, performance)
- `settings.py`: configurare per environment (dev vs prod)

### Setup
```bash
pip install django djangorestframework psycopg2-binary djangorestframework-simplejwt
django-admin startproject config .
python manage.py startapp tasks
```

### Structura
```
backend/
├── config/
│   ├── settings.py       # baza
│   ├── settings_dev.py   # override-uri locale
│   ├── urls.py
│   └── wsgi.py
├── tasks/
│   ├── models.py         # Task model
│   ├── serializers.py    # DRF serializers
│   ├── views.py          # DRF viewsets
│   ├── urls.py           # router DRF
│   ├── admin.py          # config admin
│   ├── permissions.py    # custom permissions
│   ├── filters.py        # filtrare
│   └── tests/
│       ├── test_models.py
│       └── test_api.py
├── users/
│   ├── models.py         # custom user (opțional)
│   ├── serializers.py
│   └── views.py          # register, login
├── manage.py
├── requirements.txt
└── .env
```

### Practică testare
- Django TestCase + DRF APITestCase
- Teste pe modele, pe serializers, pe viewsets
- Testezi permisiuni: user A nu vede taskurile lui B
- Minimum 8-10 teste

### Practică Docker
- Dockerfile pentru backend
- `docker-compose.yml` cu: backend + PostgreSQL
- `.env` pentru credențiale DB

### Temă de gândire
> Ce diferențe vezi între FastAPI și Django? Când ai alege fiecare?
> Ce e un ORM și ce compromisuri face? Când ai scrie SQL direct?
> Ce se întâmplă când schema DB se schimbă? De ce migrațiile sunt critice?
> Ce e connection pooling? De ce contează în producție?

---

## ETAPA 9 — Cache cu Redis

### Ce construiești
Adaugi Redis ca layer de caching:
- Cache pe endpoint-ul `GET /tasks` (invalidezi la orice mutație)
- Cache pe task individual `GET /tasks/<id>`
- Rate limiting pe API (max 100 req/min per user)

### Ce înveți
- Ce e caching: tradeoff viteză vs freshness
- Redis: key-value store in-memory, extrem de rapid
- Cache patterns: cache-aside (lazy loading)
- Cache invalidation: „cea mai grea problemă din CS"
- TTL (Time To Live): expire automat
- Rate limiting: protecție împotriva abuzului
- `django-redis` sau `redis-py` direct

### Docker
- Adaugi Redis în `docker-compose.yml`
- Acum ai 3 servicii: backend, PostgreSQL, Redis

### Temă de gândire
> Ce se întâmplă dacă Redis cade? Aplicația trebuie să funcționeze fără cache.
> Când NU faci cache? (date care se schimbă constant, date per-user sensibile)
> Ce e un cache stampede? Cum îl previi?
> Ce e Redis ca message broker vs Redis ca cache?

---

## ETAPA 10 — Background Workers (Celery)

### Ce construiești
Adaugi procesare asincronă cu Celery + Redis (ca broker):
- Trimite email de reminder (simulat: scrie în fișier/log) la 24h după crearea unui task neterminat
- Generează un raport zilnic: câte taskuri create, câte completate
- Task de cleanup: șterge taskurile completate mai vechi de 30 de zile

### Ce înveți
- De ce background processing: nu blochezi request-ul utilizatorului
- Celery: task queue, workers, broker (Redis)
- Tasks sincrone vs asincrone
- Retry logic: ce faci când un task eșuează
- Periodic tasks cu Celery Beat (cron-like scheduling)
- Monitoring workers: Flower (dashboard web)

### Docker
- Adaugi Celery worker + Celery Beat în `docker-compose.yml`
- Acum ai 5 servicii: backend, PostgreSQL, Redis, Celery worker, Celery Beat

### Structura nouă
```
backend/
├── tasks/
│   ├── ...
│   └── celery_tasks.py    # task-uri Celery (send_reminder, daily_report, cleanup)
├── config/
│   ├── celery.py          # configurare Celery
│   └── ...
```

### Temă de gândire
> Ce se întâmplă dacă un worker moare la jumătatea unui task? Idempotency.
> Ce e diferența între Celery și un simplu `cron` job?
> Ce e un dead letter queue?
> Când ai folosi un message broker dedicat (RabbitMQ) vs Redis?

---

## ETAPA 11 — Observabilitate (Logging, Metrics, Health Checks)

### Ce construiești
- **Structured logging**: fiecare request loggat cu request_id, user, duration, status
- **Health check endpoint**: `GET /health` — verifică DB, Redis, Celery
- **Metrics endpoint** (simplu): `GET /metrics` — nr taskuri, nr useri, uptime
- **Error tracking**: middleware care loghează excepțiile cu context
- **Request ID**: fiecare request primește un UUID, propagat în toate log-urile

### Ce înveți
- De ce observabilitatea: „dacă nu poți vedea ce face aplicația, nu o poți repara"
- Structured logging vs `print()`: JSON logs, parsabile, filtrabile
- Cele 3 piloni: logs, metrics, traces
- Logging levels: DEBUG, INFO, WARNING, ERROR, CRITICAL
- Health checks: liveness vs readiness
- Correlation IDs: urmărești un request prin toate serviciile

### Ce folosești
- Python `logging` module cu configurare JSON
- Middleware Django custom pentru request logging
- Endpoint-uri simple, fără tool-uri externe complexe

### Temă de gândire
> În producție reală ai folosi: Sentry (error tracking), Prometheus + Grafana (metrics), ELK/Loki (logs).
> Ce e distributed tracing? Ce e OpenTelemetry?
> Ce e un SLA/SLO/SLI?
> Ce e un runbook?

---

## ETAPA 12 — Security Hardening

### Ce construiești
- CORS configurat corect (doar frontend-ul tău, nu `*`)
- CSRF protection activă
- Rate limiting per endpoint
- Input sanitization (XSS prevention)
- Secure headers: `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`
- Environment variables pentru TOATE secretele
- Password hashing (deja prin Django, dar înțelegi ce face)
- HTTPS enforced

### Ce înveți
- OWASP Top 10: cele mai comune vulnerabilități web
- CORS: ce e, de ce există, cum configurezi
- CSRF: ce e un attack CSRF, cum te protejezi
- XSS: injection de JavaScript, sanitizare
- SQL Injection: de ce ORM-ul te protejează (și când nu)
- Authentication security: bcrypt, JWT expiry, refresh tokens
- Secrets management: `.env`, never in git, rotation

### Temă de gândire
> Ce e un penetration test? Ce e un security audit?
> Ce e OAuth 2.0? Când ai implementa „Login with Google"?
> Ce e 2FA? Cum l-ai adăuga?
> Ce e GDPR și cum afectează ce stochezi?

---

## ETAPA 13 — CI/CD + Deploy

### Ce construiești
**CI (GitHub Actions):**
- La fiecare push: lint, type check, teste backend, teste frontend
- La fiecare PR: code review automat (format, teste trec)
- Build frontend, build backend

**CD (Deploy automat):**
- Backend: deploy pe Railway / Fly.io / VPS
- Frontend: deploy pe Vercel
- Bază de date: PostgreSQL managed (Railway / Supabase / Neon)
- Redis: managed (Railway / Upstash)
- Domeniu custom + HTTPS (Let's Encrypt)

### Ce înveți
- CI/CD: ce e, de ce e esențial
- GitHub Actions: workflows, jobs, steps, secrets
- Docker în producție: Dockerfile optimizat (multi-stage build)
- `docker-compose` pentru development vs producție
- Environment management: dev, staging, prod
- Deploy strategies: rolling update
- DNS: cum un domeniu ajunge la serverul tău
- HTTPS/TLS: de ce e obligatoriu, cum funcționează
- Reverse proxy: Nginx/Caddy (concept)

### Fișiere noi
```
.github/
└── workflows/
    ├── ci.yml             # lint + teste la push
    └── deploy.yml         # deploy la merge pe main
Dockerfile                 # backend production
docker-compose.yml         # development (toate serviciile)
docker-compose.prod.yml    # producție
nginx.conf                 # reverse proxy (dacă VPS)
```

### Temă de gândire
> Ce e blue-green deployment? Ce e canary release?
> Ce e infrastructure as code (Terraform, Pulumi)?
> Ce e un CDN? De ce ai pune frontend-ul pe unul?
> Ce e auto-scaling? Când ai avea nevoie?
> Ce e Kubernetes? (nu ai nevoie acum, dar trebuie să știi ce e)

---

## ETAPA 14 — Arhitectură, Documentare, Practici profesionale

### Ce faci
Nu scrii cod nou. Documentezi și rafinezi tot ce ai construit.

- **Architecture Decision Records (ADR)**: un document scurt per decizie majoră
  - De ce FastAPI la început, de ce migrare la Django?
  - De ce PostgreSQL, nu MongoDB?
  - De ce JWT, nu session auth?
  - De ce Celery, nu un cron simplu?
- **Diagrama arhitecturii**: un desen (draw.io / excalidraw) cu toate componentele
  - Frontend (Vercel) → Backend (Django) → PostgreSQL
  - Redis (cache + broker) → Celery Workers
  - GitHub Actions → Deploy
- **API Documentation**: Swagger/OpenAPI completă
- **README final**: profesional, cu screenshots, setup local, link live

### Ce înveți
- Documentare ca skill profesional (nu opțional)
- Comunicare tehnică: explici decizii, nu doar cod
- System design thinking: vezi ansamblul, nu doar bucăți
- Trade-offs: fiecare decizie are un cost

### Subiecte de revizuit (gândire de architect)
- **Monolith vs microservices**: proiectul tău e un monolit. Când ai sparge? De ce nu acum?
- **Horizontal vs vertical scaling**: adaugi servere sau mărești serverul?
- **CAP theorem**: consistency, availability, partition tolerance — alegi 2 din 3
- **Event-driven architecture**: ce ar însemna pentru proiectul tău?
- **Domain-Driven Design (DDD)**: conceptual, cum ai organiza un proiect mare?
- **SOLID principles**: le-ai aplicat? Unde?

---

## Subiecte avansate — NU le implementezi, dar le cunoști

Acestea nu fac parte din proiect, dar la un interviu mid-level s-ar putea să fii întrebat:

| Subiect | Ce trebuie să știi | De ce contează |
|---|---|---|
| **WebSockets** | Comunicare bidirecțională real-time | Chat, notificări live |
| **GraphQL** | Alternativă la REST, client cere exact ce vrea | Facebook, Shopify, GitHub |
| **Message Queues (RabbitMQ, Kafka)** | Decuplare servicii, event streaming | Sisteme distribuite |
| **Kubernetes** | Orchestrare containere la scară mare | DevOps, cloud |
| **Terraform** | Infrastructure as Code | Reproducibilitate |
| **Microservices** | Servicii independente vs monolit | Scalare echipe mari |
| **gRPC** | Protocol rapid între servicii (Protocol Buffers) | Comunicare internă |
| **OAuth 2.0 / OpenID Connect** | Login social, SSO | „Login with Google" |
| **Elasticsearch** | Search engine full-text | Căutare rapidă |
| **MongoDB** | NoSQL document store | Date nestructurate |
| **Serverless (AWS Lambda)** | Funcții fără server | Pay-per-use, scaling automat |
| **CDN** | Content delivery distribuit global | Performance frontend |

---

## Timeline orientativă

| Etapă | Timp estimat | Cumulat |
|---|---|---|
| 0 — Python Script | 1-2 zile | ~2 zile |
| 1 — Server manual | 1-2 zile | ~4 zile |
| 2 — FastAPI | 2-3 zile | ~1 săptămână |
| 3 — Frontend HTML/JS | 2-3 zile | ~10 zile |
| 4 — CSS + Tailwind | 2-3 zile | ~2 săptămâni |
| 5 — TypeScript | 1-2 zile | ~16 zile |
| 6 — React | 4-5 zile | ~3 săptămâni |
| 7 — Next.js | 3-4 zile | ~4 săptămâni |
| 8 — Django + DRF + PostgreSQL | 5-7 zile | ~5 săptămâni |
| 9 — Redis cache | 1-2 zile | ~5.5 săptămâni |
| 10 — Celery workers | 2-3 zile | ~6 săptămâni |
| 11 — Observabilitate | 1-2 zile | ~6.5 săptămâni |
| 12 — Security | 1-2 zile | ~7 săptămâni |
| 13 — CI/CD + Deploy | 2-3 zile | ~7.5 săptămâni |
| 14 — Documentare + Arhitectură | 1-2 zile | **~8 săptămâni** |

**Total: ~8 săptămâni** dacă lucrezi consistent 4-6 ore/zi.
Ajustezi ritmul după tine — important e să nu sari etape.

---

## Rezultat final

După cele 14 etape ai:

1. **Un proiect complet, deployat, live** — link în CV
2. **Repo Git cu istoric curat** — demonstrează evoluția ta
3. **Cunoștințe de mid-level** — nu doar „am folosit React", ci „știu de ce există React"
4. **Stack complet**: Python → FastAPI → Django + DRF → PostgreSQL → Redis → Celery → React → TypeScript → Next.js → Tailwind → Docker → CI/CD
5. **Gândire de architect**: ADR-uri, diagrame, trade-offs documentate
6. **Business personal funcțional** — aplicația ta web are fundație solidă

La interviu poți spune: *„Am construit un proiect de la un script Python până la un sistem distribuit cu cache, workers, CI/CD și deploy. Am documentat fiecare decizie arhitecturală și pot explica de ce am ales fiecare tehnologie."*