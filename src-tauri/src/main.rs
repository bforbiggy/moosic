// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs, io};
use std::fs::File;
use std::io::BufReader;
use rodio::{Decoder, OutputStream, source::Source};

#[tauri::command]
fn get_files(dir: &str) -> Vec<String> {
    let paths = fs::read_dir(dir).unwrap();

    let mut arr: Vec<String> = Vec::new();
    for path in paths {
        arr.push(path.unwrap().path().display().to_string());
    }
    
    return arr;
}

#[tauri::command]
fn play_music(dir: &str) {
    // Get a output stream handle to the default physical sound device
    let (_stream, stream_handle) = OutputStream::try_default().unwrap();
    // Load a sound from a file, using a path relative to Cargo.toml
    let file = BufReader::new(File::open(dir).unwrap());
    // Decode that sound file into a source
    let source = Decoder::new(file).unwrap();
    // Play the sound directly on the device
    stream_handle.play_raw(source.convert_samples());

    // The sound plays in a separate audio thread,
    // so we need to keep the main thread alive while it's playing.
    std::thread::sleep(std::time::Duration::from_secs(4));
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_files, play_music])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
