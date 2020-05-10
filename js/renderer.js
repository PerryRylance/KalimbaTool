jQuery(function($) {
	
	window.Renderer = function(tablature, track)
	{
		this.tablature	= tablature;
		this.track		= track;
		
		this.notes		= [];
		this.element	= $("<div class='track'></div>");
	}

	Renderer.prototype.redraw = function()
	{
		var self = this;
		
		// Just one track for now
		var track		= this.track;
		
		// Track absolute start
		var start		= 0;
		
		track.events.forEach(function(event) {
			
			start += event.delta;
			event.start = start;
			
			if(!(event instanceof MIDIControlEvent))
				return;
			
			if(event.type != MIDIControlEvent.NOTE_ON)
				return;
			
			var note = new Note(self.tablature, event, track);
			
			note.updateElement();
			
			self.element.append(note.element);
			self.notes.push(note);
			
		});
	}
	
});