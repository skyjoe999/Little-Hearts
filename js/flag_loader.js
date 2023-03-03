function add_bubble_events(flag_box,bubble,name){


	bubble.addEventListener('mouseover',
		(event) => {
			flag_box.getElementsByTagName('p')[0].textContent=titleCase(name)
		}
	)
	bubble.addEventListener("mouseleave",
		(event) => {
			flag_1.getElementsByTagName('p')[0].textContent=titleCase(selected_flag_1)
			flag_2.getElementsByTagName('p')[0].textContent=titleCase(selected_flag_2)
		}
	)
	bubble.addEventListener("click",
		(event) => {
			select_flag(name,flag_box==flag_2)

		}
	)

}
function set_colors(bubble,colors){
	svg=document.createElementNS("http://www.w3.org/2000/svg","svg")
	svg.setAttribute("viewBox","0 0 100 100")

	bubble.appendChild(svg)
	for (var j = 0; j < colors.length; j++) {
		stripe=document.createElementNS("http://www.w3.org/2000/svg","rect")
		stripe.setAttribute("height",100/colors.length+1+"")
		stripe.setAttribute("width","100")
		stripe.setAttribute("y",j*100/colors.length+"")
		stripe.setAttribute("style","fill: "+colors[j])
		svg.appendChild(stripe)
	}
}
function setup_flag_bubble(flag_box,name,colors){
	bubble=document.createElement("div")
	bubble.className="flag_bubble"
	flag_box.lastElementChild.before(bubble)
	set_colors(bubble,colors)
	add_bubble_events(flag_box,bubble,name)

}
function setup_flag_box(flag_box){
	for (let i in flag_data) {
		setup_flag_bubble(flag_box,i,flag_data[i]["colors"])
	}
}
