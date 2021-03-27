#!/bin/bash

export MIX_ENV=prod
# Common port range for this is 4000-10,000
# Valid port range for a user app to listen
# on is something like 1025-32767
export PORT=4804
export SECRET_KEY_BASE=insecure

CFGD=$(readlink -f ~/.config/events)

if [ ! -d "$CFGD" ]; then
    mkdir -p "$CFGD"
fi

DATABASE_URL=$(cat "$CFGD/postgres")
export DATABASE_URL

mix deps.get
mix compile


if [ ! -e "$CFGD/base" ]; then
    mix phx.gen.secret > "$CFGD/base"
fi

SECRET_KEY_BASE=$(cat "$CFGD/base")
export SECRET_KEY_BASE

mix phx.digest

mix release
mix ecto.create
mix ecto.reset
