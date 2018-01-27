'''
Crawl down spots in Beijing
Attributes:
    "cityName": "Beijing",
    "spotName": "Rui's Home",
    "Street Address": "1 Changan Street",
    "rating": "5",
    "duration": "2",
    "image":
    "website":
    "type": [
        "strong"
    ],
    "overview"
'''

from bs4 import BeautifulSoup
import requests
import sys
import pymongo


#Generalizations


# crawl "top things to do"
def crawl(city,code,page):
    prefix =  "https://www.tripadvisor.com/Attractions-%s-Activities"%(code,)
    # suffix = "-London_England.html#ATTRACTION_SORT_WRAPPER"
    get_attractions_url=prefix+page
    #"https://www.tripadvisor.com/Attractions-g32655-Activities-oa90-Los_Angeles_California.html#ATTRACTION_LIST"
    #"https://www.tripadvisor.com/Attractions-g187147-Activities-oa90-Paris_Ile_de_France.html#ATTRACTION_LIST"
    # https://www.tripadvisor.com/Attractions-g294212-Activities-Beijing.html#ATTRACTION_SORT_WRAPPER
    # prefix =  "https://www.tripadvisor.com/Attractions-g186338-Activities"
    # suffix = "-London_England.html#ATTRACTION_SORT_WRAPPER"

    # nextpage = ui_button next primary
    # flag = True

    totalRes=0
    # for city in cities:
    #     print '\n===== Attempting extraction for city <', city, '>=====\n'
    r  = requests.get(get_attractions_url)
    soup = BeautifulSoup(r.text,'html.parser')


    attrs_class = soup.findAll('div', {'class' : 'attraction_element'})
    print (len(attrs_class))

    country_dest = ""
    image_dest = ""
    count = 0
    for attr in attrs_class:
        count+=1
        cityName = city
        spotName = attr.find('div',{'class' : 'listing_title'}).find('a').text
        # image = attr.find('a',{'class' : 'photo_link '})
        sub_url = attr.find('div',{'class' : 'listing_title'}).find('a').get('href')
        print(spotName)

        overview, duration, Type, rating, image, street, local,country= crawl_sub(sub_url)

        # Insert into database
        DATA = {
            "cityName": cityName,
            "spotName": spotName,
            # "location": location,
            "rating": rating,
            "duration": duration,
            "image": image,
            "type": Type,
            "overview": overview,
            "street": street,
            "locality": local,
            "country" : country
        }


        spots.insert_one(DATA)







def crawl_sub(url):
    url_prefix = 'https://www.tripadvisor.com'
    url = url_prefix+url
    r  = requests.get(url)
    soup = BeautifulSoup(r.text,'html.parser')
    content = soup.find('div',{'class' : 'overviewContent'})
    try:
    	overview = content.find('div',{'class': 'text'}).text
    except:
    	overview = "No review found"

    try:
    	duration = content.find('div',{'class':'detail_section duration'}).text
    except:
    	duration = "No duration found"

    try:
        street = content.find('span',{'class':'street-address'}).text

    except:
    	street = "No Street address found"

    try:

        local= content.find('span',{'class':'locality'}).text

    except:
    	local = "No locality found"

    try:
        country = content.find('span',{'class':'country-name'}).text
    except:
    	country = "No country name found"


    try:
    	rating = content.find('span',{'class':'overallRating'}).text + '/5.0, ' + content.find('a',{'class':'seeAllReviews'}).text
    except:
    	rating = "No rating found"

    try:
    	details = soup.find('div',{'class':'detail'})
    	Type = []
    	for detail in details.findAll('a'):
    		Type.append(detail.text)
    except:
    	rating = "No Types found"

    default = "https://www.plus.co.th/assets/img/product/list/default.jpg"
    try:
        image = soup.find('div',{'class':'carousel_images'}).findAll('img',{'class':'centeredImg'})[-1]['src']
    except:
        image = default


    print(url)
    print(overview)
    print(duration)
    print(rating)
    print(Type)
    print(image)
    print(street)
    print(local)
    print(country)

    print('**************************')
    return overview, duration, Type, rating, image, street, local,country



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
        # "Beijing":"g294212",
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
    pages = ["", "-oa30", "-oa60", "-oa90"]

    client = pymongo.MongoClient(db_url)
    db = client.get_default_database()
    spots = db['spots']
    dests = db['destinations']

    for city in cities:
        for page in pages:
            crawl(city, cities[city], page)


    client.close()
