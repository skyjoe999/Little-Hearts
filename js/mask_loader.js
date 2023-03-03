
function add_mask_events(mask_flag,name1,name2){
	mask_flag.addEventListener("click",
		(event) => {
			select_mask(name1,false)
			select_mask(name2,true)
		}
	)

}
var masks=document.getElementById('masks')
