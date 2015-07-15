# ------ App
run:
	npm start

# ------ Tests
run-coverage:
	istanbul cover ./node_modules/mocha/bin/_mocha -- -R spec && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

test:
	npm test

# ------ Scripts
run_script=node scripts/

clean:
	${run_script}clean_database.js

import-2014:
	${run_script}import_users_2014.js

import-1000-users:
	${run_script}import_users.js

genderize:
	${run_script}update_user_gender.js

# ------ Heroku
hlog:
	heroku logs --app women-contributing


