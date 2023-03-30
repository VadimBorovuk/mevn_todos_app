export const dateParse = {
  methods: {
    getFormattedDateOrg(data) {
      if (data) {
        let date = new Date(data);
        date.setHours(date.getHours());
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return day + '.' + month + '.' + year;
      } else {
        return '-'
      }
    },
    getFormattedTimeRequest(data) {
      if (data) {
        let date = new Date(data);
        date.setHours(date.getHours());
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        let seconds = date.getSeconds().toString().padStart(2, '0');
        return hours + ':' + minutes + ':' + seconds;
      } else {
        return '-'
      }
    }
  }
}
