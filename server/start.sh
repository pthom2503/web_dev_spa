#!/bin/bash

export MIX_ENV=prod
export PORT=4803

CFGD=$(readlink -f ~/.config/events)

if [ ! -e "$CFGD/base" ]; then
    echo "run deploy first"
    exit 1
fi

DATABASE_URL=$(cat "$CFGD/postgres")
export DATABASE_URL

SECRET_KEY_BASE=$(cat "$CFGD/base")
export SECRET_KEY_BASE

_build/prod/rel/backend/bin/backend start
