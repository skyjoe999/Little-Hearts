
function add_mask_events(mask_flag,name1,name2){
	mask_flag.addEventListener("click",
		(event) => {
			select_mask(name1,false)
			select_mask(name2,true)
		}
	)

}
var masks=document.getElementById('masks')
add_mask_events(masks.children[0],'all','none')
add_mask_events(masks.children[1],'all','slant')
add_mask_events(masks.children[2],'all','heart')
add_mask_events(masks.children[3],'heart','none')
select_mask('all',false)
select_mask('none',true)
