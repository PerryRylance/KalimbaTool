jQuery(function($) {
	
	window.Pitch = function()
	{
		
	}
	
	Pitch.LETTERS_SHARP = [
		"C",
		"C#",
		"D",
		"D#",
		"E",
		"F",
		"F#",
		"G",
		"G#",
		"A",
		"A#",
		"B"
	];
	
	Pitch.LETTERS_FLAT = [
		"C",
		"Db",
		"D",
		"Eb",
		"E",
		"F",
		"Gb",
		"G",
		"Ab",
		"A",
		"Bb",
		"B"
	];
	
	Pitch.getLetterFromMIDIPitch = function(midi, accidental)
	{
		if(!accidental || accidental == "sharp")
			return Pitch.LETTERS_SHARP[midi % 12];
		
		return Pitch.LETTERS_FLAT[midi % 12];
	}
	
	Pitch.getOctaveFromMIDIPitch = function(midi)
	{
		return Math.floor(midi / 12) - 1;
	}
	
});