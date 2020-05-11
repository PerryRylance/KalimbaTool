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
	
	Tablature.prototype.setProgress = function(f)
	{
		$(this.element).children(".inner").css({
			bottom: (f * -this.height) + "px"
		});
	}
	
	Tablature.prototype.redraw = function()
	{
		var self = this;
		var container = $(this.element).children(".inner");
		
		container.empty();
		
		this.renderers = [];
		
		this.midi.tracks.forEach(function(track) {
			
			var renderer = new Renderer(self, track);
			
			renderer.redraw();
			
			self.renderers.push(renderer);
			container.append(renderer.element);
			
		});
		
		var height = 0;
		
		$(this.element).find(".note").each(function(index, el) {
			
			var y = parseFloat($(el).css("bottom"));
			
			
			if(!$(el).is(":last-of-type"))
				y += parseFloat($(el).css("height"));
			else
				console.log("Ignoring last note");
			
			height = Math.max(height, y);
			
		});
		
		this.height = height;
		this.element.children(".inner").css({
			width: $(this.element).width() + "px",
			height: height + "px"
		});
	}
	
});