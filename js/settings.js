document.getElementById('heart_flag_size').children[1].oninput=update_slider_vals
document.getElementById('heart_size').children[1].oninput=update_slider_vals
document.getElementById('slant_size').children[1].oninput=update_slider_vals


function get_heart_size_val(){
	return document.getElementById('heart_size').children[1].value/1000/2+0.5
}
function get_heart_flag_size_val(){
	return document.getElementById('heart_flag_size').children[1].value/1000
}
function get_slant_size_val(){
	return (1-document.getElementById('slant_size').children[1].value/1000)/2
}

var flag_1_line_count=document.getElementById('flag_1_line_count')
var flag_2_line_count=document.getElementById('flag_2_line_count')
var flag_1_lines=document.getElementById('flag_1_lines')
var flag_2_lines=document.getElementById('flag_2_lines')
flag_1_line_count.oninput=update_custom_flag_ui
flag_2_line_count.oninput=update_custom_flag_ui



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
function update_custom_flag_ui(){
	let need1=flag_1_line_count.value-flag_1_lines.childElementCount
	if (need1<0){
		for (var i = 0; i < -need1; i++) {
			flag_1_lines.lastElementChild.remove()
		}
	}
	else {
		for (var i = 0; i < need1; i++) {
			let elm=document.createElement('input')
			elm.type='color'
			elm.oninput=update_custom_flag
			flag_1_lines.appendChild(elm)
		}
	}
	let need2=flag_2_line_count.value-flag_2_lines.childElementCount
	if (need2<0){
		for (var i = 0; i < -need2; i++) {
			flag_2_lines.lastElementChild.remove()
		}
	}
	else {
		for (var i = 0; i < need2; i++) {
			let elm=document.createElement('input')
			elm.type='color'
			elm.oninput=update_custom_flag
			flag_2_lines.appendChild(elm)
		}
	}
	update_custom_flag()
}
function update_custom_flag(){
	var colors1=[]
	for (var i = 0; i < flag_1_lines.childElementCount; i++) {
		colors1=colors1.concat(flag_1_lines.children[i].value)
	}
	if(selected_flag_1=='custom'){
		set_svg_flag_colors(svg_flag_1,colors1)
	}
	var colors2=[]
	for (var i = 0; i < flag_2_lines.childElementCount; i++) {
		colors2=colors2.concat(flag_2_lines.children[i].value)
	}
	if(selected_flag_2=='custom'){
		set_svg_flag_colors(svg_flag_2,colors2)
	}
}
function setup_custom_flags(is_flag_2){
	let lines=flag_1_lines;if (is_flag_2){lines=flag_2_lines}
	// if (lines.childElementCount==0){
	let line_count=flag_1_line_count;if (is_flag_2){line_count=flag_2_line_count}
	let selected_flag=selected_flag_1;if(is_flag_2){selected_flag=selected_flag_2}
	let colors=flag_data[selected_flag]["colors"]
	remove_all_children(lines)
	line_count.value=colors.length
	for (var i = 0; i < colors.length; i++) {
		let elm=document.createElement('input')
		elm.type='color'
		elm.oninput=update_custom_flag
		elm.value=colors[i]
		lines.appendChild(elm)
		}
	// }
}
