import lib/db
import api_test


pub fn db_test() {
	let mock_db = api_test.create_mock_db()

	db.prepare(mock_db, "SELECT * FROM ?")
	|> db.bind(["users"])
	|> db.run
}
