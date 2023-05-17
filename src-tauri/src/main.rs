// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs};
use std::fs::File;
use std::io::{BufReader};
use rodio::{Decoder, OutputStream, Sink};
use std::sync::Mutex;
use tauri::State;

struct Moostate{
    sink: Mutex<Sink>
}

#[tauri::command]
fn get_files(dir: String) -> Vec<String> {
    let paths = fs::read_dir(dir).unwrap();

    let mut arr: Vec<String> = Vec::new();
    for path in paths {
        arr.push(path.unwrap().path().display().to_string());
    }
    
    return arr;
}

#[tauri::command(async)]
fn start_music(dir: String, moos: State<Moostate>){
    let sink = moos.sink.lock().unwrap();

    // Find audio file
    let file = BufReader::new(File::open(dir).unwrap());
    let source = Decoder::new(file).unwrap();

    // Play song
    sink.clear();
    sink.append(source);
    sink.play();
}

#[tauri::command(async)]
fn play_music(moos: State<Moostate>){
    let sink = moos.sink.lock().unwrap();
    sink.play();
}

#[tauri::command(async)]
fn pause_music(moos: State<Moostate>){
    let sink = moos.sink.lock().unwrap();
    sink.pause();
}

fn main() {
    let (_stream, stream_handle) = OutputStream::try_default().unwrap();
    let sink = Sink::try_new(&stream_handle).unwrap();

    tauri::Builder::default()
        .manage(Moostate{sink: sink.into()})
        .invoke_handler(tauri::generate_handler![get_files, start_music, play_music, pause_music])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
