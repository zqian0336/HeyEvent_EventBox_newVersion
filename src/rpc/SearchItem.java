package rpc;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import db.DBConnection;
import db.DBConnectionFactory;
import entity.Item;
import external.TicketMasterAPI;

/*
 * Servlet implementation class SearchItem
 */
@WebServlet("/search") //摄取的url
public class SearchItem extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /*
     * @see HttpServlet#HttpServlet()
     */
    public SearchItem() {
        super();
        // TODO Auto-generated constructor stub
    }

    /*
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
//		response.setContentType("application/json");
//		PrintWriter out = response.getWriter();

//		String username = "";
//		JSONArray array = new JSONArray();
//		if (request.getParameter("username") != null) {
//			username = request.getParameter("username");
//
//		}
//		JSONArray array = new JSONArray(); 


        String userId = request.getParameter("user_id");
        double lat = Double.parseDouble(request.getParameter("lat")); //get data from server
        double lon = Double.parseDouble(request.getParameter("lon"));
        String keyword = request.getParameter("term");

        DBConnection conn = DBConnectionFactory.getConnection();
        List<Item> items = conn.searchItems(lat, lon, keyword);

        Set<String> favorite = conn.getFavoriteItemIds(userId);
        conn.close();

        List<JSONObject> list = new ArrayList<>();
//		TicketMasterAPI tmAPI = new TicketMasterAPI();
//		List<Item> items = tmAPI.search(lat, lon, keyword);
        try {
            for (Item item : items) {
                JSONObject obj = item.toJSONObject();
                obj.put("favorite", favorite.contains(item.getItemId()));
                list.add(obj);
            }
//			obj.put("username", username);
//			array.put(new JSONObject().put("username","abcd"));
//			array.put(new JSONObject().put("username","1234"));
        } catch (Exception e) {
            e.printStackTrace();
        }
//		out.print(obj);
//		out.print(array);
//		out.close();
        JSONArray array = new JSONArray(list);
        RpcHelper.writeJsonArray(response, array);

    }

    /*
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        doGet(request, response);
    }

}
