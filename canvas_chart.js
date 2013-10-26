
function Chart(args){
	
	this.args = {'container': null,
		'data' : [],
		'labels' : [],
		'chart_width' : 450,
		'chart_height' : 300,
		'bar_width' : 20,
		'bar_space' : 10,
		'xdim_pad' : 30,
		'ydim_pad' : 20,				
		'xbar_pad' : 5,
		'ybar_pad' : 10,
		'background_type' : 'grid',			
		'type' : 'bar'
	};
	if(typeof args != 'undefined')
	{
		for(key in args)
		{
			this.args[key] = args[key];
		}
	}
}


Chart.prototype.init = function() {
	this.args.container.innerHTML = '<canvas id="chart_canvas" width="' + this.args.chart_width + '" height="' + this.args.chart_height + '" style="border: 1px solid #000; padding: 5px;"></canvas>';
	
	var context = document.getElementById('chart_canvas').getContext('2d');
	/*for (var x = 0.5; x < 500; x += 10) {
		context.moveTo(x, 0);
		context.lineTo(x, 375);
	}
	for (var y = 0.5; y < 375; y += 10) {
	  context.moveTo(0, y);
	  context.lineTo(500, y);
	}*/
	
	//context.strokeStyle = "#eee";
	//context.stroke();
	
	var max_data = Math.max.apply(Math, this.args.data);
	
	var max_allowed_bar_height = this.args.chart_height - (this.args.ydim_pad + this.args.ybar_pad );
	
	var ratio = max_allowed_bar_height / max_data ;

	var i = 1;
	
	var bar_width = this.args.bar_width;
	var bar_space = this.args.bar_space;

	var tw = ( this.args.chart_width - (this.args.xdim_pad + this.args.xbar_pad ) ) / this.args.data.length;
	bar_width = tw * 0.6;
	bar_space = tw * 0.4;

	// Making Background grid
	//var t_yheight = this.args.chart_height -  (this.args.ydim_pad + this.args.ybar_pad );
	var t_yheight = (this.args.ydim_pad + this.args.ybar_pad );
	for(i = this.args.ydim_pad; i < this.args.chart_height - (this.args.ydim_pad + this.args.ybar_pad ) ; i+=30 )
	{
		context.moveTo(this.args.xdim_pad, t_yheight + i);
		context.lineTo(this.args.chart_width  - (this.args.xdim_pad + this.args.xbar_pad ), t_yheight + i);
		context.strokeStyle = "#234";
		context.stroke();
	}

	var t_xwidth = (this.args.xdim_pad + this.args.xbar_pad );
	for(i = this.args.xdim_pad; i < this.args.chart_width - (this.args.xdim_pad + this.args.xbar_pad ) ; i+=30 )
	{
		context.moveTo(t_xwidth + i, this.args.ydim_pad);
		context.lineTo(t_xwidth + i, this.args.chart_height - (this.args.ydim_pad + this.args.ybar_pad ));
		context.strokeStyle = "#234";
		context.stroke();
	}

	// Making X Dimension Bar
	context.moveTo(this.args.xdim_pad,  (this.args.ydim_pad + this.args.ybar_pad ));
	context.lineTo(this.args.xdim_pad, this.args.chart_height -  (this.args.ydim_pad + this.args.ybar_pad ));
	context.strokeStyle = "#000";
	context.stroke();

	// Making Y Dimension Bar
	context.moveTo(this.args.xdim_pad, this.args.chart_height - (this.args.ydim_pad + this.args.ybar_pad ) );
	context.lineTo(this.args.chart_width - 5, this.args.chart_height -  (this.args.ydim_pad + this.args.ybar_pad ));
	context.strokeStyle = "#000";
	context.stroke();

	// If static color patterns used instead of dynamic
	colors = ['#B65C87',
'#B4EA70',
'#3CE929',
'#452FC7',
'#8197C1',
'#0D05AA',
'#428673',
'#9F593A',
'#980BE0',
'#5776A8',
'#8356B2',
'#663B7D',
'#75732E',
'#6B456C',
'#C8FA44',
'#73D25C',
'#045846',
'#61430C',
'#91ACB3',
'#485C4C'];	

	// Build Chart Bars
	i = 0;
	for(key in this.args.data )
	{
		varx = ( bar_space + bar_width) * i ;
		//varx -= bar_width;
		varx += (this.args.xdim_pad + this.args.xbar_pad)
		yheight = (this.args.data[key] - (this.args.ydim_pad + this.args.ybar_pad)) * ratio;
		vary = yheight - 10; 
		//console.log(varx, vary, bar_width, max_allowed_bar_height - vary);
		// Set Labels		
		context.font = '10pt Calibri';
		context.textAlign = 'right';
		context.fillStyle = '#000';
		context.fillText(this.args.labels[i], varx + (bar_width / 2), this.args.chart_height - this.args.ydim_pad + 5);

		//context.fillStyle = get_random_color();
		context.fillStyle = colors[i];
		// Set Bars
		context.fillRect(varx, vary, bar_width, max_allowed_bar_height - vary );		
	
		i++;
	}
	/*context.fillRect(5, 40, 10, 150);		
	context.fillStyle = "#ff00ff";
	context.fillRect(25, 80, 10, 110);
	context.fillStyle = "#ff0000";
	context.fillRect(45, 60, 10, 130);*/
}

function get_random_color() {
    
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    //color = colors[Math.round(Math.random() * 20)];	
    //console.log(color);	
    return color;
}

