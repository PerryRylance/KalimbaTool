jQuery(function($) {
	
	function getTestMIDI()
	{
		// Create a file and track, push the track onto the file
		var file = new MIDIFile();
		
		var track = new MIDITrack();
		file.tracks.push(track);

		// Push some events onto the track
		var semitones=[0,4,7,12];
		
		var root=60; // Middle C
		
		for(var i = 0; i < semitones.length; i++)
		{
			var e = new MIDIControlEvent(MIDIControlEvent.NOTE_ON, root + semitones[i], 127);
			
			if(i > 0)
				e.delta = file.timeDivision;		// Space events out by one quarter note (crotchet) each
			
			track.events.push(e);
		}

		for(var i = 0; i < semitones.length; i++)
		{
			var e = new MIDIControlEvent(MIDIControlEvent.NOTE_OFF, root + semitones[i], 127);
			
			if(i == 0)
				e.delta = file.timeDivision * 4;	// Wait for one measure (bar) and then send all notes off
			
			track.events.push(e);
		}
		
		return file;
	}
	
	window.App = function()
	{
		this.kalimba	= new Kalimba($("#kalimba"));
		
		this.tablature	= Tablature.fromMIDI($("#tablature"), this.kalimba, getTestMIDI());
	}
	
	window.app = new App();
	
});