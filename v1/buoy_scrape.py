#
# 11/24/19
#
# Buoy Data Scrapper
#
###########################################################


# Imports
import requests
import pandas as pd
import json


# Initializing variables
consolidate_rows = True
num_rows = 3
buoy_file = open("buoys.json", "r").read()
buoys = json.loads(buoy_file)


# Collecting for each buoy
for buoy in buoys:

    # Scraping
    buoy_ID = buoys.get(buoy)
    link = f'https://www.ndbc.noaa.gov/data/realtime2/{buoy_ID}.txt'
    response = requests.get(link)
    if response.status_code != 200:
        print(buoy)
        print('Failed request.')


    # Parsing
    text = response.content.splitlines()
    i = 0
    for line in text:
        text[i] = line.decode("utf-8").split()
        i += 1


    # Data framing
    df = pd.DataFrame(text)
    df = df[(df[5] != 'MM') & (df[8] != 'MM') & (df[9] != 'MM')] # drops rows
    df = df.drop(columns = range(13, 19)).drop(columns = [7, 10]).drop([0,1]) # drops columns
    df = df.reset_index(drop=True)
    df.columns = [
        'YR', 'MO', 'DD', 'HR', 'MN', 'WDIR',
        'WSPD', 'WVH', 'PER', 'DIR', 'PRES'
    ]


    # Unit conversions
    for entry in range(len(df)):
        df.at[entry,'WVH'] = float(df.at[entry,'WVH']) * 3.281


    # Consolidating rows
    if consolidate_rows:
        df = df[0 : num_rows]


    # Exporting to json file
    export = df.to_json()
    f = open(f'{buoy}.json', 'w')
    f.write(export)
    f.close()
