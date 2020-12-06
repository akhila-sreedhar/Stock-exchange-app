package com.example.asnew;

import android.app.SearchManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.database.Cursor;
import android.database.MatrixCursor;
import android.os.Bundle;
import android.provider.BaseColumns;
import android.text.method.LinkMovementMethod;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.SearchView;
import android.widget.SimpleCursorAdapter;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.json.JSONArray;
import org.json.JSONException;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

//import android.app.SearchableActivity;

public class MainActivity extends AppCompatActivity {

    String msg = "Message: ";
    ArrayAdapter<String> arrayAdapter;
    private static final String[] sAutocompleteColNames = new String[]{
            BaseColumns._ID,
            SearchManager.SUGGEST_COLUMN_TEXT_1
    };

    /*---Section list------*/
    List<Section> sectionList=new ArrayList<>();
    RecyclerView mainRecyclerView;
    MainRecyclerAdapter mainRecyclerAdapter;

    //Called when activity is first created
   // @RequiresApi(api = Build.VERSION_CODES.N)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setTheme(R.style.Theme_AppCompat_Light_NoActionBar);
        //setTheme(R.style.Theme.ASNew);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        setupHyperlink();

        //trading
//        SharedPreferences preference =getSharedPreferences("MyPref",Context.MODE_PRIVATE);
//        SharedPreferences.Editor edit = preference.edit();
//        edit.clear();
//        edit.apply();


        SharedPreferences preferences = this.getSharedPreferences("trade", Context.MODE_PRIVATE);
        Editor editor = preferences.edit();
        if(!preferences.contains(("balance")))
        {
            editor.putFloat("balance",20000);
            editor.commit();
        }
        Log.d(msg, "The onCreate event");

        //portfolio and watchlist
        initData();
        mainRecyclerView=findViewById(R.id.mainRecyclerView);
        mainRecyclerAdapter=new MainRecyclerAdapter(sectionList);
        mainRecyclerView.setAdapter(mainRecyclerAdapter);
        mainRecyclerView.addItemDecoration(new DividerItemDecoration(this,DividerItemDecoration.VERTICAL));

        //date thing
        TextView dateView = (TextView) findViewById(R.id.text_view_date);
        SimpleDateFormat dateTimeInGMT = new SimpleDateFormat("MMMM dd, yyyy");
        dateTimeInGMT.setTimeZone(TimeZone.getTimeZone("America/Los_Angeles"));
        dateView.setText(dateTimeInGMT.format(new Date()));
    }
    //footer
    private void setupHyperlink() {
        TextView linkTextView = findViewById(R.id.footer);
        linkTextView.setMovementMethod(LinkMovementMethod.getInstance());

    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        //spinner
//        final ProgressBar progressBar = (ProgressBar) findViewById(R.id.progressBar);
//        progressBar.setVisibility(View.INVISIBLE);

        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.my_menu, menu);
        MenuItem menuItem = menu.findItem(R.id.search_icon);
        SearchView searchView = (SearchView) menuItem.getActionView();
        searchView.setIconified(false);

        searchView.setSuggestionsAdapter(new SimpleCursorAdapter(
                this, android.R.layout.simple_expandable_list_item_1, null,
                new String[]{SearchManager.SUGGEST_COLUMN_TEXT_1},
                new int[]{android.R.id.text1}));

        searchView.setOnSuggestionListener(new SearchView.OnSuggestionListener() {
            @Override
            public boolean onSuggestionSelect(int position) {

                Cursor cursor = (Cursor)searchView.getSuggestionsAdapter().getItem(position);
                    String term = cursor.getString(cursor.getColumnIndex(SearchManager.SUGGEST_COLUMN_TEXT_1));
                    searchView.setQuery(term,true);
                    cursor.close();
                return true;
            }

            @Override
            public boolean onSuggestionClick(int position) {
                return onSuggestionSelect(position);
            }
        });


        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {

            @Override
            public boolean onQueryTextSubmit(String query) {

                // if user presses enter, do default search, ex:
                if (query.length() >= 3) {

                    Intent intent = new Intent(MainActivity.this, DetailsActivity.class);
                    intent.setAction(Intent.ACTION_SEARCH);
                    intent.putExtra("value", query);
                    startActivity(intent);

                    searchView.getSuggestionsAdapter().changeCursor(null);
                    return true;
                }
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {


                if (newText.length() >= 3) {
                    MatrixCursor cursor = new MatrixCursor(sAutocompleteColNames);

                    RequestQueue queue = Volley.newRequestQueue(MainActivity.this);

                    String url = "http://hw9-env.eba-gtctimh9.us-east-1.elasticbeanstalk.com/autocomplete/"+newText;
                    Log.d(msg, "url" + url);
                    JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET,
                            url,
                            null,
                            new Response.Listener<JSONArray>() {
                            @Override
                            public void onResponse(JSONArray response) {


                                for (int index = 0; index < response.length(); index++) {
                                    String term = null;
                                    try {
                                        term = response.getJSONObject(index).getString("ticker") + " - " + response.getJSONObject(index).getString("name");
                                        Log.d("obj","res"+response.getJSONObject(index));
                                    } catch (JSONException e) {
                                        e.printStackTrace();
                                    }
                                    Object[] row = new Object[]{index, term};
                                    cursor.addRow(row);
                                }
                                searchView.getSuggestionsAdapter().changeCursor(cursor);
                            }
                        },
                            new Response.ErrorListener() {
                            @Override
                            public void onErrorResponse(VolleyError error) {
                            Log.d("error","error"+error);
                            }
                        });
                        queue.add(jsonArrayRequest);
                    } else {
                        searchView.getSuggestionsAdapter().changeCursor(null);
                    }
                    return true;
                }
        });
        return super.onCreateOptionsMenu(menu);
    }


    //-----------TRYYYY---------------------

    //portfolio part
    @Override
    protected void onRestart() {
// TODO Auto-generated method stub
        super.onRestart();
        clearData();
        initData();

        //Do your code here
    }
    public void clearData() {
        sectionList.clear(); // clear list
        mainRecyclerAdapter.notifyDataSetChanged(); // let your adapter know about the changes and reload view.
    }
    private void initData(){

        String sectionOneName="PORTFOLIO";
        List<Favorite_Item> sectionOneItems=new ArrayList<>();

        String sectionTwoName="FAVORITES";
        List<Favorite_Item> sectionTwoItems=new ArrayList<>();

        ArrayList<String> cache_data=new ArrayList<String>();
//        if(getApplicationContext().getSharedPreferences("MyPref", 0).getAll().get("MSFT")==null) {
//            cache_data.add("Microsoft Inc");//name:0
//            cache_data.add("234.5");//price:1
//            cache_data.add("23");//change:2
//            cache_data.add("0");//shares:3
//            cache_data.add("0");//bool for portfolio:4
//            cache_data.add("1");//bool for fav:5
//            saveArrayList(cache_data, "MSFT");
//        }
//
//        if(getApplicationContext().getSharedPreferences("MyPref", 0).getAll().get("NVDA")==null) {
//            cache_data.clear();
//            cache_data.add("NVIDIA Inc");//name:0
//            cache_data.add("434.5");//price:1
//            cache_data.add("3");//change:2
//            cache_data.add("0");//shares:3
//            cache_data.add("0");//bool for portfolio:4
//            cache_data.add("1");//bool for fav:5
//            saveArrayList(cache_data, "NVDA");
//        }
//        if(getApplicationContext().getSharedPreferences("MyPref", 0).getAll().get("NVDA")==null) {
//            cache_data.clear();
//            cache_data.add("Apple Inc");//name:0
//            cache_data.add("1434.5");//price:1
//            cache_data.add("34");//change:2
//            cache_data.add("1");//shares:3
//            cache_data.add("1");//bool for portfolio:4
//            cache_data.add("0");//bool for fav:5
//            saveArrayList(cache_data, "AAPL");
//        }
//        if(getApplicationContext().getSharedPreferences("MyPref", 0).getAll().get("TSLA")==null) {
//            cache_data.clear();
//            cache_data.add("TeSLA Inc");//name:0
//            cache_data.add("2434.5");//price:1
//            cache_data.add("5");//change:2
//            cache_data.add("1");//shares:3
//            cache_data.add("1");//bool for portfolio:4
//            cache_data.add("0");//bool for fav:5
//            saveArrayList(cache_data, "TSLA");
//        }

        Map<String,?> all=getApplicationContext().getSharedPreferences("MyPref", 0).getAll();
        for(Map.Entry<String, ?> entry:all.entrySet()) {
            ArrayList<String> cache_item = getArrayList(entry.getKey());
          //  Log.d("DEBUG::inside lop for cache for key", entry.getKey() + " " + cache_item.get(5));
            int fav_bool = 0;
            int port_bool = 0;
            if (cache_item.get(5).equals("1")) {
                fav_bool = 1;
            }
            if (cache_item.get(4).equals("1")) {
                port_bool = 1;
            }
            if (fav_bool == 1 && port_bool == 1) {
                String shr = cache_item.get(3) + " shares";
                sectionOneItems.add(new Favorite_Item(entry.getKey(), cache_item.get(0), cache_item.get(1), cache_item.get(2), shr, 1, 1));
                sectionTwoItems.add(new Favorite_Item(entry.getKey(), cache_item.get(0), cache_item.get(1), cache_item.get(2), shr, 1, 1));
            } else {
                if (fav_bool == 1) {
                    sectionTwoItems.add(new Favorite_Item(entry.getKey(), cache_item.get(0), cache_item.get(1), cache_item.get(2), cache_item.get(3), 0, 1));
                    Log.d("DEBUG:SECTION1 ITEM:", sectionOneItems.toString());
                } else {
                    if (port_bool == 1) {
                        sectionOneItems.add(new Favorite_Item(entry.getKey(), cache_item.get(0), cache_item.get(1), cache_item.get(2), cache_item.get(3), 1, 0));
                        Log.d("DEBUG:SECTION2 ITEM:", sectionTwoItems.toString());
                    }
                }
            }
        }
//            if(cache_item.get(5).equals("1")){
//                sectionOneItems.add(new Favorite_Item(entry.getKey(),cache_item.get(0),cache_item.get(1),cache_item.get(2),cache_item.get(3),1,1));
//                Log.d("DEBUG:SECTION1 ITEM:",sectionOneItems.toString());
//            }
//                if(cache_item.get(4).equals("1"))
//                {
//                    sectionTwoItems.add(new Favorite_Item(entry.getKey(),cache_item.get(0),cache_item.get(1),cache_item.get(2),cache_item.get(3),1,1));
//                    Log.d("DEBUG:SECTION2 ITEM:",sectionTwoItems.toString());
//                }
//
//        }
//        sectionOneItems.add(new Favorite_Item("googl","GOOGLE INC","1224","234","hello"));
//        sectionOneItems.add(new Favorite_Item("aapl","AAPL INC","4224","34","hello"));
//
//
//        sectionTwoItems.add(new Favorite_Item("msft","MICROSOFT INC","6224","934","helo"));
//        sectionTwoItems.add(new Favorite_Item("tsla","TESLA INC","8224","304","hello"));

        Log.d("DEBUG::: section1::",sectionOneItems.toString());
        Log.d("DEBUG:: section2:: ",sectionTwoItems.toString());
        sectionList.add(new Section(sectionOneName,sectionOneItems));
        sectionList.add(new Section(sectionTwoName,sectionTwoItems));
     //   Log.d("DEBUG:: inside initdata SECTIONS LENGTH", String.valueOf(sectionList.size()));


    }
    /*
     * ticker: name
     *         price
     *         change
     *         shares
     *          bool for portfolio
     *          bool for fav
     * */



    public void saveArrayList(ArrayList<String> list, String key){
        SharedPreferences prefs = getApplicationContext().getSharedPreferences("MyPref", 0);
        SharedPreferences.Editor editor = prefs.edit();
        Gson gson = new Gson();
        String json = gson.toJson(list);
        editor.putString(key, json);
        editor.apply();

    }

    public ArrayList<String> getArrayList(String key){
        SharedPreferences prefs = getApplicationContext().getSharedPreferences("MyPref", 0);
        Gson gson = new Gson();
        String json = prefs.getString(key, null);
        Type type = new TypeToken<ArrayList<String>>() {}.getType();
        return gson.fromJson(json, type);
    }


//------------TRYYYY---------------



}


