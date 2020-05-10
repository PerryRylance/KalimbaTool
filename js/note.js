jQuery(function($) {
	
	window.Note = function(tablature, event, track)
	{
		this.element	= $("<span class='note'></span>");
		
		this.tablature	= tablature;
		this.event		= event;
		this.track		= track;
	}
	
	Note.prototype.getDuration = function()
	{
		var delta = 0;
		
		for(
			var i = this.track.events.indexOf(this.event) + 1;
			i < this.track.events.length;
			i++)
		{
			var event = this.track.events[i];
			
			delta += event.delta;
			
			if(!(event instanceof MIDIControlEvent))
				continue;
			
			switch(event.type)
			{
				case MIDIControlEvent.NOTE_ON:
				case MIDIControlEvent.NOTE_OFF:
				
					if(event.pitch() != this.event.pitch())
						continue;
				
					break;
				
				default:
					continue;
					break;
			}
		}
		
		return delta;
	}
	
	Note.prototype.updateElement = function()
	{
		var kalimba		= this.tablature.kalimba;
		var index		= kalimba.getKeyIndexFromMIDIPitch(this.event.pitch());
		
		var start		= this.event.start;
		var duration	= this.getDuration();
		
		start		*= this.tablature.scaleY;
		duration	*= this.tablature.scaleY;
		
		if(index === null)
		{
			$(this.element).addClass("unplayable");
			
			$(this.element).css({
				bottom:		start + "px",
			});
			
			$(this.element).text(
				Pitch.getLetterFromMIDIPitch(this.event.pitch())
				+
				Pitch.getOctaveFromMIDIPitch(this.event.pitch())
			);
		}
		else
		{
			$(this.element).removeClass("unplayable");
			
			$(this.element).css({
				bottom:				start + "px",
				left:				(32 * index) + "px",
				height:				duration + "px",
				"background-color":	this.track.color
			});
		}
		
	}
	
});