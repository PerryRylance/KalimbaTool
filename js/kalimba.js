jQuery(function($) {
	
	window.Kalimba = function(element)
	{
		var self = this;
		
		this.element = element;
		this.keyTemplate = $(element).find(".keys > li").remove();
		
		// Default tuning
		this.setTuning([
			60 + 26,	// D
			60 + 23,	// B
			60 + 19,	// G
			60 + 16,	// E
			60 + 12,	// C
			60 + 9,		// A
			60 + 5,		// F
			60 + 2,		// D
			60,
			60 + 4,		// E
			60 + 7,		// G
			60 + 11,	// B
			60 + 14,	// D
			60 + 17,	// F
			60 + 21,	// A
			60 + 24,	// C
			60 + 28		// E
		]);
		
		// Event listeners
		$(element).on("change input", "input[name='pitch[]']", function(event) {
			
			self.onKeyPitchChanged(event);
			
		});
		
		
	}
	
	Kalimba.DEFAULT_KEY_COUNT		= 17;
	
	Kalimba.prototype.onKeyPitchChanged = function(event) 
	{
		this.updateKeyPitchDisplays();
	}
	
	Kalimba.prototype.updateKeyPitchDisplays = function()
	{
		$(this.element).find(".keys > li").each(function(index, el) {
			
			var midi = $(el).find("input[name='pitch[]']").val();
			
			$(el).find(".pitch-letter").html(
				Pitch.getLetterFromMIDIPitch(midi)
			);
			
			$(el).find(".pitch-octave").html(
				Pitch.getOctaveFromMIDIPitch(midi)
			);
			
		});
	}
	
	Kalimba.prototype.updatePitchCache = function()
	{
		var inputs = $(this.element).find("input[name='pitch[]']");
		var cache = [];;
		
		cache = [];
		cache.min = Infinity;
		cache.max = -Infinity;
		
		inputs.each(function(index, el) {
			
			var val = parseInt($(el).val());
			
			cache.push( val );
			
			cache.min = Math.min(val, cache.min);
			cache.max = Math.max(val, cache.max);
		});
		
		cache.range = cache.max - cache.min;
		
		this.pitchCache = cache;
	}
	
	Kalimba.prototype.setTuning = function(midiPitches)
	{
		var self = this;
		var container = $(this.element).find(".keys");
		
		container.empty();
		
		midiPitches.forEach(function(midi) {
			
			var key = $(self.keyTemplate).clone();
			
			key.find("input[name='pitch[]']").val(midi);
			
			container.append(key);
			
		});
		
		this.updateKeyPitchDisplays();
		this.updatePitchCache();
	}
	
	Kalimba.prototype.getKeyIndexFromMIDIPitch = function(pitch)
	{
		var cache = this.pitchCache;
		
		var lowestIndex = 0;
		var lowestDelta = Infinity;
		
		for(var i = 0; i < cache.length; i++)
		{
			var isPitchPlayable = (pitch % 12) == (cache[i] % 12);
			
			if(!isPitchPlayable)
				continue;
			
			var delta			= Math.abs(pitch - cache[i]);
			
			if(delta < lowestDelta)
			{
				lowestIndex = i;
				lowestDelta = delta;
			}
		}
		
		if(lowestDelta == Infinity)
			return null;
		
		return lowestIndex;
	}
	
});