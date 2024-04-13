$(function () {

	var d1, data, chartOptions;

	d1 = [[1700, 1],[3400, 2],[2300, 3],[4500, 4],[6300, 5]];

	data = [{
		label: 'Received',
		data: d1
	}];

	chartOptions = {
		xaxis: {
				
		},
		legend: {
			position: 'se'
		},
		grid:{
			hoverable: true,
			clickable: false,
			borderWidth: 1,
			tickColor: '#f5f6fa',
			borderColor: '#f5f6fa',
		},
		shadowSize: 0,
		bars: {
			horizontal: true,
			show: true,
			barWidth: 8*24*60*60*300,
			barWidth: .7,
			fill: true,
			lineWidth: 1,
			order: true,
			lineWidth: 0,
			fillColor: { colors: [ { opacity: 1 }, { opacity: 1 } ] }
		},
	
	tooltip: true,

	tooltipOpts: {
		content: '%s: %x'
	},
	colors: ['#007ae1', '#e5e8f2', '#ff5661'],
	}

	var holder = $('#horizontal-chart');

	if (holder.length) {
			$.plot(holder, data, chartOptions );
	}

});