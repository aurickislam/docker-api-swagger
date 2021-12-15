#!/bin/bash

curl_args=(
  -H 'Accept:application/json'
  -H 'Content-Type:application/json'
  --write-out "HTTPSTATUS:%{http_code}"
  --fail
  --silent
)

HTTP_RESPONSE=$(curl "${curl_args[@]}" "http://127.0.0.1:80/heartbeat")

HTTP_BODY=$(echo $HTTP_RESPONSE | sed -e 's/HTTPSTATUS\:.*//g')

HTTP_STATUS=$(echo $HTTP_RESPONSE | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')

if [ $HTTP_STATUS -eq 200 ]; then
  if jq -e . >/dev/null 2>&1 <<<"$HTTP_BODY"; then
    if echo "$HTTP_BODY" | jq --exit-status '.status == "OK"' >/dev/null; then
      exit 0
    else
      exit 1
    fi
  else
    exit 1
  fi
else
  exit 1
fi
