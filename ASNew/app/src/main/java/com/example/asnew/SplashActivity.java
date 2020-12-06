package com.example.asnew;

import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

       startActivity(new Intent(this, MainActivity.class));
//        final ProgressBar progressBar = (ProgressBar) findViewById(R.id.progressBar);
//
//        //making the progressbar visible
//        progressBar.setVisibility(View.VISIBLE);

    }
}