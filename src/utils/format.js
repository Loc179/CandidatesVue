export function useFormat() {
    // Định dạng hiển thị giá trị, nếu null hoặc undefined thì hiển thị '--'
    const formatDisplay = (candidateItem) => {
      return candidateItem != null ? candidateItem : '--';
    }

    // Lấy chữ cái đầu của tên và họ để hiển thị trong avatar
    const getInitialsFirstLast = (fullName) => {
      if (!fullName) return '';

      const words = fullName.trim().split(/\s+/);

      if (words.length === 1) {
          return words[0][0].toUpperCase();
      }

      const first = words[0][0].toUpperCase();
      const last = words[words.length - 1][0].toUpperCase();

      return first + last;
    }

    // Định dạng ngày tháng năm thành chuỗi dd/mm/yyyy
    function formatDate(date) {
        if (!date) return '--';

        const d = new Date(date);

        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();

        return `${day}/${month}/${year}`;
    }

    // Tạo màu nền avatar ngẫu nhiên dựa trên tên
    function getAvatarColorFromName(name) {
        if (!name) return '#5598fc';

        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }

        const hue = Math.abs(hash) % 360;

        return `hsl(${hue}, 65%, 55%)`;
    }

    return {
        formatDate,
        formatDisplay,
        getAvatarColorFromName,
        getInitialsFirstLast,
    }
}