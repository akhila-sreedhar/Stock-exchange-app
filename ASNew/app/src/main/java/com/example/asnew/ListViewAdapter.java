package com.example.asnew;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import java.util.List;

public class ListViewAdapter extends ArrayAdapter<ObjsStored>{
    //the hero list that will be displayed
    private List<ObjsStored> heroList;

    //the context object
    private Context mCtx;

    //here we are getting the herolist and context
    //so while creating the object of this adapter class we need to give herolist and context
    public ListViewAdapter(List<ObjsStored> heroList, Context mCtx) {
        super(mCtx, R.layout.list_items, heroList);
        this.heroList = heroList;
        this.mCtx = mCtx;
    }

    //this method will return the list item
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        //getting the layoutinflater
        LayoutInflater inflater = LayoutInflater.from(mCtx);

        //creating a view with our xml layout
        View listViewItem = inflater.inflate(R.layout.list_items, null, true);

        //getting text views
        TextView textViewticker = listViewItem.findViewById(R.id.ticker);
        TextView textViewname = listViewItem.findViewById(R.id.name);
        TextView textViewdesc = listViewItem.findViewById(R.id.desc);


        //Getting the hero for the specified position
        ObjsStored hero = heroList.get(position);

        //setting hero values to textviews
        textViewticker.setText(hero.getTicker());
        textViewname.setText(hero.getName());
        textViewdesc.setText(hero.getDescription());

        //returning the listitem
        return listViewItem;
    }

}

