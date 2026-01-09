const clock = document.getElementById('clock');

const urlParams = new URL(location.href).searchParams;
const tzParams = urlParams.get('tz');
const timeGetter = new Date();
const timezoneOffset =  tzParams == null || isNaN(tzParams) ? 0 : timeGetter.getTimezoneOffset() + new Number(tzParams) * 60;

setInterval(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + timezoneOffset);
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    clock.innerText = `${hours}:${minutes}:${seconds}`;
}, 1000);
