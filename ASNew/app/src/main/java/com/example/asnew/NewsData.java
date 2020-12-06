package com.example.asnew;

public class NewsData {
    String title;
    String source;
    String publishedDate;
    String imageSource;
    String url;

    NewsData(String title, String source, String publishedDate, String imageSource, String url){
        this.title=title;
        this.source=source;
        this.publishedDate=publishedDate;
        this.imageSource=imageSource;
        this.url=url;
    }
}
