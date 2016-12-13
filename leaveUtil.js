"use strict"

function leaveController(convo){
	var self = this;
}

leaveController.prototype.askDays = function askDays(convo, callback) {
	var self = this;

	convo.ask('For how many days ?', [
		{
			pattern: /^([0-9]*)$/g,
			callback: function(response, convo){
				self.days = response.text;
				console.log('Got some days -->' + self.days);
				convo.next();
				return callback();
			}
		},
		{
            default: true,
            callback: function(response, convo) {
            	convo.repeat();
            	convo.next();
            }
        }
	]);
};

leaveController.prototype.askFromDate = function askFromDate(convo, callback){
	var self = this;

	convo.ask('Ah ' + self.days + ' days ! from which date ? \n Sample for 7th Jan 2016 : `01-07-2016`', [
		{
			pattern: /(^(((0[1-9]|1[0-9]|2[0-8])[-](0[1-9]|1[012]))|((29|30|31)[-](0[13578]|1[02]))|((29|30)[-](0[4,6,9]|11)))[-](19|[2-9][0-9])\d\d$)|(^29[-]02[-](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/,
			callback: function(response, convo){
				self.from_date = response.text;
				console.log('Got from date -->' + self.from_date);
				callback();
			}
		},
		{
            default: true,
            callback: function(response, convo) {
            	//convo.say('Not understand you :/ !');
            	convo.repeat();
            	convo.next();
            }
        }
	]);
}

module.exports = leaveController;