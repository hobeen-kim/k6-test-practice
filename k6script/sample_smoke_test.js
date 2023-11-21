import http from 'k6/http';
import { check, sleep} from 'k6';

export const options = {
    vus: 3, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
    duration: '1m', // This can be shorter or just a few iterations
};

export default function () {

    http.get(`${__ENV.HOST_NAME}`);

    const payload = JSON.stringify({
        name: 'k6'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    http.post(`${__ENV.HOST_NAME}`, payload, params);

    sleep(1);
};