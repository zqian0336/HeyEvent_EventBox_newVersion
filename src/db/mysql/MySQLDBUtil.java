package db.mysql;

public class MySQLDBUtil {
    private static final String HOSTNAME = "localhost"; //localhost
    private static final String PORT_NUM = "3306"; // change it to your mysql port number[8889]
    public static final String DB_NAME = "eventboxdb";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "Qian2012";
    public static final String URL = "jdbc:mysql://"
            + HOSTNAME + ":" + PORT_NUM + "/" + DB_NAME
            + "?user=" + USERNAME + "&password=" + PASSWORD
            + "&autoReconnect=true&serverTimezone=UTC";
    // jdbc:mysql://localhost: 8888/spencer?user=root&password-root&
}
