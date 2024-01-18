$(function () {

	var data, chartOptions;
	
	data = [
		{ label: "Apples", data: Math.floor (Math.random() * 100 + 150) }, 
		{ label: "Oranges", data: Math.floor (Math.random() * 100 + 390) }, 
		{ label: "Pinaples", data: Math.floor (Math.random() * 100 + 530) }, 
		{ label: "Grapes", data: Math.floor (Math.random() * 100 + 90) },
		{ label: "Bananas", data: Math.floor (Math.random() * 100 + 320) }
	];

	chartOptions = {        
		series: {
			pie: {
				show: true,  
				innerRadius: .5, 
				stroke: {
					width: 0,
				}
			}
		},
		shadowSize: 0,
		legend: {
			position: 'sw'
		},
		
		tooltip: true,

		tooltipOpts: {
			content: '%s: %y'
		},
		
		grid:{
			hoverable: true,
			clickable: false,
			borderWidth: 1,
			tickColor: '#f5f6fa',
			borderColor: '#f5f6fa',
		},
		shadowSize: 0,
		colors: ['#007ae1', '#0088fb', '#1594ff', '#2fa0ff', '#e5e8f2', '#ff5661'],
	};

	var holder = $('#donut-chart');

	if (holder.length) {
		$.plot(holder, data, chartOptions );
	}		
		
});