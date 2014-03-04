$(document).ready(function() {
	
	$('#top').css({'width' : window.innerWidth + 'px'});
	
	if ($('#logo-kv').length > 0) {
		$('#arrow').css({'left' : ($(window).width() - 20)/2 + 'px'});
		$('#logo-kv').css({'left' : ($(window).width() - 520)/2 + 'px'});
	}
	
	$(window).load(function() {
		var top = $('.last-item').offset().top + $('.last-item').outerHeight() + 30;
		if (top < $(window).height() - $('footer').height()) {
			top = $(window).height() - $('footer').height() - 2;
		}
		$('footer').css({'top' : top + 'px', 'display' : 'block'});
		$('footer').css({'left' : (window.innerWidth - $('footer').outerWidth())/2 + 'px'});
		if ($('#ad-div').length > 0) {
			top = $('.last-item').offset().top + $('.last-item').outerHeight() + 75;
			if (top < $(window).height()) {
				top = $(window).height();
			}
			var left = window.innerWidth - $('#ad-div').width() - 5;
			if (window.innerWidth < 1150) {
				left = 1150 - $('#ad-div').width() - 5;
			}
			$('#ad-div').css({'top' : top - $('#ad-div').height() + 'px', 'left' : left + 'px', 'display' : 'block'});
		}
		window.setTimeout(function () {
			$('#social').css({'opacity' : 1});
		}, 1500);
	});
	
	
	$('[id^=footer-]').hover(function () {
		$(this).hide();
		$('[id=hover-' + $(this).attr('id') + ']').show();
	});
	
	$('[id^=hover-]').hover(function () {}, function () {
		$(this).hide();
		var id = $(this).attr('id').replace('hover-', '');
		$('[id=' + id + ']').show();
	});
	
	$('#social').hover(function () {
		$(this).stop().animate({'left' : '0px'});
	}, function () {
		$(this).stop().animate({'left' : '-120px'});
	});
})

function toggleTopbar()
{
	if ($('#top').css('height') == '10px') {
		$('#top').animate({'height' : '150px'});
	} else {
		$('#top').animate({'height' : '10px'});
	}
	$('#logo-kv').fadeToggle();
	$('#arrow-up').toggle();
	$('#arrow-down').toggle();
}