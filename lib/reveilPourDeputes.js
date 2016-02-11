const ical = require('ical')

// main call
ReveilPourDepute("ToBeDefined");

function ReveilPourDepute(twitterToken) {
	//
	// Fetch Tomorrow calendar
	//
	GetTomorrowEvent(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
		.then(function(Events) {
			console.log(Events);
			// Load all Twitter Depute's Accounts 
			//
			// Connect and send all the tweet :) (Kamehahaha)
		});

}


function GetTomorrowEvent(date) {
	return new Promise(function(resolve, reject) {
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		var Events = [];

		ical.fromURL('http://www2.assemblee-nationale.fr/agendas/ics/'+ year +'-'+ month +'-'+ day +'/journalier', {},  function(err, data) {
			for (var k in data){
		    		if (data.hasOwnProperty(k)) {
		    	  		var ev = data[k];
					Events.push({
						"day" 	  : ev.start.getFullYear() + '-' + (ev.start. getMonth()+1) + '-' + ev.start.getDate(),
						"hour"	  : ev.start.getHours() + 'h' + ev.start.getMinutes(),
						"location": ev.location,
						"summary" : ev.summary,
					});
		    		}
		  	}
			resolve(Events);
        	});
	});
};


