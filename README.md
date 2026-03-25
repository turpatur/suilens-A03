# suilens-microservice-tutorial

Microservices tutorial implementation for Assignment 1 Part 2.2.

## Run

```bash
docker compose up --build -d
```

## Migrate + Seed (from host)

```bash
(cd services/catalog-service && bun install --frozen-lockfile && bunx drizzle-kit push)
(cd services/order-service && bun install --frozen-lockfile && bunx drizzle-kit push)
(cd services/notification-service && bun install --frozen-lockfile && bunx drizzle-kit push)
(cd services/catalog-service && bun run src/db/seed.ts)
```

## Smoke Test

```bash
curl http://localhost:3001/api/lenses | jq
LENS_ID=$(curl -s http://localhost:3001/api/lenses | jq -r '.[0].id')

curl -X POST http://localhost:3002/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Budi Santoso",
    "customerEmail": "budi@example.com",
    "lensId": "'"$LENS_ID"'",
    "startDate": "2025-03-01",
    "endDate": "2025-03-05"
  }' | jq

docker compose logs notification-service --tail 20
```
## 


## Stop

```bash
docker compose down
```
### Daftar Service
 
| Service              | Port Internal | NodePort | Deskripsi                                     |
|----------------------|---------------|----------|-----------------------------------------------|
| `frontend`           | 5173          | 30007    | UI Vue 3 + Vuetify, live notification via WS  |
| `catalog-service`    | 3001          | 30392    | CRUD data lensa kamera                        |
| `order-service`      | 3002          | 31989    | Pembuatan dan manajemen order                 |
| `notification-service` | 3003        | 31029    | Konsumer RabbitMQ + WebSocket ke frontend     |
| `catalog-db`         | 5432          | —        | PostgreSQL untuk catalog                      |
| `order-db`           | 5432          | —        | PostgreSQL untuk order                        |
| `notification-db`    | 5432          | —        | PostgreSQL untuk notifikasi                   |
| `rabbitmq`           | 5672, 15672   | —        | Message broker antar layanan                  |
---

### Akses Layanan 
| Layanan              | URL                              |
|----------------------|----------------------------------|
| Frontend             | http://localhost:5173            |
| Catalog API          | http://localhost:3001/swagger    |
| Order API            | http://localhost:3002/swagger    |
| RabbitMQ Management  | http://localhost:15672           |
| Notification API     | http://localhost:3003/swagger    |

---
## Environment Variables
 
| Layanan              | Variabel              | Nilai (Kubernetes)                                          |
|----------------------|-----------------------|-------------------------------------------------------------|
| `catalog-service`    | `DATABASE_URL`        | `postgres://catalog:catalog@catalog-db:5432/catalog`        |
| `order-service`      | `DATABASE_URL`        | `postgres://orders:orders@order-db:5432/orders`             |
| `order-service`      | `RABBITMQ_URL`        | `amqp://guest:guest@rabbitmq:5672`                          |
| `order-service`      | `CATALOG_SERVICE_URL` | `http://catalog-service:3001`                               |
| `notification-service` | `DATABASE_URL`      | `postgres://notifications:notifications@notification-db:5432/notifications` |
| `notification-service` | `RABBITMQ_URL`      | `amqp://guest:guest@rabbitmq:5672`                          |
| `frontend`           | `VITE_WS_URL`         | `ws://192.168.59.101:31029`                                 |
---
## Dokumentasi
# Frontend
<img width="1911" height="910" alt="image" src="https://github.com/user-attachments/assets/0f96de49-382f-4ca2-880e-e6804f105858" />

# Swagger Docs
<img width="1504" height="873" alt="image" src="https://github.com/user-attachments/assets/3b04e268-c449-46e5-ac33-ea14f10ed6c0" />
<img width="1480" height="652" alt="image" src="https://github.com/user-attachments/assets/18e17979-26a3-41ca-8d46-06b1052191a9" />
<img width="1881" height="772" alt="image" src="https://github.com/user-attachments/assets/eeec5322-e8bf-48b9-bac9-7f6bbff4c8af" />
<img width="1919" height="972" alt="image" src="https://github.com/user-attachments/assets/700e7832-521d-449c-b68b-145eda690819" />
<img width="1919" height="973" alt="image" src="https://github.com/user-attachments/assets/c23a076f-3b9c-4a81-b3c4-cc6234b675b0" />
<img width="1571" height="494" alt="image" src="https://github.com/user-attachments/assets/ff32a3bf-0043-48c8-8996-8b039aac5dbf" />
<img width="1554" height="604" alt="image" src="https://github.com/user-attachments/assets/f5252137-79a2-4485-8c11-e4ab57e92169" />
<img width="1891" height="949" alt="image" src="https://github.com/user-attachments/assets/926f12b4-8fca-495a-aeb2-b7b3e1eb850f" />
<img width="1889" height="963" alt="image" src="https://github.com/user-attachments/assets/01cacf81-7f9a-4555-9d54-7b5214e087c9" />

## Jawaban Tutor
[Tutorial_OnPremise_2306206282_FathurrahmanKesumaRidwan.pdf](Tutorial_OnPremise_2306206282_FathurrahmanKesumaRidwan.pdf)












