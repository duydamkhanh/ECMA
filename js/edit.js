const API_URL = 'http://localhost:3000/products';

const getProductIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
};

const loadProduct = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        const product = response.data;
        console.log(product);
        document.querySelector('#productId').value = product.id;
        document.querySelector('#title').value = product.title;
        document.querySelector('#price').value = product.price;
        document.querySelector('#images').value = product.images;
        document.querySelector('#description').value = product.description;
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
    }
};

const updateProduct = async (id, data) => {
    try {
        await axios.put(`${API_URL}/${id}`, data);
        alert('Sản phẩm đã được cập nhật thành công!');
        window.location.href = 'list.html'; // Chuyển hướng về trang danh sách sản phẩm
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại.');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const id = getProductIdFromUrl();
    if (id) {
        loadProduct(id);
    }

    const form = document.querySelector('#editProductForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const id = document.querySelector('#productId').value;
        const title = document.querySelector('#title').value.trim();
        const price = parseFloat(document.querySelector('#price').value.trim());
        const images = document.querySelector('#images').value.trim();
        const description = document.querySelector('#description').value.trim();

        if (title.length < 3) {
            alert('Tên sản phẩm phải có ít nhất 3 ký tự.');
            return;
        }

        if (price <= 0) {
            alert('Giá sản phẩm phải lớn hơn 0.');
            return;
        }

        if (!images) {
            alert('URL ảnh không hợp lệ.');
            return;
        }

        if (description.length < 10) {
            alert('Mô tả sản phẩm phải có ít nhất 10 ký tự.');
            return;
        }

        updateProduct(id, { title, price, images, description });
    });
});
