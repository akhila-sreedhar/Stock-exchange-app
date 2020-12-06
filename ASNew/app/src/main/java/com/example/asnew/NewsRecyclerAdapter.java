package com.example.asnew;

import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.squareup.picasso.Picasso;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

//import com.bumptech.glide.Glide;

public class NewsRecyclerAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    List<NewsData> newsData;
    private Context context;
    TextView dialogTitle;
    ImageView dialogImage;
    ImageButton twitterShare;
    ImageButton chromeShare;

    public NewsRecyclerAdapter(List<NewsData> newsData) {
        this.newsData = newsData;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        context=parent.getContext();
        if(viewType==213){
            LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
            View view=layoutInflater.inflate(R.layout.news_top,parent,false);
            return new HeaderViewHolder(view);
        }
        else{
            LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
            View view=layoutInflater.inflate(R.layout.news_normal,parent,false);
            return new NormalViewHolder(view);
        }


    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        if(getItemViewType(position)==213){
            HeaderViewHolder holder1 = (HeaderViewHolder) holder;
            holder1.newsTitle.setText(newsData.get(position).title);
            holder1.newsSource.setText(newsData.get(position).source);
            holder1.daysAgo.setText(newsData.get(position).publishedDate);
            holder1.headerImageView.setBackgroundResource(R.color.black);
            Picasso.with(context).load(newsData.get(position).imageSource).into(holder1.headerImageView);
            try {
                String s = formatDate(newsData.get(position).publishedDate);
                holder1.daysAgo.setText(s);
            } catch (ParseException e) {
                e.printStackTrace();
            }

            holder1.itemView.setOnLongClickListener(new View.OnLongClickListener() {
                @Override
                public boolean onLongClick(View v) {


                    Dialog dialog=new Dialog(context);
                    dialog.setContentView(R.layout.newsdialog);

                    dialogTitle=dialog.findViewById(R.id.title_dialog);
                    dialogImage=dialog.findViewById(R.id.imageView_dialog);
                    twitterShare=dialog.findViewById(R.id.button_twitter);
                    chromeShare=dialog.findViewById(R.id.button_chrome);
                    dialogTitle.setText(newsData.get(position).title);
                    Picasso.with(context).load(newsData.get(position).imageSource).into(dialogImage);
                    chromeShare.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(newsData.get(position).url));
                            context.startActivity(browserIntent);
                        }
                    });
                    twitterShare.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            String twitterString = "https://twitter.com/intent/tweet?text=Check out this Link:%0D%0A"+newsData.get(position).url;
                            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(twitterString));
                            context.startActivity(browserIntent);
                        }
                    });

                    dialog.show();
                    return false;
                }
            });

        }
        else{
            NormalViewHolder holder1 = (NormalViewHolder) holder;
            holder1.newsTitle.setText(newsData.get(position).title);
            holder1.newsSource.setText(newsData.get(position).source);
            holder1.daysAgo.setText(newsData.get(position).publishedDate);
            holder1.headerImageView.setBackgroundResource(R.color.black);
            Picasso.with(context).load(newsData.get(position).imageSource).into(holder1.headerImageView);
            try {
                String s = formatDate(newsData.get(position).publishedDate);
                holder1.daysAgo.setText(s);
            } catch (ParseException e) {
                e.printStackTrace();
            }
            holder1.itemView.setOnLongClickListener(new View.OnLongClickListener() {
                @Override
                public boolean onLongClick(View v) {


                    Dialog dialog=new Dialog(context);
                    dialog.setContentView(R.layout.newsdialog);

                    dialogTitle=dialog.findViewById(R.id.title_dialog);
                    dialogImage=dialog.findViewById(R.id.imageView_dialog);
                    twitterShare=dialog.findViewById(R.id.button_twitter);
                    chromeShare=dialog.findViewById(R.id.button_chrome);
                    dialogTitle.setText(newsData.get(position).title);
                    Picasso.with(context).load(newsData.get(position).imageSource).into(dialogImage);
                    chromeShare.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(newsData.get(position).url));
                            context.startActivity(browserIntent);
                        }
                    });
                    twitterShare.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            String twitterString = "https://twitter.com/intent/tweet?text=Check out this Link:%0D%0A"+newsData.get(position).url;
                            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(twitterString));
                            context.startActivity(browserIntent);
                        }
                    });

                    dialog.show();
                    return false;
                }
            });
        }

    }

    @Override
    public int getItemViewType(int position) {
        if(position==0){
            return 213;
        }
        return super.getItemViewType(position);
    }

    @Override
    public int getItemCount() {
        return newsData.size();
    }

    class NormalViewHolder extends RecyclerView.ViewHolder{
        ImageView headerImageView;
        TextView daysAgo;
        TextView newsSource;
        TextView newsTitle;


        public NormalViewHolder(@NonNull View itemView) {
            super(itemView);
            headerImageView= itemView.findViewById(R.id.imageView_news_normal);
            daysAgo=itemView.findViewById(R.id.textView_news_daysago);
            newsSource=itemView.findViewById(R.id.textView_news_source);
            newsTitle=itemView.findViewById(R.id.textView_news_title);

//            itemView.setOnLongClickListener(new View.OnLongClickListener() {
//                @Override
//                public boolean onLongClick(View v) {
//                    dialogTitle=v.findViewById(R.id.textView_news_dialog_title);
//                    dialogImage=v.findViewById(R.id.imageView_news_dialog);
//                    twitterShare=v.findViewById(R.id.button_twitter);
//                    chromeShare=v.findViewById(R.id.button_chrome);
//
//                    Dialog dialog=new Dialog(context);
//                    dialog.setContentView(R.layout.newsdialog);
//                    dialog.show();
//                    return false;
//                }
//            });

        }
    }


    String formatDate(String ogString) throws ParseException {
        String[] x = ogString.split("T");
        String temp = x[0]+" "+x[1].split("Z")[0];

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.US);
        format.setTimeZone(TimeZone.getTimeZone("UTC"));

        Date date = format.parse(temp);
        long millis = date.getTime();//time news was published in MS
//        Log.d("News Adapater", "date in ms = "+(long)millis);

        Date curdate = new Date();
        long timeMilli = curdate.getTime();//current time in mS
//        Log.d("News Adapater", "cur date in ms = "+(long)timeMilli);

        String intervalType;
        millis = (long)((timeMilli-millis)/1000);
//        Log.d("News Adapater", "difference in s = "+millis);
        double interval = Math.floor(millis / 31536000);
        if (interval >= 1) {
            intervalType = "year";
        } else {
            interval =  Math.floor(millis / 2592000);
            if (interval >= 1) {
                intervalType = "month";
            } else {
                interval = Math.floor(millis / 86400);
                if (interval >= 1) {
                    intervalType = "day";
                } else {
                    interval = Math.floor(millis / 3600);
                    if (interval >= 1) {
                        intervalType = "hour";
                    } else {
                        interval = Math.floor(millis / 60);
                        if (interval >= 1) {
                            intervalType = "minute";
                        } else {
                            interval = millis;
                            intervalType = "second";
                        }
                    }
                }
            }
        }
        if (interval > 1 || interval == 0) {
            intervalType = intervalType+"s";
        }
        return (long)interval+" "+intervalType+" ago";
    }

    class HeaderViewHolder extends RecyclerView.ViewHolder{
        ImageView headerImageView;
        TextView daysAgo;
        TextView newsSource;
        TextView newsTitle;

        public HeaderViewHolder(@NonNull View itemView) {
            super(itemView);
            headerImageView= itemView.findViewById(R.id.imageView_header_image);
            daysAgo=itemView.findViewById(R.id.textView_news_header_daysago);
            newsSource=itemView.findViewById(R.id.textView_news_header_source);
            newsTitle=itemView.findViewById(R.id.textView_news_header_title);
        }
    }
}
