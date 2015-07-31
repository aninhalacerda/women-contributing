# ------ App
install:
	npm install
run:
	npm start

# ------ Tests
run-coverage:
	istanbul cover ./node_modules/mocha/bin/_mocha test/api.js test/users.js test/genderize_request.js  test/github_request.js -- -R spec && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

run-tests:
	npm test

# ------ Scripts
run_script=node scripts/

clean:
	${run_script}clean_database.js

import-users:
	${run_script}import_users.js

genderize:
	${run_script}update_user_gender.js

populate-db: import-users genderize 

# ------ Heroku
hlog:
	heroku logs --app women-contributing


