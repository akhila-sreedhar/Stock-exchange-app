package com.example.asnew;

public class Favorite_Item {
    private String ticker;
    private String stock_name;
    private String stock_price;
    private String change;
    private String shares;
    private int port;
    private int fav;
    public Favorite_Item(String ticker, String stock_name, String stock_price, String change, String shares,int port, int fav)
    {
        this.ticker=ticker;
        this.stock_name=stock_name;
        this.stock_price=stock_price;
        this.change=change;
        this.port=port;
        this.fav=fav;
        if(shares!=null)
        {
            this.shares=shares+" shares";
        }
        else
        {
            this.shares="";
        }
    }

    public String getTicker() {
        return ticker;
    }

    public String getStock_name() {
        return stock_name;
    }

    public String getStock_price() {
        return stock_price;
    }

    public String getChange() {
        return change;
    }

    public String getShares() {
        return shares;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public void setStock_name(String stock_name) {
        this.stock_name = stock_name;
    }

    public void setStock_price(String stock_price) {
        this.stock_price = stock_price;
    }

    public void setChange(String change) {
        this.change = change;
    }

    public void setShares(String shares) {
        this.shares = shares;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public int getFav() {
        return fav;
    }

    public void setFav(int fav) {
        this.fav = fav;
    }

    @Override
    public String toString() {
        return "Favorite_Item{" +
                "ticker='" + ticker + '\'' +
                ", stock_name='" + stock_name + '\'' +
                ", stock_price='" + stock_price + '\'' +
                ", change='" + change + '\'' +
                ", shares='" + shares + '\'' +
                ", port=" + port +
                ", fav=" + fav +
                '}';
    }
}
