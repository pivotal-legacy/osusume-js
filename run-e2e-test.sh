cd ../osusume-java-spring


echo ==== Setting up DB & Starting Server ====

make test-refreshdb
make test-migrate
make test-loadsampledata
./gradlew build
OSUSUME_DATABASE_URL=jdbc:postgresql://localhost/osusume-test java -jar build/libs/osusume-java-spring-0.0.1-SNAPSHOT.jar &
JAVA_SERVER_PID=$!

curl http://localhost:8080
while [ $? -ne 0 ]; do
    echo Waiting for server
    SLEEP 1
    curl http://localhost:8080
done
echo Server ready!


echo ==== Starting Client ====

cd ../osusume-js
npm install
npm start &
CLIENT_PID=$!

curl http://localhost:8000
while [ $? -ne 0 ]; do
    echo Waiting for client
    SLEEP 1
    curl http://localhost:8000
done
echo Client ready!


echo ==== Starting Selenium ====

cd e2e-test
if [ ! -f selenium-server-standalone-2.53.0.jar ]; then
  curl -O http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.0.jar
fi
java -jar selenium-server-standalone-2.53.0.jar &
SELENIUM_PID=$!

curl http://127.0.0.1:4444/wd/hub
while [ $? -ne 0 ]; do
    echo Waiting for Selenium server
    SLEEP 1
    curl http://127.0.0.1:4444/wd/hub
done
echo Selenium Server ready!


echo ==== Running Tests ====

npm install
npm test
TEST_EXIT_STATUS=$?

kill $JAVA_SERVER_PID
kill $SELENIUM_PID
kill $CLIENT_PID

exit $TEST_EXIT_STATUS
