function saveSvg(svgEl, name) {
	svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	var svgData = svgEl.outerHTML;
	var preface = '<?xml version="1.0" standalone="no"?>\r\n';
	var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
	var svgUrl = URL.createObjectURL(svgBlob);
	var downloadLink = document.createElement("a");
	downloadLink.href = svgUrl;
	downloadLink.download = name;
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
}
function exp(){
	if(svg_flag_2.style.clipPath=='url("#none_mask")'){
		saveSvg(document.getElementById('svg_div').firstElementChild,selected_flag_1+'.svg')
	}
	else{

		saveSvg(document.getElementById('svg_div').firstElementChild,selected_flag_1+'.'+selected_flag_2+'.svg')

	}
}
document.getElementById('export').addEventListener('click',exp)
