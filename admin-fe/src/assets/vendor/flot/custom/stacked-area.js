$(function () {
		
	var d1, d2, d3, data, chartOptions;

	var d1 = [[1260100000000, 776], [1264982400000, 1298], [1267401600000, 1434], [1270080000000, 982], [1272672000000, 602], [1275350400000, 826], [1277942400000, 902], [1280620800000, 1037], [1283299200000, 1104], [1285891200000, 1144], [1288569600000, 1577], [1289999989000, 1977]];
	var d2 = [[1260100000000, 312], [1264982400000, 600], [1267401600000, 905], [1270080000000, 729], [1272672000000, 343], [1275350400000, 555], [1277942400000, 562], [1280620800000, 797], [1283299200000, 800], [1285891200000, 700], [1288569600000, 1200], [1289999989000, 700]];
	var d3 = [[1260100000000, 50], [1264982400000, 290], [1267401600000, 405], [1270080000000, 429], [1272672000000, 243], [1275350400000, 255], [1277942400000, 262], [1280620800000, 297], [1283299200000, 400], [1285891200000, 500], [1288569600000, 700], [1289999989000, 600]];

	data = [{ 
		label: "Likes", 
		data: d1
	}, {
		label: "Tweets",
		data: d2
	}, {
		label: "Shares",
		data: d3
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
			stack: true,
			lines: {
				show: true, 
				fill: 0.1,
				lineWidth: 2
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
			clickable: false,
			borderWidth: 1,
			tickColor: '#f5f6fa',
			borderColor: '#f5f6fa',
		},
		legend: {
			show: true,
			position: 'nw',
			noColumns: 0,
		},
		shadowSize: 0,
		tooltip: true,
		tooltipOpts: {
		content: '%s: %y'
		},
		colors: ['#007ae1', '#e5e8f2', '#ff5661'],
	};

	var holder = $('#stacked-area-chart');

	if (holder.length) {
		$.plot(holder, data, chartOptions );
	}
});