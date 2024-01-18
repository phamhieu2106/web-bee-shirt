$(function () {
	
	var d1, data, chartOptions;

	var d1 = [[1262304000000, 11], [1264982400000, 76], [1267401600000, 1092], [1270080000000, 2234], [1272672000000, 7765], [1275350400000, 1763], [1277942400000, 7760], [1280620800000, 16753], [1283299200000, 19237], [1285891200000, 24569], [1288569600000, 12998], [1291161600000, 18739]];

	data = [{ 
		label: "Facebook", 
		data: d1
	}];

	chartOptions = {
		xaxis: {
			min: (new Date(2009, 11)).getTime(),
			max: (new Date(2010, 11)).getTime(),
			mode: "time",
			tickSize: [1, "month"],
			monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			tickLength: 0
		},
		yaxis: {

		},
		series: {
			lines: {
				show: true, 
				fill: false,
				lineWidth: 2,
			},
			points: {
				show: true,
				radius: 4,
				fill: true,
				fillColor: "#ffffff",
				lineWidth: 2
			}
		},
		 grid:{
			hoverable: true,
			clickable: true,
			borderWidth: 1,
			tickColor: '#f5f6fa',
			borderColor: '#f5f6fa',
		},
		shadowSize: 0,
		legend: {
			show: true,
			position: 'nw'
		},
		tooltip: true,
		tooltipOpts: {
			content: '%s: %y'
		},
		colors: ['#007ae1', '#e5e8f2', '#ff5661'],
	};

	var holder = $('#line-chart');

	if (holder.length) {
		$.plot(holder, data, chartOptions );
	}
});