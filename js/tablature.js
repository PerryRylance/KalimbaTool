jQuery(function($) {
	
	window.Tablature = function(element, kalimba)
	{
		// TODO: Columns for notes, need that for interactivity
		
		this.kalimba	= kalimba;
		this.element	= element;
		this.notes		= [];
		
		this.scaleY		= 0.1;
	}
	
	Tablature.fromMIDI = function(element, kalimba, midi)
	{
		var tablature	= new Tablature(element, kalimba);
		
		// Just one track for now
		var track		= midi.tracks[0];
		
		// Track absolute start
		var start		= 0;
		
		track.events.forEach(function(event) {
			
			start += event.delta;
			event.start = start;
			
			if(!(event instanceof MIDIControlEvent))
				return;
			
			if(event.type != MIDIControlEvent.NOTE_ON)
				return;
			
			var note = new Note(tablature, event, track);
			tablature.notes.push(note);
			
		});
		
		tablature.redraw();
		
		return tablature;
	}
	
	Tablature.prototype.redraw = function()
	{
		$(this.element).empty();
		
		for(var i = 0; i < this.notes.length; i++)
		{
			var note = this.notes[i];
			note.updateElement();
			
			$(this.element).append(note.element);
		}
	}
	
});