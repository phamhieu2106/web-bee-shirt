$(function () {    
	var data1 = [
		[1354586000000, 89], [1364587000000, 78], [1374588000000, 345],
		[1384589000000, 443], [1394590000000, 553], [1404591000000, 441],
		[1414592000000, 873], [1424593000000, 984], [1434594000000, 1200],
		[1444595000000, 1234], [1454596000000, 987], [1464597000000, 1467]
	];

	var data2 = [
		[1354586000000, 88], [1364587000000, 76], [1374588000000, 167],
		[1384589000000, 123], [1394590000000, 245], [1404591000000, 332],
		[1414592000000, 376], [1424593000000, 332], [1434594000000, 933],
		[1444595000000, 998], [1454596000000, 765], [1464597000000, 1088]
	];

	var data = [{
		label: "Sales",
		data: data1,
		bars: {
			show: true,
			lineWidth: 0,
			barWidth: 30 * 60 * 60 * 1000 * 80,
			fillColor: { colors: [ { opacity: 1 }, { opacity: 1 } ] }
		}
	},{
		label: "Expenses",
		data: data2,
		lines: {
			show: true,
			lineWidth: 2,
			fillColor: { colors: [ { opacity: 1 }, { opacity: 1 } ] }
		},
		points:{
			show:true,
			radius: 4,
			fill: true,
			fillColor: "#ffffff",
			lineWidth: 2
		}
	}];

	var options = {
		series: {
		shadowSize: 0,
		bars: {
			lineWidth: 2,
			fillColor: { colors: [ { opacity: 1 }, { opacity: 1 } ] }
		}
	},
	grid: {
		hoverable: true,
		clickable: false,
		borderWidth: 1,
		tickColor: '#f5f6fa',
		borderColor: '#f5f6fa',
	},
	legend:{   
		show: true,
		position: 'nw',
		noColumns: 0,
	},
	tooltip: true,
	tooltipOpts: {
		content: '%x: %y'
	},

	xaxis: {mode: "time", ticks:6, tickDecimals: 0},
	yaxis: {ticks:6, tickDecimals: 0},

	colors: ['#007ae1', '#e5e8f2', '#ff5661'],
};

var plot = $.plot($("#combineChart"), data, options);  
});