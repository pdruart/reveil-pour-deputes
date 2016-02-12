const ical = require('ical')
const jf = require('jsonfile');

// main call
ReveilPourDepute("ToBeDefined");

function ReveilPourDepute(twitterToken) {
	//
	// Fetch Tomorrow calendar
	//
	GetTomorrowEvent(new Date(new Date().getTime() + 4*  24 * 60 * 60 * 1000))
		.then(function(Events) {
			if (Events.length > 0)
			{
				//
				// Load all Twitter Depute's Accounts 
				//
				var Assembly = jf.readFileSync('../deputeTwitter.json');
		        	var deputes = Assembly.deputes;

                        	Object.keys(deputes).forEach(function(id)
				{
					var depute = deputes[id];
					Events.forEach(function(Event)
					{
						// Get only the event which takes place in Assemblée Nationale
						if (Event.location.indexOf('Assemblée') ==0)
						{
							console.log("@" + depute.id.tagTwitter +", aujourd'hui, tu as RDV à l'assemblée à " + Event.hour + ". N'oublies pas d'y aller :*");
							// Connect and send all the tweet :) (Kamehahaha)
						}
					});
				});
			}
			else
			{
				console.log("No Event for Tomorrow");
			}
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
						"hour"	  : ev.start.getHours() + 'h' + (ev.start.getMinutes()<10?'0':'') +  ev.start.getMinutes(),
						"location": ev.location,
						"summary" : ev.summary,
					});
		    		}
		  	}
			resolve(Events);
        	});
	});
};


