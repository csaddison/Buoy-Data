#
# 3/27/20
#
# Buoy Scraper v2
#
###########################################################


# Imports
import requests
from bs4 import BeautifulSoup


# Opening URL
buoys = []
buoy_file = open('buoys.txt', encoding='utf-8-sig')
for line in buoy_file:
    buoys.append(
        int('46' + line.strip('\n'))
    )

buoys = [ 46218 ]
# buoys = [ 46059 ] 

# Collecting for each buoy
for station in buoys:

    # Scraping from URL
    link = f'https://www.ndbc.noaa.gov/station_page.php?station={station}'
    response = requests.get(link)
    if response.status_code != 200:
        print('Failed request.')
    pageHTML = BeautifulSoup(response.content, 'html.parser')

    # Separates Scripps buoys from NDBC buoys
    isScripps = pageHTML.findAll(string='Scripps Institution of Oceanography')
    if isScripps:
        isScripps = True

    # Finds latitude and longitude of buoy
    location = pageHTML.findAll('b')[2].text
    location = location.split()
    latitude = float(location[0])
    longitude = float(location[2])
    position = (latitude, longitude)
    print(position)
    