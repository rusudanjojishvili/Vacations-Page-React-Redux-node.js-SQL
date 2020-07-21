create database vacations;

use vacations;

create table users(
id int auto_increment,
fname varchar(255) not null,
lname varchar(255) not null,
username varchar(255) not null,
password varchar(255) not null,
isAdmin boolean not null default 0,
primary key(id)
);

-- for making the admin admin after registering from browser
UPDATE `vacations`.`users` SET `isAdmin` = '1' WHERE (`id` = '1');



create table vacations(
id int auto_increment,
description text (255) not null,
destination varchar(255) not null,
img text not null,
fromdate date,
todate date,
price int not null,
followersN int not null default 0,
status bool default false,
primary key (id)
);
create table followedvacs(
id int auto_increment,
users_id int,
vacations_id int,
status bool default true,
primary key(id),
CONSTRAINT followedvaclist UNIQUE (users_id,vacations_id)
);


insert into vacations
(description, destination, img, fromdate, todate, price)
values("Discover the Inner City along the banks of the Danube,
 with its fashionable shops and iconic buildings. 
 The Inner-City Parish Church and St. Stephen’s Basilica
 stand out as two of the finest examples of architecture
 in the area. If you are still hunting for more historical 
 treats, then the ruins of the medieval city walls on
 Kecskeméti Utca are a must-visit while the Soviet War 
 Memorial is also worthy of attention and relevant to 
 Hungary’s more recent history. If shopping is on your 
 itinerary, then be prepared: the market squares in this 
 area are an absolute delight, particularly during the 
 Christmas period, but even throughout the year you’ll 
 find the latest trends in the shops on Vaci Utca", "Budapest,Hungary",
 "https://www.tripsavvy.com/thmb/b-hvgyReLebGDjPfkV4FS4E9sqI=/2121x1414/filters:fill(auto,1)/the-hungarian-parliament-on-the-danube-river-at-sunset-in-budapest--hungary-945207010-23afbc9012d54bc4bb7c8a1f8c90075b.jpg",
 "2020-02-05", "2020-03-05", 400),
 ("From Shoreditch’s swaggering style to Camden’s
 punky vibe and chic Portobello Road, London is many 
 worlds in one. The city’s energy means that no two 
 days are the same. Explore royal or historic sites, 
 tick off landmarks from your bucket list, eat and 
 drink in exclusive Michelin-starred restaurants, 
 enjoy a pint in a traditional pub, or get lost down 
 winding cobbled streets and see what you stumble across
 – when it comes to London, the possibilities are endless.", "London, United Kingdom",
 "https://cdn.londonandpartners.com/visit/general-london/areas/river/76709-640x360-houses-of-parliament-and-london-eye-on-thames-from-above-640.jpg",
 "2020-02-08", "2020-03-06", 500),
 ("Barcelona feels a bit surreal – appropriate, since
 Salvador Dali spent time here and Spanish Catalan 
 architect Antoni Gaudí designed several of the city’s
 buildings. Stepping into Gaudí’s Church of the Sacred 
 Family is a bit like falling through the looking glass 
 - a journey that you can continue with a visit to Park
 Güell. Sip sangria at a sidewalk café in Las Ramblas while
 watching flamboyant street performers, then create your 
 own moveable feast by floating from tapas bar to tapas bar.", "Barcelona,Spain",
 "https://theglittersonline.com.ng/wp-content/uploads/2018/12/BARCELONIA-CITY.jpg",
 "2020-02-25", "2020-04-05", 400),
 ("The lush jungles of Thailand promise adventure, while the serene beaches are the perfect place to splash in 
 the sun. The Similan Islands feature some of the best dive sites in the world, where barracuda dart amid coral 
 reefs and rock formations. Party in the nightclubs of Patong or linger over mango sticky rice at the famous 
 Bangkok family restaurant Kao Neoo Korpanich. The city of Chiang Mai is an absolute must-visit; a mosaic of
  ancient temples, massage parlors, music venues, and markets", "Thailand",
 "https://www.ncl.com/sites/default/files/881-thailand-indonesia-phuket-penang-singapore-SPIRIT15SINJKTSRGSUBDPSCELPENSABHKTPKGSIN_R.jpg",
 "2020-03-25", "2020-04-05", 600),
 ("With its gondolas, canals, amazing restaurants, and unforgettable romantic ambiance, Venice is definitely a city for one's bucket list.
  Waterfront palazzos, palaces, and churches make drifting down the Grand Canal feel like cruising through a painting. To really
   experience Venice you must go to the opera or to a classical music performance, nibble fresh pasta and pastries, and linger 
   in the exhibit halls of an art gallery. Label lovers will drool over the high-end shopping in Piazza San Marco.", "Venice,Italy",
 "https://s3.amazonaws.com/image-products/46957/46957-1024.jpg",
 "2020-03-22", "2020-04-15", 400),
 ("Lingering over pain au chocolat in a sidewalk café, relaxing after a day of strolling along the Seine and marveling at icons like 
 the Eiffel Tower and the Arc de Triomphe… the perfect Paris experience combines leisure and liveliness with enough time to savor 
 both an exquisite meal and exhibits at the Louvre. Awaken your spirit at Notre Dame, bargain hunt at the Marché aux Puces de 
 Montreuil or for goodies at the Marché Biologique Raspail, then cap it all off with a risqué show at the Moulin Rouge.", "Paris,France",
 "https://img.huffingtonpost.com/asset/5df949c6240000e70c5a39da.jpeg?cache=k8iXwHWWIe&ops=scalefit_720_noupscale",
 "2020-04-22", "2020-04-28", 400),
 ("From volcanic landscapes to hidden waterfalls… active adventures to an energetic nightlife… a holiday on the Hawaiian Islands offers 
 infinite experiences in one destination. Each of the six major islands – Kauai, Oahu, Molokai, Lanai, Maui, and the island of Hawaii –
  has its own distinct personality, but no matter which ones you choose, you’ll discover endless opportunities for adventure, dining,
   culture and relaxation", "Paris,France",
 "https://lh3.googleusercontent.com/proxy/o9mAx-FFCRabZ6psp6lTEAHh1q3FbHNYWn8o0-rIlV59dxr8IWd5aZ7ghfUeIyeaB7Y-hCE_4cskaS5VAvBhUDVVMvkGloAIXqqUeIcMqn3t99sY3Ew1yxerbnUSDwKkcg",
 "2020-05-04", "2020-06-04", 1200),
 ("If it's your first time visiting the Amalfi Coast, chances are you'll 
do a double-take the first time you see a roadside lemon stand. Yes, those are 
lemons, and yes, they are the size of your head. But despite their freakish appearance,
 you will grow to love these lemons because the locals use them to produce limoncello.
 And take it from us, there's nothing like a glass of limoncello as you gaze out at
 the sea from the balcony of your hotel in Amalfi. It's pretty much perfection", "Amalfi, Italy",
 "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/6b/9a/fe.jpg",
 "2020-03-05", "2020-04-05", 450)



-- insert into followedvacs
-- (users_id,vacations_id)
-- values (2,3);
-- update vacations set 
-- followersN = followersN + 1 where vacations.id=3

-- delete from followedvacs where users_id = 2 and vacations_id=3
-- update vacations set 
-- followersN = followersN - 1 where vacations.id=3


