#
# 3/27/20
#
# Buoy Class Constructor
#
###########################################################

class Buoy:

    def __init__(self, ID):
        self.ID = ID
    
    def setLocation(self, latitude, longitude):
        self.lat = latitude
        self.long = longitude

    def setName(self, name):
        self.name = name
    
    def getWaves(self, height, period, direction):
        self.height = height
        self.period = period
        self.dir = direction