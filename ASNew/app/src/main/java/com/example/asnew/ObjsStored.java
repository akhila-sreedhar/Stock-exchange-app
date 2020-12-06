package com.example.asnew;

public class ObjsStored {
    String ticker,name,description;

    public ObjsStored(String ticker, String currPrice, String name) {
        this.ticker = ticker;

        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public String getTicker() {
        return ticker;
    }

    public String getDescription() { return description; }
}
