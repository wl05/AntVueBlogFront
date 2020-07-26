#!/bin/bash
# https://www.stuartellis.name/articles/shell-scripting/#enabling-better-error-handling-with-set
set -Eeuo pipefail
 
# Based on mongo/docker-entrypoint.sh
# https://github.com/docker-library/mongo/blob/master/docker-entrypoint.sh#L303
if [ "$MONGO_INITDB_USERNAME" ] && [ "$MONGO_INITDB_PASSWORD" ]; then
  "${mongo[@]}" -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase "$rootAuthDatabase" "$MONGO_INITDB_DATABASE" <<-EOJS
      db.createUser({
          user: $(_js_escape "$MONGO_INITDB_USERNAME"),
          pwd: $(_js_escape "$MONGO_INITDB_PASSWORD"),
          roles: [ { role: 'readWrite', db: $(_js_escape "$MONGO_INITDB_DATABASE") } ]
        })
  EOJS
  # mongo+=(
  #   --username="$MONGO_INITDB_ROOT_USERNAME"
  #   --password="$MONGO_INITDB_ROOT_PASSWORD"
  #   --authenticationDatabase="$rootAuthDatabase"
  # )
fi