frappe.ui.form.on('Purchase Invoice', {
    update_item_details: function(item){
        console.log(item);
        return cur_frm.call({
            method: "interio_floors.events.events.get_item_details",
            child: item,
            args: {
                "item_code": item.item_code
            },
            callback: function(r) {
                if(r.message){
                    frappe.model.set_value(item.doctype, item.name,"per_piece", flt(r.message.per_piece));
                    frappe.model.set_value(item.doctype, item.name,"per_box", flt(r.message.per_box));

                    var qty = flt(flt(item.boxes * r.message.per_box) + flt(item.pieces * r.message.per_piece));
                    frappe.model.set_value(item.doctype, item.name,"qty",qty);
                }
            }
        });

    }
});
frappe.ui.form.on('Purchase Invoice Item', {
	item_code: function(frm,cdt, cdn) {
		var item = frappe.get_doc(cdt, cdn);
        frm.events.update_item_details(item)
    },
    pieces: function(frm, cdt, cdn){
		var item = frappe.get_doc(cdt, cdn);
        var qty = flt(flt(item.boxes * item.per_box) + flt(item.pieces * item.per_piece));
        frappe.model.set_value(item.doctype, item.name,"qty",qty);    
    },
    boxes: function(frm, cdt, cdn){
		var item = frappe.get_doc(cdt, cdn);
        var qty = flt(flt(item.boxes * item.per_box) + flt(item.pieces * item.per_piece));
        frappe.model.set_value(item.doctype, item.name,"qty",qty);     
    },
    // qty: function(frm, cdt, cdn){
    //     var item = frappe.get_doc(cdt, cdn);
    //     var qty = flt(flt(item.boxes * r.message.per_box) + flt(item.pieces * r.message.per_piece));
    //     frappe.model.set_value(item.doctype, item.name,"qty",qty);    
    // },
    
    });