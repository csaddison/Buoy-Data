#
# 11/24/19
#
# Buoy Data Scrapper
#
###########################################################


# Imports
import requests
from bs4 import BeautifulSoup


# Initializing variables
html_west_cal = 'https://www.ndbc.noaa.gov/data/realtime2/46059.txt'
html_santa_barbara = 'https://www.ndbc.noaa.gov/data/realtime2/46054.txt'
html_san_fran = 'https://www.ndbc.noaa.gov/data/realtime2/46026.txt'


# Scraping
response = requests.get(html_santa_barbara)
if response.status_code == 200:
    print('Success!')
else:
    print('Failed request.')


# Parsing
scrape = BeautifulSoup(response.content, 'html.parser')
print(scrape.prettify())
