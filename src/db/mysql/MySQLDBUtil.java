package db.mysql;

public class MySQLDBUtil {
    private static final String HOSTNAME = "eventbox-mysql.cu2gba3klpnn.us-west-1.rds.amazonaws.com"; //localhost
    private static final String PORT_NUM = "3306"; // change it to your mysql port number[8889]
    public static final String DB_NAME = "eventbox-db"; //eventboxdb
    private static final String USERNAME = "root";
    private static final String PASSWORD = "root";
    public static final String URL = "jdbc:mysql://"
            + HOSTNAME + ":" + PORT_NUM + "/" + DB_NAME
            + "?user=" + USERNAME + "&password=" + PASSWORD
            + "&autoReconnect=true&serverTimezone=UTC";
    // jdbc:mysql://localhost: 8888/spencer?user=root&password-root&
}
