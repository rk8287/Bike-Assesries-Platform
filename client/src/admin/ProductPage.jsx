import React from 'react'

function ProductPage() {
  return (
   <div className="p-6">
<h1 className="text-3xl font-bold mb-6 text-black">Manage Products</h1>
<button className="mb-4 px-4 py-2 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-500">Add New Product</button>


<div className="overflow-x-auto bg-white shadow rounded-xl p-4">
<table className="w-full text-left">
<thead>
<tr className="border-b">
<th className="p-3">Image</th>
<th className="p-3">Name</th>
<th className="p-3">Price</th>
<th className="p-3">Actions</th>
</tr>
</thead>
<tbody>
<tr className="border-b hover:bg-gray-100">
<td className="p-3"><img src="https://via.placeholder.com/50" className="rounded" /></td>
<td className="p-3">Helmet Pro Series</td>
<td className="p-3">₹1,499</td>
<td className="p-3 flex gap-3">
<button className="px-3 py-1 bg-green-500 text-white rounded-lg">Edit</button>
<button className="px-3 py-1 bg-red-500 text-white rounded-lg">Delete</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
  )
}

export default ProductPage