const API_URL = 'http://localhost:3000/products';



const displayItems = async () => {
    try {
        const response = await axios.get(API_URL);
        const items = response.data;
        const tableBody = document.querySelector('#itemsTable');

        if (!tableBody) {
            console.error('Không tìm thấy phần tử #itemsTable');
            return;
        }


        tableBody.innerHTML = '';

        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="py-2 px-4 border-b">${item.id}</td>
                <td class="py-2 px-4 border-b">${item.title}</td>
                <td class="py-2 px-4 border-b">${item.price}</td>
                <td class="py-2 px-4 border-b"><img src="${item.images}" alt="${item.title}" class="w-16 h-16 object-cover"></td>
                <td class="py-2 px-4 border-b">${item.description}</td>
                <td class="py-2 px-4 border-b flex gap-3">
                    <a href="edit.html?id=${item.id}" class="text-blue-500 hover:underline">Sửa</a>
                    <button onclick="deleteItem(${item.id})" class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Xóa</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách items:', error);
    }
};

const deleteItem = async (id) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');

    if (!confirmed) {
        return; 
    }
    console.log(id)
    try {
        await axios.delete(`${API_URL}/${id}`);
        displayItems(); 
        alert("Xóa thành Công !!")
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
    }
};

document.addEventListener('DOMContentLoaded', displayItems);
