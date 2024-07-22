

const API_URL = 'http://localhost:3000/products';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#addProductForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.querySelector('#title').value.trim();
        const price = parseFloat(document.querySelector('#price').value.trim());
        const images = document.querySelector('#images').value.trim();
        const description = document.querySelector('#description').value.trim();

        // Validation
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

        try {
            const response = await axios.post(API_URL, {
                title,
                price,
                images,
                description
            });
            alert('Sản phẩm đã được thêm thành công!');
            form.reset(); 
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    });
});
