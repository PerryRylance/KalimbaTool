jQuery(function($) {
	
	window.Tracks = function(element)
	{
		this.element = element;
		this.listItemTemplate = $(element).find("ul.tracks > li").remove();
	}
	
	Tracks.prototype.update = function(midi)
	{
		var li, self = this, container = $(this.element).find("ul.tracks");
		
		$(container).empty();
		
		for(var i = 0; i < midi.tracks.length; i++)
		{
			var track = midi.tracks[i];
		
			track.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		
			li = $(self.listItemTemplate).clone();
			
			$(li).find("[data-name='index']").text(i + 1);
			$(li).find("[data-name='name']").text(track.name);
			$(li).find("input[type='color']").val(track.color);
			
			container.append(li);
			
		}
	}
	
});