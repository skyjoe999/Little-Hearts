function setup_slider(elm){
	elm.parentElement.addEventListener('mousedown', function(e) {
		elm.classList.add('clicked')
	}, true);
	if (elm.style.getPropertyValue('--val')=='') {
		elm.style.setProperty('--val',0)
	}

}
document.addEventListener('mouseup', function() {
	for (var i = 0; i < document.getElementsByClassName('clicked').length; i++) {
		let elm=document.getElementsByClassName('clicked')[i]
		elm.classList.remove('clicked')
	}
}, true);
document.addEventListener('mousemove', function(event) {
	for (var i = 0; i < document.getElementsByClassName('clicked').length; i++) {
		let elm=document.getElementsByClassName('clicked')[i]
		let rect=elm.getBoundingClientRect()
		elm.style.setProperty('--val',Math.min(1,Math.max(0,
			(event.clientX-rect.x)/rect.width
		)))
	}
	update_slider_vals()
}, true);

for (var i = 0; i < document.getElementsByClassName('slider').length; i++) {
	setup_slider(document.getElementsByClassName('slider')[i])
}
