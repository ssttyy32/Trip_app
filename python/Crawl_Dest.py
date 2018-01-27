'''
Build Table of Destinations
'''

from bs4 import BeautifulSoup

import requests
import sys
import pymongo
import time



def crawl(city,code):
    url =  "https://www.tripadvisor.com/Attractions-%s-Activities"%(code,)
    # suffix = "-London_England.html#ATTRACTION_SORT_WRAPPER"
    print(url)
    totalRes=0
    # for city in cities:
    #     print '\n===== Attempting extraction for city <', city, '>=====\n'
    r  = requests.get(url)

    soup = BeautifulSoup(r.text,'html.parser')

    attr = soup.find('div', {'class' : 'attraction_element'})
    sub_url = attr.find('div',{'class' : 'listing_title'}).find('a').get('href')
    url_prefix = 'https://www.tripadvisor.com'
    url = url_prefix+sub_url
    r  = requests.get(url)
    soup = BeautifulSoup(r.text,'html.parser')
    content = soup.find('div',{'class' : 'overviewContent'})

    image = soup.find('div',{'class':'carousel_images'}).findAll('img',{'class':'centeredImg'})[-1]['src']
    try:
    	country = content.find('span',{'class':'country-name'}).text
    except:
    	country = "No address found"
    # description = soup.find('div',{'class' : 'description'}).text
    #  image = attr.find('a',{'class' : 'photo_link '})
    # image = soup.find('a',{'class' : 'tourism_hero_photo '}).find('img')['src']
    print(country)
    print(image)
    # print(description)

    return country,image








if __name__ == '__main__':
    # cities=["Beijing","Paris","Los_Angeles","London"]
    # cities=["Barcelona"]
    # cities ={
    #     "Beijing":"g294212",
    #     "Paris":"g187147",
    #     "Los_Angeles":"g32655",
    #     "London":"g186338",
    #     "Barcelona":"g187497",
    #     "Dalian":"g297452",
    #"Maldives" : "g293953",
    # "New_York":"g60763",
    # "Shanghai":"g308272",
    # "Tokyo":"g298184"

    # }

    cities ={
        "Beijing":"g294212",
        "Paris":"g187147",
        "London":"g186338",
        "Barcelona":"g187497",
        "Dalian":"g297452",
        "Maldives" : "g293953",
        "Shanghai":"g308272",
        "Tokyo":"g298184",
        "Los Angeles": "g32655",
        "New York" :"g60763",
        "Bali":"g294226",
        "Rome":"g187791",
        "Crete": "g189413",
        "Siem Reap": "g297390",
        "Prague" : "g274707",
        "Phuket" : "g293920",
        "Istanbul" : "g293974",
        "Jamaica": "g147309",
        "Hoi An" : "g298082",
        "St. Petersburg" :"g298507",
        "Roatan" : "g292019",
        "Dubai" : "g295424",
        "Rio" : "g303506"
    }

    db_url = 'mongodb://admin:admin233@ds119406.mlab.com:19406/fairy_forest'

    client = pymongo.MongoClient(db_url)
    db = client.get_default_database()
    dests = db['dests']

    for city in cities:
        country, image = crawl(city, cities[city])

        DATA = {
            "title": city,
            "country": country,
            "image": image,
            # "description": description
        }

        dests.insert_one(DATA)



    client.close()
