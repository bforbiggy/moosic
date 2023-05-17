// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs};
use std::fs::File;
use std::io::{BufReader};
use rodio::{Decoder, OutputStream, Sink};



#[tauri::command]
fn get_files(dir: String) -> Vec<String> {
    let paths = fs::read_dir(dir).unwrap();

    let mut arr: Vec<String> = Vec::new();
    for path in paths {
        arr.push(path.unwrap().path().display().to_string());
    }
    
    return arr;
}

#[tauri::command]
async fn play_music(dir: String){
    // Create audio io
    let (_stream, stream_handle) = OutputStream::try_default().unwrap();
    let sink = Sink::try_new(&stream_handle).unwrap();

    // Find audio file
    let file = BufReader::new(File::open(dir).unwrap());
    let source = Decoder::new(file).unwrap();

    // Play until end
    sink.append(source);
    sink.sleep_until_end();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_files, play_music])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
