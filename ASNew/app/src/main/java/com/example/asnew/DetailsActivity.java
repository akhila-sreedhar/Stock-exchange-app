package com.example.asnew;

import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.text.Editable;
import android.text.Html;
import android.text.TextWatcher;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.Response.Listener;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class DetailsActivity<shareVal> extends AppCompatActivity {
    String TAG = "CompanyDetailsActivity";
    String ticker;
    String last, low, bidPrice, openPrice, mid, high, volume, name;
    TextView tickerID, compNameID, currPriceID, changePriceID, sharedOwnedID, currPrice2ID, lowID, bidPriceID, openPriceID, highPriceID, midPriceID, volumeID, compDescriptionID;
    RequestQueue queue;
    JSONObject Details;
    JSONObject stats;
    Double change;
    JSONArray chartData;

    private Button button;

    public WebView webView;

    private Menu menu;


    //news
    List<NewsData> newsData=new ArrayList<>();


    boolean doubleBackToExitPressedOnce = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_details);
        getSupportActionBar().setTitle(Html.fromHtml("<font color=\"black\"><b>" + "Stocks" + "</b></font>"));

        Intent intent = getIntent();
        String str = intent.getStringExtra("value");
        String[] temp = str.split(" -");
        ticker = temp[0];


        queue = Volley.newRequestQueue(this);
        CompanyDetails();
        CompanyStats();
        News();
       Chart();


    }


//company details

    public void CompanyDetails() {
        RequestQueue queue = Volley.newRequestQueue(this);

        final ProgressBar progressBar = (ProgressBar) findViewById(R.id.progressBar);

        //making the progressbar visible
        progressBar.setVisibility(View.VISIBLE);

        String url = "http://hw9-env.eba-gtctimh9.us-east-1.elasticbeanstalk.com/search/" + ticker;
        JsonObjectRequest jsonObjReq = new JsonObjectRequest(Request.Method.GET, url, null,
                new Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {

                        //hiding the progressbar after completion
                        progressBar.setVisibility(View.INVISIBLE);

                        try {
                            Details = response;
                            Log.i(TAG, "1st json response" + Details);
                            tickerID = (TextView) findViewById(R.id.tickerID);
                            compNameID = (TextView) findViewById(R.id.compNameID);
                            compDescriptionID = (TextView) findViewById(R.id.compDescriptionID);

                            tickerID.setText(Details.getString("ticker"));
                            compNameID.setText(Details.getString("name"));
                            compDescriptionID.setText(Details.getString("description"));

                            name = Details.getString("name");

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.i(TAG, "error:" + error);
            }
        }
        );
        jsonObjReq.setRetryPolicy(new DefaultRetryPolicy(15000, DefaultRetryPolicy.DEFAULT_MAX_RETRIES, DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
        queue.add(jsonObjReq);
        Log.i("data:",jsonObjReq.toString());

        //company statistics

    public void CompanyStats() {

        RequestQueue queue = Volley.newRequestQueue(this);

        final ProgressBar progressBar = (ProgressBar) findViewById(R.id.progressBar);

        //making the progressbar visible
        progressBar.setVisibility(View.VISIBLE);

        String url = "http://hw9-env.eba-gtctimh9.us-east-1.elasticbeanstalk.com/find/" + ticker;

        JsonArrayRequest jsonArrayReq = new JsonArrayRequest(Request.Method.GET, url, null, new Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {


                //hiding the progressbar after completion
                progressBar.setVisibility(View.INVISIBLE);

                try {
                    JSONObject jsonObject = response.getJSONObject(0);
                    stats = jsonObject;
                    Log.i(TAG, "2nd json response" + stats);
                    currPriceID = (TextView) findViewById(R.id.currPriceID);
                    currPrice2ID = (TextView) findViewById(R.id.currPrice2ID);
                    changePriceID = (TextView) findViewById(R.id.changePriceID);
                    lowID = (TextView) findViewById(R.id.lowID);
                    bidPriceID = (TextView) findViewById(R.id.bidPriceID);
                    openPriceID = (TextView) findViewById(R.id.openPriceID);
                    midPriceID = (TextView) findViewById(R.id.midID);
                    highPriceID = (TextView) findViewById(R.id.highPriceID);
                    volumeID = (TextView) findViewById(R.id.volumeID);

                    last = stats.getString("last");
                    trading();
                    if (last == "null") {
                        last = "0.0";
                    }
                    low = stats.getString("low");
                    if (low == "null") {
                        low = "0.0";
                    }
                    bidPrice = stats.getString("bidPrice");
                    if (bidPrice == "null") {
                        bidPrice = "0.0";
                    }
                    openPrice = stats.getString("open");
                    if (openPrice == "null") {
                        openPrice = "0.0";
                    }
                    mid = stats.getString("mid");
                    if (mid == "null") {
                        mid = "0.0";
                    }
                    high = stats.getString("high");
                    if (high == "null") {
                        high = "0.0";
                    }
                    volume = stats.getString("volume");
                    if (volume == "null") {
                        volume = "0.0";
                    }

               //     Double change;
                    change = Double.parseDouble(stats.getString("last")) - Double.parseDouble(stats.getString("prevClose"));

                    change = (float) Math.round(change * 100.0) / 100.0;
                    Log.i(TAG, "change: " + change);
                    Log.i(TAG, "change: " + "$" + change.toString());

                    if (change > 0) {
                        changePriceID.setText("$" + change.toString());
                        changePriceID.setTextColor(Color.parseColor("#008000"));
                    } else if (change < 0) {
                        change = change * -1.0;
                        changePriceID.setText("$" + change.toString());
                        changePriceID.setTextColor(Color.parseColor("#FF0000"));
                    } else {
                        changePriceID.setText("$" + change.toString());
                        changePriceID.setTextColor(Color.parseColor("#808080"));
                    }

                    currPriceID.setText("$" + last);
                    currPrice2ID.setText("Current Price:\n  " + last);
                    lowID.setText("low: " + low);
                    bidPriceID.setText("bidPrice: " + bidPrice);
                    openPriceID.setText("OpenPrice: " + openPrice);
                    midPriceID.setText("Mid: " + mid);
                    highPriceID.setText("High: " + high);
                    volumeID.setText("Volume:\n" + volume);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.i(TAG, "error:" + error);
            }
        });
        jsonArrayReq.setRetryPolicy(new DefaultRetryPolicy(15000, DefaultRetryPolicy.DEFAULT_MAX_RETRIES, DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
        queue.add(jsonArrayReq);

    }

    public void Chart() {
                webView = (WebView) findViewById(R.id.webView);
                Log.i(TAG, "charts");
            WebSettings settings = webView.getSettings();
                webView.getSettings().setJavaScriptEnabled(true);
                webView.clearCache(true);
                settings.setDomStorageEnabled(true);
                settings.setAllowFileAccessFromFileURLs(true);
                settings.setAllowFileAccess(true);

                webView.setBackgroundColor(Color.WHITE);
                webView.loadUrl("file:///android_asset/chart.html");
                webView.setWebViewClient(new WebViewClient(){
                   @Override
                   public void onPageFinished(WebView view, String url) {
                        webView.loadUrl("javascript:func('"+ticker+"')");
                    }

                });

    }


    //TRADING

    public void trading() {
        Log.d("DEBUG:::::::","Inside Trading");
        Map<String,?> all=getApplicationContext().getSharedPreferences("MyPref", 0).getAll();
        SharedPreferences preferences = this.getSharedPreferences("trade", Context.MODE_PRIVATE);
        int sharedValue=0;
        if(all.get(ticker)!=null)
        {
            Log.d("DEBUG:::::::","Inside Trading not null ticker:"+ticker);
            ArrayList<String> data=getArrayList(ticker);
            sharedValue=Integer.parseInt(data.get(3));
        }

        double balance = preferences.getFloat("balance", 0.0f);
        if (sharedValue <= 0) {
            TextView sharesView = (TextView) findViewById(R.id.sharesOwned);
            sharesView.setText("You have 0 shares of " + ticker);
            TextView marketView = (TextView) findViewById(R.id.scores);
            marketView.setText("Start Trading!");

        } else {
            TextView sharesView = (TextView) findViewById(R.id.sharesOwned);
            sharesView.setText("Shares Owned: " + sharedValue);
            TextView marketView = (TextView) findViewById(R.id.scores);
            marketView.setText("Market Value: $" + Math.round((sharedValue * Double.parseDouble(last) * 100.0) / 100.0));

        }
    }
    public void tradingStarts(View view){
        SharedPreferences preferences = this.getSharedPreferences("trade", Context.MODE_PRIVATE);
        int shareVal = preferences.getInt(ticker, 0);
        Button buttonTrading = (Button) findViewById(R.id.button);
        final String name1 = this.name;
        Log.d(TAG,"here is the val"+ last);
        final Double lastVal = Double.parseDouble(last);

        buttonTrading.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.d("DEBUG:::::::","Inside onClick");
                Dialog dialog = new Dialog(DetailsActivity.this);
                dialog.setContentView(R.layout.shares);
                TextView view = (TextView) dialog.findViewById(R.id.available);
                double total = preferences.getFloat("balance", 0);
                view.setText("$" + total + " available to buy " + ticker);
                TextView text = (TextView) dialog.findViewById(R.id.title);
                text.setText("Trade " + name1 + " shares");
                EditText num = (EditText) dialog.findViewById(R.id.num);
                TextView calc = (TextView) dialog.findViewById(R.id.calculation);
                calc.setText("0 x $" + lastVal + "/share = $0.0");
                num.addTextChangedListener(new TextWatcher() {
                    @Override
                    public void beforeTextChanged(CharSequence s, int start, int count, int after) {

                    }

                    @Override
                    public void onTextChanged(CharSequence s, int start, int before, int count) {
                        TextView calc = (TextView) dialog.findViewById(R.id.calculation);
                        String s1 = s.toString();
                        if (!s1.isEmpty()) {
                            try {
                                int val = Integer.parseInt(s1);
                                calc.setText(val + " x $" + lastVal + "/share = $" + Math.round(val * lastVal * 100.0) / 100.0);
                            } catch (Exception e) {
                                Toast.makeText(getApplicationContext(), "Please enter valid amount", Toast.LENGTH_LONG).show();
                            }
                        }
                    }

                    @Override
                    public void afterTextChanged(Editable s) {

                    }
                });

                Button buyButton = (Button) dialog.findViewById(R.id.buyButton);
                Button sellButton = (Button) dialog.findViewById(R.id.sellButton);

                buyButton.setOnClickListener(new View.OnClickListener() {

                    @Override
                    public void onClick(View v) {
                        float balance = preferences.getFloat("balance", 0);
                        EditText calc = (EditText) dialog.findViewById(R.id.num);
                        String n = calc.getText().toString();

                        int val = 0;
                        try {
                            Log.d(TAG, "try before-----"+n);
                            val = Integer.parseInt(n);
                            Log.d("DEBUG::::try",""+val);
                            if (val <= 0)
                            { Toast.makeText(getApplicationContext(), "Cannot buy less than 0 shares", Toast.LENGTH_LONG).show();}
                            //tries to sell more than they have
                            else if((val* lastVal) > balance) {
                                Toast.makeText(getApplicationContext(), "Not enough money to buy", Toast.LENGTH_LONG).show();
                            }
                            else {
                                long marketValue = Math.round((val * lastVal * 100.0) / 100.0);
                                onbuyButtonClick(marketValue, ticker, val, lastVal, dialog);
                            }
                        } catch (Exception e) {
                            Toast.makeText(getApplicationContext(), "Please enter valid amount", Toast.LENGTH_SHORT).show();
                        }
                    }
                });

                sellButton.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        int sharedValue = preferences.getInt(ticker, 0);
                        EditText calc = (EditText) dialog.findViewById(R.id.num);
                        String n = calc.getText().toString();

                        int val = 0;
                        try {
                            val = Integer.parseInt(n);

                            //less than 0 condition
                            if (val <= 0)
                                Toast.makeText(getApplicationContext(), "Cannot sell less than 0 shares", Toast.LENGTH_LONG).show();
                                //tries to sell more than they have
                            else if(val > sharedValue)
                                Toast.makeText(getApplicationContext(), "Not enough shares to sell", Toast.LENGTH_LONG).show();
                            else {
                                long marketValue = Math.round((val * Double.parseDouble(last) * 100.0) / 100.0);
                                onsellButtonClick(marketValue, ticker, val, lastVal, dialog);
                            }

                        } catch (Exception e) {
                            Toast.makeText(getApplicationContext(), "Please enter valid amount", Toast.LENGTH_LONG).show();
                        }
                    }

                });
                dialog.show();
            }
        });

    }

    public void onbuyButtonClick(long marketValue, String ticker, int val, Double lastVal, Dialog dialog) {
        Log.d("DEBUG:::::buybutton","1");
        ArrayList<String> data=getArrayList(ticker);
        SharedPreferences preferences = this.getSharedPreferences("trade", Context.MODE_PRIVATE);
        int sharedValue;
        if(data==null)
        {
            sharedValue=0;
        }
        else {
            sharedValue = Integer.parseInt(data.get(3));
        }
        sharedValue = sharedValue + val;
        SharedPreferences.Editor editor = preferences.edit();
        editor.putInt(ticker, sharedValue);
        float balance = preferences.getFloat("balance", 0);
        balance = balance - (float) (val * lastVal);
        editor.putFloat("balance", balance);
        if(data==null)
        {
            ArrayList<String> newdata=new ArrayList<>();
            newdata.add(name);
            newdata.add(last);
            newdata.add(change.toString());
            newdata.add(Integer.toString(sharedValue));
            newdata.add("1");
            newdata.add("0");
            saveArrayList(newdata,ticker);
        }
        else {

            data.set(0, name);
            data.set(1, last);
            data.set(2, change.toString());
            data.set(3, Integer.toString(sharedValue));
            data.set(4, "1");
            data.set(5, "1");
            saveArrayList(data,ticker);
        }

        editor.commit();

        TextView sharesView = (TextView) findViewById(R.id.sharesOwned);
        sharesView.setText("Shares Owned: " + sharedValue);
        TextView marketView = (TextView) findViewById(R.id.scores);
        marketView.setText("Market Value: $" + Math.round((sharedValue  * Double.parseDouble(last) * 100.0) / 100.0));

        Dialog dig = new Dialog(DetailsActivity.this,R.style.MyDialogTheme);
        dig.setContentView(R.layout.buy_share);
        TextView text = (TextView) dig.findViewById(R.id.cong1);
        text.setText("Congratulations!");
        TextView text1 = (TextView) dig.findViewById(R.id.buyVar1);
        text1.setText("Your have successfully bought " + val + " shares of " + ticker);
        Button button1 = (Button) dig.findViewById(R.id.button1);

        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dig.dismiss();
                dialog.dismiss();
            }
        });
        dig.show();
    }

    public void onsellButtonClick(long marketValue, String ticker, int val, Double lastVal, Dialog dialog) {
        SharedPreferences preferences = this.getSharedPreferences("trade", Context.MODE_PRIVATE);
        int sharedValue = preferences.getInt(ticker, 0);
        sharedValue = sharedValue - val;
        SharedPreferences.Editor editor = preferences.edit();
        editor.putInt(ticker, sharedValue);
        float balance = preferences.getFloat("balance", 0);
        balance = balance + (float) (val * lastVal);
        editor.putFloat("balance", balance);
        editor.commit();
        /*********************/
        ArrayList<String> data=getArrayList(ticker);
        if(data==null)
        {
            ArrayList<String> newdata=new ArrayList<>();
            newdata.add(name);
            newdata.add(last);
            newdata.add(change.toString());
            newdata.add(Integer.toString(sharedValue));
            newdata.add("1");
            newdata.add("0");
            saveArrayList(newdata,ticker);
        }
        else {

            data.set(1, last);
            data.set(2, change.toString());
            data.set(3, Integer.toString(sharedValue));
            data.set(4, "1");
            saveArrayList(data,ticker);

            if(sharedValue==0)
            {
                SharedPreferences p= getApplicationContext().getSharedPreferences("MyPref", 0);
                p.edit().remove(ticker).apply();
            }
        }

        /****************************/
        TextView sharesView = (TextView) findViewById(R.id.sharesOwned);
        sharesView.setText("Shares Owned: " + sharedValue);
        TextView marketView = (TextView) findViewById(R.id.scores);
        marketView.setText("Market Value: $" + Math.round((sharedValue * Double.parseDouble(last) * 100.0) / 100.0));

        Dialog dig = new Dialog(DetailsActivity.this, R.style.MyDialogTheme);
        dig.setContentView(R.layout.sell_share);
        TextView text1 = (TextView) dig.findViewById(R.id.cong2);
        text1.setText("Congratulations! ");
        TextView text = (TextView) dig.findViewById(R.id.sellVar1);
        text.setText("Your have successfully sold " + val + " shares of " + ticker);



        Button button2 = (Button)dig.findViewById(R.id.button2);

        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dig.dismiss();
                dialog.dismiss();
            }
        });
        dig.show();
    }
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
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.detailsmenu, menu);
        Log.i("inflater","1");
        this.menu = menu;
        if(getArrayList(ticker)==null)
        {
            menu.getItem(0).setIcon(ContextCompat.getDrawable(this, R.drawable.ic_baseline_star_border_24));

        }
        else
        {
            if(getArrayList(ticker).get(5).equals("1"))
                menu.getItem(0).setIcon(ContextCompat.getDrawable(this, R.drawable.ic_baseline_star_24));

        }
        return true;
    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        Log.i("menu","created");
        switch (item.getItemId()) {
            case R.id.backArrow:
                Log.i("home","switchcase");
                onBackPressed();
                return true;

            case R.id.star:
                Map<String,?> all=getApplicationContext().getSharedPreferences("MyPref", 0).getAll();
                if(all.get(ticker)==null)
                {
                    ArrayList<String> newdata=new ArrayList<>();
                    newdata.add(name);
                    newdata.add(last);
                    newdata.add(change.toString());
                    newdata.add("0");
                    newdata.add("0");
                    newdata.add("1");
                    saveArrayList(newdata,ticker);
                    menu.getItem(0).setIcon(ContextCompat.getDrawable(this, R.drawable.ic_baseline_star_24));
                    Toast.makeText(getApplicationContext(), "\""+ticker+"\" was added to favorites", Toast.LENGTH_LONG).show();

                }
                else
                {
                    ArrayList<String> arr=getArrayList(ticker);
                    if( !arr.get(5).equals("1")){
                        menu.getItem(0).setIcon(ContextCompat.getDrawable(this, R.drawable.ic_baseline_star_24));
                        arr.set(5,"1");
                        saveArrayList(arr,ticker);
                        Toast.makeText(getApplicationContext(), "\""+ticker+"\" was added to favorites", Toast.LENGTH_LONG).show();
                    }else{
                        menu.getItem(0).setIcon(ContextCompat.getDrawable(this, R.drawable.ic_baseline_star_border_24));
                        arr.set(5,"0");
                        saveArrayList(arr,ticker);
                        Toast.makeText(getApplicationContext(), "\""+ticker+"\" was removed from favorites", Toast.LENGTH_LONG).show();
                    }

                }

        }

        return super.onOptionsItemSelected(item);
    }
//----------LETS SEE-------------------

    public void News(){
        Log.d("entered news","please");
        RequestQueue queue = Volley.newRequestQueue(this);

        final ProgressBar progressBar = (ProgressBar) findViewById(R.id.progressBar);

        //making the progressbar visible
        progressBar.setVisibility(View.VISIBLE);

        String url = "http://hw9-env.eba-gtctimh9.us-east-1.elasticbeanstalk.com/news/" + ticker;
        JsonObjectRequest jsonObjReq = new JsonObjectRequest(Request.Method.GET, url, null,
                new Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {


                        //hiding the progressbar after completion
                            progressBar.setVisibility(View.INVISIBLE);

                            try {


                                JSONObject obj = response;
                                JSONArray array = obj.getJSONArray("articles");
                                Log.e(TAG, "2nd json response" + array);
                                int len = array.length() < 20 ? array.length() : 20;
                                for (int i = 0; i < len; i++) {

                                    JSONObject row = array.getJSONObject(i);
                                    String t = row.getString("title");
                                    String s = row.getJSONObject("source").getString("name");
                                    String img = row.getString("urlToImage");
                                    String ti = row.getString("publishedAt");
                                    String url = row.getString("url");
                                    newsData.add(new NewsData(t, s, ti, img, url));


                                }
                                RecyclerView news = (RecyclerView) findViewById(R.id.news_list);
                                Log.d("TAG","recyclerview");
                                NewsRecyclerAdapter newsRecyclerAdapter=new NewsRecyclerAdapter(newsData);
                                news.setAdapter(newsRecyclerAdapter);
                            } catch (Exception e) {
                                e.printStackTrace();
                            }

                        }
//            } new Response.ErrorListener() {
                    },new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Log.i(TAG, "error:" + error);
                        }
                    });
        jsonObjReq.setRetryPolicy(new DefaultRetryPolicy(15000, DefaultRetryPolicy.DEFAULT_MAX_RETRIES, DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
        queue.add(jsonObjReq);
    }

}

