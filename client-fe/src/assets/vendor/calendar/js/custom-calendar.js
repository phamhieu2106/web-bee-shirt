$(function () {

	/* initialize the external events */

	$('#external-events .fc-event').each(function () {

		// store data so the calendar knows to render an event upon drop
		$(this).data('eventObject', {
			title: $.trim($(this).text()),
			className: $(this).attr("data-bg"), // use the element's text as the event title
			stick: true // maintain when user navigates (see docs on the renderEvent method)
		});

		// make the event draggable using jQuery UI
		$(this).draggable({
			zIndex: 999,
			revert: true, // will cause the event to go back to its
			revertDuration: 0 //  original position after the drag
		});

	});

	/* initialize the calendar */
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
	$('#calendar').fullCalendar({
		header: {
			left: 'prev, next',
			center: 'title',
			right: 'today, month,agendaWeek,agendaDay'
		},
		//Add Events
		events: [
			{
			  title: 'Daily meet',
			  start: new Date(y, m, 1),
			  end: new Date(y, m, 2),
			  className : 'purple-bg',
			},
			{
			  id: 999,
			  title: 'Football',
			  start: new Date(y, m, d-3, 15, 0),
			  allDay: false,
			  className : 'fb-bg',
			},
			{
			  title: 'Clients',
			  start: new Date(y, m, 13),
			  end: new Date(y, m, 14),
			  className : 'blue-bg',
			},
			{
			  title: 'Business',
			  start: new Date(y, m, 9),
			  end: new Date(y, m, 10),
			  className : 'orange-bg',
			},
			{
			  title: 'Meeting',
			  start: new Date(y, m, 28),
			  end: new Date(y, m, 29),
			  className : 'tw-bg'
			},
			{
			  title: 'Movie',
			  start: new Date(y, m, 3),
			  end: new Date(y, m, 4),
			  className : 'tw-bg'
			},
			{
			  title: 'Party',
			  start: new Date(y, m, 25),
			  end: new Date(y, m, 26),
			  className : 'red-bg'
			},
			{
			  title: 'Updates',
			  start: new Date(y, m, 22),
			  end: new Date(y, m, 24),
			  className : 'pink-bg'
			},
			{
			  title: 'Seminar',
			  start: new Date(y, m, 18),
			  end: new Date(y, m, 19),
			  className : 'green-bg'
			},
			{
			  title: 'Investors',
			  start: new Date(y, m, 16),
			  end: new Date(y, m, 16),
			  className : 'fb-bg'
			},
			{
			  title: 'UX Dev',
			  start: new Date(y, m, 31),
			  end: new Date(y, m, 31),
			  className : 'orange-bg'
			},
		],

		editable: true,
		eventLimit: true,
		droppable: true, // this allows things to be dropped onto the calendar
		drop: function (date, allDay) { // this function is called when something is dropped

			// retrieve the dropped element's stored Event Object
			var originalEventObject = $(this).data('eventObject');

			// we need to copy it, so that multiple events don't have a reference to the same object
			var copiedEventObject = $.extend({}, originalEventObject);

			// assign it the date that was reported
			copiedEventObject.start = date;
			copiedEventObject.allDay = allDay;

			// render the event on the calendar
			// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
			$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

			// is the "remove after drop" checkbox checked?
			if ($('#drop-remove').is(':checked')) {
				// if so, remove the element from the "Draggable Events" list
				$(this).remove();
			}

		}

	});

	/*Add new event*/
	// Form to add new event

	$("#createEvent").on('submit', function (ev) {
		ev.preventDefault();

		var $event = $(this).find('.new-event-form'),
			event_name = $event.val(),
			tagColor = $('.event-tag  span.selected').attr('data-tag');

		if (event_name.length >= 3) {

			var newid = "new" + "" + Math.random().toString(36).substring(7);
			// Create Event Entry
			$("#external-events .checkbox").before(
				'<div id="' + newid + '" class="fc-event ' + tagColor + '" data-bg="' + tagColor + '">' + event_name + '<span class="fa fa-close remove-event"></span></div>'
			);


			var eventObject = {
				title: $.trim($("#" + newid).text()),
				className: $("#" + newid).attr("data-bg"), // use the element's text as the event title
				stick: true
			};

			// store the Event Object in the DOM element so we can get to it later
			$("#" + newid).data('eventObject', eventObject);

			// Reset draggable
			$("#" + newid).draggable({
				revert: true,
				revertDuration: 0,
				zIndex: 999
			});

			// Reset input
			$event.val('').focus();
		} else {
			$event.focus();
		}
	});
});
