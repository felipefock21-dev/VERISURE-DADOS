import sys
import os
import pandas as pd
import io

# Add current directory to path
sys.path.append(os.getcwd())

from oauth_manager import get_authenticated_drive_service
from googleapiclient.http import MediaIoBaseDownload

def inspect_official_file():
    file_id_oficial = "1o5RJnLMpMHMtvyG7FscwFhz37sxcc0_T"
    print(f"--- INSPECTING OFFICIAL FILE: {file_id_oficial} ---")
    
    try:
        drive_service = get_authenticated_drive_service()
        if not drive_service:
            print("ERROR: Not authenticated. Please run local flask app and authorize first.")
            return

        print("Downloading file...")
        request = drive_service.files().get_media(fileId=file_id_oficial)
        fh = io.BytesIO()
        downloader = MediaIoBaseDownload(fh, request)
        done = False
        while not done:
            status, done = downloader.next_chunk()
        
        fh.seek(0)
        df = pd.read_excel(fh)
        
        print(f"File loaded. Shape: {df.shape}")
        print(f"Columns: {list(df.columns)}")
        
        if not df.empty:
            print("\nFirst row sample:")
            print(df.iloc[0].to_dict())
            
            if 'Semana' in df.columns:
                print(f"\nSample 'Semana' values:\n{df['Semana'].head().tolist()}")
        else:
            print("File is empty.")

    except Exception as e:
        print(f"ERROR: {str(e)}")

if __name__ == "__main__":
    inspect_official_file()
