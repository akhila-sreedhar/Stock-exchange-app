package com.example.asnew;

import java.util.List;

public class Section {
    private String favName;
    private List<Favorite_Item> favItems;

    public Section(String favName, List<Favorite_Item> favItems) {
        this.favName = favName;
        this.favItems = favItems;
    }

    public String getFavName() {
        return favName;
    }

    public void setFavName(String favName) {
        this.favName = favName;
    }

    public List<Favorite_Item> getFavItems() {
        return favItems;
    }

    public void setFavItems(List<Favorite_Item> favItems) {
        this.favItems = favItems;
    }

    @Override
    public String toString() {
        return "Section{" +
                "favName='" + favName + '\'' +
                ", favItems=" + favItems +
                '}';
    }
}
