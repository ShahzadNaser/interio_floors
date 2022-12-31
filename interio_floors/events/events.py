import frappe
from erpnext.stock.doctype.batch.batch import get_batch_no

@frappe.whitelist()
def get_item_details(item_code=None, warehouse=None):
    if not item_code:
        return False
    result = frappe.db.get_value("Conversion Details",{"parent":item_code},["per_piece","per_box"],as_dict=True)
    if not result:
        item_group = frappe.db.get_value("Item", item_code, "item_group")
        result = frappe.db.get_value("Conversion Details",{"parent":item_group},["per_piece","per_box"],as_dict=True)

    return result

@frappe.whitelist()
def ping():
    return "Pong"
