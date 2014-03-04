var restarted = false;
var browser = "";
var os = "";
var laptop = "";

$(window).load(function () {
	
	$('#settings').css({'display' : 'block'});
	
	// Setting up UI : -----------------------------------------------------------------------------------
	
	$( ".radio" ).buttonset();
	$('#startbutton').button();
	$('#select-laptop').selectmenu({style:'dropdown'}).selectmenu('disable');
	$('#select-laptop-button').css({'height' : '28px', 'padding-top' : '3px'})
							  .find('span').each(function () { $(this).css({'font-size' : '12px'});});
	
	
	// Positioning and Scaling : --------------------------------------------------------------------------
	
	$('#options').css({'left' : ($(window).width() - $('#options').outerWidth())/2 + 'px'});
	$('#explanations').css({'width' : 2*$(window).width()/3 + 'px',
							'top' : $('#options').offset().top + $('#options').outerHeight() + 20 + 'px', 
							'left' : $(window).width()/6 + 'px'});
	
})

function start() 
{
	
	document.title = 'Best Crazy Awesome People Compilation HD.avi - YouTube';
	$('#select-laptop').selectmenu('disable');
	$( ".radio" ).buttonset( "disable" );
	$('#startbutton').button( "disable" );
	$('#select-laptop-button').css({'opacity' : '0.2', 'cursor' : 'default'});
	$('body').css('overflow', 'hidden');
	$('html').css('overflow', 'hidden');
	
	$('input[name=radio-os]').each(function () {
		if ($(this).is(':checked')) {
			os = $(this).attr('id');
		}
	});
	
	$('input[name=radio-browser]').each(function () {
		if ($(this).is(':checked')) {
			browser = $(this).attr('id');
		}
	});
	
	laptop = $('#select-laptop').val();
	
	$(window).blur(function () {
		$('#settings').css({'display' : 'none'});
		$('#fakepagediv').css({'display' : 'block'});
		$('#fakepageimg').css('width', $(window).width() + 'px').css('height', $(window).height() + 'px');
		$('head').append('<script src="http://code.jquery.com/mobile/1.0.1/jquery.mobile-1.0.1.min.js"></script>');
		var ti = setTimeout(function() {
			$(window).focusin(function () {
				clearTimeout(ti);
				$(window).unbind('focusin');
				$('div[class*=ui-loader]').remove();
				$('ul[class*=ui-selectmenu-menu]').remove();
				$('#fakepagediv').css({'display' : 'none'});
				$('#bluescreen').css({'display' : 'block'});
				countdown();
			});
		},1000);
		$(window).unbind('blur');
	});
	
	if (browser == 'firefox') {
		$('#fakepageimg').attr('src', './img/fakeyoutubefirefox.png');
	}
	
	if (browser == 'ie') {
		$('#fakepageimg').attr('src', './img/fakeyoutubeie.png');
	}
	
	for (i = 1; i < 24; i++) {
		$('#blackscreen').append('<img id="windows-logo'+i+'" class="windows-logo" src="./img/' + os + '/(' + i + ').png" ></img>');
		$('[id=windows-logo'+i+']').css({'width' : $(window).width() + 'px', 'height' : $(window).height() + 'px', 'z-index' : 24-i});
	}
	$('[id^=windows-logo]').hide();
	
	$('#laptop-logo').attr('src', './img/' + laptop + '.png').hide();
}



function countdown()
{
	var i = parseInt($('#cpt').html());
	i = i + 5;
	$('#cpt').empty();
	$('#cpt').append(i);
	t=setTimeout("countdown()",300);
	if (i >= 100) 
	{
		clearTimeout(t);
		$('#bluescreen').css({'display' : 'none'});
		$('#blackscreen').css({'display' : 'block'});
		$('#errorrecoverytitle').hide();
		$('#errorrecoverycontent').hide();
		$('#errorrecoveryfooter').hide();
		$('#troll-face').hide();
		timeout=setTimeout("restartscreen()",5000);
	}
}


function restartscreen () 
{
	clearTimeout(timeout);
	var height = $(window).height() * 150 / 768;
	var top = ($(window).height() - 1.5 * height) / 2;
	var width = $(window).width() * 400 / 1366;
	var left = ($(window).width() - width) / 2;
	$('#laptop-logo').css('top', top + 'px').css('left', left + 'px')
					 .css('width', width + 'px').css('height', height + 'px')
					 .show();
	setTimeout(function () { 
				$('#laptop-logo').hide();
				$('#underscore').empty().show();
				setTimeout(function () { $('#underscore').append('_');}, 800);
				setTimeout(function () { $('#underscore').hide();}, 1200);
				setTimeout(function () { restartmenu();}, 3500);
	}, 1500);	 
	
}

function restartmenu() 
{
	var top = $(window).height() * 20 / 768;
	var left = $(window).width() * 40 / 1366;
	var padding = $(window).height() * 6 / 768;
	var width = $(window).width() - 2 * left;
	
	$('#errorrecoverytitle').css({'top' : top + 'px', 'left' : left + 'px', 'padding' : padding + 'px', 'width' : width});
	$('#errorrecoverycontent').css({'top' : 5*top + 'px', 'left' : left + 'px'});
	$('#errorrecoveryfooter').css({'bottom' : top + 'px', 'left' : left + 'px', 'padding' : padding + 'px', 'padding-left' : '10px', 'width' : width});
	
	
	$('#errorrecoverytitle').show();
	$('#errorrecoverycontent').show();
	$('#errorrecoveryfooter').show();
	
	$(document).keydown(function(e){
		if (e.keyCode == 37) { 
			changechoice(-1);
			return false;
		}
		if (e.keyCode == 38) { 
			changechoice(-1);
			return false;
		}
		if (e.keyCode == 39) { 
			changechoice(1);
			return false;
		}
		if (e.keyCode == 40) { 
			changechoice(1);
			return false;
		}
		if (e.keyCode == 13) { 
			pressEnter();
			return false;
		}
	});
	if (!restarted) { timer();} else { 
		changechoice(1);
		$('#recommendation').empty().append('<span class="spacing">(</span>Recommended)');
	}
	
}

function timer()
{
	var i = parseInt($('#timer').html());
	i = i - 1;
	$('#timer').empty().append(i);
	time=setTimeout(function () { timer();},1000);
	if (i == 0) 
	{
		clearTimeout(time);
		pressEnter();
	}
}

function changechoice(i) 
{
	clearTimeout(time);
	$('#msgtimer').hide();
	var id = $('.selected-choice').attr('id');
	$('.selected-choice').removeClass('selected-choice');
	var index = parseInt(id[6]) + i;
	if (index == 5) { index = 1;}
	if (index == 0) { index = 4;}
	var newchoice = '#choice' + index;
	$('#choice' + index).addClass('selected-choice');
	$('#description').empty();
	if (index == 1) { $('#description').append("<span class='spacing'>Start</span><span class='spacing'>Windows</span><span class='spacing'>with</span><span class='spacing'>only</span><span class='spacing'>the</span><span class='spacing'>core</span><span class='spacing'>drivers</span><span class='spacing'>and</span><span class='spacing'>services.</span>");}
	if (index == 2) { $('#description').append("<span class='spacing'>Start</span><span class='spacing'>Windows</span><span class='spacing'>with</span><span class='spacing'>core</span><span class='spacing'>drivers,</span><span class='spacing'>plus</span><span class='spacing'>networking</span><span class='spacing'>support.</span>");}
	if (index == 3) { $('#description').append("<span class='spacing'>Start</span><span class='spacing'>Windows</span><span class='spacing'>with</span><span class='spacing'>core</span><span class='spacing'>drivers,</span><span class='spacing'>and</span><span class='spacing'>launch</span><span class='spacing'>the</span><span class='spacing'>command</span></br><span id='prompt' >prompt.</span>");}
	if (index == 4) { $('#description').append("<span class='spacing'>Start</span><span class='spacing'>Windows</span><span class='spacing'>with</span><span class='spacing'>its</span><span class='spacing'>regular</span><span class='spacing'>settings.</span>");}
	var promptpadding = $(window).width() * 250 / 1366;
	$('#prompt').css('padding-left', promptpadding + 'px');
}

function pressEnter() 
{
	$('#timer').empty().append(30);
	$(document).unbind('keydown');
	clearTimeout(time);
	var id = $('.selected-choice').attr('id');
	var index = parseInt(id[6]);
	
	if (index == 4) { 
		restarted = true;
		$('#msgtimer').remove();
		$('#errorrecoverytitle').hide();
		$('#errorrecoverycontent').hide();
		$('#errorrecoveryfooter').hide();
		$('[id^=windows-logo]').show();
		normalstart(1);
		$('audio').remove();
		$('body').append(
			'<audio controls="" autoplay="autoplay" hidden="true" preload="auto">' +
				'<source src="./sound/' + os + '.ogg" type="audio/ogg" />' +
				'<source src="./sound/' + os + '.mp3" type="audio/mpeg" />' +
			'</audio>'
		);
	} else {
		safemode();
	}
	
}

function normalstart(i) 
{
	$('[id=windows-logo'+i+']').hide();
	
	timer=setTimeout(function () { normalstart(i+1);}, 200);
	if (i == 23) { 
		clearTimeout(timer);
		$('audio').remove();
		$('[id^=windows-logo]').hide();
		setTimeout(function () { 
			$('#blackscreen').css({'display' : 'none'});
			$('#bluescreen').css({'display' : 'block'});
		}, 200);
		setTimeout(function () { 
			$('#bluescreen').css({'display' : 'none'});
			$('#blackscreen').css({'display' : 'block'});
		}, 400);
		timeout=setTimeout("restartscreen()",6000);
	}
}

function safemode()
{
	$('#errorrecoverytitle').empty().append("Loading Windows Files");
	$('#errorrecoveryfooter').empty().append("Please wait");
	$('#errorrecoverycontent').css('color', 'white');
	$('#errorrecoverycontent').empty().append(
		
		"<div id='load1'>Loaded: \\windows\\system32\\config\\system</div>"+
		"<div id='load2'>Loaded: \\windows\\system32\\ntoskrnl.exe</div>"+
		"<div id='load3'>Loaded: \\windows\\system32\\hal.dll</div>"+
		"<div id='load4'>Loaded: \\windows\\system32\\kdcom.dll</div>"+
		"<div id='load5'>Loaded: \\windows\\system32\\mcupdate_menuwininstal.dll</div>"+
		"<div id='load6'>Loaded: \\windows\\system32\\PSHED.dll</div>"+
		"<div id='load7'>Loaded: \\windows\\system32\\CLFS.SYS</div>"+
		"<div id='load8'>Loaded: \\windows\\system32\\CZ.dll</div>"+
		"<div id='load9'>Loaded: \\windows\\system32\\drivers\\wdf01000.sys</div>"+
		"<div id='load10'>Loaded: \\windows\\system32\\drivers\\WDFLDR.SYS</div>"+
		"<div id='load11'>Loaded: \\windows\\system32\\drivers\\sptd.sys</div>"+
		"<div id='load12'>Loaded: \\windows\\system32\\drivers\\ACPI.sys</div>"+
		"<div id='load13'>Loaded: \\windows\\system32\\drivers\\WHILIB.SYS</div>"+
		"<div id='load14'>Loaded: \\windows\\system32\\drivers\\msisadrv.sys</div>"+
		"<div id='load15'>Loaded: \\windows\\system32\\drivers\\vdrvroot.sys</div>"+
		"<div id='load16'>Loaded: \\windows\\system32\\drivers\\partmgr.sys</div>"+
		"<div id='load17'>Loaded: \\windows\\system32\\drivers\\compbatt.sys</div>"+
		"<div id='load18'>Loaded: \\windows\\system32\\drivers\\BATTC.SYS</div>"+
		"<div id='load19'>Loaded: \\windows\\system32\\drivers\\volmgrx.sys</div>"+
		"<div id='load20'>Loaded: \\windows\\system32\\drivers\\mountmgr.sys</div>"+
		"<div id='load21'>Loaded: \\windows\\system32\\DRIVERS\\pciide.sys</div>"+
		"<div id='load22'>Loaded: \\windows\\system32\\DRIVERS\\PCIIDEX.SYS</div>"+
		"<div id='load23'>Loaded: \\windows\\system32\\DRIVERS\\iaStor.sys</div>"+
		"<div id='load24'>Loaded: \\windows\\system32\\drivers\\sasmor.sys</div>"+
		"<div id='load25'>Loaded: \\windows\\system32\\drivers\\atapdtr.sys</div>"+
		"<div id='load26'>Loaded: \\windows\\system32\\drivers\\modtas.sys</div>"+
		"<div id='load27'>Loaded: \\windows\\system32\\drivers\\mdxata.sys</div>"+
		"<div id='load28'>Loaded: \\windows\\system32\\drivers\\Htfs.sys</div>"+
		"<div id='load29'>Loaded: \\windows\\system32\\drivers\\msrpc.sys</div>"+
		"<div id='load30'>Loaded: \\windows\\system32\\drivers\\ksecdd.sys</div>"+
		"<div id='load31'>Loaded: \\windows\\system32\\drivers\\cng.sys</div>"+
		"<div id='load32'>Loaded: \\windows\\system32\\drivers\\pcw.sys</div>"+
		"<div id='load33'>Loaded: \\windows\\system32\\drivers\\Fs_Rec.sys</div>"+
		"<div id='load34'>Loaded: \\windows\\system32\\drivers\\ndis.sys</div>"+
		"<div id='load35'>Loaded: \\windows\\system32\\drivers\\NETIO.SYS</div>"+
		"<div id='load36'>Loaded: \\windows\\system32\\drivers\\ksecpkg.sys</div>"+
		"<div id='load37'>Loaded: \\windows\\system32\\drivers\\tcpip.sys</div>"+
		"<div id='load38'>Loaded: \\windows\\system32\\drivers\\fwpkclnt.sys</div>"+
		"<div id='load39'>Loaded: \\windows\\system32\\drivers\\volsmap.sys</div>"+
		"<div id='load40'>Loaded: \\windows\\system32\\DRIVERS\\TVALZ.SYS</div>"+
		"<div id='load41'>Loaded: \\windows\\system32\\DRIVERS\\tos_sps84.sys</div>"+
		"<div id='load42'>Loaded: \\windows\\system32\\drivers\\spldr.sys</div>"+
		"<div id='load43'>Loaded: \\windows\\system32\\drivers\\rdyboost.sys</div>"+
		"<div id='load44'>Loaded: \\windows\\system32\\drivers\\mup.sys</div>"+
		"<div id='load45'>Loaded: \\windows\\system32\\DRIVERS\\kl1.sys</div>"+
		"<div id='load46'>Loaded: \\windows\\system32\\drivers\\hwpolicy.sys</div>"+
		"<div id='load47'>Loaded: \\windows\\system32\\drivers\\fvevol.sys</div>"+
		"<div id='load48'>Loaded: \\windows\\system32\\drivers\\disk.sys</div>"+
		"<div id='load49'>Loaded: \\windows\\system32\\drivers\\CLASSPNP.SYS</div>"+
		"<div id='load50'>Loaded: \\windows\\system32\\drivers\\pci.sys</div>"
	);
	
	$("[id*="+"load"+"]").hide();
	var max = 21; //parseInt( $(window).height() * 21 / 768 );
	load(1, max);
}

function load(i, max)
{
	$("[id=load"+i+"]").show();
	if (i > max) { 
		var temp = i-max;
		$("[id=load"+temp+"]").hide();
	}
	tim=setTimeout(function () { load(i+1, max);},100);
	if (i == 50) { 
		clearTimeout(tim);
		setTimeout(function () {
		
			$('#errorrecoverytitle').hide();
			$('#errorrecoveryfooter').hide();
			var width = $(window).width()-60;
			$('#errorrecoverycontent').css('top', '20px').css('width', width + 'px');
			$('#errorrecoverycontent').empty().append(
				'<div id="fakeformat1"><div>Microsoft Windows [Version 6.1.7601]</div>' + 
				'<div>Copyright (C) 2009 Microsoft Corporation. All rights reserved.</div></div>' + 
				'<div id="fakeformat2">Windows error WSA_OPERATION_ABORTED - Safe Mode boot failure</div>' + 
				'<div id="fakeformat3">Initiating reset of Windows install to default version... </div>' + 
				'<div id="fakeformat4"></br></div>' + 
				'<div id="fakeformat5"></div>' + 
				'<div id="fakeformat6">MSCDEX Version 2.23</div>' + 
				'<div id="fakeformat7">Copyright (C) Microsoft Corp. 1986-1993. All rights reserved.</div>' + 
				'<div id="fakeformat8"></br></div>' + 
				'<div id="fakeformat9">C:\\System\\Recovery>format c:</div>' + 
				'<div id="fakeformat10">C:\\System\\Recovery></div>' + 
				'<div id="fakeformat11">C:\\System\\Recovery>WARNING: ALL DATA ON NON-REMOVABLE DISK</div>' + 
				'<div id="fakeformat12">C:\\System\\Recovery>DRIVE C: WILL BE LOST!</div>' + 
				'<div id="fakeformat13">C:\\System\\Recovery></div>' + 
				'<div id="fakeformat14">C:\\System\\Recovery>WARNING: DO NOT TURN OFF YOUR COMPUTER</div>' + 
				'<div id="fakeformat15">C:\\System\\Recovery></div>' + 
				'<div id="fakeformat16">C:\\System\\Recovery>Press any key to proceed to next step<span id="keypress"><b>_</b></span></div>' + 
				'<div id="fakeformat17">C:\\System\\Recovery>formatting C: drive...</div>' +
				'<div id="fakeformat18">C:\\System\\Recovery></div>' +
				'<div id="fakeformat19">C:\\System\\Recovery>format C: completed </div>' +
				'<div id="loadingbar"><span id="percent">0</span>%</div>'
			);
			$("[id*="+"fakeformat"+"]").hide();
			$('#loadingbar').hide();
		}, 2000);
		
		setTimeout(function () { fakeformat(1);}, 4000);
	}
}

function fakeformat(i)
{
	$("[id=fakeformat"+i+"]").css('display', 'block');
	timerfakeformat=setTimeout(function () { fakeformat(i+1);},200);
	if (i == 16) {
		clearTimeout(timerfakeformat);
		waitingkeypress();
		$(window).keydown(function () {
			$(window).unbind('keydown');
			clearTimeout(keypresstimeout);
			$('#keypress').hide();
			$('#fakeformat17').show();
			$('#loadingbar').show();
			formatting(1);
		});
	}
}
var underscorehidden = false;
function waitingkeypress()
{
	if (underscorehidden == true) {
		$('#keypress').show();
		underscorehidden = false;
	} else{
		$('#keypress').hide();
		underscorehidden = true;
	}
	keypresstimeout=setTimeout('waitingkeypress()', 500);
}

function formatting(i)
{
	$('#percent').empty().append(i);
	$('#loadingbar').css('width', i + '%');
	timerformatting=setTimeout(function () { formatting(i+1)}, 600);
	if (i == 100) {
		clearTimeout(timerformatting);
		$('#fakeformat9').hide();
		$('#fakeformat18').show();
		setTimeout(function () {	
			$('#fakeformat10').hide();
			$('#fakeformat19').show();
		}, 300);
		setTimeout(function () { 
			$('#errorrecoverycontent').empty();
			$('#blackscreen').removeClass('font');
			$('#errorrecoverycontent').css({'font-size' : '20px', 'color' : '#567D61', 'font-family' : 'lucida console', 'text-shadow' : '0 0 0.2em #547A5D, 0 0 0.2em #547A5D'});
			$('#errorrecoverycontent').append('<span id="letter1">H</span>' + '<span id="letter2">e</span>' + '<span id="letter3">y</span>' + '<span id="letter4">!</span>' + '<span id="letter5"> </span>' + '<span id="letter6">H</span>' + '<span id="letter7">a</span>' + '<span id="letter8">v</span>' + '<span id="letter9">e</span>' + '<span id="letter10"> </span>' + '<span id="letter11">y</span>' + '<span id="letter12">o</span>' + '<span id="letter13">u</span>' + '<span id="letter14"> </span>' + '<span id="letter15">j</span>' + '<span id="letter16">u</span>' + '<span id="letter17">s</span>' + '<span id="letter18">t</span>' + '<span id="letter19"> </span>' + '<span id="letter20">l</span>' + '<span id="letter21">o</span>' + '<span id="letter22">s</span>' + '<span id="letter23">t</span>' + '<span id="letter24"> </span>' + '<span id="letter25">a</span>' + '<span id="letter26">l</span>' + '<span id="letter27">l</span>' + '<span id="letter28"> </span>' + '<span id="letter29">y</span>' + '<span id="letter30">o</span>' + '<span id="letter31">u</span>' + '<span id="letter32">r</span>' + '<span id="letter33"> </span>' + '<span id="letter34">d</span>' + '<span id="letter35">a</span>' + '<span id="letter36">t</span>' + '<span id="letter37">a</span>' + '<span id="letter38">?</span>');
			
			$("[id*="+"letter"+"]").hide();
		}, 3000);
		a=setTimeout(function () { clearTimeout(a);revelation(1);}, 8000);
	}
}

function revelation(i)
{
	$("[id=letter"+i+"]").show();
	timerrevelation=setTimeout(function () { revelation(i+1);}, 150);
	if (i == 38) {
		clearTimeout(timerrevelation);
		setTimeout(function () {;
			var top = ($(window).height()-400)/2;
			var left = ($(window).width()-400)/2;
			$('#troll-face').css({'top' : top, 'left' : left});
			$('#troll-face').show();
		}, 3000);
		setTimeout(function () { window.location.href = "http://www.knightventure.net";}, 4500);
	}
}




