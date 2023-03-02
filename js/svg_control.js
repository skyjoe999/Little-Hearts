function titleCase(str) {return str.toLowerCase().split(' ').map(function(word) {return word.replace(word[0], word[0].toUpperCase());}).join(' ').replace('_',' ');}
var flag_1=document.getElementById('flag_1')
var flag_2=document.getElementById('flag_2')
var svg_flag_1=document.getElementById('svg_flag_1')
var svg_flag_2=document.getElementById('svg_flag_2')
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

	if(is_flag_2){selected_flag_2=name}else{selected_flag_1=name}
	flag_box.getElementsByTagName('p')[0].textContent=titleCase(name)
	set_svg_flag_colors(svg_flag_box,flag_data[name]["colors"])
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
		masks.classList.remove('top')
	}else{
		flag_2.style.display=''
		masks.classList.add('top')
	}
	update_slider_vals()
}
function update_slider_vals(){
	if(svg_flag_2.style.clipPath=='url("#heart_mask")'){
		let f=(1-get_heart_size_val())*get_heart_flag_size_val()+get_heart_size_val()
		document.getElementById('heart_mask').style.transform=(center_matrix_with_scale(
			get_heart_size_val()/f
		))
		svg_flag_2.style.transform=(center_matrix_with_scale(

			f
		))
	}
	else{
		document.getElementById('heart_mask').style.transform=center_matrix_with_scale(1)
		svg_flag_2.style.transform=center_matrix_with_scale(1)
	}
	if(svg_flag_2.style.clipPath=='url("#slant_mask")'){
		document.getElementById('slant_mask').children[0].setAttribute('d',(
			'M'+get_slant_size_val()*300+',200H300V0h-'+get_slant_size_val()*300+'z'
		))
	}else{
		document.getElementById('slant_mask').children[0].setAttribute('d',(
			'M100,200H300V0h-100z'
		))
	}
}
function center_matrix_with_scale(scale){
	return('matrix('+scale+',0,0,'+scale+','+(1-scale)*150+','+(1-scale)*100+')')
}
function get_heart_size_val(){
	return document.getElementById('heart_size').children[1].style.getPropertyValue('--val')/2+0.5
}
function get_heart_flag_size_val(){
	return document.getElementById('heart_flag_size').children[1].style.getPropertyValue('--val')
}
function get_slant_size_val(){
	return (1-document.getElementById('slant_size').children[1].style.getPropertyValue('--val'))/2
}
function remove_all_children(element){
	while ( element.children.length>0) {
		element.removeChild(element.children[0])
	}
}
