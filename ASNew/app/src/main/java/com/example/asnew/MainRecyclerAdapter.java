package com.example.asnew;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.ItemTouchHelper;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class MainRecyclerAdapter extends RecyclerView.Adapter<MainRecyclerAdapter.ViewHolder> {
    List<Section> sectionList;
    public MainRecyclerAdapter(List<Section> sectionList)
    {
        this.sectionList=sectionList;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater=LayoutInflater.from(parent.getContext());
        View view=layoutInflater.inflate(R.layout.section_row,parent,false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Section section=sectionList.get(position);
        String sectionName=section.getFavName();
        List<Favorite_Item> items=section.getFavItems();

        holder.sectionNameTextView.setText(sectionName);
        ChildRecyclerAdapter childRecyclerAdapter=new ChildRecyclerAdapter(items);
        ItemTouchHelper.Callback callback=new ItemMoveCallback(childRecyclerAdapter);
        ItemTouchHelper touchHelper=new ItemTouchHelper(callback);
        touchHelper.attachToRecyclerView(holder.childRecycleView);
        holder.childRecycleView.setAdapter(childRecyclerAdapter);

    }

    @Override
    public int getItemCount() {
        return sectionList.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder{
        TextView sectionNameTextView;
        RecyclerView childRecycleView;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            sectionNameTextView=itemView.findViewById(R.id.sectionNameTextView);
            childRecycleView=itemView.findViewById(R.id.childRecyclerView);
        }
    }
}
