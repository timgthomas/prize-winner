(function($) {

	Backbone.sync = function(method, model, success, error) {}
	
	// Models
	var Attendee = Backbone.Model.extend({});
	var AttendeeList = Backbone.Collection.extend({
	
		model : Attendee,
	
		random : function() {
			var randValue = Math.floor(Math.random() * this.length);
			return this.models[randValue];
		}
	
	});
	
	// Views
	var AttendeeView = Backbone.View.extend({
	
		tagName : 'li',
		
		template : _.template($('#attendee-template').html()),
		
		events : {
			'click span.delete' : 'clear'
		},
		
		initialize : function() {
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
			'click #add-attendee' : 'createOnEnter',
			'click #random-attendee' : 'random'
		},
		
		initialize : function() {
			this.input = this.$('#attendee-name');
			this.collection = new AttendeeList();
			this.collection.bind('add', this.addAttendee, this);
		},
		
		addAttendee : function(attendee) {
			var view = new AttendeeView({ model : attendee });
			this.$('#attendee-list').prepend(view.render().el);
		},
		
		createOnEnter : function(e) {
			var text = this.input.val();
			if (text) {
				this.collection.add(new Attendee({ name : text }));
				this.input.val('');
			}
		 },
		 
		 random : function() {
			alert('Random winner: ' + this.collection.random().get('name'));
		 }
		 
	});
	
	var app = new PrizeWinnerView;

})(jQuery);