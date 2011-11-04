(function($) {

	//sBackbone.sync = function(method, model, success, error) {}
	
	// Models
	var Attendee = Backbone.Model.extend({
		defaults : {
			"awarded" : false
		},
		award : function() {
			this.set({ 'awarded' : true });
		}
	});
	
	var AttendeeList = Backbone.Collection.extend({
	
		model : Attendee,
	
		random : function() {
			if (this.length === 0) return undefined;
			
			var unawarded = [];
			
			var len = this.models.length;
			for (i = 0; i < len; i++) {
				var m = this.models[i];
				if (!m.get('awarded')) unawarded.push(m);
			}
			
			var randValue = Math.floor(Math.random() * unawarded.length);
			var result = unawarded[randValue];
			if (result === undefined) return undefined;
			
			result.award();
			return result;
		}
	
	});
	
	// Views
	var AttendeeView = Backbone.View.extend({
	
		tagName : 'li',
		
		template : _.template($('#attendee-template').html()),
		
		events : {
			'click a.delete' : 'clear'
		},
		
		initialize : function() {
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
		},
		
		render : function() {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},
		
		remove : function() {
			$(this.el).remove();
		},
		
		clear : function() {
			this.model.destroy();
		}
		
	});
	
	var PrizeWinnerView = Backbone.View.extend({
	
		el : $('#prize-winner'),
		
		events : {
			'click #add-attendee' : 'createOnClick',
			'keyup #attendee-name' : 'createOnEnter',
			'click #random-attendee' : 'random'
		},
		
		initialize : function() {
			this.input = this.$('#attendee-name');
			this.collection = new AttendeeList();
			this.collection.bind('add', this.addAttendee, this);
			
			//this.collection.add(new Attendee({ name : 'Cheyenne' }));
			//this.collection.add(new Attendee({ name : 'Tim' }));
			
			this.input.focus();
		},
		
		addAttendee : function(attendee) {
			var view = new AttendeeView({ model : attendee });
			this.$('#attendee-list').prepend(view.render().el);
		},
		
		createOnClick : function() {
			this.createAttendee();
		 },
		
		createOnEnter : function(e) {
			if (e.keyCode !== 13) return;
			this.createAttendee();
		 },
		 
		 createAttendee : function() {
			var text = this.input.val();
			if (text) {
				this.collection.add(new Attendee({ name : text }));
				this.input.val('');
			}
		 },
		 
		 random : function() {
			var rnd = this.collection.random();
			if (rnd !== undefined) {
				this.$('#attendee-winner').html(rnd.get('name'));
			} else {
				alert('All attendees have won a prize!');
			}
		 }
		 
	});
	
	var app = new PrizeWinnerView;

})(jQuery);