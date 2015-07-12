run_script=node scripts/

run:
	npm start

clean:
	${run_script}clean_database.js

import-2014:
	${run_script}import_users_2014.js

import-1000-users:
	${run_script}import_users.js

genderize:
	${run_script}update_user_gender.js

test:
	npm test


