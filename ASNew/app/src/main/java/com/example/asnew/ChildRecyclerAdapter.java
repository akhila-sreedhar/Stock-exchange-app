package com.example.asnew;

import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.Collections;
import java.util.List;

public class ChildRecyclerAdapter extends RecyclerView.Adapter<ChildRecyclerAdapter.ViewHolder> implements ItemMoveCallback.ItemTouchHelperContract {
    List<Favorite_Item> items;

    public ChildRecyclerAdapter(List<Favorite_Item> items) {
        this.items=items;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater=LayoutInflater.from(parent.getContext());
        View view=layoutInflater.inflate(R.layout.item_row,parent,false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
 //           Log.e("DEBUG::: CHILDRECYCLERVIEW for",items.get(position).getTicker());
            holder.itemTicker.setText(items.get(position).getTicker());
            holder.itemPrice_change.setText(items.get(position).getChange());
            holder.itemName_shares.setText(items.get(position).getStock_name());
            holder.itemStock_price.setText(items.get(position).getStock_price());



            if(Float.parseFloat(items.get(position).getChange())>=0)
            {
                holder.itemTrend_btn.setImageResource(R.drawable.ic_twotone_trending_up_24);
            }
            else
            {
               if(Float.parseFloat(items.get(position).getChange())<0)
               {
                   holder.itemTrend_btn.setImageResource(R.drawable.ic_baseline_trending_down_24);
               }
               else
               {
                  // holder.itemTrend_btn.setBackgroundColor(00);
               }
            }

    }

    @Override
    public int getItemCount() {
        return items.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder{

        TextView itemTicker;
        TextView itemStock_price;
        TextView itemName_shares;
        TextView itemPrice_change;
        ImageView itemTrend_btn;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            itemTicker=itemView.findViewById(R.id.ticker);
            itemStock_price=itemView.findViewById(R.id.stock_price);
            itemName_shares=itemView.findViewById(R.id.name_shares);
            itemPrice_change=itemView.findViewById(R.id.price_change);
            itemTrend_btn=itemView.findViewById(R.id.trend_btn);
        }
    }
    @Override
    public void onRowMoved(int fromPosition, int toPosition) {
        if (fromPosition < toPosition) {
            for (int i = fromPosition; i < toPosition; i++) {
                Collections.swap(items, i, i + 1);
            }
        } else {
            for (int i = fromPosition; i > toPosition; i--) {
                Collections.swap(items, i, i - 1);
            }
        }
        notifyItemMoved(fromPosition, toPosition);
    }

    @Override
    public void onRowSelected(ViewHolder myViewHolder) {
        myViewHolder.itemView.setBackgroundColor(Color.GRAY);

    }

    @Override
    public void onRowClear(ViewHolder myViewHolder) {
        myViewHolder.itemView.setBackgroundColor(Color.WHITE);

    }
}
