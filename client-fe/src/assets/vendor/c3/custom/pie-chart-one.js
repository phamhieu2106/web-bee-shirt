var chart12 = c3.generate({
	bindto: '#pieChart1',
	data: {
		// iris data from R
		columns: [
			['Mon', 219],
			['Tue', 167],
			['Wed', 115],
			['Thu', 87],
			['Fri', 60],
			['Sat', 30],
		],
		type : 'pie',
		colors: {
			Mon: '#007ae1',
			Tue: '#0088fb',
			Wed: '#1594ff',
			Thu: '#2fa0ff',
			Fri: '#48abff',
			Sat: '#e5e8f2',
		},
		onclick: function (d, i) { console.log("onclick", d, i); },
		onmouseover: function (d, i) { console.log("onmouseover", d, i); },
		onmouseout: function (d, i) { console.log("onmouseout", d, i); }
	},
});