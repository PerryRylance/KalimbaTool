jQuery(function($) {
	
	window.Tablature = function(element, kalimba, midi)
	{
		// TODO: Columns for notes, need that for interactivity
		
		this.kalimba	= kalimba;
		this.element	= element;
		
		this.scaleY		= 0.1;
		
		this.renderers	= [];
		
		if(midi)
			this.midi = midi;
		else
			this.midi = new MIDIFile();
	}
	
	Tablature.fromMIDI = function(element, kalimba, midi)
	{
		var tablature	= new Tablature(element, kalimba);
		
		tablature.midi = midi;
		
		tablature.redraw();
		
		return tablature;
	}
	
	Tablature.prototype.redraw = function()
	{
		var self = this;
		
		$(this.element).empty();
		
		this.renderers = [];
		
		this.midi.tracks.forEach(function(track) {
			
			var renderer = new Renderer(self, track);
			
			renderer.redraw();
			
			self.renderers.push(renderer);
			self.element.append(renderer.element);
			
		});
	}
	
});