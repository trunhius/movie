import * as crypto from 'crypto';

function hashPassword(password: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}
const initAvatar = (fullName: string) => {
    let name = fullName.split(" ")
    // console.log(initAvatar);
    // lấy chữ cái đầu của họ ghép với chữ cái đầu của tên => tạo avatar
    let newAvatar = name[0][0] + name[2][0];
    console.log(newAvatar)
    return `https://ui-avatars.com/api/?name=${newAvatar}&background=random&size=100`
}

function fetchData() {
    return new Promise((resolve, reject) => {
        // Mô phỏng một công việc bất đồng bộ
        setTimeout(() => {
            const data = "Dữ liệu từ server";
            // Giải quyết Promise với dữ liệu
            resolve(data);
            // Nếu có lỗi, bạn có thể reject Promise
            // reject("Lỗi khi lấy dữ liệu");
        }, 2000);
    });
}
export { hashPassword, initAvatar, fetchData }