export default function() {
  this.get('/venues/explore', function(db, request) {
    if(request.queryParams.near === "no results") {
      return {
      	"meta": {
      		"code": 200,
      		"requestId": "5699205e498ee123c3f3c6f8"
      	},
      	"notifications": [{
      		"type": "notificationTray",
      		"item": {
      			"unreadCount": 5
      		}
      	}],
      	"response": {}
      };
    }
    return {
      meta: {
        code: 200,
        requestId: "569bc8f8498ee273066c0989"
      },
      response: {
        geocode: {
          where: "soho",
          displayString: "Soho, Greater London, United Kingdom"
        },
        totalResults: 248,
        groups: [{
          type: "Recommended Places",
          name: "recommended",
          items: [{
            venue: {
              id: "4ac518cdf964a520e6a520e3",
              name: "National Gallery",
              contact: {
                phone: "+442077472885",
                formattedPhone: "+44 20 7747 2885",
                twitter: "nationalgallery",
                facebook: "83395535556",
                facebookUsername: "thenationalgallery",
                facebookName: "National Gallery"
              },
              location: {
                address: "Trafalgar Sq",
                lat: 51.50872242607024,
                lng: -0.1283276081085205,
                postalCode: "WC2N 5DN",
                cc: "GB",
                city: "Londres",
                state: "Greater London",
                country: "Reino Unido",
                formattedAddress: ["Trafalgar Sq", "Londres", "Greater London", "WC2N 5DN", "Reino Unido"]
              },
              stats: {
                checkinsCount: 37654,
                usersCount: 31698,
                tipCount: 362
              },
              url: "http:\/\/www.nationalgallery.org.uk",
              rating: 9.6
            }
          }, {
            venue: {
              id: "4ac518d2f964a5203da720e3",
              name: "British Museum",
              contact: {
                phone: "+442073238299",
                formattedPhone: "+44 20 7323 8299",
                twitter: "britishmuseum",
                facebook: "72228529722",
                facebookUsername: "britishmuseum",
                facebookName: "British Museum"
              },
              location: {
                address: "Great Russell St",
                lat: 51.519271779584045,
                lng: -0.1268470287322998,
                postalCode: "WC1B 3DG",
                cc: "GB",
                city: "Londres",
                state: "Greater London",
                country: "Reino Unido",
                formattedAddress: ["Great Russell St", "Londres", "Greater London", "WC1B 3DG", "Reino Unido"]
              },
              stats: {
                checkinsCount: 70645,
                usersCount: 57104,
                tipCount: 654
              },
              url: "http:\/\/britishmuseum.org",
              rating: 9.5
            }
          }]
        }, {
          type: "Popular Places",
          items: [{
          	venue: {
          		id: "4ac518cef964a520fca520e3",
          		name: "Madame Tussauds",
          		contact: {
          			phone: "+448718943000",
          			formattedPhone: "+44 871 894 3000",
          			twitter: "tussaudslondon",
          			facebook: "360478850697",
          			facebookUsername: "officialmadametussaudslondon",
          			facebookName: "Madame Tussauds London"
          		},
          		location: {
          			address: "Marylebone Rd",
          			lat: 51.52281301708984,
          			lng: -0.15535998877990853,
          			postalCode: "NW1 5LR",
          			cc: "GB",
          			city: "Marylebone",
          			state: "Greater London",
          			country: "Reino Unido",
          			formattedAddress: [
          				"Marylebone Rd",
          				"Marylebone",
          				"Greater London",
          				"NW1 5LR",
          				"Reino Unido",
          			]
          		},
          		stats: {
          			checkinsCount: 27605,
          			usersCount: 25197,
          			tipCount: 351
          		},
          		url: "http://www.madametussauds.com/london/",
          		rating: 9
          	}
          }]
        }]
      }
    };
  });
}
