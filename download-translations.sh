#!/bin/sh

ENV=test
MERCHANT=norce-checkout-demo
DEFAULT_CULTURE=en-GB

curl -X "GET" \
	"https://checkout-translation.$ENV.jetshopcloud.io/api/v1/translations/$DEFAULT_CULTURE" \
	-H 'accept: application/json' \
	-H "x-merchant: $MERCHANT" >src/translations.json
