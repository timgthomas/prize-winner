(function($) {

	Backbone.sync = function(method, model, success, error) {}
	
	// Models
	var Attendee = Backbone.Model.extend({});
	var AttendeeList = Backbone.Collection.extend({ model : Attendee });
	
	// Views
	var AttendeeView = Backbone.View.extend({
	
		tagName : 'li',
		
		template : _.template($('#attendee-template').html()),
		
		events : {},
		
		render : function() {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}
		
	});
	
	var PrizeWinnerView = Backbone.View.extend({
	
		el : $('#prize-winner'),
		
		events : {
			'click #add-attendee' : 'createOnEnter'
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
		
		createOnEnter: function(e) {
			var text = this.input.val();
			if (text) {
				this.collection.add(new Attendee({ name : text }));
				this.input.val('');
			}
		 }
		 
	});
	
	var app = new PrizeWinnerView;

})(jQuery);