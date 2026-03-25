#!/bin/bash

# Smoke test for suilens with custom name and email

echo "Getting lenses..."
LENS_ID=$(curl -s http://localhost:3001/api/lenses | jq -r '.[0].id')

echo "Lens ID: $LENS_ID"

echo "Creating order..."
curl -X POST http://localhost:3002/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Fathurrahman Kesuma Ridwan",
    "customerEmail": "2306206282@gmail.com",
    "lensId": "'"$LENS_ID"'",
    "startDate": "2025-03-01",
    "endDate": "2025-03-05"
  }' | jq

echo "Checking notification service logs..."
docker compose logs notification-service --tail 20