function titleCase(str) {return str.toLowerCase().split(' ').map(function(word) {return word.replace(word[0], word[0].toUpperCase());}).join(' ').replace('_',' ');}
var flag_1=document.getElementById('flag_1')
var flag_2=document.getElementById('flag_2')
var svg_flag_1=document.getElementById('svg_flag_1')
var svg_flag_2=document.getElementById('svg_flag_2')
var flag_1_dropdown=document.getElementById('flag_1_dropdown')
var flag_2_dropdown=document.getElementById('flag_2_dropdown')
var selected_flag_1=''
var selected_flag_2=''
function set_svg_flag_colors(svg_flag_box,colors){
	remove_all_children(svg_flag_box)
	for (var j = 0; j < colors.length; j++) {
		stripe=document.createElementNS("http://www.w3.org/2000/svg","rect")
		stripe.setAttribute("height",200/colors.length+1+"")
		stripe.setAttribute("width","300")
		stripe.setAttribute("y",j*200/colors.length+"")
		stripe.setAttribute("style","fill: "+colors[j])
		svg_flag_box.appendChild(stripe)
	}
}

function select_flag(name, is_flag_2) {
	let flag_box=flag_1;if(is_flag_2){flag_box=flag_2}
	let svg_flag_box=svg_flag_1;if(is_flag_2){svg_flag_box=svg_flag_2}
	let dropdown=flag_1_dropdown;if(is_flag_2){dropdown=flag_2_dropdown}

	flag_box.getElementsByTagName('p')[0].textContent=titleCase(name)
	if (name=='custom'){
		dropdown.style.display=''
		setup_custom_flags(is_flag_2)
		
	}else{
		dropdown.style.display='none'
		set_svg_flag_colors(svg_flag_box,flag_data[name]["colors"])
	}
	if(is_flag_2){selected_flag_2=name}else{selected_flag_1=name}
}
function select_mask(name, is_flag_2) {
	let svg_flag_box=svg_flag_1;if(is_flag_2){svg_flag_box=svg_flag_2}
	svg_flag_box.style.clipPath='url(#'+name+'_mask)'
	if (is_flag_2 && name=='heart'){
		document.getElementById('heart_dropdown').style.display=''
	}else{
		document.getElementById('heart_dropdown').style.display='none'
	}
	if (is_flag_2 && name=='slant'){
		document.getElementById('slant_dropdown').style.display=''
	}else{
		document.getElementById('slant_dropdown').style.display='none'
	}
	if (is_flag_2 && name=='none'){
		flag_2.style.display='none'
	}else{
		flag_2.style.display=''
	}
	update_slider_vals()
}
function remove_all_children(element){
	while ( element.children.length>0) {
		element.removeChild(element.children[0])
	}
}
