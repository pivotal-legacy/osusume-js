make test-refreshdb
make test-migrate
make test-loadsampledata
./gradlew build
OSUSUME_DATABASE_URL=jdbc:postgresql://localhost/osusume-test java -jar build/libs/osusume-java-spring-0.0.1-SNAPSHOT.jar &
JAVA_SERVER_PID=$!
npm start &
CLIENT_PID=$!
if [ ! -f selenium-server-standalone-2.53.0.jar ]; then
  curl -O http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.0.jar
fi
java -jar selenium-server-standalone-2.53.0.jar &
SELENIUM_PID=$!
sleep 5
cd e2e-test
npm install
npm test
TEST_EXIT_STATUS=$?

kill $JAVA_SERVER_PID
kill $CLIENT_PID
kill $SELENIUM_PID

exit $TEST_EXIT_STATUS
